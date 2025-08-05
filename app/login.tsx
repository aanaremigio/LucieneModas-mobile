import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topCircle}>
        <Text style={styles.welcomeText}></Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#BEBEBE" />
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#BEBEBE" />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#BEBEBE" secureTextEntry />
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/home')}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  topCircle: {
    width: 300,
    height: 300,
    borderRadius: 155,
    backgroundColor: '#8A1B58',
    marginTop: 80,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  welcomeText: { fontSize: 24, color: '#E2B24D', fontWeight: 'bold', transform: [{ rotate: '-15deg' }] },
  formContainer: {
    backgroundColor: '#8A1B58',
    width: '100%',
    flex: 1,
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
    paddingTop: 65,
    paddingHorizontal: 50,
    marginTop: 65,
  },
  input: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 20, fontSize: 16 },
  forgotPassword: { alignItems: 'center', marginBottom: 30 },
  forgotPasswordText: { color: '#E2B24D', fontWeight: 'bold', fontSize: 16 },
  loginButton: { backgroundColor: '#E2B24D', padding: 15, borderRadius: 10, alignItems: 'center' },
  loginButtonText: { fontWeight: 'bold', fontSize: 18, color: '#8A1B58' },
});
