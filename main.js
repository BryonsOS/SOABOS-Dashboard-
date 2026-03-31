import './styles.css'

async function init() {
  const content = await fetch('./generated/content.json').then((res) => res.json())
  const app = document.querySelector('#app')

  const state = buildState(content)

  function render() {
    const route = parseRoute(window.location.hash)
    app.innerHTML = renderShell(state, route)
    wireRouteBehavior(app, state, route)
  }

  window.addEventListener('hashchange', render)
  render()
}

function buildState(content) {
  const { dashboard, current, projects, goals, areas, updates, birthdays, gratitude } = content
  const sortedProjects = [...projects].sort(sortProjects)
  const spotlightProject = sortedProjects[0] || null
  const topUpdate = updates.at(-1) || null
  const activeProjects = sortedProjects.filter((item) => String(item.data.status || '').toLowerCase() === 'active')
  const highPriorityProjects = sortedProjects.filter((item) => String(item.data.priority || '').toLowerCase() === 'high')
  const immediateMoves = buildImmediateMoves(current, sortedProjects)
  const laneGroups = buildLaneGroups(areas, sortedProjects)
  const hotProjects = sortedProjects.slice(0, 4)
  const recentUpdates = updates.slice().reverse().slice(0, 4)
  const birthdaysState = buildBirthdayState(birthdays)
  const allRecentBirthdays = birthdaysState.upcoming.slice(0, 12)
  const gratitudeCard = buildGratitudeCard(gratitude)

  return {
    dashboard,
    current,
    projects,
    goals,
    areas,
    updates,
    birthdays,
    gratitude,
    sortedProjects,
    spotlightProject,
    topUpdate,
    activeProjects,
    highPriorityProjects,
    immediateMoves,
    laneGroups,
    hotProjects,
    recentUpdates,
    birthdaysState,
    allRecentBirthdays,
    gratitudeCard
  }
}

function renderShell(state, route) {
  const detail = renderRouteDetail(state, route)

  return `
    <div class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 opacity-60">
        <div class="absolute left-[-8rem] top-[-10rem] h-72 w-72 rounded-full bg-fire/12 blur-3xl"></div>
        <div class="absolute right-[-6rem] top-12 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"></div>
        <div class="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-amber-300/8 blur-3xl"></div>
      </div>

      <main class="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-4 px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24 lg:pt-6">
        ${renderTopBar(state, route)}
        ${route.name === 'home' ? renderHome(state) : detail}
      </main>
    </div>
  `
}

function renderTopBar(state, route) {
  return `
    <section class="glass-card overflow-hidden p-4 sm:p-5 lg:p-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div class="min-w-0">
          <div class="mb-3 flex flex-wrap items-center gap-2">
            <span class="chip chip-warm">${state.dashboard.site.title}</span>
            <span class="chip">Owner · ${state.dashboard.site.owner}</span>
            <span class="chip">Mode · ${state.current.data.currentState}</span>
          </div>
          <p class="section-kicker">Command deck</p>
          <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 class="max-w-[14ch] text-3xl font-semibold tracking-[-0.05em] text-copy sm:text-4xl lg:text-5xl">${state.dashboard.site.tagline}</h1>
              <p class="mt-3 max-w-3xl text-sm leading-6 text-copy-soft sm:text-base">${state.dashboard.site.description}</p>
            </div>
            <div class="rounded-[24px] border border-line bg-panel-strong px-4 py-4 lg:min-w-[320px]">
              <p class="micro-label text-fire">Current focus</p>
              <h2 class="mt-2 text-lg font-semibold text-copy">${state.current.data.title}</h2>
              <p class="mt-2 text-sm leading-6 text-copy-soft">${(state.current.data.next && state.current.data.next[0]) || 'Choose the clearest next move and keep it visible.'}</p>
            </div>
          </div>
        </div>

        <nav class="grid gap-2 sm:grid-cols-2 xl:w-[360px]">
          ${renderNavLink('#/', 'Overview', route.name === 'home')}
          ${renderNavLink('#/birthdays', 'Birthdays', route.name === 'birthdays')}
          ${renderNavLink('#/projects', 'Projects', route.name === 'projects' || route.name === 'project')}
          ${renderNavLink('#/updates', 'Updates', route.name === 'updates')}
        </nav>
      </div>
    </section>
  `
}

