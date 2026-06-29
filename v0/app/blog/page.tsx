import type { Metadata } from 'next'
import { BLOG_POSTS } from '@/lib/site-data'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { BlogFilmstrip } from '@/components/blog-filmstrip'

export const metadata: Metadata = {
  title: 'Blog — Kim Nhung Superfood',
  description:
    'Recipes, culture, store news, and guides from the team at Kim Nhung Superfood.',
}

export default function BlogIndexPage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Page header */}
        <div className="border-b border-border bg-secondary/40 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              From the store
            </span>
            <h1 className="mt-2 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              Stories, recipes &amp; guides
            </h1>
            <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Behind every aisle is a story. Recipes, cultural guides, product
              spotlights, and what&apos;s happening in the store.
            </p>
          </div>
        </div>

        {/* Posts grid + pagination */}
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <BlogFilmstrip posts={BLOG_POSTS} />
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
