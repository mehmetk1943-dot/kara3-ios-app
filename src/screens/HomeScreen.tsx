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
import { getFeaturedProducts, getNewArrivals } from '../services/shopify';
import { getCollections } from '../services/shopify';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { ProductCard, CollectionCard, LoadingSpinner, GoldDivider } from '../components';
import { useCart } from '../context/CartContext';
import { Badge } from '../components/Badge';

const { width } = Dimensions.get('window');
const HERO_HEIGHT = 320;

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
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.brandSmall}>KARA3</Text>
            <Text style={styles.greeting}>Fine Jewelry</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.cartBtn}
          >
            <Ionicons name="bag-outline" size={24} color={Colors.textPrimary} />
            <Badge count={cart.itemCount} />
          </TouchableOpacity>
        </View>

        {/* Hero Banner */}
        {heroProduct && (
          <TouchableOpacity
            activeOpacity={0.92}
            style={styles.hero}
            onPress={() => goToProduct(heroProduct.id)}
          >
            <Image
              source={{ uri: heroProduct.images[0]?.url }}
              style={styles.heroImage}
              resizeMode="cover"
            />
            <LinearGradient
              colors={['transparent', 'rgba(8,8,8,0.9)']}
              style={styles.heroGradient}
            />
            <View style={styles.heroContent}>
              <Text style={styles.heroLabel}>FEATURED PIECE</Text>
              <Text style={styles.heroTitle}>{heroProduct.title}</Text>
              <View style={styles.heroBtn}>
                <Text style={styles.heroBtnText}>DISCOVER</Text>
                <Ionicons name="arrow-forward" size={14} color={Colors.textInverse} />
              </View>
            </View>
          </TouchableOpacity>
        )}

        <GoldDivider marginVertical={Spacing.xl} />

        {/* Featured Products */}
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

        <GoldDivider marginVertical={Spacing.xl} />

        {/* Collections Preview */}
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

        <GoldDivider marginVertical={Spacing.xl} />

        {/* New Arrivals */}
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

        {/* Bottom spacer */}
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
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing.base,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.base,
  },
  brandSmall: {
    ...Typography.labelSmall,
    color: Colors.gold,
    letterSpacing: 4,
  },
  greeting: {
    ...Typography.h1,
    color: Colors.textPrimary,
  },
  cartBtn: {
    position: 'relative',
    padding: Spacing.sm,
  },
  hero: {
    height: HERO_HEIGHT,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.card,
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
    bottom: Spacing.xl,
    left: Spacing.xl,
    right: Spacing.xl,
  },
  heroLabel: {
    ...Typography.labelSmall,
    color: Colors.gold,
    letterSpacing: 3,
    marginBottom: Spacing.sm,
  },
  heroTitle: {
    ...Typography.displayMedium,
    color: Colors.textPrimary,
    marginBottom: Spacing.base,
  },
  heroBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: Colors.gold,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.base,
    borderRadius: BorderRadius.xs,
    gap: Spacing.sm,
  },
  heroBtnText: {
    ...Typography.labelSmall,
    color: Colors.textInverse,
    letterSpacing: 2,
    fontWeight: '700',
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
    color: Colors.gold,
  },
  hScroll: {
    paddingRight: Spacing.base,
  },
  hCard: {
    marginRight: Spacing.md,
  },
});
