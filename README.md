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

After the first workflow run, enable **Settings → Pages → Build and deployment → GitHub Actions** if GitHub has not already defaulted to it.

## Next step

Continue expanding the content model and visual sections so future conversations can update the dashboard through structured files.
