import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  fontScale,
  moderateScale,
  scale,
  verticalScale,
} from "../coisasuteis/scale";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Produto() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const estoque = Number(params.estoque || 0);
  const [quantidade, setQuantidade] = useState(estoque > 0 ? 1 : 0);

  const aumentarQuantidade = () => {
    if (quantidade < estoque) {
      setQuantidade(quantidade + 1);
    }
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://8gl74nbt-3000.brs.devtunnels.ms/api/produtos/${params.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: params.imagem }),
        }
      );

      if (response.ok) {
        Alert.alert("Sucesso", "Produto deletado com sucesso!");
        router.back();
      } else {
        Alert.alert("Erro", "Não foi possível deletar o produto.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao conectar com o servidor.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Fundo roxo rosado ocupando toda a largura */}
        <View style={styles.topBackground}>
          {/* Lápis no canto superior direito */}
          <TouchableOpacity
            style={styles.pencilButton}
            onPress={() => {
              router.push({
                pathname: "/adicionar",
                params: {
                  id: params.id,
                  nome: params.nome,
                  sobre: params.sobre,
                  valor: params.valor,
                  categoria: params.categoria,
                  estoque: params.estoque,
                  imagem: params.imagem,
                },
              });
            }}
          >
            <MaterialIcons name="edit" size={28} color="#FFD700" />
          </TouchableOpacity>

          {/* Imagem centralizada */}
          <Image
            source={{ uri: params.imagem as string }}
            style={styles.image}
            resizeMode="contain"
          />

          {/* Detalhe branco arredondado na parte inferior */}
          <View style={styles.whiteDetail} />
        </View>

        {/* Categoria, Nome e Preço com Estoque */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.category}>{params.categoria}</Text>
            <Text style={styles.title}>{params.nome}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.price}>R$ {params.valor}</Text>
            <Text style={styles.stockLabel}>Estoque: {estoque}</Text>
          </View>
        </View>

        {/* Descrição */}
        <Text style={styles.descriptionTitle}>Descrição</Text>
        <Text style={styles.description}>
          {params.sobre || "Sem descrição disponível."}
        </Text>

        {/* Controle de estoque */}
        <View style={styles.stockRow}>
          {estoque === 0 ? (
            <Text style={styles.warningText}>
              ⚠ O produto está esgotado, recomendo que apague!
            </Text>
          ) : (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={diminuirQuantidade}
              >
                <Text style={styles.quantityText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityNumber}>{quantidade}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={aumentarQuantidade}
              >
                <Text style={styles.quantityText}>+</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Botão deletar */}
        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteText}>Deletar Produto</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(260),
    paddingBottom: verticalScale(80),
    backgroundColor: "#fff",
  },
  topBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: verticalScale(260),
    backgroundColor: "#8A1B58",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: -40,
    borderBottomRightRadius: -40,
    zIndex: -1,
  },
  whiteDetail: {
    position: "absolute",
    bottom: -1,
    width: "100%",
    height: 40,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  image: {
    width: "70%",
    height: verticalScale(180),
    borderRadius: moderateScale(10),
    zIndex: 1,
  },
  pencilButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: verticalScale(15),
  },
  category: {
    fontSize: fontScale(14),
    color: "#777",
    marginBottom: verticalScale(4),
  },
  title: {
    fontSize: fontScale(18),
    fontWeight: "bold",
    color: "#8A1B58",
    maxWidth: "75%",
  },
  price: {
    fontSize: fontScale(18),
    fontWeight: "bold",
    color: "#333",
  },
  stockLabel: {
    fontSize: fontScale(12),
    color: "#888",
    marginTop: verticalScale(2),
  },
  descriptionTitle: {
    fontSize: fontScale(16),
    color: "#8A1B58",
    fontWeight: "bold",
    marginTop: verticalScale(10),
    marginBottom: verticalScale(5),
  },
  description: {
    fontSize: fontScale(14),
    textAlign: "justify",
    color: "#555",
    marginBottom: verticalScale(20),
  },
  stockRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(20),
  },
  warningText: {
    marginTop: verticalScale(8),
    color: "#F5B600",
    fontSize: fontScale(14),
    fontWeight: "bold",
    textAlign: "center",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#eee",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  deleteButton: {
    backgroundColor: "#8A1B58",
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    alignItems: "center",
    marginTop: verticalScale(10),
  },
  deleteText: {
    color: "#fff",
    fontSize: fontScale(16),
    fontWeight: "bold",
  },
});
