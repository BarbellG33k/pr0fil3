# Sep-3 Evidence Integration — Two-Plan Review and Recommended Blend

## Context

Two plans dated 2026-09-04 both propose refreshing the resume/portfolio from the new
Sep-3 evidence corpus:

- **A — `2026-09-04-sep3-evidence-extraction-integration-plan.md`** (10.6 KB). Narrow:
  3 new case-study pages, ledger records, targeted folds. Treats the corpus as
  **Verified**.
- **B — `2026-09-04-value-layer-extraction-content-refresh-plan.md`** (24.7 KB, written
  10:47, marked *"Approved by owner. Save-only — execution not yet started."*). Site-wide:
  5 new case studies + ADVR de-orphan, 4 new framework cards, summary/bio edits, 7
  enrichment passes, all 5 portfolio variants. Treats the corpus as
  **directional/attributed, never verified**.

They are not two drafts of the same idea. They disagree on the one question that governs
everything downstream — **what this corpus is allowed to prove** — and they disagree on
scope by roughly 4×.

**Verdict: B is the stronger base. Adopt B, and use A's duplication matrix as a scope
filter to cut B's case-study count from 6 to 3.** Both plans contain a schema bug that
will fail validation; both fixes are below.

---

## Where B is clearly superior

**1. B gets the confidence question right — this is decisive.**
A's decision #1 declares the corpus **Verified** because Guillermo confirmed it. B's rule
IV.6 says the entire corpus is directional and *"no `verified` outcomes may be derived
from it."* B is correct, and the corpus says so itself:

- `evidence-extraction.md` §7.3: *"The corpus documents decisions, directives, and
  doctrines — not results."*
- §7.1: *"All 49 unique sources are AI-generated third-person summaries; no transcripts
  exist."*

Owner-confirmation raises confidence that he *said and directed* something. It cannot
manufacture an outcome. A's framing invites exactly the overreach the corpus warns about.
B's distinction — the directive is attributable, the result is not — is the sharper one.

**2. B catches a live contradiction A misses.** The current GCC resume bullet reads
*"Participated in engineering workstreams … while the program strategy and ownership
remained outside my direct design authority."* The Sep-3 summaries attribute strategy
steering to him. A says "keep the existing restriction as-is" and never notices the bullet
now **contradicts the evidence sitting next to it**. B resolves it with a hedged middle
("helped shape") plus a ledger record holding both readings. That's the single best catch
in either document.

**3. B finds material A ignores entirely.** Four documents in
`sources/frameworks_and_principles/` have **no framework card**: Engineering Operating
Model, Staff Engineer/TSAL, Well-Architected nine pillars, and Leadership Operating
Principles. That is genuinely unpublished value, on a *different and stronger* evidence
lineage than the Sep-3 summaries. A doesn't mention them.

**4. B maps the real execution surface; A treats it as an open question.** I verified B's
inventory and it is accurate:
- Five portfolio pages, not three (`executive_portfolio_{herald,cipher,ember}.html`,
  `portfolio-apex.html`, `portfolio-nova.html`).
- Every fetch has a duplicated fallback that must move in lockstep:
  `portfolio-content.js:114-122` falls back to an inline `portfolio-data` blob in each of
  the 5 pages; the frameworks grid falls back to **hardcoded static cards**
  (`executive_portfolio_herald.html:865-962`, Manifest card at 950-955);
  `resume.html:1698-2044` and `resume-alt.html:1388` carry `EMBEDDED_DATA` mirrors.

A's step 5 asks whether this is dynamic. It isn't, cleanly — each addition touches the
JSON plus ~12 mirrored locations.

**5. B has an anti-duplication *mechanism*, not just an analysis.** §IV gives artifact-role
separation (resume = compressed proof, initiatives = narrative, framework cards =
mechanism, case studies = deep narrative) plus a canonical phrase list so any line used in
2+ artifacts is worded identically. A has a good one-time matrix but no standing rule.

**6. B flags an anonymization violation already in production.** "OnePACS" appears in the
published Owning-the-Whole-System card despite the anonymization pass — a direct AGENTS.md
breach. B flags it for an owner decision rather than silently changing it. Correct handling.

