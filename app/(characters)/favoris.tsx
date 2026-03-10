import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Favoris = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Favoris</Text>
        <Text style={styles.subtitle}>Tes personnages sauvegardés</Text>
      </View>

      {/* Empty state */}
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>⭐</Text>
        <Text style={styles.emptyTitle}>Aucun favori pour le moment</Text>
        <Text style={styles.emptyDescription}>
          Explore les personnages et ajoute{"\n"}tes préférés ici.
        </Text>
        <View style={styles.emptyPill}>
          <Text
            style={styles.emptyPillText}
            onPress={() => router.push("/(characters)")}
          >
            → Aller aux personnages
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 40,
    marginBottom: 80,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 8,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#f1f5f9",
    textAlign: "center",
    letterSpacing: -0.3,
  },
  emptyDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
  emptyPill: {
    marginTop: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: "#1e293b",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.35)",
  },
  emptyPillText: {
    color: "#818cf8",
    fontSize: 13,
    fontWeight: "600",
  },
});

export default Favoris;
