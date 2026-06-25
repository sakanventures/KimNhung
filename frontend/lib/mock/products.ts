// Mock product data shaped like a Medusa /store/products response.
// Swap these for real API calls when the Medusa integration is wired up.

export type MockProduct = {
  id: string
  title: string
  slug: string
  category: string   // matches DEPARTMENTS[].id
  description: string
  thumbnail: string
  price: number        // in cents, e.g. 999 = $9.99
  compareAtPrice?: number
  unit: string         // "/ lb" | "each" | "bag" | "combo" | etc.
  tags: string[]
}

export const MOCK_PRODUCTS: MockProduct[] = [
  // ── Seafood ──────────────────────────────────────────────────────────────
  {
    id: 'prod_seafood_001',
    title: 'Live Maine Lobster',
    slug: 'live-maine-lobster',
    category: 'seafood',
    description: 'Fresh from the tank, weighed to order',
    thumbnail: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=400&q=80',
    price: 999,
    compareAtPrice: 1399,
    unit: '/ lb',
    tags: ['fresh', 'sale', 'live'],
  },
  {
    id: 'prod_seafood_002',
    title: 'Live Blue Crab',
    slug: 'live-blue-crab',
    category: 'seafood',
    description: 'Feisty blue crabs from the tank, sold by the pound',
    thumbnail: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=400&q=80',
    price: 599,
    compareAtPrice: 899,
    unit: '/ lb',
    tags: ['fresh', 'sale', 'live'],
  },
  {
    id: 'prod_seafood_003',
    title: 'Fresh Tilapia Fillet',
    slug: 'fresh-tilapia-fillet',
    category: 'seafood',
    description: 'Mild, boneless fillets cut fresh daily from our tanks',
    thumbnail: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=400&q=80',
    price: 399,
    unit: '/ lb',
    tags: ['fresh'],
  },

  // ── Bakery ────────────────────────────────────────────────────────────────
  {
    id: 'prod_bakery_001',
    title: 'Bánh Mì Combo',
    slug: 'banh-mi-combo',
    category: 'bakery',
    description: 'Two house bánh mì + Vietnamese iced coffee',
    thumbnail: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?auto=format&fit=crop&w=400&q=80',
    price: 1199,
    compareAtPrice: 1500,
    unit: 'combo',
    tags: ['sale', 'combo'],
  },
  {
    id: 'prod_bakery_002',
    title: 'French Baguette',
    slug: 'french-baguette',
    category: 'bakery',
    description: 'Crackly crust, airy interior — baked in-house every morning',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    price: 199,
    unit: 'each',
    tags: ['fresh-baked'],
  },
  {
    id: 'prod_bakery_003',
    title: 'Pandan Sponge Cake',
    slug: 'pandan-sponge-cake',
    category: 'bakery',
    description: 'Fragrant, pillowy Vietnamese-style pandan layer cake',
    thumbnail: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80',
    price: 899,
    compareAtPrice: 1099,
    unit: 'each',
    tags: ['fresh-baked', 'sale'],
  },

  // ── Pantry ────────────────────────────────────────────────────────────────
  {
    id: 'prod_pantry_001',
    title: 'Jasmine Rice 25 lb',
    slug: 'jasmine-rice-25lb',
    category: 'pantry',
    description: 'Premium new-crop fragrant jasmine rice',
    thumbnail: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=400&q=80',
    price: 2499,
    compareAtPrice: 3299,
    unit: 'bag',
    tags: ['staple', 'sale'],
  },
  {
    id: 'prod_pantry_002',
    title: 'Tiparos Fish Sauce 60 oz',
    slug: 'tiparos-fish-sauce-60oz',
    category: 'pantry',
    description: 'First-press Thai fish sauce, essential for phở and stir-fries',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
    price: 699,
    compareAtPrice: 899,
    unit: 'bottle',
    tags: ['condiment', 'sale'],
  },
  {
    id: 'prod_pantry_003',
    title: 'Instant Phở Kit (30 pack)',
    slug: 'instant-pho-kit-30pack',
    category: 'pantry',
    description: 'Authentic beef phở noodle packets with seasoning broth',
    thumbnail: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=400&q=80',
    price: 1299,
    compareAtPrice: 1599,
    unit: 'box',
    tags: ['noodles', 'sale'],
  },

  // ── Produce ───────────────────────────────────────────────────────────────
  {
    id: 'prod_produce_001',
    title: 'Whole Monthong Durian',
    slug: 'whole-monthong-durian',
    category: 'produce',
    description: 'King of fruits, in season now',
    thumbnail: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=400&q=80',
    price: 499,
    compareAtPrice: 699,
    unit: '/ lb',
    tags: ['seasonal', 'sale'],
  },
  {
    id: 'prod_produce_002',
    title: 'Fresh Bok Choy',
    slug: 'fresh-bok-choy',
    category: 'produce',
    description: 'Crisp baby bok choy by the bunch',
    thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    price: 99,
    compareAtPrice: 179,
    unit: '/ lb',
    tags: ['vegetable', 'sale'],
  },
  {
    id: 'prod_produce_003',
    title: 'Rambutan',
    slug: 'rambutan',
    category: 'produce',
    description: 'Sweet, juicy tropical fruit with a bright red skin',
    thumbnail: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=400&q=80',
    price: 299,
    compareAtPrice: 399,
    unit: '/ lb',
    tags: ['tropical', 'sale'],
  },

  // ── Beauty ────────────────────────────────────────────────────────────────
  {
    id: 'prod_beauty_001',
    title: 'COSRX Snail Mucin Essence',
    slug: 'cosrx-snail-mucin-essence',
    category: 'beauty',
    description: 'Cult K-beauty essence for hydration and skin barrier repair',
    thumbnail: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
    price: 1899,
    compareAtPrice: 2499,
    unit: 'each',
    tags: ['k-beauty', 'skincare', 'sale'],
  },
  {
    id: 'prod_beauty_002',
    title: 'Innisfree Green Tea Moisturizer',
    slug: 'innisfree-green-tea-moisturizer',
    category: 'beauty',
    description: 'Lightweight Jeju green tea moisturizer for all skin types',
    thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    price: 2299,
    unit: 'each',
    tags: ['k-beauty', 'moisturizer'],
  },
  {
    id: 'prod_beauty_003',
    title: 'Bioré UV Aqua Rich Sunscreen SPF 50+',
    slug: 'biore-uv-aqua-rich-spf50',
    category: 'beauty',
    description: 'Japan\'s #1 sunscreen — weightless, no white cast',
    thumbnail: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80',
    price: 1499,
    compareAtPrice: 1899,
    unit: 'each',
    tags: ['j-beauty', 'sunscreen', 'sale'],
  },

  // ── Frozen ────────────────────────────────────────────────────────────────
  {
    id: 'prod_frozen_001',
    title: 'Korean Beef Bulgogi',
    slug: 'korean-beef-bulgogi',
    category: 'frozen',
    description: 'Thin-sliced ribeye, hot-pot & BBQ ready',
    thumbnail: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?auto=format&fit=crop&w=400&q=80',
    price: 799,
    compareAtPrice: 1099,
    unit: '/ lb',
    tags: ['hot-pot', 'bbq', 'sale'],
  },
  {
    id: 'prod_frozen_002',
    title: 'Pork & Chive Dumplings (50 pk)',
    slug: 'pork-chive-dumplings-50pk',
    category: 'frozen',
    description: 'Handcrafted dumplings with pork and fragrant garlic chives',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
    price: 999,
    compareAtPrice: 1299,
    unit: 'bag',
    tags: ['dumplings', 'sale'],
  },
  {
    id: 'prod_frozen_003',
    title: 'Mala Hot Pot Broth',
    slug: 'mala-hot-pot-broth',
    category: 'frozen',
    description: 'Numbing, spicy Sichuan mala broth — serves 4',
    thumbnail: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=400&q=80',
    price: 599,
    compareAtPrice: 799,
    unit: 'pack',
    tags: ['hot-pot', 'broth', 'sale'],
  },
]

export function getProductsByCategory(category: string): MockProduct[] {
  return MOCK_PRODUCTS.filter((p) => p.category === category)
}

export function getProductBySlug(category: string, slug: string): MockProduct | undefined {
  return MOCK_PRODUCTS.find((p) => p.category === category && p.slug === slug)
}
