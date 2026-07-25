# Professional Evidence Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a private, validated evidence foundation that reconciles Guillermo Salas’s professional record and produces approved claim maps for separate executive and builder narratives without changing public resume or profile content.

**Architecture:** Store sensitive claim-level facts in a git-ignored `.private/` workspace, separate from public `resume-content.json`. A dependency-free Node validator enforces record shape, confidence, attribution, publication state, and unresolved-conflict rules. Private executive/builder proof packs and message maps become the inputs to a later public-content drafting plan.

**Tech Stack:** JSON, Markdown, Node.js built-ins, `node:test`, npm scripts.

## Global Constraints

- Do not modify any resume, executive profile, portfolio, case study, PDF, or source-content artifact in this slice.
- Preserve substantiated and conflicting historical evidence in the ledger; never erase conflicts.
- Keep `.private/` ignored because it may contain confidential employer, customer, budget, and corroboration details.
- Keep `resume-content.json` as a presentation model, not the evidence ledger.
- Use one chronology and factual record for both target narratives.
- Keep all five engineering outcome metrics `directional`, never `verified`.
- Never publish the internal 60/10/30 AI-product attribution split.
- Treat unresolved claims as ineligible for public wording.
- Never present the RCM 1,500+ target as current adoption.
- Never use “P&L ownership” until P&L authority is verified.
- Never stage or force-add `.private/` files.

## File map

**Tracked:**

- Modify `.gitignore`: protect private evidence.
- Modify `package.json`: add evidence test and validation scripts.
- Create `scripts/validate-evidence-ledger.mjs`: validate ledger invariants.
- Create `scripts/validate-evidence-ledger.test.mjs`: test validator behavior.

**Private and ignored:**

- Create `.private/evidence-ledger.json`: canonical claim records and conflicts.
- Create `.private/executive-proof-pack.md`: executive evidence and blocked claims.
- Create `.private/builder-proof-pack.md`: current product-building evidence.
- Create `.private/market-message-maps.md`: executive and builder claim maps.

---

### Task 1: Protect and validate the private evidence workspace

**Files:**
- Modify: `.gitignore`
- Modify: `package.json`
- Create: `scripts/validate-evidence-ledger.mjs`
- Create: `scripts/validate-evidence-ledger.test.mjs`

**Interfaces:**
- Consumes: `{ schemaVersion, subject, updatedAt, records }` JSON.
- Produces: `validateLedger(ledger): string[]`; CLI exits 0 when valid and 1 when invalid.

- [x] **Step 1: Write the failing validator tests**

Create `scripts/validate-evidence-ledger.test.mjs`:

```js
import assert from "node:assert/strict";
import test from "node:test";
import { validateLedger } from "./validate-evidence-ledger.mjs";

const record = {
  id: "experity-current-title",
  domain: "employment",
  subject: "Experity current title",
  claim: "VP, Software Engineering and Product Development",
  organization: "Experity",
  period: { start: "2023-03", end: null, asOf: "2026-07-18" },
  scope: { value: null, denominator: null, geography: [] },
  role: "Official current title",
  attribution: "held",
  collaborators: [],
  result: null,
  measurement: null,
  confidence: "verified",
  publication: {
    status: "public-safe",
    restrictions: [],
    approvedWording: "VP, Software Engineering and Product Development",
    eligibleArtifacts: ["executive-resume", "builder-resume", "portfolio"]
  },
  sources: [{ type: "owner-confirmation", reference: "Amp thread, 2026-07-18" }],
  conflicts: [],
  lastValidated: "2026-07-18"
};

const ledger = { schemaVersion: 1, subject: "Guillermo Salas", updatedAt: "2026-07-18", records: [record] };

test("accepts a complete ledger", () => assert.deepEqual(validateLedger(ledger), []));

test("rejects duplicate IDs", () => {
  assert.match(validateLedger({ ...ledger, records: [record, record] }).join("\n"), /duplicate id/);
});

test("blocks public wording for unresolved claims", () => {
  const unresolved = {
    ...record,
    id: "unresolved-title",
    confidence: "unresolved",
    publication: { ...record.publication, status: "blocked", approvedWording: "Disputed title" }
  };
  assert.match(validateLedger({ ...ledger, records: [unresolved] }).join("\n"), /unresolved.*approvedWording/);
});

test("requires corroboration for verified claims", () => {
  const unsupported = {
    ...record,
    id: "unsupported-claim",
    sources: [{ type: "owner-recollection", reference: "Memory only" }]
  };
  assert.match(validateLedger({ ...ledger, records: [unsupported] }).join("\n"), /verified.*corroborating source/);
});

test("rejects RCM target as current adoption", () => {
  const rcm = {
    ...record,
    id: "rcm-adoption",
    domain: "product-adoption",
    result: { value: 1500, unit: "clinics", kind: "current" }
  };
  assert.match(validateLedger({ ...ledger, records: [rcm] }).join("\n"), /target/);
});
```

