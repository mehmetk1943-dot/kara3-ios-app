import { Collection } from '../types';

// ─── Mock Collections ─────────────────────────────────────────────────────────
// TODO (Shopify): Replace with `shopifyService.getCollections()` which calls
// the Storefront API: collections(first: 10) { edges { node { id handle title ... } } }

export const mockCollections: Collection[] = [
  {
    id: 'col-1',
    handle: 'signature-rings',
    title: 'Signature Rings',
    description:
      'Statement rings crafted in 14K and 18K gold, designed to define your personal style with understated luxury.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80',
    productCount: 8,
  },
  {
    id: 'col-2',
    handle: 'fine-necklaces',
    title: 'Fine Necklaces',
    description:
      'Delicate chains and layering necklaces in gold and rose gold, perfect for every occasion.',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80',
    productCount: 6,
  },
  {
    id: 'col-3',
    handle: 'diamond-earrings',
    title: 'Diamond Earrings',
    description:
      'Brilliant diamond earrings — from classic studs to cascading drops — for refined everyday wear.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80',
    productCount: 7,
  },
  {
    id: 'col-4',
    handle: 'bracelets-bangles',
    title: 'Bracelets & Bangles',
    description:
      'Sleek gold bangles and layering bracelets that add a quiet elegance to your wrist.',
    image: 'https://images.unsplash.com/photo-1573408301185-9519f94815b0?w=600&q=80',
    productCount: 5,
  },
  {
    id: 'col-5',
    handle: 'new-arrivals',
    title: 'New Arrivals',
    description:
      'The latest pieces from Kara3 — freshly crafted, exclusively yours.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80',
    productCount: 4,
  },
];
