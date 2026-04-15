import { StyleSheet, View } from "react-native";
import TrackList from "./components/layout/TrackList";
import { COLORS } from "./theme/palette";
import NewAudioForm from "./components/layout/NewAudioForm";
import ConfirmModal from "./components/ui/ConfirmModal";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <GestureHandlerRootView style={styles.container}>
      <NewAudioForm />
      <TrackList tracks={[]} onDeleteAll={() => setShowModal(true)} />
      <ConfirmModal
        visible={showModal}
        onConfirm={() => {
          console.log("Confirming deletion...");
        }}
        onCancel={() => setShowModal(false)}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingBottom: 50,
    paddingHorizontal: 20,
  },
});
