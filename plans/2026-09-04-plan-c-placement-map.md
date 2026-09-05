# Plan C — Placement Map (W1-T4)

**Purpose.** Every new value layer → the exact artifact(s) that carry it, with the approved
wording already cleared in the evidence ledger. This is the single drafting source for
Waves 2–6 (B §V Wave 1.3). Do not re-derive from `sources/`.

**Companion files:** `2026-09-04-plan-c-drafting-inputs.md` (safe-form wording, ref codes,
caveats, canonical phrase list) · `PLAN-C-EXECUTION-STATE.md` (status, invariants, ownership).

**Ledger state after Wave 1:** 75 records (was 65). 10 added, 3 modified. Validator green.

**Anti-duplication rule (B §IV rule 1).** Resume = compressed proof, no framework exposition.
Portfolio initiatives = narrative. Framework cards = mechanism definitions. Case studies =
deep narrative. A single fact appears in each layer at most once, worded per the canonical
phrase list.

---

## Layer 1 — `resume-content.json` → `experience[0].bullets` (Experity)

| Action | Group header | Content | Ledger record |
|---|---|---|---|
| **REPLACE** `bullets[8]` | *(existing position)* | Hedged GCC rewrite. Use `approvedWording` verbatim from the ledger: *"Helped shape the engineering strategy for a board-sponsored Global Capability Center initiative - framing it as a long-term engineering capability build rather than a cost-arbitrage play, with a phased rollout, standards calibrated to market, and onboarding engineered for scale."* | `experity-gcc-engineering-readiness` |
| **ADD** | `## Organizational Scale & Team Operations` | *"Established a DevOps center of excellence and consolidated DevOps leadership to convert expert-held knowledge into documented, standardized, shared practice - explicitly to eliminate single-person dependency."* | `experity-devops-center-of-excellence` |
| **ADD** | `## Organizational Leadership & Strategic Operations` | *"Diagnosed and intervened on a misaligned hiring chain (recruiters, job descriptions, interviewers, engineering expectations), instituting consistent competency frameworks, structured assessment for disputed candidates, and explicit guardrails against title inflation and referral-driven hiring."* | `experity-hiring-chain-alignment` |
| **ENHANCE** | AI bullets | Append the ambition test: adoption is working when commitments get bigger, not just faster. | `experity-ai-adoption-ambition-test` |
| **ENHANCE** | Platform Modernization / reliability bullet | "build the rails before accelerating" + roll-forward posture. **Must carry the removal half** — gates that become ritual get removed. | `experity-rails-before-speed-posture` |

Constraints: no new metrics (INV-2). Attribution verbs exactly as the ledger records state.
Group headers already exist verbatim — do not invent new ones.

## Layer 2 — `resume-content.json` → `strategicInitiatives` (14 → 15)

| Action | Entry | Notes |
|---|---|---|
| **REWRITE** | "Global Capability Center - Engineering Workstream Participation" | `status`: `Participating` → `Shaping`. Rename away from "Workstream Participation". Summary to the hedged capability-build framing. `keyDetails` gain: hiring bar held against cost pressure; onboarding engineered for scale; standards calibrated not lowered. |
| **ADD** | DevOps Center of Excellence | `status`: `Active - Establishing`. Full schema incl. `metricHighlights` (leave empty — no metrics exist), `metrics`, `technologies`, `caseStudyUrl` → `case-study-devops-center-of-excellence.html`. |
| **ADD** | Hiring Chain Alignment | `caseStudyUrl` → `case-study-hiring-alignment-intervention.html`. |
| **ENRICH** | Operating Model Transformation | Add the no-heroes motive + the consultative-transition move as a constituent. Cross-link DevOps CoE. Do **not** restate `pillar-sustainable-systems-experity` content. |
| **ENRICH** | Enterprise AI Adoption | Ambition test. |
| **ENRICH** | Security Rails | Rails-before-speed + roll forward, both halves. |

⚠️ Schema note: A's field list is incomplete. Real fields are `name`, `category`, `status`,
`summary`, `narrative`, `role[]`, `roleDescription`, `frameworks[]`, `keyDetails[]`,
`metricHighlights[]`, `metrics[]`, `technologies[]`, `caseStudyUrl`. `metricHighlights` feeds
the portfolio stat tiles — leave empty rather than inventing numbers.

## Layer 3 — `resume-content.json` → `leadershipFrameworks` (16 → 17 in Wave 2)

