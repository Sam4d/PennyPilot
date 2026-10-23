# Penny Pilot · Financial Literacy App for India

An offline-capable, multilingual financial education app with interactive lessons, budgeting exercises, financial calculators, and spaced repetition. Built as a progressive web app (PWA) with a Capacitor Android project.

A thoughtful, playful finance-learning app for India. **Penny Pilot** is the product name; **Mia**, an original chibi cat, is the guide. White, charcoal, and green, with a responsive learning path, animated SVG illustration, and touch-friendly concept scrollers.

## What works in this preview

- Eighteen foundation lessons: money and barter, cash flow, budgeting, UPI scam awareness, compounding, emergency savings, inflation, bank statements, credit-card bills, debt repayment, insurance basics, health cover, term life cover, EMI, purchase-credit costs, goal planning, net worth and simple interest.
- 144 authored exercises across six engines: multiple choice / true–false, numeric answers, sequencing, document-row discovery, accessible bucket sorting, and one-to-one matching; immediate explanation and optional deeper context.
- English, conversational Hindi, Hinglish, and paired English/Hindi **lesson content**. Main-screen interface copy is available in English and Hindi; original planning outlines remain English and are labelled drafts.
- Progress saved after each answer, resume after reload, XP, calendar-day streaks, daily goals, simplified SM-2 revision, and mistakes practice. Revision plans combine previously attempted questions across topics, with a seven-day IST schedule, question limits and saved multi-topic resume.
- Automatic note cards, personal notes, search, 46 glossary entries, and print-to-PDF notebook export on the web.
- Interactive worked-example sandboxes inside the swipeable concept cards, plus four standalone calculators: monthly SIP or one-time lump-sum growth, reducing-balance EMI, purchasing-power erosion, and an emergency buffer. Assumptions and limitations are visible.
- IndexedDB on web and a native SQLite adapter on Android. JSON backup/restore; native backup uses the system share sheet.
- Adaptive-height concept cards keep the selected story during resizing, with stable controls, touch swiping, reduced-motion scrolling and keyboard-safe source expansion.
- Light/dark themes, reduced-motion support, text scaling with a reflow layout up to 200%, keyboard interaction, and focus-managed dialogs.
- Installable PWA, precached content and local fonts, plus a generated Capacitor Android project with Mia launcher assets and Android Auto Backup enabled.
- A dedicated **Insurance** section: eight multilingual reading guides from beginner to advanced, mapped to all 39 World 12 topics, plus the three existing interactive insurance lessons. Topics include importance, benefits, health/term cover, deductibles and top-ups, savings-linked products, other covers, claims and advanced comparison.
- English mode hides Hindi glossary translations and uses standard English examples. A language validator flags accidental Hindi/Hinglish in English teaching fields. Paired mode deliberately shows both languages.
- A web update notice saves pending progress before activating a waiting service worker and reloading, keeping stored language choices.
- A searchable **16-world topic library**, preserving 189 units and 946 named skills. Every topic and unit opens directly, with reloadable links and previous/next navigation. Available quizzes launch the selected lesson; unfinished topics show their draft outline.

This is a working **0.8 editorial preview**, not the full multi-hundred-hour course. An outline is not a completed lesson. There are no fabricated learner statistics, leaderboards, or completed-content counts.

## Run

Node 24.x (tested with Node 24.19), npm, and no application secrets or backend services.

