'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ChevronRight } from 'lucide-react'

const SORT_OPTIONS = [
  { label: 'Best match', value: 'relevance' },
  { label: 'On sale first', value: 'sale' },
  { label: 'Name A–Z', value: 'az' },
]

export function SearchSortSelect({ currentSort }: { currentSort: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleChange(sort: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (sort) params.set('sort', sort)
    else params.delete('sort')
    router.push(`/search?${params.toString()}`)
  }

  return (
    <div className="relative">
      <select
        defaultValue={currentSort}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none rounded-xl border border-border bg-card py-1.5 pl-3 pr-8 text-sm font-medium text-foreground outline-none transition-colors focus:border-primary"
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronRight className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 rotate-90 text-muted-foreground" />
    </div>
  )
}
