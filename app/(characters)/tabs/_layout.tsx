import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";

const CharactersLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 999,
          height: 60,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          borderTopWidth: 0,
          margin: 16,
          paddingTop: 5,
          borderWidth: 1,
          borderColor: "transparent",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.3,
          shadowRadius: 24,
          elevation: 20,
          overflow: "visible",
        },
        tabBarBackground: () => (
          <BlurView
            intensity={60}
            tint="dark"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: 999,
              overflow: "hidden",
            }}
          />
        ),
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(255, 255, 255, 0.45)",
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Liste des personnages",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              color={color}
              size={size}
              name={focused ? "person" : "person-outline"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favoris"
        options={{
          title: "Personnages Favoris",
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              color={color}
              size={size}
              name={focused ? "star" : "star-outline"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default CharactersLayout;
