import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Collection } from '../types';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';

const { width } = Dimensions.get('window');

interface Props {
  collection: Collection;
  onPress: () => void;
  compact?: boolean;
}

export const CollectionCard: React.FC<Props> = ({ collection, onPress, compact = false }) => {
  const cardHeight = compact ? 120 : 180;
  const cardWidth = compact
    ? (width - Spacing.base * 2 - Spacing.md) / 2
    : width - Spacing.base * 2;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[styles.card, { width: cardWidth, height: cardHeight }]}
    >
      <Image
        source={{
          uri:
            collection.image ??
            'https://via.placeholder.com/600x300/1C1C1E/C9A84C?text=Kara3',
        }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.75)']}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>
        <Text style={[styles.title, compact && styles.titleCompact]} numberOfLines={2}>
          {collection.title}
        </Text>
        <Text style={styles.count}>
          {collection.productCount} piece{collection.productCount !== 1 ? 's' : ''}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    backgroundColor: Colors.card,
    marginBottom: Spacing.md,
    ...Shadow.card,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.md,
  },
  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  titleCompact: {
    fontSize: 14,
  },
  count: {
    ...Typography.caption,
    color: Colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
