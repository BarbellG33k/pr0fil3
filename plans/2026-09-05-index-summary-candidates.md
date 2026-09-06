# `index.html` Identity Statement — Candidate Set

**Date:** 2026-09-05
**Status:** Candidates for owner review. No public artifact modified.
**Target:** the `.description` paragraph at `index.html:247`.
**Decision required:** pick one (or direct a hybrid) in the Decision block at the bottom.
**Revision:** v2 — v1's candidates were rewritten after owner feedback on register. See §3.

---

## 1. Why the current line is being replaced

Current copy (`index.html:247`):

> Guillermo Salas is a software engineer who grew into an enterprise architect and
> engineering executive, and who builds people, leaders, technical systems, and operating
> models that raise the standard of engineering execution. He leads through leaders -
> aligning talent to real needs, distributing ownership, and turning ambiguity and hero
> dependency into durable systems - across healthcare, fintech, and enterprise platforms.
> His technical foundation spans three decades of hands-on architecture, from early .NET
> and SQL Server engineering through cloud modernization to today's AI-assisted engineering
> practice at Experity, where AI is the newest arena for that leadership, not the whole
> story.

It was drafted in July from `.private/drafts/portfolio-positioning.md` §1 and has not moved
since, while the record behind it has grown considerably: the Sep 3 evidence extraction
(`sources/evidence-extraction-salas-2026-09-03/`), the leadership operating principles
(`sources/frameworks_and_principles/`), and six new case studies.

| # | Defect | Detail |
|---|---|---|
| 1 | **"three decades"** | Not an accuracy problem — the tenure is real. It is a **positioning** problem, and the owner's call (2026-09-05) is deliberate: *over two decades* reads as significant maturity and continued relevance, where *three decades* invites a reader to age the candidate out of contention before reading the second sentence. Every other artifact already says *more than two decades*; this is now a stated choice rather than an inconsistency to reconcile. |
| 2 | **Names the employer** | `AGENTS.md` requires published output to anonymize company names. The paragraph closes on "at Experity." |
| 3 | **"arena"** | On the `scripts/slop-scan.mjs` word list. Tolerated today as a pre-existing hit in `portfolio-content.json`; no reason to carry it into a rewrite. |
| 4 | **Tech stack as shorthand for a career** | ".NET and SQL Server" compresses twenty-plus years into two product names — the specific objection driving this rewrite. `SQL Server` is only `[Recollection]` confidence in executive-profile manuscript §3.7 regardless. |

**Also structurally significant:** this paragraph is the *only* piece of published copy on
the site that is hardcoded rather than read from `portfolio-content.json` /
`resume-content.json`. See §6.

---

## 2. Constraint set

**Owner directives (confirmed 2026-09-05):**

- **Voice:** subjectless / implied first person — the voice the case-study HTML already
  uses. Resolves the POV inconsistency between the case studies and the profile fields.
- **Tenure:** *more than two decades*, as a positioning decision (see defect 1).
- **Domains:** no industry list. Use the consequence framing already live in
  `resume-content.json.summary` — *regulated environments where a mistake reaches a
  patient, a regulator, or the budget.*
- **No compression of the career** into recent-employer or recent-technology shorthand.

**Never appears in any candidate:** employer names · tech-stack shorthand · "three decades"
· org size, headcount, direct reports, team counts, employer performance metrics · the
unsourced "#1 U.S. urgent care" / "50% of the nation's clinics" claim.

**Repo gate compliance** — every candidate was written to pass `scripts/slop-scan.mjs` and
the `BANNED` regexes at `scripts/validate-mirrors.mjs:31-51`. Note that the constructed-label
regex on line 36 is case-insensitive and therefore also bans the literal phrase
*"show me your work"* in any casing: express the idea, never the label.

---

## 3. Register — what changed in v2, and why

v1 was rejected on voice, not on substance. The specific failures, recorded so they are not
repeated:

