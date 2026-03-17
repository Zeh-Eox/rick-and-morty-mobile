import { CustomDrawerContent } from "@/components/custom-drawer";
import Onboarding from "@/components/onboarding";
import "@/configs/amplify";
import { MENU_ITEMS } from "@/constants";
import { useOnboarding } from "@/hooks/useOnboarding";
import { queryClient } from "@/services/query-client";
import "@aws-amplify/react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import { Drawer } from "expo-router/drawer";
import "react-native-get-random-values";

export default function RootLayout() {
  const { isLoading, onboardingDone, completeOnboarding } = useOnboarding();

  if (isLoading) return null;

  if (!onboardingDone) {
    return <Onboarding onDone={completeOnboarding} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#0f172a",
            width: 280,
            borderRightWidth: 1,
            borderRightColor: "rgba(255,255,255,0.06)",
          },
          drawerActiveTintColor: "#818cf8",
          drawerInactiveTintColor: "#64748b",
          drawerActiveBackgroundColor: "rgba(129, 140, 248, 0.1)",
          drawerItemStyle: {
            borderRadius: 12,
            marginHorizontal: 8,
            marginVertical: 2,
          },
          drawerLabelStyle: {
            fontSize: 15,
            fontWeight: "600",
            letterSpacing: 0.2,
          },
        }}
      >
        {MENU_ITEMS.map((item) => (
          <Drawer.Screen
            key={item.name}
            name={item.name}
            options={{
              title: item.title,
            }}
          />
        ))}

        {/* routes auth cachées */}
        <Drawer.Screen
          name="(auth)/login"
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="(auth)/register"
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="(auth)/confirm"
          options={{ drawerItemStyle: { display: "none" } }}
        />
        <Drawer.Screen
          name="(profile)/index"
          options={{ drawerItemStyle: { display: "none" } }}
        />
      </Drawer>
    </QueryClientProvider>
  );
}
