import { useAuth } from "@/context/AuthContex";
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

export default function Signup() {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    // Name is not used in backend, but you can extend your logic to save it
    const success = await signup(email, password);
    if (success) {
      console.log("Signup successful");
      router.push("/login");
    } else {
      console.error("Signup failed");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        placeholderTextColor={theme.colors.text.secondary}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
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
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/login")}>
        <Text style={styles.link}>Já tem uma conta? Entrar</Text>
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
