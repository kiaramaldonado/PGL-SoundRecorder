import { StyleSheet, View, Alert } from "react-native";
import React, { useState } from "react";
import * as FileSystem from "expo-file-system/legacy";

import TitleInput from "../ui/TitleInput";
import RecordButton from "../ui/RecordButton";
import { addTrack } from "../../services/storage.service";
import { Track } from "../../types/track.types";

interface NewAudioFormProps {
  onTrackAdded: () => void;
}

const NewAudioForm = ({ onTrackAdded }: NewAudioFormProps) => {
  const [title, setTitle] = useState("");

  const handleRecordFinish = async (uri: string, durationStr: string) => {
    try {
      if (!FileSystem.documentDirectory) {
        Alert.alert("Error", "El almacenamiento permanente no está disponible en este dispositivo.");
        return;
      }

      const fileName = `audio_${Date.now()}.m4a`;
      const permanentUri = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.moveAsync({
        from: uri,
        to: permanentUri,
      });

      const finalTitle =
          title.trim() !== ""
              ? title.trim()
              : `Audio de Voz - ${new Date().getTime().toString().slice(-5)}`;

      const newTrack: Track = {
        id: Date.now().toString(),
        title: finalTitle,
        date: new Date().toISOString(),
        duration: durationStr,
        uri: permanentUri,
      };

      await addTrack(newTrack);

      setTitle("");
      onTrackAdded();
      Alert.alert("¡Guardado!", "El audio se ha guardado correctamente.");
    } catch (error) {
      console.error("Error saving audio file:", error);
      Alert.alert("Error", "Hubo un problema al procesar el archivo de audio.");
    }
  };

  return (
      <View style={styles.container}>
        <TitleInput value={title} onChangeText={setTitle} />
        <RecordButton onRecordFinish={handleRecordFinish} />
      </View>
  );
};

export default NewAudioForm;

const styles = StyleSheet.create({
  container: { gap: 20 },
});