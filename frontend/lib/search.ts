import { getAllProducts, type StoreProduct } from './medusa/products'
import { DEPARTMENTS } from './site-data'
import { getAllCommunityPosts } from '@/data/loaders'
import { getStrapiMedia } from './utils'
import { formatPrice } from './utils'

export type SearchResult = {
  type: 'product' | 'post' | 'department'
  slug: string
  title: string
  subtitle: string
  image: string
  tag: string
  tagColor: string
  href: string
  price?: string
  unit?: string
  was?: string
}

const CATEGORY_COLOR_MAP: Record<string, string> = {
  Seafood:  'bg-teal/15 text-teal',
  Culture:  'bg-berry/12 text-berry',
  Recipes:  'bg-tangerine/15 text-tangerine',
  Beauty:   'bg-leaf/15 text-leaf',
  Guides:   'bg-gold/15 text-gold',
}

function buildIndex(
  products: StoreProduct[],
  posts: Awaited<ReturnType<typeof getAllCommunityPosts>>['data'],
): SearchResult[] {
  const deptNameMap = Object.fromEntries(DEPARTMENTS.map((d) => [d.id, d.name]))

  return [
    ...products.map((p) => ({
      type: 'product' as const,
      slug: p.slug,
      title: p.title,
      subtitle: p.description.slice(0, 80) + (p.description.length > 80 ? '…' : ''),
      image: p.thumbnail,
      tag: deptNameMap[p.category] ?? p.category,
      tagColor: 'bg-primary/10 text-primary',
      href: `/products/${p.category}/${p.slug}`,
      price: formatPrice(p.price),
      unit: p.unit,
      was: p.compareAtPrice !== undefined ? formatPrice(p.compareAtPrice) : undefined,
    })),
    ...posts.map((p) => {
      const cat = p.Categories?.[0]?.Title ?? 'Community'
      const img = getStrapiMedia(p.Thumbnail?.url ?? null) ?? ''
      const excerpt = (p.Description ?? '').slice(0, 80) + ((p.Description?.length ?? 0) > 80 ? '…' : '')
      return {
        type: 'post' as const,
        slug: p.Slug,
        title: p.Title,
        subtitle: excerpt,
        image: img,
        tag: cat,
        tagColor: CATEGORY_COLOR_MAP[cat] ?? 'bg-primary/10 text-primary',
        href: `/community/${p.Slug}`,
      }
    }),
    ...DEPARTMENTS.map((d) => ({
      type: 'department' as const,
      slug: d.id,
      title: d.name,
      subtitle: d.blurb.slice(0, 80) + (d.blurb.length > 80 ? '…' : ''),
      image: d.image,
      tag: 'Department',
      tagColor: 'bg-muted text-muted-foreground',
      href: `/products/${d.id}`,
    })),
  ]
}

export async function getSearchIndex(): Promise<SearchResult[]> {
  const [products, { data: posts }] = await Promise.all([
    getAllProducts(),
    getAllCommunityPosts(1, 100),
  ])
  return buildIndex(products, posts)
}

export function runSearch(index: SearchResult[], query: string, limit = 60): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const tokens = q.split(/\s+/)
  const scored = index.map((item) => {
    const haystack = [item.title, item.subtitle, item.tag].join(' ').toLowerCase()
    let score = 0
    for (const token of tokens) {
      if (item.title.toLowerCase().includes(token)) score += 3
      else if (haystack.includes(token)) score += 1
    }
    return { item, score }
  })
  return scored
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.item)
}

export function runTypeahead(index: SearchResult[], query: string): SearchResult[] {
  const results = runSearch(index, query, 20)
  const products = results.filter((r) => r.type === 'product').slice(0, 4)
  const rest = results.filter((r) => r.type !== 'product').slice(0, 2)
  return [...products, ...rest]
}
