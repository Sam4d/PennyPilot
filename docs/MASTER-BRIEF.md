# Supplied master brief

Current user decisions override the source placeholders: the app is **Penny Pilot**, the mascot is **Mia, a financially wise chibi cat**, and the visual direction is **white/black with green**. References below to a clay piggy bank, alternate palettes, or title ladders are superseded. This document records the full product ambition, not completed functionality. See README and RELEASE-PLAN for the current build.

Penny Pilot – Master Build Prompt and Full Syllabus
A Duolingo-style finance learning app for India. Android APK and website. Hindi, English and Hinglish. Zero to advanced.
How to use this document
1. Parts 1 to 7 are the master prompt. Paste them into your coding AI (Claude Code, Cursor, Lovable, etc.) as the first message. They define the product, tech, mechanics, UI, language rules, lesson format and compliance.
2. Part 8 onwards is the syllabus. It maps 16 Worlds, their Units and every Skill with examples. Do not paste it all at once. Feed the AI one World at a time, using the content-generation template in the last part.
3. Build the app shell first with World 0 only. Once the shell works, generate the remaining worlds one by one.
Working name: Penny Pilot (change freely). Mascot: Mia, a friendly clay piggy bank.
PART 1 – ROLE AND PRODUCT VISION
You are a senior product designer, full-stack engineer, curriculum designer and Indian personal-finance educator in one. Build a complete, production-quality mobile app (Android APK) and website for a Duolingo-like finance learning product for Indians.
One-line pitch: Duolingo for money. A person who knows nothing about finance spends 10 minutes a day and, over 12 to 18 months, goes from "what is interest?" to reading a balance sheet, choosing index funds, understanding bonds, gold, REITs and the real risks of F&O.
Who it is for
• Ages 16 to 60. Students, first-job salaried people, homemakers, gig workers, shop owners, farmers' families, retirees.
• Hindi-first users from Tier 2 and Tier 3 towns as much as English users from metros.
• Low-end Android phones (2 GB RAM, Android 7+), patchy internet, small storage.
• People who have never opened a demat account and people who already invest but do not understand why.
Core principles (follow strictly)
1. Bite-sized. One level is 3 to 5 minutes. One screen shows one idea.
2. No jargon first. Explain the idea in plain life language, then introduce the English term with its Hindi meaning.
3. Only Indian context. Rupees, lakh and crore, kirana stores, chai, autos, cricket, festivals, Indian companies, RBI, SEBI, NSE, BSE, UPI, PPF, EPF, NPS.
4. Show the maths. Every concept from the second level of a skill onward has a worked numeric example with real-looking rupee values.
5. Learn by doing. At least 70% of screen time is exercises, tapping, sliders, calculators, simulations.
6. Honest about risk. No get-rich hype. Every risky asset is taught with how people lose money.
7. Education, not advice. Never say buy or sell a specific security.
8. Depth ladder. Every topic climbs from a child-level story to what a practising analyst would know.
9. Free, no login, works offline. Everything is bundled. No account needed.
10. Notes-worthy. Every level ends with a Notes Card so good that users screenshot it or copy it into a notebook.
Scale targets
• 16 Worlds (courses), about 120 Units, about 280 Skills, about 1,100+ Levels, about 12,000 questions, 1,500+ glossary terms, 40+ calculators and simulators.
• Content must be real and complete, not placeholder. Generate it world by world.
PART 2 – PLATFORMS, TECH STACK, DATA AND PROGRESS SAVING
Outputs required
• A signed Android APK (and AAB for Play Store).
• A responsive website (PWA) for PC, installable and offline-capable.
• One shared codebase and one shared content format.
Recommended stack (change only with a good reason)
• React + TypeScript + Vite, Tailwind CSS, Zustand for state.
• Capacitor to wrap the web app as an Android APK. (Flutter with web support is an acceptable alternative if one codebase is kept.)
• Content as versioned JSON files (one per Skill), lazy-loaded per World. The APK ships with all content bundled so it works fully offline.
• Charts and illustrations as lightweight inline SVG. No heavy video. No external image CDN.
• Text-to-speech through the device engine (hi-IN and en-IN) for a "read aloud" button.
Progress saving (critical)
• No login. All progress is stored on the device.
• Android: SQLite (Capacitor SQLite plugin) as the main store. Enable Android Auto Backup so progress survives reinstall and phone change where Google backup is on.
• Web: IndexedDB (Dexie). Call navigator.storage.persist() so the browser does not clear it.
• Save after every answered question, not only at lesson end. If the app is killed mid-lesson, resume from the same question.
• Backup and restore: Me > Backup. Export a progress file (JSON) and a short Progress Code. Import on another phone or on the PC site. Optional QR transfer between phone and PC.
• Version 2 option (design for it, do not build it yet): optional Google sign-in for cloud sync.
What is stored user settings, language mode, daily goal, XP, streak and freezes, per-level result (stars, best score, attempts, last played), per-question history for spaced repetition (ease, interval, due date), mistakes bank, notes (system and user-written), highlights, bookmarks, badges, calculator and simulator saves, paper-trading portfolio.
Live rules file Tax slabs, capital gains rates, contribution limits, interest-rate figures, SEBI and RBI rules change. Never hard-code them inside lesson text. Put them in a separate rules.json with value, source, effective_from and last_verified. Lessons reference them by key (e.g. {{rule:ltcg_equity_rate}}). The app bundles a copy and, if online, silently fetches an updated file. Every screen that shows a rule also shows "Last verified: <date>".
Performance and quality
• APK under 40 MB. Cold start under 3 seconds on a 2 GB phone. 60 fps scrolling.
• Lazy-load World content. Cache the next level while the current one plays.
• Accessibility: font scaling up to 200%, dark mode, high contrast, TalkBack labels, large tap targets (48 dp minimum), no colour-only meaning.
• Privacy: no ads, no trackers, no data leaves the device unless the user exports it.
• Deliver: source code, README, build instructions for APK and web, content validation script, test suite for scoring, streak and spaced-repetition logic.
PART 3 – LEARNING MECHANICS
Hierarchy: World > Unit > Skill > Level.
• A Level is one 3 to 5 minute session of 8 to 12 exercises.
• A Skill is one topic and has 4 levels: 1 Samjho (understand), 2 Practice, 3 Real-life (scenarios with numbers), 4 Challenge (tricky, mixed, exam-style).
• Skills can be re-visited to earn Bronze, Silver, Gold and Legendary crowns (harder question variants unlock at each crown).
• A Unit ends with a Checkpoint (15 to 20 mixed questions). A World ends with a Final Exam and a shareable certificate card.
• Each Skill has a prerequisites list in JSON. The app warns if a prerequisite is weak but never hard-blocks.
Entry and paths
• First launch: language choice, then a 2-minute placement quiz ("how much do you know?") that sets the starting World, or "Start from zero".
• Goal tracks (filters over the same content): Full Journey, Money Basics Only, Mutual Fund Fast Track, Stock Market Track, Gold and Real Estate Track, Retirement and Tax Track.
• Test-out option on any Skill: take its Challenge level directly; pass and the Skill is marked complete.
Depth tiers (shown as tags on every Skill)
• 🌱 Beginner: story and idea, no formula.
• 🌿 Intermediate: formula with simple numbers.
• 🌳 Advanced: real documents, real data, multi-step calculation.
• 🏔 Expert: edge cases, institutional detail, analyst-level reasoning.
Exercise types (build all of these)
1. Multiple choice (one and many answers)
2. Myth or Fact swipe cards
3. Match the pairs (term to meaning, company to sector)
4. Fill in the blank
5. Put the steps in order
6. Numeric input (user calculates, app checks with tolerance and shows working)
7. Slider prediction ("guess what ₹5,000/month grows to", then reveal)
8. Which is better? (A vs B with numbers)
9. Story decision (branching mini-scenario with consequences)
10. Chart reading (tap the point where... / what does the trend say)
11. Document reading (factsheet, balance sheet, bank statement, loan agreement snippet; tap the right line)
12. Spot the red flag (fraud message, dodgy ad, weak company)
13. Drag into buckets (needs/wants, asset/liability, equity/debt)
14. Flashcard recall
15. Mini-simulators inside lessons (SIP, EMI, bond seesaw, payoff diagram)
16. Build-it tasks (build a budget, build a portfolio with given rules)
Feedback
• After every answer: instantly correct or wrong, then a one-line reason in the selected language, then an optional "Aur samjho" (know more) expander.
• Wrong answers go to the Mistakes Bank. No punishing hearts by default. An optional Hard Mode with lives can be turned on in settings.
Rewards
• XP per correct answer, bonus for perfect level, daily goal ring (5, 10 or 15 minutes).
• Streak with earned freezes. Coins earned from lessons buy freezes and hints.
• Titles ladder, e.g. Mia Beginner > Bachat Mitra > Nivesh Sathi > Market Samjhdaar > Arth Guru.
• Badges for habits and milestones (first SIP calculated, first balance sheet read, 30-day streak).
• No fake leaderboards. Use personal bests and a weekly recap card.
• Local notifications in friendly Hinglish at the user's chosen time.
Spaced repetition
• Simplified SM-2. Every answered question gets a due date. Revise tab builds a daily 5 to 10 question set from due and weak items, mixed across worlds.
• "Revise before Checkpoint" button.
Notes system (a core feature)
• Notes Card at the end of every level: Key points (3 to 5 bullets), Formula box, Worked example, Common mistake, Yaad rakho (one-line memory hook), Try this in real life (a 5-minute action, e.g. check your bank's FD rate).
• All cards auto-collect in My Notebook, organised by World > Unit > Skill. Searchable, filterable by tier.
• Users can highlight text, add their own notes, bookmark any screen, and export a Unit as PDF or image to share.
• Cheat sheets per Unit (one scrollable page) and a master Formula Sheet.
• Glossary with 1,500+ terms: English term, Hindi meaning, simple example, related terms. Any bold term inside a lesson opens it on tap.
Tools tab (also linked from lessons) SIP, lumpsum, step-up SIP, SWP, goal planner, retirement corpus, inflation eraser, compound interest, rule of 72, EMI, loan prepayment, rent vs buy, FD vs RD, PPF, NPS, tax comparison (old vs new regime), capital-gains tax, XIRR and CAGR, bond price and YTM, gold buy-cost comparison, rental yield, position-size and risk calculator, option payoff plotter, paper-trading with bundled historical Indian price data, and a stock scorecard builder the user fills from Screener-style data.
PART 4 – UI AND UX
Navigation (bottom tabs on phone, left sidebar on PC): Learn, Revise, Tools, Notebook, Me.
Learn screen
• A vertical winding path like Duolingo. Each World has its own colour and header. Nodes: lesson, checkpoint, chest, and a locked or crowned state.
• Tapping a Skill opens a bottom sheet: depth tier, what you will learn (3 bullets), time, crown status, "Start" and "Test out".
Lesson screen
• Top: close button, progress bar, XP. Middle: one card or one exercise. Bottom: one big button.
• Concept cards are swipeable, maximum 40 words each, with one simple SVG illustration or a number-example box.
• Numbers always in Indian format (₹1,00,000). Large type. Plenty of white space.
• Mia the mascot reacts (cheers, thinks, winces) but never blocks content.
• Optional "Deep dive" expander on advanced points so beginners are not overloaded and curious users get more.
Visual style
• Friendly, calm and trustworthy. Deep teal primary, warm saffron accent, off-white background, soft rounded cards. Avoid a casino or trading-app look: no flashing green and red, no urgency timers.
• Flat SVG illustrations of Indian life (kirana, auto, train ticket, tiffin, mandi, gold shop).
• Dark mode is first-class.
PC layout
• Three columns: path or notebook on the left, lesson in the centre (max 720 px), live notes and glossary drawer on the right. Keyboard shortcuts: Enter to check, 1 to 4 to choose options, N for notes, G for glossary.
Me tab Profile (name optional), streak calendar, XP chart, crowns, badges, weekly recap, settings (language mode, font size, theme, daily goal, reminders, sound, read-aloud, Hard Mode, backup and restore, rules last-updated).
PART 5 – LANGUAGE AND CONTENT-WRITING RULES
Four language modes, switchable anytime on any screen: Hindi (Devanagari), English, Hinglish (Hindi in Roman script), and Both (English with Hindi underneath). Every string in content is stored with en, hi and hinglish keys.
Hindi rules
• Conversational, the way a friendly elder sibling would explain. Sentences under 15 words.
• Use everyday English loan words in Devanagari: शेयर, मार्केट, बैंक, लोन, इंटरेस्ट, इन्फ्लेशन, रिटर्न. Do not use heavy Sanskritised words (no प्रतिभूति for securities).
• On first use: English term (हिंदी अर्थ), then a one-line example.
• Technical term first appears in all three forms in the glossary.
English rules
• Class 8 reading level, Indian English, short sentences, active voice. Explain every abbreviation once (NAV, CAGR, ROE).
Numbers and examples
• Indian digit grouping everywhere. Use lakh and crore, not million and billion (show million in brackets only in global topics).
• Use realistic values: salary ₹25,000 to ₹80,000, SIP ₹500 to ₹10,000, gold price in ₹ per 10 g, flat prices by city tier.
• Every worked example shows each step of the arithmetic.
• Recurring characters: Ramesh (chai stall owner, Nashik), Sunita (school teacher, Lucknow), Aman (IT employee, Pune), Priya (freelance designer, Bengaluru), Dadaji (retired clerk, Jaipur), Raju (kirana owner, Surat), Fatima (nurse, Hyderabad), Gurpreet (farmer and tractor owner, Punjab). Mix gender, region, religion and income. Avoid stereotypes.
Tone
• Warm, respectful, lightly funny. Never mock people for being poor or uninformed. Never fear-monger. Never promise returns. Use words like "historically", "for example", "can", not "will".
Depth discipline
• Tier 1 (🌱) has no formulas. Tier 2 (🌿) has one formula with simple numbers. Tier 3 (🌳) uses real documents and multi-step reasoning. Tier 4 (🏔) covers edge cases and professional method.
• Every Level has at least one common mistake and, from Level 2 onward, at least one numeric example.
PART 6 – LESSON ANATOMY AND CONTENT SCHEMA
Every Level follows this flow
1. Hook (1 card): a relatable story or question. "Ramesh earns ₹20,000 but is broke by the 20th. Why?"
2. Idea (2 to 4 cards): the concept in plain words with one SVG visual.
3. Show me (1 card): a worked numeric example, step by step.
4. Try it (6 to 9 exercises): mixed types, easy to hard.
5. Mistake box (1 card): the most common wrong belief and why it is wrong.
6. Notes Card (auto-saved to Notebook).
7. Result screen: stars, XP, streak update, 1 suggested next step.
JSON schema for one Level (validate all content against it)
{
  "id": "W3.U2.S4.L2",
  "world": 3, "unit": 2, "skill": 4, "level": 2,
  "tier": "intermediate",
  "prerequisites": ["W3.U2.S3"],
  "title": {"en": "...", "hi": "...", "hinglish": "..."},
  "rules_used": ["expense_ratio_direct_vs_regular"],
  "cards": [ {"type": "hook|idea|example|mistake", "text": {...}, "visual": "svg_id", "glossary": ["NAV"]} ],
  "exercises": [ {"type": "mcq|myth|match|fill|order|numeric|slider|compare|story|chart|document|redflag|bucket|flash|sim|build", "prompt": {...}, "data": {...}, "answer": ..., "tolerance": 0.01, "explain": {...}, "difficulty": 1 } ],
  "notes_card": { "key_points": [...], "formula": "...", "example": {...}, "mistake": {...}, "yaad_rakho": {...}, "try_in_real_life": {...} },
  "sources": ["sebi.gov.in/...", "rbi.org.in/..."],
  "last_verified": "2026-10-01"
}
Content validation script (must exist): checks all three languages present, Indian number formatting, every glossary tag resolves, every numeric answer recomputes correctly, every {{rule:...}} key exists, reading-level and sentence-length limits, no banned phrases ("guaranteed", "sure shot", "buy this", "best stock").
PART 7 – COMPLIANCE, ACCURACY AND TRUST
• A permanent, short disclaimer in Settings and on every World intro: "This app is for education only. It is not investment, tax or legal advice. The creators are not SEBI-registered advisors."
• No stock, fund or product recommendations. Case studies use real companies only as learning material, with past data, and are labelled "for learning, not a recommendation". Prefer anonymised or fictional companies for "should you buy" style exercises.
• Teach how to check that a broker, adviser or fund is registered (SEBI intermediary search, AMFI, RBI list of NBFCs, RERA site).
• All rates, limits, taxes and rules come from rules.json with a source and date. If a rule is older than 6 months, show a gentle "verify on official site" banner.
• Every risky asset World (F&O, commodities futures, crypto, leveraged products) opens with a risk screen and includes real loss statistics from regulator studies.
• Content must be fact-checked against primary sources (RBI, SEBI, NSE, BSE, AMFI, Income Tax Department, MoF, company annual reports). List sources in each Skill.
• No ads, no affiliate links, no broker referral. State this in the app.
PART 8 – THE SYLLABUS MAP
Notation: S<world>.<unit>.<skill> followed by tier emoji. Each Skill expands to 4 Levels (Samjho, Practice, Real-life, Challenge). Examples marked Eg. Exercise ideas marked Ex. Builders must write full content for every Skill.
The 16 Worlds
World
Name
Core outcome
0
Paisa Basics
Understand money, banking, budgeting, debt, safety
1
Arthvyavastha (Economics)
Read the economy and RBI, inflation, budget, rupee
2
Investing Fundamentals
Risk, return, compounding, asset allocation, psychology
3
Mutual Funds
Choose, buy and track funds correctly
4
Share Bazaar Basics
Understand how the stock market works end to end
5
Researching Stocks (Fundamental Analysis)
Read statements, value a company, avoid red flags
6
Charts and Technical Analysis
Read price action honestly and manage risk
7
ETFs and Index Investing
Passive investing, tracking, global exposure
8
Bonds and Fixed Income
Bonds, G-Secs, debt funds, PPF, EPF, NPS, small savings
9
Gold, Silver and Commodities
Every way to own gold and how commodity markets work
10
Real Estate
Buy vs rent, loans, RERA, REITs, land, yields
11
Derivatives (F&O)
Futures, options, Greeks, hedging, and why most lose
12
Insurance and Risk
Term, health, motor, and what to avoid
13
Tax and Retirement
Capital gains, tax saving, NPS, retirement planning
14
Portfolio Building and Advanced Topics
Allocation, rebalancing, global, alternatives, behaviour
15
Capstone and Life Stages
Complete plans for real life situations
Recommended unlock order: 0, 1 (parts), 2, 3, 4, 5, 7, 8, 9, 10, 12, 13, 6, 11, 14, 15. Worlds 6 and 11 are advanced and unlock after Worlds 4 and 5. Users can still choose a Track to reorder.
WORLD 0 – PAISA BASICS (पैसा की शुरुआत)
About 10 Units, 44 Skills, 176 Levels. Cast: Ramesh, Sunita, Raju.
Unit 0.1 – What is Money?
• S0.1.1 Barter to Rupee 🌱 – Why barter fails (double coincidence of wants), how coins and notes solved it. Eg: Raju swaps wheat for salt, then for a phone recharge. Ex: order the evolution, match item to era.
• S0.1.2 Who Prints the Rupee 🌱 – RBI prints notes, Government mints coins, why not print unlimited (preview of inflation). Ex: myth or fact.
• S0.1.3 Digital Money and UPI 🌱 – Bank balance is a number in a computer, UPI, wallets, what happens behind a ₹200 chai payment. Ex: order the steps of a UPI payment.
• S0.1.4 Price, Cost, Value, Worth 🌱 – Difference between what you pay and what you get. Eg: a ₹40,000 phone vs a ₹15,000 phone.
Unit 0.2 – Income and Expenses
• S0.2.1 Types of Income 🌱 – Salary, business, interest, rent, gifts, one-time windfalls; active vs passive. Ex: bucket sorting 12 income sources.
• S0.2.2 Reading a Salary Slip 🌿 – CTC vs gross vs in-hand; basic, HRA, special allowance, PF, professional tax, TDS. Eg: CTC ₹6 lakh to in-hand ₹38,000 with every deduction shown. Ex: document reading on a sample slip.
• S0.2.3 Needs, Wants, Commitments 🌱 – Three buckets, why EMIs are commitments. Ex: drag 20 expenses.
• S0.2.4 Tracking Where Money Goes 🌱 – The 30-day expense log. Ex: build-it: log Ramesh's week and find the leak (daily ₹80 tobacco and snacks becomes ₹2,400 a month).
• S0.2.5 Monthly Surplus and Cash Flow 🌿 – Income minus expenses. Positive, zero, negative cash flow.
Unit 0.3 – Budgeting and Saving
• S0.3.1 Budget Methods 🌿 – 50/30/20 adapted for India (rent, family support, EMIs), the "dabba" envelope method, zero-based budget.
• S0.3.2 Pay Yourself First 🌱 – Auto-transfer on salary day. Eg: ₹2,000 saved before spending vs ₹2,000 left over (usually zero).
• S0.3.3 Budgeting With Irregular Income 🌿 – Gig workers, shopkeepers, farmers: base budget on the lowest three months, buffer account.
• S0.3.4 Planning for Festivals, Weddings and Fees 🌿 – Sinking funds. Eg: ₹60,000 Diwali plus school fee: save ₹5,000 a month.
• S0.3.5 Lifestyle Inflation 🌿 – Why raises vanish. Ex: story decision after a 30% hike.
Unit 0.4 – Banking in India
• S0.4.1 Savings Account 🌱 – Interest, minimum balance, charges, zero-balance accounts, Jan Dhan.
• S0.4.2 KYC, Aadhaar, PAN 🌱 – What each is for, Video KYC, why a PAN-Aadhaar link matters.
• S0.4.3 Ways to Pay 🌿 – UPI, IMPS, NEFT, RTGS, cheque, cards: limits, timing, charges. Use rules.json for limits.
• S0.4.4 Debit Cards and ATMs 🌱 – Card numbers, CVV, PIN, free transactions, charges, safe use.
• S0.4.5 FD and RD 🌿 – How they work, interest payout types, premature withdrawal penalty, TDS on interest, senior citizen rates. Eg: ₹1 lakh for 3 years at 7%.
• S0.4.6 Is My Money Safe? 🌿 – DICGC cover per depositor per bank (use rules), co-operative banks, small finance banks, post office.
• S0.4.7 Reading a Bank Statement 🌿 – Debit, credit, balance, UPI narration, spotting unknown charges. Ex: find 3 errors in a sample statement.
Unit 0.5 – Interest and How Money Grows
• S0.5.1 Simple Interest 🌱 – P × R × T. Eg: ₹10,000 at 8% for 3 years.
• S0.5.2 Compound Interest 🌿 – Interest on interest, year-by-year table. Eg: ₹10,000 at 8% for 20 years, simple vs compound.
• S0.5.3 Rule of 72 🌿 – Doubling time shortcut, when it fails.
• S0.5.4 Inflation, the Silent Thief 🌿 – Chai at ₹5 in 2000 and ₹15 now; what ₹1 lakh buys in 10 years at 6% inflation.
• S0.5.5 Real Return 🌳 – Nominal minus inflation, with tax. Eg: FD 7%, inflation 6%, tax 30% gives negative real return.
• S0.5.6 Time Value of Money 🌳 – Present value, future value, discounting. Slider: ₹1 lakh today vs ₹1.2 lakh in 2 years.
• S0.5.7 Start Early Magic 🌿 – Aman starts ₹2,000 a month at 25, Priya at 35. Compare corpus at 60 using stated assumptions.
Unit 0.6 – Credit and Debt
• S0.6.1 What is a Loan 🌱 – Principal, interest, tenure, collateral.
• S0.6.2 EMI Decoded 🌿 – How EMI splits into interest and principal over time; amortisation table; flat vs reducing rate. Eg: ₹5 lakh loan, 3 years.
• S0.6.3 Good Debt vs Bad Debt 🌱 – Education and productive assets vs consumption. Ex: bucket sorting.
• S0.6.4 Credit Cards Without Tears 🌿 – Billing cycle, interest-free period, minimum due trap, 36 to 48% a year interest, rewards, cash advance fees.
• S0.6.5 Credit Score 🌿 – CIBIL and others, what moves it (payment history, utilisation, age, enquiries), how to get a free report.
• S0.6.6 BNPL, No-Cost EMI and Loan Apps 🌿 – Hidden costs, processing fee, GST, real APR; illegal loan apps and harassment.
• S0.6.7 Types of Loans 🌳 – Personal, gold, home, vehicle, education, business; secured vs unsecured; how rates differ and why.
• S0.6.8 Getting Out of Debt 🌳 – Snowball vs avalanche, prepayment, balance transfer, negotiating, when to take help.
Unit 0.7 – Safety Nets
• S0.7.1 Emergency Fund 🌱 – 3 to 6 months of essentials (more for gig and business income), where to keep it (savings, liquid fund, sweep FD).
• S0.7.2 Why Insurance 🌱 – Risk transfer in plain words. Detailed in World 12.
• S0.7.3 Health Cover First Look 🌿 – One hospital bill can wipe out savings. Eg: ₹4 lakh heart procedure.
• S0.7.4 Term Cover First Look 🌿 – Why a family needs one if others depend on income.
Unit 0.8 – Taxes Made Simple
• S0.8.1 Why Taxes Exist 🌱 – Direct vs indirect, where it goes.
• S0.8.2 PAN, ITR, Form 16, AIS 🌿 – What each paper is, who must file, deadlines (rules.json).
• S0.8.3 Slabs and Marginal Tax 🌿 – Myth: "I will earn less after a raise". Ex: compute tax step by step.
• S0.8.4 TDS 🌱 – Tax deducted at source, how to claim refund.
• S0.8.5 GST on Everyday Life 🌱 – Slab idea, reading a bill.
• S0.8.6 Old vs New Regime 🌳 – Compare for a salary; tool-linked. Use rules.json.
Unit 0.9 – Fraud Safety (a must-do Unit)
• S0.9.1 UPI Scams 🌱 – "Collect request" trick, scanning QR to receive money, remote-access apps.
• S0.9.2 OTP, Phishing, SIM Swap, Fake KYC 🌱 – Red flags. Ex: redflag-spotting on 10 SMS and WhatsApp messages.
• S0.9.3 Fake Investment Tips 🌿 – Telegram and WhatsApp stock tip groups, fake trading apps, guaranteed returns, celebrity deepfake ads.
• S0.9.4 Ponzi, MLM, Chit Fund Traps 🌿 – How they work and why they collapse. Real Indian cases as history lessons.
• S0.9.5 Digital Arrest and Impersonation Calls 🌱 – Police, CBI and courier call scripts; what real agencies never do.
• S0.9.6 If You Are Scammed 🌿 – Call the national cyber-fraud helpline and report on the cybercrime portal within the first hours, tell the bank, freeze UPI, keep evidence. (Verify current helpline numbers in rules.json.)
Unit 0.10 – Goals and Net Worth
• S0.10.1 SMART Goals 🌱 – Short, medium, long term; turn "I want a house" into a number and a date.
• S0.10.2 Assets and Liabilities 🌿 – Build your own balance sheet.
• S0.10.3 Net Worth Tracker 🌿 – Build-it task, saved in the app.
• S0.10.4 Money Mindset 🌱 – Scarcity, comparison, FOMO, social pressure, family obligations. Gentle, non-judgemental.
• Unit Checkpoint and World 0 Final Exam: scenario-based. Certificate card: "Paisa Basics complete".
WORLD 1 – ARTHVYAVASTHA: UNDERSTANDING THE ECONOMY (अर्थशास्त्र)
13 Units, about 70 Skills, 280 Levels. Goal: understand headlines like "RBI cuts repo rate" and know what it means for your loan, FD and shares.
Unit 1.1 – Thinking Like an Economist
• S1.1.1 Scarcity and Choice 🌱 – Unlimited wants, limited money and time.
• S1.1.2 Opportunity Cost 🌱 – Eg: Ramesh closes his stall for a day to attend a wedding: lost sales plus cost.
• S1.1.3 Incentives 🌱 – Why people respond to prices and rewards.
• S1.1.4 Micro vs Macro 🌱 – One shop vs whole country.
• S1.1.5 Trade-offs and Marginal Thinking 🌿 – One more chai, one more hour.
Unit 1.2 – Demand and Supply
• S1.2.1 Law of Demand 🌱 – Tomato at ₹20 vs ₹120 per kg.
• S1.2.2 Law of Supply 🌱 – Farmer decisions, season effects.
• S1.2.3 Equilibrium Price 🌿 – Draw the curves, shift them. Ex: slider chart.
• S1.2.4 Elasticity 🌳 – Why petrol and salt are different from restaurant meals; revenue effect of price cuts.
• S1.2.5 MSP, Price Controls and Subsidies 🌿 – What MSP does, ration shops, LPG subsidy, side effects.
• S1.2.6 Black Markets and Shortages 🌿 – Why ticket and cylinder shortages happen.
Unit 1.3 – Markets and Competition
• S1.3.1 Competition and Choice 🌱 – Many sellers vs few.
• S1.3.2 Monopoly and Oligopoly 🌿 – Telecom, airlines, cement; why few firms can raise prices.
• S1.3.3 Role of CCI and Regulators 🌿 – What SEBI, RBI, IRDAI, TRAI, CCI each do.
• S1.3.4 Formal vs Informal Economy 🌱 – Why most Indians work in the informal sector.
Unit 1.4 – Banks, RBI and the Money System
• S1.4.1 What RBI Does 🌱 – Currency, banker to banks, controls inflation, manages rupee.
• S1.4.2 How Banks Create Money 🌳 – Deposits to loans to deposits; money multiplier with numbers.
• S1.4.3 CRR and SLR 🌿 – Reserve rules and why they matter.
• S1.4.4 Repo, Reverse Repo, MSF 🌿 – RBI lending and borrowing. Ex: order the chain "rate cut to cheaper EMI".
• S1.4.5 How Banks Earn: NIM 🌳 – Borrow at 5%, lend at 10%, minus bad loans.
• S1.4.6 NPAs and Bank Health 🌳 – Gross vs net NPA, provisions, why Indian banks had a bad-loan cycle.
• S1.4.7 Banks vs NBFCs vs Fintech 🌿 – Who can take deposits, who regulates.
Unit 1.5 – Inflation
• S1.5.1 What Inflation Is 🌱 – Your thali costs more.
• S1.5.2 CPI and WPI 🌿 – What is in the basket, who publishes, food weight in India.
• S1.5.3 Causes 🌿 – Demand-pull, cost-push, imported (crude), supply shocks (onion, monsoon).
• S1.5.4 Inflation Targeting 🌳 – RBI's mandate and band (confirm in rules.json).
• S1.5.5 Deflation, Stagflation, Hyperinflation 🌳 – Short history cases: Zimbabwe, Venezuela, Japan, 1970s oil shock.
• S1.5.6 Who Gains and Who Loses 🌿 – Borrowers, savers, fixed-income retirees, asset owners.
Unit 1.6 – GDP and Growth
• S1.6.1 What is GDP 🌱 – Value of everything made in a year. Eg: a village economy of 5 people.
• S1.6.2 Nominal vs Real GDP 🌿 – Remove inflation.
• S1.6.3 Sectors of India's GDP 🌿 – Agriculture, industry, services; jobs vs output.
• S1.6.4 GDP, GVA, GNP, Per Capita 🌳 – Differences and why "world's 5th largest economy" and "per capita" tell different stories.
• S1.6.5 PPP and HDI 🌳 – Comparing countries fairly.
• S1.6.6 Growth Rate Calculation 🌿 – Compute year-on-year and CAGR from a GDP table.
Unit 1.7 – Government Budget and Fiscal Policy
• S1.7.1 What the Budget Is 🌱 – Income and spending of the Government of India.
• S1.7.2 Where Rupee Comes From and Goes 🌿 – Famous "rupee pie" chart reading.
• S1.7.3 Fiscal Deficit 🌳 – How it is calculated, how it is funded, why it matters for bond yields.
• S1.7.4 Direct and Indirect Taxes 🌿 – Income tax, corporate tax, GST, customs.
• S1.7.5 Disinvestment and PSUs 🌿 – What and why.
• S1.7.6 How to Read Budget Day Headlines as an Investor 🌳 – Capex, tax changes, sector announcements.
Unit 1.8 – Monetary Policy
• S1.8.1 The MPC 🌿 – Who decides rates and how often.
• S1.8.2 Rate Cut vs Rate Hike 🌿 – Effects on EMI, FD rate, bond prices, rupee, stocks.
• S1.8.3 Liquidity Tools 🌳 – OMO, LAF, CRR change, variable rate repo.
• S1.8.4 Transmission Lag 🌳 – Why a rate cut does not instantly reach your home loan (EBLR, MCLR).
• S1.8.5 Reading an RBI Policy Statement 🌳 – Tone words: accommodative, neutral, withdrawal of accommodation.
Unit 1.9 – India and the World: Trade and the Rupee
• S1.9.1 Imports and Exports 🌱 – What India buys and sells.
• S1.9.2 Trade Deficit and Current Account 🌿 – Meaning and why it matters.
• S1.9.3 Exchange Rate Basics 🌱 – Why ₹ per $ moves.
• S1.9.4 Rupee Weak vs Strong 🌿 – Winners and losers: IT exporters, oil importers, students abroad.
• S1.9.5 Forex Reserves 🌳 – RBI's war chest.
• S1.9.6 FDI vs FPI 🌿 – Why FPI flows move Indian markets.
• S1.9.7 Crude Oil and India 🌿 – Why oil prices hit petrol, inflation, rupee and shares.
• S1.9.8 Tariffs and Trade Wars 🌳 – Who pays and who gains.
Unit 1.10 – Business Cycles and Indicators
• S1.10.1 Boom, Slowdown, Recession, Recovery 🌱
• S1.10.2 Key Indicators Dashboard 🌳 – PMI, IIP, GST collections, credit growth, core sector output, auto sales.
• S1.10.3 Unemployment and Jobs Data 🌿 – PLFS, participation rate, what "unemployment" misses.
• S1.10.4 Leading, Lagging, Coincident Indicators 🌳
• S1.10.5 Yield Curve and Recession Signals 🏔 – Inverted curve, history, limits.
Unit 1.11 – India's Economic Story
• S1.11.1 Before 1991 🌱 – Licence raj. S1.11.2 The 1991 Reforms 🌿. S1.11.3 IT, Telecom and Services Boom 🌱. S1.11.4 2008 Crisis and India 🌿. S1.11.5 Demonetisation, GST, IBC 🌿. S1.11.6 COVID Shock and Recovery 🌿. S1.11.7 UPI and Digital Public Infrastructure 🌱. S1.11.8 India vs China vs Others 🌳.
Unit 1.12 – The Global Economy
• S1.12.1 US Dollar and Why It Matters 🌿. S1.12.2 US Fed and Indian Markets 🌳 – Why a Fed meeting moves Nifty. S1.12.3 2008 Global Financial Crisis 🌳. S1.12.4 Oil Shocks and Wars 🌿. S1.12.5 Supply Chains and China+1 🌿. S1.12.6 Global Recession Contagion 🌳.
Unit 1.13 – Economy for Investors (Capstone)
• S1.13.1 Connect the Dots 🌳 – Chain reasoning: crude up, then inflation up, then rate hike, then banks, autos, paints. Ex: build-it cause-effect map.
• S1.13.2 Which Sectors Love Falling Rates 🌳 – Banks, real estate, autos, NBFCs.
• S1.13.3 Build Your Own Economy Dashboard 🏔 – Five indicators, where to find them, update monthly.
• S1.13.4 Reading Economic News Critically 🌳 – Headline vs data vs opinion.
• Final Exam: read a mock RBI policy and a mock budget summary and answer scenario questions.
WORLD 2 – INVESTING FUNDAMENTALS (निवेश की नींव)
10 Units, about 50 Skills, 200 Levels. Goal: think like an investor before touching any product.
Unit 2.1 – Why Invest at All
• S2.1.1 Saving vs Investing 🌱 – Savings protect, investments grow. Eg: ₹5,000 a month in a bank vs in a growth asset for 15 years, with assumptions shown.
• S2.1.2 Beating Inflation 🌿 – Real return, the "₹1 crore is not what it looks like in 25 years" shock.
• S2.1.3 Goals Before Products 🌱 – Match each goal (bike in 1 year, child's college in 15, retirement in 30) to a time horizon.
• S2.1.4 Are You Ready to Invest? 🌿 – Checklist: emergency fund, health cover, term cover if dependants, no high-interest debt, then invest. Ex: story decision.
Unit 2.2 – Risk and Return
• S2.2.1 What Risk Really Means 🌱 – Not only losing money; also inflation risk, liquidity risk, fraud risk.
• S2.2.2 Risk vs Return Trade-off 🌿 – Higher possible return, higher possible loss. Why "high return, no risk" is always a lie.
• S2.2.3 Volatility and Drawdown 🌳 – A fund falling 40% needs a 67% gain to recover. Ex: numeric input.
• S2.2.4 Risk Capacity vs Risk Tolerance 🌳 – What you can afford vs what you can stomach.
• S2.2.5 Types of Investment Risk 🌳 – Market, credit, interest-rate, liquidity, concentration, currency, regulatory, counterparty.
• S2.2.6 Your Risk Profile Quiz 🌿 – Saved to profile; used by Tools to suggest example allocations (labelled educational).
Unit 2.3 – The Asset Class Map
• S2.3.1 Equity 🌱 – Ownership; long-term growth, big swings.
• S2.3.2 Debt 🌱 – Lending; income, lower swings.
• S2.3.3 Gold and Commodities 🌱 – Store of value, crisis hedge, no income.
• S2.3.4 Real Estate 🌱 – Big ticket, illiquid, local.
• S2.3.5 Cash and Equivalents 🌱 – Safety and flexibility, inflation loses.
• S2.3.6 Alternatives 🌳 – REITs, InvITs, AIFs, PMS, crypto, art. High risk and complexity.
• S2.3.7 The Comparison Table 🌿 – Return range, risk, liquidity, tax, minimum amount, effort. Learner fills it in. Ex: match cards.
• S2.3.8 Long-Term Indian History of Asset Returns 🌳 – Use clearly sourced historical series with dates; stress that the past does not repeat.
Unit 2.4 – Compounding and SIP
• S2.4.1 The Snowball 🌿 – Compounding with a growing table; ₹5,000 a month for 10, 20, 30 years.
• S2.4.2 SIP Explained 🌱 – Invest small, regularly, automatically.
• S2.4.3 Rupee Cost Averaging 🌿 – Buy more units when cheap. Eg: 6-month table with falling then rising NAV.
• S2.4.4 Lumpsum vs SIP 🌳 – When each makes sense; why timing the market fails.
• S2.4.5 Step-Up SIP 🌳 – Raising SIP 10% a year; corpus difference.
• S2.4.6 Absolute Return, CAGR, XIRR 🌳 – Which measure to use when. Ex: compute CAGR from start and end value.
• S2.4.7 Time in the Market 🌿 – Rolling-period charts: probability of loss falls as years rise (historical, not a promise).
Unit 2.5 – Diversification and Asset Allocation
• S2.5.1 Don't Put All Eggs in One Basket 🌱
• S2.5.2 Correlation 🌳 – Assets that do not fall together. Eg: equity vs gold in 2008 and 2020.
• S2.5.3 Asset Allocation Basics 🌿 – Rules of thumb (e.g. 100 minus age) and their limits.
• S2.5.4 Goal-Based Buckets 🌿 – Short, medium, long; each with its own asset mix.
• S2.5.5 Rebalancing 🌳 – Calendar vs threshold; worked example with a 60/40 portfolio.
• S2.5.6 Over-Diversification 🌳 – Owning 25 funds that hold the same stocks.
Unit 2.6 – Market Behaviour and Psychology
• S2.6.1 Bull, Bear, Sideways 🌱
• S2.6.2 Bubbles and Crashes 🌿 – Indian cases: 1992, 2000 dot-com, 2008, 2020, the 2021 small-cap and IPO frenzy.
• S2.6.3 Fear and Greed 🌱
• S2.6.4 Behavioural Biases 🌳 – Loss aversion, herd, anchoring, overconfidence, recency, confirmation, sunk cost. Ex: spot the bias in 10 investor quotes.
• S2.6.5 Noise vs Signal 🌳 – TV debates, tips, social media.
• S2.6.6 Building Investing Habits 🌿 – Rules written in calm, followed in panic. Create your own Investment Policy Statement (build-it task).
Unit 2.7 – Getting Started Safely
• S2.7.1 KYC for Investing 🌱 – One KYC, many uses.
• S2.7.2 Who Regulates What 🌿 – SEBI, RBI, IRDAI, PFRDA, RERA.
• S2.7.3 Check Before You Invest 🌿 – SEBI registered adviser, AMFI registered distributor, RA. Ex: redflag-spotting on mock adviser pitches.
• S2.7.4 Where to Complain 🌿 – SCORES, exchange investor grievance, ombudsman, consumer forum.
• S2.7.5 Nomination and Joint Holding 🌱 – Why every account needs a nominee.
Unit 2.8 – Investor Styles
• S2.8.1 Active vs Passive 🌿. S2.8.2 Value vs Growth 🌳. S2.8.3 Income and Dividend Investing 🌿. S2.8.4 Momentum and Trend 🌳. S2.8.5 Quality Investing 🌳. S2.8.6 Long-Term Wealth Principles From Famous Investors 🌿 – Ideas only, no stock tips.
Unit 2.9 – Costs, Taxes, Frictions
• S2.9.1 Small Fees, Big Damage 🌳 – 1% extra expense over 25 years on ₹10,000 a month SIP, worked out.
• S2.9.2 Tax Drag 🌳. S2.9.3 Churn and Brokerage 🌿. S2.9.4 Hidden Commissions 🌿 – Regular plans, ULIPs, endowment plans.
Unit 2.10 – Capstone
• S2.10.1 Build Your First Allocation 🌳 – Given 4 personas, pick an asset mix and justify. Ex: build-it with feedback rubric.
• World 2 Final Exam and "Investor Policy" certificate card.
WORLD 3 – MUTUAL FUNDS (म्यूचुअल फंड)
15 Units, about 80 Skills, 320 Levels. Goal: confidently choose, buy, track, tax-plan and exit mutual funds.
Unit 3.1 – What is a Mutual Fund
• S3.1.1 The Pooling Idea 🌱 – 20 friends pooling ₹5,000 each to hire an expert. Eg: 1,000 investors, ₹5 crore, units issued.
• S3.1.2 Who is Who 🌿 – AMC, trustees, sponsor, custodian, RTA, SEBI, AMFI. Ex: match roles.
• S3.1.3 Units and NAV 🌿 – NAV = (assets minus liabilities) ÷ units. Ex: compute NAV from a mini portfolio.
• S3.1.4 Are Mutual Funds Safe? 🌿 – "Mutual funds are subject to market risks" explained. What is safe (segregation of assets) and what is not (market value).
Unit 3.2 – Basic Terms
• S3.2.1 Growth vs IDCW 🌿 – Why IDCW is not free money.
• S3.2.2 Expense Ratio (TER) 🌿 – Deducted daily from NAV.
• S3.2.3 Exit Load and Lock-in 🌱
• S3.2.4 AUM 🌿 – Why size matters differently for large and small-cap funds.
• S3.2.5 Low NAV Myth 🌱 – ₹10 NAV is not cheaper than ₹500 NAV. Numeric proof.
• S3.2.6 Riskometer and Benchmark 🌿
Unit 3.3 – The SEBI Categories (use the latest SEBI circular in rules.json)
• S3.3.1 Equity: Large, Mid, Small Cap 🌿 – Rank-based definitions by market cap, risk-return of each.
• S3.3.2 Equity: Flexi, Multi, Focused, Value, Contra, Dividend Yield, Sectoral, Thematic 🌳
• S3.3.3 ELSS 🌿 – Tax-saving equity fund, 3-year lock-in, rules in rules.json.
• S3.3.4 Debt Fund Families 🌳 – Overnight, liquid, ultra-short, low duration, short, medium, long, gilt, corporate bond, banking and PSU, credit risk, floater, dynamic bond.
• S3.3.5 Hybrid Funds 🌳 – Aggressive, conservative, balanced advantage, multi-asset, arbitrage, equity savings.
• S3.3.6 Solution-Oriented and Others 🌿 – Retirement, children's funds, index funds, ETFs, FoFs.
• S3.3.7 Category Matching Game 🌿 – Goal to category. Ex: 15 scenarios.
Unit 3.4 – Direct vs Regular
• S3.4.1 Commission Explained 🌱. S3.4.2 TER Gap Over 20 Years 🌳 – Compound the difference with a worked table. S3.4.3 When a Distributor or Adviser Is Worth Paying 🌿. S3.4.4 How to Switch Regular to Direct and the Tax Catch 🌳.
Unit 3.5 – How to Invest
• S3.5.1 KYC and Folio 🌱. S3.5.2 Buying: AMC Site, RTA Platforms, Apps, Brokers 🌿. S3.5.3 SIP Setup, Mandates, Pause, Skip, Stop 🌱. S3.5.4 STP and SWP 🌳 – Move gradually; withdraw monthly. Eg: ₹40 lakh SWP of ₹30,000 a month. S3.5.5 Reading a CAS Statement 🌿 – Consolidated account statement; MF Central. S3.5.6 Nomination, Joint Holders, Transmission 🌿.
Unit 3.6 – Reading a Factsheet (Document Reading Unit)
• S3.6.1 Scheme Snapshot 🌿 – Objective, benchmark, inception, fund manager, exit load.
• S3.6.2 Portfolio Holdings 🌿 – Top 10, sector split, cash.
• S3.6.3 Portfolio Turnover 🌳
• S3.6.4 Risk Ratios 🌳 – Standard deviation, beta, Sharpe, Sortino, alpha, R-squared. One analogy each.
• S3.6.5 Debt Fund Metrics 🌳 – YTM, modified duration, average maturity, credit rating mix.
• S3.6.6 Equity Valuation Metrics 🌳 – Portfolio P/E and P/B.
• Ex: tap-the-line on 5 real-format factsheets (use sample or sourced public documents).
Unit 3.7 – Measuring Performance
• S3.7.1 Point-to-Point Returns Trap 🌿. S3.7.2 CAGR 🌿. S3.7.3 XIRR for SIPs 🌳 – Use the tool. S3.7.4 Rolling Returns 🌳. S3.7.5 Benchmark: TRI vs PRI 🌳. S3.7.6 Peer Comparison 🌿. S3.7.7 Downside Capture and Max Drawdown 🏔.
Unit 3.8 – Choosing Funds Like a Pro
• S3.8.1 A 10-Point Checklist 🌳 – Category fit, 5 to 10 year consistency, TER, AUM, manager tenure, process, fund house governance, overlap, tax, cost of exit.
• S3.8.2 Why Past Returns Mislead 🌿. S3.8.3 Star Ratings and "Top Funds" Lists 🌿. S3.8.4 NFO Myths 🌿. S3.8.5 Overlap Analysis 🌳. S3.8.6 When to Sell a Fund 🌳 – Real reasons vs noise.
Unit 3.9 – Active vs Passive
• S3.9.1 What Indices Are 🌱. S3.9.2 Index Funds 🌿. S3.9.3 Does Active Beat the Index? 🌳 – Regulator and SPIVA-style evidence, by category and horizon. S3.9.4 Smart Beta and Factor Funds 🏔 – Momentum, quality, low-volatility, value. S3.9.5 Core-Satellite Approach 🌳.
Unit 3.10 – Debt Funds in Depth
• S3.10.1 Bond Price and Interest Rate See-Saw 🌳 – Interactive seesaw sim. S3.10.2 Duration 🌳. S3.10.3 Credit Risk 🌳 – Rating scale AAA to D. S3.10.4 Case Studies 🌳 – IL&FS defaults and the 2020 Franklin Templeton episode as history, explained neutrally. S3.10.5 Liquid and Overnight Funds for Parking Money 🌿. S3.10.6 Matching Fund to Horizon 🌳.
Unit 3.11 – Hybrid and Arbitrage Funds
• S3.11.1 How Balanced Advantage Funds Decide 🌳. S3.11.2 Arbitrage Funds and Why They Are Taxed Like Equity 🌳. S3.11.3 Multi-Asset Funds 🌳. S3.11.4 Hybrid Suitability 🌿.
Unit 3.12 – Mutual Fund Taxation (rules.json driven)
• S3.12.1 Equity vs Non-Equity Taxation 🌳. S3.12.2 Holding Period Clock 🌿. S3.12.3 Dividends (IDCW) Tax 🌿. S3.12.4 Tax Harvesting 🌳. S3.12.5 SIP Tax Calculation (FIFO) 🌳 – Each instalment has its own clock. S3.12.6 ELSS and Old vs New Regime 🌳. S3.12.7 Reporting in ITR 🌳.
Unit 3.13 – Building a Fund Portfolio
• S3.13.1 Goal-Wise Portfolios 🌳. S3.13.2 How Many Funds? 🌿. S3.13.3 Rebalancing With Funds 🌳. S3.13.4 Annual Review Routine 🌿. S3.13.5 Exit Plans for a Goal 3 Years Away 🌳 – Glide path. S3.13.6 Withdrawal Strategies in Retirement 🏔.
Unit 3.14 – Advanced Pooled Products
• S3.14.1 PMS vs Mutual Funds 🏔. S3.14.2 AIF Categories 🏔. S3.14.3 International Funds and Overseas Limits 🌳. S3.14.4 Side-Pocketing, Swing Pricing, Stress Tests 🏔. S3.14.5 Fund Mergers, Closures, Name Changes 🌳. S3.14.6 New Regulatory Products 🏔 – Check latest SEBI circulars through rules.json.
Unit 3.15 – Capstone
• S3.15.1 Five Persona Portfolios 🌳 – A 24-year-old, a 38-year-old with kids, a 52-year-old with a delayed start, a retiree, and a gig worker with irregular income. Learner builds, app scores against a rubric.
• World 3 Final Exam: read a factsheet, pick between two funds with reasons, compute SIP tax, plan a rebalance.
WORLD 4 – SHARE BAZAAR BASICS (शेयर बाज़ार)
13 Units, about 65 Skills, 260 Levels. Goal: understand exactly how the Indian stock market works, safely.
Unit 4.1 – What is a Share
• S4.1.1 Owning a Slice of a Business 🌱 – Raju's kirana turns into a company and sells 10% to a friend.
• S4.1.2 Why Companies List 🌿 – Raising capital without loans.
• S4.1.3 Equity vs Debt Funding 🌿
• S4.1.4 What Shareholders Get 🌿 – Dividends, price gain, voting, bonus; and what they do not get (a guaranteed return).
• S4.1.5 Types of Shares 🌳 – Equity, preference, DVR.
Unit 4.2 – IPOs and the Primary Market
• S4.2.1 How an IPO Works 🌿 – DRHP, RHP, price band, lot size, subscription. Ex: order the steps.
• S4.2.2 Investor Categories 🌳 – QIB, NII, retail, anchor.
• S4.2.3 Applying With UPI/ASBA 🌿
• S4.2.4 Allotment and Listing 🌿 – Why most retail applications get no allotment in hot IPOs.
• S4.2.5 Reading an RHP 🌳 – Objects of the issue, risk factors, promoter details, financials, OFS vs fresh issue.
• S4.2.6 GMP and Listing-Day Gambling 🌿 – Why grey market premium is unreliable and unofficial.
• S4.2.7 SME IPOs and Their Extra Risk 🌳
• S4.2.8 Lock-ins and What They Mean 🌳
Unit 4.3 – Exchanges and Market Players
• S4.3.1 NSE and BSE 🌱. S4.3.2 SEBI's Role 🌱. S4.3.3 Depositories and Demat 🌿 – NSDL, CDSL: shares live in electronic form. S4.3.4 Clearing Corporations and Settlement 🌳 – T+1, what happens after you press Buy. S4.3.5 Brokers and Sub-Brokers 🌿. S4.3.6 Retail, DII, FII 🌿 – Who moves the market. S4.3.7 Market Timings and Sessions 🌱.
Unit 4.4 – Indices
• S4.4.1 Sensex and Nifty 50 🌱. S4.4.2 How an Index is Calculated 🌳 – Free-float market cap weighting with a worked 5-stock example. S4.4.3 Broad, Sectoral and Thematic Indices 🌿. S4.4.4 Index Rebalancing 🌳. S4.4.5 India VIX 🌳 – The fear gauge. S4.4.6 Reading Index Charts 🌿.
Unit 4.5 – Opening and Running Your Accounts
• S4.5.1 Demat and Trading Account 🌱. S4.5.2 Choosing a Broker 🌿 – Discount vs full-service, platform, charges, support, reliability, no recommendations. S4.5.3 Every Charge on a Trade 🌳 – Brokerage, STT, exchange charges, GST, SEBI fee, stamp duty, DP charges. Ex: compute net cost of a ₹50,000 trade from a sample contract note. S4.5.4 Reading a Contract Note 🌳. S4.5.5 Account Safety 🌿 – 2FA, device security, eDIS, never share TPIN or OTP, pledge risks.
Unit 4.6 – Placing Orders and Market Mechanics
• S4.6.1 Bid, Ask, Spread 🌿. S4.6.2 Market vs Limit Order 🌿. S4.6.3 Stop-Loss, SL-M, GTT 🌳. S4.6.4 Market Depth and Liquidity 🌳. S4.6.5 Circuits, Price Bands and Halts 🌿. S4.6.6 Delivery vs Intraday 🌿. S4.6.7 Margin and Leverage Basics 🌳 – With a loss-amplification example. S4.6.8 Short Selling Concept 🌳. S4.6.9 ASM, GSM, T2T and Surveillance Lists 🌳. S4.6.10 Order Book Simulator 🌿 – Watch orders match.
Unit 4.7 – Corporate Actions
• S4.7.1 Dividends: Record Date and Ex-Date 🌿. S4.7.2 Bonus Issue 🌿 – 1:1 bonus, price adjusts, value does not magically double. S4.7.3 Stock Split 🌿. S4.7.4 Buyback 🌳. S4.7.5 Rights Issue 🌳. S4.7.6 Mergers, Demergers, Delisting 🌳.
Unit 4.8 – Market Cap and Ownership
• S4.8.1 Market Cap 🌱. S4.8.2 Large, Mid, Small, Micro 🌿. S4.8.3 Free Float 🌳. S4.8.4 Shareholding Pattern 🌳 – Promoter, FII, DII, public; pledge. S4.8.5 Sectors and Industries 🌿.
Unit 4.9 – Why Prices Move
• S4.9.1 Demand and Supply of Shares 🌱. S4.9.2 Earnings, News and Expectations 🌿. S4.9.3 Flows and Sentiment 🌿. S4.9.4 Market Crashes in India 🌳 – 1992, 2000, 2008, 2020, with lessons. S4.9.5 Short Term Noise vs Long Term Value 🌿.
Unit 4.10 – Taxes on Shares (rules.json driven)
• S4.10.1 STCG and LTCG 🌳. S4.10.2 Holding Period and FIFO 🌿. S4.10.3 Intraday and F&O Taxation 🌳. S4.10.4 Dividend Tax 🌿. S4.10.5 Set-Off and Carry Forward of Losses 🌳. S4.10.6 Reading P&L and Tax Statements, Filing ITR 🌳.
Unit 4.11 – Investing, Trading or Gambling?
• S4.11.1 Definitions and Time Horizons 🌱. S4.11.2 What Regulator Studies Say About Retail Losses 🌿 – Use latest SEBI studies with dates. S4.11.3 Survival Rules 🌿. S4.11.4 Journaling Trades 🌳 – Template saved in app.
Unit 4.12 – First Portfolio, Safely
• S4.12.1 Starter Rules 🌿 – Index fund core, small stock satellite, position-size limits. S4.12.2 How Many Stocks 🌳. S4.12.3 Paper Trade First 🌿 – Launch the simulator. S4.12.4 Writing an Investment Thesis 🌳 – One-page template.
Unit 4.13 – Capstone
• Paper-Trading Challenge: 3-month simulated period on bundled historical data with random start dates; score by discipline, diversification and drawdown, not just profit.
• World 4 Final Exam and certificate.
WORLD 5 – RESEARCHING STOCKS (कंपनी को समझना)
16 Units, about 95 Skills, 380 Levels. The deepest World. Goal: read a company like an analyst, value it, and spot red flags. Use real-format documents (annual report extracts, results, shareholding tables) throughout. Companies used as examples are for learning only; prefer fictional or anonymised ones for any "is it good?" decision exercise.
Unit 5.1 – Understanding a Business
• S5.1.1 How Does This Company Make Money? 🌱 – Start with Raju's kirana, then a biscuit maker, then a bank. One-sentence business model exercise.
• S5.1.2 Customers, Products, Revenue Streams 🌿 – B2B vs B2C, one-time vs recurring.
• S5.1.3 Unit Economics 🌳 – Cost and profit per unit. Eg: tea stall: ₹5 cost per cup, ₹12 price, 300 cups a day.
• S5.1.4 Cyclical vs Defensive Businesses 🌿 – Cement and autos vs toothpaste and electricity.
• S5.1.5 Capital-Light vs Capital-Heavy 🌳 – Software vs steel.
• S5.1.6 Circle of Competence 🌿 – Invest only in what you can explain in two minutes.
Unit 5.2 – Industry and Competitive Edge
• S5.2.1 Industry Size and Growth (TAM) 🌿. S5.2.2 Porter's Five Forces 🌳 – Applied to telecom, airlines, FMCG. S5.2.3 Moats 🌳 – Brand, cost advantage, switching cost, network effect, licence or regulation. S5.2.4 Moat Erosion 🌳 – Technology and policy change. S5.2.5 Market Share Trends 🌿. S5.2.6 Industry Lifecycle 🌳 – Emerging, growth, mature, declining.
Unit 5.3 – Where to Find Real Information
• S5.3.1 Annual Report Tour 🌿 – Chairman's letter, MD&A, financials, notes, auditor's report, directors' report, BRSR.
• S5.3.2 Exchange Filings 🌿 – Results, announcements, shareholding patterns on NSE and BSE.
• S5.3.3 Investor Presentations and Concalls 🌳 – How to read a transcript; what management dodges.
• S5.3.4 Screeners and Data Sites 🌿 – Use of public screeners and their limits (data errors, restated numbers).
• S5.3.5 Credit Rating Reports 🌳 – A free, honest view of debt health.
• S5.3.6 Trusting Sources 🌿 – Company, regulator, analyst, influencer: ranking reliability.
Unit 5.4 – The Profit and Loss Statement
• S5.4.1 Revenue 🌱. S5.4.2 Expenses and Gross Margin 🌿. S5.4.3 EBITDA, EBIT, PBT, PAT 🌿 – Waterfall from sales to profit with ₹100 crore example. S5.4.4 Other Income and Exceptional Items 🌳. S5.4.5 EPS 🌿. S5.4.6 Operating Leverage 🌳. S5.4.7 YoY vs QoQ and Seasonality 🌿. S5.4.8 Standalone vs Consolidated 🌿. S5.4.9 Reading a Quarterly Result in 5 Minutes 🌳 – Timed document-reading exercise.
Unit 5.5 – The Balance Sheet
• S5.5.1 Assets, Liabilities, Equity 🌱 – Same as your personal net worth. S5.5.2 Current vs Non-Current 🌿. S5.5.3 Working Capital 🌳 – Receivables, inventory, payables. S5.5.4 Debtor, Inventory and Creditor Days; Cash Conversion Cycle 🌳. S5.5.5 Borrowings and Debt Structure 🌳. S5.5.6 Reserves, Share Capital and Book Value 🌿. S5.5.7 Intangibles, Goodwill, CWIP 🌳. S5.5.8 Contingent Liabilities and Off-Balance-Sheet Items 🏔. S5.5.9 Balance Sheet Detective Game 🌳 – Find the three oddities.
Unit 5.6 – Cash Flow Statement
• S5.6.1 Why Cash is King 🌿 – Profit on paper vs cash in bank. S5.6.2 Operating, Investing, Financing 🌿. S5.6.3 Free Cash Flow 🌳 – CFO minus capex. S5.6.4 Cash Conversion Check (CFO ÷ PAT) 🌳. S5.6.5 Maintenance vs Growth Capex 🏔. S5.6.6 Cash Flow Red Flags 🌳.
Unit 5.7 – Ratios That Matter
• S5.7.1 Margins 🌿. S5.7.2 ROE, ROCE, ROA 🌳 – What good looks like and why it differs by sector. S5.7.3 DuPont Breakdown 🏔 – Margin × turnover × leverage. S5.7.4 Debt-to-Equity, Net Debt to EBITDA, Interest Coverage 🌳. S5.7.5 Current and Quick Ratio 🌿. S5.7.6 Asset Turnover 🌳. S5.7.7 Growth Rates and CAGR 🌿. S5.7.8 Dividend Payout and Retention 🌿. S5.7.9 Ratio Cheat Sheet 🌿 – Auto-generated Notes Card.
Unit 5.8 – Valuation Basics
• S5.8.1 Price vs Value 🌱 – "A good company at a bad price can be a bad investment."
• S5.8.2 P/E Ratio 🌿 – Earnings yield, payback idea. S5.8.3 PEG 🌳. S5.8.4 P/B 🌿 – Best for banks. S5.8.5 EV and EV/EBITDA 🌳. S5.8.6 Price to Sales 🌳. S5.8.7 Dividend Yield 🌿. S5.8.8 Earnings Yield vs Bond Yield 🌳. S5.8.9 Why P/E Alone Misleads 🌳 – Cyclical peaks, one-offs, debt. S5.8.10 Choosing the Right Multiple per Sector 🌳.
Unit 5.9 – Intrinsic Value
• S5.9.1 Discounted Cash Flow in Plain Words 🌳. S5.9.2 Forecasting Free Cash Flow 🌳. S5.9.3 Discount Rate and Terminal Value 🏔. S5.9.4 Margin of Safety 🌿. S5.9.5 Sensitivity Tables 🏔 – Change growth and rate, watch value swing. S5.9.6 Reverse DCF 🏔 – What growth is the price assuming? S5.9.7 Graham-Style and Asset-Based Valuation 🌳. S5.9.8 Sum-of-the-Parts 🏔. S5.9.9 Interactive DCF Tool 🌳 – Fill the model for a fictional company.
Unit 5.10 – Management and Governance
• S5.10.1 Promoter Holding and Changes 🌿. S5.10.2 Pledged Shares 🌳 – How a falling price can trigger a death spiral. S5.10.3 Related-Party Transactions 🌳. S5.10.4 Auditor Signals 🌳 – Resignations, qualified opinions, emphasis of matter. S5.10.5 Capital Allocation Track Record 🌳. S5.10.6 Pay, Skin in the Game and Succession 🌳. S5.10.7 Board and Governance Checks 🌳. S5.10.8 Learning From Documented Indian Governance Failures 🌳 – Satyam and similar, from public records, as history.
Unit 5.11 – Sector Playbooks (each is a mini-course of 4 to 6 Skills)
• Banks and NBFCs 🌳 – NIM, CASA, GNPA and NNPA, provision coverage, capital adequacy, ROA, P/B and ROE link, retail vs corporate book, liability franchise.
• IT Services 🌳 – Constant-currency growth, deal wins, attrition, utilisation, margin levers, rupee effect, client concentration.
• FMCG and Consumer 🌳 – Volume vs price growth, distribution reach, rural demand, brand power, input cost.
• Pharma and Healthcare 🌳 – Regulatory approvals and inspections, domestic vs export, R&D spend, hospital metrics (ARPOB, occupancy).
• Auto and Auto Ancillaries 🌳 – Cycles, inventory, EV transition, input prices.
• Real Estate Developers 🌳 – Pre-sales, collections, net debt, land bank, RERA.
• Capital Goods, Infra, Defence 🌳 – Order book, execution, working capital, government dependence.
• Metals, Cement, Chemicals 🌳 – Commodity cycles, per-tonne metrics, capacity.
• Insurance and Asset Managers 🏔 – VNB margin, embedded value, AUM and market share.
• Energy, Oil and Gas, Power, PSUs 🌳. Telecom 🌳 – ARPU, spectrum, debt. Retail and Consumer Internet 🌳 – SSSG, take rate, unit economics. New-Age and Loss-Making Companies 🏔 – Burn rate, path to profit, dilution.
Unit 5.12 – Red Flags and Forensic Basics
• S5.12.1 Profit Without Cash 🌳. S5.12.2 Receivables Growing Faster Than Sales 🌳. S5.12.3 Aggressive Capitalisation of Expenses 🏔. S5.12.4 Frequent Equity Dilution and Preferential Allotments 🌳. S5.12.5 Debt Hidden or Growing 🌳. S5.12.6 Too-Good-to-Be-True Margins 🌳. S5.12.7 Pump-and-Dump in Penny Stocks 🌿. S5.12.8 Red Flag Checklist 🌳 – 20 items, saved as a reusable template. Ex: score three mock companies.
Unit 5.13 – Investing Frameworks
• S5.13.1 Lynch's Six Categories 🌳 – Slow growers, stalwarts, fast growers, cyclicals, turnarounds, asset plays. S5.13.2 Quality Investing 🌳. S5.13.3 Value and Contrarian Investing 🌳. S5.13.4 Growth at a Reasonable Price 🌳. S5.13.5 Buffett and Munger Principles 🌿. S5.13.6 Mental Models and Pre-Mortems 🏔.
Unit 5.14 – Screening and Research Workflow
• S5.14.1 Building a Screen 🌳 – Filters for ROCE, debt, growth, cash flow, promoter holding. S5.14.2 From 4,000 Stocks to 10 🌳. S5.14.3 The Watchlist System 🌿. S5.14.4 The One-Page Thesis 🌳 – Why I own it, what must go right, what would make me wrong. S5.14.5 Tracking Quarterly Results 🌳. S5.14.6 When to Sell 🌳 – Thesis broken, better idea, valuation extreme, goal reached. S5.14.7 Position Sizing and Concentration 🌳.
Unit 5.15 – Case Study Lab (use fictional or anonymised data; real names only for documented history)
• A long-term compounder. A value trap. A cyclical at peak and trough. A turnaround. A fraud caught early by cash-flow checks. A bank analysis. An IPO analysis from an RHP. An IT-services quarter. A leveraged real-estate developer. Each case = 4 Levels: read the data, compute ratios, decide, reveal what happened and why.
Unit 5.16 – Capstone
• Full Research Report Task: learner uses the app's research template on a fictional company: business, moat, financials (5 years), ratios, red flags, valuation range, risks, thesis. App scores against a rubric and shows a model answer.
• World 5 Final Exam (60 questions, mixed documents) and "Stock Detective" certificate.
WORLD 6 – CHARTS AND TECHNICAL ANALYSIS (चार्ट की भाषा)
13 Units, about 60 Skills, 240 Levels. Taught honestly: tools for timing and risk control, not a crystal ball. Unlocks after Worlds 4 and 5.
Unit 6.1 – Reading a Chart
• S6.1.1 What a Price Chart Shows 🌱. S6.1.2 Line, Bar, Candlestick 🌱. S6.1.3 Timeframes 🌿 – Daily, weekly, monthly, intraday. S6.1.4 Linear vs Log Scale 🌳. S6.1.5 Adjusted Prices After Splits and Bonus 🌳. S6.1.6 Volume Bars 🌱.
Unit 6.2 – Candlesticks
• S6.2.1 Anatomy of a Candle 🌱. S6.2.2 Single-Candle Patterns 🌿 – Doji, hammer, shooting star, marubozu. S6.2.3 Two-Candle Patterns 🌳 – Engulfing, harami. S6.2.4 Context Matters 🌳 – Same candle, different meaning at support vs mid-range. Ex: identify patterns on historical charts with hidden outcome.
Unit 6.3 – Trend, Support and Resistance
• S6.3.1 Uptrend, Downtrend, Range 🌱. S6.3.2 Drawing Trendlines and Channels 🌿. S6.3.3 Support and Resistance 🌿. S6.3.4 Role Reversal 🌳. S6.3.5 Dow Theory 🌳. S6.3.6 Gaps 🌳.
Unit 6.4 – Volume and Breakouts
• S6.4.1 Volume Confirms Price 🌿. S6.4.2 Breakout and Fakeout 🌳. S6.4.3 Delivery Percentage 🌿. S6.4.4 On-Balance Volume 🌳. S6.4.5 Volume Profile Intro 🏔.
Unit 6.5 – Moving Averages
• S6.5.1 SMA vs EMA 🌿. S6.5.2 50 and 200 Day Averages 🌿. S6.5.3 Crossovers: Golden and Death Cross 🌳 – Lag and whipsaw. S6.5.4 Dynamic Support 🌳.
Unit 6.6 – Indicators
• S6.6.1 RSI 🌳 – Why "overbought" is not "sell". S6.6.2 MACD 🌳. S6.6.3 Bollinger Bands 🌳. S6.6.4 Stochastic 🌳. S6.6.5 ADX and Trend Strength 🏔. S6.6.6 ATR and Volatility 🌳. S6.6.7 Divergence 🏔. S6.6.8 Indicator Overload 🌿 – Why more indicators do not mean more accuracy.
Unit 6.7 – Chart Patterns
• S6.7.1 Double Top and Bottom 🌳. S6.7.2 Head and Shoulders 🌳. S6.7.3 Triangles, Flags, Pennants 🌳. S6.7.4 Cup and Handle, Rounding Bottom 🏔. S6.7.5 Pattern Failure Rates 🌳 – What the evidence says.
Unit 6.8 – Market Structure and Context
• S6.8.1 Top-Down Analysis 🌳 – Index, sector, stock. S6.8.2 Relative Strength 🌳. S6.8.3 Market Breadth 🏔. S6.8.4 Sector Rotation 🏔. S6.8.5 Multi-Timeframe Analysis 🌳.
Unit 6.9 – Risk Management (the most important Unit)
• S6.9.1 Why Risk Comes Before Profit 🌿. S6.9.2 Stop-Loss Placement 🌳. S6.9.3 Position Sizing and the 1% Rule 🌳 – Worked example with ₹5 lakh capital. S6.9.4 Risk-Reward Ratio 🌳. S6.9.5 Win Rate and Expectancy 🏔 – A 40% win rate can be profitable; a 70% one can lose money. S6.9.6 Drawdowns and Risk of Ruin 🏔. S6.9.7 Leverage Kills 🌳.
Unit 6.10 – Systems and Backtesting
• S6.10.1 Rules-Based Trading 🌳. S6.10.2 Backtesting Basics 🌳. S6.10.3 Overfitting, Survivorship and Look-Ahead Bias 🏔. S6.10.4 Costs and Slippage 🌳. S6.10.5 Build and Test a Simple Strategy 🏔 – In the simulator.
Unit 6.11 – Trader Psychology and Process
• S6.11.1 Trading Plan 🌿. S6.11.2 Journal 🌿. S6.11.3 FOMO, Revenge Trading, Overtrading 🌿. S6.11.4 Handling Losing Streaks 🌳. S6.11.5 When to Stop Trading 🌿.
Unit 6.12 – Honest Limits
• S6.12.1 Random Walk and Efficient Markets 🌳. S6.12.2 Subjectivity of Patterns 🌳. S6.12.3 What the Research Says About Technical Analysis 🏔. S6.12.4 Technical Tools for Long-Term Investors (Entry Discipline, Not Prediction) 🌳.
Unit 6.13 – Capstone
• Blind Chart Challenge: 30 historical charts with hidden dates and names. Learner marks trend, levels, plan and risk; app reveals what happened. Scored on process and risk, not luck.
• World 6 Final Exam.
WORLD 7 – ETFs AND INDEX INVESTING (इंडेक्स निवेश)
10 Units, about 45 Skills, 180 Levels.
Unit 7.1 – ETF Basics
• S7.1.1 What an ETF Is 🌱 – A basket you can buy like a share. S7.1.2 ETF vs Mutual Fund vs Index Fund 🌿 – Comparison table exercise. S7.1.3 Creation and Redemption 🌳 – Authorised participants and why ETF price stays near NAV. S7.1.4 iNAV 🌳. S7.1.5 Buying Your First ETF 🌿 – Demat, limit orders, units.
Unit 7.2 – Types of ETFs
• S7.2.1 Broad Equity 🌿. S7.2.2 Sector and Thematic 🌳. S7.2.3 Smart Beta / Factor 🏔. S7.2.4 Gold and Silver ETFs 🌿. S7.2.5 Debt and Target-Maturity ETFs 🌳. S7.2.6 Liquid ETFs 🌿. S7.2.7 International ETFs 🌳.
Unit 7.3 – Costs, Liquidity and Tracking
• S7.3.1 Expense Ratio 🌿. S7.3.2 Tracking Error vs Tracking Difference 🌳. S7.3.3 Bid-Ask Spread and Volumes 🌳. S7.3.4 Premium and Discount to iNAV 🌳. S7.3.5 When Not to Trade an ETF 🌿 – Market open and close, thin volumes. S7.3.6 Total Cost of Ownership 🌳.
Unit 7.4 – Index Funds
• S7.4.1 Index Funds for SIPs 🌿. S7.4.2 Choosing Between Index Funds 🌳 – Same index, different cost and tracking. S7.4.3 ETF or Index Fund: Which Suits Whom 🌿.
Unit 7.5 – Choosing an Index
• S7.5.1 Nifty 50, Sensex, Next 50, Midcap, Smallcap, Total Market 🌿. S7.5.2 Market-Cap vs Equal-Weight 🌳. S7.5.3 Sector Concentration in Indices 🌳 – Heavy banks and IT weight. S7.5.4 Factor Indices 🏔. S7.5.5 Total Return Index 🌳.
Unit 7.6 – Building a Passive Portfolio
• S7.6.1 One-Fund Portfolio 🌱. S7.6.2 Core and Satellite 🌳. S7.6.3 Three-Fund Indian Portfolio 🌳 – Equity index, debt, gold. S7.6.4 Worked Example: ₹10,000 SIP Split 🌿. S7.6.5 Rebalancing a Passive Portfolio 🌳. S7.6.6 Lazy-Portfolio Backtest Simulator 🌳.
Unit 7.7 – Global Investing
• S7.7.1 Why Invest Abroad 🌿 – Diversification, currency, sectors India lacks. S7.7.2 International Funds and Limits 🌳. S7.7.3 Direct US Investing via LRS 🌳 – Rules from rules.json. S7.7.4 Currency Effect 🌳 – Return in dollars vs in rupees. S7.7.5 Tax on Overseas Assets and Reporting 🏔. S7.7.6 Risks: Concentration in a Few Mega-Caps 🌳.
Unit 7.8 – Passive Debates
• S7.8.1 The Case for Indexing 🌿. S7.8.2 The Case Against 🌳 – Concentration, price discovery, bubble risk. S7.8.3 Active Alpha in India: Does It Exist? 🏔.
Unit 7.9 – Practical Tasks
• Compare two ETFs on the same index using sample data, compute tracking difference, and decide. Set up a model SIP plan in the tool.
Unit 7.10 – Capstone
• Build and justify a passive portfolio for three personas. World 7 Final Exam.
WORLD 8 – BONDS AND FIXED INCOME (बॉन्ड और फिक्स्ड इनकम)
12 Units, about 60 Skills, 240 Levels. All rates, limits and rules from rules.json.
Unit 8.1 – What is a Bond
• S8.1.1 Lending to a Company or Government 🌱 – You become the bank. Eg: ₹1,000 face value, 8% coupon, 5 years. S8.1.2 Face Value, Coupon, Maturity, Issuer 🌿. S8.1.3 Bond vs Share vs FD 🌿 – Comparison table exercise. S8.1.4 Zero-Coupon and Floating-Rate Bonds 🌳. S8.1.5 Why Governments and Companies Borrow Through Bonds 🌿.
Unit 8.2 – Bond Prices and Yields
• S8.2.1 Why Bond Prices Fall When Rates Rise 🌿 – Seesaw simulator. S8.2.2 Current Yield 🌿. S8.2.3 Yield to Maturity 🌳 – Compute with the tool; understand the idea by hand for a 2-year bond. S8.2.4 Par, Premium, Discount 🌿. S8.2.5 Accrued Interest, Clean and Dirty Price 🏔. S8.2.6 Duration 🌳 – "If rates rise 1%, price falls about duration%". S8.2.7 Convexity 🏔. S8.2.8 Reinvestment Risk 🌳.
Unit 8.3 – Government Securities
• S8.3.1 T-Bills, G-Secs, SDLs 🌿. S8.3.2 Why Government Bonds Are Called Risk-Free 🌳 – Credit risk vs interest-rate risk. S8.3.3 RBI Retail Direct 🌿 – Buying G-secs as a retail investor. S8.3.4 Auctions and Benchmark Yield 🌳. S8.3.5 The Yield Curve 🌳 – Normal, flat, inverted. S8.3.6 Floating-Rate and Inflation-Indexed Bonds 🏔.
Unit 8.4 – Corporate Bonds and Credit Risk
• S8.4.1 Credit Ratings 🌿 – AAA to D, rating agencies, what each notch means. S8.4.2 Credit Spread 🌳. S8.4.3 Secured vs Unsecured; Seniority 🌳. S8.4.4 NCDs and Public Issues 🌿. S8.4.5 Online Bond Platforms 🌿 – What is regulated and what to verify. S8.4.6 Default and Recovery 🌳. S8.4.7 AT1 and Perpetual Bonds: Why They Are Dangerous 🏔 – Documented Indian case as history. S8.4.8 Tax-Free Bonds 🌳. S8.4.9 Reading a Rating Report 🌳 – Tap the key lines.
Unit 8.5 – Bank and Corporate Deposits
• S8.5.1 FD Choices 🌿 – Cumulative vs payout, tenure, senior rates. S8.5.2 FD Laddering 🌳 – Staggered maturities. S8.5.3 FD Tax and TDS 🌿. S8.5.4 Corporate FDs and Why They Are Riskier 🌳. S8.5.5 Small Finance Banks and Co-op Banks 🌳. S8.5.6 Post Office Time Deposit 🌿.
Unit 8.6 – Small Savings Schemes
• S8.6.1 PPF 🌿 – EEE tax status, 15-year lock-in, extensions, partial withdrawal, loans, annual limit, interest paid yearly. Eg: ₹1.5 lakh a year for 15 years.
• S8.6.2 Sukanya Samriddhi 🌿. S8.6.3 NSC and KVP 🌿. S8.6.4 Senior Citizens Savings Scheme 🌿. S8.6.5 Post Office Monthly Income Scheme 🌿. S8.6.6 Post Office RD 🌱. S8.6.7 Comparing All Schemes 🌳 – Rate, lock-in, tax, risk, who should use which.
Unit 8.7 – EPF and VPF
• S8.7.1 How EPF Works 🌿 – Employee and employer share, EPS split, UAN. S8.7.2 Interest and Taxation 🌳. S8.7.3 Withdrawals, Transfers, Claims 🌿. S8.7.4 VPF 🌳. S8.7.5 Checking Your Passbook 🌿.
Unit 8.8 – NPS and Pensions
• S8.8.1 What NPS Is 🌱. S8.8.2 Tiers, Accounts and Fund Managers 🌿. S8.8.3 Active vs Auto Choice 🌳. S8.8.4 Asset Classes E, C, G, A 🌳. S8.8.5 Tax Benefits 🌳. S8.8.6 Withdrawal and Annuity Rules 🌳. S8.8.7 NPS vs Mutual Funds vs PPF 🌳. S8.8.8 New Pension Options (check latest rules) 🏔.
Unit 8.9 – Debt Funds and Fixed-Income Funds
• S8.9.1 Debt Funds vs FDs 🌿. S8.9.2 Target Maturity Funds and Bharat Bond style ETFs 🌳. S8.9.3 Gilt Funds 🌳. S8.9.4 Debt Fund Taxation 🌳. S8.9.5 Choosing by Holding Period 🌿.
Unit 8.10 – Rate Cycles and Strategy
• S8.10.1 What to Do When Rates Rise or Fall 🌳. S8.10.2 Bond Ladder, Barbell, Bullet 🏔. S8.10.3 Real Yield 🌳. S8.10.4 Liability Matching for a Goal 🏔. S8.10.5 Global Bonds and US Treasuries 🏔.
Unit 8.11 – Other Fixed-Income Choices
• S8.11.1 Capital Gains Bonds (Section 54EC) 🌳. S8.11.2 Sovereign Gold Bonds as Hybrid 🌳. S8.11.3 P2P Lending, Invoice Discounting 🏔 – Risk-heavy; regulation and loss stories. S8.11.4 Annuities 🌳.
Unit 8.12 – Capstone
• Build a fixed-income plan for a retiree needing ₹60,000 a month, a 3-year house goal, and an emergency fund. Compare outcomes under rate rise and fall scenarios. World 8 Final Exam.
WORLD 9 – GOLD, SILVER AND COMMODITIES (सोना, चांदी और कमोडिटी)
13 Units, about 55 Skills, 220 Levels.
Unit 9.1 – Why Gold?
• S9.1.1 India and Gold 🌱 – Weddings, festivals, safety. S9.1.2 Gold as Store of Value 🌿. S9.1.3 Gold in a Crisis 🌿 – 2008, 2020 charts. S9.1.4 Gold Does Not Pay Interest 🌿 – What that means for long-term returns. S9.1.5 Central Banks and Gold 🌳.
Unit 9.2 – Physical Gold
• S9.2.1 24K, 22K, 18K 🌱 – Purity maths. S9.2.2 Hallmark and HUID 🌿 – How to verify. S9.2.3 Making Charges and Wastage 🌿. S9.2.4 True Cost of Jewellery 🌳 – ₹1 lakh jewellery: gold value, making, GST, then what you get on resale. S9.2.5 Coins and Bars 🌿. S9.2.6 Storage and Lockers 🌿. S9.2.7 Selling and Buyback Traps 🌿.
Unit 9.3 – Paper and Digital Gold
• S9.3.1 Gold ETFs 🌿. S9.3.2 Gold Funds of Funds 🌿. S9.3.3 Sovereign Gold Bonds 🌳 – Interest, tenure, exit window, tax on maturity, secondary-market trading; check current issuance in rules.json. S9.3.4 Digital Gold Apps 🌳 – Regulatory status and risks, with a plain explanation of what to check. S9.3.5 Electronic Gold Receipts 🏔. S9.3.6 Which Form Fits Whom 🌿 – Decision-tree exercise.
Unit 9.4 – What Moves Gold
• S9.4.1 Dollar and Gold 🌳. S9.4.2 Real Interest Rates 🏔. S9.4.3 Import Duty, GST and the Rupee 🌳 – Build the India price from international price. S9.4.4 Festival Demand and Seasonality 🌿. S9.4.5 Geopolitics 🌿. S9.4.6 Gold-to-Nifty Ratio 🏔.
Unit 9.5 – Gold in Your Portfolio
• S9.5.1 How Much Gold Is Enough 🌳 – Typical allocation ranges and reasoning. S9.5.2 Gold Taxation 🌳. S9.5.3 Gold Loans 🌿. S9.5.4 Rebalancing With Gold 🌳. S9.5.5 Long-Term Gold Returns in INR vs USD 🌳.
Unit 9.6 – Silver
• S9.6.1 Silver: Money and Metal 🌿. S9.6.2 Industrial Demand 🌳 – Solar, electronics. S9.6.3 Gold-Silver Ratio 🌳. S9.6.4 Silver ETFs and Physical Silver 🌿. S9.6.5 Volatility Check 🌿.
Unit 9.7 – How Commodity Markets Work
• S9.7.1 Energy, Metals, Agri 🌱. S9.7.2 Spot vs Futures Price 🌿. S9.7.3 MCX and NCDEX 🌿 – Who regulates. S9.7.4 Contract Specs, Lot Size, Expiry 🌳. S9.7.5 Contango and Backwardation 🏔. S9.7.6 Hedgers and Speculators 🌿 – A farmer and a miller on opposite sides. S9.7.7 Physical Delivery 🌳. S9.7.8 Commodity Indices 🏔.
Unit 9.8 – Crude Oil and Energy
• S9.8.1 Brent vs WTI 🌿. S9.8.2 OPEC and Price Setting 🌿. S9.8.3 Petrol Price Build-Up 🌳 – Crude, refining, dealer margin, central and state taxes. S9.8.4 Natural Gas and LNG 🌳. S9.8.5 Energy Transition 🌳.
Unit 9.9 – Industrial Metals
• S9.9.1 Copper and the Economy 🌿. S9.9.2 Aluminium, Zinc, Nickel 🌳. S9.9.3 Steel and Iron Ore 🌳. S9.9.4 China's Role 🌿. S9.9.5 Metals and Indian Stocks 🌳.
Unit 9.10 – Agricultural Commodities
• S9.10.1 Monsoon and Crops 🌱. S9.10.2 MSP and Government Intervention 🌿. S9.10.3 Export Bans and Stock Limits 🌳. S9.10.4 Sugar, Edible Oil, Pulses, Spices 🌿. S9.10.5 Price Cycles 🌳 – Why onion and tomato spike. S9.10.6 How Farmers Can Hedge 🌳.
Unit 9.11 – Trading Commodities: Honest Risks
• S9.11.1 Leverage in Commodity Futures 🌳. S9.11.2 Volatility Examples 🌿 – Real historical swings, with P&L examples. S9.11.3 Options on Commodities 🏔. S9.11.4 Why Most Retail Traders Should Not 🌿. S9.11.5 Safer Exposure Through ETFs and Stocks 🌳.
Unit 9.12 – Capstone
• Compare six ways to own gold on cost, safety, tax and ease for 3 personas. Build a commodity-news-to-stock-impact map. World 9 Final Exam.
WORLD 10 – REAL ESTATE (प्रॉपर्टी और ज़मीन)
13 Units, about 60 Skills, 240 Levels.
Unit 10.1 – Real Estate Basics
• S10.1.1 Types of Property 🌱 – Residential, commercial, land, plots. S10.1.2 Ready vs Under-Construction vs Resale 🌿. S10.1.3 Carpet, Built-Up, Super Built-Up Area 🌿 – Compute the real usable area. S10.1.4 Freehold vs Leasehold 🌳. S10.1.5 Circle Rate vs Market Rate 🌳. S10.1.6 Ownership Types: Individual, Joint, HUF, Society 🌳.
Unit 10.2 – Rent vs Buy
• S10.2.1 Full Cost of Owning 🌳 – Down payment, EMI, maintenance, property tax, repairs, stamp duty. S10.2.2 Cost of Renting 🌿. S10.2.3 Opportunity Cost of the Down Payment 🌳 – Invest the difference. S10.2.4 Break-Even Analysis 🌳 – Rent vs buy calculator. S10.2.5 Non-Financial Factors 🌿 – Security, family, mobility.
Unit 10.3 – Home Loans
• S10.3.1 Eligibility and Documents 🌿. S10.3.2 LTV and Down Payment 🌿. S10.3.3 Floating vs Fixed; Benchmark-Linked Rates 🌳. S10.3.4 Amortisation: The First Years Are Mostly Interest 🌳. S10.3.5 Prepayment vs Investing 🏔 – Numeric comparison. S10.3.6 Balance Transfer 🌳. S10.3.7 Pre-EMI and Construction-Linked Plans 🌳. S10.3.8 Tax Benefits and Government Schemes 🌳. S10.3.9 Home Loan Insurance 🌿.
Unit 10.4 – The Buying Process
• S10.4.1 Budget and Affordability Rule 🌿. S10.4.2 Research the Area 🌿. S10.4.3 Builder Reputation Check 🌳. S10.4.4 Title Search and Encumbrance Certificate 🌳. S10.4.5 Agreement to Sale vs Sale Deed 🌳. S10.4.6 Stamp Duty and Registration 🌿. S10.4.7 Possession, OC and CC 🌳. S10.4.8 Mutation, Khata, Society Transfer 🌳. S10.4.9 Master Document Checklist 🌿 – Saved to Notebook.
Unit 10.5 – RERA and Legal Safety
• S10.5.1 What RERA Gives Buyers 🌿. S10.5.2 Escrow and Delay Compensation 🌳. S10.5.3 Checking a Project on the State RERA Site 🌿. S10.5.4 Common Frauds 🌿 – Double sale, forged papers, disputed title, power-of-attorney traps. S10.5.5 Benami and Illegal Construction 🌳. S10.5.6 Tenant Rights and Rent Agreements 🌿. S10.5.7 NRI Property Basics 🏔.
Unit 10.6 – Returns and Valuation
• S10.6.1 Rental Yield 🌿 – Annual rent ÷ price. Typical Indian range and why it is low. S10.6.2 Appreciation and CAGR 🌿. S10.6.3 Price per Square Foot and Comparables 🌳. S10.6.4 Real Return After Costs and Inflation 🌳. S10.6.5 Real Estate vs Index Fund Over 20 Years 🌳 – Same money, same period, with stated assumptions. S10.6.6 Liquidity 🌿. S10.6.7 Leverage Effect on Returns 🏔.
Unit 10.7 – Land and Plots
• S10.7.1 Agricultural vs Non-Agricultural Land 🌳. S10.7.2 Zoning, FSI, Master Plans 🏔. S10.7.3 Plot Scams 🌿. S10.7.4 Land Conversion and Approvals 🏔. S10.7.5 Joint Development and Redevelopment 🌳. S10.7.6 Farmland Purchase Rules (Vary by State) 🌳.
Unit 10.8 – Commercial and Rental Property
• S10.8.1 Office, Retail, Warehouse 🌳. S10.8.2 Lease Structures and Lock-in 🌳. S10.8.3 Tenant and Vacancy Risk 🌳. S10.8.4 GST and Tax on Rent 🌳. S10.8.5 Managing a Rental 🌿.
Unit 10.9 – REITs and InvITs
• S10.9.1 What a REIT Is 🌿 – Own a slice of offices and malls via a listed unit. S10.9.2 Mandatory Distributions 🌳. S10.9.3 Reading a REIT Report 🏔 – Occupancy, WALE, NOI, debt. S10.9.4 REIT vs Direct Property 🌳. S10.9.5 InvITs 🌳. S10.9.6 Fractional and Small-Scale REITs 🏔. S10.9.7 Taxation 🌳.
Unit 10.10 – Real Estate Tax (rules.json driven)
• S10.10.1 Income From House Property 🌳. S10.10.2 Capital Gains on Property 🌳. S10.10.3 Exemptions on Reinvestment 🏔. S10.10.4 TDS on Purchase and Sale 🌳. S10.10.5 Gift and Inheritance of Property 🌳.
Unit 10.11 – Cycles and Macro
• S10.11.1 Why Property Moves in Cycles 🌳. S10.11.2 Interest Rates and Affordability 🌳. S10.11.3 Inventory and Absorption 🏔. S10.11.4 Infrastructure and Micro-Markets 🌳. S10.11.5 Indian Housing Cycles Since 2008 🌳.
Unit 10.12 – Mistakes and Red Flags
• S10.12.1 Over-Leveraging 🌿. S10.12.2 Buying for Status or Fear of Missing Out 🌿. S10.12.3 Ignoring Maintenance and Society Issues 🌿. S10.12.4 Speculative Booking 🌳. S10.12.5 Learning From Stalled-Project Cases 🌳. S10.12.6 Pre-Purchase Red-Flag Checklist 🌿.
Unit 10.13 – Capstone
• Three scenarios: first flat in a metro suburb, a small-town plot, an investor choosing between a flat, a REIT and an index fund. Learner computes and decides. World 10 Final Exam.
WORLD 11 – DERIVATIVES: FUTURES AND OPTIONS (डेरिवेटिव्स)
12 Units, about 55 Skills, 220 Levels. Advanced and risky. Teach with heavy warnings and real loss data.
Entry gate (mandatory): A full-screen risk screen showing the regulator's published retail-loss statistics (roughly 9 in 10 individual F&O traders lost money in recent SEBI studies; always load the latest numbers and dates from rules.json). User must pass a short risk quiz and tick an acknowledgement before the World opens. Soft recommendation: finish Worlds 4 and 5 first.
Unit 11.1 – What Are Derivatives
• S11.1.1 A Contract Whose Value Comes From Something Else 🌿. S11.1.2 Farmer and Miller Forward Contract 🌱 – The original hedge. S11.1.3 Hedging vs Speculation 🌿. S11.1.4 Exchange-Traded vs OTC 🌳.
Unit 11.2 – Futures
• S11.2.1 What a Future Is 🌿. S11.2.2 Lot Size, Expiry, Contract Value 🌿. S11.2.3 Margin and Mark-to-Market 🌳 – Daily settlement example with ₹1 lakh margin. S11.2.4 Leverage Maths 🌳 – A 2% move equals a 20% gain or loss. S11.2.5 Long, Short and Rollover 🌳. S11.2.6 Cost of Carry and Basis 🏔. S11.2.7 Index vs Stock Futures 🌿. S11.2.8 Settlement Types 🌳.
Unit 11.3 – Options Basics
• S11.3.1 Calls and Puts in Plain Words 🌿 – Booking a flight price in advance. S11.3.2 Strike, Premium, Expiry 🌿. S11.3.3 ITM, ATM, OTM 🌿. S11.3.4 Buyer Payoff 🌳 – Limited loss, unlimited gain; plotted. S11.3.5 Seller Payoff 🌳 – Limited gain, large loss. S11.3.6 Breakeven 🌳. S11.3.7 Intrinsic and Time Value 🌳. S11.3.8 Reading an Option Chain 🌳. S11.3.9 Settlement and Exercise 🌳.
Unit 11.4 – Option Pricing and the Greeks
• S11.4.1 What Drives the Premium 🌳. S11.4.2 Delta 🌳. S11.4.3 Gamma 🏔. S11.4.4 Theta (Time Decay) 🌳 – Animated decay curve. S11.4.5 Vega and Implied Volatility 🏔. S11.4.6 IV Crush Around Events 🏔. S11.4.7 Rho 🏔. S11.4.8 Black-Scholes Intuition 🏔. S11.4.9 Put-Call Parity 🏔.
Unit 11.5 – Hedging Strategies
• S11.5.1 Protective Put 🌳. S11.5.2 Covered Call 🌳. S11.5.3 Collar 🏔. S11.5.4 Hedging a Portfolio With Index Options 🏔 – Sizing with beta.
Unit 11.6 – Directional and Spread Strategies
• S11.6.1 Bull Call Spread, Bear Put Spread 🌳. S11.6.2 Straddle and Strangle 🏔. S11.6.3 Iron Condor and Butterfly 🏔. S11.6.4 Calendar Spreads 🏔. S11.6.5 Payoff Plotter Lab 🌳 – Build any strategy; see max profit, max loss, breakeven.
Unit 11.7 – Selling Options and Margin
• S11.7.1 Why Selling Looks Safe 🌳. S11.7.2 SPAN and Exposure Margin 🏔. S11.7.3 Tail Events and Gap Risk 🏔 – Documented market gap days. S11.7.4 Naked vs Hedged Selling 🌳. S11.7.5 Margin Calls and Forced Square-Off 🌳.
Unit 11.8 – Retail Behaviour and Regulation
• S11.8.1 What SEBI Studies Show 🌿. S11.8.2 Weekly Expiries and Short-Dated Options 🌳. S11.8.3 Costs That Eat Profits 🌳 – Brokerage, STT, charges, slippage on a worked example. S11.8.4 Psychological Traps 🌿 – Lottery-ticket thinking, averaging losers, revenge trades. S11.8.5 Tip-Sellers and Algo Scams 🌿.
Unit 11.9 – Taxation (rules.json driven)
• S11.9.1 F&O as Business Income 🌳. S11.9.2 Turnover Calculation and Audit Limits 🏔. S11.9.3 Loss Set-Off and Carry-Forward 🌳. S11.9.4 ITR Form and Books 🌳.
Unit 11.10 – Currency and Commodity Derivatives
• S11.10.1 USD-INR Futures and Hedging for Importers 🌳. S11.10.2 Commodity Options 🏔. S11.10.3 Volatility Products and VIX 🏔.
Unit 11.11 – Risk Management for Derivatives
• S11.11.1 Define Maximum Loss Before Entry 🌳. S11.11.2 Position Size Limits 🌳. S11.11.3 Scenario and Stress Testing 🏔. S11.11.4 Stop-Trading Rules 🌿. S11.11.5 Why Not Trading Is a Position 🌿.
Unit 11.12 – Capstone
• Survival Challenge: simulate 60 expiry days on bundled historical data with limited virtual capital. Score on survival, discipline and drawdown. World 11 Final Exam.
WORLD 12 – INSURANCE AND RISK (बीमा और सुरक्षा)
7 Units, about 35 Skills, 140 Levels.
Unit 12.1 – Risk and Insurance Basics
• S12.1.1 Risk Transfer 🌱 – Many pay a little so one can be rescued. S12.1.2 Premium, Sum Assured, Deductible, Claim 🌿. S12.1.3 Insurable Interest and Utmost Good Faith 🌳. S12.1.4 IRDAI and Free-Look Period 🌿. S12.1.5 Risks You Can and Cannot Insure 🌿.
Unit 12.2 – Term Insurance
• S12.2.1 Why Term Is Pure Protection 🌱. S12.2.2 How Much Cover 🌳 – Income multiple and human-life-value methods with loans and goals added. S12.2.3 Premium by Age, Health, Smoking 🌿. S12.2.4 Riders 🌳. S12.2.5 Claim Settlement Ratio and What It Hides 🌳. S12.2.6 Disclosure: The Biggest Reason Claims Fail 🌿. S12.2.7 Return-of-Premium Plans: Real Cost 🌳. S12.2.8 Nominee and Family Awareness 🌱.
Unit 12.3 – Health Insurance
• S12.3.1 Why Health Cover Before Everything 🌱. S12.3.2 Individual vs Family Floater 🌿. S12.3.3 Sum Insured and Super Top-Up 🌳. S12.3.4 Room Rent Caps, Co-pay, Sub-Limits 🌳. S12.3.5 Waiting Periods and Pre-Existing Disease 🌿. S12.3.6 Cashless vs Reimbursement 🌿. S12.3.7 Restoration, No-Claim Bonus, Porting 🌳. S12.3.8 Why Employer Cover Is Not Enough 🌿. S12.3.9 Government Schemes 🌿 – Ayushman Bharat and state schemes.
Unit 12.4 – Savings-Linked Life Products
• S12.4.1 Endowment and Money-Back Plans 🌳 – Compute the real IRR from a sample illustration. S12.4.2 ULIPs 🌳 – Charges, lock-in, when they can make sense. S12.4.3 Term + Invest the Difference 🌳 – Side-by-side 25-year table. S12.4.4 Surrender and Paid-Up Traps 🌳. S12.4.5 Mis-selling Red Flags 🌿 – Spot the agent lines. S12.4.6 Annuity Plans 🌳.
Unit 12.5 – Other Covers
• S12.5.1 Motor (Third-Party vs Comprehensive, IDV, Add-Ons) 🌿. S12.5.2 Home and Contents 🌿. S12.5.3 Personal Accident and Critical Illness 🌳. S12.5.4 Travel 🌿. S12.5.5 Crop Insurance and Rural Schemes 🌿. S12.5.6 Low-Cost Government Life and Accident Schemes 🌿.
Unit 12.6 – Buying Right and Claiming Right
• S12.6.1 Comparing Policies Honestly 🌳. S12.6.2 Reading Policy Wording 🌳 – Exclusions document exercise. S12.6.3 Making a Claim Step by Step 🌿. S12.6.4 Why Claims Get Rejected 🌳. S12.6.5 Complaints: Insurer, IRDAI Portal, Ombudsman 🌿.
Unit 12.7 – Capstone
• Design a protection plan for four family situations. World 12 Final Exam.
WORLD 13 – TAX AND RETIREMENT (टैक्स और रिटायरमेंट)
6 Units, about 40 Skills, 160 Levels. Every rate, slab and limit from rules.json.
Unit 13.1 – Income Tax in Depth
• S13.1.1 Heads of Income 🌿. S13.1.2 Slabs, Surcharge, Cess 🌿. S13.1.3 Old vs New Regime Decision 🌳. S13.1.4 Deductions (Sections 80C, 80D, 80CCD and Others) 🌳. S13.1.5 HRA, LTA, Standard Deduction 🌳. S13.1.6 Advance Tax and Interest 🌳. S13.1.7 ITR Forms and Due Dates 🌿. S13.1.8 Reading AIS, TIS and Form 26AS 🌳. S13.1.9 Notices, Refunds, Revised and Belated Returns 🌳.
Unit 13.2 – Capital Gains
• S13.2.1 Short vs Long Term by Asset 🌳. S13.2.2 Equity and Equity Funds 🌳. S13.2.3 Debt Funds, Bonds, Gold 🌳. S13.2.4 Property and Land 🌳. S13.2.5 Foreign Assets and Schedule FA 🏔. S13.2.6 Set-Off, Carry-Forward, Harvesting 🏔. S13.2.7 Capital Gains Calculator Lab 🌳.
Unit 13.3 – Smart Tax Planning
• S13.3.1 Never Buy for Tax Alone 🌿. S13.3.2 ELSS, PPF, NPS, SCSS Compared 🌳. S13.3.3 HUF, Gifting and Clubbing Rules 🏔. S13.3.4 Freelancers and Small Business: Presumptive Taxation 🌳. S13.3.5 GST Basics for Small Sellers 🌳. S13.3.6 Year-End Tax Checklist 🌿.
Unit 13.4 – Retirement Planning
• S13.4.1 How Much Is Enough 🌳 – Expenses at retirement, inflation, years in retirement. S13.4.2 Safe Withdrawal Rate and Its Limits 🏔. S13.4.3 Sequence-of-Returns Risk 🏔. S13.4.4 Building the Corpus: EPF + NPS + Funds 🌳. S13.4.5 Healthcare in Old Age 🌳. S13.4.6 FIRE, Coast FIRE, Lean and Fat FIRE 🌳. S13.4.7 The Bucket Strategy 🌳. S13.4.8 Pension, Annuity, Reverse Mortgage 🌳. S13.4.9 Retirement Calculator Lab 🌳.
Unit 13.5 – Estate Planning
• S13.5.1 Why a Will Matters 🌿. S13.5.2 Nominee vs Legal Heir 🌳 – Common and costly confusion. S13.5.3 Joint Holding and Succession 🌳. S13.5.4 Digital Assets and Access 🌿. S13.5.5 Trusts and Succession Certificates 🏔. S13.5.6 Family Money Conversation 🌱.
Unit 13.6 – Capstone
• Compute tax and retirement plan for three personas; file a mock ITR in a guided simulator. World 13 Final Exam.
WORLD 14 – PORTFOLIO BUILDING AND ADVANCED TOPICS (उन्नत निवेश)
12 Units, about 55 Skills, 220 Levels. For learners who finished the main Worlds.
Unit 14.1 – Portfolio Construction
• S14.1.1 Investment Policy Statement 🌳. S14.1.2 Core-Satellite Design 🌳. S14.1.3 Goal-Based Buckets in Practice 🌳. S14.1.4 Asset Location and Tax Efficiency 🏔. S14.1.5 Cash Drag and Liquidity Planning 🌳.
Unit 14.2 – Rebalancing and Risk Control
• S14.2.1 Rebalancing Rules Compared 🌳. S14.2.2 Glide Paths 🌳. S14.2.3 Drawdown Planning 🌳. S14.2.4 Stress-Testing a Portfolio 🏔 – Replay 2008 and 2020 on your allocation. S14.2.5 Risk Parity Idea 🏔.
Unit 14.3 – Factors
• S14.3.1 Value, Momentum, Quality, Size, Low Volatility 🏔. S14.3.2 Evidence in India 🏔. S14.3.3 Factor ETFs and Funds 🌳. S14.3.4 Factor Cycles and Patience 🏔.
Unit 14.4 – Behavioural Finance Deep Dive
• S14.4.1 Prospect Theory 🌳. S14.4.2 Mental Accounting 🌳. S14.4.3 Disposition Effect 🌳. S14.4.4 Nudges and Decision Checklists 🌳. S14.4.5 Decision Journal 🌿 – Template saved in app. S14.4.6 Handling Market Crashes in Real Time 🌿 – Rehearse your response with a simulated 30% fall.
Unit 14.5 – Alternative Investments
• S14.5.1 PMS and AIF: Who They Are For 🏔. S14.5.2 Angel and Startup Investing 🏔. S14.5.3 Unlisted and Pre-IPO Shares 🏔 – Valuation, liquidity, fraud risk. S14.5.4 Private Credit 🏔. S14.5.5 Art, Collectibles, Wine 🌳. S14.5.6 Structured Products 🏔. S14.5.7 Crowdfunding and P2P 🌳.
Unit 14.6 – Crypto and Digital Assets (rules from rules.json)
• S14.6.1 What Blockchain Is 🌿. S14.6.2 Bitcoin and Others 🌿. S14.6.3 Stablecoins 🌳. S14.6.4 India's Tax and Regulation Position 🌳. S14.6.5 Scams, Rug Pulls, Exchange Failures 🌿. S14.6.6 Position Sizing for Speculative Assets 🌳. S14.6.7 CBDC and the Digital Rupee 🌿. Taught neutrally and risk-first.
Unit 14.7 – Global and Macro Investing
• S14.7.1 US Market Structure 🌳. S14.7.2 Emerging Markets 🌳. S14.7.3 Currency Risk 🌳. S14.7.4 Sovereign Debt Crises 🏔. S14.7.5 Japan's Lost Decades 🌳. S14.7.6 Macro Regimes and Asset Returns 🏔.
Unit 14.8 – Market History and Lessons
• S14.8.1 Tulip Mania to Dot-Com 🌿. S14.8.2 1929 and 1987 🌳. S14.8.3 LTCM and the 2008 Crisis 🌳. S14.8.4 Indian Episodes: 1992, 2001, 2008, 2020 🌳. S14.8.5 Indian Corporate Failures as Case Studies 🌳. S14.8.6 Common Patterns in Every Bubble 🌿.
Unit 14.9 – Advanced Equity Topics
• S14.9.1 Spin-offs, Mergers, Open Offers 🏔. S14.9.2 Delisting and Buyback Arbitrage 🏔. S14.9.3 SME and Micro-Cap Risks 🌳. S14.9.4 Sector Cycles and Rotation 🌳. S14.9.5 Liquidity and Impact Cost 🏔.
Unit 14.10 – Reading Research and Spotting Hype
• S14.10.1 Broker Reports and Their Biases 🌳. S14.10.2 Finfluencers and SEBI Rules 🌿. S14.10.3 Checking Claims: Base Rates and Survivorship Bias 🌳. S14.10.4 Evaluating Track Records 🌳. S14.10.5 Building Your Own Information Diet 🌿.
Unit 14.11 – Personal Finance Systems
• S14.11.1 Net Worth Dashboard 🌿. S14.11.2 Annual Money Review 🌿. S14.11.3 Automation: SIPs, Bills, Reminders 🌱. S14.11.4 Document Vault and Nominee Audit 🌿.
Unit 14.12 – Capstone
• Design a 30-year plan with allocation, tax, insurance, retirement and a crash playbook. World 14 Final Exam.
WORLD 15 – CAPSTONE AND LIFE STAGES (जीवन की योजना)
15 Life-Stage Tracks, each with 6 to 10 Levels of guided case work using every earlier World's tools. Learners build and save a real plan for themselves.
1. Student and First Job – First salary, first budget, first SIP, avoiding loan-app traps.
2. Salaried Professional (25 to 35) – Emergency fund, term and health cover, SIP ladder, tax regime choice, home-buying timing.
3. Newly Married and Dual Income – Combined budget, joint goals, shared insurance, home down payment.
4. Parents With Young Children – Education corpus, child insurance myths, Sukanya, balancing retirement and kids.
5. Business Owner and Self-Employed – Separating business and personal money, irregular income, working capital, GST, key-person insurance, retirement without an employer.
6. Farmer and Rural Households – Crop-cycle cash flow, KCC, crop insurance, MSP and mandi, gold as savings, SHG, safe deposits, avoiding moneylender debt.
7. Homemaker – Financial independence, own account and investments, joint holding, insurance, family conversation scripts.
8. Gig and Freelance Workers – Variable-income budgeting, taxes, self-funded retirement and health cover.
9. Mid-Career Catch-Up (40s) – Delayed start strategy, goal prioritisation, risk balance.
10. Pre-Retirement (50s) – Glide path, debt reduction, healthcare, income buckets.
11. Retired (60+) – Monthly income engine, safe withdrawals, scams targeting seniors, estate plan.
12. NRI and Returning Indians – Accounts, taxes, investments, property, repatriation basics.
13. Windfall and Inheritance – Park, plan, then act; avoiding relatives-and-friends traps.
14. Debt Recovery Plan – Triage, negotiation, avalanche, rebuilding credit and trust.
15. The Financial Independence Journey – Long-horizon plan, giving and legacy.
• Arth Guru Master Exam: 100 mixed questions across all Worlds, scenario-based, timed, with a title and certificate card. Learner receives a personalised "Gaps Report" listing weak Skills to revise.
PART 9 – SCALE SUMMARY
World
Units
Skills (approx)
Levels (approx)
0 Paisa Basics
10
44
176
1 Economy
13
70
280
2 Investing Fundamentals
10
50
200
3 Mutual Funds
15
80
320
4 Share Bazaar Basics
13
65
260
5 Researching Stocks
16
95
380
6 Technical Analysis
13
60
240
7 ETFs and Index
10
45
180
8 Bonds and Fixed Income
12
60
240
9 Gold and Commodities
13
55
220
10 Real Estate
13
60
240
11 Derivatives
12
55
220
12 Insurance
7
35
140
13 Tax and Retirement
6
40
160
14 Advanced
12
55
220
15 Life Stages
15 tracks
n/a
about 120
Total
about 180
about 870
about 3,600
Note: numbers are the full-depth target. Release in stages. Version 1 ships Worlds 0 to 5 and 12. Version 1.5 adds 7, 8, 9, 10, 13. Version 2 adds 6, 11, 14, 15 and optional cloud sync.
PART 10 – BUILD ROADMAP
Phase 0 – Foundations
• Set up the repo, design tokens (colours, type scale, spacing), Hindi and English fonts (Noto Sans Devanagari and a clean Latin sans), language engine, content schema, validator, and the empty World map.
Phase 1 – Shell and World 0
• Build every screen in Part 4, the lesson player with all 16 exercise types, XP, streak, daily goal, Notes Card, Notebook, glossary, settings, local storage and backup. Ship World 0 fully as the reference for quality.
• Acceptance: airplane-mode full lesson works; kill-app mid-lesson resumes; export and import restores everything; language switch mid-lesson works; TalkBack reads every exercise.
Phase 2 – Engines and Tools
• Spaced repetition and Revise tab, Mistakes Bank, crowns, checkpoints, certificates, placement test, tracks, rules.json loader, all calculators, paper-trading simulator, payoff plotter, bond seesaw, DCF and scorecard tools.
Phase 3 – Content batches
• Generate and review in this order: World 1, 2, 3, 4, 5, 12, 8, 13, 7, 9, 10, 6, 11, 14, 15. For each Unit run the content template below, validate, human-review, then merge.
Phase 4 – Polish and Quality
• Performance tuning on a 2 GB device, accessibility audit, content fact-check pass against primary sources, tone audit in Hindi by a native speaker, usability test with 10 real users from different backgrounds.
Phase 5 – Release
• Signed APK and AAB, web deployment with PWA install, README, content update process, rules.json update process, versioned changelog.
PART 11 – CONTENT GENERATION TEMPLATE (paste once per Unit)
You are writing lesson content for "Penny Pilot", a Duolingo-style finance
app for Indians. Follow Parts 5, 6 and 7 of the master prompt exactly.

UNIT: <e.g., 3.6 Reading a Factsheet>
SKILLS: <paste the Skill list for this Unit from the syllabus>

For EACH Skill produce 4 Levels (Samjho, Practice, Real-life, Challenge):
- Each Level: 1 hook, 2-4 idea cards, 1 worked example with every arithmetic
  step, 8-12 exercises (mix of at least 4 types), 1 mistake box, 1 Notes Card.
- Difficulty rises inside each Level and across the 4 Levels.
- Provide en, hi (simple Devanagari with common English loan words) and
  hinglish for every string.
- Indian numbering (₹1,00,000), Indian examples, the recurring characters.
- Put every changeable rate, limit or rule in {{rule:key}} and list the keys
  you need so I can fill rules.json with sources.
- No product or stock recommendations. No guaranteed-return language.
- Output valid JSON per the Level schema, one file per Skill, plus:
  (a) a glossary additions file, (b) a rules.json additions list with
  suggested sources, (c) a short list of facts that MUST be human-verified.
- Self-check before output: recompute every numeric answer; confirm each
  distractor is plausible but clearly wrong; confirm the Hindi reads naturally.
PART 12 – QUALITY CHECKLIST (every Level must pass)
1. Teaches one idea only. 2. Starts with a real-life hook. 3. Has a worked numeric example (Level 2 onward). 4. Uses 4 or more exercise types across the Skill. 5. Every wrong answer has a one-line reason. 6. Hindi, Hinglish and English all read naturally and match. 7. Indian number format and rupee symbol everywhere. 8. All rules sourced and dated. 9. No hype, no guaranteed returns, no product picks. 10. Includes a common mistake. 11. Notes Card is complete and worth saving. 12. Can be done in under 5 minutes on a small phone. 13. Passes the validator. 14. Fact-checked by a human against a primary source.
PART 13 – DECISIONS TO CONFIRM BEFORE BUILDING
• App name and mascot (placeholder: Penny Pilot and Mia).
• Tech stack: React with Capacitor (recommended, one codebase for APK and PC) or Flutter.
• Monetisation: none (free forever), optional one-time donation, or paid certificates. The master prompt assumes none.
• Cloud sync: local-only in version 1 (as requested); optional Google sign-in backup later.
• Content authoring: AI-generated drafts with human expert review is strongly recommended, especially for Hindi tone, tax and regulatory facts.
• Legal: consult a lawyer about the disclaimer and about naming real companies in case studies.
End of document.