import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

const { apiUrl }: any = Constants.expoConfig?.extra ?? {};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function loginEmailSenha() {
    if (!email || !senha) {
      return Alert.alert("Erro", "Preencha email e senha.");
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        return Alert.alert("Erro", data.mensagem || "Credenciais inválidas.");
      }

      // SALVAR USUÁRIO LOCALMENTE
      await AsyncStorage.setItem("@user", JSON.stringify(data.usuario));

      setLoading(false);

      // REDIRECIONAR APÓS LOGIN
      router.replace("/home");
    } catch (error) {
      console.log("Erro ao autenticar:", error);
      setLoading(false);
      Alert.alert("Erro", "Não foi possível conectar ao servidor.");
    }
  }

  // async function loginGoogle() {
  //   try {
  //     const authRequest = new GoogleAuthProvider();
  //     const result = await signInWithPopup(auth, authRequest);
  //
  //     const userData = {
  //       nome: result.user.displayName,
  //       email: result.user.email,
  //       foto: result.user.photoURL,
  //     };
  //
  //     await AsyncStorage.setItem("@user", JSON.stringify(userData));
  //
  //     router.replace("/home");
  //   } catch (error) {
  //     console.log(error);
  //     Alert.alert("Erro", "Não foi possível fazer login com Google.");
  //   }
  // }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.titulo}>Bem-vindo</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#999"
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={loginEmailSenha}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator size="small" />
        ) : (
          <Text style={styles.botaoTexto}>Entrar</Text>
        )}
      </TouchableOpacity>

      {/* BOTÃO GOOGLE (deixado exatamente como estava) */}

      {/* 
      <TouchableOpacity style={styles.googleBotao} onPress={loginGoogle}>
        <Image source={require("../../assets/images/google.png")} style={styles.googleIcon} />
        <Text style={styles.googleTexto}>Entrar com Google</Text>
      </TouchableOpacity>
      */}

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: "contain",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 48,
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    paddingLeft: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    width: "100%",
    height: 48,
    backgroundColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },
  link: {
    marginTop: 10,
    color: "#007bff",
    fontSize: 15,
  },
  googleBotao: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 25,
    backgroundColor: "#fff",
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleTexto: {
    fontSize: 16,
    color: "#555",
  },
});
