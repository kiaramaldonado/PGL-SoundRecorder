import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { View, Pressable, StyleSheet, Alert } from "react-native";
import { useAudioRecorder, RecordingPresets } from "expo-audio";
import * as AudioModule from "expo-audio";
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
import { COLORS } from "../../theme/palette";
import BouncingNoteLoader from "../ui/BouncingNoteLoader";

const BUTTON_SIZE = 200;

interface RecordButtonProps {
  onRecordFinish: (uri: string, durationStr: string) => void;
}

export default function RecordButton({ onRecordFinish }: RecordButtonProps) {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);

  const [isRecordingUI, setIsRecordingUI] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);

  const buttonScale = useSharedValue(1);
  const wave1Scale = useSharedValue(1);
  const wave1Opacity = useSharedValue(0);
  const wave2Scale = useSharedValue(1);
  const wave2Opacity = useSharedValue(0);

  const handlePress = async () => {
    if (isRecordingUI) {
      setIsRecordingUI(false);
      try {
        const durationMillis = Date.now() - startTime;
        const finalUri = audioRecorder.uri;

        await audioRecorder.stop();

        await AudioModule.setAudioModeAsync({
          allowsRecording: false,
          playsInSilentMode: true,
        });

        const totalSeconds = Math.floor(durationMillis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const durationStr = `${minutes}:${seconds.toString().padStart(2, "0")}`;

        if (finalUri) {
          onRecordFinish(finalUri, durationStr);
        } else {
          Alert.alert("Error", "No se pudo generar el archivo de audio.");
        }
      } catch (error) {
        console.error("Error al detener grabación:", error);
        setIsRecordingUI(true);
      }
    } else {
      try {
        let permission = await AudioModule.getRecordingPermissionsAsync();
        if (!permission.granted) {
          permission = await AudioModule.requestRecordingPermissionsAsync();
        }

        if (permission.granted) {
          await AudioModule.setAudioModeAsync({
            allowsRecording: true,
            playsInSilentMode: true,
          });

          await audioRecorder.prepareToRecordAsync();
          audioRecorder.record();

          setStartTime(Date.now());
          setIsRecordingUI(true);
        } else {
          Alert.alert(
              "Permiso denegado",
              "La aplicación necesita acceso al micrófono para grabar audios."
          );
        }
      } catch (error) {
        console.error("Error al iniciar grabación:", error);
      }
    }
  };

  useEffect(() => {
    if (isRecordingUI) {
      buttonScale.value = withRepeat(
          withSequence(
              withTiming(1.08, {
                duration: 500,
                easing: Easing.inOut(Easing.ease),
              }),
              withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) })
          ),
          -1,
          false
      );
      wave1Scale.value = withRepeat(
          withSequence(
              withTiming(1, { duration: 0 }),
              withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) })
          ),
          -1,
          false
      );
      wave1Opacity.value = withRepeat(
          withSequence(
              withTiming(0.6, { duration: 0 }),
              withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) })
          ),
          -1,
          false
      );
      wave2Scale.value = withDelay(
          1000,
          withRepeat(
              withSequence(
                  withTiming(1, { duration: 0 }),
                  withTiming(1.5, { duration: 2000, easing: Easing.out(Easing.ease) })
              ),
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
      cancelAnimation(buttonScale);
      cancelAnimation(wave1Scale);
      cancelAnimation(wave1Opacity);
      cancelAnimation(wave2Scale);
      cancelAnimation(wave2Opacity);
      buttonScale.value = withTiming(1, { duration: 300 });
      wave1Scale.value = withTiming(1, { duration: 300 });
      wave1Opacity.value = withTiming(0, { duration: 300 });
      wave2Scale.value = withTiming(1, { duration: 300 });
      wave2Opacity.value = withTiming(0, { duration: 300 });
    }
  }, [isRecordingUI]);

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
        <Animated.View style={[styles.wave, animatedWave1Style]} />
        <Animated.View style={[styles.wave, animatedWave2Style]} />
        <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
          <Pressable style={styles.button} onPress={handlePress}>
            {isRecordingUI ? (
                <BouncingNoteLoader size={60} color={COLORS.primary} />
            ) : (
                <FontAwesome6
                    name="microphone"
                    size={75}
                    color={COLORS.primary}
                />
            )}
          </Pressable>
        </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 50,
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