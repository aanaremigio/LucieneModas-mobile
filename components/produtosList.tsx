import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { scale, verticalScale, moderateScale, fontScale } from '../coisasuteis/scale';

export default async function ProdutosList() {
const response = await fetch ('https://0j59qgbr-3000.brs.devtunnels.ms/api/produtos');
  const produtos = await response.json(); 
return (<>
{/* Seção Produtos */}
      <Text style={styles.sectionTitle}>Produtos</Text>
      <ScrollView contentContainerStyle={styles.productGrid}>
        {produtos.map((p : any, i : number) => (
            <View style={styles.productCard} key={i}>
            <Ionicons name="shirt-outline" size={moderateScale(32)} color="#555" />
            <Text style={styles.productText}>{p.nome} R{p.valor}</Text>
          </View>
        ))}
      </ScrollView>
      </>)}

const styles = StyleSheet.create({
      sectionTitle: {
        fontWeight: 'bold',
        fontSize: fontScale(18),
        marginTop: verticalScale(20),
        marginLeft: scale(20),
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