function renderNavLink(href, label, active = false) {
  return `<a class="nav-chip ${active ? 'nav-chip-active' : ''}" href="${href}">${label}</a>`
}

function renderHome(state) {
  return `
    ${renderGratitudeWidget(state.gratitudeCard)}

    <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <div class="stack-card compact-card">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="section-kicker">Immediate moves</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">What matters now</h2>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">One-page read. Click into any lane when you want the full picture.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="chip chip-warm">${state.immediateMoves.length} moves</span>
            <span class="chip">Updated ${formatRelativeOrAbsoluteDate(state.current.data.lastUpdated)}</span>
          </div>
        </div>
        <div class="mt-4 grid gap-3 md:grid-cols-3">
          ${state.immediateMoves.map(renderImmediateMoveCard).join('')}
        </div>
      </div>

      <aside class="stack-card compact-card">
        <p class="section-kicker">Board status</p>
        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          ${renderStatCard('Active projects', state.activeProjects.length, 'Projects in motion right now.')}
          ${renderStatCard('High priority', state.highPriorityProjects.length, 'Needs stronger attention.')}
          ${renderStatCard('Birthday radar', state.birthdays.summary?.upcomingCount ?? 0, 'Upcoming birthdays loaded.')}
          ${renderStatCard('System status', state.dashboard.stats.status, 'Board is live and steerable.')}
        </div>
      </aside>
    </section>

    <section class="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      ${renderCompactBirthdayCard(state)}
      ${renderCompactProjectsCard(state)}
    </section>

    <section class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      ${renderCompactSpotlightCard(state)}
      ${renderCompactUpdatesCard(state)}
    </section>

    <section class="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Operating lanes</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Where the work lives</h2>
          </div>
          <span class="chip">${state.laneGroups.length} lanes</span>
        </div>
        <div class="grid gap-3">
          ${state.laneGroups.map(renderLaneGroupCompact).join('')}
        </div>
      </section>

      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Focus stack</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Now / next / blockers / wins</h2>
          </div>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          ${renderFocusCard('Now', state.current.data.primaryFocus, 'orange')}
          ${renderFocusCard('Next', state.current.data.next || [], 'default')}
          ${renderFocusCard('Blockers', state.current.data.blockers || [], 'warning')}
          ${renderFocusCard('Wins', state.current.data.wins || [], 'success')}
        </div>
      </section>
    </section>
  `
}

function renderCompactBirthdayCard(state) {
  const nextBirthdays = state.allRecentBirthdays.slice(0, 4)
  const nextUp = nextBirthdays[0]
  const aprilCount = (state.birthdaysState.byMonth.april || []).length

  return `
    <section class="stack-card compact-card">
      <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="section-kicker">People lane</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Birthday radar</h2>
          <p class="mt-2 text-sm leading-6 text-copy-soft">Homepage stays short. Click through for the month view and profiles.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip chip-warm" href="#/birthdays">Open birthdays</a>
          <a class="chip" href="#/birthdays/april">View April</a>
        </div>
      </div>

      <div class="grid gap-3 lg:grid-cols-[0.8fr_1.2fr]">
        <article class="birthday-widget-hero compact-hero">
          <p class="micro-label text-fire">Next up</p>
          <h3 class="mt-2 text-2xl font-semibold tracking-[-0.03em] text-copy">${nextUp ? nextUp.name : 'All clear'}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${nextUp ? `${nextUp.dateLabel} · ${formatDaysAway(nextUp.daysAway)} · ${nextUp.relationship || 'Contact'}` : 'No birthdays loaded in the current lookahead.'}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="chip chip-warm">${state.birthdays.summary?.upcomingCount ?? 0} upcoming</span>
            <span class="chip">April · ${aprilCount}</span>
          </div>
        </article>

        <div class="grid gap-3 sm:grid-cols-2">
          ${nextBirthdays.map((item) => renderBirthdayWeekItem(item, true)).join('')}
        </div>
      </div>
    </section>
  `
}

