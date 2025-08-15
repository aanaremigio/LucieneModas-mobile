import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale } from '../coisasuteis/scale';


type Aba = 'profile' | 'home' | 'chart';


export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();


  const scaleProfile = new Animated.Value(1);
  const scaleHome = new Animated.Value(1);
  const scaleChart = new Animated.Value(1);


  const resetAll = () => {
    Animated.parallel([
      Animated.timing(scaleProfile, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleHome, { toValue: 1, duration: 150, useNativeDriver: true }),
      Animated.timing(scaleChart, { toValue: 1, duration: 150, useNativeDriver: true }),
    ]).start();
  };


  const animateActive = (tab: Aba) => {
    resetAll();
    Animated.timing(
      tab === 'profile' ? scaleProfile :
      tab === 'chart' ? scaleChart :
      scaleHome,
      { toValue: 1.4, duration: 150, useNativeDriver: true }
    ).start();
  };


  useEffect(() => {
    if (pathname === '/perfil') animateActive('profile');
    else if (pathname === '/analise') animateActive('chart');
    else animateActive('home');
  }, [pathname]);


  const handlePress = (tab: Aba) => {
    animateActive(tab);
    if (tab === 'profile') router.push('/perfil');
    else if (tab === 'chart') router.push('/analise');
    else router.push('/home');
  };


  return (
    <View style={[styles.footer, { paddingBottom: insets.bottom || verticalScale(10) }]}>
      <TouchableOpacity onPress={() => handlePress('profile')} activeOpacity={0.8}>
        <Animated.View style={[styles.footerIcon, { transform: [{ scale: scaleProfile }] }]}>
          <FontAwesome5 name="user" size={moderateScale(24)} color="#8A1B58" />
        </Animated.View>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => handlePress('home')} activeOpacity={0.8}>
        <Animated.View style={[styles.footerIcon, { transform: [{ scale: scaleHome }] }]}>
          <Ionicons name="home" size={moderateScale(24)} color="#8A1B58" />
        </Animated.View>
      </TouchableOpacity>


      <TouchableOpacity onPress={() => handlePress('chart')} activeOpacity={0.8}>
        <Animated.View style={[styles.footerIcon, { transform: [{ scale: scaleChart }] }]}>
          <MaterialIcons name="bar-chart" size={moderateScale(24)} color="#8A1B58" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#8A1B58',
    justifyContent: 'space-around',
    paddingVertical: verticalScale(10),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerIcon: {
    backgroundColor: '#fff',
    padding: moderateScale(10),
    borderRadius: moderateScale(30),
    margin: scale(5),
  },
});
