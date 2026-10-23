# Foundation teaching batch 0.9

Authoring approved in chat on 23 October 2026. This implements the first two ranked proposals in ROADMAP-CONTENT.md; independent financial/native-language approval remains outstanding.

| Draft | Curriculum mapping | Teaching and transfer |
| --- | --- | --- |
| `payslip` | S0.2.2 | Annual/monthly units; employer package cost versus gross pay versus bank cash; destinations of deductions; conditional bonuses; budget from take-home pay. Changing employer costs without changing cash tests understanding beyond subtraction. |
| `irregular-income` | S0.2.5 | Equal income totals with different timing; working cash versus known-bill saving; underfunded reserves; shortfalls versus credit; limits of monthly aggregation. Retains the original `income` draft on the same topic. |

Each draft has seven concept cards, three extra explanatory readings, a worked board, eight graded questions, reusable notes and a practical action. English uses plain explanations with necessary terms in brackets; Hindi uses Devanagari with familiar Hinglish terms; Roman Hinglish is separate. The questions move through identifying, calculating, applying and comparing. This is not the completed four-pass depth ladder, a placement test or a claim of mastery.

## Repeated connections

- Income and borrowing are different; an advance or loan is not extra earned income.
- A period matters: annual package figures and monthly spending cannot be combined without checking their components.
- Assigned money is counted once. A salary deduction is not subtracted again from a budget based on net pay; a known-fee pot is not also spare working cash.
- A saving goal must fit cash and timing, not just an optimistic average or bonus target.
- A model can balance in total yet be unusable early in the period. Negative projected cash is missing funding, not an available overdraft.

## Model contracts

`src/lib/payroll.ts` uses whole-rupee fictional inputs. Gross is basic pay plus allowance; net subtracts only the two example employee deductions. Employer benefits affect annual package cost, and a conditional target bonus changes the target package, while neither becomes a monthly bank deposit. The board keeps resulting annual cost and monthly cash beside the active row slider so the result remains visible on phones.

`src/lib/cashflow.ts` creates a six-month planning ledger. Saving for the known fee is capped at its remaining target and stops after the due month. The fee payment comes from its assigned pot once; an underfunded pot exposes the remainder instead of silently using another pot. Working cash plus the fee pot reconciles to opening cash and receipts minus essentials and planned fee payments. If working cash goes negative, the transfers/payments are an unfunded projection, not an actual completed payment. Income is placed before payments within each month, so real within-month dates can create further gaps. The model adds no interest, new borrowing or price forecasts.

All amounts are assumptions dated 23 October 2026. No current payroll, tax, contribution or eligibility rule is embedded. Source status is explicitly unverified; blocked and unattempted source checks are distinguished in CONTENT.md. The 15-minute labels are authoring estimates; actual novice time is not verified.

## Compatibility and access

Original lesson/question IDs and progress payload version 3 remain unchanged. Optional `readings` and `sourceNote` extend teaching data, not user storage. Questions/notes still save through the existing IndexedDB/SQLite adapters. Catalogue topics now list every matching lesson, with distinct accessible launch labels for multiple choices. Long concept navigation uses a locally scrolling strip of 44px controls; existing four-card lessons retain their layout. All topics remain open.

The app is 0.9.0 / Android version code 11. No dependency, account, backend, analytics or runtime data service was added. Source links are review references, not automatic network requests. APK build success does not establish physical Android scrolling, SQLite restoration or TalkBack correctness.
