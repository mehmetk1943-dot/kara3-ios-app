import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors, Spacing } from '../theme';

interface Props {
  marginVertical?: number;
}

export const GoldDivider: React.FC<Props> = ({ marginVertical = Spacing.lg }) => (
  <View style={[styles.container, { marginVertical }]}>
    <View style={styles.line} />
    <View style={styles.diamond} />
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
  },
  diamond: {
    width: 5,
    height: 5,
    backgroundColor: Colors.teal,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: Spacing.sm,
  },
});
