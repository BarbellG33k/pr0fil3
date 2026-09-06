# `index.html` Identity Statement — Candidate Set

**Date:** 2026-09-05
**Status:** Candidates for owner review. No public artifact modified.
**Target:** the `.description` paragraph at `index.html:247`.
**Decision required:** pick one (or direct a hybrid) in the Decision block at the bottom.
**Revision:** v4 — first person, per the perspective decision in §3.

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
| 1 | **Third person** | The page speaks about Guillermo rather than as him. See the perspective decision in §3 — this is now the primary defect, not a stylistic preference. |
| 2 | **"three decades"** | Not an accuracy problem — the tenure is real. It is a **positioning** problem, and the owner's call (2026-09-05) is deliberate: *over two decades* reads as significant maturity and continued relevance, where *three decades* invites a reader to age the candidate out of contention before reading the second sentence. Every other artifact already says *more than two decades*; this is a stated choice, not an inconsistency to reconcile. |
| 3 | **Names the employer** | `AGENTS.md` requires published output to anonymize company names. The paragraph closes on "at Experity." |
| 4 | **"arena"** | On the `scripts/slop-scan.mjs` word list. Tolerated today as a pre-existing hit in `portfolio-content.json`; no reason to carry it into a rewrite. |
| 5 | **Tech stack as shorthand for a career** | ".NET and SQL Server" compresses twenty-plus years into two product names. `SQL Server` is only `[Recollection]` confidence in executive-profile manuscript §3.7 regardless. |

**Also structurally significant:** this paragraph is the *only* piece of published copy on
the site that is hardcoded rather than read from `portfolio-content.json` /
`resume-content.json`. See §7.

---

## 2. Constraint set

**Owner directives (confirmed 2026-09-05):**

- **Purpose:** this is an **introduction of the person** — strengths, philosophy, style, and
  experience, stated with authority. It is not a position paper about engineering.
- **Voice:** **first person.** The index page is Guillermo speaking, with pride, conviction,
  and ownership. See §3.
- **Tenure:** *more than two decades*, as a positioning decision (see defect 2).
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

## 3. Perspective and register — the decisions behind v4

### Perspective: first person, deliberately

The index page speaks in **I/me**. This is a departure from the rest of the site, and the
departure is the point rather than a problem to reconcile:

- **The portfolio and the resume are documents *about* a professional record.** Third
  person (`portfolio-content.json.summary`) and subjectless implied first person (the
  case-study HTML) are both defensible there, because those artifacts present evidence.
- **The index page is the person speaking.** It is the one surface where a visitor meets
  Guillermo rather than reads about him, and pride, conviction, and ownership are not
  conveyable in a grammatical construction that keeps the subject at arm's length. Implied
  first person was tried in v3 and still reads as a record; the sentences describe a
  practice without anyone claiming it.

**How to write it well:** vary the sentence architecture. A paragraph in which every
sentence opens on "I" reads as self-absorbed rather than confident. Let "I" carry the claims
that are genuinely personal — what I learned, what I am strongest at, what it cost me — and
let the practice itself carry the sentences about method.

### Register: two rejected rounds and what they taught

**v1 — assertion in place of argument.** "Builds organizations that don't need a hero" was
naive to the point of sounding simplistic, and "hero" is cheesy; the concept is grounded,
but a mascot noun cannot carry it. "Nothing advances on assertion" was textbook
machine-generated cadence — a clipped fragment doing a sentence's work. "Coding is an
activity. Engineering is judgment." was sterile and boxy: a category distinction stated and
then abandoned, where the entire value is in what the distinction costs and buys.

**v2 — the manifesto problem.** The rewrite fixed the cadence and failed differently. Every
candidate argued a thesis *about engineering organizations* and left the subject of the page
as the implied holder of that opinion — an editorial, not an introduction. Two errors
underneath it:

1. **Borrowed frames signal borrowed thinking.** Citing Deming, and reaching for
   missionaries-and-mercenaries or the elite-strike-team trope, puts the copy inside the
   same diluted, widely circulated vocabulary everyone else is already posting as their own.
   Whatever authority the reference lends is more than spent by the impression that the
   thinking is secondhand. **No named thinker, no borrowed framework, no circulating trope
   appears in v3 or v4.**
