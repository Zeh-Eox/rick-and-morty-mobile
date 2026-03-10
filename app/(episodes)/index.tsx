import EpisodeCard from "@/components/episode-card";
import SeasonHeader from "@/components/season-header";
import { usePagination } from "@/hooks/usePagination";
import { getEpisodes } from "@/services/episodes";
import { Episode } from "@/types/episodes";
import { parseEpisodeCode } from "@/utils/parse-episode";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EpisodesScreen = () => {
  const {
    data: episodes,
    loading,
    loadingMore,
    init,
    handleLoadMore,
  } = usePagination<Episode>(getEpisodes);

  useEffect(() => {
    init();
  }, []);

  const dataWithHeaders = React.useMemo(() => {
    const items: (Episode | { _seasonHeader: number })[] = [];
    let lastSeason: number | null = null;
    for (const ep of episodes) {
      const { season } = parseEpisodeCode(ep.episode);
      if (season !== lastSeason) {
        items.push({ _seasonHeader: season! });
        lastSeason = season;
      }
      items.push(ep);
    }
    return items;
  }, [episodes]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Épisodes</Text>
        <Text style={styles.subtitle}>{episodes.length} trouvés</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} color="#818cf8" size="large" />
      ) : (
        <FlatList
          data={dataWithHeaders}
          keyExtractor={(item, index) =>
            "_seasonHeader" in item
              ? `season-${item._seasonHeader}`
              : item.id.toString()
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            "_seasonHeader" in item ? (
              <SeasonHeader season={item._seasonHeader} />
            ) : (
              <EpisodeCard episode={item as Episode} />
            )
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View style={styles.loaderFooter}>
                <ActivityIndicator color="#818cf8" size="small" />
                <Text style={styles.loaderText}>Chargement...</Text>
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
  list: { paddingHorizontal: 16, paddingBottom: 120, gap: 10 },

  loaderFooter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    gap: 8,
  },
  loaderText: { color: "#64748b", fontSize: 13 },
});

export default EpisodesScreen;
