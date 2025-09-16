import { MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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

type ParamType = string | string[] | undefined;

function getParamString(param: ParamType): string {
  return typeof param === "string" ? param : "";
}

export default function ProdutosForm() {
  const params = useLocalSearchParams();
  const isEdit = !!params.id;

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

  useEffect(() => {
    if (isEdit) {
      const nome = getParamString(params.nome);
      const sobre = getParamString(params.sobre);
      const valor = getParamString(params.valor);
      const categoria = getParamString(params.categoria);
      const estoque = getParamString(params.estoque);
      const imagem = getParamString(params.imagem);

      setForm({
        nome,
        sobre,
        valor,
        categoria,
        estoque,
        imagem: imagem ? { uri: imagem } as ImagePicker.ImagePickerAsset : null,
      });

      setCategoriaSelecionada(categoria || 'Outros');
    }
  }, [isEdit]);

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

  const handleSubmit = async () => {
    if (!form.nome || !form.valor || !form.categoria) {
      return Alert.alert("Erro!", "Preencha todos os campos obrigatórios.");
    }

    try {
      let imagemUrl = getParamString(params.imagem);

      if (form.imagem && form.imagem.uri !== imagemUrl) {
        const formData = new FormData();
        formData.append("file", {
          uri: form.imagem.uri,
          name: `photo-${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);

        const uploadRes = await fetch(
          "https://0j59qgbr-3000.brs.devtunnels.ms/api/upload",
          {
            method: "POST",
            body: formData,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (!uploadRes.ok) throw new Error("Erro ao enviar imagem");
        const data = await uploadRes.json();
        imagemUrl = data.url;
      }

      const body = {
        nome: form.nome,
        sobre: form.sobre,
        valor: parseFloat(form.valor),
        categoria: form.categoria,
        estoque: form.estoque ? parseInt(form.estoque) : 0,
        imagemUrl,
      };

      const url = isEdit
        ? `https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos/${params.id}`
        : "https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erro ao salvar produto");

      Alert.alert("Sucesso!", isEdit ? "Produto atualizado!" : "Produto adicionado!");
      setForm({ nome: "", sobre: "", valor: "", categoria: "", imagem: null, estoque: "" });
      setCategoriaSelecionada("Outros");

    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Não foi possível salvar o produto.");
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
          <Text style={styles.title}>{isEdit ? "Editar Produto" : "Adicionar Produto"}</Text>

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

          <TouchableOpacity style={styles.salvarBtn} onPress={handleSubmit}>
            <Text style={styles.salvarText}>{isEdit ? "Atualizar" : "Salvar"}</Text>
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