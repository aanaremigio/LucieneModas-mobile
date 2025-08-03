import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Menu from './menu'; // Importa o menu lateral

const logotipo = require('../assets/images/logotipo.png');

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Cabeçalho */}
      <View style={styles.header}>
        {/* Ícone de perfil */}
        <TouchableOpacity onPress={() => router.push('/perfil')}>
          <FontAwesome5 name="user-circle" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Logotipo central */}
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Image source={logotipo} style={styles.logoImage} resizeMode="contain" />
        </TouchableOpacity>

        {/* Ícone de menu (hambúrguer) */}
        <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
          <Feather name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu lateral */}
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
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
    zIndex: 10000,
  },
  logoImage: {
    width: 300,
    height: 30,
  },
});
