import BackButton from "@/components/back-button";
import Drawer from "@/components/global-drawer";
import LocationCard from "@/components/location-card";
import { useLocations } from "@/hooks/useLocations";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationsScreen = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useLocations();

  const locations = data?.pages.flatMap((page) => page.results) ?? [];

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" />;
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <BackButton />

          <View>
            <Text style={styles.title}>Lieux</Text>
            <Text style={styles.subtitle}>{locations.length} trouvés</Text>
          </View>
        </View>

        <Drawer />
      </View>

      {isLoading ? (
        <ActivityIndicator style={{ flex: 1 }} color="#818cf8" size="large" />
      ) : (
        <FlatList
          data={locations}
          keyExtractor={(l) => l.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <LocationCard location={item} />}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.footer}>
                <ActivityIndicator color="#818cf8" size="small" />
                <Text style={styles.footerText}>Chargement...</Text>
              </View>
            ) : null
          }
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

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  footerText: { color: "#64748b", fontSize: 13 },
});

export default LocationsScreen;
