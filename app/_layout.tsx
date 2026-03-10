import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Root Page", headerShown: false }}
      />
      <Stack.Screen name="(characters)" options={{ headerShown: false }} />
      <Stack.Screen name="(locations)" options={{ headerShown: false }} />
      <Stack.Screen name="(episodes)" options={{headerShown: false}} />
    </Stack>
  );
}
