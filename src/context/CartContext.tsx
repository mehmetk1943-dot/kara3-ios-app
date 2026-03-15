import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { Cart, CartItem, Product, ProductVariant } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; variant: ProductVariant; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: string; variantId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; variantId: string; quantity: number }
  | { type: 'CLEAR_CART' };

interface CartContextValue {
  cart: Cart;
  addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  updateQuantity: (productId: string, variantId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

const buildCart = (items: CartItem[]): Cart => ({
  items,
  subtotal: items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0),
  itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
});

const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id && i.variant.id === action.variant.id
      );
      if (existing) {
        const updated = state.items.map((i) =>
          i.product.id === action.product.id && i.variant.id === action.variant.id
            ? { ...i, quantity: i.quantity + action.quantity }
            : i
        );
        return buildCart(updated);
      }
      return buildCart([
        ...state.items,
        { product: action.product, variant: action.variant, quantity: action.quantity },
      ]);
    }
    case 'REMOVE_ITEM': {
      const updated = state.items.filter(
        (i) => !(i.product.id === action.productId && i.variant.id === action.variantId)
      );
      return buildCart(updated);
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        const updated = state.items.filter(
          (i) => !(i.product.id === action.productId && i.variant.id === action.variantId)
        );
        return buildCart(updated);
      }
      const updated = state.items.map((i) =>
        i.product.id === action.productId && i.variant.id === action.variantId
          ? { ...i, quantity: action.quantity }
          : i
      );
      return buildCart(updated);
    }
    case 'CLEAR_CART':
      return buildCart([]);
    default:
      return state;
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

const initialCart: Cart = buildCart([]);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      addItem: (product, variant, quantity = 1) =>
        dispatch({ type: 'ADD_ITEM', product, variant, quantity }),
      removeItem: (productId, variantId) =>
        dispatch({ type: 'REMOVE_ITEM', productId, variantId }),
      updateQuantity: (productId, variantId, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', productId, variantId, quantity }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      isInCart: (productId) => cart.items.some((i) => i.product.id === productId),
    }),
    [cart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
