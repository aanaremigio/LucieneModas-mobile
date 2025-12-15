import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Footer from "../components/footer";
import Header from "../components/header";
import { pedidos } from "../dados/pedidosDados";

export default function PedidoListScreen() {
  const { pedidoId } = useLocalSearchParams();
  const pedido = pedidos.find((p) => p.id === Number(pedidoId));

  const [statusEnviado, setStatusEnviado] = useState(
    pedido?.status === "Enviado"
  );
  const [codigoRastreio, setCodigoRastreio] = useState(
    pedido?.codigoRastreio || ""
  );

  if (!pedido) {
    return (
      <SafeAreaView>
        <Text>Pedido não encontrado.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 80}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.pedidoCard}>
            {/* Nome e e-mail */}
            <Text style={styles.nome}>@{pedido.nome}</Text>
            <Text style={styles.email}>{pedido.email}</Text>

            {/* Itens */}
            <View style={styles.itensRow}>
              {pedido.itens.map((item, index) => (
                <View key={index} style={styles.itemBox}>
                  <View style={styles.itemImagem} />
                  <Text style={styles.itemNome}>{item.nome}</Text>
                  <Text style={styles.itemPreco}>
                    R$ {item.preco.toFixed(2).replace(".", ",")}
                  </Text>
                </View>
              ))}
            </View>

            {/* Pedido */}
            <Text style={styles.numeroPedido}>Pedido #{pedido.numero}</Text>

            {/* Status */}
            <View
              style={[
                styles.statusBadge,
                statusEnviado ? styles.statusEnviado : styles.statusPendente,
              ]}
            >
              <Text style={styles.statusText}>
                {statusEnviado ? "Enviado" : "Em espera"}
              </Text>
            </View>

            {/* Data e Total */}
            <View style={styles.detailsRow}>
              <Text style={styles.info}>Data: {pedido.data}</Text>
              <Text style={styles.info}>
                Total: R$ {pedido.valorTotal.toFixed(2).replace(".", ",")}
              </Text>
            </View>

            {/* Botão Atualizar */}
            <TouchableOpacity
              style={styles.botaoAtualizar}
              onPress={() => setStatusEnviado((prev) => !prev)}
            >
              <Text style={styles.textoBotao}>
                Atualizar para {statusEnviado ? "espera" : "enviado"}
              </Text>
            </TouchableOpacity>

            {/* Endereço */}
            <View style={styles.endereco}>
              <Text style={styles.enderecoTitulo}>Endereço:</Text>
              <Text style={styles.enderecoValor}>{pedido.endereco.cep}</Text>
              <Text style={styles.enderecoValor}>{pedido.endereco.rua}</Text>
              <Text style={styles.enderecoValor}>{pedido.endereco.numero}</Text>
              <Text style={styles.enderecoValor}>{pedido.endereco.bairro}</Text>
            </View>

            {/* Confirmação */}
            <View style={styles.confirmacao}>
              <Text style={styles.confirmacaoTitulo}>
                Enviar confirmação por E-mail:
              </Text>

              <TextInput
                style={styles.input}
                value={pedido.email}
                editable={false}
              />

              <TextInput
                style={styles.input}
                placeholder="Digite o código de rastreio"
                value={codigoRastreio}
                onChangeText={setCodigoRastreio}
              />

              <View style={styles.mensagemBox}>
                <Text style={styles.mensagemTexto}>
                  Olá, Seu pedido foi enviado com sucesso! 🚚{"\n"}
                  Código de rastreio: {codigoRastreio || "EX123456789BR"}
                  {"\n"}
                  Acompanhe em: https://www.correios.com.br/rastreamento{"\n\n"}
                  Agradecemos pela sua compra!{"\n"}- Equipe Luciene Modas
                </Text>
              </View>

              <TouchableOpacity style={styles.botaoEnviar}>
                <Text style={styles.textoBotaoEnviar}>
                  Enviar confirmação
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 120,
  },
  pedidoCard: {
    backgroundColor: "#F5ECD8",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  nome: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
    color: "#000",
  },
  email: {
    fontSize: 12,
    color: "#444",
    textAlign: "center",
    marginBottom: 12,
  },
  itensRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  itemBox: {
    alignItems: "center",
    width: 80,
  },
  itemImagem: {
    width: 60,
    height: 60,
    backgroundColor: "#ccc",
    borderRadius: 8,
    marginBottom: 4,
  },
  itemNome: {
    fontSize: 12,
    textAlign: "center",
    color: "#000",
  },
  itemPreco: {
    fontSize: 11,
    color: "#444",
    textAlign: "center",
  },
  numeroPedido: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 10,
  },
  statusPendente: {
    backgroundColor: "#8A1B58",
  },
  statusEnviado: {
    backgroundColor: "#C68A4E",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  detailsRow: {
    marginBottom: 10,
  },
  info: {
    fontSize: 14,
    color: "#000",
    marginBottom: 4,
  },
  botaoAtualizar: {
    backgroundColor: "#E2AD48",
    padding: 10,
    borderRadius: 6,
    alignSelf: "center",
    marginVertical: 10,
  },
  textoBotao: {
    color: "#000",
    fontWeight: "bold",
  },
  endereco: {
    marginTop: 16,
  },
  enderecoTitulo: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 14,
  },
  enderecoValor: {
    backgroundColor: "#E2AD48",
    padding: 6,
    borderRadius: 4,
    fontSize: 12,
    marginBottom: 6,
    color: "#552A1C",
  },
  confirmacao: {
    marginTop: 20,
  },
  confirmacaoTitulo: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
    fontSize: 12,
  },
  mensagemBox: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  mensagemTexto: {
    fontSize: 12,
    color: "#333",
  },
  botaoEnviar: {
    backgroundColor: "#C68A4E",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  textoBotaoEnviar: {
    fontWeight: "bold",
    color: "#fff",
  },
});
