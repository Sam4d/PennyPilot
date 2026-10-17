# Penny Pilot

A thoughtful, playful finance-learning app for India. **Penny Pilot** is the product name; **Mia**, an original chibi cat, is the guide. White, charcoal, and green, with a responsive learning path, animated SVG illustration, and touch-friendly concept scrollers.

## What works in this preview

- Ten foundation lessons: money and barter, cash flow, budgeting, UPI scam awareness, compounding, emergency savings, inflation, bank statements, credit-card bills, and debt repayment.
- 80 authored exercises across five engines: multiple choice / true–false, numeric answers, sequencing, document-row discovery, and accessible bucket sorting; immediate explanation and optional deeper context.
- English, conversational Hindi, Hinglish, and paired English/Hindi **lesson content**. Much of the surrounding interface is still English.
- Progress saved after each answer, resume after reload, XP, calendar-day streaks, daily goals, simplified SM-2 revision, and mistakes practice.
- Automatic note cards, personal notes, search, 32 glossary entries, and print-to-PDF notebook export on the web.
- Interactive worked-example sandboxes inside the swipeable concept cards, plus four standalone calculators: end-of-month SIP, reducing-balance EMI, purchasing-power erosion, and an emergency buffer. Assumptions and limitations are visible.
- IndexedDB on web and a native SQLite adapter on Android. JSON backup/restore; native backup uses the system share sheet.
- Light/dark themes, reduced-motion support, text scaling with a reflow layout up to 200%, keyboard interaction, and focus-managed dialogs.
- Installable PWA, precached content and local fonts, plus a generated Capacitor Android project with Mia launcher assets and Android Auto Backup enabled.
- A searchable **16-world curriculum outline**, preserving 189 units and 946 explicitly identified skills from the supplied brief.

This is a working **0.2 editorial preview**, not the full multi-hundred-hour course. An outline is not a completed lesson. There are no fabricated learner statistics, leaderboards, or completed-content counts.

## Run

Node 24.x (tested with Node 24.19), npm, and no application secrets or backend services.

```sh
cd /workspace/PennyPilot
npm ci --cache /workspace/.cache/npm
npm run dev
```

Production:

```sh
npm run validate:content
npm test
npm run build
npm run preview
```

`dist/` is the static web deployment artifact. Serve it over HTTPS for installation and offline support. After the first complete online load, the service worker precaches all shipped lessons, fonts, tools, and the curriculum chunk. No runtime font CDN, analytics, or market API is used.

## Vercel deployment

Connect **Sam4d/PennyPilot** and use the **main** branch, with Root Directory set to the repository root (`./`). The checked-in `vercel.json` selects Vite, `npm ci`, the content-validation/build command, and output directory `dist`. Node is pinned to `24.x`. No application environment variables or API keys are required.

Navigation uses URL hashes, so nested page rewrites are unnecessary. Service-worker and manifest responses revalidate so new deployments can be discovered. The site works on phones and desktop; PWA offline availability starts after the first full load. A local successful build does not establish that Vercel has deployed it—check the connected project's deployment result.

## Language

Fresh installs start in **simple Devanagari Hindi with familiar Hinglish elements**. Mia uses everyday terms such as कमाई, प्लान, बजट, EMI, SIP, चेक, and रिटर्न, and explains technical ideas before naming them. English, Roman Hinglish and bilingual modes remain available. Existing saved language choices are preserved. See [language guide](docs/LANGUAGE.md).

## Browser checks

```sh
npm run test:browser
```

The cloud configuration uses the installed `/usr/bin/chromium`. On another machine, change `executablePath` in `playwright.config.ts` or install Playwright Chromium and remove that override. Tests cover the full lesson loop for all ten lessons, answer recovery, notebook persistence, calculators, language switching, backup import/export, mistakes, text enlargement, bank-statement and sorting recovery, version-one backup compatibility, Hindi slider models, and accessibility checks in light/dark themes.

## Build artifacts

`artifacts/Penny-Pilot-preview.apk` is the debug-signed Android test build. `artifacts/Penny-Pilot-web.zip` contains the static website/PWA. These are local review artifacts, not a public deployment or production-signed release.

## Android

See [Android build guide](docs/ANDROID.md). The native project targets Android 7+ (API 24), compile/target SDK 36, JDK 21. `npm run android:sync` rebuilds and syncs the shared application. Production signing credentials are deliberately not committed.

## Project map

- `src/content/schema.ts`, `lessons.ts`, and `everyday.ts`: typed, multilingual lesson data, practical document/sorting activities, and independent arithmetic metadata.
- `src/content/curriculum.json`: searchable outline; planned content is labelled clearly.
- `src/content/glossary.ts`: simple bilingual definitions.
- `src/lib/learning.ts`: pure financial calculations, scoring, streak, and revision scheduling.
- `src/lib/store.ts`: versioned progress, IndexedDB/SQLite adapters, queued writes, and validated backups.
- `src/components/Mia.tsx`: original vector mascot, with motion limited to transforms.
- `src/pages/`: learning path, lesson player, revision, tools, notebook, profile, and curriculum browser. Secondary screens are lazy loaded.
- `scripts/validate-content.ts`: language coverage, identifiers, answer ranges, source links, arithmetic recomputation, and unresolved rules.
- `docs/MASTER-BRIEF.md`: supplied long-term requirements; later user directions supersede its placeholder branding and colours.

## Content accuracy and research

Each lesson is explicitly an editorial draft. Its references are links for verification, not a claim of completed human fact-checking. The active cloud egress policy denied access to Varsity, RBI, NPCI, AMFI, and SEBI pages during this build. Requested domains were saved to the cloud configuration draft; they must be applied before fresh primary-source research can be completed.

No changing tax slabs, product rates, contribution limits, or regulatory statistics are presented as verified current facts. Calculator rates are clearly labelled assumptions. Before publishing rule-dependent lessons, implement the reviewed `rules.json` contract and stale-rule UI described in [content process](docs/CONTENT.md).

## Release scope

See [the seven-day release plan](docs/RELEASE-PLAN.md) and [validation record](docs/VALIDATION.md). The broader requirements—four depth levels per skill, all 16 exercise forms, placements, goal tracks, crowns, exams, certificates, advanced simulators, and the complete curriculum—remain staged work. No public deployment or Play Store submission is implied by a successful local build.

Education only. No investment, tax, or legal advice. No stock recommendations, ads, affiliate links, or broker referrals.