- **"Builds organizations that don't need a hero."** The concept is sound and well
  evidenced; the word is cheesy, and the sentence is naive to the point of sounding
  simplistic. The idea has to be carried by the argument, not by a mascot noun.
- **"Nothing advances on assertion."** Textbook machine-generated cadence — a clipped
  declarative fragment doing the work a sentence should do.
- **"Coding is an activity. Engineering is judgment."** Sterile and boxy. Three flat
  clauses in sequence state a category distinction and then stop, where the value is
  entirely in what the distinction *costs and buys*.

**The direction for v2:** full sentences with real subordinate clauses; an idea developed
rather than asserted; the trade-off named — what the discipline costs, and what it buys.
Where a strong opening line survives, it is a complete sentence, and the paragraph beneath
it earns the claim rather than restating it.

**Intellectual anchors now in play** (previously unused on this surface):

- **Deming — systems over individuals.** The verified line is *"a bad system will beat a
  good person every time"* (see `plans/2026-09-05-linkedin-people-first-deming-thread-plan.md`,
  Post 2). Deming said *system*, not *process* — the folk paraphrase is weaker, because
  system means org design, incentives, and role definition, not merely steps.
- **Mercenaries and missionaries; the elite strike team.** The prevailing pattern this work
  argues against: concentrate the hard problems in a small exceptional group, buy velocity
  that reads as capability, and end up with an organization whose future sits in a handful
  of calendars.
- **Judgment as the surviving craft.** Expanded per the owner's own formulation — coding
  commoditizes, and what does not is systems thinking, mature judgment, and the body of
  principles the industry has spent decades working out and writing down.

---

## 4. Candidates

### A — Systems over individuals, with Deming cited

**Shape:** opening line + paragraph · **Thesis:** results are a property of the design.

```
Excellence that lives in a person leaves when the person does; excellence built
into a system compounds long after.

The reflex in most engineering organizations is to concentrate - assemble a small
exceptional group, route everything consequential through it, and call the result
capability. It buys speed convincingly enough in any given quarter, and it quietly
relocates the organization's future into a handful of calendars. Deming's actual
formulation is sharper than the one usually repeated: a bad system will beat a
good person every time - system, not process, meaning org design, incentives, and
role definition rather than merely the steps. More than two decades of
engineering, architecture, and executive leadership have gone into the opposite
construction: ownership made explicit and deliberately distributed, hard-won
expertise converted from tribal knowledge into shared practice, and standards
repeated until they are genuinely known, on the understanding that a standard
nobody is aware of does not exist. All of it in regulated environments, where a
mistake reaches a patient, a regulator, or the budget.
```

**Claims used:** C1, C2, C3, C4, C12, C13.
**Why it works:** the most heavily evidenced theme in the corpus, argued rather than
sloganized, with the Deming line supplying both intellectual lineage and a precision point
(*system*, not *process*) that demonstrates command of the idea rather than familiarity
with the quote.
**Trade-off to weigh:** citing another thinker on your own landing card can read as
borrowed authority — the reader meets Deming before they meet you. Candidate B carries the
identical argument without the citation, and the choice between them is really a judgment
about whether the lineage adds credibility or spends attention.
**Markup:** needs an opening-line element above `.description`.

---

### B — Systems over individuals, mercenaries and missionaries

**Shape:** opening line + paragraph · **Thesis:** the same argument, no citation, sharper
economics.

```
Mercenaries are hired for a campaign. Missionaries are what an organization gets
to keep.

Engineering organizations tend to meet their hardest problems by concentration -
a small elite group, brought in or set apart, through which everything difficult
is routed. The arithmetic works for a quarter and fails over a decade, because
the capability never actually becomes the organization's; it stays personal, and
it leaves when its owner does. The alternative is slower to stand up and
considerably harder to dislodge: ownership named rather than implied, expertise
institutionalized rather than held by whoever happens to hold it, and teams
structured so that no single absence changes what they can be trusted with. More
than two decades of building it that way - first writing the systems, then
architecting them, then leading the organizations that own them - in regulated
environments, where a mistake reaches a patient, a regulator, or the budget.
```