2. **The page is about a person, not a position.** A reader arriving here wants to know who
   this is, what he is strong at, and how he works — not to be argued at.

**The standing direction:** an authoritative introduction in which the philosophy is *shown
by* the experience rather than declared alongside it. Principles appear as things the work
taught and cost, stitched into a progression, not as positions adopted. Systems thinking is
demonstrated in how the career is read, not announced as a methodology. Full sentences, real
clauses, no epigrams.

---

## 4. Candidates

### A — The arc, where each stage teaches the next

**Emphasis:** experience as the source of the philosophy.

```
I started as an engineer, became an architect, and have led engineering
organizations since - and the sequence matters, because each stage taught me
something the next one needed, and none of it was learned in the abstract.
Writing systems taught me what a design actually costs once somebody has to
operate it. Architecting them taught me that the binding constraint is almost
never the technology. Running the organizations that build them taught me the
rest: that results are a property of how the work is arranged - where ownership
sits, what gets written down, which standards are genuinely known rather than
merely published - and that the distance between a team that performs and one
that merely contains strong people is almost entirely a matter of design. More
than two decades of that, in regulated environments where a mistake reaches a
patient, a regulator, or the budget.
```

**Claims used:** C1, C2, C3, C4, C12.
**Why it works:** the progression *is* the argument, so nothing has to be asserted, and the
repeated "taught me" gives first person a natural spine instead of a run of I-statements.
The anti-concentration principle lands in the final clause as something the career produced
rather than a slogan the reader is asked to accept.
**Trade-off to weigh:** the most conventional structure of the five. It earns every claim;
it does not surprise.

---

### B — Strengths first, stated with authority

**Emphasis:** what I am good at and how I work.

```
I am strongest where the problem is organizational and the constraint is
technical, or the reverse - the two are rarely separable, and mistaking one for
the other is where most engineering plans quietly fail. I build leaders before I
build headcount, I make ownership explicit enough to hold without supervision,
and I treat a decision as unfinished until the reasoning behind it is written
down clearly enough for someone else to act on without a meeting. The depth
underneath that is not decorative: more than two decades of hands-on engineering
and architecture are what make my leadership judgment worth trusting, and they
are why I govern and validate an AI-assisted engineering practice rather than
adopt one on enthusiasm. All of it formed in regulated environments, where a
mistake reaches a patient, a regulator, or the budget.
```

**Claims used:** C1, C3, C5, C9, C10, C12.
**Why it works:** opens on a genuine differentiator rather than a chronology, and the first
sentence makes a claim of diagnostic skill most engineering leaders cannot make honestly.
"The depth underneath that is not decorative" answers the seniority question — why the
hands-on years matter now — without restating the résumé.
**Trade-off to weigh:** the most self-assured of the five, and the one with the highest
density of "I". That is the brief, but read it aloud once to confirm the confidence sits
right in your own voice rather than a notch above it.

---

### C — Lessons, and what they actually cost

**Emphasis:** principles as earned, explicitly not borrowed.

```
I have spent my career moving closer to the source of the problem rather than
further from it: writing the systems, then designing them, then shaping the
organizations that decide what gets built and how well. Each move surfaced the
same pattern one level up. A defect is rarely isolated, and neither are the
organizational conditions that produced it. Capability concentrated in a few
people looks like strength in a good quarter and reads as fragility in a bad
one. Alignment decays unless it is deliberately maintained, which makes
communication a quality mechanism rather than a courtesy. I did not pick those
up from reading; they are what more than two decades of being accountable for
the result actually cost me - in regulated environments, where a mistake reaches
a patient, a regulator, or the budget.
```

