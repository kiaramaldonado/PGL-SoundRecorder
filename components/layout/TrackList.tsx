import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../../theme/palette";
import TrackCard from "../ui/TrackCard";
import { Track } from "../../types/track.types";
import BouncingNoteLoader from "../ui/BouncingNoteLoader"; // <-- Importamos tu nuevo loader animado

interface TrackListProps {
  tracks: Track[];
  isLoading?: boolean;
  onDeleteAll?: () => void;
  onDeleteTrack?: (id: string) => void;
}

const TrackList = ({ tracks, isLoading = false, onDeleteAll, onDeleteTrack }: TrackListProps) => {
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>AUDIOS GRABADOS</Text>
          {!isLoading && tracks.length > 0 && (
              <Pressable style={styles.deleteButton} onPress={onDeleteAll}>
                <FontAwesome6 name="trash" size={22} color={COLORS.white} />
              </Pressable>
          )}
        </View>

        <View style={styles.content}>
          {isLoading ? (
              // Cargando (animación saltando)
              <View style={styles.loaderContainer}>
                <BouncingNoteLoader size={50} color={COLORS.dark} />
                <Text style={styles.loadingText}>Cargando tus grabaciones...</Text>
              </View>
          ) : tracks.length === 0 ? (
              // Vacío (animación detenida y en gris)
              <View style={styles.loaderContainer}>
                <BouncingNoteLoader size={50} isEmpty={true} />
              </View>
          ) : (
              // Lista con datos
              <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.scrollContent}
              >
                {tracks.map((track) => (
                    <TrackCard
                        key={track.id}
                        title={track.title}
                        date={new Date(track.date)}
                        duration={track.duration}
                        uri={track.uri}
                        onDelete={() => onDeleteTrack && onDeleteTrack(track.id)}
                    />
                ))}
              </ScrollView>
          )}
        </View>
      </View>
  );
};

export default TrackList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: COLORS.secondary,
    padding: 20,
    borderRadius: 40,
    overflow: "hidden",
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: COLORS.dark,
    borderRadius: 50,
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 22,
    color: COLORS.white,
  },
  deleteButton: {
    width: 42,
    height: 42,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    position: "absolute",
    right: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    marginTop: 10,
  },
  scrollContent: {
    width: "100%",
    paddingBottom: 10,
    alignItems: "center",
  },
  // Nuevos estilos para centrar el loader y su texto
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  loadingText: {
    color: COLORS.dark,
    fontSize: 16,
    fontWeight: "500",
    opacity: 0.8,
  },
});