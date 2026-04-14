import { StyleSheet, View } from "react-native";
import TrackList from "./components/layout/TrackList";
import { COLORS } from "./theme/palette";
import NewAudioForm from "./components/layout/NewAudioForm";
import ConfirmModal from "./components/ui/ConfirmModal";
import { useState } from "react";

export default function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <NewAudioForm />
      <TrackList tracks={[]} onDeleteAll={() => setShowModal(true)} />
      <ConfirmModal
        visible={showModal}
        onConfirm={() => {
          console.log("Confirming deletion...");
        }}
        onCancel={() => setShowModal(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
