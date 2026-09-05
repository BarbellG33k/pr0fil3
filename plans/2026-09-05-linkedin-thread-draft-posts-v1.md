# LinkedIn Thread — Draft Posts v1 (candidate drafts, not final copy)

Companion to `plans/2026-09-05-linkedin-people-first-deming-thread-plan.md`.
Purpose of this file: give you something concrete enough to react against —
agree with, rewrite, or throw out — for each of the 10 posts. These are
scaffolds, not finished copy. Every `[ANECDOTE: ...]` bracket is a slot for
your own memory; nothing in brackets should ever ship as written.

Format note: each draft is in a fenced block so line breaks are exact and
you can paste straight into LinkedIn's editor without re-formatting.

---

## Post 1 — People First (the thesis)

**Structural note:** Hook opens on the tension (slogan vs. constraint), not
a personal story — the anecdote lands in the middle as proof, not the open.
Closes by explicitly naming this as post 1 of a series, so readers opt in.

```text
"People first" gets said in more all-hands meetings than it gets designed
into anything.

Here's what I mean by it, literally.

A person is a burst. Even a great one. They have a good quarter, a good
year, a run of right calls — and then they get promoted, they leave, they
have a kid, they burn out, they're just having an off month. That's not a
flaw in them. That's what being a person is.

A system is the thing that takes what was good about that burst and makes
it repeatable after the person who created it has moved on to something
else.

[ANECDOTE: a real moment where you protected someone's time or well-being
at a real cost — a slipped date, a reassigned deliverable, whatever it
actually was. What did you decide, and what did it cost the team in the
short term? Keep this one from your own memory, not from any internal
notes — this is the one story in this whole series that has to be
unimpeachably yours.]

That's the version of "people first" I actually believe in. Not "we care
about our people" on a values slide. The harder version: building the
system so that caring about someone doesn't require a hero to absorb the
cost of it.

This is post 1 of a short series on what that looks like when it's
actually engineered in — hiring, incidents, AI adoption, even how I think
about someone leaving. Starting next with a line from W. Edwards Deming
that I think about more than almost anything else in how I run
engineering.
```

---

## Post 2 — "A bad system will beat a good person every time" (Deming)

