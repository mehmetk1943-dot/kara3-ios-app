import { Product } from '../types';

// ─── Mock Products ────────────────────────────────────────────────────────────
// TODO (Shopify): Replace with `shopifyService.getProducts()` or
// `shopifyService.getProductsByCollection(handle)` which calls:
//   products(first: 20) { edges { node { id handle title variants images ... } } }

export const mockProducts: Product[] = [
  // ── Rings ──────────────────────────────────────────────────────────────────
  {
    id: 'prod-001',
    handle: 'aurelia-signet-ring',
    title: 'Aurelia Signet Ring',
    shortDescription: 'Bold 18K gold signet with hand-engraved detail',
    description:
      'The Aurelia Signet Ring is cast in solid 18K yellow gold with a flat oval face finished by hand engraving. Its weight and presence make it a lifelong heirloom — worn alone or stacked for maximum impact.',
    vendor: 'Kara3',
    productType: 'Ring',
    tags: ['ring', 'gold', 'signet', 'statement', 'bestseller'],
    material: '18K Yellow Gold',
    careInstructions: 'Polish with a soft cloth. Avoid perfumes and chemicals.',
    images: [
      {
        id: 'img-001-1',
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
        altText: 'Aurelia Signet Ring — top view',
      },
      {
        id: 'img-001-2',
        url: 'https://images.unsplash.com/photo-1601121141461-9d6647bef0a1?w=800&q=80',
        altText: 'Aurelia Signet Ring — side view',
      },
      {
        id: 'img-001-3',
        url: 'https://images.unsplash.com/photo-1590548784585-643d2b9f2925?w=800&q=80',
        altText: 'Aurelia Signet Ring — lifestyle',
      },
    ],
    variants: [
      { id: 'var-001-1', title: 'Size 5', price: 2850, available: true },
      { id: 'var-001-2', title: 'Size 6', price: 2850, available: true },
      { id: 'var-001-3', title: 'Size 7', price: 2850, available: true },
      { id: 'var-001-4', title: 'Size 8', price: 2850, available: false },
    ],
    defaultPrice: 2850,
    collectionIds: ['col-1', 'col-5'],
    isFeatured: true,
    isNewArrival: true,
  },
  {
    id: 'prod-002',
    handle: 'lumena-diamond-band',
    title: 'Lumena Diamond Band',
    shortDescription: 'Eternity band set with VS1 round brilliants',
    description:
      'Sixty VS1 round brilliant diamonds are channel-set in a seamless band of 18K white gold. Comfortable for daily wear, yet extraordinary in every light. A quiet declaration of permanence.',
    vendor: 'Kara3',
    productType: 'Ring',
    tags: ['ring', 'diamond', 'band', 'eternity', 'white-gold'],
    material: '18K White Gold, VS1 Diamonds',
    careInstructions: 'Professional cleaning recommended every 6 months.',
    images: [
      {
        id: 'img-002-1',
        url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80',
        altText: 'Lumena Diamond Band',
      },
      {
        id: 'img-002-2',
        url: 'https://images.unsplash.com/photo-1608541737042-87a12275d313?w=800&q=80',
        altText: 'Lumena Diamond Band on hand',
      },
    ],
    variants: [
      { id: 'var-002-1', title: 'Size 5', price: 4200, compareAtPrice: 4800, available: true },
      { id: 'var-002-2', title: 'Size 6', price: 4200, compareAtPrice: 4800, available: true },
      { id: 'var-002-3', title: 'Size 7', price: 4200, compareAtPrice: 4800, available: true },
    ],
    defaultPrice: 4200,
    compareAtPrice: 4800,
    collectionIds: ['col-1'],
    isFeatured: true,
  },

  // ── Necklaces ──────────────────────────────────────────────────────────────
  {
    id: 'prod-003',
    handle: 'soleil-layering-chain',
    title: 'Soleil Layering Chain',
    shortDescription: 'Ultra-fine 14K gold chain, 18"',
    description:
      'Spun from 14K gold into a micro-link chain of extraordinary fineness, the Soleil is designed to layer — alone or with pendants. At 18 inches it sits beautifully at the collarbone.',
    vendor: 'Kara3',
    productType: 'Necklace',
    tags: ['necklace', 'chain', 'gold', 'layering', 'delicate'],
    material: '14K Yellow Gold',
    careInstructions: 'Store separately to prevent tangling.',
    images: [
      {
        id: 'img-003-1',
        url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
        altText: 'Soleil Layering Chain',
      },
      {
        id: 'img-003-2',
        url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
        altText: 'Soleil Chain worn layered',
      },
    ],
    variants: [
      { id: 'var-003-1', title: '16"', price: 780, available: true },
      { id: 'var-003-2', title: '18"', price: 840, available: true },
      { id: 'var-003-3', title: '20"', price: 890, available: true },
    ],
    defaultPrice: 840,
    collectionIds: ['col-2'],
    isFeatured: true,
  },
  {
    id: 'prod-004',
    handle: 'celeste-pendant',
    title: 'Celeste Crescent Pendant',
    shortDescription: 'Crescent moon pendant with pavé diamonds, 14K gold',
    description:
      'A slender crescent moon, paved with 28 round brilliant diamonds, suspended from a fine 14K gold chain. The Celeste captures light from every angle — a talisman of quiet luminosity.',
    vendor: 'Kara3',
    productType: 'Necklace',
    tags: ['necklace', 'pendant', 'moon', 'diamond', 'gold'],
    material: '14K Yellow Gold, Pavé Diamonds',
    careInstructions: 'Avoid ultrasonic cleaners. Wipe gently with a damp cloth.',
    images: [
      {
        id: 'img-004-1',
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
        altText: 'Celeste Crescent Pendant',
      },
    ],
    variants: [
      { id: 'var-004-1', title: 'Default', price: 1650, available: true },
    ],
    defaultPrice: 1650,
    collectionIds: ['col-2', 'col-5'],
    isNewArrival: true,
  },

  // ── Earrings ───────────────────────────────────────────────────────────────
  {
    id: 'prod-005',
    handle: 'nova-diamond-studs',
    title: 'Nova Diamond Studs',
    shortDescription: '0.80 ct TW diamond studs in 18K white gold',
    description:
      'Two round brilliant diamonds — 0.40 ct each — prong-set in polished 18K white gold. The Nova studs are the foundation of every fine jewelry wardrobe: effortless, eternal, essential.',
    vendor: 'Kara3',
    productType: 'Earrings',
    tags: ['earrings', 'studs', 'diamond', 'white-gold', 'classic', 'bestseller'],
    material: '18K White Gold, 0.80ct TW Diamonds',
    careInstructions: 'Store in original box. Clean with jewelry cloth.',
    images: [
      {
        id: 'img-005-1',
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
        altText: 'Nova Diamond Studs',
      },
      {
        id: 'img-005-2',
        url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&q=80',
        altText: 'Nova Studs worn',
      },
    ],
    variants: [
      { id: 'var-005-1', title: '0.80 ct TW', price: 3400, available: true },
      { id: 'var-005-2', title: '1.00 ct TW', price: 4100, available: true },
    ],
    defaultPrice: 3400,
    collectionIds: ['col-3'],
    isFeatured: true,
  },
  {
    id: 'prod-006',
    handle: 'arc-drop-earrings',
    title: 'Arc Drop Earrings',
    shortDescription: 'Architectural 18K gold drops with a brushed finish',
    description:
      'Sweeping architectural arcs in brushed 18K gold, suspended from polished ear-wire hooks. The Arc earrings move with you — bold at the office, exceptional at dinner.',
    vendor: 'Kara3',
    productType: 'Earrings',
    tags: ['earrings', 'drops', 'gold', 'statement', 'architectural'],
    material: '18K Yellow Gold',
    careInstructions: 'Polish with a soft cloth to maintain brushed finish.',
    images: [
      {
        id: 'img-006-1',
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
        altText: 'Arc Drop Earrings',
      },
    ],
    variants: [
      { id: 'var-006-1', title: 'Default', price: 1920, available: true },
    ],
    defaultPrice: 1920,
    collectionIds: ['col-3', 'col-5'],
    isNewArrival: true,
  },

  // ── Bracelets ──────────────────────────────────────────────────────────────
  {
    id: 'prod-007',
    handle: 'meridian-bangle',
    title: 'Meridian Bangle',
    shortDescription: 'Solid 18K gold hollow bangle, medium width',
    description:
      'The Meridian Bangle is a study in proportion. Cast in solid 18K gold with a gentle oval cross-section, it sits perfectly on the wrist — substantial without weight, polished without ostentation.',
    vendor: 'Kara3',
    productType: 'Bracelet',
    tags: ['bracelet', 'bangle', 'gold', 'solid', 'classic'],
    material: '18K Yellow Gold',
    careInstructions: 'Avoid impact. Polish regularly with a soft cloth.',
    images: [
      {
        id: 'img-007-1',
        url: 'https://images.unsplash.com/photo-1573408301185-9519f94815b0?w=800&q=80',
        altText: 'Meridian Bangle',
      },
      {
        id: 'img-007-2',
        url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&q=80',
        altText: 'Meridian Bangle stacked',
      },
    ],
    variants: [
      { id: 'var-007-1', title: 'Small (58mm)', price: 3200, available: true },
      { id: 'var-007-2', title: 'Medium (63mm)', price: 3200, available: true },
      { id: 'var-007-3', title: 'Large (68mm)', price: 3200, available: false },
    ],
    defaultPrice: 3200,
    collectionIds: ['col-4'],
    isFeatured: true,
  },
  {
    id: 'prod-008',
    handle: 'tennis-bracelet',
    title: 'Rivière Tennis Bracelet',
    shortDescription: '2.50 ct TW diamonds in 18K white gold',
    description:
      'Forty round brilliant diamonds totaling 2.50 carats are box-set in 18K white gold in a continuous stream of brilliance. The Rivière is the ultimate everyday luxury — versatile, radiant, unforgettable.',
    vendor: 'Kara3',
    productType: 'Bracelet',
    tags: ['bracelet', 'tennis', 'diamond', 'white-gold', 'luxury'],
    material: '18K White Gold, 2.50ct TW Diamonds',
    careInstructions: 'Secure clasp always engaged before wearing. Professional cleaning recommended.',
    images: [
      {
        id: 'img-008-1',
        url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
        altText: 'Rivière Tennis Bracelet',
      },
    ],
    variants: [
      { id: 'var-008-1', title: '6.5"', price: 7800, compareAtPrice: 8500, available: true },
      { id: 'var-008-2', title: '7"', price: 7800, compareAtPrice: 8500, available: true },
      { id: 'var-008-3', title: '7.5"', price: 7800, compareAtPrice: 8500, available: true },
    ],
    defaultPrice: 7800,
    compareAtPrice: 8500,
    collectionIds: ['col-4'],
  },
];

// ─── Helper Functions ─────────────────────────────────────────────────────────
// TODO (Shopify): These helpers will be replaced by service layer API calls.

export const getFeaturedProducts = (): Product[] =>
  mockProducts.filter((p) => p.isFeatured);

export const getNewArrivals = (): Product[] =>
  mockProducts.filter((p) => p.isNewArrival);

export const getProductsByCollection = (collectionId: string): Product[] =>
  mockProducts.filter((p) => p.collectionIds.includes(collectionId));

export const getProductById = (id: string): Product | undefined =>
  mockProducts.find((p) => p.id === id);

export const searchProducts = (query: string): Product[] => {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return mockProducts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.includes(q)) ||
      p.productType.toLowerCase().includes(q) ||
      (p.material?.toLowerCase().includes(q) ?? false)
  );
};
