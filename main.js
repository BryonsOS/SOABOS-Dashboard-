import './styles.css'

async function init() {
  const content = await fetch('./generated/content.json').then((res) => res.json())
  const { dashboard, current, projects, goals, areas, updates, birthdays } = content

  const app = document.querySelector('#app')
  const sortedProjects = [...projects].sort(sortProjects)
  const spotlightProject = sortedProjects[0]
  const topUpdate = updates.at(-1)
  const activeProjects = sortedProjects.filter((item) => String(item.data.status || '').toLowerCase() === 'active')
  const highPriorityProjects = sortedProjects.filter((item) => String(item.data.priority || '').toLowerCase() === 'high')
  const immediateMoves = buildImmediateMoves(current, sortedProjects)

  app.innerHTML = `
    <div class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 opacity-60">
        <div class="absolute left-[-8rem] top-[-10rem] h-72 w-72 rounded-full bg-fire/12 blur-3xl"></div>
        <div class="absolute right-[-6rem] top-12 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"></div>
        <div class="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-amber-300/8 blur-3xl"></div>
      </div>

      <main class="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-5 px-4 pb-16 pt-5 sm:px-6 lg:px-8 lg:pb-24 lg:pt-8">
        <section class="glass-card overflow-hidden p-6 sm:p-8 lg:p-10">
          <div class="grid gap-8 lg:grid-cols-[1.35fr_0.8fr] lg:items-end">
            <div>
              <div class="mb-6 flex flex-wrap items-center gap-3">
                <span class="chip chip-warm">${dashboard.site.title}</span>
                <span class="chip">Owner · ${dashboard.site.owner}</span>
                <span class="chip">Mode · ${current.data.currentState}</span>
              </div>
              <p class="section-kicker">Operating board</p>
              <h1 class="max-w-[12ch] text-4xl font-semibold tracking-[-0.04em] text-copy sm:text-5xl lg:text-7xl">${dashboard.site.tagline}</h1>
              <p class="mt-5 max-w-3xl text-base leading-7 text-copy-soft sm:text-lg">${dashboard.site.description}</p>

              <div class="mt-8 grid gap-3 sm:grid-cols-3">
                <div class="rounded-3xl border border-fire/20 bg-fire-soft px-4 py-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Move next</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${(current.data.next && current.data.next[0]) || 'Choose the clearest next move and keep it visible.'}</p>
                </div>
                <div class="rounded-3xl border border-line bg-white/5 px-4 py-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Updated</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${formatRelativeOrAbsoluteDate(current.data.lastUpdated)}</p>
                </div>
                <div class="rounded-3xl border border-line bg-white/5 px-4 py-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Board posture</p>
                  <p class="mt-2 text-sm leading-6 text-copy">Clean, visual, and built to keep motion in sight.</p>
                </div>
              </div>
            </div>

            <div class="rounded-[30px] border border-line bg-panel-strong p-5 sm:p-6">
              <p class="section-kicker">Current focus</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${current.data.title}</h2>
              <p class="mt-3 text-sm leading-6 text-copy-soft">${current.content}</p>
              <ul class="list-dot mt-5 space-y-3 pl-5 text-sm leading-6 text-copy-soft">
                ${current.data.primaryFocus.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
        </section>

        <section class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div class="grid gap-4 sm:grid-cols-2">
            ${renderFocusCard('Now', current.data.primaryFocus, 'orange')}
            ${renderFocusCard('Next', current.data.next || [], 'default')}
            ${renderFocusCard('Blockers', current.data.blockers || [], 'warning')}
            ${renderFocusCard('Wins', current.data.wins || [], 'success')}
          </div>

          <aside class="glass-card p-5 sm:p-6">
            <p class="section-kicker">Spotlight</p>
            ${spotlightProject ? `
              <div class="rounded-[24px] border border-line bg-white/5 p-5">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <span class="chip chip-warm">${spotlightProject.data.status}</span>
                  <span class="text-xs uppercase tracking-[0.24em] text-copy-faint">${capitalize(spotlightProject.data.priority)} priority</span>
                </div>
                <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${spotlightProject.data.title}</h3>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${spotlightProject.data.summary}</p>
                <div class="mt-5 rounded-[22px] border border-fire/18 bg-fire-soft px-4 py-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Next move</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${spotlightProject.data.nextAction}</p>
                </div>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span class="chip">Area · ${humanizeToken(spotlightProject.data.area)}</span>
                  ${renderLinksInline(spotlightProject.data.links)}
                </div>
              </div>
            ` : '<p class="text-sm text-copy-soft">No spotlight project loaded yet.</p>'}

            ${topUpdate ? `
              <div class="mt-4 rounded-[24px] border border-line bg-black/10 p-5">
                <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Latest update</p>
                <h3 class="mt-3 text-lg font-semibold text-copy">${topUpdate.data.title}</h3>
                <p class="mt-2 text-sm text-copy-faint">${formatRelativeOrAbsoluteDate(topUpdate.data.date)} · ${topUpdate.data.kind}</p>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${topUpdate.content}</p>
              </div>
            ` : ''}
          </aside>
        </section>

        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          ${renderStatCard('Active projects', activeProjects.length, 'Projects in play right now.')}
          ${renderStatCard('High priority', highPriorityProjects.length, 'Projects demanding stronger attention.')}
          ${renderStatCard('Birthday radar', birthdays.summary?.upcomingCount ?? 0, 'People coming up on deck.')}
          ${renderStatCard('System status', dashboard.stats.status, 'Board is live and ready to steer from.')}
        </section>

        <section class="glass-card p-5 sm:p-6 lg:p-7">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p class="section-kicker">Decision lane</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">Immediate moves</h2>
              <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">The board should help the next move jump out. These are the clearest actions on deck right now.</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="chip chip-warm">${immediateMoves.length} moves loaded</span>
              <span class="chip">Command view</span>
            </div>
          </div>
          <div class="mt-6 grid gap-4 xl:grid-cols-3">
            ${immediateMoves.map(renderImmediateMoveCard).join('')}
          </div>
        </section>

        ${dashboard.sections?.showBirthdays ? renderBirthdaySection(birthdays) : ''}

        <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Projects</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">What’s in motion</h2>
              </div>
              <span class="chip">${sortedProjects.length} loaded</span>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              ${sortedProjects.map(renderProjectCard).join('')}
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <section class="stack-card">
              <p class="section-kicker">Goals</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">What this protects</h2>
              <div class="mt-5 space-y-4">
                ${goals.map(renderGoalCard).join('')}
              </div>
            </section>

            <section class="stack-card">
              <p class="section-kicker">Focus lanes</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Board lanes</h2>
              <div class="mt-5 grid gap-3">
                ${renderLaneCard('Systems', 'Dashboards, routing, structure, and visibility work that keeps everything easier to steer.')}
                ${renderLaneCard('Work', 'Business, marketing, creative builds, and experiments tied to output and momentum.')}
                ${renderLaneCard('Events', 'DJ prep, scheduling, paperwork, communication, and event-day readiness.')}
                ${renderLaneCard('Home & Family', 'Family coordination, recurring logistics, and the systems that reduce scramble.')}
              </div>
            </section>
          </div>
        </section>

        <section class="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <section class="stack-card">
            <p class="section-kicker">Areas</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Where the work lives</h2>
            <div class="mt-5 grid gap-4">
              ${areas.map(renderAreaCard).join('')}
            </div>
          </section>

          <section class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Updates</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Recent motion</h2>
              </div>
              <span class="chip">${updates.length} entries</span>
            </div>
            <div class="space-y-4">
              ${updates.slice().reverse().map(renderUpdateCard).join('')}
            </div>
          </section>
        </section>
      </main>
    </div>
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
    <article class="glass-card p-5 ${toneMap[tone] || toneMap.default}">
      <p class="section-kicker">${title}</p>
      <ul class="list-dot space-y-3 pl-5 text-sm leading-6 text-copy-soft">
        ${safeItems.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </article>
  `
}

