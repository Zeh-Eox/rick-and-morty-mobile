import { login } from "@/services/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
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

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Remplis tous les champs.");
      return;
    }
    try {
      setError("");
      setLoading(true);

      await login(email, password);
      router.back();
    } catch (e: any) {
      setError(e.message ?? "Une erreur est survenue.");
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
              <Text style={styles.logoEmoji}>🛸</Text>
            </View>
            <Text style={styles.title}>Bon retour !</Text>
          </View>
          <Text style={styles.subtitle}>
            Connecte-toi pour explorer l'univers Rick & Morty
          </Text>
        </View>

        {/* Formulaire */}
        <View style={styles.form}>
          {/* Email */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="mail-outline"
              size={18}
              color="#475569"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Adresse email"
              placeholderTextColor="#475569"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          {/* Mot de passe */}
          <View style={styles.inputWrapper}>
            <Ionicons
              name="lock-closed-outline"
              size={18}
              color="#475569"
              style={styles.inputIcon}
            />
            <TextInput
              placeholder="Mot de passe"
              placeholderTextColor="#475569"
              style={[styles.input, { flex: 1 }]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={8}
              style={styles.eyeBtn}
            >
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={18}
                color="#475569"
              />
            </TouchableOpacity>
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
            onPress={handleLogin}
            activeOpacity={0.85}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Se connecter</Text>
            )}
          </TouchableOpacity>

          {/* Séparateur */}
          <View style={styles.separator}>
            <View style={styles.separatorLine} />
            <Text style={styles.separatorText}>ou</Text>
            <View style={styles.separatorLine} />
          </View>

          {/* Lien inscription */}
          <TouchableOpacity
            style={styles.registerBtn}
            onPress={() => router.push("/(auth)/register")}
            activeOpacity={0.8}
          >
            <Text style={styles.registerText}>
              Pas encore de compte ?{" "}
              <Text style={styles.registerLink}>Créer un compte</Text>
            </Text>
          </TouchableOpacity>
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
  header: {
    gap: 10,
  },
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
  form: {
    gap: 14,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    color: "#f1f5f9",
    fontSize: 15,
  },
  eyeBtn: {
    paddingLeft: 10,
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
  errorText: {
    color: "#f87171",
    fontSize: 13,
    flex: 1,
  },
  button: {
    backgroundColor: "#818cf8",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 4,
    shadowColor: "#818cf8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },
  separator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginVertical: 4,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  separatorText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "500",
  },
  registerBtn: {
    alignItems: "center",
  },
  registerText: {
    color: "#64748b",
    fontSize: 14,
  },
  registerLink: {
    color: "#818cf8",
    fontWeight: "700",
  },
  welcomeMessage: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
});
