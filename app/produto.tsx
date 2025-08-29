import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontScale, moderateScale, scale, verticalScale } from '../coisasuteis/scale';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Produto() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos/${params.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: params.imagem }), // Envia imagem se necessário
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Produto deletado com sucesso!");
        router.back(); // volta para a tela anterior (lista de produtos)
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
        {/* Imagem */}
        <Image source={{ uri: params.imagem as string }} style={styles.image} resizeMode="contain" />

        {/* Categoria e Preço */}
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.category}>{params.categoria}</Text>
            <Text style={styles.title}>{params.nome}</Text>
          </View>
          <Text style={styles.price}>R$ {params.valor}</Text>
        </View>

        {/* Descrição */}
        <Text style={styles.descriptionTitle}>Descrição</Text>
        <Text style={styles.description}>
          {params.sobre || "Sem descrição disponível."}
        </Text>

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
    padding: scale(20),
    backgroundColor: '#fff',
    paddingBottom: verticalScale(80),
  },
  image: {
    width: '100%',
    height: verticalScale(280),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(25),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: verticalScale(15),
  },
  category: {
    fontSize: fontScale(14),
    color: '#777',
    marginBottom: verticalScale(4),
  },
  title: {
    fontSize: fontScale(18),
    fontWeight: 'bold',
    color: '#8A1B58',
    maxWidth: '75%',
  },
  price: {
    fontSize: fontScale(18),
    fontWeight: 'bold',
    color: '#333',
  },
  descriptionTitle: {
    fontSize: fontScale(16),
    color: '#8A1B58',
    fontWeight: 'bold',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(5),
  },
  description: {
    fontSize: fontScale(14),
    textAlign: 'justify',
    color: '#555',
    marginBottom: verticalScale(30),
  },
  deleteButton: {
    backgroundColor: '#8A1B58',
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    marginTop: verticalScale(10),
  },
  deleteText: {
    color: '#fff',
    fontSize: fontScale(16),
    fontWeight: 'bold',
  },
});
