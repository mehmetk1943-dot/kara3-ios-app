/**
 * ═══════════════════════════════════════════════════════════════════
 *  KARA3 — SHOPIFY STOREFRONT API SERVICE
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Public API consumed by all screens. When Shopify credentials are
 *  configured via .env, this module queries the live Storefront API.
 *  Otherwise it falls back to local mock data for development.
 *
 *  Setup:
 *    1. Copy .env.example → .env
 *    2. Fill in EXPO_PUBLIC_SHOPIFY_STORE_DOMAIN and
 *       EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
 *    3. Restart the Expo dev server
 * ═══════════════════════════════════════════════════════════════════
 */

import { Product, Collection } from '../types';
import {
  shopifyClient,
  isShopifyConfigured,
  QUERIES,
  MUTATIONS,
  normalizeProduct,
  normalizeProductEdges,
  normalizeCollectionEdges,
} from './shopifyClient';

// Mock data imports (used as fallback when Shopify is not configured)
import {
  mockProducts,
  getFeaturedProducts as mockGetFeatured,
  getNewArrivals as mockGetNew,
  getProductsByCollection as mockGetByCollection,
  getProductById as mockGetById,
  searchProducts as mockSearch,
} from '../data/products';
import { mockCollections } from '../data/collections';

// ─── Products ─────────────────────────────────────────────────────────────────

export const getProducts = async (): Promise<Product[]> => {
  if (!isShopifyConfigured || !shopifyClient) {
    await delay(300);
    return mockProducts;
  }

  const { data, errors } = await shopifyClient.request(QUERIES.products, {
    variables: { first: 50 },
  });

  if (errors || !data?.products) {
    console.warn('Shopify getProducts failed, using mock data:', errors);
    return mockProducts;
  }

  return normalizeProductEdges(data.products.edges);
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  if (!isShopifyConfigured || !shopifyClient) {
    await delay(300);
    return mockGetFeatured();
  }

  // Try the "featured" collection first
  const { data, errors } = await shopifyClient.request(QUERIES.featuredProducts, {
    variables: { first: 10 },
  });

  if (errors || !data?.collectionByHandle?.products) {
    // Fallback: fetch all products and filter by "featured" tag
    const allProducts = await getProducts();
    return allProducts.filter((p) => p.isFeatured);
  }

  return normalizeProductEdges(data.collectionByHandle.products.edges).map((p) => ({
    ...p,
    isFeatured: true,
  }));
};

export const getNewArrivals = async (): Promise<Product[]> => {
  if (!isShopifyConfigured || !shopifyClient) {
    await delay(200);
    return mockGetNew();
  }

  const { data, errors } = await shopifyClient.request(QUERIES.newArrivals, {
    variables: { first: 8 },
  });

  if (errors || !data?.products) {
    console.warn('Shopify getNewArrivals failed, using mock data:', errors);
    return mockGetNew();
  }

  return normalizeProductEdges(data.products.edges).map((p) => ({
    ...p,
    isNewArrival: true,
  }));
};

export const getProductById = async (id: string): Promise<Product | null> => {
  if (!isShopifyConfigured || !shopifyClient) {
    await delay(200);
    return mockGetById(id) ?? null;
  }

  // Shopify GIDs start with "gid://"; local IDs don't
  const isGid = id.startsWith('gid://');
  const query = isGid ? QUERIES.productById : QUERIES.productByHandle;
  const variables = isGid ? { id } : { handle: id };

  const { data, errors } = await shopifyClient.request(query, { variables });

  const node = isGid ? data?.product : data?.productByHandle;
  if (errors || !node) {
    console.warn('Shopify getProductById failed, using mock data:', errors);
    return mockGetById(id) ?? null;
  }

  return normalizeProduct(node);
};

