import CharacterCard from "@/components/character-card";
import Drawer from "@/components/global-drawer";
import { useFavoriteCharacters } from "@/hooks/useFavoriteCharacters";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const Favoris = () => {
  const router = useRouter();
  const { characters, isLoading, total } = useFavoriteCharacters();

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Favoris</Text>
          <Text style={styles.subtitle}>
            {total > 0
              ? `${total} personnage${total > 1 ? "s" : ""}`
              : "Tes personnages sauvegardés"}
          </Text>
        </View>

        <Drawer />
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} color="#818cf8" size="large" />
      ) : total === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>⭐</Text>
          <Text style={styles.emptyTitle}>Aucun favori pour le moment</Text>
          <Text style={styles.emptyDescription}>
            Explore les personnages et ajoute{"\n"}tes préférés ici.
          </Text>
          <View style={styles.emptyPill}>
            <Text
              style={styles.emptyPillText}
              onPress={() => router.push("/(characters)/tabs")}
            >
              → Aller aux personnages
            </Text>
          </View>
        </View>
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(c) => c.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CharacterCard character={item} />}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.5,
  },
  subtitle: { fontSize: 14, color: "#64748b", fontWeight: "500" },
  list: { paddingHorizontal: 16, paddingBottom: 120, gap: 12 },
  row: { gap: 12, justifyContent: "space-between" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 40,
    marginBottom: 80,
  },
  emptyEmoji: { fontSize: 56, marginBottom: 8 },
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
  emptyPillText: { color: "#818cf8", fontSize: 13, fontWeight: "600" },
});

export default Favoris;
