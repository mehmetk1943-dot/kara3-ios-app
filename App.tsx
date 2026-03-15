import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as ExpoSplashScreen from 'expo-splash-screen';

import { CartProvider } from './src/context/CartContext';
import { WishlistProvider } from './src/context/WishlistContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SplashScreen } from './src/screens/SplashScreen';

// Keep the native splash screen visible while fonts / data loads
ExpoSplashScreen.preventAutoHideAsync();

export default function App() {
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate initial setup (font loading, config, etc.)
    const prepare = async () => {
      try {
        // TODO: Load fonts here if using custom typefaces
        // await Font.loadAsync({ ... });
        await new Promise((resolve) => setTimeout(resolve, 200));
      } finally {
        setAppReady(true);
        await ExpoSplashScreen.hideAsync();
      }
    };
    prepare();
  }, []);

  const handleSplashFinish = useCallback(() => {
    setShowCustomSplash(false);
  }, []);

  if (!appReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <CartProvider>
          <WishlistProvider>
            <StatusBar style="dark" />
            {showCustomSplash ? (
              <SplashScreen onFinish={handleSplashFinish} />
            ) : (
              <AppNavigator />
            )}
          </WishlistProvider>
        </CartProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
