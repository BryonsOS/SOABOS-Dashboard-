(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function s(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(a){if(a.ep)return;a.ep=!0;const r=s(a);fetch(a.href,r)}})();async function p(){const t=await fetch("./generated/content.json").then(l=>l.json()),{dashboard:e,current:s,projects:n,goals:a,areas:r,updates:c}=t,d=document.querySelector("#app");d.innerHTML=`
    <main class="shell">
      <section class="hero card">
        <p class="eyebrow">${e.site.title}</p>
        <h1>${e.site.tagline}</h1>
        <p class="lede">${e.site.description}</p>
        <div class="hero-meta">
          <span>Owner: ${e.site.owner}</span>
          <span>State: ${s.data.currentState}</span>
          <span>Updated: ${s.data.lastUpdated}</span>
        </div>
      </section>

      <section class="grid two-up">
        <article class="card">
          <p class="section-label">Current focus</p>
          <h2>${s.data.title}</h2>
          <ul>
            ${s.data.primaryFocus.map(l=>`<li>${l}</li>`).join("")}
          </ul>
          <p>${s.content}</p>
        </article>

        <article class="card">
          <p class="section-label">Operating model</p>
          <h2>Turn chaos into motion.</h2>
          <p>
            Keep the board clean, make the next move obvious, and strip away just enough clutter that momentum can survive real life.
          </p>
        </article>
      </section>

      <section class="grid four-up">
        ${i("Now",s.data.primaryFocus)}
        ${i("Next",s.data.next||[])}
        ${i("Blockers",s.data.blockers||[])}
        ${i("Wins",s.data.wins||[])}
      </section>

      <section class="grid three-up">
        <article class="card stat">
          <span class="stat-label">Projects</span>
          <strong>${e.stats.projects}</strong>
        </article>
        <article class="card stat">
          <span class="stat-label">Goals</span>
          <strong>${e.stats.goals}</strong>
        </article>
        <article class="card stat">
          <span class="stat-label">Overall status</span>
          <strong>${e.stats.status}</strong>
        </article>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Projects</p>
          <h2>What’s in motion</h2>
        </div>
        <div class="grid two-up">
          ${n.map(u).join("")}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Goals</p>
          <h2>What this system is protecting</h2>
        </div>
        <div class="grid two-up">
          ${a.map(h).join("")}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Areas</p>
          <h2>Where the work lives</h2>
        </div>
        <div class="grid two-up">
          ${r.map($).join("")}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Focus lanes</p>
          <h2>The board at a glance</h2>
        </div>
        <div class="grid two-up">
          ${o("Systems","Dashboards, routing, structure, and visibility work that keeps everything easier to steer.")}
          ${o("Work","Business, marketing, creative builds, and experiments tied to output and momentum.")}
          ${o("Events","DJ prep, scheduling, paperwork, communication, and event-day readiness.")}
          ${o("Home & Family","Family coordination, recurring logistics, and the systems that reduce domestic scramble.")}
        </div>
      </section>

      <section class="section-block">
        <div class="section-head">
          <p class="section-label">Updates</p>
          <h2>Recent motion</h2>
        </div>
        <div class="stack">
          ${c.slice().reverse().map(g).join("")}
        </div>
      </section>
    </main>
  `}function i(t,e=[]){const s=e.length?e:["Nothing loaded yet."];return`
    <article class="card mini-card">
      <p class="section-label">${t}</p>
      <ul>
        ${s.map(n=>`<li>${n}</li>`).join("")}
      </ul>
    </article>
  `}function u(t){return`
    <article class="card project-card">
      <p class="section-label">${t.data.status}</p>
      <h3>${t.data.title}</h3>
      <p>${t.data.summary}</p>
      <p class="meta"><strong>Next:</strong> ${t.data.nextAction}</p>
      <p class="meta"><strong>Area:</strong> ${t.data.area} · <strong>Priority:</strong> ${t.data.priority}</p>
      ${m(t.data.links)}
    </article>
  `}function h(t){return`
    <article class="card">
      <p class="section-label">${t.data.status}</p>
      <h3>${t.data.title}</h3>
      <p>${t.data.summary}</p>
      <p class="meta"><strong>Horizon:</strong> ${t.data.horizon} · <strong>Area:</strong> ${t.data.area}</p>
    </article>
  `}function $(t){return`
    <article class="card">
      <p class="section-label">Area</p>
      <h3>${t.data.title}</h3>
      <p>${t.data.summary}</p>
      ${t.content?`<p class="meta">${t.content}</p>`:""}
    </article>
  `}function g(t){return`
    <article class="card">
      <p class="section-label">${t.data.date}</p>
      <h3>${t.data.title}</h3>
      <p class="meta">${t.data.kind}</p>
      <p>${t.content}</p>
    </article>
  `}function o(t,e){return`
    <article class="card">
      <p class="section-label">Lane</p>
      <h3>${t}</h3>
      <p>${e}</p>
    </article>
  `}function m(t={}){const e=Object.entries(t).filter(([,s])=>s);return e.length?`
    <div class="link-row">
      ${e.map(([s,n])=>f(s,n)).join("")}
    </div>
  `:""}function f(t,e){const s=t.replace(/[-_]/g," ");return/^https?:\/\//i.test(e)?`<a class="chip" href="${e}" target="_blank" rel="noreferrer">${s}</a>`:`<span class="chip chip-muted">${s}: ${e}</span>`}p();
