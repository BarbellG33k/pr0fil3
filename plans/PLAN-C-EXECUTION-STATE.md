# Plan C — Execution State

**This file is the single source of truth for execution progress.** It is written to be
resumable cold by any agent, including a different agent product or a fresh session with
no conversation history. Update it at every task transition — never batch updates.

**Last updated:** 2026-09-05 (final pre-publish review: shipped via PR #57, now live; F7/F8 remediated) · **Current wave:** done through 6 · **Overall:** 7 of 7 waves complete · **Status: PUBLISHED** — see the publish record in §6 before treating this file as describing an unpushed tree

---

## 0. Resume protocol (read this first if you are picking up cold)

1. Read `plans/2026-09-04-plan-c-execution-shell.md` (**Plan C** — the directive layer).
2. Read **B** = `plans/2026-09-04-value-layer-extraction-content-refresh-plan.md`. B is the
   spine; C overrides specific parts of it. Where C is silent, B governs.
3. Consult **A** = `plans/2026-09-04-sep3-evidence-extraction-integration-plan.md` only where
   C's overrides O1/O2 point to it, and as a dedupe reference.
4. Rationale for every call: `plans/2026-09-04-sep3-evidence-integration-review-and-revised-plan.md`.
   **Drafting source for all copy: `plans/2026-09-04-plan-c-drafting-inputs.md`** — safe-form
   wording, ref codes, caveats, attribution verbs, and the canonical phrase list. Use it
   instead of re-reading `sources/` (which is gitignored and may not exist on your machine).
5. Find the first task below whose status is not `done`. Check §4 file ownership before
   editing anything. Run the wave's gate before marking the wave complete.
6. Do not trust this file's "in progress" markers blindly — verify against the repo
   (`git status`, run the gates) before continuing someone else's partial work.

## 1. Invariants (violating any of these is a defect, regardless of wave)

- **INV-1 Anonymization.** *Scope clarified during Wave 3:* the **employer name is not in
  scope** — `resume-content.json` carries it as `experience[].company` and `index.html` names
  it in prose, both long-standing owner practice. What must be anonymized is everything below
  that: individuals, team names, internal initiative/product codenames, and all Sep-3 corpus
  detail. (This is why the "OnePACS" flag in B §VII is a genuine violation — it is a product
  codename — while the employer name is not.) Do not churn on the employer name in Wave 5.
- **INV-1 Anonymization.** No company or individual named in any generated/published output.
  Role terms only ("the Principal Engineer", "an offshore office"). Ref codes
  (`1:1-A/2026-06-16`, `TEAM/2026-05-20`) are allowed. `INTERNAL-provenance.md` must never be
  read into published copy or quoted in reports. Guillermo himself may be named. (AGENTS.md)
- **INV-2 No measured outcomes.** Nothing derived from the Sep-3 corpus may be published as a
  measured result. The corpus contains none (`evidence-extraction.md` §7.3). (B §IV rule 6)
- **INV-3 Confidence enum.** `verified | directional | recollection | unresolved`, lowercase
  only. All Sep-3-derived records are `directional`. `attributed` is NOT valid and will fail
  the validator. Hedge in `attribution` + `publication.restrictions`. (Plan C F1)
- **INV-4 Constructed labels.** The four doctrine names (No-Heroes Standard, Show Me Your
  Work, Departure as Design Signal, Perception Becomes Reality) are the extraction's
  synthesis. Never present them as frameworks Guillermo named. Public copy says "operating
  principles". (B §I decision 2)
- **INV-5 Departure material** carries both halves (decisive move + expressed regret) or is
  omitted.
- **INV-6 GCC wording** is the hedged "helped shape" everywhere it appears. (B §I decision 1)
- **INV-7 Mirrors.** Any JSON content change must propagate to: 5 `portfolio-data` blobs,
  5 hardcoded frameworks-grid fallbacks, 2 `EMBEDDED_DATA` blocks. (B §III)
- **INV-8 Commits.** Do not commit or push unless the owner explicitly asks. (B §V Wave 5.8)

## 2. Decisions

| ID | Decision | Value | Set by |
|---|---|---|---|
| D-1 | Exec summary / portfolio bio edit | **Take B's three layers** (institutional resilience, evidence-gated decisions, communication as quality mechanism) | Plan C Directive 5 default; owner may flip to A's "no change" at any time |
| D-2 | Standalone AI-adoption case study | **Cut** — enrichment + ledger record only | Plan C O1 |
| D-3 | Standalone consultative-transition case study | **Cut** — fold into Owning the Whole System | Plan C O2 |
| D-4 | Three `frameworks_and_principles` cards | **Deferred to Wave 4.5** | Plan C O4 |
| D-5 | Enrichment of 7 existing case studies | **Deferred to Wave 6**, optional | Plan C O5 |
| D-6 | GCC attribution verb | **"helped shape"** (owner's hedge) — even though the corpus's own safe-form says *"Directed the offshore office strategy"* and the extraction assesses the supported verb as *directed/steered* (5 months, 2 independent series). Deliberate conservative trade, not an oversight. Owner may upgrade. | B §I decision 1 / INV-6 |

## 3. Wave and task status

Status values: `todo` · `in progress` · `blocked` · `done`

### Wave 1 — Private evidence foundation (no public changes) — **in progress**

| ID | Task | Status | Owner | Notes |
|---|---|---|---|---|
| W1-T1 | Audit 65 existing ledger records for claims that already cover Plan C's new clusters | **done** | subagent (read-only) | Verdicts: 8 new / 3 overlapping. Dedupe held record growth to +10 vs B's 20–25 estimate |
| W1-T2 | Consolidate drafting inputs from the 11 corpus files (ref codes, spans, counterparts, caveats, safe-form wording) | **done** | subagent (read-only) | → `plans/2026-09-04-plan-c-drafting-inputs.md`. Includes the canonical phrase list (B §IV rule 3). **Corpus reading is finished — no later wave needs `sources/`** |
| W1-T3 | Write new ledger records into `.private/evidence-ledger.json` | **done** | main | **65 → 75 records.** 10 added, 3 modified. All new records `confidence: "directional"` per INV-3. Backup at scratchpad `evidence-ledger.backup.json` |
| W1-T4 | Placement map + canonical phrase list → `plans/2026-09-04-plan-c-placement-map.md` | **done** | main | Drafting source for Waves 2–6 (B §V Wave 1.3) |
| W1-G | **Gate:** `npm run validate:evidence` && `npm test` | **done — GREEN** | main | 75 records valid · 26/26 tests pass |

**Wave 1 complete.** New record ids: `experity-devops-center-of-excellence`,
`experity-consultative-role-transition`, `experity-ai-adoption-ambition-test`,
`experity-hiring-chain-alignment`, `leadership-principle-no-heroes`,
`leadership-principle-evidence-gate`, `leadership-principle-departure-signal`,
`leadership-principle-communication-repetition`, `experity-rails-before-speed-posture`,
`engineering-levels-commoditization-thesis`.
Modified: `experity-gcc-engineering-readiness` (attribution `contributed` → `helped shape`,
prior wording preserved in `conflicts[]` per B §III), plus cross-reference restrictions added
to `pillar-leadership-through-leaders-experity` and `pillar-sustainable-systems-experity`.

### Wave 2 — Canonical copy (JSON first, then mirrors) — todo

| ID | Task | Status | Owner | Notes |
|---|---|---|---|---|
| W2-T1 | `resume-content.json`: exec summary (D-1), Experity bullets incl. GCC replacement (INV-6) | **done** | main | Summary: 3 layers into paras 1 and 3. Bullets 23 → 25 |
| W2-T2 | `resume-content.json`: `strategicInitiatives`, `aiPractitioner`, `builderResume` | **done** | main | Initiatives 14 → **16** (both DevOps CoE *and* Hiring Chain — the placement map's "14 → 15" was wrong). `aiPractitioner.bullets` 11 → 13 |
| W2-T3 | `resume-content.json`: `leadershipFrameworks` 16 → 17 | **done** | main | Leadership Operating Principles added; Say-Do, Manifest, AI Development Framework enriched |
| W2-T4 | `portfolio-content.json`: bio + `caseStudyCards` +4 | **done** | main | 13 → 17 cards, all `variants` = all five |
| W2-T5 | Mirror sync: 2 `EMBEDDED_DATA` + 5 `portfolio-data` + 3 frameworks-grid fallbacks | **done** | main | Fallback exists only in herald/cipher/ember; apex/nova render frameworks differently |
| W2-G | **Gate:** JSON parse + `npm test` + `validate:evidence` | **done — GREEN** | main | JSON OK · 75 records valid · 26/26 pass |

**Wave 2 complete.** ⚠️ **Do not deploy between Wave 2 and Wave 4.** The 3 new
`caseStudyCards` point at case-study pages that do not exist until Wave 4, so the portfolio
currently renders three dead links. (The 4th new card, ADVR, links to pages that already
exist and is safe.)

### Wave 3 — Executive portfolio pages — todo

| ID | Task | Status | Owner | Notes |
|---|---|---|---|---|
| W3-T1 | herald/cipher/ember: embedded data, Core Competencies grid, variant voice rules | **done** | main | Embedded data synced in W2-T5. Competencies: +2 tags, **additive** |
| W3-T2 | apex/nova: sync embedded content + shared-loader data | **done** | main | Embedded data synced; neither page has a competencies grid |
| W3-T3 | `index.html`: verify consistency only | **done — no edit needed** | main | Already reads *"turning ambiguity and hero dependency into durable systems"* — matches the thesis |
| W3-G | **Gate:** embedded-fallback vs JSON diff pass across all 7 pages | **done — GREEN** | main | **ALL MIRRORS IN SYNC** (7 pages, key-by-key deep compare) |

**Wave 3 complete.** Notes:
- B described the competencies grid as "3 groups × 4". It is actually **5 cards**, and one
  already carried 6 tags — so tag count is not fixed. Change was therefore **additive**
  (+"Institutional Resilience", +"Talent Systems") rather than swapping, which preserves the
  P&L and stakeholder signals. Labels shortened in cipher/ember to match their terser voice.
- apex/nova have no Executive Leadership competency card — skipped, not an omission.

### Wave 4 — Case studies — todo

| ID | Task | Status | Owner | Notes |
|---|---|---|---|---|
| W4-T1 | `case-study-gcc-capability-not-cost` × 3 variants | **done** | subagent | INV-6 honoured: explicit ownership disclaimer in both summary and mechanism |
| W4-T2 | `case-study-devops-center-of-excellence` × 3 variants | **done** | subagent | Cross-links Owning the Whole System without restating it |
| W4-T3 | `case-study-hiring-alignment-intervention` × 3 variants | **done** | subagent | Framed as a four-link system; approved verbs only |
| W4-T4 | Fold consultative-transition into `case-study-owning-the-whole-system` × 3 | **done** | main | Added as a "Consultative Role Redesign" mechanism card. **Departure material deliberately omitted** so INV-5 never applies — see note below |
| W4-T5 | Unslop pass over all new copy | **done** | main | See "Editorial QA" below |
| W4-G | **Gate:** link check across all cards incl. `-cipher`/`-ember` | **done — GREEN** | main | 17 cards × 3 = 51 files resolve · 51 case-study files scanned, **no broken links** |

**Wave 4 complete. The Wave 2 deploy block is now CLEARED** — every card target exists.

### Editorial QA (W4-T5)

Two automated scanners were built and live in the session scratchpad (`slop-scan.mjs`,
`dup-scan.mjs`). Re-run them on any new copy.

- **Word-list slop:** none in the 9 new files. The only two hits repo-wide
  (`leverage` ×4 in `resume-content.json`, `arena` in `portfolio-content.json`) are
  **pre-existing** — verified against backups, zero introduced by this work. Left alone
  rather than rewriting the owner's established voice unasked.
- **Internal near-duplication — two real defects found and fixed:**
  1. GCC page opened its Pattern card and Executive Summary with the same sentence
     (59% shingle overlap). Executive Summary rewritten to advance rather than restate.
  2. DevOps page repeated "a key-person dependency is a design defect, not a staffing gap"
     three times. The weakest instance was replaced with a transferable design rule.
- **INV-5 avoided by construction:** W4-T4 uses only the consultative-transition evidence
  and no departure material, so the mandatory regret pairing is not triggered.
  `leadership-principle-departure-signal` remains `restricted` and unpublished.

### Wave 4.5 — Framework cards (separate evidence lineage) — **done**

| ID | Task | Status | Owner | Notes |
|---|---|---|---|---|
| W45-T1 | Engineering Operating Model card | **done** | validating agent | Sourced from `frameworks_and_principles/`, not Sep-3 corpus. Ledger record added first |
| W45-T2 | Staff Engineer / TSAL card | **done** | validating agent | Ledger record added first |
| W45-T3 | Well-Architected nine-pillar card | **done** | validating agent | Ledger record added first; `conflicts[]` keeps it distinct from Architecture Hub five-pillar |
| W45-G | **Gate:** `npm test` + mirror sync | **done — GREEN** | validating agent | 26/26 · 78 records · frameworks 17 → 20 · fallbacks added to herald/cipher/ember · mirrors in sync |

**Wave 4.5 complete.** 3 ledger records + 3 `leadershipFrameworks` cards + 3 abridged
frameworks-grid fallbacks each in herald/cipher/ember. apex/nova render no frameworks
grid (verified), so no mirror needed there.

### Wave 5 — Validation & changelog — **done**

| ID | Task | Status | Owner | Notes |
|---|---|---|---|---|
| W5-T1..T8 | B §V Wave 5 steps 1–8 in full | **done** | validating agent (independent) | Report: `plans/2026-09-04-wave5-validation-report.md`. All gates re-run green; one defect (F1) found & fixed |
| W5-G | **Gate:** B §VIII acceptance criteria, amended per Plan C O1/O2 | **done — GREEN** | validating agent | See report §5 acceptance matrix |

**Wave 5 complete.** Independent validation found and fixed **F1**: two framework-card
descriptions in `resume-content.json` published the restricted departure principle
without its mandatory regret pairing. Clauses removed; ledger restriction now matches
public copy. **F2** (OnePACS codename in Owning-the-Whole-System content) and **F3**
(scratchpad QA scanners not persisted) carried for owner decision. `DAILIES.md` entry
appended. Nothing committed (INV-8).

### Wave 6 — Remaining enrichment (optional) — **done** (2026-09-05, owner-approved)

| ID | Task | Status | Owner | Notes |
|---|---|---|---|---|
| W6-T1 | B §V Wave 4 enrichment table minus the Owning-the-Whole-System row | **done** | completion agent | 5 subjects ×3 variants, identical deltas. Operating Model Transformation row already satisfied by Waves 2/4. See notes below |

**Wave 6 complete.** Enrichments applied (base+cipher+ember identical prose, ledger
approvedWording followed verbatim where applicable):
1. **Security Rails** ×3: mechanism cards Rails Before Acceleration / Roll-Forward
   Default / Symmetric Gate Discipline + 2 principles. The mandatory removal half is
   carried (ledger restriction honoured). Source: `experity-rails-before-speed-posture`.
2. **AI Development Framework** ×3: new "Stated Hierarchy & the Ambition Test" section —
   three-levels hierarchy hedged as *stated* perspective (single-audience caveat,
   verbs on the articulated/taught ladder) + ambition test. Sources:
   `engineering-levels-commoditization-thesis`, `experity-ai-adoption-ambition-test`.
3. **Agent-Multiplied Delivery** ×3: "Usage Goals for Agent Workflows" card + principle
   (measurable usage goals; active adoption as documented directive — safe-form).
4. **Value Delivery Engineering** ×3: "Protected Customer Commitments" card + principle
   (key-customer contractual work protected, non-negotiable — safe-form operating stance).
5. **Architecture Delivery Enablement** ×3: "Nine-Pillar Standard & Self-Service
   Assessment" card — explicitly distinct from the five-pillar Architecture Hub card,
   with the designed-and-directed hedge ("final definitions and production rollout
   remain open"). Source: `framework-well-architected-nine-pillars` + its `conflicts[]`.
QA: slop strict on the 15 files → only the pre-existing "leverage" principle
(verified at HEAD, owner voice, zero introduced); dup-scan within-file CLEAN;
no metrics introduced; cipher↔ember normalized diffs = 0 for all 5 subjects.

## 4. File ownership (one writer per file at a time)

Enforced so a second agent can work in parallel without collision. Claim a file by putting
your agent name in the Owner column of the relevant task above **before** editing.

| File / group | Owned by wave | Parallel-safe with |
|---|---|---|
| `.private/evidence-ledger.json` | W1 | nothing — single writer, always |
| `resume-content.json` | W2, W4.5 | nothing — single writer |
| `portfolio-content.json` | W2 | nothing — single writer |
| `resume.html`, `resume-alt.html` (EMBEDDED_DATA) | W2-T5 | portfolio pages |
| 5 portfolio HTML pages | W2-T5, W3 | resume pages |
| `case-study-gcc-*` (3 files) | W4-T1 | W4-T2, W4-T3, W4-T4 |
| `case-study-devops-*` (3 files) | W4-T2 | W4-T1, W4-T3, W4-T4 |
| `case-study-hiring-*` (3 files) | W4-T3 | W4-T1, W4-T2, W4-T4 |
| `case-study-owning-the-whole-system*` (3 files) | W4-T4 | W4-T1..T3 |
| `plans/*` | any | — |

**Safest parallel split for a second agent:** the four W4 tasks are fully independent of each
other once Wave 1 and Wave 2 are done. Wave 4.5 is independent of Wave 4 except for the
shared `resume-content.json` writer lock.

## 5. Gate log

| Timestamp | Gate | Command | Result |
|---|---|---|---|
| 2026-09-04 ~10:45 | baseline | `npm run validate:evidence` | 65 records valid |
| 2026-09-04 ~10:45 | baseline | `npm test` | 26/26 pass |
| 2026-09-04 ~11:35 | **W1-G** | `npm run validate:evidence` | **75 records valid** ✅ |
| 2026-09-04 ~11:35 | **W1-G** | `npm test` | **26/26 pass** ✅ |
| 2026-09-04 ~11:55 | **W2-G** | JSON parse (both content files) | **OK** ✅ |
| 2026-09-04 ~11:55 | **W2-G** | `npm run validate:evidence` | **75 records valid** ✅ |
| 2026-09-04 ~11:55 | **W2-G** | `npm test` | **26/26 pass** ✅ |
| 2026-09-04 ~12:10 | **W3-G** | embedded-fallback vs JSON deep diff, 7 pages | **ALL IN SYNC** ✅ |
| 2026-09-04 ~12:35 | **W4-G** | card targets + themed variants (51 files) | **ALL RESOLVE** ✅ |
| 2026-09-04 ~12:35 | **W4-G** | internal link scan, 51 case-study files | **no broken links** ✅ |
| 2026-09-04 ~12:35 | **W4-G** | invariant scan (anonymization/metrics/attribution) | **ALL PASSED** ✅ |
| 2026-09-04 ~12:35 | **W4-G** | `npm test` | **26/26 pass** ✅ |
| 2026-09-04 post-W4 | **W5 (independent)** | `npm run validate:evidence` | **75 records valid** ✅ |
| 2026-09-04 post-W4 | **W5 (independent)** | `npm test` | **26/26 pass** ✅ |
| 2026-09-04 post-W4 | **W5 (independent)** | mirror deep-diff, 5 portfolio-data + 2 EMBEDDED_DATA | **ALL IN SYNC** ✅ |
| 2026-09-04 post-W4 | **W5 (independent)** | card targets 79/79 · internal links 54/54 · strict anonymization scan | **ALL RESOLVE / CLEAN** ✅ |
| 2026-09-04 post-W4 | **W5 (independent)** | **F1 defect**: restricted departure doctrine in LOP + Manifest cards | **found → fixed** ⚠️✅ |
| 2026-09-04 post-W4 | **W45-G** | ledger records +3 → `npm run validate:evidence` | **78 records valid** ✅ |
| 2026-09-04 post-W4 | **W45-G** | `npm test` + JSON parse + mirror sync | **26/26 · OK · IN SYNC** ✅ |
| 2026-09-04 owner-pass | **F2 fix** | OnePACS scan (public artifacts) | **GONE** ✅ |
| 2026-09-04 owner-pass | **F4 fix** | product-name scan (AI Scribe/Care Agent/AIM, public) | **GONE** ✅ |
| 2026-09-04 owner-pass | **F4 fix** | `npm run validate:evidence` (3 approvedWordings updated) | **78 records valid** ✅ |
| 2026-09-04 owner-pass | **F5 fix** | deep-diff all 9 embedded blobs (5 portfolio-data + 4 EMBEDDED_DATA) | **ALL IN SYNC** ✅ |
| 2026-09-04 owner-pass | **F5 fix** | old GCC wording scan (public) | **GONE** ✅ |
| 2026-09-04 owner-pass | **F5 fix** | browser render apex + nova (hedged GCC + generic products, no internal names) | **CLEAN** ✅ |
| 2026-09-04 owner-pass | final | `npm test` | **26/26 pass** ✅ |
| 2026-09-05 | **Phase-1 review** | `npm test` | **26/26 pass** ✅ |
| 2026-09-05 | **Phase-1 review** | `npm run validate:evidence` | **78 records valid** ✅ |
| 2026-09-05 | **Phase-1 review** | JSON parse (both content files) | **OK** ✅ |
| 2026-09-05 | **Phase-1 review** | handoff §5 checker (9 blobs + banned scans + links) | **ALL CLEAN** ✅ |
| 2026-09-05 | **Phase-1 review** | §2.3 invariant greps (codenames/names/doctrines/departure/GCC/metrics) | **ALL PASS** (only documented `sel` false positives) ✅ |
| 2026-09-05 | **Phase-1 review** | §2.4 content review + §2.5 render checks (herald fallback + ember case study) | **PASS** — one new finding: **F6** ⚠️ |
| 2026-09-05 | **Phase-2** | owner decisions applied: F6 tagline→"shaped" (JSON+5 blobs); PDLC 78%→69% (resume JSON ×4 + 3 fallback tiles); fallback parity (initiatives +2 cards, frameworks +1 card + Architecture-Model rename, ×3 pages) | mirror checker + 26 tests re-run **GREEN** after each |
| 2026-09-05 | **Phase-2** | `scripts/validate-mirrors.mjs` promoted + wired into `npm test` | **27/27 tests** ✅ |
| 2026-09-05 | **Phase-2** | `scripts/slop-scan.mjs` + `scripts/dup-scan.mjs` recreated (F3 resolved) | clean on 15 Wave-6 files; default dup mode 5 accepted echoes only |
| 2026-09-05 | **W6-G** | Wave 6 enrichment (5 subjects ×3 variants) + QA discipline | **PASS** ✅ |
| 2026-09-05 | **Phase-2** | AGENTS.md lint line fixed; `.assetsignore` += `.private/` `.serena/` `scripts/` | **done** ✅ (`scripts/` exclusion matters: the mirror checker's banned-word list would otherwise deploy publicly) |

## 6. Handoff notes

Free-text scratch for anything a resuming agent needs that the tables don't capture.

### PUBLISH RECORD — Plan C is live (added 2026-09-05 by the final pre-publish review)

**Read this before assuming anything in this file describes an unpushed tree.** It does not.

- The four Plan C commits were pushed on branch `docs/linkedin-thread-plan`, together
  with a fifth commit `fdb53b6` that **did** add the three 2026-09-05 LinkedIn plan
  docs (reversing the "left untracked" note above).
- **PR #57** merged all of it to `main` at 2026-09-05T20:03:39Z as merge commit
  `8e1cbdb` — **55 files**. Its title, *"docs: add LinkedIn people-first/Deming thread
  plan and drafts"*, describes only 3 of those files. The Plan C content refresh has
  no PR of its own accurately describing it. Do not repeat this: give a content
  change its own PR.
- `.github/workflows/deploy.yml` auto-deploys on push to `main`. The run for `8e1cbdb`
  completed successfully and **the work is live at guillermosalas.dev**. Verified:
  live `resume-content.json` was byte-identical to the tree at `8e1cbdb`
  (16 initiatives, 20 frameworks, 25 bullets, `Helped shape` present, `78%` /
  `OnePACS` / `AI Scribe` absent). `.assetsignore` exclusions confirmed in
  production — `/scripts/*`, `/plans/*`, `/.private/*`, `/sources/*`, `/*.md`,
  `/worker.js` all return 404.

### Final pre-publish review findings and remediation (2026-09-05)

An independent cold review re-derived every gate and invariant. All gates green, all
§3 owner rulings adhered to, no identity leak, no codename, no fabricated metric.
Two content defects found, both since fixed on branch `fix/strip-evidence-provenance-vocabulary`:

- **F7 — evidence-ledger vocabulary in published copy.** Internal provenance language
  ("the record documents", "the summaries record", "the available sources", "the
  underlying record", "N independent counterpart settings", "corroborated across two
  counterpart series", "the strength of the evidence is", "per the record") shipped
  in 12 public files. It is meaningless to a hiring audience and collectively
  discloses that the profile derives from AI summaries of private 1:1s. The sharpest
  instance was the Leadership Operating Principles `origin`, which renders live in
  the frameworks grid on all three executive portfolios. Removed everywhere; the
  substantive no-metrics hedges were kept. **The invariant scans never caught this
  because they grep for names and old wording, not for ledger vocabulary — the same
  blind spot that let F6 through.** `scripts/validate-mirrors.mjs` now bans this
  class so it cannot regress.
- **F8 — GCC disclaimer repetition.** The non-ownership hedge appeared four times on
  one page, including one instance parked in the "Transferable Operating Model
  Artifacts" list (a disclaimer is not an artifact) and one as a "Bounded
  Contribution" mechanism card (a disclaimer is not a leadership mechanism). Owner
  ruling: state the boundary **once**, in the Outcome card, and keep the mechanism
  verbs strong — D-6's ceiling governs the strategy claim, not every sub-action.

Also corrected in the same pass: three new instances of "his own initiatives" that
broke the document's pronoun-free elided-third-person voice; flabby closing/opening
sentences in summary paragraphs 1, 3 and 4; and the pre-existing agreement error
"Built and lead" → "Built and leads" in `experience[0].bullets[9]`.

Carried, not fixed (pre-existing, outside Plan C, each needs its own ticket):
`/api/version` and the index badge serve the literal `BUILD_VERSION_PLACEHOLDER` in
production despite CI reporting a successful stamp; `/api/analytics` and
`/admin-dashboard` are unauthenticated; `/package.json`, `/package-lock.json` and
`/.gitignore` are served publicly.

- Baseline is green. Any gate failure after Wave 1 begins is introduced by this work.
- `normalize()` in `resume-export.js` strips `/` from bullets — ATS `workdayForbidden`
  regex is a non-issue for new bullet punctuation. Do not re-investigate.
- Case-study theme variants: `-cipher` vs `-ember` differ by ~4 lines (title, palette hex,
  two nav hrefs); base (herald) differs only in formatting and theme tokens. Author prose
  once, then mechanically derive the other two.
- Pre-existing issues deliberately NOT fixed here: `AGENTS.md` wrongly claims "no formal
  lint/typecheck pipeline" (there are 26 tests). (The OnePACS INV-1 violation was
  resolved on 2026-09-04 per owner ruling — see F2 note below.)

### Phase-2 completion pass (completion agent, 2026-09-05)

Owner decisions taken via decision list (all 10 items): F6→"shaped"; 78%→69% replace;
fallback parity = add-missing-only; mirror script promoted+wired; scanners recreated;
**Wave 6 approved and executed**; AGENTS.md fixed; `.assetsignore` hardened; commit in
suggested split approved (LinkedIn 2026-09-05 plan docs **excluded**, left untracked).

- **F6 RESOLVED.** Tagline now "An offshore office **shaped** as a long-term capability
  build rather than a cost-arbitrage play." in portfolio-content.json + 5 mirrors.
  Lesson folded into `scripts/validate-mirrors.mjs`? No — banned-list stays anchored to
  specific strings; verb-ceiling enforcement stays a human/owner check with the ledger
  restriction as reference. (Future improvement if wanted: check GCC copy against the
  `experity-gcc-engineering-readiness` approvedWording automatically.)
- **PDLC figure.** 78%→69% everywhere public (4 resume JSON strings + 3 fallback stat
  tiles). No ledger record carried the figure (verified), so no ledger change needed.
- **Fallback parity.** Initiatives fallback now 14 cards (added DevOps CoE + Hiring
  Chain after the GCC card, matching JSON order); frameworks fallback now 20 cards
  (added Operating Model Transformation after Security; renamed "Architecture
  Assessment Model"→"Architecture as Delivery Enablement" with JSON-aligned
  tagline/description). Curation otherwise preserved per owner choice.
- **D-5 superseded:** Wave 6 executed 2026-09-05 (owner flipped "defer" → "run").
- Commit split executed per handoff §4 as **4 commits** (the suggested 3 plus a
  `test:` commit for the promoted scanners): `872911f` feat(content), `736fa96` test,
  `5109630` docs(plans), `15e4c44` chore. LinkedIn plans excluded **at this point** —
  see the 2026-09-05 publish record below for what happened after.

### Phase-1 independent review (completion agent, 2026-09-05)

Re-verified all uncommitted work cold, from the repo, per handoff §2. All gates green
(see gate log). Everything in the Wave-5 report reproduced. New items:

- **F6 (found, NOT yet fixed — owner decision needed).** The new GCC case-study card
  tagline in `portfolio-content.json` + all 5 `portfolio-data` mirrors reads *"An
  offshore office **steered** as a long-term capability build rather than a
  cost-arbitrage play."* `steered` is one notch above the D-6/INV-6 ceiling
  ("helped shape"); the owner explicitly chose the more conservative verb even though
  the extraction supports directed/steered. Case-study page and resume bullet are
  clean; only the card tagline (new in Wave 2) slipped past — the invariant scans
  grep for the old "Participated…" wording, not for over-strong verbs. Proposed fix:
  *"An offshore office **shaped** as a long-term capability build…"* (or
  "framed as") + re-mirror 5 blobs. Note: pre-existing `resume-content.json` bullet
  "Helped steer the strategy for a maturing core market" is a **different subject**
  (core-market strategy, pre-dates this work at HEAD) — not in scope.
- **Observation (pre-existing, folds into handoff §3.2 decision).** The hardcoded
  frameworks-grid fallback in herald/cipher/ember carries 19 cards vs JSON's 20:
  "Operating Model Transformation" was never in the fallback (at HEAD too), and the
  fallback card "Architecture Assessment Model" uses a legacy title where the JSON
  card is "Architecture as Delivery Enablement". Both pre-date Plan C (verified
  against HEAD); the waves correctly added only the 4 new cards. JSON-fetch path
  renders all 20. Same curation-parity class as the initiatives fallback.
- **Observation (deploy hardening, cheap).** `.assetsignore` now excludes `sources/`
  (added this pass) but not `.private/`. CI deploys never see `.private/` (gitignored,
  never committed — production verified 404 today), but a **local** `npm run deploy`
  would read the live directory; wrangler's default treatment of dot-directories is
  not documented for modern static assets. Recommend adding `.private/` (+ `.serena/`)
  as defense-in-depth.
- **Observation (scope).** Two untracked plan docs dated 2026-09-05
  (`linkedin-people-first-deming-thread-plan`, `linkedin-thread-draft-posts-v1`) exist
  in `plans/` — not part of Plan C, not reviewed here. If committing, decide whether
  they ride along.
- Render checks: herald via `file://` shows the expected fetch-failure fallback path
  (17 case cards incl. all 4 new, frameworks fallback with all 4 new cards, curated
  12-card initiatives fallback with corrected GCC card); ember case-study variant
  loads and back-links to `executive_portfolio_ember.html#case-studies`. Console
  errors are the documented `file://` CORS artifacts only.

### Wave 5 validation pass (independent agent, post-Wave-4)

- **F1 (fixed).** Wave 2's framework cards leaked the restricted departure principle:
  LOP card ("And a departure is read as information about structure…") and Manifest
  enrichment ("…or in a departure that reveals what the structure was quietly resting
  on"). Ledger record `leadership-principle-departure-signal` is `restricted` with a
  mandatory-regret-pairing restriction and case-study/interview-only eligibility.
  Fix: both clauses removed; LOP now says "Three principles" (matches its tagline).
  **Lesson for future waves:** the validator does NOT cross-check `eligibleArtifacts`
  against actual publication — any future restricted record needs a manual publication
  grep before sign-off. The frameworks-grid fallbacks were already clean (abridged text
  only lists "a departure" among subjects, which mirrors the source's own positioning
  sentence and asserts no doctrine).
- **F2 (RESOLVED 2026-09-04).** Owner ruling: OnePACS codename must go; the case study
  represents a product/domain-agnostic pattern (acquired team, small and nimble, no
  formal process or quality gates, unaware of its maturity-curve position). Applied:
  all OnePACS mentions in `case-study-owning-the-whole-system*` (×3) replaced with
  acquired-platform framing; Executive Summary rewritten around that pattern; DICOM/HL7
  specifics generalized; "Care Agent" → "a customer-facing product" and "SEL leaders" →
  "the engineering leadership team" within that artifact; tagline updated in
  `portfolio-content.json` + 5 mirrors; Say-Do/Manifest `origin` lines in
  resume-content.json de-SEL'd. Verified: scans clean, mirrors in sync, 26/26 tests.
  **Remaining product names elsewhere (AI Scribe, Care Agent, AIM in resume bullets and
  aiPractitioner) were NOT touched — separate owner decision.**
- **F3 (carried).** `slop-scan.mjs` / `dup-scan.mjs` live only in the prior session's
  scratchpad. Promote to `scripts/` if reuse is wanted.
- **F4 (RESOLVED 2026-09-04).** Owner ruling: internal product names must not appear
  in published content. AI Scribe → "an AI clinical scribe"; Care Agent → "an agentic
  patient assistant" (builder: "agentic patient-assistant product"); AIM → "an
  automated insurance-matching agent". Applied to resume-content.json (5 strings),
  resume.html, resume-alt.html, apex/nova (via F5 resync), and the executive-portfolio
  narratives. Ledger approvedWording for the 3 adoption records updated to generic
  terms + restriction added; ledger claims keep real names as private provenance.
- **F5 (RESOLVED 2026-09-04).** Stale mirrors the W3-G gate missed: (1) apex/nova
  `const EMBEDDED_DATA` resume copies were pre-Wave-2 (21 bullets, old GCC "Participated"
  wording, old summary) — fully regenerated from resume-content.json and round-trip
  verified; (2) hardcoded Professional Narrative in herald/cipher/ember carried the old
  GCC sentence + product names — rewritten to hedged GCC + generic products; (3)
  hardcoded initiatives-grid fallback GCC card (title/status/summary/"Support" chip) —
  updated to "Engineering Capability Build" / "Shaping" / hedged summary / "Shaping"
  chip. **Gate lesson: any mirror check must enumerate every embedded blob
  (5 portfolio-data + 4 EMBEDDED_DATA + hardcoded fallback grids), not a hand-kept
  list.** All 9 blobs now deep-equal; apex/nova browser render-checked clean.
- **Wave 4.5 done in the same pass:** ledger-first (3 records, `directional`,
  evidence-boundary restrictions), then 3 cards in `resume-content.json`
  (frameworks 17 → 20, inserted before LOP), then abridged fallbacks in
  herald/cipher/ember. Icons: `workflow`, `assignment_ind`, `domain_verification`.
- Wave 6 deferred to owner (D-5 trigger met — diff already large).
- Full report: `plans/2026-09-04-wave5-validation-report.md`.

### Wave 2 prep already done (do not re-derive)

- Current counts confirmed: `strategicInitiatives` = 14, `leadershipFrameworks` = 16.
  Matches B §III.
- **The GCC contradiction is real and sits in two places**, both needing the INV-6 hedge:
  - `resume-content.json` → `experience[0].bullets[8]`: *"Participated in engineering
    workstreams for a board-sponsored Global Capability Center initiative-contributing to
    implementation planning, readiness coordination, and cross-functional alignment while
    the program strategy and ownership remained outside my direct design authority."*
  - `strategicInitiatives` → *"Global Capability Center - Engineering Workstream
    Participation"*, `status: "Participating"`, summary ends *"without claiming program
    ownership or design authority."*
  Both must move to the hedged "helped shape" middle in W2-T1 / W2-T2, and the mirrors in
  W2-T5 carry the same change.
- ~~Flag for the Wave 5 anonymization scan: `bullets[12]` names a country.~~ **Withdrawn.**
  The ledger already carries `india-rcm-acquisition-walk-the-wall` with
  `publication.status: "public-safe"` — this is a settled owner decision, not a leak. Do not
  re-raise. (The OnePACS flag in B §VII still stands and is unrelated.)

### Findings from Wave 2 execution

- **Pre-existing mirror drift, now fixed:** `portfolio-nova.html` carried **12** embedded case
  study cards while `portfolio-content.json` had 13. The mirror sync corrected it. This is
  exactly the failure mode INV-7 and the W3 gate exist to catch.
- **Mirror scope is narrower than feared.** `leadershipFrameworks` and `strategicInitiatives`
  are **not** in any embedded blob (`portfolio-data` = meta/summary/hero/caseStudyCards;
  `resume.html` EMBEDDED_DATA = meta/summary/experience/skills/education/certifications/
  aiPractitioner; `resume-alt.html` = meta/education/builderResume). They live only in
  `resume-content.json` plus the hardcoded frameworks-grid fallback in 3 pages.
- **Fallback descriptions are intentionally abridged**, not verbatim copies of the JSON. The
  Wave 2 enrichments to Say-Do / Manifest / AI Development Framework were therefore *not*
  back-ported into the abridged fallback text; only the missing new card was added. This
  matches existing behaviour — do not "fix" it.
- Backups of all edited files are in the session scratchpad (`*.backup.json`, `html-backup/`).
  They are session-local and will not survive a machine change; `git` is the durable undo.

### Portability constraints (matters for handing off to another machine or agent)

- `.gitignore` excludes **`sources/`** and **`.private/`**. The evidence corpus and the
  evidence ledger are **local-only** and do not travel with the repo. An agent resuming on
  a different machine can execute Waves 2, 3, 4, 4.5 and 6 from `plans/` alone, but
  **cannot** do Wave 1 (ledger) or re-derive corpus quotes without those directories.
  Mitigation: W1-T4's placement map lands in `plans/` (tracked) and carries the anonymized
  drafting inputs forward, so downstream waves are self-sufficient.
- `plans/` **is** tracked, so Plan C, this state file, and the placement map travel with
  the repo and survive a machine change.
- `.assetsignore` excludes `plans/` and `*.md`, so none of these documents are deployed to
  the public site. Verified against `wrangler.jsonc` (`assets.directory: "."`).
- Nothing here is committed unless the owner asks (INV-8), so a handoff across machines
  currently requires either a commit or a manual copy of `plans/`.
