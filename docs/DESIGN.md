# Penny Pilot design system

Status: implementation specification, 18 October 2026 (India). Penny Pilot and Mia remain original. The objective is a calm, legible learning product, not an imitation of another product's assets or layout.

## Principles and hierarchy

One prominent next step per learning state; show the finish line without pressure. Teach by letting a learner predict, manipulate and explain. Keep explanatory passages short and complete, with a worked example and visible assumptions. Correct/incorrect feedback always combines an icon, words and colour. Every course topic stays accessible; prerequisites guide rather than lock. A missed day is an invitation to return, not a failure.

## Tokens

`src/design-tokens.css` owns light/dark semantic colours and reusable type, spacing, radius, shadow and motion values. Existing artwork and graph coordinates are geometry/data, not spacing tokens; they may retain numeric coordinates. New component styling uses tokens rather than literal design values. Existing palette aliases are migration compatibility, not extra brand colours.

| Role | Light background / text | Dark background / text |
| --- | --- | --- |
| Surface / body | #ffffff / #252c25 | #202822 / #edf2e8 |
| Muted text on surface | #ffffff / #5d685a | #202822 / #bdc9b7 |
| Brand action | #79b94b / #172511 | #a4d873 / #172511 |
| Correct | #edf5dd / #346215 | #2e4029 / #b8e393 |
| Incorrect | #fceceb / #8b3430 | #422824 / #ffc4b9 |
| Warning | #fff3d6 / #725100 | #403720 / #f6d98b |
| Information | #e9f3f8 / #24586d | #233b44 / #b8e0f0 |

Verify text pairs programmatically at WCAG AA (normal text >=4.5:1, large text >=3:1); colour tokens are not a blanket certification of every screen. Focus and UI boundaries use visible outlines. Meaning never depends on red/green alone.

Type: DM Sans for reading, Manrope for headings, Noto Sans Devanagari for Hindi. Body 1rem/1.8; Hindi 1rem/1.9 so conjuncts and vowel marks are not clipped. Scale: 0.75, 0.875, 1, 1.125, 1.5, 2 and 2.75rem. Small nav labels may use 0.6875rem, never for teaching passages. Do not reduce Hindi below its English counterpart. Support text resizing to 200% without clipping or document overflow.

Spacing: 4, 8, 12, 16, 24, 32, 48px; use an 8px rhythm with 4px adjustments. Radius: 8px for controls, 16px for cards, 24px for dialogs; pills use a full radius. Elevation: one quiet shadow and a border; no heavy layered glow. Dialog width depends on content and available screen space. Respect top/bottom safe areas.

Motion: fast 120ms, standard 180ms, maximum 240ms; easing cubic-bezier(.2,.8,.2,1). Animate opacity/transform for feedback, never a long bounce or continuous decoration. Native scrolling may animate when motion is allowed; it becomes instant when reduced motion is requested. No sound by default. Haptics are optional future device work, not a release prerequisite.

## Component contract

- Buttons: primary green with charcoal text; secondary surface/border; ghost text/icon. Every touch target >=44px. Pressed state uses a subtle transform and visible state; keyboard focus is distinct. Avoid multiple green calls to action in the same card.
- Cards and lesson nodes: consistent surface/border/radius, chapter label, completion icon and plain next/available/completed wording. All lessons remain open; there is no invented lock state or fabricated progress.
- Progress: real answered questions/goal only; accessible text alongside a bar/ring. Display IST calendar days. Freezes are earned through completed lessons and never sold. Welcome-back copy does not shame.
- Chips: text + icon when conveying status. Draft is the default; Reviewed requires an actual recorded reviewer/date. Outline and draft lesson are different states.
- Dialog/bottom sheet: focus-managed, labelled, Escape/back predictable, no focusable hidden content. The small-screen dialog behaves as a full-width sheet with safe-area spacing. Lesson exit offers a saved-progress choice; never discard a saved answer.
- Toast: short confirmation with a live region; errors stay visible until understood. Do not announce a backup as completed before export succeeds.
- Inputs: explicit labels, units, help/error text; Indian digit grouping for displayed rupee values. Editable numeric values remain ungrouped unless a dedicated parser handles commas; do not feed formatted strings to numeric inputs. Never substitute salary flows for asset balances.
- Answer options: >=44px, selected icon, one Check action, Continue after explanation. Sorting/matching have tap and keyboard alternatives. Try again is optional and retains the first graded result/review history.
- Feedback: icon + clear correct/try-again wording + why. Mia encourages mistakes, celebrates understanding and looks concerned in scam situations; she never covers controls.
- Empty/loading/error states: explain what happened and one next step. No pretend achievements or review counts.

## Mia

Original chibi SVG, warm financial guide. Use small reactions alongside content, not as a competing hero on every screen. Read/thinking for explanations, encourage for a mistake, celebrate for completion, concerned for scam guidance. Decorative repetitions are hidden from assistive technology. Any motion is transform-only and fully off under reduced motion.

## Evidence and critique

Capture before/after at 360x800 and 1440x900, English/Hindi, light/dark in `docs/screens/foundation-redesign/`. Read the screenshot contact sheets as well as automated results. Record imperfect density, untranslated strings and unavailable device checks honestly; a screenshot cannot certify usability or financial correctness.
