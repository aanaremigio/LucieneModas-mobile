import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView, Image,} from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons, Feather } from '@expo/vector-icons';

type Aba = 'profile' | 'home' | 'chart';

const logotipo = require('../assets/images/logotipo.png');

export default function HomeScreen() {
  const [active, setActive] = useState<Aba>('home');

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
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <FontAwesome5 name="user-circle" size={28} color="#fff" />
        {/* IMAGEM NO LUGAR DO NOME */}
        <Image source={logotipo} style={styles.logoImage} resizeMode="contain" />
        <Feather name="menu" size={28} color="#fff" />
      </View>

      {/* Funcionalidades */}
      <Text style={styles.sectionTitle}>Funcionalidades</Text>
      <View style={styles.featureContainer}>
        <View style={styles.featureItem}>
          <MaterialIcons name="analytics" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Painel</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="playlist-add" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Adicionar</Text>
        </View>
        <View style={styles.featureItem}>
          <MaterialIcons name="inventory" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Pedidos</Text>
        </View>
      </View>

      {/* Produtos */}
      <Text style={styles.sectionTitle}>Produtos</Text>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View style={styles.productCard} key={i}>
            <Ionicons name="shirt-outline" size={32} color="#555" />
            <Text style={styles.productText}>Produto R$XX,XX</Text>
          </View>
        ))}
      </ScrollView>

      {/* Rodapé com botões animados */}
      <View style={styles.footer}>
        {[
          { key: 'profile', icon: <FontAwesome5 name="user" size={24} color="#8A1B58" /> },
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: {
    backgroundColor: '#8A1B58',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoImage: {
    width: 300,
    height: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    color: '#8A1B58',
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    width: 90,
  },
  featureText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
    color: '#8A1B58',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 10,
    paddingBottom: 80,
  },
  productCard: {
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  productText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#8A1B58',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  footerIcon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
  },
});
