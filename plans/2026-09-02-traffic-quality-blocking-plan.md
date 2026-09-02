# Traffic Quality: Country/Agent Analytics + Blocking

## Goal

Make the admin dashboard answer "are these visits meaningful?" by adding country
of origin and agent type to impression analytics, excluding bot traffic from
human view counts, and hard-blocking traffic from high-risk/highly-irrelevant
geographic origins (RU and CN to start) plus unambiguous scraper bots.

## Non-Goals

- No paid Cloudflare Bot Management. UA heuristics plus optional free Bot Fight
  Mode is the ceiling for this site's scale.
- No retroactive data. Historical impressions lack country/agent dimensions;
  these accrue only from deploy forward. Dashboard surfaces this caveat.
- No auth changes to `/admin` (pre-existing gap, tracked separately).

## Accuracy Position

- **Country**: `request.cf.country` is IP-based edge geolocation (~99%
  country-level accuracy). Blocking RU/CN has near-zero false positives on the
  target audience (US/EU/LatAm recruiters). Known caveat: VPN users in blocked
  countries slip through; anyone traveling there gets blocked.
- **Agent type**: UA-string classification is high-precision, limited-recall.
  Known bots/crawlers/automation tools are identified with near-zero false
  positives (real browsers send browser UAs). Sophisticated bots spoofing
  browser UAs slip through — accepted.
- **Safety rule**: hard blocking only for unambiguous signals (country codes,
  well-known scraper/SEO-tool signatures). Everything else is tagged and
  excluded from human counts, never 403'd.

## Architecture

```
Request
  +-> fetch() gate (worker.js)
  |     1. request.cf.country in BLOCKED_COUNTRIES -> 403
  |     2. classifyAgent(UA) in HARD_BLOCKED_CLASSES -> 403
  +-> classifyAgent(UA)
  +-> route handler
        +-> handlePortfolio: writeDataPoint
        |     blobs: [impression, variant, country, agentClass]
        +-> handleContact: unchanged (blobs already carry geo)
  +-> /api/analytics: +2 queries (by country, by agent class)
  +-> /admin: +2 panels (country table, agent breakdown)
```

Blocked requests are rejected before any analytics write — they never count.

## Components

### 1. `agent-classifier.mjs` (repo root)

Pure module, imported by worker.js (esbuild bundles it). Exports:

- `AGENT_CLASSES` — named constants: `BROWSER`, `SEARCH_ENGINE`, `AI_CRAWLER`,
  `SEO_TOOL`, `SCRAPER`, `AUTOMATION`, `EMPTY`.
- `HARD_BLOCKED_CLASSES` — set of classes that get 403: `SEO_TOOL`, `SCRAPER`.
- `classifyAgent(userAgent)` — returns one class. Classification order:
  empty/whitespace -> `EMPTY`; known crawler signatures -> their class;
  headless/automation markers -> `AUTOMATION`; else -> `BROWSER`.
  Matching is case-insensitive substring on the UA string.

Signature tables (initial):

| Class | Signatures |
|---|---|
| `SEARCH_ENGINE` | googlebot, bingbot, duckduckbot, yandexbot, applebot, facebookexternalhit, twitterbot, linkedinbot |
| `AI_CRAWLER` | gptbot, oai-searchbot, claudebot, claude-web, perplexitybot, gemini-google, ccbot, amazonbot, bytespider, cohere-ai |
| `SEO_TOOL` | ahrefsbot, semrushbot, mj12bot, dotbot, petalbot, rogerbot, screaming frog, seokicks |
| `SCRAPER` | python-requests, python-urllib, go-http-client, java/, curl/, wget/, scrapy, httpclient, libwww-perl, masscan, zgrab |
| `AUTOMATION` | headlesschrome, puppeteer, playwright, selenium, phantomjs |

`SEARCH_ENGINE` and `AI_CRAWLER` are served normally (SEO + AI-search
discoverability is preserved) but excluded from human counts.

### 2. Blocking gate in `fetch()` (worker.js)

At the top of `fetch()`, before routing:

```js
const cf = request.cf || {};
if (BLOCKED_COUNTRIES.includes(cf.country)) return blocked();
const agentClass = classifyAgent(request.headers.get("User-Agent"));
if (HARD_BLOCKED_CLASSES.has(agentClass)) return blocked();
```

- `BLOCKED_COUNTRIES = ["RU", "CN"]` — named constant, single place to extend.
- `blocked()` returns `403 Forbidden` with a short plain-text body.
- Applies to every path including `/contact`, `/admin`, `/api/analytics`
  ("completely block traffic").
- `request.cf` is absent in local `wrangler dev`; the `|| {}` fallback means
  local dev is never geo-blocked (country is `undefined`).

### 3. Impression analytics extension (handlePortfolio)

`writeDataPoint` blobs become `["impression", variant, country, agentClass]`.
blob3 = country aligns positionally with the contact event's blob3 = country.
blob4 differs by event type (asn for contact, agentClass for impression);
every query filters on blob1 first, so no ambiguity.

`country` comes from `request.cf.country || "??"` (matches handleContact).
`agentClass` is the classifier output already computed by the gate.

### 4. `/api/analytics` — two new queries

Run in the existing `Promise.all`:

```sql
SELECT blob3 AS country, count() AS count FROM portfolio
WHERE blob1 = 'impression' GROUP BY country ORDER BY count DESC

SELECT blob4 AS agent_class, count() AS count FROM portfolio
WHERE blob1 = 'impression' GROUP BY agent_class ORDER BY count DESC
```

Response gains `impressionsByCountry` (object map) and
`impressionsByAgent` (object map). Existing fields unchanged.

### 5. Admin dashboard — two new panels

Matching existing `chart-card` styling:

- **Views by country** — table: country code, impressions, share %. Rows for
  countries in the blocked list are flagged. Unknown (`??`) shown last.
- **Views by agent type** — human vs bot headline split, then table per class:
  `browser` labeled "Human (browser)"; each bot class labeled and marked
  "excluded from human views".
- Both panels carry the caveat: "country/agent data collected since
  2026-09-02 deploy" (deployment date stamped in the HTML at build time is
  acceptable; a fixed literal string matching the deploy also works).

## Rollout

- **Phase 1 (this PR): observe.** Tagging + dashboard panels + blocking gate.
  The gate ships active for `BLOCKED_COUNTRIES` and hard-blocked bot classes —
  decision confirmed by owner. The dashboard panels provide the audit trail:
  blocked-vs-served traffic remains visible in Cloudflare's own analytics if
  the block list ever needs tuning.
- **Phase 2 (optional, later, zero code change):** enable free Bot Fight Mode
  in the Cloudflare dashboard as a safety net against UA-spoofing bots.

## Testing

- `scripts/agent-classifier.test.mjs` via `node --test` (picked up by existing
  `npm test` glob). Covers: one UA per class table entry, case-insensitivity,
  whitespace/undefined UA -> `EMPTY`, real Chrome/Safari/Firefox UAs ->
  `BROWSER`, `HARD_BLOCKED_CLASSES` membership.
- Country gate logic verified by construction: pure constant + one-line check;
  manual curl checks post-deploy (`curl -A "AhrefsBot" https://guillermosalas.dev/`
  expects 403; normal UA expects 200).

## Files Changed

| File | Change |
|---|---|
| `agent-classifier.mjs` | new — pure classifier module |
| `worker.js` | import classifier, gate in fetch(), impression blobs, 2 queries |
| `admin-dashboard.html` | 2 panels + fetch/render wiring |
| `scripts/agent-classifier.test.mjs` | new — classifier unit tests |
