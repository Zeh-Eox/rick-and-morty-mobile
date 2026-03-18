import BackButton from "@/components/back-button";
import CharacterCard from "@/components/character-card";
import GlobalAlert from "@/components/global-alert";
import Drawer from "@/components/global-drawer";
import { useAuth } from "@/hooks/useAuth";
import { useCharacters } from "@/hooks/useCharacters";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useCharacters();
  const { user } = useAuth();
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const notAuthAction = () => {
    setShowAlert(true);
  };

  const characters = data?.pages.flatMap((page) => page.results) ?? [];

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  const renderFooter = () => {
    if (!isFetchingNextPage) return null;

    return (
      <View style={styles.footer}>
        <ActivityIndicator color="#818cf8" size="small" />
        <Text style={styles.footerText}>Chargement...</Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <View style={styles.header}>
          <View>
            <BackButton />

            <View>
              <View
                style={{
                  flexDirection: "row",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <Text style={styles.title}>Personnages</Text>
                <Text style={styles.subtitle}>{characters.length} trouvés</Text>
              </View>
              <Text style={styles.subsubtitle}>
                Cliquer sur chaque personnage pour voir les details
              </Text>
            </View>
          </View>

          <Drawer />
        </View>

        {isLoading ? (
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
            onEndReached={() => {
              if (!user) {
                notAuthAction();
                return;
              }
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.2}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            ListFooterComponent={renderFooter}
            windowSize={5}
          />
        )}
      </SafeAreaView>

      <GlobalAlert
        visible={showAlert}
        onClose={() => setShowAlert(false)}
        onLogin={() => {
          setShowAlert(false);
          router.push("/(auth)/login");
        }}
        message="Connecte-toi pour voir tous les personnages"
      />
    </>
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
  subsubtitle: {
    fontSize: 14,
    color: "#af2911",
    fontWeight: "500",
  },
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
