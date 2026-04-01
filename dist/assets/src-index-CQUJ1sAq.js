(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();async function E(){const t=await fetch("./generated/content.json").then(i=>i.json()),e=document.querySelector("#app"),s=_(t);function c(){const i=dt(window.location.hash);e.innerHTML=F(s,i),pt(e,s,i)}window.addEventListener("hashchange",c),c()}function _(t){const{dashboard:e,current:s,projects:c,goals:i,areas:a,updates:r,birthdays:n,gratitude:l,events:p,fitness:x}=t,m=[...c].sort(L),N=m[0]||null,B=r.at(-1)||null,A=m.filter(b=>String(b.data.status||"").toLowerCase()==="active"),T=m.filter(b=>String(b.data.priority||"").toLowerCase()==="high"),C=lt(s,m),D=ot(a,m),M=m.slice(0,4),U=r.slice().reverse().slice(0,4),v=nt(n),R=v.upcoming.slice(0,12),O=gt(l),I=wt(p),W=$t(x);return{dashboard:e,current:s,projects:c,goals:i,areas:a,updates:r,birthdays:n,gratitude:l,events:p,fitness:x,sortedProjects:m,spotlightProject:N,topUpdate:B,activeProjects:A,highPriorityProjects:T,immediateMoves:C,laneGroups:D,hotProjects:M,recentUpdates:U,birthdaysState:v,allRecentBirthdays:R,gratitudeCard:O,eventsCard:I,fitnessCard:W}}function F(t,e){const s=V(t,e);return`
    <div class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 opacity-60">
        <div class="absolute left-[-8rem] top-[-10rem] h-72 w-72 rounded-full bg-fire/12 blur-3xl"></div>
        <div class="absolute right-[-6rem] top-12 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"></div>
        <div class="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-amber-300/8 blur-3xl"></div>
      </div>

      <main class="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-4 px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24 lg:pt-6">
        ${G(t,e)}
        ${e.name==="home"?w(t):s}
      </main>
    </div>
  `}function G(t,e){return`
    <section class="glass-card overflow-hidden p-4 sm:p-5 lg:p-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div class="min-w-0">
          <div class="mb-3 flex flex-wrap items-center gap-2">
            <span class="chip chip-warm">${t.dashboard.site.title}</span>
            <span class="chip">Owner · ${t.dashboard.site.owner}</span>
            <span class="chip">Mode · ${t.current.data.currentState}</span>
          </div>
          <p class="section-kicker">Command deck</p>
          <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 class="max-w-[14ch] text-3xl font-semibold tracking-[-0.05em] text-copy sm:text-4xl lg:text-5xl">${t.dashboard.site.tagline}</h1>
              <p class="mt-3 max-w-3xl text-sm leading-6 text-copy-soft sm:text-base">${t.dashboard.site.description}</p>
            </div>
            <div class="rounded-[24px] border border-line bg-panel-strong px-4 py-4 lg:min-w-[320px]">
              <p class="micro-label text-fire">Current focus</p>
              <h2 class="mt-2 text-lg font-semibold text-copy">${t.current.data.title}</h2>
              <p class="mt-2 text-sm leading-6 text-copy-soft">${t.current.data.next&&t.current.data.next[0]||"Choose the clearest next move and keep it visible."}</p>
            </div>
          </div>
        </div>

        <nav class="grid gap-2 sm:grid-cols-2 xl:w-[360px]">
          ${h("#/","Overview",e.name==="home")}
          ${h("#/prompt","Daily prompt",e.name==="prompt")}
          ${h("#/birthdays","Birthdays",e.name==="birthdays")}
          ${h("#/projects","Projects",e.name==="projects"||e.name==="project")}
          ${h("#/updates","Updates",e.name==="updates")}
        </nav>
      </div>
    </section>
  `}function h(t,e,s=!1){return`<a class="nav-chip ${s?"nav-chip-active":""}" href="${t}">${e}</a>`}function w(t){var e;return`
    ${P(t.gratitudeCard)}

    <section class="grid gap-4 xl:grid-cols-[1fr_1fr]">
      ${ut(t.eventsCard)}
      ${bt(t.fitnessCard)}
    </section>

    <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <div class="stack-card compact-card">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="section-kicker">Immediate moves</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">What matters now</h2>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">One-page read. Click into any lane when you want the full picture.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="chip chip-warm">${t.immediateMoves.length} moves</span>
            <span class="chip">Updated ${y(t.current.data.lastUpdated)}</span>
          </div>
        </div>
        <div class="mt-4 grid gap-3 md:grid-cols-3">
          ${t.immediateMoves.map(tt).join("")}
        </div>
      </div>

      <aside class="stack-card compact-card">
        <p class="section-kicker">Board status</p>
        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          ${g("Active projects",t.activeProjects.length,"Projects in motion right now.")}
          ${g("High priority",t.highPriorityProjects.length,"Needs stronger attention.")}
          ${g("Birthday radar",((e=t.birthdays.summary)==null?void 0:e.upcomingCount)??0,"Upcoming birthdays loaded.")}
          ${g("System status",t.dashboard.stats.status,"Board is live and steerable.")}
        </div>
      </aside>
    </section>

    <section class="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      ${H(t)}
      ${K(t)}
    </section>

    <section class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      ${q(t)}
      ${J(t)}
    </section>

    <section class="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Operating lanes</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Where the work lives</h2>
          </div>
          <span class="chip">${t.laneGroups.length} lanes</span>
        </div>
        <div class="grid gap-3">
          ${t.laneGroups.map(at).join("")}
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
          ${u("Now",t.current.data.primaryFocus,"orange")}
          ${u("Next",t.current.data.next||[],"default")}
          ${u("Blockers",t.current.data.blockers||[],"warning")}
          ${u("Wins",t.current.data.wins||[],"success")}
        </div>
      </section>
    </section>
  `}function H(t){var i;const e=t.allRecentBirthdays.slice(0,4),s=e[0],c=(t.birthdaysState.byMonth.april||[]).length;return`
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
          <h3 class="mt-2 text-2xl font-semibold tracking-[-0.03em] text-copy">${s?s.name:"All clear"}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${s?`${s.dateLabel} · ${S(s.daysAway)} · ${s.relationship||"Contact"}`:"No birthdays loaded in the current lookahead."}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="chip chip-warm">${((i=t.birthdays.summary)==null?void 0:i.upcomingCount)??0} upcoming</span>
            <span class="chip">April · ${c}</span>
          </div>
        </article>

        <div class="grid gap-3 sm:grid-cols-2">
          ${e.map(a=>k(a,!0)).join("")}
        </div>
      </div>
    </section>
  `}function K(t){return`
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
        ${t.hotProjects.map((e,s)=>et(e,s+1)).join("")}
      </div>
    </section>
  `}function q(t){const e=t.spotlightProject;return`
    <section class="stack-card compact-card">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Spotlight</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Lead project</h2>
        </div>
        ${e?`<a class="chip chip-warm" href="#/projects/${e.data.slug}">Open detail</a>`:""}
      </div>
      ${e?`
        <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="chip chip-warm">${e.data.status}</span>
            <span class="chip">${d(e.data.priority)} priority</span>
            <span class="chip">${o(e.data.area)}</span>
          </div>
          <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${e.data.title}</h3>
          <p class="mt-3 text-sm leading-6 text-copy-soft">${e.data.summary}</p>
          <div class="mt-4 rounded-[20px] border border-fire/18 bg-fire-soft px-4 py-4">
            <p class="micro-label text-fire">Next move</p>
            <p class="mt-2 text-sm leading-6 text-copy">${e.data.nextAction}</p>
          </div>
        </article>
      `:'<p class="text-sm text-copy-soft">No spotlight project loaded yet.</p>'}
    </section>
  `}function J(t){return`
    <section class="stack-card compact-card">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Recent motion</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Updates feed</h2>
        </div>
        <a class="chip chip-warm" href="#/updates">Open feed</a>
      </div>
      <div class="grid gap-3">
        ${t.recentUpdates.map($).join("")}
      </div>
    </section>
  `}function V(t,e){return e.name==="prompt"?z(t):e.name==="birthdays"?Y(t,e):e.name==="projects"?Q(t):e.name==="project"?X(t,e.slug):e.name==="updates"?Z(t):w(t)}function z(t){return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Daily rhythm</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">Daily prompt</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">A clean direct view for today’s gratitude prompt without needing to scroll the whole dashboard.</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/">Back to overview</a>
        </div>
      </div>
    </section>

    ${P(t.gratitudeCard)}
  `}function Y(t,e){const s=e.month?d(e.month):null,c=e.month?t.birthdaysState.byMonth[e.month]||[]:[],i=t.birthdaysState.monthOrder.filter(a=>(t.birthdaysState.byMonth[a]||[]).length);return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Birthdays</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">${s?`${s} birthdays`:"Birthday command view"}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">${s?`Month detail for ${s}.`:"This is the deeper drill-down: month tabs, upcoming list, and profile hints."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/">Back to overview</a>
          ${i.map(a=>`<a class="chip ${e.month===a?"chip-warm":""}" href="#/birthdays/${a}">${d(a)}</a>`).join("")}
        </div>
      </div>
    </section>

    ${e.month?`
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Month detail</p>
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${s} list</h3>
          </div>
          <span class="chip chip-warm">${c.length} people</span>
        </div>
        <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          ${c.map(a=>ct(a)).join("")}
        </div>
      </section>
    `:`
      <section class="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
        <section class="stack-card compact-card">
          <div class="mb-4 flex items-end justify-between gap-4">
            <div>
              <p class="section-kicker">Upcoming</p>
              <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Next birthdays</h3>
            </div>
            <span class="chip chip-warm">${t.allRecentBirthdays.length} loaded</span>
          </div>
          <div class="grid gap-3">
            ${t.allRecentBirthdays.map(a=>k(a)).join("")}
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
            ${i.map(a=>it(a,t.birthdaysState.byMonth[a])).join("")}
          </div>
        </section>
      </section>
    `}
  `}function Q(t){return`
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
      ${t.sortedProjects.map(e=>rt(e)).join("")}
    </section>
  `}function X(t,e){const s=t.sortedProjects.find(i=>i.data.slug===e);if(!s)return`
      <section class="stack-card compact-card">
        <p class="section-kicker">Project</p>
        <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">Project not found</h2>
        <p class="mt-3 text-sm leading-6 text-copy-soft">That project route does not exist yet.</p>
        <div class="mt-4">
          <a class="chip chip-warm" href="#/projects">Back to projects</a>
        </div>
      </section>
    `;const c=t.updates.slice().reverse().filter(i=>{const a=`${i.data.title||""} ${i.content||""}`.toLowerCase();return a.includes((s.data.title||"").toLowerCase())||a.includes((e||"").replace(/-/g," "))}).slice(0,4);return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Project detail</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">${s.data.title}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">${s.data.summary}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/projects">Back to projects</a>
          ${Object.entries(s.data.links||{}).map(([i,a])=>mt(i,a)).join("")}
        </div>
      </div>
    </section>

    <section class="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
      <section class="stack-card compact-card">
        <div class="grid gap-3 sm:grid-cols-2">
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Status</p>
            <p class="mt-2 text-lg font-semibold text-copy">${s.data.status}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Priority</p>
            <p class="mt-2 text-lg font-semibold text-copy">${d(s.data.priority)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Area</p>
            <p class="mt-2 text-lg font-semibold text-copy">${o(s.data.area)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Updated</p>
            <p class="mt-2 text-lg font-semibold text-copy">${y(s.data.lastUpdated)}</p>
          </div>
        </div>

        <div class="mt-4 rounded-[24px] border border-fire/18 bg-fire-soft p-5">
          <p class="micro-label text-fire">Next build thought</p>
          <p class="mt-2 text-sm leading-6 text-copy">${s.data.nextAction}</p>
        </div>
      </section>

      <section class="stack-card compact-card">
        <p class="section-kicker">Why it exists</p>
        <div class="project-copy">${xt(s.content)}</div>
      </section>
    </section>

    <section class="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Recent motion</p>
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Related updates</h3>
          </div>
          <span class="chip chip-warm">${c.length} linked</span>
        </div>
        <div class="grid gap-3">
          ${c.length?c.map($).join(""):'<article class="rounded-[22px] border border-line bg-white/[0.04] p-4"><p class="text-sm leading-6 text-copy-soft">No linked updates yet. This page is ready for them.</p></article>'}
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
            <p class="mt-2 text-sm leading-6 text-copy-soft">This project lives in the ${o(s.data.area)} lane and is being tracked as ${s.data.status}.</p>
          </article>
          <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
            <p class="micro-label text-fire">Why it matters</p>
            <p class="mt-2 text-sm leading-6 text-copy-soft">The command deck should let Bryon scan the current state fast, then click in here for the deeper project picture without crowding the homepage.</p>
          </article>
        </div>
      </section>
    </section>
  `}function Z(t){return`
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
      ${t.updates.slice().reverse().map(st).join("")}
    </section>
  `}function tt(t){return`
    <article class="rounded-[24px] border border-fire/18 bg-fire-soft p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${t.lane}</p>
        <span class="chip">${t.tag}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold tracking-[-0.03em] text-copy">${t.title}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${t.action}</p>
    </article>
  `}function g(t,e,s){return`
    <article class="stat-card compact-stat-card">
      <div>
        <p class="micro-label text-copy-faint">${t}</p>
        <p class="mt-2 text-sm leading-6 text-copy-soft">${s}</p>
      </div>
      <strong class="text-right text-2xl font-semibold tracking-[-0.04em] text-copy sm:text-3xl">${e}</strong>
    </article>
  `}function et(t,e){return`
    <a class="project-row" href="#/projects/${t.data.slug}">
      <div class="project-row-rank">${e}</div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="chip chip-warm">${t.data.status}</span>
          <span class="chip">${d(t.data.priority)} priority</span>
          <span class="chip">${o(t.data.area)}</span>
        </div>
        <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
        <p class="mt-2 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
        <p class="mt-3 text-sm leading-6 text-copy"><span class="text-copy-faint">Next:</span> ${t.data.nextAction}</p>
      </div>
      <div class="project-row-arrow">↗</div>
    </a>
  `}function $(t){return`
    <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${y(t.data.date)}</p>
        <span class="chip">${t.data.kind}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${t.content}</p>
    </article>
  `}function st(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${y(t.data.date)}</p>
          <h3 class="mt-3 text-xl font-semibold text-copy">${t.data.title}</h3>
        </div>
        <span class="chip chip-warm">${t.data.kind}</span>
      </div>
      <p class="mt-3 text-sm leading-7 text-copy-soft">${t.content}</p>
    </article>
  `}function u(t,e=[],s="default"){const c=e.length?e:["Nothing loaded yet."],i={orange:"border-fire/25 bg-fire-soft",warning:"border-amber-400/20 bg-amber-400/10",success:"border-emerald-400/20 bg-emerald-400/10",default:"border-line bg-white/5"};return`
    <article class="glass-card p-4 ${i[s]||i.default}">
      <p class="section-kicker">${t}</p>
      <ul class="list-dot space-y-2 pl-5 text-sm leading-6 text-copy-soft">
        ${c.map(a=>`<li>${a}</li>`).join("")}
      </ul>
    </article>
  `}function at(t){return`
    <article class="lane-card compact-lane-card">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${t.label}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${t.title}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.summary}</p>
        </div>
        <span class="chip chip-warm">${t.projects.length}</span>
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        ${t.projects.length?t.projects.map(e=>`<a class="chip" href="#/projects/${e.data.slug}">${e.data.title}</a>`).join(""):'<span class="chip">No active projects</span>'}
      </div>
    </article>
  `}function k(t,e=!1){return`
    <a class="birthday-week-item ${e?"birthday-week-item-compact":""}" href="#/birthdays/${j(t.dateLabel)}">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${S(t.daysAway)}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${t.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${[t.relationship,t.category].filter(Boolean).join(" · ")}</p>
        </div>
        <span class="chip chip-warm">${t.dateLabel}</span>
      </div>
      ${t.interests||t.profile||t.leadTime?`<p class="mt-3 text-sm leading-6 text-copy-faint">${[t.leadTime?`Prep: ${t.leadTime}`:"",t.interests?`Likes: ${t.interests}`:"",t.profile].filter(Boolean).join(" · ")}</p>`:""}
    </a>
  `}function it(t,e=[]){var c;const s=((c=e[0])==null?void 0:c.name)||"No one loaded";return`
    <a class="month-card" href="#/birthdays/${t}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">Month</p>
          <h3 class="mt-2 text-xl font-semibold text-copy">${d(t)}</h3>
        </div>
        <span class="chip chip-warm">${e.length}</span>
      </div>
      <p class="mt-3 text-sm leading-6 text-copy-soft">Next listed: ${s}</p>
    </a>
  `}function ct(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${t.dateLabel}</p>
        <span class="chip chip-warm">${t.category||"Birthday"}</span>
      </div>
      <h3 class="mt-3 text-xl font-semibold text-copy">${t.name}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${t.relationship||"Contact"}</p>
      <div class="mt-4 space-y-2 text-sm leading-6 text-copy-faint">
        ${t.profile?`<p><span class="text-copy">Profile:</span> ${t.profile}</p>`:""}
        ${t.interests?`<p><span class="text-copy">Interests:</span> ${t.interests}</p>`:""}
        ${t.leadTime?`<p><span class="text-copy">Prep:</span> ${t.leadTime}</p>`:""}
      </div>
    </article>
  `}function rt(t){return`
    <a class="rounded-[26px] border border-line bg-white/[0.04] p-5 transition duration-150 hover:border-fire/25 hover:bg-fire-soft" href="#/projects/${t.data.slug}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="chip chip-warm">${t.data.status}</span>
        <span class="chip">${d(t.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      <div class="mt-4 rounded-[20px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="micro-label text-copy-faint">Current status</p>
        <p class="mt-2 text-sm leading-6 text-copy">${t.data.nextAction}</p>
      </div>
      <p class="mt-4 text-sm text-fire">Open project detail →</p>
    </a>
  `}function lt(t,e=[]){var i;const s=[];return(Array.isArray((i=t==null?void 0:t.data)==null?void 0:i.next)?t.data.next:[]).slice(0,2).forEach((a,r)=>{s.push({lane:r===0?"Right now":"On deck",tag:"Board move",title:a,summary:"Pulled from the live command deck.",action:a})}),e.filter(a=>String(a.data.priority||"").toLowerCase()==="high").slice(0,2).forEach(a=>{s.push({lane:o(a.data.area||"project"),tag:`${d(a.data.priority||"active")} priority`,title:a.data.title,summary:a.data.summary,action:a.data.nextAction})}),s.slice(0,3)}function ot(t=[],e=[]){return t.map(s=>({label:"Lane",title:s.data.title,summary:s.data.summary,slug:s.data.slug,projects:e.filter(c=>c.data.area===s.data.slug).sort(L).slice(0,3)})).sort((s,c)=>c.projects.length-s.projects.length||s.title.localeCompare(c.title))}function nt(t={}){const e=Array.isArray(t.upcoming)?t.upcoming.slice().sort((i,a)=>i.daysAway-a.daysAway||i.name.localeCompare(a.name)):[],s={};return e.forEach(i=>{const a=j(i.dateLabel);s[a]||(s[a]=[]),s[a].push(i)}),{upcoming:e,byMonth:s,monthOrder:["january","february","march","april","may","june","july","august","september","october","november","december"]}}function pt(t,e,s){if(s.name==="home"){const c=t.querySelector("[data-home-scroll]");c&&c.scrollIntoView({block:"start"})}}function dt(t){const s=(String(t||"#/").replace(/^#/,"")||"/").split("/").filter(Boolean);return s.length?s[0]==="prompt"?{name:"prompt"}:s[0]==="birthdays"&&s[1]?{name:"birthdays",month:s[1].toLowerCase()}:s[0]==="birthdays"?{name:"birthdays"}:s[0]==="projects"&&s[1]?{name:"project",slug:s[1]}:s[0]==="projects"?{name:"projects"}:s[0]==="updates"?{name:"updates"}:{name:"home"}:{name:"home"}}function mt(t,e){const s=o(t);return/^https?:\/\//i.test(e)?`<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${e}" target="_blank" rel="noreferrer">${s}</a>`:`<span class="chip">${s}: ${e}</span>`}function xt(t=""){return t.split(/\n\n+/).map(e=>{const s=e.split(`
`).map(c=>c.trim()).filter(Boolean);if(!s.length)return"";if(s.every(c=>c.startsWith("- ")))return`<ul class="list-dot space-y-2 pl-5 text-sm leading-7 text-copy-soft">${s.map(c=>`<li>${c.replace(/^-\s*/,"")}</li>`).join("")}</ul>`;if(s[0].startsWith("## ")){const c=s[0].replace(/^##\s*/,""),i=s.slice(1).join(" ");return`<div class="space-y-2"><h3 class="text-lg font-semibold text-copy">${c}</h3>${i?`<p class="text-sm leading-7 text-copy-soft">${i}</p>`:""}</div>`}return`<p class="text-sm leading-7 text-copy-soft">${s.join(" ")}</p>`}).join("")}function j(t=""){return String(t).split(" ")[0].toLowerCase()}function o(t=""){return t.replace(/[-_]/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function d(t=""){return t?t.charAt(0).toUpperCase()+t.slice(1):""}function L(t,e){const s={high:0,medium:1,low:2},c={active:0,queued:1,blocked:2,paused:3,idea:4,complete:5};return(s[String(t.data.priority||"").toLowerCase()]??9)-(s[String(e.data.priority||"").toLowerCase()]??9)||(c[String(t.data.status||"").toLowerCase()]??9)-(c[String(e.data.status||"").toLowerCase()]??9)||t.data.title.localeCompare(e.data.title)}function ht(t){if(typeof t=="string"){const e=t.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(e){const[,s,c,i]=e;return new Date(Number(s),Number(c)-1,Number(i))}}return new Date(t)}function f(t){const e=ht(t);return Number.isNaN(e.getTime())?t:e.toLocaleDateString("en-US",{month:"short",day:"numeric"})}function y(t){const e=new Date(t);if(Number.isNaN(e.getTime()))return t;const s=new Date,c=new Date(s.getFullYear(),s.getMonth(),s.getDate()),i=new Date(e.getFullYear(),e.getMonth(),e.getDate()),a=Math.round((c-i)/864e5);return a===0?"today":a===1?"yesterday":e.toLocaleDateString("en-US",{month:"short",day:"numeric"})}function S(t){return t===0?"Today":t===1?"Tomorrow":`${t} days`}E();function P(t={}){const e=Array.isArray(t.history)?t.history:[];return`
    <section class="glass-card p-5 sm:p-6 lg:p-7">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Daily rhythm</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">${t.title||"Daily gratitude"}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">${t.subtitle||"Keep today's prompt visible even when you answer it later."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="chip chip-warm">${t.statusLabel||"Pending"}</span>
          ${t.entryId?`<span class="chip">${t.entryId}</span>`:""}
          ${t.dateLabel?`<span class="chip">${t.dateLabel}</span>`:""}
        </div>
      </div>

      <div class="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <article class="birthday-widget-hero compact-hero">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="micro-label text-fire">Today's prompt</p>
            <span class="chip">${t.sourceLabel||"Telegram + dashboard"}</span>
          </div>
          <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${t.promptTitle||"Ready when you are"}</h3>
          <p class="mt-4 text-base leading-8 text-copy">${t.prompt||"No prompt loaded yet."}</p>

          <div class="mt-5 rounded-[22px] border border-fire/18 bg-black/10 p-4">
            <p class="micro-label text-fire">Use case</p>
            <p class="mt-2 text-sm leading-6 text-copy-soft">${t.note||"Check it in the morning from Telegram or knock it out later from the dashboard."}</p>
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <div class="detail-stat">
              <p class="micro-label text-copy-faint">Status</p>
              <p class="mt-2 text-sm leading-6 text-copy">${t.statusDetail||"Pending reply"}</p>
            </div>
            <div class="detail-stat">
              <p class="micro-label text-copy-faint">Availability</p>
              <p class="mt-2 text-sm leading-6 text-copy">${t.windowLabel||"Morning to evening"}</p>
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
              <span class="chip">${e.length} loaded</span>
            </div>
            <div class="mt-4 space-y-3">
              ${e.length?e.map(ft).join(""):'<p class="text-sm leading-6 text-copy-soft">No recent gratitude history loaded yet.</p>'}
            </div>
          </article>
        </div>
      </div>
    </section>
  `}function ft(t){return`
    <article class="birthday-week-item birthday-week-item-compact">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${t.dateLabel||t.date||""}</p>
          <h4 class="mt-2 text-base font-semibold text-copy">${t.statusLabel||"Completed"}</h4>
        </div>
        ${t.entryId?`<span class="chip chip-warm">${t.entryId}</span>`:""}
      </div>
      ${t.responseSummary?`<p class="mt-3 text-sm leading-6 text-copy-soft">${t.responseSummary}</p>`:""}
    </article>
  `}function gt(t={}){var a,r,n;const e=t.today||{},s=Number(((a=t.settings)==null?void 0:a.showHistoryCount)||3),c=Array.isArray(t.history)?t.history.slice(0,s):[],i=String(e.status||"pending").toLowerCase();return{title:((r=t.settings)==null?void 0:r.title)||"Daily gratitude",subtitle:((n=t.settings)==null?void 0:n.subtitle)||"Keep today's prompt visible even when you answer it later at night.",promptTitle:i==="completed"?"Today's reflection is in":"Tonight's prompt is waiting",prompt:e.prompt,entryId:e.entryId,dateLabel:f(e.date),sourceLabel:e.source||"Telegram + dashboard",note:e.note,statusLabel:i==="completed"?"Completed":"Pending",statusDetail:i==="completed"?e.completedLabel||"Answered and logged.":"Visible here until you knock it out.",windowLabel:o(String(e.availableWindow||"morning-to-evening")),history:c.map(l=>({...l,dateLabel:f(l.date),statusLabel:String(l.status||"").toLowerCase()==="completed"?"Completed":d(l.status||"pending")}))}}function ut(t={}){const e=Array.isArray(t.upcoming)?t.upcoming:[];return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="section-kicker">Events & DJ</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${t.title||"Event lane"}</h2>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.subtitle||"Upcoming event prep and booked-work visibility."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${t.statusLabel?`<span class="chip chip-warm">${t.statusLabel}</span>`:""}
          ${t.seasonLabel?`<span class="chip">${t.seasonLabel}</span>`:""}
        </div>
      </div>

      <div class="mt-4 grid gap-3">
        ${t.nextMove?`
          <article class="rounded-[22px] border border-fire/18 bg-fire-soft p-4">
            <p class="micro-label text-fire">Lane note</p>
            <p class="mt-2 text-sm leading-6 text-copy">${t.nextMove}</p>
          </article>
        `:""}
        ${e.length?e.map(yt).join(""):'<article class="rounded-[22px] border border-line bg-white/[0.04] p-4"><p class="text-sm leading-6 text-copy-soft">No upcoming events loaded yet.</p></article>'}
      </div>
    </section>
  `}function yt(t){return`
    <article class="phase-lane-item">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${t.dateLabel||""}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${t.title||"Upcoming event"}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${[t.type,t.location].filter(Boolean).join(" · ")}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${t.statusLabel?`<span class="chip chip-warm">${t.statusLabel}</span>`:""}
          ${t.prepStageLabel?`<span class="chip">${t.prepStageLabel}</span>`:""}
        </div>
      </div>
      ${t.nextMove?`<p class="mt-3 text-sm leading-6 text-copy"><span class="text-copy-faint">Next:</span> ${t.nextMove}</p>`:""}
      ${t.note?`<p class="mt-2 text-sm leading-6 text-copy-faint">${t.note}</p>`:""}
    </article>
  `}function bt(t={}){const e=Array.isArray(t.recent)?t.recent:[];return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="section-kicker">Personal lane</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${t.title||"Workout lane"}</h2>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.subtitle||"Training momentum, consistency, and the next session."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${t.statusLabel?`<span class="chip chip-warm">${t.statusLabel}</span>`:""}
          ${t.streakLabel?`<span class="chip">${t.streakLabel}</span>`:""}
        </div>
      </div>

      <div class="mt-4 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <article class="birthday-widget-hero compact-hero">
          <p class="micro-label text-fire">Next session</p>
          <h3 class="mt-3 text-xl font-semibold tracking-[-0.03em] text-copy">${t.nextTitle||"Keep moving"}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${[t.nextWindow,t.nextDateLabel].filter(Boolean).join(" · ")}</p>
          ${t.nextGoal?`<p class="mt-4 text-sm leading-6 text-copy">${t.nextGoal}</p>`:""}
          ${t.nextMove?`<div class="mt-4 rounded-[20px] border border-fire/18 bg-black/10 px-4 py-4"><p class="micro-label text-fire">Next move</p><p class="mt-2 text-sm leading-6 text-copy-soft">${t.nextMove}</p></div>`:""}
        </article>

        <div class="grid gap-3">
          <article class="lane-card compact-lane-card">
            <p class="micro-label text-fire">Why this lane matters</p>
            <p class="mt-3 text-sm leading-6 text-copy-soft">${t.note||"Keep the body in the operating picture so momentum stays real instead of abstract."}</p>
          </article>

          <article class="lane-card compact-lane-card">
            <div class="flex items-end justify-between gap-3">
              <div>
                <p class="micro-label text-fire">Recent sessions</p>
                <h3 class="mt-3 text-lg font-semibold text-copy">Consistency trail</h3>
              </div>
              <span class="chip">${e.length} loaded</span>
            </div>
            <div class="mt-4 space-y-3">
              ${e.length?e.map(vt).join(""):'<p class="text-sm leading-6 text-copy-soft">No recent workouts loaded yet.</p>'}
            </div>
          </article>
        </div>
      </div>
    </section>
  `}function vt(t){return`
    <article class="phase-lane-item phase-lane-item-compact">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${t.dateLabel||""}</p>
          <h4 class="mt-2 text-base font-semibold text-copy">${t.title||"Session"}</h4>
        </div>
        ${t.typeLabel?`<span class="chip chip-warm">${t.typeLabel}</span>`:""}
      </div>
      ${t.note?`<p class="mt-3 text-sm leading-6 text-copy-soft">${t.note}</p>`:""}
    </article>
  `}function wt(t={}){var c,i,a,r,n,l;const e=Number(((c=t.settings)==null?void 0:c.showUpcomingCount)||3),s=Array.isArray(t.upcoming)?t.upcoming.slice(0,e):[];return{title:((i=t.settings)==null?void 0:i.title)||"Event lane",subtitle:((a=t.settings)==null?void 0:a.subtitle)||"Upcoming DJ work, prep pressure, and the next thing that needs attention before go time.",statusLabel:o(String(((r=t.summary)==null?void 0:r.status)||"active")),seasonLabel:(n=t.summary)==null?void 0:n.season,nextMove:(l=t.summary)==null?void 0:l.note,upcoming:s.map(p=>({...p,dateLabel:f(p.date),statusLabel:o(String(p.status||"booked")),prepStageLabel:o(String(p.prepStage||"prep"))}))}}function $t(t={}){var i,a,r,n,l,p;const e=Number(((i=t.settings)==null?void 0:i.showRecentCount)||3),s=Array.isArray(t.recent)?t.recent.slice(0,e):[],c=t.nextSession||{};return{title:((a=t.settings)==null?void 0:a.title)||"Workout lane",subtitle:((r=t.settings)==null?void 0:r.subtitle)||"Training momentum, consistency streak, and the next session that keeps the body moving.",statusLabel:o(String(((n=t.summary)==null?void 0:n.status)||"active")),streakLabel:(l=t.summary)==null?void 0:l.streakLabel,note:(p=t.summary)==null?void 0:p.note,nextTitle:c.title,nextWindow:c.window,nextDateLabel:f(c.targetDate),nextGoal:c.goal,nextMove:c.nextMove,recent:s.map(x=>({...x,dateLabel:f(x.date),typeLabel:o(String(x.type||"session"))}))}}
