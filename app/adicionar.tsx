import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';

export default function AdicionarScreen() {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Outros');
  const categorias = ['Masculino', 'Feminino', 'Outros', 'Infantil', 'Cosméticos'];
  const [form, setForm] = useState({
    nome: "", sobre: "", valor: "", categoria: "", imagem: "", estoque: ""
  })

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      
      <form>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar</Text>

        <TouchableOpacity style={styles.imageBox}>
          <MaterialIcons name="add" size={48} color="#fff" />
        </TouchableOpacity>

                <TextInput
          placeholder="url"
          placeholderTextColor="#000000ff"
          style={styles.inputHalf}
          onChangeText={(text) => setForm({ ...form, imagem: text })}
        />

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#000000ff"
          style={styles.input} />

        <View style={styles.row}>
          <TextInput
            placeholder="R$"
            placeholderTextColor="#000000ff"
            style={styles.inputHalf}
            keyboardType="numeric" />
            
          <TextInput
          placeholder="Estoque"
          placeholderTextColor="#000000ff"
          style={styles.inputHalf}
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
      </form>

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
    backgroundColor: '#EFDDBB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
    maxWidth: 400,
  },
  input: {
    backgroundColor: '#EFDDBB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '90%',
    maxWidth: 400,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: 400,
    marginBottom: 10,
  },
  inputHalf: {
    backgroundColor: '#EFDDBB',
    borderRadius: 8,
    padding: 10,
    width: '48%',
  },
  textArea: {
    backgroundColor: '#EFDDBB',
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
    backgroundColor: '#EFDDBB',
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
    color: '#000000ff', // preto como cor padrão
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