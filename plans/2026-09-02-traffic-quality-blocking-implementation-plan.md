# Traffic Quality Blocking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Tag impressions with country + agent class, block RU/CN and scraper bots at the edge, and surface both dimensions on the admin dashboard.

**Architecture:** Pure `classifyAgent()` module feeding a gate at the top of `fetch()` in worker.js; impression Analytics Engine datapoints gain two blobs; `/api/analytics` gains two queries; admin-dashboard.html gains two rank-list panels.

**Tech Stack:** Cloudflare Worker (plain ESM, esbuild-bundled by wrangler), Analytics Engine SQL, node:test.

**Spec:** `plans/2026-09-02-traffic-quality-blocking-plan.md`

---

### Task 1: UA classifier module (TDD)

**Files:**
- Create: `agent-classifier.mjs`
- Test: `scripts/agent-classifier.test.mjs` (matched by existing `npm test` glob)

- [ ] **Step 1:** Write failing test covering: real Chrome/Safari/Firefox -> `browser`; Googlebot/bingbot/facebookexternalhit -> `search-engine`; GPTBot/ClaudeBot/CCBot/PerplexityBot -> `ai-crawler`; AhrefsBot/SemrushBot -> `seo-tool`; python-requests/curl/Go-http-client/Wget -> `scraper`; HeadlessChrome/Puppeteer -> `automation`; `""`/null/undefined/whitespace -> `empty`; case-insensitivity; `HARD_BLOCKED_CLASSES` === {seo-tool, scraper}.
- [ ] **Step 2:** `npm test` — expect new file to FAIL (module missing).
- [ ] **Step 3:** Implement `agent-classifier.mjs`: `AGENT_CLASSES` constants, ordered `SIGNATURES` table (automation checked first — HeadlessChrome UAs also contain Chrome), case-insensitive substring match, default `browser`.
- [ ] **Step 4:** `npm test` — all green.
- [ ] **Step 5:** Commit `feat(analytics): add user-agent classifier with tests`.

### Task 2: Worker gate + impression tagging

**Files:**
- Modify: `worker.js`

- [ ] **Step 1:** Import `classifyAgent`, `HARD_BLOCKED_CLASSES` from `./agent-classifier.mjs`; add `BLOCKED_COUNTRIES = ["RU", "CN"]`.
- [ ] **Step 2:** At top of `fetch()`, before routing: reject 403 if `cf.country` in `BLOCKED_COUNTRIES` or `agentClass` in `HARD_BLOCKED_CLASSES`. `request.cf || {}` so local dev never geo-blocks.
- [ ] **Step 3:** Pass `{ country, agentClass }` into `handlePortfolio`; extend `writeDataPoint` blobs to `["impression", variant, country, agentClass]`.
- [ ] **Step 4:** `node --check worker.js` + `npm test`.
- [ ] **Step 5:** Commit `feat(worker): block high-risk origins and tag impressions with geo/agent`.

### Task 3: Analytics queries

**Files:**
- Modify: `worker.js` (`handleAnalytics`)

- [ ] **Step 1:** Add two queries to the existing `Promise.all`: impressions grouped by `blob3` (country), by `blob4` (agent_class). Both `WHERE blob1 = 'impression'`.
- [ ] **Step 2:** Parse into `impressionsByCountry` and `impressionsByAgent` object maps; add to response. Existing fields unchanged.
- [ ] **Step 3:** `node --check worker.js` + `npm test`.
- [ ] **Step 4:** Commit `feat(admin): expose impression country and agent breakdowns`.

### Task 4: Dashboard panels

**Files:**
- Modify: `admin-dashboard.html`

- [ ] **Step 1:** New `charts-row` with two `chart-card`s (rank-list style, matching "Contacts by Country"): `views-by-country`, `views-by-agent`.
- [ ] **Step 2:** `updateTrafficQuality(data)`: country table with share % and `(blocked)` flag for `BLOCKED_COUNTRIES`; agent table with human-vs-bot headline split and per-class labels; non-browser rows styled with existing `overseas` class; empty states match existing pattern.
- [ ] **Step 3:** Call from `fetchData()` after `updateGeo(data)`; append collection-date caveat to footer.
- [ ] **Step 4:** Commit `feat(admin): add views by country and agent type panels`.

### Task 5: Verification gate

- [ ] **Step 1:** `npm test` — full suite green.
- [ ] **Step 2:** `npx wrangler deploy --dry-run` — bundling/import resolution OK, no deploy.
- [ ] **Step 3:** `wrangler dev` + `curl -A "AhrefsBot" localhost:8787/` -> 403; `curl -A "Mozilla/5.0 ..." localhost:8787/` -> 200.
- [ ] **Step 4:** Show diff summary to owner; hold for approval before push/PR.
