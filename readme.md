# pr0fil3

Static resume and portfolio site for Guillermo Salas, deployed via Cloudflare Workers and static assets.

## Repo guidance

- Keep resume and portfolio content consistent across `resume-content.json`,
  `portfolio-content.json`, embedded fallback data in resume/portfolio HTML
  files, and static executive portfolio variants. `resume-content.json` owns
  resume-flavored copy (exec summary, builder narrative, experience, skills,
  certifications). `portfolio-content.json` owns portfolio-flavored copy
  (portfolio bio, hero tagline, case-study cards) delivered to all five
  portfolio pages. Edit copy in the JSON files, then mirror the same change
  into the embedded fallback payload of each HTML file (a
  `<script type="application/json" id="portfolio-data">` block in the
  portfolio HTML; a JS `EMBEDDED_DATA` constant in the resume HTML).
- Use absolute favicon paths (`/favicon.svg`) so direct pages and Worker-routed pages resolve the icon consistently.
- When describing database experience, do not imply that Guillermo's primary or direct Experity RDBMS focus is PostgreSQL. Experity's primary product workflows are SQL Server-backed at scale. PostgreSQL experience should be framed as coming from Chronicled, select Experity products, and personal projects.

## Portfolio content

The five portfolio pages (`executive_portfolio_herald.html`,
`executive_portfolio_cipher.html`, `executive_portfolio_ember.html`,
`portfolio-apex.html`, `portfolio-nova.html`) share one content source:

- `portfolio-content.json` - payload with `meta`, `summary` (the portfolio
  bio, distinct in voice from the resume summary), `hero.tagline`, and
  `caseStudyCards[]`. Each card has a `variants` array naming the portfolio
  pages it should appear on; the loader filters by the page's
  `data-pc-variant` attribute (falls back to `body[data-variant]`, then
  `all`).
- `portfolio-content.js` - the shared loader. It fetches
  `portfolio-content.json`, falls back to a
  `<script type="application/json" id="portfolio-data">` block embedded in
  each portfolio HTML (so `file://` previews still render), and hydrates
  DOM hooks tagged `data-pc="tagline|bio|cards"`. Pages with custom JS
  pipelines (`portfolio-apex.html`, `portfolio-nova.html`) call
  `PortfolioContent.whenReady()` inside their `loadResume()` and override
  the resume-content fields (bio, headline) with portfolio-content values
  before rendering.

URL suffix handling. Cipher and ember ship themed URL variants of each case
study (`case-study-…-cipher.html`, `…-ember.html`). The loader appends
`-cipher` / `-ember` only for those two variants and returns the base URL
unchanged for herald/apex/nova. Don't bake the suffix into the JSON - the
loader owns it.

Card templates are per-variant in the loader's `renderCardHtml()`. Cipher
and ember use `stat-card` (dashboard styling); apex uses inline
`stat-card`; nova uses editorial `bg-white p-8 editorial-shadow`; herald
uses rounded editorial `bg-white p-6 rounded-xl`. Add a card by writing its
copy in `portfolio-content.json`; the loader picks the template at render
time.



## Resume exports and templates

Both resume pages (`resume.html` = executive variant, `resume-alt.html` =
builder variant) share `resume-export.js` for downloads. All download formats
are ATS-optimized for resume importers (Workday and similar):

- **PDF** - linear single-column layout, strict top-to-bottom reading order,
  standard plain-caps section headings, and certifications as flat
  `Name - Issuer` lines. ATS-only experience omits editorial subsection
  labels and nested promotion timelines, both of which can look like extra
  jobs to an importer. The synthetic `Early Career` rollup is expanded into
  its five retained employer/title/date records under a distinct `EARLY
  CAREER` section. Titles, descriptions, skills, and certification text
  are normalized to exclude Workday-rejected characters (`[]{}<>/`).
  Wrapped paragraphs carry semantic `ActualText` so compatible PDF readers
  and importers receive one logical bullet instead of one line at a time.
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
- `index.html` carries the same token in the badge element's inner text and
  `data-static` attribute, and resolves the badge at runtime: it renders the
  stamped static value immediately, prefers fresh values from `/api/version`
  when available, and provides a `dev (local)` fallback when run unstamped in
  local dev. The badge is never hidden with a `hidden` attribute.
- `scripts/stamp-version.sh` replaces the token in both files with the current
  `git rev-parse --short HEAD` and a UTC timestamp, then **fails the build** if
  any placeholder survived. Shipping the literal token makes the badge lie about
  what is live, and that failure used to be silent.
- `wrangler.jsonc` declares `build.command`, so wrangler runs the stamp script
  itself before **every** `wrangler deploy` and `wrangler dev`. This is the
  guard that matters: `package.json`'s `predeploy` hook only covers
  `npm run deploy`, and a bare `npx wrangler deploy` bypasses it and publishes
  the raw placeholder over a good deploy.
- `/api/version` is served **ahead of** the traffic-quality gate in `worker.js`.
  It carries only the build string and writes no analytics, and keeping it
  reachable lets CI and uptime monitors check the live build without spoofing a
  browser User-Agent (`curl/` classifies as a scraper, which the gate blocks).
- `.github/workflows/deploy.yml` verifies the deploy after the fact: it polls
  `/api/version` and fails the job unless the live build reports the short SHA
  it just deployed. A deploy can report success while a stale or unstamped
  build is serving - that is precisely what this catches

**Local side effect:** because wrangler now stamps on every invocation, running
`wrangler dev`, `wrangler deploy` or even `--dry-run` locally leaves `index.html`
and `worker.js` stamped in your working tree. `npm run deploy` reverts them via
`postdeploy`; after a bare wrangler command, revert by hand
(`git checkout index.html worker.js`). You cannot commit a stamped tree by
accident - `npm test` fails when the placeholder is missing
  immediately before `wrangler deploy`. This guarantees all deployments (CI or
  local `npm run deploy`) are stamped automatically.
- The stamped value is never committed back to git. Local `npm run deploy`
  restores tracked placeholders in `postdeploy`. In CI, the disposable
  checkout ensures stamped values only live in deployed files.
- Regression tests in `scripts/validate-version.test.mjs` (`npm run test:version`
  or `npm test`) assert that the badge element is unhidden, properly stamped,
  cannot be bypassed on deploy, and correctly resolves at runtime.

**Why the version is served from the Worker:** stamping HTML alone is not
reliable. A cached copy of `index.html` at the edge can pin the badge to a
stale value. `/api/version` is generated by the Worker per request and marked
`no-store`, so it always reflects the deployment actually running, and it
overrides the static fallback whenever the two disagree.

**Local preview:** run `npm run stamp-version` to see a real value before
`npm run dev`. Afterward, restore the placeholder in **both** `index.html` and
`worker.js` before committing anything - `git checkout index.html worker.js`
works if you have no other pending edits to those files, otherwise manually
replace the stamped text back to `BUILD_VERSION_PLACEHOLDER`. The tracked
copies in git should always contain the literal placeholder, never a stamped
value. Unstamped local previews cleanly display `dev (local)`.

**For future changes:** the badge markup only lives in `index.html`. If a
different page ever needs the same badge, copy the `.build-version-badge`
CSS block, the badge `<div>` (with its `id="build-version"` and
`data-static="BUILD_VERSION_PLACEHOLDER"` attributes) and the accompanying
resolver script into it - `scripts/stamp-version.sh` already replaces the
token across whichever files contain it, so no other change is required to
pick up a newly added page.

