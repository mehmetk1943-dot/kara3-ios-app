import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Product } from '../types';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';
import { formatPrice } from '../services/shopify';
import { useWishlist } from '../context/WishlistContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - Spacing.base * 2 - Spacing.md) / 2;

interface Props {
  product: Product;
  onPress: () => void;
  wide?: boolean; // full-width variant for list views
}

export const ProductCard: React.FC<Props> = ({ product, onPress, wide = false }) => {
  const { isWishlisted, toggleItem } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const image = product.images[0];
  const cardWidth = wide ? width - Spacing.base * 2 : CARD_WIDTH;

  return (
    <TouchableOpacity
      activeOpacity={0.88}
      onPress={onPress}
      style={[styles.card, { width: cardWidth }, wide && styles.wideCard]}
    >
      {/* Image */}
      <View style={[styles.imageWrap, { width: cardWidth }]}>
        <Image
          source={{ uri: image?.url ?? 'https://via.placeholder.com/400x400/1C1C1E/C9A84C?text=Kara3' }}
          style={[styles.image, { width: cardWidth, height: wide ? 240 : CARD_WIDTH }]}
          resizeMode="cover"
        />
        {/* Wishlist button */}
        <TouchableOpacity
          style={styles.heartBtn}
          onPress={() => toggleItem(product)}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          <Ionicons
            name={wishlisted ? 'heart' : 'heart-outline'}
            size={20}
            color={wishlisted ? Colors.gold : Colors.textPrimary}
          />
        </TouchableOpacity>
        {/* Labels */}
        <View style={styles.labels}>
          {product.isNewArrival && (
            <View style={styles.newBadge}>
              <Text style={styles.newBadgeText}>NEW</Text>
            </View>
          )}
          {product.compareAtPrice && (
            <View style={styles.saleBadge}>
              <Text style={styles.saleBadgeText}>SALE</Text>
            </View>
          )}
        </View>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.type} numberOfLines={1}>
          {product.productType}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(product.defaultPrice)}</Text>
          {product.compareAtPrice ? (
            <Text style={styles.comparePrice}>{formatPrice(product.compareAtPrice)}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadow.card,
  },
  wideCard: {
    flexDirection: 'column',
  },
  imageWrap: {
    position: 'relative',
    backgroundColor: Colors.cardElevated,
  },
  image: {
    backgroundColor: Colors.cardElevated,
  },
  heartBtn: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labels: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'column',
    gap: 4,
  },
  newBadge: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  newBadgeText: {
    ...Typography.labelSmall,
    color: Colors.textInverse,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  saleBadge: {
    backgroundColor: Colors.error,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 3,
  },
  saleBadgeText: {
    ...Typography.labelSmall,
    color: Colors.textPrimary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
  },
  info: {
    padding: Spacing.md,
  },
  title: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  type: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  price: {
    ...Typography.price,
    color: Colors.gold,
  },
  comparePrice: {
    ...Typography.body,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
});
