# Penny Pilot development

The product is **Penny Pilot**, never the earlier working name. The mascot is **Mia**, a financially wise, kind chibi cat. Use white/charcoal/green, generous spacing, original lightweight SVG, and smooth interactions that respect reduced motion.

- Use the existing checkout. Cloud tasks are already isolated; do not create a Git worktree unless the user requests it.
- New installs start in simple Devanagari Hindi with familiar Hinglish terms. Preserve existing saved language choices. Prefer कमाई, पैसे, प्लान, चेक, and फिर इन्वेस्ट करें over formal wording; explain technical terms before using them.
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
