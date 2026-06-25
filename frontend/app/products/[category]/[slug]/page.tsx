import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DEPARTMENTS } from '@/lib/site-data'
import { getProductBySlug } from '@/lib/mock/products'
import { formatPrice } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AnnouncementBar } from '@/components/announcement-bar'

type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const product = getProductBySlug(category, slug)
  return { title: product?.title ?? 'Product' }
}

export default async function ProductDetailPage({ params }: Props) {
  const { category, slug } = await params
  const product = getProductBySlug(category, slug)
  if (!product) notFound()

  const dept = DEPARTMENTS.find((d) => d.id === category)
  const savings =
    product.compareAtPrice !== undefined ? product.compareAtPrice - product.price : 0

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-6 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span className="mx-1.5">/</span>
            <Link href="/products" className="hover:text-primary">Shop</Link>
            <span className="mx-1.5">/</span>
            <Link href={`/products/${category}`} className="hover:text-primary">
              {dept?.name ?? category}
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>

          {/* Product layout */}
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
              {product.compareAtPrice !== undefined && (
                <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-primary-foreground">
                  Sale — save {formatPrice(savings)}
                </span>
              )}
              <img
                src={product.thumbnail || '/placeholder.svg'}
                alt={product.title}
                className="size-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wide text-leaf">
                {dept?.name ?? category}
              </span>
              <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                {product.title}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-primary">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {product.unit}
                </span>
              </div>
              {product.compareAtPrice !== undefined && (
                <p className="mt-1 text-sm text-muted-foreground">
                  <span className="line-through">was {formatPrice(product.compareAtPrice)}</span>
                  <span className="ml-2 font-semibold text-primary">
                    You save {formatPrice(savings)}
                  </span>
                </p>
              )}

              {/* Tags */}
              {product.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Add to cart — placeholder for Phase 2 */}
              <div className="mt-8">
                <button
                  type="button"
                  disabled
                  className="w-full rounded-full bg-primary px-6 py-4 text-base font-bold text-primary-foreground opacity-60 transition-opacity"
                  title="Cart coming soon"
                >
                  Add to cart
                </button>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Online ordering coming soon — visit us in store
                </p>
              </div>

              {/* Back link */}
              <Link
                href={`/products/${category}`}
                className="mt-8 inline-flex items-center text-sm font-semibold text-primary hover:underline"
              >
                ← Back to {dept?.name ?? 'department'}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
