import { useRouter } from 'expo-router'; // ✅ Importação do router
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from '../coisasuteis/scale';
import Footer from '../components/footer';
import Header from '../components/header';

export default function FemininoScreen() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Inicialização do router

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos');
        const data = await response.json();

        const feminino = data.filter((p: any) => p.categoria === 'Feminino');
        setProdutos(feminino);
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
              <TouchableOpacity
                key={item.id}
                style={styles.productCard}
                onPress={() => router.push({ pathname: '/produto', params: { ...item } })}
              >
                <Image
                  source={{ uri: item.imagem }}
                  style={styles.productImage}
                  resizeMode="cover"
                />
                <Text style={styles.productText} numberOfLines={2}>{item.nome}</Text>
                <Text style={styles.productPrice}>R$ {item.valor}</Text>
              </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(80),
  },
  productCard: {
    alignItems: 'center',
    marginVertical: verticalScale(10),
    backgroundColor: '#f0f0f0',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    width: '30%',
    height: verticalScale(180),
  },
  productImage: {
    width: '100%',
    height: '70%',
    borderRadius: moderateScale(8),
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
