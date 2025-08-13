import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/header';
import Footer from '../components/footer';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      {/* Seção Funcionalidades */}
      <Text style={[styles.sectionTitle, { fontSize: width > 400 ? 18 : 16 }]}>Funcionalidades</Text>
      <View style={[styles.featureContainer, { flexDirection: width > 400 ? 'row' : 'column' }]}>
        <TouchableOpacity style={[styles.featureItem, { width: width > 400 ? 90 : '100%' }]} onPress={() => router.push('/analise')}>
          <MaterialIcons name="analytics" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Painel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.featureItem, { width: width > 400 ? 90 : '100%' }]} onPress={() => router.push('/adicionar')}>
          <MaterialIcons name="playlist-add" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.featureItem, { width: width > 400 ? 90 : '100%' }]} onPress={() => router.push('/pedidos')}>
          <MaterialIcons name="inventory" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Pedidos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.featureItem, { width: width > 400 ? 90 : '100%' }]} onPress={() => router.push('/remover')}>
          <MaterialIcons name="delete" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Remover</Text>
        </TouchableOpacity>
      </View>

      {/* Seção Produtos */}
      <Text style={[styles.sectionTitle, { fontSize: width > 400 ? 18 : 16 }]}>Produtos</Text>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View style={[styles.productCard, { width: width > 400 ? '30%' : '45%' }]} key={i}>
            <Ionicons name="shirt-outline" size={32} color="#555" />
            <Text style={styles.productText}>Produto R$XX,XX</Text>
          </View>
        ))}
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    color: '#8A1B58',
  },
  featureContainer: {
    justifyContent: 'space-around',
    marginTop: 15,
    paddingHorizontal: 10,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
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
});
