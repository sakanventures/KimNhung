import Link from 'next/link'
import type { Metadata } from 'next'
import { DEPARTMENTS } from '@/lib/site-data'
import { getAllProducts, getProductsByCategory } from '@/lib/medusa/products'
import { ProductCard } from '@/components/product-card'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AnnouncementBar } from '@/components/announcement-bar'

export const metadata: Metadata = {
  title: 'Shop All Departments',
}

const CIRCLE_TINTS = [
  'bg-primary/10 ring-primary/15 group-hover:ring-primary/30',
  'bg-tangerine/15 ring-tangerine/20 group-hover:ring-tangerine/40',
  'bg-leaf/15 ring-leaf/20 group-hover:ring-leaf/40',
  'bg-gold/20 ring-gold/30 group-hover:ring-gold/50',
  'bg-teal/15 ring-teal/20 group-hover:ring-teal/40',
  'bg-berry/12 ring-berry/20 group-hover:ring-berry/40',
]

export default async function ProductsPage() {
  const allProducts = await getAllProducts()
  const saleCount = allProducts.filter((p) => p.compareAtPrice !== undefined).length
  const productsByDept = Object.fromEntries(
    DEPARTMENTS.map((d) => [d.id, allProducts.filter((p) => p.category === d.id)]),
  )

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
              <span className="text-foreground font-medium">Shop</span>
            </nav>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Shop all departments
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {allProducts.length} products across {DEPARTMENTS.length} departments — {saleCount} on sale this week
            </p>
          </div>
        </div>

        {/* Department circles */}
        <section className="border-b border-border bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ul className="grid grid-cols-3 gap-x-3 gap-y-6 sm:grid-cols-6">
              {DEPARTMENTS.map((dept, i) => (
                <li key={dept.id}>
                  <Link
                    href={`/products/${dept.id}`}
                    className="group flex flex-col items-center gap-3 text-center"
                  >
                    <span
                      className={`relative aspect-square w-full overflow-hidden rounded-full ring-4 ring-inset transition-all group-hover:-translate-y-1 ${CIRCLE_TINTS[i % CIRCLE_TINTS.length]}`}
                    >
                      <img
                        src={dept.image || '/placeholder.svg'}
                        alt={dept.name}
                        className="size-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </span>
                    <span className="text-xs font-bold leading-tight text-foreground sm:text-sm">
                      {dept.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Products grouped by department */}
        {DEPARTMENTS.map((dept) => {
          const products = productsByDept[dept.id] ?? []
          if (products.length === 0) return null
          return (
            <section key={dept.id} className="py-10 lg:py-14">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
                      {dept.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">{dept.blurb}</p>
                  </div>
                  <Link
                    href={`/products/${dept.id}`}
                    className="hidden shrink-0 text-sm font-bold text-primary hover:underline sm:block"
                  >
                    See all →
                  </Link>
                </div>
                <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
                  {products.map((product) => (
                    <li key={product.id}>
                      <ProductCard product={product} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )
        })}
      </main>
      <SiteFooter />
    </>
  )
}
