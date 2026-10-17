# Validation record — 17 October 2026

## Passed in this cloud machine

| Check | Outcome |
| --- | --- |
| Frozen install | `npm ci --cache /workspace/.cache/npm` completed; no lockfile rewriting needed |
| TypeScript + production web | `npm run build` passed; static artifact and PWA service worker generated |
| Content structure | 10 lessons, 80 questions, 32 glossary entries, 16 world outlines validated; all numeric answers independently recomputed |
| Unit suite | 15 tests passed: finance formulas, Indian formatting, streak boundaries, revision scheduling, grading, backup rejection and round-trip |
| Browser suite | 24 tests passed in Chromium; all 80 exercises completed across ten lessons; reload recovery, rapid note entry, calculators, Hindi, backups, mistakes, 200% text, scroller models, bank documents, bucket sorting, legacy progress and browser back |
| Production offline | Service-worker installation, offline reload, lazy lesson player, correct-answer save, curriculum opening, and new bank-document answer recovery passed with the browser offline |
| Layout | No horizontal document/button overflow at 320, 360, 390, 768, 1024, and 1440 px in the learning view |
| Automated accessibility | No axe violations on the five main screens in light/dark themes, on the interactive lesson example in both themes, and on the new document feedback and bucket activity in both themes |
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

## Everyday-money expansion (0.2.0)

- Added four fully authored editorial-preview lessons: inflation/purchasing power, bank statements, credit-card minimum due, and debt repayment strategies. Every lesson has eight multilingual questions, notes, an action and an interactive worked example. Rates, prices and documents are explicitly illustrative.
- Added document-row discovery and accessible bucket sorting, with row-specific corrections, incomplete-answer guards, live counts, native radio controls, keyboard support and saved graded mappings. All five exercise engines use the existing answer and revision format.
- The final 24-test browser suite passed. Added cases check changing a completed classification before submission, wrong-answer corrections after reload, light/dark accessibility, four Hindi slider models, and import of the original six-lesson version-one backup followed by the first new lesson.
- Fixed the listen-button accessible name and feedback/mascot-label contrast identified by the stricter checks. Axe reports no violations for document feedback and ungraded bucket activities in both themes at 360 px. This is automated coverage, not a human accessibility certification.
- Rechecked the two-section path at 320, 360, 390, 768, 1024 and 1440 px: ten nodes, two cards, no horizontal document overflow. The final production offline check also recovers a new bank-document answer after reload.
- Android version code 2 / version name 0.2.0 builds successfully. APK signature v2 and 16 KB zip alignment checks pass; package `in.pennypilot.learn`, minimum API 24, target API 36 and app label Penny Pilot are verified. Physical-device runtime testing remains outstanding.
- No new dependency was added. The final service worker precaches the shipped content and local fonts; bundled precache content remains below 1 MiB. GitHub push and hosted Vercel deployment are separate checks.

## Language clarification (0.2.1)

- Preserved Devanagari Hindi with familiar Hinglish terms as the default. Labelled the optional Roman-script variant “Hinglish (Roman)” to make the distinction clear.
- Simplified English teaching explanations across the shipped lessons and selected glossary definitions. Necessary terms follow plain meanings in brackets, including principal, EMI, debit, minimum due, debt avalanche and debt snowball. Amounts, question identifiers, answers and saved progress are unchanged.
- Content validation, all 15 unit tests and all 24 browser tests pass. Production web build, offline answer recovery, Android version 0.2.1 / version code 3 build, APK signature and 16 KB zip alignment checks pass.
- Saved the requested completion-reporting convention in AGENTS.md and a weighted, explicitly estimated full-project baseline in PROGRESS.md. Overall completion is approximately 10%; this wording update does not materially advance the full curriculum or production release gates.
