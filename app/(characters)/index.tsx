import CharacterCard from "@/components/character-card";
import { usePagination } from "@/hooks/usePagination";
import { getCharacters } from "@/services/characters";
import { Character } from "@/types/character";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const {
    data: characters,
    loading,
    loadingMore,
    init,
    handleLoadMore,
  } = usePagination<Character>(getCharacters);

  useEffect(() => {
    init();
  }, []);

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator color="#818cf8" size="small" />
        <Text style={styles.footerText}>Chargement...</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Personnages</Text>
        <Text style={styles.subtitle}>{characters.length} trouvés</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} color="#818cf8" size="large" />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(c) => c.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <CharacterCard character={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
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
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "baseline",
    gap: 10,
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

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  footerText: { color: "#64748b", fontSize: 13 },
});

export default HomeScreen;
