import Drawer from "@/components/global-drawer";
import { CATEGORIES } from "@/constants";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();

  return (
    <>
      <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Drawer />
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.eyebrow}>Bienvenue dans l'univers</Text>
            <Text style={styles.title}>Rick & Morty</Text>
            <View style={styles.divider} />
            <Text style={styles.subtitle}>
              Personnages, lieux, épisodes — tout l'univers à portée de main.
            </Text>
          </View>

          {/* Cards */}
          <View style={styles.cards}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.label}
                style={[styles.card, { shadowColor: category.glow }]}
                onPress={() => router.push(category.route as any)}
                activeOpacity={0.85}
              >
                {/* Accent bar */}
                <View
                  style={[
                    styles.accentBar,
                    { backgroundColor: category.color },
                  ]}
                />

                <View style={styles.cardContent}>
                  <View style={styles.cardText}>
                    <Text style={[styles.cardLabel, { color: category.color }]}>
                      {category.label}
                    </Text>
                    <Text style={styles.cardDescription}>
                      {category.description}
                    </Text>
                  </View>
                  <Text style={[styles.arrow, { color: category.color }]}>
                    →
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: 40,
  },
  scroll: {
    padding: 20,
    paddingBottom: 120,
    gap: 32,
  },
  header: {
    paddingTop: 16,
    gap: 8,
  },
  eyebrow: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: {
    fontSize: 40,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -1,
    lineHeight: 44,
  },
  divider: {
    width: 40,
    height: 3,
    backgroundColor: "#818cf8",
    borderRadius: 999,
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 22,
    marginTop: 4,
  },
  cards: {
    gap: 14,
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 8,
  },
  accentBar: {
    height: 3,
    width: "100%",
    opacity: 0.85,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  emoji: {
    fontSize: 36,
  },
  cardText: {
    flex: 1,
    gap: 4,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: -0.3,
  },
  cardDescription: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
  },
  arrow: {
    fontSize: 20,
    fontWeight: "700",
  },
});
