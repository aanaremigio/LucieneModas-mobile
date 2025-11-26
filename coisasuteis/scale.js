import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const baseWidth = 414;
const baseHeight = 896;

export const scale = (size) => (width / baseWidth) * size;
export const verticalScale = (size) => (height / baseHeight) * size;
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export const fontScale = (size) => size * PixelRatio.getFontScale();
