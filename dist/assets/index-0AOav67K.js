(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))r(l);new MutationObserver(l=>{for(const i of l)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function e(l){const i={};return l.integrity&&(i.integrity=l.integrity),l.referrerPolicy&&(i.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?i.credentials="include":l.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(l){if(l.ep)return;l.ep=!0;const i=e(l);fetch(l.href,i)}})();async function B(){var k,j;const t=await fetch("./generated/content.json").then(n=>n.json()),{dashboard:s,current:e,projects:r,goals:l,areas:i,updates:a,birthdays:x}=t,g=document.querySelector("#app"),c=[...r].sort(C),o=c[0],p=a.at(-1),A=c.filter(n=>String(n.data.status||"").toLowerCase()==="active"),N=c.filter(n=>String(n.data.priority||"").toLowerCase()==="high"),b=z(e,c),v=W(i,c),$=c.slice(0,4),w=a.slice().reverse().slice(0,4);g.innerHTML=`
    <div class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0 opacity-60">
        <div class="absolute left-[-8rem] top-[-10rem] h-72 w-72 rounded-full bg-fire/12 blur-3xl"></div>
        <div class="absolute right-[-6rem] top-12 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl"></div>
        <div class="absolute bottom-[-8rem] left-1/3 h-72 w-72 rounded-full bg-amber-300/8 blur-3xl"></div>
      </div>

      <main class="relative mx-auto flex min-h-screen w-full max-w-[1280px] flex-col gap-5 px-4 pb-16 pt-4 sm:px-6 lg:px-8 lg:pb-24 lg:pt-8">
        <section class="glass-card overflow-hidden p-5 sm:p-8 lg:p-10">
          <div class="grid gap-6 lg:grid-cols-[1.3fr_0.85fr] lg:items-end">
            <div>
              <div class="mb-5 flex flex-wrap items-center gap-3">
                <span class="chip chip-warm">${s.site.title}</span>
                <span class="chip">Owner · ${s.site.owner}</span>
                <span class="chip">Mode · ${e.data.currentState}</span>
              </div>
              <p class="section-kicker">Command deck</p>
              <h1 class="max-w-[12ch] text-4xl font-semibold tracking-[-0.05em] text-copy sm:text-5xl lg:text-7xl">${s.site.tagline}</h1>
              <p class="mt-4 max-w-3xl text-base leading-7 text-copy-soft sm:text-lg">${s.site.description}</p>

              <div class="mt-6 grid gap-3 sm:grid-cols-3">
                <div class="hero-pill hero-pill-primary">
                  <p class="micro-label text-fire">Move next</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${e.data.next&&e.data.next[0]||"Choose the clearest next move and keep it visible."}</p>
                </div>
                <div class="hero-pill">
                  <p class="micro-label text-copy-faint">Updated</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${y(e.data.lastUpdated)}</p>
                </div>
                <div class="hero-pill">
                  <p class="micro-label text-copy-faint">Posture</p>
                  <p class="mt-2 text-sm leading-6 text-copy">Action-first, public-safe, built to steer from.</p>
                </div>
              </div>
            </div>

            <div class="rounded-[30px] border border-line bg-panel-strong p-5 sm:p-6">
              <p class="section-kicker">Current focus</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${e.data.title}</h2>
              <p class="mt-3 text-sm leading-6 text-copy-soft">${e.content}</p>
              <ul class="list-dot mt-5 space-y-3 pl-5 text-sm leading-6 text-copy-soft">
                ${e.data.primaryFocus.map(n=>`<li>${n}</li>`).join("")}
              </ul>
            </div>
          </div>
        </section>

        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          ${h("Active projects",A.length,"Projects in play right now.")}
          ${h("High priority",N.length,"Projects demanding stronger attention.")}
          ${h("Birthday radar",((k=x.summary)==null?void 0:k.upcomingCount)??0,"People coming up on deck.")}
          ${h("System status",s.stats.status,"Board is live and ready to steer from.")}
        </section>

        <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div class="stack-card">
            <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p class="section-kicker">Decision lane</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">Immediate moves</h2>
                <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">The board should make the next move obvious. These are the clearest actions on deck right now.</p>
              </div>
              <div class="flex flex-wrap gap-2">
                <span class="chip chip-warm">${b.length} moves loaded</span>
                <span class="chip">Command view</span>
              </div>
            </div>
            <div class="mt-6 grid gap-4 xl:grid-cols-3">
              ${b.map(I).join("")}
            </div>
          </div>

          <aside class="stack-card">
            <p class="section-kicker">Spotlight</p>
            ${o?`
              <div class="rounded-[24px] border border-line bg-white/5 p-5">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <span class="chip chip-warm">${o.data.status}</span>
                  <span class="text-xs uppercase tracking-[0.24em] text-copy-faint">${m(o.data.priority)} priority</span>
                </div>
                <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${o.data.title}</h3>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${o.data.summary}</p>
                <div class="mt-5 rounded-[22px] border border-fire/18 bg-fire-soft px-4 py-4">
                  <p class="micro-label text-fire">Next move</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${o.data.nextAction}</p>
                </div>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span class="chip">Area · ${d(o.data.area)}</span>
                  ${P(o.data.links)}
                </div>
              </div>
            `:'<p class="text-sm text-copy-soft">No spotlight project loaded yet.</p>'}

            ${p?`
              <div class="mt-4 rounded-[24px] border border-line bg-black/10 p-5">
                <p class="micro-label text-copy-faint">Latest update</p>
                <h3 class="mt-3 text-lg font-semibold text-copy">${p.data.title}</h3>
                <p class="mt-2 text-sm text-copy-faint">${y(p.data.date)} · ${p.data.kind}</p>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${p.content}</p>
              </div>
            `:""}
          </aside>
        </section>

        <section class="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <section class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Hot list</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">Priority stack</h2>
              </div>
              <span class="chip">${$.length} ranked</span>
            </div>
            <div class="grid gap-3">
              ${$.map((n,S)=>T(n,S+1)).join("")}
            </div>
          </section>

          <section class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Recent motion</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Updates feed</h2>
              </div>
              <span class="chip">${w.length} latest</span>
            </div>
            <div class="space-y-3">
              ${w.map(O).join("")}
            </div>
          </section>
        </section>

        <section class="stack-card">
          <div class="mb-5 flex items-end justify-between gap-4">
            <div>
              <p class="section-kicker">Operating lanes</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">Where the work lives</h2>
            </div>
            <span class="chip">${v.length} lanes</span>
          </div>
          <div class="grid gap-4 xl:grid-cols-2">
            ${v.map(q).join("")}
          </div>
        </section>

        <section class="grid gap-4 lg:grid-cols-2">
          <div class="grid gap-4 sm:grid-cols-2">
            ${f("Now",e.data.primaryFocus,"orange")}
            ${f("Next",e.data.next||[],"default")}
            ${f("Blockers",e.data.blockers||[],"warning")}
            ${f("Wins",e.data.wins||[],"success")}
          </div>

          <section class="stack-card">
            <p class="section-kicker">Goals</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">What this protects</h2>
            <div class="mt-5 space-y-4">
              ${l.map(U).join("")}
            </div>
          </section>
        </section>

        ${(j=s.sections)!=null&&j.showBirthdays?_(x):""}

        <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <section class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Projects</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">Full board</h2>
              </div>
              <span class="chip">${c.length} loaded</span>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              ${c.map(D).join("")}
            </div>
          </section>

          <section class="stack-card">
            <p class="section-kicker">Areas</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Area briefs</h2>
            <div class="mt-5 grid gap-4">
              ${i.map(M).join("")}
            </div>
          </section>
        </section>
      </main>
    </div>
  `}function f(t,s=[],e="default"){const r=s.length?s:["Nothing loaded yet."],l={orange:"border-fire/25 bg-fire-soft",warning:"border-amber-400/20 bg-amber-400/10",success:"border-emerald-400/20 bg-emerald-400/10",default:"border-line bg-white/5"};return`
    <article class="glass-card p-5 ${l[e]||l.default}">
      <p class="section-kicker">${t}</p>
      <ul class="list-dot space-y-3 pl-5 text-sm leading-6 text-copy-soft">
        ${r.map(i=>`<li>${i}</li>`).join("")}
      </ul>
    </article>
  `}function h(t,s,e){return`
    <article class="stat-card">
      <div>
        <p class="micro-label text-copy-faint">${t}</p>
        <p class="mt-3 text-sm leading-6 text-copy-soft">${e}</p>
      </div>
      <strong class="text-right text-3xl font-semibold tracking-[-0.04em] text-copy sm:text-4xl">${s}</strong>
    </article>
  `}function T(t,s){return`
    <article class="priority-card">
      <div class="flex items-start gap-4">
        <div class="priority-rank">${s}</div>
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="chip chip-warm">${t.data.status}</span>
            <span class="chip">${m(t.data.priority)} priority</span>
            <span class="chip">${d(t.data.area)}</span>
          </div>
          <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-copy">${t.data.title}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
          <div class="mt-4 rounded-[20px] border border-white/8 bg-black/10 px-4 py-4">
            <p class="micro-label text-copy-faint">Next move</p>
            <p class="mt-2 text-sm leading-6 text-copy">${t.data.nextAction}</p>
          </div>
        </div>
      </div>
    </article>
  `}function D(t){return`
    <article class="rounded-[26px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${t.data.status}</p>
        <span class="chip">${m(t.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      <div class="mt-5 rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="micro-label text-copy-faint">Next move</p>
        <p class="mt-2 text-sm leading-6 text-copy">${t.data.nextAction}</p>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        <span class="chip">Area · ${d(t.data.area)}</span>
        ${P(t.data.links)}
      </div>
    </article>
  `}function I(t){return`
    <article class="rounded-[26px] border border-fire/18 bg-fire-soft p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="micro-label text-fire">${t.lane}</p>
        <span class="chip">${t.tag}</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-copy">${t.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.summary}</p>
      <div class="mt-5 rounded-[22px] border border-fire/16 bg-black/10 px-4 py-4">
        <p class="micro-label text-fire">Action</p>
        <p class="mt-2 text-sm leading-6 text-copy">${t.action}</p>
      </div>
    </article>
  `}function U(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="micro-label text-fire">${t.data.status}</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      <p class="mt-4 text-xs uppercase tracking-[0.22em] text-copy-faint">${t.data.horizon} · ${d(t.data.area)}</p>
    </article>
  `}function M(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="micro-label text-fire">Area</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      ${t.content?`<p class="mt-4 text-sm leading-6 text-copy-faint">${t.content}</p>`:""}
    </article>
  `}function O(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="micro-label text-fire">${y(t.data.date)}</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-2 text-xs uppercase tracking-[0.22em] text-copy-faint">${t.data.kind}</p>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.content}</p>
    </article>
  `}function q(t){return`
    <article class="lane-card">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p class="micro-label text-fire">${t.label}</p>
          <h3 class="mt-3 text-xl font-semibold tracking-[-0.03em] text-copy">${t.title}</h3>
          <p class="mt-3 text-sm leading-6 text-copy-soft">${t.summary}</p>
        </div>
        <span class="chip chip-warm">${t.projects.length} active</span>
      </div>
      <div class="mt-5 space-y-3">
        ${t.projects.length?t.projects.map(F).join(""):'<p class="text-sm leading-6 text-copy-soft">No active projects in this lane yet.</p>'}
      </div>
    </article>
  `}function F(t){return`
    <div class="rounded-[20px] border border-white/8 bg-black/10 px-4 py-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h4 class="text-base font-semibold text-copy">${t.data.title}</h4>
        <span class="chip">${m(t.data.priority)} priority</span>
      </div>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${t.data.nextAction}</p>
    </div>
  `}function _(t={}){var g,c,o;const s=t.upcoming||[],e=t.needsInfo||[],r=((g=t.settings)==null?void 0:g.lookaheadDays)||30,l=((c=t.settings)==null?void 0:c.title)||"Upcoming Birthdays",i=((o=t.settings)==null?void 0:o.subtitle)||"People coming up soon and birthdays that still need details.",a=s[0],x=[{label:"Upcoming",value:s.length,helper:`inside ${r} days`},{label:"Need details",value:e.length,helper:"missing profile or prep info"},{label:"Next on deck",value:a?u(a.daysAway):"None queued",helper:a?a.name:"no dated birthdays in range"}];return`
    <section class="glass-card p-5 sm:p-6 lg:p-7">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">People lane</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">${l}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">${i}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="chip chip-warm">${s.length} in ${r} days</span>
          <span class="chip">${e.length} need info</span>
        </div>
      </div>

      <div class="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <article class="birthday-hero-card">
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p class="micro-label text-fire">Birthday snapshot</p>
              <h3 class="mt-3 text-2xl font-semibold tracking-[-0.03em] text-copy">${a?`${a.name} is next up`:"Tracker is ready for the next move"}</h3>
              <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">${a?`${a.relationship||"Contact"} · ${a.dateLabel} · ${u(a.daysAway)}. Keep the next person visible, keep the prep simple, and stop making birthdays a surprise scramble.`:"The birthday lane is wired in. As real entries are filled out, this snapshot becomes a true at-a-glance reminder board."}</p>
            </div>
            <div class="birthday-badge-stack">
              <span class="chip chip-warm">${a?u(a.daysAway):"No dated entry"}</span>
              ${a!=null&&a.category?`<span class="chip">${a.category}</span>`:""}
            </div>
          </div>

          <div class="mt-6 grid gap-3 sm:grid-cols-3">
            ${x.map(E).join("")}
          </div>

          ${a?`
            <div class="mt-6 rounded-[24px] border border-fire/18 bg-black/10 p-5">
              <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p class="micro-label text-fire">Prep cue</p>
                  <h4 class="mt-3 text-xl font-semibold text-copy">${a.name}</h4>
                  <p class="mt-2 text-sm leading-6 text-copy-soft">${[a.dateLabel,a.relationship,a.leadTime?`Prep: ${a.leadTime}`:""].filter(Boolean).join(" · ")}</p>
                </div>
                ${a.age?`<span class="chip">Turns ${a.age}</span>`:""}
              </div>
              <div class="mt-4 grid gap-3 sm:grid-cols-2">
                ${L("Profile",a.profile||"Add a short line that makes this person immediately recognizable.")}
                ${L("Interests",a.interests||"Add gift or vibe clues so ideas land faster.")}
              </div>
            </div>
          `:""}
        </article>

        <article class="birthday-sidebar-card">
          <div class="flex items-end justify-between gap-4">
            <div>
              <p class="micro-label text-copy-faint">Gaps to close</p>
              <h3 class="mt-3 text-xl font-semibold tracking-[-0.03em] text-copy">Needs info</h3>
            </div>
            <span class="chip">${e.length} open</span>
          </div>
          <div class="mt-4 grid gap-3">
            ${e.length?e.map(R).join(""):'<p class="text-sm leading-6 text-copy-soft">Everything here has the basics filled in.</p>'}
          </div>
        </article>
      </div>

      <div class="mt-6">
        <div class="mb-4 flex items-end justify-between gap-4">
          <div>
            <p class="micro-label text-fire">Upcoming queue</p>
            <h3 class="mt-2 text-xl font-semibold tracking-[-0.03em] text-copy">Who is coming up next</h3>
          </div>
          <span class="chip">${s.length} loaded</span>
        </div>
        <div class="birthday-grid">
          ${s.length?s.map(G).join(""):`<p class="text-sm leading-6 text-copy-soft">No fully dated birthdays land in the next ${r} days yet.</p>`}
        </div>
      </div>
    </section>
  `}function E(t){return`
    <article class="birthday-quick-stat">
      <p class="micro-label text-copy-faint">${t.label}</p>
      <div class="mt-3 flex items-end justify-between gap-3">
        <strong class="text-2xl font-semibold tracking-[-0.04em] text-copy">${t.value}</strong>
        <span class="text-right text-xs uppercase tracking-[0.22em] text-copy-faint">${t.helper}</span>
      </div>
    </article>
  `}function L(t,s){return`
    <div class="rounded-[20px] border border-white/8 bg-white/[0.03] p-4">
      <p class="micro-label text-copy-faint">${t}</p>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${s}</p>
    </div>
  `}function G(t){const s=[t.dateLabel,t.relationship,t.category,t.leadTime?`Prep: ${t.leadTime}`:""].filter(Boolean).join(" · "),e=[t.profile,t.interests?`Likes: ${t.interests}`:"",t.notes].filter(Boolean).join(" · ");return`
    <article class="birthday-card">
      <div class="flex flex-col gap-4">
        <div class="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p class="micro-label text-fire">${u(t.daysAway)}</p>
            <h3 class="mt-3 text-xl font-semibold text-copy">${t.name}</h3>
            <p class="mt-2 text-sm leading-6 text-copy-soft">${s}</p>
          </div>
          <div class="flex flex-wrap gap-2 sm:justify-end">
            <span class="chip chip-warm">${t.dateLabel}</span>
            ${t.age?`<span class="chip">Turns ${t.age}</span>`:""}
          </div>
        </div>
        ${e?`<p class="text-sm leading-6 text-copy-faint">${e}</p>`:""}
      </div>
    </article>
  `}function R(t){return`
    <article class="rounded-[22px] border border-dashed border-line bg-black/10 p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-copy">${t.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.notes||"Still needs a little detail before it is fully useful."}</p>
        </div>
        <span class="chip">Missing ${t.missing.join(" + ")}</span>
      </div>
    </article>
  `}function P(t={}){const s=Object.entries(t).filter(([,e])=>e);return s.length?s.map(([e,r])=>H(e,r)).join(""):""}function z(t,s=[]){var l;const e=[];return(Array.isArray((l=t==null?void 0:t.data)==null?void 0:l.next)?t.data.next:[]).slice(0,2).forEach((i,a)=>{e.push({lane:a===0?"Right now":"On deck",tag:"Board move",title:i,summary:"Pulled from the live command deck so the homepage keeps the next move visible.",action:i})}),s.filter(i=>String(i.data.priority||"").toLowerCase()==="high").slice(0,2).forEach(i=>{e.push({lane:d(i.data.area||"project"),tag:`${m(i.data.priority||"active")} priority`,title:i.data.title,summary:i.data.summary,action:i.data.nextAction})}),e.slice(0,3)}function W(t=[],s=[]){return t.map(e=>({label:"Lane",title:e.data.title,summary:e.data.summary,slug:e.data.slug,projects:s.filter(r=>r.data.area===e.data.slug).sort(C).slice(0,3)})).sort((e,r)=>r.projects.length-e.projects.length||e.title.localeCompare(r.title))}function H(t,s){const e=d(t);return/^https?:\/\//i.test(s)?`<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${s}" target="_blank" rel="noreferrer">${e}</a>`:`<span class="chip">${e}: ${s}</span>`}function d(t=""){return t.replace(/[-_]/g," ").replace(/\b\w/g,s=>s.toUpperCase())}function m(t=""){return t?t.charAt(0).toUpperCase()+t.slice(1):""}function C(t,s){const e={high:0,medium:1,low:2},r={active:0,queued:1,blocked:2,paused:3,idea:4,complete:5};return(e[String(t.data.priority||"").toLowerCase()]??9)-(e[String(s.data.priority||"").toLowerCase()]??9)||(r[String(t.data.status||"").toLowerCase()]??9)-(r[String(s.data.status||"").toLowerCase()]??9)||t.data.title.localeCompare(s.data.title)}function y(t){const s=new Date(t);if(Number.isNaN(s.getTime()))return t;const e=new Date,r=new Date(e.getFullYear(),e.getMonth(),e.getDate()),l=new Date(s.getFullYear(),s.getMonth(),s.getDate()),i=Math.round((r-l)/864e5);return i===0?"Updated today":i===1?"Updated yesterday":`Updated ${s.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`}function u(t){return t===0?"Today":t===1?"Tomorrow":`${t} days`}B();
