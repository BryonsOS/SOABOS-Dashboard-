#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DASHBOARD_URL="https://bryonsos.github.io/SOABOS-Dashboard/"

BLUE='\033[1;34m'
GREEN='\033[1;32m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

step() {
  printf "\n${BLUE}→${RESET} ${BOLD}%s${RESET}\n" "$1"
}

ok() {
  printf "${GREEN}✔${RESET} %s\n" "$1"
}

warn() {
  printf "${YELLOW}•${RESET} %s\n" "$1"
}

fail() {
  printf "${RED}✖${RESET} %s\n" "$1" >&2
  exit 1
}

MESSAGE="${*:-Publish dashboard update}"
AMEND=false
if [[ "${1:-}" == "--amend" ]]; then
  AMEND=true
  shift || true
  MESSAGE="${*:-Publish dashboard update}"
fi

step "Building dashboard"
cd "$ROOT"
npm run build >/tmp/soabos-dashboard-build.log 2>&1 || {
  cat /tmp/soabos-dashboard-build.log
  fail "Build failed"
}
ok "Dashboard build complete"

step "Refreshing root Pages artifacts"
node ./scripts/render-pages-entry.mjs
ok "Root Pages files synced from dist/"

step "Reviewing repository state"
git add \
  content \
  generated/content.json \
  public/generated/content.json \
  dist/generated/content.json \
  dist/app/index.html \
  dist/assets \
  app/index.html \
  index.html \
  404.html \
  assets \
  main.js \
  styles.css \
  vite.config.js \
  package.json \
  package-lock.json \
  .github \
  README.md \
  publish.sh \
  scripts/build-content.mjs \
  scripts/render-pages-entry.mjs

if git diff --cached --quiet; then
  warn "No source changes to publish. Build is already current."
  printf "${DIM}%s${RESET}\n" "$DASHBOARD_URL"
  exit 0
fi

CHANGED_FILES="$(git diff --cached --name-only)"
printf "${DIM}Staged files:${RESET}\n%s\n" "$CHANGED_FILES"

step "Creating publish commit"
if [[ "$AMEND" == true ]]; then
  GIT_EDITOR=true git commit --amend --no-edit
  ok "Amended previous publish commit"
else
  git commit -m "$MESSAGE"
  ok "Committed: $MESSAGE"
fi

step "Updating from remote if needed"
git fetch origin main
LOCAL_HEAD="$(git rev-parse HEAD)"
REMOTE_HEAD="$(git rev-parse origin/main)"
BASE_HEAD="$(git merge-base HEAD origin/main)"

if [[ "$LOCAL_HEAD" != "$REMOTE_HEAD" ]]; then
  if [[ "$BASE_HEAD" == "$REMOTE_HEAD" ]]; then
    ok "Local branch is ahead of remote"
  elif [[ "$BASE_HEAD" == "$LOCAL_HEAD" ]]; then
    warn "Remote is ahead. Rebasing local publish commit onto origin/main"
    GIT_EDITOR=true git rebase origin/main || fail "Rebase failed. Resolve conflicts and rerun publish.sh"
  else
    warn "Local and remote both moved. Rebasing onto origin/main"
    GIT_EDITOR=true git rebase origin/main || fail "Rebase failed. Resolve conflicts and rerun publish.sh"
  fi
fi

step "Pushing to GitHub"
git push origin main
ok "Push complete"

printf "\n${GREEN}Dashboard publish kicked off.${RESET}\n"
printf "${BOLD}Live URL:${RESET} %s\n" "$DASHBOARD_URL"
printf "${DIM}GitHub Actions will finish the deploy in the background.${RESET}\n"
