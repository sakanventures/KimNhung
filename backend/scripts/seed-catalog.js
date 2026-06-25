#!/usr/bin/env node
// Seed the Kim Nhung product catalog into Medusa.
//
// Usage:
//   MEDUSA_ADMIN_PASSWORD="..." node scripts/seed-catalog.js
//
// Optional env vars:
//   MEDUSA_URL            (default: http://localhost:9000)
//   MEDUSA_ADMIN_EMAIL    (default: admin@kimnhung.com)

const BASE_URL = process.env.MEDUSA_URL ?? 'http://localhost:9000'
const ADMIN_EMAIL = process.env.MEDUSA_ADMIN_EMAIL ?? 'admin@kimnhung.com'
const ADMIN_PASSWORD = process.env.MEDUSA_ADMIN_PASSWORD

if (!ADMIN_PASSWORD) {
  console.error('Error: MEDUSA_ADMIN_PASSWORD env var is required')
  process.exit(1)
}

// ── HTTP helper ───────────────────────────────────────────────────────────────

async function api(token, method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(body != null && { body: JSON.stringify(body) }),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(`${method} ${path} [${res.status}]: ${JSON.stringify(json)}`)
  }
  return json
}

// ── Catalog data ──────────────────────────────────────────────────────────────
//
// price        = the sale price (what customers pay now), in cents
// compareAtPrice = the original/regular price (shown as "was $X"), in cents
//               = null for non-sale items
//
// In Medusa's pricing model:
//   variant base price  ← compareAtPrice ?? price  (the regular price)
//   "Weekly Ad" price list override ← price  (the sale price, only for items with compareAtPrice)
//
// The storefront API then returns:
//   calculated_price.original_amount   = regular price  (variant base)
//   calculated_price.calculated_amount = effective price (sale override if active)

const CATEGORIES = [
  {
    name: 'Live Seafood Market',
    handle: 'seafood',
    description: 'Live tanks — lobster, crab, tilapia, and more.',
  },
  {
    name: 'Bakery & Bánh Mì',
    handle: 'bakery',
    description: 'House-baked baguettes, Vietnamese pastries, and bánh mì made fresh daily.',
  },
  {
    name: 'Imported Pantry',
    handle: 'pantry',
    description: 'Sauces, rice, noodles, and pantry staples sourced directly from Southeast Asia.',
  },
  {
    name: 'Fresh Produce',
    handle: 'produce',
    description: 'Seasonal tropical fruit and Asian vegetables — durian, rambutan, bok choy, and more.',
  },
  {
    name: 'Asian Beauty',
    handle: 'beauty',
    description: 'K-beauty and J-beauty essentials — serums, moisturizers, and SPF.',
  },
  {
    name: 'Frozen & Hot Pot',
    handle: 'frozen',
    description: 'Frozen meats, dumplings, and hot pot broths ready for your table.',
  },
]

