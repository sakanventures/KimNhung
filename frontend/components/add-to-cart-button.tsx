'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'

type State = 'idle' | 'adding' | 'added'

export function AddToCartButton({ variantId }: { variantId: string }) {
  const { addItem, loading } = useCart()
  const [state, setState] = useState<State>('idle')

  async function handleClick() {
    if (state !== 'idle' || loading) return
    setState('adding')
    try {
      await addItem(variantId, 1)
      setState('added')
      setTimeout(() => setState('idle'), 2000)
    } catch {
      setState('idle')
    }
  }

  const label =
    state === 'adding' ? 'Adding…' : state === 'added' ? 'Added to cart ✓' : 'Add to cart'

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state !== 'idle' || loading}
      className={[
        'w-full rounded-full px-6 py-4 text-base font-bold transition-all',
        state === 'added'
          ? 'bg-green-600 text-white'
          : 'bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-60',
      ].join(' ')}
    >
      {label}
    </button>
  )
}
