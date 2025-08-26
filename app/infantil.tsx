import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Footer from '../components/footer';
import Header from '../components/header';

export default function AnaliseScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>infantil</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    color: '#8A1B58',
    fontWeight: 'bold',
  },
});
