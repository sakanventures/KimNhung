'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { SiteFooter } from '@/components/site-footer'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/lib/utils'

export function CartContent() {
  const { cart, loading, updateItem, removeItem } = useCart()

  const items = cart?.items ?? []

  return (
    <main className="min-h-[60vh]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-extrabold tracking-tight text-foreground">
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">Your cart is empty.</p>
            <Link
              href="/products"
              className="mt-4 inline-block text-sm font-bold text-primary hover:underline"
            >
              Continue shopping →
            </Link>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-border">
              {items.map((item) => {
                const isOnSale =
                  item.compare_at_unit_price !== null &&
                  item.compare_at_unit_price > item.unit_price
                const savings = isOnSale
                  ? (item.compare_at_unit_price! - item.unit_price) * item.quantity
                  : 0

                return (
                  <li key={item.id} className="flex gap-4 py-6">
                    <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-muted sm:size-24">
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="size-full" />
                      )}
                    </div>

                    <div className="flex flex-1 flex-col gap-1">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-bold leading-snug text-foreground">
                          {item.title}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          disabled={loading}
                          className="shrink-0 rounded p-1 text-muted-foreground transition-colors hover:text-destructive disabled:opacity-40"
                          aria-label={`Remove ${item.title}`}
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>

                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-primary">
                          {formatPrice(item.unit_price)}
                        </span>
                        {isOnSale && (
                          <span className="text-xs text-muted-foreground line-through">
                            was {formatPrice(item.compare_at_unit_price!)}
                          </span>
                        )}
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1 rounded-full border border-border px-1 py-0.5">
                          <button
                            type="button"
                            onClick={() =>
                              item.quantity > 1
                                ? updateItem(item.id, item.quantity - 1)
                                : removeItem(item.id)
                            }
                            disabled={loading}
                            className="flex size-7 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateItem(item.id, item.quantity + 1)}
                            disabled={loading}
                            className="flex size-7 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <span className="text-sm font-bold text-foreground">
                            {formatPrice(item.subtotal)}
                          </span>
                          {isOnSale && savings > 0 && (
                            <p className="text-xs font-semibold text-green-600">
                              saving {formatPrice(savings)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-6">
              <div className="flex items-center justify-between text-base font-bold text-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(cart!.subtotal)}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Taxes and shipping calculated at checkout
              </p>
            </div>

            <div className="mt-4">
              <Link
                href="/checkout"
                className="block w-full rounded-full bg-primary px-6 py-4 text-center text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Proceed to checkout
              </Link>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/products"
                className="text-sm font-semibold text-primary hover:underline"
              >
                ← Continue shopping
              </Link>
            </div>
          </>
        )}
      </div>
      <SiteFooter />
    </main>
  )
}
