import React from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { CartItemRow, EmptyState, GoldButton, GoldDivider, Kara3Logo } from '../components';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../services/shopify';

type Props = NativeStackScreenProps<HomeStackParamList, 'Cart'>;

export const CartScreen: React.FC<Props> = ({ navigation }) => {
  const { cart, clearCart } = useCart();

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      'Shopify checkout will be connected here.\n\nThis will redirect to your Shopify-hosted checkout page where customers can complete payment.',
      [{ text: 'Got it', style: 'default' }]
    );
  };

  if (cart.items.length === 0) {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Shopping Bag</Text>
          <View style={{ width: 40 }} />
        </View>
        <EmptyState
          icon="bag-outline"
          title="Your Bag is Empty"
          subtitle="Add pieces to your bag to begin your Kara3 journey."
          action={
            <GoldButton
              label="Explore Collections"
              onPress={() => navigation.goBack()}
              variant="outline"
            />
          }
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shopping Bag</Text>
        <TouchableOpacity onPress={clearCart} style={styles.backBtn}>
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.itemCount}>
        {cart.itemCount} item{cart.itemCount !== 1 ? 's' : ''}
      </Text>

      <FlatList
        data={cart.items}
        keyExtractor={(item) => `${item.product.id}-${item.variant.id}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <CartItemRow item={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View style={styles.summary}>
            <GoldDivider marginVertical={Spacing.lg} />

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>{formatPrice(cart.subtotal)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValueMuted}>Calculated at checkout</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValueMuted}>Calculated at checkout</Text>
            </View>

            <GoldDivider marginVertical={Spacing.lg} />

            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>{formatPrice(cart.subtotal)}</Text>
            </View>

            <GoldButton
              label="Proceed to Checkout"
              onPress={handleCheckout}
              size="lg"
              style={styles.checkoutBtn}
            />

            <View style={styles.trustRow}>
              <View style={styles.trust}>
                <Ionicons name="shield-checkmark-outline" size={14} color={Colors.teal} />
                <Text style={styles.trustText}>Secure Payment</Text>
              </View>
              <View style={styles.trust}>
                <Ionicons name="refresh-outline" size={14} color={Colors.teal} />
                <Text style={styles.trustText}>Easy Returns</Text>
              </View>
              <View style={styles.trust}>
                <Ionicons name="cube-outline" size={14} color={Colors.teal} />
                <Text style={styles.trustText}>Free Shipping</Text>
              </View>
            </View>

            <View style={{ height: Spacing.xxl }} />
          </View>
        }
      />
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
  headerTitle: {
    ...Typography.h3,
    color: Colors.textPrimary,
    flex: 1,
    textAlign: 'center',
  },
  clearText: {
    ...Typography.label,
    color: Colors.textMuted,
  },
  itemCount: {
    ...Typography.caption,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.md,
    marginBottom: Spacing.md,
  },
  list: {
    paddingHorizontal: Spacing.base,
  },
  summary: {},
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  summaryLabel: {
    ...Typography.body,
    color: Colors.textSecondary,
  },
  summaryValue: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
  },
  summaryValueMuted: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  totalLabel: {
    ...Typography.h3,
    color: Colors.textPrimary,
  },
  totalValue: {
    ...Typography.priceLarge,
    color: Colors.textPrimary,
  },
  checkoutBtn: {
    marginTop: Spacing.xl,
    width: '100%',
  },
  trustRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.lg,
    gap: Spacing.xl,
  },
  trust: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trustText: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
});