**Claims used:** C1, C2, C3, C12, C14.
**Why it works:** the strongest opening in the set, and the second sentence does real
analytical work — *the arithmetic works for a quarter and fails over a decade* is the whole
argument in a clause. Carries the systems thesis without leaning on anyone else's name.
**Trade-off to weigh:** the missionaries/mercenaries framing is borrowed industry
vocabulary (commonly traced to John Doerr), well circulated but not original. Used as
allusion it reads as fluency; presented as a coinage it would not survive a reader who
knows its origin. The copy above alludes, and should stay that way.
**Markup:** needs an opening-line element above `.description`.

---

### C — Judgment as the surviving craft

**Shape:** single paragraph, no opening line · **Thesis:** what commoditizes, what does
not, and why the difference is the whole job.

```
Coding is being commoditized. The judgment that decides what to build, what to
refuse, what a system will cost to operate five years from now, and which
trade-off is the one that actually matters is not - and that gap is widening
rather than closing. Judgment of that kind is not innate; it accumulates, out of
systems thinking, out of having owned the consequences of one's own architecture,
and out of the body of principles and practices the industry has spent decades
working out, arguing over, and committing to writing. More than two decades of
engineering, architecture, and executive leadership rest on treating that
inheritance as the actual craft: coding is the activity, engineering is the
understanding of systems, constraints, and trade-offs, and only one of the two
gets cheaper as the tools get better. It is the same reasoning that makes
AI-assisted engineering a practice to be governed and validated here rather than
a headline to be chased - the standard being what it has always been in regulated
environments, where a mistake reaches a patient, a regulator, or the budget.
```

**Claims used:** C1, C9, C10, C12.
**Why it works:** built directly from the owner's own formulation and given room to
develop. It makes the twenty-plus years *the argument* — the depth is the reason the
judgment is worth paying for — and disposes of AI in a subordinate clause, which is exactly
the intended posture.
**Trade-off to weigh:** the longest candidate. It rewards a reader who stays; it asks for
four sentences before the payoff lands.
**Markup:** none — direct replacement of `index.html:247`.

---

### D — Evidence discipline, with the cost named

**Shape:** opening line + paragraph · **Thesis:** what the discipline costs and what it
buys.

```
Opinion is faster than evidence, and that difference is precisely what makes
opinion expensive.

Architecture calls, vendor selections, hiring bars, incident conclusions - each
one is cheaper to settle on instinct and dramatically more costly to unwind, so
each one gets the same treatment: the problem stated plainly, the evidence
produced before the conclusion rather than after it, and the reasoning written
down clearly enough to be followed later without a meeting and without its author
in the room. The discipline is worth very little unless it is symmetric, which is
why it is turned upward at the business narrative and inward at proposals of
one's own as readily as it is ever turned on anyone else's. More than two decades
have made that a habit rather than a policy - built in regulated environments,
where being wrong reaches a patient, a regulator, or the budget.
```

**Claims used:** C1, C5, C12.
**Why it works:** names a real trade-off in the first sentence (slower now, cheaper later)
instead of asserting a virtue, and the symmetry clause — pointed upward and inward, not
only downward — is the part almost nobody can claim and the part hardest to fake.
**Trade-off to weigh:** reads as exacting. That is accurate, but on a first impression it
lands cooler than A, B, or E.
**Markup:** needs an opening-line element above `.description`.

---

### E — Leadership as influence, and what the structure can hold

**Shape:** opening line + paragraph · **Thesis:** people-first, expressed structurally.

