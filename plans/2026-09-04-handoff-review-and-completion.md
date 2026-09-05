# Handoff — Review & Completion Pass

**Prepared:** 2026-09-04, by the Wave-5 validating agent (who also executed Wave 4.5
and the owner-decision fixes F2/F4/F5).
**Audience:** a different agent picking up cold. You have two jobs, in order:
**Phase 1 — independently review all uncommitted work; Phase 2 — drive the plan to
completion** (resolve the pending owner decisions, apply them, re-validate, and commit
only when the owner asks).

---

## 0. Read order (cold start)

1. `AGENTS.md` — repo rules, incl. the anonymization rule (non-negotiable).
2. `plans/PLAN-C-EXECUTION-STATE.md` — **the execution state file.** Invariants
   (INV-1..8), decisions (D-1..6), wave statuses, file-ownership table, gate log,
   handoff notes incl. findings F1–F5. Read §1 invariants before touching anything.
3. `plans/2026-09-04-plan-c-execution-shell.md` — Plan C, the directive layer.
4. `plans/2026-09-04-value-layer-extraction-content-refresh-plan.md` — Plan B, the
   spine. Plan C overrides parts of it; where C is silent, B governs.
5. `plans/2026-09-04-wave5-validation-report.md` — what the last validation pass
   verified, found, and fixed (F1–F5), with gate evidence.
6. `plans/2026-09-04-plan-c-drafting-inputs.md` + `plans/2026-09-04-plan-c-placement-map.md`
   — canonical wording, ref codes, caveats, attribution verbs. **All copy work goes
   through these; do not re-derive from `sources/`.**

Portability: `sources/` and `.private/` are gitignored (local-only). `plans/` is
tracked and `.assetsignore` keeps all `*.md` off the deployed site. If you are on a
different machine without `.private/evidence-ledger.json`, you cannot run
`npm run validate:evidence` — say so and proceed with everything else.

**Never** read `sources/evidence-extraction-salas-2026-09-03/INTERNAL-provenance.md`
into published copy or quote it in reports.

## 1. Current state snapshot

- Waves 1, 2, 3, 4, 4.5 and 5 are **complete**. Wave 6 (optional enrichment) is
  **deferred to owner** (D-5: diff already large).
- **Nothing is committed** (INV-8). The entire refresh lives in the working tree.
- Evidence ledger: **78 records**, validator green.
- Last full gate run: `npm test` 26/26 · ledger valid · JSON parse OK · **all 9
  embedded blobs deep-equal** (5 `portfolio-data` + 4 `const EMBEDDED_DATA`) ·
  79/79 card link targets · anonymization/product-name/old-GCC scans clean ·
  apex+nova browser render-checked.
- Uncommitted diff: 12 modified files + 9 new case-study files + `plans/` docs +
  `DAILIES.md` + untracked `AGENTS.md`. (`.private/evidence-ledger.json` also changed
  but is gitignored.)

### Who changed what (for review triage)

| Layer | Files | Author |
|---|---|---|
| Waves 1–4 | ledger (+10), resume/portfolio JSON (summary, 25 bullets, 16 initiatives, aiPractitioner 13, cards 17), mirrors, 9 new case studies, owning-the-whole-system fold | prior agent |
| Wave 4.5 + F1 | ledger (+3 = 78), `leadershipFrameworks` 17→20, frameworks-grid fallbacks ×3, departure-clause removal (LOP + Manifest descriptions) | validating agent |
| F2 (OnePACS ruling) | owning-the-whole-system ×3 (acquired-team pattern rewrite), tagline ×6, 2 framework origins de-SEL'd | validating agent |
| F4 (product-name ruling) | 5 resume-content.json strings + mirrors + narratives ×3; ledger approvedWording ×3 | validating agent |
| F5 (stale mirrors) | apex/nova `EMBEDDED_DATA` regenerated; narrative GCC hedge ×3; initiatives-fallback GCC card ×3 | validating agent |
| Docs | wave5 report, state file, DAILIES | validating agent |

Owner rulings already applied (do not re-litigate without asking): GCC hedge
("helped shape"), one consolidated Leadership Operating Principles card, all 5 new
case-study subjects per D-2/D-3 shape (AI-adoption standalone cut, consultative
transition folded), ADVR card added, OnePACS → acquired-team pattern, product names →
generic terms (AI clinical scribe / agentic patient assistant / automated
insurance-matching agent).

