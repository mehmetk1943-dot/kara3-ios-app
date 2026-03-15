import { Platform } from 'react-native';

const fontFamily = Platform.select({
  ios: {
    thin: 'System',
    light: 'System',
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  default: {
    thin: 'sans-serif-thin',
    light: 'sans-serif-light',
    regular: 'sans-serif',
    medium: 'sans-serif-medium',
    semibold: 'sans-serif-medium',
    bold: 'sans-serif',
  },
});

export const Typography = {
  // Display
  displayLarge: {
    fontSize: 34,
    fontWeight: '700' as const,
    letterSpacing: 0.37,
    lineHeight: 41,
  },
  displayMedium: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: 0.36,
    lineHeight: 34,
  },

  // Headings
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: 0.35,
    lineHeight: 30,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: 0.38,
    lineHeight: 25,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600' as const,
    letterSpacing: -0.41,
    lineHeight: 22,
  },

  // Body
  bodyLarge: {
    fontSize: 17,
    fontWeight: '400' as const,
    letterSpacing: -0.41,
    lineHeight: 24,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    letterSpacing: -0.24,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as const,
    letterSpacing: -0.08,
    lineHeight: 18,
  },

  // Labels
  labelLarge: {
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: -0.24,
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '500' as const,
    letterSpacing: 0.12,
    lineHeight: 18,
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 0.07,
    lineHeight: 14,
  },

  // Captions
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 16,
  },

  // Price — special treatment
  price: {
    fontSize: 18,
    fontWeight: '600' as const,
    letterSpacing: 0.35,
    lineHeight: 24,
  },
  priceLarge: {
    fontSize: 24,
    fontWeight: '700' as const,
    letterSpacing: 0.35,
    lineHeight: 30,
  },

  // Brand / luxury labels
  brandTitle: {
    fontSize: 22,
    fontWeight: '300' as const,
    letterSpacing: 6,
    lineHeight: 28,
  },
};
