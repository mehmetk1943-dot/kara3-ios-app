/**
 * ═══════════════════════════════════════════════════════════════════
 *  SHOPIFY STOREFRONT API — Client, Queries & Normalizers
 * ═══════════════════════════════════════════════════════════════════
 */

import { createStorefrontApiClient } from '@shopify/storefront-api-client';
import { Product, ProductImage, ProductVariant, Collection } from '../types';

// ─── Client ──────────────────────────────────────────────────────────────────

const STORE_DOMAIN = process.env.EXPO_PUBLIC_SHOPIFY_STORE_DOMAIN ?? '';
const STOREFRONT_TOKEN = process.env.EXPO_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? '';

export const isShopifyConfigured = Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);

export const shopifyClient = isShopifyConfigured
  ? createStorefrontApiClient({
      storeDomain: STORE_DOMAIN,
      apiVersion: '2024-10',
      publicAccessToken: STOREFRONT_TOKEN,
    })
  : null;

// ─── GraphQL Fragments ──────────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  fragment ProductFields on Product {
    id
    handle
    title
    description
    vendor
    productType
    tags
    availableForSale
    createdAt
    images(first: 10) {
      edges {
        node {
          id
          url
          altText
        }
      }
    }
    variants(first: 20) {
      edges {
        node {
          id
          title
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          availableForSale
          sku
        }
      }
    }
    metafields(identifiers: [
      { namespace: "custom", key: "short_description" }
      { namespace: "custom", key: "material" }
      { namespace: "custom", key: "care_instructions" }
    ]) {
      key
      value
    }
  }
`;

// ─── GraphQL Queries ────────────────────────────────────────────────────────

export const QUERIES = {
  products: `
    ${PRODUCT_FRAGMENT}
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `,

  productByHandle: `
    ${PRODUCT_FRAGMENT}
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        ...ProductFields
      }
    }
  `,

  productById: `
    ${PRODUCT_FRAGMENT}
    query GetProductById($id: ID!) {
      product(id: $id) {
        ...ProductFields
      }
    }
  `,

  productsByCollection: `
    ${PRODUCT_FRAGMENT}
    query GetProductsByCollection($handle: String!, $first: Int!) {
      collectionByHandle(handle: $handle) {
        products(first: $first) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `,

  featuredProducts: `
    ${PRODUCT_FRAGMENT}
    query GetFeaturedProducts($first: Int!) {
      collectionByHandle(handle: "featured") {
        products(first: $first) {
          edges {
            node {
              ...ProductFields
            }
          }
        }
      }
    }
  `,

  newArrivals: `
    ${PRODUCT_FRAGMENT}
    query GetNewArrivals($first: Int!) {
      products(first: $first, sortKey: CREATED_AT, reverse: true) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `,

  searchProducts: `
    ${PRODUCT_FRAGMENT}
    query SearchProducts($query: String!, $first: Int!) {
      products(first: $first, query: $query) {
        edges {
          node {
            ...ProductFields
          }
        }
      }
    }
  `,

  collections: `
    query GetCollections($first: Int!) {
      collections(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
            image {
              url
              altText
            }
            productsCount: products(first: 0) {
              edges {
                node {
                  id
                }
              }
            }
          }
        }
      }
    }
  `,

  collectionByHandle: `
    query GetCollectionByHandle($handle: String!) {
      collectionByHandle(handle: $handle) {
        id
        handle
        title
        description
        image {
          url
          altText
        }
      }
    }
  `,
};

// ─── GraphQL Mutations (Cart) ───────────────────────────────────────────────

export const MUTATIONS = {
  cartCreate: `
    mutation CartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                      currencyCode
                    }
                    product {
                      id
                      title
                      images(first: 1) {
                        edges {
                          node {
                            url
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  cartLinesAdd: `
    mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  cartLinesUpdate: `
    mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  cartLinesRemove: `
    mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }
        userErrors {
          field
          message
        }
      }
    }
  `,

  getCart: `
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  `,
};

// ─── Normalizers ────────────────────────────────────────────────────────────
// Transform Shopify GraphQL responses into the app's existing type shapes.

type ShopifyEdge<T> = { node: T };

interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

interface ShopifyProductNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  createdAt: string;
  images: { edges: ShopifyEdge<{ id: string; url: string; altText?: string }>[] };
  variants: {
    edges: ShopifyEdge<{
      id: string;
      title: string;
      price: ShopifyMoney;
      compareAtPrice: ShopifyMoney | null;
      availableForSale: boolean;
      sku: string | null;
    }>[];
  };
  metafields: ({ key: string; value: string } | null)[];
}

interface ShopifyCollectionNode {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: { url: string; altText?: string } | null;
  productsCount?: { edges: unknown[] };
}

function getMetafield(metafields: ({ key: string; value: string } | null)[], key: string): string | undefined {
  const field = metafields?.find((m) => m?.key === key);
  return field?.value ?? undefined;
}

export function normalizeProduct(node: ShopifyProductNode, collectionIds: string[] = []): Product {
  const images: ProductImage[] = node.images.edges.map((e) => ({
    id: e.node.id,
    url: e.node.url,
    altText: e.node.altText,
  }));

  const variants: ProductVariant[] = node.variants.edges.map((e) => ({
    id: e.node.id,
    title: e.node.title,
    price: parseFloat(e.node.price.amount),
    compareAtPrice: e.node.compareAtPrice ? parseFloat(e.node.compareAtPrice.amount) : undefined,
    available: e.node.availableForSale,
    sku: e.node.sku ?? undefined,
  }));

  const defaultVariant = variants[0];
  const compareVariant = variants.find((v) => v.compareAtPrice);

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    shortDescription: getMetafield(node.metafields, 'short_description') ?? node.description.slice(0, 100),
    vendor: node.vendor,
    productType: node.productType,
    tags: node.tags,
    images,
    variants,
    defaultPrice: defaultVariant?.price ?? 0,
    compareAtPrice: compareVariant?.compareAtPrice,
    collectionIds,
    isFeatured: node.tags.includes('featured'),
    isNewArrival: node.tags.includes('new-arrival'),
    material: getMetafield(node.metafields, 'material'),
    careInstructions: getMetafield(node.metafields, 'care_instructions'),
  };
}

export function normalizeCollection(node: ShopifyCollectionNode): Collection {
  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    image: node.image?.url ?? '',
    productCount: node.productsCount?.edges?.length ?? 0,
  };
}

function extractNodes<T>(edges: ShopifyEdge<T>[]): T[] {
  return edges.map((e) => e.node);
}

export function normalizeProductEdges(edges: ShopifyEdge<ShopifyProductNode>[]): Product[] {
  return extractNodes(edges).map((node) => normalizeProduct(node));
}

export function normalizeCollectionEdges(edges: ShopifyEdge<ShopifyCollectionNode>[]): Collection[] {
  return extractNodes(edges).map(normalizeCollection);
}
