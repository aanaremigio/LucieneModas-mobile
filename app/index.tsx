import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      {/* Logo como texto */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>LUCIENE MODAS</Text>
      </View>

      {/* Tela de boas-vindas */}
      <Text style={styles.welcomeText}>Bem vinda, Luciene!</Text>

      {/* Formulário de Login */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#BEBEBE"
        />
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#BEBEBE"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#BEBEBE"
          secureTextEntry
        />
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logoText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8A1B58',
    letterSpacing: 2, 
  },
  welcomeText: {
    fontSize: 18,
    color: '#8A1B58',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#F1F1F1',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    width: '100%',
  },
  forgotPassword: {
    marginBottom: 20,
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FF9800',
  },
  loginButton: {
    backgroundColor: '#8A1B58',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});
