import { SEASON_COLORS } from "@/constants";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const getSeasonColor = (season: number | null) =>
  season ? (SEASON_COLORS[season] ?? "#94a3b8") : "#64748b";

const SeasonHeader = ({ season }: { season: number }) => {
  const color = getSeasonColor(season);

  return (
    <View style={styles.seasonHeader}>
      <View style={[styles.seasonLine, { backgroundColor: color }]} />
      <Text style={[styles.seasonTitle, { color }]}>Saison {season}</Text>
      <View style={[styles.seasonLine, { backgroundColor: color, flex: 1 }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  seasonHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginTop: 8,
    marginBottom: 4,
  },
  seasonLine: { height: 1.5, width: 16, borderRadius: 999 },
  seasonTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
});

export default SeasonHeader;
