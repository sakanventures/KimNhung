'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from '@/lib/i18n'
import { formatPrice } from '@/lib/utils'
import type { DealsBlock } from '@/data/loaders'
import type { StoreProduct } from '@/lib/medusa/products'

export function WeeklySpecials({
  dealsData,
  products,
}: {
  dealsData?: DealsBlock
  products?: StoreProduct[]
}) {
  const { t } = useTranslation()
  const s = t.specials

  // Section header: Strapi if available, i18n otherwise
  const badge = dealsData?.Badge ?? s.eyebrow
  const title = dealsData?.Title ?? s.title
  const description = dealsData?.Description ?? s.body
  const cta = dealsData?.Link?.[0]

  const hasMedusaProducts = products && products.length > 0

  return (
    <section id="specials" className="scroll-mt-28 bg-muted/50 py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-primary">
              {badge}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            <p className="mt-2 max-w-lg text-pretty text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
          {cta ? (
            <a
              href={cta.Url}
              target={cta.isExternal ? '_blank' : undefined}
              rel={cta.isExternal ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {cta.Title}
              <ArrowRight className="size-4" />
            </a>
          ) : (
            <a
              href="#newsletter"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {s.cta}
              <ArrowRight className="size-4" />
            </a>
          )}
        </div>

        {!hasMedusaProducts && (
          <p className="py-10 text-center text-sm font-medium text-muted-foreground">
            No sales this week — check back soon.
          </p>
        )}

        {hasMedusaProducts && <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {products!.slice(0, 6).map(product => (
            <li
              key={product.id}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
            >
              <Link href={`/products/${product.category}/${product.slug}`} className="flex h-full flex-col">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <span className="absolute left-2 top-2 z-10 rounded-full bg-primary px-2 py-0.5 text-[0.65rem] font-extrabold uppercase tracking-wide text-primary-foreground">
                    {product.compareAtPrice
                      ? `${Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF`
                      : s.saleBadge}
                  </span>
                  <img
                    src={product.thumbnail || '/placeholder.svg'}
                    alt={product.title}
                    className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-3">
                  <span className="text-[0.65rem] font-bold uppercase tracking-wide text-leaf">
                    {product.category}
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
                  {product.compareAtPrice && (
                    <span className="text-xs font-medium text-muted-foreground line-through">
                      {s.was} {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>}
      </div>
    </section>
  )
}