function renderCompactProjectsCard(state) {
  return `
    <section class="stack-card compact-card">
      <div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="section-kicker">Projects</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Current status board</h2>
          <p class="mt-2 text-sm leading-6 text-copy-soft">Just the active picture here. Click any project to open deeper detail.</p>
        </div>
        <a class="chip chip-warm" href="#/projects">Open all projects</a>
      </div>
      <div class="grid gap-3">
        ${state.hotProjects.map((item, index) => renderProjectSummaryRow(item, index + 1)).join('')}
      </div>
    </section>
  `
}

function renderCompactSpotlightCard(state) {
  const item = state.spotlightProject

  return `
    <section class="stack-card compact-card">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Spotlight</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Lead project</h2>
        </div>
        ${item ? `<a class="chip chip-warm" href="#/projects/${item.data.slug}">Open detail</a>` : ''}
      </div>
      ${item ? `
        <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="chip chip-warm">${item.data.status}</span>
            <span class="chip">${capitalize(item.data.priority)} priority</span>
            <span class="chip">${humanizeToken(item.data.area)}</span>
          </div>
          <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${item.data.title}</h3>
          <p class="mt-3 text-sm leading-6 text-copy-soft">${item.data.summary}</p>
          <div class="mt-4 rounded-[20px] border border-fire/18 bg-fire-soft px-4 py-4">
            <p class="micro-label text-fire">Next move</p>
            <p class="mt-2 text-sm leading-6 text-copy">${item.data.nextAction}</p>
          </div>
        </article>
      ` : '<p class="text-sm text-copy-soft">No spotlight project loaded yet.</p>'}
    </section>
  `
}

function renderCompactUpdatesCard(state) {
  return `
    <section class="stack-card compact-card">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Recent motion</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Updates feed</h2>
        </div>
        <a class="chip chip-warm" href="#/updates">Open feed</a>
      </div>
      <div class="grid gap-3">
        ${state.recentUpdates.map(renderUpdateCompactCard).join('')}
      </div>
    </section>
  `
}

function renderRouteDetail(state, route) {
  if (route.name === 'birthdays') {
    return renderBirthdaysRoute(state, route)
  }

  if (route.name === 'projects') {
    return renderProjectsRoute(state)
  }

  if (route.name === 'project') {
    return renderProjectDetailRoute(state, route.slug)
  }

  if (route.name === 'updates') {
    return renderUpdatesRoute(state)
  }

  return renderHome(state)
}

function renderBirthdaysRoute(state, route) {
  const monthLabel = route.month ? capitalize(route.month) : null
  const monthItems = route.month ? (state.birthdaysState.byMonth[route.month] || []) : []
  const allMonths = state.birthdaysState.monthOrder.filter((month) => (state.birthdaysState.byMonth[month] || []).length)

  return `
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Birthdays</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">${monthLabel ? `${monthLabel} birthdays` : 'Birthday command view'}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">${monthLabel ? `Month detail for ${monthLabel}.` : 'This is the deeper drill-down: month tabs, upcoming list, and profile hints.'}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/">Back to overview</a>
          ${allMonths.map((month) => `<a class="chip ${route.month === month ? 'chip-warm' : ''}" href="#/birthdays/${month}">${capitalize(month)}</a>`).join('')}
        </div>
      </div>
    </section>

    ${!route.month ? `
      <section class="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <section class="stack-card compact-card">
          <div class="mb-4 flex items-end justify-between gap-4">
            <div>
              <p class="section-kicker">Upcoming</p>
              <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Next birthdays</h3>
            </div>
            <span class="chip chip-warm">${state.allRecentBirthdays.length} loaded</span>
          </div>
          <div class="grid gap-3">
            ${state.allRecentBirthdays.map((item) => renderBirthdayWeekItem(item)).join('')}
          </div>
        </section>

        <section class="stack-card compact-card">
          <div class="mb-4 flex items-end justify-between gap-4">
            <div>
              <p class="section-kicker">Months</p>
              <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Browse by month</h3>
            </div>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            ${allMonths.map((month) => renderMonthCard(month, state.birthdaysState.byMonth[month])).join('')}
          </div>
        </section>
      </section>
    ` : `
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Month detail</p>
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${monthLabel} list</h3>
          </div>
          <span class="chip chip-warm">${monthItems.length} people</span>
        </div>
        <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          ${monthItems.map((item) => renderBirthdayProfileCard(item)).join('')}
        </div>
      </section>
    `}
  `
}

