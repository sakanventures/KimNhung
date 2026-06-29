import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChevronRight, MapPin } from 'lucide-react'
import { DEPARTMENTS } from '@/lib/site-data'
import { getProductBySlug } from '@/lib/medusa/products'
import { formatPrice } from '@/lib/utils'
import { ProductImageGallery } from '@/components/product-image-gallery'
import { ProductAddToCart } from '@/components/product-add-to-cart'
import { ProductTabs } from '@/components/product-tabs'
import { GlobalHeader } from '@/components/global-header'
import { SiteFooter } from '@/components/site-footer'
import { AnnouncementBar } from '@/components/announcement-bar'

type Props = { params: Promise<{ category: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, slug } = await params
  const product = await getProductBySlug(category, slug)
  return {
    title: product ? `${product.title} — Kim Nhung Superfood` : 'Product',
    description: product?.description?.slice(0, 155),
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { category, slug } = await params
  const product = await getProductBySlug(category, slug)
  if (!product) notFound()

  const dept = DEPARTMENTS.find((d) => d.id === category)
  const savings =
    product.compareAtPrice !== undefined ? product.compareAtPrice - product.price : 0

  const images =
    product.images.length > 0
      ? product.images
      : product.thumbnail
      ? [product.thumbnail]
      : ['/placeholder.svg']

  return (
    <>
      <AnnouncementBar />
      <GlobalHeader />
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground">Home</Link>
              </li>
              <li aria-hidden><ChevronRight className="size-3.5" /></li>
              <li>
                <Link href="/products" className="hover:text-foreground">Shop</Link>
              </li>
              <li aria-hidden><ChevronRight className="size-3.5" /></li>
              <li>
                <Link href={`/products/${category}`} className="hover:text-foreground">
                  {dept?.name ?? category}
                </Link>
              </li>
              <li aria-hidden><ChevronRight className="size-3.5" /></li>
              <li>
                <span className="font-medium text-foreground">{product.title}</span>
              </li>
            </ol>
          </nav>

          {/* 2-col layout */}
          <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-start">

            {/* LEFT — Image gallery */}
            <div className="lg:sticky lg:top-28">
              <ProductImageGallery images={images} name={product.title} />
            </div>

            {/* RIGHT — Info */}
            <div className="flex flex-col gap-7">

              {/* Title block */}
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {dept?.name ?? category}
                  </span>
                </div>

                <h1 className="text-balance text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {product.title}
                </h1>
              </div>

              {/* Price */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-base font-medium text-muted-foreground">
                    {product.unit}
                  </span>
                  {product.compareAtPrice !== undefined && (
                    <span className="text-sm text-muted-foreground line-through">
                      was {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                {product.compareAtPrice !== undefined && (
                  <p className="mt-1 text-sm font-semibold text-primary">
                    You save {formatPrice(savings)}
                  </p>
                )}
              </div>

              {/* Add to cart */}
              <ProductAddToCart variantId={product.variantId} />

              {/* Pickup note */}
              <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-3 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span>
                  Pick up at <strong className="text-foreground">29411 John R Rd</strong>,
                  Madison Heights &mdash; Open 9 AM–9 PM daily
                </span>
              </div>

              {/* Tabs */}
              <ProductTabs
                description={product.description}
                highlights={product.tags}
              />

            </div>
          </div>

          {/* Reviews */}
          <section className="mt-16 border-t border-border pt-12" aria-label="Customer reviews">
            <h2 className="mb-6 text-2xl font-extrabold tracking-tight text-foreground">
              Reviews
            </h2>
            <div className="rounded-2xl border border-dashed border-border bg-muted/30 px-8 py-12 text-center">
              <p className="text-base font-semibold text-foreground">
                Be the first to review this item
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Pick it up in-store and share your thoughts — we read every review.
              </p>
            </div>
          </section>

        </div>
      </main>
      <SiteFooter />
    </>
  )
}
