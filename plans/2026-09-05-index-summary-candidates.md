# `index.html` Identity Statement — Candidate Set

**Date:** 2026-09-05
**Status:** Candidates for owner review. No public artifact modified.
**Target:** the `.description` paragraph at `index.html:247`.
**Decision required:** pick one (or direct a hybrid) in the Decision block at the bottom.
**Revision:** v6 — F and G (unslopped from owner Options 3 and 4) are the leading candidates.

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
`resume-content.json`. See §8.

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
- **Format: two paragraphs, 200+ words.** Owner directive, 2026-09-05: the longer form
  communicates better because it does not try to do too much in one space and avoids
  concept crowding. Candidates F and G are the format; A–E are retained as source material
  for lines rather than as shippable options.

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
organizations since, and each stage taught me something the next one needed.
None of it was learned in the abstract.
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
The anti-concentration principle arrives in the final clause as something the career
produced rather than a slogan the reader is asked to accept.
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

### F — The pragmatic craftsman at scale *(217 words, two paragraphs)*

Unslopped from owner Option 3 (§5). **Leading candidate.**

```
I began as a software engineer, moved into enterprise architecture, and have led
engineering organizations ever since. Staying anchored to the work across more
than two decades taught me that technical failures are almost always
organizational design flaws in disguise. What accumulates from that is a
particular kind of judgment. I recognize what a system will demand in
maintenance and operational overhead long before it ever sees production
traffic. I can tell when the constraint a team is fighting is organizational
rather than technical. And I notice when crucial domain knowledge has quietly
concentrated into a handful of engineers, creating fragile dependencies that
nobody has factored into the risk model.

My response to that risk is structural. I do not build bloated org charts; I
develop leaders who understand their mandate and can act on it without me. I
expect technical decisions to be reasoned through on evidence and written down
clearly enough that teams move forward without waiting for permission or an
explanatory meeting. When I bring in new capability, from distributed
architectures to AI-assisted workflows, I set the operational boundaries first
and measure utility rather than chasing industry novelty. It is a philosophy
formed in regulated environments, where a mistake is never an abstract metric -
it reaches a patient, an auditor, or the balance sheet.
```

**Claims used:** C1, C2, C3, C4, C5, C9, C12.

**Unslop change log** — what was cut from Option 3 and why. Everything not listed is the
owner's wording, unchanged.

| Change | Reason |
|---|---|
| Cut *"That progression was deliberate."* | Announces significance instead of demonstrating it — the same move as the newly banned phrase. |
| *"an instinctive, hard-won judgment"* → *"a particular kind of judgment"* | "Hard-won" is a cliché intensifier, and "instinctive" contradicts the clause before it: judgment that accumulates over two decades is the opposite of instinctive. |
| Cut *"over that tenure"* | Corporate-flat filler; "what accumulates from that" already points at the two decades. |
| *"Just as critically,"* → *"And"* | Stock connective that rates the item instead of stating it. |
| *"transitioned into"* → *"moved into"* | Résumé verb in a paragraph that is otherwise plain speech. |
| *"with genuine autonomy"* → *"and can act on it without me"* | Replaces an empty intensifier with the actual test of autonomy, and puts it in first person. |
| *"written down with absolute clarity, and made accessible enough that teams move forward"* → *"written down clearly enough that teams move forward"* | "Absolute clarity" is an empty intensifier, and the two clauses were saying the same thing twice. |
| *"modern capabilities"* → *"new capability"*; *"measure real utility"* → *"measure utility"* | "Modern" and "real" are filler adjectives doing no work. |
| *"an oversight is never an abstract metric"* → *"a mistake is never an abstract metric"* | "Oversight" is ambiguous — a lapse or a supervisory function — in the one sentence where precision matters most. |
| **Added:** *"I can tell when the constraint a team is fighting is organizational rather than technical."* | Restores the length the cuts removed with a sourced claim (C2, C3) rather than padding, and completes the diagnostic triad the paragraph was building. |

---

### G — Systems, people, and accountability *(208 words, two paragraphs)*

