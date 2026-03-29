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

## Next step

Scaffold the first dashboard app in `site/` and connect it to the content model.
