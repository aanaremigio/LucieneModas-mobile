import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

const { apiUrl }: any = Constants.expoConfig?.extra ?? {};
const { width, height } = Dimensions.get("window");

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false); 

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

      await AsyncStorage.setItem("@user", JSON.stringify(data.usuario));

      setLoading(false);

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
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.topCircle} />
          <View style={styles.formContainer}>

            <TextInput
              placeholder="Email"
              placeholderTextColor="#BEBEBE"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={styles.senhaContainer}>
              <TextInput
                placeholder="Senha"
                placeholderTextColor="#BEBEBE"
                style={[styles.input, { flex: 1 }]}
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!mostrarSenha}
              />
              <TouchableOpacity
                onPress={() => setMostrarSenha(!mostrarSenha)}
                style={styles.iconeOlho}
              >
                <Ionicons
                  name={mostrarSenha ? "eye" : "eye-off"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={loginEmailSenha}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#8A1B58" />
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            {/* 
            <TouchableOpacity style={styles.googleBotao} onPress={loginGoogle}>
              <Image source={require("../../assets/images/google.png")} style={styles.googleIcon} />
              <Text style={styles.googleTexto}>Entrar com Google</Text>
            </TouchableOpacity>
            */}

          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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

  senhaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconeOlho: {
    position: "absolute",
    right: 10,
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

  link: {
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
