import { useState } from "react";
import type { Language } from "../content/schema";
import { simpleInterest } from "../lib/interest";
import { rupees } from "../lib/learning";
export default function InterestVisual({ language }: { language: Language }) {
  const [years, setYears] = useState(2);
  const s = (en: string, hi: string, roman: string) =>
    language === "hi" ? hi : language === "hinglish" ? roman : en;
  const result = simpleInterest(10000, 8, years);
  const label = s("Time in years", "समय (साल)", "Samay (saal)");
  return (
    <div className="interest-model">
      <div className="model-context">
        {s(
          "Fictional ₹10,000 · fixed 8% per year · simple interest",
          "बनाए हुए ₹10,000 · तय सालाना 8% · सिंपल इंटरेस्ट",
          "Banaaye hue ₹10,000 · tay saalaana 8% · simple interest",
        )}
      </div>
      <label className="planning-slider">
        <span>
          <strong>{label}</strong>
          <output>{years}</output>
        </span>
        <input
          type="range"
          aria-label={label}
          min={0.5}
          max={10}
          step={0.5}
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
        />
      </label>
      <dl className="planning-summary" aria-live="polite">
        <div>
          <dt>{s("Interest earned", "मिला ब्याज", "Mila byaaj")}</dt>
          <dd>{rupees(result.interest)}</dd>
        </div>
        <div>
          <dt>
            {s(
              "Principal + interest",
              "शुरू की रकम + ब्याज",
              "Shuru ki rakam + byaaj",
            )}
          </dt>
          <dd>{rupees(result.total)}</dd>
        </div>
      </dl>
      <p className="timeline-detail">
        {s(
          `₹10,000 × 0.08 × ${years} = ${rupees(result.interest)} interest.`,
          `₹10,000 × 0.08 × ${years} = ${rupees(result.interest)} ब्याज।`,
          `₹10,000 × 0.08 × ${years} = ${rupees(result.interest)} byaaj.`,
        )}
      </p>
      <div className="planning-outcome">
        <span>
          {s(
            "Each full year adds ₹800; earlier interest does not earn more interest in this model. Half a year adds ₹400.",
            "हर पूरे साल ₹800 जुड़ते हैं। इस मॉडल में पहले के ब्याज पर और ब्याज नहीं मिलता। आधे साल में ₹400 जुड़ते हैं।",
            "Har poore saal ₹800 judte hain. Is model mein pehle ke byaaj par aur byaaj nahin milta. Aadhe saal mein ₹400 judte hain.",
          )}
        </span>
      </div>
      <p>
        {s(
          "Unchanged principal, annual-rate time measured in years, no tax or fees. This worksheet is not a deposit offer and does not model loan repayments or real day-count conventions.",
          "शुरू की रकम वही है। सालाना रेट के लिए समय साल में है। टैक्स या फ़ीस नहीं हैं। यह जमा का ऑफ़र नहीं है। लोन पेमेंट या असली दिनों का हिसाब इसमें नहीं है।",
          "Shuru ki rakam wahi hai. Saalaana rate ke liye samay saal mein hai. Tax ya fees nahin hain. Yeh jama ka offer nahin hai. Loan payment ya asli dinon ka hisaab ismein nahin hai.",
        )}
      </p>
    </div>
  );
}
