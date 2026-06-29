import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, Clock, MapPin, Star, Tag, Truck } from 'lucide-react'
import { PRODUCTS } from '@/lib/site-data'
import { ProductImageGallery } from '@/components/product-image-gallery'
import { ProductAddToCart } from '@/components/product-add-to-cart'
import { ProductTabs } from '@/components/product-tabs'

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: `${product.name} — Kim Nhung Superfood`,
    description: product.description.slice(0, 155),
  }
}

const STOCK_CONFIG = {
  in_stock: { label: 'In Stock', className: 'text-leaf' },
  limited: { label: 'Limited Stock', className: 'text-tangerine' },
  out_of_stock: { label: 'Out of Stock', className: 'text-destructive' },
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`size-4 ${
              i < Math.round(rating)
                ? 'fill-gold text-gold'
                : 'fill-muted text-muted'
            }`}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {rating.toFixed(1)} &middot; {count} review{count !== 1 ? 's' : ''}
      </span>
    </div>
  )
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) notFound()

  const stockConfig = STOCK_CONFIG[product.stockStatus]
  const isOutOfStock = product.stockStatus === 'out_of_stock'
  const avgRating =
    product.reviews.length > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
      : null

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">Home</Link>
            </li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li>
              <Link href="/#departments" className="hover:text-foreground">
                {product.department}
              </Link>
            </li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li>
              <span className="text-muted-foreground">{product.subcategory}</span>
            </li>
            <li aria-hidden><ChevronRight className="size-3.5" /></li>
            <li>
              <span className="font-medium text-foreground">{product.name}</span>
            </li>
          </ol>
        </nav>

        {/* 2-col layout */}
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-start">

          {/* LEFT — Image gallery */}
          <div className="lg:sticky lg:top-28">
            <ProductImageGallery images={product.images} name={product.name} />
          </div>

          {/* RIGHT — Info */}
          <div className="flex flex-col gap-7">

            {/* Title block */}
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {product.department}
                </span>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                  {product.subcategory}
                </span>
              </div>

              <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {product.name}
              </h1>

              {product.nativeName && (
                <p className="mt-1 text-lg font-light text-muted-foreground">
                  {product.nativeName}
                </p>
              )}

              {avgRating !== null && (
                <div className="mt-3">
                  <StarRating rating={avgRating} count={product.reviews.length} />
                </div>
              )}
            </div>

            {/* Price */}
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-primary">{product.price}</span>
                <span className="text-base font-medium text-muted-foreground">{product.unit}</span>
                {product.was && (
                  <span className="text-sm text-muted-foreground line-through">was {product.was}</span>
                )}
              </div>

              {/* Stock status */}
              <p className={`mt-2 text-sm font-semibold ${stockConfig.className}`}>
                {stockConfig.label}
              </p>

              {/* Freshness note */}
              {product.freshnessNote && (
                <div className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
                  <Clock className="mt-0.5 size-4 shrink-0 text-tangerine" />
                  <span>{product.freshnessNote}</span>
                </div>
              )}
            </div>

            {/* Promo card */}
            {product.promo && (
              <div className="flex items-start gap-3 rounded-2xl border border-gold/30 bg-gold/10 p-4">
                <Tag className="mt-0.5 size-4 shrink-0 text-gold-foreground" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gold-foreground">
                    {product.promo.label}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">{product.promo.detail}</p>
                  <p className="mt-1 text-xs text-muted-foreground">Expires: {product.promo.expires}</p>
                </div>
              </div>
            )}

            {/* Add to cart */}
            <ProductAddToCart disabled={isOutOfStock} />

            {/* Pickup note */}
            <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
              <MapPin className="size-4 shrink-0 text-primary" />
              <span>Pick up at <strong className="text-foreground">29411 John R Rd</strong>, Madison Heights &mdash; Open 9 AM–9 PM daily</span>
            </div>

            {/* Tabs */}
            <ProductTabs product={product} />

            {/* Spec table */}
            {product.specs.length > 0 && (
              <div>
                <h2 className="mb-3 text-base font-bold text-foreground">Specifications</h2>
                <div className="overflow-hidden rounded-2xl border border-border">
                  {product.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex gap-4 px-4 py-3 text-sm ${
                        i % 2 === 0 ? 'bg-card' : 'bg-muted/40'
                      } ${i < product.specs.length - 1 ? 'border-b border-border' : ''}`}
                    >
                      <span className="w-32 shrink-0 font-medium text-muted-foreground">
                        {spec.label}
                      </span>
                      <span className="text-foreground">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-16 border-t border-border pt-12" aria-label="Customer reviews">
          <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground">
            Reviews
          </h2>

          {product.reviews.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-8 py-12 text-center">
              <p className="text-base font-semibold text-foreground">Be the first to review this item</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick it up in-store and share your thoughts — we read every review.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {/* AI-style sentiment summary */}
              <div className="rounded-2xl border border-border bg-secondary/50 px-6 py-5">
                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Summary &middot; {product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}
                </p>
                <p className="text-pretty text-sm leading-relaxed text-foreground">
                  Customers consistently highlight the exceptional freshness and quality of this product,
                  noting it rivals what you would find at a specialty restaurant.
                  The store team&apos;s helpfulness and the competitive pricing are frequently mentioned as
                  standout positives.
                </p>
              </div>

              {/* Individual reviews */}
              {product.reviews.map((review) => (
                <div
                  key={review.author + review.date}
                  className="rounded-2xl border border-border bg-card p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-foreground">{review.author}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <div className="flex items-center gap-0.5" aria-label={`${review.rating} stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`size-3.5 ${
                            i < review.rating ? 'fill-gold text-gold' : 'fill-muted text-muted'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {review.body}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Goes well with */}
        {product.pairings.length > 0 && (
          <section className="mt-16 border-t border-border pt-12" aria-label="Goes well with">
            <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground">
              Goes well with
            </h2>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
              {product.pairings.map((pair) => (
                <li key={pair.slug}>
                  <Link
                    href={`/products/${pair.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-md"
                  >
                    <div className="aspect-square overflow-hidden bg-muted">
                      <img
                        src={pair.image}
                        alt={pair.name}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-semibold leading-tight text-foreground">
                        {pair.name}
                      </p>
                      <p className="mt-1 text-sm font-bold text-primary">
                        {pair.price}
                        <span className="ml-0.5 text-xs font-normal text-muted-foreground">
                          {pair.unit}
                        </span>
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </>
  )
}
