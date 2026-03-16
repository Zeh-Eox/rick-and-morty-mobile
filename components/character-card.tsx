import { useAuth } from "@/hooks/useAuth";
import { useFavorites } from "@/hooks/useFavorites";
import { Character } from "@/types/character";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AuthAlert from "./auth-alert";
import StatusBadge from "./status-badge";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const CharacterCard = ({
  character,
  onPress,
}: {
  character: Character;
  onPress?: () => void;
}) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(character.id);
  const { user } = useAuth();
  const [showAuthAlert, setShowAuthAlert] = useState(false);
  const router = useRouter();

  const notAuthAction = () => {
    setShowAuthAlert(true);
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.card,
          pressed && { transform: [{ scale: 0.97 }], opacity: 0.9 },
        ]}
        onPress={() =>
          router.push({
            pathname: "/(characters)/[id]",
            params: {
              id: character.id.toString(),
              name: character.name,
              image: character.image,
              status: character.status,
              species: character.species,
              gender: character.gender,
              origin: character.origin.name,
              location: character.location.name,
              episodes: character.episode.length.toString(),
            },
          })
        }
      >
        <Image source={{ uri: character.image }} style={styles.image} />

        {/* Bouton favori en overlay sur l'image */}
        <Pressable
          style={[styles.favoriteBtn, isFavorite && styles.favoriteBtnActive]}
          onPress={(e) => {
            e.stopPropagation();
            user ? toggleFavorite(character.id) : notAuthAction();
          }}
          hitSlop={8}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={14}
            color={isFavorite ? "#f12424" : "#94a3b8"}
          />
        </Pressable>

        <View style={styles.cardBody}>
          <Text style={styles.name} numberOfLines={1}>
            {character.name}
          </Text>
          <Text style={styles.gender}>{character.gender}</Text>
          <StatusBadge status={character.status} />
        </View>
      </Pressable>

      <AuthAlert
        visible={showAuthAlert}
        onClose={() => setShowAuthAlert(false)}
        onLogin={() => {
          setShowAuthAlert(false);
          router.push("/(auth)/login");
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#1e293b",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  image: {
    width: "100%",
    height: CARD_WIDTH,
  },
  favoriteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "rgba(15, 23, 42, 0.65)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  favoriteBtnActive: {
    backgroundColor: "rgba(248, 113, 113, 0.45)",
    borderColor: "rgba(248, 113, 113, 0.75)",
  },
  cardBody: {
    padding: 10,
    gap: 4,
  },
  name: {
    color: "#f1f5f9",
    fontWeight: "700",
    fontSize: 13,
  },
  gender: {
    color: "#64748b",
    fontSize: 11,
    fontWeight: "500",
  },
});

export default CharacterCard;
