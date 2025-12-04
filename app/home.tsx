import ProdutosList from '@/components/produtosList';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { fontScale, moderateScale, scale, verticalScale } from '../coisasuteis/scale';
import Footer from '../components/footer';
import Header from '../components/header';

import Constants from "expo-constants";

export default function HomeScreen() {
  const { apiUrl }: any = Constants.expoConfig?.extra ?? {};
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [contagemEsgotados, setContagemEsgotados] = useState(0);
  const [loadingContagem, setLoadingContagem] = useState(true);

  // Função para buscar a contagem de produtos esgotados
  const fetchContagemEsgotados = async () => {
    try {
      setLoadingContagem(true);
      const response = await fetch(`${apiUrl}/api/produtos`);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      
      const data = await response.json();
      const esgotados = data.filter((p: any) => p.estoque === 0);
      setContagemEsgotados(esgotados.length);
    } catch (error) {
      console.error('Erro ao buscar contagem de esgotados:', error);
    } finally {
      setLoadingContagem(false);
    }
  };

  // Função para recarregar tudo
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchContagemEsgotados();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchContagemEsgotados();
  }, []);

  // Array das funcionalidades
  const funcionalidades = [
    {
      id: 1,
      nome: 'Painel',
      icon: 'analytics',
      rota: '/analise',
      color: '#8A1B58',
    },
    {
      id: 2,
      nome: 'Adicionar',
      icon: 'playlist-add',
      rota: '/adicionar',
      color: '#8A1B58',
    },
    {
      id: 3,
      nome: 'Pedidos',
      icon: 'inventory',
      rota: '/pedidos',
      color: '#8A1B58',
    },
    {
      id: 4,
      nome: 'Remover',
      icon: 'delete',
      rota: '/remover',
      color: '#8A1B58',
    },
    {
      id: 5,
      nome: 'Esgotados',
      icon: 'error-outline',
      rota: '/produtosEsgotados',
      color: '#8A1B58',
      badge: contagemEsgotados > 0 ? contagemEsgotados : null,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Funcionalidades</Text>
          
          {/* Container das funcionalidades em linha */}
          <View style={styles.funcionalidadesContainer}>
            {funcionalidades.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.funcionalidadeItem}
                onPress={() => router.push(item.rota)}
                activeOpacity={0.7}
              >
                {/* Ícone */}
                <View style={styles.iconContainer}>
                  <MaterialIcons 
                    name={item.icon as any} 
                    size={moderateScale(24)} 
                    color={item.color}
                  />
                </View>
                
                {/* Nome */}
                <Text style={styles.funcionalidadeText}>{item.nome}</Text>
                
                {/* Badge para Esgotados */}
                {item.badge && (
                  <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Seção de Produtos */}
          <ProdutosList />
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(100),
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: fontScale(18),
    marginTop: verticalScale(20),
    marginLeft: scale(20),
    color: '#8A1B58',
  },
  funcionalidadesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    marginTop: verticalScale(15),
    marginBottom: verticalScale(10),
  },
  funcionalidadeItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: verticalScale(10),
    position: 'relative',
    flex: 1,
  },
  iconContainer: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: '#EFDDBB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(8),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  funcionalidadeText: {
    fontSize: fontScale(12),
    fontWeight: '600',
    textAlign: 'center',
    color: '#8A1B58',
  },
  badgeContainer: {
    position: 'absolute',
    top: 5,
    right: scale(10),
    backgroundColor: '#dec533ff',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: fontScale(10),
    fontWeight: 'bold',
  },
});