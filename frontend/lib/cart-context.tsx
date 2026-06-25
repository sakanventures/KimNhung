'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { Cart } from '@/lib/medusa/cart'
import {
  getStoredCartId,
  retrieveCart,
  createCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from '@/lib/medusa/cart'

type CartContextValue = {
  cart: Cart | null
  loading: boolean
  cartCount: number
  addItem: (variantId: string, quantity?: number) => Promise<void>
  updateItem: (lineItemId: string, quantity: number) => Promise<void>
  removeItem: (lineItemId: string) => Promise<void>
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const id = getStoredCartId()
    if (!id) return
    retrieveCart(id).then(setCart)
  }, [])

  const cartCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0

  const ensureCart = useCallback(async (): Promise<Cart> => {
    if (cart) return cart
    const id = getStoredCartId()
    if (id) {
      const existing = await retrieveCart(id)
      if (existing) {
        setCart(existing)
        return existing
      }
    }
    const fresh = await createCart()
    setCart(fresh)
    return fresh
  }, [cart])

  const addItem = useCallback(
    async (variantId: string, quantity = 1) => {
      setLoading(true)
      try {
        const c = await ensureCart()
        const updated = await addToCart(c.id, variantId, quantity)
        setCart(updated)
      } finally {
        setLoading(false)
      }
    },
    [ensureCart],
  )

  const updateItem = useCallback(
    async (lineItemId: string, quantity: number) => {
      if (!cart) return
      setLoading(true)
      try {
        const updated = await updateCartItem(cart.id, lineItemId, quantity)
        setCart(updated)
      } finally {
        setLoading(false)
      }
    },
    [cart],
  )

  const removeItem = useCallback(
    async (lineItemId: string) => {
      if (!cart) return
      setLoading(true)
      try {
        const updated = await removeCartItem(cart.id, lineItemId)
        setCart(updated)
      } finally {
        setLoading(false)
      }
    },
    [cart],
  )

  return (
    <CartContext.Provider value={{ cart, loading, cartCount, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
