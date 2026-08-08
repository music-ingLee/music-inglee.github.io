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
- **Measure**: `--measure: 34.4em` caps body text at 40 Hangul characters a line. A Hangul
  glyph in Pretendard is a flat 0.86em wide at any size and `em` resolves at the point of
  use, so one token serves every text size. **About is the one exception and takes no cap
  at all**: the portrait floats *inside* those paragraphs, so the float itself holds the
  lines beside it to ~39 characters, and the lines below it are meant to run out to the
  column edge — which is exactly where the photo's right edge sits. Any cap stops the text
  short of that edge and the wrap stops reading as a wrap. The price is ~54 characters
  below the photo, paid on purpose. Text flowing around an image needs slack that a grid
  column does not.
- **Works**: exhibition index with big bold titles; a green underline wipes in on hover.
  Every entry is the same object: copy left, one **plate** right, the project's own app
  icon (32px) opening the kind line. The copy track **is** the measure, not a `1fr` that
  stretches past it — with `1fr` the text stopped at 550px inside a 900px track and the
  plate hung off at the far edge, leaving a 300px hole down the middle of every entry.
  Sized to the measure, the plate sits directly against the text (45px gap) and the plates'
  left edges line up down the whole section. `--plate-h` is then chosen so the widest ratio
  still fits in what is left, which also lands every plate within ~90px of its copy's
  baseline. Heights are not identical and do not need to be; the seam is what the eye reads.
- **Deck**: 001's plate is the Thinket cardnews, stacked-paper edge and all, opening a
  paged reader (9 cards, light/dark, arrow keys, Esc). The research poster stays as a
  caption link — at plate size its text was never legible anyway, and it is a PDF.
- **Reflow**: both columns of a side-by-side entry are `fr` tracks, and the pair collapses
  on a container query over the entry's own width (`46rem`), not the viewport's. Fixed px
  media tracks are banned: one made the text absorb every pixel of shrink, down to three
  characters a line at 860px. The 760px media query survives only as a fallback.
- **Motion**: smooth scroll + IntersectionObserver fade-up (`.reveal`); nav underline
  grow; active-section tracking. Honors `prefers-reduced-motion`.
- **Imagery**: portrait as a hard-framed B&W figure (not a circular avatar).

## Sections
Nav · Hero · 01 About · 02 CV · 03 Works · 04 Courses · 05 Contact · 06 Colophon (AI Usage) · Footer.
