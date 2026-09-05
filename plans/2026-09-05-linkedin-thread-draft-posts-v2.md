# LinkedIn Thread: Draft Posts v2 (unslopped, anecdotes de-anchored)

Companion to `plans/2026-09-05-linkedin-thread-draft-posts-v1.md`. v1 stays
untouched for comparison. This pass does two things to every post:

1. Applies the unslop rule set (no em dashes, no mid-sentence colons, no
   negative-parallelism "not X, it's Y" constructions, no AI vocabulary, no
   copula avoidance, sentence-case headings, straight quotes, varied
   sentence rhythm, zero markdown inside the post body).
2. Removes every `[ANECDOTE: ...]` bracket that sat in the middle of a post
   and was load-bearing for the sentences around it. Each post below now
   reads as a complete, publishable post with no bracket in the flow. Where
   a real example would genuinely strengthen the post, one optional line
   sits at the very end, on its own paragraph, describing the shape of the
   story to swap in, never writing the story itself.

Format note: each draft is in a fenced block so line breaks are exact and
you can paste straight into LinkedIn's editor without re-formatting. The
optional swap-in line at the end of a post is a note to you, not text
meant to ship.

---

## Post 1: People first (the thesis)

Removed the mid-post anecdote about protecting someone's time at a real
cost and let the post close on its own logic instead: the gap between
"people first" as a slogan and as a design constraint. Fixed one em dash
and one colon-as-connector. Added an optional swap-in line since this
post is the thesis and a concrete cost example would carry real weight.

```text
"People first" gets said in more all-hands meetings than it gets designed
into anything.

Here's what I mean by it, literally.

A person is a burst. Even a great one. They have a good quarter, a good
year, a run of right calls. Then they get promoted, they leave, they have
a kid, they burn out, they're just having an off month. That's not a flaw
in them. That's what being a person is.

A system is the thing that takes what was good about that burst and makes
it repeatable after the person who created it has moved on to something
else.

That's the version of "people first" I actually believe in. Not "we care
about our people" on a values slide. The harder version means building
the system so caring about someone doesn't require a hero to absorb the
cost of it.

This is post 1 of a short series on what that looks like when it's
actually engineered in: hiring, incidents, AI adoption, even how I think
about someone leaving. Next up is a line from W. Edwards Deming that I
think about more than almost anything else in how I run engineering.

[Optional: swap in a real example: describe one specific moment you
protected someone's time or well-being at a real cost, including what
you decided and what it cost the team in the short term.]
```

---

## Post 2: "A bad system will beat a good person every time" (Deming)

Removed the anecdote bracket about what prompted the Engineering Maturity
and Accountability Manifest and folded its point directly into the
paragraph so the post no longer depends on a memory being filled in.
Fixed two em dashes and rebuilt the "heroics" sentence that had turned
into a two-sentence negative-parallelism construction.

```text
You've probably seen this quote as "a bad process beats a great person
every time."

That's not what he said. W. Edwards Deming's actual line, from a seminar
in 1993, is "a bad system will beat a good person every time."

System, not process. That's a bigger claim. A process is a set of steps.
A system is the whole structure around a person: the incentives, the
role design, who's accountable for what, what gets rewarded versus what
gets quietly absorbed.

That last part is the one that got me. A few years ago I put something
in writing that still shapes how I run engineering, the Engineering
Maturity and Accountability Manifest. It named a pattern I kept seeing
in my strongest people, covering for a system that wasn't holding up its
end, quietly, over and over, while everyone around them called it
strength.

The instinct is to read that as heroics, someone capable enough to keep
making the symptom disappear. It isn't. It's the system failing that
person, and the organization mistaking the cover-up for competence.

Effort isn't impact. If your best people are spending their effort
compensating for a broken system, the system is what's broken. Not them,
and not their effort.

This is what "people first" (post 1) actually requires. Build the system
good enough that good people don't have to be heroic just to keep it
running.

[Optional: swap in a real example: name one specific behavior pattern
in a strong performer that convinced you the system, not the person,
needed fixing, and what shifted once the Manifest existed.]
```

---

## Post 3: The no-heroes standard

Removed the Center of Excellence anecdote from the middle of the list and
moved it to an optional closing line. Rebuilt the "redesign the slot"
line, which had been a textbook "not a compliment, it's a defect"
negative-parallelism construction, into a direct statement. The
three-move structure (refuse, redesign, institutionalize) is a real
named framework from the source material, so it stays as three.

```text
"People should not be given opportunities to become heroes."

I say this to my team more than almost anything else, and it always
gets pushback the first time. Heroics feel like the opposite of a
problem. Someone stayed up all night and saved the release. Isn't that
exactly what you want?

No. It's evidence something upstream already failed.

Here's the standard, in three moves.

Refuse the reward. No hero projects, no after-hours rescue as a path to
recognition. Rewarding the save teaches everyone to wait for the
emergency instead of preventing it.

Redesign the slot. When one person is carrying something critical alone,
that's a defect to engineer out. Redistribute the ownership, don't just
thank them harder.

Institutionalize the knowledge. Whatever's living in one person's head
gets documented, standardized, and shared on purpose, before it becomes
a crisis instead of a project.

I'd rather run a boring quarter than a heroic one. A boring quarter means
the system is doing its job.

[Optional: swap in a real example: describe the actual key-person risk
that pushed you to formalize this, such as standing up a center of
excellence, and what changed day to day once it was in place.]
```

