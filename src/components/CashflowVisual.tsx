import { useState } from "react";
import type { Language } from "../content/schema";
import { cashflowPlan, exampleIncome } from "../lib/cashflow";
import { rupees } from "../lib/learning";
import { Icon } from "./UI";

export default function CashflowVisual({ language }: { language: Language }) {
  const [lowFirst, setLowFirst] = useState(false);
  const [opening, setOpening] = useState(12000);
  const [reserve, setReserve] = useState(4000);
  const [essentials, setEssentials] = useState(18000);
  const [month, setMonth] = useState(1);
  const income = lowFirst
    ? [10000, 40000, 15000, 35000, 20000, 30000]
    : exampleIncome;
  const plan = cashflowPlan(income, opening, essentials, 12000, 3, reserve);
  const row = plan.rows[month - 1];
  const s = (en: string, hi: string, roman: string) =>
    language === "hi" ? hi : language === "hinglish" ? roman : en;
  const slider = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    change: (n: number) => void,
  ) => (
    <label className="payslip-slider">
      <span>
        {label}
        <output>{rupees(value)}</output>
      </span>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => change(Number(e.target.value))}
      />
    </label>
  );
  return (
    <section
      className="cashflow-board"
      aria-label={s(
        "Uneven-income planning board",
        "हर महीने अलग कमाई का बोर्ड",
        "Har mahine alag kamaai ka board",
      )}
    >
      <p className="payslip-assumption">
        {s(
          "Fictional plan · 23 October 2026 · ₹12,000 fee due at the end of month 3. Monthly receipts come before that month's payments. No interest or new borrowing.",
          "बनाया हुआ प्लान · 23 अक्टूबर 2026 · तीसरे महीने के आखिर में ₹12,000 फ़ीस देनी है। हर महीने पहले पैसे आते हैं, फिर पेमेंट जाते हैं। ब्याज या नया उधार नहीं।",
          "Banaaya hua plan · 23 October 2026 · Teesre mahine ke aakhir mein ₹12,000 fees deni hai. Har mahine pehle paise aate hain, phir payment jaate hain. Byaaj ya naya udhaar nahin.",
        )}
      </p>
      <div
        className="payslip-modes"
        role="group"
        aria-label={s(
          "Choose income timing",
          "कमाई का क्रम चुनें",
          "Kamaai ka kram chunein",
        )}
      >
        <button
          type="button"
          aria-pressed={!lowFirst}
          onClick={() => setLowFirst(false)}
        >
          {s(
            "High month first",
            "ज़्यादा कमाई वाला महीना पहले",
            "Zyada kamaai waala mahina pehle",
          )}
        </button>
        <button
          type="button"
          aria-pressed={lowFirst}
          onClick={() => setLowFirst(true)}
        >
          {s(
            "Low month first",
            "कम कमाई वाला महीना पहले",
            "Kam kamaai waala mahina pehle",
          )}
        </button>
      </div>
      <p className="cashflow-total">
        {s(
          "Same six-month income:",
          "छह महीने की कुल कमाई वही:",
          "Chhe mahine ki kul kamaai wahi:",
        )}{" "}
        <strong data-testid="cashflow-total">{rupees(plan.totalIncome)}</strong>{" "}
        · {s("Monthly average", "महीने का औसत", "Mahine ka ausat")}{" "}
        {rupees(plan.averageIncome)}
      </p>
      {slider(
        s(
          "Opening working cash",
          "शुरुआत में रोज़ के लिए पैसे",
          "Shuruaat mein roz ke liye paise",
        ),
        opening,
        0,
        20000,
        1000,
        setOpening,
      )}
      {slider(
        s(
          "Monthly essentials",
          "महीने के ज़रूरी खर्च",
          "Mahine ke zaroori kharch",
        ),
        essentials,
        10000,
        25000,
        1000,
        setEssentials,
      )}
      {slider(
        s(
          "Monthly known-fee saving",
          "तय फ़ीस की महीने की बचत",
          "Tay fees ki mahine ki bachat",
        ),
        reserve,
        0,
        6000,
        500,
        setReserve,
      )}
      <dl className="cashflow-summary" aria-live="polite">
        <div>
          <dt>
            {s(
              "Largest planned cash gap",
              "प्लान में रोज़ के पैसों की सबसे बड़ी कमी",
              "Plan mein roz ke paison ki sabse badi kami",
            )}
          </dt>
          <dd data-testid="cashflow-gap">{rupees(plan.largestCashGap)}</dd>
        </div>
        <div>
          <dt>
            {s(
              "Fee not covered by planned transfers",
              "तय बचत से फ़ीस की बची कमी",
              "Tay bachat se fees ki bachi kami",
            )}
          </dt>
          <dd data-testid="cashflow-bill-gap">{rupees(plan.billGap)}</dd>
        </div>
      </dl>
      {plan.largestCashGap > 0 && (
        <p className="cashflow-warning" role="status">
          {s(
            "Funding is missing. These transfers and payments are only a plan; a negative balance is not available credit or proof the fee was paid.",
            "पैसे कम हैं। ये जमा और पेमेंट अभी सिर्फ़ प्लान हैं। माइनस बैलेंस मिलने वाला क्रेडिट या फ़ीस भरने का सबूत नहीं है।",
            "Paise kam hain. Yeh jama aur payment abhi sirf plan hain. Minus balance milne waala credit ya fees bharne ka saboot nahin hai.",
          )}
        </p>
      )}
      <div
        className="cashflow-months"
        role="group"
        aria-label={s(
          "Inspect a month",
          "महीने का हिसाब देखें",
          "Mahine ka hisaab dekhein",
        )}
      >
        {plan.rows.map((r) => (
          <button
            key={r.month}
            type="button"
            aria-pressed={month === r.month}
            onClick={() => setMonth(r.month)}
          >
            <span>
              {s("Month", "महीना", "Mahina")} {r.month}
            </span>
            <strong>{rupees(r.received)}</strong>
          </button>
        ))}
      </div>
      <h3 className="cashflow-month-heading">
        {s("Month", "महीना", "Mahina")} {row.month}
        {row.month === 3
          ? s(" · Fee due", " · फ़ीस देनी है", " · Fees deni hai")
          : ""}
      </h3>
      <dl className="cashflow-ledger" aria-live="polite">
        <div>
          <dt>{s("Cash received", "आए पैसे", "Aaye paise")}</dt>
          <dd>{rupees(row.received)}</dd>
        </div>
        <div>
          <dt>{s("Essential costs", "ज़रूरी खर्च", "Zaroori kharch")}</dt>
          <dd>{rupees(row.essentials)}</dd>
        </div>
        <div>
          <dt>
            {s(
              "Planned transfer to fee pot",
              "फ़ीस के लिए अलग रखने का प्लान",
              "Fees ke liye alag rakhne ka plan",
            )}
          </dt>
          <dd>{rupees(row.reserved)}</dd>
        </div>
        <div>
          <dt>
            {s(
              "Planned fee payment from pot",
              "फ़ीस की रकम से पेमेंट का प्लान",
              "Fees ki rakam se payment ka plan",
            )}
          </dt>
          <dd data-testid="cashflow-bill-paid">{rupees(row.billPaid)}</dd>
        </div>
        <div>
          <dt>
            {s(
              "Working cash after planned uses",
              "प्लान के खर्च के बाद रोज़ के पैसे",
              "Plan ke kharch ke baad roz ke paise",
            )}
          </dt>
          <dd data-testid="cashflow-working">{rupees(row.cash)}</dd>
        </div>
        <div>
          <dt>
            {s(
              "Reserved fee pot remaining",
              "फ़ीस के लिए अलग बची रकम",
              "Fees ke liye alag bachi rakam",
            )}
          </dt>
          <dd data-testid="cashflow-pot">{rupees(row.pot)}</dd>
        </div>
      </dl>
      <p className="tiny-text">
        {s(
          "The fee pot is separate from working cash. Transfers stop when the fee is fully reserved or after its due month. No other pot automatically covers a short fee pot. Actual dates within a month can create additional gaps.",
          "फ़ीस के पैसे रोज़ के पैसों से अलग हैं। रकम पूरी हो जाए या फ़ीस का महीना निकल जाए तो नई बचत रुकती है। दूसरी रकम से फ़ीस की कमी अपने आप नहीं भरती। महीने के अंदर की असली तारीख़ों से और कमी हो सकती है।",
          "Fees ke paise roz ke paison se alag hain. Rakam poori ho jaaye ya fees ka mahina nikal jaaye toh nayi bachat rukti hai. Doosri rakam se fees ki kami apne aap nahin bharti. Mahine ke andar ki asli taareekhon se aur kami ho sakti hai.",
        )}
      </p>
      <button
        type="button"
        className="text-button"
        onClick={() => {
          setLowFirst(false);
          setOpening(12000);
          setReserve(4000);
          setEssentials(18000);
          setMonth(1);
        }}
      >
        {s(
          "Reset example",
          "example फिर शुरू करें",
          "Example phir shuru karein",
        )}
        <Icon name="RotateCcw" size={16} />
      </button>
    </section>
  );
}
