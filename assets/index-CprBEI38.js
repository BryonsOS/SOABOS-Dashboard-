(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))r(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function s(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(a){if(a.ep)return;a.ep=!0;const i=s(a);fetch(a.href,i)}})();async function k(){var h,y;const t=await fetch("./generated/content.json").then(u=>u.json()),{dashboard:e,current:s,projects:r,goals:a,areas:i,updates:n,birthdays:c}=t,p=document.querySelector("#app"),f=[...r].sort(U),o=f[0],l=n.at(-1);p.innerHTML=`
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
                <span class="chip chip-warm">${e.site.title}</span>
                <span class="chip">Owner · ${e.site.owner}</span>
                <span class="chip">Mode · ${s.data.currentState}</span>
              </div>
              <p class="section-kicker">Operating board</p>
              <h1 class="max-w-[12ch] text-4xl font-semibold tracking-[-0.04em] text-copy sm:text-5xl lg:text-7xl">${e.site.tagline}</h1>
              <p class="mt-5 max-w-3xl text-base leading-7 text-copy-soft sm:text-lg">${e.site.description}</p>

              <div class="mt-8 grid gap-3 sm:grid-cols-3">
                <div class="rounded-3xl border border-fire/20 bg-fire-soft px-4 py-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Move next</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${s.data.next&&s.data.next[0]||"Choose the clearest next move and keep it visible."}</p>
                </div>
                <div class="rounded-3xl border border-line bg-white/5 px-4 py-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Updated</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${b(s.data.lastUpdated)}</p>
                </div>
                <div class="rounded-3xl border border-line bg-white/5 px-4 py-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Board posture</p>
                  <p class="mt-2 text-sm leading-6 text-copy">Clean, visual, and built to keep motion in sight.</p>
                </div>
              </div>
            </div>

            <div class="rounded-[30px] border border-line bg-panel-strong p-5 sm:p-6">
              <p class="section-kicker">Current focus</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">${s.data.title}</h2>
              <p class="mt-3 text-sm leading-6 text-copy-soft">${s.content}</p>
              <ul class="list-dot mt-5 space-y-3 pl-5 text-sm leading-6 text-copy-soft">
                ${s.data.primaryFocus.map(u=>`<li>${u}</li>`).join("")}
              </ul>
            </div>
          </div>
        </section>

        <section class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div class="grid gap-4 sm:grid-cols-2">
            ${x("Now",s.data.primaryFocus,"orange")}
            ${x("Next",s.data.next||[],"default")}
            ${x("Blockers",s.data.blockers||[],"warning")}
            ${x("Wins",s.data.wins||[],"success")}
          </div>

          <aside class="glass-card p-5 sm:p-6">
            <p class="section-kicker">Spotlight</p>
            ${o?`
              <div class="rounded-[24px] border border-line bg-white/5 p-5">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <span class="chip chip-warm">${o.data.status}</span>
                  <span class="text-xs uppercase tracking-[0.24em] text-copy-faint">${$(o.data.priority)} priority</span>
                </div>
                <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${o.data.title}</h3>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${o.data.summary}</p>
                <div class="mt-5 rounded-[22px] border border-fire/18 bg-fire-soft px-4 py-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Next move</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${o.data.nextAction}</p>
                </div>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span class="chip">Area · ${d(o.data.area)}</span>
                  ${v(o.data.links)}
                </div>
              </div>
            `:'<p class="text-sm text-copy-soft">No spotlight project loaded yet.</p>'}

            ${l?`
              <div class="mt-4 rounded-[24px] border border-line bg-black/10 p-5">
                <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Latest update</p>
                <h3 class="mt-3 text-lg font-semibold text-copy">${l.data.title}</h3>
                <p class="mt-2 text-sm text-copy-faint">${b(l.data.date)} · ${l.data.kind}</p>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${l.content}</p>
              </div>
            `:""}
          </aside>
        </section>

        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          ${m("Active projects",e.stats.projects,"Projects in play right now.")}
          ${m("Active goals",e.stats.goals,"Targets this system is protecting.")}
          ${m("Birthday radar",((h=c.summary)==null?void 0:h.upcomingCount)??0,"People coming up on deck.")}
          ${m("System status",e.stats.status,"Board is live and ready to steer from.")}
        </section>

        ${(y=e.sections)!=null&&y.showBirthdays?D(c):""}

        <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Projects</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">What’s in motion</h2>
              </div>
              <span class="chip">${f.length} loaded</span>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              ${f.map(w).join("")}
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <section class="stack-card">
              <p class="section-kicker">Goals</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">What this protects</h2>
              <div class="mt-5 space-y-4">
                ${a.map(j).join("")}
              </div>
            </section>

            <section class="stack-card">
              <p class="section-kicker">Focus lanes</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Board lanes</h2>
              <div class="mt-5 grid gap-3">
                ${g("Systems","Dashboards, routing, structure, and visibility work that keeps everything easier to steer.")}
                ${g("Work","Business, marketing, creative builds, and experiments tied to output and momentum.")}
                ${g("Events","DJ prep, scheduling, paperwork, communication, and event-day readiness.")}
                ${g("Home & Family","Family coordination, recurring logistics, and the systems that reduce scramble.")}
              </div>
            </section>
          </div>
        </section>

        <section class="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <section class="stack-card">
            <p class="section-kicker">Areas</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Where the work lives</h2>
            <div class="mt-5 grid gap-4">
              ${i.map(C).join("")}
            </div>
          </section>

          <section class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Updates</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Recent motion</h2>
              </div>
              <span class="chip">${n.length} entries</span>
            </div>
            <div class="space-y-4">
              ${n.slice().reverse().map(N).join("")}
            </div>
          </section>
        </section>
      </main>
    </div>
  `}function x(t,e=[],s="default"){const r=e.length?e:["Nothing loaded yet."],a={orange:"border-fire/25 bg-fire-soft",warning:"border-amber-400/20 bg-amber-400/10",success:"border-emerald-400/20 bg-emerald-400/10",default:"border-line bg-white/5"};return`
    <article class="glass-card p-5 ${a[s]||a.default}">
      <p class="section-kicker">${t}</p>
      <ul class="list-dot space-y-3 pl-5 text-sm leading-6 text-copy-soft">
        ${r.map(i=>`<li>${i}</li>`).join("")}
      </ul>
    </article>
  `}function m(t,e,s){return`
    <article class="stat-card">
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">${t}</p>
        <p class="mt-3 text-sm leading-6 text-copy-soft">${s}</p>
      </div>
      <strong class="text-right text-3xl font-semibold tracking-[-0.04em] text-copy sm:text-4xl">${e}</strong>
    </article>
  `}function w(t){return`
    <article class="rounded-[26px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${t.data.status}</p>
        <span class="chip">${$(t.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      <div class="mt-5 rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Next move</p>
        <p class="mt-2 text-sm leading-6 text-copy">${t.data.nextAction}</p>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        <span class="chip">Area · ${d(t.data.area)}</span>
        ${v(t.data.links)}
      </div>
    </article>
  `}function j(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${t.data.status}</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      <p class="mt-4 text-xs uppercase tracking-[0.22em] text-copy-faint">${t.data.horizon} · ${d(t.data.area)}</p>
    </article>
  `}function C(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Area</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      ${t.content?`<p class="mt-4 text-sm leading-6 text-copy-faint">${t.content}</p>`:""}
    </article>
  `}function N(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${b(t.data.date)}</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-2 text-xs uppercase tracking-[0.22em] text-copy-faint">${t.data.kind}</p>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.content}</p>
    </article>
  `}function g(t,e){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Lane</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${e}</p>
    </article>
  `}function D(t={}){var n,c,p;const e=t.upcoming||[],s=t.needsInfo||[],r=((n=t.settings)==null?void 0:n.lookaheadDays)||30,a=((c=t.settings)==null?void 0:c.title)||"Upcoming Birthdays",i=((p=t.settings)==null?void 0:p.subtitle)||"People coming up soon and birthdays that still need details.";return`
    <section class="glass-card p-5 sm:p-6 lg:p-7">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">People lane</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">${a}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">${i}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <span class="chip chip-warm">${e.length} in ${r} days</span>
          <span class="chip">${s.length} need info</span>
        </div>
      </div>

      <div class="mt-6 grid gap-4 xl:grid-cols-2">
        <article class="rounded-[26px] border border-fire/18 bg-fire-soft p-5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Coming up</p>
          <div class="mt-4 grid gap-3">
            ${e.length?e.map(L).join(""):`<p class="text-sm leading-6 text-copy-soft">No fully dated birthdays land in the next ${r} days yet.</p>`}
          </div>
        </article>

        <article class="rounded-[26px] border border-line bg-white/[0.04] p-5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Needs info</p>
          <div class="mt-4 grid gap-3">
            ${s.length?s.map(P).join(""):'<p class="text-sm leading-6 text-copy-soft">Everything here has the basics filled in.</p>'}
          </div>
        </article>
      </div>
    </section>
  `}function L(t){return`
    <article class="rounded-[22px] border border-fire/20 bg-black/10 p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-copy">${t.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.dateLabel}${t.relationship?` · ${d(t.relationship)}`:""}${t.notes?` · ${t.notes}`:""}</p>
        </div>
        <div class="flex flex-wrap gap-2 sm:justify-end">
          <span class="chip chip-warm">${B(t.daysAway)}</span>
          ${t.age?`<span class="chip">Turns ${t.age}</span>`:""}
        </div>
      </div>
    </article>
  `}function P(t){return`
    <article class="rounded-[22px] border border-dashed border-line bg-black/10 p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-copy">${t.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.notes||"Still needs a little detail before it is fully useful."}</p>
        </div>
        <span class="chip">Missing ${t.missing.join(" + ")}</span>
      </div>
    </article>
  `}function v(t={}){const e=Object.entries(t).filter(([,s])=>s);return e.length?e.map(([s,r])=>A(s,r)).join(""):""}function A(t,e){const s=d(t);return/^https?:\/\//i.test(e)?`<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${e}" target="_blank" rel="noreferrer">${s}</a>`:`<span class="chip">${s}: ${e}</span>`}function d(t=""){return t.replace(/[-_]/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function $(t=""){return t?t.charAt(0).toUpperCase()+t.slice(1):""}function U(t,e){const s={high:0,medium:1,low:2};return(s[t.data.priority]??9)-(s[e.data.priority]??9)||t.data.title.localeCompare(e.data.title)}function b(t){const e=new Date(t);if(Number.isNaN(e.getTime()))return t;const s=new Date,r=new Date(s.getFullYear(),s.getMonth(),s.getDate()),a=new Date(e.getFullYear(),e.getMonth(),e.getDate()),i=Math.round((r-a)/864e5);return i===0?"Updated today":i===1?"Updated yesterday":`Updated ${e.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`}function B(t){return t===0?"Today":t===1?"Tomorrow":`${t} days`}k();
