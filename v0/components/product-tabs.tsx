'use client'

import { useState } from 'react'
import type { Product } from '@/lib/site-data'
import { Globe, Leaf } from 'lucide-react'

type Tab = 'details' | 'nutrition' | 'origin'

export function ProductTabs({ product }: { product: Product }) {
  const tabs: { id: Tab; label: string }[] = [
    { id: 'details', label: 'Details' },
    ...(product.nutrition ? [{ id: 'nutrition' as Tab, label: 'Ingredients & Nutrition' }] : []),
    { id: 'origin', label: 'Origin & Sourcing' },
  ]

  const [active, setActive] = useState<Tab>('details')

  return (
    <div>
      {/* Tab bar */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`relative px-5 py-3 text-sm font-semibold transition-colors ${
              active === tab.id
                ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Panels */}
      <div className="py-6">
        {active === 'details' && (
          <div className="space-y-5">
            <p className="text-pretty leading-relaxed text-muted-foreground">
              {product.description}
            </p>
            <ul className="space-y-2">
              {product.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-foreground">
                  <Leaf className="mt-0.5 size-4 shrink-0 text-leaf" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}

        {active === 'nutrition' && product.nutrition && (
          <div className="max-w-sm">
            <p className="mb-4 text-xs text-muted-foreground">
              Serving size: {product.nutrition.servingSize}
            </p>
            <div className="overflow-hidden rounded-2xl border border-border">
              <div className="flex items-baseline justify-between border-b border-border bg-muted/50 px-4 py-3">
                <span className="text-sm font-bold text-foreground">Calories</span>
                <span className="text-2xl font-black text-foreground">
                  {product.nutrition.calories}
                </span>
              </div>
              {product.nutrition.rows.map((row) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between border-b border-border px-4 py-2.5 last:border-0 ${
                    row.indent ? 'pl-8' : ''
                  }`}
                >
                  <span className="text-sm text-foreground">{row.label}</span>
                  <span className="text-sm font-semibold text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {active === 'origin' && (
          <div className="space-y-6">
            {/* Origin header */}
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <Globe className="mt-0.5 size-5 shrink-0 text-teal" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-base font-bold text-foreground">
                    {product.origin.country}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      product.origin.imported
                        ? 'bg-gold/20 text-gold-foreground'
                        : 'bg-leaf/15 text-leaf'
                    }`}
                  >
                    {product.origin.imported ? 'Imported' : 'Domestic'}
                  </span>
                </div>
                {product.origin.brandNativeScript && (
                  <p className="mt-1 font-sans text-2xl font-light tracking-wide text-muted-foreground">
                    {product.origin.brandNativeScript}
                  </p>
                )}
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {product.origin.note}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
