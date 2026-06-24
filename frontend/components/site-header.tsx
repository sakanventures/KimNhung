'use client'

import { useState, useEffect } from 'react'
import { Menu, X, MapPin, Phone, Clock, Search, ChevronRight } from 'lucide-react'
import { NAV_LINKS, STORE } from '@/lib/site-data'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-foreground text-background md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-gold" />
            {STORE.address}, {STORE.city}, {STORE.state} {STORE.zip}
          </span>
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-gold" />
              {STORE.hours}
            </span>
            <a
              href={`tel:${STORE.phone.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Phone className="size-3.5 text-gold" />
              {STORE.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cn(
          'border-b border-border bg-background transition-shadow',
          scrolled && 'shadow-sm',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="flex shrink-0 items-center gap-2.5">
            <span
              className="flex size-11 items-center justify-center rounded-full bg-primary text-base font-extrabold tracking-tight text-primary-foreground"
              aria-hidden="true"
            >
              KN
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-lg font-extrabold tracking-tight text-foreground">
                Kim Nhung
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary">
                Superfood
              </span>
            </span>
          </a>

          {/* Search */}
          <form
            action="#specials"
            className="relative ml-2 hidden flex-1 md:block"
            role="search"
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search seafood, bánh mì, snacks, beauty…"
              aria-label="Search the store"
              className="h-11 w-full rounded-full border border-border bg-muted/60 pl-12 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-background"
            />
          </form>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <a
              href="#visit"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <MapPin className="size-4" />
              Visit Us
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto inline-flex size-11 items-center justify-center rounded-full text-foreground md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Department nav row */}
        <nav
          className="mx-auto hidden max-w-7xl items-center gap-1 px-4 pb-2.5 sm:px-6 lg:flex lg:px-8"
          aria-label="Primary"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-sm font-semibold text-foreground/80 transition-colors hover:bg-muted hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-border bg-background md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            <form action="#specials" className="relative mb-2" role="search">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search the store…"
                aria-label="Search the store"
                className="h-11 w-full rounded-full border border-border bg-muted/60 pl-12 pr-4 text-sm outline-none focus:border-primary focus:bg-background"
              />
            </form>
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {link.label}
                <ChevronRight className="size-4 text-muted-foreground" />
              </a>
            ))}
            <a
              href="#visit"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-3 text-base font-bold text-primary-foreground"
            >
              <MapPin className="size-4" />
              {STORE.address}, {STORE.city}
            </a>
            <div className="mt-2 flex items-center justify-between rounded-lg border border-border px-3 py-3">
              <span className="text-sm font-semibold text-foreground">Dark mode</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
