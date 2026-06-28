import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Fragment } from 'react'
import { ArrowLeft, Clock, Calendar, ArrowRight } from 'lucide-react'
import { getAllCommunityPosts, getCommunityPostBySlug, getGlobal } from '@/data/loaders'
import { getStrapiMedia } from '@/lib/utils'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

// ── Strapi Blocks renderer ──────────────────────────────────────────
type InlineNode = { type?: string; text?: string; bold?: boolean; italic?: boolean; underline?: boolean; strikethrough?: boolean; code?: boolean; url?: string; children?: InlineNode[] }
type BlockNode = { type: string; level?: number; format?: string; image?: { url: string; alternativeText?: string | null }; children?: InlineNode[] }

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function inlineText(nodes: InlineNode[] = []): string {
  return nodes.map((n) => n.text ?? inlineText(n.children ?? [])).join('')
}

export interface Heading { id: string; text: string; level: number }

export function extractHeadings(blocks: unknown[]): Heading[] {
  return (blocks as BlockNode[])
    .filter((b) => b.type === 'heading' && (b.level === 1 || b.level === 2))
    .map((b) => {
      const text = inlineText(b.children ?? [])
      return { id: slugify(text), text, level: b.level ?? 2 }
    })
}

function Inline({ node }: { node: InlineNode }) {
  const text = node.text ?? ''
  if (node.type === 'link') return <a href={node.url}>{node.children?.map((c, i) => <Inline key={i} node={c} />)}</a>
  if (node.code) return <code>{text}</code>
  if (node.bold && node.italic) return <strong><em>{text}</em></strong>
  if (node.bold) return <strong>{text}</strong>
  if (node.italic) return <em>{text}</em>
  if (node.underline) return <u>{text}</u>
  if (node.strikethrough) return <s>{text}</s>
  return <Fragment>{text}</Fragment>
}