**Claims used:** C1, C2, C4, C11, C12.
**Why it works:** the candidate that does the stitching — three lessons presented as one
recurring pattern seen at three altitudes, which demonstrates systems thinking instead of
naming it. First person also fixes v3's weakest seam here: "cost me" is a claim only the
person can make, and it is what separates this from the same three observations posted by
someone who read them somewhere.
**Trade-off to weigh:** "I did not pick those up from reading" is the sharpest sentence in
the set and implicitly characterizes people who did. It answers the objection precisely; it
also has an edge. Worth deciding deliberately rather than by default.

---

### D — The synthesis

**Emphasis:** judgment as the thing the years produced.

```
I am an engineer who learned to architect systems and then to build the
organizations that own them - more than two decades of it, moving closer to the
work at each step rather than further from it. What accumulates from that is a
particular kind of judgment: I know what a design will cost to operate long
before anyone operates it, I can tell when the real constraint is organizational
rather than technical, and I see early where capability has quietly concentrated
into a few people and become a risk nobody has priced. What I do with that is
deliberate - ownership made explicit, expertise turned into shared practice,
decisions made on evidence and written down clearly enough to be followed
without a meeting, standards repeated until they are genuinely known. All of it
built in regulated environments, where a mistake reaches a patient, a regulator,
or the budget.
```

**Claims used:** C1, C2, C3, C4, C5, C11, C12.
**Why it works:** the fullest introduction of the five and the most complete answer to "who
is this." It names three specific perceptual strengths — cost-to-operate foresight,
constraint diagnosis, concentration risk spotted early — then shows the practice that
follows, so philosophy and method arrive as one thing. The three "I know / I can tell / I
see" clauses are the most direct ownership statement in the set.
**Trade-off to weigh:** the longest candidate. It rewards a reader who stays; it asks for
four sentences.

---

### E — Compact

**Emphasis:** confidence through compression.

```
More than two decades of engineering, architecture, and executive leadership,
and I have stayed close enough to the work at every level to know what a design
costs to operate and what an organization costs to run badly. My through-line is
systems thinking applied to people and delivery with the same seriousness I
apply to architecture: ownership made explicit, expertise made shared, decisions
made on evidence and written down, standards repeated until they are known. I
learned it in regulated environments, where a mistake reaches a patient, a
regulator, or the budget.
```

**Claims used:** C1, C3, C4, C5, C12.
**Why it works:** the shortest of the five, close to the 97-word paragraph it replaces, and the
brevity itself reads as authority — nothing is being oversold. "What an organization costs
to run badly" carries the whole operating-model argument in seven words.
**Trade-off to weigh:** states the through-line rather than demonstrating it, which is the
compromise brevity forces. The resume and portfolio links sit directly beneath it and carry
the evidence.

---

## 5. Claim sourcing

Every claim used above, traced to a repo source with its confidence — so the pick can be
defended, and so a later editing pass cannot upgrade a verb without new evidence.

| ID | Claim | Source | Confidence |
|---|---|---|---|
| C1 | Engineer → architect → executive, more than two decades | `resume-content.json` role history; executive-profile manuscript §2 | Verified |
| C2 | Dependence on particular individuals is a structural defect, not a strength | `sources/frameworks_and_principles/Guillermo_Salas_Leadership_Operating_Principles.md` ("systems over heroics"); evidence extraction §5.1, §6.1 | Verified — multi-source |
| C3 | Expert-held knowledge converted into shared practice; ownership made explicit | `case-study-devops-center-of-excellence.html`; `case-study-operating-model-transformation.html`; evidence extraction §3 | Verified |
| C4 | A standard nobody is aware of does not exist; alignment decays without deliberate repetition | Leadership operating principles ("communication has to be repeated to matter"); evidence extraction §5.4. Already live in `portfolio-content.json.summary` | Verified |
| C5 | Decisions run on evidence rather than assertion, and are written down | Leadership operating principles ("evidence over assumption"); evidence extraction §5.2, §2 | Verified |
| C9 | Rails built before acceleration; AI governed rather than adopted on enthusiasm | `case-study-security-rails-ai-security-posture.html`; leadership operating principles ("AI as force multiplier, not mandate"); evidence extraction §4 | Verified |
| C10 | Hands-on depth is what makes the leadership judgment trustworthy | `resume-content.json.builderResume.summary`; owner formulation 2026-09-05 | Verified |
| C11 | Teams own the whole system, including the parts that hurt | `case-study-owning-the-whole-system.html`. Already live in `portfolio-content.json.summary` | Verified |
| C12 | Regulated environments where a mistake reaches a patient, a regulator, or the budget | Already live in `resume-content.json.summary` | Verified |

