# Validation record — 18 October 2026 (India)

## Passed in this cloud machine

| Check | Outcome |
| --- | --- |
| Frozen install | `npm ci --cache /workspace/.cache/npm` completed; no lockfile rewriting needed |
| TypeScript + production web | `npm run build` passed; static artifact and PWA service worker generated |
| Content structure | 15 lessons, 120 questions, 46 glossary entries, 16 world outlines and 8 multilingual insurance guides validated; all numeric answers independently recomputed |
| Unit suite | 40 tests passed: prior finance/progress checks plus lump-sum assumptions, all 946 skill targets, all unit targets, outline boundaries, and insurance guide coverage |
| Browser suite | 44 browser cases passed: a full 43-case suite plus the new all-world-search case; focused guide keyboard/a11y cases also pass. Includes all 120 exercises, lump sums, English glossary, insurance readers and direct topic reload/history |
| Production offline | Service-worker installation, offline reload, lazy lesson player, correct-answer save, curriculum opening, new bank-document answer recovery, and the new health-cover model passed with the browser offline |
| Layout | No horizontal document/button overflow at 320, 360, 390, 768, 1024, and 1440 px in the learning view |
| Automated accessibility | No axe violations on the five main screens in light/dark themes, on the interactive lesson example in both themes, on the new document feedback and bucket activity in both themes, and on all three protection models in light/dark themes |
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

## Protection expansion (0.3.0)

- Added insurance basics, health cover and term cover: three multilingual editorial drafts, 24 exercises and eight glossary entries. Hindi introduces terms in brackets as requested. All changing policy figures are fictional; no real product quote, universal waiting period or current tax rule is asserted.
- New interactive examples show a covered/excluded treatment, eligible/excluded health costs with co-pay and a remaining-cover cap, and a static-cost family-support gap. The support gap is expressly not a recommended cover amount.
- Eight new unit cases verify allocation of excluded costs, co-pay, exhausted cover, conservation of the total bill, invalid inputs and the support-gap floor. The full unit suite has 23 passing tests. Content validation independently recomputes numeric answers, including the minimum of an eligible bill and available cover.
- The full 30-case Chromium suite passed, including completion of all 104 exercises. New cases exercise all three protection models and run axe in light/dark themes. A Hindi case reads bracketed terms, answers a document and numeric question, and resumes its graded answer after reload.
- A production check at 320, 360, 390, 768, 1024 and 1440 px found 13 nodes in three chapter cards with no horizontal document overflow. The health model also works at 200% text size and 360 px without horizontal overflow.
- The production offline test now opens and changes the new health model after offline reload and bank-answer recovery. It passes with the split production bundle.
- The added content initially produced a 533 kB combined entry chunk. The build now separates lesson data, React and Dexie: entry about 70 kB, lesson data 149 kB, React 219 kB, storage 95 kB, with no chunk above the default 500 kB warning. These remain required initial dependencies; this is a caching boundary, not a measured cold-start improvement. The complete PWA precache is about 1.02 MiB (32 entries), including fonts and planned-curriculum data.
- Android 0.3.0 (version code 4) compiles successfully; signature scheme v2 and 16 KB zip alignment verification pass. Minimum API 24, target API 36, app label and stable package identity are checked. Updated APK and website review bundles remain ignored build artifacts. Physical-device runtime and production deployment are still unverified.
- Attempts to read IRDAI and its policyholder site received proxy tunnel 403 responses. The source links are a review queue, not completed primary-source fact-checking. Overall completion remains about 10% against the full agreed scope.

## Borrowing and matching expansion (0.4.0)

