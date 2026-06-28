'use client'

import { useTranslation } from '@/lib/i18n'
import type { Footer, SubFooter, SocialEnum } from '@/data/loaders'

function SiFacebook({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  )
}

function SiInstagram({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12c0 3.259.014 3.668.072 4.948.059 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24c3.259 0 3.668-.014 4.948-.072 1.277-.059 2.148-.261 2.913-.558.788-.306 1.459-.717 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.689.072-4.948 0-3.259-.014-3.667-.072-4.947-.059-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
    </svg>
  )
}

function SiTiktok({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  )
}

function SiYoutube({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function SiX({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
  )
}

function SiLinkedin({ className }: { className?: string }) {
  return (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

const SOCIAL_ICONS: Record<SocialEnum, React.ComponentType<{ className?: string }>> = {
  Facebook: SiFacebook,
  Instagram: SiInstagram,
  TikTok: SiTiktok,
  YouTube: SiYoutube,
  X: SiX,
  LinkedIn: SiLinkedin,
}

interface SiteFooterProps {
  footer?: Footer | null
  subFooter?: SubFooter[] | null
}

export function SiteFooter({ footer, subFooter }: SiteFooterProps) {
  const { t } = useTranslation()
  const f = t.footer

  const subFooterTexts = subFooter?.[0]?.Text ?? []
  const leftItems = subFooterTexts.filter((item) => item.isLeft === true)
  const rightItems = subFooterTexts.filter((item) => item.isLeft !== true)

  const socialLinks = footer?.Social?.[0]?.Link ?? []
  const subLinks = footer?.SubLink ?? []

  const colCount = 1 + Math.max(subLinks.length, 1)
  const gridCols =
    colCount === 2 ? 'md:grid-cols-[1.4fr_1fr]' :
    colCount === 3 ? 'md:grid-cols-[1.4fr_1fr_1fr]' :
    'md:grid-cols-[1.4fr_1fr_1fr_1fr]'

  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className={`grid gap-10 ${gridCols}`}>
          {/* Brand column */}
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
              {f.tagline}
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.Social ? SOCIAL_ICONS[link.Social] : null
                  if (!Icon) return null
                  return (
                    <a
                      key={link.id}
                      href={link.Url}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      aria-label={link.Title}
                      className="flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                    >
                      <Icon className="size-5" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* SubLink columns */}
          {subLinks.map((group) => (
            <div key={group.id}>
              {group.Title && (
                <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.15em] text-foreground">
                  {group.Title}
                </h3>
              )}
              <ul className="mt-4 space-y-2.5">
                {group.Link.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.Url}
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.Title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 sm:flex-row">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            {leftItems.length > 0 ? leftItems.map((item) => (
              <p key={item.id} className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} {item.Text}
              </p>
            )) : (
              <p className="text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Kim Nhung Superfood. {f.rightsReserved}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4 sm:text-right">
            {rightItems.length > 0 ? rightItems.map((item) => (
              <p key={item.id} className="text-xs text-muted-foreground">
                {item.Description ? (
                  <a href={item.Description} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    {item.Text}
                  </a>
                ) : item.Text}
              </p>
            )) : (
              <p className="text-xs text-muted-foreground">{f.location}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
