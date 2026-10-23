import { useState } from "react";
import { read, t, type Language } from "../content/schema";
import { creditUtilisation } from "../lib/credit";
import { rupees } from "../lib/learning";

const rows = [
  {
    title: t(
      "Identity and ownership",
      "पहचान और खाता किसका है",
      "Pehchaan aur khaata kiska hai",
    ),
    value: t(
      "Mia Example · Card A · individual account",
      "मिया Example · कार्ड A · अकेले का खाता",
      "Mia Example · card A · akele ka khaata",
    ),
    detail: t(
      "Fictional identity only. Check whether the account is yours. A familiar name alone does not resolve an unfamiliar account; investigate through a verified official contact.",
      "यह बनाई पहचान है। खाता आपका है या नहीं, चेक करें। जाना-पहचाना नाम अनजान खाते की जांच पूरी नहीं करता। चेक किए ऑफ़िशियल संपर्क से जांच करें।",
      "Yeh banaayi pehchaan hai. Khaata aapka hai ya nahin, check karein. Jaana-pehchaana naam anjaan khaate ki jaanch poori nahin karta. Check kiye official sampark se jaanch karein.",
    ),
  },
  {
    title: t(
      "Balance and update date",
      "बकाया और अपडेट की तारीख़",
      "Bakaaya aur update ki taareekh",
    ),
    value: t(
      "Card A · ₹3,000 balance · ₹10,000 limit · updated 31 August 2026",
      "कार्ड A · ₹3,000 बकाया · ₹10,000 लिमिट · अपडेट 31 अगस्त 2026",
      "Card A · ₹3,000 bakaaya · ₹10,000 limit · update 31 August 2026",
    ),
    detail: t(
      "Compare records for the same date. A later app balance can differ from an older report entry. The ratio sandbox uses these starting amounts, but changing it does not edit this fictional report.",
      "एक ही तारीख़ के रिकॉर्ड मिलाएं। ऐप का बाद का बैलेंस पुरानी रिपोर्ट से अलग हो सकता है। प्रतिशत बोर्ड की शुरुआती रकम यही है। वहाँ बदलाव से यह रिपोर्ट नहीं बदलती।",
      "Ek hi taareekh ke record milaayein. App ka baad ka balance puraani report se alag ho sakta hai. Pratishat board ki shuruaati rakam yahi hai. Wahaan badlaav se yeh report nahin badalti.",
    ),
  },
  {
    title: t(
      "Payment-record mismatch",
      "पेमेंट रिकॉर्ड में फर्क",
      "Payment record mein fark",
    ),
    value: t(
      "Card A · August: report says unpaid; matching receipt says paid",
      "कार्ड A · अगस्त: रिपोर्ट में बकाया; मिलती रसीद में पेमेंट हुआ",
      "Card A · August: report mein bakaaya; milti raseed mein payment hua",
    ),
    detail: t(
      "Identify this specific field and period, keep the matching receipt and raise the mismatch through independently verified lender/bureau channels. Keep the reference and review the response. Correction and its timing are not guaranteed here.",
      "इसी फ़ील्ड और समय को पहचानें। मिलती रसीद रखें और अलग से चेक किए लेंडर या ब्यूरो के रास्ते से फर्क उठाएं। रेफ़रेंस रखें, जवाब देखें। यहाँ सुधार या उसका समय पक्का नहीं बताया गया है।",
      "Isi field aur samay ko pehchaanein. Milti raseed rakhein aur alag se check kiye lender ya bureau ke raaste se fark uthaayein. Reference rakhein, jawaab dekhein. Yahaan sudhaar ya uska samay pakka nahin bataaya gaya hai.",
    ),
  },
  {
    title: t(
      "Application enquiry",
      "आवेदन की इन्क्वायरी",
      "Aavedan ki enquiry",
    ),
    value: t(
      "Fictional loan application check · 12 August 2026",
      "बनाए लोन आवेदन की जांच · 12 अगस्त 2026",
      "Banaaye loan aavedan ki jaanch · 12 August 2026",
    ),
    detail: t(
      "An application-related check is not the amount of a new loan. If you do not recognise it, investigate the entry and possible identity misuse through trusted contacts. Do not guess a point change from this line.",
      "आवेदन की जांच नए लोन की रकम नहीं है। पहचान में न आए तो एंट्री और पहचान के गलत इस्तेमाल की संभावना भरोसे वाले संपर्क से जांचें। इस लाइन से स्कोर के पॉइंट का अंदाज़ा न लगाएं।",
      "Aavedan ki jaanch naye loan ki rakam nahin hai. Pehchaan mein na aaye toh entry aur pehchaan ke galat istemaal ki sambhaavna bharose waale sampark se jaanchein. Is line se score ke point ka andaaza na lagaayein.",
    ),
  },
];
const behaviours = [
  {
    title: t(
      "Organise affordable payments",
      "संभालने लायक पेमेंट का प्लान",
      "Sambhaalne laayak payment ka plan",
    ),
    detail: t(
      "Check due dates, statements and money available. Reminders or automatic payments need enough funds and follow-up checks. This supports a repayment plan; no number of score points is promised.",
      "देय तारीख़, स्टेटमेंट और उपलब्ध पैसे चेक करें। रिमाइंडर या ऑटो-पेमेंट के साथ पैसे और बाद में जांच भी चाहिए। इससे लौटाने का प्लान बनता है, तय स्कोर पॉइंट का वादा नहीं।",
      "Due taareekh, statement aur uplabdh paise check karein. Reminder ya auto-payment ke saath paise aur baad mein jaanch bhi chaahiye. Isse lautaane ka plan banta hai, tay score point ka vaada nahin.",
    ),
  },
  {
    title: t(
      "Borrow only to chase a score",
      "सिर्फ़ स्कोर के लिए कर्ज़ लें",
      "Sirf score ke liye karz lein",
    ),
    detail: t(
      "This adds a repayment obligation and may add fees and interest. Borrowed cash is not earnings. A promised score increase is not a reason to take an unnecessary loan; review need, full cost and affordability separately.",
      "इससे लौटाने की ज़िम्मेदारी जुड़ती है। फीस और ब्याज भी हो सकते हैं। उधार कमाई नहीं। स्कोर बढ़ने का वादा बेवजह लोन लेने की वजह नहीं। ज़रूरत, पूरा खर्च और लौटाने की जगह अलग जांचें।",
      "Isse lautaane ki zimmedaari judti hai. Fees aur byaaj bhi ho sakte hain. Udhaar kamaai nahin. Score badhne ka vaada bevajah loan lene ki wajah nahin. Zaroorat, poora kharch aur lautaane ki jagah alag jaanchein.",
    ),
  },
  {
    title: t(
      "Raise a possible record error",
      "रिकॉर्ड की संभावित गलती उठाएं",
      "Record ki sambhaavit galti uthaayein",
    ),
    detail: t(
      "Compare dates and evidence, use a verified official route and keep the reference. A dispute is a request to investigate information, not permission to cancel real payments or a promise that a negative entry disappears.",
      "तारीख़ और सबूत मिलाएं। चेक किया ऑफ़िशियल रास्ता लें और रेफ़रेंस रखें। शिकायत जानकारी जांचने की मांग है। असली पेमेंट रद्द करने की मंज़ूरी या खराब एंट्री मिटने का वादा नहीं।",
      "Taareekh aur saboot milaayein. Check kiya official raasta lein aur reference rakhein. Shikaayat jaankaari jaanchne ki maang hai. Asli payment radd karne ki manzoori ya kharaab entry mitne ka vaada nahin.",
    ),
  },
];
export default function CreditScoreVisual({
  language,
}: {
  language: Language;
}) {
  const [view, setView] = useState(0);
  const [row, setRow] = useState(0);
  const [behaviour, setBehaviour] = useState(0);
  const [balance, setBalance] = useState(3000);
  const [limit, setLimit] = useState(10000);
  const ratio = creditUtilisation(balance, limit);
  const s = (a: string, b: string, c: string) => read(t(a, b, c), language);
  return (
    <section
      className="credit-board"
      aria-label={s(
        "Credit report practice board",
        "क्रेडिट रिपोर्ट प्रैक्टिस बोर्ड",
        "Credit report practice board",
      )}
    >
      <p className="eyebrow">
        {s(
          "Mia’s fictional report · practice only",
          "मिया की बनाई रिपोर्ट · सिर्फ़ प्रैक्टिस",
          "Mia ki banaayi report · sirf practice",
        )}
      </p>
      <h3>
        {s(
          "Check the record, then the decision",
          "रिकॉर्ड चेक करें, फिर फैसला",
          "Record check karein, phir faisla",
        )}
      </h3>
      <p>
        {s(
          "Illustrative snapshot: 23 October 2026. No real report, score calculation or personal details. Switch panels to inspect, calculate and compare.",
          "बनाया snapshot: 23 अक्टूबर 2026। असली रिपोर्ट, स्कोर का हिसाब या निजी जानकारी नहीं। जांच, हिसाब और तुलना के लिए पैनल बदलें।",
          "Banaaya snapshot: 23 October 2026. Asli report, score ka hisaab ya niji jaankaari nahin. Jaanch, hisaab aur tulna ke liye panel badlein.",
        )}
      </p>
      <div
        className="credit-tabs"
        role="group"
        aria-label={s("Practice panels", "प्रैक्टिस पैनल", "Practice panel")}
      >
        {[
          t("Inspect report", "रिपोर्ट जांचें", "Report jaanchein"),
          t("Balance and limit", "बकाया और लिमिट", "Bakaaya aur limit"),
          t("Compare actions", "कदम तुलना करें", "Kadam tulna karein"),
        ].map((label, i) => (
          <button
            type="button"
            key={i}
            aria-pressed={view === i}
            onClick={() => setView(i)}
          >
            {read(label, language)}
          </button>
        ))}
      </div>
      {view === 0 && (
        <div className="credit-inspector">
          <h4>
            {s(
              "Select a report entry",
              "रिपोर्ट की एंट्री चुनें",
              "Report ki entry chunein",
            )}
          </h4>
          <div
            className="credit-rows"
            role="group"
            aria-label={s(
              "Fictional report entries",
              "बनाई रिपोर्ट की एंट्री",
              "Banaayi report ki entry",
            )}
          >
            {rows.map((item, i) => (
              <button
                type="button"
                key={i}
                aria-pressed={row === i}
                onClick={() => setRow(i)}
              >
                {read(item.title, language)}
              </button>
            ))}
          </div>
          <div className="credit-detail" aria-live="polite">
            <h4>{read(rows[row].title, language)}</h4>
            <p className="credit-entry">{read(rows[row].value, language)}</p>
            <p>{read(rows[row].detail, language)}</p>
          </div>
        </div>
      )}
      {view === 1 && (
        <div className="credit-ratio">
          <h4>
            {s(
              "One card, one illustrative balance",
              "एक कार्ड, बनाया हुआ बकाया",
              "Ek card, banaaya hua bakaaya",
            )}
          </h4>
          <dl className="credit-summary" aria-live="polite">
            <div>
              <dt>{s("Amount still owed", "अभी बकाया", "Abhi bakaaya")}</dt>
              <dd data-testid="credit-balance">{rupees(balance)}</dd>
            </div>
            <div>
              <dt>
                {s(
                  "Share of limit used",
                  "लिमिट का इस्तेमाल हुआ हिस्सा",
                  "Limit ka istemaal hua hissa",
                )}
              </dt>
              <dd data-testid="credit-ratio">
                {ratio === null
                  ? s("Unknown", "पता नहीं", "Pata nahin")
                  : `${new Intl.NumberFormat(language === "hi" ? "hi-IN" : "en-IN", { maximumFractionDigits: 1 }).format(ratio)}%`}
              </dd>
            </div>
          </dl>
          <label className="visual-slider">
            <span>
              {s(
                "Reported card balance",
                "बताया कार्ड बकाया",
                "Bataaya card bakaaya",
              )}{" "}
              <strong>{rupees(balance)}</strong>
            </span>
            <input
              type="range"
              min="0"
              max="20000"
              step="1000"
              value={balance}
              onChange={(e) => setBalance(Number(e.target.value))}
              aria-label={s(
                "Reported card balance",
                "बताया कार्ड बकाया",
                "Bataaya card bakaaya",
              )}
            />
          </label>
          <label className="visual-slider">
            <span>
              {s(
                "Illustrative card limit",
                "बनाई कार्ड लिमिट",
                "Banaayi card limit",
              )}{" "}
              <strong>
                {limit === 0
                  ? s("Unknown", "पता नहीं", "Pata nahin")
                  : rupees(limit)}
              </strong>
            </span>
            <input
              type="range"
              min="0"
              max="50000"
              step="1000"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              aria-label={s(
                "Illustrative card limit",
                "बनाई कार्ड लिमिट",
                "Banaayi card limit",
              )}
            />
          </label>
          <div className="credit-actions">
            <button type="button" onClick={() => setLimit(20000)}>
              {s(
                "Same balance, ₹20,000 limit",
                "वही बकाया, ₹20,000 लिमिट",
                "Wahi bakaaya, ₹20,000 limit",
              )}
            </button>
            <button type="button" onClick={() => setLimit(0)}>
              {s("Limit unknown", "लिमिट पता नहीं", "Limit pata nahin")}
            </button>
            <button
              type="button"
              onClick={() => {
                setBalance(3000);
                setLimit(10000);
              }}
            >
              {s("Reset example", "example रीसेट करें", "Example reset karein")}
            </button>
          </div>
          <p className="credit-formula" aria-live="polite">
            {ratio === null
              ? s(
                  "Without a known limit, this ratio cannot be calculated. Unknown is not 0%.",
                  "लिमिट के बिना यह प्रतिशत नहीं निकलता। पता नहीं का मतलब 0% नहीं।",
                  "Limit ke bina yeh pratishat nahin nikalta. Pata nahin ka matlab 0% nahin.",
                )
              : `${rupees(balance)} ÷ ${rupees(limit)} × 100 = ${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 1 }).format(ratio)}%`}
          </p>
          <p>
            {s(
              "This is one card’s ratio, not a complete bureau model. There is no score or approval threshold here. A bigger limit changes the number you divide by (denominator). The money owed stays the same. Ratios above 100% remain visible; they are not silently capped.",
              "यह एक कार्ड का हिसाब है, ब्यूरो का पूरा मॉडल नहीं। यहाँ स्कोर या मंज़ूरी की सीमा नहीं है। बड़ी लिमिट नीचे की रकम बदलती है, बकाया नहीं। 100% से ऊपर का हिसाब भी दिखता है, चुपचाप काटा नहीं जाता।",
              "Yeh ek card ka hisaab hai, bureau ka poora model nahin. Yahaan score ya manzoori ki seema nahin hai. Badi limit neeche ki rakam badalti hai, bakaaya nahin. 100% se oopar ka hisaab bhi dikhta hai, chupchaap kaata nahin jaata.",
            )}
          </p>
        </div>
      )}
      {view === 2 && (
        <div className="credit-behaviours">
          <h4>
            {s(
              "Compare choices without guessing points",
              "पॉइंट का अंदाज़ा लगाए बिना तुलना करें",
              "Point ka andaaza lagaaye bina tulna karein",
            )}
          </h4>
          <div
            className="credit-actions"
            role="group"
            aria-label={s(
              "Borrowing behaviours",
              "कर्ज़ से जुड़े कदम",
              "Karz se jude kadam",
            )}
          >
            {behaviours.map((item, i) => (
              <button
                type="button"
                key={i}
                aria-pressed={behaviour === i}
                onClick={() => setBehaviour(i)}
              >
                {read(item.title, language)}
              </button>
            ))}
          </div>
          <div className="credit-detail" aria-live="polite">
            <h4>{read(behaviours[behaviour].title, language)}</h4>
            <p>{read(behaviours[behaviour].detail, language)}</p>
          </div>
        </div>
      )}
      <p className="visual-note">
        {s(
          "Practice does not change lesson scores or the report snapshot. A lender’s decision and your ability to repay need separate checks. Current report-access and dispute rules remain unverified.",
          "प्रैक्टिस से पाठ के स्कोर या बनाई रिपोर्ट नहीं बदलते। लेंडर का फैसला और आपकी लौटाने की क्षमता अलग जांचें। रिपोर्ट पाने और शिकायत के मौजूदा नियम की जांच बाकी है।",
          "Practice se paath ke score ya banaayi report nahin badalte. Lender ka faisla aur aapki lautaane ki kshamta alag jaanchein. Report paane aur shikaayat ke maujooda niyam ki jaanch baaki hai.",
        )}
      </p>
    </section>
  );
}
