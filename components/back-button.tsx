import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

const BackButton = () => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.back()}
      style={({ pressed }) => [
        styles.backButton,
        pressed && styles.backButtonPressed,
      ]}
    >
      <Ionicons name="arrow-back" size={20} color="#000000" />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(52, 70, 235, 0.63)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.2)",
    marginBottom: 16,
  },
  backButtonPressed: {
    backgroundColor: "rgba(129, 140, 248, 0.18)",
    borderColor: "rgba(129, 140, 248, 0.4)",
  },
});

export default BackButton;
