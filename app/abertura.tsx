import React, { useEffect, useRef } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const logotipo2 = require('../assets/images/logotipo2.png'); // Logo redonda
const logotipo3 = require('../assets/images/logotipo3.png'); // Nome

export default function AberturaScreen() {
  const router = useRouter();
  const fadeLogo = useRef(new Animated.Value(0)).current;
  const fadeNome = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    //logo2 arrasando
    Animated.sequence([
      Animated.timing(fadeLogo, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeNome, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/login');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={logotipo2}
        style={[styles.logo, { opacity: fadeLogo }]}
        resizeMode="contain"
      />
      <Animated.Image
        source={logotipo3}
        style={[styles.nome, { opacity: fadeNome }]}
        resizeMode="contain"
      />
      <Text style={styles.footer}>FROM</Text>
      <Text style={styles.footer2}>Modally</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 300,
    height: 300,
  },
  nome: {
    width: 300,
    height: 100,
    marginBottom: 50,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    fontSize: 20,
    color: '#8A1B58',
  },
  footer2: {
    position: 'absolute',
    bottom: 20,
    fontSize: 18,
    color: '#8A1B58',
  },
});
