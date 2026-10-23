# Revision planner visual review

23 October 2026. Chromium 155, reduced motion, fixed 23 October 2026 clock.

`before/` and `after/` contain the same seeded review history at 360×800 and 1440×900, English/Hindi, light/dark: eight full-page captures each. Seeds are test fixtures, not reported learner activity. Contact sheets compare all eight combinations. `verified/` has eight additional captures from the calendar/mode/accessibility browser cases, using a separate fixture with a recovered historical mistake.

## Observations

- Before: a compact list of due lessons and historic mistakes, with no upcoming dates or cumulative plan.
- After: the green/white/charcoal treatment remains consistent, with readable calendar counts, outlined selected states and a clear plan preview. Hindi headings, dates and controls wrap without clipping in the inspected captures.
- The phone calendar intentionally scrolls horizontally inside its card. A partially visible next date indicates more content; the document itself stays within the viewport. Date buttons also work without dragging.
- The new planner is longer on phones, especially Hindi. The primary start button is below the initial viewport; individual-topic buttons remain further down. This is a density trade-off, not proof of optimal novice usability. The planner appears only once real attempted questions exist, preserving the small first-use empty state.
- Fixed mobile navigation appears across the stitched full-page image at the original viewport boundary. This is screenshot positioning of the existing fixed navigation, not a new inline row. Browser checks cover clicking controls after scrolling and document overflow.
- Existing 48 first-use main-screen image comparisons remain unchanged. No screenshot tolerance was loosened and no baseline was replaced.

Automated axe checks pass in the eight populated planner combinations; 200% text checks pass. The first pass caught a calendar accessible-name mismatch; removing the redundant custom name lets the visible date/count label supply the accessible name. Physical touch scrolling, TalkBack, native Hindi editorial approval and novice comprehension are **Not verified**.
