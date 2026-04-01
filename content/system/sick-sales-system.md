# Sick Sales System

A practical sales operating layer for Sick merch.

## Objective

Sell more shirts and stickers with a system simple enough to run daily.

## Core scoreboard

Track these every day:

- Sessions
- Orders
- Revenue
- Conversion rate
- Average order value
- Units sold
- Hero SKU units
- Sticker attach rate
- Bundle orders
- Top traffic source

## Daily attack cadence

### 1. Pick the push
Choose:
- 1 hero product
- 1 add-on sticker or sticker pack
- 1 bundle or threshold move
- 1 main marketing hook

### 2. Align the surfaces
Update:
- homepage hero / featured collection
- product ordering in collection
- email angle
- IG story sequence
- IG post or reel concept
- pinned comment / link language where relevant

### 3. Run one experiment
Only one meaningful variable at a time when possible:
- product image order
- headline
- price anchor
- bundle framing
- free shipping threshold language
- urgency language
- sticker add-on wording

### 4. End-of-day read
Answer:
- Did traffic rise?
- Did conversion rise?
- Did AOV rise?
- Did hero SKU units rise?
- Did sticker attach rate rise?
- What stays? What gets cut?

## Offer stack ideas

### Shirts
- New drop push
- Best seller comeback
- Staff pick
- Event tie-in
- Last chance / low stock
- Seasonal angle

### Stickers
- Cheap add-on
- Buy 2 get 1 style framing
- Free sticker over threshold
- Mystery sticker with shirt
- Matching sticker for hero tee

### Bundle patterns
- Tee + sticker pack
- Tee + free sticker over $X
- 2 shirts = lower effective price
- Shirt + event item / ticket where relevant
- Limited run + countdown + sticker bonus

## Channel roles

- Homepage: catch intent traffic
- Email: strongest direct sales punch
- IG stories: same-day urgency and reminders
- Reels/posts: reach and product energy
- Collection sorting: silent but important merchandising lever
- Product page: conversion cleanup zone

## Creative hook bank

Use angles like:
- limited run
- fan favorite back
- fastest seller this week
- only for this event window
- built for the people who know
- cheap add-on to finish the order
- free sticker over threshold
- last call before gone

## Rules

- no generic blast without a hook
- no equal-weight push across too many SKUs
- do not confuse awareness content with sell-now content
- if shirts are the goal, make shirts the hero and stickers the easy add-on
- if conversion is weak, fix merch presentation before demanding more traffic

## Merch triage model

Use the product list as an action board, not just a promo gate.

### Buckets

- Push Now
- Bundle / Test
- Protect
- Dead / Review

### Decision order

Run classification in this order so low-stock winners do not get incorrectly promoted:

1. Protect
2. Push Now
3. Bundle / Test
4. Dead / Review

### Working field map from current export

Current merch export appears to include these useful fields:

- SKU
- Product Title
- Variant
- Product Type
- Price
- Available Inventory
- Recent Sales
- 90 Day Sales
- 90 Day Revenue
- 90 Day Daily Velocity
- Current Auto Note

### Bucket logic

#### Protect
Use when:
- Available Inventory <= 3
- OR Available Inventory <= 8 and 90 Day Sales >= 20
- OR stock is clearly constrained and demand is already proven

Meaning:
- do not spend promotion on things likely to stock out
- defend winners and low-stock items

#### Push Now
Use when all are true:
- Available Inventory >= 10
- 90 Day Sales >= 8
- Price >= 28
- not already in Protect

Meaning:
- enough stock
- enough demand proof
- enough ticket value to justify featured placement

#### Bundle / Test
Use when:
- Available Inventory >= 6
- not already in Protect or Push Now
- item is not clearly dead

Meaning:
- use as bundle filler, homepage test, collection feature, email test, or add-on push

#### Dead / Review
Use when:
- not captured above
- low inventory and weak demand
- stale or unclear bundle rows
- low-confidence rows that should not get automatic campaign weight

Meaning:
- markdown, archive, relaunch, rename, combine, or manually review

### Current dry-run outcome from workspace export

Using the current merch-only export in `tmp_war_room_products_master.json`, a rough triage pass produced:

- Push Now: 32
- Bundle / Test: 258
- Protect: 83
- Dead / Review: 48

That is much more usable than a strict promo-eligibility model that collapses almost everything into Protect.

### Naming cleanup

Recommended:
- rename `Campaign_Candidates` to `Merch_Triage`
- keep `Dashboard_Summary` as the rollup tab
