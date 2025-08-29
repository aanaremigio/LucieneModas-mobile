import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Header from '../components/header';
import Footer from '../components/footer';


export default function RemoverScreen() {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  // Buscar produtos da API
  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos");
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


  // Seleção de produtos
  const toggleSelection = (item: any) => {
    setSelectedItems(prev =>
      prev.find((el) => el.id == item.id) ? prev.filter(el => el.id !== item.id) : [...prev, item]
    );
  };


  // Deletar produtos selecionados
  const deleteSelected = async () => {
    try {
      for (const item of selectedItems) {
        const response = await fetch(`https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos/${item.id}`, {
          method: "DELETE",
          body: JSON.stringify({url: item.imagem}),
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) throw new Error(`Erro ao deletar produto ${item.id}`);
      }
      Alert.alert("Sucesso", "Produtos removidos com sucesso!");
      setSelectedItems([]);
      fetchProdutos(); // Atualiza lista
    } catch (err) {
      console.error(err);
      Alert.alert("Erro", "Não foi possível apagar os produtos.");
    }
  };


  if (loading) {
    return <ActivityIndicator size="large" color="#8A1B58" style={{ marginTop: 40 }} />;
  }


  return (
    <View style={{ flex: 1 }}>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Remover</Text>
          <TouchableOpacity
            onPress={() => setIsSelectionMode(prev => !prev)}
            style={styles.trashButton}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <MaterialIcons name="delete" size={40} color="#000" />
          </TouchableOpacity>
        </View>


        <View style={styles.productGrid}>
          {produtos.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.productCard,
                selectedItems.find(el => el.id == item.id) && { borderColor: '#8A1B58', borderWidth: 2 }
              ]}
              activeOpacity={0.7}
              onPress={() => isSelectionMode && toggleSelection(item)}
            >
              {item.imagem ? (
                <Image source={{ uri: item.imagem }} style={styles.productImage} resizeMode="cover" />
              ) : (
                <Ionicons name="shirt-outline" size={40} color="#555" />
              )}
              {isSelectionMode && (
                <View style={styles.checkbox}>
                  <MaterialIcons
                    name={
                      selectedItems.find(el => el.id == item.id)
                        ? 'check-box'
                        : 'check-box-outline-blank'
                    }
                    size={26}
                    color="#8A1B58"
                  />
                </View>
              )}
              <Text style={styles.productText} numberOfLines={2}>{item.nome}</Text>
              <Text style={styles.productPrice}>R$ {item.valor}</Text>
            </TouchableOpacity>
          ))}
        </View>


        {isSelectionMode && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deleteSelected}
          >
            <Text style={styles.deleteButtonText}>Apagar para sempre</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      <Footer />
    </View>
  );
}


const styles = StyleSheet.create({
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  productGrid: {
    marginTop: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  productText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    color: '#333',
  },
  productPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8A1B58',
    marginTop: 4,
  },
  checkbox: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: '#8A1B58',
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 8,
  },
  deleteButtonText: {
    color: '#8A1B58',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
