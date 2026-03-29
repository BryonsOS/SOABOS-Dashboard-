#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SITE_DIR="$ROOT/site"

cd "$SITE_DIR"
npm run build

cd "$ROOT"

git add content site .github README.md publish.sh

if git diff --cached --quiet; then
  echo "No source changes to publish. Build is current."
  exit 0
fi

if [[ "${1:-}" == "--amend" ]]; then
  git commit --amend --no-edit
else
  MESSAGE="${*:-Publish dashboard update}"
  git commit -m "$MESSAGE"
fi

git push origin main

echo "Published. GitHub Actions will deploy the dashboard site."
echo "URL: https://bryonsos.github.io/SOABOS-Dashboard-/"
