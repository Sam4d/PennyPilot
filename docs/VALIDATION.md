# Validation record — 18 October 2026

## Passed in this cloud machine

| Check | Outcome |
| --- | --- |
| Frozen install | `npm ci --cache /workspace/.cache/npm` completed; no lockfile rewriting needed |
| TypeScript + production web | `npm run build` passed; static artifact and PWA service worker generated |
| Content structure | 6 lessons, 48 questions, 24 glossary entries, 16 world outlines validated; all numeric answers independently recomputed |
| Unit suite | 15 tests passed: finance formulas, Indian formatting, streak boundaries, revision scheduling, grading, backup rejection and round-trip |
| Browser suite | 16 tests passed in Chromium; all 48 exercises completed across six lessons; reload recovery, rapid note entry, calculators, Hindi, backups, mistakes, 200% text, scroller model and browser back |
| Production offline | Service-worker installation, offline reload, lazy lesson player, correct-answer save, and curriculum opening passed with the browser offline |
| Layout | No horizontal document/button overflow at 320, 360, 390, 768, 1024, and 1440 px in the learning view |
| Automated accessibility | No axe violations on the five main screens in light/dark themes, and on the interactive lesson example in both themes |
| Production dependency audit | `npm audit --omit=dev` reported zero known vulnerabilities at the time of the check |
| Android build | SDK platform 36, build-tools 35/36, JDK 21.0.12.1; Gradle compilation and debug APK packaging passed |
| APK integrity | Android `apksigner verify --verbose` passed, APK Signature Scheme v2, one signer; debug/testing signature |

The initial rapid-typing test exposed a delayed snapshot queue. Progress writes now coalesce to the latest complete snapshot and note/lesson close actions flush pending writes. The full browser suite passed after the fix.

## Important boundaries

- Browser tests ran in cloud Chromium, not on a physical low-end phone. No measured 60 fps, 2 GB RAM, or sub-3-second cold-start claim is made.
- Android compilation/signature verification is not an Android runtime test. Native SQLite, system share, file import, TalkBack, device TTS, insets and Google Auto Backup/reinstall flows still need hardware validation.
- Automated accessibility is one layer; human screen-reader/usability review is still needed.
- Human finance review and native Hindi/Hinglish editorial review have not occurred. Source links are included, but live financial-source browsing was denied by the active proxy policy.
- The catalogue is an outline, not 946 completed skills or hundreds of available learning hours.
- No public website deployment, production signing, Play submission, or new-task snapshot restoration was performed. GitHub repository updates are separate from deployment validation.

## Native setup corrections

The base image had a JRE without `javac`. Installed the latest JDK 21 build advertised by the official Temurin release page, verifying its published SHA-256. Installed Android tools from Google's official source; the command-line archive was verified against the official manifest checksum. The Gradle wrapper has the official distribution SHA-256 pinned.

The downloaded JDK needed the machine's managed Java CA store and the existing HTTPS proxy properties. The build helper uses these supported settings. TLS was never disabled. Android's legacy Gradle SDK parser warns about newer SDK metadata and unavailable build analytics preferences; these did not prevent the successful build.

## Hindi-first and Vercel follow-up

- Fresh learners start in Devanagari Hindi; previously saved language choices are preserved.
- Reworked lesson scripts and glossary definitions into everyday Hindi with familiar Hinglish terms. Technical meaning and all numeric answers remain unchanged.
- Added a browser test for the Hindi-first flow through a scored compounding question. The optional English-mode regression suite still exercises all 48 questions.
- Added `vercel.json`: Vite, Node 24.x, `npm ci`, content validation plus production build, output `dist`, and service-worker/manifest revalidation. Repository root is `./`; no application secrets are required.
- Vercel deployment itself must be checked in the connected Vercel project. A successful build and GitHub push do not establish a successful hosted deployment.
