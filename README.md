# SOABOS Dashboard

Public GitHub Pages dashboard for Bryon.

## Core workflow

### Normal publish

```bash
npm install
npm run build
```

That now does all of this automatically:
- rebuilds content JSON
- builds the Vite app
- refreshes root `index.html` and `404.html`
- refreshes root `assets/` for GitHub Pages

## Daily gratitude update

Use the sync script so the dashboard card stays current without hand-editing JSON:

```bash
npm run sync-gratitude -- --date=2026-03-31 --prompt="What is something in your life right now that would have felt impossible, out of reach, or unreal to an older version of you — and why does having it now matter more than you usually admit?"
npm run build
```

Optional flags:
- `--status=pending|completed`
- `--source="telegram + dashboard"`
- `--note="..."`
- `--window=morning-to-evening`
- `--completedLabel="..."`

## Why this matters

GitHub Pages serves the root `index.html` plus root `assets/` in this repo. If those do not get refreshed after a Vite build, the live site can point at stale hashed assets and show old behavior or break entirely.
