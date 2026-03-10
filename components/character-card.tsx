import { Character } from "@/types/character";
import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import StatusBadge from "./status-badge";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.name} numberOfLines={1}>
          {character.name}
        </Text>
        <Text style={styles.gender}>{character.gender}</Text>
        <StatusBadge status={character.status} />
      </View>
    </View>
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
  },
  image: { width: "100%", height: CARD_WIDTH },
  cardBody: { padding: 10, gap: 4 },
  name: { color: "#f1f5f9", fontWeight: "700", fontSize: 13 },
  gender: { color: "#64748b", fontSize: 11, fontWeight: "500" },
});

export default CharacterCard;
