import { PRODUCTS, BLOG_POSTS, DEPARTMENTS } from './site-data'

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

/** All indexable items flattened into a single array */
export const SEARCH_INDEX: SearchResult[] = [
  ...PRODUCTS.map((p) => ({
    type: 'product' as const,
    slug: p.slug,
    title: p.name,
    subtitle: p.description.slice(0, 80) + '…',
    image: p.images[0],
    tag: p.department,
    tagColor: 'bg-primary/10 text-primary',
    href: `/products/${p.slug}`,
    price: p.price,
    unit: p.unit,
    was: p.was,
  })),
  ...BLOG_POSTS.map((b) => ({
    type: 'post' as const,
    slug: b.slug,
    title: b.title,
    subtitle: b.excerpt.slice(0, 80) + '…',
    image: b.coverImage,
    tag: b.category,
    tagColor: b.categoryColor,
    href: `/blog/${b.slug}`,
  })),
  ...DEPARTMENTS.map((d) => ({
    type: 'department' as const,
    slug: d.id,
    title: d.name,
    subtitle: d.blurb.slice(0, 80) + '…',
    image: d.image,
    tag: 'Department',
    tagColor: 'bg-muted text-muted-foreground',
    href: `/#departments`,
  })),
]

/** Tokenise and score — returns results sorted by relevance */
export function searchIndex(query: string, limit = 60): SearchResult[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const tokens = q.split(/\s+/)

  const scored = SEARCH_INDEX.map((item) => {
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

/** Typeahead: max 6 results, products first */
export function typeahead(query: string): SearchResult[] {
  const results = searchIndex(query, 20)
  const products = results.filter((r) => r.type === 'product').slice(0, 4)
  const rest = results.filter((r) => r.type !== 'product').slice(0, 2)
  return [...products, ...rest]
}
