import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const slideAnim = useRef(new Animated.Value(width)).current; // Começa fora da tela (direita)
  const router = useRouter();

  // Animação para abrir/fechar
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : width, // Se aberto, move para posição 0
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  // Função para navegar
  const navigate = (path: string) => {
    onClose();
    router.push(path as never);
  };

  if (!isOpen) return null;

  return (
    <View style={styles.overlay}>
      {/* Fecha ao clicar no fundo */}
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
        <Text style={styles.subtitle}>Funcionalidades-</Text>

        <TouchableOpacity onPress={() => navigate('/analise')}>
          <Text style={styles.link}>Painel de Análise</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('/adicionar')}>
          <Text style={styles.link}>Adicionar/Remover</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigate('/pedidos')}>
          <Text style={styles.link}>Pedidos</Text>
        </TouchableOpacity>

        <Text style={styles.subtitle}>Categorias-</Text>
        <Text style={styles.link}>Masculino</Text>
        <Text style={styles.link}>Feminino</Text>
        <Text style={styles.link}>Infantil</Text>
        <Text style={styles.link}>Cosméticos</Text>
        <Text style={styles.link}>Outros</Text>

        {/* Botão Sair */}
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
    zIndex: 9999, // Garante que fica na frente de tudo
  },
  grayBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    position: 'absolute',
    right: 0, // Fica do lado direito
    top: 0,
    bottom: 0,
    width: width * 0.5, // Metade da tela
    backgroundColor: '#8A1B58',
    padding: 20,
    zIndex: 10000, // Garante que o menu esteja acima do fundo
  },
  title: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  subtitle: {
    color: '#FFD700',
    fontSize: 16,
    marginTop: 10,
  },
  link: {
    color: '#FFD700',
    fontSize: 14,
    marginTop: 5,
  },
  exitButton: {
    borderColor: '#FFD700',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  exitText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