function renderStatCard(label, value, helper) {
  return `
    <article class="stat-card">
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">${label}</p>
        <p class="mt-3 text-sm leading-6 text-copy-soft">${helper}</p>
      </div>
      <strong class="text-right text-3xl font-semibold tracking-[-0.04em] text-copy sm:text-4xl">${value}</strong>
    </article>
  `
}

function renderProjectCard(item) {
  return `
    <article class="rounded-[26px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${item.data.status}</p>
        <span class="chip">${capitalize(item.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-copy">${item.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${item.data.summary}</p>
      <div class="mt-5 rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Next move</p>
        <p class="mt-2 text-sm leading-6 text-copy">${item.data.nextAction}</p>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        <span class="chip">Area · ${humanizeToken(item.data.area)}</span>
        ${renderLinksInline(item.data.links)}
      </div>
    </article>
  `
}

function renderImmediateMoveCard(item) {
  return `
    <article class="rounded-[26px] border border-fire/18 bg-fire-soft p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${item.lane}</p>
        <span class="chip">${item.tag}</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-copy">${item.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${item.summary}</p>
      <div class="mt-5 rounded-[22px] border border-fire/16 bg-black/10 px-4 py-4">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Action</p>
        <p class="mt-2 text-sm leading-6 text-copy">${item.action}</p>
      </div>
    </article>
  `
}

