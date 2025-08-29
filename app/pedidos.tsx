import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';


// Mock de pedidos
const pedidos = [
  {
    id: 1,
    nome: 'Ana Lívia Remigio',
    status: 'Em espera',
    data: '30/05/2025',
    valor: 205.00,
    numero: 102,
  },
  {
    id: 2,
    nome: 'Yago Jordas',
    status: 'Enviado',
    data: '07/05/2025',
    valor: 15.00,
    numero: 162,
  },
  {
    id: 3,
    nome: 'Luana de Almeida',
    status: 'Em espera',
    data: '22/06/2025',
    valor: 150.87,
    numero: 130,
  },
  {
    id: 4,
    nome: 'Renata Pontes',
    status: 'Enviado',
    data: '06/06/2025',
    valor: 101.92,
    numero: 105,
  },
  {
    id: 5,
    nome: 'Luciene Izidro',
    status: 'Em espera',
    data: '14/06/2025',
    valor: 46.34,
    numero: 131,
  },
];


// Estilo para a badge de status
const getStatusStyle = (status: string) => ({
  backgroundColor: status === 'Enviado' ? '#F5B600' : '#8A1B58',
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 10,
  marginTop: 4,
  alignSelf: 'flex-start' as const,
});


export default function PedidosScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />


      <View style={styles.container}>
        <Text style={styles.title}>Pedidos</Text>


        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.pedidoCard}>
              <View style={styles.leftIcon}>
                <MaterialCommunityIcons
                  name="package-variant-closed"
                  size={40}
                  color="#8A1B58"
                />
              </View>


              <View style={styles.pedidoInfo}>
                <Text style={styles.nome}>@{item.nome}</Text>
                <Text style={styles.numero}>Pedido #{item.numero}</Text>


                <View style={getStatusStyle(item.status)}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>


                <Text style={styles.data}>{item.data}</Text>
              </View>


              <View style={styles.valorArea}>
                <Text style={styles.moeda}>R$</Text>
                <Text style={styles.valor}>
                  {item.valor.toFixed(2).replace('.', ',')}
                </Text>
              </View>
            </View>
          )}
        />
      </View>


      <Footer />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  pedidoCard: {
    flexDirection: 'row',
    backgroundColor: '#F5ECD8',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  leftIcon: {
    marginRight: 12,
  },
  pedidoInfo: {
    flex: 1,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  numero: {
    fontSize: 13,
    color: '#444',
  },
  data: {
    fontSize: 12,
    color: '#444',
    marginTop: 4,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  valorArea: {
    alignItems: 'flex-end',
  },
  moeda: {
    fontSize: 11,
    color: '#555',
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});