function Block({ node }: { node: BlockNode }) {
  const children = node.children?.map((c, i) => <Inline key={i} node={c} />)
  switch (node.type) {
    case 'heading': {
      const Tag = `h${node.level ?? 2}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      const id = slugify(inlineText(node.children ?? []))
      return <Tag id={id}>{children}</Tag>
    }
    case 'paragraph': return <p>{children}</p>
    case 'quote': return <blockquote>{children}</blockquote>
    case 'code': return <pre><code>{children}</code></pre>
    case 'list': {
      const Tag = node.format === 'ordered' ? 'ol' : 'ul'
      return <Tag>{node.children?.map((item, i) => <li key={i}>{item.children?.map((c, j) => <Inline key={j} node={c} />)}</li>)}</Tag>
    }
    case 'image': return node.image ? <img src={getStrapiMedia(node.image.url) ?? node.image.url} alt={node.image.alternativeText ?? ''} /> : null
    default: return null
  }
}

function RichTextBlocks({ blocks }: { blocks: unknown[] }) {
  return <>{(blocks as BlockNode[]).map((b, i) => <Block key={i} node={b} />)}</>
}

type Props = { params: Promise<{ slug: string }> }

const CATEGORY_COLORS: Record<string, string> = {
  Seafood:   'bg-teal/15 text-teal',
  Culture:   'bg-berry/12 text-berry',
  Recipes:   'bg-tangerine/15 text-tangerine',
  Beauty:    'bg-leaf/15 text-leaf',
  Guides:    'bg-gold/15 text-gold',
}

function catColor(name?: string | null) {
  return name ? (CATEGORY_COLORS[name] ?? 'bg-primary/10 text-primary') : 'bg-primary/10 text-primary'
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export async function generateStaticParams() {
  const posts = await getAllCommunityPosts()
  return posts.map((p) => ({ slug: p.Slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getCommunityPostBySlug(slug)
  if (!post) return {}
  const coverUrl = getStrapiMedia((post.Wallpaper ?? post.Thumbnail)?.url ?? null)
  return {
    title: post.Title,
    description: post.Description ?? undefined,
    openGraph: {
      title: post.Title,
      description: post.Description ?? undefined,
      images: coverUrl ? [{ url: coverUrl }] : [],
      type: 'article',
    },
  }
}

export default async function CommunityDetailPage({ params }: Props) {
  const { slug } = await params
  const [post, allPosts, global] = await Promise.all([
    getCommunityPostBySlug(slug),
    getAllCommunityPosts(),
    getGlobal(),
  ])
  if (!post) notFound()

  const related = allPosts.filter((p) => p.Slug !== slug).slice(0, 3)
  const coverImage = getStrapiMedia((post.Wallpaper ?? post.Thumbnail)?.url ?? null)
  const cat = post.Categories?.[0]?.Title
  const richBlocks = post.RichText?.flatMap((rt) => rt.RichText ?? []) ?? []
  const headings = extractHeadings(richBlocks)

  const utilityItems = global?.Utility?.Text
  const logoUrl = getStrapiMedia(global?.NavBar?.LogoText?.Logo?.url ?? null) ?? undefined
  const darkLogoUrl = getStrapiMedia(global?.NavBar?.LogoText?.DarkLogo?.url ?? null) ?? undefined
  const logoTitle = global?.NavBar?.LogoText?.Title
    ? { text: global.NavBar.LogoText.Title.Title, description: global.NavBar.LogoText.Title.Description ?? 'Superfood' }
    : undefined

  return (
    <>
      <SiteHeader utilityItems={utilityItems} logoUrl={logoUrl} darkLogoUrl={darkLogoUrl} logoTitle={logoTitle} />
      <main>

        {/* ── Hero ─────────────────────────────────────────────────── */}
        <div className="relative min-h-72 overflow-hidden bg-foreground/10" style={{ height: '52vh' }}>
          {coverImage && (
            <img
              src={coverImage}
              alt={post.Title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
              <Link
                href="/community"
                className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-card"
              >
                <ArrowLeft className="size-3.5" />
                All articles
              </Link>
              <span className={`mb-3 flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold ${catColor(cat)}`}>
                {cat ?? 'Community'}
              </span>
              <h1 className="max-w-3xl text-balance font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                {post.Title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary">
                    K
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold text-foreground">Kim Nhung</span>
                    <span className="text-xs text-muted-foreground">Kim Nhung Superfood</span>
                  </div>
                </div>
                <span className="h-4 w-px bg-border" aria-hidden="true" />
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="size-3.5" />
                  {formatDate(post.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Body + Sidebar ───────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row">
            {/* Article */}
            <article className="min-w-0 flex-1 max-w-none
              [&_h1]:mt-0 [&_h1]:mb-6 [&_h1]:font-heading [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h1]:text-foreground
              [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-heading [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-foreground
              [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground
              [&_h4]:mt-6 [&_h4]:mb-2 [&_h4]:font-heading [&_h4]:text-lg [&_h4]:font-semibold [&_h4]:text-foreground
              [&_p]:mb-5 [&_p]:leading-relaxed [&_p]:text-foreground/80
              [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-foreground/80
              [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:text-foreground/80
              [&_li]:mb-1.5 [&_li]:leading-relaxed
              [&_blockquote]:my-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-5 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
              [&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:text-sm
              [&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:font-mono
              [&_img]:my-8 [&_img]:w-full [&_img]:rounded-2xl [&_img]:shadow-md
              [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline
              [&_strong]:font-semibold [&_strong]:text-foreground"
            >
              {richBlocks.length > 0 && <RichTextBlocks blocks={richBlocks} />}
            </article>

            {/* Sidebar */}
            <aside className="hidden shrink-0 basis-[260px] lg:block">
              <div className="sticky top-28 flex flex-col gap-6">
                {/* TOC */}
                {headings.length > 0 && (
                  <div className="rounded-2xl border border-border bg-card p-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      In this article
                    </p>
                    <nav className="flex flex-col">
                      {headings.map((h) => (
                        <a
                          key={h.id}
                          href={`#${h.id}`}
                          className="block border-t border-border py-2.5 text-[10px] leading-snug text-foreground/70 transition-colors hover:text-foreground"
                        >
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                )}
                {/* Author */}
                <div className="rounded-2xl border border-border bg-card p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                    Written by
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                      K
                    </span>
                    <div>
                      <p className="font-semibold text-foreground">Kim Nhung</p>
                      <p className="text-xs text-muted-foreground">Kim Nhung Superfood</p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/community"
                  className="flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  <ArrowLeft className="size-4" />
                  Back to all articles
                </Link>
              </div>
            </aside>
          </div>
        </div>

        {/* ── Related posts ────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-border pt-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                  More to read
                </h2>
                <Link href="/community" className="flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                  View all <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((rp) => {
                  const rpCat = rp.Categories?.[0]?.Title
                  const rpImg = getStrapiMedia(rp.Thumbnail?.url ?? null)
                  return (
                    <Link
                      key={rp.id}
                      href={`/community/${rp.Slug}`}
                      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
                    >
                      <div className="relative aspect-[16/9] overflow-hidden">
                        {rpImg && (
                          <img
                            src={rpImg}
                            alt={rp.Title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <span className={`inline-flex w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${catColor(rpCat)}`}>
                          {rpCat ?? 'Community'}
                        </span>
                        <h3 className="mt-2.5 text-balance font-heading text-base font-semibold leading-snug tracking-tight text-foreground">
                          {rp.Title}
                        </h3>
                        <div className="mt-auto flex items-center gap-1.5 pt-3 text-xs text-muted-foreground">
                          <Clock className="size-3" />
                          {formatDate(rp.createdAt)}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

      </main>
      <SiteFooter footer={global?.Footer ?? null} subFooter={global?.SubFooter ?? null} />
    </>
  )
}
