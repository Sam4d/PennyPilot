# Penny Pilot: Agent Operating Rules

## Product
Penny Pilot is a free, local-first finance-learning PWA (plus Capacitor Android) for Indian beginners. Guide mascot: Mia (original chibi cat). Default language: simple Devanagari Hindi with Hinglish terms; English, Roman Hinglish and bilingual modes also exist.
Stack: React + TypeScript + Vite, hash routing, IndexedDB (web) / SQLite (Android), service-worker precache, Playwright tests.

## Non-negotiables
- Education only. No investment, tax or legal advice. No stock/fund/product recommendations, ads, affiliate links, analytics, or backend.
- Local-first: progress never leaves the device. Do not add network calls, trackers, or runtime CDNs.
- Never invent facts. Rates, limits, tax slabs, and regulations must come from a verified source or be labelled as an assumption with a date. If you can't verify, say so in the output and mark the content `unverified`. Do not fill in from memory.
- Never fabricate learner stats, testimonials, or completion counts.
- Don't delete or rewrite existing lesson content, user data schemas, or tests unless the task says to. Schema changes need a version bump and a migration, plus a test with an old backup.
- Hindi and English must both be correct and natural. Never ship a lesson in one language with the other half-empty.

## Working method (follow every task)
1. Read the relevant files first. State what you found in 3-6 lines before editing.
2. For anything larger than ~3 files, write a short plan and wait for no one: proceed, but keep changes in small, reviewable commits.
3. Make the smallest change that fully solves the task. No unrelated refactors.
4. Verify by running, not by assuming:
   - `npm run validate:content`
   - `npm test`
   - `npm run build`
   - `npm run test:browser` when UI or flows change (note the Playwright `executablePath` override; don't commit machine-specific paths)
5. If a command fails, fix the cause. Never delete or skip a test to make it pass.
6. If the sandbox blocks network access, don't guess. Record the blocked source in `docs/CONTENT.md` under "needs verification" and continue with what you can do.

## Quality bar
- Accessibility: keyboard operable, visible focus, 44px touch targets, WCAG AA contrast in light AND dark, text scaling to 200%, reduced motion, feedback never conveyed by colour alone.
- Mobile first: test at 360x800 and 1440x900, Hindi and English.
- Indian number formatting (1,00,000), the ₹ symbol, and numeric inputs that accept commas and Devanagari digits.
- Streaks and dates use IST and handle midnight rollover.
- Copy: short, warm, concrete. Explain jargon before naming it. Match the voice in `docs/LANGUAGE.md`.

## Output format (end of every task)
- **Summary:** what changed and why (max 6 lines)
- **Files changed:** list
- **Verification:** each command run and its result (pass/fail, with real output for failures)
- **Not verified / risks:** anything you couldn't check
- **Suggested next step:** one item

## Definition of done
Code builds, all tests pass, content validation passes, new behaviour has a test, README/docs updated if behaviour changed, no unverified fact presented as verified.
