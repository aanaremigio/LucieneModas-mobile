import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Footer from '../components/footer';

export default function PerfilScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
          <Ionicons name="arrow-back" size={28} color="#8A1B58" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Luciene</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Nós mulheres lindas</Text>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 10,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 40,
  },
  headerTitle: {
    fontSize: 20,
    color: '#8A1B58',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#8A1B58',
    fontWeight: 'bold',
  },
});