Unslopped from owner Option 4 (§5). **Leading candidate.**

```
Over more than two decades I have worked at every level of this discipline:
writing production code, designing multi-system enterprise architectures, and
directing engineering organizations. I stayed close enough to the day-to-day
work to know that you cannot fix an architecture without fixing how teams
collaborate, and you cannot repair an organization with empty process. Both live
in the same place, which is where I work: I can dissect an architectural
bottleneck alongside staff engineers in the morning and weigh capital
allocation, organizational topology, and risk posture with the executive team in
the afternoon.

Sustainable engineering does not depend on individual rescue; it depends on how
deliberately the work is structured. I make domain ownership explicit, turn
private expertise into common practice, repeat a standard until it is genuinely
known rather than merely published, and see that key technical choices are
documented with enough rigor that anyone can act on them without a scheduled
alignment session. When something like AI tooling arrives, I look past the
enthusiasm, set the operational boundaries, and judge the tools on evidence and
security posture rather than on momentum. Every standard I hold was built under
the pressure of regulated environments, where a mistake reaches a patient, a
regulator, or the operating margin.
```

**Claims used:** C1, C2, C3, C4, C5, C9, C12.

**Unslop change log** — what was cut from Option 4 and why. Everything not listed is the
owner's wording, unchanged. "Capital allocation" is retained per the owner decision in §5.

| Change | Reason |
|---|---|
| Cut *"in technology"*; *"every tier of the discipline"* → *"every level of this discipline"* | "In technology" is redundant after "writing production code"; "tier" is jargon where "level" is plain. |
| Cut *"modern"* from *"directing modern engineering organizations"* | Filler adjective. |
| *"nor can you repair"* → *"and you cannot repair"* | The "nor" inversion is stilted in a first-person paragraph. |
| *"The real work sits at the intersection. That background gives me a distinct vantage point:"* → *"Both live in the same place, which is where I work:"* | Two stock phrases plus an announcement of value before delivering it. The morning/afternoon sentence proves the range on its own and does not need to be introduced. |
| Cut *"I hold a straightforward view of leadership."* | Throat-clearing by definition — a sentence announcing that the next sentence is a view. |
| *"individual heroics"* → *"individual rescue"* | Banned word family (§7); "rescue" carries the identical meaning without it. |
| *"common organizational practice"* → *"common practice"* | Filler. |
| *"When navigating shifts like the emergence of AI tooling"* → *"When something like AI tooling arrives"* | "Navigating shifts" is slop; the plain verb is stronger and shorter. |
| *"judging tools by verifiable throughput and security"* → *"judge the tools on evidence and security posture"* | "Throughput" invites association with the code-output figures, which are restricted directional metrics — a claim this sentence should not imply. "Evidence" is the actual standard and is sourced (C5). |
| *"mistakes have immediate, tangible consequences—reaching a patient"* → *"a mistake reaches a patient"* | Two filler adjectives standing in front of the consequence that is already doing the work. |
| **Added:** *"repeat a standard until it is genuinely known rather than merely published"* | Restores length with a sourced claim (C4) rather than padding. |

---

## 5. Owner-supplied options (2026-09-05)

Four further options supplied by Guillermo, held here verbatim as drafting input while he
combines the strongest portions of the full set into his own version. **Provenance: these
are the owner's, not drafted from the evidence sources in this repo**, so the review below
checks them against the same gates and ledger constraints rather than assuming compliance.

All four pass `slop-scan.mjs` and every `validate-mirrors.mjs` banned regex. Four findings
were raised; **all four are now resolved by owner decision (2026-09-05)**, and Options 3 and
4 have been carried into §4 as candidates F and G with the agreed edits applied. Options 1
and 2 are retained below as a source of lines, not as shippable drafts.

