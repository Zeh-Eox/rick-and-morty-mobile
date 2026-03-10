import { DIMENSION_COLORS } from "@/constants";
import { Location } from "@/types/locations";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TypeBadge from "./type-badge";

const getDimensionColor = (dimension: string) =>
  DIMENSION_COLORS[dimension] ?? "#4ECDC4";

const LocationCard = ({ location }: { location: Location }) => {
  const color = getDimensionColor(location.dimension);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={[styles.accentBar, { backgroundColor: color }]} />
      <View style={styles.cardContent}>
        {/* Top row */}
        <View style={styles.cardHeader}>
          <Text style={styles.locationName} numberOfLines={1}>
            {location.name}
          </Text>
          <TypeBadge type={location.type} />
        </View>

        {/* Dimension */}
        <View style={styles.dimensionRow}>
          <Text style={styles.metaLabel}>Dimension</Text>
          <Text style={[styles.dimensionValue, { color }]} numberOfLines={1}>
            {location.dimension || "Unknown"}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.residentsPill}>
            <Text style={styles.residentsEmoji}>👥</Text>
            <Text style={styles.residentsCount}>
              {location.residents.length} résidents
            </Text>
          </View>
          <Text style={styles.locationId}>#{location.id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  accentBar: { height: 3, width: "100%" },
  cardContent: { padding: 16, gap: 10 },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  locationName: {
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.3,
  },

  dimensionRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  metaLabel: { fontSize: 12, color: "#475569", fontWeight: "500" },
  dimensionValue: { fontSize: 13, fontWeight: "700", flex: 1 },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  residentsPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  residentsEmoji: { fontSize: 12 },
  residentsCount: { fontSize: 12, color: "#64748b", fontWeight: "600" },
  locationId: { fontSize: 12, color: "#334155", fontWeight: "700" },
});

export default LocationCard;
