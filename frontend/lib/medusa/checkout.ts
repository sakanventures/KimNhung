import { medusa } from './client'

export type CheckoutOrder = {
  id: string
  display_id: number
  order_number: string
  total: number
  subtotal: number
  items: Array<{
    id: string
    title: string
    quantity: number
    unit_price: number
    subtotal: number
    thumbnail: string | null
  }>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizeOrder(o: any): CheckoutOrder {
  return {
    id: o.id,
    display_id: o.display_id,
    order_number: (o.metadata?.order_number as string | undefined) ?? formatFallbackOrderNumber(o),
    total: o.total ?? 0,
    subtotal: o.subtotal ?? 0,
    items: (o.items ?? []).map((item: any) => ({
      id: item.id,
      title: item.title ?? item.product_title ?? '',
      quantity: item.quantity,
      unit_price: item.unit_price,
      subtotal: item.subtotal ?? item.unit_price * item.quantity,
      thumbnail: item.thumbnail ?? null,
    })),
  }
}

function formatFallbackOrderNumber(o: any): string {
  const d = o.created_at ? new Date(o.created_at) : new Date()
  const dateStr = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  return `KN-${dateStr}-${String(o.display_id).padStart(3, '0')}`
}

export async function setCartEmail(cartId: string, email: string): Promise<void> {
  await medusa.store.cart.update(cartId, { email })
}

function findStripeClientSecret(paymentSessions: unknown[]): string | null {
  if (!Array.isArray(paymentSessions)) return null
  const session = paymentSessions.find(
    (s: { provider_id: string; status: string; data?: { client_secret?: string } }) =>
      s.provider_id === 'pp_stripe_stripe' && s.status === 'pending',
  ) as { data?: { client_secret?: string } } | undefined
  return session?.data?.client_secret ?? null
}

export async function initPaymentSession(cartId: string): Promise<string> {
  const base = process.env.NEXT_PUBLIC_MEDUSA_URL!
  const pk = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!
  const headers = {
    'Content-Type': 'application/json',
    'x-publishable-api-key': pk,
  }

  // Step 1: fetch cart with payment collection AND its sessions expanded.
  // Without expanding payment_sessions, pc.payment_sessions is undefined even
  // when a session already exists, causing a redundant POST that triggers
  // Medusa's "recreate" path and the Stripe empty-payment_method error.
  let paymentCollectionId: string | null = null

  const cartRes = await fetch(
    `${base}/store/carts/${cartId}?fields=%2Bpayment_collection%2C%2Bpayment_collection.payment_sessions`,
    { headers },
  )
  if (cartRes.ok) {
    const { cart } = await cartRes.json()
    const pc = cart?.payment_collection
    if (pc?.id) {
      paymentCollectionId = pc.id
      const secret = findStripeClientSecret(pc.payment_sessions ?? [])
      if (secret) return secret
    }
  }

  // Step 2: create payment collection if needed.
  // Guard against the race condition where two concurrent calls both see no
  // payment_collection and both try to create one — the loser gets a 500.
  // In that case, re-fetch the cart to pick up the winner's collection.
  if (!paymentCollectionId) {
    const colRes = await fetch(`${base}/store/payment-collections`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ cart_id: cartId }),
    })
    if (!colRes.ok) {
      if (colRes.status === 500) {
        const retryRes = await fetch(
          `${base}/store/carts/${cartId}?fields=%2Bpayment_collection%2C%2Bpayment_collection.payment_sessions`,
          { headers },
        )
        if (retryRes.ok) {
          const { cart: retryCart } = await retryRes.json()
          const pc = retryCart?.payment_collection
          if (pc?.id) {
            paymentCollectionId = pc.id
            const secret = findStripeClientSecret(pc.payment_sessions ?? [])
            if (secret) return secret
          }
        }
      }
      if (!paymentCollectionId) {
        const err = await colRes.json().catch(() => ({}))
        throw new Error(`[col ${colRes.status}] ${err.message ?? 'Payment collection failed'}`)
      }
    } else {
      const colData = await colRes.json()
      paymentCollectionId = colData.payment_collection.id
    }
  }

  // Step 3: create Stripe payment session
  const sesRes = await fetch(
    `${base}/store/payment-collections/${paymentCollectionId}/payment-sessions`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify({ provider_id: 'pp_stripe_stripe' }),
    },
  )
  if (!sesRes.ok) {
    const err = await sesRes.json().catch(() => ({}))
    throw new Error(`[ses ${sesRes.status}] ${err.message ?? 'Payment session failed'}`)
  }
  const sesData = await sesRes.json()
  const session = sesData.payment_collection?.payment_sessions?.[0]
  const clientSecret = session?.data?.client_secret as string | undefined

  if (!clientSecret) {
    throw new Error('Stripe did not return a client_secret')
  }

  return clientSecret
}

export async function completeCart(cartId: string): Promise<CheckoutOrder> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await medusa.store.cart.complete(cartId)

  if (result.type === 'order') {
    return normalizeOrder(result.order)
  }

  throw new Error(result.message ?? 'Cart completion failed')
}

export async function retrieveOrder(orderId: string): Promise<CheckoutOrder | null> {
  try {
    const { order } = await medusa.store.order.retrieve(orderId, {
      fields: '+items.thumbnail,+metadata,+created_at',
    })
    return normalizeOrder(order)
  } catch {
    return null
  }
}