**Retired and deliberately not replaced:** the Deming citation and the
missionaries/mercenaries framing (v2 C13, C14) — borrowed vocabulary, see §3. The
depletion/departure claim (v2 C8) is also out; it rested on a single working relationship
and no v3/v4 candidate needs it.

---

## 6. Do-not-use list

Carried forward so a later editing pass cannot silently reintroduce a retired claim:

- Employer names — `Experity` and every prior employer.
- Tech-stack shorthand — `.NET`, `SQL Server`, or any product name standing in for a career.
- `three decades` — the positioning decision is *more than two decades* (§1, defect 2).
- Org size, headcount, direct reports, team counts, employer performance metrics.
- `#1 U.S. urgent care platform` / `50% of the nation's clinics` — unsourced, excluded since
  the 2026-07-18 analysis.
- Product codenames per the `BANNED` list at `scripts/validate-mirrors.mjs:32`.
- The four constructed doctrine labels (`validate-mirrors.mjs:36`) — including the literal
  phrase *"show me your work"* in any casing. Express the idea, never the label.
- Evidence-ledger vocabulary (`validate-mirrors.mjs:47-50`) — public copy states what was
  done, never how well corroborated the underlying material is.
- `scripts/slop-scan.mjs` words — `arena` included.
- **Named thinkers, borrowed frameworks, and circulating industry tropes** — Deming,
  missionaries/mercenaries, elite strike teams, and their equivalents. The authority has to
  come from the record, not from a citation (§3).
- **Register:** clipped declarative fragments standing in for arguments; a vivid noun doing
  the work of a sentence; theses about how engineering organizations behave in place of an
  introduction of the person.
- **Perspective:** third person, and implied first person, on `index.html` (§3).

---

## 7. Propagation note

Whichever candidate is chosen, three follow-on decisions come with it:

1. **`index.html:247` is hardcoded** — the only published copy on the site not read from
   `portfolio-content.json` / `resume-content.json`. Applying the pick is a good moment to
   decide whether the paragraph should move into the content JSON so this page stops being
   the one unsourced surface.
2. **The site will now carry three grammatical perspectives on purpose**, and that should be
   a recorded decision rather than a drift: first person on `index.html`, subjectless
   implied first person in the case-study HTML, third person in
   `portfolio-content.json.summary`. The rationale is in §3 — the index is the person
   speaking; the other artifacts present a record. Worth confirming whether the executive
   portfolio hero should also move to first person, or stay a document about the record.
3. **`portfolio-content.json.hero.tagline`** ("Builds stronger leaders and stronger
   engineering systems.") sits one click from the index. If the index becomes first person,
   decide whether the tagline follows or stays deliberately impersonal.

Every candidate is a single paragraph and drops into the existing `<p class="description">`
with **no markup change**.

**Gates to run when the pick is applied to `index.html`:**

```
node scripts/slop-scan.mjs --strict index.html
node scripts/validate-mirrors.mjs
node scripts/dup-scan.mjs --cross
npm test
```

Then render-check via `npm run dev` or `file://index.html` — the card is width-constrained
at 600px with a 40px gutter.

---

## 8. Decision

| Candidate | Emphasis | Length | Pick |
|---|---|---|---|
| A | The arc, where each stage teaches the next | 145 words | ☐ |
| B | Strengths first, stated with authority | 136 words | ☐ |
| C | Lessons, and what they actually cost | 135 words | ☐ |
| D | The synthesis — judgment as what the years produced | 148 words | ☐ |
| E | Compact | 92 words | ☐ |

For reference, the live paragraph being replaced is 97 words.

**Owner notes / hybrid direction:**

>
