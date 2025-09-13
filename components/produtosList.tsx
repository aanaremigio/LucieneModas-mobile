import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontScale, moderateScale, scale, verticalScale } from '../coisasuteis/scale';

export default function ProdutosList() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('https://f9nkf6h4-3000.brs.devtunnels.ms/api/produtos');

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
          <TouchableOpacity 
            key={i} 
            style={styles.productCard} 
            onPress={() => router.push({ pathname: '/produto', params: { ...p } })}
          >
            <View style={{ width: '100%', height: '70%' }}>
              <Image
                source={{ uri: p.imagem }}
                style={styles.productImage}
                resizeMode="cover"
              />
              {/* Ícone de exclamação se estoque = 0 */}
              {p.estoque === 0 && (
                <View style={styles.warningIcon}>
                  <MaterialIcons name="error" size={22} color="#F5B600" />
                </View>
              )}
            </View>

            <Text style={styles.productText} numberOfLines={2} ellipsizeMode="tail">
              {p.nome}
            </Text>
            <Text style={styles.productPrice}>
              R$ {p.valor}
            </Text>
          </TouchableOpacity>
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
    height: '100%',
    borderRadius: moderateScale(8),
  },
  productText: {
    fontSize: fontScale(12),
    marginTop: verticalScale(5),
    textAlign: 'center',
    color: '#333',
  },
  productPrice: {
    fontSize: fontScale(12),
    fontWeight: 'bold',
    marginTop: verticalScale(2),
    color: '#8A1B58',
  },
  warningIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
    elevation: 3,
  },
});
