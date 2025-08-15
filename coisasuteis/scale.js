// coisasuteis/scale.js
import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base do iPhone XR
const baseWidth = 414;
const baseHeight = 896;

export const scale = (size) => (width / baseWidth) * size;
export const verticalScale = (size) => (height / baseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

// Para fontes (considera densidade de pixels)
export const fontScale = (size) => size * PixelRatio.getFontScale();
