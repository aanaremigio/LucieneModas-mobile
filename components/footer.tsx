import React, { useState } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

type Aba = 'profile' | 'home' | 'chart';

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();

  const initialTab = (): Aba => {
    if (pathname === '/perfil') return 'profile';
    if (pathname === '/analise') return 'chart';
    return 'home';
  };

  const [active, setActive] = useState<Aba>(initialTab());

  const scaleValues: Record<Aba, Animated.Value> = {
    profile: useState(new Animated.Value(1))[0],
    home: useState(new Animated.Value(1))[0],
    chart: useState(new Animated.Value(1))[0],
  };

  const handlePress = (key: Aba) => {
    Object.keys(scaleValues).forEach((k) => {
      Animated.timing(scaleValues[k as Aba], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });

    Animated.timing(scaleValues[key], {
      toValue: 1.4,
      duration: 150,
      useNativeDriver: true,
    }).start();

    setActive(key);

    if (key === 'profile') router.push('/perfil');
    else if (key === 'chart') router.push('/analise');
    else router.push('/home');
  };

  return (
    <View style={styles.footer}>
      {[{ key: 'profile', icon: <FontAwesome5 name="user" size={24} color="#8A1B58" /> },
        { key: 'home', icon: <Ionicons name="home" size={24} color="#8A1B58" /> },
        { key: 'chart', icon: <MaterialIcons name="bar-chart" size={24} color="#8A1B58" /> },
      ].map(({ key, icon }) => (
        <TouchableOpacity key={key} onPress={() => handlePress(key as Aba)} activeOpacity={0.8}>
          <Animated.View style={[styles.footerIcon, { transform: [{ scale: scaleValues[key as Aba] }] }]}>
            {icon}
          </Animated.View>
        </TouchableOpacity>
      ))}
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