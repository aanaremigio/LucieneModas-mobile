import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, ActivityIndicator, Image } from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';

export default function OutrosScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos');
        const data = await response.json();

        // Filtra só os produtos da categoria "Feminino"
        const outros = data.filter((p: any) => p.categoria === 'Feminino');
        setProdutos(outros);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <View style={styles.header}>
        <Text style={styles.title}>Feminino</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#8A1B58" style={{ marginTop: 20 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.productGrid}>
            {produtos.map((item: any) => (
              <View key={item.id} style={styles.productCard}>
                <Image
                  source={{ uri: item.imagem }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <Text style={styles.productText} numberOfLines={2}>{item.nome}</Text>
                <Text style={styles.productPrice}>R$ {item.valor}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      )}

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#8A1B58',
    fontWeight: 'bold',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  productCard: {
    width: '40%',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  productText: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#8A1B58',
  },
});
     