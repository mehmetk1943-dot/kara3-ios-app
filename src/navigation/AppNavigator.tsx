import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';

// Spread DefaultTheme so the required `fonts` field (added in v7) is always present
const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0D8B83',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#1A1A1A',
    border: '#E8E8E8',
    notification: '#0D8B83',
  },
};

export const AppNavigator: React.FC = () => (
  <NavigationContainer theme={navigationTheme}>
    <TabNavigator />
  </NavigationContainer>
);