```
Leadership is influence rather than authority; management is one expression of
it, not its definition.

The practical consequence is that the work stops being a question of how much one
person can personally hold and becomes a question of how much the structure can
hold without them. Delivery ownership, technical direction, and the infrastructure
underneath both are each held by someone named and accountable, so continuity
becomes a property of the design rather than of anyone's availability. Ambiguity
is absorbed at the top instead of passed downstream; priorities are defended
against the churn that damages delivery far more reliably than difficult problems
ever do; and when someone leaves depleted, that is read as a fault in the
structure rather than a shortfall in the person. More than two decades of
building it that way - as an engineer, as an architect, and then across
engineering organizations - where a mistake reaches a patient, a regulator, or
the budget.
```

**Claims used:** C1, C6, C7, C8, C12.
**Why it works:** the most humane candidate, and the only one stating a position about what
leadership *is* that a reader could disagree with — which is what makes it memorable rather
than agreeable.
**Trade-off to weigh:** the depletion clause rests on a single working relationship in the
source material (C8, `[Directional]`). Defensible as a stated principle, never as a claimed
outcome — no number, no trend, no "reduced attrition" may ever attach to it.
**Markup:** needs an opening-line element above `.description`.

---

### F — Composite, single paragraph, drop-in

**Shape:** one paragraph, no markup change · **Thesis:** the synthesis.

```
An engineer who learned to architect systems, and then to build the organizations
that own them - more than two decades of that progression, with one conviction
underneath all of it: capability that depends on particular people is not
capability, it is exposure. So ownership is made explicit and distributed,
hard-won expertise is turned into shared practice rather than left with whoever
happens to hold it, and decisions run on evidence rather than instinct, written
down clearly enough to be followed without a meeting. Teams own the whole system,
including the parts that hurt. The discipline does not change with the subject -
an architecture call, a hiring bar, an incident, and an AI-assisted engineering
practice all clear the same bar - and it was formed where a mistake reaches a
patient, a regulator, or the budget.
```

**Claims used:** C1, C2, C3, C5, C11, C12.
**Why it works:** *capability that depends on particular people is not capability, it is
exposure* is the mature form of the idea v1 fumbled — same argument, no mascot noun. Highest
substance per candidate, and it drops into the existing `<p class="description">` with zero
markup change.
**Trade-off to weigh:** no single line to remember it by. It wins on substance rather than
impact.
**Markup:** none — direct replacement of `index.html:247`.

---

## 5. Claim sourcing

Every claim used above, traced to a repo source with its confidence — so the pick can be
defended, and so a later editing pass cannot upgrade a verb without new evidence.

| ID | Claim | Source | Confidence |
|---|---|---|---|
| C1 | Engineer → architect → executive, more than two decades | `resume-content.json` role history; executive-profile manuscript §2 | Verified |
| C2 | Dependence on particular individuals is a structural defect, not a strength | `sources/frameworks_and_principles/Guillermo_Salas_Leadership_Operating_Principles.md` ("systems over heroics"); evidence extraction §5.1, §6.1 | Verified — multi-source |
| C3 | Expert-held knowledge converted into shared practice | `case-study-devops-center-of-excellence.html`; evidence extraction §3 | Verified |
| C4 | A standard nobody is aware of does not exist; alignment decays without repetition | Leadership operating principles ("communication has to be repeated to matter"); evidence extraction §5.4. Already live in `portfolio-content.json.summary` | Verified |
| C5 | Decisions run on evidence rather than assertion; written down; the gate applied upward and to self-originated proposals | Leadership operating principles ("evidence over assumption"); evidence extraction §5.2, §2 | Verified |
| C6 | Leadership is influence, not authority; management is one expression of it | Leadership operating principles, opening section | Verified |
| C7 | Absorbs ambiguity rather than passing it downstream; protects teams from priority churn | Leadership operating principles ("protecting teams from organizational noise") | Verified |
| C8 | A depleted departure attributed to organizational design, not to the individual | Evidence extraction §5.3 — single working relationship | **Directional — flag** |
| C9 | Rails built before acceleration | `case-study-security-rails-ai-security-posture.html`; evidence extraction §4 | Verified |
| C10 | Coding / development / engineering hierarchy; judgment holds value as code production commoditizes | Evidence extraction §4; `resume-content.json.builderResume.summary`; owner formulation 2026-09-05 | **Directional — single series** |
| C11 | Teams own the whole system, including the parts that hurt | `case-study-owning-the-whole-system.html`. Already live in `portfolio-content.json.summary` | Verified |
| C12 | Regulated environments where a mistake reaches a patient, a regulator, or the budget | Already live in `resume-content.json.summary` | Verified |
| C13 | "A bad system will beat a good person every time" — W. Edwards Deming | Deming Four-Day seminar, Phoenix, Feb 1993, per The Deming Institute; see `plans/2026-09-05-linkedin-people-first-deming-thread-plan.md` Post 2 | Verified as spoken; **not** from his published books — do not cite a book |
| C14 | Mercenaries / missionaries framing | Borrowed industry vocabulary, commonly traced to John Doerr | **Allusion only** — never present as an original coinage |

