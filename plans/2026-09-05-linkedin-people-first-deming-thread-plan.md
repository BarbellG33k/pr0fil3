# LinkedIn Thread Plan — People First → Deming Systems Series

Status: outline for review, not yet drafted into posts.
Grounded in: `sources/frameworks_and_principles/`, `sources/evidence-extraction-salas-2026-09-03/sources/`.

## Thesis

"People first" is not a values slogan — it is a design constraint. Individuals
produce bursts of temporary excellence; systems are what make that excellence
repeatable, transferable, and survivable. Every post after #1 is a worked
example of what "people first" looks like once it's engineered into how
decisions, incidents, hiring, departures, and AI adoption actually get run —
not just declared.

## Cross-cutting rules for every post (content governance)

1. **No invented metrics.** The evidence files are explicit that most of
   these are documented *positions and decisions*, not measured outcomes
   (no incident-rate, retention, or cycle-time numbers confirmed). Say
   "here's the decision and the reasoning" — don't imply a quantified win
   that isn't sourced. See each case study's "What resulted" section.
2. **No identifying colleagues.** The leadership-notes corpus is anonymized
   third-person meeting summaries about real, current colleagues. Keep
   anecdotes generalized (role, not name) the way the source files already
   do.
3. **Hardship material is off-limits.** `Leadership_Operating_Principles.md`
   explicitly excludes personal-hardship pages from external use. If Post 1
   wants a "people first, unconditionally" anecdote, pull it from your own
   memory of a moment you're comfortable publishing — not from that corpus.
4. **Quote accuracy.** Two Deming quotes below are verified against The
   Deming Institute; one is widely attributed but unconfirmed against his
   published books — flagged per-post. Don't publish an unverified quote
   as a direct citation without your own gut-check.

---

## Post 1 — People First (the thesis)

**Core message:** People first means building the system that multiplies
people, not leaning on the people who are already strong.

- Individuals are short-term bursts; systems are the multiplier that turns
  one person's star quality into an organization's durable capability.
- Two senses of "people first" worth separating in the post: (a) unconditional
  — when hardship hits, work bends around the person, not the reverse; (b)
  structural — a team that depends on any one person's excellence to function
  is a team that has already failed that person.
- This post is the thesis statement for the whole thread — say explicitly
  that every following post is "what this looks like in practice."

**Anecdote slot:** Situation / Hypothesis / Guidance / Outcome — supply your
own, per governance rule #3 above. Good candidate shape: a moment where you
protected someone's time/well-being at a real cost to a delivery date, and
what that decision signaled to the team afterward.

---

## Post 2 — "A bad system will beat a good person every time" (Deming)

**Verified** — W. Edwards Deming, spoken at a Deming Four-Day seminar,
Phoenix, Feb 1993 (per The Deming Institute; not from his published books,
but institute-confirmed as his). Note for the post: the common paraphrase
"a bad *process* beats a great person" drifts from his actual word, *system*
— worth using the real line, it's sharper.

**Core message:** Bridge from Post 1's people-first thesis to systems
thinking — people-first doesn't mean "hire heroes and hope," it means
building systems so good people succeed by default instead of by strain.

- The folk version says "process," Deming said "system" — systems are bigger
  than process: org design, incentives, role definition, not just steps.
- Connect to your own written artifact: the Engineering Maturity &
  Accountability Manifest (Feb 2026) — effort isn't impact; senior people
  quietly absorbing a broken system *is* the system failing them.
- Tee up the rest of the series explicitly: "the next several posts are what
  building the system instead of leaning on the person looks like."

**Anecdote slot** (source: `Guillermo_Salas_Framework_Engineering_Maturity_Accountability_Manifest.md`):
- Situation: high-effort, repeated individual rescue behavior from strong
  architects/seniors was being read as strong performance.
- Hypothesis: rewarding heroics reinforces exactly the wrong pattern —
  ownership stays ambiguous, root causes stay hidden.
- Guidance: separated role-appropriate execution from leadership-level
  impact; tied senior-role calibration to organizational impact, not effort;
  named the pattern in writing.
- Outcome (documented, not metric-confirmed): codified and adopted as a
  stated leadership-team position; independently corroborated across four
  working relationships and 8+ months. No measured downstream change in
  burnout/delivery confirmed — say so if asked, don't imply it.

---

## Post 3 — The No-Heroes Standard

