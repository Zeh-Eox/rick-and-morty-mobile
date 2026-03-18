import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onPick: (type: "camera" | "gallery") => void;
};

const ChooseAvatar = ({ visible, onClose, onPick }: Props) => {
  const handlePick = async (type: "camera" | "gallery") => {
    onClose();
    await onPick(type);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Photo de profil</Text>
          <Text style={styles.sheetSubtitle}>Choisis une source</Text>

          <View style={styles.sheetOptions}>
            <TouchableOpacity
              style={styles.sheetOption}
              onPress={() => handlePick("camera")}
              activeOpacity={0.8}
            >
              <View style={styles.sheetOptionIcon}>
                <Ionicons name="camera-outline" size={22} color="#818cf8" />
              </View>
              <View>
                <Text style={styles.sheetOptionLabel}>Caméra</Text>
                <Text style={styles.sheetOptionSub}>Prendre une photo</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.infoDivider} />

            <TouchableOpacity
              style={styles.sheetOption}
              onPress={() => handlePick("gallery")}
              activeOpacity={0.8}
            >
              <View style={styles.sheetOptionIcon}>
                <Ionicons name="images-outline" size={22} color="#818cf8" />
              </View>
              <View>
                <Text style={styles.sheetOptionLabel}>Galerie</Text>
                <Text style={styles.sheetOptionSub}>
                  Choisir une image existante
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.sheetCancel}
            onPress={onClose}
            activeOpacity={0.8}
          >
            <Text style={styles.sheetCancelText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: "#1e293b",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 40,
    gap: 16,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: "rgba(255,255,255,0.06)",
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 999,
    backgroundColor: "#334155",
    alignSelf: "center",
    marginBottom: 4,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.3,
  },
  sheetSubtitle: { fontSize: 13, color: "#64748b", marginTop: -8 },
  sheetOptions: {
    backgroundColor: "#0f172a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  sheetOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    padding: 16,
  },
  sheetOptionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(129, 140, 248, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  sheetOptionLabel: { fontSize: 15, fontWeight: "700", color: "#f1f5f9" },
  sheetOptionSub: { fontSize: 12, color: "#64748b", marginTop: 2 },
  sheetCancel: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  sheetCancelText: { color: "#64748b", fontWeight: "600", fontSize: 15 },
  infoDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    marginHorizontal: 16,
  },
});

export default ChooseAvatar;
