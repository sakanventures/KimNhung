'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, ArrowRight } from 'lucide-react'
import type { SearchResult } from '@/lib/search'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  placeholder?: string
  className?: string
  onNavigate?: () => void
}

export function SearchBar({
  placeholder = 'Search seafood, bánh mì, snacks, beauty…',
  className,
  onNavigate,
}: SearchBarProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setOpen(false)
      return
    }
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const hits: SearchResult[] = await res.json()
      setResults(hits)
      setOpen(hits.length > 0)
      setActiveIndex(-1)
    }, 200)
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])

  const submit = useCallback(
    (q: string) => {
      if (!q.trim()) return
      setOpen(false)
      router.push(`/search?q=${encodeURIComponent(q.trim())}`)
      onNavigate?.()
    },
    [router, onNavigate],
  )

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, -1))
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && results[activeIndex]) {
        e.preventDefault()
        router.push(results[activeIndex].href)
        setOpen(false)
        onNavigate?.()
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  return (
    <div className={cn('relative', className)} role="combobox" aria-expanded={open} aria-haspopup="listbox">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(query)
        }}
        role="search"
      >
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4.5 -translate-y-1/2 text-muted-foreground" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={placeholder}
          aria-label="Search the store"
          aria-autocomplete="list"
          aria-controls="search-listbox"
          aria-activedescendant={activeIndex >= 0 ? `search-option-${activeIndex}` : undefined}
          className="h-11 w-full rounded-full border border-border bg-muted/60 pl-11 pr-10 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-background focus:ring-2 focus:ring-primary/20 [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setResults([])
              setOpen(false)
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </form>

      {open && (
        <div
          ref={dropdownRef}
          id="search-listbox"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
        >
          {results.some((r) => r.type === 'product') && (
            <p className="border-b border-border px-4 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
              Products
            </p>
          )}
          <ul>
            {results.map((result, i) => {
              const isProduct = result.type === 'product'
              const isDeptDivider = i > 0 && result.type !== results[i - 1].type
              return (
                <li key={result.href}>
                  {isDeptDivider && (
                    <p className="border-b border-t border-border px-4 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                      {result.type === 'post' ? 'Articles' : 'Departments'}
                    </p>
                  )}
                  <a
                    href={result.href}
                    id={`search-option-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    onClick={() => {
                      setOpen(false)
                      onNavigate?.()
                    }}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 transition-colors hover:bg-muted/60',
                      i === activeIndex && 'bg-muted/60',
                    )}
                  >
                    <img
                      src={result.image}
                      alt=""
                      aria-hidden="true"
                      className="size-11 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <span className={cn('mb-0.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide', result.tagColor)}>
                        {result.tag}
                      </span>
                      <p className="truncate text-sm font-semibold text-foreground">{result.title}</p>
                    </div>
                    {isProduct && result.price && (
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-bold text-primary">{result.price}</p>
                        {result.was && (
                          <p className="text-xs text-muted-foreground line-through">{result.was}</p>
                        )}
                      </div>
                    )}
                  </a>
                </li>
              )
            })}
          </ul>

          <button
            type="button"
            onClick={() => submit(query)}
            className="flex w-full items-center justify-between border-t border-border px-4 py-3 text-sm font-semibold text-primary transition-colors hover:bg-muted/50"
          >
            <span>See all results for &ldquo;{query}&rdquo;</span>
            <ArrowRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  )
}