**7. B's verification is real.** It uses `npm test` and the ledger validator, adds an
embedded-fallback-vs-JSON diff pass, a link check across cipher/ember suffixes, an ATS
export check, and an anonymization grep. A's verification is "open it in a browser" and
omits the test suite entirely. Baseline today: **65 ledger records valid, 26/26 tests pass.**

---

## Where A is right and B should absorb it

**A's per-item duplication matrix is the better analysis, and it contradicts B's
"all 5 case studies" decision on two items.** I verified A's claims against the code; they
hold. Import these two cuts into B:

- **AI Adoption as Operational Capability** — A marks it *Skip*: already covered by ADVR,
  AI-Era Leadership Platform, Agent-Multiplied Delivery, and AI Unit Economics, all with
  better primary evidence. Its corpus file has **3 references** and states *"positions and
  directives only; no summary reports adoption metrics."* B gives it a standalone page.
  **A is right** — fold the "ambition test" into the existing AI artifacts as enrichment.
- **Consultative Role Transition** — its 5 references are **all from a single counterpart**
  (the 1:1-A series), and the file says *"they do not report whether the handoff completed."*
  A folds it into `case-study-owning-the-whole-system.html` as a second corroborating
  instance. **A is right** — a standalone page on one counterpart's series is thin, and
  folding it actively reduces single-anecdote risk.

That cuts 6 files and the two weakest pages while losing no evidence.

**Also worth keeping from A:** its explicit reasoning that the Manifest framework is
page-less. B handles this better though — enriching the Manifest and shipping one
consolidated Leadership Operating Principles card is cleaner than A's separate Manifest
page. **Drop A's Manifest page; keep B's approach.**

---

## Blocking bugs in *both* plans

`scripts/validate-evidence-ledger.mjs` allows exactly four confidence values (line 5):
`verified`, `directional`, `recollection`, `unresolved` — **lowercase**.

- **A** writes `confidence: Verified` (capitalized) → invalid. And lines 68-70 require every
  `verified` record to carry a source typed `owner-confirmation` / `internal-document` /
  etc. A says to cite by ref code (`1:1-A/2026-06-16`) — that's a `reference`, not a `type`.
  The whole ledger uses only two types today (`owner-confirmation` ×36,
  `internal-document` ×68) and all 38 verified records satisfy the rule.
