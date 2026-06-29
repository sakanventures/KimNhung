'use client'

import { useState } from 'react'
import { Minus, Plus, ShoppingBag, Check } from 'lucide-react'

export function ProductAddToCart({
  disabled,
}: {
  disabled?: boolean
}) {
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  function handleAdd() {
    if (disabled) return
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        {/* Quantity selector */}
        <div className="flex items-center rounded-full border border-border bg-muted">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            className="flex size-10 items-center justify-center rounded-full text-foreground transition hover:bg-border"
          >
            <Minus className="size-4" />
          </button>
          <span className="min-w-[2rem] text-center text-sm font-bold tabular-nums text-foreground">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            aria-label="Increase quantity"
            className="flex size-10 items-center justify-center rounded-full text-foreground transition hover:bg-border"
          >
            <Plus className="size-4" />
          </button>
        </div>

        {/* Add to cart */}
        <button
          onClick={handleAdd}
          disabled={disabled}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all ${
            disabled
              ? 'cursor-not-allowed bg-muted text-muted-foreground'
              : added
              ? 'bg-leaf text-leaf-foreground'
              : 'bg-primary text-primary-foreground hover:bg-primary/90 active:scale-95'
          }`}
        >
          {added ? (
            <>
              <Check className="size-4" />
              Added to cart
            </>
          ) : (
            <>
              <ShoppingBag className="size-4" />
              {disabled ? 'Out of stock' : 'Add to cart'}
            </>
          )}
        </button>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        In-store pickup only &middot; 29411 John R Rd, Madison Heights
      </p>
    </div>
  )
}
