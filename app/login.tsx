import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { scale, verticalScale, moderateScale, fontScale } from '../coisasuteis/scale';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Parte superior com círculo */}
      <View style={styles.topCircle}>
        <Text style={styles.welcomeText}></Text>
      </View>

      {/* Parte inferior rosa com campos */}
      <View style={styles.formContainer}>
        <TextInput style={styles.input} placeholder="Nome" placeholderTextColor="#BEBEBE" />
        <TextInput style={styles.input} placeholder="E-mail" placeholderTextColor="#BEBEBE" />
        <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#BEBEBE" secureTextEntry />

        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/home')}>
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
    alignItems: 'center' 
  },
  topCircle: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
    backgroundColor: '#8A1B58',
    marginTop: height * 0.08, // mais para baixo proporcional à tela
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: height * 0.05,
  },
  welcomeText: { 
    fontSize: width * 0.06, 
    color: '#E2B24D', 
    fontWeight: 'bold', 
    transform: [{ rotate: '-15deg' }] 
  },
  formContainer: {
    backgroundColor: '#8A1B58',
    width: '100%',
    flex: 1,
    borderTopLeftRadius: width * 0.25,
    borderTopRightRadius: width * 0.25,
    paddingTop: height * 0.06,
    paddingHorizontal: width * 0.12,
    marginTop: height * 0.08, // corpo rosa mais baixo
  },
  input: { 
    backgroundColor: '#fff', 
    borderRadius: 10, 
    padding: height * 0.02, 
    marginBottom: height * 0.025, 
    fontSize: width * 0.04 
  },
  forgotPassword: { 
    alignItems: 'center', 
    marginBottom: height * 0.04 
  },
  forgotPasswordText: { 
    color: '#E2B24D', 
    fontWeight: 'bold', 
    fontSize: width * 0.045 
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
});