- [x] **Step 2: Run the tests and verify the missing-module failure**

Run: `node --test scripts/validate-evidence-ledger.test.mjs`

Expected: FAIL with `ERR_MODULE_NOT_FOUND` for `validate-evidence-ledger.mjs`.

- [x] **Step 3: Implement the validator**

Create `scripts/validate-evidence-ledger.mjs`:

```js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const CONFIDENCE = new Set(["verified", "directional", "recollection", "unresolved"]);
const STATUS = new Set(["public-safe", "restricted", "private", "blocked"]);
const ARTIFACTS = new Set([
  "executive-resume", "builder-resume", "executive-profile", "builder-profile",
  "portfolio", "case-study", "interview-only"
]);
const CORROBORATING = new Set([
  "official-record", "public-source", "internal-document", "dashboard",
  "owner-confirmation", "stakeholder-confirmation"
]);

const object = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

export function validateLedger(ledger) {
  const errors = [];
  if (!object(ledger)) return ["ledger must be an object"];
  if (ledger.schemaVersion !== 1) errors.push("schemaVersion must equal 1");
  if (ledger.subject !== "Guillermo Salas") errors.push("subject must equal Guillermo Salas");
  if (typeof ledger.updatedAt !== "string") errors.push("updatedAt must be a string");
  if (!Array.isArray(ledger.records)) return [...errors, "records must be an array"];

  const ids = new Set();
  ledger.records.forEach((record, index) => {
    const label = record?.id || `records[${index}]`;
    if (!object(record)) return errors.push(`${label}: must be an object`);
    if (!record.id) errors.push(`${label}: id is required`);
    if (ids.has(record.id)) errors.push(`${label}: duplicate id`);
    ids.add(record.id);
    for (const field of ["domain", "subject", "claim", "role", "attribution", "lastValidated"]) {
      if (typeof record[field] !== "string" || !record[field]) errors.push(`${label}: ${field} is required`);
    }
    if (!CONFIDENCE.has(record.confidence)) errors.push(`${label}: invalid confidence`);
    if (!object(record.period)) errors.push(`${label}: period must be an object`);
    if (!object(record.scope)) errors.push(`${label}: scope must be an object`);
    if (!Array.isArray(record.collaborators)) errors.push(`${label}: collaborators must be an array`);
    if (!Array.isArray(record.sources) || !record.sources.length) errors.push(`${label}: source is required`);
    if (!Array.isArray(record.conflicts)) errors.push(`${label}: conflicts must be an array`);
    if (!object(record.publication)) {
      errors.push(`${label}: publication must be an object`);
    } else {
      if (!STATUS.has(record.publication.status)) errors.push(`${label}: invalid publication status`);
      if (!Array.isArray(record.publication.restrictions)) errors.push(`${label}: restrictions must be an array`);
      if (!Array.isArray(record.publication.eligibleArtifacts)) errors.push(`${label}: eligibleArtifacts must be an array`);
      else for (const item of record.publication.eligibleArtifacts) {
        if (!ARTIFACTS.has(item)) errors.push(`${label}: invalid artifact ${item}`);
      }
      if (record.confidence === "unresolved" && record.publication.approvedWording) {
        errors.push(`${label}: unresolved claims cannot have approvedWording`);
      }
    }
    if (record.confidence === "verified" && !record.sources?.some((source) => CORROBORATING.has(source.type))) {
      errors.push(`${label}: verified claims require a corroborating source`);
    }
    if (record.id === "rcm-adoption" && record.result?.kind === "current" && record.result?.value >= 1500) {
      errors.push("rcm-adoption: 1,500+ is a target, not current adoption");
    }
  });
  return errors;
}

function cli() {
  const ledgerPath = process.argv[2];
  if (!ledgerPath) throw new Error("Usage: node scripts/validate-evidence-ledger.mjs <ledger.json>");
  const ledger = JSON.parse(fs.readFileSync(path.resolve(ledgerPath), "utf8"));
  const errors = validateLedger(ledger);
  if (errors.length) {
    console.error(errors.map((error) => `- ${error}`).join("\n"));
    process.exitCode = 1;
  } else console.log(`Evidence ledger valid: ${ledger.records.length} records`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) cli();
```

