import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Header from '../components/header';
import Footer from '../components/footer';
import { scale, verticalScale, moderateScale, fontScale } from '../coisasuteis/scale';


export default function HomeScreen() {
  const router = useRouter();


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />


      {/* Seção Funcionalidades */}
      <Text style={styles.sectionTitle}>Funcionalidades</Text>
      <View style={styles.featureContainer}>
        <TouchableOpacity style={styles.featureItem} onPress={() => router.push('/analise')}>
          <MaterialIcons name="analytics" size={moderateScale(28)} color="#8A1B58" />
          <Text style={styles.featureText}>Painel</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.featureItem} onPress={() => router.push('/adicionar')}>
          <MaterialIcons name="playlist-add" size={moderateScale(28)} color="#8A1B58" />
          <Text style={styles.featureText}>Adicionar</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.featureItem} onPress={() => router.push('/pedidos')}>
          <MaterialIcons name="inventory" size={moderateScale(28)} color="#8A1B58" />
          <Text style={styles.featureText}>Pedidos</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.featureItem} onPress={() => router.push('/remover')}>
          <MaterialIcons name="delete" size={moderateScale(28)} color="#8A1B58" />
          <Text style={styles.featureText}>Remover</Text>
        </TouchableOpacity>
      </View>


      {/* Seção Produtos */}
      <Text style={styles.sectionTitle}>Produtos</Text>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {Array.from({ length: 9 }).map((_, i) => (
          <View style={styles.productCard} key={i}>
            <Ionicons name="shirt-outline" size={moderateScale(32)} color="#555" />
            <Text style={styles.productText}>Produto R$XX,XX</Text>
          </View>
        ))}
      </ScrollView>


      <Footer />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: fontScale(18),
    marginTop: verticalScale(20),
    marginLeft: scale(20),
    color: '#8A1B58',
  },
  featureContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: verticalScale(15),
    paddingHorizontal: scale(10),
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    marginVertical: verticalScale(5),
    width: scale(90),
  },
  featureText: {
    fontSize: fontScale(12),
    marginTop: verticalScale(5),
    textAlign: 'center',
    color: '#8A1B58',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: scale(10),
    paddingBottom: verticalScale(80),
  },
  productCard: {
    alignItems: 'center',
    marginVertical: verticalScale(10),
    backgroundColor: '#f0f0f0',
    padding: moderateScale(10),
    borderRadius: moderateScale(10),
    width: '45%',
  },
  productText: {
    fontSize: fontScale(12),
    marginTop: verticalScale(5),
    textAlign: 'center',
  },
});
