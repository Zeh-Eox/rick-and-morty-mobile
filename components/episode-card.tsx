import { SEASON_COLORS } from "@/constants";
import { Episode } from "@/types/episodes";
import { parseEpisodeCode } from "@/utils/parse-episode";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const getSeasonColor = (season: number | null) =>
  season ? (SEASON_COLORS[season] ?? "#94a3b8") : "#64748b";

const EpisodeCard = ({ episode }: { episode: Episode }) => {
  const { season, ep } = parseEpisodeCode(episode.episode);
  const color = getSeasonColor(season);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={[styles.accentBar, { backgroundColor: color }]} />
      <View style={styles.cardContent}>
        {/* Top row */}
        <View style={styles.cardHeader}>
          <View
            style={[
              styles.seasonBadge,
              { backgroundColor: color + "22", borderColor: color + "55" },
            ]}
          >
            <Text style={[styles.seasonBadgeText, { color }]}>
              S{String(season).padStart(2, "0")}
            </Text>
          </View>
          <Text style={styles.episodeCode}>
            Épisode {String(ep).padStart(2, "0")}
          </Text>
          <Text style={styles.episodeId}>#{episode.id}</Text>
        </View>

        {/* Name */}
        <Text style={styles.episodeName}>{episode.name}</Text>

        {/* Footer */}
        <View style={styles.cardFooter}>
          <View style={styles.footerPill}>
            <Text style={styles.footerEmoji}>📅</Text>
            <Text style={styles.footerText}>{episode.air_date}</Text>
          </View>
          <View style={styles.footerPill}>
            <Text style={styles.footerEmoji}>🎭</Text>
            <Text style={styles.footerText}>
              {episode.characters.length} personnages
            </Text>
          </View>
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
    gap: 8,
  },
  seasonBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  seasonBadgeText: { fontSize: 11, fontWeight: "800", letterSpacing: 0.5 },
  episodeCode: { fontSize: 13, color: "#94a3b8", fontWeight: "600", flex: 1 },
  episodeId: { fontSize: 12, color: "#334155", fontWeight: "700" },
  episodeName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.3,
    lineHeight: 22,
  },
  cardFooter: { flexDirection: "row", gap: 10, marginTop: 2 },
  footerPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.05)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  footerEmoji: { fontSize: 11 },
  footerText: { fontSize: 12, color: "#64748b", fontWeight: "600" },
});

export default EpisodeCard;
