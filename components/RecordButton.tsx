import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import { COLORS } from "../theme/palette";

const BUTTON_SIZE = 140;

export default function RecordButton() {
  const [isRecording, setIsRecording] = useState(false);

  // Valores compartidos (Shared Values) para las animaciones
  const buttonScale = useSharedValue(1);
  const wave1Scale = useSharedValue(1);
  const wave1Opacity = useSharedValue(0);
  const wave2Scale = useSharedValue(1);
  const wave2Opacity = useSharedValue(0);

  useEffect(() => {
    if (isRecording) {
      // Animación de "Latido" del botón principal
      buttonScale.value = withRepeat(
        withSequence(
          withTiming(1.08, {
            duration: 500,
            easing: Easing.inOut(Easing.ease),
          }),
          withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
        ),
        -1, // Infinito
        false
      );

      // Animación de la Primera Onda Expansiva
      wave1Scale.value = 1;
      wave1Scale.value = withRepeat(
        withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
        -1,
        false
      );

      wave1Opacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 0 }),
          withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) }) // Se desvanece
        ),
        -1,
        false
      );

      // Animación de la Segunda Onda Expansiva
      wave2Scale.value = 1;
      wave2Scale.value = withDelay(
        1000,
        withRepeat(
          withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) }),
          -1,
          false
        )
      );

      wave2Opacity.value = withDelay(
        1000,
        withRepeat(
          withSequence(
            withTiming(0.6, { duration: 0 }),
            withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) })
          ),
          -1,
          false
        )
      );
    } else {
      // Detener y resetear animaciones al pausar/detener grabación
      cancelAnimation(buttonScale);
      cancelAnimation(wave1Scale);
      cancelAnimation(wave1Opacity);
      cancelAnimation(wave2Scale);
      cancelAnimation(wave2Opacity);

      // Regresar los valores a su estado natural suavemente
      buttonScale.value = withTiming(1, { duration: 300 });
      wave1Scale.value = withTiming(1, { duration: 300 });
      wave1Opacity.value = withTiming(0, { duration: 300 });
      wave2Scale.value = withTiming(1, { duration: 300 });
      wave2Opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isRecording]);

  // Estilos animados vinculados a los SharedValues
  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const animatedWave1Style = useAnimatedStyle(() => ({
    transform: [{ scale: wave1Scale.value }],
    opacity: wave1Opacity.value,
  }));

  const animatedWave2Style = useAnimatedStyle(() => ({
    transform: [{ scale: wave2Scale.value }],
    opacity: wave2Opacity.value,
  }));

  return (
    <View style={styles.container}>
      {/* Círculos que forman las ondas expansivas de fondo */}
      <Animated.View style={[styles.wave, animatedWave1Style]} />
      <Animated.View style={[styles.wave, animatedWave2Style]} />

      {/* Botón Principal Interactivo */}
      <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
        <Pressable
          style={styles.button}
          onPress={() => setIsRecording(!isRecording)}
        >
          <FontAwesome6 name="microphone" size={70} color={COLORS.primary} />
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wave: {
    position: "absolute",
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: "#C5D3E8",
  },
  buttonContainer: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: BUTTON_SIZE / 2,
  },
});