**Directional claims (C8, C10) are stated as positions, never as measured outcomes.** That
is what keeps them publishable. Do not attach a number, a trend, or a result to either.

---

## 6. Do-not-use list

Carried forward so a later editing pass cannot silently reintroduce a retired claim:

- Employer names — `Experity` and every prior employer.
- Tech-stack shorthand — `.NET`, `SQL Server`, or any product name standing in for a career.
- `three decades` — the positioning decision is *more than two decades* (§1, defect 1).
- Org size, headcount, direct reports, team counts, employer performance metrics.
- `#1 U.S. urgent care platform` / `50% of the nation's clinics` — unsourced, excluded since
  the 2026-07-18 analysis.
- Product codenames per the `BANNED` list at `scripts/validate-mirrors.mjs:32`.
- The four constructed doctrine labels (`validate-mirrors.mjs:36`) — including the literal
  phrase *"show me your work"* in any casing. Express the idea, never the label.
- Evidence-ledger vocabulary (`validate-mirrors.mjs:47-50`) — public copy states what was
  done, never how well corroborated the underlying material is.
- `scripts/slop-scan.mjs` words — `arena` included.
- **Register:** clipped declarative fragments standing in for arguments; a vivid noun doing
  the work of a sentence; category distinctions stated and then abandoned. See §3.

---

## 7. Propagation note

Whichever candidate is chosen, two follow-on decisions come with it:

1. **`index.html:247` is hardcoded** — the only published copy on the site not read from
   `portfolio-content.json` / `resume-content.json`. Applying the pick is a good moment to
   decide whether the paragraph should move into the content JSON so this page stops being
   the one unsourced surface.
2. **Sibling fields may need re-syncing** so the entry page and the portfolio do not state
   the identity two different ways: `portfolio-content.json.summary` and
   `portfolio-content.json.hero.tagline` (currently "Builds stronger leaders and stronger
   engineering systems.").

**Gates to run when the pick is applied to `index.html`:**

```
node scripts/slop-scan.mjs --strict index.html
node scripts/validate-mirrors.mjs
node scripts/dup-scan.mjs --cross
npm test
```

Then render-check via `npm run dev` or `file://index.html` — the card is width-constrained
at 600px with a 40px gutter, so the opening-line candidates (A, B, D, E) should be eyeballed
at mobile width before shipping.

---

## 8. Decision

| Candidate | Shape | Thesis | Pick |
|---|---|---|---|
| A | Line + paragraph | Systems over individuals, Deming cited | ☐ |
| B | Line + paragraph | Mercenaries and missionaries | ☐ |
| C | Single paragraph | Judgment as the surviving craft | ☐ |
| D | Line + paragraph | Evidence discipline, with the cost named | ☐ |
| E | Line + paragraph | Leadership as influence; what the structure holds | ☐ |
| F | Single paragraph (drop-in) | The synthesis | ☐ |

**Owner notes / hybrid direction:**

>
