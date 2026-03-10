import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TypeBadge = ({ type }: { type: string }) => {
  return (
    <View style={styles.typeBadge}>
      <Text style={styles.typeBadgeText}>{type || "Unknown"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  typeBadge: {
    backgroundColor: "rgba(255,255,255,0.07)",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  typeBadgeText: { fontSize: 11, color: "#94a3b8", fontWeight: "600" },
});


export default TypeBadge;
