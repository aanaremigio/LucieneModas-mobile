import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { fontScale, scale, verticalScale } from '../coisasuteis/scale';

const { width, height } = Dimensions.get('window');

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

      <Animated.View
        style={[
          styles.menu,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <Text style={styles.title}>Home</Text>

        <TouchableOpacity onPress={() => setShowFuncionalidades(prev => !prev)}>
          <Text style={styles.subtitle}>↓ Funcionalidades</Text>
        </TouchableOpacity>

        {showFuncionalidades && (
          <>
            <TouchableOpacity onPress={() => navigate('/analise')}>
              <Text style={styles.link}>Painel de Análise</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('/adicionar')}>
              <Text style={styles.link}>Adicionar Produto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('/remover')}>
              <Text style={styles.link}>Remover Produto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate('/pedidos')}>
              <Text style={styles.link}>Pedidos</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity onPress={() => setShowCategorias(prev => !prev)}>
          <Text style={styles.subtitle}>↓ Categorias</Text>
        </TouchableOpacity>

        {showCategorias && (
          <>
          <TouchableOpacity onPress={() => navigate('/roupa')}>
            <Text style={styles.link}>Roupas</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('/masculino')}>
            <Text style={styles.link}>Masculino</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('/feminino')}>
            <Text style={styles.link}>Feminino</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('/infantil')}>
            <Text style={styles.link}>Infantil</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('/cosmeticos')}>
            <Text style={styles.link}>Cosméticos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('/outros')}>
            <Text style={styles.link}>Outros</Text>
          </TouchableOpacity>
          </>
        )} 
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
    top: verticalScale(50),
    bottom: 0,
    width: width * 0.6,
    backgroundColor: '#8A1B58',
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(100),
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: fontScale(35),
    marginBottom: verticalScale(25),
  },
  subtitle: {
    color: '#dec533ff',
    fontSize: fontScale(20),
    marginTop: verticalScale(25),
    marginBottom: verticalScale(10),
  },
  link: {
    color: '#fff',
    fontSize: fontScale(17),
    marginVertical: verticalScale(5),
  },
});
