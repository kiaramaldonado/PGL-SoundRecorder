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

  // Recuperar audios grabados en sesiones anteriores
  const loadTracks = async () => {
    const storedTracks = await getTracks();

    setTracks(storedTracks);
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
  container: { flex: 1, padding: 20, marginTop: 40 },
});
