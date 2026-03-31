# SOABOS Dashboard

A public personal hub for goals, projects, areas of life, and visible progress.

This repo is structured so conversation-driven updates can become website updates without hand-editing the UI every time.

## Core idea

- `content/` is the source of truth
- the repo root renders that content into a dashboard
- updates happen by changing structured files
- the site can publish those changes as a living visual workspace

## Initial content model

- `content/now/` — current focus and current state
- `content/projects/` — one file per project
- `content/goals/` — goal definitions and progress
- `content/areas/` — life/work buckets
- `content/updates/` — dated progress notes
- `content/system/` — schemas, conventions, and dashboard config

## Status model

Projects and goals should default to one of:

- `idea`
- `queued`
- `active`
- `blocked`
- `paused`
- `complete`

## Design principles

- simple enough to maintain by chat
- visual enough to keep motion in sight
- structured enough to automate later
- public-safe by default

## Deployment

The repo includes a GitHub Actions workflow for GitHub Pages deployment.

Expected published URL:

- `https://bryonsos.github.io/SOABOS-Dashboard/`

## Source of truth

This repo should be maintained from these primary source areas:

- `content/` for dashboard content
- `main.js`, `styles.css`, `scripts/`, and config files at repo root for rendering/build logic
- `.github/workflows/` for deploy automation

The repo currently keeps root-level published artifacts (`index.html`, `404.html`, `assets/`, `generated/`) because GitHub Pages may serve them directly while the Actions deployment path is being stabilized.

If the Pages URL shows **Site not found**, enable **Settings → Pages → Build and deployment → GitHub Actions** for this repo.

## Publish workflow

Recommended publish flow:

1. update files in `content/`
2. run the site build from `site/`
3. commit only source changes plus the generated publish output you intentionally keep
4. let GitHub Actions deploy to Pages

The build now computes project/goal counts from content automatically so the homepage stats stay in sync as the dashboard grows.

### Clean command set

From the repo root:

- `./publish.sh` — build, stage, commit, and push with a clean interactive-style publish flow
- `./publish.sh "your message"` — same flow with a custom commit message
- `../scripts/publish-dashboard` or `/root/.openclaw/workspace/scripts/publish-dashboard` — short alias wrapper for publishing
- `npm run dev-dashboard`
- `npm run build-dashboard`

## Next step

Keep replacing scaffold content with real operating details and expand the visible sections only when they help Bryon make decisions faster.
