# pr0fil3 - Dailies / Changelog

A running log of changes to Guillermo's resume and portfolio site.

---

## 2026-09-05 - Plan C Shipped, Then Copy Remediation (PR #57 + follow-up)

### Shipped
- Plan C (4 commits) merged to main via PR #57 along with the LinkedIn plan docs -
  55 files, merge `8e1cbdb`. CI deployed successfully; the refresh is live on
  guillermosalas.dev (verified: live resume-content.json byte-identical to the
  merged tree; scripts/, plans/, .private/, sources/ and *.md all 404 in production)
- Note for next time: PR #57's title covers only the three LinkedIn markdown files
  while the merge landed the entire content refresh. Content changes get their own
  accurately-titled PR

### Independent pre-publish review
- All gates re-derived cold and green: 27/27 tests, 78 ledger records, mirrors +
  scans + links clean, no codenames, no doctrine labels, no departure doctrine, no
  figures in the nine new case studies, fallback parity 14/16 and 20/20, cipher-ember
  prose diff zero on all nine subjects, headless render of herald and the variants clean
- Every settled owner ruling verified adhered to (GCC "helped shape" ceiling and card
  tagline, PDLC 69%, consolidated Leadership Operating Principles card, Nine-Pillar
  kept distinct from the five-pillar Architecture Hub, departure doctrine unpublished)

### Copy remediation (F7, F8)
- F7: removed internal evidence-ledger vocabulary from 12 public files - "the record
  documents", "the summaries record", "the available sources", "the underlying
  record", "N independent counterpart settings", "corroborated across two counterpart
  series", "the strength of the evidence is", "per the record". The phrasing meant
  nothing to a reader and collectively disclosed that the profile derives from
  summaries of private one-on-ones. Substantive no-metrics hedges kept
- F8: the GCC case study stated its non-ownership disclaimer four times, including one
  parked in the Transferable Artifacts list and one dressed as a "Bounded
  Contribution" leadership mechanism. Boundary now stated once, in the Outcome card;
  mechanism verbs left strong per owner ruling
- Voice: removed three new instances of "his own initiatives" that broke the
  document's pronoun-free elided-third-person voice
- Prose: tightened the flabby closing sentence of summary paragraph 1, the 40-word
  run-up in paragraph 3, and the echoed opener in paragraph 4
- Grammar: "Built and lead" -> "Built and leads" (pre-existing agreement error)
- Gate hardening: scripts/validate-mirrors.mjs now bans the evidence-ledger
  vocabulary class outright, plus two patterns the banned list was missing
  ("Show Me Your Work", "steered as a long-term") - the F6/F7 blind spot is closed

### Carried (pre-existing, each needs its own ticket)
- /api/version and the index badge serve the literal BUILD_VERSION_PLACEHOLDER in
  production even though CI reports a successful stamp
- /api/analytics and /admin-dashboard are unauthenticated
- /package.json, /package-lock.json and /.gitignore are served publicly

---

## 2026-09-05 - Plan C Completion Pass (Owner Decisions + Wave 6)

### Owner decisions applied
- GCC case-study card tagline: "steered" -> "shaped" in portfolio-content.json + all 5
  portfolio-data mirrors (keeps the attribution at the owner-approved "helped shape"
  ceiling; found in the independent Phase-1 review)
- AI-Native PDLC readiness figure: 78% -> 69% everywhere public (4 strings in
  resume-content.json + 3 hardcoded fallback stat tiles), per the July
  executive-profile analysis correction
