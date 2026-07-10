#!/usr/bin/env bash
# Stamps the current git commit and a UTC timestamp into any *.html file
# containing the BUILD_VERSION_PLACEHOLDER token (currently just
# index.html - see the "Versioning" section in readme.md for the full
# convention, and for how to add the badge to another page).
#
# Run automatically by .github/workflows/deploy.yml on every push to main,
# immediately before `wrangler deploy`. Run it locally (`npm run
# stamp-version`) before `npm run dev` if you want to see a real value
# instead of the literal placeholder.
set -euo pipefail

cd "$(dirname "$0")/.."

SHORT_SHA=$(git rev-parse --short HEAD)
DEPLOYED_AT=$(date -u +"%b %d, %Y %H:%M UTC")
VERSION_STRING="${SHORT_SHA} - ${DEPLOYED_AT}"

FILES=$(grep -l "BUILD_VERSION_PLACEHOLDER" ./*.html 2>/dev/null || true)

if [ -z "$FILES" ]; then
  echo "No files contain BUILD_VERSION_PLACEHOLDER; nothing to stamp."
  exit 0
fi

for f in $FILES; do
  sed -i.bak "s/BUILD_VERSION_PLACEHOLDER/${VERSION_STRING}/g" "$f"
  rm -f "${f}.bak"
  echo "Stamped ${f} with: ${VERSION_STRING}"
done
