import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const slideAnim = useRef(new Animated.Value(width)).current;
  const router = useRouter();
  const [showFuncionalidades, setShowFuncionalidades] = useState(false);
  const [showCategorias, setShowCategorias] = useState(false);

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const navigate = (path: string) => {
    onClose();
    router.push(path as never);
  };

  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.grayBackground} />
      </TouchableWithoutFeedback>

      {/* Menu lateral */}
      <Animated.View
        style={[
          styles.menu,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <Text style={styles.title}>Home</Text>

        {/* Funcionalidades */}
        <TouchableOpacity onPress={() => setShowFuncionalidades(prev => !prev)}>
          <Text style={styles.subtitle}>↓ Funcionalidades</Text>
        </TouchableOpacity>

        {showFuncionalidades && (
          <>
            <TouchableOpacity onPress={() => navigate('/analise')}>
              <Text style={styles.link}>Painel de Análise</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('/adicionar')}>
              <Text style={styles.link}>Adicionar/Remover</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigate('/pedidos')}>
              <Text style={styles.link}>Pedidos</Text>
            </TouchableOpacity>
          </>
        )}

        {/* Categorias */}
        <TouchableOpacity onPress={() => setShowCategorias(prev => !prev)}>
          <Text style={styles.subtitle}>↓ Categorias</Text>
        </TouchableOpacity>

        {showCategorias && (
          <>
            <Text style={styles.link}>Masculino</Text>
            <Text style={styles.link}>Feminino</Text>
            <Text style={styles.link}>Infantil</Text>
            <Text style={styles.link}>Cosméticos</Text>
            <Text style={styles.link}>Outros</Text>
          </>
        )}

        <TouchableOpacity style={styles.exitButton} onPress={onClose}>
          <Text style={styles.exitText}>Sair</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999, 
  },
  grayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    position: 'absolute',
    right: 0,
    top: 50,
    bottom: 0,
    width: width * 0.6,
    backgroundColor: '#8A1B58',
    paddingHorizontal: 20,
    paddingTop: 80,
    zIndex: 10000,
  },
  title: {
    color: '#ffffffff',
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 25,
  },
  subtitle: {
    color: '#FFD700',
    fontSize: 20,
    marginTop: 25,
    marginBottom: 10,
  },
  link: {
    color: '#ffffffff',
    fontSize: 17,
    marginVertical: 5,
  },
  exitButton: {
    position: 'absolute',
    bottom: 65,
    right: 25,
    borderColor: '#FFD700',
    borderWidth: 3,
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  exitText: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 25,
  },
});