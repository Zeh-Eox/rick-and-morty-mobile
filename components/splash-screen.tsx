import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();

  // Valeurs animées
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(20)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const dotScale1 = useRef(new Animated.Value(0)).current;
  const dotScale2 = useRef(new Animated.Value(0)).current;
  const dotScale3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // 1. Logo apparaît
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      // 2. Titre glisse vers le haut
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(titleY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
      // 3. Sous-titre
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      // 4. Dots de chargement
      Animated.stagger(150, [
        Animated.spring(dotScale1, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.spring(dotScale2, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.spring(dotScale3, {
          toValue: 1,
          friction: 5,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Redirige vers l'app après 2.8s
    const timer = setTimeout(() => {
      router.replace("/");
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Cercles décoratifs en arrière-plan */}
      <View style={[styles.bgCircle, styles.bgCircleTop]} />
      <View style={[styles.bgCircle, styles.bgCircleBottom]} />

      <View style={styles.content}>
        {/* 👇 PLACEHOLDER IMAGE — remplace cette View par ton <Image> */}
        <Animated.View
          style={[
            styles.logoWrapper,
            { opacity: logoOpacity, transform: [{ scale: logoScale }] },
          ]}
        >
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoPlaceholderText}>🖼️</Text>
            <Text style={styles.logoPlaceholderHint}>Ton image ici</Text>
          </View>
        </Animated.View>

        {/* Titre */}
        <Animated.Text
          style={[
            styles.title,
            { opacity: titleOpacity, transform: [{ translateY: titleY }] },
          ]}
        >
          Rick & Morty
        </Animated.Text>

        {/* Sous-titre */}
        <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
          Explore l'univers
        </Animated.Text>
      </View>

      {/* Dots de chargement */}
      <View style={styles.dotsContainer}>
        {[dotScale1, dotScale2, dotScale3].map((dot, i) => (
          <Animated.View
            key={i}
            style={[
              styles.dot,
              i === 1 && styles.dotMiddle,
              { transform: [{ scale: dot }] },
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 60,
  },
  bgCircle: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.07,
    backgroundColor: "#818cf8",
  },
  bgCircleTop: {
    width: width * 0.9,
    height: width * 0.9,
    top: -width * 0.3,
    right: -width * 0.2,
  },
  bgCircleBottom: {
    width: width * 0.7,
    height: width * 0.7,
    bottom: -width * 0.2,
    left: -width * 0.2,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  logoWrapper: {
    marginBottom: 8,
  },
  // 👇 Remplace ce style + la View par ton <Image source={...} style={styles.logo} />
  logoPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 32,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  logoPlaceholderText: {
    fontSize: 40,
  },
  logoPlaceholderHint: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "500",
  },
  // 👆 Tout ce bloc est à supprimer quand tu ajoutes ton image
  title: {
    fontSize: 36,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "500",
    letterSpacing: 0.5,
  },
  dotsContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#334155",
  },
  dotMiddle: {
    backgroundColor: "#818cf8",
    width: 9,
    height: 9,
  },
});
