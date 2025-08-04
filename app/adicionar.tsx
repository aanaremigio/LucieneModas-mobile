import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Header from '../components/header';
import Footer from '../components/footer';
import { MaterialIcons } from '@expo/vector-icons';

export default function AdicionarScreen() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Outros');
  const categorias = ['Masculino', 'Feminino', 'Outros', 'Infantil', 'Cosméticos'];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar</Text>

        <TouchableOpacity style={styles.imageBox}>
          <MaterialIcons name="add" size={48} color="#fff" />
        </TouchableOpacity>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#000000ff"
          style={styles.input} />

        <View style={styles.row}>
          <TextInput
            placeholder="R$"
            placeholderTextColor="#000000ff"
            style={[styles.input, { flex: 1, marginRight: 5 }]}
            keyboardType="numeric" />
            
          <TextInput
          placeholder="Estoque"
          placeholderTextColor="#000000ff"
          style={[styles.input, { flex: 1, marginLeft: 5 }]}
          keyboardType="numeric" />
        </View>

        <TextInput
          placeholder="Descrição"
          placeholderTextColor="#000000ff"
          multiline
          style={styles.textArea}
        />

        <Text style={styles.label}>Categorias</Text>
        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria}
            style={[
              styles.categoriaBtn,
              categoriaSelecionada === categoria && styles.categoriaSelecionada, 
            ]}
            onPress={() => setCategoriaSelecionada(categoria)}
            >
              <Text
                style={[
                  styles.categoriaText,
                  categoriaSelecionada === categoria && { color: '#fff' },
                ]}
              >
                {categoria}
              </Text>
            </TouchableOpacity>
        ))}

        <TouchableOpacity style={styles.salvarBtn}>
          <Text style={styles.salvarText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    color: '#8A1B58',
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf:'center',
  },
  imageBox: {
    height: 120,
    backgroundColor: '#efddbb',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#efddbb',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    maxWidth: 400,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textArea: {
    backgroundColor: '#efddbb',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
    width: '90%',
    maxWidth: 400,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  categoriaBtn: {
    backgroundColor: '#efddbb',
    padding: 10,
    borderRadius: 8,
    marginVertical: 3,
    width: '90%',
    maxWidth: 400,
  },
  categoriaSelecionada: {
    backgroundColor: '#8A1B58',
  },
  categoriaText: {
    color: '#000000ff', // preto padrão
    textAlign: 'center',
  },
  salvarBtn: {
    backgroundColor: 'white',
    borderColor: '#8A1B58',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 20,
    width: '90%',
    maxWidth: 400,
  },
  salvarText: {
    color: '#8A1B58',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});