import "@/configs/amplify";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/auth";
import "@aws-amplify/react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";

export function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { user } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.navigate("/");
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContainer}
      scrollEnabled={false}
    >
      {/* Header */}
      <View style={styles.drawerHeader}>
        <View style={styles.drawerLogoBox}>
          <Text style={styles.drawerLogoEmoji}>🛸</Text>
        </View>
        <Text style={styles.drawerTitle}>Rick & Morty</Text>
        <Text style={styles.drawerSubtitle}>Explore l'univers</Text>
        <View style={styles.drawerDivider} />
      </View>

      {/* Items */}
      <DrawerItemList {...props} />

      <View style={styles.authContainer}>
        <View style={styles.drawerDivider} />

        {user ? (
          <View style={styles.userCard}>
            {/* Profile */}
            <TouchableOpacity
              style={styles.authButton}
              onPress={() => router.push("/(profile)")}
              activeOpacity={0.8}
            >
              <View style={styles.authButtonInner}>
                <Ionicons
                  name="person-circle-outline"
                  size={20}
                  color="#818cf8"
                />
                <Text style={styles.authButtonText}>Mon profil</Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </TouchableOpacity>

            {/* Logout */}
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => handleLogout()}
              activeOpacity={0.8}
            >
              <View style={styles.authButtonInner}>
                <Ionicons name="log-out-outline" size={20} color="#ef4444" />
                <Text style={styles.logoutText}>Se déconnecter</Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#475569" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.push("/(auth)/login")}
            activeOpacity={0.8}
          >
            <Ionicons name="log-in-outline" size={20} color="#fff" />
            <Text style={styles.loginText}>Se connecter</Text>
          </TouchableOpacity>
        )}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#0f172a",
    paddingTop: 0,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 24,
    gap: 6,
  },
  drawerLogoBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  drawerLogoEmoji: { fontSize: 26 },
  drawerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.5,
  },
  drawerSubtitle: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "500",
  },
  drawerDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
    marginTop: 20,
    marginHorizontal: -20,
  },
  authContainer: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  drawerFooter: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  drawerFooterText: {
    fontSize: 11,
    color: "#1e3a5f",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  userCard: {
    marginTop: 16,
    backgroundColor: "#1e293b",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(129,140,248,0.2)",
    gap: 10,
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 6,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#818cf8",
    justifyContent: "center",
    alignItems: "center",
  },

  userEmail: {
    color: "#e2e8f0",
    fontWeight: "600",
    fontSize: 13,
  },

  loginButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
    backgroundColor: "#818cf8",
    borderRadius: 12,
    paddingVertical: 14,
  },

  loginText: {
    color: "#fff",
    fontWeight: "700",
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.3)",
  },

  logoutText: {
    color: "#ef4444",
    fontWeight: "600",
  },

  authButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  authButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  authButtonText: {
    color: "#f1f5f9",
    fontWeight: "600",
  },
});