- Added EMI and purchase-credit cost comparison: two multilingual editorial drafts with 16 questions, six glossary entries and two interactive models. Hindi/English both explain unfamiliar terms in brackets. All figures are fictional and all original lesson/question IDs remain stable.
- Added the sixth exercise engine: one-to-one matching. Native buttons support touch and keyboard, each current pairing has an accessible description, reassignment removes any conflicting pair, incomplete mappings cannot be checked, and graded arrays use the unchanged progress/backup format. Corrections survive reload and questions work in revision.
- Ten new unit tests cover the fixed-rate repayment formula, zero/tiny interest, terms up to 600 months, payment/principal conservation, a fully cleared final balance, longer-period trade-offs, upfront fees, offer discounts and invalid inputs. All 33 unit tests pass.
- The final full 37-case Chromium suite passes. New cases exercise pair reassignment, focus after keyboard pairing, wrong-answer recovery, correction in revision, Hindi matching, changing tenure, last-month payoff, the full schedule table and fee/discount changes. Axe reports no violations for matching before/after grading and both models in light/dark themes.
- The initial mobile revision check exposed an action whose text changed when the mobile layout hid its secondary label. Added an explicit accessible action name that includes the lesson title and practice intent. The affected flows and subsequent full suite pass.
- Matching text was enlarged and cards aligned after visual review. The production path has 15 nodes across four chapter cards with no horizontal document overflow at 320, 360, 390, 768, 1024 and 1440 px. Matching reflows at 200% text size without horizontal overflow. The repayment table scrolls inside its own labelled region.
- The production offline check also changes the repayment model, answers a matching question and recovers its graded feedback after reload. Existing bank-answer and insurance checks remain included.
- Web/PWA and Android 0.4.0 (version code 5) builds pass. The release preview APK is debug-signed; signature v2 and 16 KB zip alignment checks pass. Stable package `in.pennypilot.learn`, minimum API 24 and target API 36 are preserved. Physical-device runtime and hosted deployment remain unverified.
- No dependency was added. The production entry remains about 70 kB with lesson data and stable libraries split for caching; full PWA precache is about 1.07 MiB. This is not a measured device performance claim. Financial and native-language review remain outstanding. Overall full-project completion remains approximately 10%.

## Lump sums, insurance readers and open catalogue (0.5.0)

- SIP now offers monthly contributions or a one-time lump sum. The lump-sum model invests principal once, compounds annually and preserves a separate amount. Assumptions, contribution totals and gain/loss update with the chart. Zero and negative return cases pass. Large results wrap at narrow widths.
- Added an Insurance navigation section with eight fully authored English/Hindi/Roman-Hinglish reading guides at beginner/intermediate/advanced levels. They cover importance, benefits and limits; health and term cover; deductibles, top-ups, restoration and continuity; savings-linked policies; other covers; claims/complaints; and advanced comparison. All 39 World 12 skill IDs map to a guide. Reading does not create quiz completion or XP.
- All 946 named skills and all 189 units can open directly. Available quizzes launch the selected lesson. Insurance skills open an authored guide. Other topics show their supplied, unverified draft outline. Hash links survive reload; previous/next and browser-back navigation pass. All-world search is tested separately. No claim is made that all outlines are completed teaching content.
- Fixed the English glossary leak: Hindi translations are now restricted to Hindi/paired modes. Replaced Hindi words in authored English examples and selected outline text. Automated checks flag Devanagari and selected Hindi words in English fields. English-mode browser cases switch out of paired mode and reload without Hindi leaking into the dictionary or new readers. User-written notes remain untouched.
- Added a save-and-update banner for a waiting web service worker. The production test starts a temporary local server, changes actual service-worker script bytes, waits for the replacement, selects Save and update, and verifies both the entered profile name and English survive reload. No automatic mid-lesson refresh is forced. The check is added to GitHub CI.
- The full 43-case Chromium suite passed, then the added all-world search case passed. Two focused guide cases passed again after adding keyboard focus to in-guide section links. All 40 unit tests pass. Content validation includes every guide section, example and checklist in all three content languages.
- Axe reports no violations for the new insurance readers in light/dark mode and for the insurance hub. Manual production checks found no horizontal overflow in the hub at 320, 360, 390, 768, 1024 and 1440 px; readers at 320–1440 px; or maximum lump-sum results at 320 px. Hub/reader layouts reflow at 200% text size.
- Production offline checks now also open insurance guides, reload a direct insurance topic and use lump-sum mode. Existing lesson-answer, matching and insurance/loan model recovery checks remain included.
- Web and Android 0.5.0 (version code 6) builds pass. Debug APK signature v2, 16 KB zip alignment, stable package, minimum API 24 and target API 36 are verified. Native runtime and an actual hosted Vercel deployment remain unverified.
- No dependencies were added. All shipped content/fonts remain precached. The readers are editorial drafts, with official reference links and no fabricated current regulatory verification. Overall completion is now estimated at 13% using the same weighted full-project scope in PROGRESS.md.
