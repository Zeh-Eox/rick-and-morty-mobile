import BackButton from "@/components/back-button";
import StatusBadge from "@/components/status-badge";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const IMAGE_HEIGHT = width * 1.1;

type InfoRowProps = { icon: string; label: string; value: string };

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconBox}>
      <Ionicons name={icon as any} size={16} color="#818cf8" />
    </View>
    <View style={styles.infoText}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

export default function CharacterDetails() {
  const {
    id,
    name,
    image,
    status,
    species,
    gender,
    origin,
    location,
    episodes,
  } = useLocalSearchParams<{
    id: string;
    name: string;
    image: string;
    status: string;
    species: string;
    gender: string;
    origin: string;
    location: string;
    episodes: string;
  }>();

  const episodeCount = episodes ? parseInt(episodes) : 0;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Image hero avec gradient */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(15,23,42,0.7)", "#0f172a"]}
              style={styles.gradient}
            />
            {/* Back button superposé */}
            <View style={styles.backButtonWrapper}>
              <BackButton />
            </View>
          </ImageBackground>
        </View>

        {/* Contenu */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <StatusBadge status={status ?? ""} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.species}>{species}</Text>
          </View>

          {/* Stats rapides */}
          <View style={styles.statsRow}>
            {[
              { label: "Genre", value: gender ?? "—" },
              { label: "Espèce", value: species ?? "—" },
              { label: "Épisodes", value: String(episodeCount) },
            ].map((stat) => (
              <View key={stat.label} style={styles.statBox}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          {/* Infos détaillées */}
          <View style={styles.infoCard}>
            <Text style={styles.sectionTitle}>Informations</Text>
            <InfoRow
              icon="planet-outline"
              label="Origine"
              value={origin ?? "Inconnue"}
            />
            <View style={styles.separator} />
            <InfoRow
              icon="location-outline"
              label="Dernière localisation"
              value={location ?? "Inconnue"}
            />
            <View style={styles.separator} />
            <InfoRow
              icon="film-outline"
              label="Apparitions"
              value={`${episodeCount} épisode${episodeCount > 1 ? "s" : ""}`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  scroll: {
    paddingBottom: 60,
  },
  imageContainer: {
    width: "100%",
    height: IMAGE_HEIGHT,
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: IMAGE_HEIGHT * 0.6,
  },
  backButtonWrapper: {
    position: "absolute",
    top: 16,
    left: 16,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: -32,
    gap: 20,
  },
  header: {
    gap: 6,
  },
  name: {
    fontSize: 32,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.5,
    lineHeight: 36,
  },
  species: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "500",
  },
  statsRow: {
    flexDirection: "row",
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#1e293b",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  statValue: {
    fontSize: 15,
    fontWeight: "700",
    color: "#f1f5f9",
  },
  statLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "500",
  },
  infoCard: {
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 10,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "rgba(129, 140, 248, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    gap: 2,
  },
  infoLabel: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    color: "#f1f5f9",
    fontWeight: "600",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.04)",
    marginLeft: 50,
  },
});
