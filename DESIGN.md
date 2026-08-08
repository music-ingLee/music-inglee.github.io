# DESIGN.md — MoMA-inspired

## Overview
A stark modernist identity: pure white (`#ffffff`) and near-black (`#0a0a0a` / `#000`)
with bold grotesque typography on a strong grid. The **studyForest green** (`#2f8f5b`)
is held back as a single interaction accent — it appears only on hover, active nav,
and as small section numbers, so the page reads black-and-white at rest and reveals
color on touch.

## Key characteristics
- **Type**: Jost (Latin, bundled variable font in `assets/fonts/`, SIL OFL) + Pretendard
  Variable (Hangul, jsdelivr CDN) at heavy weights (700–800). Jost is the open-source
  Futura successor daily-todo ships, so both projects speak one geometric voice.
  Oversized bold hero name; display tracking capped at `-0.02em` on both scripts, since
  Jost's circular bowls collide where Inter's grotesque forms tolerated `-0.045em`.
  Optical left offsets are Jost's own side bearings at weight 800 (m `.055em`,
  d/S `.031em`, q `.031em`). **No tracked-out uppercase anywhere** — labels
  (rail, def keys, work kinds, lexicon, CV) speak through weight, size, and green, in
  written case with normal letter-spacing.
- **Color**: black on white; neutral (not warm) grays; green only as interaction pop.
- **Grid**: two-column scaffold (sticky rail label + body); sections divided by strong
  1–2px black rules — modernist, graphic, confident.
- **Measure**: one token, `--measure: 34.4em`, caps every body text block at 40 Hangul
  characters a line. A Hangul glyph in Pretendard is a flat 0.86em wide at any size, and
  `em` resolves against the element that uses it, so the same value gives the 16px works
  copy and the 23px About lede the same rhythm. Nothing sets its own max-width.
- **Works**: exhibition index with big bold titles; a green underline wipes in on hover.
  An entry's media picks its own layout by aspect ratio — landscape (calendar, video) sits
  beside the copy, portrait (the research poster) stacks below it at the measure's width,
  sharing the text's left and right edge. Pairing a 0.7-ratio plate with two short
  paragraphs can only buy a void under the text, so it isn't attempted.
- **Reflow**: both columns of a side-by-side entry are `fr` tracks, and the pair collapses
  on a container query over the entry's own width (`46rem`), not the viewport's. Fixed px
  media tracks are banned: one made the text absorb every pixel of shrink, down to three
  characters a line at 860px. The 760px media query survives only as a fallback.
- **Motion**: smooth scroll + IntersectionObserver fade-up (`.reveal`); nav underline
  grow; active-section tracking. Honors `prefers-reduced-motion`.
- **Imagery**: portrait as a hard-framed B&W figure (not a circular avatar).

## Sections
Nav · Hero · 01 About · 02 CV · 03 Works · 04 Courses · 05 Contact · 06 Colophon (AI Usage) · Footer.
