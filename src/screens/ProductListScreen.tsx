import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CollectionsStackParamList, Product, SortOption } from '../types';
import { getProductsByCollection } from '../services/shopify';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { ProductCard, LoadingSpinner, EmptyState } from '../components';

type Props = NativeStackScreenProps<CollectionsStackParamList, 'ProductList'>;

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price ↑', value: 'price-asc' },
  { label: 'Price ↓', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  const copy = [...products];
  switch (sort) {
    case 'price-asc':
      return copy.sort((a, b) => a.defaultPrice - b.defaultPrice);
    case 'price-desc':
      return copy.sort((a, b) => b.defaultPrice - a.defaultPrice);
    case 'newest':
      return copy.filter((p) => p.isNewArrival).concat(copy.filter((p) => !p.isNewArrival));
    case 'featured':
    default:
      return copy.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
  }
};

export const ProductListScreen: React.FC<Props> = ({ navigation, route }) => {
  const { collectionId, collectionTitle } = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  useEffect(() => {
    getProductsByCollection(collectionId).then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, [collectionId]);

  const sorted = sortProducts(products, sortBy);

  const goToProduct = useCallback(
    (id: string) => navigation.navigate('ProductDetail', { productId: id }),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.title} numberOfLines={1}>
            {collectionTitle}
          </Text>
          <Text style={styles.count}>{products.length} pieces</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Cart')}
          style={styles.backBtn}
        >
          <Ionicons name="bag-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Sort Bar */}
      <View style={styles.sortBar}>
        {SORT_OPTIONS.map((opt) => (
          <TouchableOpacity
            key={opt.value}
            onPress={() => setSortBy(opt.value)}
            style={[styles.sortChip, sortBy === opt.value && styles.sortChipActive]}
          >
            <Text
              style={[styles.sortLabel, sortBy === opt.value && styles.sortLabelActive]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <LoadingSpinner />
      ) : sorted.length === 0 ? (
        <EmptyState
          icon="diamond-outline"
          title="No Products"
          subtitle="This collection is coming soon."
        />
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(p) => p.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard product={item} onPress={() => goToProduct(item.id)} />
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  count: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  sortBar: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  sortChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.background,
  },
  sortChipActive: {
    backgroundColor: Colors.teal,
    borderColor: Colors.teal,
  },
  sortLabel: {
    ...Typography.labelSmall,
    color: Colors.textSecondary,
  },
  sortLabelActive: {
    color: Colors.textInverse,
  },
  row: {
    paddingHorizontal: Spacing.base,
    justifyContent: 'space-between',
  },
  list: {
    paddingTop: Spacing.base,
    paddingBottom: Spacing.xxl,
  },
});
