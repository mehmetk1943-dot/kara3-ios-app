import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList, Product, ProductVariant } from '../types';
import { getProductById, formatPrice } from '../services/shopify';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../theme';
import { GoldButton, LoadingSpinner, GoldDivider } from '../components';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const { width } = Dimensions.get('window');

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const { addItem, isInCart } = useCart();
  const { isWishlisted, toggleItem } = useWishlist();

  useEffect(() => {
    getProductById(productId).then((p) => {
      setProduct(p);
      if (p) {
        const firstAvailable = p.variants.find((v) => v.available) ?? p.variants[0];
        setSelectedVariant(firstAvailable);
      }
      setLoading(false);
    });
  }, [productId]);

  const handleAddToCart = useCallback(() => {
    if (!product || !selectedVariant) return;
    addItem(product, selectedVariant, 1);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }, [product, selectedVariant, addItem]);

  if (loading || !product) return <LoadingSpinner fullScreen />;

  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);

  return (
    <View style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Image carousel */}
        <View style={styles.imageCarousel}>
          <Animated.FlatList
            data={product.images}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(img) => img.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={(e) => {
              setActiveImageIndex(
                Math.round(e.nativeEvent.contentOffset.x / width)
              );
            }}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item.url }}
                style={styles.image}
                resizeMode="cover"
              />
            )}
          />

          {/* Dots */}
          {product.images.length > 1 && (
            <View style={styles.dots}>
              {product.images.map((_, i) => (
                <View
                  key={i}
                  style={[styles.dot, i === activeImageIndex && styles.dotActive]}
                />
              ))}
            </View>
          )}

          {/* Back button */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          {/* Wishlist button */}
          <TouchableOpacity
            style={styles.wishlistBtn}
            onPress={() => toggleItem(product)}
          >
            <Ionicons
              name={wishlisted ? 'heart' : 'heart-outline'}
              size={22}
              color={wishlisted ? Colors.gold : Colors.textPrimary}
            />
          </TouchableOpacity>

          {/* Labels */}
          <View style={styles.imageBadges}>
            {product.isNewArrival && (
              <View style={styles.newBadge}>
                <Text style={styles.newBadgeText}>NEW</Text>
              </View>
            )}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.info}>
          {/* Title & price */}
          <View style={styles.titleRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.type}>{product.productType}</Text>
              <Text style={styles.title}>{product.title}</Text>
            </View>
            <View style={styles.priceBlock}>
              <Text style={styles.price}>{formatPrice(selectedVariant?.price ?? product.defaultPrice)}</Text>
              {product.compareAtPrice && (
                <Text style={styles.comparePrice}>{formatPrice(product.compareAtPrice)}</Text>
              )}
            </View>
          </View>

          <GoldDivider marginVertical={Spacing.base} />

          {/* Description */}
          <Text style={styles.description}>{product.description}</Text>

          {/* Material */}
          {product.material && (
            <View style={styles.metaRow}>
              <Ionicons name="diamond-outline" size={14} color={Colors.gold} />
              <Text style={styles.metaText}>{product.material}</Text>
            </View>
          )}

          <GoldDivider marginVertical={Spacing.base} />

          {/* Variant selector */}
          <Text style={styles.variantLabel}>Select Size / Option</Text>
          <View style={styles.variants}>
            {product.variants.map((variant) => (
              <TouchableOpacity
                key={variant.id}
                onPress={() => variant.available && setSelectedVariant(variant)}
                style={[
                  styles.variantChip,
                  selectedVariant?.id === variant.id && styles.variantChipActive,
                  !variant.available && styles.variantChipDisabled,
                ]}
                disabled={!variant.available}
              >
                <Text
                  style={[
                    styles.variantText,
                    selectedVariant?.id === variant.id && styles.variantTextActive,
                    !variant.available && styles.variantTextDisabled,
                  ]}
                >
                  {variant.title}
                </Text>
                {!variant.available && <View style={styles.strikeThrough} />}
              </TouchableOpacity>
            ))}
          </View>

          <GoldDivider marginVertical={Spacing.base} />

          {/* Care instructions */}
          {product.careInstructions && (
            <View style={styles.care}>
              <Ionicons name="information-circle-outline" size={16} color={Colors.textMuted} />
              <Text style={styles.careText}>{product.careInstructions}</Text>
            </View>
          )}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky bottom CTA */}
      <SafeAreaView edges={['bottom']} style={styles.ctaContainer}>
        <GoldButton
          label={addedToCart ? 'Added to Bag ✓' : inCart ? 'Add Another' : 'Add to Bag'}
          onPress={handleAddToCart}
          disabled={!selectedVariant?.available}
          style={styles.cta}
          size="lg"
        />
        <TouchableOpacity
          style={styles.cartIcon}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="bag-outline" size={22} color={Colors.gold} />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    // no horizontal padding — images are full-bleed
  },
  imageCarousel: {
    position: 'relative',
    height: width * 1.1,
    backgroundColor: Colors.card,
  },
  image: {
    width,
    height: width * 1.1,
    backgroundColor: Colors.card,
  },
  dots: {
    position: 'absolute',
    bottom: Spacing.base,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  dotActive: {
    backgroundColor: Colors.gold,
    width: 18,
  },
  backBtn: {
    position: 'absolute',
    top: 52,
    left: Spacing.base,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 52,
    right: Spacing.base,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBadges: {
    position: 'absolute',
    top: 52 + 40 + 8,
    left: Spacing.base,
  },
  newBadge: {
    backgroundColor: Colors.gold,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  newBadgeText: {
    ...Typography.labelSmall,
    color: Colors.textInverse,
    fontSize: 9,
    letterSpacing: 1.5,
    fontWeight: '700',
  },
  info: {
    padding: Spacing.base,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  type: {
    ...Typography.caption,
    color: Colors.gold,
    textTransform: 'uppercase',
    letterSpacing: 2,
    marginBottom: 4,
  },
  title: {
    ...Typography.h1,
    color: Colors.textPrimary,
    flex: 1,
    paddingRight: Spacing.sm,
  },
  priceBlock: {
    alignItems: 'flex-end',
  },
  price: {
    ...Typography.priceLarge,
    color: Colors.gold,
  },
  comparePrice: {
    ...Typography.body,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  description: {
    ...Typography.bodyLarge,
    color: Colors.textSecondary,
    lineHeight: 26,
    marginBottom: Spacing.md,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  metaText: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  variantLabel: {
    ...Typography.label,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  variants: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  variantChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
    overflow: 'hidden',
  },
  variantChipActive: {
    borderColor: Colors.gold,
    backgroundColor: Colors.goldMuted,
  },
  variantChipDisabled: {
    opacity: 0.4,
  },
  variantText: {
    ...Typography.label,
    color: Colors.textSecondary,
  },
  variantTextActive: {
    color: Colors.gold,
  },
  variantTextDisabled: {
    color: Colors.textMuted,
  },
  strikeThrough: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Colors.textMuted,
  },
  care: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
    backgroundColor: Colors.surface,
    padding: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  careText: {
    ...Typography.bodySmall,
    color: Colors.textMuted,
    flex: 1,
    lineHeight: 18,
  },
  ctaContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.base,
    backgroundColor: Colors.background,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.md,
  },
  cta: {
    flex: 1,
  },
  cartIcon: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
