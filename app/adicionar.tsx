import { MaterialIcons } from '@expo/vector-icons';
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
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

// Função para remover acentos e colocar tudo minúsculo
function normalizar(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function ProdutosForm() {
  const { apiUrl }: any = Constants.expoConfig?.extra ?? {};

  const params = useLocalSearchParams();
  const isEdit = !!params.id;

  // Categorias definidas
  const categorias = ["Roupas", "Cosmeticos", "Outros"];
  const subcategorias = ["Masculino", "Feminino", "Infantil", "Outros"];

  const [categoriaSelecionada, setCategoriaSelecionada] = useState("Outros");
  const [subcategoriaSelecionada, setSubcategoriaSelecionada] = useState("Outros");
  const [loading, setLoading] = useState(false);
  const [loadingInicial, setLoadingInicial] = useState(isEdit); // Só carrega inicial se for edição

  const [form, setForm] = useState({
    nome: "",
    sobre: "",
    valor: "",
    categoria: "",
    subcategoria: "",
    imagem: null as ImagePicker.ImagePickerAsset | null,
    estoque: "",
  });

  // Carregar dados se for edição
  useEffect(() => {
    if (isEdit) {
      carregarDadosProduto();
    }
  }, [isEdit]);

  const carregarDadosProduto = async () => {
    try {
      setLoadingInicial(true);
      const id = getParamString(params.id);
      
      const response = await fetch(`${apiUrl}/api/produtos/${id}`);
      if (!response.ok) throw new Error("Erro ao carregar produto");
      
      const produto = await response.json();
      
      setForm({
        nome: produto.nome || "",
        sobre: produto.sobre || "",
        valor: produto.valor ? produto.valor.toString() : "",
        categoria: produto.categoria || "",
        subcategoria: produto.subcategoria || "",
        estoque: produto.estoque ? produto.estoque.toString() : "",
        imagem: produto.imagem ? { uri: produto.imagem } as ImagePicker.ImagePickerAsset : null,
      });

      setCategoriaSelecionada(produto.categoria || "Outros");
      setSubcategoriaSelecionada(produto.subcategoria || "Outros");
    } catch (error) {
      console.error("Erro ao carregar produto:", error);
      Alert.alert("Erro", "Não foi possível carregar os dados do produto.");
    } finally {
      setLoadingInicial(false);
    }
  };

  // Seleção de categoria
  const onSelectCategoria = (cat: string) => {
    setCategoriaSelecionada(cat);
    setForm({ ...form, categoria: normalizar(cat) });
  };

  // Seleção de subcategoria
  const onSelectSubcategoria = (sub: string) => {
    setSubcategoriaSelecionada(sub);
    setForm({ ...form, subcategoria: normalizar(sub) });
  };

  // Seleção de imagem
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão necessária", "Precisamos da sua permissão para acessar a galeria.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
    });

    if (!result.canceled) {
      setForm({ ...form, imagem: result.assets[0] });
    }
  };

  // Enviar dados
  const handleSubmit = async () => {
    if (!form.nome || !form.valor || !form.categoria || !form.subcategoria) {
      return Alert.alert("Erro!", "Preencha todos os campos obrigatórios.");
    }

    try {
      setLoading(true);
      let imagemUrl = getParamString(params.imagem);

      if (form.imagem && form.imagem.uri !== imagemUrl) {
        const formData = new FormData();
        formData.append("file", {
          uri: form.imagem.uri,
          name: `photo-${Date.now()}.jpg`,
          type: "image/jpeg",
        } as any);

        const uploadRes = await fetch(
          `${apiUrl}/api/upload`,
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
        subcategoria: form.subcategoria,
        estoque: form.estoque ? parseInt(form.estoque) : 0,
        imagemUrl,
      };

      const url = isEdit
        ? `${apiUrl}/api/produtos/${params.id}`
        : `${apiUrl}/api/produtos`;

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Erro ao salvar produto");

      Alert.alert("Sucesso!", isEdit ? "Produto atualizado!" : "Produto adicionado!");

      // Limpar formulário apenas se não for edição
      if (!isEdit) {
        setForm({
          nome: "",
          sobre: "",
          valor: "",
          categoria: "",
          subcategoria: "",
          imagem: null,
          estoque: "",
        });

        setCategoriaSelecionada("Outros");
        setSubcategoriaSelecionada("Outros");
      }

    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Não foi possível salvar o produto.");
    } finally {
      setLoading(false);
    }
  };

  // Se estiver carregando dados iniciais (edição)
  if (loadingInicial) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#8A1B58" />
          <Text style={styles.loadingText}>Carregando produto...</Text>
        </View>
        <Footer />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={100}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>{isEdit ? "Editar Produto" : "Adicionar Produto"}</Text>

          <TouchableOpacity 
            style={styles.imageBox} 
            onPress={pickImage}
            disabled={loading}
          >
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
            editable={!loading}
          />

          <View style={styles.row}>
            <TextInput
              placeholder="R$"
              placeholderTextColor="#000000ff"
              style={styles.inputHalf}
              keyboardType="numeric"
              value={form.valor}
              onChangeText={(text) => setForm({ ...form, valor: text })}
              editable={!loading}
            />

            <TextInput
              placeholder="Estoque"
              placeholderTextColor="#000000ff"
              style={styles.inputHalf}
              keyboardType="numeric"
              value={form.estoque}
              onChangeText={(text) => setForm({ ...form, estoque: text })}
              editable={!loading}
            />
          </View>

          <TextInput
            placeholder="Descrição"
            placeholderTextColor="#000000ff"
            multiline
            style={styles.textArea}
            value={form.sobre}
            onChangeText={(text) => setForm({ ...form, sobre: text })}
            editable={!loading}
          />

          {/* CATEGORIA */}
          <Text style={styles.label}>Categoria</Text>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoriaBtn,
                categoriaSelecionada === cat && styles.categoriaSelecionada,
              ]}
              onPress={() => onSelectCategoria(cat)}
              disabled={loading}
            >
              <Text
                style={[
                  styles.categoriaText,
                  categoriaSelecionada === cat && { color: "#fff" },
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}

          {/* SUBCATEGORIA */}
          <Text style={styles.label}>Subcategoria</Text>
          {subcategorias.map((sub) => (
            <TouchableOpacity
              key={sub}
              style={[
                styles.categoriaBtn,
                subcategoriaSelecionada === sub && styles.categoriaSelecionada,
              ]}
              onPress={() => onSelectSubcategoria(sub)}
              disabled={loading}
            >
              <Text
                style={[
                  styles.categoriaText,
                  subcategoriaSelecionada === sub && { color: "#fff" },
                ]}
              >
                {sub}
              </Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={[styles.salvarBtn, loading && styles.salvarBtnDisabled]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#8A1B58" />
            ) : (
              <Text style={styles.salvarText}>{isEdit ? "Atualizar" : "Salvar"}</Text>
            )}
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
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    marginVertical: 20,
    color: '#8A1B58',
    fontWeight: 'bold',
  },
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
  imageBox: {
    height: 250,
    width: '90%',
    backgroundColor: '#EFDDBB',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: "hidden",
    marginBottom: 15,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(50,50,50,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  overlayText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  input: {
    width: '90%',
    backgroundColor: '#EFDDBB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  row: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputHalf: {
    width: '48%',
    backgroundColor: '#EFDDBB',
    borderRadius: 8,
    padding: 10,
    color: '#000',
  },
  textArea: {
    width: '90%',
    height: 100,
    backgroundColor: '#EFDDBB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    textAlignVertical: 'top',
    color: '#000',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    width: '90%',
  },
  categoriaBtn: {
    width: '90%',
    backgroundColor: '#EFDDBB',
    padding: 10,
    borderRadius: 8,
    marginVertical: 3,
  },
  categoriaSelecionada: {
    backgroundColor: '#8A1B58',
  },
  categoriaText: {
    textAlign: 'center',
    color: '#000',
  },
  salvarBtn: {
    width: '90%',
    backgroundColor: 'white',
    borderColor: '#8A1B58',
    borderWidth: 3,
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 50,
  },
  salvarBtnDisabled: {
    opacity: 0.6,
  },
  salvarText: {
    textAlign: 'center',
    color: '#8A1B58',
    fontWeight: 'bold',
    fontSize: 16,
  },
});