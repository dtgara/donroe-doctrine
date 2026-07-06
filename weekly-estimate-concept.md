# The Weekly Estimate — Concept & House Style

*Working notes, compiled from planning discussion.*

## What It Is

A weekly recurring feature that reads like a real geopolitical risk briefing — the kind Eurasia Group, Stratfor, or the EIU actually publish — pointed at the doctrine's behavior that week. It sits between The Doctrine (the mock white paper) and The Dispatches (the long-form editorial voice): more frequent than a Dispatch, more structured, and organized around industry and stakeholder impact rather than narrative.

The name works two ways at once: it reads as a generic piece of analyst-speak, and it echoes the National Intelligence Estimate — which licenses the confidence-rating device below without needing to explain the joke.

Positioning: not a satire of geopolitical analysis. An actual geopolitical analysis, produced with real tradecraft, whose subject happens to be absurd. The insight and the joke come from the same sentence, not two layers stacked on top of each other.

## Cadence and Placement

Published every Friday, closing out the week's doctrine activity and flagging what's coming next. Byline: a recurring fictional analyst persona, Mireille Therese Ibrahim (full background below) — consistent voice, never the site's own name.

A scheduled task (`weekly-estimate-draft`) runs every Friday at 9:00 AM and drafts the issue automatically — research, Sector Impact grid, Watch List, the works — following this document as its house style reference. It only drafts. It does not commit or push. Each week's file lands in `_estimates/` for review; publishing to the live site is a separate, manual step once the draft has been read and edited for voice.

## The Byline: Mireille Therese Ibrahim

**Background.** Raised in a Lebanese-American Maronite household, family origin in the Mount Lebanon area — Arabic was the language of the house before English, which shows in her prose occasionally. Undergraduate degree from the American University of Beirut, a master's from Georgetown's School of Foreign Service. Twenty years in the CIA's Directorate of Operations, officially unconfirmed, spanning the early 2000s through the early 2020s: postings across the Middle East and North Africa, with a later rotation through Central Asia, where she picked up Persian out of operational necessity — handling Dari- and Farsi-speaking assets and liaison contacts across the Afghan and Tajik services. Her actual stations are the one detail she has never confirmed, on or off the record. Left government service in the early 2020s; consults privately now, writes under her own name, has never given an interview about the work itself.

**Byline (runs under every issue):**

> Mireille Therese Ibrahim spent twenty years as a case officer across the Middle East, North Africa, and Central Asia. She now writes on transactional statecraft and the incentives beneath it, drawing on two decades spent assessing exactly that from the other side.

The second sentence converts the background into a stated analytical specialty — "transactional statecraft" — so the byline reads as a real analyst's credentials rather than a joke about secrecy. Consistent, unchanging across issues, the way "The Editors" is consistent for The Doctrine.

### Collection structure: a dedicated collection, following the Cables model

The site already has two different patterns for recurring content, and the Estimate doesn't cleanly fit either as-is:

- **Dispatches** (`_posts`, `categories: [dispatches]`) — full authored pieces, but explicitly unscheduled ("the archive does not operate on a fixed schedule") and loosely structured (just title, dateline, standfirst, body). Sharing this bucket would mean either forking the `post` layout with conditionals for the header block, confidence stamp, and Sector Impact grid, or polluting Dispatches' looser format with the Estimate's much heavier structure.
- **Deals / trackers** (`_data/deals.yml`, `_data/contradictions.yml`, etc.) — short, uniform, filterable rows rendered through one generic template. This fits data that's genuinely tabular and comparable across entries. The Estimate isn't that: each issue is a distinct authored document with prose (the Assessment, the Watch List) wrapped around some structured sub-blocks.
- **Cables** (`_cables/*.md`, its own collection with `output: true`, custom frontmatter, own permalink) — a full document per entry, each with recurring structured fields (`classification`, `from`, `subject`, `date`) alongside free-form body text. This is the closer match: the Estimate needs the same thing — one document per week, its own namespace, structured frontmatter for the recurring blocks, prose for the rest.

Recommendation: a new collection, `_estimates`, modeled directly on `_cables`.

```yaml
# _config.yml
collections:
  estimates:
    output: true
    permalink: /estimates/:name/

defaults:
  - scope:
      path: ""
      type: "estimates"
    values:
      layout: "estimate"
```

Each week is one file, e.g. `_estimates/2026-07-06-greenland-framework-holds.md`:

```yaml
---
title: "The Greenland Framework Holds, For Now"
date: 2026-07-06
confidence: "Moderate"
sector_impact:
  - group: "Shipping & Logistics"
    bottom_line: "Arctic route insurers hold pricing steady."
    rationale: "..."
  - group: "Defense & Aerospace"
    bottom_line: "..."
    rationale: "..."
watch_list:
  - "..."
  - "..."
  - "..."
---

[Assessment prose body — base case / downside case / key assumption.]
```

A new `estimate.html` layout (based on `post.html`) renders the header block, confidence stamp, and Sector Impact grid from frontmatter, then the Assessment as body copy — same division of labor as Cables, where `classification`/`from`/`subject` are structured and the cable text is prose. The Numbers sidebar doesn't need its own data file — it pulls live from the existing trackers via Liquid, the same way `index.html` already does (`site.data.contradictions | size`, etc.), so every issue stays cross-linked to the rest of the archive. A new archive page (`estimate.html` at root) lists `site.estimates` sorted by date, card-grid style like `cables.html`.

