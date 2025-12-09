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
  View 
} from "react-native";

const { width, height } = Dimensions.get('window');
const { apiUrl }: any = Constants.expoConfig?.extra ?? {};

export default function LoginScreen() {
  const router = useRouter();

  // Estados de email, senha e carregamento
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  // Função de login via email e senha
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

  return (
    <View style={styles.container}>
      {/* Parte superior com círculo */}
      <View style={styles.topCircle} />

      {/* Parte inferior vinho com formulário */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#BEBEBE"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#BEBEBE"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

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

        {/* BOTÃO DE CRIAÇÃO DE CONTA (comentado) */}
        {/*
        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Criar conta</Text>
        </TouchableOpacity>
        */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  topCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: '#8A1B58',
    marginTop: height * 0.08,
  },
  formContainer: {
    backgroundColor: '#8A1B58',
    width: '100%',
    flex: 1,
    borderTopLeftRadius: width * 0.25,
    borderTopRightRadius: width * 0.25,
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.12,
    marginTop: height * 0.08,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: height * 0.02,
    marginBottom: height * 0.03,
    fontSize: width * 0.04
  },
  loginButton: {
    backgroundColor: '#E2B24D',
    padding: height * 0.02,
    borderRadius: 10,
    alignItems: 'center'
  },
  loginButtonText: {
    fontWeight: 'bold',
    fontSize: width * 0.05,
    color: '#8A1B58'
  },
  link: {
    marginTop: 10,
    color: "#007bff",
    fontSize: 15,
  },
});
