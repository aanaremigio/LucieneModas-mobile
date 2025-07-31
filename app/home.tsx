import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#8A1B58" />
      </TouchableOpacity>

      {/* Conteúdo com rolagem */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>lucienemodas26</Text>
        <Text style={styles.lyrics}>
          Numa folha qualquer eu desenho um sol amarelo{"\n"}
          E com cinco ou seis retas é fácil fazer um castelo{"\n"}
          Corro o lápis em torno da mão e me dou uma luva{"\n"}
          E se faço chover, com dois riscos tenho um guarda-chuva{"\n\n"}

          Se um pinguinho de tinta cai num pedacinho azul do papel{"\n"}
          Num instante imagino uma linda gaivota a voar no céu{"\n"}
          Vai voando, contornando a imensa curva{"\n"}
          Norte e sul, vou com ela{"\n"}
          Viajando Havaí, Pequim ou Istambul{"\n"}
          Pinto um barco a vela, branco navegando{"\n"}
          É tanto céu e mar num beijo azul{"\n\n"}

          Entre as nuvens vem surgindo um lindo avião{"\n"}
          Rosa e grená{"\n"}
          Tudo em volta colorindo{"\n"}
          Com suas luzes a piscar{"\n"}
          Basta imaginar e ele está partindo{"\n"}
          Sereno e lindo{"\n"}
          E se a gente quiser{"\n"}
          Ele vai pousar...
           Numa folha qualquer eu desenho um sol amarelo{"\n"}
          E com cinco ou seis retas é fácil fazer um castelo{"\n"}
          Corro o lápis em torno da mão e me dou uma luva{"\n"}
          E se faço chover, com dois riscos tenho um guarda-chuva{"\n\n"}

          Se um pinguinho de tinta cai num pedacinho azul do papel{"\n"}
          Num instante imagino uma linda gaivota a voar no céu{"\n"}
          Vai voando, contornando a imensa curva{"\n"}
          Norte e sul, vou com ela{"\n"}
          Viajando Havaí, Pequim ou Istambul{"\n"}
          Pinto um barco a vela, branco navegando{"\n"}
          É tanto céu e mar num beijo azul{"\n\n"}

          Entre as nuvens vem surgindo um lindo avião{"\n"}
          Rosa e grená{"\n"}
          Tudo em volta colorindo{"\n"}
          Com suas luzes a piscar{"\n"}
          Basta imaginar e ele está partindo{"\n"}
          Sereno e lindo{"\n"}
          E se a gente quiser{"\n"}
          Ele vai pousar...
           Numa folha qualquer eu desenho um sol amarelo{"\n"}
          E com cinco ou seis retas é fácil fazer um castelo{"\n"}
          Corro o lápis em torno da mão e me dou uma luva{"\n"}
          E se faço chover, com dois riscos tenho um guarda-chuva{"\n\n"}

          Se um pinguinho de tinta cai num pedacinho azul do papel{"\n"}
          Num instante imagino uma linda gaivota a voar no céu{"\n"}
          Vai voando, contornando a imensa curva{"\n"}
          Norte e sul, vou com ela{"\n"}
          Viajando Havaí, Pequim ou Istambul{"\n"}
          Pinto um barco a vela, branco navegando{"\n"}
          É tanto céu e mar num beijo azul{"\n\n"}

          Entre as nuvens vem surgindo um lindo avião{"\n"}
          Rosa e grená{"\n"}
          Tudo em volta colorindo{"\n"}
          Com suas luzes a piscar{"\n"}
          Basta imaginar e ele está partindo{"\n"}
          Sereno e lindo{"\n"}
          E se a gente quiser{"\n"}
          Ele vai pousar...
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  scrollContent: {
    paddingTop: 40,
    paddingBottom: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#8A1B58',
    textAlign: 'center',
  },
  lyrics: {
    fontSize: 16,
    color: '#333',
    lineHeight: 26
  },
});
