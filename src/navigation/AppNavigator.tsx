import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';

const navigationTheme = {
  dark: true,
  colors: {
    primary: '#C9A84C',
    background: '#080808',
    card: '#141414',
    text: '#FFFFFF',
    border: '#2C2C2E',
    notification: '#C9A84C',
  },
};

export const AppNavigator: React.FC = () => (
  <NavigationContainer theme={navigationTheme}>
    <TabNavigator />
  </NavigationContainer>
);
