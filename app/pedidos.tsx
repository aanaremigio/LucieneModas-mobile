import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Footer from "../components/footer";
import Header from "../components/header";
import { pedidos } from "../dados/pedidosDados";

const getStatusStyle = (status: string) => ({
  backgroundColor: status === "Enviado" ? "#F5B600" : "#8A1B58",
  paddingVertical: 3,
  paddingHorizontal: 10,
  borderRadius: 12,
  marginTop: 6,
  alignSelf: "flex-start" as const,
});

export default function PedidosScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <View style={styles.container}>
        <Text style={styles.title}>Pedidos</Text>
        <View style={styles.contadorContainer}>
          <View style={styles.contadorInfo}>
            <MaterialCommunityIcons
              name="clipboard-list"
              size={24}
              color="#8A1B58"
            />
            <Text style={styles.contadorText}>
              {pedidos.length} pedido{pedidos.length !== 1 ? "s" : ""}
            </Text>
          </View>
        </View>

        <FlatList
          data={pedidos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/pedidosList",
                  params: { pedidoId: item.id },
                })
              }
              style={styles.pedidoCard}
            >
              <View style={styles.leftIcon}>
                <MaterialCommunityIcons
                  name="package-variant-closed"
                  size={42}
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
                  {item.valorTotal.toFixed(2).replace(".", ",")}
                </Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#000",
  },
  contadorContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5ECD8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2D3A4",
  },
  contadorInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  contadorText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#8A1B58",
  },

  pedidoCard: {
    flexDirection: "row",
    backgroundColor: "#F5ECD8",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  leftIcon: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 6,
    marginRight: 14,
  },
  pedidoInfo: {
    flex: 1,
  },
  nome: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  numero: {
    fontSize: 13,
    color: "#444",
  },
  data: {
    fontSize: 12,
    color: "#444",
    marginTop: 4,
  },
  statusText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
  },
  valorArea: {
    alignItems: "flex-end",
  },
  moeda: {
    fontSize: 11,
    color: "#555",
  },
  valor: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
