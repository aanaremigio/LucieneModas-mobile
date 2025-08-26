import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Não há CSS modules no React Native, então criamos um objeto de estilo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  imagePickerButton: {
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 5,
  },
  imagePickerText: {
    color: "#000",
  },
  radioGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  checkedCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000",
  },
  radioLabel: {
    fontSize: 16,
  },
});

export default function ProdutosForm() {
  const [form, setForm] = useState({
  nome: "",
  sobre: "",
  valor: "",
  categoria: "",
  imagem: null as ImagePicker.ImagePickerAsset | null, // agora aceita objeto
  estoque: "",
  });

  // A função para lidar com o envio agora será para React Native
  const handleSubmit = async () => {
    // Validação básica
    if (!form.imagem || !form.nome || !form.valor || !form.categoria) {
      return Alert.alert("Erro!", "Preencha todos os campos obrigatórios.");
    }

    try {
      // 1. Upload da imagem
      const formData = new FormData();
      if (form.imagem) {
  formData.append("file", {
    uri: form.imagem.uri, // ✅ certo
    name: `photo-${Date.now()}.jpg`,
    type: "image/jpeg",
  } as any); // o "as any" ajuda a não dar conflito no TS
}


      const uploadRes = await fetch("https://0j59qgbr-3000.brs.devtunnels.ms/api/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data", // Importante para o FormData funcionar
        },
      });

      const { url } = await uploadRes.json();
      const imagemUrl = url;

      // 2. Envio dos dados do produto
      const { nome, sobre, valor, categoria, estoque } = form;
      await fetch("https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          sobre,
          valor: parseFloat(valor), // Converte o valor para número
          categoria,
          imagemUrl,
          estoque: estoque ? parseInt(estoque) : 0, // Converte para número ou define 0
        }),
      });

      Alert.alert("Sucesso!", "Produto adicionado com sucesso!");

      // Limpa o formulário após o envio
      setForm({
        nome: "",
    sobre: "",
    valor: "",
    categoria: "",
    imagem: null as ImagePicker.ImagePickerAsset | null, // agora aceita objeto
    estoque: "",
  });
    } catch (error) {
      console.error(error);
      Alert.alert("Erro!", "Não foi possível adicionar o produto.");
    }
  };

  // Função para abrir a galeria de imagens
  const pickImage = async () => {
    // Solicita permissão da galeria
    const { status } = await ImagePicker.
      requestMediaLibraryPermissionsAsync();
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

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gerenciamento de Produtos</Text>

      <Text style={styles.subtitle}>1. Adicionar Produtos</Text>
      <View style={styles.formContainer}>
        {/* Campo de imagem */}
        <Text style={styles.label}>Imagem</Text>
        <TouchableOpacity
          style={styles.imagePickerButton}
          onPress={pickImage}
        >
          <Text style={styles.imagePickerText}>
            {form.imagem ? "Imagem selecionada" : "Escolher arquivo"}
          </Text>
        </TouchableOpacity>

        {/* Campo de nome */}
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do produto"
          onChangeText={(text) => setForm({ ...form, nome: text })}
          value={form.nome}
        />

        {/* Campo de valor */}
        <Text style={styles.label}>Valor</Text>
        <TextInput
          style={styles.input}
          placeholder="39.99"
          keyboardType="numeric" // Teclado numérico para valores
          onChangeText={(text) => setForm({ ...form, valor: text })}
          value={form.valor}
        />

        {/* Campo sobre */}
        <Text style={styles.label}>Sobre (Opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Descrição do produto"
          onChangeText={(text) => setForm({ ...form, sobre: text })}
          value={form.sobre}
        />

        {/* Campo estoque */}
        <Text style={styles.label}>Estoque (Opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Quantidade"
          keyboardType="numeric"
          onChangeText={(text) => setForm({ ...form, estoque: text })}
          value={form.estoque}
        />

        {/* Grupo de botões de rádio */}
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.radioGroup}>
          {[
            "Roupas",
            "Cosméticos",
            "Masculino",
            "Feminino",
            "Infantil",
            "Outros",
          ].map((categoria) => (
            <TouchableOpacity
              key={categoria}
              style={styles.radioButton}
              onPress={() => setForm({ ...form, categoria })}
            >
              <View style={styles.radioCircle}>
                {form.categoria === categoria && (
                  <View style={styles.checkedCircle} />
                )}
              </View>
              <Text style={styles.radioLabel}>{categoria}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Botão de envio */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>2. Remover Produtos</Text>
      <Text style={styles.subtitle}>3. Aplicar desconto</Text>
    </ScrollView>
  );
}