## Weekly Template

**Header block.** Date, a parody classification marking, and an overall confidence rating for the week's assessment. Played completely straight — the joke is the format, not a line inside it. (No distribution list: the site is a public publication, not a leaked internal memo, so a routing list has nothing to do — dropped after the first round of drafts.)

**This Week's Assessment.** Up to 350 words on the week's main doctrine event, written in real analyst prose: hedged, structured around a base case / downside case / tail case with rough probabilities, a stated key assumption, and named indicators that would change the view. No adjectives doing emotional work.

**Sector Impact.** The core deliverable. Four core categories run every issue — Energy, Mining, Technology, Logistics — since these hold up across nearly any doctrine event (tariffs, territorial claims, alliance pressure, sanctions all touch them). Two additional slots rotate week to week, drawn from Finance, Sovereign Wealth & Gulf Capital, Agriculture & Commodities, and Defense & Aerospace, chosen by whatever's actually relevant that week rather than run on a fixed schedule. Six entries per issue in total. Each gets a one-line bottom line and two sentences of rationale, anchored to something real and checkable: soybean futures moving on a tariff threat, a chip export control rippling through allied supply chains, a defense prime's stock ticking up on a NATO spending remark, a sovereign fund's exposure to a Trump-affiliated vehicle drawing a direct line back to The Interests or The Ledger.

**Confidence Levels.** IC tradecraft language — "assessed with high confidence," "moderate confidence, single-source" — applied correctly and specifically to claims that are already self-evidently true or already on the record. The reader does the math themselves; nothing is flagged as a joke.

**Watch List.** Three things to watch next week, in the register of a real subscription newsletter's "what we're tracking."

**The Numbers.** A sidebar pulling live figures from existing data files — tariff percentage, days in office, new contradictions logged, latest Ledger total — cross-linking back into the Contradiction Tracker, The Ledger, and Deals so each issue reinforces that this is one continuous archive.

## House Style: Layering Insight and Satire

The core rule: **the analysis must be correct.** Fabricated stakes read as a joke. Real stakes, reasoned through honestly, read as journalism that happens to be very funny — and that's the register this section is aiming for.

### Borrow real tradecraft, not the appearance of it

Use actual structured analytic technique: base case / upside case / downside case with probabilities, a key-assumptions check, named indicators and warnings. Build the scenario tree honestly, the way a real analyst would for Denmark's domestic politics or Arctic Council dynamics. If the reasoning is genuinely sound, the comedy comes from the fact that it's sound reasoning about something absurd — not from anything added on top.

### Real stakes only

Every Sector Impact entry should be traceable to something that actually happened or is genuinely at risk — a market move, a contract, a real second-order effect. Never invent a consequence for effect. If a claim can't be sourced or reasonably inferred, it doesn't go in.

### Jargon used correctly, never mangled

"Assessed with moderate confidence," "first-order versus second-order effects," "credible commitment problem," "audience costs" — deploy these the way an actual analyst would. Exaggerating or garbling the jargon for effect breaks the register and collapses it into generic parody. This is the same discipline the site already applies to the Doctrine's bureaucratic language and the Cables' deadpan.

### Absurdity from application, not invention

The confidence-rating gag only works if it's applied to something the reader can independently verify — ideally Trump's own public statement, footnoted. That's funnier and more legible than any invented exaggeration, because the reader reaches the joke themselves (why does this need a confidence rating at all?) instead of being told.

### Understatement, never hyperbole

No exclamation points. No adjectives carrying the emotional weight. No "surely," no "incredibly," no editorializing asides. If a paragraph reads as too knowing, cut whatever line made it knowing. The wink is what kills it.

### Recurring tells instead of punchlines

Consistency across issues — not jokes within any single issue — is what makes the satire unmistakable. Two or three structural motifs a regular reader learns to spot:

- The confidence rating, always applied to something already true
- A footnote gag citing a real quote as a primary source

New readers may take the first paragraph at face value. By the Sector Impact section they should have caught on, without the piece ever breaking character to help them along.

### What's off-limits

- Inventing quotes or events. Everything traces back to something real, footnoted like a real brief would footnote it.
- Editorial adjectives ("shocking," "absurd," "unbelievable") — the reader supplies the reaction; the piece doesn't.
- Explaining the joke, anywhere, in any form.

### Worked example (Greenland)

> *Base case (65%): status quo pressure campaign continues without a formal annexation attempt, consistent with the pattern observed in Panama Canal rhetoric, 2024–25. Downside case (25%): a formal territorial claim is filed, triggering Article 5 ambiguity within NATO given Denmark's membership — an unprecedented test of alliance cohesion the doctrine does not appear to have modeled. Key assumption: continued conflation of "strategic necessity" with personal real estate instinct holds, per Article III of the Doctrine.*

Real scenario-planning structure, real NATO mechanics, and the only joke is the footnote back to the site's own Article III. No punchline required.

## Open Questions

All open questions from the initial draft are resolved: collection structure, byline, and Sector Impact roster are settled above. Remaining decision is purely editorial — which two rotating categories to run in the first issue, based on whatever the doctrine is actually doing that week.
