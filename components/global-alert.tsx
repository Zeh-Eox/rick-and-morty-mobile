import { Ionicons } from "@expo/vector-icons";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onLogin: () => void;
  message: string;
};

export default function GlobalAlert({
  visible,
  onClose,
  onLogin,
  message,
}: Props) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Icône */}
          <View style={styles.iconBox}>
            <Ionicons name="lock-closed" size={28} color="#818cf8" />
          </View>

          {/* Texte */}
          <View style={styles.textBlock}>
            <Text style={styles.title}>Connexion requise</Text>
            <Text style={styles.message}>{message}</Text>
          </View>

          {/* Boutons */}
          <View style={styles.buttons}>
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginBtn}
              onPress={onLogin}
              activeOpacity={0.85}
            >
              <Ionicons name="person-outline" size={15} color="#fff" />
              <Text style={styles.loginText}>Se connecter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    backgroundColor: "rgba(129, 140, 248, 0.1)",
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.25)",
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
  loginBtn: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#818cf8",
    gap: 6,
    shadowColor: "#818cf8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  loginText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
