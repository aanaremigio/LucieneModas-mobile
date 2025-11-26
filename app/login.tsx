import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import * as Google from 'expo-auth-session/providers/google';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { auth } from '../firebaseConfig';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '398743093465-ef19fkuhu277v1kg4t4n204t5rp48c28.apps.googleusercontent.com',
    selectAccount: true,
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);

      signInWithCredential(auth, credential)
        .then(async (result) => {
          const user = result.user;

          if (user.email !== 'lucienem0d4s@gmail.com') {
            Alert.alert('Acesso negado', 'Esta conta Google não tem permissão.');
            return;
          }

          await AsyncStorage.setItem('@user', JSON.stringify(user));

          router.replace('/home');
        })
        .catch(() => {
          Alert.alert('Erro', 'Falha ao autenticar com o Google.');
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <View style={styles.topCircle} />

      <View style={styles.formContainer}>
        <Text style={styles.title}>Bem-vinda</Text>
        <Text style={styles.subtitle}>Entre com sua conta Google autorizada</Text>

        {/* Botão Google */}
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => promptAsync()}
          disabled={!request}
        >
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png',
            }}
            style={styles.googleLogo}
          />

          <Text style={styles.googleButtonText}>
            Entrar com Google
          </Text>
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
    alignItems: 'center'
  },
  title: {
    fontSize: width * 0.07,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: width * 0.045,
    color: '#fff',
    marginBottom: 30,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: height * 0.02,
    width: '100%',
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  googleLogo: {
    width: 28,
    height: 28,
    marginLeft: 12,
    marginRight: 15,
  },
  googleButtonText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
    marginRight: 35,
  },
});