- [x] **Step 4: Run tests**

Run: `node --test scripts/validate-evidence-ledger.test.mjs`

Expected: 5 tests pass, 0 fail.

- [x] **Step 5: Protect `.private/`**

Append to `.gitignore`:

```gitignore

# Private professional evidence and drafting inputs
.private/
```

- [x] **Step 6: Add npm commands**

Add to `package.json` scripts:

```json
"test:evidence": "node --test scripts/validate-evidence-ledger.test.mjs",
"validate:evidence": "node scripts/validate-evidence-ledger.mjs .private/evidence-ledger.json"
```

- [x] **Step 7: Verify tests and ignore behavior**

Run:

```bash
npm run test:evidence
mkdir -p .private
touch .private/.ignore-check
git check-ignore .private/.ignore-check
rm .private/.ignore-check
```

Expected: tests pass and `git check-ignore` prints `.private/.ignore-check`.

- [x] **Step 8: Commit tracked files only**

```bash
git add .gitignore package.json scripts/validate-evidence-ledger.mjs scripts/validate-evidence-ledger.test.mjs
git status --short
git commit -m "chore: add private evidence ledger validation"
```

Before committing, verify no `.private/` or pre-existing `sources/` file is staged.

---

### Task 2: Seed the canonical evidence ledger

**Files:**
- Create: `.private/evidence-ledger.json`

**Interfaces:**
- Consumes: Task 1’s record contract and the approved analysis.
- Produces: Stable claim IDs used by both proof packs and message maps.

- [x] **Step 1: Create metadata and the verified current-title record**

Create `.private/evidence-ledger.json` with metadata and an `experity-current-title` record containing:

- Claim: `VP, Software Engineering and Product Development`.
- Confidence: `verified`.
- Source: owner confirmation in this Amp thread dated 2026-07-18.
- Conflict: `Vice President, Software Engineering` from `resume-content.json`, marked superseded.
- Public wording: the exact official title.

- [x] **Step 2: Add unresolved chronology records**

Add these records with `confidence: "unresolved"`, `publication.status: "blocked"`, and `approvedWording: null`:

- `experity-promotion-count`
- `chronicled-title-dates`
- `safenet-title-dates`
- `healthequity-relationship`
- `hsa-title-progression`
- `education-degree`
- `aws-certification-status`

Each record must retain every conflicting value, source filename, and an exact reconciliation question.

- [x] **Step 3: Add current organization and GCC records**

