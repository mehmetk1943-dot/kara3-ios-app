// ─── Product Types ────────────────────────────────────────────────────────────

export interface ProductImage {
  id: string;
  url: string;         // placeholder URL for mock data; Shopify: image.url
  altText?: string;    // Shopify: image.altText
}

export interface ProductVariant {
  id: string;
  title: string;       // e.g. "14K Gold / Size 7"
  price: number;       // in store currency
  compareAtPrice?: number;
  available: boolean;
  sku?: string;
  // Shopify: selectedOptions, quantityAvailable
}

export interface Product {
  id: string;
  handle: string;      // URL-friendly slug — used for Shopify routing
  title: string;
  description: string;
  shortDescription: string;
  vendor: string;      // Shopify: product.vendor
  productType: string; // Shopify: product.productType
  tags: string[];      // Shopify: product.tags
  images: ProductImage[];
  variants: ProductVariant[];
  defaultPrice: number;
  compareAtPrice?: number;
  collectionIds: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  material?: string;
  careInstructions?: string;
  // Shopify fields (populated when connected):
  // shopifyId?: string;
  // availableForSale?: boolean;
  // createdAt?: string;
}

// ─── Collection Types ─────────────────────────────────────────────────────────

export interface Collection {
  id: string;
  handle: string;      // Shopify: collection.handle
  title: string;
  description: string;
  image: string;       // placeholder image URL
  productCount: number;
  // Shopify: collection.products.edges
}

// ─── Cart Types ───────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  // Shopify cart line: id, merchandiseId, quantity
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  itemCount: number;
  // Shopify: id, checkoutUrl, cost.totalAmount
}

// ─── Wishlist Types ───────────────────────────────────────────────────────────

export interface WishlistItem {
  product: Product;
  addedAt: Date;
}

// ─── Navigation Types ─────────────────────────────────────────────────────────

export type RootTabParamList = {
  HomeTab: undefined;
  CollectionsTab: undefined;
  SearchTab: undefined;
  WishlistTab: undefined;
  ProfileTab: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
};

export type CollectionsStackParamList = {
  Collections: undefined;
  ProductList: { collectionId: string; collectionTitle: string };
  ProductDetail: { productId: string };
  Cart: undefined;
};

export type SearchStackParamList = {
  Search: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
};

export type WishlistStackParamList = {
  Wishlist: undefined;
  ProductDetail: { productId: string };
  Cart: undefined;
};

export type ProfileStackParamList = {
  Profile: undefined;
};

// ─── Filter / Sort Types ──────────────────────────────────────────────────────

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  materials?: string[];
  productTypes?: string[];
  sortBy: SortOption;
}
