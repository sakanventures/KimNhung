import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/site-data'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.coverImage }],
      type: 'article',
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = BLOG_POSTS.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3)

  // Build heading list for sidebar TOC
  const headings = post.body.filter((b) => b.type === 'h2')

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <div className="relative h-[52vh] min-h-72 overflow-hidden bg-foreground/10">
          <img
            src={post.coverImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
              <Link
                href="/blog"
                className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-card"
              >
                <ArrowLeft className="size-3.5" />
                All articles
              </Link>
              <span
                className={`mb-3 flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${post.categoryColor}`}
              >
                {post.category}
              </span>
              <h1 className="max-w-3xl text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                    {post.author.charAt(0)}
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-foreground">
                      {post.author}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.authorRole}
                    </span>
                  </div>
                </div>
                <span className="h-4 w-px bg-border" aria-hidden="true" />
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="size-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="size-3.5" />
                  {post.readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body + sidebar */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_260px] lg:gap-12 xl:grid-cols-[1fr_300px]">
            {/* Article body */}
            <article className="prose prose-neutral max-w-none dark:prose-invert
              prose-headings:font-heading prose-headings:tracking-tight prose-headings:text-foreground
              prose-p:text-foreground/80 prose-p:leading-relaxed
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
              prose-img:rounded-2xl prose-img:shadow-md
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            ">
              {post.body.map((block, i) => {
                if (block.type === 'h2') {
                  return (
                    <h2
                      key={i}
                      id={block.content
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/(^-|-$)/g, '')}
                    >
                      {block.content}
                    </h2>
                  )
                }
                if (block.type === 'h3') return <h3 key={i}>{block.content}</h3>
                if (block.type === 'p') return <p key={i}>{block.content}</p>
                if (block.type === 'blockquote') {
                  return <blockquote key={i}>{block.content}</blockquote>
                }
                if (block.type === 'img') {
                  return (
                    <img
                      key={i}
                      src={block.content}
                      alt=""
                      className="my-8 w-full rounded-2xl object-cover shadow-md"
                    />
                  )
                }
                return null
              })}
            </article>

            {/* Sticky sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-6">
                {/* Table of contents */}
                {headings.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      In this article
                    </p>
                    <nav aria-label="Table of contents">
                      <ul className="flex flex-col gap-2">
                        {headings.map((h, i) => {
                          const id = h.content
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, '')
                          return (
                            <li key={i}>
                              <a
                                href={`#${id}`}
                                className="block text-sm leading-snug text-muted-foreground transition-colors hover:text-primary"
                              >
                                {h.content}
                              </a>
                            </li>
                          )
                        })}
                      </ul>
                    </nav>
                  </div>
                )}

                {/* Author card */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Written by
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                      {post.author.charAt(0)}
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">
                        {post.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {post.authorRole}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Back to blog */}
                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <ArrowLeft className="size-4" />
                  Back to all articles
                </Link>
              </div>
            </aside>
          </div>

          {/* Related posts */}
          {related.length > 0 && (
            <section className="mt-20 border-t border-border pt-12">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                  More to read
                </h2>
                <Link
                  href="/blog"
                  className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                >
                  View all <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <img
                        src={rp.coverImage}
                        alt={rp.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <span
                        className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${rp.categoryColor}`}
                      >
                        {rp.category}
                      </span>
                      <h3 className="mt-2.5 text-balance font-heading text-base font-semibold leading-snug tracking-tight text-foreground">
                        {rp.title}
                      </h3>
                      <div className="mt-auto flex items-center gap-1.5 pt-3 text-xs text-muted-foreground">
                        <Clock className="size-3" />
                        {rp.readingTime} &middot; {rp.date}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