function renderProjectsRoute(state) {
  return `
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Projects</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">Project drill-downs</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">The homepage shows status and next moves. This page opens the deeper context.</p>
        </div>
        <a class="chip" href="#/">Back to overview</a>
      </div>
    </section>

    <section class="grid gap-4 md:grid-cols-2">
      ${state.sortedProjects.map((item) => renderProjectDrillCard(item)).join('')}
    </section>
  `
}

function renderProjectDetailRoute(state, slug) {
  const item = state.sortedProjects.find((project) => project.data.slug === slug)

  if (!item) {
    return `
      <section class="stack-card compact-card">
        <p class="section-kicker">Project</p>
        <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">Project not found</h2>
        <p class="mt-3 text-sm leading-6 text-copy-soft">That project route does not exist yet.</p>
        <div class="mt-4">
          <a class="chip chip-warm" href="#/projects">Back to projects</a>
        </div>
      </section>
    `
  }

  const relatedUpdates = state.updates
    .slice()
    .reverse()
    .filter((update) => {
      const hay = `${update.data.title || ''} ${update.content || ''}`.toLowerCase()
      return hay.includes((item.data.title || '').toLowerCase()) || hay.includes((slug || '').replace(/-/g, ' '))
    })
    .slice(0, 4)

  return `
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Project detail</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">${item.data.title}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">${item.data.summary}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/projects">Back to projects</a>
          ${Object.entries(item.data.links || {}).map(([label, href]) => renderLink(label, href)).join('')}
        </div>
      </div>
    </section>

    <section class="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <section class="stack-card compact-card">
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Status</p>
            <p class="mt-2 text-lg font-semibold text-copy">${item.data.status}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Priority</p>
            <p class="mt-2 text-lg font-semibold text-copy">${capitalize(item.data.priority)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Area</p>
            <p class="mt-2 text-lg font-semibold text-copy">${humanizeToken(item.data.area)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Updated</p>
            <p class="mt-2 text-lg font-semibold text-copy">${formatRelativeOrAbsoluteDate(item.data.lastUpdated)}</p>
          </div>
        </div>

        <div class="mt-4 rounded-[24px] border border-fire/18 bg-fire-soft p-5">
          <p class="micro-label text-fire">Next build thought</p>
          <p class="mt-2 text-sm leading-6 text-copy">${item.data.nextAction}</p>
        </div>
      </section>

      <section class="stack-card compact-card">
        <p class="section-kicker">Why it exists</p>
        <div class="project-copy">${renderMarkdownish(item.content)}</div>
      </section>
    </section>

    <section class="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Recent motion</p>
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Related updates</h3>
          </div>
          <span class="chip chip-warm">${relatedUpdates.length} linked</span>
        </div>
        <div class="grid gap-3">
          ${relatedUpdates.length ? relatedUpdates.map(renderUpdateCompactCard).join('') : '<article class="rounded-[22px] border border-line bg-white/[0.04] p-4"><p class="text-sm leading-6 text-copy-soft">No linked updates yet. This page is ready for them.</p></article>'}
        </div>
      </section>

      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Board context</p>
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Operating fit</h3>
          </div>
        </div>
        <div class="grid gap-3">
          <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
            <p class="micro-label text-fire">Current role</p>
            <p class="mt-2 text-sm leading-6 text-copy-soft">This project lives in the ${humanizeToken(item.data.area)} lane and is being tracked as ${item.data.status}.</p>
          </article>
          <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
            <p class="micro-label text-fire">Why it matters</p>
            <p class="mt-2 text-sm leading-6 text-copy-soft">The command deck should let Bryon scan the current state fast, then click in here for the deeper project picture without crowding the homepage.</p>
          </article>
        </div>
      </section>
    </section>
  `
}

