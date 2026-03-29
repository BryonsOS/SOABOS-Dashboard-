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
      </section>

      <section class="grid two-up">
        <article class="card">
          <p class="section-label">Current focus</p>
          <h2>${current.data.title}</h2>
          <ul>
            ${current.data.primaryFocus.map((item) => `<li>${item}</li>`).join('')}
          </ul>
          <p class="meta">State: ${current.data.currentState}</p>
        </article>

        <article class="card">
          <p class="section-label">Operating model</p>
          <h2>Chat in. Motion out.</h2>
          <p>
            Conversations update structured files. Structured files drive the dashboard.
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
          <span class="stat-label">Status</span>
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
          <h2>What this system is trying to protect</h2>
        </div>
        <div class="grid two-up">
          ${goals.map(renderGoalCard).join('')}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Areas</p>
          <h2>Life buckets</h2>
        </div>
        <div class="grid two-up">
          ${areas.map(renderAreaCard).join('')}
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
    <article class="card">
      <p class="section-label">${item.data.status}</p>
      <h3>${item.data.title}</h3>
      <p>${item.data.summary}</p>
      <p class="meta"><strong>Next:</strong> ${item.data.nextAction}</p>
      <p class="meta"><strong>Area:</strong> ${item.data.area} · <strong>Priority:</strong> ${item.data.priority}</p>
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
    </article>
  `
}

function renderUpdateCard(item) {
  return `
    <article class="card">
      <p class="section-label">${item.data.date}</p>
      <h3>${item.data.title}</h3>
      <p>${item.content}</p>
    </article>
  `
}

init()
