import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 
import Menu from './menu'; 

const logotipo = require('../assets/images/logotipo.png');

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const insets = useSafeAreaInsets(); // margens do dispositivo

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top || 20 }]}>
        <TouchableOpacity onPress={() => router.push('/perfil')}>
          <FontAwesome5 name="user-circle" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/')}>
          <Image source={logotipo} style={styles.logoImage} resizeMode="contain" />
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
