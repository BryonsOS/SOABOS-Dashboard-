import './styles.css'

const app = document.querySelector('#app')

app.innerHTML = `
  <main class="shell">
    <section class="hero card">
      <p class="eyebrow">SOABOS Dashboard</p>
      <h1>Visible motion for Bryon’s life, work, and projects.</h1>
      <p class="lede">
        A public operating board built from structured content so goals, projects, priorities,
        and progress can stay in sight.
      </p>
    </section>

    <section class="grid two-up">
      <article class="card">
        <p class="section-label">Current mode</p>
        <h2>Building the system</h2>
        <ul>
          <li>Content-first architecture</li>
          <li>Project and goal tracking</li>
          <li>Visual dashboard publishing</li>
        </ul>
      </article>

      <article class="card">
        <p class="section-label">Model</p>
        <h2>Chat in. Motion out.</h2>
        <p>
          Bryon talks. The underlying content gets updated. The site reflects the change.
        </p>
      </article>
    </section>

    <section class="grid three-up">
      <article class="card stat">
        <span class="stat-label">Projects</span>
        <strong>1</strong>
      </article>
      <article class="card stat">
        <span class="stat-label">Goals</span>
        <strong>1</strong>
      </article>
      <article class="card stat">
        <span class="stat-label">Status</span>
        <strong>Active</strong>
      </article>
    </section>

    <section class="card">
      <p class="section-label">Next step</p>
      <h2>Connect content files to rendered dashboard sections</h2>
      <p>
        This is the initial scaffold. The next build phase should parse structured content and
        render projects, goals, updates, and current focus automatically.
      </p>
    </section>
  </main>
`
