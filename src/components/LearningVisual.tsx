import { useState } from "react";
import type { Language } from "../content/lessons";
import { compound, rupees } from "../lib/learning";
import { Icon } from "./UI";
export default function LearningVisual({
  lessonId,
  language,
}: {
  lessonId: string;
  language: Language;
}) {
  const [value, setValue] = useState(
    lessonId === "money"
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
