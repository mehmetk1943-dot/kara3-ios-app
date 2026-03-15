import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Typography, Spacing } from '../theme';

const { width, height } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Fade + scale logo
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Animate gold divider line
      Animated.timing(lineWidth, {
        toValue: 80,
        duration: 400,
        useNativeDriver: false,
      }),
      // Tagline
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // Hold
      Animated.delay(800),
      // Fade out everything
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(taglineOpacity, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <LinearGradient
      colors={[Colors.background, '#0F0A02', Colors.background]}
      style={styles.container}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
    >
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        {/* Brand mark — stylized K */}
        <View style={styles.monogram}>
          <Text style={styles.monogramText}>K</Text>
        </View>

        <Text style={styles.brand}>KARA3</Text>

        {/* Gold line divider */}
        <Animated.View style={[styles.goldLine, { width: lineWidth }]} />

        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          FINE JEWELRY
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
  },
  logoWrap: {
    alignItems: 'center',
  },
  monogram: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1.5,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  monogramText: {
    fontSize: 36,
    fontWeight: '300',
    color: Colors.gold,
    letterSpacing: 2,
  },
  brand: {
    ...Typography.brandTitle,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  goldLine: {
    height: 1,
    backgroundColor: Colors.gold,
    marginBottom: Spacing.md,
  },
  tagline: {
    ...Typography.labelSmall,
    color: Colors.textSecondary,
    letterSpacing: 4,
  },
});