---

## Post 4: Rails before speed

Removed the anecdote about a specific gate added or removed and let the
closing paragraph stand on its own. Fixed the "rails aren't the thing
slowing you down, they're the reason" line, which was both an em dash and
a negative-parallelism construction, by cutting the setup and stating the
claim directly. Replaced a second em dash with parentheses.

```text
"Move fast" and "be careful" get treated like opposite instructions.

They're not. You can only actually move fast because you were careful
first.

Build the rails before you accelerate. Testing, monitoring, a real
release process, a rollback path that's been exercised, not just
documented. Rails are the reason you can go fast without flinching every
time you ship.

Roll forward, not back. Once those rails are real (CI/CD, regression
coverage, staging that means something), the default response to a
production issue is fixing it forward, not reverting to yesterday.
Rollback stays a tool in the kit. It stops being the reflex.

Here's the part people don't expect. I remove rails as often as I add
them. A gate that made sense two reorgs ago and doesn't earn its cost
anymore is just drag with better branding. A rail has to earn its place,
same as a new one does.

[Optional: swap in a real example: name one specific gate you added
before a team could safely move faster, or one you pulled because it had
turned into ritual, and what changed as a result.]
```

---

## Post 5: Show me your work

The mid-post anecdote in v1 referenced ambition-test language that
belongs to post 9, not this post's actual point, so it's dropped rather
than relocated. Rebuilt the closing paragraph's two negative-parallelism
constructions and one em dash into direct statements using a colon
before the actual list of what got assessed.

```text
My default question when someone brings me a proposal: show me your
work.

Not "convince me." Show me. Six things, every time.

What's the problem.
What's the actual friction today.
What's the benefit.
What's the risk.
How do we mitigate it.
What's the ROI.

A proposal that's persuasive but hasn't answered those isn't ready. It's
a pitch. I want the evidence, not the confidence.

Same bar on incidents. Logs and metrics before hypotheses. No wild goose
chases after a theory nobody's checked against the data yet.

Here's the part that keeps it honest. I hold my own initiatives to the
same gate. Our AI infrastructure work started as an assessment: value,
cost, ownership, maintenance, examined before I committed to it myself.
If I'm going to ask for evidence, I have to bring my own first.

[Optional: swap in a real example: name the specific proposal or
incident where the six-question gate caught something a purely
persuasive pitch would have missed.]
```

---

## Post 6: Perception becomes reality

Cut the "not as a cynical statement, as an operating fact" line entirely
rather than repair it. It was a hedge the post doesn't need, and removing
it made the opening tighter. Rebuilt two more negative-parallelism
constructions ("isn't a thing you achieve once, it decays") into direct
claims and swapped a mid-sentence colon for "is."

```text
A standard nobody knows about doesn't exist. It doesn't matter that it's
written down somewhere.

Perception becomes reality inside organizations. If people aren't aware
of a standard, they're not violating it when they miss it. They never
had it.

Alignment decays by default. It needs deliberate, repeated
reinforcement, the same message, close to the same words, across
different rooms, more times than feels necessary to you and exactly the
right number of times for everyone hearing it for the first or second
time.

The other half of this is telling the complete story. Priorities,
sequencing, tradeoffs, the actual rationale. Not a yes or no. A yes/no
answer is where understanding goes to die, because it gives people a
decision without giving them the reasoning they'd need to make the next
ten decisions themselves.

For me, communication is a quality mechanism, same category as tests and
monitoring. Treat it like anything else you'd measure.

[Optional: swap in a real example: name one specific standard or
decision you had to repeat, in close to the same language, across
multiple audiences before it actually stuck, and what changed once it
did.]
```

---

## Post 7: Departure as a design signal

This is the post most likely to misfire if it reads cold, so the human
line stays first and the doctrine still only arrives after it's earned.
Removed the mid-post role-redesign anecdote and let the "burnout exit"
paragraph follow directly, since it was already making its own point.
Fixed three em dashes and two negative-parallelism constructions,
including the "that's not a story about their commitment, that's the
organization failing them" pairing.

```text
Losing someone good is not something I get used to, and I don't think
you're supposed to.

The question I ask right after the human one (how do we support them,
what do they need from me) is a structural one. What does this
departure tell me about how we built the role?

Here's what I've come to believe. A departure is telemetry, not a
negotiation to win. When someone's decided to leave, I don't spend my
energy trying to talk them out of it. I move toward the next phase:
redesign the role, hire strong, keep going.

When the departure is a burnout exit, when the organization asked too
much for too long and someone finally had enough, that's the
organization failing them, not a story about their commitment. I'd
rather own that plainly than let it get quietly filed under "personal
reasons."

Redesign the structure. Hire well. Own what was ours to own.

[Optional: swap in a real example: describe, in general terms with no
names, one senior role that moved from a single owner to a shared or
consultative model after someone left, and what made that redesign
deliberate rather than reactive.]
```