Add `experity-current-organization` with approximately 93 total, six directs, 41 FTE under those leaders, 14 LATAM nearshore, and remainder in Bangalore. Keep it blocked until the six-versus-41 arithmetic, exact Bangalore count, and as-of date are resolved. Retain historical 27, approximately 41, 52 FTE + 20+, 57+, and 70+ figures as conflicts.

Add `experity-gcc-engineering-readiness` stating that Guillermo owns engineering integration/readiness but not the corporate GCC program. Record team topology, work allocation, onboarding, standards, governance, and operating integration as the confirmed responsibility categories; keep publication `restricted` pending employer-safe wording.

- [x] **Step 4: Add five separate directional outcome records**

Create:

- `ai-lead-time-directional`: approximately 25% reduction.
- `ai-mttr-directional`: approximately 40% improvement.
- `ai-defect-rework-directional`: approximately 30% reduction.
- `ai-code-output-directional`: approximately 3x throughput indicator.
- `engineering-efficiency-directional`: approximately 35% improvement.

Set all to `directional` and `restricted`. Record baseline period, comparison period, population, method, and public-use permission as unanswered. Keep approved wording null. Never label code output as productivity.

- [x] **Step 5: Add AI product records**

Create:

- `ai-scribe-adoption`: 150+ clinics.
- `care-agent-adoption`: 2,000+ clinics.
- `insurance-matching-adoption`: 1,000+ clinics.
- `rcm-adoption`: current value null, target 1,500+ clinics, adoption growing.

Set confidence to `recollection` and publication to `restricted` pending adoption definition, as-of date, overlap, source, and customer outcome. Record the internal 60/10/30 attribution only in private measurement metadata; public attribution must use engineering leadership, governance contribution, and direct architecture contribution.

- [x] **Step 6: Add current-builder, identity, and historical technical records**

Add:

- `factor317-direct-builder-role`
- `spanish-native-language`
- `software-engineer-core-identity`
- `twenty-plus-years-experience`
- `principal-architect-lead-developer`
- `hands-on-architecture-coding-three-teams`
- `docker-kubernetes-implementation`
- `azure-sql-etl`
- `information-data-architecture`
- `inter-system-security-design`
- `monolith-microservices-strategy`
- `aws-web-mobile-prototypes`
- `hsa-support-rework-43-percent`
- `hsa-leadership-scope-37`

Use historical PDFs as documentary sources without allowing them to resolve conflicting official titles or dates. Keep Factor317 public wording restricted until public title and employer-policy safety are confirmed.

- [x] **Step 7: Validate and verify privacy**

Run:

```bash
npm run validate:evidence
node -e 'const l=require("./.private/evidence-ledger.json"); console.log(l.records.length, new Set(l.records.map(r=>r.id)).size)'
git check-ignore .private/evidence-ledger.json
git status --short
```

Expected: validation succeeds; record and unique-ID counts match; ledger is ignored and absent from status.

Do not commit this private deliverable.

---

### Task 3: Build the executive proof pack

**Files:**
- Create: `.private/executive-proof-pack.md`

**Interfaces:**
- Consumes: Stable Task 2 ledger IDs.
- Produces: Human-reviewable executive evidence with blocked claims separated.

- [x] **Step 1: Create exact proof-pack sections**

```markdown
# Executive Proof Pack

## Use and confidentiality
## Current role and chronology
## Organization and global operating scope
## Product-development scope
## Customer-facing AI products
## AI-native engineering operating model
## Financial and PE-backed operating scope
## Architecture and platform transformation
## Reliability and delivery outcomes
## People and leadership systems
## M&A and operating-model transformation
## Regulated-industry breadth
## Bilingual and bicultural leadership
## Blocked claims and evidence requests
```

- [x] **Step 2: Populate claims using a consistent block**

Use this shape for every claim:

