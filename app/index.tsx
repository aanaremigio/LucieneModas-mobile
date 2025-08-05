import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

export default function IndexController() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/abertura');
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return <View style={{ flex: 1, backgroundColor: '#fff' }} />;
}
