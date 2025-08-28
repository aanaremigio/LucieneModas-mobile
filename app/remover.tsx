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
            <MaterialIcons name="delete" size={40} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.productGrid}>
          {produtos.map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.productCard,
                selectedItems.includes(item.id) && { borderColor: '#8A1B58', borderWidth: 2 }
              ]}
              activeOpacity={0.7}
              onPress={() => isSelectionMode && toggleSelection(item.id)}
            >
              <Ionicons name="shirt-outline" size={40} color="#555" />
              {isSelectionMode && (
                <View style={styles.checkbox}>
                  <MaterialIcons
                    name={
                      selectedItems.includes(item.id)
                        ? 'check-box'
                        : 'check-box-outline-blank'
                    }
                    size={26}
                    color="#8A1B58"
                  />
                </View>
              )}
              <Text style={styles.productText}>
                {item.nome} {item.preco}
              </Text>
            </TouchableOpacity>
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
  productText: {
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
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
