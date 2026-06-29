import { MapPin } from 'lucide-react'
import { NAV_LINKS, STORE } from '@/lib/site-data'

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.336 3.608 1.311.975.975 1.249 2.242 1.311 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.336 2.633-1.311 3.608-.975.975-2.242 1.249-3.608 1.311-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.336-3.608-1.311-.975-.975-1.249-2.242-1.311-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.336-2.633 1.311-3.608.975-.975 2.242-1.249 3.608-1.311C8.416 2.175 8.796 2.163 12 2.163zm0 1.802c-3.15 0-3.522.012-4.764.069-1.15.052-1.775.245-2.19.408a3.66 3.66 0 0 0-1.32.858 3.66 3.66 0 0 0-.858 1.32c-.163.415-.356 1.04-.408 2.19-.057 1.242-.069 1.614-.069 4.764s.012 3.522.069 4.764c.052 1.15.245 1.775.408 2.19.18.464.42.86.858 1.32.46.438.856.678 1.32.858.415.163 1.04.356 2.19.408 1.242.057 1.614.069 4.764.069s3.522-.012 4.764-.069c1.15-.052 1.775-.245 2.19-.408a3.66 3.66 0 0 0 1.32-.858c.438-.46.678-.856.858-1.32.163-.415.356-1.04.408-2.19.057-1.242.069-1.614.069-4.764s-.012-3.522-.069-4.764c-.052-1.15-.245-1.775-.408-2.19a3.66 3.66 0 0 0-.858-1.32 3.66 3.66 0 0 0-1.32-.858c-.415-.163-1.04-.356-2.19-.408-1.242-.057-1.614-.069-4.764-.069zm0 3.063A5.972 5.972 0 1 0 12 18.06a5.972 5.972 0 0 0 0-11.944zm0 9.852A3.88 3.88 0 1 1 12 8.12a3.88 3.88 0 0 1 0 7.76zm6.406-10.06a1.395 1.395 0 1 1-2.79 0 1.395 1.395 0 0 1 2.79 0z" />
    </svg>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span
                className="flex size-10 items-center justify-center rounded-full bg-primary font-heading text-lg font-semibold text-primary-foreground"
                aria-hidden="true"
              >
                KN
              </span>
              <span className="font-heading text-xl font-semibold tracking-tight text-foreground">
                Kim Nhung Superfood
              </span>
            </div>
            <p className="mt-4 max-w-sm text-pretty leading-relaxed text-muted-foreground">
              Metro Detroit&apos;s destination Asian superstore. Live seafood,
              fresh bakery, imported groceries, beauty and an indoor food hall
              on the way.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kim Nhung Superfood on Facebook"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <FacebookIcon className="size-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Kim Nhung Superfood on Instagram"
                className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
              Visit
            </h3>
            <address className="mt-4 flex flex-col gap-1 not-italic text-sm text-muted-foreground">
              <span className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>
                  {STORE.address}
                  <br />
                  {STORE.city}, {STORE.state} {STORE.zip}
                </span>
              </span>
              <span className="mt-2">{STORE.hours}</span>
              <span>{STORE.phone}</span>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Kim Nhung Superfood. All rights
            reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Madison Heights, Michigan
          </p>
        </div>
      </div>
    </footer>
  )
}
