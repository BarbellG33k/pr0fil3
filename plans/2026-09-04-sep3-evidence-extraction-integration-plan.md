# Integrate Sep-3 Evidence Extraction into Resume/Portfolio

## Context

A new evidence corpus landed in `./sources/evidence-extraction-salas-2026-09-03/`
(extracted 2026-09-03 from 50 third-person AI-generated summaries of Guillermo's
1:1s and leadership-team meetings, Jan–Sep 2026, anonymized for publication).
Guillermo has reviewed it and confirmed it as an accurate, authoritative record
of his own communicated thinking and direction — so, unlike the raw extraction's
own hedged labels, these claims are being treated as **Verified** in the
evidence ledger, not `Recollection`/`Directional`.

The goal: mine this corpus (plus its raw sources in
`sources/leadership-notes-and-summaries/`) for material that strengthens the
resume Profile, the Experity experience section, and the Executive Portfolio's
case studies and frameworks — while explicitly avoiding restating ground the
site already covers. Three parallel research passes (site content map,
governance/draft-manuscript survey, existing frameworks/Experity source
catalog) produced a duplication cross-check; four decisions with Guillermo
resolved the remaining forks:

1. **Confidence tier:** new evidence is Verified (owner-confirmed), not
   pending confirmation.
2. **GCC/offshore claim scope:** keep the existing ledger restriction
   ("contributed to GCC readiness/integration, not owned strategy") as-is;
   the new offshore-office material is stronger than what's currently
   publishable, so it's recorded for the private ledger and interview prep
   only — **not** used in any public copy this round.
3. **"Departure as Design Signal":** fold as reinforcing detail into existing
   Engineering Maturity & Accountability Manifest / TSAL content — no new
   named framework (evidence is thin: 2 meetings, 1 counterpart).
4. **New case studies:** build full HTML case-study pages (matching the
   existing ~14-file herald/cipher/ember pattern) for the two genuinely new,
   well-evidenced items — **DevOps Center of Excellence** and the
   **Hiring-Alignment Intervention**.

## Duplication/treatment matrix