- **B** uses `directional`/**`attributed`** (rule IV.6, Wave 1). **`attributed` is not a
  valid enum value** → invalid.

**Fix for the blend:** confidence is `directional` for everything Sep-3-derived. Express
the attribution hedge in the `attribution` verb and `publication.restrictions`
(e.g. `"[ATTRIBUTED] via AI-generated summaries; no measured outcomes"`), never in
`confidence`. Sources get `{type: "internal-document", reference: "<ref code>"}` plus one
`{type: "owner-confirmation"}` where Guillermo confirmed the corpus.

One non-issue I checked so it doesn't get raised later: `normalize()` in `resume-export.js`
strips `/` from bullets, so new bullet punctuation cannot trip the ATS `workdayForbidden`
regex.

---

## Noise to remove from B

- **Case studies 14 → 19 is too many.** One existing study (ADVR) isn't even reachable from
  the grid. With the two cuts above it becomes 14 → 17, and the ADVR card de-orphans a
  page that already exists — net quality up, not just volume up.
- **Frameworks 16 → 20 in one pass is a lot of new surface.** Keep all four cards (they're
  genuinely unpublished and independently sourced), but ship them as a **separate wave**
  from the Sep-3 work — different evidence lineage, different review criteria. Don't let a
  weak-evidence corpus and a strong-evidence one land in one diff.
- **B's Wave 4 enrichment table touches 7 existing case studies × 3 variants = 21 files.**
  Sequence it last and treat it as optional polish; it is the lowest-value, highest-churn
  item in the plan.

## Fork for you to settle

A says **no summary changes** ("Profile/Summary must stay at competency level"). B weaves
three new layers into the exec summary (institutional resilience, evidence-gated decisions,
communication as quality mechanism). Those three are competency-level and carry no metrics,
so B does not violate the standing rule — and they're the genuinely new themes. **I'd take
B's summary edit**, but it's your call since A deliberately declined it.

---

## Recommended scope

| Item | Treatment |
|---|---|
| GCC: Capability, Not Cost | **New case study** (3 files) + hedged "helped shape" rewrite of the contradicting resume bullet and initiative card |
| DevOps Center of Excellence | **New case study** (3 files) + `strategicInitiatives` entry + Experity bullet |
| Hiring-Alignment Intervention | **New case study** (3 files) + `strategicInitiatives` entry + Experity bullet |
| AI Adoption / "ambition test" | **Cut standalone page** (A's call). Enrich `aiPractitioner`, AI Development Framework, Agent-Multiplied Delivery |
| Consultative Role Transition | **Cut standalone page** (A's call). Fold into Owning the Whole System as a second instance |
| ADVR Cycle | `caseStudyCard` only — de-orphans existing files |
| 4 constructed doctrines | One consolidated **Leadership Operating Principles** card; vocabulary woven into Manifest / Operating Model. Never presented as his named frameworks |
| Engineering Operating Model, TSAL, Well-Architected nine pillars | New framework cards — **separate wave**, separate evidence lineage |
| Rails-before-speed, three-levels/commoditization | Enrichment only; ledger record carries the single-audience caveat |
| Departure as Design Signal | Only if the regret half travels with it (the corpus file requires this) |
| Exec summary / portfolio bio | B's three layers — pending your call on the fork above |

## Execution sequence

Follow B's wave structure with the cuts applied:

1. **Wave 1 — ledger.** Audit the 65 existing records for duplicate claims first. Add
   records with `confidence: "directional"` and restriction strings per the fix above.
   Gate: `npm run validate:evidence` and `npm test` green. Produce B's placement map +
   canonical phrase list in `plans/` — it is the drafting source for everything after.
2. **Wave 2 — canonical copy.** `resume-content.json` (GCC bullet replacement, 2 added
   bullets, initiative rewrites/additions, `aiPractitioner`, `builderResume`), then
   `portfolio-content.json` (+4 `caseStudyCards`: GCC, DevOps CoE, Hiring-Alignment, ADVR).
   Then mirror into the 5 `portfolio-data` blobs, the 5 hardcoded frameworks-grid
   fallbacks, and both `EMBEDDED_DATA` blocks.
3. **Wave 3 — portfolio pages.** herald/cipher/ember, then apex/nova; verify `index.html`
   only.
4. **Wave 4 — case studies.** 3 new subjects × 3 variants (9 files) from
   `case-study-owning-the-whole-system.html` as template. Prose is authored once:
   `-cipher` vs `-ember` differ by **4 lines** (title, palette hex, two nav hrefs), and
   herald differs only in formatting and theme tokens.
5. **Wave 5 — framework cards** (the 4 unpublished docs), as its own reviewable batch.
6. **Wave 6 — enrichment passes** on existing case studies. Optional; cut if the diff is
   already large.

## Verification

B's Wave 5 checklist, run at each wave boundary rather than only at the end:

- `npm run validate:evidence` — schema + the corroborating-source rule.
- `npm test` — all 26 tests (`test:evidence`, `test:resume-export`, `test:version`).
- JSON parse check on `resume-content.json` and `portfolio-content.json`.
- Embedded-fallback vs JSON diff pass across all 7 pages — the highest-risk step, since
  every fallback silently masks a JSON error.
- Serve locally (`npm run dev`) **and** open via `file://` to exercise both the fetch and
  fallback paths.
- Link check across all cards including `-cipher`/`-ember` suffixes and the new ADVR card.
- ATS export check (PDF/TXT reading order) via the existing export path.
- Anonymization grep across all public files for names/vendors/internal identifiers.
- `DAILIES.md` entry. Commits only on request.

Acceptance: B's §VIII criteria, unchanged — they're falsifiable and worth keeping verbatim.

## Out of scope (B's §VII, endorsed)

The published `3-4x` / `30%+` / `35%+` figure audit; the "OnePACS" anonymization decision
(flag, don't auto-change); apex/nova purpose review; education toggle. Two more spotted:
`AGENTS.md` claims "no formal lint/typecheck pipeline," which is wrong — there are 26 tests.
