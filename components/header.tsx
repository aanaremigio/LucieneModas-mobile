import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Menu from './menu';
import { scale, verticalScale, moderateScale } from '../coisasuteis/scale';

const logotipo = require('../assets/images/logotipo.png');

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <>
      <View
        style={[
          styles.header,
          {
            paddingTop: (insets.top || verticalScale(5)) + verticalScale(5),
            paddingBottom: verticalScale(15),
            paddingHorizontal: scale(5),
          },
        ]}
      >
        <TouchableOpacity onPress={() => router.push('/perfil')}>
          <FontAwesome5 name="user-circle" size={moderateScale(28)} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/')}>
          <Image
            source={logotipo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsMenuOpen(true)}>
          <Feather name="menu" size={moderateScale(28)} color="#fff" />
        </TouchableOpacity>
      </View>

      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#8A1B58', // rosa
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    zIndex: 10000,
    minHeight: verticalScale(60), // Altura mínima proporcional
  },
  logoImage: {
    height: verticalScale(35),
    width: scale(220),
  },
});