```sh
npm ci
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

Fresh installs start in **simple Devanagari Hindi with familiar Hinglish elements**. Mia uses everyday terms such as कमाई, प्लान, बजट, EMI, SIP, चेक, and रिटर्न, and explains technical ideas before naming them. The English variant uses simple, standard English, with necessary jargon explained in brackets. English, optional Roman Hinglish and bilingual modes remain available. Existing saved language choices are preserved. See [language guide](docs/LANGUAGE.md).

## Browser checks

```sh
npm run test:browser
```

Install a browser with `npx playwright install chromium` and run `npm run test:browser`. To use another locally installed Chromium, set `PENNY_BROWSER_EXECUTABLE` to its executable path. For a built production preview use `PENNY_TEST_PRODUCTION=1` as well. Tests cover the full lesson loop for all eighteen lessons, answer recovery, notebook persistence, calculators, language switching, backup import/export, mistakes, text enlargement, bank-statement and sorting recovery, insurance model limits and cost sharing, matching/reassignment/revision, repayment tables and fee comparisons, version-one backup compatibility, Hindi slider models, and accessibility checks in light/dark themes.

## Build artifacts

`artifacts/Penny-Pilot-preview.apk` is the debug-signed Android test build. `artifacts/Penny-Pilot-web.zip` contains the static website/PWA. These ignored artifacts are generated locally and are not included in a source checkout. Build the web output with `npm run build` and the test APK using the Android guide. They are not a public deployment or production-signed release.

## Android

See [Android build guide](docs/ANDROID.md). The native project targets Android 7+ (API 24), compile/target SDK 36, JDK 21. `npm run android:sync` rebuilds and syncs the shared application. Production signing credentials are deliberately not committed.

## Project map

- `src/content/schema.ts`, `lessons.ts`, and `everyday.ts`: typed, multilingual lesson data, practical document/sorting activities, and independent arithmetic metadata.
- `src/content/curriculum.json`: searchable outline; planned content is labelled clearly.
- `src/content/glossary.ts`: simple bilingual definitions.
- `src/lib/learning.ts`: pure financial calculations, scoring, streak, and revision scheduling.
- `src/lib/store.ts`: versioned progress, IndexedDB/SQLite adapters, queued writes, and validated backups.
- `src/components/Mia.tsx`: original vector mascot, with motion limited to transforms.
- `src/pages/`: learning path, lesson player, revision, tools, notebook, profile, and curriculum browser. Secondary screens are lazy loaded. The production build separates lesson data, React and local-storage libraries for caching; the first page still loads its required data and libraries.
- `scripts/validate-content.ts`: language coverage, identifiers, answer ranges, source links, arithmetic recomputation, and unresolved rules.
- `docs/MASTER-BRIEF.md`: supplied long-term requirements; later user directions supersede its placeholder branding and colours.

## Content accuracy and research

Each lesson is explicitly an editorial draft. Its references are links for verification, not a claim of completed human fact-checking. The active cloud egress policy denied access to Varsity, RBI, NPCI, AMFI, and SEBI pages during this build. Current rule and external academic benchmarking verification remain outstanding.

No changing tax slabs, product rates, contribution limits, or regulatory statistics are presented as verified current facts. Calculator rates are clearly labelled assumptions. Before publishing rule-dependent lessons, implement the reviewed `rules.json` contract and stale-rule UI described in [content process](docs/CONTENT.md).

## Release scope

See [overall completion estimates](docs/PROGRESS.md), [the seven-day release plan](docs/RELEASE-PLAN.md) and [validation record](docs/VALIDATION.md). The broader requirements—four depth levels per skill, all 16 exercise forms, placements, goal tracks, crowns, exams, certificates, advanced simulators, and the complete curriculum—remain staged work. No public deployment or Play Store submission is implied by a successful local build.

Education only. No investment, tax, or legal advice. No stock recommendations, ads, affiliate links, or broker referrals.

## Targeted production checks

`npm run test:offline` checks the production site, insurance readers, direct topic reload, lump-sum mode and saved answers offline (with the preview server running). `npm run test:updates` starts its own temporary local test server and verifies an actual waiting service-worker replacement preserves progress and English after a user-approved refresh. These checks do not establish a public Vercel deployment or native device behaviour.

## Learning design and trust

First launch asks for a language and offers a one-question introduction. It does not award completion of a full lesson. Study days use IST. New completed lessons earn capped, free streak protection; no payment or shame mechanic is used. Draft status, device-local error notes, safe exit and an education-only About page make the limits visible. Backup history records an export request; saving the file itself must be confirmed by the user.

See [design system](docs/DESIGN.md), [Hindi interface audit](docs/LOCALISATION-AUDIT.md), and [curriculum proposal](docs/ROADMAP-CONTENT.md). The curriculum proposal targets undergraduate finance competencies; degree equivalence and external academic approval are **Not verified**. New proposed lessons await approval. A software licence has not been selected; no LICENSE has been invented.

Saved progress now uses payload version 3. Version 1 and 2 local records and backups migrate on load, preserving names, language, answers, XP, notes and suspended lessons. Version 3 adds the remaining revision-plan topics and checked-answer count; see [revision behaviour](docs/REVISION.md). The database table layout stays unchanged. Old activity-day keys are retained because the timezone in which they were originally created cannot be inferred; new activity and review days use IST. Older app builds that only accept versions 1–2 cannot read a version 3 backup.

### Reproducing CI visual checks

CI runs on Ubuntu 24.04 inside a digest-pinned Debian 13 / Node 24 container. Its Chromium and fallback-font package versions are explicit in `.github/workflows/checks.yml`. The reviewed Chromium version comes from a dated Debian security snapshot because the live repository removes superseded versions. TLS, archive signatures and package hashes remain verified; only the historical snapshot's freshness-expiry check is disabled for that source. UI fonts are bundled, Devanagari fallbacks are explicit, and the home decorations use SVGs so their appearance does not depend on installed system fonts. The checked-in visual references use that minimal Debian renderer. Browser/package upgrades require a reviewed reference comparison; do not silently switch renderers or accept new images.

Run `PENNY_TEST_PRODUCTION=1 npm run test:browser` after building. To use a system Chromium locally, set `PENNY_BROWSER_EXECUTABLE` to its resolved executable. Keep screenshot tolerances unchanged; inspect differences before updating references. CI retains failure screenshots, traces, diffs and context in the `browser-failure-evidence` artifact.
