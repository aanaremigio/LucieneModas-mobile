import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';

// Definindo o tipo para o pedido
type Pedido = {
  id: number;
  nome: string;
  email: string;
  status: string;
  data: string;
  valor: number;
  numero: number;
  produtos: {
    id: number;
    nome: string;
    preco: number;
  }[];
  endereco: {
    cep: string;
    cidade: string;
    rua: string;
    numero: string;
    bairro: string;
  };
};

type RootStackParamList = {
  PedidosList: { pedido: Pedido };
};

export default function PedidosListScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'PedidosList'>>();
  const { pedido } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <View style={styles.container}>
        <Text style={styles.nome}>@{pedido.nome}</Text>
        <Text style={styles.email}>{pedido.email}</Text>

        {/* Produtos */}
        <FlatList
          data={pedido.produtos}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.produtoCard}>
              <Text style={styles.produtoNome}>{item.nome}</Text>
              <Text style={styles.produtoPreco}>
                R$ {item.preco.toFixed(2).replace('.', ',')}
              </Text>
            </View>
          )}
        />

        {/* Pedido info */}
        <Text style={styles.pedidoNum}>Pedido #{pedido.numero}</Text>
        <Text style={styles.status}>{pedido.status}</Text>
        <Text style={styles.data}>Data: {pedido.data}</Text>
        <Text style={styles.total}>
          Total: R$ {pedido.valor.toFixed(2).replace('.', ',')}
        </Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Atualizar para enviado</Text>
        </TouchableOpacity>

        {/* Endereço */}
        <Text style={styles.sectionTitle}>Endereço:</Text>
        <Text>CEP - Cidade: {pedido.endereco.cep} / {pedido.endereco.cidade}</Text>
        <Text>Rua: {pedido.endereco.rua}</Text>
        <Text>Número: {pedido.endereco.numero}</Text>
        <Text>Bairro: {pedido.endereco.bairro}</Text>

        {/* Email confirmação */}
        <Text style={styles.sectionTitle}>Enviar confirmação por E-mail:</Text>
        <Text style={styles.email}>{pedido.email}</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Enviar confirmação</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#FAF5E6' },
  nome: { fontSize: 18, fontWeight: 'bold', marginBottom: 4 },
  email: { fontSize: 14, marginBottom: 16, color: '#555' },
  produtoCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  produtoNome: { fontSize: 13, fontWeight: 'bold' },
  produtoPreco: { fontSize: 12, color: '#444' },
  pedidoNum: { marginTop: 16, fontWeight: 'bold', fontSize: 16 },
  status: { color: '#8A1B58', fontWeight: 'bold', marginTop: 4 },
  data: { fontSize: 13, marginTop: 4 },
  total: { fontSize: 15, marginTop: 6, fontWeight: 'bold' },
  btn: {
    backgroundColor: '#F5B600',
    padding: 10,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  btnText: { fontWeight: 'bold', color: '#000' },
  sectionTitle: { marginTop: 16, fontWeight: 'bold', fontSize: 14 },
});