const PRODUCTS = [
  // ── Seafood ──────────────────────────────────────────────────────────────────
  {
    title: 'Live Maine Lobster',
    handle: 'live-maine-lobster',
    category: 'seafood',
    description: 'Fresh from the tank, weighed to order',
    thumbnail: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=400&q=80',
    price: 999,
    compareAtPrice: 1399,
    unit: '/ lb',
    tags: ['fresh', 'sale', 'live'],
  },
  {
    title: 'Live Blue Crab',
    handle: 'live-blue-crab',
    category: 'seafood',
    description: 'Feisty blue crabs from the tank, sold by the pound',
    thumbnail: 'https://images.unsplash.com/photo-1534483509719-3feaee7c30da?auto=format&fit=crop&w=400&q=80',
    price: 599,
    compareAtPrice: 899,
    unit: '/ lb',
    tags: ['fresh', 'sale', 'live'],
  },
  {
    title: 'Fresh Tilapia Fillet',
    handle: 'fresh-tilapia-fillet',
    category: 'seafood',
    description: 'Mild, boneless fillets cut fresh daily from our tanks',
    thumbnail: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&w=400&q=80',
    price: 399,
    compareAtPrice: null,
    unit: '/ lb',
    tags: ['fresh'],
  },
  // ── Bakery ───────────────────────────────────────────────────────────────────
  {
    title: 'Bánh Mì Combo',
    handle: 'banh-mi-combo',
    category: 'bakery',
    description: 'Two house bánh mì + Vietnamese iced coffee',
    thumbnail: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?auto=format&fit=crop&w=400&q=80',
    price: 1199,
    compareAtPrice: 1500,
    unit: 'combo',
    tags: ['sale', 'combo'],
  },
  {
    title: 'French Baguette',
    handle: 'french-baguette',
    category: 'bakery',
    description: 'Crackly crust, airy interior — baked in-house every morning',
    thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    price: 199,
    compareAtPrice: null,
    unit: 'each',
    tags: ['fresh-baked'],
  },
  {
    title: 'Pandan Sponge Cake',
    handle: 'pandan-sponge-cake',
    category: 'bakery',
    description: 'Fragrant, pillowy Vietnamese-style pandan layer cake',
    thumbnail: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80',
    price: 899,
    compareAtPrice: 1099,
    unit: 'each',
    tags: ['fresh-baked', 'sale'],
  },
  // ── Pantry ───────────────────────────────────────────────────────────────────
  {
    title: 'Jasmine Rice 25 lb',
    handle: 'jasmine-rice-25lb',
    category: 'pantry',
    description: 'Premium new-crop fragrant jasmine rice',
    thumbnail: 'https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&w=400&q=80',
    price: 2499,
    compareAtPrice: 3299,
    unit: 'bag',
    tags: ['staple', 'sale'],
  },
  {
    title: 'Tiparos Fish Sauce 60 oz',
    handle: 'tiparos-fish-sauce-60oz',
    category: 'pantry',
    description: 'First-press Thai fish sauce, essential for phở and stir-fries',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
    price: 699,
    compareAtPrice: 899,
    unit: 'bottle',
    tags: ['condiment', 'sale'],
  },
  {
    title: 'Instant Phở Kit (30 pack)',
    handle: 'instant-pho-kit-30pack',
    category: 'pantry',
    description: 'Authentic beef phở noodle packets with seasoning broth',
    thumbnail: 'https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?auto=format&fit=crop&w=400&q=80',
    price: 1299,
    compareAtPrice: 1599,
    unit: 'box',
    tags: ['noodles', 'sale'],
  },
  // ── Produce ──────────────────────────────────────────────────────────────────
  {
    title: 'Whole Monthong Durian',
    handle: 'whole-monthong-durian',
    category: 'produce',
    description: 'King of fruits, in season now',
    thumbnail: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?auto=format&fit=crop&w=400&q=80',
    price: 499,
    compareAtPrice: 699,
    unit: '/ lb',
    tags: ['seasonal', 'sale'],
  },
  {
    title: 'Fresh Bok Choy',
    handle: 'fresh-bok-choy',
    category: 'produce',
    description: 'Crisp baby bok choy by the bunch',
    thumbnail: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=400&q=80',
    price: 99,
    compareAtPrice: 179,
    unit: '/ lb',
    tags: ['vegetable', 'sale'],
  },
  {
    title: 'Rambutan',
    handle: 'rambutan',
    category: 'produce',
    description: 'Sweet, juicy tropical fruit with a bright red skin',
    thumbnail: 'https://images.unsplash.com/photo-1519996529931-28324d5a630e?auto=format&fit=crop&w=400&q=80',
    price: 299,
    compareAtPrice: 399,
    unit: '/ lb',
    tags: ['tropical', 'sale'],
  },
  // ── Beauty ───────────────────────────────────────────────────────────────────
  {
    title: 'COSRX Snail Mucin Essence',
    handle: 'cosrx-snail-mucin-essence',
    category: 'beauty',
    description: 'Cult K-beauty essence for hydration and skin barrier repair',
    thumbnail: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
    price: 1899,
    compareAtPrice: 2499,
    unit: 'each',
    tags: ['k-beauty', 'skincare', 'sale'],
  },
  {
    title: 'Innisfree Green Tea Moisturizer',
    handle: 'innisfree-green-tea-moisturizer',
    category: 'beauty',
    description: 'Lightweight Jeju green tea moisturizer for all skin types',
    thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=80',
    price: 2299,
    compareAtPrice: null,
    unit: 'each',
    tags: ['k-beauty', 'moisturizer'],
  },
  {
    title: 'Bioré UV Aqua Rich Sunscreen SPF 50+',
    handle: 'biore-uv-aqua-rich-spf50',
    category: 'beauty',
    description: "Japan's #1 sunscreen — weightless, no white cast",
    thumbnail: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=400&q=80',
    price: 1499,
    compareAtPrice: 1899,
    unit: 'each',
    tags: ['j-beauty', 'sunscreen', 'sale'],
  },
  // ── Frozen ───────────────────────────────────────────────────────────────────
  {
    title: 'Korean Beef Bulgogi',
    handle: 'korean-beef-bulgogi',
    category: 'frozen',
    description: 'Thin-sliced ribeye, hot-pot & BBQ ready',
    thumbnail: 'https://images.unsplash.com/photo-1529059997568-3d847b1154f0?auto=format&fit=crop&w=400&q=80',
    price: 799,
    compareAtPrice: 1099,
    unit: '/ lb',
    tags: ['hot-pot', 'bbq', 'sale'],
  },
  {
    title: 'Pork & Chive Dumplings (50 pk)',
    handle: 'pork-chive-dumplings-50pk',
    category: 'frozen',
    description: 'Handcrafted dumplings with pork and fragrant garlic chives',
    thumbnail: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=400&q=80',
    price: 999,
    compareAtPrice: 1299,
    unit: 'bag',
    tags: ['dumplings', 'sale'],
  },
  {
    title: 'Mala Hot Pot Broth',
    handle: 'mala-hot-pot-broth',
    category: 'frozen',
    description: 'Numbing, spicy Sichuan mala broth — serves 4',
    thumbnail: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4853?auto=format&fit=crop&w=400&q=80',
    price: 599,
    compareAtPrice: 799,
    unit: 'pack',
    tags: ['hot-pot', 'broth', 'sale'],
  },
]

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  // 1. Authenticate
  console.log('Authenticating...')
  const { token } = await api(null, 'POST', '/auth/user/emailpass', {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
  })
  console.log('  ✓ Authenticated')

  // 2. Get default sales channel
  console.log('\nResolving sales channel...')
  const { sales_channels } = await api(token, 'GET', '/admin/sales-channels?limit=1')
  if (!sales_channels?.length) {
    throw new Error('No sales channel found — did the Medusa initial seed run?')
  }
  const scId = sales_channels[0].id
  console.log(`  ✓ ${sales_channels[0].name} (${scId})`)

  // 3. Resolve or create product categories
  console.log('\nResolving product categories...')
  const { product_categories: existingCats } = await api(
    token, 'GET', '/admin/product-categories?limit=100'
  )
  const catByHandle = Object.fromEntries(existingCats.map((c) => [c.handle, c.id]))

  for (const cat of CATEGORIES) {
    if (catByHandle[cat.handle]) {
      console.log(`  ✓ (exists)  ${cat.handle}`)
    } else {
      const { product_category } = await api(token, 'POST', '/admin/product-categories', {
        name: cat.name,
        handle: cat.handle,
        description: cat.description,
        is_active: true,
        is_internal: false,
      })
      catByHandle[cat.handle] = product_category.id
      console.log(`  + (created) ${cat.handle} → ${product_category.id}`)
    }
  }

  // 4. Resolve or create product tags
  console.log('\nResolving product tags...')
  const allTagValues = [...new Set(PRODUCTS.flatMap((p) => p.tags))]
  const { product_tags: existingTags } = await api(token, 'GET', '/admin/product-tags?limit=200')
  const tagByValue = Object.fromEntries(existingTags.map((t) => [t.value, t.id]))

  for (const value of allTagValues) {
    if (tagByValue[value]) {
      // already exists
    } else {
      const { product_tag } = await api(token, 'POST', '/admin/product-tags', { value })
      tagByValue[value] = product_tag.id
      console.log(`  + (created) tag: ${value} → ${product_tag.id}`)
    }
  }
  console.log(`  ✓ ${allTagValues.length} tags resolved`)

  // 5. Resolve or create products (uses tag IDs from step 4)
  console.log('\nCreating products...')
  const { products: existingProds } = await api(
    token, 'GET', '/admin/products?limit=200'
  )
  const prodByHandle = Object.fromEntries(existingProds.map((p) => [p.handle, p]))

  // { variant_id, currency_code, amount } entries for the Weekly Ad price list
  const salePriceEntries = []
  // { productId, variantId, title } for every Kim Nhung product — used for manage_inventory patch
  const allVariants = []
  let created = 0
  let skipped = 0

  for (const prod of PRODUCTS) {
    if (prodByHandle[prod.handle]) {
      // Product already exists — collect IDs for price list rebuild and inventory patch
      const existingProduct = prodByHandle[prod.handle]
      const existingVariantId = existingProduct.variants?.[0]?.id
      allVariants.push({ productId: existingProduct.id, variantId: existingVariantId, title: prod.title })
      if (prod.compareAtPrice && existingVariantId) {
        salePriceEntries.push({
          variant_id: existingVariantId,
          currency_code: 'usd',
          amount: prod.price,
        })
      }
      console.log(`  ✓ (exists)  ${prod.title}`)
      skipped++
      continue
    }

    if (!catByHandle[prod.category]) {
      throw new Error(`Category '${prod.category}' not found for product '${prod.title}'`)
    }

    // Base price is the regular/original price.
    // For sale items: base = compareAtPrice; the sale price goes into the price list.
    // For non-sale items: base = price.
    const basePrice = prod.compareAtPrice ?? prod.price

    const { product } = await api(token, 'POST', '/admin/products', {
      title: prod.title,
      handle: prod.handle,
      description: prod.description,
      thumbnail: prod.thumbnail,
      status: 'published',
      categories: [{ id: catByHandle[prod.category] }],
      sales_channels: [{ id: scId }],
      tags: prod.tags.map((v) => ({ id: tagByValue[v] })),
      options: [{ title: 'Title', values: ['Default'] }],
      variants: [
        {
          title: 'Default',
          options: { Title: 'Default' },
          manage_inventory: false,
          metadata: { unit: prod.unit },
          prices: [{ currency_code: 'usd', amount: basePrice }],
        },
      ],
    })

    const variantId = product.variants[0].id
    allVariants.push({ productId: product.id, variantId, title: prod.title })
    console.log(`  + (created) ${prod.title} — variant ${variantId}`)

    if (prod.compareAtPrice) {
      salePriceEntries.push({
        variant_id: variantId,
        currency_code: 'usd',
        amount: prod.price,
      })
    }
    created++
  }

  console.log(`  → ${created} created, ${skipped} already existed`)

  // 6. Ensure manage_inventory: false on all Kim Nhung variants
  //    Runs on every invocation — safe on newly-created variants too (idempotent no-op).
  console.log('\nSetting manage_inventory: false on all variants...')
  for (const { productId, variantId, title } of allVariants) {
    await api(token, 'POST', `/admin/products/${productId}/variants/${variantId}`, {
      manage_inventory: false,
    })
    console.log(`  ✓ ${title}`)
  }

  // 7. Create "Weekly Ad" price list
  //    Recreate it fresh each run so sale prices always reflect the current catalog.
  console.log(`\nBuilding "Weekly Ad" price list (${salePriceEntries.length} sale prices)...`)

  const { price_lists: existingLists } = await api(token, 'GET', '/admin/price-lists?limit=100')
  const existing = existingLists.find((l) => l.title === 'Weekly Ad')
  if (existing) {
    await api(token, 'DELETE', `/admin/price-lists/${existing.id}`)
    console.log(`  ✓ Removed stale price list ${existing.id}`)
  }

  const { price_list } = await api(token, 'POST', '/admin/price-lists', {
    title: 'Weekly Ad',
    description: 'Weekly sale prices — rotate each Monday',
    type: 'sale',
    status: 'active',
    prices: salePriceEntries,
  })
  console.log(`  + Created "Weekly Ad": ${price_list.id}`)

  // 8. Summary
  const saleCount = salePriceEntries.length
  const nonSaleCount = PRODUCTS.length - saleCount
  console.log(`
✓ Seed complete
  Categories : ${CATEGORIES.length}
  Products   : ${PRODUCTS.length} (${created} new, ${skipped} already existed)
  On sale    : ${saleCount} products in "Weekly Ad" price list
  Full price : ${nonSaleCount} products (no price list override)

Verify in Medusa admin: http://localhost:9000/app/products
`)
}

main().catch((err) => {
  console.error('\n✗ Seed failed:', err.message)
  process.exit(1)
})
