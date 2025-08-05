import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/header';
import Footer from '../components/footer';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      {/* Seção Funcionalidades */}
      <Text style={styles.sectionTitle}>Funcionalidades</Text>
      <View style={styles.featureContainer}>
        <TouchableOpacity style={styles.featureItem} onPress={() => router.push('/analise')}>
          <MaterialIcons name="analytics" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Painel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureItem} onPress={() => router.push('/adicionar')}>
          <MaterialIcons name="playlist-add" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureItem} onPress={() => router.push('/pedidos')}>
          <MaterialIcons name="inventory" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Pedidos</Text>
        </TouchableOpacity>

        {/* Novo botão REMOVER */}
        <TouchableOpacity style={styles.featureItem} onPress={() => router.push('/remover')}>
          <MaterialIcons name="delete" size={28} color="#8A1B58" />
          <Text style={styles.featureText}>Remover</Text>
        </TouchableOpacity>
      </View>

      {/* Seção Produtos */}
      <Text style={styles.sectionTitle}>Produtos</Text>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View style={styles.productCard} key={i}>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    color: '#8A1B58',
  },
  featureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Permite quebrar linha se necessário
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
    marginVertical: 5, // Dá espaçamento entre linhas
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
});