function renderUpdatesRoute(state) {
  const allUpdates = state.updates.slice().reverse()

  return `
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Updates</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">Recent motion feed</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">The homepage shows the latest few. This page keeps the full recent feed in one place.</p>
        </div>
        <a class="chip" href="#/">Back to overview</a>
      </div>
    </section>

    <section class="grid gap-3">
      ${allUpdates.map(renderUpdateFullCard).join('')}
    </section>
  `
}

function renderImmediateMoveCard(item) {
  return `
    <article class="rounded-[24px] border border-fire/18 bg-fire-soft p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${item.lane}</p>
        <span class="chip">${item.tag}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold tracking-[-0.03em] text-copy">${item.title}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${item.action}</p>
    </article>
  `
}

function renderStatCard(label, value, helper) {
  return `
    <article class="stat-card compact-stat-card">
      <div>
        <p class="micro-label text-copy-faint">${label}</p>
        <p class="mt-2 text-sm leading-6 text-copy-soft">${helper}</p>
      </div>
      <strong class="text-right text-2xl font-semibold tracking-[-0.04em] text-copy sm:text-3xl">${value}</strong>
    </article>
  `
}

function renderProjectSummaryRow(item, rank) {
  return `
    <a class="project-row" href="#/projects/${item.data.slug}">
      <div class="project-row-rank">${rank}</div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="chip chip-warm">${item.data.status}</span>
          <span class="chip">${capitalize(item.data.priority)} priority</span>
          <span class="chip">${humanizeToken(item.data.area)}</span>
        </div>
        <h3 class="mt-3 text-lg font-semibold text-copy">${item.data.title}</h3>
        <p class="mt-2 text-sm leading-6 text-copy-soft">${item.data.summary}</p>
        <p class="mt-3 text-sm leading-6 text-copy"><span class="text-copy-faint">Next:</span> ${item.data.nextAction}</p>
      </div>
      <div class="project-row-arrow">↗</div>
    </a>
  `
}

function renderUpdateCompactCard(item) {
  return `
    <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${formatRelativeOrAbsoluteDate(item.data.date)}</p>
        <span class="chip">${item.data.kind}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold text-copy">${item.data.title}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${item.content}</p>
    </article>
  `
}

function renderUpdateFullCard(item) {
  return `
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${formatRelativeOrAbsoluteDate(item.data.date)}</p>
          <h3 class="mt-3 text-xl font-semibold text-copy">${item.data.title}</h3>
        </div>
        <span class="chip chip-warm">${item.data.kind}</span>
      </div>
      <p class="mt-3 text-sm leading-7 text-copy-soft">${item.content}</p>
    </article>
  `
}

function renderFocusCard(title, items = [], tone = 'default') {
  const safeItems = items.length ? items : ['Nothing loaded yet.']
  const toneMap = {
    orange: 'border-fire/25 bg-fire-soft',
    warning: 'border-amber-400/20 bg-amber-400/10',
    success: 'border-emerald-400/20 bg-emerald-400/10',
    default: 'border-line bg-white/5'
  }

  return `
    <article class="glass-card p-4 ${toneMap[tone] || toneMap.default}">
      <p class="section-kicker">${title}</p>
      <ul class="list-dot space-y-2 pl-5 text-sm leading-6 text-copy-soft">
        ${safeItems.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </article>
  `
}

function renderLaneGroupCompact(group) {
  return `
    <article class="lane-card compact-lane-card">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${group.label}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${group.title}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${group.summary}</p>
        </div>
        <span class="chip chip-warm">${group.projects.length}</span>
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        ${group.projects.length ? group.projects.map((item) => `<a class="chip" href="#/projects/${item.data.slug}">${item.data.title}</a>`).join('') : '<span class="chip">No active projects</span>'}
      </div>
    </article>
  `
}

function renderBirthdayWeekItem(item, compact = false) {
  return `
    <a class="birthday-week-item ${compact ? 'birthday-week-item-compact' : ''}" href="#/birthdays/${monthSlugFromDateLabel(item.dateLabel)}">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${formatDaysAway(item.daysAway)}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${item.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${[item.relationship, item.category].filter(Boolean).join(' · ')}</p>
        </div>
        <span class="chip chip-warm">${item.dateLabel}</span>
      </div>
      ${(item.interests || item.profile || item.leadTime) ? `<p class="mt-3 text-sm leading-6 text-copy-faint">${[item.leadTime ? `Prep: ${item.leadTime}` : '', item.interests ? `Likes: ${item.interests}` : '', item.profile].filter(Boolean).join(' · ')}</p>` : ''}
    </a>
  `
}

