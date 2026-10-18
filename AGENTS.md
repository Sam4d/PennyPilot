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

## Repository continuity and additional conventions

The product is **Penny Pilot**, never the earlier working name. The mascot is **Mia**, a financially wise, kind chibi cat. Use white/charcoal/green, generous spacing, original lightweight SVG, and smooth interactions that respect reduced motion.

- Use the existing checkout. Cloud tasks are already isolated; do not create a Git worktree unless the user requests it.
- New installs start in simple Devanagari Hindi with familiar Hinglish terms. Preserve existing saved language choices. Prefer कमाई, पैसे, प्लान, चेक, and फिर इन्वेस्ट करें over formal wording; explain technical terms before using them.
- Hindi may also use brackets to explain unfamiliar terms: "पॉलिसी की कीमत (प्रीमियम)". Keep explanations short and natural; avoid unexplained jargon in either language.
- English uses simple, standard English without Hindi or Roman Hindi. Explain necessary jargon in brackets on first use, preferably after the plain meaning: "the amount you start with (principal)". The Hindi variant is Devanagari Hindi with familiar Hinglish terms; the optional Roman Hinglish variant is separate.
- End each user-facing task response with an estimated overall project completion percentage. Use the full agreed app and curriculum scope and the evidence/weights in docs/PROGRESS.md; label the number as an estimate, not measured hours or approved content. Do not inflate progress for routine fixes.
- Keep lesson content genuinely multilingual: English, conversational Hindi, and Roman Hinglish. The shell's remaining English strings are an explicit localisation backlog.
- Preserve stable lesson/question IDs and versioned progress. Save every answered question; do not regress resume, backup or offline behaviour.
- Keep financial maths in pure functions; state the compounding convention and assumptions. A calculator is not a forecast.
- Planned curriculum is not playable content. Never invent progress, streaks, user counts, finished lessons, or verified hours.
- Do not add accounts, analytics, ads, broker referrals, or stock recommendations.
- Regulatory/tax/product figures require a primary source, effective date, and actual verification date before release. Do not fake current rules or claim blocked sites were researched.
- Use the lockfile with `npm ci`. Run `npm run validate:content`, `npm test`, `npm run build`, and affected browser tests. Avoid dependency churn that is unrelated to the change.
- Native changes need `npx cap sync android` after the web build, then the documented Android build and real-device validation when available.
- Do not commit signing keys, caches, personal backups, built artifacts, or `local.properties`. Keep TLS and checksum checks enabled.

See README, docs/CONTENT.md, docs/RELEASE-PLAN.md and docs/ANDROID.md for current scope and release gates. The original master brief is aspirational; do not mark its entire checklist complete merely because the shell exists.

- English mode hides Hindi translations in the glossary; `both` deliberately pairs the languages. Validate authored English fields and preserve user-written notes.
- All curriculum topics/units must remain directly openable. Link to the matching lesson/insurance guide when authored; otherwise show an honestly labelled draft outline. Never turn an outline into fake lesson completion.
- Insurance readings are in src/content/insurance-guides.ts; their guide IDs, language coverage and mappings to all 39 World 12 topics are tested.

- For scroller/modal changes, run the phone and desktop cases in tests/browser/responsive.spec.ts. Keep concept selection on resize, respect reduced motion, and exclude hidden/disabled/inert controls from focus wrapping. Source links and summary Enter must not trigger lesson shortcuts. Distinguish emulated touch checks from real-device validation.

## Standing rules

1. Never invent facts. Rule-dependent rates, limits, slabs and regulations need verified sources or a dated `unverified` / `assumption` label.
2. Work in small commits with clear messages, one concern per commit.
3. After UI changes, run `validate:content`, `test`, `build`, and `test:browser`. Capture and inspect before/after screenshots at 360x800 and 1440x900, light/dark, Hindi/English, under `docs/screens/<task-name>/`. Include an honest visual critique.
4. Local-first privacy is absolute: no analytics, ads, affiliate links, tracking, accounts, backend or new application network calls. Bundled assets and the existing service-worker update mechanism remain local/offline infrastructure.
5. Say **Not verified** when a source, device or deployment cannot be verified.
6. End tasks with **Summary**, **Files changed**, **Verification**, **Not verified / risks**, **Next step**, and the estimated overall project percentage. End with prioritised next actions.
7. Follow docs/DESIGN.md and the UX/quality-gate sequence. New lesson proposals belong in docs/ROADMAP-CONTENT.md; do not author new lessons until the user approves them. Develop the syllabus toward rigorous undergraduate finance competencies without claiming accreditation or degree equivalence. Use short explanatory passages, interactive worked boards, spaced retrieval, transfer questions and capstone assessments; avoid padding with trading tricks.
