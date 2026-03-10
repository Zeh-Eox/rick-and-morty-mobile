import { Stack } from "expo-router";
import React from "react";

const EpisodesLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Épisodes", headerShown: false }}
      />
    </Stack>
  );
};

export default EpisodesLayout;
