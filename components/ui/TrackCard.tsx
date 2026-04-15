import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, Alert, LayoutChangeEvent } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
  useAnimatedProps,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import { useAudioPlayer } from "expo-audio";
import Svg, { Rect } from "react-native-svg";

import { COLORS } from "../../theme/palette";
import { formatRelativeDate } from "../../utils/formatter";

const ACTION_WIDTH = 80;

const AnimatedRect = Animated.createAnimatedComponent(Rect);

interface TrackCardProps {
  title: string;
  date: Date;
  duration: string;
  uri: string;
  onDelete?: () => void;
}

export default function TrackCard({
                                    title,
                                    date,
                                    duration,
                                    uri,
                                    onDelete,
                                  }: TrackCardProps) {
  const player = useAudioPlayer(uri);
  const [isPlaying, setIsPlaying] = useState(false);

  const [cardWidth, setCardWidth] = useState(0);

  const translateX = useSharedValue(0);
  const progress = useSharedValue(0);
  const borderOpacity = useSharedValue(1); // Controla el fade out del borde

  // --- MATEMÁTICAS DEL SVG ---
  const perimeter = cardWidth > 0
      ? 2 * (cardWidth - 68) + 2 * Math.PI * 32
      : 0;

  useEffect(() => {
    const interval = setInterval(() => {
      if (player) {
        if (isPlaying !== player.playing) {
          setIsPlaying(player.playing);
        }

        if (player.playing && player.duration) {
          const currentProgress = player.currentTime / player.duration;

          progress.value = withTiming(currentProgress, {
            duration: 250,
            easing: Easing.linear
          });

          // Cuando el audio está a punto de acabar iniciamos el Fade Out
          if (currentProgress > 0.99) {
            borderOpacity.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.ease) });
          }
        }
      }
    }, 200);

    return () => clearInterval(interval);
  }, [player, isPlaying]);

  const onLayout = (event: LayoutChangeEvent) => {
    setCardWidth(event.nativeEvent.layout.width);
  };

  const panGesture = Gesture.Pan()
      .activeOffsetX([-10, 10])
      .onUpdate((event) => {
        const maxTranslate = -ACTION_WIDTH * 1.1;
        translateX.value = Math.max(
            maxTranslate,
            Math.min(0, event.translationX)
        );
      })
      .onEnd((event) => {
        const shouldBeOpen =
            event.translationX < -ACTION_WIDTH / 2 || event.velocityX < -500;

        if (shouldBeOpen) {
          translateX.value = withSpring(-ACTION_WIDTH, { damping: 20, stiffness: 200, mass: 0.5 });
        } else {
          translateX.value = withSpring(0, { damping: 20, stiffness: 200, mass: 0.5 });
        }
      });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Propiedades animadas para dibujar el borde SVG
  const animatedRectProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: perimeter - progress.value * perimeter,
    };
  });

  const animatedOpacityStyle = useAnimatedStyle(() => ({
    opacity: borderOpacity.value,
  }));

  const handlePlayPause = () => {
    if (!uri) {
      Alert.alert("Error", "No hay archivo de audio asociado");
      return;
    }

    if (player.playing) {
      player.pause();
      setIsPlaying(false);
    } else {
      if (player.currentTime >= player.duration) {
        progress.value = 0;
        borderOpacity.value = withTiming(1, { duration: 300 }); // Fade in rápido
        player.seekTo(0);
      }
      player.play();
      setIsPlaying(true);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.actionContainer}>
          <Pressable style={styles.deleteButton} onPress={onDelete}>
            <FontAwesome6 name="trash" size={22} color={COLORS.white} />
          </Pressable>
        </View>

        <GestureDetector gesture={panGesture}>
          <Animated.View style={[styles.card, animatedCardStyle]} onLayout={onLayout}>

            {/* Capa base de la tarjeta */}
            <View style={styles.contentLayer}>
              <Pressable onPress={handlePlayPause} style={styles.playButton}>
                <FontAwesome6
                    name={isPlaying ? "pause" : "play"}
                    size={24}
                    color={COLORS.dark}
                    style={{ marginLeft: isPlaying ? 0 : 3 }}
                />
              </Pressable>

              <View style={styles.textContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={styles.subtitle} numberOfLines={1}>
                  {formatRelativeDate(date)}
                </Text>
              </View>

              <View style={styles.durationBadge}>
                <Text style={styles.durationText}>{duration}</Text>
              </View>
            </View>

            {/* Capa superpuesta con el SVG animado */}
            {cardWidth > 0 && (
                <Animated.View style={[StyleSheet.absoluteFill, animatedOpacityStyle]} pointerEvents="none">
                  <Svg width="100%" height="100%">
                    <AnimatedRect
                        x="2"
                        y="2"
                        width={cardWidth - 4}
                        height={68 - 4}
                        rx={32}
                        ry={32}
                        stroke={COLORS.dark}
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={perimeter}
                        animatedProps={animatedRectProps}
                        strokeLinecap="round"
                    />
                  </Svg>
                </Animated.View>
            )}

          </Animated.View>
        </GestureDetector>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 68,
    marginBottom: 10,
    marginHorizontal: 5,
    borderRadius: 34,
    backgroundColor: "transparent",
  },
  actionContainer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 12,
  },
  deleteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 34,
    overflow: "hidden", // Importante mantenerlo
  },
  contentLayer: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 3,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  subtitle: {
    color: COLORS.secondary,
    fontSize: 13,
    fontWeight: "400",
  },
  durationBadge: {
    position: "absolute",
    bottom: 0,
    right: 40,
    backgroundColor: "#588ECE",
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  durationText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "500",
  },
});