import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';

const pedidosMock = [
  {
    id: 1,
    nome: 'Ana Lívia Remigio',
    email: 'livia.remigio@academico.ifpb.edu.br',
    itens: [
      { nome: 'Blusa branca', preco: 30.0 },
      { nome: 'Esmalte', preco: 15.9 },
      { nome: 'Prato', preco: 19.5 },
    ],
    numero: 102,
    data: '30/05/2025',
    valorTotal: 205.0,
    endereco: {
      cep: '58397-000 / Areia-PB',
      rua: 'Rua Padre Chacon',
      numero: '414',
      bairro: 'Bairro Frei Damião',
    },
    codigoRastreio: 'EX123456789BR',
  },
];

export default function PedidosListScreen() {
  const [statusEnviado, setStatusEnviado] = useState(false);
  const [email, setEmail] = useState(pedidosMock[0].email);
  const [codigoRastreio, setCodigoRastreio] = useState(
    pedidosMock[0].codigoRastreio
  );

  const toggleStatus = () => {
    setStatusEnviado((prev) => !prev);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
      >
        {pedidosMock.map((pedido) => (
          <View key={pedido.id} style={styles.pedidoCard}>
            {/* Nome e e-mail */}
            <View style={styles.headerInfo}>
              <Text style={styles.nome}>@{pedido.nome}</Text>
              <Text style={styles.email}>{pedido.email}</Text>
            </View>

            {/* Itens */}
            <View style={styles.itensContainer}>
              {pedido.itens.map((item, index) => (
                <View key={index} style={styles.itemRow}>
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemPreco}>
                    R$ {item.preco.toFixed(2).replace('.', ',')}
                  </Text>
                </View>
              ))}
            </View>

            {/* Detalhes */}
            <View style={styles.detailsContainer}>
              <Text style={styles.numero}>Pedido #{pedido.numero}</Text>
              <Text style={styles.data}>Data: {pedido.data}</Text>
              <Text style={styles.total}>
                Total: R$ {pedido.valorTotal.toFixed(2).replace('.', ',')}
              </Text>
            </View>

            {/* Botão atualizar */}
            <TouchableOpacity
              style={[
                styles.updateButton,
                statusEnviado
                  ? styles.updateButtonEnviado
                  : styles.updateButtonPendente,
              ]}
              onPress={toggleStatus}
            >
              <Text style={styles.updateButtonText}>
                {statusEnviado ? 'Enviado' : 'Atualizar para enviado'}
              </Text>
            </TouchableOpacity>

            {/* Endereço */}
            <View style={styles.enderecoContainer}>
              <Text style={styles.enderecoLabel}>Endereço:</Text>
              <Text style={styles.input}>{pedido.endereco.cep}</Text>
              <Text style={styles.input}>{pedido.endereco.rua}</Text>
              <Text style={styles.input}>{pedido.endereco.numero}</Text>
              <Text style={styles.input}>{pedido.endereco.bairro}</Text>
            </View>

            {/* Enviar confirmação */}
            <Text style={styles.sectionTitle}>Enviar confirmação por E-mail:</Text>
            <TextInput
              style={styles.inputEditable}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.inputEditable}
              value={codigoRastreio}
              onChangeText={setCodigoRastreio}
            />

            {/* Mensagem automática */}
            <View style={styles.mensagemBox}>
              <Text style={styles.mensagemTexto}>
                Olá, Seu pedido foi enviado com sucesso! 🚚{'\n'}
                Aqui está o código de rastreio: {codigoRastreio}.{'\n'}
                Você pode acompanhar sua entrega pelo site dos Correios:{' '}
                https://www2.correios.com.br/sistemas/rastreamento{'\n\n'}
                Agradecemos pela sua compra!{'\n'}
                <Text style={{ fontStyle: 'italic' }}>- Equipe Luciene Modas</Text>
              </Text>
            </View>

            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Enviar confirmação</Text>
            </TouchableOpacity>
          </View>
        ))}

      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // deixa espaço para o footer
  },
  pedidoCard: {
    backgroundColor: '#F5ECD8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  headerInfo: {
    marginBottom: 12,
    alignItems: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#555',
  },
  itensContainer: {
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  itemNome: {
    fontSize: 14,
    color: '#333',
  },
  itemPreco: {
    fontSize: 14,
    color: '#333',
  },
  detailsContainer: {
    marginBottom: 12,
  },
  numero: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  data: {
    fontSize: 12,
    color: '#444',
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 6,
  },
  updateButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  updateButtonPendente: {
    backgroundColor: '#E2AD48', // dourado
  },
  updateButtonEnviado: {
    backgroundColor: '#4CAF50', // verde
  },
  updateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  enderecoContainer: {
    marginBottom: 12,
  },
  enderecoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  input: {
    backgroundColor: '#E2AD48',
    borderRadius: 6,
    padding: 6,
    marginBottom: 6,
    fontSize: 12,
    color: '#552A1C',
  },
  inputEditable: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#C68A4E',
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
    fontSize: 12,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  mensagemBox: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 12,
  },
  mensagemTexto: {
    fontSize: 12,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#C68A4E',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
