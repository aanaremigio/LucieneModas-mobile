import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { moderateScale, scale, verticalScale } from '../coisasuteis/scale';
import Footer from '../components/footer';
import Header from '../components/header';

import Constants from "expo-constants";

export default function RemoverScreen() {
  const { apiUrl }: any = Constants.expoConfig?.extra ?? {};
  
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiUrl}/api/produtos`);
      if (!response.ok) throw new Error("Erro ao buscar produtos");
      const data = await response.json();
      setProdutos(data);
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível carregar os produtos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  const toggleSelection = (item: any) => {
    if (deleting) return;
    setSelectedItems(prev =>
      prev.find((el) => el.id == item.id) ? prev.filter(el => el.id !== item.id) : [...prev, item]
    );
  };

  const deleteSelected = async () => {
    if (selectedItems.length === 0) {
      Alert.alert("Atenção", "Selecione pelo menos um produto para excluir.");
      return;
    }

    try {
      setDeleting(true);
      
      for (const item of selectedItems) {
        const response = await fetch(`${apiUrl}/api/produtos/${item.id}`, {
          method: "DELETE",
          body: JSON.stringify({ url: item.imagem }),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error(`Erro ao deletar produto ${item.id}`);
      }
      
      Alert.alert("Sucesso", "Produtos removidos com sucesso!");
      setSelectedItems([]);
      setIsSelectionMode(false);
      fetchProdutos();
      
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível apagar os produtos.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1 }}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8A1B58" />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
        <Footer />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Remover</Text>
          <TouchableOpacity
            onPress={() => {
              if (!deleting) {
                setIsSelectionMode(prev => !prev);
                if (isSelectionMode) setSelectedItems([]);
              }
            }}
            style={[styles.trashButton, deleting && styles.trashButtonDisabled]}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            disabled={deleting}
          >
            <MaterialIcons 
              name={isSelectionMode ? "cancel" : "delete"} 
              size={40} 
              color={deleting ? "#999" : "#000"} 
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.instruction}>
          {isSelectionMode 
            ? `Selecione os produtos para excluir (${selectedItems.length} selecionados)`
            : "Clique em um produto para ver detalhes ou no ícone 🗑 para selecionar múltiplos"}
        </Text>

        {isSelectionMode && selectedItems.length > 0 && (
          <View style={styles.selectionInfo}>
            <Text style={styles.selectionText}>
              {selectedItems.length} produto{selectedItems.length !== 1 ? 's' : ''} selecionado{selectedItems.length !== 1 ? 's' : ''}
            </Text>
          </View>
        )}

        <View style={styles.productGrid}>
          {produtos.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.productCard,
                selectedItems.find(el => el.id == item.id) && { borderColor: '#8A1B58', borderWidth: 2 }
              ]}
              activeOpacity={0.7}
              onPress={() => {
                if (isSelectionMode) {
                  toggleSelection(item);
                } else {
                  router.push({ pathname: '/produto', params: { ...item } });
                }
              }}
              disabled={deleting}
            >
              <View style={{ width: '100%', height: '70%' }}>
                {item.imagem ? (
                  <Image source={{ uri: item.imagem }} style={styles.productImage} resizeMode="cover" />
                ) : (
                  <Ionicons name="shirt-outline" size={40} color="#555" />
                )}
                
                {/* Ícone de alerta se estoque = 0 */}
                {item.estoque === 0 && (
                  <View style={styles.warningIcon}>
                    <MaterialIcons name="error" size={22} color="#F5B600" />
                  </View>
                )}
                
                {/* Ícone de seleção */}
                {isSelectionMode && (
                  <View style={[
                    styles.selectionIcon,
                    selectedItems.find(el => el.id == item.id) && styles.selectionIconSelected
                  ]}>
                    <MaterialIcons 
                      name={selectedItems.find(el => el.id == item.id) ? "check-box" : "check-box-outline-blank"} 
                      size={20} 
                      color={selectedItems.find(el => el.id == item.id) ? "#8A1B58" : "#999"} 
                    />
                  </View>
                )}
              </View>

              <Text style={styles.productText} numberOfLines={2}>{item.nome}</Text>
              <Text style={styles.productPrice}>R$ {item.valor}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {isSelectionMode && selectedItems.length > 0 && (
          <TouchableOpacity
            style={[styles.deleteButton, deleting && styles.deleteButtonDisabled]}
            onPress={deleteSelected}
            disabled={deleting}
          >
            {deleting ? (
              <ActivityIndicator size="small" color="#8A1B58" />
            ) : (
              <Text style={styles.deleteButtonText}>
                Apagar {selectedItems.length} produto{selectedItems.length !== 1 ? 's' : ''}
              </Text>
            )}
          </TouchableOpacity>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    color: '#8A1B58',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  title: {
    top: 10,
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
  },
  trashButton: {
    position: 'absolute',
    right: 20,
    top: 40,
    zIndex: 10,
  },
  trashButtonDisabled: {
    opacity: 0.5,
  },
  instruction: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: scale(10),
    paddingBottom: verticalScale(80),
    marginTop: 20,
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
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(8),
  },
  productText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    color: '#333',
    marginTop: verticalScale(5),
  },
  productPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8A1B58',
    marginTop: verticalScale(2),
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
  selectionIcon: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
    padding: 2,
  },
  selectionIconSelected: {
    backgroundColor: 'rgba(138, 27, 88, 0.1)',
  },
  selectionInfo: {
    backgroundColor: '#EFDDBB',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  selectionText: {
    color: '#8A1B58',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: '#8A1B58',
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 30,
    minWidth: 200,
    alignItems: 'center',
  },
  deleteButtonDisabled: {
    opacity: 0.6,
  },
  deleteButtonText: {
    color: '#8A1B58',
    fontWeight: 'bold',
    fontSize: 16,
  },
});