- Initiatives-grid fallback (herald/cipher/ember): added DevOps Center of Excellence
  and Hiring Chain Alignment cards (fallback now 14 of JSON's 16, curation preserved)
- Frameworks-grid fallback (herald/cipher/ember): added Operating Model Transformation
  card and renamed "Architecture Assessment Model" -> "Architecture as Delivery
  Enablement" to match the JSON card (fallback now 20 of 20 titles)

### Wave 6 enrichment (5 case studies x 3 variants, identical deltas)
- Security Rails: rails-before-acceleration, roll-forward default, symmetric gate
  removal (mechanism cards + principles)
- AI Development Framework: new "Stated Hierarchy & the Ambition Test" section
  (three-levels framing hedged as stated perspective + adoption ambition test)
- Agent-Multiplied Delivery: usage goals for agent workflows + active-adoption
  directive
- Value Delivery Engineering: protected non-negotiable key-customer contractual
  commitments
- Architecture Delivery Enablement: nine-pillar Well-Architected standard +
  self-service assessment portal, kept distinct from the five-pillar Architecture Hub

### Tooling & hygiene
- scripts/validate-mirrors.mjs promoted from the handoff checker and wired into
  `npm test` (now 27 tests) - embedded-blob drift and banned-string regressions fail CI
- scripts/slop-scan.mjs and scripts/dup-scan.mjs recreated in scripts/ (report-only
  by default, `--strict` to enforce)
- .assetsignore: sources/ added (was missing), plus .private/, .serena/, and scripts/
  as deploy hardening (scripts/ carries the banned-name word list; dev tooling
  should never deploy, and nothing references it client-side)
- AGENTS.md: replaced the stale "no formal lint/typecheck pipeline" note with the
  actual verification commands

---

## 2026-09-04 - Sep 3 Evidence Corpus Integration (Plan C, Waves 1-5)

### Evidence foundation
- Extended `.private/evidence-ledger.json` 65 -> 78 records: 10 records for the new
  Sep-3 value clusters (all `directional`, attributed evidence), 3 records backing the
  new framework cards (Engineering Operating Model, Staff Engineer / TSAL Model,
  Nine-Pillar Well-Architected Framework), 3 existing records amended (GCC attribution
  moved to the owner-approved "helped shape" hedge with prior wording preserved in
  `conflicts[]`)
- Placement map, drafting inputs, and execution shell recorded in `plans/`

### Resume (`resume-content.json` + resume.html / resume-alt.html mirrors)
- Executive summary gained three woven-in layers: institutional resilience (no
  individual structurally required), evidence-gated decisions applied to his own
  initiatives first, communication as a quality mechanism
- Experity bullets 23 -> 25: DevOps Center of Excellence, hiring-chain alignment
  intervention; GCC bullet replaced with hedged "helped shape" capability-build
  wording; operating-model, AI, security-rails, and value-delivery bullets enriched
- Strategic initiatives 14 -> 16 (DevOps CoE, Hiring Chain; GCC initiative renamed
  "Engineering Capability Build", status `Shaping`)
- AI practitioner record +2 bullets (adoption ambition test, engineering-vs-coding
  hierarchy / commoditization thesis)
- Builder resume summary/practice aligned with the same layers

### Executive portfolios (herald / cipher / ember / apex / nova + mirrors)
- Portfolio bio updated; hero tagline unchanged
- Case study cards 13 -> 17 (GCC capability-not-cost, DevOps CoE, hiring alignment,
  ADVR de-orphaned; all five variants)
- Leadership frameworks 16 -> 20: Leadership Operating Principles (consolidated
  card for observed operating principles - constructed labels kept internal),
  Engineering Operating Model, Staff Engineer / TSAL Model, Nine-Pillar
  Well-Architected Framework; frameworks-grid fallbacks updated in herald/cipher/ember
- Core competencies grid: additive tags (Institutional Resilience, Talent Systems)
- 9 new case-study files (3 subjects x base/cipher/ember); consultative role
  transition folded into Owning the Whole System; departure material kept
  unpublished per evidence restriction

### Validation
- Gates green: 26/26 tests, ledger valid, JSON parse, all mirrors deep-equal,
  79/79 card targets resolve, no broken internal links, anonymization scan clean,
  no numeric metrics in new case studies
- Independent Wave 5 review found and fixed one defect: two framework-card
  descriptions published a restricted departure principle without its mandatory
  pairing; clauses removed, ledger restriction now consistent with public copy
- Full report: `plans/2026-09-04-wave5-validation-report.md`
- Owner ruling on OnePACS: the codename is gone from all published content. The
  Owning-the-Whole-System case study (x3 variants) now leads with the product- and
  domain-agnostic pattern - an acquired team, small and nimble, grown fast on
  fly-by-the-seat-of-your-pants engineering with no formal process, no quality gates
  beyond opinions and random checks, and no awareness of its maturity-curve position.
  Card tagline, five portfolio mirrors, and two framework origin lines updated to
  match; DICOM/HL7 specifics and remaining internal names generalized in that artifact
- Owner ruling on product names: internal names removed from all published content and
  replaced with generic category terms - AI Scribe -> "an AI clinical scribe", Care
  Agent -> "an agentic patient assistant", AIM -> "an automated insurance-matching
  agent". Applied across resume content (5 strings), both resume pages, apex/nova
  embedded copies, and the executive-portfolio narratives; adoption figures unchanged;
  ledger approved wording updated to match
- Found and fixed stale mirrors the earlier sync gate missed: apex/nova embedded
  resume copies were pre-refresh (21 bullets, old GCC "participated" wording, old
  summary) and are now regenerated from resume-content.json; the hardcoded executive
  portfolio narrative and initiatives-grid fallback carried the old GCC attribution
  and named products - both moved to the hedged "helped shape" wording and generic
  product terms. All nine embedded blobs verified deep-equal; apex and nova
  render-checked in browser
- Carried for owner decision: optional Wave 6 enrichment of existing case studies;
  persisting the QA scanners into scripts/; nothing committed

---

## 2026-09-02 - Version Footer Badge Regression Fix

### Regression Fix & Stamping Hardening
- Diagnosed regression from PR #41 (`18c6dfc`) where `#build-version` in `index.html`
  was hidden by default (`hidden` attribute) and client-side logic suppressed the badge
  when unstamped or when `/api/version` served the placeholder
- Restored unhidden `#build-version` markup in `index.html` with default content so
  it renders statically upon initial load and falls back to `dev (local)` in local preview
- Wired `predeploy` and `build` hooks in `package.json` to run `stamp-version.sh`,
  and added `postdeploy` cleanup, ensuring neither manual nor automated deploys can bypass stamping
- Added comprehensive regression test suite in `scripts/validate-version.test.mjs` (`npm test`)
  covering badge markup, absence of `hidden`, stamp replacement, deploy hooks, and runtime resolution

---

## 2026-07-10 - Build Version Badge

### Deployment Verification
- Added a small, unobtrusive build badge (bottom-right corner, plain text,
  no link) to `index.html` only: short git SHA + UTC deploy timestamp
- `scripts/stamp-version.sh` replaces a `BUILD_VERSION_PLACEHOLDER` token
  with the real value; runs automatically in `.github/workflows/deploy.yml`
  on every push to main, right before `wrangler deploy`
- Never committed back to git - CI stamps a disposable checkout, not the
  tracked source
- Documented the full convention (including how to add the badge to
  another page later) in `readme.md` under "Versioning"

---

## 2026-05-27 (cont.) -> 2026-05-28 - Domain Migration & Portfolio Polish

### Domain Migration: guillermosalas.dev (LIVE)
- Set up Cloudflare DNS: MX (route1/2/3.mx.cloudflare.net), SPF, CNAME apex -> profile.gsalast.workers.dev
- Updated worker.js FROM_ADDRESS from info@factor317.com -> info@guillermosalas.dev
- Deployed Worker and successfully bound to custom domain guillermosalas.dev
- Removed .net routes from wrangler.jsonc (to be configured later)
- Site now serving at https://guillermosalas.dev and https://www.guillermosalas.dev

### Contact Form UX Enhancements
- Added email field validation with regex and inline error display
- Added phone input masking: +nn (nnn) nnn-nnnn on all portfolio forms
- Submit button now shows "Sending..." + disabled state during submission
- Added success/error message display via fetch-based POST (no page redirect)
- Copyright year made dynamic via JavaScript (current year) across all portfolio pages

### Experience Section Rewrites
- Removed specific customer names (AFC, OnePacs) - abstracted as "enterprise healthcare customers", "acquired engineering team"
- Removed tactical incident details (AFC latency failures 6%->0%, FDA audit remediation, Jenkins->CircleCI migration)
- Rewrote descriptions with broader, higher-level lens: capabilities, competencies, leadership style
- Varied sentence starts (Architected, Designed, Directed, Championed, Shaped, Guided) - eliminated repetitive "Led" on every entry
- Applied consistently across all portfolio variants (cipher, ember, herald, nova, apex)

## 2026-05-27 (cont.) - Domain Infrastructure

### Domain Configuration: guillermosalas.dev / guillermosalas.net
- Added `routes` with `custom_domain: true` in wrangler.jsonc for both domains + www
- Domains purchased on Namecheap - need nameservers pointed to Cloudflare
- Updated contact-form-worker.md plan with full deployment checklist
- Email sending remains Cloudflare Email Routing (send_email binding)

### Attribution Corrections
- Architecture Hub: "Built" -> "Coached and guided architecture leadership toward building" - injected Well-Architected Framework concept over time
- Platform Modernization: "Drove/Delivered" -> "Championed and drove... through thought leadership and architectural guidance"

---

## 2026-05-27 - Executive Profile Overhaul & Portfolio Redesign

### Summary Rewrite
- Rewrote the profile/summary to reflect full career arc (solutions architecture -> enterprise architecture -> VP engineering -> AI transformation leader) instead of being a compressed version of the Experity experience section
- Removed PE-environment details and org-size specifics from the summary (those belong in the experience detail)
- Added acknowledgment of Fortune 500 consulting, regulated fintech, and enterprise SaaS background

### Resume Content Tightened
- Consolidated Experity experience from ~24 verbose bullets to ~12 focused ones
- Kept the 5 section structure (AI-First, GCC & Team Scaling, M&A Integration, Platform Modernization, Organizational Leadership)
- Detail now lives in portfolio Strategic Initiatives section, not repeated in the resume

### Attribution Corrections
- Architecture Hub: Changed "Built" to "Coached and guided architecture leadership toward building" - accurately reflects role as the thought leader who injected the Well-Architected Framework concept over time
- Platform Modernization: Changed "Drove" to "Championed and drove... through thought leadership and architectural guidance" - accurately reflects influencer/driver role, not hands-on builder

### Portfolio Redesign - Brandon-Style Strategic Initiatives
- Added a full "Strategic Initiatives" section to all three executive portfolio variants (cipher, ember, herald)
- Each initiative card includes: status badge, category, summary, quantified metrics, technology tags
- Six named initiatives: AI-Augmented Organization Design, Global Capability Center Launch, AI-Native PDLC, M&A Integration, Architecture Hub, Platform Modernization & Reliability
- Content is distinct from resume - portfolio expands on what the resume summarizes

### Local Navigation Bug Fix
- Fixed `/portfolio` link in index.html that broke on `file://` protocol
- Added JavaScript detection: if running locally, picks a random portfolio variant file directly
- Production routing via Cloudflare Worker unchanged
- Also fixed favicon.svg path in index.html for local access

### New Content Sourced From
- 18-meeting executive profile synthesis (Apr 27 - May 27, 2026)
- AI-Assisted Product-to-Engineering POD Pilot onsite materials (~/Dev/scriptorium)
- Q2 2026 SEL Quarterly "Sharpen the Standard" materials
- 2026 Strategic Directives and AI Tooling Usage data
- Structural inspiration from zweifel.tech (project-based organization)

---

## 2026-05-26 - Content & Cosmetics (PR #26, merged)

### Database Attribution Fix
- Changed "PostgreSQL Performance Optimization" to "SQL Server-backed Product Workflows"
- Added clarification: PostgreSQL experience framed as Chronicled + select Experity products + personal projects
- Updated across all portfolio variants and resume-content.json

### Education Toggle & Owner Controls (PR #25)
- Education section now excluded from resume by default
- Added owner controls: visit with `?owner=1` to reveal the toggle (stored in localStorage)
- Toggle hidden from normal visitors

### Favicon & Defaults
- Changed favicon paths to absolute (`/favicon.svg`) across all HTML files
- Changed default theme from 'editorial' to 'carbon'
- Added readme.md with repo guidance

---

## 2026-05-10 - PE-Backed Scale-Up Signals (PR #24)

- Surfaced PE-backed, high-growth, scale-up keywords for ATS visibility
- Added "direct P&L accountability" language
- Connected engineering investments to platform revenue growth narrative

---

## 2026-05-09 - Org Scale & Content Updates (PRs #22, #23)

- Updated org scale to reflect 70+ person distributed organization
- Added GCC/offshore track record references
- Added GCP experience attribution
- Added cybersecurity posture contribution
- Fixed summary and org bullet consistency

---

## 2026-04-03 - Infrastructure & Documentation (PRs #20, #21)

- Added ASSETS binding to wrangler config (fixed 1101 error on /portfolio)
- Added portfolio variant rotation logic documentation

---

## 2026-04-02 - A/B Testing & Admin Dashboard (PRs #17-19)

- Implemented A/B tracking for portfolio variants (herald, cipher, ember)
- Built admin dashboard with Analytics Engine integration
- Fixed wrangler v4 lockfile for Analytics Engine deploy
- Restored index page layout after unrequested changes

---

## 2026-04-01 - Portfolio Links & Email (PRs #14-16)

- Replaced expired Google image URLs with self-hosted profile pic
- Consolidated portfolio links in index
- Added back-to-main links and fixed landing page summary
- Corrected email typo and prepared for SendGrid migration

---

## 2026-03-30 - Deployment Debugging (PRs #12-13)

- Fixed deployment issues with wrangler log output and account_id config
- Resolved .assetsignore issues for node_modules exclusion

---

## 2026-03-29 - Foundation Build (PRs #1-11)

- Initial site launch with Cloudflare Workers
- Created resume.html and resume-alt.html with multiple themes
- Built portfolio variants: portfolio-apex, portfolio-nova
- Added executive portfolio variants: cipher, ember, herald
- Implemented Cloudflare Worker contact form with email routing
- Added mobile responsive layout with hamburger menu
- Fixed intersection observers for nav highlighting
- Resolved wrangler assets include/exclude configuration

---

## 2026-03-28 - Lift Off

- Initial repository creation
- First resume styles and responsive layout
- Removed old JSON files, established clean structure
