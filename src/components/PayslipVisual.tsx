import { useId, useState } from "react";
import type { Language } from "../content/schema";
import {
  examplePayroll,
  payroll,
  payrollBudget,
  type PayrollInputs,
} from "../lib/payroll";
import { rupees } from "../lib/learning";
import { Icon } from "./UI";

export default function PayslipVisual({ language }: { language: Language }) {
  const [input, setInput] = useState<PayrollInputs>({ ...examplePayroll });
  const [open, setOpen] = useState<keyof PayrollInputs | null>("allowance");
  const [mode, setMode] = useState<"slip" | "budget">("slip");
  const [essentials, setEssentials] = useState(23000);
  const [savingGoal, setSavingGoal] = useState(5000);
  const regionId = useId();
  const s = (en: string, hi: string, roman: string) =>
    language === "hi" ? hi : language === "hinglish" ? roman : en;
  const result = payroll(input);
  const budget = payrollBudget(result.net, essentials, savingGoal);
  const rows: {
    key: keyof PayrollInputs;
    title: string;
    detail: string;
    max?: number;
    step?: number;
    annual?: boolean;
  }[] = [
    {
      key: "basic",
      title: s("Basic pay", "बेसिक पे", "Basic pay"),
      detail: s(
        "The fixed salary component in this example: ₹24,000 every month, before deductions.",
        "इस example में सैलरी का तय मुख्य हिस्सा: कटौती से पहले ₹24,000 महीना।",
        "Is example mein salary ka tay mukhya hissa: katauti se pehle ₹24,000 mahina.",
      ),
    },
    {
      key: "allowance",
      title: s("Cash allowance", "नकद अलाउंस", "Nakad allowance"),
      detail: s(
        "An extra cash payment included in gross pay here. Change it and compare gross pay with the bank deposit.",
        "यहाँ ग्रॉस पे में जुड़ने वाले अलग नकद पैसे। इसे बदलकर ग्रॉस पे और बैंक जमा मिलाएं।",
        "Yahaan gross pay mein judne waale alag nakad paise. Ise badalkar gross pay aur bank jama milaayein.",
      ),
      max: 12000,
      step: 500,
    },
    {
      key: "employeeSaving",
      title: s(
        "Employee saving deducted",
        "कर्मचारी की बचत की कटौती",
        "Employee ki bachat ki katauti",
      ),
      detail: s(
        "Money moved from pay to retirement savings in this fictional arrangement. It reduces bank cash, not gross pay. This is not a statutory contribution rate.",
        "इस बनाए हुए प्लान में सैलरी से रिटायरमेंट बचत में गए पैसे। बैंक में नकद पैसे घटेंगे, ग्रॉस पे नहीं। यह असली नियम वाला रेट नहीं है।",
        "Is banaaye hue plan mein salary se retirement bachat mein gaye paise. Bank mein nakad paise ghatenge, gross pay nahin. Yeh asli niyam waala rate nahin hai.",
      ),
      max: 4000,
      step: 100,
    },
    {
      key: "advanceRepayment",
      title: s(
        "Salary advance repaid",
        "एडवांस सैलरी की वापसी",
        "Advance salary ki waapsi",
      ),
      detail: s(
        "Part of an earlier advance is repaid from this month's pay. Increasing repayment reduces today's bank deposit. The advance was not extra earned income.",
        "पहले ली गई एडवांस सैलरी का कुछ हिस्सा इस महीने लौटाया। वापसी बढ़ाएं तो आज बैंक में कम पैसे आएंगे। एडवांस अलग से कमाई नहीं था।",
        "Pehle li gayi advance salary ka kuchh hissa is mahine lautaaya. Waapsi badhaayein toh aaj bank mein kam paise aayenge. Advance alag se kamaai nahin tha.",
      ),
      max: 5000,
      step: 100,
    },
    {
      key: "employerBenefit",
      title: s(
        "Employer-paid benefit cost",
        "कंपनी के फ़ायदे का खर्च",
        "Company ke faayde ka kharch",
      ),
      detail: s(
        "This employer cost is outside gross pay in our example. Change it: annual package cost changes, but monthly bank cash does not.",
        "इस example में कंपनी का यह खर्च ग्रॉस पे से अलग है। इसे बदलें: सालाना पैकेज बदलेगा, महीने के नकद पैसे नहीं।",
        "Is example mein company ka yeh kharch gross pay se alag hai. Ise badlein: saalaana package badlega, mahine ke nakad paise nahin.",
      ),
      max: 6000,
      step: 100,
    },
    {
      key: "targetAnnualBonus",
      title: s(
        "Target bonus, not guaranteed",
        "बोनस का लक्ष्य, मिलना तय नहीं",
        "Bonus ka lakshya, milna tay nahin",
      ),
      detail: s(
        "An annual target included in this fictional offer. It is not a regular deposit. Setting it to zero changes the target offer cost, not the monthly take-home amount.",
        "इस बनाए हुए ऑफ़र में सालाना बोनस का लक्ष्य। यह नियमित बैंक जमा नहीं है। शून्य करें तो ऑफ़र का खर्च बदलेगा, महीने का टेक-होम नहीं।",
        "Is banaaye hue offer mein saalaana bonus ka lakshya. Yeh niyamit bank jama nahin hai. Shoonya karein toh offer ka kharch badlega, mahine ka take-home nahin.",
      ),
      max: 60000,
      step: 3000,
      annual: true,
    },
  ];
  const slider = (
    label: string,
    value: number,
    max: number,
    step: number,
    change: (value: number) => void,
  ) => (
    <label className="payslip-slider">
      <span>
        {label}
        <output>{rupees(value)}</output>
      </span>
      <input
        type="range"
        aria-label={label}
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => change(Number(e.target.value))}
      />
    </label>
  );
  return (
    <section
      className="payslip-board"
      aria-label={s(
        "Fictional payslip board",
        "बनाई हुई सैलरी स्लिप का बोर्ड",
        "Banaayi hui salary slip ka board",
      )}
    >
      <p className="payslip-assumption">
        {s(
          "Fictional figures · 23 October 2026 · No current tax or mandatory contribution rates.",
          "बनाए हुए आँकड़े · 23 अक्टूबर 2026 · असली टैक्स या ज़रूरी कटौती के रेट नहीं।",
          "Banaaye hue aankde · 23 October 2026 · Asli tax ya zaroori katauti ke rate nahin.",
        )}
      </p>
      <div
        className="payslip-modes"
        role="group"
        aria-label={s(
          "Choose an exploration",
          "क्या आज़माना है चुनें",
          "Kya aazmaana hai chunein",
        )}
      >
        <button
          type="button"
          aria-pressed={mode === "slip"}
          onClick={() => setMode("slip")}
        >
          {s("Read the slip", "स्लिप समझें", "Slip samjhein")}
        </button>
        <button
          type="button"
          aria-pressed={mode === "budget"}
          onClick={() => setMode("budget")}
        >
          {s("Build a budget", "बजट बनाएं", "Budget banaayein")}
        </button>
      </div>
      <dl className="payslip-summary">
        <div>
          <dt>
            {s(
              "Annual example offer (CTC)",
              "सालाना example पैकेज (CTC)",
              "Saalaana example package (CTC)",
            )}
          </dt>
          <dd data-testid="payroll-ctc">{rupees(result.targetAnnualCost)}</dd>
          <dd className="payslip-cost-note">
            <small>
              {s(
                "Includes the target bonus",
                "बोनस का लक्ष्य भी जुड़ा है",
                "Bonus ka lakshya bhi juda hai",
              )}
            </small>
          </dd>
        </div>
        <div>
          <dt>
            {s(
              "Monthly pay before deductions",
              "कटौती से पहले महीने की कमाई",
              "Katauti se pehle mahine ki kamaai",
            )}
          </dt>
          <dd data-testid="payroll-gross">{rupees(result.gross)}</dd>
        </div>
        <div className="payslip-net">
          <dt>
            {s(
              "Monthly bank deposit",
              "महीने की बैंक जमा",
              "Mahine ki bank jama",
            )}
          </dt>
          <dd data-testid="payroll-net">{rupees(result.net)}</dd>
        </div>
      </dl>
      {mode === "slip" ? (
        <>
          <p>
            {s(
              "Predict what will change, then open a row to explore it.",
              "पहले सोचें क्या बदलेगा। फिर लाइन खोलकर आज़माएं।",
              "Pehle sochein kya badlega. Phir line kholkar aazmaayein.",
            )}
          </p>
          <ul className="payslip-rows">
            {rows.map((row) => (
              <li key={row.key}>
                <button
                  type="button"
                  aria-expanded={open === row.key}
                  aria-controls={regionId + row.key}
                  onClick={() => setOpen(open === row.key ? null : row.key)}
                >
                  <span>
                    {row.title}
                    <small>
                      {row.annual
                        ? s("per year", "हर साल", "Har saal")
                        : s("per month", "हर महीने", "Har mahine")}
                    </small>
                  </span>
                  <strong>{rupees(input[row.key])}</strong>
                  <Icon
                    name={open === row.key ? "ChevronUp" : "ChevronDown"}
                    size={16}
                  />
                </button>
                <div id={regionId + row.key} hidden={open !== row.key}>
                  <p>{row.detail}</p>
                  {row.max !== undefined &&
                    slider(
                      row.title,
                      input[row.key],
                      row.max,
                      row.step!,
                      (value) => setInput((p) => ({ ...p, [row.key]: value })),
                    )}
                  {row.max !== undefined && (
                    <dl className="payslip-change" aria-live="polite">
                      <div>
                        <dt>
                          {s(
                            "Annual example offer",
                            "सालाना example पैकेज",
                            "Saalaana example package",
                          )}
                        </dt>
                        <dd>{rupees(result.targetAnnualCost)}</dd>
                      </div>
                      <div>
                        <dt>
                          {s(
                            "Monthly bank deposit",
                            "महीने की बैंक जमा",
                            "Mahine ki bank jama",
                          )}
                        </dt>
                        <dd data-testid="payroll-local-net">
                          {rupees(result.net)}
                        </dd>
                      </div>
                    </dl>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div
            className="payslip-presets"
            role="group"
            aria-label={s(
              "Try a comparison",
              "बदलाव आज़माएं",
              "Badlaav aazmaayein",
            )}
          >
            <button
              type="button"
              onClick={() => {
                setInput({ ...examplePayroll, employerBenefit: 3000 });
                setOpen("employerBenefit");
              }}
            >
              {s(
                "Employer benefit +₹600",
                "कंपनी का फ़ायदा +₹600",
                "Company ka faayda +₹600",
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setInput({ ...examplePayroll, advanceRepayment: 2200 });
                setOpen("advanceRepayment");
              }}
            >
              {s(
                "Repay ₹1,000 more",
                "₹1,000 और लौटाएं",
                "₹1,000 aur lautaayein",
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setInput({ ...examplePayroll, targetAnnualBonus: 0 });
                setOpen("targetAnnualBonus");
              }}
            >
              {s(
                "No target bonus",
                "बोनस का लक्ष्य शून्य",
                "Bonus ka lakshya shoonya",
              )}
            </button>
          </div>
          <p
            className="payslip-equation"
            data-testid="payroll-equation"
            role="status"
          >
            {rupees(result.gross)} − {rupees(input.employeeSaving)} −{" "}
            {rupees(input.advanceRepayment)} ={" "}
            <strong>{rupees(result.net)}</strong>
          </p>
          <p className="tiny-text">
            {s(
              "Gross pay − employee deductions = bank deposit. Employer benefit costs stay outside this equation.",
              "ग्रॉस पे − कर्मचारी की कटौती = बैंक जमा। कंपनी के फ़ायदे का खर्च इस हिसाब से अलग है।",
              "Gross pay − employee ki katauti = bank jama. Company ke faayde ka kharch is hisaab se alag hai.",
            )}
          </p>
        </>
      ) : (
        <>
          <p>
            {s(
              "Use the bank deposit, not the annual offer divided by twelve. A transfer already deducted from pay is not deducted again here.",
              "बैंक में आए पैसे लें, सालाना ऑफ़र को बारह से बांटकर नहीं। सैलरी से पहले ही कटी रकम यहाँ फिर न घटाएं।",
              "Bank mein aaye paise lein, saalaana offer ko baarah se baantkar nahin. Salary se pehle hi kati rakam yahaan phir na ghataayein.",
            )}
          </p>
          {slider(
            s(
              "Monthly essentials",
              "महीने के ज़रूरी खर्च",
              "Mahine ke zaroori kharch",
            ),
            essentials,
            40000,
            500,
            setEssentials,
          )}
          {slider(
            s(
              "Monthly saving target",
              "महीने की बचत का लक्ष्य",
              "Mahine ki bachat ka lakshya",
            ),
            savingGoal,
            12000,
            500,
            setSavingGoal,
          )}
          <dl className="payslip-budget" aria-live="polite">
            <div>
              <dt>
                {s(
                  "After essentials",
                  "ज़रूरी खर्च के बाद",
                  "Zaroori kharch ke baad",
                )}
              </dt>
              <dd>{rupees(budget.available)}</dd>
            </div>
            <div>
              <dt>
                {budget.gap
                  ? s("Plan shortfall", "प्लान में कमी", "Plan mein kami")
                  : s(
                      "Left after the saving target",
                      "बचत के लक्ष्य के बाद बाकी",
                      "Bachat ke lakshya ke baad baaki",
                    )}
              </dt>
              <dd data-testid="payroll-gap">
                {rupees(budget.gap || budget.surplus)}
              </dd>
            </div>
          </dl>
          <p className="payslip-budget-result" role="status">
            {budget.gap
              ? s(
                  "The plan needs a change. Check the saving amount, date or costs you can change; borrowing does not turn the shortfall into income.",
                  "प्लान बदलना होगा। बचत की रकम, समय या बदल सकने वाले खर्च चेक करें। उधार से कमी कमाई नहीं बनती।",
                  "Plan badalna hoga. Bachat ki rakam, samay ya badal sakne waale kharch check karein. Udhaar se kami kamaai nahin banti.",
                )
              : s(
                  "This fictional plan fits the current inputs. Keep one-time receipts separate and review the plan when regular pay changes.",
                  "इन आँकड़ों पर बनाया हुआ प्लान पूरा है। एक बार आए पैसे अलग रखें। नियमित सैलरी बदले तो प्लान फिर देखें।",
                  "In aankdon par banaaya hua plan poora hai. Ek baar aaye paise alag rakhein. Niyamit salary badle toh plan phir dekhein.",
                )}
          </p>
        </>
      )}
      <button
        className="text-button payslip-reset"
        type="button"
        onClick={() => {
          setInput({ ...examplePayroll });
          setEssentials(23000);
          setSavingGoal(5000);
          setOpen("allowance");
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
