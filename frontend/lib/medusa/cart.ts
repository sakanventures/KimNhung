import { medusa, REGION_ID } from './client'

const CART_COOKIE = 'kn_cart_id'
const CART_FIELDS = '+items.thumbnail'

export type CartLineItem = {
  id: string
  title: string
  quantity: number
  unit_price: number
  compare_at_unit_price: number | null
  subtotal: number
  thumbnail: string | null
  product_handle: string | null
}

export type Cart = {
  id: string
  items: CartLineItem[]
  subtotal: number
  total: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeCart(c: any): Cart {
  return {
    id: c.id,
    items: (c.items ?? []).map((item: any) => ({
      id: item.id,
      title: item.title ?? item.product_title ?? '',
      quantity: item.quantity,
      unit_price: item.unit_price,
      compare_at_unit_price: item.compare_at_unit_price ?? null,
      subtotal: item.subtotal ?? (item.unit_price ?? 0) * (item.quantity ?? 1),
      thumbnail: item.thumbnail ?? null,
      product_handle: item.product_handle ?? item.product?.handle ?? null,
    })),
    subtotal: c.item_subtotal ?? c.subtotal ?? 0,
    total: c.total ?? 0,
  }
}

export function getStoredCartId(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|; )kn_cart_id=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

function storeCartId(id: string): void {
  const exp = new Date(Date.now() + 7 * 864e5).toUTCString()
  document.cookie = `${CART_COOKIE}=${encodeURIComponent(id)}; path=/; expires=${exp}; SameSite=Lax`
}

function clearCartId(): void {
  document.cookie = `${CART_COOKIE}=; path=/; max-age=0`
}

export async function createCart(): Promise<Cart> {
  const { cart } = await medusa.store.cart.create(
    { region_id: REGION_ID },
    { fields: CART_FIELDS },
  )
  storeCartId(cart.id)
  return normalizeCart(cart)
}

export async function retrieveCart(id: string): Promise<Cart | null> {
  try {
    const { cart } = await medusa.store.cart.retrieve(id, { fields: CART_FIELDS })
    return normalizeCart(cart)
  } catch {
    clearCartId()
    return null
  }
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1,
): Promise<Cart> {
  const { cart } = await medusa.store.cart.createLineItem(
    cartId,
    { variant_id: variantId, quantity },
    { fields: CART_FIELDS },
  )
  return normalizeCart(cart)
}

export async function updateCartItem(
  cartId: string,
  lineItemId: string,
  quantity: number,
): Promise<Cart> {
  const { cart } = await medusa.store.cart.updateLineItem(
    cartId,
    lineItemId,
    { quantity },
    { fields: CART_FIELDS },
  )
  return normalizeCart(cart)
}

export async function removeCartItem(
  cartId: string,
  lineItemId: string,
): Promise<Cart> {
  // deleteLineItem returns { deleted, id, object, parent: cart }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await medusa.store.cart.deleteLineItem(
    cartId,
    lineItemId,
    { fields: CART_FIELDS },
  )
  if (result.parent) return normalizeCart(result.parent)
  const refetched = await retrieveCart(cartId)
  return refetched ?? createCart()
}
