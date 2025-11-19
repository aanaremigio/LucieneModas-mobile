import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, Dimensions, StyleSheet } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../firebaseConfig';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: '398743093465-ef19fkuhu277v1kg4t4n204t5rp48c28.apps.googleusercontent.com',
    webClientId: '398743093465-ef19fkuhu277v1kg4t4n204t5rp48c28.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
    redirectUri: AuthSession.makeRedirectUri(),
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(async (result) => {
          const user = result.user;
          await AsyncStorage.setItem('@user', JSON.stringify(user));
          router.replace('/questions');
        })
        .catch((error) => {
          console.error(error);
          Alert.alert('Erro', 'Falha ao autenticar com o Google.');
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      {/* Círculo superior */}
      <View style={styles.topCircle} />

      {/* Formulário rosa */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vindo(a)</Text>
        <Text style={styles.subtitle}>Entre com sua conta Google</Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Text style={styles.googleButtonText}>Entrar com Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
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
    alignItems: 'center',
  },
  title: { fontSize: width * 0.07, color: '#fff', fontWeight: 'bold', marginBottom: 5 },
  subtitle: { fontSize: width * 0.045, color: '#fff', marginBottom: 30, textAlign: 'center' },
  googleButton: {
    backgroundColor: '#fff',
    paddingVertical: height * 0.02,
    width: '100%',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  googleButtonText: { fontSize: 16, color: '#444', fontWeight: '600' },
});
