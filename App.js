import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailScreen from './src/screens/DetailScreen';
import KonfirmasiScreen from './src/screens/KonfirmasiScreen';
import { theme } from './src/theme/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: theme.primary },
          headerTintColor: theme.onPrimary,
          headerTitleStyle: { fontWeight: '700' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'SayurMayur 🥬' }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detail Produk' }} />
        <Stack.Screen name="Konfirmasi" component={KonfirmasiScreen} options={{ title: 'Konfirmasi Pesanan' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