| Finding | Where | Resolution |
|---|---|---|
| **"heroics"** | Options 2, 4 | **Accepted — removed.** Owner agreed the flag was correct. Candidate G uses "individual rescue"; the ban now covers every inflection (§7). |
| **"proven"** | Option 1 | **Accepted — removed.** Owner: "'proven' is slop, remove." It claimed verification the material does not carry — the record documents decisions and positions, not measured outcomes. Not carried into F or G. |
| **"capital allocation"** | Option 4 | **Overruled — retained.** Owner decision: it tracks and fits in context. No dollar figures appear, and the activity, influence, and responsibility justify the phrase. Kept verbatim in candidate G. The standing never-use on **P&L ownership** and on the $4.8M/$23M figures is unaffected. |
| **Length and format** | Options 3, 4 | **Overruled — the format is now the requirement.** Owner: the 200+ word, two-paragraph form "allows to communicate better without trying to do too much in one space and avoids concept crowding." Recorded as a directive in §2; F and G are 217 and 208 words. |

Minor: Options 1, 3, and 4 use em dashes (—); the current site copy uses spaced hyphens
( - ) throughout. Candidates F and G follow the site convention.

### Option 1 — the diagnostic and operating weight *(146 words)*

```
I spent my career moving closer to the root of the problem: writing systems,
designing their architectures, and shaping the organizations that run them. More
than two decades of staying close to that work taught me that organizational
friction and technical debt share the same origin. What that produces is an
earned sense of diagnostic judgment. I can tell when an architecture will strain
an operating model years down the road, and I spot where capability has quietly
concentrated into a few key individuals before it turns into institutional risk.
My focus as an executive is building teams that hold their own weight: making
ownership unmistakable, putting reasoning into writing so execution never stalls
on a meeting, and testing modern tooling - including AI - against evidence
rather than industry momentum. All of it was proven in regulated environments,
where a failure reaches a patient, a regulator, or the budget.
```

**Standout:** "organizational friction and technical debt share the same origin" is the
single best compression of the systems argument produced in any round — it states the
diagnostic insight as a finding rather than a position. "Teams that hold their own weight"
is the mature replacement for the hero framing.

### Option 2 — the architect-executive balance *(131 words)*

```
I am an engineer who learned to architect systems and lead the people who build
them. Over more than two decades, I never stepped away from the engineering
reality: understanding code made me a better architect, and architecting complex
systems taught me how to lead organizations without relying on heroics. I focus
on the structural mechanics of delivery. I make boundaries clear, convert
specialized knowledge into shared practice, and insist that technical decisions
carry written justification robust enough to guide execution without debate.
When evaluating new practices or emerging capabilities like AI, I establish
operational safeguards and demand verifiable utility before scaling adoption.
The standard I set is direct and unpretentious, shaped entirely in regulated
environments where an unhandled edge case directly impacts a patient, an
auditor, or the bottom line.
```

**Standout:** "an unhandled edge case directly impacts a patient, an auditor, or the bottom
line" is the strongest variant of the consequence clause in the whole set — it names the
mechanism of failure rather than the abstraction. "Direct and unpretentious" is a rare thing
to claim credibly and it reads as true here.

### Option 3 — the pragmatic craftsman at scale *(210 words, two paragraphs)*

```
I began as a software engineer, transitioned into enterprise architecture, and
have led engineering organizations ever since. That progression was deliberate.
Staying anchored to the work across more than two decades taught me that
technical failures are almost always organizational design flaws in disguise.
What accumulates over that tenure is an instinctive, hard-won judgment. I
recognize what a system will demand in maintenance and operational overhead long
before it ever sees production traffic. Just as critically, I notice when crucial
domain knowledge has quietly concentrated into a handful of engineers, creating
fragile dependencies that nobody has factored into the risk model.

My response to that risk is practical and structural. I do not build bloated org
charts; I develop leaders who understand their mandate and can operate with
genuine autonomy. I expect technical decisions to be reasoned through on
evidence, written down with absolute clarity, and made accessible enough that
teams move forward without waiting for permission or an explanatory meeting.
When bringing in modern capabilities, from distributed architectures to
AI-assisted workflows, I establish clear safeguards and measure real utility
rather than chasing industry novelty. It is a philosophy formed in regulated
environments, where an oversight is never an abstract metric - it reaches a
patient, an auditor, or the balance sheet.
```

