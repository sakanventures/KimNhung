import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { searchIndex } from '@/lib/search'
import { DEPARTMENTS } from '@/lib/site-data'
import { Search, ChevronRight } from 'lucide-react'
import { SearchSortSelect } from '@/components/search-sort-select'
import { cn } from '@/lib/utils'

export function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  return searchParams.then(({ q }) => ({
    title: q ? `"${q}" — Search | Kim Nhung Superfood` : 'Search | Kim Nhung Superfood',
  }))
}

const TYPES = [
  { label: 'All', value: '' },
  { label: 'Products', value: 'product' },
  { label: 'Articles', value: 'post' },
  { label: 'Departments', value: 'department' },
]


export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string; dept?: string; sort?: string }>
}) {
  const { q = '', type = '', dept = '', sort = 'relevance' } = await searchParams

  let results = searchIndex(q)

  // Filter by type
  if (type) results = results.filter((r) => r.type === type)

  // Filter by department
  if (dept) results = results.filter((r) => r.tag.toLowerCase() === dept.toLowerCase())

  // Sort
  if (sort === 'sale') results = [...results].sort((a, b) => (b.was ? 1 : 0) - (a.was ? 1 : 0))
  if (sort === 'az') results = [...results].sort((a, b) => a.title.localeCompare(b.title))

  const productResults = results.filter((r) => r.type === 'product')
  const postResults = results.filter((r) => r.type === 'post')
  const deptResults = results.filter((r) => r.type === 'department')

  function buildUrl(overrides: Record<string, string>) {
    const params = new URLSearchParams({ q, type, dept, sort, ...overrides })
    // Strip empty values
    for (const [k, v] of [...params.entries()]) if (!v) params.delete(k)
    return `/search?${params.toString()}`
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">
        {/* Search hero bar */}
        <div className="border-b border-border bg-card py-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <form action="/search" method="GET">
              <div className="relative">
                <Search className="pointer-events-none absolute left-5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  name="q"
                  defaultValue={q}
                  placeholder="Search products, articles, departments…"
                  aria-label="Search"
                  className="h-14 w-full rounded-2xl border border-border bg-background pl-14 pr-5 text-base text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>
            </form>

            {q && (
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{results.length}</span> result{results.length !== 1 ? 's' : ''} for{' '}
                <span className="font-semibold text-foreground">&ldquo;{q}&rdquo;</span>
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {!q ? (
            /* Empty state — no query yet */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Search className="size-9" />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-foreground">What are you looking for?</h2>
              <p className="mt-2 text-muted-foreground">
                Search across all products, articles, and departments.
              </p>
              {/* Popular searches */}
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {['lobster', 'bánh mì', 'rice', 'hot pot', 'K-beauty', 'durian'].map((term) => (
                  <Link
                    key={term}
                    href={`/search?q=${encodeURIComponent(term)}`}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            /* No results */
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <Search className="size-9" />
              </span>
              <h2 className="mt-6 text-2xl font-bold text-foreground">No results for &ldquo;{q}&rdquo;</h2>
              <p className="mt-2 text-muted-foreground">Try a different search term or browse a department.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {DEPARTMENTS.map((d) => (
                  <Link
                    key={d.id}
                    href={`/search?q=${encodeURIComponent(d.name)}`}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
              {/* ── Sidebar filters ───────────────────────── */}
              <aside className="w-full shrink-0 lg:w-56" aria-label="Filters">
                {/* Type filter */}
                <div className="mb-6">
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</p>
                  <ul className="space-y-1">
                    {TYPES.map((t) => (
                      <li key={t.value}>
                        <Link
                          href={buildUrl({ type: t.value, dept: '' })}
                          className={cn(
                            'flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                            (type === t.value || (!type && !t.value)) && 'bg-primary/10 text-primary font-semibold',
                          )}
                        >
                          {t.label}
                          {(type === t.value || (!type && !t.value)) && (
                            <ChevronRight className="size-4" />
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Department filter */}
                <div>
                  <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Department</p>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href={buildUrl({ dept: '' })}
                        className={cn(
                          'block rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                          !dept && 'bg-primary/10 text-primary font-semibold',
                        )}
                      >
                        All departments
                      </Link>
                    </li>
                    {DEPARTMENTS.map((d) => (
                      <li key={d.id}>
                        <Link
                          href={buildUrl({ dept: d.name })}
                          className={cn(
                            'block rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-muted',
                            dept === d.name && 'bg-primary/10 text-primary font-semibold',
                          )}
                        >
                          {d.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>

              {/* ── Results ──────────────────────────────── */}
              <div className="min-w-0 flex-1">
                {/* Sort bar */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">{results.length}</span> result{results.length !== 1 ? 's' : ''}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-muted-foreground">Sort:</span>
                    <Suspense fallback={null}>
                      <SearchSortSelect currentSort={sort} />
                    </Suspense>
                  </div>
                </div>

                {/* Products section */}
                {productResults.length > 0 && (
                  <section className="mb-10">
                    {!type && <h2 className="mb-4 text-lg font-bold text-foreground">Products</h2>}
                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                      {productResults.map((result) => (
                        <Link
                          key={result.slug}
                          href={result.href}
                          className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                            <img
                              src={result.image}
                              alt={result.title}
                              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {result.was && (
                              <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
                                SALE
                              </span>
                            )}
                          </div>
                          <div className="flex flex-1 flex-col p-4">
                            <span className={cn('mb-1.5 inline-block self-start rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', result.tagColor)}>
                              {result.tag}
                            </span>
                            <p className="font-semibold text-foreground">{result.title}</p>
                            <div className="mt-auto flex items-baseline gap-1.5 pt-3">
                              <span className="text-lg font-extrabold text-primary">{result.price}</span>
                              {result.unit && <span className="text-xs text-muted-foreground">{result.unit}</span>}
                              {result.was && <span className="ml-1 text-xs text-muted-foreground line-through">{result.was}</span>}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Posts section */}
                {postResults.length > 0 && (
                  <section className="mb-10">
                    {!type && <h2 className="mb-4 text-lg font-bold text-foreground">Articles</h2>}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {postResults.map((result) => (
                        <Link
                          key={result.slug}
                          href={result.href}
                          className="group flex gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <img
                            src={result.image}
                            alt={result.title}
                            className="size-16 shrink-0 rounded-xl object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="min-w-0">
                            <span className={cn('mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', result.tagColor)}>
                              {result.tag}
                            </span>
                            <p className="line-clamp-2 text-sm font-semibold text-foreground">{result.title}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}

                {/* Departments section */}
                {deptResults.length > 0 && (
                  <section>
                    {!type && <h2 className="mb-4 text-lg font-bold text-foreground">Departments</h2>}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {deptResults.map((result) => (
                        <Link
                          key={result.slug}
                          href={result.href}
                          className="group flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-lg"
                        >
                          <img
                            src={result.image}
                            alt={result.title}
                            className="size-14 shrink-0 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-semibold text-foreground">{result.title}</p>
                            <p className="line-clamp-1 text-xs text-muted-foreground">{result.subtitle}</p>
                          </div>
                          <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