**Core message:** Not a Deming quote — your own attested language. "People
should not be given opportunities to become heroes." Reframe heroics as
telemetry of a design defect, not proof of strength.

- Three moves, worth listing as the post's spine: (1) refuse the reward —
  no hero projects, no rescue-culture incentives; (2) redesign the slot —
  when someone over-concentrates, restructure the role, don't replace
  like-for-like; (3) institutionalize the knowledge — documentation and
  centers of excellence over tribal expertise.
- Line worth using verbatim-ish: "I'd rather have a boring quarter than a
  heroic one."

**Anecdote slot** (source: `case-study-devops-center-of-excellence.md`):
- Situation: critical DevOps knowledge concentrated in a few individual
  experts — classic key-person risk.
- Hypothesis: consolidating leadership and documenting standards removes the
  single point of failure; reshuffling reporting lines alone would not.
- Guidance: stood up a DevOps Center of Excellence with defined
  responsibilities, standards, and governance; consolidated leadership.
- Outcome: decision executed and restated three weeks later in a
  company-facing org-change meeting. No incident-rate or knowledge-transfer
  metric confirmed — frame as a structural decision, not a measured win.

---

## Post 4 — Rails Before Speed

**Core message:** Speed is earned by guardrails, not granted by hustle — and
the discipline is symmetric: add rails where missing, remove them where
they've become ritual.

- "Build the rails before accelerating" — testing, monitoring, release
  process, rollback capability, so teams can move fast *with* confidence,
  not instead of it.
- "Roll forward" incident posture — with real CI/CD, regression coverage,
  and staging validation, the default is fixing forward, not reflexive
  rollback. Rollback is a tool, not a posture.
- The symmetric half most people skip: challenging code-freeze gates or
  compliance-measurement that no longer earns its cost. A gate has to earn
  its place, same as a new one does.

**Anecdote slot** (source: `framework-rails-before-speed.md`): pick either
the "build the rails" moment or the gate-removal moment — Situation
(team wants speed / gate is ritual) → Hypothesis → Guidance → Outcome
(adopted position; no quantified deployment-frequency or incident-reduction
number confirmed).

---

## Post 5 — Show Me Your Work

**Core message:** Nothing advances on assertion — proposals, incidents, and
your own initiatives all clear the same evidence bar.

- The six-question gate for any proposal: problem, friction, benefit, risk,
  mitigation, ROI.
- Incidents get investigated with logs and metrics before hypotheses — "no
  wild goose chases."
- The symmetry point is the strongest part of this post: your own AI
  infrastructure work arrived as an *assessment*, not a proposal — value,
  cost, ownership, maintenance, examined before committing to it yourself.

**Anecdote slot** (source: `case-study-ai-adoption-operational-capability.md`):
- Situation: AI tooling risked staying at pilot/curiosity stage inside one
  team.
- Hypothesis: framing the work as repeatable, business-value systems (not
  isolated experiments) is what turns a pilot into a capability.
- Guidance: pushed active adoption with measurable usage goals; defined the
  "ambition test" — adoption is working when commitments get *bigger*, not
  just faster.
- Outcome: doctrine and directives documented; no adoption-rate or
  throughput metric confirmed.

**Optional quote pairing — use with caution:** "In God we trust; all others
must bring data" is widely attributed to Deming but *unconfirmed* against
his published work or a dated source. Fine to use as "a line often
attributed to Deming" if you want it, but don't cite it as a hard quote.

---

## Post 6 — Perception Becomes Reality

**Core message:** A standard nobody's aware of effectively doesn't exist —
communication is a quality mechanism, not a soft skill layered on top of
the real work.

- Alignment decays by default and needs deliberate, repeated reinforcement
  — not a one-time announcement.
- "Tell the complete story": priorities, sequencing, tradeoffs, rationale —
  not yes/no answers. Yes/no is where understanding goes to die.
- Pre-structured communication as infrastructure: FAQs with prepared
  answers before a contentious change ships, not written reactively after.

**Anecdote slot:** pull your own — a standard or decision you had to repeat
in close to the same words across multiple audiences/contexts before it
actually landed, and what changed once it did.

---

## Post 7 — Departure as Design Signal

**Core message:** A departure is telemetry about the structure, not a
retention negotiation to win.

- When someone leaves, the first question is "what does this tell us about
  the structure?" — not "how do we keep them."
