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

function isSticker(item) {
  const s = `${item.title || ''} ${item.type || ''}`.toLowerCase()
  return s.includes('sticker') || s.includes('decal')
}

function scoreItem(item) {
  const sales = item.sales90 ?? 0
  const revenue = item.revenue90 ?? 0
  const inv = item.availableInventory ?? 0
  const price = item.price ?? 0
  const velocity = item.velocity90 ?? 0
  return (sales * 2.5) + (revenue / 80) + (velocity * 20) + Math.min(Math.max(inv, 0), 25) + (price >= 28 ? 12 : 0)
}

function bucketFor(item) {
  const inv = item.availableInventory ?? -1
  const sales90 = item.sales90 ?? 0
  const price = item.price ?? 0

  if (inv <= 0) return 'Out of Stock Winners'
  if (inv >= 1 && inv <= 3 && sales90 >= 20) return 'Protect / Low Stock'
  if (inv >= 4 && sales90 >= 8 && price >= 25) return 'Push What Is Left'
  if (inv >= 1) return 'Bundle / Test'
  return 'Dead / Review'
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

const bucketNames = ['Push What Is Left', 'Bundle / Test', 'Protect / Low Stock', 'Out of Stock Winners', 'Dead / Review']
const byBucket = Object.fromEntries(bucketNames.map((bucket) => [bucket, classified.filter((item) => item.bucket === bucket)]))

const actionable = classified
  .filter((item) => (item.availableInventory ?? 0) >= 1)
  .sort((a, b) => b.score - a.score)

const hero = actionable.find((item) => !isSticker(item)) || actionable[0] || null
const addOn = actionable.find((item) => isSticker(item)) || actionable.find((item) => item !== hero) || null
const topPush = [...byBucket['Push What Is Left']].sort((a, b) => b.score - a.score).slice(0, 5)
const topBundle = [...byBucket['Bundle / Test']].sort((a, b) => b.score - a.score).slice(0, 5)
const protect = [...byBucket['Protect / Low Stock']].sort((a, b) => b.score - a.score).slice(0, 5)
const outWinners = [...byBucket['Out of Stock Winners']].sort((a, b) => b.score - a.score).slice(0, 5)

const recommendation = hero ? {
  hero: hero.title,
  heroVariant: hero.variant,
  addOn: addOn ? addOn.title : null,
  offer: addOn ? `${hero.title} + ${addOn.title}` : `${hero.title} feature push`,
  channel: 'Homepage + email + IG story',
  inventoryReality: (hero.availableInventory ?? 0) <= 3 ? 'Low stock: push carefully or use as proof/anchor.' : 'Enough stock to feature now.',
  why: [
    hero.sales90 ? `${hero.sales90} sales in the last 90 days` : null,
    hero.availableInventory != null ? `${hero.availableInventory} units available` : null,
    hero.price ? `$${hero.price} price point` : null,
    hero.note || null
  ].filter(Boolean)
} : null

const todayBoard = {
  now: [
    recommendation ? `Push ${recommendation.offer} across ${recommendation.channel}.` : 'Pick one hero offer and one channel stack for today.',
    'Frame the day inside the revenue-now lane first, not across the full catalog.',
    'Use one KPI target tonight: hero units, sticker attach rate, or bundle orders.'
  ],
  next: [
    'Press subscription upsells harder as the retention / recurring lane.',
    'Turn Speedfest, Sick Summer 2026, and Syclone into premium board-level campaigns instead of general merch noise.',
    'Build a short evergreen hero list so winning SKUs stay visible and reusable.'
  ],
  watch: [
    `Protect / Low Stock is ${byBucket['Protect / Low Stock'].length}, so good sellers can burn out fast if promoted blindly.`,
    `Out of Stock Winners is ${byBucket['Out of Stock Winners'].length}, which means restock gaps are distorting what looks sellable.`,
    'Tickets, subscriptions, stickers, hats, keychains, and giveaway merch still deserve heavier attention than random long-tail items.'
  ],
  problems: [
    'Discount and code attribution is still weak from the current export.',
    'Catalog noise is too high, which makes decision weight too spread out.',
    'Evergreen merch, event merch, and promo / lead-gen offers need cleaner separation.'
  ],
  moves: [
    recommendation ? `Homepage: feature ${recommendation.hero} with ${recommendation.addOn || 'a low-friction add-on'}.` : 'Homepage: feature the clearest hero SKU.',
    recommendation ? `Email: lead with one hook around ${recommendation.hero} instead of a mixed catalog blast.` : 'Email: lead with one hook, not a mixed catalog blast.',
    recommendation ? `IG story: mirror the same offer — ${recommendation.offer}.` : 'IG story: mirror the same offer stack as the homepage.',
    'Cleanup lane: separate restock winners, protected low-stock items, and true push candidates.'
  ]
}

const output = {
  generatedAt: new Date().toISOString(),
  source: path.basename(sourcePath),
  summary: {
    totalRows: rows.length,
    merchRows: merch.length,
    actionableRows: actionable.length,
    buckets: Object.fromEntries(Object.entries(byBucket).map(([k, v]) => [k, v.length]))
  },
  recommendation,
  todayBoard,
  topPush,
  topBundle,
  protect,
  outWinners,
  buckets: Object.fromEntries(Object.entries(byBucket).map(([k, v]) => [k, v.sort((a, b) => b.score - a.score).slice(0, 12)]))
}

fs.writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log(`Wrote ${outPath}`)
