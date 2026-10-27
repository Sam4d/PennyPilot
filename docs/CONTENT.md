# Curriculum and editorial process

## Scope and sequence

The supplied outline expands to 16 worlds, 189 units, and 946 explicitly named skills. Counts are derived from the actual outline; the brief's headline estimates conflict with its detailed syllabus. Some sector playbooks and capstones are prose outlines and therefore not included in the explicit skill count.

Recommended sequence: everyday money and fraud protection → essential insurance and high-interest debt → economics foundations → risk, compounding and asset allocation → mutual funds and market mechanics → business analysis → indexing and fixed income → gold and property → tax and retirement → technical analysis and derivatives → portfolio integration and life stages. Risk-first sequencing takes priority over making trading look exciting.

At four 3–5 minute levels per explicit skill, the eventual outline implies roughly 189–315 hours before revision and tools. These are planning estimates for unwritten content, not hours currently available.

## What is shipped

Twenty-three lesson drafts with eight questions each. Each has a relatable hook, concept, worked example, mistake, three note points, and a practical action. Full English, Devanagari Hindi, and Roman-script Hinglish are included. Questions use Indian settings and explicit illustrative amounts. Six exercise engines are implemented: choice, numeric entry, sequencing, document-row discovery, bucket sorting, and one-to-one matching. Document discovery uses fictional bank statements, bills, grocery labels and loan summaries. Sorting uses native radio controls so it works with touch, keyboard and assistive technology without dragging. The remaining 10 exercise forms must be built and tested before claiming the full specification.

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

## Expanded curriculum architecture — 18 October 2026

[ROADMAP-CONTENT.md](ROADMAP-CONTENT.md) proposes deeper coverage across all 16 worlds, including accounting, quantitative reasoning, corporate finance, empirical methods, insurance and assessed projects. It specifies short explanatory passages, interactive mock boards, purposeful repetition and four levels of increasingly independent work. This task changes the teaching plan, not the 18-lesson/144-exercise authored inventory. The next ten proposals await approval. Source verification and external university benchmarking remain **Not verified**; the plan cannot substantiate degree equivalence or hundreds of available study hours.

## Approved foundation batch 0.9 — 23 October 2026

The owner approved the ranked sequence in ROADMAP-CONTENT.md. Added `payslip` (S0.2.2) and `irregular-income` (S0.2.5): two multilingual drafts with three extra explanatory readings each, worked boards and eight questions each. The cash-flow topic retains its original `income` lesson as well; topic details now show all matching lessons rather than only the first. All existing lesson/question IDs remain unchanged.

Both new lessons repeat and connect income, spending, saving, debt, net-worth and goal concepts. They use fictional assumptions dated 23 October 2026. Payslip amounts are not current tax/PF/contribution rates or legal entitlements. The cash-flow model puts receipts before payments within each month and may miss a funding gap inside a month; it labels negative projections as unfunded plans, not credit. Separate planned pots are not counted twice as available cash.

### Needs verification

- `https://www.epfindia.gov.in/site_en/For_Employees.php`: attempted 23 October 2026; HTTP 403, not read. Current contribution/eligibility and payroll-rule verification is outstanding.
- `https://www.rbi.org.in/FinancialEducation/`: retried 23 October 2026; HTTP 403, not read. No fresh source verification is claimed.
- `https://www.incometax.gov.in/iec/foportal/`: review-queue link only; not fetched for this batch. No current tax slabs, withholding calculation, deduction rates or assessment-year comparison was authored.

The new lessons explicitly have `sourceStatus: "unverified"` and a multilingual source note. Source links are a review queue; independent financial/native-language review and measured novice timing remain outstanding. The 15-minute lesson values are authoring estimates, not verified learning hours.


## Identity-safety draft 0.10 — 23 October 2026

The approved foundation sequence now includes `identity-safety` at S0.9.2: seven English/Hindi/Roman Hinglish concept cards and eight practice questions. Three fictional board cases cover fake KYC deadlines, refund/OTP pressure and impersonation/remote access. All board addresses are reserved `.invalid` examples shown as text, with no live links, code inputs or network activity. Introductory payment lesson `safety` and all stable IDs remain unchanged. The preview inventory is 21 lessons and 168 exercises, plus eight insurance guides.

### Needs verification

- `https://www.rbi.org.in/commonperson/English/Scripts/AgainstFrauds.aspx`: attempted 23 October 2026; CONNECT returned HTTP 403, source not read. Source status is explicitly `unverified`. Current reporting routes, numbers, deadlines, legal liability and recovery eligibility are withheld. Financial expert and native-language review remain outstanding. General safety material is an editorial draft, not independently approved guidance.


## Credit-report / score draft 0.11 — 23 October 2026

Fourth approved foundation lesson: `credit-score`, mapped to S0.6.5. Seven English/Hindi/Roman Hinglish cards explain report/score/lender distinctions, dates and evidence, single-card utilisation, affordable repayment, possible record errors and misleading score promises. The board has four fictional entries, a single-card ratio sandbox and three behaviour comparisons. Eight exercises include document inspection, a decimal fraction and transfer questions. Preview inventory: 22 drafts / 176 questions / 50 glossary entries / eight insurance guides. No real report is uploaded, no score is calculated and no original IDs or stored schema were changed.

### Needs verification

- `https://www.cibil.com/credit-score`: attempted 23 October 2026; CONNECT returned HTTP 403, not read. Source status remains `unverified`. No current report-access entitlement, score band, model weight, correction deadline or legal remedy is stated. Financial expert and native-language review remain pending. All report entries and amounts are fictional; the ratio is an explicit teaching calculation, not an approval threshold.


## Banking / KYC draft 0.12 — 27 October 2026 (India)

Fifth approved foundation item: `banking-kyc` at S0.4.2. Seven English/Hindi/Roman Hinglish cards separate account terms, identity checks, payment permission, payment routes and recorded/available balances. The three-panel board inspects a fictional request, compares payment methods and reconciles a single assumed hold moving to a debit. All amounts, the ₹100 illustrative fee and the hold treatment are fictional assumptions dated 27 October 2026. The original statement lesson `banking` at S0.4.7 and every original ID remain intact. Preview inventory: 23 drafts / 184 questions / 50 glossary entries / eight insurance guides.

### Needs verification

- `https://www.rbi.org.in/FinancialEducation/`: attempted 27 October 2026, then retried outside the sandbox with permission; both CONNECT attempts returned HTTP 403. Source not read. No current legally sufficient document list, eligibility rule, update deadline, payment-network limit/timing, fee schedule or bank-balance guarantee is given. General identity-number/tax-identifier descriptions, financial accuracy and native-language tone still need primary-source and human review. The board cannot approve an account, accept identity documents or move real money.
