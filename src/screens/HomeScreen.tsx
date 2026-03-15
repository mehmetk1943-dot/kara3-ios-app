import React, { useCallback, useEffect, useState } from 'react';
import {
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
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types';
import { Product, Collection } from '../types';
import { getFeaturedProducts, getNewArrivals, getCollections } from '../services/shopify';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { ProductCard, CollectionCard, LoadingSpinner, GoldDivider, Kara3Logo } from '../components';
import { useCart } from '../context/CartContext';
import { Badge } from '../components/Badge';

const { width } = Dimensions.get('window');
const HERO_HEIGHT = 420;

type Props = NativeStackScreenProps<HomeStackParamList, 'Home'>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart } = useCart();

  useEffect(() => {
    const load = async () => {
      const [f, n, c] = await Promise.all([
        getFeaturedProducts(),
        getNewArrivals(),
        getCollections(),
      ]);
      setFeatured(f);
      setNewArrivals(n);
      setCollections(c.slice(0, 3));
      setLoading(false);
    };
    load();
  }, []);

  const goToProduct = useCallback(
    (productId: string) => navigation.navigate('ProductDetail', { productId }),
    [navigation]
  );

  if (loading) return <LoadingSpinner fullScreen />;

  const heroProduct = featured[0];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* ── Top Header Bar — matches Kara3 storefront ── */}
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="menu-outline" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerIcon}>
          <Ionicons name="search-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>

        <Kara3Logo size="md" color={Colors.teal} />

        <View style={{ width: 24 }} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.headerIcon}
        >
          <Ionicons name="bag-outline" size={22} color={Colors.textPrimary} />
          <Badge count={cart.itemCount} />
        </TouchableOpacity>
      </View>

      {/* ── Promo Banner — matches storefront teal bar ── */}
      <View style={styles.promoBanner}>
        <Text style={styles.promoText}>
          Mid-Season Sale Up to 70% OFF.{' '}
          <Text style={styles.promoLink}>Shop Now</Text>
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Banner — full bleed with model image ── */}
        {heroProduct && (
          <TouchableOpacity
            activeOpacity={0.95}
            style={styles.hero}
            onPress={() => goToProduct(heroProduct.id)}
          >
            <Image
              source={{ uri: heroProduct.images[0]?.url }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.55)']}
              style={styles.heroGradient}
              start={{ x: 0.5, y: 0.3 }}
              end={{ x: 0.5, y: 1 }}
            />
            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Moissanite Elegance</Text>
              <Text style={styles.heroSubtitle}>
                Timeless brilliance crafted with precision — discover Kara3's women's moissanite jewelry.
              </Text>
              <TouchableOpacity
                style={styles.heroBtn}
                onPress={() => goToProduct(heroProduct.id)}
              >
                <Text style={styles.heroBtnText}>SHOP NOW</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}

        {/* ── Featured Products ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured</Text>
            <TouchableOpacity>
              <Text style={styles.sectionLink}>View all</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={featured}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(p) => p.id}
            contentContainerStyle={styles.hScroll}
            renderItem={({ item }) => (
              <View style={styles.hCard}>
                <ProductCard product={item} onPress={() => goToProduct(item.id)} />
              </View>
            )}
          />
        </View>

        <GoldDivider marginVertical={Spacing.lg} />

        {/* ── Collections Preview ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Collections</Text>
          </View>

          {collections.map((col) => (
            <CollectionCard
              key={col.id}
              collection={col}
              onPress={() =>
                (navigation as any)
                  .getParent()
                  ?.navigate('CollectionsTab', {
                    screen: 'ProductList',
                    params: { collectionId: col.id, collectionTitle: col.title },
                  })
              }
            />
          ))}
        </View>

        <GoldDivider marginVertical={Spacing.lg} />

        {/* ── New Arrivals ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
          </View>

          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => goToProduct(product.id)}
              wide
            />
          ))}
        </View>

        <View style={{ height: Spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // ── Header bar matching storefront ──
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerIcon: {
    position: 'relative',
    padding: 4,
  },
  // ── Promo banner — teal bar ──
  promoBanner: {
    backgroundColor: Colors.teal,
    paddingVertical: Spacing.sm + 2,
    alignItems: 'center',
  },
  promoText: {
    ...Typography.caption,
    color: Colors.textInverse,
    letterSpacing: 0.3,
  },
  promoLink: {
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  scroll: {
    flex: 1,
  },
  content: {},
  // ── Hero ──
  hero: {
    height: HERO_HEIGHT,
    backgroundColor: Colors.surface,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  heroContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },
  heroTitle: {
    ...Typography.heroHeading,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  heroSubtitle: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  heroBtn: {
    backgroundColor: Colors.teal,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xxl + 8,
    borderRadius: BorderRadius.sm,
  },
  heroBtnText: {
    ...Typography.labelLarge,
    color: Colors.textInverse,
    letterSpacing: 2,
  },
  // ── Sections ──
  section: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.textPrimary,
  },
  sectionLink: {
    ...Typography.label,
    color: Colors.teal,
  },
  hScroll: {
    paddingRight: Spacing.base,
  },
  hCard: {
    marginRight: Spacing.md,
  },
});