function renderMonthCard(month, items = []) {
  const nextName = items[0]?.name || 'No one loaded'
  return `
    <a class="month-card" href="#/birthdays/${month}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">Month</p>
          <h3 class="mt-2 text-xl font-semibold text-copy">${capitalize(month)}</h3>
        </div>
        <span class="chip chip-warm">${items.length}</span>
      </div>
      <p class="mt-3 text-sm leading-6 text-copy-soft">Next listed: ${nextName}</p>
    </a>
  `
}

function renderBirthdayProfileCard(item) {
  return `
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${item.dateLabel}</p>
        <span class="chip chip-warm">${item.category || 'Birthday'}</span>
      </div>
      <h3 class="mt-3 text-xl font-semibold text-copy">${item.name}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${item.relationship || 'Contact'}</p>
      <div class="mt-4 space-y-2 text-sm leading-6 text-copy-faint">
        ${item.profile ? `<p><span class="text-copy">Profile:</span> ${item.profile}</p>` : ''}
        ${item.interests ? `<p><span class="text-copy">Interests:</span> ${item.interests}</p>` : ''}
        ${item.leadTime ? `<p><span class="text-copy">Prep:</span> ${item.leadTime}</p>` : ''}
      </div>
    </article>
  `
}

function renderProjectDrillCard(item) {
  return `
    <a class="rounded-[26px] border border-line bg-white/[0.04] p-5 transition duration-150 hover:border-fire/25 hover:bg-fire-soft" href="#/projects/${item.data.slug}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="chip chip-warm">${item.data.status}</span>
        <span class="chip">${capitalize(item.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${item.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${item.data.summary}</p>
      <div class="mt-4 rounded-[20px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="micro-label text-copy-faint">Current status</p>
        <p class="mt-2 text-sm leading-6 text-copy">${item.data.nextAction}</p>
      </div>
      <p class="mt-4 text-sm text-fire">Open project detail →</p>
    </a>
  `
}

function buildImmediateMoves(current, projects = []) {
  const moves = []
  const nextItems = Array.isArray(current?.data?.next) ? current.data.next : []

  nextItems.slice(0, 2).forEach((item, index) => {
    moves.push({
      lane: index === 0 ? 'Right now' : 'On deck',
      tag: 'Board move',
      title: item,
      summary: 'Pulled from the live command deck.',
      action: item
    })
  })

  projects
    .filter((project) => String(project.data.priority || '').toLowerCase() === 'high')
    .slice(0, 2)
    .forEach((project) => {
      moves.push({
        lane: humanizeToken(project.data.area || 'project'),
        tag: `${capitalize(project.data.priority || 'active')} priority`,
        title: project.data.title,
        summary: project.data.summary,
        action: project.data.nextAction
      })
    })

  return moves.slice(0, 3)
}

function buildLaneGroups(areas = [], projects = []) {
  return areas
    .map((area) => ({
      label: 'Lane',
      title: area.data.title,
      summary: area.data.summary,
      slug: area.data.slug,
      projects: projects
        .filter((project) => project.data.area === area.data.slug)
        .sort(sortProjects)
        .slice(0, 3)
    }))
    .sort((a, b) => b.projects.length - a.projects.length || a.title.localeCompare(b.title))
}

function buildBirthdayState(birthdays = {}) {
  const upcoming = Array.isArray(birthdays.upcoming) ? birthdays.upcoming.slice().sort((a, b) => a.daysAway - b.daysAway || a.name.localeCompare(b.name)) : []
  const byMonth = {}

  upcoming.forEach((item) => {
    const month = monthSlugFromDateLabel(item.dateLabel)
    byMonth[month] ||= []
    byMonth[month].push(item)
  })

  const monthOrder = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']

  return {
    upcoming,
    byMonth,
    monthOrder
  }
}

