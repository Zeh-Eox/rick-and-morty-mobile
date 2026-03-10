import { Stack } from "expo-router";
import React from "react";

const LocationsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Lieux", headerShown: false }}
      />
    </Stack>
  );
};

export default LocationsLayout;
