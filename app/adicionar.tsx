import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from '../components/footer';
import Header from '../components/header';
import { MaterialIcons } from '@expo/vector-icons';

export default function ProdutosForm() {
  const categorias = ['Masculino', 'Feminino', 'Outros', 'Infantil', 'Cosméticos'];
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Outros');
  const [form, setForm] = useState({
    nome: "",
    sobre: "",
    valor: "",
    categoria: "",
    imagem: null as ImagePicker.ImagePickerAsset | null,
    estoque: "",
  });

  // Função para abrir galeria e selecionar imagem
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permissão necessária",
        "Precisamos da sua permissão para acessar a galeria de fotos."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, imagem: result.assets[0] });
    }
  };

  // Função de envio do formulário
  const handleSubmit = async () => {
    if (!form.imagem || !form.nome || !form.valor || !form.categoria) {
      return Alert.alert("Erro!", "Preencha todos os campos obrigatórios.");
    }

    try {
      const formData = new FormData();
      if (form.imagem) {
        formData.append("file", {
          uri: form.imagem.uri,
          name: `photo-${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);
      }

      const uploadRes = await fetch("https://0j59qgbr-3000.brs.devtunnels.ms/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { url } = await uploadRes.json();
      const imagemUrl = url;

      const { nome, sobre, valor, categoria, estoque } = form;
      await fetch("https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          sobre,
          valor: parseFloat(valor),
          categoria,
          imagemUrl,
          estoque: estoque ? parseInt(estoque) : 0,
        }),
      });

      Alert.alert("Sucesso!", "Produto adicionado com sucesso!");

      // Limpa formulário
      setForm({
        nome: "",
        sobre: "",
        valor: "",
        categoria: "",
        imagem: null,
        estoque: "",
      });
      setCategoriaSelecionada('Outros');
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Não foi possível adicionar o produto.");
    }
  };

  // Atualiza categoria ao clicar e mantém sincronizado no form
  const onSelectCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
    setForm({ ...form, categoria });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Adicionar</Text>

        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {form.imagem ? (
            <Text style={{ color: '#000' }}>Imagem Selecionada</Text>
          ) : (
            <MaterialIcons name="add" size={48} color="#fff" />
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Nome"
          placeholderTextColor="#000000ff"
          style={styles.input}
          value={form.nome}
          onChangeText={(text) => setForm({ ...form, nome: text })}
        />

        <View style={styles.row}>
          <TextInput
            placeholder="R$"
            placeholderTextColor="#000000ff"
            style={styles.inputHalf}
            keyboardType="numeric"
            value={form.valor}
            onChangeText={(text) => setForm({ ...form, valor: text })}
          />

          <TextInput
            placeholder="Estoque"
            placeholderTextColor="#000000ff"
            style={styles.inputHalf}
            keyboardType="numeric"
            value={form.estoque}
            onChangeText={(text) => setForm({ ...form, estoque: text })}
          />
        </View>

        <TextInput
          placeholder="Descrição"
          placeholderTextColor="#000000ff"
          multiline
          style={styles.textArea}
          value={form.sobre}
          onChangeText={(text) => setForm({ ...form, sobre: text })}
        />

        <Text style={styles.label}>Categorias</Text>
        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria}
            style={[
              styles.categoriaBtn,
              categoriaSelecionada === categoria && styles.categoriaSelecionada,
            ]}
            onPress={() => onSelectCategoria(categoria)}
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

        <TouchableOpacity style={styles.salvarBtn} onPress={handleSubmit}>
          <Text style={styles.salvarText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    alignSelf: 'center',
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
    color: '#000',
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
    color: '#000',
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
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '90%',
    maxWidth: 400,
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
    color: '#000000ff',
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
    