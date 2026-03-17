import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  onConfirm: () => void;
};

export function DeleteAccountModal({ onConfirm }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Bouton déclencheur */}
      <TouchableOpacity
        style={styles.triggerBtn}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="trash-outline" size={18} color="#f87171" />
        <Text style={styles.triggerText}>Supprimer le compte</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.container}>
            {/* Icône */}
            <View style={styles.iconBox}>
              <Ionicons name="warning-outline" size={28} color="#f87171" />
            </View>

            {/* Texte */}
            <View style={styles.textBlock}>
              <Text style={styles.title}>Supprimer le compte</Text>
              <Text style={styles.message}>
                Cette action est irréversible. Toutes tes données seront
                définitivement supprimées.
              </Text>
            </View>

            {/* Boutons */}
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setVisible(false)}
                activeOpacity={0.8}
              >
                <Text style={styles.cancelText}>Annuler</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => {
                  setVisible(false);
                  onConfirm();
                }}
                activeOpacity={0.85}
              >
                <Ionicons name="trash-outline" size={15} color="#fff" />
                <Text style={styles.deleteText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  triggerBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.25)",
    backgroundColor: "rgba(248, 113, 113, 0.08)",
  },
  triggerText: {
    color: "#f87171",
    fontWeight: "600",
    fontSize: 15,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  container: {
    width: "100%",
    backgroundColor: "#1e293b",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 20,
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "rgba(248, 113, 113, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  textBlock: {
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.3,
  },
  message: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },
  cancelText: {
    color: "#64748b",
    fontWeight: "600",
    fontSize: 15,
  },
  deleteBtn: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ef4444",
    gap: 6,
    shadowColor: "#ef4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
