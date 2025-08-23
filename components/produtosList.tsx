import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale, fontScale } from '../coisasuteis/scale';

export default function ProdutosList() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos');

        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.status}`);
        }

        const data = await response.json();
        setProdutos(data);

      } catch (error: any) {
        console.error("Erro ao buscar produtos:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#8A1B58" style={{ marginTop: verticalScale(30) }} />;
  }

  if (error) {
    return <Text style={{ color: 'red', margin: scale(20) }}>Erro: {error}</Text>;
  }

  return (
    <>
      <Text style={styles.sectionTitle}>Produtos</Text>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {produtos.map((p, i) => (
          <View style={styles.productCard} key={i}>
            <Ionicons name="shirt-outline" size={moderateScale(32)} color="#555" />
            <Text style={styles.productText}>
              {p.nome} - R${p.preco?.toFixed(2)}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: fontScale(18),
    marginTop: verticalScale(20),
    marginLeft: scale(20),
    color: '#8A1B58',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(10),
    paddingBottom: verticalScale(80),
  },
  productCard: {
    alignItems: 'center',
    marginVertical: verticalScale(10),
    backgroundColor: '#f0f0f0',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    width: '45%',
  },
  productText: {
    fontSize: fontScale(12),
    marginTop: verticalScale(5),
    textAlign: 'center',
  },
});
