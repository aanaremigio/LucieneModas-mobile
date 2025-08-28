import { useLocalSearchParams } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fontScale, moderateScale, scale, verticalScale } from '../coisasuteis/scale';
import Footer from '../components/footer';
import Header from '../components/header';

export default function Produto() {
  const params = useLocalSearchParams();
  const handleSubmit = async (id : any, imagem : any) => {

      try {
  
        await fetch(`https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos/${id}`, {
          method: "DELETE",
          body: JSON.stringify({url: imagem}),
          headers: { "Content-Type": "application/json" },
        });
  
        
        return Alert.alert("Sucesso!", "Produto adicionado com sucesso!");
  
      } catch (error) {
        console.error(error);
        return Alert.alert("Erro!", "Não foi possível adicionar o produto.");
      }
    };

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: params.imagem as string }} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{params.nome}</Text>
        <Text style={styles.price}>R$ {params.valor}</Text>
        <Text style={styles.description}>
          {params.descricao || "Sem descrição disponível."}
        </Text>
        <TouchableOpacity style={styles.salvarBtn} onPress={() => handleSubmit(params.id, params.imagem)}>
          <Text style={styles.salvarText}>Deletar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Footer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: scale(20),
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingBottom: verticalScale(40),
  },
  image: {
    width: '80%',
    height: verticalScale(350),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(30),
  },
  title: {
    fontSize: fontScale(20),
    fontWeight: 'bold',
    color: '#8A1B58',
    marginBottom: verticalScale(10),
    textAlign: 'center',
  },
  price: {
    fontSize: fontScale(18),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: verticalScale(15),
  },
  description: {
    fontSize: fontScale(14),
    textAlign: 'justify',
    color: '#555',
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
 