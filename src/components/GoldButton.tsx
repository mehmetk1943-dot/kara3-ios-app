import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { Colors, Typography, BorderRadius, Spacing, Shadow } from '../theme';

interface Props extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: React.ReactNode;
}

export const GoldButton: React.FC<Props> = ({
  label,
  variant = 'primary',
  size = 'md',
  loading = false,
  leftIcon,
  style,
  disabled,
  ...rest
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.base,
        styles[variant],
        styles[`size_${size}`],
        isDisabled && styles.disabled,
        style,
      ]}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.textInverse : Colors.teal}
        />
      ) : (
        <View style={styles.row}>
          {leftIcon ? <View style={styles.icon}>{leftIcon}</View> : null}
          <Text
            style={[
              styles.label,
              variant === 'primary' ? styles.labelPrimary : styles.labelOutline,
              size === 'sm' && styles.labelSm,
              size === 'lg' && styles.labelLg,
            ]}
          >
            {label}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: Spacing.sm,
  },

  // Variants
  primary: {
    backgroundColor: Colors.teal,
    ...Shadow.teal,
  },
  outline: {
    backgroundColor: Colors.transparent,
    borderWidth: 1.5,
    borderColor: Colors.teal,
  },
  ghost: {
    backgroundColor: Colors.transparent,
  },

  // Sizes
  size_sm: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
  },
  size_md: {
    paddingVertical: Spacing.md + 2,
    paddingHorizontal: Spacing.xl,
  },
  size_lg: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.xxl,
  },

  // Labels
  label: {
    ...Typography.labelLarge,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  labelPrimary: {
    color: Colors.textInverse,
  },
  labelOutline: {
    color: Colors.teal,
  },
  labelSm: {
    fontSize: 12,
  },
  labelLg: {
    fontSize: 15,
  },

  disabled: {
    opacity: 0.45,
  },
});
