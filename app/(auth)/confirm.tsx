import { confirmRegistration } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const CODE_LENGTH = 6;

export default function Confirm() {
  const router = useRouter();
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    // Gère le collage d'un code complet
    if (text.length === CODE_LENGTH) {
      const digits = text.slice(0, CODE_LENGTH).split("");
      setCode(digits);
      inputs.current[CODE_LENGTH - 1]?.focus();
      return;
    }
    const newCode = [...code];
    newCode[index] = text.slice(-1);
    setCode(newCode);
    if (text && index < CODE_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = async () => {
    const fullCode = code.join("");
    if (fullCode.length < CODE_LENGTH) {
      setError("Saisis les 6 chiffres du code.");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await confirmRegistration(email as string, fullCode);
      router.replace("/(auth)/login");
    } catch (e: any) {
      setError(e.message ?? "Code invalide ou expiré.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      {/* Cercles décoratifs */}
      <View style={[styles.bgCircle, styles.bgCircleTop]} />
      <View style={[styles.bgCircle, styles.bgCircleBottom]} />

      <View style={styles.inner}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.welcomeMessage}>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>📬</Text>
            </View>
            <Text style={styles.title}>Vérifie ton email</Text>
          </View>
          <Text style={styles.subtitle}>
            Un code à 6 chiffres a été envoyé à{"\n"}
            <Text style={styles.emailHighlight}>{email}</Text>
          </Text>
        </View>

        <View style={styles.form}>
          {/* Champs OTP */}
          <View style={styles.otpContainer}>
            {Array(CODE_LENGTH)
              .fill(0)
              .map((_, i) => (
                <TextInput
                  key={i}
                  ref={(ref) => {
                    inputs.current[i] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    code[i] ? styles.otpInputFilled : null,
                  ]}
                  value={code[i]}
                  onChangeText={(text) => handleChange(text, i)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, i)
                  }
                  keyboardType="number-pad"
                  maxLength={CODE_LENGTH}
                  selectTextOnFocus
                  caretHidden
                />
              ))}
          </View>

          {/* Erreur */}
          {error ? (
            <View style={styles.errorBox}>
              <Ionicons name="alert-circle-outline" size={15} color="#f87171" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Bouton */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleConfirm}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Confirmer le compte</Text>
            )}
          </TouchableOpacity>

          {/* Retour
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back-outline" size={15} color="#475569" />
            <Text style={styles.backText}>Retour à l'accueil</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
  },
  bgCircle: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.06,
    backgroundColor: "#818cf8",
  },
  bgCircleTop: {
    width: width * 0.9,
    height: width * 0.9,
    top: -width * 0.4,
    right: -width * 0.2,
  },
  bgCircleBottom: {
    width: width * 0.7,
    height: width * 0.7,
    bottom: -width * 0.3,
    left: -width * 0.2,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 40,
  },
  header: { gap: 10 },
  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "rgba(129, 140, 248, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  logoEmoji: { fontSize: 28 },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#f1f5f9",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    lineHeight: 22,
    textAlign: "center",
  },
  emailHighlight: {
    color: "#818cf8",
    fontWeight: "600",
  },
  form: { gap: 20 },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  otpInput: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: "#1e293b",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    color: "#f1f5f9",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
  },
  otpInputFilled: {
    borderColor: "rgba(129, 140, 248, 0.5)",
    backgroundColor: "rgba(129, 140, 248, 0.08)",
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(248, 113, 113, 0.1)",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(248, 113, 113, 0.2)",
  },
  errorText: { color: "#f87171", fontSize: 13, flex: 1 },
  button: {
    backgroundColor: "#818cf8",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#818cf8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  backText: { color: "#475569", fontSize: 14, fontWeight: "500" },
  welcomeMessage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
