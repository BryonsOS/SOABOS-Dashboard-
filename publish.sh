#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$ROOT/site"
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

require_clean_tree_notice() {
  if ! git diff --quiet || ! git diff --cached --quiet; then
    warn "Working tree has changes. I’ll only commit the dashboard source files."
  fi
}

MESSAGE="${*:-Publish dashboard update}"
AMEND=false
if [[ "${1:-}" == "--amend" ]]; then
  AMEND=true
  shift || true
  MESSAGE="${*:-Publish dashboard update}"
fi

step "Building dashboard"
cd "$SITE_DIR"
npm run build >/tmp/soabos-dashboard-build.log 2>&1 || {
  cat /tmp/soabos-dashboard-build.log
  fail "Build failed"
}
ok "Site build complete"

step "Reviewing repository state"
cd "$ROOT"
require_clean_tree_notice

git add content site .github README.md publish.sh

if git diff --cached --quiet; then
  warn "No source changes to publish. Build is already current."
  printf "${DIM}%s${RESET}\n" "$DASHBOARD_URL"
  exit 0
fi

CHANGED_FILES="$(git diff --cached --name-only)"
printf "${DIM}Staged files:${RESET}\n%s\n" "$CHANGED_FILES"

step "Creating publish commit"
if [[ "$AMEND" == true ]]; then
  git commit --amend --no-edit
  ok "Amended previous publish commit"
else
  git commit -m "$MESSAGE"
  ok "Committed: $MESSAGE"
fi

step "Pushing to GitHub"
git push origin main
ok "Push complete"

printf "\n${GREEN}Dashboard publish kicked off.${RESET}\n"
printf "${BOLD}Live URL:${RESET} %s\n" "$DASHBOARD_URL"
printf "${DIM}GitHub Actions will finish the deploy in the background.${RESET}\n"
