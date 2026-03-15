import React, { useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WishlistStackParamList } from '../types';
import { Colors, Typography, Spacing } from '../theme';
import { ProductCard, EmptyState, GoldButton, Kara3Logo } from '../components';
import { useWishlist } from '../context/WishlistContext';

type Props = NativeStackScreenProps<WishlistStackParamList, 'Wishlist'>;

export const WishlistScreen: React.FC<Props> = ({ navigation }) => {
  const { items } = useWishlist();

  const goToProduct = useCallback(
    (id: string) => navigation.navigate('ProductDetail', { productId: id }),
    [navigation]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Kara3Logo size="sm" color={Colors.teal} />
        <Text style={styles.title}>Wishlist</Text>
        {items.length > 0 && (
          <Text style={styles.count}>{items.length} saved piece{items.length !== 1 ? 's' : ''}</Text>
        )}
      </View>

      {items.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="Nothing Saved Yet"
          subtitle="Tap the heart on any piece to save it here for later."
          action={
            <GoldButton
              label="Browse Collections"
              onPress={() =>
                (navigation as any).getParent()?.navigate('CollectionsTab')
              }
              variant="outline"
            />
          }
        />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.product.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProductCard
              product={item.product}
              onPress={() => goToProduct(item.product.id)}
            />
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
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    alignItems: 'center',
  },
  title: {
    ...Typography.displayMedium,
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  count: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: 4,
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
