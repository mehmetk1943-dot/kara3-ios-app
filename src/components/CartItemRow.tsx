import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartItem } from '../types';
import { Colors, Typography, Spacing, BorderRadius } from '../theme';
import { formatPrice } from '../services/shopify';
import { useCart } from '../context/CartContext';

interface Props {
  item: CartItem;
}

export const CartItemRow: React.FC<Props> = ({ item }) => {
  const { removeItem, updateQuantity } = useCart();
  const image = item.product.images[0];
  const lineTotal = item.variant.price * item.quantity;

  return (
    <View style={styles.row}>
      <Image
        source={{ uri: image?.url ?? 'https://via.placeholder.com/120x120/F0F0F0/0D8B83?text=K' }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <View style={styles.topRow}>
          <Text style={styles.title} numberOfLines={2}>
            {item.product.title}
          </Text>
          <TouchableOpacity
            onPress={() => removeItem(item.product.id, item.variant.id)}
            hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
          >
            <Ionicons name="close" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        </View>

        <Text style={styles.variant}>{item.variant.title}</Text>

        <View style={styles.bottomRow}>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() =>
                updateQuantity(item.product.id, item.variant.id, item.quantity - 1)
              }
            >
              <Ionicons
                name="remove"
                size={14}
                color={item.quantity <= 1 ? Colors.textMuted : Colors.textPrimary}
              />
            </TouchableOpacity>
            <Text style={styles.qty}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() =>
                updateQuantity(item.product.id, item.variant.id, item.quantity + 1)
              }
            >
              <Ionicons name="add" size={14} color={Colors.textPrimary} />
            </TouchableOpacity>
          </View>

          <Text style={styles.price}>{formatPrice(lineTotal)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: 100,
    height: 110,
    backgroundColor: Colors.surface,
  },
  info: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    ...Typography.labelLarge,
    color: Colors.textPrimary,
    flex: 1,
    marginRight: Spacing.sm,
  },
  variant: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  stepBtn: {
    width: 30,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: {
    ...Typography.label,
    color: Colors.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  price: {
    ...Typography.price,
    color: Colors.textPrimary,
  },
});
