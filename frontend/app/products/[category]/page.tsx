import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { DEPARTMENTS } from '@/lib/site-data'
import { getProductsByCategory } from '@/lib/medusa/products'
import { ProductCard } from '@/components/product-card'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AnnouncementBar } from '@/components/announcement-bar'

type Props = { params: Promise<{ category: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const dept = DEPARTMENTS.find((d) => d.id === category)
  return { title: dept?.name ?? 'Department' }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const dept = DEPARTMENTS.find((d) => d.id === category)
  if (!dept) notFound()

  const products = await getProductsByCategory(category)

  return (
    <>
      <AnnouncementBar />
      <SiteHeader />
      <main>
        {/* Page header */}
        <div className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <nav className="mb-3 text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span className="mx-1.5">/</span>
              <Link href="/products" className="hover:text-primary">Shop</Link>
              <span className="mx-1.5">/</span>
              <span className="text-foreground font-medium">{dept.name}</span>
            </nav>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {dept.name}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{dept.blurb}</p>
          </div>
        </div>

        {/* Product grid */}
        <section className="py-10 lg:py-14">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {products.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground">No products yet in this department.</p>
                <Link href="/products" className="mt-4 inline-block text-sm font-bold text-primary hover:underline">
                  ← Back to all departments
                </Link>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-muted-foreground">
                  {products.length} product{products.length !== 1 ? 's' : ''}
                  {products.filter((p) => p.compareAtPrice).length > 0 &&
                    ` — ${products.filter((p) => p.compareAtPrice).length} on sale`}
                </p>
                <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
