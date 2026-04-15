import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";

import {
  getTracks,
  deleteTrack,
  clearAllTracks,
} from "./services/storage.service";
import { Track } from "./types/track.types";
import NewAudioForm from "./components/layout/NewAudioForm";
import TrackList from "./components/layout/TrackList";
import ConfirmModal from "./components/ui/ConfirmModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [modalVisible, setModalVisible] = useState(false);

  // 1. Añadimos el estado para controlar la carga (inicia en true)
  const [isLoading, setIsLoading] = useState(true);

  // Recuperar audios grabados en sesiones anteriores
  const loadTracks = async () => {
    setIsLoading(true); // 2. Indicamos que empieza la carga

    const storedTracks = await getTracks();

    // 3. Añadimos un pequeño retraso artificial para poder apreciar la animación
    // Si en el futuro conectas esto a una base de datos real (Firebase, AWS),
    // puedes quitar el setTimeout y dejar solo setTracks y setIsLoading.
    setTimeout(() => {
      setTracks(storedTracks);
      setIsLoading(false); // 4. Indicamos que termina la carga
    }, 800);
  };

  useEffect(() => {
    loadTracks();
  }, []);

  const handleDeleteTrack = async (id: string) => {
    await deleteTrack(id);
    loadTracks();
  };

  const handleConfirmDeleteAll = async () => {
    await clearAllTracks();
    setModalVisible(false);
    loadTracks();
  };

  return (
      <GestureHandlerRootView style={styles.container}>
        <NewAudioForm onTrackAdded={loadTracks} />

        <TrackList
            tracks={tracks}
            isLoading={isLoading} // ¡Ahora sí existe y funciona!
            onDeleteTrack={handleDeleteTrack}
            onDeleteAll={() => setModalVisible(true)}
        />

        <ConfirmModal
            visible={modalVisible}
            onConfirm={handleConfirmDeleteAll}
            onCancel={() => setModalVisible(false)}
        />
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 70 },
});