function renderGoalCard(item) {
  return `
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${item.data.status}</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${item.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${item.data.summary}</p>
      <p class="mt-4 text-xs uppercase tracking-[0.22em] text-copy-faint">${item.data.horizon} · ${humanizeToken(item.data.area)}</p>
    </article>
  `
}

function renderAreaCard(item) {
  return `
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Area</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${item.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${item.data.summary}</p>
      ${item.content ? `<p class="mt-4 text-sm leading-6 text-copy-faint">${item.content}</p>` : ''}
    </article>
  `
}

function renderUpdateCard(item) {
  return `
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${formatRelativeOrAbsoluteDate(item.data.date)}</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${item.data.title}</h3>
      <p class="mt-2 text-xs uppercase tracking-[0.22em] text-copy-faint">${item.data.kind}</p>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${item.content}</p>
    </article>
  `
}

function renderLaneCard(title, text) {
  return `
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Lane</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${text}</p>
    </article>
  `
}

function renderBirthdaySection(birthdays = {}) {
  const upcoming = birthdays.upcoming || []
  const needsInfo = birthdays.needsInfo || []
  const lookaheadDays = birthdays.settings?.lookaheadDays || 30
  const title = birthdays.settings?.title || 'Upcoming Birthdays'
  const subtitle = birthdays.settings?.subtitle || 'People coming up soon and birthdays that still need details.'

  return `
    <section class="glass-card p-5 sm:p-6 lg:p-7">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">People lane</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">${title}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">${subtitle}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="chip chip-warm">${upcoming.length} in ${lookaheadDays} days</span>
          <span class="chip">${needsInfo.length} need info</span>
        </div>
      </div>

      <div class="mt-6 grid gap-4 xl:grid-cols-2">
        <article class="rounded-[26px] border border-fire/18 bg-fire-soft p-5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Coming up</p>
          <div class="mt-4 grid gap-3">
            ${upcoming.length ? upcoming.map(renderBirthdayItem).join('') : `<p class="text-sm leading-6 text-copy-soft">No fully dated birthdays land in the next ${lookaheadDays} days yet.</p>`}
          </div>
        </article>

        <article class="rounded-[26px] border border-line bg-white/[0.04] p-5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Needs info</p>
          <div class="mt-4 grid gap-3">
            ${needsInfo.length ? needsInfo.map(renderBirthdayNeedsInfoItem).join('') : '<p class="text-sm leading-6 text-copy-soft">Everything here has the basics filled in.</p>'}
          </div>
        </article>
      </div>
    </section>
  `
}

function renderBirthdayItem(item) {
  return `
    <article class="rounded-[22px] border border-fire/20 bg-black/10 p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-copy">${item.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${item.dateLabel}${item.relationship ? ` · ${humanizeToken(item.relationship)}` : ''}${item.notes ? ` · ${item.notes}` : ''}</p>
        </div>
        <div class="flex flex-wrap gap-2 sm:justify-end">
          <span class="chip chip-warm">${formatDaysAway(item.daysAway)}</span>
          ${item.age ? `<span class="chip">Turns ${item.age}</span>` : ''}
        </div>
      </div>
    </article>
  `
}

function renderBirthdayNeedsInfoItem(item) {
  return `
    <article class="rounded-[22px] border border-dashed border-line bg-black/10 p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-copy">${item.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${item.notes || 'Still needs a little detail before it is fully useful.'}</p>
        </div>
        <span class="chip">Missing ${item.missing.join(' + ')}</span>
      </div>
    </article>
  `
}

function renderLinksInline(links = {}) {
  const entries = Object.entries(links).filter(([, value]) => value)
  if (!entries.length) return ''

  return entries.map(([label, href]) => renderLink(label, href)).join('')
}

function buildImmediateMoves(current, projects = []) {
  const moves = []
  const nextItems = Array.isArray(current?.data?.next) ? current.data.next : []

  nextItems.slice(0, 2).forEach((item, index) => {
    moves.push({
      lane: index === 0 ? 'Right now' : 'On deck',
      tag: 'Board move',
      title: item,
      summary: 'Pulled from the live command deck so the homepage keeps the next move visible.',
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

function renderLink(label, href) {
  const safeLabel = humanizeToken(label)
  const isExternal = /^https?:\/\//i.test(href)

  if (isExternal) {
    return `<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${href}" target="_blank" rel="noreferrer">${safeLabel}</a>`
  }

  return `<span class="chip">${safeLabel}: ${href}</span>`
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

function formatDaysAway(daysAway) {
  if (daysAway === 0) return 'Today'
  if (daysAway === 1) return 'Tomorrow'
  return `${daysAway} days`
}

init()
