# Plan C — Execution Shell (references A and B; restates neither)

## Context

Two plans dated 2026-09-04 propose the same refresh from the Sep-3 evidence corpus:

- **A** = `plans/2026-09-04-sep3-evidence-extraction-integration-plan.md`
- **B** = `plans/2026-09-04-value-layer-extraction-content-refresh-plan.md`
- **Rationale record** (why the calls below go the way they do) =
  `plans/2026-09-04-sep3-evidence-integration-review-and-revised-plan.md`

Plan C is deliberately **not** an aggregate rewrite. It is a directive layer: **B is the
spine and executes as written**, except where an override below redirects a step to A or
supplies a fix neither plan has. Every row points at the governing section in its source
document. When C and a source document disagree, C wins; when C is silent, B governs.

The file to write is `plans/2026-09-04-plan-c-execution-shell.md`.

---

## Directive 1 — Base

Execute **B §V Waves 1–5** in order, under **B §IV placement rules 1–8**, against **B §III**
artifact inventory, closing on **B §VIII acceptance criteria**. B §VI risks and B §VII
out-of-scope stand unchanged.

## Directive 2 — Overrides (these supersede B)

| # | B element overridden | Governing source | Directive |
|---|---|---|---|
| O1 | **B §I decision 3** ("all 5" new case studies) and its **Wave 4** entry for `case-study-ai-adoption-operational-capability` | **A §Duplication matrix**, AI-adoption row (*Skip*) | Do **not** build the standalone AI-adoption case study or its card. Redirect its content to enrichment only, per B Wave 2 `aiPractitioner` and B Wave 4 enrichment rows for AI Development Framework and Agent-Multiplied Delivery. Net: −3 files, −1 card. |
| O2 | **B §I decision 3** and its **Wave 4** entry for `case-study-consultative-role-transition` | **A §Duplication matrix**, Consultative Role Transition row (*Fold in*) | Do **not** build the standalone page or card. Fold as a second corroborating instance into `case-study-owning-the-whole-system.html` (+ `-cipher`, `-ember`), merging with B's existing Wave 4 enrichment row for that same file so it is edited once. Net: −3 files, −1 card. |
| O3 | **B §V Wave 1**, confidence values (`directional`/`attributed`) | Fix F1 below | `attributed` is not a valid enum value. Use `directional` only. |
| O4 | **B §V Wave 2** `leadershipFrameworks` 16 → 20 (Engineering Operating Model, TSAL, Well-Architected nine pillars) | Fix F2 below | Split the three `frameworks_and_principles`-sourced cards out of Wave 2 into a new **Wave 4.5**, reviewed as their own batch. The consolidated **Leadership Operating Principles** card (B §I decision 2) stays in Wave 2 — it is Sep-3-corpus material. |
| O5 | **B §V Wave 4** enrichment table (7 existing case studies × 3 variants ≈ 21 files) | Fix F3 below | Demote to **Wave 6**, after validation of everything else. Optional; cut if the diff is already large. The Owning-the-Whole-System row is exempt — it is promoted into O2 and ships in Wave 4. |

## Directive 3 — A elements explicitly **not** adopted

Recorded so they aren't reintroduced mid-execution:

- **A §Context decision 1** (corpus is *Verified*) — rejected. **B §IV rule 6** governs.
- **A §Execution sequence step 4**, the standalone `case-study-engineering-maturity-manifest.html` — rejected. **B §I decision 2** + B's Manifest enrichment row achieve it without a new page.
- **A §Context decision 2** (GCC stays restricted, no public copy) — rejected. **B §I decision 1** + **B §III "Known contradiction to resolve"** govern; the current bullet contradicts the evidence and must be hedged, not frozen.
- **A §Execution sequence step 5** (verification) — rejected wholesale. **B §V Wave 5** governs.

A's duplication matrix is retained as a **reference artifact** for dedupe questions during drafting, beyond the two rows promoted in O1/O2.

## Directive 4 — Fixes present in neither A nor B

