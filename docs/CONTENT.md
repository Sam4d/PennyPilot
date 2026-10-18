# Curriculum and editorial process

## Scope and sequence

The supplied outline expands to 16 worlds, 189 units, and 946 explicitly named skills. Counts are derived from the actual outline; the brief's headline estimates conflict with its detailed syllabus. Some sector playbooks and capstones are prose outlines and therefore not included in the explicit skill count.

Recommended sequence: everyday money and fraud protection → essential insurance and high-interest debt → economics foundations → risk, compounding and asset allocation → mutual funds and market mechanics → business analysis → indexing and fixed income → gold and property → tax and retirement → technical analysis and derivatives → portfolio integration and life stages. Risk-first sequencing takes priority over making trading look exciting.

At four 3–5 minute levels per explicit skill, the eventual outline implies roughly 189–315 hours before revision and tools. These are planning estimates for unwritten content, not hours currently available.

## What is shipped

Eighteen lesson drafts with eight questions each. Each has a relatable hook, concept, worked example, mistake, three note points, and a practical action. Full English, Devanagari Hindi, and Roman-script Hinglish are included. Questions use Indian settings and explicit illustrative amounts. Six exercise engines are implemented: choice, numeric entry, sequencing, document-row discovery, bucket sorting, and one-to-one matching. Document discovery uses fictional bank statements, bills, grocery labels and loan summaries. Sorting uses native radio controls so it works with touch, keyboard and assistive technology without dragging. The remaining 10 exercise forms must be built and tested before claiming the full specification.

The five-section path is a foundation sampler across World 0, not a claim that all World 0 units are finished. The catalogue keeps the larger syllabus visible while labelling unimplemented material.

## Primary-source review queue

| Area | Primary reference | Required review |
| --- | --- | --- |
| Money and banking | https://www.rbi.org.in/FinancialEducation/ | Currency roles, account and payment explanations |
| UPI safety | https://www.npci.org.in/what-we-do/upi/safety-shield | Current scam warnings and authorised-action nuance |
| Investing foundations | https://investor.sebi.gov.in/ | Risk and investor-protection concepts |
| Mutual funds | https://www.amfiindia.com/ | Scheme structure, factsheet definitions, riskometer |
| Content inspiration | https://zerodha.com/varsity/ and https://zerodha.com/varsity/hi/ | Coverage comparison and learning progression, not copying text or artwork |
| Tax | Income Tax Department official publications | Assessment year, effective dates, slabs, deductions, capital gains |
| Protection | https://irdai.gov.in/ | Cover terminology, exclusions, claims and current regulations |
| Retirement | EPFO, PFRDA, National Savings official resources | Contribution, withdrawal and taxation rules |

Live fetches to the first five destinations returned proxy `403 Forbidden`. The insurance expansion also attempted https://irdai.gov.in/ and https://policyholder.gov.in/; both returned proxy tunnel `403 Forbidden`. Their content was not read in this build. Adding domains to a saved draft does not activate network access; apply the settings and retry. Do not mark a fact as current merely because a URL exists.

## Review pipeline

1. Expand one unit at a time, into four genuinely different levels per skill.
2. Keep each concept focused; explain jargon through a story before defining the term.
3. Add real worked calculations and plausible distractors. Independently recompute numeric answers.
4. Use at least four exercise forms per full skill. Keep most time interactive.
5. Obtain financial subject-matter review against primary sources; retain exact citations and the date read.
6. Obtain native Hindi/Hinglish editorial review; check examples across income levels and regions.
7. Validate structure, numbers, glossary references, reading length, and prohibited promotional claims.
8. Test the lesson on a small Android screen, with keyboard/TalkBack and offline.
9. Publish only approved content. Keep review metadata attached to that version.

## Rules contract for later tax and regulatory content

Use a separate versioned `rules.json` with `{value, unit, source, effective_from, last_verified, review_status}` per key. The date must reflect a real source check. Resolve `{{rule:key}}` through one loader; never duplicate rates in prose. Show source and verification date beside a displayed rate. Flag a rule older than six months and never silently apply a rule to a different assessment year. Cache a reviewed bundled version; online updates require schema/version validation and a trusted HTTPS source. Offline learning must remain available without inventing newer values.

No rule-dependent lesson is shipped in 0.7, so there is no fake “last verified” date or placeholder rate feed.

## Validation boundaries

The current validator verifies presence of all content languages, Devanagari presence, identifiers, source links, eight questions per lesson, answer ranges, complete orderings, glossary records, and all numeric results from separate operands. It flags unresolved rule references and selected promotional phrases. It does not establish factual accuracy, natural translation, reading level, or regulatory freshness. Those require editorial review.

## Protection lesson assumptions

