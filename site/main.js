import './styles.css'

async function init() {
  const content = await fetch('./generated/content.json').then((res) => res.json())
  const { dashboard, current, projects, goals, areas, updates } = content

  const app = document.querySelector('#app')

  app.innerHTML = `
    <main class="shell">
      <section class="hero card">
        <p class="eyebrow">${dashboard.site.title}</p>
        <h1>${dashboard.site.tagline}</h1>
        <p class="lede">${dashboard.site.description}</p>
        <div class="hero-meta">
          <span>Owner: ${dashboard.site.owner}</span>
          <span>State: ${current.data.currentState}</span>
          <span>Updated: ${current.data.lastUpdated}</span>
        </div>
      </section>

      <section class="grid two-up">
        <article class="card">
          <p class="section-label">Current focus</p>
          <h2>${current.data.title}</h2>
          <ul>
            ${current.data.primaryFocus.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <p>${current.content}</p>
        </article>

        <article class="card">
          <p class="section-label">Operating model</p>
          <h2>Turn chaos into motion.</h2>
          <p>
            This board is built to stay useful: structured updates in, visible priorities out, less drift in the middle.
          </p>
        </article>
      </section>

      <section class="grid three-up">
        <article class="card stat">
          <span class="stat-label">Projects</span>
          <strong>${dashboard.stats.projects}</strong>
        </article>
        <article class="card stat">
          <span class="stat-label">Goals</span>
          <strong>${dashboard.stats.goals}</strong>
        </article>
        <article class="card stat">
          <span class="stat-label">Overall status</span>
          <strong>${dashboard.stats.status}</strong>
        </article>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Projects</p>
          <h2>What’s in motion</h2>
        </div>
        <div class="grid two-up">
          ${projects.map(renderProjectCard).join('')}
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

function renderProjectCard(item) {
  return `
    <article class="card project-card">
      <p class="section-label">${item.data.status}</p>
      <h3>${item.data.title}</h3>
      <p>${item.data.summary}</p>
      <p class="meta"><strong>Next:</strong> ${item.data.nextAction}</p>
      <p class="meta"><strong>Area:</strong> ${item.data.area} · <strong>Priority:</strong> ${item.data.priority}</p>
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
      <p class="meta"><strong>Horizon:</strong> ${item.data.horizon} · <strong>Area:</strong> ${item.data.area}</p>
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
      <p class="section-label">${item.data.date}</p>
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
  const safeLabel = label.replace(/[-_]/g, ' ')
  const isExternal = /^https?:\/\//i.test(href)

  if (isExternal) {
    return `<a class="chip" href="${href}" target="_blank" rel="noreferrer">${safeLabel}</a>`
  }

  return `<span class="chip chip-muted">${safeLabel}: ${href}</span>`
}

init()
