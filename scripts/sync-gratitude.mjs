import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const gratitudePath = path.join(root, 'content', 'gratitude.json')

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, '').split('=')
    return [key, rest.join('=')]
  })
)

const date = args.date || formatDateLocal(new Date())
const prompt = args.prompt
const status = args.status || 'pending'
const source = args.source || 'telegram + dashboard'
const note = args.note || 'Open it in the morning from Telegram or come back to it at night from the dashboard without digging through chat.'
const availableWindow = args.window || 'morning-to-evening'
const completedLabel = args.completedLabel || "Waiting for tonight's entry"

if (!prompt) {
  console.error('Missing required --prompt="..."')
  process.exit(1)
}

const raw = fs.readFileSync(gratitudePath, 'utf8')
const gratitude = JSON.parse(raw)
const previousToday = gratitude.today || null
const history = Array.isArray(gratitude.history) ? gratitude.history : []

const nextToday = {
  date,
  entryId: `GJ-${date.replace(/-/g, '')}-0700`,
  prompt,
  status,
  source,
  availableWindow,
  note,
  completedLabel
}

const nextHistory = previousToday
  ? [previousToday, ...history].filter((item, index, list) => {
      const key = `${item.entryId || ''}::${item.date || ''}`
      return list.findIndex((candidate) => `${candidate.entryId || ''}::${candidate.date || ''}` === key) === index
    }).slice(0, 12)
  : history.slice(0, 12)

gratitude.today = nextToday
gratitude.history = nextHistory

gratitude.settings = {
  showHistoryCount: 3,
  title: 'Daily gratitude',
  subtitle: "Keep today's prompt visible even when you answer it later at night.",
  ...(gratitude.settings || {})
}

fs.writeFileSync(gratitudePath, `${JSON.stringify(gratitude, null, 2)}\n`)
console.log(`Updated gratitude prompt for ${date} (${nextToday.entryId})`)

function formatDateLocal(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
