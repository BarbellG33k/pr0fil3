# pr0fil3

Static resume and portfolio site for Guillermo Salas, deployed via Cloudflare Workers and static assets.

## Repo guidance

- Keep resume and portfolio content consistent across `resume-content.json`, embedded fallback data in resume/portfolio HTML files, and static executive portfolio variants.
- Use absolute favicon paths (`/favicon.svg`) so direct pages and Worker-routed pages resolve the icon consistently.
- When describing database experience, do not imply that Guillermo's primary or direct Experity RDBMS focus is PostgreSQL. Experity's primary product workflows are SQL Server-backed at scale. PostgreSQL experience should be framed as coming from Chronicled, select Experity products, and personal projects.

## Resume owner controls

The education section is intentionally excluded by default on resume pages. The visible education toggle is hidden from normal visitors to avoid drawing attention to it.

To reveal the toggle for the current browser, visit either resume page with the owner flag once:

```text
/resume.html?owner=1
/resume-alt.html?owner=1
```

The page stores `resume-owner-controls=1` in localStorage, then removes the query string from the address bar with `history.replaceState()`. This is only a discreet UI affordance, not access control; anyone inspecting static source can discover it. Use Worker-level auth or a protected route for anything that must be genuinely private.

## Versioning

`index.html` (only - not other pages) carries a small, unobtrusive build badge
fixed to the bottom-right corner: `a1b2c3d - Jul 10, 2026 14:32 UTC`. It's
plain text, not a link (this is a public page - no reason to expose the repo
URL to visitors). Its only purpose is letting you confirm, without doubt,
exactly which commit is live: view the deployed page, read the short SHA,
compare it to `git log --oneline -1` on `main`.

**How it works:**

- `index.html` contains a literal `BUILD_VERSION_PLACEHOLDER` token inside
  the `.build-version-badge` element - never edit that token by hand.
- `scripts/stamp-version.sh` replaces the token with the current
  `git rev-parse --short HEAD` and a UTC timestamp.
- `.github/workflows/deploy.yml` runs `npm run stamp-version` as its own
  step, immediately before `wrangler deploy`, on every push to `main`. This
  is fully automatic - no manual step is ever required to keep the badge
  accurate.
- The stamped value is never committed back to git. CI operates on a
  disposable checkout; the substitution happens after checkout and lives
  only in the files that get deployed.

**Local preview:** run `npm run stamp-version` to see a real value in
`index.html` before `npm run dev`. Afterward, restore the placeholder before
committing anything - `git checkout index.html` works if you have no other
pending edits to that file, otherwise manually replace the stamped text back
to `BUILD_VERSION_PLACEHOLDER`. The tracked copy of `index.html` in git
should always contain the literal placeholder, never a stamped value.

**For future changes:** this convention only touches `index.html`. If a
different page ever needs the same badge, copy the `.build-version-badge`
CSS block and the `<div class="build-version-badge">BUILD_VERSION_PLACEHOLDER</div>`
element into it - `scripts/stamp-version.sh` already replaces the token
across whichever files contain it (currently just the one), so no other
change is required to pick up a newly added page.

