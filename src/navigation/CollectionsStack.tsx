import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CollectionsStackParamList } from '../types';
import { CollectionsScreen } from '../screens/CollectionsScreen';
import { ProductListScreen } from '../screens/ProductListScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { CartScreen } from '../screens/CartScreen';

const Stack = createNativeStackNavigator<CollectionsStackParamList>();

export const CollectionsStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Collections" component={CollectionsScreen} />
    <Stack.Screen name="ProductList" component={ProductListScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);
