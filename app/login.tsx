import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const { apiUrl }: any = Constants.expoConfig?.extra ?? {};

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function loginEmailSenha() {
    if (!email || !senha) {
      return Alert.alert("Erro", "Preencha email e senha.");
    }

    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          senha,
        }),
      });

      const data = await response.json();
      console.log("STATUS:", response.status);
      console.log("RESPOSTA DA API:", data);


      if (!response.ok) {
        setLoading(false);
        return Alert.alert("Erro", data.mensagem || "Credenciais inválidas.");
      }

      // SALVAR USUÁRIO LOCALMENTE
      await AsyncStorage.setItem(
        "@user",
        JSON.stringify({
          id: data?.usuario?.id ?? null,
          nome: data?.usuario?.nome ?? null,
          email: data?.usuario?.email ?? email,
          token: data?.token ?? null,
        })
      );

      setLoading(false);

      // REDIRECIONAR COM SEGURANÇA
      setTimeout(() => {
        router.replace("/home");
      }, 150);
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
      {/* Círculo superior */}
      <View style={styles.topCircle} />

      {/* Área inferior do formulário */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#BEBEBE"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        {/* CAMPO DE SENHA COM BOTÃO DE MOSTRAR/OCULTAR */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Senha"
            placeholderTextColor="#BEBEBE"
            secureTextEntry={!showPassword}
            value={senha}
            onChangeText={setSenha}
          />

          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeButtonText}>
              {showPassword ? "🙈" : "👁️"}
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.loginButton}
          disabled={loading}
          onPress={loginEmailSenha}
        >
          {loading ? (
            <ActivityIndicator color="#8A1B58" />
          ) : (
            <Text style={styles.loginButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        {/*<TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>*/}

        {/* BOTÃO GOOGLE (mantido como estava) */}
        {/* 
        <TouchableOpacity style={styles.googleBotao} onPress={loginGoogle}>
          <Image source={require("../../assets/images/google.png")} style={styles.googleIcon} />
          <Text style={styles.googleTexto}>Entrar com Google</Text>
        </TouchableOpacity>
        */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  topCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: "#8A1B58",
    marginTop: height * 0.08,
  },

  formContainer: {
    backgroundColor: "#8A1B58",
    width: "100%",
    flex: 1,
    borderTopLeftRadius: width * 0.25,
    borderTopRightRadius: width * 0.25,
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.12,
    marginTop: height * 0.08,
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: height * 0.02,
    marginBottom: height * 0.03,
    fontSize: width * 0.04,
  },

  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingRight: 10,
    marginBottom: height * 0.03,
  },

  eyeButton: {
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  eyeButtonText: {
    fontSize: 22,
  },

  loginButton: {
    backgroundColor: "#E2B24D",
    padding: height * 0.02,
    borderRadius: 10,
    alignItems: "center",
  },

  loginButtonText: {
    fontWeight: "bold",
    fontSize: width * 0.05,
    color: "#8A1B58",
  },

  link: {
    marginTop: 15,
    textAlign: "center",
    fontSize: width * 0.038,
    color: "#E2B24D",
    fontWeight: "bold",
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
    marginTop: 30,
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