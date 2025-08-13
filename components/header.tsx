import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, useWindowDimensions } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import Menu from './menu'; 

const logotipo = require('../assets/images/logotipo.png');

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { width } = useWindowDimensions();  // Usando a API de dimensões da janela
  const insets = useSafeAreaInsets();

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top || 20, flexDirection: width > 400 ? 'row' : 'column' }]}>
        <TouchableOpacity onPress={() => router.push('/perfil')}>
          <FontAwesome5 name="user-circle" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Image 
            source={logotipo} 
            style={[styles.logoImage, { width: width > 400 ? 300 : 200 }]}  // Ajuste do tamanho do logo
            resizeMode="contain" 
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
          <Feather name="menu" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#8A1B58',
    paddingHorizontal: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10000,
  },
  logoImage: {
    height: 30,
  },
});