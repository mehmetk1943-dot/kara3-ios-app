import React, { createContext, useContext, useReducer, useMemo } from 'react';
import { Product, WishlistItem } from '../types';

// ─── Types ────────────────────────────────────────────────────────────────────

type WishlistAction =
  | { type: 'ADD'; product: Product }
  | { type: 'REMOVE'; productId: string }
  | { type: 'TOGGLE'; product: Product };

interface WishlistState {
  items: WishlistItem[];
}

interface WishlistContextValue {
  items: WishlistItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  count: number;
}

// ─── Reducer ──────────────────────────────────────────────────────────────────

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD':
      if (state.items.some((i) => i.product.id === action.product.id)) return state;
      return {
        items: [...state.items, { product: action.product, addedAt: new Date() }],
      };
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'TOGGLE':
      return state.items.some((i) => i.product.id === action.product.id)
        ? { items: state.items.filter((i) => i.product.id !== action.product.id) }
        : { items: [...state.items, { product: action.product, addedAt: new Date() }] };
    default:
      return state;
  }
};

// ─── Context ──────────────────────────────────────────────────────────────────

const WishlistContext = createContext<WishlistContextValue | null>(null);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  const value = useMemo<WishlistContextValue>(
    () => ({
      items: state.items,
      addItem: (product) => dispatch({ type: 'ADD', product }),
      removeItem: (productId) => dispatch({ type: 'REMOVE', productId }),
      toggleItem: (product) => dispatch({ type: 'TOGGLE', product }),
      isWishlisted: (productId) => state.items.some((i) => i.product.id === productId),
      count: state.items.length,
    }),
    [state]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextValue => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