The three new safety-net lessons cover insurance roles, health claim cost sharing and pure term life cover. All contract summaries, premiums and claim figures are fictional. No real product prices, universal waiting periods, current tax benefits, claim deadlines or specific regulatory entitlements are asserted.

The health model applies co-pay to eligible costs, then caps insurer payment at available cover. Excluded costs, co-pay and any amount beyond remaining cover add up to the learner’s share. There is no deductible, restoration, second payer or other sub-limit in this simplified model. The family-support model uses unchanged monthly costs, a selected number of years, ₹2 lakh debt and ₹3 lakh usable savings. It omits inflation, growth, other income and existing cover and is explicitly not a recommended insurance amount.

## Borrowing lesson assumptions

The EMI worksheet uses a fictional first-month payment rounded to rupees; it is not a complete bank quote. The interactive schedule uses fixed annual 12% divided by 12 on a reducing balance, full precision internally, equal monthly payments and final-payment adjustment. It excludes fees, tax, penalties, payment-date effects and rate changes. Displayed rupees are rounded. The full schedule is available in a locally scrollable table.

The purchase-credit lesson and model compare the same fictional phone and delivery/benefits, six payments of ₹6,000, a selectable ₹2,000 cash discount and a selectable upfront fee. No other charges or time-value adjustments are included. The difference is a total-cost amount, never an annual rate or a product recommendation. RBI reference links remain a review queue; no mutable lending regulation or current provider offer is claimed as verified.

## Insurance readers and open catalogue (0.5)

Eight authored reading guides cover beginner, intermediate and advanced insurance concepts. They are fully available in English, Devanagari Hindi and Roman Hinglish, and map to every one of World 12’s 39 skills. Each has three explanatory sections, an example, a practical checklist and a clear editorial-review status. They are reading content, not additional scored lessons; they do not award XP or manufacture completion. The three original insurance quizzes remain separately available.

All 946 named skills and all units are directly accessible in the catalogue. A shipped quiz opens that exact lesson; an insurance topic opens its mapped reading guide; other topics open the supplied outline with an explicit unverified-draft label. An accessible outline is not a completed hundreds-of-hours course. URLs use `#curriculum/S12.3.3`, `#curriculum/unit/12.7` or `#curriculum/world/12`; unknown topic IDs show a recovery message.

English-mode glossary headings no longer render Hindi translations. English examples replace informal Hindi words such as tea-shop terms with standard English. Hindi-specific legal vocabulary that is necessary to recognise a real document is explained in English brackets. The content validator checks authored English fields for Devanagari and selected Hindi words. It does not certify natural writing or replace an editor.

## Goals and net-worth expansion (0.6)

Added two multilingual World 0 drafts, mapped to S0.10.1 (SMART Goals) and S0.10.3 (Net Worth Tracker). The path now has 17 lessons, 136 exercises and five chapter groups. All previous lesson/question IDs and version-one saved progress remain unchanged. Other World 0 topics still show their uncompleted outlines.

The goal example fixes the course price at ₹24,000 and existing reserved savings at ₹6,000. Adjustable monthly deposits arrive at each month end; there is no interest, tax, fee or price inflation. The required monthly whole-rupee amount rounds up. A zero contribution with an open gap is explicitly unreachable under these assumptions. A timeline explores cumulative savings; changing the deadline clamps the selected month. The model does not save personal financial data.

The net-worth example uses current asset estimates and outstanding debts on a single date. Bank savings, a deposit and a vehicle are counted separately; salary is a flow and is not added again. Both positive and negative results are displayed. A borrowing toggle adds the same ₹10,000 to cash and debt to demonstrate that borrowing alone creates no net worth before costs. Sale costs, taxes and future income are excluded. This snapshot is neither immediately spendable cash nor a personal-worth score.

The SEBI financial-planning page was attempted on 18 October 2026 (India), but the proxy returned a tunnel 403. The official investor-site source link remains a review queue. No primary-source verification, financial expert approval or native-language editorial approval is claimed for these drafts. Neither lesson embeds current tax or regulatory figures.

## Simple interest (0.7)

Added S0.5.1 as a multilingual editorial draft with eight exercises, taking the preview to 18 lessons and 144 questions. It covers principal, simple versus annually compounded interest, yearly rate/time units, half years, interest versus total, and why the unchanged-principal worksheet does not model a reducing-balance loan. All prior IDs and progress data remain stable.

The interactive example uses a fictional ₹10,000 principal and fixed 8% annual simple-interest rate. The learner selects 0.5–10 years. Interest is ₹800 per full year and ₹400 per half year; tax, fees, payments, withdrawals and real product day-count methods are excluded. The annual-compounding comparison in the prose assumes one annual credit and reinvestment of interest. The reference link remains the existing primary-source review queue; no current offer, rule or new source verification is claimed.
