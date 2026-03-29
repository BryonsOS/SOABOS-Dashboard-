import './styles.css'

async function init() {
  const content = await fetch('./generated/content.json').then((res) => res.json())
  const { dashboard, current, projects, goals, areas, updates } = content

  const app = document.querySelector('#app')
  const sortedProjects = [...projects].sort(sortProjects)

  app.innerHTML = `
    <main class="shell">
      <section class="hero card">
        <div class="hero-copy">
          <p class="eyebrow">${dashboard.site.title}</p>
          <h1>A clean operating board for real life and real work.</h1>
          <p class="lede">See what’s active, what’s blocked, and what moves next.</p>
        </div>
        <div class="hero-meta">
          <span>Owner: ${dashboard.site.owner}</span>
          <span>Mode: ${current.data.currentState}</span>
          <span>${formatRelativeOrAbsoluteDate(current.data.lastUpdated)}</span>
        </div>
      </section>

      <section class="grid lead-grid">
        <article class="card action-card action-card-primary">
          <p class="section-label">Move next</p>
          <h2>${(current.data.next && current.data.next[0]) || 'Choose the clearest next move and keep it visible.'}</h2>
          <p>${current.content}</p>
        </article>

        <article class="card action-card">
          <p class="section-label">Current focus</p>
          <h2>${current.data.title}</h2>
          <ul>
            ${current.data.primaryFocus.map((item) => `<li>${item}</li>`).join('')}
          </ul>
        </article>
      </section>

      <section class="priority-grid">
        ${renderListCard('Now', current.data.primaryFocus, 'now')}
        ${renderListCard('Next', current.data.next || [], 'next')}
        ${renderListCard('Blockers', current.data.blockers || [], 'blockers')}
        ${renderListCard('Wins', current.data.wins || [], 'wins')}
      </section>

      <section class="grid three-up stats-grid">
        <article class="card stat stat-inline">
          <span class="stat-label">Active projects</span>
          <strong>${dashboard.stats.projects}</strong>
        </article>
        <article class="card stat stat-inline">
          <span class="stat-label">Active goals</span>
          <strong>${dashboard.stats.goals}</strong>
        </article>
        <article class="card stat stat-inline stat-status">
          <span class="stat-label">System status</span>
          <strong>${dashboard.stats.status}</strong>
        </article>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Projects</p>
          <h2>What’s in motion</h2>
        </div>
        <div class="grid two-up">
          ${sortedProjects.map(renderProjectCard).join('')}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Goals</p>
          <h2>What this system is protecting</h2>
        </div>
        <div class="grid two-up">
          ${goals.map(renderGoalCard).join('')}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Areas</p>
          <h2>Where the work lives</h2>
        </div>
        <div class="grid two-up">
          ${areas.map(renderAreaCard).join('')}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Focus lanes</p>
          <h2>The board at a glance</h2>
        </div>
        <div class="grid two-up">
          ${renderLaneCard('Systems', 'Dashboards, routing, structure, and visibility work that keeps everything easier to steer.')}
          ${renderLaneCard('Work', 'Business, marketing, creative builds, and experiments tied to output and momentum.')}
          ${renderLaneCard('Events', 'DJ prep, scheduling, paperwork, communication, and event-day readiness.')}
          ${renderLaneCard('Home & Family', 'Family coordination, recurring logistics, and the systems that reduce domestic scramble.')}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Updates</p>
          <h2>Recent motion</h2>
        </div>
        <div class="stack">
          ${updates.slice().reverse().map(renderUpdateCard).join('')}
        </div>
      </section>
    </main>
  `
}

function renderListCard(title, items = [], tone = 'default') {
  const safeItems = items.length ? items : ['Nothing loaded yet.']

  return `
    <article class="card mini-card mini-card-${tone}">
      <p class="section-label">${title}</p>
      <ul>
        ${safeItems.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </article>
  `
}

function renderProjectCard(item) {
  return `
    <article class="card project-card">
      <div class="project-topline">
        <p class="section-label">${item.data.status}</p>
        <span class="project-priority">${capitalize(item.data.priority)} priority</span>
      </div>
      <h3>${item.data.title}</h3>
      <p class="project-summary">${item.data.summary}</p>
      <div class="project-next">
        <span class="project-next-label">Next move</span>
        <p>${item.data.nextAction}</p>
      </div>
      <p class="meta project-meta"><strong>Area:</strong> ${humanizeToken(item.data.area)}</p>
      ${renderLinks(item.data.links)}
    </article>
  `
}

function renderGoalCard(item) {
  return `
    <article class="card">
      <p class="section-label">${item.data.status}</p>
      <h3>${item.data.title}</h3>
      <p>${item.data.summary}</p>
      <p class="meta"><strong>Horizon:</strong> ${item.data.horizon} · <strong>Area:</strong> ${humanizeToken(item.data.area)}</p>
    </article>
  `
}

function renderAreaCard(item) {
  return `
    <article class="card">
      <p class="section-label">Area</p>
      <h3>${item.data.title}</h3>
      <p>${item.data.summary}</p>
      ${item.content ? `<p class="meta">${item.content}</p>` : ''}
    </article>
  `
}

function renderUpdateCard(item) {
  return `
    <article class="card">
      <p class="section-label">${formatRelativeOrAbsoluteDate(item.data.date)}</p>
      <h3>${item.data.title}</h3>
      <p class="meta">${item.data.kind}</p>
      <p>${item.content}</p>
    </article>
  `
}

function renderLaneCard(title, text) {
  return `
    <article class="card">
      <p class="section-label">Lane</p>
      <h3>${title}</h3>
      <p>${text}</p>
    </article>
  `
}

function renderLinks(links = {}) {
  const entries = Object.entries(links).filter(([, value]) => value)
  if (!entries.length) return ''

  return `
    <div class="link-row">
      ${entries.map(([label, href]) => renderLink(label, href)).join('')}
    </div>
  `
}

function renderLink(label, href) {
  const safeLabel = humanizeToken(label)
  const isExternal = /^https?:\/\//i.test(href)

  if (isExternal) {
    return `<a class="chip" href="${href}" target="_blank" rel="noreferrer">${safeLabel}</a>`
  }

  return `<span class="chip chip-muted">${safeLabel}: ${href}</span>`
}

function humanizeToken(value = '') {
  return value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function capitalize(value = '') {
  return value ? value.charAt(0).toUpperCase() + value.slice(1) : ''
}

function sortProjects(a, b) {
  const rank = { high: 0, medium: 1, low: 2 }
  return (rank[a.data.priority] ?? 9) - (rank[b.data.priority] ?? 9) || a.data.title.localeCompare(b.data.title)
}

function formatRelativeOrAbsoluteDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.round((today - target) / 86400000)

  if (diffDays === 0) return 'Updated today'
  if (diffDays === 1) return 'Updated yesterday'

  return `Updated ${date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })}`
}

init()
