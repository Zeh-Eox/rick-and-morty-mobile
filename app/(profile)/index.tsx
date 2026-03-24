import AvatarPreviewModal from "@/components/avatar-modal-preview";
import BackButton from "@/components/back-button";
import ChooseAvatar from "@/components/choose-avatar";
import { DeleteAccountModal } from "@/components/confirm-delete";
import { useAuth } from "@/hooks/useAuth";
import { useImagePicker } from "@/hooks/useImagePicker";
import { getUserFull } from "@/services/auth";
import { getColorFromString } from "@/utils/get-color-from-string";
import { getInitials } from "@/utils/get-initials";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const { user, deleteAccount, logout } = useAuth();
  const { avatar, pickImage, removeAvatar, loading } = useImagePicker();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [userAttributes, setUserAttributes] = useState<any>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  const handlePickImage = async (type: "camera" | "gallery") => {
    setAvatarLoading(true);
    try {
      await pickImage(type);
    } finally {
      setAvatarLoading(false);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!user) {
        setUserAttributes(null);
        router.navigate("../");
        return;
      }

      try {
        const data = await getUserFull();
        setUserAttributes(data);
      } catch (error) {
        console.log("Erreur user:", error);
      }
    };

    loadUser();
  }, [user]);

  const handleLogout = async () => {
    await removeAvatar();
    await logout();
  };

  const email = userAttributes?.email ?? "";
  const givenName = userAttributes?.given_name ?? "";
  const familyName = userAttributes?.family_name ?? "";
  const fullName =
    givenName || familyName ? `${givenName} ${familyName}`.trim() : "";
  const userId = user?.userId ?? "";
  const avatarColor = getColorFromString(email + userId);
  const initials = getInitials(email, givenName, familyName);

  return (
    <>
      <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
        <View style={styles.inner}>
          {/* Header */}
          <View style={styles.header}>
            <BackButton />
            <Text style={styles.title}>Mon profil</Text>
          </View>

          {/* Avatar + infos */}
          <View style={styles.profileCard}>
            <TouchableOpacity
              onPress={() => {
                if (avatar) {
                  setShowPreviewModal(true);
                } else {
                  setShowAvatarModal(true);
                }
              }}
              activeOpacity={0.85}
            >
              {avatar ? (
                <Image source={{ uri: avatar }} style={styles.avatar} />
              ) : avatarLoading ? (
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: "#1e293b",
                      borderColor: "rgba(255,255,255,0.1)",
                    },
                  ]}
                >
                  <ActivityIndicator size="small" color="#818cf8" />
                </View>
              ) : (
                <View
                  style={[
                    styles.avatar,
                    {
                      backgroundColor: avatarColor + "22",
                      borderColor: avatarColor + "55",
                    },
                  ]}
                >
                  <Text style={[styles.avatarInitials, { color: "#fff" }]}>
                    {initials}
                  </Text>
                </View>
              )}
              {/* Badge caméra */}
              <View style={styles.cameraTag}>
                <Ionicons name="camera" size={10} color="#fff" />
              </View>
            </TouchableOpacity>

            <View style={styles.profileInfo}>
              <Text style={styles.profileEmail}>{fullName || "—"}</Text>
              <View style={styles.badge}>
                <View style={styles.badgeDot} />
                <Text style={styles.badgeText}>Connecté</Text>
              </View>
            </View>
          </View>

          {/* Infos compte */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informations</Text>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <View style={styles.infoIconBox}>
                  <Ionicons name="mail-outline" size={16} color="#818cf8" />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>
                    {email || "—"}
                  </Text>
                </View>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <View style={styles.infoIconBox}>
                  <Ionicons
                    name="person-circle-outline"
                    size={16}
                    color="#818cf8"
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Nom complet</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>
                    {fullName || "—"}
                  </Text>
                </View>
              </View>
              <View style={styles.infoDivider} />
              <View style={styles.infoRow}>
                <View style={styles.infoIconBox}>
                  <Ionicons
                    name="finger-print-outline"
                    size={16}
                    color="#818cf8"
                  />
                </View>
                <View style={styles.infoText}>
                  <Text style={styles.infoLabel}>Identifiant</Text>
                  <Text style={styles.infoValue} numberOfLines={1}>
                    {user?.userId ?? "—"}
                  </Text>
                </View>
              </View>
            </View>
          </View>

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
          </TouchableOpacity>

          {/* Zone danger */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Zone dangereuse</Text>
            <DeleteAccountModal onConfirm={deleteAccount} />
          </View>
        </View>
      </SafeAreaView>

      <ChooseAvatar
        visible={showAvatarModal}
        onClose={() => setShowAvatarModal(false)}
        onPick={handlePickImage}
      />

      {avatar && (
        <AvatarPreviewModal
          visible={showPreviewModal}
          uri={avatar}
          onClose={() => setShowPreviewModal(false)}
          onDelete={async () => {
            await removeAvatar();
          }}
          onChange={() => {
            setShowPreviewModal(false);
            setShowAvatarModal(true);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  inner: { flex: 1, paddingHorizontal: 20, paddingTop: 16, gap: 28 },
  header: { gap: 8 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.5,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    backgroundColor: "#1e293b",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: { fontSize: 22, fontWeight: "800", letterSpacing: 1 },
  cameraTag: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 22,
    height: 22,
    borderRadius: 999,
    backgroundColor: "#818cf8",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#1e293b",
  },
  profileInfo: { gap: 6, flex: 1 },
  profileEmail: { color: "#f1f5f9", fontWeight: "700", fontSize: 15 },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "rgba(74, 222, 128, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(74, 222, 128, 0.25)",
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#4ade80",
  },
  badgeText: { color: "#4ade80", fontSize: 11, fontWeight: "700" },
  section: { gap: 12 },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  infoCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
  infoDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 16,
  },
  infoIconBox: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "rgba(129, 140, 248, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: { flex: 1, gap: 2 },
  infoLabel: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  infoValue: { fontSize: 14, color: "#94a3b8", fontWeight: "500" },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e293b",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "rgba(239,68,68,0.3)",
  },

  logoutText: {
    color: "#ef4444",
    fontWeight: "600",
  },

  authButtonInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default ProfileScreen;
