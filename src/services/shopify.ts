/**
 * ═══════════════════════════════════════════════════════════════════
 *  KARA3 — SHOPIFY STOREFRONT API SERVICE
 * ═══════════════════════════════════════════════════════════════════
 *
 *  This file is the dedicated integration point for Shopify.
 *  All mock data imports below will be replaced with live API calls.
 *
 *  HOW TO CONNECT SHOPIFY LATER:
 *  ─────────────────────────────
 *  1. Install the Shopify Storefront API client:
 *       npm install @shopify/storefront-api-client
 *
 *  2. Create a Shopify Custom App in your Partner / Admin dashboard
 *     and enable Storefront API access with these scopes:
 *       - unauthenticated_read_product_listings
 *       - unauthenticated_read_collection_listings
 *       - unauthenticated_write_checkouts
 *       - unauthenticated_read_checkouts
 *
 *  3. Add credentials to .env (never commit this file):
 *       EXPO_PUBLIC_SHOPIFY_STORE_DOMAIN=kara3.myshopify.com
 *       EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=your_public_token_here
 *
 *  4. Replace each mock function below with the corresponding
 *     GraphQL query using the client.
 *
 *  Shopify Storefront API reference:
 *    https://shopify.dev/docs/api/storefront
 * ═══════════════════════════════════════════════════════════════════
 */

import { Product, Collection, Cart, CartItem, ProductVariant } from '../types';
import {
  mockProducts,
  getFeaturedProducts as mockGetFeatured,
  getNewArrivals as mockGetNew,
  getProductsByCollection as mockGetByCollection,
  getProductById as mockGetById,
  searchProducts as mockSearch,
} from '../data/products';
import { mockCollections } from '../data/collections';

// ─── Shopify Client (placeholder) ────────────────────────────────────────────
// TODO (Shopify): Uncomment and configure when ready to go live.
//
// import { createStorefrontApiClient } from '@shopify/storefront-api-client';
//
// const client = createStorefrontApiClient({
//   storeDomain: process.env.EXPO_PUBLIC_SHOPIFY_STORE_DOMAIN!,
//   apiVersion: '2024-10',
//   publicAccessToken: process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
// });

// ─── Products ─────────────────────────────────────────────────────────────────

/**
 * Fetch all products.
 * TODO (Shopify): Replace with:
 *   const { data } = await client.request(GET_PRODUCTS_QUERY);
 *   return data.products.edges.map(edge => normalizeProduct(edge.node));
 */
export const getProducts = async (): Promise<Product[]> => {
  // Simulate network delay
  await delay(300);
  return mockProducts;
};

/**
 * Fetch featured products for the home screen hero / featured section.
 * TODO (Shopify): Replace with a metafield or collection tagged 'featured':
 *   collectionByHandle("featured") { products { edges { node { ... } } } }
 */
export const getFeaturedProducts = async (): Promise<Product[]> => {
  await delay(300);
  return mockGetFeatured();
};

/**
 * Fetch new arrival products.
 * TODO (Shopify): Replace with a 'new-arrivals' collection or sort by createdAt:
 *   products(first: 8, sortKey: CREATED_AT, reverse: true) { ... }
 */
export const getNewArrivals = async (): Promise<Product[]> => {
  await delay(200);
  return mockGetNew();
};

/**
 * Fetch a single product by its ID.
 * TODO (Shopify): Replace with:
 *   product(id: "gid://shopify/Product/...") { ... }
 */
export const getProductById = async (id: string): Promise<Product | null> => {
  await delay(200);
  return mockGetById(id) ?? null;
};

/**
 * Fetch products in a specific collection.
 * TODO (Shopify): Replace with:
 *   collectionByHandle(handle: handle) { products(first: 20) { edges { node { ... } } } }
 */
export const getProductsByCollection = async (
  collectionId: string
): Promise<Product[]> => {
  await delay(300);
  return mockGetByCollection(collectionId);
};

/**
 * Search products by keyword.
 * TODO (Shopify): Replace with:
 *   products(first: 20, query: "title:*${query}* OR tag:${query}") { ... }
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  await delay(200);
  return mockSearch(query);
};

// ─── Collections ──────────────────────────────────────────────────────────────

/**
 * Fetch all collections.
 * TODO (Shopify): Replace with:
 *   collections(first: 10) { edges { node { id handle title description image { url } } } }
 */
export const getCollections = async (): Promise<Collection[]> => {
  await delay(300);
  return mockCollections;
};

/**
 * Fetch a single collection by handle.
 * TODO (Shopify): Replace with:
 *   collectionByHandle(handle: handle) { id title description image { url } }
 */
export const getCollectionByHandle = async (
  handle: string
): Promise<Collection | null> => {
  await delay(150);
  return mockCollections.find((c) => c.handle === handle) ?? null;
};

// ─── Cart ─────────────────────────────────────────────────────────────────────
//
// The cart below is managed client-side in CartContext.tsx.
// When Shopify is connected, replace the local CartContext with Shopify's
// Cart API to persist carts server-side and power native checkout.
//
// Shopify Cart API flow:
//   1. cartCreate()            → returns { cart { id checkoutUrl } }
//   2. cartLinesAdd()          → adds lines to the cart
//   3. cartLinesUpdate()       → updates quantities
//   4. cartLinesRemove()       → removes lines
//   5. Redirect to checkoutUrl → Shopify-hosted checkout handles payment
//
// TODO (Shopify): Implement these mutations:
//
// export const createCart = async (): Promise<string> => {
//   const { data } = await client.request(CART_CREATE_MUTATION);
//   return data.cartCreate.cart.id;
// };
//
// export const addToCart = async (cartId: string, variantId: string, quantity: number) => {
//   await client.request(CART_LINES_ADD_MUTATION, {
//     variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] }
//   });
// };
//
// export const getCheckoutUrl = async (cartId: string): Promise<string> => {
//   const { data } = await client.request(GET_CART_QUERY, { variables: { cartId } });
//   return data.cart.checkoutUrl;
// };

// ─── Utility ──────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Format a price number to a display string.
 * TODO (Shopify): Shopify returns { amount: "2850.00", currencyCode: "USD" }
 * Update this function to accept that shape.
 */
export const formatPrice = (price: number, currency = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
