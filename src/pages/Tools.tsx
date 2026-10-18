import { Copy, useUICopy } from "../lib/ui-copy";
import { useState } from "react";
import type { Language } from "../content/lessons";
import { compound, emi, rupees, sip } from "../lib/learning";
import Mia from "../components/Mia";
import { Icon } from "../components/UI";
type Tool = "sip" | "emi" | "inflation" | "emergency";
const tools = [
  {
    id: "sip" as Tool,
    icon: "Sprout",
    name: "SIP growth",
    hi: "SIP ग्रोथ",
    tag: "A LITTLE, REGULARLY",
  },
  {
    id: "emi" as Tool,
    icon: "Landmark",
    name: "Loan & EMI",
    hi: "लोन और EMI",
    tag: "BORROW WITH YOUR EYES OPEN",
  },
  {
    id: "inflation" as Tool,
    icon: "TrendingDown",
    name: "Inflation",
    hi: "महँगाई",
    tag: "THE SAME RUPEE, OVER TIME",
  },
  {
    id: "emergency" as Tool,
    icon: "Umbrella",
    name: "Safety cushion",
    hi: "इमरजेंसी फ़ंड",
    tag: "A LITTLE PEACE OF MIND",
  },
];
export default function Tools({ language }: { language: Language }) {
  const ui = useUICopy();

  const [tool, setTool] = useState<Tool>("sip"),
    [amount, setAmount] = useState(5000),
    [rate, setRate] = useState(10),
    [years, setYears] = useState(10),
    [saved, setSaved] = useState(0);
  const [investmentMode, setInvestmentMode] = useState<"sip" | "lump">("sip");
  const [lumpSum, setLumpSum] = useState(100000);
  const once = tool === "sip" && investmentMode === "lump";
  const investedAmount = once ? lumpSum : amount;
  const hi = language === "hi";
  const config = tools.find((t) => t.id === tool)!;
  const change = (id: Tool) => {
    setTool(id);
    setAmount(id === "emi" ? 500000 : id === "emergency" ? 20000 : 5000);
    setRate(id === "emi" ? 9 : id === "inflation" ? 6 : 10);
    setYears(id === "emergency" ? 6 : 10);
    setSaved(0);
  };
  const total =
    tool === "sip"
      ? once
        ? compound(lumpSum, rate, years)
        : sip(amount, rate, years)
      : tool === "emi"
        ? emi(amount, rate, years)
        : tool === "inflation"
          ? amount / Math.pow(1 + rate / 100, years)
          : amount * years;
  const principal =
    tool === "sip"
      ? once
        ? lumpSum
        : amount * years * 12
      : tool === "emi"
        ? amount
        : tool === "inflation"
          ? amount
          : saved;
  const chartPoints = Array.from({ length: 41 }, (_, i) => {
    const elapsed = (years * i) / 40;
    if (tool === "sip")
      return once
        ? compound(lumpSum, rate, elapsed)
        : sip(amount, rate, elapsed);
    if (tool === "inflation") return amount / (1 + rate / 100) ** elapsed;
    if (tool === "emergency") return amount * elapsed;
    const months = elapsed * 12,
      r = rate / 1200;
    return r === 0
      ? Math.max(0, amount - total * months)
      : Math.max(
          0,
          amount * (1 + r) ** months - (total * ((1 + r) ** months - 1)) / r,
        );
  });
  const max = Math.max(...chartPoints, 1) * 1.12;
  const path = chartPoints
    .map(
      (n, i) =>
        `${i === 0 ? "M" : "L"}${35 + i * 11.25} ${210 - (Math.max(n, 0) / max) * 170}`,
    )
    .join(" ");
  return (
    <div className="tools-page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">
            <Copy en="THE MONEY PLAYGROUND " />
          </span>
          <h1>
            {hi ? (
              "खेलें। समझें। आज़माएं।"
            ) : (
              <>
                <Copy en="What if? " />
                <span>
                  <Copy en="Let’s find out. " />
                </span>
              </>
            )}
          </h1>
          <p>
            <Copy>
              {hi
                ? "स्लाइडर चलाएं और बदलाव समझें।"
                : "Move a slider. Follow your curiosity. Make the numbers click."}
            </Copy>
          </p>
        </div>
        <Icon name="SlidersHorizontal" size={38} />
      </div>
      <div className="tool-tabs" role="tablist" aria-label={ui("Calculators")}>
        {tools.map((t) => (
          <button
            role="tab"
            aria-selected={tool === t.id}
            key={t.id}
            className={tool === t.id ? "active" : ""}
            onClick={() => change(t.id)}
          >
            <Icon name={t.icon} size={21} />
            <Copy>{hi ? t.hi : t.name}</Copy>
          </button>
        ))}
      </div>
      <section className="calculator">
        <div className="calculator-controls">
          <span className="eyebrow">
            <Copy>{config.tag}</Copy>
          </span>
          <h2>
            <Copy>
              {tool === "sip"
                ? once
                  ? hi
                    ? "एक बार इन्वेस्ट करें। समय दें।"
                    : "Invest once. Give it time."
                  : "Small habits. Room to grow."
                : tool === "emi"
                  ? "The real cost of borrowing."
                  : tool === "inflation"
                    ? "What will your rupee buy?"
                    : "Build your breathing room."}
            </Copy>
          </h2>
          <p>
            <Copy>
              {tool === "sip"
                ? once
                  ? hi
                    ? "एक बार लगाए पैसे मानकर लिए रेट पर कैसे बदलते हैं, देखें।"
                    : "See how a one-time investment could change over time."
                  : "See how monthly contributions could add up over time."
                : tool === "emi"
                  ? "Explore a fixed-rate, reducing-balance loan."
                  : tool === "inflation"
                    ? "Look at today’s money through tomorrow’s prices."
                    : "Start with your essentials. Make the buffer fit your life."}
            </Copy>
          </p>
          {tool === "sip" && (
            <div
              className="investment-mode"
              role="group"
              aria-label={hi ? "इन्वेस्ट करने का तरीका" : "Investment mode"}
            >
              <button
                aria-pressed={!once}
                onClick={() => setInvestmentMode("sip")}
              >
                <Copy>{hi ? "हर महीने (SIP)" : "Monthly (SIP)"}</Copy>
              </button>
              <button
                aria-pressed={once}
                onClick={() => setInvestmentMode("lump")}
              >
                <Copy>{hi ? "एक बार (लंपसम)" : "Lump sum"}</Copy>
              </button>
            </div>
          )}
          <Slider
            label={
              tool === "sip"
                ? once
                  ? hi
                    ? "एक बार की रकम"
                    : "One-time investment"
                  : "Monthly investment"
                : tool === "emi"
                  ? "Loan amount"
                  : tool === "inflation"
                    ? "Money today"
                    : "Monthly essentials"
            }
            value={investedAmount}
            onChange={once ? setLumpSum : setAmount}
            min={tool === "emi" ? 10000 : 500}
            max={
              tool === "emi" || once
                ? 10000000
                : tool === "inflation"
                  ? 1000000
                  : 100000
            }
            step={tool === "emi" ? 10000 : 500}
            display={rupees(investedAmount)}
          />
          {tool !== "emergency" && (
            <Slider
              label={
                tool === "sip"
                  ? "Assumed annual return"
                  : tool === "emi"
                    ? "Annual interest rate"
                    : "Assumed annual inflation"
              }
              value={rate}
              onChange={setRate}
              min={tool === "sip" ? -20 : 0}
              max={tool === "emi" ? 24 : 20}
              step={0.5}
              display={`${rate}%`}
            />
          )}
          <Slider
            label={
              tool === "emergency"
                ? "Months of essential expenses"
                : "Time period"
            }
            value={years}
            onChange={setYears}
            min={tool === "emergency" ? 1 : 1}
            max={tool === "emergency" ? 18 : 40}
            step={1}
            display={`${years} ${tool === "emergency" ? "months" : years === 1 ? "year" : "years"}`}
          />
          {tool === "emergency" && (
            <Slider
              label={ui("Already set aside")}
              value={saved}
              onChange={setSaved}
              min={0}
              max={Math.max(amount * years * 2, 50000)}
              step={500}
              display={rupees(saved)}
            />
          )}
          <div className="tool-assumptions">
            <Icon name="Info" size={18} />
            <p>
              <Copy>
                {tool === "sip"
                  ? once
                    ? hi
                      ? "रकम शुरुआत में एक बार लगाई है। सालाना कंपाउंडिंग और वही रेट माना है। रेट असली रिटर्न नहीं है; फ़ीस, टैक्स और महँगाई नहीं जोड़े। नुकसान भी हो सकता है।"
                      : "One deposit at the start, compounded yearly at a constant assumed rate. No further deposits. Fees, taxes and inflation excluded. Returns can be negative."
                    : "Monthly deposits at month-end. Constant assumed return, compounded monthly. Fees, taxes, and inflation excluded."
                  : tool === "emi"
                    ? "Fixed interest, monthly payments, no fees or prepayments. Actual lender terms can differ."
                    : tool === "inflation"
                      ? "Constant assumed inflation. Your personal basket of prices can behave differently."
                      : "A planning example, not a personal recommendation. Income stability and dependants may change the target."}
              </Copy>
            </p>
          </div>
        </div>
        <div className="calculator-results">
          <div className="result-label">
            <Copy>
              {tool === "sip"
                ? "ILLUSTRATIVE FUTURE VALUE"
                : tool === "emi"
                  ? "ILLUSTRATIVE MONTHLY EMI"
                  : tool === "inflation"
                    ? "IN TODAY’S PURCHASING POWER"
                    : "YOUR ILLUSTRATIVE CUSHION"}
            </Copy>
          </div>
          <div className="big-result" aria-live="polite">
            {rupees(total)}
          </div>
          <p>
            <Copy>
              {tool === "sip"
                ? once
                  ? `after ${years} years from one deposit`
                  : `after ${years} years of monthly deposits`
                : tool === "emi"
                  ? `each month, for ${years} years`
                  : tool === "inflation"
                    ? `what ${rupees(amount)} could buy after ${years} years`
                    : `${years} months of essential breathing room`}
            </Copy>
          </p>
          <div className="growth-chart">
            <svg
              viewBox="0 0 520 250"
              role="img"
              aria-label={ui(
                tool === "emi"
                  ? "Remaining loan balance over time"
                  : tool === "inflation"
                    ? "Purchasing power decreases over time"
                    : "Illustrative growth over time",
              )}
            >
              <defs>
                <linearGradient id="tool-area" x2="0" y2="1">
                  <stop stopColor="var(--color-98ce61)" stopOpacity=".45" />
                  <stop
                    offset="1"
                    stopColor="var(--color-98ce61)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>
              {[50, 100, 150, 210].map((y) => (
                <path
                  key={y}
                  d={`M35 ${y}H485`}
                  stroke="var(--line)"
                  strokeDasharray="3 5"
                />
              ))}
              <path d={`${path} L485 210 L35 210Z`} fill="url(#tool-area)" />
              <path
                d={path}
                fill="none"
                stroke="var(--color-6aa43f)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              <circle
                cx={485}
                cy={210 - (Math.max(chartPoints[40], 0) / max) * 170}
                r="5"
                fill="var(--color-5f973b)"
              />
              <text x="35" y="238">
                <Copy en="Today " />
              </text>
              <text x="485" y="238" textAnchor="end">
                <Copy>{years}</Copy>{" "}
                <Copy>{tool === "emergency" ? "months" : "years"}</Copy>
              </text>
            </svg>
          </div>
          <div className="calculation-breakdown">
            <div>
              <span>
                <Copy>
                  {tool === "sip"
                    ? "You put in"
                    : tool === "emi"
                      ? "Principal borrowed"
                      : tool === "inflation"
                        ? "Money today"
                        : "Already set aside"}
                </Copy>
              </span>
              <strong>{rupees(principal)}</strong>
            </div>
            <div>
              <span>
                <Copy>
                  {tool === "sip"
                    ? "Illustrative gain or loss"
                    : tool === "emi"
                      ? "Total interest"
                      : tool === "inflation"
                        ? "Purchasing power lost"
                        : "Still to build"}
                </Copy>
              </span>
              <strong>
                {rupees(
                  tool === "sip"
                    ? total - principal
                    : tool === "emi"
                      ? total * years * 12 - amount
                      : tool === "inflation"
                        ? amount - total
                        : Math.max(0, total - saved),
                )}
              </strong>
            </div>
            {tool === "emi" && (
              <div>
                <span>
                  <Copy en="Total repayment " />
                </span>
                <strong>{rupees(total * years * 12)}</strong>
              </div>
            )}
          </div>
          <div className="calculator-mia">
            <Mia pose="face" />
            <p>
              <Copy>
                {tool === "sip"
                  ? "“Time is a helpful ingredient. A return assumption is not a promise.”"
                  : tool === "emi"
                    ? "“A smaller EMI can hide a bigger total cost. Check both.”"
                    : tool === "inflation"
                      ? "“A bigger number isn’t always a bigger basket of groceries.”"
                      : "“Start small. A cushion grows one thoughtful transfer at a time.”"}
              </Copy>
            </p>
          </div>
        </div>
      </section>
      <div className="tool-bottom">
        <Icon name="FlaskConical" size={22} />
        <p>
          <strong>
            <Copy en="A space to experiment, not investment advice. " />
          </strong>
          <br />
          <Copy en="All figures are educational illustrations. No live rates, product recommendations, or promised returns. " />
        </p>
      </div>
    </div>
  );
}
function Slider({
  label,
  value,
  onChange,
  min,
  max,
  step,
  display,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  display: string;
}) {
  return (
    <label className="slider-control">
      <span>
        <strong>
          <Copy>{label}</Copy>
        </strong>
        <output>
          <Copy>{display}</Copy>
        </output>
      </span>
      <input
        type="range"
        aria-label={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          background: `linear-gradient(to right, var(--color-79b84a) ${((value - min) / (max - min)) * 100}%, var(--line) 0%)`,
        }}
      />
      <span className="range-labels">
        <small>{min.toLocaleString("en-IN")}</small>
        <small>{max.toLocaleString("en-IN")}</small>
      </span>
    </label>
  );
}
