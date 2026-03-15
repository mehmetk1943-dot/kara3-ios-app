import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography } from '../theme';

interface Props {
  count: number;
  color?: string;
}

export const Badge: React.FC<Props> = ({ count, color = Colors.gold }) => {
  if (count <= 0) return null;
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  text: {
    ...Typography.labelSmall,
    color: Colors.textInverse,
    fontSize: 10,
    fontWeight: '700',
  },
});
