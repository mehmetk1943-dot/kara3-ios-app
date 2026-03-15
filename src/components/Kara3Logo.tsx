import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../theme';

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'splash';
  color?: string;
  showIcon?: boolean;
}

/**
 * Kara3 brand logo — stylized crown/gem icon above the wordmark.
 * Matches the storefront header logo.
 */
export const Kara3Logo: React.FC<Props> = ({
  size = 'md',
  color = Colors.teal,
  showIcon = true,
}) => {
  const config = SIZES[size];

  return (
    <View style={styles.container}>
      {showIcon && (
        <View style={[styles.iconWrap, { marginBottom: config.iconGap }]}>
          <Svg
            width={config.iconSize}
            height={config.iconSize * 0.85}
            viewBox="0 0 40 34"
            fill="none"
          >
            {/* Stylized crown / gem motif matching Kara3 store logo */}
            <Path
              d="M20 0L26 10L33 6L30 18H10L7 6L14 10L20 0Z"
              fill={color}
            />
            <Path
              d="M10 20H30L28 28H12L10 20Z"
              fill={color}
            />
            <Path
              d="M12.5 30H27.5L27 33H13L12.5 30Z"
              fill={color}
            />
          </Svg>
        </View>
      )}
      <Text
        style={[
          styles.wordmark,
          {
            fontSize: config.fontSize,
            letterSpacing: config.letterSpacing,
            color,
          },
        ]}
      >
        Kara3
      </Text>
    </View>
  );
};

const SIZES = {
  sm: { fontSize: 16, letterSpacing: 1, iconSize: 18, iconGap: 2 },
  md: { fontSize: 20, letterSpacing: 1.5, iconSize: 24, iconGap: 3 },
  lg: { fontSize: 26, letterSpacing: 2, iconSize: 32, iconGap: 4 },
  splash: { fontSize: 36, letterSpacing: 3, iconSize: 48, iconGap: 8 },
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconWrap: {
    alignItems: 'center',
  },
  wordmark: {
    fontWeight: '400',
  },
});
