'use client'

import { useTranslation } from '@/lib/i18n'

export function AnnouncementBar() {
  const { t } = useTranslation()
  const items = t.announcement.items

  return (
    <div className="overflow-hidden bg-primary py-2.5 text-primary-foreground">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex items-center gap-10 pr-10"
            aria-hidden={dup === 1}
          >
            {items.map((item, i) => (
              <li
                key={`${dup}-${i}`}
                className="flex items-center gap-10 whitespace-nowrap text-sm font-medium tracking-wide"
              >
                {item}
                <span className="text-gold" aria-hidden="true">
                  &#10042;
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