**Structural note:** Opens with the corrected quote itself as the hook (a
common misquote is a legitimate scroll-stopper — "you've probably heard
this wrong" is an established hook pattern). Middle section does the
work of connecting it to your own written Manifest. Close ties back to
post 1's thesis explicitly.

```text
You've probably seen this quote as "a bad process beats a great person
every time."

That's not what he said. W. Edwards Deming's actual line, from a seminar
in 1993: "A bad system will beat a good person every time."

System, not process. That's a bigger claim. A process is a set of steps.
A system is the whole structure around a person — the incentives, the
role design, who's accountable for what, what gets rewarded versus what
gets quietly absorbed.

That last part is the one that got me. A few years ago I put something in
writing that still shapes how I run engineering: [ANECDOTE: the moment
that led to writing the Engineering Maturity & Accountability Manifest —
what pattern were you actually seeing in your strongest people that
prompted it? Name the pattern, not the person.]

The instinct is to read that as heroics — someone capable enough to keep
making the symptom disappear. It isn't. It's the system failing that
person quietly, over and over, and everyone around them calling it
strength.

Effort isn't impact. If your best people are spending their effort
compensating for a broken system, the system is what's broken — not
them, and not their effort.

This is what "people first" (post 1) actually requires: build the system
good enough that good people don't have to be heroic just to keep it
running.
```

---

## Post 3 — The No-Heroes Standard

**Structural note:** Leads with the attested line in quotes as a
stand-alone hook sentence — deliberately blunt, meant to be
disagreed-with in the comments. Three-part body mirrors the three moves
(refuse / redesign / institutionalize) as a visible list, which also
reads well in LinkedIn's algorithm-favored short-paragraph format.

```text
"People should not be given opportunities to become heroes."

I say this to my team more than almost anything else, and it always gets
pushback the first time. Heroics feel like the opposite of a problem.
Someone stayed up all night and saved the release — isn't that exactly
what you want?

No. It's evidence something upstream already failed.

Here's the standard, in three moves:

Refuse the reward. No hero projects, no after-hours rescue as a path to
recognition. Rewarding the save teaches everyone to wait for the
emergency instead of preventing it.

Redesign the slot. When one person is carrying something critical alone,
that's not a compliment to their reliability — it's a defect to
engineer out. Redistribute the ownership, don't just thank them harder.

Institutionalize the knowledge. Whatever's living in one person's head
gets documented, standardized, and shared, on purpose, before it becomes
a crisis instead of a project.

[ANECDOTE: the Center of Excellence decision — what was the actual
key-person risk you saw, and what did standing up the CoE change about
how the team operated day to day?]

I'd rather run a boring quarter than a heroic one. A boring quarter means
the system is doing its job.
```

---

## Post 4 — Rails Before Speed

**Structural note:** Opens with a false binary ("speed vs. safety") and
immediately breaks it — a classic reframe hook. Uses the two named
postures (rails-before-accelerating, roll-forward) as subheads via bold
line-openers so it scans as a two-part framework, not a wall of text.

```text
"Move fast" and "be careful" get treated like opposite instructions.

They're not. You can only actually move fast because you were careful
first.

Build the rails before you accelerate. Testing, monitoring, a real
release process, a rollback path that's been exercised, not just
documented. Rails aren't the thing slowing you down — they're the reason
you can go fast without flinching every time you ship.

Roll forward, not back. Once those rails are real — CI/CD, regression
coverage, staging that means something — the default response to a
production issue is fixing it forward, not reverting to yesterday.
Rollback stays a tool in the kit. It stops being the reflex.

[ANECDOTE: the specific moment you either added rails before a team
could move faster, or pulled a gate that had turned into ritual —
what was the gate, and what changed once it was gone or added?]

The part people don't expect: I remove rails as often as I add them. A
gate that made sense two reorgs ago and doesn't earn its cost anymore is
just drag with better branding. A rail has to earn its place, same as a
new one does.
```

---

## Post 5 — Show Me Your Work

**Structural note:** Opens on the phrase as a direct-address challenge
("my default question"), then the six-question gate is laid out as an
actual checklist people can screenshot and reuse — a shareable artifact
inside the post, which tends to travel further than prose alone. Closes
on the symmetry point, which is the most differentiated idea in the post
and deserves the last word.

```text
My default question when someone brings me a proposal: show me your
work.

Not "convince me." Show me. Six things, every time:

What's the problem.
What's the actual friction today.
What's the benefit.
What's the risk.
How do we mitigate it.
What's the ROI.

A proposal that's persuasive but hasn't answered those isn't ready. It's
a pitch. I want the evidence, not the confidence.

Same bar on incidents. Logs and metrics before hypotheses — no wild
goose chases chasing a theory nobody's checked against the data yet.

[ANECDOTE: the AI-adoption moment — what did "repeatable systems, not
isolated experiments" actually look like for that team, and what was
the "ambition test" moment where you knew adoption was real and not
just faster typing?]

Here's the part that keeps it honest: I hold my own initiatives to the
same gate. Our AI infrastructure work didn't arrive as a proposal I made
to the team — it arrived as an assessment. Value, cost, ownership,
maintenance, examined before I committed to it myself. If I'm going to
ask for evidence, I have to bring my own first.
```

---

## Post 6 — Perception Becomes Reality

**Structural note:** Opens with the counterintuitive claim stated flatly,
then immediately defines it, then demonstrates it with the "tell the
complete story" reframe. This one leans more instructional/listicle in
the middle, which suits a communication-about-communication topic —
practice what you're describing.

```text
A standard nobody knows about doesn't exist. It doesn't matter that it's
written down somewhere.

Perception becomes reality inside organizations. Not as a cynical
statement — as an operating fact. If people aren't aware of a standard,
they're not violating it when they miss it. They never had it.

Which means alignment isn't a thing you achieve once. It decays by
default, and it needs deliberate, repeated reinforcement — the same
message, close to the same words, across different rooms, more times
than feels necessary to you and exactly the right number of times for
everyone hearing it for the first or second time.

The other half of this: tell the complete story. Priorities, sequencing,
tradeoffs, the actual rationale — not a yes or no. A yes/no answer is
where understanding goes to die, because it gives people a decision
without giving them the reasoning they'd need to make the next ten
decisions themselves.

[ANECDOTE: a specific standard or decision you had to repeat, in close
to the same language, across multiple audiences before it actually
landed — what was it, and what changed once it stuck?]

Communication isn't the soft part of the job I do around the real
engineering work. For me, it's a quality mechanism, same category as
tests and monitoring. Treat it like anything else you'd measure.
```

---

## Post 7 — Departure as Design Signal

**Structural note:** This is the post most likely to misfire if it reads
cold, per the source review's own caution — so the structural choice is
to put the acknowledgment of loss *before* the doctrine, not after, so
the framework doesn't arrive first and the feeling second. Closes on the
doctrine, but only after the human beat has been earned.

```text
Losing someone good is not something I get used to, and I don't think
you're supposed to.

But the question I ask right after the human one — how do we support
them, what do they need from me — is a structural one: what does this
departure tell me about how we built the role?

Because here's what I've come to believe: a departure is telemetry, not
a negotiation to win. When someone's decided to leave, I don't spend my
energy trying to talk them out of it. I move toward the next phase —
redesign the role, hire strong, keep going.

[ANECDOTE: the role redesign — a senior technical role that moved from
one person owning it operationally to a consultative, shared model.
What was the actual handoff, and what made it deliberate rather than
reactive? Keep this generalized — no names, no identifying detail.]

And when the departure is a burnout exit — when the organization asked
too much for too long and someone finally had enough — that's not a
story about their commitment. That's the organization failing them.
I'd rather own that plainly than let it get quietly filed under
"personal reasons."

Redesign the structure. Hire well. Own what was ours to own.
```

---

## Post 8 — Hiring as a System, Not a Series of Opinions

**Structural note:** Opens by naming the failure mode (chain, not link)
directly, uses a short enumerated chain visual (recruiter → JD →
interviewer → hiring manager) which is legitimate here because it's an
actual sequence, and closes on the anti-title-inflation / anti-cost-cut
line since that's the most quotable, sharable position in the post.

```text
A bad hire is rarely one person's bad call. It's usually five decent
calls made by five different people who were never actually aligned on
what "good" meant.

Recruiter, job description, first-round interviewer, panel, hiring
manager — that's a chain, not five independent judgments. If each link
is calibrated to a different bar, the candidate who gets hired is
whoever happened to hit the weakest link.

[ANECDOTE: the hiring-alignment diagnosis — what was the actual
disconnect you found across the chain, and what did fixing it look
like in practice — the competency frameworks, the structured
assessment for contested candidates?]

Two things I hold the line on, hard, regardless of budget pressure or
where the role is:

Standards get calibrated to a market, never lowered for one. Growing a
team somewhere new is not a license to hire a worse bar with a lower
price tag — it's an invitation to build real capability, full team
members, not "resources."

One interviewer's opinion, or one bad interaction, doesn't get to decide
a person's candidacy. Contested calls get a structured, multi-signal
look — not a gut check from whoever happened to be in the room.

And title inflation is its own quiet failure mode. If a title stops
meaning something specific, it stops being useful to anyone — the
candidate, the team, or the next hiring manager trying to read it.
```

---

## Post 9 — AI as Force Multiplier, Not Mandate

**Structural note:** Opens by rejecting both extremes (mandate vs.
curiosity) in one line, positions personal adoption as the credibility
move before making any claims, and ends on the "ambition test" as the
single most quotable idea in the post — a deliberate one-line closer
built for the comments section.

```text
I don't think AI adoption should be a mandate from leadership, and I
don't think it should stay a curiosity project either. Both are ways of
avoiding the actual work of figuring out if it's helping.

Before I asked anyone on my team to change how they work, I changed how
I work. Credible AI leadership starts with your own hands on the tools,
not a slide about the tools.

[ANECDOTE: the moment your own early, hands-on adoption changed a
no-AI or cautious stance in the organization — what did you actually do
differently, and what did that unlock?]

The line I hold everyone to, myself included: AI is an accelerator, not
a substitute for judgment. The engineer stays accountable for
understanding and validating what it produces. Faster output you can't
stand behind isn't a win.

And here's the test I actually use to know if adoption is real: are
commitments getting more ambitious, not just faster. Doing the same
scope in less time is a productivity story. Taking on scope you
wouldn't have attempted before is the actual signal that people trust
the tool enough to reach further with it.

Speed is the easy metric. Ambition is the real one.
```

---

## Post 10 — Closing / Synthesis (back to People First)

**Structural note:** Deliberately the shortest post in the series —
after nine posts of frameworks, the closer should feel like an exhale,
not another list. Opens with an explicit callback ("nine posts ago"),
uses the leadership-is-influence line as the pivot, and ends on a direct
CTA rather than another framework, since this post's job is to open a
conversation, not close one.

```text
Nine posts ago I said people first isn't a slogan, it's a design
constraint. I want to close the loop on that.

None of the posts in between were really about process. The no-heroes
standard, the rails, the evidence gate, the way I think about someone
leaving, how I hire, how I think about AI — none of it was ever the
point on its own. It was what it takes to actually put people first
when it's inconvenient, when it's slower, when the easy move would have
been to lean on whoever's strongest and call it a plan.

Leadership is influence, not authority. Management is one expression of
that, not the definition of it. And the more leadership responsibility
I've taken on, the less of the actual building I do myself — which
took me longer to be at peace with than I'd like to admit. The job
became making other people's work better, not doing more of my own.

[ANECDOTE OR CTA: close on whatever's true for you right now — what
you're looking for next, an invitation to talk systems and leadership
with someone reading this, or simply a question back to the room: what
does "people first" mean where you work, in practice, not on the
values page?]
```

---

## Cross-post patterns worth noticing (or rejecting)

- Every post opens on a claim or a corrected assumption, never on "I
  wanted to share a thought." If that hook style feels wrong for your
  voice, that's useful information — it means your real hook is
  probably a question or a scene, not a thesis statement.
- Every anecdote is bracketed and generalized on purpose — no names, no
  identifying detail, no invented metrics. Fill them with what actually
  happened; don't feel obligated to keep the sentence structure around
  them.
- The series leans declarative and short-sentence throughout. If that
  reads as flatter than how you actually talk, that's worth fixing
  before anything else — voice mismatch is the fastest way a ghostwritten
  post gets noticed as ghostwritten.
