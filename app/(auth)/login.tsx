import { useAuth } from "@/context/AuthContex";
import { useUser } from "@/context/UserContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import theme from "../../design-system/src";

export default function Login() {
  const { login } = useAuth();
  const { fetchUserData } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async () => {
    console.log("Login button pressed");
    try {
      const success = await login(email, password);
      if (success) {
        console.log("Login successful, waiting for UID then navigating...");
        // Wait a bit longer for UID to be available, then navigate and fetch data
        setTimeout(async () => {
          router.push("/(tabs)/production");
          // Give a bit more time for navigation to complete, then fetch data
          setTimeout(() => {
            fetchUserData?.();
          }, 500);
        }, 1000);
      } else {
        console.error("Login failed - credentials invalid");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.text.secondary}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={theme.colors.text.secondary}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/signup")}>
        <Text style={styles.link}>Não tem uma conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.default,
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing["6"],
  },
  title: {
    fontSize: theme.fontSize["2xl"],
    fontFamily: theme.fontFamily.sans,
    color: theme.colors.primary,
    marginBottom: theme.spacing["8"],
  },
  input: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: theme.spacing["4"],
    fontSize: theme.fontSize.base,
    color: theme.colors.text.default,
    marginBottom: theme.spacing["4"],
    borderWidth: 1,
    borderColor: theme.colors.primaryLight,
  },
  button: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    padding: theme.spacing["4"],
    alignItems: "center",
    marginBottom: theme.spacing["4"],
  },
  buttonText: {
    color: "#fff",
    fontSize: theme.fontSize.lg,
    fontFamily: theme.fontFamily.sans,
    fontWeight: "bold",
  },
  link: {
    color: theme.colors.secondary,
    fontSize: theme.fontSize.base,
    textDecorationLine: "underline",
    marginTop: theme.spacing["2"],
    fontFamily: theme.fontFamily.sans,
  },
});
