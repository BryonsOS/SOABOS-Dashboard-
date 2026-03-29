# Content Model

This repo is designed so structured content becomes dashboard UI.

## Directories

- `content/now/` — current focus and operating state
- `content/projects/` — one file per project
- `content/goals/` — one file per goal
- `content/areas/` — one file per life/work area
- `content/updates/` — dated update log entries
- `content/system/` — configuration, model notes, and conventions

## Project fields

Recommended frontmatter:

- `slug`
- `title`
- `status`
- `priority`
- `area`
- `summary`
- `nextAction`
- `lastUpdated`
- `links`

## Goal fields

Recommended frontmatter:

- `slug`
- `title`
- `status`
- `horizon`
- `area`
- `summary`
- `lastUpdated`

## Status vocabulary

Use these whenever possible:

- `idea`
- `queued`
- `active`
- `blocked`
- `paused`
- `complete`

## Operating rule

Prefer updating content files instead of hard-coding state into the UI.
