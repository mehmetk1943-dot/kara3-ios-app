import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WishlistStackParamList } from '../types';
import { WishlistScreen } from '../screens/WishlistScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';

const Stack = createNativeStackNavigator<WishlistStackParamList>();

export const WishlistStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Wishlist" component={WishlistScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);
