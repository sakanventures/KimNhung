'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function ProductImageGallery({
  images,
  name,
}: {
  images: string[]
  name: string
}) {
  const [active, setActive] = useState(0)

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length)
  const next = () => setActive((i) => (i + 1) % images.length)

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="group relative aspect-square overflow-hidden rounded-3xl bg-muted">
        <img
          key={active}
          src={images[active]}
          alt={`${name} — image ${active + 1}`}
          className="size-full object-cover transition-opacity duration-300"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-card/80 text-foreground shadow backdrop-blur-sm transition hover:bg-card"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-card/80 text-foreground shadow backdrop-blur-sm transition hover:bg-card"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                i === active
                  ? 'border-primary shadow-sm'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                className="size-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
