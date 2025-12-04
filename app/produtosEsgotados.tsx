// esgotados.tsx
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
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

import Constants from "expo-constants";

export default function EsgotadosScreen() {
  const { apiUrl }: any = Constants.expoConfig?.extra ?? {};
  
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [excluindoTodos, setExcluindoTodos] = useState(false);
  const router = useRouter();

  // Buscar produtos esgotados
  const fetchProdutosEsgotados = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`${apiUrl}/api/produtos-indisponiveis`);
      if (!response.ok) throw new Error('Erro ao buscar produtos');
      
      const data = await response.json();
      
      setProdutos(data);
      
    } catch (error) {
      console.error('Erro ao buscar produtos esgotados:', error);
      Alert.alert('Erro', 'Não foi possível carregar os produtos esgotados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutosEsgotados();
  }, []);

  // Função para deletar produto esgotado individual
  const deletarProduto = async (produtoId: number) => {
    try {
      const produto = produtos.find(p => p.id === produtoId);
      if (!produto) return;

      Alert.alert(
        'Confirmar Exclusão',
        `Deseja realmente excluir "${produto.nome}"?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: async () => {
              const response = await fetch(`${apiUrl}/api/produtos/${produtoId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: produto.imagem }),
              });

              if (response.ok) {
                Alert.alert('Sucesso', 'Produto excluído com sucesso!');
                // Atualizar lista após exclusão
                setProdutos(prev => prev.filter(p => p.id !== produtoId));
              } else {
                throw new Error('Erro ao excluir produto');
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      Alert.alert('Erro', 'Não foi possível excluir o produto.');
    }
  };

  // Função para excluir TODOS os produtos esgotados
  const excluirTodosEsgotados = async () => {
    if (produtos.length === 0) return;

    Alert.alert(
      'Excluir Todos',
      `Tem certeza que deseja excluir todos os ${produtos.length} produtos esgotados?`,
      [
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        },
        {
          text: 'Excluir Todos',
          style: 'destructive',
          onPress: async () => {
            try {
              setExcluindoTodos(true);
              
              // Excluir cada produto individualmente
              for (const produto of produtos) {
                await fetch(`${apiUrl}/api/produtos/${produto.id}`, {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ url: produto.imagem }),
                });
              }
              
              Alert.alert('Sucesso!', 'Todos os produtos esgotados foram excluídos.');
              setProdutos([]);
              
            } catch (error) {
              console.error('Erro ao excluir todos:', error);
              Alert.alert('Erro', 'Não foi possível excluir todos os produtos.');
            } finally {
              setExcluindoTodos(false);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <View style={styles.header}>
        <Text style={styles.title}>Produtos Esgotados</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#8A1B58" style={styles.loader} />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Contador e Botão de Ação em Lote */}
          <View style={styles.contadorContainer}>
            <View style={styles.contadorInfo}>
              <MaterialIcons name="error-outline" size={24} color="#FF3B30" />
              <Text style={styles.contadorText}>
                {produtos.length} produto{produtos.length !== 1 ? 's' : ''} esgotado{produtos.length !== 1 ? 's' : ''}
              </Text>
            </View>
            
            {produtos.length > 0 && (
              <TouchableOpacity
                style={styles.excluirTodosButton}
                onPress={excluirTodosEsgotados}
                disabled={excluindoTodos}
              >
                {excluindoTodos ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <MaterialIcons name="delete-sweep" size={18} color="#fff" />
                    <Text style={styles.excluirTodosText}>Excluir Todos</Text>
                  </>
                )}
              </TouchableOpacity>
            )}
          </View>

          {produtos.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialIcons name="check-circle" size={60} color="#34C759" />
              <Text style={styles.emptyTitle}>🎉 Tudo em dia!</Text>
              <Text style={styles.emptyText}>
                Nenhum produto está esgotado no momento.
              </Text>
            </View>
          ) : (
            <View style={styles.productGrid}>
              {produtos.map((item: any) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.productCard}
                  onPress={() => router.push({ 
                    pathname: '/produto', 
                    params: { ...item } 
                  })}
                >
                  {/* Overlay de esgotado */}
                  <View style={styles.esgotadoOverlay}>
                    <Text style={styles.esgotadoText}>ESGOTADO</Text>
                  </View>
                  
                  <Image
                    source={{ uri: item.imagem }}
                    style={styles.productImage}
                    resizeMode="cover"
                  />
                  
                  <Text style={styles.productText} numberOfLines={2}>
                    {item.nome}
                  </Text>
                  
                  <View style={styles.productInfo}>
                    <Text style={styles.productPrice}>
                      R$ {parseFloat(item.valor).toFixed(2).replace('.', ',')}
                    </Text>
                    
                    {/* Botão de exclusão rápida */}
                    <TouchableOpacity
                      style={styles.deleteIcon}
                      onPress={(e) => {
                        e.stopPropagation();
                        deletarProduto(item.id);
                      }}
                    >
                      <MaterialIcons name="delete" size={16} color="#FF3B30" />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: verticalScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#8A1B58',
    fontWeight: 'bold',
  },
  loader: {
    marginTop: verticalScale(50),
  },
  scrollContent: {
    padding: scale(20),
    paddingBottom: verticalScale(120),
  },
  contadorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF5F5',
    padding: scale(15),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
    borderWidth: 1,
    borderColor: '#FFCDD2',
  },
  contadorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(10),
  },
  contadorText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dec533ff',
  },
  excluirTodosButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dec533ff',
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(8),
    gap: scale(6),
  },
  excluirTodosText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
    minHeight: verticalScale(300),
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34C759',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
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
    position: 'relative',
    overflow: 'hidden',
  },
  esgotadoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#dec533ff',
    paddingVertical: verticalScale(4),
    zIndex: 2,
  },
  esgotadoText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
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
    flex: 1,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: verticalScale(4),
  },
  productPrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8A1B58',
  },
  deleteIcon: {
    backgroundColor: '#FFEBEE',
    padding: moderateScale(4),
    borderRadius: moderateScale(4),
  },
});