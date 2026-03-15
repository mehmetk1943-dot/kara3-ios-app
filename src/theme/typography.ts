import { Platform } from 'react-native';

export const Typography = {
  // Display — elegant, clean
  displayLarge: {
    fontSize: 32,
    fontWeight: '300' as const,
    letterSpacing: 0.5,
    lineHeight: 40,
  },
  displayMedium: {
    fontSize: 26,
    fontWeight: '300' as const,
    letterSpacing: 0.4,
    lineHeight: 34,
  },

  // Headings
  h1: {
    fontSize: 24,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
    lineHeight: 30,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
    letterSpacing: 0.15,
    lineHeight: 26,
  },
  h3: {
    fontSize: 17,
    fontWeight: '600' as const,
    letterSpacing: 0,
    lineHeight: 22,
  },

  // Body
  bodyLarge: {
    fontSize: 17,
    fontWeight: '400' as const,
    letterSpacing: -0.2,
    lineHeight: 26,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    letterSpacing: -0.15,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 13,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 18,
  },

  // Labels
  labelLarge: {
    fontSize: 15,
    fontWeight: '600' as const,
    letterSpacing: -0.1,
    lineHeight: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '500' as const,
    letterSpacing: 0.1,
    lineHeight: 18,
  },
  labelSmall: {
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 0.3,
    lineHeight: 14,
  },

  // Captions
  caption: {
    fontSize: 12,
    fontWeight: '400' as const,
    letterSpacing: 0,
    lineHeight: 16,
  },

  // Price
  price: {
    fontSize: 17,
    fontWeight: '600' as const,
    letterSpacing: 0.2,
    lineHeight: 22,
  },
  priceLarge: {
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: 0.2,
    lineHeight: 28,
  },

  // Brand / luxury — elegant italic serif feel
  brandTitle: {
    fontSize: 20,
    fontWeight: '400' as const,
    letterSpacing: 2,
    lineHeight: 26,
  },

  // Hero heading — matching storefront italic style
  heroHeading: {
    fontSize: 28,
    fontWeight: '300' as const,
    fontStyle: 'italic' as const,
    letterSpacing: 0.3,
    lineHeight: 36,
  },
};