- Redesign the vacated role to distribute ownership rather than replace
  like-for-like.
- Burnout-driven exits get named as *organizational* process failure, not
  individual shortcoming — this is the moral core of the post, don't skip it.
- **Craft note from the source review:** pair the "move decisively" doctrine
  with genuine acknowledgment of the loss — stated alone, "restructure,
  don't retain" reads cold. The regret is what keeps it honest.

**Anecdote slot** (source: `case-study-consultative-role-transition.md`,
generalized — do not identify the individual): a senior technical role
moved deliberately from operational owner to consultative advisor, with an
explicit, orderly ownership handoff, rather than the person staying the
single point of ownership indefinitely.

---

## Post 8 — Hiring as a System, Not a Series of Opinions

**Core message:** A hiring chain is a system; every link — recruiter, JD,
interviewer, hiring manager — has to encode the same standard, or the
strongest interviewer's opinion becomes the whole bar.

- Diagnosed a disconnect across recruiters, JDs, interviewers, and
  engineering expectations — and fixed the chain, not one weak link.
- Anti-title-inflation stance: title inflation dilutes what an engineering
  role actually means.
- One interviewer's read, or a single mistake, doesn't get to decide a
  candidate — contested calls go to structured, multi-signal assessment.
- Standards get *calibrated* to market, never *lowered* for cost or
  geography.

**Anecdote slot** (sources: `case-study-hiring-alignment-intervention.md`
and `case-study-gcc-capability-not-cost.md`):
- Situation: growing engineering capacity through an offshore office risked
  becoming a cost play with a diluted bar.
- Hypothesis: treating new hires as full team members (not "offshore
  resources") and holding the bar against budget pressure builds durable
  capability instead of cheap capacity.
- Guidance: measured rollout with learning phases; hiring bar held
  regardless of geography; standards calibrated to market, not lowered;
  chain-wide competency frameworks after diagnosing the disconnect.
- Outcome: documented strategic stance and hiring-process intervention; no
  headcount, retention, or quality-of-hire metric confirmed.

---

## Post 9 — AI as Force Multiplier, Not Mandate

**Core message:** AI earns adoption the way anything else does — evidence,
not enthusiasm — and the real test isn't speed, it's ambition.

- Personal adoption before mandate: credible AI leadership starts with your
  own hands-on use, not a directive from above.
- AI is an accelerator, not a substitute for judgment — the engineer stays
  accountable for validating the result.
- The "ambition test": adoption is working when the organization takes on
  *bigger* commitments, not just the same work faster.
- Challenge decisions that add oversight layers without adding hands-on
  capacity — that's management-theater, not force multiplication.

**Anecdote slot** (source: `case-study-ai-adoption-operational-capability.md`
+ `Guillermo_Salas_Framework_AI_Era_Transformational_Leadership.md`): same
case as Post 5 if you want continuity, or use the "reversed an initial
no-AI stance within the organization" proof point from the transformational
leadership framework as a distinct story.

---

## Post 10 — Closing / Synthesis (back to People First)

**Core message:** Tie the whole thread back to the opener — every doctrine
above is what "people first" looks like when it's engineered into a system
instead of declared as a value.

- Leadership is influence, not authority — management is one expression of
  leadership, not its definition.
- Greater leadership responsibility means less direct individual
  contribution, not more — the multiplier effect compounds through others.
- Explicit callback line: "None of the last nine posts were really about
  process. They were about what it takes to actually put people first when
  it's inconvenient."

**Anecdote slot:** personal reflection — no case study needed. Good close
for a CTA (what you're looking for next, or an invitation to discuss).

---

## Sequencing notes

- 10 posts supports either a 2x/week cadence (~5 weeks) or an every-other-day
  cadence (~3 weeks). Given the thesis-then-payoff structure, don't post
  faster than every other day — Post 1 needs time to land before Post 2
  references it.
- Posts 2–9 don't strictly require Deming-anchor quotes on every one — only
  Posts 2 and (optionally, with the caveat) 5 use a Deming line directly.
  The rest are your own attested frameworks; resist the urge to force a
  Deming quote onto all ten just for series consistency.
- Before publishing Posts 3, 7, and 8 in particular, re-check them against
  `Leadership_Operating_Principles.md`'s evidence boundary and the
  anonymization convention already used in the source case studies.
