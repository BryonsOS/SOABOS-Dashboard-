# SOABOS Dashboard

A public personal hub for goals, projects, areas of life, and visible progress.

This repo is structured so conversation-driven updates can become website updates without hand-editing the UI every time.

## Core idea

- `content/` is the source of truth
- `site/` renders that content into a dashboard
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

- `https://bryonsos.github.io/SOABOS-Dashboard-/`

## Source of truth

This repo should be maintained from source files only:

- `content/` for dashboard content
- `site/` for rendering and styling
- `.github/workflows/` for deploy automation

Do not treat root-level published artifacts as editable source.

After the first workflow run, enable **Settings → Pages → Build and deployment → GitHub Actions** if GitHub has not already defaulted to it.

## Publish workflow

Recommended publish flow:

1. update files in `content/`
2. run the site build from `site/`
3. commit only source changes plus the generated publish output you intentionally keep
4. let GitHub Actions deploy to Pages

The build now computes project/goal counts from content automatically so the homepage stats stay in sync as the dashboard grows.

## Next step

Keep replacing scaffold content with real operating details and expand the visible sections only when they help Bryon make decisions faster.