| New corpus item | Existing coverage | Treatment |
|---|---|---|
| **DevOps Center of Excellence** (case study) | None — closest precedent is a different, tactical Jenkins/CI delegation narrative | **New**: full case-study page + strategicInitiatives entry + resume bullet |
| **Hiring-Alignment Intervention** (case study) | Thin — one preference statement, one JD-calibration anecdote | **New**: full case-study page + strategicInitiatives entry + resume bullet |
| **No-Heroes Standard** (framework) | Heavy — Engineering Maturity & Accountability Manifest, OnePACS hero-dependency case, "Owning the Whole System" case study | **Reinforce**: give the currently page-less Manifest framework its first case-study page, drawing on *both* old (OnePACS, Kafka/SMS) and new (DevOps CoE, offshore hiring-bar discipline, consultative transition) evidence as one cross-organizational proof set |
| **Show Me Your Work** (framework) | Near-verbatim already in Leadership Operating Principles source; adjacent to Value Delivery Engineering / Definition Pipeline | **Reinforce, no new page**: fold the six-question gate, symmetry (applied to his own initiatives), and anti-speculation detail into the Say-Do Operating System framework description |
| **Perception Becomes Reality** (framework) | Adjacent existing "communication must be repeated" material | **Reinforce, no new page**: minor supporting language only, if any — low priority |
| **Departure as Design Signal** (framework) | OnePACS/Damien departure case, TSAL model already treat departure as an action trigger | **Fold in** (per decision #3) — generalize as a sentence inside Manifest/TSAL narrative, not a named framework |
| **Consultative Role Transition** (case study) | TSAL "advisor vs. shadow manager" pattern (Damien/OnePACS) | **Fold in**: second corroborating instance (Principal Engineer/Scott) added to the existing "Owning the Whole System" case study — reduces single-anecdote risk, no new page |
| **Offshore office as capability build** (case study) | GCC Global Engineering Strategy framework already covers this ground centrally; ledger restricts public ownership claims | **Private only** (per decision #2) — ledger record for interview prep; no public copy |
| **AI Adoption as Operational Capability** (case study) | Heavily covered already (ADVR, AI-Era Leadership Platform, Agent-Multiplied Delivery, AI Unit Economics) with better primary evidence | **Skip** — at most a one-phrase reinforcement ("ambition test") in `aiPractitioner`, optional/low priority |
| Single-occurrence items (informal 360s, internal-tool praise, vendor rationalization, comp advocacy) | — | **Ledger only** — corroboration/interview backup, not resume/portfolio material |

## Execution sequence

Follows the site's existing evidence pipeline (per
`plans/2026-07-21-leadership-identity-resume-portfolio-plan.md`): ledger →
reconciliation → draft manuscript → shared content model (JSON) → public HTML
→ credibility review.

### 1. Evidence ledger (`.private/evidence-ledger.json`)
Add new records (schema: `id`, `domain`, `subject`, `claim`, `organization`,
`period`, `scope`, `role`, `attribution`, `collaborators`, `result`,
`measurement`, `confidence`, `publication{status, restrictions, approvedWording,
eligibleArtifacts}`, `sources`, `conflicts`, `lastValidated`) for:
- DevOps Center of Excellence (confidence: Verified; attribution: **Established**)
- Hiring-Alignment Intervention (confidence: Verified; attribution: **Led**/**Established** — diagnosed and directed the fix)
- No-Heroes Standard reinforcement (linked to existing Manifest record; adds the cross-organizational corroboration — DevOps CoE, offshore hiring-bar discipline, consultative transition — as new sourcing)
- Show Me Your Work reinforcement (linked to existing Value Delivery Engineering/Definition Pipeline records; adds the six-question gate detail)
- Consultative Role Transition (second TSAL instance; linked as new sourcing on the existing Staff Engineer/TSAL record)
- Offshore-office arc — record with `publication.status: restricted`, matching the existing GCC record's restriction language; sources cited for interview use only

Cite sources using the anonymized reference codes (`1:1-A/2026-06-16`, etc.)
from `sources/evidence-extraction-salas-2026-09-03/`, never the real names in
`INTERNAL-provenance.md`.

### 2. Draft manuscript (`.private/drafts/`)
- `executive-profile.md`: extend the "People and Leadership Systems"
  competency-architecture section and the Experity experience-narrative
  paragraph with DevOps CoE and hiring-alignment evidence; fold in the
  departure-as-design-signal generalization sentence.
- `case-studies.md`: add outline entries for the two new case studies
  (source citations, confidence, attribution verb) before HTML drafting.
- `portfolio-positioning.md`: note the two new case-study cards and the new
  Manifest case-study card in the four-path proof architecture.

### 3. Shared content model
- `resume-content.json`:
  - `experience[0]` (Experity) — add one bullet each for DevOps CoE (under
    "Organizational Scale & Team Operations") and hiring-alignment (under
    "Organizational Leadership & Strategic Operations"), using the exact
    "safe form" bullets already drafted in the source case-study files as a
    starting point.
  - `strategicInitiatives` — add two new entries (DevOps Center of
    Excellence; Hiring Chain Alignment) following the existing schema
    (name/category/status/summary/narrative/role/roleDescription/frameworks/keyDetails).
  - `leadershipFrameworks` — add `caseStudyUrl` to the "Engineering Maturity
    & Accountability Manifest" entry once its case study exists; optionally
    enrich "Say-Do Operating System" `description`/`origin` with the
    six-question-gate detail.
  - `summary` / `builderResume.summary` / `aiPractitioner.intro` — **no
    changes planned.** Per prior guidance, Profile/Summary must stay at the
    competency level and omit org-specific specifics; the new evidence
    corroborates claims already stated there, it doesn't add a new
    competency. (AI-adoption "ambition test" phrase — optional, skip unless
    requested.)
- `portfolio-content.json` — add three `caseStudyCards` entries (DevOps CoE,
  Hiring-Alignment Intervention, Engineering Maturity & Accountability
  Manifest), each with `category`/`title`/`tagline`/`url`/`variants`
  matching the existing entries' shape.

### 4. New public HTML files
Six new case-study files, built from an existing file (e.g.
`case-study-owning-the-whole-system.html`) as the structural template for
each theme variant:
- `case-study-devops-center-of-excellence.html` (+ `-cipher`, `-ember`)
- `case-study-hiring-alignment-intervention.html` (+ `-cipher`, `-ember`)
- `case-study-engineering-maturity-manifest.html` (+ `-cipher`, `-ember`) —
  new page for the currently page-less Manifest framework, combining prior
  OnePACS/Kafka evidence with the new cross-organizational corroboration
  (No-Heroes Standard pattern) and cross-linking to the two new case studies
  as supporting instances.

Preserve each existing file's structure/nav/theming exactly; only title,
tagline, narrative sections, and framework cross-links change.

### 5. Verification
- Confirm whether the portfolio pages' case-study grid renders dynamically
  from `portfolio-content.json` (as the frameworks grid does from
  `resume-content.json`) or needs a matching static HTML block updated too
  — check `executive_portfolio_herald.html`'s render function before editing.
- Validate `resume-content.json` and `portfolio-content.json` as JSON after
  edits.
- Open `resume.html`, `resume-alt.html`, and one portfolio variant locally to
  confirm the two new strategicInitiatives entries, the new Experity bullets,
  and the three new case-study cards render correctly and link to the new
  pages.
- Confirm all six new case-study HTML files open correctly in
  herald/cipher/ember theming and that internal cross-links (Manifest ↔
  DevOps CoE ↔ Hiring-Alignment ↔ Owning the Whole System) resolve.
- Re-run the governing plan's Phase 7 credibility checklist against every
  new/changed claim: source known, attribution verb precise, scope clear,
  achieved/directional/planned correctly labeled, interview-defensible,
  public-safe, no contradiction with another artifact (in particular: the
  GCC restriction must not be contradicted anywhere in the new copy).
