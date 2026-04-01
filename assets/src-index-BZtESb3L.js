(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))i(c);new MutationObserver(c=>{for(const a of c)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function s(c){const a={};return c.integrity&&(a.integrity=c.integrity),c.referrerPolicy&&(a.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?a.credentials="include":c.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(c){if(c.ep)return;c.ep=!0;const a=s(c);fetch(c.href,a)}})();async function G(){const e=await fetch("./generated/content.json").then(c=>c.json()),t=document.querySelector("#app"),s=F(e);function i(){const c=fe(window.location.hash);t.innerHTML=H(s,c),xe(t,s,c)}window.addEventListener("hashchange",i),i()}function F(e){const{dashboard:t,current:s,projects:i,goals:c,areas:a,updates:l,birthdays:n,gratitude:r,events:p,fitness:o,warRoom:B}=e,h=[...i].sort(P),A=h[0]||null,T=l.at(-1)||null,M=h.filter(v=>String(v.data.status||"").toLowerCase()==="active"),C=h.filter(v=>String(v.data.priority||"").toLowerCase()==="high"),D=pe(s,h),U=de(a,h),W=h.slice(0,4),O=l.slice().reverse().slice(0,4),$=me(n),I=$.upcoming.slice(0,12),R=be(r),_=je(p),E=Le(o);return{dashboard:t,current:s,projects:i,goals:c,areas:a,updates:l,birthdays:n,gratitude:r,events:p,fitness:o,warRoom:B,sortedProjects:h,spotlightProject:A,topUpdate:T,activeProjects:M,highPriorityProjects:C,immediateMoves:D,laneGroups:U,hotProjects:W,recentUpdates:O,birthdaysState:$,allRecentBirthdays:I,gratitudeCard:R,eventsCard:_,fitnessCard:E}}function H(e,t){const s=Y(e,t);return`
    <div class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 opacity-60">
        <div class="absolute left-[-8rem] top-[-10rem] h-72 w-72 rounded-full bg-fire/12 blur-3xl"></div>
        <div class="absolute right-[-6rem] top-12 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"></div>
        <div class="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-amber-300/8 blur-3xl"></div>
      </div>

      <main class="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-4 px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24 lg:pt-6">
        ${K(e,t)}
        ${t.name==="home"?w(e):s}
      </main>
    </div>
  `}function K(e,t){return`
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
          ${g("#/","Overview",t.name==="home")}
          ${g("#/prompt","Daily prompt",t.name==="prompt")}
          ${g("#/birthdays","Birthdays",t.name==="birthdays")}
          ${g("#/projects","Projects",t.name==="projects"||t.name==="project")}
          ${g("#/updates","Updates",t.name==="updates")}
        </nav>
      </div>
    </section>
  `}function g(e,t,s=!1){return`<a class="nav-chip ${s?"nav-chip-active":""}" href="${e}">${t}</a>`}function w(e){var t;return`
    ${N(e.gratitudeCard)}

    <section class="grid gap-4 xl:grid-cols-[1fr_1fr]">
      ${ve(e.eventsCard)}
      ${we(e.fitnessCard)}
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
            <span class="chip chip-warm">${e.immediateMoves.length} moves</span>
            <span class="chip">Updated ${b(e.current.data.lastUpdated)}</span>
          </div>
        </div>
        <div class="mt-4 grid gap-3 md:grid-cols-3">
          ${e.immediateMoves.map(ae).join("")}
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
      ${q(e)}
      ${V(e)}
    </section>

    <section class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      ${J(e)}
      ${z(e)}
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
          ${e.laneGroups.map(le).join("")}
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
          ${m("Now",e.current.data.primaryFocus,"orange")}
          ${m("Next",e.current.data.next||[],"default")}
          ${m("Blockers",e.current.data.blockers||[],"warning")}
          ${m("Wins",e.current.data.wins||[],"success")}
        </div>
      </section>
    </section>
  `}function q(e){var c;const t=e.allRecentBirthdays.slice(0,4),s=t[0],i=(e.birthdaysState.byMonth.april||[]).length;return`
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
            <span class="chip chip-warm">${((c=e.birthdays.summary)==null?void 0:c.upcomingCount)??0} upcoming</span>
            <span class="chip">April · ${i}</span>
          </div>
        </article>

        <div class="grid gap-3 sm:grid-cols-2">
          ${t.map(a=>j(a,!0)).join("")}
        </div>
      </div>
    </section>
  `}function V(e){return`
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
        ${e.hotProjects.map((t,s)=>ie(t,s+1)).join("")}
      </div>
    </section>
  `}function J(e){const t=e.spotlightProject;return`
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
            <span class="chip">${x(t.data.priority)} priority</span>
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
  `}function z(e){return`
    <section class="stack-card compact-card">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Recent motion</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Updates feed</h2>
        </div>
        <a class="chip chip-warm" href="#/updates">Open feed</a>
      </div>
      <div class="grid gap-3">
        ${e.recentUpdates.map(k).join("")}
      </div>
    </section>
  `}function Y(e,t){return t.name==="prompt"?Q(e):t.name==="birthdays"?X(e,t):t.name==="projects"?Z(e):t.name==="project"?ee(e,t.slug):t.name==="updates"?se(e):w(e)}function Q(e){return`
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

    ${N(e.gratitudeCard)}
  `}function X(e,t){const s=t.month?x(t.month):null,i=t.month?e.birthdaysState.byMonth[t.month]||[]:[],c=e.birthdaysState.monthOrder.filter(a=>(e.birthdaysState.byMonth[a]||[]).length);return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Birthdays</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">${s?`${s} birthdays`:"Birthday command view"}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">${s?`Month detail for ${s}.`:"This is the deeper drill-down: month tabs, upcoming list, and profile hints."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/">Back to overview</a>
          ${c.map(a=>`<a class="chip ${t.month===a?"chip-warm":""}" href="#/birthdays/${a}">${x(a)}</a>`).join("")}
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
          <span class="chip chip-warm">${i.length} people</span>
        </div>
        <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          ${i.map(a=>oe(a)).join("")}
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
            ${e.allRecentBirthdays.map(a=>j(a)).join("")}
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
            ${c.map(a=>re(a,e.birthdaysState.byMonth[a])).join("")}
          </div>
        </section>
      </section>
    `}
  `}function Z(e){return`
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
      ${e.sortedProjects.map(t=>ne(t)).join("")}
    </section>
  `}function ee(e,t){const s=e.sortedProjects.find(a=>a.data.slug===t);if(!s)return`
      <section class="stack-card compact-card">
        <p class="section-kicker">Project</p>
        <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">Project not found</h2>
        <p class="mt-3 text-sm leading-6 text-copy-soft">That project route does not exist yet.</p>
        <div class="mt-4">
          <a class="chip chip-warm" href="#/projects">Back to projects</a>
        </div>
      </section>
    `;const i=e.updates.slice().reverse().filter(a=>{const l=`${a.data.title||""} ${a.content||""}`.toLowerCase();return l.includes((s.data.title||"").toLowerCase())||l.includes((t||"").replace(/-/g," "))}).slice(0,4),c=t==="sick-sales-war-room"?te(e.warRoom):"";return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">Project detail</p>
          <h2 class="text-3xl font-semibold tracking-[-0.03em] text-copy">${s.data.title}</h2>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-copy-soft">${s.data.summary}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <a class="chip" href="#/projects">Back to projects</a>
          ${Object.entries(s.data.links||{}).map(([a,l])=>he(a,l)).join("")}
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
            <p class="mt-2 text-lg font-semibold text-copy">${x(s.data.priority)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Area</p>
            <p class="mt-2 text-lg font-semibold text-copy">${d(s.data.area)}</p>
          </div>
          <div class="detail-stat">
            <p class="micro-label text-copy-faint">Updated</p>
            <p class="mt-2 text-lg font-semibold text-copy">${b(s.data.lastUpdated)}</p>
          </div>
        </div>

        <div class="mt-4 rounded-[24px] border border-fire/18 bg-fire-soft p-5">
          <p class="micro-label text-fire">Next build thought</p>
          <p class="mt-2 text-sm leading-6 text-copy">${s.data.nextAction}</p>
        </div>
      </section>

      <section class="stack-card compact-card">
        <p class="section-kicker">Why it exists</p>
        <div class="project-copy">${ge(s.content)}</div>
      </section>
    </section>

    ${c}

    <section class="grid gap-4 xl:grid-cols-[1fr_1fr]">
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Recent motion</p>
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Related updates</h3>
          </div>
          <span class="chip chip-warm">${i.length} linked</span>
        </div>
        <div class="grid gap-3">
          ${i.length?i.map(k).join(""):'<article class="rounded-[22px] border border-line bg-white/[0.04] p-4"><p class="text-sm leading-6 text-copy-soft">No linked updates yet. This page is ready for them.</p></article>'}
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
  `}function te(e={}){var r,p;const t=e.recommendation||null,s=e.todayBoard||{},i=((r=e.summary)==null?void 0:r.buckets)||{},c=Array.isArray(e.topPush)?e.topPush.slice(0,5):[],a=Array.isArray(e.topBundle)?e.topBundle.slice(0,5):[],l=Array.isArray(e.protect)?e.protect.slice(0,5):[],n=Array.isArray(e.outWinners)?e.outWinners.slice(0,5):[];return`
    <section class="grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">War room data</p>
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Current recommendation</h3>
          </div>
          <span class="chip chip-warm">${((p=e.summary)==null?void 0:p.actionableRows)??0} actionable rows</span>
        </div>

        ${t?`
          <article class="rounded-[24px] border border-fire/18 bg-fire-soft p-5">
            <p class="micro-label text-fire">Push today</p>
            <h4 class="mt-3 text-xl font-semibold text-copy">${t.hero||"No hero picked"}</h4>
            <p class="mt-2 text-sm leading-6 text-copy-soft">${[t.heroVariant,t.channel].filter(Boolean).join(" · ")}</p>
            ${t.addOn?`<p class="mt-3 text-sm leading-6 text-copy"><span class="text-copy-faint">Add-on:</span> ${t.addOn}</p>`:""}
            ${t.offer?`<p class="mt-2 text-sm leading-6 text-copy"><span class="text-copy-faint">Offer:</span> ${t.offer}</p>`:""}
            ${t.inventoryReality?`<p class="mt-2 text-sm leading-6 text-copy"><span class="text-copy-faint">Inventory read:</span> ${t.inventoryReality}</p>`:""}
            <div class="mt-4 flex flex-wrap gap-2">
              ${(t.why||[]).map(o=>`<span class="chip">${o}</span>`).join("")}
            </div>
          </article>
        `:'<article class="rounded-[24px] border border-line bg-white/[0.04] p-5"><p class="text-sm leading-6 text-copy-soft">No recommendation generated yet.</p></article>'}

        <div class="mt-4 grid gap-3 sm:grid-cols-2">
          ${f("Push What Is Left",i["Push What Is Left"]??0,"Best remaining in-stock products to feature now.")}
          ${f("Bundle / Test",i["Bundle / Test"]??0,"Use as add-ons, offer fillers, and test candidates.")}
          ${f("Protect / Low Stock",i["Protect / Low Stock"]??0,"Good sellers with thin inventory — use carefully.")}
          ${f("Out of Stock Winners",i["Out of Stock Winners"]??0,"Strong demand signals that need restock or replacement.")}
        </div>
      </section>

      <section class="stack-card compact-card">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="section-kicker">Today board</p>
            <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Now / next / watch / problems / moves</h3>
          </div>
        </div>
        <div class="grid gap-3 sm:grid-cols-2">
          ${m("Now",s.now||[],"orange")}
          ${m("Next",s.next||[],"default")}
          ${m("Watch",s.watch||[],"warning")}
          ${m("Problems",s.problems||[],"warning")}
          <div class="sm:col-span-2">${m("Moves",s.moves||[],"success")}</div>
        </div>
      </section>
    </section>

    <section class="stack-card compact-card">
      <div class="mb-4 flex items-end justify-between gap-4">
        <div>
          <p class="section-kicker">Top products</p>
          <h3 class="text-2xl font-semibold tracking-[-0.03em] text-copy">What the data says</h3>
        </div>
      </div>
      <div class="grid gap-3 xl:grid-cols-2">
        <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
          <p class="micro-label text-fire">Push what is left</p>
          <div class="mt-3 grid gap-3">${c.length?c.map(o=>y(o)).join(""):'<p class="text-sm leading-6 text-copy-soft">No immediate in-stock push items found.</p>'}</div>
        </article>
        <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
          <p class="micro-label text-fire">Bundle / test</p>
          <div class="mt-3 grid gap-3">${a.length?a.map(o=>y(o)).join(""):'<p class="text-sm leading-6 text-copy-soft">No bundle candidates found.</p>'}</div>
        </article>
        <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
          <p class="micro-label text-fire">Protect / low stock</p>
          <div class="mt-3 grid gap-3">${l.length?l.map(o=>y(o)).join(""):'<p class="text-sm leading-6 text-copy-soft">No low-stock protect items found.</p>'}</div>
        </article>
        <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
          <p class="micro-label text-fire">Out of stock winners</p>
          <div class="mt-3 grid gap-3">${n.length?n.map(o=>y(o)).join(""):'<p class="text-sm leading-6 text-copy-soft">No out-of-stock demand signals found.</p>'}</div>
        </article>
      </div>
    </section>
  `}function y(e){return`
    <article class="phase-lane-item phase-lane-item-compact">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 class="text-base font-semibold text-copy">${e.title}</h4>
          <p class="mt-1 text-sm leading-6 text-copy-soft">${[e.variant!=="Default Title"?e.variant:"",e.type,e.vendor].filter(Boolean).join(" · ")}</p>
        </div>
        <span class="chip chip-warm">${e.bucket}</span>
      </div>
      <div class="mt-3 flex flex-wrap gap-2">
        ${e.price!=null?`<span class="chip">$${e.price}</span>`:""}
        ${e.sales90!=null?`<span class="chip">90d sales: ${e.sales90}</span>`:""}
        ${e.availableInventory!=null?`<span class="chip">inv: ${e.availableInventory}</span>`:""}
        ${e.revenue90!=null?`<span class="chip">rev: $${Math.round(e.revenue90)}</span>`:""}
      </div>
      ${e.note?`<p class="mt-2 text-sm leading-6 text-copy-faint">${e.note}</p>`:""}
    </article>
  `}function se(e){return`
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
      ${e.updates.slice().reverse().map(ce).join("")}
    </section>
  `}function ae(e){return`
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
  `}function ie(e,t){return`
    <a class="project-row" href="#/projects/${e.data.slug}">
      <div class="project-row-rank">${t}</div>
      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <span class="chip chip-warm">${e.data.status}</span>
          <span class="chip">${x(e.data.priority)} priority</span>
          <span class="chip">${d(e.data.area)}</span>
        </div>
        <h3 class="mt-3 text-lg font-semibold text-copy">${e.data.title}</h3>
        <p class="mt-2 text-sm leading-6 text-copy-soft">${e.data.summary}</p>
        <p class="mt-3 text-sm leading-6 text-copy"><span class="text-copy-faint">Next:</span> ${e.data.nextAction}</p>
      </div>
      <div class="project-row-arrow">↗</div>
    </a>
  `}function k(e){return`
    <article class="rounded-[22px] border border-line bg-white/[0.04] p-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${b(e.data.date)}</p>
        <span class="chip">${e.data.kind}</span>
      </div>
      <h3 class="mt-3 text-lg font-semibold text-copy">${e.data.title}</h3>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${e.content}</p>
    </article>
  `}function ce(e){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${b(e.data.date)}</p>
          <h3 class="mt-3 text-xl font-semibold text-copy">${e.data.title}</h3>
        </div>
        <span class="chip chip-warm">${e.data.kind}</span>
      </div>
      <p class="mt-3 text-sm leading-7 text-copy-soft">${e.content}</p>
    </article>
  `}function m(e,t=[],s="default"){const i=t.length?t:["Nothing loaded yet."],c={orange:"border-fire/25 bg-fire-soft",warning:"border-amber-400/20 bg-amber-400/10",success:"border-emerald-400/20 bg-emerald-400/10",default:"border-line bg-white/5"};return`
    <article class="glass-card p-4 ${c[s]||c.default}">
      <p class="section-kicker">${e}</p>
      <ul class="list-dot space-y-2 pl-5 text-sm leading-6 text-copy-soft">
        ${i.map(a=>`<li>${a}</li>`).join("")}
      </ul>
    </article>
  `}function le(e){return`
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
  `}function j(e,t=!1){return`
    <a class="birthday-week-item ${t?"birthday-week-item-compact":""}" href="#/birthdays/${L(e.dateLabel)}">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${S(e.daysAway)}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${e.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${[e.relationship,e.category].filter(Boolean).join(" · ")}</p>
        </div>
        <span class="chip chip-warm">${e.dateLabel}</span>
      </div>
      ${e.interests||e.profile||e.leadTime?`<p class="mt-3 text-sm leading-6 text-copy-faint">${[e.leadTime?`Prep: ${e.leadTime}`:"",e.interests?`Likes: ${e.interests}`:"",e.profile].filter(Boolean).join(" · ")}</p>`:""}
    </a>
  `}function re(e,t=[]){var i;const s=((i=t[0])==null?void 0:i.name)||"No one loaded";return`
    <a class="month-card" href="#/birthdays/${e}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="micro-label text-fire">Month</p>
          <h3 class="mt-2 text-xl font-semibold text-copy">${x(e)}</h3>
        </div>
        <span class="chip chip-warm">${t.length}</span>
      </div>
      <p class="mt-3 text-sm leading-6 text-copy-soft">Next listed: ${s}</p>
    </a>
  `}function oe(e){return`
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
  `}function ne(e){return`
    <a class="rounded-[26px] border border-line bg-white/[0.04] p-5 transition duration-150 hover:border-fire/25 hover:bg-fire-soft" href="#/projects/${e.data.slug}">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <span class="chip chip-warm">${e.data.status}</span>
        <span class="chip">${x(e.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${e.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${e.data.summary}</p>
      <div class="mt-4 rounded-[20px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="micro-label text-copy-faint">Current status</p>
        <p class="mt-2 text-sm leading-6 text-copy">${e.data.nextAction}</p>
      </div>
      <p class="mt-4 text-sm text-fire">Open project detail →</p>
    </a>
  `}function pe(e,t=[]){var c;const s=[];return(Array.isArray((c=e==null?void 0:e.data)==null?void 0:c.next)?e.data.next:[]).slice(0,2).forEach((a,l)=>{s.push({lane:l===0?"Right now":"On deck",tag:"Board move",title:a,summary:"Pulled from the live command deck.",action:a})}),t.filter(a=>String(a.data.priority||"").toLowerCase()==="high").slice(0,2).forEach(a=>{s.push({lane:d(a.data.area||"project"),tag:`${x(a.data.priority||"active")} priority`,title:a.data.title,summary:a.data.summary,action:a.data.nextAction})}),s.slice(0,3)}function de(e=[],t=[]){return e.map(s=>({label:"Lane",title:s.data.title,summary:s.data.summary,slug:s.data.slug,projects:t.filter(i=>i.data.area===s.data.slug).sort(P).slice(0,3)})).sort((s,i)=>i.projects.length-s.projects.length||s.title.localeCompare(i.title))}function me(e={}){const t=Array.isArray(e.upcoming)?e.upcoming.slice().sort((c,a)=>c.daysAway-a.daysAway||c.name.localeCompare(a.name)):[],s={};return t.forEach(c=>{const a=L(c.dateLabel);s[a]||(s[a]=[]),s[a].push(c)}),{upcoming:t,byMonth:s,monthOrder:["january","february","march","april","may","june","july","august","september","october","november","december"]}}function xe(e,t,s){if(s.name==="home"){const i=e.querySelector("[data-home-scroll]");i&&i.scrollIntoView({block:"start"})}}function fe(e){const s=(String(e||"#/").replace(/^#/,"")||"/").split("/").filter(Boolean);return s.length?s[0]==="prompt"?{name:"prompt"}:s[0]==="birthdays"&&s[1]?{name:"birthdays",month:s[1].toLowerCase()}:s[0]==="birthdays"?{name:"birthdays"}:s[0]==="projects"&&s[1]?{name:"project",slug:s[1]}:s[0]==="projects"?{name:"projects"}:s[0]==="updates"?{name:"updates"}:{name:"home"}:{name:"home"}}function he(e,t){const s=d(e);return/^https?:\/\//i.test(t)?`<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${t}" target="_blank" rel="noreferrer">${s}</a>`:`<span class="chip">${s}: ${t}</span>`}function ge(e=""){return e.split(/\n\n+/).map(t=>{const s=t.split(`
`).map(i=>i.trim()).filter(Boolean);if(!s.length)return"";if(s.every(i=>i.startsWith("- ")))return`<ul class="list-dot space-y-2 pl-5 text-sm leading-7 text-copy-soft">${s.map(i=>`<li>${i.replace(/^-\s*/,"")}</li>`).join("")}</ul>`;if(s[0].startsWith("## ")){const i=s[0].replace(/^##\s*/,""),c=s.slice(1).join(" ");return`<div class="space-y-2"><h3 class="text-lg font-semibold text-copy">${i}</h3>${c?`<p class="text-sm leading-7 text-copy-soft">${c}</p>`:""}</div>`}return`<p class="text-sm leading-7 text-copy-soft">${s.join(" ")}</p>`}).join("")}function L(e=""){return String(e).split(" ")[0].toLowerCase()}function d(e=""){return e.replace(/[-_]/g," ").replace(/\b\w/g,t=>t.toUpperCase())}function x(e=""){return e?e.charAt(0).toUpperCase()+e.slice(1):""}function P(e,t){const s={high:0,medium:1,low:2},i={active:0,queued:1,blocked:2,paused:3,idea:4,complete:5};return(s[String(e.data.priority||"").toLowerCase()]??9)-(s[String(t.data.priority||"").toLowerCase()]??9)||(i[String(e.data.status||"").toLowerCase()]??9)-(i[String(t.data.status||"").toLowerCase()]??9)||e.data.title.localeCompare(t.data.title)}function ue(e){if(typeof e=="string"){const t=e.match(/^(\d{4})-(\d{2})-(\d{2})$/);if(t){const[,s,i,c]=t;return new Date(Number(s),Number(i)-1,Number(c))}}return new Date(e)}function u(e){const t=ue(e);return Number.isNaN(t.getTime())?e:t.toLocaleDateString("en-US",{month:"short",day:"numeric"})}function b(e){const t=new Date(e);if(Number.isNaN(t.getTime()))return e;const s=new Date,i=new Date(s.getFullYear(),s.getMonth(),s.getDate()),c=new Date(t.getFullYear(),t.getMonth(),t.getDate()),a=Math.round((i-c)/864e5);return a===0?"today":a===1?"yesterday":t.toLocaleDateString("en-US",{month:"short",day:"numeric"})}function S(e){return e===0?"Today":e===1?"Tomorrow":`${e} days`}G();function N(e={}){const t=Array.isArray(e.history)?e.history:[];return`
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
              ${t.length?t.map(ye).join(""):'<p class="text-sm leading-6 text-copy-soft">No recent gratitude history loaded yet.</p>'}
            </div>
          </article>
        </div>
      </div>
    </section>
  `}function ye(e){return`
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
  `}function be(e={}){var a,l,n;const t=e.today||{},s=Number(((a=e.settings)==null?void 0:a.showHistoryCount)||3),i=Array.isArray(e.history)?e.history.slice(0,s):[],c=String(t.status||"pending").toLowerCase();return{title:((l=e.settings)==null?void 0:l.title)||"Daily gratitude",subtitle:((n=e.settings)==null?void 0:n.subtitle)||"Keep today's prompt visible even when you answer it later at night.",promptTitle:c==="completed"?"Today's reflection is in":"Tonight's prompt is waiting",prompt:t.prompt,entryId:t.entryId,dateLabel:u(t.date),sourceLabel:t.source||"Telegram + dashboard",note:t.note,statusLabel:c==="completed"?"Completed":"Pending",statusDetail:c==="completed"?t.completedLabel||"Answered and logged.":"Visible here until you knock it out.",windowLabel:d(String(t.availableWindow||"morning-to-evening")),history:i.map(r=>({...r,dateLabel:u(r.date),statusLabel:String(r.status||"").toLowerCase()==="completed"?"Completed":x(r.status||"pending")}))}}function ve(e={}){const t=Array.isArray(e.upcoming)?e.upcoming:[];return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="section-kicker">Events & DJ</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${e.title||"Event lane"}</h2>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${e.subtitle||"Upcoming event prep and booked-work visibility."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${e.statusLabel?`<span class="chip chip-warm">${e.statusLabel}</span>`:""}
          ${e.seasonLabel?`<span class="chip">${e.seasonLabel}</span>`:""}
        </div>
      </div>

      <div class="mt-4 grid gap-3">
        ${e.nextMove?`
          <article class="rounded-[22px] border border-fire/18 bg-fire-soft p-4">
            <p class="micro-label text-fire">Lane note</p>
            <p class="mt-2 text-sm leading-6 text-copy">${e.nextMove}</p>
          </article>
        `:""}
        ${t.length?t.map($e).join(""):'<article class="rounded-[22px] border border-line bg-white/[0.04] p-4"><p class="text-sm leading-6 text-copy-soft">No upcoming events loaded yet.</p></article>'}
      </div>
    </section>
  `}function $e(e){return`
    <article class="phase-lane-item">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${e.dateLabel||""}</p>
          <h3 class="mt-2 text-lg font-semibold text-copy">${e.title||"Upcoming event"}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${[e.type,e.location].filter(Boolean).join(" · ")}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${e.statusLabel?`<span class="chip chip-warm">${e.statusLabel}</span>`:""}
          ${e.prepStageLabel?`<span class="chip">${e.prepStageLabel}</span>`:""}
        </div>
      </div>
      ${e.nextMove?`<p class="mt-3 text-sm leading-6 text-copy"><span class="text-copy-faint">Next:</span> ${e.nextMove}</p>`:""}
      ${e.note?`<p class="mt-2 text-sm leading-6 text-copy-faint">${e.note}</p>`:""}
    </article>
  `}function we(e={}){const t=Array.isArray(e.recent)?e.recent:[];return`
    <section class="stack-card compact-card">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="section-kicker">Personal lane</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${e.title||"Workout lane"}</h2>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${e.subtitle||"Training momentum, consistency, and the next session."}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          ${e.statusLabel?`<span class="chip chip-warm">${e.statusLabel}</span>`:""}
          ${e.streakLabel?`<span class="chip">${e.streakLabel}</span>`:""}
        </div>
      </div>

      <div class="mt-4 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
        <article class="birthday-widget-hero compact-hero">
          <p class="micro-label text-fire">Next session</p>
          <h3 class="mt-3 text-xl font-semibold tracking-[-0.03em] text-copy">${e.nextTitle||"Keep moving"}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${[e.nextWindow,e.nextDateLabel].filter(Boolean).join(" · ")}</p>
          ${e.nextGoal?`<p class="mt-4 text-sm leading-6 text-copy">${e.nextGoal}</p>`:""}
          ${e.nextMove?`<div class="mt-4 rounded-[20px] border border-fire/18 bg-black/10 px-4 py-4"><p class="micro-label text-fire">Next move</p><p class="mt-2 text-sm leading-6 text-copy-soft">${e.nextMove}</p></div>`:""}
        </article>

        <div class="grid gap-3">
          <article class="lane-card compact-lane-card">
            <p class="micro-label text-fire">Why this lane matters</p>
            <p class="mt-3 text-sm leading-6 text-copy-soft">${e.note||"Keep the body in the operating picture so momentum stays real instead of abstract."}</p>
          </article>

          <article class="lane-card compact-lane-card">
            <div class="flex items-end justify-between gap-3">
              <div>
                <p class="micro-label text-fire">Recent sessions</p>
                <h3 class="mt-3 text-lg font-semibold text-copy">Consistency trail</h3>
              </div>
              <span class="chip">${t.length} loaded</span>
            </div>
            <div class="mt-4 space-y-3">
              ${t.length?t.map(ke).join(""):'<p class="text-sm leading-6 text-copy-soft">No recent workouts loaded yet.</p>'}
            </div>
          </article>
        </div>
      </div>
    </section>
  `}function ke(e){return`
    <article class="phase-lane-item phase-lane-item-compact">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${e.dateLabel||""}</p>
          <h4 class="mt-2 text-base font-semibold text-copy">${e.title||"Session"}</h4>
        </div>
        ${e.typeLabel?`<span class="chip chip-warm">${e.typeLabel}</span>`:""}
      </div>
      ${e.note?`<p class="mt-3 text-sm leading-6 text-copy-soft">${e.note}</p>`:""}
    </article>
  `}function je(e={}){var i,c,a,l,n,r;const t=Number(((i=e.settings)==null?void 0:i.showUpcomingCount)||3),s=Array.isArray(e.upcoming)?e.upcoming.slice(0,t):[];return{title:((c=e.settings)==null?void 0:c.title)||"Event lane",subtitle:((a=e.settings)==null?void 0:a.subtitle)||"Upcoming DJ work, prep pressure, and the next thing that needs attention before go time.",statusLabel:d(String(((l=e.summary)==null?void 0:l.status)||"active")),seasonLabel:(n=e.summary)==null?void 0:n.season,nextMove:(r=e.summary)==null?void 0:r.note,upcoming:s.map(p=>({...p,dateLabel:u(p.date),statusLabel:d(String(p.status||"booked")),prepStageLabel:d(String(p.prepStage||"prep"))}))}}function Le(e={}){var c,a,l,n,r,p;const t=Number(((c=e.settings)==null?void 0:c.showRecentCount)||3),s=Array.isArray(e.recent)?e.recent.slice(0,t):[],i=e.nextSession||{};return{title:((a=e.settings)==null?void 0:a.title)||"Workout lane",subtitle:((l=e.settings)==null?void 0:l.subtitle)||"Training momentum, consistency streak, and the next session that keeps the body moving.",statusLabel:d(String(((n=e.summary)==null?void 0:n.status)||"active")),streakLabel:(r=e.summary)==null?void 0:r.streakLabel,note:(p=e.summary)==null?void 0:p.note,nextTitle:i.title,nextWindow:i.window,nextDateLabel:u(i.targetDate),nextGoal:i.goal,nextMove:i.nextMove,recent:s.map(o=>({...o,dateLabel:u(o.date),typeLabel:d(String(o.type||"session"))}))}}
