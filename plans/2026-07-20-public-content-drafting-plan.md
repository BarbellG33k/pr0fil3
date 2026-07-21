# Public Content Drafting Implementation Plan

> **Depends on:** `plans/2026-07-18-evidence-foundation-implementation-plan.md` (all six tasks complete as of 2026-07-20). This plan consumes `.private/evidence-ledger.json`, `.private/executive-proof-pack.md`, `.private/builder-proof-pack.md`, and `.private/market-message-maps.md` as its sole source of approved facts and wording. It does not re-derive evidence.

**Goal:** Produce and ship public-facing executive and builder content (resume, profile, portfolio, case studies) that uses only `public-safe` ledger wording, respects every `restricted`/`blocked` boundary, and stays synchronized across every rendering surface (JSON content model, portfolio pages, PDF export).

**Architecture:** `resume-content.json` remains the single presentation-model source of truth for rendered surfaces (portfolio site, PDF export). This plan does not change that architecture — it adds a validation layer that checks rendered public content against the private ledger's `public-safe` records and banned-phrase list, so the presentation model can never silently drift from approved evidence.

**Tech Stack:** JSON, Markdown, Node.js built-ins, `node:test`, npm scripts (consistent with the evidence-foundation plan).

## Global Constraints

- Only `publication.status: "public-safe"` ledger records may supply factual claims or figures in public content. `restricted` and `blocked` records are interview-only and must never appear in `resume-content.json`, portfolio pages, or PDFs.
- Never publish exact AI-product adoption figures or specific product names — use ranges and domain/value/technology framing only, per owner preference recorded in the ledger (`ai-scribe-adoption`, `care-agent-adoption`, `insurance-matching-adoption`, `rcm-adoption` resolution notes).
- Never publish the internal 60/10/30 AI-product attribution split.
- Never present the RCM 1,500+ target as current adoption.
- Never publish exact Experity org headcount figures (e.g., 93/41/14), even after the Bangalore count and as-of date are resolved — owner preference is a qualitative fallback only.
- Never publish specific dollar figures for the PE-backed financial scope (no $4.8M/$23M or similar).
- Never use "P&L ownership" language until P&L authority is separately verified (it is not, as of this plan).
- Never state Factor317 title, private product stacks, or an employer-policy-safety claim — `factor317-direct-builder-role` remains restricted; owner explicitly deferred this in the evidence-foundation plan.
- Do not modify `resume-content.json`, portfolio pages, case studies, or PDFs as part of *planning* this work (this file only). Implementation happens in a later, separate execution pass against this plan.

## File map

**Tracked (to be created/modified during execution of this plan, not during its authoring):**

- Modify `resume-content.json`: apply approved wording for newly-resolved claims (promotions, product-development scope, financial operating authority, leadership-development track) and confirm no blocked/restricted content is present.
- Modify portfolio case-study pages: align claims with proof-pack wording; add Factor317 product mentions using only public-safe wording.
- Create `scripts/validate-public-content.mjs`: cross-checks rendered public content against `.private/evidence-ledger.json` `public-safe` records and a banned-phrase list; fails the build if a banned phrase or an unapproved figure appears.
- Create `scripts/validate-public-content.test.mjs`: tests for the validator.
- Modify `package.json`: add `test:public-content` / `validate:public-content` scripts.

**Private and ignored (read-only inputs to this plan; not modified by it):**

- `.private/evidence-ledger.json`
- `.private/executive-proof-pack.md`
- `.private/builder-proof-pack.md`
- `.private/market-message-maps.md`

---

## Task 1: Draft the executive manuscript

Use `market-message-maps.md`'s executive map (5 claims + bridge) as the outline. For each claim, pull the exact `approvedWording` from the linked `public-safe` ledger record(s); for `restricted` claims currently in the map (GCC readiness, AI products, directional outcomes), draft placeholder/interview-only language and mark it clearly as not-yet-public in the manuscript draft, pending the approvals listed in each claim's "required proof before public use."

Verify: every sentence in the draft traces to one `public-safe` ledger ID, or is explicitly marked as pending approval.

## Task 2: Draft the builder manuscript

Same process against the builder map. BaseSignal, Momentum, Wisdom Loop, and Subscription Scope descriptions must use only the `public-safe` public-source records; do not add stack, revenue, or user-count language. Pocket Ranger, if mentioned, must be described as pipeline/concept, never shipped.

Verify: no product is described with information beyond its ledger record's public-source facts.

## Task 3: Build portfolio proof routes

For each of the five executive and five builder claims, define the specific portfolio artifact (case study, diagram, live product link) that substantiates it publicly. Use the "required portfolio proof" lists already recorded in `market-message-maps.md` as the starting checklist. A claim with no available portfolio proof stays in interview-only form and is not surfaced as a headline claim on the public site.

## Task 4: Revise case studies safely

Audit existing case studies (`sources/LeadershipCaseStudy_Architecture.md`, `sources/LeadershipOnePacsCaseStudy.md`, and any portfolio case-study pages) against the ledger. Remove or soften any statement that conflicts with a `blocked` or `restricted` record (e.g., unresolved chronology, exact org headcount, exact AI-adoption figures, P&L language). Do not delete substantiated historical content — reframe it to match verified wording.

## Task 5: Synchronize rendering and fallback logic

`resume-content.json` feeds multiple render targets (portfolio pages, PDF export). Any claim gated as `restricted` or with a qualitative fallback (e.g., organization scope) must render the fallback wording consistently across every surface — no surface may show a more specific version than another. Add a single source field per gated claim so PDF and portfolio rendering pull from the same fallback string rather than duplicating it.

## Task 6: Build content-consistency validation

Create `scripts/validate-public-content.mjs`: given `resume-content.json` (and portfolio page content, if externally readable), scan for:
- A banned-phrase list (seeded from Global Constraints above: "P&L ownership" unless separately flagged verified, exact dollar figures matching the financial scope pattern, exact org-headcount numbers, exact AI-adoption figures, "1,500+ clinics" used without "target").
- Any `restricted`/`blocked` ledger record's distinguishing text appearing verbatim in public content.

Write `scripts/validate-public-content.test.mjs` first (red), implement the validator (green), wire `test:public-content` and `validate:public-content` into `package.json`, matching the TDD and npm-script conventions established in the evidence-foundation plan.

## Completion criteria

- Executive and builder manuscripts exist and every claim traces to a `public-safe` ledger record or is explicitly marked pending approval.
- No portfolio, case-study, or PDF surface contains banned phrases, exact restricted figures, or content from a `blocked` record.
- All rendering surfaces show identical fallback wording for any gated claim.
- `validate-public-content` passes in CI before any public deploy.
- This plan's execution never modifies `.private/` and never treats a `restricted` record's content as public-safe without a corresponding ledger update in a future evidence-foundation revision.