---

## Post 8: Hiring as a system, not a series of opinions

Removed the hiring-alignment-diagnosis anecdote from the middle and moved
its shape to the closing line. Rebuilt the "not a license to hire a
worse bar, it's an invitation" line, a direct negative-parallelism
construction, into a positive claim with a trailing contrast instead.

```text
A bad hire is rarely one person's bad call. It's usually five decent
calls made by five different people who were never actually aligned on
what "good" meant.

Recruiter, job description, first-round interviewer, panel, hiring
manager. That's a chain, not five independent judgments. If each link is
calibrated to a different bar, the candidate who gets hired is whoever
happened to hit the weakest link.

Two things I hold the line on, hard, regardless of budget pressure or
where the role is:

Standards get calibrated to a market, never lowered for one. Growing a
team somewhere new is an invitation to build real capability, full team
members, not a worse bar with a lower price tag.

One interviewer's opinion, or one bad interaction, doesn't get to decide
a person's candidacy. Contested calls get a structured, multi-signal
look, not a gut check from whoever happened to be in the room.

And title inflation is its own quiet failure mode. If a title stops
meaning something specific, it stops being useful to anyone: the
candidate, the team, or the next hiring manager trying to read it.

[Optional: swap in a real example: name the actual misalignment you
found across the hiring chain during a hiring-alignment review, and what
changed in practice once it was fixed, such as a shared competency
framework or a structured second look for contested candidates.]
```

---

## Post 9: AI as force multiplier, not mandate

Removed the mid-post anecdote about early hands-on adoption changing a
cautious stance and moved it to an optional closing line. The bigger fix
was structural: "are commitments getting more ambitious, not just
faster" was set up across three sentences as a negative-parallelism
payoff. Rebuilt it as two direct, contrasting claims instead.

```text
I don't think AI adoption should be a mandate from leadership, and I
don't think it should stay a curiosity project either. Both are ways of
avoiding the actual work of figuring out if it's helping.

Before I asked anyone on my team to change how they work, I changed how
I work. Credible AI leadership starts with your own hands on the tools,
not a slide about the tools.

The line I hold everyone to, myself included. AI is an accelerator, not
a substitute for judgment. The engineer stays accountable for
understanding and validating what it produces. Faster output you can't
stand behind isn't a win.

Here's the test I actually use to know if adoption is real. Doing the
same scope in less time is a productivity story. Taking on scope you
wouldn't have attempted before is the real signal, proof people trust
the tool enough to reach further with it.

Speed is the easy metric. Ambition is the real one.

[Optional: swap in a real example: describe the specific way your own
early, hands-on use of AI tools changed a cautious or skeptical stance
on your team, and what shifted once people saw it in your own hands
first.]
```

---

## Post 10: Closing / synthesis (back to people first)

The v1 bracket here doubled as the post's actual ending, not an optional
flourish, so it needed a real closing line rather than a deferred
anecdote. Wrote a direct question back to the reader instead, which
needs no invented specifics and fits the post's job of opening a
conversation rather than closing one. No optional swap-in line: the post
is already complete, and a personal anecdote here would compete with the
callback structure instead of supporting it.

```text
Nine posts ago I said people first is a design constraint, not a slogan.
I want to close the loop on that.

None of the posts in between were really about process. The no-heroes
standard, the rails, the evidence gate, the way I think about someone
leaving, how I hire, how I think about AI. None of it was ever the point
on its own. It was what it takes to actually put people first when it's
inconvenient, when it's slower, when the easy move would have been to
lean on whoever's strongest and call it a plan.

Leadership is influence, not authority. Management is one expression of
that, not the definition of it. The more leadership responsibility I've
taken on, the less of the actual building I do myself. That took me
longer to be at peace with than I'd like to admit. The job became making
other people's work better, not doing more of my own.

So here's the question I'd ask back. What does "people first" mean where
you work, in practice, not on the values page?
```

---

## What changed, across all ten

- Every mid-post `[ANECDOTE: ...]` bracket is gone. No sentence in any
  post now depends on an anecdote existing to make sense.
- Where a real example would still strengthen a post, it's an optional
  one-line prompt at the very end, describing the shape of a story, never
  the story itself. Post 10 is the one post that doesn't get one, since
  its ending is a direct question to the reader, not an anecdote slot.
- Every em dash is gone, replaced with periods, commas, or parentheses.
  Every mid-sentence colon-as-connector is gone; colons remain only where
  they introduce an actual list. Every "not X, it's Y" construction was
  rebuilt as a direct claim, sometimes keeping a short trailing "not Y"
  for rhythm where that reads as plain antithesis rather than a hedge.
- Headings are sentence case, matching the unslop rule; the hook-first
  structural pattern from v1 (open on a claim or corrected assumption,
  never "I wanted to share a thought") still holds and wasn't touched.