function wireRouteBehavior(app, state, route) {
  if (route.name === 'home') {
    const hero = app.querySelector('[data-home-scroll]')
    if (hero) hero.scrollIntoView({ block: 'start' })
  }
}

function parseRoute(hash) {
  const cleaned = String(hash || '#/').replace(/^#/, '') || '/'
  const parts = cleaned.split('/').filter(Boolean)

  if (!parts.length) return { name: 'home' }
  if (parts[0] === 'birthdays' && parts[1]) return { name: 'birthdays', month: parts[1].toLowerCase() }
  if (parts[0] === 'birthdays') return { name: 'birthdays' }
  if (parts[0] === 'projects' && parts[1]) return { name: 'project', slug: parts[1] }
  if (parts[0] === 'projects') return { name: 'projects' }
  if (parts[0] === 'updates') return { name: 'updates' }
  return { name: 'home' }
}

function renderLink(label, href) {
  const safeLabel = humanizeToken(label)
  const isExternal = /^https?:\/\//i.test(href)

  if (isExternal) {
    return `<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${href}" target="_blank" rel="noreferrer">${safeLabel}</a>`
  }

  return `<span class="chip">${safeLabel}: ${href}</span>`
}

function renderMarkdownish(content = '') {
  return content
    .split(/\n\n+/)
    .map((block) => {
      const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
      if (!lines.length) return ''
      if (lines.every((line) => line.startsWith('- '))) {
        return `<ul class="list-dot space-y-2 pl-5 text-sm leading-7 text-copy-soft">${lines.map((line) => `<li>${line.replace(/^-\s*/, '')}</li>`).join('')}</ul>`
      }
      if (lines[0].startsWith('## ')) {
        const title = lines[0].replace(/^##\s*/, '')
        const rest = lines.slice(1).join(' ')
        return `<div class="space-y-2"><h3 class="text-lg font-semibold text-copy">${title}</h3>${rest ? `<p class="text-sm leading-7 text-copy-soft">${rest}</p>` : ''}</div>`
      }
      return `<p class="text-sm leading-7 text-copy-soft">${lines.join(' ')}</p>`
    })
    .join('')
}

function monthSlugFromDateLabel(value = '') {
  return String(value).split(' ')[0].toLowerCase()
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
  const priorityRank = { high: 0, medium: 1, low: 2 }
  const statusRank = { active: 0, queued: 1, blocked: 2, paused: 3, idea: 4, complete: 5 }
  return (priorityRank[String(a.data.priority || '').toLowerCase()] ?? 9) - (priorityRank[String(b.data.priority || '').toLowerCase()] ?? 9)
    || (statusRank[String(a.data.status || '').toLowerCase()] ?? 9) - (statusRank[String(b.data.status || '').toLowerCase()] ?? 9)
    || a.data.title.localeCompare(b.data.title)
}

function formatCalendarDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

function formatRelativeOrAbsoluteDate(value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  const now = new Date()
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const diffDays = Math.round((today - target) / 86400000)

  if (diffDays === 0) return 'today'
  if (diffDays === 1) return 'yesterday'

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

function formatDaysAway(daysAway) {
  if (daysAway === 0) return 'Today'
  if (daysAway === 1) return 'Tomorrow'
  return `${daysAway} days`
}

init()

function renderGratitudeWidget(gratitudeCard = {}) {
  const history = Array.isArray(gratitudeCard.history) ? gratitudeCard.history : []

  return `
    <section class="glass-card p-5 sm:p-6 lg:p-7">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Daily rhythm</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">${gratitudeCard.title || 'Daily gratitude'}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">${gratitudeCard.subtitle || "Keep today's prompt visible even when you answer it later."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="chip chip-warm">${gratitudeCard.statusLabel || 'Pending'}</span>
          ${gratitudeCard.entryId ? `<span class="chip">${gratitudeCard.entryId}</span>` : ''}
          ${gratitudeCard.dateLabel ? `<span class="chip">${gratitudeCard.dateLabel}</span>` : ''}
        </div>
      </div>

      <div class="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <article class="birthday-widget-hero compact-hero">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="micro-label text-fire">Today's prompt</p>
            <span class="chip">${gratitudeCard.sourceLabel || 'Telegram + dashboard'}</span>
          </div>
          <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${gratitudeCard.promptTitle || 'Ready when you are'}</h3>
          <p class="mt-4 text-base leading-8 text-copy">${gratitudeCard.prompt || 'No prompt loaded yet.'}</p>

          <div class="mt-5 rounded-[22px] border border-fire/18 bg-black/10 p-4">
            <p class="micro-label text-fire">Use case</p>
            <p class="mt-2 text-sm leading-6 text-copy-soft">${gratitudeCard.note || 'Check it in the morning from Telegram or knock it out later from the dashboard.'}</p>
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <div class="detail-stat">
              <p class="micro-label text-copy-faint">Status</p>
              <p class="mt-2 text-sm leading-6 text-copy">${gratitudeCard.statusDetail || 'Pending reply'}</p>
            </div>
            <div class="detail-stat">
              <p class="micro-label text-copy-faint">Availability</p>
              <p class="mt-2 text-sm leading-6 text-copy">${gratitudeCard.windowLabel || 'Morning to evening'}</p>
            </div>
          </div>
        </article>

        <div class="grid gap-3">
          <article class="lane-card compact-lane-card">
            <p class="micro-label text-fire">Why it belongs here</p>
            <p class="mt-3 text-sm leading-6 text-copy-soft">This gives you the push in Telegram and the clean fallback on the dashboard, so the prompt stays usable at night without digging through old messages.</p>
          </article>

          <article class="lane-card compact-lane-card">
            <div class="flex items-end justify-between gap-3">
              <div>
                <p class="micro-label text-fire">Recent entries</p>
                <h3 class="mt-3 text-lg font-semibold text-copy">Momentum trail</h3>
              </div>
              <span class="chip">${history.length} loaded</span>
            </div>
            <div class="mt-4 space-y-3">
              ${history.length ? history.map(renderGratitudeHistoryItem).join('') : '<p class="text-sm leading-6 text-copy-soft">No recent gratitude history loaded yet.</p>'}
            </div>
          </article>
        </div>
      </div>
    </section>
  `
}

function renderGratitudeHistoryItem(item) {
  return `
    <article class="birthday-week-item birthday-week-item-compact">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${item.dateLabel || item.date || ''}</p>
          <h4 class="mt-2 text-base font-semibold text-copy">${item.statusLabel || 'Completed'}</h4>
        </div>
        ${item.entryId ? `<span class="chip chip-warm">${item.entryId}</span>` : ''}
      </div>
      ${item.responseSummary ? `<p class="mt-3 text-sm leading-6 text-copy-soft">${item.responseSummary}</p>` : ''}
    </article>
  `
}

function buildGratitudeCard(gratitude = {}) {
  const today = gratitude.today || {}
  const historyLimit = Number(gratitude.settings?.showHistoryCount || 3)
  const history = Array.isArray(gratitude.history) ? gratitude.history.slice(0, historyLimit) : []
  const status = String(today.status || 'pending').toLowerCase()

  return {
    title: gratitude.settings?.title || 'Daily gratitude',
    subtitle: gratitude.settings?.subtitle || "Keep today's prompt visible even when you answer it later at night.",
    promptTitle: status === 'completed' ? "Today's reflection is in" : "Tonight's prompt is waiting",
    prompt: today.prompt,
    entryId: today.entryId,
    dateLabel: formatCalendarDate(today.date),
    sourceLabel: today.source || 'Telegram + dashboard',
    note: today.note,
    statusLabel: status === 'completed' ? 'Completed' : 'Pending',
    statusDetail: status === 'completed'
      ? (today.completedLabel || 'Answered and logged.')
      : 'Visible here until you knock it out.',
    windowLabel: humanizeToken(String(today.availableWindow || 'morning-to-evening')),
    history: history.map((item) => ({
      ...item,
      dateLabel: formatCalendarDate(item.date),
      statusLabel: String(item.status || '').toLowerCase() === 'completed' ? 'Completed' : capitalize(item.status || 'pending')
    }))
  }
}