```markdown
### Claim: Plain-language claim
- Ledger IDs: `stable-ledger-id`
- Confidence: Verified | Directional | Recollection | Unresolved
- Guillermo’s role: Exact attribution
- Strongest evidence: Source or owner confirmation
- Public wording: Approved wording or “Blocked pending evidence”
- Interview proof: What Guillermo must be able to explain
```

Include current title, global scope, six leaders, GCC responsibility, four AI products, five directional outcomes, AI operating mechanisms, architecture guardrails, financial context, HSA result, leadership system, and Spanish-native/LatAm value.

- [x] **Step 3: Add exact blocked-evidence requests**

For every blocked claim list the decision, acceptable corroboration, and fallback if unresolved. Example: if 93-person arithmetic remains unresolved, use “global distributed organization” without a number.

- [x] **Step 4: Verify every referenced ledger ID**

Run a Node one-liner that extracts backtick IDs from the proof pack and fails when an ID is absent from `.private/evidence-ledger.json`.

Expected: exits 0 and prints the number of referenced records.

Do not commit the proof pack.

---

### Task 4: Build the builder and 0-to-1 proof pack

**Files:**
- Modify: `.private/evidence-ledger.json`
- Create: `.private/builder-proof-pack.md`

**Interfaces:**
- Consumes: Factor317 public pages and `factor317-direct-builder-role`.
- Produces: Three prioritized product entries separating public product facts from owner-confirmed implementation.

- [x] **Step 1: Add public-source product ledger records**

Create:

- `basesignal-public-product`
- `momentum-public-product`
- `wisdomloop-public-product`
- `subscription-scope-public-product`
- `pocket-ranger-public-concept`
- `factor317-product-lab-positioning`

Record each live URL, stated purpose, target user, public stage wording, and capabilities. Do not infer stack, revenue, users, or private status.

- [x] **Step 2: Create proof-pack sections**

```markdown
# Builder and 0-to-1 Proof Pack

## Use and confidentiality
## Builder identity and direct contribution
## Product 1: BaseSignal
## Product 2: Momentum
## Product 3 candidate: Subscription Scope or Wisdom Loop
## Additional products
## Human architecture and agentic execution workflow
## Current technical stack evidence
## Historical engineering foundation
## Missing proof and selection decision
```

- [x] **Step 3: Populate BaseSignal and Momentum**

For each include problem, public capabilities, owner-confirmed direct architecture/implementation role, stage, URL, required architecture artifact, required technical-decision story, and required usage/learning signal. Mark stack as unresolved until repository or owner architecture evidence is inspected.

- [x] **Step 4: Select the third product by evidence**

Score Subscription Scope and Wisdom Loop from 0–2 on public usability, technical depth, differentiation, user/learning evidence, and direct-implementation story. Use `Evidence not yet captured` rather than invented scores. Select only after at least four criteria are evidenced.

- [x] **Step 5: Document the human/agent workflow evidence required**

Require examples proving that Guillermo defines the problem and constraints, owns architecture, delegates bounded work to agents, reviews/tests/integrates, deploys/operates, and rejects or corrects unsuitable agent output. Do not approve public wording until each selected product has one concrete example.

- [x] **Step 6: Validate and verify privacy**

Run:

```bash
npm run validate:evidence
git check-ignore .private/evidence-ledger.json .private/builder-proof-pack.md
git status --short
```

Expected: ledger valid; private files ignored and absent from status.

---

### Task 5: Create executive and builder market-message maps

**Files:**
- Create: `.private/market-message-maps.md`

**Interfaces:**
- Consumes: Both proof packs.
- Produces: Drafting constraints and five-claim maps for each target narrative.

- [x] **Step 1: Record shared factual rules**

State that both tracks share chronology and confidence; target roles never appear as held titles; unresolved claims are excluded; directional metrics are qualified and limited; each track preserves a bridge to the other identity.

- [x] **Step 2: Build the executive map**

