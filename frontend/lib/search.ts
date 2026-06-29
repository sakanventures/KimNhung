import { getAllProducts, type StoreProduct } from './medusa/products'
import { BLOG_POSTS, DEPARTMENTS } from './site-data'
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

function buildIndex(products: StoreProduct[]): SearchResult[] {
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
    ...BLOG_POSTS.map((b) => ({
      type: 'post' as const,
      slug: b.slug,
      title: b.title,
      subtitle: b.excerpt.slice(0, 80) + (b.excerpt.length > 80 ? '…' : ''),
      image: b.coverImage,
      tag: b.category,
      tagColor: b.categoryColor,
      href: `/blog/${b.slug}`,
    })),
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
  const products = await getAllProducts()
  return buildIndex(products)
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
