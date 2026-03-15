import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';

const navigationTheme = {
  dark: false,
  colors: {
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
