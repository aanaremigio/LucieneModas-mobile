import { useLocalSearchParams } from 'expo-router';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { fontScale, moderateScale, scale, verticalScale } from '../coisasuteis/scale';
import Header from '../components/header';
import Footer from '../components/footer';

export default function Produto() {
  const params = useLocalSearchParams();

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
});
 