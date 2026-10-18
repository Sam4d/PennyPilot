# UX evidence

Before: the v0.7 screens. `tokens`: the design-token migration, captured at 360x800 and 1440x900 in English/Hindi and light/dark themes. Fixtures contain no personal data. Screenshots are evidence of appearance, not device performance or editorial approval.

Initial critique: the original hierarchy is pleasant but fine print and Devanagari spacing are small, Hindi screens contain English UI copy, and mobile navigation labels are cramped. The token pass increases contrast, input/touch dimensions and help-text readability without replacing Mia or the white/charcoal/green identity. It does not by itself complete onboarding, localisation or the curriculum. Source/model content often needs vertical scrolling; this is preferable to shrinking explanatory text.

Validation for the token pass: content validation, 59 unit checks (including semantic colour-pair contrast), build and the full 65-case production browser suite pass. Two development-server checks were initially invalidated by hot reload during migration; the subsequent production suite uses a settled built artifact. No failed check is counted as a pass.
