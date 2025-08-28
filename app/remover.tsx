import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Header from '../components/header';
import Footer from '../components/footer';

export default function RemoverScreen() {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const produtos = Array.from({ length: 9 }).map((_, i) => ({
    id: i + 1,
    nome: 'Produto',
    preco: 'R$XX,XX',
  }));

  const toggleSelection = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

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
          <MaterialIcons name="delete" size={30} color="#000" />
        </TouchableOpacity>
      </View>

        <View style={styles.productGrid}>
          {produtos.map(item => (
            <View key={item.id} style={styles.productCard}>
              <Ionicons name="shirt-outline" size={32} color="#555" />
              {isSelectionMode && (
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => toggleSelection(item.id)}
                >
                  <MaterialIcons
                    name={
                      selectedItems.includes(item.id)
                        ? 'check-box'
                        : 'check-box-outline-blank'
                    }
                    size={22}
                    color="#8A1B58"
                  />
                </TouchableOpacity>
              )}
              <Text style={styles.productText}>
                {item.nome} {item.preco}
              </Text>
            </View>
          ))}
        </View>

        {isSelectionMode && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => console.log('Apagar:', selectedItems)}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  trashButton: {
    position: 'absolute',
    right: 20,
    top: 30,
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
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  productCard: {
    width: '28%',
    alignItems: 'center',
    margin: 10,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    position: 'relative',
  },
  productText: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  checkbox: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: '#8A1B58',
    borderWidth: 2,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  deleteButtonText: {
    color: '#8A1B58',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
