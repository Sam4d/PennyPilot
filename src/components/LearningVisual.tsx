import { useState } from "react";
import type { Language } from "../content/lessons";
import { compound, rupees } from "../lib/learning";
import { Icon } from "./UI";
import InterestVisual from "./InterestVisual";
import BorrowingVisual from "./BorrowingVisual";
import PlanningVisual from "./PlanningVisual";
import ProtectionVisual from "./ProtectionVisual";
import PayslipVisual from "./PayslipVisual";
import CashflowVisual from "./CashflowVisual";
export default function LearningVisual({
  lessonId,
  language,
}: {
  lessonId: string;
  language: Language;
}) {
  const [value, setValue] = useState(
    lessonId === "inflation"
      ? 20
      : lessonId === "banking"
        ? 12000
        : lessonId === "credit-card"
          ? 500
          : lessonId === "debt-plan"
            ? 1000
            : lessonId === "money"
              ? 80
              : lessonId === "income"
                ? 80
                : lessonId === "budget"
                  ? 15000
                  : lessonId === "compound"
                    ? 2
                    : 6,
  );
  const [revealed, setRevealed] = useState(false);
  const s = (en: string, hi: string, hinglish: string) =>
    language === "hi" ? hi : language === "hinglish" ? hinglish : en;
  const slider = (label: string, min: number, max: number, step: number) => (
    <label className="visual-slider">
      <span>{label}</span>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
    </label>
  );
  return (
    <div className={`learning-visual visual-${lessonId}`}>
      <span className="visual-label">
        <Icon name="MousePointer2" size={13} />
        {s("A LITTLE EXPLORATION", "थोड़ा आज़माएं", "Thoda aazmaayein")}
      </span>
      {["insurance", "health-cover", "term-cover"].includes(lessonId) && (
        <ProtectionVisual lessonId={lessonId} language={language} />
      )}
      {["emi", "loan-cost"].includes(lessonId) && (
        <BorrowingVisual lessonId={lessonId} language={language} />
      )}
      {["goal-plan", "net-worth"].includes(lessonId) && (
        <PlanningVisual lessonId={lessonId} language={language} />
      )}
      {lessonId === "simple-interest" && <InterestVisual language={language} />}
      {lessonId === "payslip" && <PayslipVisual language={language} />}
      {lessonId === "irregular-income" && (
        <CashflowVisual language={language} />
      )}
      {lessonId === "inflation" && (
        <>
          <div className="visual-equation">
            <span>
              ₹100 <small>{s("same budget", "वही बजट", "wahi budget")}</small>
            </span>
            <span>÷ {rupees(value)} =</span>
            <strong>
              {Math.floor(100 / value)}
              <small>{s("whole packets", "पूरे पैकेट", "poore packet")}</small>
            </strong>
          </div>
          {slider(
            s(
              "Change the price per packet",
              "हर पैकेट की कीमत बदलें",
              "Har packet ki keemat badlein",
            ),
            20,
            50,
            5,
          )}
          <p>
            {s(
              "Same-size fictional packets. A higher price buys fewer packets with the same ₹100. One item alone does not measure overall inflation.",
              "मान लें पैकेट का साइज़ वही है। कीमत बढ़ने पर उसी ₹100 में कम पैकेट आएंगे। एक चीज़ से पूरी महँगाई नहीं मापते।",
              "Maan lein packet ka size wahi hai. Keemat badhne par usi ₹100 mein kam packet aayenge. Ek cheez se poori mehengai nahin naapte.",
            )}
          </p>
        </>
      )}
      {lessonId === "banking" && (
        <>
          <div className="visual-equation">
            <span>
              ₹40,000
              <small>
                {s(
                  "after salary credit",
                  "सैलरी आने के बाद",
                  "salary aane ke baad",
                )}
              </small>
            </span>
            <span>− {rupees(value)} =</span>
            <strong>
              {rupees(40000 - value)}
              <small>
                {s("closing balance", "बचा बैलेंस", "bacha balance")}
              </small>
            </strong>
          </div>
          {slider(
            s(
              "Change the rent debit",
              "किराए का खर्च बदलें",
              "Kiraaye ka kharch badlein",
            ),
            0,
            40000,
            1000,
          )}
          <p>
            {s(
              "Fictional account: ₹10,000 opening balance + ₹30,000 salary. In this statement, a debit takes money out; a credit adds money.",
              "बनाया हुआ खाता: शुरुआत में ₹10,000 + ₹30,000 सैलरी। इस स्टेटमेंट में debit से पैसे जाते हैं, credit से आते हैं।",
              "Banaya hua khaata: shuruaat mein ₹10,000 + ₹30,000 salary. Is statement mein debit se paise jaate hain, credit se aate hain.",
            )}
          </p>
        </>
      )}
      {lessonId === "credit-card" && (
        <>
          <div className="visual-equation">
            <span>
              ₹10,000<small>{s("total bill", "पूरा बिल", "poora bill")}</small>
            </span>
            <span>− {rupees(value)} =</span>
            <strong>
              {rupees(10000 - value)}
              <small>
                {s("still unpaid", "अभी चुकाने हैं", "abhi chukaane hain")}
              </small>
            </strong>
          </div>
          {slider(
            s(
              "Choose how much Aman pays",
              "अमन कितना चुकाए, चुनें",
              "Aman kitna chukaaye, chunein",
            ),
            500,
            10000,
            500,
          )}
          <p>
            {s(
              "Fictional bill, before interest and fees. Paying only the ₹500 minimum leaves ₹9,500 unpaid. Check the issuer’s actual terms and interest calculation.",
              "बनाया हुआ बिल, ब्याज और फ़ीस जोड़ने से पहले। सिर्फ़ ₹500 चुकाने पर ₹9,500 बाकी हैं। असली नियम और ब्याज का हिसाब कार्ड कंपनी से देखें।",
              "Banaya hua bill, byaaj aur fees jodne se pehle. Sirf ₹500 chukaane par ₹9,500 baaki hain. Asli niyam aur byaaj ka hisaab card company se dekhein.",
            )}
          </p>
        </>
      )}
      {lessonId === "debt-plan" && (
        <>
          <div className="debt-comparison">
            <div>
              <span>
                {s(
                  "Debt A · 24% a year",
                  "कर्ज़ A · सालाना 24%",
                  "Karz A · saalaana 24%",
                )}
              </span>
              <strong>{rupees((value * 0.24) / 12)}</strong>
            </div>
            <div>
              <span>
                {s(
                  "Debt B · 12% a year",
                  "कर्ज़ B · सालाना 12%",
                  "Karz B · saalaana 12%",
                )}
              </span>
              <strong>{rupees((value * 0.12) / 12)}</strong>
            </div>
          </div>
          {slider(
            s(
              "Try an extra repayment",
              "एक्स्ट्रा पेमेंट बदलें",
              "Extra payment badlein",
            ),
            0,
            5000,
            500,
          )}
          <p>
            {s(
              "Illustrative reduction in next month’s interest: extra payment × annual rate ÷ 12. Assumes the payment immediately reduces principal, no fees, and unchanged rates. Cover essentials and required payments first; real loan calculations differ.",
              "अगले महीने के ब्याज में बचत का आसान example: एक्स्ट्रा पेमेंट × सालाना रेट ÷ 12। मान लें पैसे तुरंत मूल रकम घटाते हैं, फ़ीस नहीं है और रेट नहीं बदलता। पहले ज़रूरतें और ज़रूरी किस्तें देखें। असली लोन का हिसाब अलग हो सकता है।",
              "Agle mahine ke byaaj mein bachat ka aasaan example: extra payment × saalaana rate ÷ 12. Maan lein paise turant mool rakam ghataate hain, fees nahin hai aur rate nahin badalta. Pehle zarooratein aur zaroori kistein dekhein. Asli loan ka hisaab alag ho sakta hai.",
            )}
          </p>
        </>
      )}
      {lessonId === "money" && (
        <>
          <div className="money-demo">
            <span>
              <Icon name="Wallet" size={26} />
              <small>{s("Raju has", "राजू के पास", "Raju ke paas")}</small>
              <strong>₹200</strong>
            </span>
            <Icon name="ArrowRight" />
            <span>
              <Icon name="Scissors" size={26} />
              <small>{s("A haircut", "बाल कटवाना", "Baal katwaana")}</small>
              <strong>{rupees(value)}</strong>
            </span>
            <Icon name="ArrowRight" />
            <span>
              <Icon name="Coins" size={26} />
              <small>{s("Money left", "बाकी पैसे", "Baaki paise")}</small>
              <strong>{rupees(200 - value)}</strong>
            </span>
          </div>
          {slider(
            s(
              "What if the haircut costs…",
              "अगर बाल कटवाने का खर्च हो…",
              "Agar baal katwaane ka kharch ho…",
            ),
            20,
            200,
            10,
          )}
        </>
      )}
      {lessonId === "income" && (
        <>
          <div className="visual-equation">
            <span>
              {rupees(value)}
              <small>{s("a day", "रोज़", "roz")}</small>
            </span>
            <span>× 30 =</span>
            <strong>
              {rupees(value * 30)}
              <small>{s("in a month", "एक महीने में", "ek mahine mein")}</small>
            </strong>
          </div>
          {slider(
            s(
              "Try a daily expense",
              "रोज़ का खर्च बदलें",
              "Roz ka kharch badlein",
            ),
            0,
            200,
            10,
          )}
          <p>
            {s(
              "A small habit can be a big line in your budget.",
              "छोटी आदत भी बजट में बड़ा खर्च बन सकती है।",
              "Chhoti aadat bhi budget mein bada kharch ban sakti hai.",
            )}
          </p>
        </>
      )}
      {lessonId === "budget" && (
        <>
          <div className="budget-stack">
            <span style={{ width: `${value / 300}%` }} />
            <span
              style={{ width: `${Math.min(9000, 30000 - value) / 300}%` }}
            />
            <span style={{ flex: 1 }} />
          </div>
          <div className="budget-legend">
            <span>
              <i />
              {s("Needs", "ज़रूरतें", "Zarooratein")}
              <strong>{rupees(value)}</strong>
            </span>
            <span>
              <i />
              {s("Wants", "शौक", "Ichchhaayein")}
              <strong>{rupees(Math.min(9000, 30000 - value))}</strong>
            </span>
            <span>
              <i />
              {s("Savings", "बचत", "Bachat")}
              <strong>{rupees(Math.max(0, 30000 - value - 9000))}</strong>
            </span>
          </div>
          {slider(
            s(
              "Move your essential expenses",
              "ज़रूरी खर्च का स्लाइडर चलाएं",
              "Zaroori kharch badlein",
            ),
            5000,
            30000,
            1000,
          )}
          <p>
            {s(
              "₹30,000 income. Wants are capped at ₹9,000, then reduced if essentials need more. No single split fits everyone.",
              "₹30,000 कमाई। शौक पर ₹9,000 तक खर्च। ज़रूरतें बढ़ें तो शौक का खर्च घटाएं। एक बँटवारा सबके लिए सही नहीं।",
              "₹30,000 aay. Ichchhaayein ₹9,000 tak hain. Zarooratein badhein toh ichchhaayein ghatti hain. Ek anupaat sabke liye nahin hai.",
            )}
          </p>
        </>
      )}
      {lessonId === "safety" && (
        <div className="mock-message">
          <span>
            <Icon name="MessageCircle" size={16} />
            {s(
              "Fictional message · learning example",
              "बनाया हुआ मैसेज · सिर्फ़ सीखने के लिए",
              "Kaalpanik message · seekhne ka udaaharan",
            )}
          </span>
          <p>
            {s(
              "Your refund of ₹500 is ready.",
              "आपका ₹500 का रिफ़ंड तैयार है।",
              "Aapka ₹500 ka refund taiyaar hai.",
            )}
          </p>
          <button
            className={revealed ? "flag-revealed" : ""}
            onClick={() => setRevealed(!revealed)}
          >
            <Icon name="Flag" size={16} />
            {s(
              "Scan QR & enter your UPI PIN",
              "QR स्कैन करें और UPI PIN डालें",
              "QR scan karein aur UPI PIN daalein",
            )}
            <Icon name="MousePointer2" size={15} />
          </button>
          <small role="status">
            {revealed
              ? s(
                  "Spotted it! A PIN authorises an action. It is not needed for receiving a normal transfer.",
                  "पकड़ लिया! PIN से आप पेमेंट जैसे काम approve करते हैं। आम तौर पर पैसे पाने के लिए PIN नहीं चाहिए।",
                  "Pakad liya! PIN kaarrawaai ki anumati hai. Saamaanya paise paane ke liye iski zaroorat nahin.",
                )
              : s(
                  "Tap the suspicious instruction.",
                  "जिस लाइन पर शक हो, उस पर टैप करें।",
                  "Shak waale nirdesh par tap karein.",
                )}
          </small>
        </div>
      )}
      {lessonId === "compound" && (
        <>
          <div className="compound-bars">
            {[0, Math.max(1, Math.floor(value / 2)), value].map((year, i) => (
              <div key={i}>
                <strong>{rupees(compound(10000, 10, year))}</strong>
                <span
                  style={{
                    height: `${25 + (compound(10000, 10, year) / compound(10000, 10, 20)) * 90}px`,
                  }}
                />
                <small>
                  {s("Year", "साल", "Saal")} {year}
                </small>
              </div>
            ))}
          </div>
          {slider(
            s(
              "Give the snowball some time",
              "कंपाउंडिंग को समय दें",
              "Compounding ko samay dein",
            ),
            2,
            20,
            1,
          )}
          <p>
            {s(
              "₹10,000 initial amount · assumed 10% yearly · no extra deposits, fees, or tax. An illustration, not a return promise.",
              "₹10,000 से शुरुआत · मानकर लिया सालाना रेट 10% · एक्स्ट्रा पैसे, फ़ीस और टैक्स नहीं जोड़े हैं। सिर्फ़ example है।",
              "₹10,000 shuruaat · maani hui saalaana 10% dar · bina atirikt jama, fees ya tax. Sirf udaaharan.",
            )}
          </p>
        </>
      )}
      {lessonId === "emergency" && (
        <>
          <div className="cushion-months">
            {Array.from({ length: 12 }, (_, i) => (
              <span key={i} className={i < value ? "filled" : ""}>
                <Icon name="ShieldCheck" size={18} />
              </span>
            ))}
          </div>
          <div className="visual-equation">
            <span>
              ₹20,000
              <small>
                {s(
                  "monthly essentials",
                  "हर महीने के ज़रूरी खर्च",
                  "Maasik zarooratein",
                )}
              </small>
            </span>
            <span>× {value} =</span>
            <strong>{rupees(20000 * value)}</strong>
          </div>
          {slider(
            s(
              "Choose months of breathing room",
              "सहारे के महीने चुनें",
              "Sahaare ke mahine chunein",
            ),
            1,
            12,
            1,
          )}
          <p>
            {s(
              "This target changes with your situation. Start with what you can set aside.",
              "कितना बफ़र चाहिए, यह आपकी लाइफ़ पर है। जितना बचा सकें, वहीं से शुरू करें।",
              "Lakshya aapki sthiti par nirbhar hai. Jitna bacha sakein, vaheen se shuru karein.",
            )}
          </p>
        </>
      )}
    </div>
  );
}