| Action | Entry | Notes |
|---|---|---|
| **ADD** | **Leadership Operating Principles** | The one consolidated card for all four constructed doctrines (B §I decision 2, INV-4). Public copy says "operating principles" — never the four synthesized names. Draw `description` from the four `approvedWording` strings. Origin line: principles observed consistently across four direct working relationships and a leadership channel over eight-plus months. |
| **ENRICH** | Engineering Maturity & Accountability Manifest | Cross-reference the no-heroes generalization. Do **not** restate; the Manifest already says "Kill Your Heroes, Stop Doing It Harder". No `caseStudyUrl` added — Plan C drops A's separate Manifest page. |
| **ENRICH** | Say-Do Operating System | Fold in the evidence-gate detail (problem, friction, benefits, risks, mitigation, return; applied to his own initiatives first). |
| **ENRICH** | AI Development Framework | Three-level hierarchy + commoditization thesis. Hedge as an articulated perspective, never institutional rollout. |
| *(deferred)* | Engineering Operating Model · Staff Engineer/TSAL · Well-Architected nine pillars | **Wave 4.5** (Plan C O4) — different evidence lineage, reviewed separately. |

## Layer 4 — `resume-content.json` → `aiPractitioner`, `builderResume`, `summary`

- `aiPractitioner`: ambition test; agent-workflow usage goals; three-level hierarchy.
- `builderResume.summary` + `technicalPractice`: three-levels framing (coding as implementation
  vs. engineering judgment as durable value); roll-forward CI/CD posture.
- `summary` + `builderResume.summary` (**D-1, default = do it**): weave three competency-level
  layers into the existing four paragraphs at equal length — institutional resilience;
  evidence-gated decisions applied symmetrically including upward; communication as a quality
  mechanism. Preserve the engineer→architect→executive arc, people-first accountability,
  regulated-industry context, and the AI governance line. **No org specifics, no metrics.**

## Layer 5 — `portfolio-content.json`

- `summary` (bio): add institutional-resilience and repeated-communication lines. Evidence-gating
  is already present — do not duplicate it.
- `hero.tagline`: unchanged.
- `caseStudyCards` **+4**, each with `variants: ["herald","cipher","ember","apex","nova"]`:
  1. GCC: Capability, Not Cost → `case-study-gcc-capability-not-cost.html`
  2. DevOps Center of Excellence → `case-study-devops-center-of-excellence.html`
  3. Hiring-Alignment Intervention → `case-study-hiring-alignment-intervention.html`
  4. **ADVR Cycle** → `case-study-advr-cycle.html` (de-orphans existing files, B §I decision 4)

## Layer 6 — Mirrors (INV-7, W2-T5)

Every Layer 1–5 change propagates to: `resume.html` `EMBEDDED_DATA` · `resume-alt.html`
`EMBEDDED_DATA` · `portfolio-data` blobs in all 5 portfolio pages · the hardcoded
frameworks-grid fallback cards in all 5 portfolio pages. **The fallbacks silently mask JSON
errors — the W3 gate diff is what catches a missed mirror.**

## Layer 7 — Case studies (Wave 4)

| File base | Source material | Attribution ceiling |
|---|---|---|
| `case-study-gcc-capability-not-cost` | Drafting inputs §1 | "helped shape" — never "directed"/"owned" (INV-6) |
| `case-study-devops-center-of-excellence` | Drafting inputs §2 | "established" |
| `case-study-hiring-alignment-intervention` | Drafting inputs §5 | "diagnosed / intervened / instituted" |
| `case-study-owning-the-whole-system` *(edit)* | Drafting inputs §3 | Fold consultative transition as a second corroborating instance. If departure material is used, INV-5 forces the regret half to travel with it. |

Template: existing section order — Executive Summary → Pattern Recognized → Strategic Reframe
→ Leadership Mechanisms → Transferable Operating Model Artifacts → Competencies Demonstrated.
Outcomes stated in safe form only ("documented directive", "operating stance", "decision and
rationale"). Cross-link rather than restate.

## Layer 8 — Deferred

- **Wave 4.5:** three framework cards from `sources/frameworks_and_principles/`.
- **Wave 6:** B §V Wave 4 enrichment table minus the Owning-the-Whole-System row.

---

## Records deliberately NOT published

| Record | Why |
|---|---|
| `leadership-principle-departure-signal` | `restricted`. Weakest evidence in the corpus (2 meetings, 1 counterpart, ~1 week). Eligible for case-study/interview only, and only with the regret half attached. |
| `experity-consultative-role-transition` | No standalone page (Plan C O2) — single-counterpart. Appears only as a folded instance. |
| `experity-ai-adoption-ambition-test` | No standalone page (Plan C O1) — enrichment only. |
| `engineering-levels-commoditization-thesis` | Published as enrichment only; single-audience caveat bars heavy use. |

This satisfies B §VIII's "nothing silently dropped" criterion: each is either published in a
reduced form or carries a ledger restriction explaining why not.