Set the primary role family to engineering/product-led CTO or EVP/SVP Engineering and Product Development in SaaS, technology-enabled, PE-backed, or growth-stage businesses.

Answer these buyer concerns with exactly five non-blocked claims:

1. Leadership through leaders at meaningful scale.
2. Technology investment connected to customer/business value.
3. Platform modernization without destabilizing delivery.
4. AI converted from experimentation into governed leverage and products.
5. Technical depth sufficient for architecture judgment.

Add one builder bridge claim, excluded claims, required portfolio proof, and desired interview questions.

- [x] **Step 3: Build the builder map**

Set the primary role family to hands-on startup CTO, founding engineer, technical co-founder, or Head/VP Engineering for 0-to-1 and early scale.

Answer these buyer concerns with exactly five non-blocked claims:

1. Current personal software implementation.
2. Architecture judgment under early-stage constraints.
3. Product discovery, shipping, operation, and iteration.
4. Disciplined AI-agent workflow.
5. Ability to build the team and operating model after traction.

Use BaseSignal and Momentum provisionally; keep the third slot blocked until Task 4 is evidenced. Add one executive bridge claim.

- [x] **Step 4: Record the shared through-line**

Use as positioning guidance, not mandatory final copy:

> A software engineer who learned to architect systems, then organizations, and who continues to build products while leading at executive scale.

- [x] **Step 5: Audit each selected claim**

For every top-five claim record ledger IDs, confidence, attribution, public-safety status, required proof, and eligibility. No claim is eligible when any linked record is unresolved or blocked.

Do not commit the message maps.

---

### Task 6: Resolve blocked evidence and hand off to drafting

**Files:**
- Modify: `.private/evidence-ledger.json`
- Modify: `.private/executive-proof-pack.md`
- Modify: `.private/builder-proof-pack.md`
- Modify: `.private/market-message-maps.md`

**Interfaces:**
- Consumes: User answers and corroboration.
- Produces: Validated drafting inputs for a separate public-content plan.

- [x] **Step 1: Ask blocked questions one at a time in this order**

1. Six directs versus 41 FTE arithmetic, Bangalore count, and as-of date.
2. AI product adoption definition and as-of date.
3. Product Development reporting and authority.
4. $4.8M/$23M budget and investment rights.
5. Experity promotions and disputed employer chronology.
6. Degree and certification record.
7. Factor317 public title, employer-policy safety, and stacks.
8. People-leadership outcomes.

- [x] **Step 2: Update records after each answer**

Owner-confirmed exact facts may become verified; metrics remain directional without documentary methodology; sensitive facts remain restricted; historical conflicts remain with resolution notes; public wording is added only when unblocked.

- [x] **Step 3: Run final checks**

```bash
npm run test:evidence
npm run validate:evidence
git diff --check
git status --short
```

Expected: tests and validation pass; no whitespace errors; `.private/` absent from status; pre-existing `sources/` remains untouched and unstaged.

- [x] **Step 4: Confirm drafting readiness**

Require consistent chronology, canonical current title, dated/scoped organization wording or a qualitative fallback, current-versus-target adoption language, exact financial authority, technical evidence for at least three Factor317 products, non-blocked top-five claims, and visible confidentiality restrictions.

- [x] **Step 5: Write the separate public-content implementation plan**

That follow-on plan must cover executive and builder manuscripts, portfolio proof routes, safe case-study revisions, structured rendering/fallback synchronization, and content-consistency validation. Do not modify public artifacts in this task.

## Completion criteria

- Ledger validation passes.
- High-value current and historical claims are retained or recorded as conflicts.
- Directional metrics are never mislabeled as verified.
- AI product current and target adoption are separated.
- Ownership boundaries are explicit.
- Proof packs link to stable ledger IDs.
- Both message maps contain five supported claims or visibly blocked slots.
- No resume/profile/portfolio/case-study/source artifact changes.
- No `.private/` file is staged or exposed by git status.
