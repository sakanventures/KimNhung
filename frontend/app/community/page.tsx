import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { getIndexPage, getGlobal, getAllCommunityPosts } from '@/data/loaders'
import { getStrapiMedia } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Pagination } from '@/components/pagination'

export const metadata: Metadata = {
  title: 'Community',
  description:
    'Recipes, culture, store news, and guides from the team at Kim Nhung Superfood.',
}

const CATEGORY_COLORS: Record<string, string> = {
  Seafood:  'bg-teal/15 text-teal',
  Culture:  'bg-berry/12 text-berry',
  Recipes:  'bg-tangerine/15 text-tangerine',
  Beauty:   'bg-leaf/15 text-leaf',
  Guides:   'bg-gold/15 text-gold',
}
const DEFAULT_COLOR = 'bg-primary/10 text-primary'

function catColor(name?: string | null) {
  return name ? (CATEGORY_COLORS[name] ?? DEFAULT_COLOR) : DEFAULT_COLOR
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function CommunityIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>
}) {
  const { page: pageParam } = await searchParams
  const page = Math.max(1, parseInt(pageParam ?? '1', 10) || 1)

  const [indexPage, global, { data: posts, pagination }] = await Promise.all([
    getIndexPage(),
    getGlobal(),
    getAllCommunityPosts(page, 5),
  ])

  const info = indexPage?.Info?.[0]
  const isFirstPage = page === 1
  const featured = isFirstPage ? (posts.find((p) => p.isFeatured) ?? posts[0]) : null
  const rest = featured ? posts.filter((p) => p !== featured) : posts

  const utilityItems = global?.Utility?.Text
  const logoUrl = getStrapiMedia(global?.NavBar?.LogoText?.Logo?.url ?? null) ?? undefined
  const darkLogoUrl = getStrapiMedia(global?.NavBar?.LogoText?.DarkLogo?.url ?? null) ?? undefined
  const logoTitle = global?.NavBar?.LogoText?.Title
    ? {
        text: global.NavBar.LogoText.Title.Title,
        description: global.NavBar.LogoText.Title.Description ?? 'Superfood',
      }
    : undefined

  const featuredCategory = featured?.Categories?.[0]?.Title

  return (
    <>
      <SiteHeader
        utilityItems={utilityItems}
        logoUrl={logoUrl}
        darkLogoUrl={darkLogoUrl}
        logoTitle={logoTitle}
      />
      <main>
        {/* Page header */}
        <div className="border-b border-border bg-secondary/40 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              {info?.Badge ?? 'From the store'}
            </span>
            <h1 className="mt-2 text-balance font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              {info?.Title ?? 'Stories, recipes & guides'}
            </h1>
            <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {info?.Description ?? 'Behind every aisle is a story. Our team shares recipes, cultural guides, product spotlights, and what is happening in the store.'}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          {/* Featured post */}
          {featured && (
            <Link
              href={`/community/${featured.Slug}`}
              className="group mb-14 grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-shadow hover:shadow-xl lg:grid-cols-2"
            >
              <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto">
                {featured.Thumbnail && (
                  <img
                    src={getStrapiMedia(featured.Thumbnail.url) ?? ''}
                    alt={featured.Title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${catColor(featuredCategory)}`}>
                  {featuredCategory ?? 'Community'}
                </span>
                <h2 className="mt-4 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
                  {featured.Title}
                </h2>
                {featured.Description && (
                  <p className="mt-3 line-clamp-3 text-pretty leading-relaxed text-muted-foreground">
                    {featured.Description}
                  </p>
                )}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      K
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold text-foreground">Kim Nhung</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {formatDate(featured.createdAt)}
                      </span>
                    </div>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-primary transition-gap group-hover:gap-2">
                    Read article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          {/* Post grid */}
          {rest.length > 0 && (
            <>
              <h2 className="sr-only">More articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {rest.map((post) => {
                  const cat = post.Categories?.[0]?.Title
                  return (
                    <Link
                      key={post.id}
                      href={`/community/${post.Slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {post.Thumbnail && (
                          <img
                            src={getStrapiMedia(post.Thumbnail.url) ?? ''}
                            alt={post.Title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${catColor(cat)}`}>
                          {cat ?? 'Community'}
                        </span>
                        <h3 className="mt-2.5 text-balance font-heading text-base font-semibold leading-snug tracking-tight text-foreground">
                          {post.Title}
                        </h3>
                        {post.Description && (
                          <p className="mt-1.5 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                            {post.Description}
                          </p>
                        )}
                        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {formatDate(post.createdAt)}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </>
          )}

          <Pagination page={page} pageCount={pagination.pageCount} />
        </div>
      </main>
      <SiteFooter footer={global?.Footer ?? null} subFooter={global?.SubFooter ?? null} />
    </>
  )
}
