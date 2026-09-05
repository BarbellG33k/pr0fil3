# Wave 5 — Validation Report (Plan C Execution)

**Date:** 2026-09-04
**Validated by:** independent agent (did not execute Waves 1–4)
**Scope:** Waves 1–4 of Plan C as recorded in `PLAN-C-EXECUTION-STATE.md`, plus the
remaining Wave 4.5 and Wave 5 write steps completed during this validation pass.
**Method:** every claim re-verified against the repo, not taken from the state file.

---

## 1. Gate results (re-run independently)

| Gate | Command | Result |
|---|---|---|
| Test suite | `npm test` | **26/26 pass** (incl. ATS export, ledger, version validators) |
| Evidence ledger | `npm run validate:evidence` | **valid — 78 records** (75 after Wave 1 + 3 added by Wave 4.5 in this pass) |
| JSON integrity | parse both content files | **OK** |
| Mirror sync — portfolio-data | deep compare, 5 pages | **ALL IN SYNC** |
| Mirror sync — EMBEDDED_DATA | deep compare, resume.html (7 key groups) + resume-alt.html (3 key groups) | **ALL IN SYNC** |
| Link check — cards | 17 cards × variants = 79 targets | **79/79 resolve** |
| Link check — internal | 54 hrefs across 51 case-study files | **no broken links** |
| Anonymization scan | strict word-boundary regex over all public artifacts | **CLEAN** (initial hits were "happen"→"Happ" false positives) |
| Metrics in new case studies | numeric/percentage/currency scan | **none** (INV-2 holds) |
| Variant derivation | diff cipher vs ember (new GCC trio) | differences limited to title, palette hexes, nav/footer hrefs |

## 2. Invariant verification

| Invariant | Verdict | Evidence |
|---|---|---|
| INV-1 Anonymization | ✅ PASS | word-boundary name scan clean across all public files; employer name out of scope per Wave 3 clarification |
| INV-2 No measured outcomes | ✅ PASS | new case studies carry explicit disclaimers ("no headcount, retention, or delivery metrics are claimed here") |
| INV-3 Confidence enum | ✅ PASS | all 10 Wave-1 records `directional`; validator green |
| INV-4 Constructed labels | ✅ PASS | zero doctrine labels ("No-Heroes Standard", etc.) in any public artifact; LOP card framed as observed operating principles with stated evidence basis |
| INV-5 Departure pairing | ⚠️ **VIOLATION FOUND → FIXED** | see §3 (F1) |
| INV-6 GCC hedge | ✅ PASS after F5 fix | "Helped shape" in resume bullet + renamed initiative (`Shaping`) + case study + narrative + fallback card; explicit "not a claim of having directed or owned the program" disclaimer; no "directed/steered" claims anywhere. *(Initial pass missed stale wording in narrative + initiatives fallback — caught in the F4 scan, see §3 F5)* |
| INV-7 Mirrors | ✅ PASS after F5 fix | All 9 embedded blobs deep-equal sources: 5 portfolio-data + 4 EMBEDDED_DATA (resume, resume-alt, apex, nova); frameworks-grid fallbacks updated in herald/cipher/ember (apex/nova render no frameworks grid — verified). *(apex/nova EMBEDDED_DATA was stale pre-fix, see §3 F5)* |
| INV-8 Commits | ✅ PASS | working tree uncommitted throughout |

## 3. Defects found

### F1 — Departure doctrine published without mandatory regret pairing (FIXED)

**Finding.** Ledger record `leadership-principle-departure-signal` is
`publication.status: restricted`, carries the restriction *"MANDATORY PAIRING … Never
publish the decisive half alone,"* and is eligible only for `case-study` /
`interview-only` artifacts. Nevertheless two framework-card descriptions published the
decisive half alone:

- `resume-content.json` → Leadership Operating Principles card: *"And a departure is
  read as information about structure rather than as a retention problem to negotiate."*
- `resume-content.json` → Manifest card enrichment: *"…or in a departure that reveals
  what the structure was quietly resting on."*

The state file's W4-T4 note ("departure material deliberately omitted … remains
restricted and unpublished") was correct for the case-study fold but not for Wave 2's
framework cards. The automated validator does not cross-check `eligibleArtifacts`
against actual publication, so this passed every gate.

**Fix applied (this pass).**
- LOP description: departure sentence removed; "Four principles" → "Three principles"
  (tagline already enumerated only the other three — now consistent).
- Manifest enrichment: departure clause removed; sentence now ends at "…in a role that
  has become load-bearing alone."
- Verified: frameworks-grid fallbacks contain only the benign subject-listing phrasing
  ("whether the subject is hiring, architecture, a departure, or a security policy"),
  which mirrors the source document's own positioning sentence and asserts no doctrine.
