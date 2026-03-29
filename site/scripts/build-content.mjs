import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const root = path.resolve(process.cwd(), '..')
const contentDir = path.join(root, 'content')
const outputDir = path.join(process.cwd(), 'public', 'generated')

fs.mkdirSync(outputDir, { recursive: true })

const dashboard = JSON.parse(fs.readFileSync(path.join(contentDir, 'dashboard.json'), 'utf8'))
const current = readMarkdown(path.join(contentDir, 'now', 'current.md'))
const projects = readCollection(path.join(contentDir, 'projects'))
const goals = readCollection(path.join(contentDir, 'goals'))
const areas = readCollection(path.join(contentDir, 'areas'))
const updates = readCollection(path.join(contentDir, 'updates'))

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
  updates
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