export const getProductsByCollection = async (
  collectionId: string
): Promise<Product[]> => {
  if (!isShopifyConfigured || !shopifyClient) {
    await delay(300);
    return mockGetByCollection(collectionId);
  }

  // Try to resolve a handle from the collectionId
  // If it's a Shopify GID, we fetch the collection first to get its handle
  // Otherwise, treat it as a handle directly
  let handle = collectionId;
  if (collectionId.startsWith('gid://')) {
    const col = await getCollectionById(collectionId);
    if (!col) return [];
    handle = col.handle;
  }

  const { data, errors } = await shopifyClient.request(QUERIES.productsByCollection, {
    variables: { handle, first: 50 },
  });

  if (errors || !data?.collectionByHandle?.products) {
    console.warn('Shopify getProductsByCollection failed, using mock data:', errors);
    return mockGetByCollection(collectionId);
  }

  return normalizeProductEdges(data.collectionByHandle.products.edges);
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  if (!isShopifyConfigured || !shopifyClient) {
    await delay(200);
    return mockSearch(query);
  }

  if (!query.trim()) return [];

  const { data, errors } = await shopifyClient.request(QUERIES.searchProducts, {
    variables: { query, first: 20 },
  });

  if (errors || !data?.products) {
    console.warn('Shopify searchProducts failed, using mock data:', errors);
    return mockSearch(query);
  }

  return normalizeProductEdges(data.products.edges);
};

// ─── Collections ──────────────────────────────────────────────────────────────

export const getCollections = async (): Promise<Collection[]> => {
  if (!isShopifyConfigured || !shopifyClient) {
    await delay(300);
    return mockCollections;
  }

  const { data, errors } = await shopifyClient.request(QUERIES.collections, {
    variables: { first: 20 },
  });

  if (errors || !data?.collections) {
    console.warn('Shopify getCollections failed, using mock data:', errors);
    return mockCollections;
  }

  return normalizeCollectionEdges(data.collections.edges);
};

export const getCollectionByHandle = async (
  handle: string
): Promise<Collection | null> => {
  if (!isShopifyConfigured || !shopifyClient) {
    await delay(150);
    return mockCollections.find((c) => c.handle === handle) ?? null;
  }

  const { data, errors } = await shopifyClient.request(QUERIES.collectionByHandle, {
    variables: { handle },
  });

  if (errors || !data?.collectionByHandle) {
    console.warn('Shopify getCollectionByHandle failed:', errors);
    return mockCollections.find((c) => c.handle === handle) ?? null;
  }

  const node = data.collectionByHandle;
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    image: node.image?.url ?? '',
    productCount: 0,
  };
};

// ─── Cart (Shopify Cart API) ─────────────────────────────────────────────────

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  total: number;
}

/**
 * Create a new Shopify cart with the given line items and return
 * the cart ID and checkout URL. Used at checkout time to hand off
 * the local cart state to Shopify's hosted checkout.
 */
export const createShopifyCart = async (
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ShopifyCart | null> => {
  if (!isShopifyConfigured || !shopifyClient) return null;

  const { data, errors } = await shopifyClient.request(MUTATIONS.cartCreate, {
    variables: { input: { lines } },
  });

  if (errors || data?.cartCreate?.userErrors?.length > 0 || !data?.cartCreate?.cart) {
    console.warn('Shopify cartCreate failed:', errors ?? data?.cartCreate?.userErrors);
    return null;
  }

  const cart = data.cartCreate.cart;
  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: parseFloat(cart.cost.subtotalAmount.amount),
    total: parseFloat(cart.cost.totalAmount.amount),
  };
};

/**
 * Fetch the checkout URL for an existing Shopify cart.
 */
export const getCheckoutUrl = async (cartId: string): Promise<string | null> => {
  if (!isShopifyConfigured || !shopifyClient) return null;

  const { data, errors } = await shopifyClient.request(MUTATIONS.getCart, {
    variables: { cartId },
  });

  if (errors || !data?.cart) {
    console.warn('Shopify getCart failed:', errors);
    return null;
  }

  return data.cart.checkoutUrl;
};

// ─── Internal Helpers ────────────────────────────────────────────────────────

const getCollectionById = async (id: string): Promise<Collection | null> => {
  // Fetch all collections and find by ID (Storefront API doesn't have collectionById)
  const collections = await getCollections();
  return collections.find((c) => c.id === id) ?? null;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// ─── Utility ─────────────────────────────────────────────────────────────────

export const formatPrice = (price: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

/** Whether the app is running with a live Shopify connection */
export { isShopifyConfigured };
