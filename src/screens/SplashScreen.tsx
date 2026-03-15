import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors, Typography, Spacing } from '../theme';
import { Kara3Logo } from '../components/Kara3Logo';

const { width, height } = Dimensions.get('window');

interface Props {
  onFinish: () => void;
}

export const SplashScreen: React.FC<Props> = ({ onFinish }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.9)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const lineWidth = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Fade + scale logo
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]),
      // Animate line
      Animated.timing(lineWidth, {
        toValue: 60,
        duration: 350,
        useNativeDriver: false,
      }),
      // Tagline
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      // Hold
      Animated.delay(700),
      // Fade out
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
        Animated.timing(taglineOpacity, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      onFinish();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.logoWrap,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
      >
        <Kara3Logo size="splash" color={Colors.teal} />

        {/* Animated line */}
        <Animated.View style={[styles.line, { width: lineWidth }]} />

        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          FINE JEWELRY
        </Animated.Text>
      </Animated.View>
    </View>
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
  line: {
    height: 1,
    backgroundColor: Colors.teal,
    marginTop: Spacing.lg,
    marginBottom: Spacing.md,
  },
  tagline: {
    ...Typography.labelSmall,
    color: Colors.textSecondary,
    letterSpacing: 4,
  },
});