These are the only places C adds new instruction rather than pointing at one of the plans.

- **F1 — ledger enum.** `scripts/validate-evidence-ledger.mjs:5` permits exactly
  `verified | directional | recollection | unresolved`, lowercase. All Sep-3-derived records
  use `directional`. Carry the attribution hedge in the record's `attribution` verb and in
  `publication.restrictions` (e.g. `"[ATTRIBUTED] via AI-generated summaries; no measured
  outcomes"`), never in `confidence`. Sources: `{type: "internal-document", reference:
  "<ref code>"}` per meeting, plus one `{type: "owner-confirmation"}` for the corpus
  confirmation. (Lines 68-70 require a corroborating source type only for `verified`
  records; the ledger uses just `owner-confirmation` ×36 and `internal-document` ×68 today.)
- **F2 — evidence-lineage separation.** The three `frameworks_and_principles` cards rest on
  distilled first-party documents, not the Sep-3 summaries. Shipping them in the same diff
  as directional corpus material makes both harder to review. Hence Wave 4.5 (O4).
- **F3 — diff-size control.** B's enrichment table is the lowest-value, highest-churn item
  in either plan. Hence Wave 6 (O5).

## Directive 5 — Open decision (default set, override at any time)

**B §V Wave 2 exec-summary edit** (three layers: institutional resilience, evidence-gated
decisions, communication as quality mechanism) vs. **A §Execution sequence step 3**, which
declines any `summary` change.

**Default: take B's edit.** The three layers are competency-level and metric-free, so they
satisfy the standing Profile/Summary rule, and they are the genuinely new themes. Say the
word and I'll fall back to A's position and leave `summary`, `builderResume.summary`, and
the portfolio bio untouched.

---

## Resulting shape

| | B as written | Under Plan C |
|---|---|---|
| New case-study subjects | 5 | 3 (GCC capability-not-cost, DevOps CoE, Hiring-Alignment) |
| New case-study files | 15 | 9 |
| New `caseStudyCards` | 6 | 4 (the three above + ADVR de-orphan, B §I decision 4) |
| `leadershipFrameworks` | 16 → 20 in one wave | 16 → 17 in Wave 2; → 20 in Wave 4.5 |
| Enrichment file churn | ~21 files in Wave 4 | Owning-the-Whole-System in Wave 4; remainder deferred to Wave 6 |

## Execution order and gates

1. **Wave 1** — B §V Wave 1, with F1 applied. **Gate:** `npm run validate:evidence` and
   `npm test` green. Deliverable: B's placement map + canonical phrase list in `plans/`,
   which is the drafting source for all later waves.
2. **Wave 2** — B §V Wave 2, minus O4's three cards, plus Directive 5's default.
   **Gate:** JSON parse + `npm test`.
3. **Wave 3** — B §V Wave 3. **Gate:** embedded-fallback vs JSON diff pass across all 7 pages.
4. **Wave 4** — 3 new subjects × 3 variants (9 files) + the O2 fold into
   Owning-the-Whole-System. **Gate:** link check across all cards incl. `-cipher`/`-ember`
   and the new ADVR card.
5. **Wave 4.5** — the three `frameworks_and_principles` cards (O4), reviewed separately.
6. **Wave 5** — B §V Wave 5 in full (validation, anonymization grep, ATS export check,
   `DAILIES.md`).
7. **Wave 6** — remaining enrichment (O5), optional.

Baseline before any change: **65 ledger records valid, 26/26 tests passing.** Commits only
on request, per B §V Wave 5.8.

## Verification

Governed entirely by **B §V Wave 5**; no separate checklist. Run its steps at each wave
gate above rather than only at the end, since every embedded fallback silently masks a JSON
error until diffed. Close against **B §VIII acceptance criteria**, with two amendments from
O1/O2: acceptance criterion "every Sep-3 value layer is either published or ledger-recorded
with a restriction" is satisfied for AI-adoption and consultative-transition by enrichment
plus ledger record, not by a standalone page.