## 2. Phase 1 — Review checklist

Run these in order. Everything is read-only except where noted. Any FAIL is a defect
you fix (small) or escalate to the owner (judgment calls).

### 2.1 Gates

```
npm test                            # expect 26/26
npm run validate:evidence           # expect: 78 records valid (needs .private/)
node -e "JSON.parse(require('fs').readFileSync('resume-content.json'));JSON.parse(require('fs').readFileSync('portfolio-content.json'));console.log('JSON OK')"
```

### 2.2 Mirror sync — all 9 embedded blobs

Save §5's script as a scratch file (or promote to `scripts/validate-mirrors.mjs` if
the owner approves) and run it. Expect: all blobs IN SYNC and all scans CLEAN.

### 2.3 Invariant re-verification (targeted greps)

```
# INV-1/F2/F4: codenames + product names gone from public artifacts
rg -il 'OnePACS|DICOM|AI Scribe|Care Agent|\bAIM\b|BigSKI|iDoc|Patient Fusion' \
  -g '!node_modules' -g '!sources' -g '!.private' -g '!plans' -g '!DAILIES.md' \
  -g '!*.pdf' *.html *.json *.js          # expect: no output

# INV-1: individual/team names (word boundaries — case-insensitive substring
# scans produce false positives, e.g. "happen" vs "Happ", JS variable `sel`)
rg -i '\bDamien\b|\bRafael\b|\bVan ?Dyke\b|\bLantz\b|\bBlatter\b|\bSeery\b|\bHapp\b|\bGiordano\b|\bHoffman\b|\bRajasekharan\b|\bEncora\b|\bSenthil\b|\bMiten\b|\bGTCR\b|\bLyman\b|\bAmanda\b|\bSEL\b' \
  *.html *.json                            # expect: no output

# INV-4: constructed doctrine labels absent from public copy
rg -il 'No-Heroes Standard|Show Me Your Work|Departure as Design Signal|Perception Becomes Reality' \
  -g '!sources' -g '!.private' -g '!plans' -g '!DAILIES.md'   # expect: no output

# INV-5/F1: restricted departure doctrine not asserted in public copy
rg -n 'departure is read as information|departure that reveals' *.html *.json  # expect: no output
# (the phrase "whether the subject is hiring, architecture, a departure, or a
# security policy" is ALLOWED — subject listing, not doctrine)

# INV-6: old GCC attribution gone; hedge present in all its places
rg -n 'Participated in (engineering workstreams|Global Capability)' *.html *.json  # expect: none
rg -c 'Helped shape' resume-content.json case-study-gcc-capability-not-cost.html \
  executive_portfolio_herald.html executive_portfolio_cipher.html executive_portfolio_ember.html

# INV-2: no measured outcomes in the new case studies
rg -n '[0-9]+(\.[0-9]+)?%|\$[0-9]|[0-9]+x ' case-study-gcc-capability-not-cost*.html \
  case-study-devops-center-of-excellence*.html case-study-hiring-alignment-intervention*.html
```

Known/accepted exceptions (do NOT flag): employer name `Experity` (INV-1 scope
clarification); `India-based RCM workflow acquisition` (settled, ledger
`india-rcm-acquisition-walk-the-wall` public-safe); `HIPAA / HL7 / FHIR` as skill tags
(industry standards); `Kafka/Debezium/Bedrock` etc. (vendor tech names); pre-existing
figures `3-4x`, `30%+`, `35%+`, `78%` (see §3 item 1 — owner decision pending, not a
new defect); `*.md` under `plans/` and `DAILIES.md` may mention internal names
(private, not deployed).

### 2.4 Content review (human-judgment pass)

1. **Resume summary + Experity bullets** (`resume-content.json`): check against the
   placement map's canonical phrase list; attribution verbs must sit on the ladder
   (helped shape / established / directed attention to — never "delivered" + measured
   result for Sep-3-derived claims); no paragraph restates another artifact verbatim.
