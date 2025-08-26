import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';

export default function AnaliseScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />

      <View style={styles.container}>
        <Text style={styles.title}>Painel de análise</Text>
        <Text style={styles.subtitle}>Status -</Text>

        <View style={styles.card}>
          <FontAwesome5 name="box-open" size={45} color="#C2A33E" />
          <Text style={styles.cardText}>Acabou no estoque</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>12</Text>
          </View>
        </View>

        <View style={styles.card}>
          <FontAwesome5 name="boxes" size={45} color="#8A1B58" />
          <Text style={styles.cardText}>Em espera</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>24</Text>
          </View>
        </View>

        <View style={styles.card}>
          <FontAwesome5 name="truck" size={45} color="#F79AC0" />
          <Text style={styles.cardText}>Enviado</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>36</Text>
          </View>
        </View>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    color: '#8A1B58',
    fontWeight: 'bold',
    marginBottom: 34,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efddbb',
    padding: 40,
    borderRadius: 10,
    marginBottom: 12,
  },
  cardText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 24,
    color: '#333',
  },
  badge: {
    backgroundColor: '#8A1B58',
    borderRadius: 6,
    paddingVertical: 24,
    paddingHorizontal: 30,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
