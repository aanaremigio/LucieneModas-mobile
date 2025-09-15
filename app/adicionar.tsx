import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
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

export default function ProdutosForm() {
  const categorias = ['Masculino', 'Feminino', 'Outros', 'Infantil', 'Cosmeticos'];
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Outros');
  const [form, setForm] = useState({
    nome: "",
    sobre: "",
    valor: "",
    categoria: "",
    imagem: null as ImagePicker.ImagePickerAsset | null,
    estoque: "",
  });

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos da sua permissão para acessar a galeria.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, imagem: result.assets[0] });
    }
  };

  const onSelectCategoria = (categoria: string) => {
    setCategoriaSelecionada(categoria);
    setForm({ ...form, categoria });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Adicionar</Text>

          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {form.imagem ? (
              <>
                <Image source={{ uri: form.imagem.uri }} style={styles.previewImage} />
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>Imagem Selecionada</Text>
                </View>
              </>
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

          <TouchableOpacity style={styles.salvarBtn}>
            <Text style={styles.salvarText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

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
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    color: '#8A1B58',
    fontWeight: 'bold',
    marginVertical: 20,
    alignSelf: 'center',
  },
  imageBox: {
    height: 250,
    backgroundColor: '#EFDDBB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    width: '90%',
    maxWidth: 400,
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(100,100,100,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
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
    borderWidth: 3,
    padding: 10,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 14,
    width: '90%',
    maxWidth: 400,
  },
  salvarText: {
    color: '#8A1B58',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
