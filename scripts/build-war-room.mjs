import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const sourcePath = path.resolve(root, '..', '..', 'tmp_war_room_products_master.json')
const outPath = path.join(root, 'content', 'war-room.json')

function asNumber(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value
  if (typeof value === 'string' && value.trim() !== '') {
    const n = Number(value)
    return Number.isFinite(n) ? n : null
  }
  return null
}

function slugify(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function isMerch(item) {
  const title = String(item.title || '').toLowerCase()
  const type = String(item.type || '').toLowerCase()
  const merchTypes = new Set(['shirt', 't-shirt', 'sticker', 'decal', 'accessory', 'hoodie', 'tank', 'hat'])
  return merchTypes.has(type) || title.includes('shirt') || title.includes('tee') || title.includes('sticker') || title.includes('decal') || title.includes('hat') || title.includes('hoodie')
}

function bucketFor(item) {
  const inv = item.availableInventory ?? -1
  const sales90 = item.sales90 ?? 0
  const price = item.price ?? 0

  if (inv <= 3 || (inv <= 8 && sales90 >= 20)) return 'Protect'
  if (inv >= 10 && sales90 >= 8 && price >= 28) return 'Push Now'
  if (inv >= 6) return 'Bundle / Test'
  return 'Dead / Review'
}

function scoreItem(item) {
  const sales = item.sales90 ?? 0
  const revenue = item.revenue90 ?? 0
  const inv = item.availableInventory ?? 0
  const price = item.price ?? 0
  const velocity = item.velocity90 ?? 0
  return (sales * 4) + (revenue / 50) + (velocity * 30) + Math.min(inv, 40) + (price >= 28 ? 20 : 0)
}

let rows = []
try {
  rows = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
} catch {
  rows = []
}

const parsed = rows
  .filter((row) => Array.isArray(row) && row.length >= 31)
  .map((row) => ({
    id: String(row[0] || ''),
    title: String(row[1] || ''),
    variant: String(row[2] || ''),
    type: String(row[3] || ''),
    vendor: String(row[4] || ''),
    brand: String(row[5] || ''),
    price: asNumber(row[6]),
    sales90: asNumber(row[17]),
    availableInventory: asNumber(row[18]),
    recentSales: asNumber(row[22]),
    revenue90: asNumber(row[25]),
    velocity90: asNumber(row[27]),
    note: String(row[30] || '')
  }))

const merch = parsed.filter(isMerch)
const classified = merch.map((item) => ({
  ...item,
  bucket: bucketFor(item),
  score: Math.round(scoreItem(item) * 100) / 100,
  slug: slugify(`${item.title}-${item.variant}`)
}))

const byBucket = Object.fromEntries(['Push Now', 'Bundle / Test', 'Protect', 'Dead / Review'].map((bucket) => [bucket, classified.filter((item) => item.bucket === bucket)]))
const topPush = [...byBucket['Push Now']].sort((a, b) => b.score - a.score).slice(0, 5)
const topBundle = [...byBucket['Bundle / Test']].sort((a, b) => b.score - a.score).slice(0, 5)
const hero = topPush[0] || null
const addOn = topBundle.find((item) => /sticker|decal/i.test(`${item.title} ${item.type}`)) || topBundle[0] || null

const recommendation = hero ? {
  hero: hero.title,
  heroVariant: hero.variant,
  addOn: addOn ? addOn.title : null,
  offer: addOn ? `${hero.title} + ${addOn.title}` : `${hero.title} feature push`,
  channel: 'Homepage + email + IG story',
  why: [
    hero.sales90 ? `${hero.sales90} sales in the last 90 days` : null,
    hero.availableInventory != null ? `${hero.availableInventory} units available` : null,
    hero.price ? `$${hero.price} price point` : null,
    hero.note || null
  ].filter(Boolean)
} : null

const output = {
  generatedAt: new Date().toISOString(),
  source: path.basename(sourcePath),
  summary: {
    totalRows: rows.length,
    merchRows: merch.length,
    buckets: Object.fromEntries(Object.entries(byBucket).map(([k,v]) => [k, v.length]))
  },
  recommendation,
  topPush,
  topBundle,
  buckets: Object.fromEntries(Object.entries(byBucket).map(([k,v]) => [k, v.sort((a,b) => b.score - a.score).slice(0, 12)]))
}

fs.writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log(`Wrote ${outPath}`)
