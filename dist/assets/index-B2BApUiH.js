(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&c(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();async function M(){const t=await fetch("./generated/content.json").then(i=>i.json()),e=document.querySelector("#app"),s=O(t);function c(){const i=st(window.location.hash);e.innerHTML=A(s,i),et(e,s,i)}window.addEventListener("hashchange",c),c()}function O(t){const{dashboard:e,current:s,projects:c,goals:i,areas:a,updates:r,birthdays:x}=t,l=[...c].sort(w),k=l[0]||null,j=r.at(-1)||null,C=l.filter(h=>String(h.data.status||"").toLowerCase()==="active"),P=l.filter(h=>String(h.data.priority||"").toLowerCase()==="high"),B=X(s,l),L=Z(a,l),S=l.slice(0,4),N=r.slice().reverse().slice(0,4),g=tt(x),U=g.upcoming.slice(0,12);return{dashboard:e,current:s,projects:c,goals:i,areas:a,updates:r,birthdays:x,sortedProjects:l,spotlightProject:k,topUpdate:j,activeProjects:C,highPriorityProjects:P,immediateMoves:B,laneGroups:L,hotProjects:S,recentUpdates:N,birthdaysState:g,allRecentBirthdays:U}}function A(t,e){const s=F(t,e);return`
    <div class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 opacity-60">
        <div class="absolute left-[-8rem] top-[-10rem] h-72 w-72 rounded-full bg-fire/12 blur-3xl"></div>
        <div class="absolute right-[-6rem] top-12 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"></div>
        <div class="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-amber-300/8 blur-3xl"></div>
      </div>

      <main class="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-4 px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24 lg:pt-6">
        ${R(t,e)}
        ${e.name==="home"?u(t):s}
      </main>
    </div>
  `}function R(t,e){return`
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
          ${d("#/","Overview",e.name==="home")}
          ${d("#/birthdays","Birthdays",e.name==="birthdays")}
          ${d("#/projects","Projects",e.name==="projects"||e.name==="project")}
          ${d("#/updates","Updates",e.name==="updates")}
        </nav>
      </div>
    </section>
  `}function d(t,e,s=!1){return`<a class="nav-chip ${s?"nav-chip-active":""}" href="${t}">${e}</a>`}function u(t){var e;return`
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
            <span class="chip">Updated ${f(t.current.data.lastUpdated)}</span>
          </div>
        </div>
        <div class="mt-4 grid gap-3 md:grid-cols-3">
          ${t.immediateMoves.map(H).join("")}
        </div>
      </div>

      <aside class="stack-card compact-card">
        <p class="section-kicker">Board status</p>
        <div class="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          ${p("Active projects",t.activeProjects.length,"Projects in motion right now.")}
          ${p("High priority",t.highPriorityProjects.length,"Needs stronger attention.")}
          ${p("Birthday radar",((e=t.birthdays.summary)==null?void 0:e.upcomingCount)??0,"Upcoming birthdays loaded.")}
          ${p("System status",t.dashboard.stats.status,"Board is live and steerable.")}
        </div>
      </aside>
    </section>

    <section class="grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
      ${T(t)}
      ${D(t)}
    </section>

    <section class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      ${I(t)}
      ${_(t)}
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
          ${t.laneGroups.map(Y).join("")}
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
          ${m("Now",t.current.data.primaryFocus,"orange")}
          ${m("Next",t.current.data.next||[],"default")}
          ${m("Blockers",t.current.data.blockers||[],"warning")}
          ${m("Wins",t.current.data.wins||[],"success")}
        </div>
      </section>
    </section>
  `}function T(t){var i;const e=t.allRecentBirthdays.slice(0,4),s=e[0],c=(t.birthdaysState.byMonth.april||[]).length;return`
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
          <p class="mt-2 text-sm leading-6 text-copy-soft">${s?`${s.dateLabel} · ${$(s.daysAway)} · ${s.relationship||"Contact"}`:"No birthdays loaded in the current lookahead."}</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="chip chip-warm">${((i=t.birthdays.summary)==null?void 0:i.upcomingCount)??0} upcoming</span>
            <span class="chip">April · ${c}</span>
          </div>
        </article>

        <div class="grid gap-3 sm:grid-cols-2">
          ${e.map(a=>v(a,!0)).join("")}
        </div>
      </div>
    </section>
  `}function D(t){return`
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
        ${t.hotProjects.map((e,s)=>z(e,s+1)).join("")}
      </div>
    </section>
  `}function I(t){const e=t.spotlightProject;return`
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
            <span class="chip">${o(e.data.priority)} priority</span>
            <span class="chip">${n(e.data.area)}</span>
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
  `}function _(t){return`
    <section class="stack-card compact-card">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Recent motion</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Updates feed</h2>
        </div>
        <a class="chip chip-warm" href="#/updates">Open feed</a>
      </div>
      <div class="grid gap-3">
        ${t.recentUpdates.map(y).join("")}
      </div>
    </section>
  `}function F(t,e){return e.name==="birthdays"?W(t,e):e.name==="projects"?E(t):e.name==="project"?G(t,e.slug):e.name==="updates"?q(t):u(t)}function W(t,e){const s=e.month?o(e.month):null,c=e.month?t.birthdaysState.byMonth[e.month]||[]:[],i=t.birthdaysState.monthOrder.filter(a=>(t.birthdaysState.byMonth[a]||[]).length);return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Birthdays</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">${s?`${s} birthdays`:"Birthday command view"}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">${s?`Month detail for ${s}.`:"This is the deeper drill-down: month tabs, upcoming list, and profile hints."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/">Back to overview</a>
          ${i.map(a=>`<a class="chip ${e.month===a?"chip-warm":""}" href="#/birthdays/${a}">${o(a)}</a>`).join("")}
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
          ${c.map(a=>K(a)).join("")}
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
            ${t.allRecentBirthdays.map(a=>v(a)).join("")}
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
            ${i.map(a=>J(a,t.birthdaysState.byMonth[a])).join("")}
          </div>
        </section>
      </section>
    `}
  `}function E(t){return`
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
      ${t.sortedProjects.map(e=>Q(e)).join("")}
    </section>
  `}function G(t,e){const s=t.sortedProjects.find(i=>i.data.slug===e);if(!s)return`
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
          ${Object.entries(s.data.links||{}).map(([i,a])=>at(i,a)).join("")}
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
            <p class="mt-2 text-lg font-semibold text-copy">${o(s.data.priority)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Area</p>
            <p class="mt-2 text-lg font-semibold text-copy">${n(s.data.area)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Updated</p>
            <p class="mt-2 text-lg font-semibold text-copy">${f(s.data.lastUpdated)}</p>
          </div>
        </div>

        <div class="mt-4 rounded-[24px] border border-fire/18 bg-fire-soft p-5">
          <p class="micro-label text-fire">Next build thought</p>
          <p class="mt-2 text-sm leading-6 text-copy">${s.data.nextAction}</p>
        </div>
      </section>

      <section class="stack-card compact-card">
        <p class="section-kicker">Why it exists</p>
        <div class="project-copy">${it(s.content)}</div>
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
          ${c.length?c.map(y).join(""):'<article class="rounded-[22px] border border-line bg-white/[0.04] p-4"><p class="text-sm leading-6 text-copy-soft">No linked updates yet. This page is ready for them.</p></article>'}
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
            <p class="mt-2 text-sm leading-6 text-copy-soft">This project lives in the ${n(s.data.area)} lane and is being tracked as ${s.data.status}.</p>
          </article>
          <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
            <p class="micro-label text-fire">Why it matters</p>
            <p class="mt-2 text-sm leading-6 text-copy-soft">The command deck should let Bryon scan the current state fast, then click in here for the deeper project picture without crowding the homepage.</p>
          </article>
        </div>
      </section>
    </section>
  `}function q(t){return`
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
      ${t.updates.slice().reverse().map(V).join("")}
    </section>
  `}function H(t){return`
    <article class="rounded-[24px] border border-fire/18 bg-fire-soft p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${t.lane}</p>
        <span class="chip">${t.tag}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold tracking-[-0.03em] text-copy">${t.title}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${t.action}</p>
    </article>
  `}function p(t,e,s){return`
    <article class="stat-card compact-stat-card">
      <div>
        <p class="micro-label text-copy-faint">${t}</p>
        <p class="mt-2 text-sm leading-6 text-copy-soft">${s}</p>
      </div>
      <strong class="text-right text-2xl font-semibold tracking-[-0.04em] text-copy sm:text-3xl">${e}</strong>
    </article>
  `}function z(t,e){return`
    <a class="project-row" href="#/projects/${t.data.slug}">
      <div class="project-row-rank">${e}</div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="chip chip-warm">${t.data.status}</span>
          <span class="chip">${o(t.data.priority)} priority</span>
          <span class="chip">${n(t.data.area)}</span>
        </div>
        <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
        <p class="mt-2 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
        <p class="mt-3 text-sm leading-6 text-copy"><span class="text-copy-faint">Next:</span> ${t.data.nextAction}</p>
      </div>
      <div class="project-row-arrow">↗</div>
    </a>
  `}function y(t){return`
    <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${f(t.data.date)}</p>
        <span class="chip">${t.data.kind}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${t.content}</p>
    </article>
  `}function V(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${f(t.data.date)}</p>
          <h3 class="mt-3 text-xl font-semibold text-copy">${t.data.title}</h3>
        </div>
        <span class="chip chip-warm">${t.data.kind}</span>
      </div>
      <p class="mt-3 text-sm leading-7 text-copy-soft">${t.content}</p>
    </article>
  `}function m(t,e=[],s="default"){const c=e.length?e:["Nothing loaded yet."],i={orange:"border-fire/25 bg-fire-soft",warning:"border-amber-400/20 bg-amber-400/10",success:"border-emerald-400/20 bg-emerald-400/10",default:"border-line bg-white/5"};return`
    <article class="glass-card p-4 ${i[s]||i.default}">
      <p class="section-kicker">${t}</p>
      <ul class="list-dot space-y-2 pl-5 text-sm leading-6 text-copy-soft">
        ${c.map(a=>`<li>${a}</li>`).join("")}
      </ul>
    </article>
  `}function Y(t){return`
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
  `}function v(t,e=!1){return`
    <a class="birthday-week-item ${e?"birthday-week-item-compact":""}" href="#/birthdays/${b(t.dateLabel)}">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${$(t.daysAway)}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${t.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${[t.relationship,t.category].filter(Boolean).join(" · ")}</p>
        </div>
        <span class="chip chip-warm">${t.dateLabel}</span>
      </div>
      ${t.interests||t.profile||t.leadTime?`<p class="mt-3 text-sm leading-6 text-copy-faint">${[t.leadTime?`Prep: ${t.leadTime}`:"",t.interests?`Likes: ${t.interests}`:"",t.profile].filter(Boolean).join(" · ")}</p>`:""}
    </a>
  `}function J(t,e=[]){var c;const s=((c=e[0])==null?void 0:c.name)||"No one loaded";return`
    <a class="month-card" href="#/birthdays/${t}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">Month</p>
          <h3 class="mt-2 text-xl font-semibold text-copy">${o(t)}</h3>
        </div>
        <span class="chip chip-warm">${e.length}</span>
      </div>
      <p class="mt-3 text-sm leading-6 text-copy-soft">Next listed: ${s}</p>
    </a>
  `}function K(t){return`
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
  `}function Q(t){return`
    <a class="rounded-[26px] border border-line bg-white/[0.04] p-5 transition duration-150 hover:border-fire/25 hover:bg-fire-soft" href="#/projects/${t.data.slug}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="chip chip-warm">${t.data.status}</span>
        <span class="chip">${o(t.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      <div class="mt-4 rounded-[20px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="micro-label text-copy-faint">Current status</p>
        <p class="mt-2 text-sm leading-6 text-copy">${t.data.nextAction}</p>
      </div>
      <p class="mt-4 text-sm text-fire">Open project detail →</p>
    </a>
  `}function X(t,e=[]){var i;const s=[];return(Array.isArray((i=t==null?void 0:t.data)==null?void 0:i.next)?t.data.next:[]).slice(0,2).forEach((a,r)=>{s.push({lane:r===0?"Right now":"On deck",tag:"Board move",title:a,summary:"Pulled from the live command deck.",action:a})}),e.filter(a=>String(a.data.priority||"").toLowerCase()==="high").slice(0,2).forEach(a=>{s.push({lane:n(a.data.area||"project"),tag:`${o(a.data.priority||"active")} priority`,title:a.data.title,summary:a.data.summary,action:a.data.nextAction})}),s.slice(0,3)}function Z(t=[],e=[]){return t.map(s=>({label:"Lane",title:s.data.title,summary:s.data.summary,slug:s.data.slug,projects:e.filter(c=>c.data.area===s.data.slug).sort(w).slice(0,3)})).sort((s,c)=>c.projects.length-s.projects.length||s.title.localeCompare(c.title))}function tt(t={}){const e=Array.isArray(t.upcoming)?t.upcoming.slice().sort((i,a)=>i.daysAway-a.daysAway||i.name.localeCompare(a.name)):[],s={};return e.forEach(i=>{const a=b(i.dateLabel);s[a]||(s[a]=[]),s[a].push(i)}),{upcoming:e,byMonth:s,monthOrder:["january","february","march","april","may","june","july","august","september","october","november","december"]}}function et(t,e,s){if(s.name==="home"){const c=t.querySelector("[data-home-scroll]");c&&c.scrollIntoView({block:"start"})}}function st(t){const s=(String(t||"#/").replace(/^#/,"")||"/").split("/").filter(Boolean);return s.length?s[0]==="birthdays"&&s[1]?{name:"birthdays",month:s[1].toLowerCase()}:s[0]==="birthdays"?{name:"birthdays"}:s[0]==="projects"&&s[1]?{name:"project",slug:s[1]}:s[0]==="projects"?{name:"projects"}:s[0]==="updates"?{name:"updates"}:{name:"home"}:{name:"home"}}function at(t,e){const s=n(t);return/^https?:\/\//i.test(e)?`<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${e}" target="_blank" rel="noreferrer">${s}</a>`:`<span class="chip">${s}: ${e}</span>`}function it(t=""){return t.split(/\n\n+/).map(e=>{const s=e.split(`
`).map(c=>c.trim()).filter(Boolean);if(!s.length)return"";if(s.every(c=>c.startsWith("- ")))return`<ul class="list-dot space-y-2 pl-5 text-sm leading-7 text-copy-soft">${s.map(c=>`<li>${c.replace(/^-\s*/,"")}</li>`).join("")}</ul>`;if(s[0].startsWith("## ")){const c=s[0].replace(/^##\s*/,""),i=s.slice(1).join(" ");return`<div class="space-y-2"><h3 class="text-lg font-semibold text-copy">${c}</h3>${i?`<p class="text-sm leading-7 text-copy-soft">${i}</p>`:""}</div>`}return`<p class="text-sm leading-7 text-copy-soft">${s.join(" ")}</p>`}).join("")}function b(t=""){return String(t).split(" ")[0].toLowerCase()}function n(t=""){return t.replace(/[-_]/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function o(t=""){return t?t.charAt(0).toUpperCase()+t.slice(1):""}function w(t,e){const s={high:0,medium:1,low:2},c={active:0,queued:1,blocked:2,paused:3,idea:4,complete:5};return(s[String(t.data.priority||"").toLowerCase()]??9)-(s[String(e.data.priority||"").toLowerCase()]??9)||(c[String(t.data.status||"").toLowerCase()]??9)-(c[String(e.data.status||"").toLowerCase()]??9)||t.data.title.localeCompare(e.data.title)}function f(t){const e=new Date(t);if(Number.isNaN(e.getTime()))return t;const s=new Date,c=new Date(s.getFullYear(),s.getMonth(),s.getDate()),i=new Date(e.getFullYear(),e.getMonth(),e.getDate()),a=Math.round((c-i)/864e5);return a===0?"today":a===1?"yesterday":e.toLocaleDateString("en-US",{month:"short",day:"numeric"})}function $(t){return t===0?"Today":t===1?"Tomorrow":`${t} days`}M();
