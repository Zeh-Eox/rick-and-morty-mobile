import LocationCard from "@/components/location-card";
import { usePagination } from "@/hooks/usePagination";
import { getLocations } from "@/services/locations";
import { Location } from "@/types/locations";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationsScreen = () => {
  const {
    data: locations,
    loading,
    loadingMore,
    init,
    handleLoadMore,
  } = usePagination<Location>(getLocations);

  useEffect(() => {
    init();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Lieux</Text>
        <Text style={styles.subtitle}>{locations.length} trouvés</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} color="#818cf8" size="large" />
      ) : (
        <FlatList
          data={locations}
          keyExtractor={(l) => l.id.toString()}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <LocationCard location={item} />}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
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
