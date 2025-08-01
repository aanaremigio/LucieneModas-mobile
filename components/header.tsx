import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const logotipo = require('../assets/images/logotipo.png');

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <FontAwesome5 name="user-circle" size={28} color="#fff" />
      <TouchableOpacity onPress={() => router.replace('/')}>
        <Image source={logotipo} style={styles.logoImage} resizeMode="contain" />
      </TouchableOpacity>
      <Feather name="menu" size={28} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#8A1B58',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoImage: {
    width: 300,
    height: 30,
  },
});