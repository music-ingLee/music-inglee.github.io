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
- **Works**: exhibition index with big bold titles; a green underline wipes in on hover.
- **Motion**: smooth scroll + IntersectionObserver fade-up (`.reveal`); nav underline
  grow; active-section tracking. Honors `prefers-reduced-motion`.
- **Imagery**: portrait as a hard-framed B&W figure (not a circular avatar).

## Sections
Nav · Hero · 01 About · 02 CV · 03 Works · 04 Courses · 05 Contact · 06 Colophon (AI Usage) · Footer.
