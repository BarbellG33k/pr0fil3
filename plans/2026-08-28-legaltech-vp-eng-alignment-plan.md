# Legaltech VP Engineering Alignment + Transcript Enshrinement — 2026-08-28

Source: Aug 28, 2026 recruiter interview transcript (boutique exec search, confidential
growth-equity legaltech client). Owner decisions captured inline.

## Target profile (as heard from the recruiter)

- VP Engineering; most senior engineering person; reports to CEO; board-backed hire.
- Growth-equity legaltech (personal injury / trial law, SMB practices); ~$70M ARR;
  Rule of 50; little/no tech debt; top-line growth mandate, not cost-cutting.
- Mandate: institute an AI software development life cycle (ship faster), bake AI into
  the product UX (agentic workflows).
- 2–3 year exit to another PE firm; this person sets vision, starts execution, and is
  the technical point person for suitors during diligence.
- Current org: scrappy, multiple hats, product-area managers report to CEO.

## Owner decisions (2026-08-28)

1. Resume headline: `EVP SOFTWARE ENGINEERING / CTO` -> `VP, SOFTWARE ENGINEERING / CTO`.
2. Enshrine all six transcript frameworks/initiatives (below).
3. Org wording: update to post-reorg reality — direct org 70–100 across 7 teams
   (SWE, QE, DevOps, platform), 6 direct reports, product matrixed. Ledger updated.
4. Experity financials (~$200M ARR, $1.6B valuation, 50%+ share): interview-only —
   ledger records marked restricted; public artifacts keep market-leader wording.
5. New case-study cards appear on all five portfolio variants.

## Enshrinement list (transcript -> named artifacts)

| Slug | Name | Transcript anchor |
|---|---|---|
| value-delivery-engineering | Value Delivery Engineering | ticket takers -> value-delivery engineers; partner with product on the why; right grain; skin in the game |
| agent-multiplied-delivery | Agent-Multiplied Delivery Model | IC impact multiplied across multiple agents; automated LLM PR review w/ guardrails; human-review fallback; knowledge-transfer clinics; refinement loop |
| ai-unit-economics | AI Unit Economics & Cost Governance | model selection, token cost, fine-tuning, benchmarks, unit-of-work cost, self-host evaluation, obsolescence risk |
| security-rails-ai-security-posture | Security Rails & AI Security Posture | early security partnership; guardrails + measured outputs; AI exposes invisible weaknesses -> net lower-risk posture |
| platform-initiative | Platform Initiative | reusable components, patterns, services, cross-cutting layering, knowledge/docs/standards; mercenary -> intentional architecture; nearshore contributions |
| definition-pipeline | Definition Pipeline (BMAD lineage) | BMAD as early reference -> own pipeline: idea -> refinement -> PRD -> TRD -> plan -> tasks |

Each gets: `leadershipFrameworks` entry + `strategicInitiatives` entry + case-study
page (base + `-cipher` + `-ember`) + portfolio card on all five variants.
Smaller transcript items enrich existing entries (India RCM walk-the-wall on the M&A
initiative; legacy rationalization/growth refocus in Experity bullets).

## Artifact changes

- `resume-content.json`: meta.title, summary, Experity bullets (org structure, growth
  narrative, AI SDLC vocabulary, exit readiness), Chronicled contract-management bullet,
  Markel claims-lifecycle sharpening, skills additions, aiPractitioner additions,
  +6 strategicInitiatives, +5 leadershipFrameworks (incl. BMAD rewrite and Security
  Design caseStudyUrl).
- 18 new case-study HTML files (6 studies x base/cipher/ember).
- `portfolio-content.json`: +6 caseStudyCards (all variants); embedded `portfolio-data`
  mirrored into herald/cipher/ember/apex/nova HTML.
- Executive portfolio fallbacks x3: frameworks-grid, initiatives-grid, timeline copy.
- `resume.html` / `resume-alt.html`: EMBEDDED_DATA mirror.
- `.private/evidence-ledger.json`: new records for transcript-sourced claims;
  restricted records for ARR/valuation/share; bump `experity-current-organization`;
  conflict note on `experity-promotion-count` (transcript said ~Mar 2025 VP promotion;
  owner-confirmed Oct 2025 stands).

## Verification

`npm run validate:evidence`, `npm run test:evidence`, `npm run test:resume-export`,
plus local render check of portfolios and case studies.
