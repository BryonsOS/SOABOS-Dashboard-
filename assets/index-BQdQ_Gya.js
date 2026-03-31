(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))l(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function l(i){if(i.ep)return;i.ep=!0;const a=e(i);fetch(i.href,a)}})();async function N(){var w,k;const t=await fetch("./generated/content.json").then(c=>c.json()),{dashboard:s,current:e,projects:l,goals:i,areas:a,updates:r,birthdays:p}=t,g=document.querySelector("#app"),o=[...l].sort(C),n=o[0],m=r.at(-1),L=o.filter(c=>String(c.data.status||"").toLowerCase()==="active"),P=o.filter(c=>String(c.data.priority||"").toLowerCase()==="high"),b=_(e,o),y=G(a,o),v=o.slice(0,4),$=r.slice().reverse().slice(0,4);g.innerHTML=`
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
                  <p class="mt-2 text-sm leading-6 text-copy">${h(e.data.lastUpdated)}</p>
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
                ${e.data.primaryFocus.map(c=>`<li>${c}</li>`).join("")}
              </ul>
            </div>
          </div>
        </section>

        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          ${u("Active projects",L.length,"Projects in play right now.")}
          ${u("High priority",P.length,"Projects demanding stronger attention.")}
          ${u("Birthday radar",((w=p.summary)==null?void 0:w.upcomingCount)??0,"People coming up on deck.")}
          ${u("System status",s.stats.status,"Board is live and ready to steer from.")}
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
            ${n?`
              <div class="rounded-[24px] border border-line bg-white/5 p-5">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <span class="chip chip-warm">${n.data.status}</span>
                  <span class="text-xs uppercase tracking-[0.24em] text-copy-faint">${x(n.data.priority)} priority</span>
                </div>
                <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${n.data.title}</h3>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${n.data.summary}</p>
                <div class="mt-5 rounded-[22px] border border-fire/18 bg-fire-soft px-4 py-4">
                  <p class="micro-label text-fire">Next move</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${n.data.nextAction}</p>
                </div>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span class="chip">Area · ${d(n.data.area)}</span>
                  ${j(n.data.links)}
                </div>
              </div>
            `:'<p class="text-sm text-copy-soft">No spotlight project loaded yet.</p>'}

            ${m?`
              <div class="mt-4 rounded-[24px] border border-line bg-black/10 p-5">
                <p class="micro-label text-copy-faint">Latest update</p>
                <h3 class="mt-3 text-lg font-semibold text-copy">${m.data.title}</h3>
                <p class="mt-2 text-sm text-copy-faint">${h(m.data.date)} · ${m.data.kind}</p>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${m.content}</p>
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
              <span class="chip">${v.length} ranked</span>
            </div>
            <div class="grid gap-3">
              ${v.map((c,A)=>S(c,A+1)).join("")}
            </div>
          </section>

          <section class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Recent motion</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Updates feed</h2>
              </div>
              <span class="chip">${$.length} latest</span>
            </div>
            <div class="space-y-3">
              ${$.map(O).join("")}
            </div>
          </section>
        </section>

        <section class="stack-card">
          <div class="mb-5 flex items-end justify-between gap-4">
            <div>
              <p class="section-kicker">Operating lanes</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">Where the work lives</h2>
            </div>
            <span class="chip">${y.length} lanes</span>
          </div>
          <div class="grid gap-4 xl:grid-cols-2">
            ${y.map(B).join("")}
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
              ${i.map(U).join("")}
            </div>
          </section>
        </section>

        ${(k=s.sections)!=null&&k.showBirthdays?F(p):""}

        <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <section class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Projects</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">Full board</h2>
              </div>
              <span class="chip">${o.length} loaded</span>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              ${o.map(D).join("")}
            </div>
          </section>

          <section class="stack-card">
            <p class="section-kicker">Areas</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Area briefs</h2>
            <div class="mt-5 grid gap-4">
              ${a.map(M).join("")}
            </div>
          </section>
        </section>
      </main>
    </div>
  `}function f(t,s=[],e="default"){const l=s.length?s:["Nothing loaded yet."],i={orange:"border-fire/25 bg-fire-soft",warning:"border-amber-400/20 bg-amber-400/10",success:"border-emerald-400/20 bg-emerald-400/10",default:"border-line bg-white/5"};return`
    <article class="glass-card p-5 ${i[e]||i.default}">
      <p class="section-kicker">${t}</p>
      <ul class="list-dot space-y-3 pl-5 text-sm leading-6 text-copy-soft">
        ${l.map(a=>`<li>${a}</li>`).join("")}
      </ul>
    </article>
  `}function u(t,s,e){return`
    <article class="stat-card">
      <div>
        <p class="micro-label text-copy-faint">${t}</p>
        <p class="mt-3 text-sm leading-6 text-copy-soft">${e}</p>
      </div>
      <strong class="text-right text-3xl font-semibold tracking-[-0.04em] text-copy sm:text-4xl">${s}</strong>
    </article>
  `}function S(t,s){return`
    <article class="priority-card">
      <div class="flex items-start gap-4">
        <div class="priority-rank">${s}</div>
        <div class="min-w-0 flex-1">
          <div class="flex flex-wrap items-center gap-2">
            <span class="chip chip-warm">${t.data.status}</span>
            <span class="chip">${x(t.data.priority)} priority</span>
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
        <span class="chip">${x(t.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      <div class="mt-5 rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="micro-label text-copy-faint">Next move</p>
        <p class="mt-2 text-sm leading-6 text-copy">${t.data.nextAction}</p>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        <span class="chip">Area · ${d(t.data.area)}</span>
        ${j(t.data.links)}
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
      <p class="micro-label text-fire">${h(t.data.date)}</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-2 text-xs uppercase tracking-[0.22em] text-copy-faint">${t.data.kind}</p>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.content}</p>
    </article>
  `}function B(t){return`
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
        ${t.projects.length?t.projects.map(T).join(""):'<p class="text-sm leading-6 text-copy-soft">No active projects in this lane yet.</p>'}
      </div>
    </article>
  `}function T(t){return`
    <div class="rounded-[20px] border border-white/8 bg-black/10 px-4 py-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h4 class="text-base font-semibold text-copy">${t.data.title}</h4>
        <span class="chip">${x(t.data.priority)} priority</span>
      </div>
      <p class="mt-2 text-sm leading-6 text-copy-soft">${t.data.nextAction}</p>
    </div>
  `}function F(t={}){var r,p,g;const s=t.upcoming||[],e=t.needsInfo||[],l=((r=t.settings)==null?void 0:r.lookaheadDays)||30,i=((p=t.settings)==null?void 0:p.title)||"Upcoming Birthdays",a=((g=t.settings)==null?void 0:g.subtitle)||"People coming up soon and birthdays that still need details.";return`
    <section class="glass-card p-5 sm:p-6 lg:p-7">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">People lane</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">${i}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">${a}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="chip chip-warm">${s.length} in ${l} days</span>
          <span class="chip">${e.length} need info</span>
        </div>
      </div>

      <div class="mt-6 grid gap-4 xl:grid-cols-2">
        <article class="rounded-[26px] border border-fire/18 bg-fire-soft p-5">
          <p class="micro-label text-fire">Coming up</p>
          <div class="mt-4 grid gap-3">
            ${s.length?s.map(E).join(""):`<p class="text-sm leading-6 text-copy-soft">No fully dated birthdays land in the next ${l} days yet.</p>`}
          </div>
        </article>

        <article class="rounded-[26px] border border-line bg-white/[0.04] p-5">
          <p class="micro-label text-copy-faint">Needs info</p>
          <div class="mt-4 grid gap-3">
            ${e.length?e.map(R).join(""):'<p class="text-sm leading-6 text-copy-soft">Everything here has the basics filled in.</p>'}
          </div>
        </article>
      </div>
    </section>
  `}function E(t){return`
    <article class="rounded-[22px] border border-fire/20 bg-black/10 p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-copy">${t.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.dateLabel}${t.relationship?` · ${d(t.relationship)}`:""}${t.notes?` · ${t.notes}`:""}</p>
        </div>
        <div class="flex flex-wrap gap-2 sm:justify-end">
          <span class="chip chip-warm">${z(t.daysAway)}</span>
          ${t.age?`<span class="chip">Turns ${t.age}</span>`:""}
        </div>
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
  `}function j(t={}){const s=Object.entries(t).filter(([,e])=>e);return s.length?s.map(([e,l])=>q(e,l)).join(""):""}function _(t,s=[]){var i;const e=[];return(Array.isArray((i=t==null?void 0:t.data)==null?void 0:i.next)?t.data.next:[]).slice(0,2).forEach((a,r)=>{e.push({lane:r===0?"Right now":"On deck",tag:"Board move",title:a,summary:"Pulled from the live command deck so the homepage keeps the next move visible.",action:a})}),s.filter(a=>String(a.data.priority||"").toLowerCase()==="high").slice(0,2).forEach(a=>{e.push({lane:d(a.data.area||"project"),tag:`${x(a.data.priority||"active")} priority`,title:a.data.title,summary:a.data.summary,action:a.data.nextAction})}),e.slice(0,3)}function G(t=[],s=[]){return t.map(e=>({label:"Lane",title:e.data.title,summary:e.data.summary,slug:e.data.slug,projects:s.filter(l=>l.data.area===e.data.slug).sort(C).slice(0,3)})).sort((e,l)=>l.projects.length-e.projects.length||e.title.localeCompare(l.title))}function q(t,s){const e=d(t);return/^https?:\/\//i.test(s)?`<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${s}" target="_blank" rel="noreferrer">${e}</a>`:`<span class="chip">${e}: ${s}</span>`}function d(t=""){return t.replace(/[-_]/g," ").replace(/\b\w/g,s=>s.toUpperCase())}function x(t=""){return t?t.charAt(0).toUpperCase()+t.slice(1):""}function C(t,s){const e={high:0,medium:1,low:2},l={active:0,queued:1,blocked:2,paused:3,idea:4,complete:5};return(e[String(t.data.priority||"").toLowerCase()]??9)-(e[String(s.data.priority||"").toLowerCase()]??9)||(l[String(t.data.status||"").toLowerCase()]??9)-(l[String(s.data.status||"").toLowerCase()]??9)||t.data.title.localeCompare(s.data.title)}function h(t){const s=new Date(t);if(Number.isNaN(s.getTime()))return t;const e=new Date,l=new Date(e.getFullYear(),e.getMonth(),e.getDate()),i=new Date(s.getFullYear(),s.getMonth(),s.getDate()),a=Math.round((l-i)/864e5);return a===0?"Updated today":a===1?"Updated yesterday":`Updated ${s.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`}function z(t){return t===0?"Today":t===1?"Tomorrow":`${t} days`}N();
