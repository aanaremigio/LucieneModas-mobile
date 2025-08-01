import React, { useEffect } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

type Aba = 'profile' | 'home' | 'chart';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  // Define os valores animados
  const scaleProfile = new Animated.Value(1);
  const scaleHome = new Animated.Value(1);
  const scaleChart = new Animated.Value(1);

  // Função para resetar todas as escalas
  const resetAll = () => {
    Animated.parallel([
      Animated.timing(scaleProfile, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleHome, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleChart, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };

  // Anima o botão ativo baseado na rota atual
  const animateActive = (tab: Aba) => {
    resetAll();
    Animated.timing(
      tab === 'profile' ? scaleProfile :
      tab === 'chart' ? scaleChart :
      scaleHome,
      { toValue: 1.4, duration: 150, useNativeDriver: true }
    ).start();
  };

  // Detecta a aba atual pela rota e anima ao entrar
  useEffect(() => {
    if (pathname === '/perfil') animateActive('profile');
    else if (pathname === '/analise') animateActive('chart');
    else animateActive('home');
  }, [pathname]);

  // Ação ao clicar
  const handlePress = (tab: Aba) => {
    animateActive(tab);
    if (tab === 'profile') router.push('/perfil');
    else if (tab === 'chart') router.push('/analise');
    else router.push('/home');
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity onPress={() => handlePress('profile')} activeOpacity={0.8}>
        <Animated.View style={[styles.footerIcon, { transform: [{ scale: scaleProfile }] }]}>
          <FontAwesome5 name="user" size={24} color="#8A1B58" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('home')} activeOpacity={0.8}>
        <Animated.View style={[styles.footerIcon, { transform: [{ scale: scaleHome }] }]}>
          <Ionicons name="home" size={24} color="#8A1B58" />
        </Animated.View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => handlePress('chart')} activeOpacity={0.8}>
        <Animated.View style={[styles.footerIcon, { transform: [{ scale: scaleChart }] }]}>
          <MaterialIcons name="bar-chart" size={24} color="#8A1B58" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#8A1B58',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 2,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  footerIcon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
  },
});