2. **New case studies** (9 files): voice discipline per variant (base/herald
   editorial, cipher proof-dense, ember measured-tone); GCC study must carry its
   ownership disclaimer; outcome sections must use safe forms ("documented directive /
   operating stance"), never results.
3. **Leadership frameworks (20 cards)**: the 3 Wave-4.5 cards must carry their
   "designed and directed … not confirmed" origin caveats; LOP card must say
   "Three principles" and assert no departure doctrine; nine-pillar card must not
   conflate with the Architecture Hub five-pillar assessment.
4. **Owning-the-Whole-System ×3**: the acquired-team Executive Summary must read
   product/domain-agnostic; consultative-transition mechanism card present;
   departure material absent.
5. **Ledger spot-check** (if `.private/` exists): records
   `framework-engineering-operating-model`, `framework-staff-engineer-tsal-model`,
   `framework-well-architected-nine-pillars`, the 10 Wave-1 records, and the 3
   adoption records' generic approvedWording + restriction.

### 2.5 Render checks

`npm run dev` (wrangler dev) or open via `file://`:
- 5 portfolio pages: initiatives grid renders 16 cards (JSON fetch path), frameworks
  grid renders 20 cards on herald/cipher/ember, case-study cards 17 with working links
  incl. `-cipher`/`-ember` suffix routing.
- 9 new case-study pages load; back-links resolve.
- resume.html / resume-alt.html: theme switching works; PDF/TXT export includes the
  new bullets (export path covered by tests, but eyeball once).
- file:// fallback path: herald shows frameworks-grid fallback incl. the 3 new cards
  (fetch fails locally → fallback visible; this is expected).

## 3. Phase 2 — Completion items (all need owner input first — ask, don't assume)

Present these to the owner as a decision list, apply the answers, re-run §2 gates:

1. **PDLC readiness figure.** Public copy says "78% Day 1 readiness" (4× in
   resume-content.json + 3 fallback cards). The July executive-profile analysis found
   post-integration readiness is **69%** and flagged "the number needs fixing in the
   next content pass." Options: (a) replace 78%→69%; (b) keep "Day 1: 78%" and add
   "69% post-integration"; (c) leave as-is. **Ledger impact:** whatever is chosen must
   match/extend the relevant ledger record's approvedWording.
2. **Initiatives-grid fallback** (herald/cipher/ember): curated 12-card set vs JSON's
   16 (only the GCC card was corrected in F5). Options: (a) regenerate fallback from
   JSON (full parity, larger HTML diff); (b) add just the 3 missing Wave-2 cards
   (DevOps CoE, Hiring Chain, GCC now done) keeping curation; (c) accept as-is.
3. **Mirror-gate script.** Promote §5's checker to `scripts/validate-mirrors.mjs` +
   wire into `npm test` so drift like F5 can never ship silently again. (Recommended.)
4. **F3: QA scanners.** `slop-scan.mjs`/`dup-scan.mjs` were lost with the prior
   session's scratchpad. Recreate equivalents in `scripts/` if the owner wants them
   for Wave 6 drafting; otherwise drop.
5. **Wave 6 (optional, D-5).** Enrichment of existing case studies per Plan B §V
   Wave-4 table minus Owning-the-Whole-System (done): Security Rails (+rails-before-speed,
   roll-forward), AI Development Framework (+three-levels, ambition test),
   Agent-Multiplied Delivery (+usage goals), Value Delivery Engineering (+non-negotiable
   customer commitments), Platform Initiative / Architecture Enablement (+nine-pillar,
   self-service assessment). Rules: base+cipher+ember identical deltas; ledger
   restrictions apply; run dup/slop discipline on every addition.
6. **AGENTS.md nit:** it claims "no formal lint/typecheck pipeline" — there are 26
   tests. Fix the line if the owner agrees.
7. **Commit** — only when the owner explicitly asks (INV-8). See §4.

## 4. Commit guidance (when authorized)

Repo style: Conventional Commits, lowercase subject ≤72 chars, no period; body
explains *why* when >3 files. Suggested split (owner may prefer one commit):

```
feat(content): integrate sep-3 evidence corpus across resume and portfolios
  — body: waves 1-5 of plan C; hedged GCC attribution; product names and
    codenames genericized per owner rulings; mirrors resynced
docs(plans): add plan C set, wave-5 validation report, handoff
chore: add AGENTS.md; log changes in DAILIES.md
```

Verify before committing: `git status` has no unintended files (`.private/`,
`sources/` are gitignored — confirm they do NOT appear); no secrets; run the full
gate suite one last time. Do not push/deploy unless asked; note the deploy pipeline
stamps versions via CI (`npm run deploy` requires stamping — see readme).

## 5. Mirror + scan checker (runnable as-is)

Save as `scratch-check-mirrors.mjs` (or promote to `scripts/` per §3.3):

```js
import fs from "node:fs";
const pc = JSON.parse(fs.readFileSync("portfolio-content.json", "utf8"));
const rc = JSON.parse(fs.readFileSync("resume-content.json", "utf8"));
let fail = 0;
const bad = (m) => { console.log("FAIL:", m); fail++; };

function extractJsonBlob(file) {
  const m = fs.readFileSync(file, "utf8")
    .match(/<script type="application\/json" id="portfolio-data">([\s\S]*?)<\/script>/);
  return m ? JSON.parse(m[1]) : null;
}
function extractEmbeddedData(file) {
  const s = fs.readFileSync(file, "utf8");
  const i = s.indexOf("const EMBEDDED_DATA =");
  if (i < 0) return null;
  const start = s.indexOf("{", i);
  let depth = 0, inStr = false, esc = false, q = "";
  for (let j = start; j < s.length; j++) {
    const c = s[j];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === q) inStr = false; continue; }
    if (c === '"' || c === "'") { inStr = true; q = c; continue; }
    if (c === "{") depth++;
    else if (c === "}") { depth--; if (depth === 0) return eval("(" + s.slice(start, j + 1) + ")"); }
  }
  return null;
}
// 1. portfolio-data blobs == portfolio-content.json
for (const f of ["executive_portfolio_herald.html","executive_portfolio_cipher.html",
                 "executive_portfolio_ember.html","portfolio-apex.html","portfolio-nova.html"]) {
  const emb = extractJsonBlob(f);
  if (!emb) bad(`${f}: no portfolio-data blob`);
  else if (JSON.stringify(emb) !== JSON.stringify(pc)) bad(`${f}: portfolio-data DRIFT`);
}
// 2. every EMBEDDED_DATA key deep-equals resume-content.json
for (const f of ["resume.html","resume-alt.html","portfolio-apex.html","portfolio-nova.html"]) {
  const emb = extractEmbeddedData(f);
  if (!emb) bad(`${f}: no EMBEDDED_DATA`);
  else for (const k of Object.keys(emb))
    if (JSON.stringify(emb[k]) !== JSON.stringify(rc[k])) bad(`${f}: EMBEDDED_DATA.${k} DRIFT`);
}
// 3. banned-string scan over public artifacts
const banned = [
  [/OnePACS|DICOM|AI Scribe|Care Agent|\bAIM\b|BigSKI|iDoc|Patient Fusion/i, "codename/product"],
  [/Participated in (engineering workstreams|Global Capability)/, "old GCC wording"],
  [/No-Heroes Standard|Departure as Design Signal|Perception Becomes Reality/i, "constructed doctrine label"],
  [/departure is read as information|departure that reveals/, "restricted departure doctrine"],
];
const publicFiles = fs.readdirSync(".").filter((f) =>
  /\.(html|json|js)$/.test(f) && !f.startsWith(".") && f !== "scratch-check-mirrors.mjs");
for (const f of publicFiles) {
  const s = fs.readFileSync(f, "utf8");
  for (const [re, label] of banned) if (re.test(s)) bad(`${f}: ${label} (${re})`);
}
// 4. card link targets exist
for (const c of pc.caseStudyCards) for (const v of c.variants) {
  const url = ["cipher","ember"].includes(v) ? c.url.replace(/\.html$/, "-" + v + ".html") : c.url;
  if (!fs.existsSync(url)) bad(`missing ${url} (${c.title}/${v})`);
}
console.log(fail ? `${fail} FAILURES` : "MIRRORS + SCANS + LINKS: ALL CLEAN");
process.exitCode = fail ? 1 : 0;
```

## 6. Definition of done (plan completion)

- [ ] Phase 1 checklist fully green (or every failure fixed and re-verified)
- [ ] §3 items 1–7 presented to the owner; decisions applied; gates re-run after each
- [ ] `PLAN-C-EXECUTION-STATE.md` updated (statuses, gate log, handoff notes) — update
      at every task transition, never batch
- [ ] `DAILIES.md` entry for any new content changes
- [ ] Wave 6 executed or explicitly cancelled by the owner
- [ ] Commit(s) created **iff** the owner asked; nothing pushed/deployed unless asked