- Ledger record left `restricted` — now consistent with reality.

### F2 — OnePACS product codename in public copy (RESOLVED — owner decision 2026-09-04)

Owner ruling: the codename must go; the use case represents a pattern that applies to
any software engineering team — the product and domain are irrelevant. The pattern is:
a team brought in through a merger, independent, small and nimble, no formal process,
discipline, or guidance, flying by the seat of its pants, no awareness of where it sat
on the maturity curve, no PDLC, no quality gates beyond opinions and random checks.

**Changes applied:**
- `case-study-owning-the-whole-system{,-cipher,-ember}.html` — every OnePACS mention
  replaced with pattern framing ("an acquired platform", "work on the acquired
  platform", "Engineering runs/builds and improves the platform"); Executive Summary
  rewritten around the acquired-team maturity pattern (small, nimble, informal process,
  no quality gates beyond opinions and random checks, no maturity awareness); domain
  specifics generalized (DICOM gateway → gateway, HL7 transformations → message
  transformations, DICOM routing → message routing); internal names removed from this
  artifact ("Care Agent" → "a customer-facing product", "SEL leaders" → "the
  engineering leadership team")
- `portfolio-content.json` + 5 portfolio-data mirrors — card tagline now "An acquired
  platform, Kafka, and the ownership of what hurts."
- `resume-content.json` — Say-Do and Manifest framework `origin` lines: "SEL" team name
  and OnePACS removed ("the engineering leadership team's weekly operating cadence",
  "an acquired platform's hero-dependency recovery")

**Verified:** OnePACS/DICOM gone from all public artifacts; SEL hits are a JS variable
(false positive); all 5 mirrors IN SYNC; 26/26 tests pass; JSON valid.

### F4 — Internal product names in public copy (RESOLVED — owner decision 2026-09-04)

Owner ruling: product names must not appear in published content; use generic product-
category terms. Applied everywhere:

| Internal name | Generic term |
|---|---|
| AI Scribe | an AI clinical scribe |
| Care Agent | an agentic patient assistant (builder copy: "an agentic patient-assistant product") |
| AIM | an automated insurance-matching agent |

**Locations updated:** `resume-content.json` (5 strings: executive bullet, aiPractitioner
bullet, Enterprise AI Adoption keyDetail, 2 builderResume bullets) · `resume.html` +
`resume-alt.html` embedded copies · `portfolio-apex.html` + `portfolio-nova.html` (via
full resync, see F5) · executive-portfolio hardcoded Professional Narrative (×3).
All adoption figures unchanged; wording otherwise untouched.
**Ledger:** `ai-scribe-adoption`, `care-agent-adoption`, `insurance-matching-adoption`
approvedWording updated to the generic terms + restriction recorded (internal names must
not appear in published artifacts). Claims retain real names as private provenance.

### F5 — Stale mirrors missed by the W3-G gate (found during F4 scan, FIXED)

The W3-G "ALL MIRRORS IN SYNC" claim was incomplete. It compared the 5 `portfolio-data`
blobs and (per the state file) the resume-page EMBEDDED_DATA, but **not**:

1. **apex/nova `const EMBEDDED_DATA` resume copies** — stale pre-Wave-2 content:
   21 bullets vs 25, old "Participated in engineering workstreams" GCC wording, old
   exec summary, old aiPractitioner, old builderResume (nova), old meta title (apex).
   Fallback path only (production fetches `resume-content.json`), but shipped HTML.
2. **Hardcoded Professional Narrative** in herald/cipher/ember — old GCC
   "Participated…" sentence (INV-6 violation) + named products (AI Scribe/Care Agent/AIM).
3. **Hardcoded initiatives-grid fallback** in herald/cipher/ember — GCC card with old
   title ("Global Capability Center Participation"), old status ("Active -
   Implementation"), old "Participated…" summary, and a "Support" role chip.

**Fixes applied:**
- apex/nova: `EMBEDDED_DATA` fully regenerated from current `resume-content.json`
  (apex 7 key groups, nova 8), round-trip verified deep-equal
- Narrative (×3): GCC sentence moved to the hedged "Helped shape…with program
  ownership and final design authority remaining with the sponsoring leadership";
  product names genericized per F4
- GCC fallback card (×3): title → "Global Capability Center - Engineering Capability
  Build", badge → "Shaping", summary → hedged version, role chip "Support" → "Shaping".
  The rest of the curated 12-card fallback grid left as-is (matches the frameworks-grid
  precedent: abridged fallbacks, not verbatim copies)

**Verified after fix:** old GCC wording gone from all public artifacts · product-name
scan clean · 26/26 tests · all 9 embedded blobs deep-equal (5 portfolio-data +
4 EMBEDDED_DATA) · apex + nova render-checked in browser (hedged GCC and generic terms
present, no internal product names, no render errors).

**Lesson (recorded in the state file):** any mirror gate must enumerate *all* embedded
copies — the sync script should walk every `const EMBEDDED_DATA` and `portfolio-data`
blob, not just the known list.

### F3 — QA scanners not persisted (carried, minor)

`slop-scan.mjs` and `dup-scan.mjs` live in the session scratchpad per the state file
and will not survive a machine change. Recommend promoting to `scripts/` if they are
to be reused (owner decision; not required by Plan B).

## 4. Work completed during this validation pass

### F1 fix (above)

### Wave 4.5 — three framework cards (separate evidence lineage)

1. **Ledger first:** 3 new records added (75 → 78), all `directional` with
   evidence-boundary restrictions matching their `frameworks_and_principles` source
   docs: `framework-engineering-operating-model`, `framework-staff-engineer-tsal-model`,
   `framework-well-architected-nine-pillars` (the last carries a `conflicts[]` entry
   keeping it distinct from the published Architecture Hub five-pillar assessment).
2. **Cards:** `resume-content.json` `leadershipFrameworks` 17 → 20 — Engineering
   Operating Model, Staff Engineer / TSAL Model, Nine-Pillar Well-Architected
   Framework — inserted before Leadership Operating Principles. Each carries an
   explicit status caveat in `origin` ("designed and directed … not confirmed"),
   matching the source evidence boundaries.
3. **Fallbacks:** abridged versions added to the frameworks-grid in herald, cipher,
   and ember (3 cards each, variant-appropriate markup). apex/nova need none (no
   frameworks grid).
4. **Gate re-run:** `npm test` 26/26 · ledger valid 78 · JSON OK · all mirrors in sync.

### Wave 5 write steps

- This report.
- `PLAN-C-EXECUTION-STATE.md` updated (wave statuses, gate log, handoff notes).
- `DAILIES.md` entry appended.

## 5. Acceptance criteria (Plan B §VIII, amended per Plan C D-2/D-3)

| Criterion | Status |
|---|---|
| Every Sep 3 value layer published or recorded with a restriction | ✅ 10 records cover all clusters; departure signal recorded + restricted (and now genuinely unpublished) |
| No constructed doctrine presented as a named framework | ✅ |
| No measured outcome attributed to the Sep 3 corpus | ✅ |
| GCC hedge wording everywhere | ✅ |
| Embedded fallbacks match JSON sources | ✅ (7 pages) |
| `npm test` green; anonymization scan clean; links resolve | ✅ |
| ADVR reachable from every portfolio variant | ✅ (card, all five variants) |
| Resume summary / portfolio bio / index one coherent voice, no restatement | ✅ reviewed — layers distributed, no paragraph-level duplication |
| *(amended)* Standalone AI-adoption and consultative-transition case studies cut per D-2/D-3; AI ambition test in `aiPractitioner`, consultative transition folded into Owning the Whole System | ✅ |

## 6. Remaining items

| Item | Status |
|---|---|
| Wave 6 enrichment of 6 existing case studies (D-5, optional) | **Deferred — owner decision.** Diff is already large; recommend shipping current state first |
| ~~F2 OnePACS codename~~ | **Resolved 2026-09-04** — anonymized to the acquired-team pattern (see §3 F2) |
| ~~F4 internal product names~~ | **Resolved 2026-09-04** — genericized site-wide (see §3 F4) |
| ~~F5 stale mirrors (apex/nova EMBEDDED_DATA, narrative, initiatives fallback)~~ | **Resolved 2026-09-04** — resynced/rewritten and re-validated (see §3 F5) |
| F3 scanner persistence | Owner decision |
| Mirror-gate script (walk every embedded blob, not a hand-kept list) | Recommended follow-up; prevents F5 recurrence |
| Commit | Held per INV-8 until owner asks |

## 7. Sign-off

Waves 1–4.5 and Wave 5 are complete and validated. Genuine invariant violations found
and fixed by this independent pass: **F1** (restricted departure doctrine in framework
cards), **F5** (stale apex/nova EMBEDDED_DATA + narrative/fallback GCC wording the
W3-G gate missed). Owner rulings applied and re-validated: **F2** (OnePACS →
acquired-team pattern) and **F4** (product names → generic terms).
The working tree is deployment-ready per Plan C's deploy-block rules (all card targets
exist, all 9 embedded blobs deep-equal, all scans clean, 26/26 tests green), subject
to the remaining owner decisions in §6 (F3 scanner persistence, mirror-gate script,
optional Wave 6). Nothing committed.
