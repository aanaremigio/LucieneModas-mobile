import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = () => {
    if (email.trim() === '') {
      Alert.alert('Atenção', 'Por favor, insira seu e-mail');
      return;
    }

    if (email.trim().toLowerCase() === 'luciene.modas@gmail.com') {
      router.push('/home');
    } else {
      Alert.alert('Acesso negado', 'E-mail incorreto.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Parte superior com círculo */}
      <View style={styles.topCircle} />

      {/* Parte inferior rosa com campo de e-mail */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#BEBEBE"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
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
});
