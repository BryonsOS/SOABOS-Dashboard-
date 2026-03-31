(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();async function U(){const e=await fetch("./generated/content.json").then(i=>i.json()),t=document.querySelector("#app"),s=O(e);function c(){const i=ie(window.location.hash);t.innerHTML=R(s,i),ae(t,s,i)}window.addEventListener("hashchange",c),c()}function O(e){const{dashboard:t,current:s,projects:c,goals:i,areas:a,updates:r,birthdays:p,gratitude:o}=e,n=[...c].sort($),j=n[0]||null,L=r.at(-1)||null,C=n.filter(g=>String(g.data.status||"").toLowerCase()==="active"),P=n.filter(g=>String(g.data.priority||"").toLowerCase()==="high"),S=ee(s,n),B=te(a,n),T=n.slice(0,4),N=r.slice().reverse().slice(0,4),u=se(p),A=u.upcoming.slice(0,12),M=ne(o);return{dashboard:t,current:s,projects:c,goals:i,areas:a,updates:r,birthdays:p,gratitude:o,sortedProjects:n,spotlightProject:j,topUpdate:L,activeProjects:C,highPriorityProjects:P,immediateMoves:S,laneGroups:B,hotProjects:T,recentUpdates:N,birthdaysState:u,allRecentBirthdays:A,gratitudeCard:M}}function R(e,t){const s=G(e,t);return`
    <div class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 opacity-60">
        <div class="absolute left-[-8rem] top-[-10rem] h-72 w-72 rounded-full bg-fire/12 blur-3xl"></div>
        <div class="absolute right-[-6rem] top-12 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"></div>
        <div class="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-amber-300/8 blur-3xl"></div>
      </div>

      <main class="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-4 px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24 lg:pt-6">
        ${D(e,t)}
        ${t.name==="home"?y(e):s}
      </main>
    </div>
  `}function D(e,t){return`
    <section class="glass-card overflow-hidden p-4 sm:p-5 lg:p-6">
      <div class="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div class="min-w-0">
          <div class="mb-3 flex flex-wrap items-center gap-2">
            <span class="chip chip-warm">${e.dashboard.site.title}</span>
            <span class="chip">Owner · ${e.dashboard.site.owner}</span>
            <span class="chip">Mode · ${e.current.data.currentState}</span>
          </div>
          <p class="section-kicker">Command deck</p>
          <div class="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 class="max-w-[14ch] text-3xl font-semibold tracking-[-0.05em] text-copy sm:text-4xl lg:text-5xl">${e.dashboard.site.tagline}</h1>
              <p class="mt-3 max-w-3xl text-sm leading-6 text-copy-soft sm:text-base">${e.dashboard.site.description}</p>
            </div>
            <div class="rounded-[24px] border border-line bg-panel-strong px-4 py-4 lg:min-w-[320px]">
              <p class="micro-label text-fire">Current focus</p>
              <h2 class="mt-2 text-lg font-semibold text-copy">${e.current.data.title}</h2>
              <p class="mt-2 text-sm leading-6 text-copy-soft">${e.current.data.next&&e.current.data.next[0]||"Choose the clearest next move and keep it visible."}</p>
            </div>
          </div>
        </div>

        <nav class="grid gap-2 sm:grid-cols-2 xl:w-[360px]">
          ${m("#/","Overview",t.name==="home")}
          ${m("#/birthdays","Birthdays",t.name==="birthdays")}
          ${m("#/projects","Projects",t.name==="projects"||t.name==="project")}
          ${m("#/updates","Updates",t.name==="updates")}
        </nav>
      </div>
    </section>
  `}function m(e,t,s=!1){return`<a class="nav-chip ${s?"nav-chip-active":""}" href="${e}">${t}</a>`}function y(e){var t;return`
    ${le(e.gratitudeCard)}

    <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
      <div class="stack-card compact-card">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p class="section-kicker">Immediate moves</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">What matters now</h2>
            <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">One-page read. Click into any lane when you want the full picture.</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="chip chip-warm">${e.immediateMoves.length} moves</span>
            <span class="chip">Updated ${x(e.current.data.lastUpdated)}</span>
          </div>
        </div>
        <div class="mt-4 grid gap-3 md:grid-cols-3">
          ${e.immediateMoves.map(V).join("")}
        </div>
      </div>

      <aside class="stack-card compact-card">
        <p class="section-kicker">Board status</p>
        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          ${f("Active projects",e.activeProjects.length,"Projects in motion right now.")}
          ${f("High priority",e.highPriorityProjects.length,"Needs stronger attention.")}
          ${f("Birthday radar",((t=e.birthdays.summary)==null?void 0:t.upcomingCount)??0,"Upcoming birthdays loaded.")}
          ${f("System status",e.dashboard.stats.status,"Board is live and steerable.")}
        </div>
      </aside>
    </section>

    <section class="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      ${I(e)}
      ${W(e)}
    </section>

    <section class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      ${_(e)}
      ${F(e)}
    </section>

    <section class="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Operating lanes</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Where the work lives</h2>
          </div>
          <span class="chip">${e.laneGroups.length} lanes</span>
        </div>
        <div class="grid gap-3">
          ${e.laneGroups.map(J).join("")}
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
          ${h("Now",e.current.data.primaryFocus,"orange")}
          ${h("Next",e.current.data.next||[],"default")}
          ${h("Blockers",e.current.data.blockers||[],"warning")}
          ${h("Wins",e.current.data.wins||[],"success")}
        </div>
      </section>
    </section>
  `}function I(e){var i;const t=e.allRecentBirthdays.slice(0,4),s=t[0],c=(e.birthdaysState.byMonth.april||[]).length;return`
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
          <p class="mt-2 text-sm leading-6 text-copy-soft">${s?`${s.dateLabel} · ${k(s.daysAway)} · ${s.relationship||"Contact"}`:"No birthdays loaded in the current lookahead."}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="chip chip-warm">${((i=e.birthdays.summary)==null?void 0:i.upcomingCount)??0} upcoming</span>
            <span class="chip">April · ${c}</span>
          </div>
        </article>

        <div class="grid gap-3 sm:grid-cols-2">
          ${t.map(a=>v(a,!0)).join("")}
        </div>
      </div>
    </section>
  `}function W(e){return`
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
        ${e.hotProjects.map((t,s)=>z(t,s+1)).join("")}
      </div>
    </section>
  `}function _(e){const t=e.spotlightProject;return`
    <section class="stack-card compact-card">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Spotlight</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Lead project</h2>
        </div>
        ${t?`<a class="chip chip-warm" href="#/projects/${t.data.slug}">Open detail</a>`:""}
      </div>
      ${t?`
        <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
          <div class="flex flex-wrap items-center gap-2">
            <span class="chip chip-warm">${t.data.status}</span>
            <span class="chip">${l(t.data.priority)} priority</span>
            <span class="chip">${d(t.data.area)}</span>
          </div>
          <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${t.data.title}</h3>
          <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
          <div class="mt-4 rounded-[20px] border border-fire/18 bg-fire-soft px-4 py-4">
            <p class="micro-label text-fire">Next move</p>
            <p class="mt-2 text-sm leading-6 text-copy">${t.data.nextAction}</p>
          </div>
        </article>
      `:'<p class="text-sm text-copy-soft">No spotlight project loaded yet.</p>'}
    </section>
  `}function F(e){return`
    <section class="stack-card compact-card">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Recent motion</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Updates feed</h2>
        </div>
        <a class="chip chip-warm" href="#/updates">Open feed</a>
      </div>
      <div class="grid gap-3">
        ${e.recentUpdates.map(b).join("")}
      </div>
    </section>
  `}function G(e,t){return t.name==="birthdays"?E(e,t):t.name==="projects"?H(e):t.name==="project"?q(e,t.slug):t.name==="updates"?K(e):y(e)}function E(e,t){const s=t.month?l(t.month):null,c=t.month?e.birthdaysState.byMonth[t.month]||[]:[],i=e.birthdaysState.monthOrder.filter(a=>(e.birthdaysState.byMonth[a]||[]).length);return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Birthdays</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">${s?`${s} birthdays`:"Birthday command view"}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">${s?`Month detail for ${s}.`:"This is the deeper drill-down: month tabs, upcoming list, and profile hints."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/">Back to overview</a>
          ${i.map(a=>`<a class="chip ${t.month===a?"chip-warm":""}" href="#/birthdays/${a}">${l(a)}</a>`).join("")}
        </div>
      </div>
    </section>

    ${t.month?`
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Month detail</p>
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${s} list</h3>
          </div>
          <span class="chip chip-warm">${c.length} people</span>
        </div>
        <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          ${c.map(a=>X(a)).join("")}
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
            <span class="chip chip-warm">${e.allRecentBirthdays.length} loaded</span>
          </div>
          <div class="grid gap-3">
            ${e.allRecentBirthdays.map(a=>v(a)).join("")}
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
            ${i.map(a=>Q(a,e.birthdaysState.byMonth[a])).join("")}
          </div>
        </section>
      </section>
    `}
  `}function H(e){return`
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
      ${e.sortedProjects.map(t=>Z(t)).join("")}
    </section>
  `}function q(e,t){const s=e.sortedProjects.find(i=>i.data.slug===t);if(!s)return`
      <section class="stack-card compact-card">
        <p class="section-kicker">Project</p>
        <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">Project not found</h2>
        <p class="mt-3 text-sm leading-6 text-copy-soft">That project route does not exist yet.</p>
        <div class="mt-4">
          <a class="chip chip-warm" href="#/projects">Back to projects</a>
        </div>
      </section>
    `;const c=e.updates.slice().reverse().filter(i=>{const a=`${i.data.title||""} ${i.content||""}`.toLowerCase();return a.includes((s.data.title||"").toLowerCase())||a.includes((t||"").replace(/-/g," "))}).slice(0,4);return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Project detail</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">${s.data.title}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">${s.data.summary}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/projects">Back to projects</a>
          ${Object.entries(s.data.links||{}).map(([i,a])=>ce(i,a)).join("")}
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
            <p class="mt-2 text-lg font-semibold text-copy">${l(s.data.priority)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Area</p>
            <p class="mt-2 text-lg font-semibold text-copy">${d(s.data.area)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Updated</p>
            <p class="mt-2 text-lg font-semibold text-copy">${x(s.data.lastUpdated)}</p>
          </div>
        </div>

        <div class="mt-4 rounded-[24px] border border-fire/18 bg-fire-soft p-5">
          <p class="micro-label text-fire">Next build thought</p>
          <p class="mt-2 text-sm leading-6 text-copy">${s.data.nextAction}</p>
        </div>
      </section>

      <section class="stack-card compact-card">
        <p class="section-kicker">Why it exists</p>
        <div class="project-copy">${re(s.content)}</div>
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
          ${c.length?c.map(b).join(""):'<article class="rounded-[22px] border border-line bg-white/[0.04] p-4"><p class="text-sm leading-6 text-copy-soft">No linked updates yet. This page is ready for them.</p></article>'}
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
            <p class="mt-2 text-sm leading-6 text-copy-soft">This project lives in the ${d(s.data.area)} lane and is being tracked as ${s.data.status}.</p>
          </article>
          <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
            <p class="micro-label text-fire">Why it matters</p>
            <p class="mt-2 text-sm leading-6 text-copy-soft">The command deck should let Bryon scan the current state fast, then click in here for the deeper project picture without crowding the homepage.</p>
          </article>
        </div>
      </section>
    </section>
  `}function K(e){return`
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
      ${e.updates.slice().reverse().map(Y).join("")}
    </section>
  `}function V(e){return`
    <article class="rounded-[24px] border border-fire/18 bg-fire-soft p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${e.lane}</p>
        <span class="chip">${e.tag}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold tracking-[-0.03em] text-copy">${e.title}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${e.action}</p>
    </article>
  `}function f(e,t,s){return`
    <article class="stat-card compact-stat-card">
      <div>
        <p class="micro-label text-copy-faint">${e}</p>
        <p class="mt-2 text-sm leading-6 text-copy-soft">${s}</p>
      </div>
      <strong class="text-right text-2xl font-semibold tracking-[-0.04em] text-copy sm:text-3xl">${t}</strong>
    </article>
  `}function z(e,t){return`
    <a class="project-row" href="#/projects/${e.data.slug}">
      <div class="project-row-rank">${t}</div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="chip chip-warm">${e.data.status}</span>
          <span class="chip">${l(e.data.priority)} priority</span>
          <span class="chip">${d(e.data.area)}</span>
        </div>
        <h3 class="mt-3 text-lg font-semibold text-copy">${e.data.title}</h3>
        <p class="mt-2 text-sm leading-6 text-copy-soft">${e.data.summary}</p>
        <p class="mt-3 text-sm leading-6 text-copy"><span class="text-copy-faint">Next:</span> ${e.data.nextAction}</p>
      </div>
      <div class="project-row-arrow">↗</div>
    </a>
  `}function b(e){return`
    <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${x(e.data.date)}</p>
        <span class="chip">${e.data.kind}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold text-copy">${e.data.title}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${e.content}</p>
    </article>
  `}function Y(e){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${x(e.data.date)}</p>
          <h3 class="mt-3 text-xl font-semibold text-copy">${e.data.title}</h3>
        </div>
        <span class="chip chip-warm">${e.data.kind}</span>
      </div>
      <p class="mt-3 text-sm leading-7 text-copy-soft">${e.content}</p>
    </article>
  `}function h(e,t=[],s="default"){const c=t.length?t:["Nothing loaded yet."],i={orange:"border-fire/25 bg-fire-soft",warning:"border-amber-400/20 bg-amber-400/10",success:"border-emerald-400/20 bg-emerald-400/10",default:"border-line bg-white/5"};return`
    <article class="glass-card p-4 ${i[s]||i.default}">
      <p class="section-kicker">${e}</p>
      <ul class="list-dot space-y-2 pl-5 text-sm leading-6 text-copy-soft">
        ${c.map(a=>`<li>${a}</li>`).join("")}
      </ul>
    </article>
  `}function J(e){return`
    <article class="lane-card compact-lane-card">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${e.label}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${e.title}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${e.summary}</p>
        </div>
        <span class="chip chip-warm">${e.projects.length}</span>
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        ${e.projects.length?e.projects.map(t=>`<a class="chip" href="#/projects/${t.data.slug}">${t.data.title}</a>`).join(""):'<span class="chip">No active projects</span>'}
      </div>
    </article>
  `}function v(e,t=!1){return`
    <a class="birthday-week-item ${t?"birthday-week-item-compact":""}" href="#/birthdays/${w(e.dateLabel)}">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${k(e.daysAway)}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${e.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${[e.relationship,e.category].filter(Boolean).join(" · ")}</p>
        </div>
        <span class="chip chip-warm">${e.dateLabel}</span>
      </div>
      ${e.interests||e.profile||e.leadTime?`<p class="mt-3 text-sm leading-6 text-copy-faint">${[e.leadTime?`Prep: ${e.leadTime}`:"",e.interests?`Likes: ${e.interests}`:"",e.profile].filter(Boolean).join(" · ")}</p>`:""}
    </a>
  `}function Q(e,t=[]){var c;const s=((c=t[0])==null?void 0:c.name)||"No one loaded";return`
    <a class="month-card" href="#/birthdays/${e}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">Month</p>
          <h3 class="mt-2 text-xl font-semibold text-copy">${l(e)}</h3>
        </div>
        <span class="chip chip-warm">${t.length}</span>
      </div>
      <p class="mt-3 text-sm leading-6 text-copy-soft">Next listed: ${s}</p>
    </a>
  `}function X(e){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${e.dateLabel}</p>
        <span class="chip chip-warm">${e.category||"Birthday"}</span>
      </div>
      <h3 class="mt-3 text-xl font-semibold text-copy">${e.name}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${e.relationship||"Contact"}</p>
      <div class="mt-4 space-y-2 text-sm leading-6 text-copy-faint">
        ${e.profile?`<p><span class="text-copy">Profile:</span> ${e.profile}</p>`:""}
        ${e.interests?`<p><span class="text-copy">Interests:</span> ${e.interests}</p>`:""}
        ${e.leadTime?`<p><span class="text-copy">Prep:</span> ${e.leadTime}</p>`:""}
      </div>
    </article>
  `}function Z(e){return`
    <a class="rounded-[26px] border border-line bg-white/[0.04] p-5 transition duration-150 hover:border-fire/25 hover:bg-fire-soft" href="#/projects/${e.data.slug}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="chip chip-warm">${e.data.status}</span>
        <span class="chip">${l(e.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${e.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${e.data.summary}</p>
      <div class="mt-4 rounded-[20px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="micro-label text-copy-faint">Current status</p>
        <p class="mt-2 text-sm leading-6 text-copy">${e.data.nextAction}</p>
      </div>
      <p class="mt-4 text-sm text-fire">Open project detail →</p>
    </a>
  `}function ee(e,t=[]){var i;const s=[];return(Array.isArray((i=e==null?void 0:e.data)==null?void 0:i.next)?e.data.next:[]).slice(0,2).forEach((a,r)=>{s.push({lane:r===0?"Right now":"On deck",tag:"Board move",title:a,summary:"Pulled from the live command deck.",action:a})}),t.filter(a=>String(a.data.priority||"").toLowerCase()==="high").slice(0,2).forEach(a=>{s.push({lane:d(a.data.area||"project"),tag:`${l(a.data.priority||"active")} priority`,title:a.data.title,summary:a.data.summary,action:a.data.nextAction})}),s.slice(0,3)}function te(e=[],t=[]){return e.map(s=>({label:"Lane",title:s.data.title,summary:s.data.summary,slug:s.data.slug,projects:t.filter(c=>c.data.area===s.data.slug).sort($).slice(0,3)})).sort((s,c)=>c.projects.length-s.projects.length||s.title.localeCompare(c.title))}function se(e={}){const t=Array.isArray(e.upcoming)?e.upcoming.slice().sort((i,a)=>i.daysAway-a.daysAway||i.name.localeCompare(a.name)):[],s={};return t.forEach(i=>{const a=w(i.dateLabel);s[a]||(s[a]=[]),s[a].push(i)}),{upcoming:t,byMonth:s,monthOrder:["january","february","march","april","may","june","july","august","september","october","november","december"]}}function ae(e,t,s){if(s.name==="home"){const c=e.querySelector("[data-home-scroll]");c&&c.scrollIntoView({block:"start"})}}function ie(e){const s=(String(e||"#/").replace(/^#/,"")||"/").split("/").filter(Boolean);return s.length?s[0]==="birthdays"&&s[1]?{name:"birthdays",month:s[1].toLowerCase()}:s[0]==="birthdays"?{name:"birthdays"}:s[0]==="projects"&&s[1]?{name:"project",slug:s[1]}:s[0]==="projects"?{name:"projects"}:s[0]==="updates"?{name:"updates"}:{name:"home"}:{name:"home"}}function ce(e,t){const s=d(e);return/^https?:\/\//i.test(t)?`<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${t}" target="_blank" rel="noreferrer">${s}</a>`:`<span class="chip">${s}: ${t}</span>`}function re(e=""){return e.split(/\n\n+/).map(t=>{const s=t.split(`
`).map(c=>c.trim()).filter(Boolean);if(!s.length)return"";if(s.every(c=>c.startsWith("- ")))return`<ul class="list-dot space-y-2 pl-5 text-sm leading-7 text-copy-soft">${s.map(c=>`<li>${c.replace(/^-\s*/,"")}</li>`).join("")}</ul>`;if(s[0].startsWith("## ")){const c=s[0].replace(/^##\s*/,""),i=s.slice(1).join(" ");return`<div class="space-y-2"><h3 class="text-lg font-semibold text-copy">${c}</h3>${i?`<p class="text-sm leading-7 text-copy-soft">${i}</p>`:""}</div>`}return`<p class="text-sm leading-7 text-copy-soft">${s.join(" ")}</p>`}).join("")}function w(e=""){return String(e).split(" ")[0].toLowerCase()}function d(e=""){return e.replace(/[-_]/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function l(e=""){return e?e.charAt(0).toUpperCase()+e.slice(1):""}function $(e,t){const s={high:0,medium:1,low:2},c={active:0,queued:1,blocked:2,paused:3,idea:4,complete:5};return(s[String(e.data.priority||"").toLowerCase()]??9)-(s[String(t.data.priority||"").toLowerCase()]??9)||(c[String(e.data.status||"").toLowerCase()]??9)-(c[String(t.data.status||"").toLowerCase()]??9)||e.data.title.localeCompare(t.data.title)}function x(e){const t=new Date(e);if(Number.isNaN(t.getTime()))return e;const s=new Date,c=new Date(s.getFullYear(),s.getMonth(),s.getDate()),i=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=Math.round((c-i)/864e5);return a===0?"today":a===1?"yesterday":t.toLocaleDateString("en-US",{month:"short",day:"numeric"})}function k(e){return e===0?"Today":e===1?"Tomorrow":`${e} days`}U();function le(e={}){const t=Array.isArray(e.history)?e.history:[];return`
    <section class="glass-card p-5 sm:p-6 lg:p-7">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Daily rhythm</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">${e.title||"Daily gratitude"}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">${e.subtitle||"Keep today's prompt visible even when you answer it later."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="chip chip-warm">${e.statusLabel||"Pending"}</span>
          ${e.entryId?`<span class="chip">${e.entryId}</span>`:""}
          ${e.dateLabel?`<span class="chip">${e.dateLabel}</span>`:""}
        </div>
      </div>

      <div class="mt-6 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
        <article class="birthday-widget-hero compact-hero">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="micro-label text-fire">Today's prompt</p>
            <span class="chip">${e.sourceLabel||"Telegram + dashboard"}</span>
          </div>
          <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${e.promptTitle||"Ready when you are"}</h3>
          <p class="mt-4 text-base leading-8 text-copy">${e.prompt||"No prompt loaded yet."}</p>

          <div class="mt-5 rounded-[22px] border border-fire/18 bg-black/10 p-4">
            <p class="micro-label text-fire">Use case</p>
            <p class="mt-2 text-sm leading-6 text-copy-soft">${e.note||"Check it in the morning from Telegram or knock it out later from the dashboard."}</p>
          </div>

          <div class="mt-5 grid gap-3 sm:grid-cols-2">
            <div class="detail-stat">
              <p class="micro-label text-copy-faint">Status</p>
              <p class="mt-2 text-sm leading-6 text-copy">${e.statusDetail||"Pending reply"}</p>
            </div>
            <div class="detail-stat">
              <p class="micro-label text-copy-faint">Availability</p>
              <p class="mt-2 text-sm leading-6 text-copy">${e.windowLabel||"Morning to evening"}</p>
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
              <span class="chip">${t.length} loaded</span>
            </div>
            <div class="mt-4 space-y-3">
              ${t.length?t.map(oe).join(""):'<p class="text-sm leading-6 text-copy-soft">No recent gratitude history loaded yet.</p>'}
            </div>
          </article>
        </div>
      </div>
    </section>
  `}function oe(e){return`
    <article class="birthday-week-item birthday-week-item-compact">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${e.dateLabel||e.date||""}</p>
          <h4 class="mt-2 text-base font-semibold text-copy">${e.statusLabel||"Completed"}</h4>
        </div>
        ${e.entryId?`<span class="chip chip-warm">${e.entryId}</span>`:""}
      </div>
      ${e.responseSummary?`<p class="mt-3 text-sm leading-6 text-copy-soft">${e.responseSummary}</p>`:""}
    </article>
  `}function ne(e={}){var a,r,p;const t=e.today||{},s=Number(((a=e.settings)==null?void 0:a.showHistoryCount)||3),c=Array.isArray(e.history)?e.history.slice(0,s):[],i=String(t.status||"pending").toLowerCase();return{title:((r=e.settings)==null?void 0:r.title)||"Daily gratitude",subtitle:((p=e.settings)==null?void 0:p.subtitle)||"Keep today's prompt visible even when you answer it later at night.",promptTitle:i==="completed"?"Today's reflection is in":"Tonight's prompt is waiting",prompt:t.prompt,entryId:t.entryId,dateLabel:formatCalendarDate(t.date),sourceLabel:t.source||"Telegram + dashboard",note:t.note,statusLabel:i==="completed"?"Completed":"Pending",statusDetail:i==="completed"?t.completedLabel||"Answered and logged.":"Visible here until you knock it out.",windowLabel:d(String(t.availableWindow||"morning-to-evening")),history:c.map(o=>({...o,dateLabel:formatCalendarDate(o.date),statusLabel:String(o.status||"").toLowerCase()==="completed"?"Completed":l(o.status||"pending")}))}}
