import { STEPS } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

type Props = {
  onDone: () => void;
};

export default function Onboarding({ onDone }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const goNext = () => {
    if (currentIndex < STEPS.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      onDone();
    }
  };

  const isLast = currentIndex === STEPS.length - 1;

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Bouton passer */}
      <View style={styles.topBar}>
        {!isLast ? (
          <TouchableOpacity onPress={onDone} hitSlop={12}>
            <Text style={styles.skipText}>Passer</Text>
          </TouchableOpacity>
        ) : (
          <View />
        )}
        <Text style={styles.stepCounter}>
          {currentIndex + 1} / {STEPS.length}
        </Text>
      </View>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={STEPS}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            {/* Cercle décoratif */}
            <View style={[styles.glowCircle, { backgroundColor: item.glow }]} />

            {/* Emoji */}
            <View
              style={[
                styles.emojiBox,
                {
                  borderColor: item.color + "40",
                  backgroundColor: item.color + "15",
                },
              ]}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>

            {/* Texte */}
            <View style={styles.textBlock}>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={[styles.slideSubtitle, { color: item.color }]}>
                {item.subtitle}
              </Text>
              <Text style={styles.slideDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      {/* Bottom : dots + bouton */}
      <View style={styles.bottom}>
        {/* Dots */}
        <View style={styles.dots}>
          {STEPS.map((step, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex && [
                  styles.dotActive,
                  { backgroundColor: STEPS[currentIndex].color },
                ],
              ]}
            />
          ))}
        </View>

        {/* Bouton */}
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: STEPS[currentIndex].color },
          ]}
          onPress={goNext}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>
            {isLast ? "Commencer" : "Suivant"}
          </Text>
          <Ionicons
            name={isLast ? "rocket-outline" : "arrow-forward"}
            size={18}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  skipText: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "600",
  },
  stepCounter: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "600",
  },
  slide: {
    width,
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
    alignItems: "center",
    gap: 32,
  },
  glowCircle: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: 999,
    top: height * 0.05,
  },
  emojiBox: {
    width: 120,
    height: 120,
    borderRadius: 36,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 54,
  },
  textBlock: {
    alignItems: "center",
    gap: 10,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#64748b",
    textAlign: "center",
  },
  slideSubtitle: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  slideDescription: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginTop: 4,
  },
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    gap: 24,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#1e293b",
  },
  dotActive: {
    width: 24,
    height: 6,
    borderRadius: 999,
  },
  button: {
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
