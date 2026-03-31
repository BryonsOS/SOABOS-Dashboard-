(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function r(i){if(i.ep)return;i.ep=!0;const a=s(i);fetch(i.href,a)}})();async function C(){var v,$;const t=await fetch("./generated/content.json").then(c=>c.json()),{dashboard:e,current:s,projects:r,goals:i,areas:a,updates:o,birthdays:p}=t,x=document.querySelector("#app"),l=[...r].sort(O),n=l[0],m=o.at(-1),w=l.filter(c=>String(c.data.status||"").toLowerCase()==="active"),j=l.filter(c=>String(c.data.priority||"").toLowerCase()==="high"),y=M(s,l);x.innerHTML=`
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
                  <p class="mt-2 text-sm leading-6 text-copy">${h(s.data.lastUpdated)}</p>
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
                ${s.data.primaryFocus.map(c=>`<li>${c}</li>`).join("")}
              </ul>
            </div>
          </div>
        </section>

        <section class="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div class="grid gap-4 sm:grid-cols-2">
            ${g("Now",s.data.primaryFocus,"orange")}
            ${g("Next",s.data.next||[],"default")}
            ${g("Blockers",s.data.blockers||[],"warning")}
            ${g("Wins",s.data.wins||[],"success")}
          </div>

          <aside class="glass-card p-5 sm:p-6">
            <p class="section-kicker">Spotlight</p>
            ${n?`
              <div class="rounded-[24px] border border-line bg-white/5 p-5">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <span class="chip chip-warm">${n.data.status}</span>
                  <span class="text-xs uppercase tracking-[0.24em] text-copy-faint">${b(n.data.priority)} priority</span>
                </div>
                <h3 class="mt-4 text-2xl font-semibold tracking-[-0.03em] text-copy">${n.data.title}</h3>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${n.data.summary}</p>
                <div class="mt-5 rounded-[22px] border border-fire/18 bg-fire-soft px-4 py-4">
                  <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Next move</p>
                  <p class="mt-2 text-sm leading-6 text-copy">${n.data.nextAction}</p>
                </div>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span class="chip">Area · ${d(n.data.area)}</span>
                  ${k(n.data.links)}
                </div>
              </div>
            `:'<p class="text-sm text-copy-soft">No spotlight project loaded yet.</p>'}

            ${m?`
              <div class="mt-4 rounded-[24px] border border-line bg-black/10 p-5">
                <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Latest update</p>
                <h3 class="mt-3 text-lg font-semibold text-copy">${m.data.title}</h3>
                <p class="mt-2 text-sm text-copy-faint">${h(m.data.date)} · ${m.data.kind}</p>
                <p class="mt-3 text-sm leading-6 text-copy-soft">${m.content}</p>
              </div>
            `:""}
          </aside>
        </section>

        <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          ${f("Active projects",w.length,"Projects in play right now.")}
          ${f("High priority",j.length,"Projects demanding stronger attention.")}
          ${f("Birthday radar",((v=p.summary)==null?void 0:v.upcomingCount)??0,"People coming up on deck.")}
          ${f("System status",e.stats.status,"Board is live and ready to steer from.")}
        </section>

        <section class="glass-card p-5 sm:p-6 lg:p-7">
          <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p class="section-kicker">Decision lane</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">Immediate moves</h2>
              <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">The board should help the next move jump out. These are the clearest actions on deck right now.</p>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="chip chip-warm">${y.length} moves loaded</span>
              <span class="chip">Command view</span>
            </div>
          </div>
          <div class="mt-6 grid gap-4 xl:grid-cols-3">
            ${y.map(L).join("")}
          </div>
        </section>

        ${($=e.sections)!=null&&$.showBirthdays?S(p):""}

        <section class="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Projects</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">What’s in motion</h2>
              </div>
              <span class="chip">${l.length} loaded</span>
            </div>
            <div class="grid gap-4 md:grid-cols-2">
              ${l.map(P).join("")}
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <section class="stack-card">
              <p class="section-kicker">Goals</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">What this protects</h2>
              <div class="mt-5 space-y-4">
                ${i.map(A).join("")}
              </div>
            </section>

            <section class="stack-card">
              <p class="section-kicker">Focus lanes</p>
              <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Board lanes</h2>
              <div class="mt-5 grid gap-3">
                ${u("Systems","Dashboards, routing, structure, and visibility work that keeps everything easier to steer.")}
                ${u("Work","Business, marketing, creative builds, and experiments tied to output and momentum.")}
                ${u("Events","DJ prep, scheduling, paperwork, communication, and event-day readiness.")}
                ${u("Home & Family","Family coordination, recurring logistics, and the systems that reduce scramble.")}
              </div>
            </section>
          </div>
        </section>

        <section class="grid gap-4 xl:grid-cols-[0.9fr_1.1fr]">
          <section class="stack-card">
            <p class="section-kicker">Areas</p>
            <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Where the work lives</h2>
            <div class="mt-5 grid gap-4">
              ${a.map(D).join("")}
            </div>
          </section>

          <section class="stack-card">
            <div class="mb-5 flex items-end justify-between gap-4">
              <div>
                <p class="section-kicker">Updates</p>
                <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy">Recent motion</h2>
              </div>
              <span class="chip">${o.length} entries</span>
            </div>
            <div class="space-y-4">
              ${o.slice().reverse().map(N).join("")}
            </div>
          </section>
        </section>
      </main>
    </div>
  `}function g(t,e=[],s="default"){const r=e.length?e:["Nothing loaded yet."],i={orange:"border-fire/25 bg-fire-soft",warning:"border-amber-400/20 bg-amber-400/10",success:"border-emerald-400/20 bg-emerald-400/10",default:"border-line bg-white/5"};return`
    <article class="glass-card p-5 ${i[s]||i.default}">
      <p class="section-kicker">${t}</p>
      <ul class="list-dot space-y-3 pl-5 text-sm leading-6 text-copy-soft">
        ${r.map(a=>`<li>${a}</li>`).join("")}
      </ul>
    </article>
  `}function f(t,e,s){return`
    <article class="stat-card">
      <div>
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">${t}</p>
        <p class="mt-3 text-sm leading-6 text-copy-soft">${s}</p>
      </div>
      <strong class="text-right text-3xl font-semibold tracking-[-0.04em] text-copy sm:text-4xl">${e}</strong>
    </article>
  `}function P(t){return`
    <article class="rounded-[26px] border border-line bg-white/[0.04] p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${t.data.status}</p>
        <span class="chip">${b(t.data.priority)} priority</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      <div class="mt-5 rounded-[22px] border border-white/8 bg-black/10 px-4 py-4">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Next move</p>
        <p class="mt-2 text-sm leading-6 text-copy">${t.data.nextAction}</p>
      </div>
      <div class="mt-5 flex flex-wrap gap-2">
        <span class="chip">Area · ${d(t.data.area)}</span>
        ${k(t.data.links)}
      </div>
    </article>
  `}function L(t){return`
    <article class="rounded-[26px] border border-fire/18 bg-fire-soft p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${t.lane}</p>
        <span class="chip">${t.tag}</span>
      </div>
      <h3 class="mt-4 text-xl font-semibold tracking-[-0.03em] text-copy">${t.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.summary}</p>
      <div class="mt-5 rounded-[22px] border border-fire/16 bg-black/10 px-4 py-4">
        <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Action</p>
        <p class="mt-2 text-sm leading-6 text-copy">${t.action}</p>
      </div>
    </article>
  `}function A(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${t.data.status}</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      <p class="mt-4 text-xs uppercase tracking-[0.22em] text-copy-faint">${t.data.horizon} · ${d(t.data.area)}</p>
    </article>
  `}function D(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">Area</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.data.summary}</p>
      ${t.content?`<p class="mt-4 text-sm leading-6 text-copy-faint">${t.content}</p>`:""}
    </article>
  `}function N(t){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-fire">${h(t.data.date)}</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t.data.title}</h3>
      <p class="mt-2 text-xs uppercase tracking-[0.22em] text-copy-faint">${t.data.kind}</p>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${t.content}</p>
    </article>
  `}function u(t,e){return`
    <article class="rounded-[24px] border border-line bg-white/[0.04] p-5">
      <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Lane</p>
      <h3 class="mt-3 text-lg font-semibold text-copy">${t}</h3>
      <p class="mt-3 text-sm leading-6 text-copy-soft">${e}</p>
    </article>
  `}function S(t={}){var o,p,x;const e=t.upcoming||[],s=t.needsInfo||[],r=((o=t.settings)==null?void 0:o.lookaheadDays)||30,i=((p=t.settings)==null?void 0:p.title)||"Upcoming Birthdays",a=((x=t.settings)==null?void 0:x.subtitle)||"People coming up soon and birthdays that still need details.";return`
    <section class="glass-card p-5 sm:p-6 lg:p-7">
      <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="section-kicker">People lane</p>
          <h2 class="text-2xl font-semibold tracking-[-0.03em] text-copy sm:text-3xl">${i}</h2>
          <p class="mt-3 max-w-2xl text-sm leading-6 text-copy-soft">${a}</p>
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
            ${e.length?e.map(I).join(""):`<p class="text-sm leading-6 text-copy-soft">No fully dated birthdays land in the next ${r} days yet.</p>`}
          </div>
        </article>

        <article class="rounded-[26px] border border-line bg-white/[0.04] p-5">
          <p class="text-[11px] font-semibold uppercase tracking-[0.24em] text-copy-faint">Needs info</p>
          <div class="mt-4 grid gap-3">
            ${s.length?s.map(B).join(""):'<p class="text-sm leading-6 text-copy-soft">Everything here has the basics filled in.</p>'}
          </div>
        </article>
      </div>
    </section>
  `}function I(t){return`
    <article class="rounded-[22px] border border-fire/20 bg-black/10 p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-copy">${t.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.dateLabel}${t.relationship?` · ${d(t.relationship)}`:""}${t.notes?` · ${t.notes}`:""}</p>
        </div>
        <div class="flex flex-wrap gap-2 sm:justify-end">
          <span class="chip chip-warm">${F(t.daysAway)}</span>
          ${t.age?`<span class="chip">Turns ${t.age}</span>`:""}
        </div>
      </div>
    </article>
  `}function B(t){return`
    <article class="rounded-[22px] border border-dashed border-line bg-black/10 p-4">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 class="text-lg font-semibold text-copy">${t.name}</h3>
          <p class="mt-2 text-sm leading-6 text-copy-soft">${t.notes||"Still needs a little detail before it is fully useful."}</p>
        </div>
        <span class="chip">Missing ${t.missing.join(" + ")}</span>
      </div>
    </article>
  `}function k(t={}){const e=Object.entries(t).filter(([,s])=>s);return e.length?e.map(([s,r])=>U(s,r)).join(""):""}function M(t,e=[]){var i;const s=[];return(Array.isArray((i=t==null?void 0:t.data)==null?void 0:i.next)?t.data.next:[]).slice(0,2).forEach((a,o)=>{s.push({lane:o===0?"Right now":"On deck",tag:"Board move",title:a,summary:"Pulled from the live command deck so the homepage keeps the next move visible.",action:a})}),e.filter(a=>String(a.data.priority||"").toLowerCase()==="high").slice(0,2).forEach(a=>{s.push({lane:d(a.data.area||"project"),tag:`${b(a.data.priority||"active")} priority`,title:a.data.title,summary:a.data.summary,action:a.data.nextAction})}),s.slice(0,3)}function U(t,e){const s=d(t);return/^https?:\/\//i.test(e)?`<a class="chip hover:border-fire/35 hover:bg-fire-soft" href="${e}" target="_blank" rel="noreferrer">${s}</a>`:`<span class="chip">${s}: ${e}</span>`}function d(t=""){return t.replace(/[-_]/g," ").replace(/\b\w/g,e=>e.toUpperCase())}function b(t=""){return t?t.charAt(0).toUpperCase()+t.slice(1):""}function O(t,e){const s={high:0,medium:1,low:2};return(s[t.data.priority]??9)-(s[e.data.priority]??9)||t.data.title.localeCompare(e.data.title)}function h(t){const e=new Date(t);if(Number.isNaN(e.getTime()))return t;const s=new Date,r=new Date(s.getFullYear(),s.getMonth(),s.getDate()),i=new Date(e.getFullYear(),e.getMonth(),e.getDate()),a=Math.round((r-i)/864e5);return a===0?"Updated today":a===1?"Updated yesterday":`Updated ${e.toLocaleDateString("en-US",{month:"short",day:"numeric"})}`}function F(t){return t===0?"Today":t===1?"Tomorrow":`${t} days`}C();
