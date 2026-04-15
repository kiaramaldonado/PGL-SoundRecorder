import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withSequence,
    withTiming,
    Easing,
    cancelAnimation,
} from "react-native-reanimated";
import { FontAwesome6 } from "@expo/vector-icons";
import { COLORS } from "../../theme/palette";

interface BouncingNoteLoaderProps {
    color?: string;
    size?: number;
    isEmpty?: boolean;
}

export default function BouncingNoteLoader({
                                               color = COLORS.primary,
                                               size = 35,
                                               isEmpty = false,
                                           }: BouncingNoteLoaderProps) {
    const translateY = useSharedValue(0);
    const scaleY = useSharedValue(1);
    const scaleX = useSharedValue(1);

    // Valores para la sombra
    const shadowScale = useSharedValue(1);
    const shadowOpacity = useSharedValue(0.4);

    useEffect(() => {
        // Si no hay audios, lo dejamos en el suelo
        if (isEmpty) {
            cancelAnimation(translateY);
            cancelAnimation(scaleY);
            cancelAnimation(scaleX);
            cancelAnimation(shadowScale);
            cancelAnimation(shadowOpacity);

            // Devolvemos la nota a su estado original suavemente
            translateY.value = withTiming(0, { duration: 300 });
            scaleY.value = withTiming(1, { duration: 300 });
            scaleX.value = withTiming(1, { duration: 300 });
            shadowScale.value = withTiming(1, { duration: 300 });
            shadowOpacity.value = withTiming(0.15, { duration: 300 });
            return; // Salimos del useEffect para que no se ejecute la animación
        }

        const jumpDuration = 350; // Tiempo en el aire
        const squashDuration = 150; // Tiempo aplastándose en el suelo

        // Animación del salto
        translateY.value = withRepeat(
            withSequence(
                withTiming(-40, { duration: jumpDuration, easing: Easing.out(Easing.cubic) }),
                withTiming(0, { duration: jumpDuration, easing: Easing.in(Easing.cubic) }),
                withTiming(0, { duration: squashDuration * 2 })
            ),
            -1,
            false
        );

        // Animación de "Squash and Stretch"
        scaleY.value = withRepeat(
            withSequence(
                withTiming(1.1, { duration: jumpDuration }),
                withTiming(1, { duration: jumpDuration }),
                withTiming(0.6, { duration: squashDuration }),
                withTiming(1, { duration: squashDuration })
            ),
            -1,
            false
        );

        scaleX.value = withRepeat(
            withSequence(
                withTiming(0.9, { duration: jumpDuration }),
                withTiming(1, { duration: jumpDuration }),
                withTiming(1.4, { duration: squashDuration }),
                withTiming(1, { duration: squashDuration })
            ),
            -1,
            false
        );

        // Animación de la sombra
        shadowScale.value = withRepeat(
            withSequence(
                withTiming(0.3, { duration: jumpDuration, easing: Easing.out(Easing.cubic) }),
                withTiming(1, { duration: jumpDuration, easing: Easing.in(Easing.cubic) }),
                withTiming(1.2, { duration: squashDuration }),
                withTiming(1, { duration: squashDuration })
            ),
            -1,
            false
        );

        shadowOpacity.value = withRepeat(
            withSequence(
                withTiming(0.1, { duration: jumpDuration }),
                withTiming(0.4, { duration: jumpDuration }),
                withTiming(0.5, { duration: squashDuration }),
                withTiming(0.4, { duration: squashDuration })
            ),
            -1,
            false
        );
    }, [isEmpty]);

    const animatedNoteStyle = useAnimatedStyle(() => ({
        transform: [
            { translateY: translateY.value },
            { scaleX: scaleX.value },
            { scaleY: scaleY.value },
        ],
    }));

    const animatedShadowStyle = useAnimatedStyle(() => ({
        transform: [{ scale: shadowScale.value }],
        opacity: shadowOpacity.value,
    }));

    const finalColor = isEmpty ? "#9CA3AF" : color;

    return (
        <View style={styles.wrapper}>
            <View style={styles.container}>
                {/* Icono animado */}
                <Animated.View style={animatedNoteStyle}>
                    <FontAwesome6 name="music" size={size} color={finalColor} />
                </Animated.View>

                {/* Sombra debajo del icono */}
                <Animated.View style={[styles.shadow, animatedShadowStyle]} />
            </View>

            {/* Texto que solo se muestra si está vacío */}
            {isEmpty && (
                <Text style={styles.emptyText}>
                    No hay audios registrados por el momento
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
    },
    container: {
        alignItems: "center",
        justifyContent: "center",
        height: 70,
    },
    shadow: {
        width: 25,
        height: 6,
        backgroundColor: COLORS.dark,
        borderRadius: 10,
        marginTop: 5,
    },
    emptyText: {
        color: "#6B7280",
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        paddingHorizontal: 20,
    },
});