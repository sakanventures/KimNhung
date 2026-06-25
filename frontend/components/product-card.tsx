'use client'

import Link from 'next/link'
import type { StoreProduct as MockProduct } from '@/lib/medusa/products'
import { formatPrice } from '@/lib/utils'

const CATEGORY_LABELS: Record<string, string> = {
  seafood: 'Seafood',
  bakery: 'Bakery',
  pantry: 'Pantry',
  produce: 'Produce',
  beauty: 'Beauty',
  frozen: 'Frozen',
}

export function ProductCard({ product }: { product: MockProduct }) {
  const hasDiscount = product.compareAtPrice !== undefined

  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {hasDiscount && (
          <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wide text-primary-foreground">
            Sale
          </span>
        )}
        <img
          src={product.thumbnail || '/placeholder.svg'}
          alt={product.title}
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-3">
        <span className="text-[0.65rem] font-bold uppercase tracking-wide text-leaf">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </span>
        <h3 className="mt-1 text-sm font-bold leading-tight text-foreground">
          {product.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-snug text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-auto flex items-baseline gap-1.5 pt-3">
          <span className="text-xl font-extrabold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            {product.unit}
          </span>
        </div>
        {hasDiscount && (
          <span className="text-xs font-medium text-muted-foreground line-through">
            was {formatPrice(product.compareAtPrice!)}
          </span>
        )}
      </div>
    </Link>
  )
}
