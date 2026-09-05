#!/usr/bin/env bash
# Stamps the current git commit and a UTC timestamp into any *.html file and
# into worker.js where the BUILD_VERSION_PLACEHOLDER token appears (currently
# index.html and worker.js - see the "Versioning" section in readme.md for the
# full convention, and for how to add the badge to another page).
#
# worker.js is stamped because the badge resolves its value at runtime from
# /api/version. Serving the version from the Worker rather than from stamped
# HTML means an edge-cached index.html cannot pin the badge to a stale value.
#
# Run automatically by .github/workflows/deploy.yml on every push to main,
# immediately before `wrangler deploy`. Run it locally (`npm run
# stamp-version`) before `npm run dev` if you want to see a real value
# instead of the literal placeholder.
set -euo pipefail

cd "$(dirname "$0")/.."

SHORT_SHA=$(git rev-parse --short HEAD 2>/dev/null || echo "dev")
DEPLOYED_AT=$(date -u +"%b %d, %Y %H:%M UTC")
VERSION_STRING="${SHORT_SHA} - ${DEPLOYED_AT}"

FILES=$(grep -l "BUILD_VERSION_PLACEHOLDER" ./*.html ./worker.js 2>/dev/null || true)

if [ -z "$FILES" ]; then
  # Not an error: wrangler's build hook runs this on every invocation, so a
  # second run in the same working tree legitimately finds nothing to do.
  echo "No files contain BUILD_VERSION_PLACEHOLDER; nothing to stamp."
else
  for f in $FILES; do
    sed -i.bak "s/BUILD_VERSION_PLACEHOLDER/${VERSION_STRING}/g" "$f"
    rm -f "${f}.bak"
    echo "Stamped ${f} with: ${VERSION_STRING}"
  done
fi

# Post-condition. A deploy that ships the literal placeholder makes the badge
# and /api/version lie about what is live, and every previous failure of this
# kind was silent - the deploy succeeded and nobody found out until someone
# read the badge. Fail the build instead.
REMAINING=$(grep -l "BUILD_VERSION_PLACEHOLDER" ./*.html ./worker.js 2>/dev/null || true)
if [ -n "$REMAINING" ]; then
  echo "ERROR: BUILD_VERSION_PLACEHOLDER survived stamping in:" >&2
  echo "$REMAINING" >&2
  exit 1
fi
