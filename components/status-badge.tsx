import React from "react";
import { StyleSheet, Text, View } from "react-native";

const StatusBadge = ({ status }: { status: string }) => {
  const color =
    status === "Alive" ? "#4ade80" : status === "Dead" ? "#f87171" : "#94a3b8";
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: color + "22", borderColor: color + "55" },
      ]}
    >
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={[styles.badgeText, { color }]}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    borderWidth: 1,
    gap: 4,
    marginTop: 2,
  },
  dot: { width: 5, height: 5, borderRadius: 999 },
  badgeText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.3 },
});

export default StatusBadge;
