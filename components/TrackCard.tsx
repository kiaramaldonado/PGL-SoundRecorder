import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../theme/palette";
import { formatRelativeDate } from "../utils/formatter";

const ACTION_WIDTH = 80;

interface TrackCardProps {
  title: string;
  date: Date;
  duration: string;
  onDelete?: () => void;
  onPlay?: () => void;
}

export default function TrackCard({
  title,
  date,
  duration,
  onDelete,
  onPlay,
}: TrackCardProps) {
  const translateX = useSharedValue(0);

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
        translateX.value = withSpring(-ACTION_WIDTH, {
          damping: 20,
          stiffness: 200,
          mass: 0.5,
        });
      } else {
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
          mass: 0.5,
        });
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleDelete = () => {};

  return (
    <View style={styles.container}>
      {/* CAPA DE FONDO — botón eliminar */}
      <View style={styles.actionContainer}>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <FontAwesome6 name="trash" size={22} color={COLORS.white} />
        </Pressable>
      </View>

      {/* TARJETA DESLIZABLE */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, animatedCardStyle]}>
          {/* Botón Play */}
          <Pressable onPress={onPlay} style={styles.playButton}>
            <FontAwesome6 name="play" size={30} color={COLORS.dark} />
          </Pressable>

          {/* Textos */}
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={1}>
              {formatRelativeDate(date)}
            </Text>
          </View>

          {/* Badge de duración */}
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{duration}</Text>
          </View>
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
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    overflow: "visible",
  },

  playButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
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