**Standout:** "technical failures are almost always organizational design flaws in disguise"
and "fragile dependencies that nobody has factored into the risk model" — both put the
concentration argument in the vocabulary of risk management rather than of team dynamics,
which is a more executive register than anything in §4. "I do not build bloated org charts;
I develop leaders" is the sharpest statement of the leadership philosophy anywhere in the
set.

*Note: "That progression was deliberate" is doing the same work as the newly banned "and the
sequence matters," in different words. It is more defensible because it makes a claim about
intent rather than announcing significance — but it is worth a deliberate keep-or-cut.*

### Option 4 — systems, people, and accountability *(207 words, two paragraphs)*

```
Over more than two decades in technology, I have worked at every tier of the
discipline: writing production code, designing multi-system enterprise
architectures, and directing modern engineering organizations. I stayed close
enough to the day-to-day work to know that you cannot fix an architecture
without fixing how teams collaborate, nor can you repair an organization with
empty process. The real work sits at the intersection. That background gives me
a distinct vantage point: I can dissect an architectural bottleneck alongside
staff engineers in the morning, and evaluate capital allocation, organizational
topology, and risk posture with the executive team in the afternoon.

I hold a straightforward view of leadership. Sustainable engineering does not
depend on individual heroics; it depends on how deliberately the work is
structured. I make domain ownership explicit, turn private expertise into common
organizational practice, and ensure key technical choices are documented with
sufficient rigor that anyone can act on them without scheduled alignment
sessions. When navigating shifts like the emergence of AI tooling, I look past
enthusiasm, instituting operational boundaries and judging tools by verifiable
throughput and security. Every standard I hold was built under the pressure of
regulated environments, where mistakes have immediate, tangible consequences -
reaching a patient, a regulator, or the operating margin.
```

**Standout:** the morning/afternoon sentence is the most concrete proof of range in any
candidate — it demonstrates the architect-executive claim by describing a day instead of
asserting a capability. "You cannot fix an architecture without fixing how teams
collaborate, nor can you repair an organization with empty process. The real work sits at
the intersection." is the clearest statement of the through-line that has been written for
this page.

---

## 6. Claim sourcing

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

## 7. Do-not-use list

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
- **Banned expressions** (owner, 2026-09-05):
  - *"and the sequence matters"* in any form — self-congratulatory throat-clearing that
    announces significance instead of demonstrating it. If the sequence matters, the
    sentences after it will show that. Removed from candidate A on this pass.
  - *"clean"* as a quality enhancer — an adjective that asserts craft rather than
    evidencing it. (Unrelated to `SLOP SCAN: CLEAN`, which is tool output, not copy.)
  - *"landed"* / *"lands"* as an outcome enhancer — implies a result was achieved without
    stating what it was. Use the actual outcome, or say nothing.
  - The **hero family** — `hero`, `heroic`, `heroics`. Rejected in v1 as cheesy; the ban
    extends to every inflection, not just the noun.
- **Register:** clipped declarative fragments standing in for arguments; a vivid noun doing
  the work of a sentence; theses about how engineering organizations behave in place of an
  introduction of the person.
- **Perspective:** third person, and implied first person, on `index.html` (§3).

---

## 8. Propagation note

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

## 9. Decision

| Candidate | Emphasis | Length | Pick |
|---|---|---|---|
| **F** | **The pragmatic craftsman at scale** — unslopped Option 3 | **217 words, 2 paras** | ☐ |
| **G** | **Systems, people, and accountability** — unslopped Option 4 | **208 words, 2 paras** | ☐ |
| A | The arc, where each stage teaches the next | 140 words | ☐ |
| B | Strengths first, stated with authority | 136 words | ☐ |
| C | Lessons, and what they actually cost | 135 words | ☐ |
| D | The synthesis — judgment as what the years produced | 148 words | ☐ |
| E | Compact | 92 words | ☐ |

F and G meet the two-paragraph, 200+ word directive in §2 and are the shippable options.
A–E predate that directive and are kept as a source of lines for a hybrid. The live
paragraph being replaced is 97 words.

**Owner notes / hybrid direction:**

>
