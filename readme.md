# pr0fil3

Static resume and portfolio site for Guillermo Salas, deployed via Cloudflare Workers and static assets.

## Repo guidance

- Keep resume and portfolio content consistent across `resume-content.json`,
  `portfolio-content.json`, embedded fallback data in resume/portfolio HTML
  files, and static executive portfolio variants. `resume-content.json` owns
  resume-flavored copy (exec summary, builder narrative, experience, skills,
  certifications). `portfolio-content.json` owns portfolio-flavored copy
  (portfolio bio, hero tagline, case-study cards) used by all five portfolio
  pages. Edit copy in the JSON files, then mirror the same change into the
  embedded `<script type="application/json" id="…-data">` fallback block in
  each HTML file that has one.
- Use absolute favicon paths (`/favicon.svg`) so direct pages and Worker-routed pages resolve the icon consistently.
- When describing database experience, do not imply that Guillermo's primary or direct Experity RDBMS focus is PostgreSQL. Experity's primary product workflows are SQL Server-backed at scale. PostgreSQL experience should be framed as coming from Chronicled, select Experity products, and personal projects.

## Portfolio content

The five portfolio pages (`executive_portfolio_herald.html`,
`executive_portfolio_cipher.html`, `executive_portfolio_ember.html`,
`portfolio-apex.html`, `portfolio-nova.html`) share one content source:

- `portfolio-content.json` - structured payload with `meta`, `summary` (the
  portfolio bio, distinct in voice from the resume summary), `hero.tagline`,
  and `caseStudyCards[]`. Each card declares a `variants` array listing
  which portfolio pages it should appear on; the loader filters by the
  current page's `data-pc-variant` attribute (or `body[data-variant]`,
  defaulting to `all`).
- `portfolio-content.js` - shared loader. It fetches `portfolio-content.json`
  live, falls back to a `<script type="application/json" id="portfolio-data">`
  block embedded in each HTML file (so `file://` previews still render), and
  exposes `window.Portfolio_DATA` plus a `PortfolioContent.whenReady(cb)`
  Promise API. It hydrates DOM hooks tagged with
  `data-pc="tagline|bio|cards"`. Pages with custom JS pipelines
  (`portfolio-apex.html`, `portfolio-nova.html`) call
  `PortfolioContent.whenReady()` inside their `loadResume()` and override the
  resume-content data with portfolio-content fields (bio, tagline) before
  rendering.

URL suffix handling: cipher and ember ship themed URL variants of each case
study (e.g. `case-study-architecture-delivery-enablement-cipher.html`).
`caseStudyUrl(url, variant)` appends `-cipher`/`-ember` only for those two
variants and returns the base URL unchanged for herald/apex/nova. Don't bake
the variant suffix into the JSON - the loader owns it.

Card templates are variant-specific in the loader's `renderCardHtml()`:
cipher and ember use `stat-card` (dashboard styling); apex uses inline
`stat-card`; nova uses editorial `bg-white p-8 editorial-shadow`; herald
uses rounded editorial `bg-white p-6 rounded-xl`. When adding a card, write
the copy in `portfolio-content.json`; the loader picks the template at
render time.



## Resume exports and templates

Both resume pages (`resume.html` = executive variant, `resume-alt.html` =
builder variant) share `resume-export.js` for downloads. All download formats
are ATS-optimized for resume importers (Workday and similar):

- **PDF** - linear single-column layout, strict top-to-bottom reading order,
  standard plain-caps section headings, one role per company (the
  `## subsection` bullets render as bullet lines, never as standalone
  headings, so role progressions cannot be split into separate jobs), and
  certifications as flat `Name - Issuer` lines so issuer names (e.g.
  Microsoft) never appear on their own line and cannot be parsed as
  employers or titles.
- **TXT** - the same structure as wrapped plain text with `SECTION` +
  `=====` markers.
- **XML** - HR-XML Resume (2.5 subset): one `EmployerOrg` per company with a
  single `PositionHistory`, `LicensesAndCertifications`, `Qualifications`,
  and non-standard sections preserved under `UserArea`.
- **JSON** - the raw `resume-content.json` payload (not ATS-targeted).

`includeEducation` (the owner-only education toggle) is honored by all three
ATS formats. The Print button still produces the themed visual layout via the
browser.

Templates: the theme selector controls real layouts, not just palettes.
`Ledger` is a structural template (left date rail, `Title - Company`
headlines, mono tech-tag line under each role) modeled on a modern engineer
CV; it re-renders the page with theme-specific markup. Per-job `tags` arrays
in `resume-content.json` feed the tag lines - keep them in sync in the
embedded fallback data in both HTML files when editing content.

`Ledger` is the default for new visitors on both pages, and is the first
option in the theme selector. Existing visitors keep their previously chosen
theme via `localStorage`.

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

- `worker.js` contains a literal `BUILD_VERSION_PLACEHOLDER` token in its
  `BUILD_VERSION` constant, and serves it from `/api/version` with
  `Cache-Control: no-store` - never edit that token by hand.
- `index.html` carries the same token in the badge's `data-static` attribute
  as a fallback, and resolves the badge at runtime: it prefers `/api/version`
  and falls back to `data-static`. If neither yielded a real value the badge
  stays hidden, so the raw token is never shown to visitors.
- `scripts/stamp-version.sh` replaces the token in both files with the current
  `git rev-parse --short HEAD` and a UTC timestamp.
- `.github/workflows/deploy.yml` runs `npm run stamp-version` as its own
  step, immediately before `wrangler deploy`, on every push to `main`. This
  is fully automatic - no manual step is ever required to keep the badge
  accurate.
- The stamped value is never committed back to git. CI operates on a
  disposable checkout; the substitution happens after checkout and lives
  only in the files that get deployed.

**Why the version is served from the Worker:** stamping HTML alone is not
reliable. A cached copy of `index.html` at the edge can pin the badge to a
stale value - or to the unstamped placeholder, if the page was ever deployed
without stamping (for example a local `npm run deploy`, which does not stamp).
`/api/version` is generated by the Worker per request and marked `no-store`,
so it always reflects the deployment actually running, and it overrides the
static fallback whenever the two disagree.

**Local preview:** run `npm run stamp-version` to see a real value before
`npm run dev`. Afterward, restore the placeholder in **both** `index.html` and
`worker.js` before committing anything - `git checkout index.html worker.js`
works if you have no other pending edits to those files, otherwise manually
replace the stamped text back to `BUILD_VERSION_PLACEHOLDER`. The tracked
copies in git should always contain the literal placeholder, never a stamped
value.

**For future changes:** the badge markup only lives in `index.html`. If a
different page ever needs the same badge, copy the `.build-version-badge`
CSS block, the badge `<div>` (with its `id="build-version"`, `hidden` and
`data-static="BUILD_VERSION_PLACEHOLDER"` attributes) and the accompanying
resolver script into it - `scripts/stamp-version.sh` already replaces the
token across whichever files contain it, so no other change is required to
pick up a newly added page.

