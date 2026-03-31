import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = process.cwd()
const contentDir = path.join(root, 'content')
const outputDir = path.join(root, 'dist', 'generated')

fs.mkdirSync(outputDir, { recursive: true })

const dashboard = JSON.parse(fs.readFileSync(path.join(contentDir, 'dashboard.json'), 'utf8'))
const current = readMarkdown(path.join(contentDir, 'now', 'current.md'))
const projects = readCollection(path.join(contentDir, 'projects'))
const goals = readCollection(path.join(contentDir, 'goals'))
const areas = readCollection(path.join(contentDir, 'areas'))
const updates = readCollection(path.join(contentDir, 'updates'))
const birthdays = readJson(path.join(contentDir, 'birthdays.json'))

const computedStats = {
  projects: projects.length,
  goals: goals.length,
  status: dashboard.stats?.status || inferOverallStatus(projects, goals)
}

const bundle = {
  dashboard: {
    ...dashboard,
    stats: computedStats
  },
  current,
  projects,
  goals,
  areas,
  updates,
  birthdays: buildBirthdays(birthdays)
}

fs.writeFileSync(path.join(outputDir, 'content.json'), JSON.stringify(bundle, null, 2))

function readCollection(dir) {
  return fs.readdirSync(dir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => readMarkdown(path.join(dir, file)))
}

function readMarkdown(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8')
  const parsed = matter(raw)
  return {
    data: parsed.data,
    content: parsed.content.trim()
  }
}

function inferOverallStatus(projects, goals) {
  const values = [...projects, ...goals].map((item) => String(item.data.status || '').toLowerCase())

  if (values.includes('blocked')) return 'Blocked'
  if (values.includes('active')) return 'Active'
  if (values.includes('queued')) return 'Queued'
  if (values.includes('paused')) return 'Paused'
  if (values.length && values.every((value) => value === 'complete')) return 'Complete'
  return 'Building'
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function buildBirthdays(source = {}) {
  const lookaheadDays = Number(source.settings?.lookaheadDays || 30)
  const today = new Date()
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const people = Array.isArray(source.people) ? source.people : []

  const upcoming = []
  const needsInfo = []

  for (const person of people) {
    const month = Number(person.month)
    const day = Number(person.day)
    const hasMonthDay = Number.isInteger(month) && Number.isInteger(day) && month >= 1 && month <= 12 && day >= 1 && day <= 31

    if (!hasMonthDay) {
      needsInfo.push({
        ...person,
        missing: missingFields(person)
      })
      continue
    }

    const nextBirthday = getNextBirthday(todayStart, month, day)
    const daysAway = Math.round((nextBirthday - todayStart) / 86400000)
    const year = Number(person.year)
    const hasYear = Number.isInteger(year) && year > 1900
    const age = hasYear ? nextBirthday.getFullYear() - year : null

    const normalized = {
      ...person,
      dateLabel: formatMonthDay(nextBirthday),
      daysAway,
      age,
      urgency: daysAway <= 7 ? 'soon' : 'upcoming',
      sortKey: `${String(nextBirthday.getMonth() + 1).padStart(2, '0')}-${String(nextBirthday.getDate()).padStart(2, '0')}`
    }

    if (!hasYear) {
      needsInfo.push({
        ...normalized,
        missing: missingFields(person)
      })
    }

    if (daysAway <= lookaheadDays) {
      upcoming.push(normalized)
    }
  }

  upcoming.sort((a, b) => a.daysAway - b.daysAway || a.name.localeCompare(b.name))
  needsInfo.sort((a, b) => a.name.localeCompare(b.name))

  return {
    settings: {
      lookaheadDays,
      title: source.settings?.title || 'Upcoming Birthdays',
      subtitle: source.settings?.subtitle || 'People coming up soon and birthdays that still need details.'
    },
    upcoming,
    needsInfo,
    summary: {
      upcomingCount: upcoming.length,
      needsInfoCount: needsInfo.length
    }
  }
}

function getNextBirthday(today, month, day) {
  let year = today.getFullYear()
  let candidate = new Date(year, month - 1, day)

  if (
    candidate.getMonth() !== month - 1 ||
    candidate.getDate() !== day ||
    candidate < today
  ) {
    year += 1
    candidate = new Date(year, month - 1, day)
  }

  return candidate
}

function formatMonthDay(date) {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

function missingFields(person = {}) {
  const missing = []
  if (!Number.isInteger(Number(person.month)) || !Number.isInteger(Number(person.day))) {
    missing.push('date')
  }
  if (!Number.isInteger(Number(person.year)) || Number(person.year) <= 1900) {
    missing.push('birth year')
  }
  return missing
}
