import { medusa, REGION_ID } from './client'
import type { MockProduct } from '@/lib/mock/products'

export type StoreProduct = MockProduct & { variantId: string }

// Fields added on top of the storefront default set
const PRODUCT_FIELDS =
  '+categories.id,+categories.handle,+categories.name,+variants.calculated_price,+variants.metadata,+tags,+images'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalize(p: any): StoreProduct {
  const variant = p.variants?.[0] ?? {}
  const cp = variant.calculated_price ?? {}
  const calculatedAmount: number = cp.calculated_amount ?? 0
  const originalAmount: number = cp.original_amount ?? 0
  const isOnSale = cp.is_calculated_price_price_list === true && originalAmount !== calculatedAmount

  return {
    id: p.id,
    variantId: variant.id ?? '',
    title: p.title,
    slug: p.handle,
    category: p.categories?.[0]?.handle ?? '',
    description: p.description ?? '',
    thumbnail: p.thumbnail ?? p.images?.[0]?.url ?? '',
    price: calculatedAmount,
    compareAtPrice: isOnSale ? originalAmount : undefined,
    unit: variant.metadata?.unit ?? 'each',
    tags: (p.tags ?? []).map((t: { value: string }) => t.value),
  }
}

export async function getAllProducts(): Promise<StoreProduct[]> {
  const { products } = await medusa.store.product.list({
    region_id: REGION_ID,
    fields: PRODUCT_FIELDS,
    limit: 100,
  } as Parameters<typeof medusa.store.product.list>[0])

  return products.map(normalize)
}

export async function getProductsByCategory(categoryHandle: string): Promise<StoreProduct[]> {
  // Look up the category ID from its handle, then filter products
  const { product_categories } = await medusa.store.category.list({
    handle: categoryHandle,
    fields: 'id,handle,name',
  } as Parameters<typeof medusa.store.category.list>[0])

  const catId = product_categories?.[0]?.id
  if (!catId) return []

  const { products } = await medusa.store.product.list({
    category_id: [catId],
    region_id: REGION_ID,
    fields: PRODUCT_FIELDS,
    limit: 100,
  } as Parameters<typeof medusa.store.product.list>[0])

  return products.map(normalize)
}

export async function getProductBySlug(
  categoryHandle: string,
  slug: string,
): Promise<StoreProduct | undefined> {
  const { products } = await medusa.store.product.list({
    handle: slug,
    region_id: REGION_ID,
    fields: PRODUCT_FIELDS,
  } as Parameters<typeof medusa.store.product.list>[0])

  const product = products?.[0]
  if (!product) return undefined

  // Validate the product belongs to the expected category
  const inCategory = product.categories?.some(
    (c: { handle: string }) => c.handle === categoryHandle,
  )
  if (!inCategory) return undefined

  return normalize(product)
}

export async function getSaleProducts(): Promise<StoreProduct[]> {
  const all = await getAllProducts()
  return all.filter(p => p.compareAtPrice !== undefined)
}

export type { MockProduct }
