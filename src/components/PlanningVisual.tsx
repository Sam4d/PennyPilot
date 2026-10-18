import { useState } from "react";
import type { Language } from "../content/schema";
import { savingsGoal, netWorth } from "../lib/planning";
import { rupees } from "../lib/learning";
import { Icon } from "./UI";
export default function PlanningVisual({
  lessonId,
  language,
}: {
  lessonId: string;
  language: Language;
}) {
  const [months, setMonths] = useState(6);
  const [monthly, setMonthly] = useState(3000);
  const [cursor, setCursor] = useState(3);
  const [vehicle, setVehicle] = useState(50000);
  const [loan, setLoan] = useState(70000);
  const [borrowed, setBorrowed] = useState(false);
  const s = (en: string, hi: string, roman: string) =>
    language === "hi" ? hi : language === "hinglish" ? roman : en;
  const goal = savingsGoal(24000, 6000, months, monthly);
  const cash = 40000 + (borrowed ? 10000 : 0);
  const snapshot = netWorth(
    [cash, 60000, vehicle],
    [loan, 10000, borrowed ? 10000 : 0],
  );
  const scale = Math.max(snapshot.owned, snapshot.owed, 1);
  const slider = (
    label: string,
    value: number,
    display: string,
    min: number,
    max: number,
    step: number,
    change: (n: number) => void,
  ) => (
    <label className="planning-slider">
      <span>
        <strong>{label}</strong>
        <output>{display}</output>
      </span>
      <input
        type="range"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => change(Number(e.target.value))}
      />
    </label>
  );
  return (
    <div className="planning-model">
      {lessonId === "goal-plan" ? (
        <>
          <div className="model-context">
            <Icon name="Flag" size={21} />
            <span>
              {s(
                "Fictional course goal · ₹24,000 target · ₹6,000 already reserved",
                "कोर्स का बनाया हुआ लक्ष्य · कीमत ₹24,000 · पहले से अलग ₹6,000",
                "Course ka banaaya hua lakshya · keemat ₹24,000 · pehle se alag ₹6,000",
              )}
            </span>
          </div>
          <dl className="planning-summary" aria-live="polite">
            <div>
              <dt>
                {s(
                  "Needed each month",
                  "हर महीने चाहिए",
                  "Har mahine chaahiye",
                )}
              </dt>
              <dd>{rupees(goal.monthlyNeeded)}</dd>
            </div>
            <div>
              <dt>
                {s("At your deadline", "तय समय पर कुल", "Tay samay par kul")}
              </dt>
              <dd>{rupees(goal.projected)}</dd>
            </div>
          </dl>
          {slider(
            s("Months until the goal", "लक्ष्य तक महीने", "Lakshya tak mahine"),
            months,
            `${months}`,
            1,
            12,
            1,
            (n) => {
              setMonths(n);
              setCursor(Math.min(cursor, n));
            },
          )}
          {slider(
            s(
              "Your monthly saving",
              "आपकी महीने की बचत",
              "Aapki mahine ki bachat",
            ),
            monthly,
            rupees(monthly),
            0,
            10000,
            500,
            setMonthly,
          )}
          <div
            className={`planning-outcome ${goal.shortfall ? "has-gap" : "on-track"}`}
            role="status"
          >
            <Icon name={goal.shortfall ? "Info" : "CircleCheck"} size={20} />
            <span>
              {goal.shortfall
                ? s(
                    `${rupees(goal.shortfall)} short at the deadline.`,
                    `तय समय पर ${rupees(goal.shortfall)} कम।`,
                    `Tay samay par ${rupees(goal.shortfall)} kam.`,
                  )
                : s(
                    `Target covered; ${rupees(goal.surplus)} above the target.`,
                    `लक्ष्य पूरा; लक्ष्य से ${rupees(goal.surplus)} ज़्यादा।`,
                    `Lakshya poora; lakshya se ${rupees(goal.surplus)} zyada.`,
                  )}
              <small>
                {goal.monthsNeeded === null
                  ? s(
                      "With no new saving, the gap stays open.",
                      "नई बचत नहीं होगी तो कमी बनी रहेगी।",
                      "Nayi bachat nahin hogi toh kami bani rahegi.",
                    )
                  : s(
                      `At this saving rate: ${goal.monthsNeeded} monthly deposits to reach the goal.`,
                      `इस बचत पर लक्ष्य तक ${goal.monthsNeeded} महीने की जमा चाहिए।`,
                      `Is bachat par lakshya tak ${goal.monthsNeeded} mahine ki jama chaahiye.`,
                    )}
              </small>
            </span>
          </div>
          <div className="goal-progress" aria-hidden="true">
            <span style={{ width: `${goal.funded * 100}%` }} />
          </div>
          <p className="planning-instruction">
            {s(
              "Explore the saving timeline. Scroll for later months.",
              "बचत का सफ़र देखें। आगे के महीनों के लिए स्क्रॉल करें।",
              "Bachat ka safar dekhein. Aage ke mahinon ke liye scroll karein.",
            )}
          </p>
          <div
            className="goal-timeline"
            role="group"
            aria-label={s(
              "Explore saving months",
              "बचत के महीने देखें",
              "Bachat ke mahine dekhein",
            )}
          >
            {Array.from({ length: months + 1 }, (_, month) => (
              <button
                key={month}
                aria-pressed={cursor === month}
                onClick={() => setCursor(month)}
              >
                <small>
                  {month === 0
                    ? s("Start", "शुरुआत", "Shuruaat")
                    : s(`Month ${month}`, `महीना ${month}`, `Mahina ${month}`)}
                </small>
                <strong>{rupees(6000 + monthly * month)}</strong>
                <span aria-hidden="true">
                  {6000 + monthly * month >= 24000 ? "✓" : "·"}
                </span>
              </button>
            ))}
          </div>
          <p className="timeline-detail" aria-live="polite">
            {s(
              `After ${cursor} deposits: ₹6,000 + ${cursor} × ${rupees(monthly)} = ${rupees(6000 + cursor * monthly)}.`,
              `${cursor} जमा के बाद: ₹6,000 + ${cursor} × ${rupees(monthly)} = ${rupees(6000 + cursor * monthly)}।`,
              `${cursor} jama ke baad: ₹6,000 + ${cursor} × ${rupees(monthly)} = ${rupees(6000 + cursor * monthly)}.`,
            )}
          </p>
          <p>
            {s(
              "Fixed price, month-end deposits and no interest, tax or fees. Needed monthly saving rounds up to a whole rupee. A longer deadline may change the actual price. These controls explore a fictional plan and do not save your personal finances.",
              "कीमत तय है। जमा महीने के आखिर में है। ब्याज, टैक्स या फ़ीस नहीं जोड़े। ज़रूरी महीने की बचत अगले पूरे रुपये तक बढ़ाकर दिखाई है। समय बढ़े तो असली कीमत बदल सकती है। यह बनाया हुआ प्लान है; आपके निजी पैसों का हिसाब सेव नहीं होता।",
              "Keemat tay hai. Jama mahine ke aakhir mein hai. Byaaj, tax ya fees nahin jode. Zaroori mahine ki bachat agle poore rupaye tak badhaakar dikhaayi hai. Samay badhe toh asli keemat badal sakti hai. Yeh banaaya hua plan hai; aapke niji paison ka hisaab save nahin hota.",
            )}
          </p>
        </>
      ) : (
        <>
          <div className="model-context">
            <Icon name="Scale" size={21} />
            <span>
              {s(
                "Fictional snapshot · all balances on the same date",
                "बनाया हुआ हिसाब · सभी बैलेंस एक तारीख़ के",
                "Banaaya hua hisaab · sabhi balance ek taareekh ke",
              )}
            </span>
          </div>
          <dl className="planning-summary" aria-live="polite">
            <div>
              <dt>{s("Total assets", "कुल एसेट", "Kul asset")}</dt>
              <dd>{rupees(snapshot.owned)}</dd>
            </div>
            <div>
              <dt>{s("Total debts", "कुल कर्ज़", "Kul karz")}</dt>
              <dd>{rupees(snapshot.owed)}</dd>
            </div>
            <div className="net-worth-result">
              <dt>{s("Net worth", "नेट वर्थ", "Net worth")}</dt>
              <dd>{rupees(snapshot.total)}</dd>
            </div>
          </dl>
          <div className="snapshot-bars" aria-hidden="true">
            <div>
              <span style={{ width: `${(snapshot.owned / scale) * 100}%` }} />
            </div>
            <div>
              <span style={{ width: `${(snapshot.owed / scale) * 100}%` }} />
            </div>
          </div>
          <ul className="snapshot-items">
            <li>
              {s("Bank balance", "बैंक बैलेंस", "Bank balance")}{" "}
              <strong>{rupees(cash)}</strong>
            </li>
            <li>
              {s("Deposit balance", "जमा बैलेंस", "Jama balance")}{" "}
              <strong>₹60,000</strong>
            </li>
            <li>
              {s("Card balance owed", "कार्ड का बकाया", "Card ka bakaaya")}{" "}
              <strong>₹10,000</strong>
            </li>
          </ul>
          {slider(
            s(
              "Current vehicle value",
              "गाड़ी की आज की कीमत",
              "Gaadi ki aaj ki keemat",
            ),
            vehicle,
            rupees(vehicle),
            0,
            100000,
            5000,
            setVehicle,
          )}
          {slider(
            s(
              "Outstanding vehicle loan",
              "गाड़ी का बाकी लोन",
              "Gaadi ka baaki loan",
            ),
            loan,
            rupees(loan),
            0,
            200000,
            5000,
            setLoan,
          )}
          <button
            className="planning-borrow"
            aria-pressed={borrowed}
            onClick={() => setBorrowed(!borrowed)}
          >
            <Icon name="ArrowLeftRight" size={18} />
            {s(
              "Try borrowing ₹10,000 and keeping it in the bank",
              "₹10,000 उधार लेकर बैंक में रखने का असर देखें",
              "₹10,000 udhaar lekar bank mein rakhne ka asar dekhein",
            )}
          </button>
          <div className="planning-outcome" role="status">
            <Icon name="Lightbulb" size={20} />
            <span>
              {borrowed
                ? s(
                    "Cash +₹10,000. Debt +₹10,000. Net worth is unchanged before fees.",
                    "कैश +₹10,000। कर्ज़ +₹10,000। फ़ीस से पहले नेट वर्थ वही है।",
                    "Cash +₹10,000. Karz +₹10,000. Fees se pehle net worth wahi hai.",
                  )
                : s(
                    "Borrowed cash increases both sides of the snapshot; it does not create wealth by itself.",
                    "उधार का कैश हिसाब के दोनों हिस्से बढ़ाता है। सिर्फ़ उधार लेने से दौलत नहीं बढ़ती।",
                    "Udhaar ka cash hisaab ke dono hisse badhaata hai. Sirf udhaar lene se daulat nahin badhti.",
                  )}
            </span>
          </div>
          <p>
            {s(
              "Net worth = assets − outstanding debts. Values are estimates, not sale quotes; sale costs, taxes and future income are excluded. Negative net worth is shown honestly. Net worth is neither ready cash nor a judgement of your value as a person.",
              "नेट वर्थ = एसेट − बाकी कर्ज़। कीमतें अनुमान हैं, बेचने का पक्का भाव नहीं। बेचने का खर्च, टैक्स और आगे की कमाई शामिल नहीं हैं। माइनस नेट वर्थ भी दिखाई है। यह तुरंत मिलने वाला कैश या आपकी इंसानी कीमत नहीं है।",
              "Net worth = asset − baaki karz. Keematein anumaan hain, bechne ka pakka bhaav nahin. Bechne ka kharch, tax aur aage ki kamaai shaamil nahin hain. Minus net worth bhi dikhaayi hai. Yeh turant milne waala cash ya aapki insaani keemat nahin hai.",
            )}
          </p>
        </>
      )}
    </div>
  );
}
