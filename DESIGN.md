# DESIGN.md — Editorial / Gallery (MMCA-inspired)

## Overview
A museum-catalog aesthetic on a warm gallery white (`#f7f6f3`) using the
**studyForest light palette** with a single green accent (`#2f8f5b`). No cards,
no boxes — content is organized like an exhibition index: generous whitespace,
hairline rules, numbered sections (01 / About …), and large editorial typography.

## Key characteristics
- **Type**: Inter (300–600). Oversized light hero name, tight `-0.03em` tracking;
  small uppercase rail labels with wide `0.18em` tracking.
- **Color**: near-black text on warm off-white; green used sparingly for
  section numbers, links, and hover states only.
- **Layout**: two-column scaffold — sticky left rail label + right body. Works
  section is an exhibition index (number · title · year) separated by hairlines.
- **Motion**: smooth scroll + subtle IntersectionObserver fade-up (`.reveal`);
  underline-grow on nav hover; active-section nav tracking. Honors
  `prefers-reduced-motion`.
- **Imagery**: portrait shown as a framed figure with caption (not a circular avatar).

## Sections
Nav · Hero · 01 About · 02 CV · 03 Works · 04 Courses · 05 Contact · 06 Colophon (AI Usage) · Footer.
