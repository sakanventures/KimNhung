/**
 * Translates all English Strapi content to Vietnamese using Claude.
 *
 * Prerequisites:
 *   1. Add `vi` locale in Strapi admin: Settings → Internationalization → Add locale (Vietnamese vi)
 *   2. Restart the CMS after enabling i18n in the schemas
 *   3. Create a full-access API token in Strapi admin: Settings → API Tokens
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... STRAPI_TOKEN=your-token node scripts/translate-content.mjs
 *   STRAPI_URL=http://localhost:1337  (optional, defaults to localhost:1337)
 *
 * Install dependency first (from project root):
 *   npm install @anthropic-ai/sdk
 */

import Anthropic from '@anthropic-ai/sdk'

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_TOKEN
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

if (!STRAPI_TOKEN) {
  console.error('Missing STRAPI_TOKEN env var. Create a full-access API token in Strapi admin.')
  process.exit(1)
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function strapiHeaders() {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${STRAPI_TOKEN}`,
  }
}

const STRAPI_META = new Set(['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt', 'locale', 'localizations'])

function stripStrapiMeta(value) {
  if (Array.isArray(value)) return value.map(stripStrapiMeta)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      if (STRAPI_META.has(k)) continue
      out[k] = stripStrapiMeta(v)
    }
    return out
  }
  return value
}

async function strapiGet(path) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, { headers: strapiHeaders() })
  if (!res.ok) throw new Error(`GET ${path} → ${res.status} ${await res.text()}`)
  return (await res.json()).data
}

async function strapiPut(path, body) {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    method: 'PUT',
    headers: strapiHeaders(),
    body: JSON.stringify({ data: stripStrapiMeta(body) }),
  })
  if (!res.ok) throw new Error(`PUT ${path} → ${res.status} ${await res.text()}`)
  return res.json()
}

// ── Translation ───────────────────────────────────────────────────────────────

/**
 * Translate an array of English strings to Vietnamese in one Claude call.
 * Returns the translated strings in the same order.
 */
async function translateBatch(strings) {
  if (strings.length === 0) return []

  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [
      {
        role: 'user',
        content:
          'You are translating content for Kim Nhung Superfood, a Vietnamese Asian grocery store in Metro Detroit. ' +
          'Translate each of the following English strings to natural Vietnamese. ' +
          'Keep proper nouns, brand names, food item names (bánh mì, phở, etc.), and URLs unchanged. ' +
          'Return ONLY a JSON array of translated strings in the same order — no explanation, no markdown.\n\n' +
          JSON.stringify(strings),
      },
    ],
  })

  const text = res.content[0].text.trim()
  // Strip markdown code fences if Claude wraps the output
  const clean = text.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  return JSON.parse(clean)
}

/**
 * Walk any JSON value and collect every non-empty string leaf that looks
 * like human-readable text. Returns a flat list of { ref, value } where
 * ref is a setter function that can update the value in-place.
 */
function collectStrings(node, results = []) {
  if (node === null || node === undefined) return results

  if (Array.isArray(node)) {
    for (const item of node) collectStrings(item, results)
    return results
  }

  if (typeof node === 'object') {
    for (const [key, val] of Object.entries(node)) {
      if (key === '__component' || key === 'id' || key === 'documentId') continue

      if (typeof val === 'string') {
        if (isTranslatableString(key, val)) {
          results.push({
            value: val,
            set: (translated) => { node[key] = translated },
          })
        }
      } else {
        collectStrings(val, results)
      }
    }
    return results
  }

  return results
}

const URL_RE = /^https?:\/\//
const SLUG_RE = /^[a-z0-9-]+$/
const SKIP_KEYS = new Set(['url', 'alternativeText', 'Url', 'Slug', 'locale', 'Icon', 'Color', 'Variant', 'Social'])

function isTranslatableString(key, value) {
  if (SKIP_KEYS.has(key)) return false
  if (value.trim().length < 2) return false
  if (URL_RE.test(value)) return false
  if (SLUG_RE.test(value)) return false // likely a slug/enum
  return true
}

/**
 * Deep-clone obj, translate all string leaves, return the translated clone.
 */
async function translateObject(obj) {
  const clone = JSON.parse(JSON.stringify(obj))
  const refs = collectStrings(clone)
  if (refs.length === 0) return clone

  const originals = refs.map((r) => r.value)
  const translated = await translateBatch(originals)
  refs.forEach((r, i) => r.set(translated[i]))
  return clone
}

// ── Strapi Blocks ─────────────────────────────────────────────────────────────

/**
 * Translate Strapi Blocks (rich text) format.
 * Only touches "text" nodes; preserves structure, types, and formatting.
 */
async function translateBlocks(blocks) {
  const textNodes = []
  function collect(node) {
    if (!node || typeof node !== 'object') return
    if (node.type === 'text' && typeof node.text === 'string' && node.text.trim()) {
      textNodes.push({ node })
    }
    if (Array.isArray(node.children)) node.children.forEach(collect)
    if (Array.isArray(node)) node.forEach(collect)
  }
  const clone = JSON.parse(JSON.stringify(blocks))
  if (Array.isArray(clone)) clone.forEach(collect)

  if (textNodes.length === 0) return clone
  const translated = await translateBatch(textNodes.map((n) => n.node.text))
  textNodes.forEach((n, i) => { n.node.text = translated[i] })
  return clone
}

// ── Per-content-type handlers ─────────────────────────────────────────────────

async function translateHomepage() {
  console.log('\n── Homepage ──')
  const data = await strapiGet('/homepage?locale=en&populate[Blocks][populate]=*')
  if (!data) { console.log('No homepage data found.'); return }

  const translatedBlocks = await translateObject(data.Blocks ?? [])
  const translatedTitle = data.Title ? (await translateBatch([data.Title]))[0] : undefined
  const translatedDesc = data.Description ? (await translateBatch([data.Description]))[0] : undefined

  const body = {
    ...(translatedTitle && { Title: translatedTitle }),
    ...(translatedDesc && { Description: translatedDesc }),
    Blocks: translatedBlocks,
  }

  // The content-manager admin endpoint accepts __component and doesn't use { data: } wrapper
  const res = await fetch(`${STRAPI_URL}/content-manager/single-types/api::homepage.homepage?locale=vi`, {
    method: 'PUT',
    headers: strapiHeaders(),
    body: JSON.stringify(stripStrapiMeta(body)),
  })

  if (!res.ok) {
    const err = await res.text()
    console.log(`  ⚠ Content-manager PUT failed (${res.status}): ${err}`)
    console.log('  → Translate Blocks manually in Strapi admin: Home → switch locale to vi → Fill in from another locale')
    return
  }

  console.log('✓ Homepage translated (Blocks included)')
}

async function translateGlobal() {
  console.log('\n── Global ──')
  const data = await strapiGet(
    '/global?locale=en' +
    '&populate[Announcement][populate][RichText]=true' +
    '&populate[Utility][populate][Text]=true' +
    '&populate[NavBar][populate][LogoText][populate][Title]=true' +
    '&populate[Footer][populate][Social][populate][Link]=true' +
    '&populate[Footer][populate][SubLink][populate][Link]=true' +
    '&populate[SubFooter][populate][Text]=true',
  )
  if (!data) { console.log('No global data found.'); return }

  const { Title, Description, Icon, Logo, ...rest } = data
  const translatedRest = await translateObject(rest)
  const translatedTitle = Title ? (await translateBatch([Title]))[0] : undefined
  const translatedDesc = Description ? (await translateBatch([Description]))[0] : undefined

  await strapiPut('/global?locale=vi', {
    ...(translatedTitle && { Title: translatedTitle }),
    ...(translatedDesc && { Description: translatedDesc }),
    ...translatedRest,
  })
  console.log('✓ Global translated')
}

async function translateIndex() {
  console.log('\n── Index ──')
  const data = await strapiGet('/index?locale=en&populate[Info]=true')
  if (!data) { console.log('No index data found.'); return }

  const translatedInfo = await translateObject(data.Info ?? [])
  await strapiPut('/index?locale=vi', { Info: translatedInfo })
  console.log('✓ Index translated')
}

async function translateCategories() {
  console.log('\n── Categories ──')
  const items = await strapiGet('/categories?locale=en')
  if (!items?.length) { console.log('No categories found.'); return }

  for (const item of items) {
    const translatedTitle = (await translateBatch([item.Title]))[0]
    await strapiPut(`/categories/${item.documentId}?locale=vi`, { Title: translatedTitle })
    console.log(`  ✓ Category: ${item.Title} → ${translatedTitle}`)
  }
}

async function translateCommunityPosts() {
  console.log('\n── Community posts ──')
  let page = 1
  let total = Infinity

  while ((page - 1) * 25 < total) {
    const res = await fetch(
      `${STRAPI_URL}/api/communities?locale=en&populate[RichText]=true&pagination[page]=${page}&pagination[pageSize]=25`,
      { headers: strapiHeaders() },
    )
    const json = await res.json()
    const posts = json.data ?? []
    total = json.meta?.pagination?.total ?? 0

    for (const post of posts) {
      const fields = {}
      if (post.Slug) fields.Slug = post.Slug  // non-localized; must be present for slug-based lookups
      if (post.Title) fields.Title = (await translateBatch([post.Title]))[0]
      if (post.Description) fields.Description = (await translateBatch([post.Description]))[0]
      if (post.SEO) fields.SEO = (await translateBatch([post.SEO]))[0]

      if (post.RichText?.length) {
        fields.RichText = []
        for (const block of post.RichText) {
          fields.RichText.push({ RichText: await translateBlocks(block.RichText ?? []) })
        }
      }

      await strapiPut(`/communities/${post.documentId}?locale=vi`, fields)
      console.log(`  ✓ Post: ${post.Title}`)
    }
    page++
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`Translating Strapi content to Vietnamese via Claude...`)
  console.log(`CMS: ${STRAPI_URL}`)

  await translateIndex()
  await translateCategories()
  await translateGlobal()
  await translateHomepage()
  await translateCommunityPosts()

  console.log('\n✅ Done! All content translated to Vietnamese (vi locale).')
  console.log('Remember to publish the vi entries in the Strapi Content Manager.')
}

main().catch((err) => { console.error(err); process.exit(1) })
