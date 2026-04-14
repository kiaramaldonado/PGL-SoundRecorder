import { Modal, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../../theme/palette";

interface ConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({ visible, onConfirm, onCancel }: ConfirmModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Icono de advertencia gigante */}
          <FontAwesome6
            name="triangle-exclamation"
            size={90}
            color="#BA362B"
            style={styles.icon}
          />

          {/* Texto dinámico con parte en negrita */}
          <Text style={styles.messageText}>
            ¿Estás seguro de que quieres eliminar
            <Text style={styles.highlightedText}> todos los audios</Text>?
          </Text>

          {/* Botón Confirmar */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.confirmButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onConfirm}
          >
            <Text style={styles.confirmButtonText}>Confirmar</Text>
          </Pressable>

          {/* Botón Cancelar */}
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.cancelButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onCancel}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  modalContainer: {
    width: "100%",
    backgroundColor: "#E3E3E3",
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 25,
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    marginBottom: 20,
  },
  messageText: {
    fontSize: 18,
    color: COLORS.black,
    textAlign: "center",
    marginBottom: 35,
    lineHeight: 26,
  },
  highlightedText: {
    fontWeight: "bold",
  },
  button: {
    width: "100%",
    height: 55,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  confirmButton: {
    backgroundColor: "#BA362B",
  },
  cancelButton: {
    backgroundColor: "#A3A3A3",
    marginBottom: 0,
  },
  confirmButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "500",
  },
  cancelButtonText: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "500",
  },
});
