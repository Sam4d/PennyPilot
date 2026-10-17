# Curriculum and editorial process

## Scope and sequence

The supplied outline expands to 16 worlds, 189 units, and 946 explicitly named skills. Counts are derived from the actual outline; the brief's headline estimates conflict with its detailed syllabus. Some sector playbooks and capstones are prose outlines and therefore not included in the explicit skill count.

Recommended sequence: everyday money and fraud protection → essential insurance and high-interest debt → economics foundations → risk, compounding and asset allocation → mutual funds and market mechanics → business analysis → indexing and fixed income → gold and property → tax and retirement → technical analysis and derivatives → portfolio integration and life stages. Risk-first sequencing takes priority over making trading look exciting.

At four 3–5 minute levels per explicit skill, the eventual outline implies roughly 189–315 hours before revision and tools. These are planning estimates for unwritten content, not hours currently available.

## What is shipped

Ten lesson drafts with eight questions each. Each has a relatable hook, concept, worked example, mistake, three note points, and a practical action. Full English, Devanagari Hindi, and Roman-script Hinglish are included. Questions use Indian settings and explicit illustrative amounts. Five exercise engines are implemented: choice, numeric entry, sequencing, document-row discovery, and bucket sorting. Document discovery uses fictional bank statements, bills, grocery labels and loan summaries. Sorting uses native radio controls so it works with touch, keyboard and assistive technology without dragging. The remaining 11 exercise forms must be built and tested before claiming the full specification.

The two-section path is a foundation sampler across World 0, not a claim that all World 0 units are finished. The catalogue keeps the larger syllabus visible while labelling unimplemented material.

## Primary-source review queue

| Area | Primary reference | Required review |
| --- | --- | --- |
| Money and banking | https://www.rbi.org.in/FinancialEducation/ | Currency roles, account and payment explanations |
| UPI safety | https://www.npci.org.in/what-we-do/upi/safety-shield | Current scam warnings and authorised-action nuance |
| Investing foundations | https://investor.sebi.gov.in/ | Risk and investor-protection concepts |
| Mutual funds | https://www.amfiindia.com/ | Scheme structure, factsheet definitions, riskometer |
| Content inspiration | https://zerodha.com/varsity/ and https://zerodha.com/varsity/hi/ | Coverage comparison and learning progression, not copying text or artwork |
| Tax | Income Tax Department official publications | Assessment year, effective dates, slabs, deductions, capital gains |
| Protection | IRDAI official policyholder resources | Cover terminology, exclusions, claims and current regulations |
| Retirement | EPFO, PFRDA, National Savings official resources | Contribution, withdrawal and taxation rules |

Live fetches to the first five destinations returned proxy `403 Forbidden`. Their content was not read in this build. Adding domains to a saved draft does not activate network access; apply the settings and retry. Do not mark a fact as current merely because a URL exists.

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

No rule-dependent lesson is shipped in 0.2, so there is no fake “last verified” date or placeholder rate feed.

## Validation boundaries

The current validator verifies presence of all content languages, Devanagari presence, identifiers, source links, eight questions per lesson, answer ranges, complete orderings, glossary records, and all numeric results from separate operands. It flags unresolved rule references and selected promotional phrases. It does not establish factual accuracy, natural translation, reading level, or regulatory freshness. Those require editorial review.
