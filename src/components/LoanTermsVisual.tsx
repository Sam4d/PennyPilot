import { useState } from "react";
import { read, t, type Language } from "../content/schema";
import { rupees } from "../lib/learning";
import { repaymentSchedule } from "../lib/loans";
import { loanRateReset } from "../lib/loan-reset";
const offers = [
  {
    title: t("Offer A", "ऑफ़र A", "Offer A"),
    statement: t(
      "Fictional contract: a named asset is pledged as collateral. Repayments are still required.",
      "बनाया कॉन्ट्रैक्ट: खास सामान कोलैटरल के तौर पर गिरवी है। किस्तें फिर भी चुकानी हैं।",
      "Banaaya contract: khaas saamaan collateral ke taur par girvi hai. Kistein phir bhi chukaani hain.",
    ),
    answer: 0,
  },
  {
    title: t("Offer B", "ऑफ़र B", "Offer B"),
    statement: t(
      "Fictional contract: no particular asset is pledged in this arrangement. Repayments are still required.",
      "बनाया कॉन्ट्रैक्ट: इस व्यवस्था में खास सामान गिरवी नहीं है। किस्तें फिर भी चुकानी हैं।",
      "Banaaya contract: is vyavastha mein khaas saamaan girvi nahin hai. Kistein phir bhi chukaani hain.",
    ),
    answer: 1,
  },
  {
    title: t("Offer C", "ऑफ़र C", "Offer C"),
    statement: t(
      "Fictional advertisement: “For education.” No information about security, fees or rate-change terms is supplied.",
      "बनाया विज्ञापन: “पढ़ाई के लिए।” गिरवी, फीस या रेट बदलने की शर्त नहीं बताई गई है।",
      "Banaaya vigyaapan: “Padhaai ke liye.” Girvi, fees ya rate badalne ki shart nahin bataayi gayi hai.",
    ),
    answer: 2,
  },
];
export default function LoanTermsVisual({ language }: { language: Language }) {
  const [view, setView] = useState(0),
    [offer, setOffer] = useState(0),
    [classification, setClassification] = useState<number | null>(null);
  const [fee, setFee] = useState(3000),
    [months, setMonths] = useState(12),
    [revisedRate, setRevisedRate] = useState(24);
  const s = (a: string, b: string, c: string) => read(t(a, b, c), language);
  const fixed = repaymentSchedule(120000, 12, months, fee);
  const stress = loanRateReset(120000, 12, revisedRate, 12, 6, 3000);
  return (
    <section
      className="loan-terms-board"
      aria-label={s(
        "Loan structure and cost practice board",
        "लोन की शर्त और खर्च का प्रैक्टिस बोर्ड",
        "Loan ki shart aur kharch ka practice board",
      )}
    >
      <p className="eyebrow">
        {s(
          "Mia’s fictional offers · 27 October 2026",
          "मिया के बनाए ऑफ़र · 27 अक्टूबर 2026",
          "Mia ke banaaye offer · 27 October 2026",
        )}
      </p>
      <h3>
        {s(
          "Read the obligation behind the payment",
          "किस्त के पीछे की ज़िम्मेदारी समझें",
          "Kisht ke peechhe ki zimmedaari samjhein",
        )}
      </h3>
      <p>
        {s(
          "Compare security, cash flow and a rate reset. No real loan application, product recommendation or score prediction is made.",
          "गिरवी, कैश-फ़्लो और रेट बदलने का असर मिलाएं। असली लोन आवेदन, प्रोडक्ट का सुझाव या स्कोर का अंदाज़ा नहीं है।",
          "Girvi, cash-flow aur rate badalne ka asar milaayein. Asli loan aavedan, product ka sujhaav ya score ka andaaza nahin hai.",
        )}
      </p>
      <div
        className="loan-terms-tabs"
        role="group"
        aria-label={s("Practice panels", "प्रैक्टिस पैनल", "Practice panel")}
      >
        {[
          t(
            "Read the structure",
            "लोन का ढांचा समझें",
            "Loan ka dhaancha samjhein",
          ),
          t(
            "Compare cash and cost",
            "मिले पैसे और खर्च मिलाएं",
            "Mile paise aur kharch milaayein",
          ),
          t(
            "Stress a rate change",
            "रेट बदलकर चेक करें",
            "Rate badalkar check karein",
          ),
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
        <div className="loan-terms-structure">
          <h4>
            {s(
              "Classify only what the wording supports",
              "जितना लिखा है, उसी से प्रकार चुनें",
              "Jitna likha hai, usi se prakaar chunein",
            )}
          </h4>
          <div
            className="loan-terms-actions"
            role="group"
            aria-label={s("Fictional offers", "बनाए ऑफ़र", "Banaaye offer")}
          >
            {offers.map((item, i) => (
              <button
                type="button"
                key={i}
                aria-pressed={offer === i}
                onClick={() => {
                  setOffer(i);
                  setClassification(null);
                }}
              >
                {read(item.title, language)}
              </button>
            ))}
          </div>
          <p className="loan-terms-detail">
            {read(offers[offer].statement, language)}
          </p>
          <div
            className="loan-terms-options"
            role="group"
            aria-label={s(
              "Security classification",
              "गिरवी का प्रकार",
              "Girvi ka prakaar",
            )}
          >
            {[
              t("Secured", "सिक्योर्ड", "Secured"),
              t("Unsecured", "अनसिक्योर्ड", "Unsecured"),
              t(
                "Not enough detail",
                "जानकारी पूरी नहीं",
                "Jaankaari poori nahin",
              ),
            ].map((label, i) => (
              <button
                type="button"
                key={i}
                aria-pressed={classification === i}
                onClick={() => setClassification(i)}
              >
                {read(label, language)}
              </button>
            ))}
          </div>
          <div className="loan-terms-feedback" role="status">
            {classification !== null && (
              <p>
                {classification === offers[offer].answer
                  ? s(
                      "Supported by this wording. An asset pledge indicates security; an explicit absence indicates no named collateral; a purpose alone leaves the question open. Every case still needs cost, repayment and risk checks.",
                      "इस लिखी बात से यह समझ आता है। गिरवी लिखा हो तो सिक्योरिटी है। साफ़ लिखा हो कि खास सामान गिरवी नहीं, तो वह अलग प्रकार है। सिर्फ़ मकसद से पता नहीं चलता। हर केस में खर्च, लौटाने की शर्त और जोखिम जांचना बाकी है।",
                      "Is likhi baat se yeh samajh aata hai. Girvi likha ho toh security hai. Saaf likha ho ki khaas saamaan girvi nahin, toh woh alag prakaar hai. Sirf maksad se pata nahin chalta. Har case mein kharch, lautaane ki shart aur jokhim jaanchna baaki hai.",
                    )
                  : s(
                      "Try again. Look for an explicit asset pledge or its absence. A purpose label cannot answer the security question.",
                      "फिर सोचें। साफ़ लिखा गिरवी या उसका न होना देखें। सिर्फ़ मकसद का नाम गिरवी की बात नहीं बताता।",
                      "Phir sochein. Saaf likha girvi ya uska na hona dekhein. Sirf maksad ka naam girvi ki baat nahin bataata.",
                    )}
              </p>
            )}
          </div>
          <p>
            {s(
              "Collateral is an asset at risk if repayment fails under the applicable contract and rules. Unsecured does not remove the debt. A guarantee can also create obligations; get unclear terms explained independently. Current legal recovery procedures are not provided here.",
              "कॉन्ट्रैक्ट और नियमों के हिसाब से न चुकाने पर गिरवी सामान खतरे में पड़ सकता है। अनसिक्योर्ड में कर्ज़ खत्म नहीं होता। गारंटी भी ज़िम्मेदारी बना सकती है। साफ़ न हो तो अलग से समझें। यहाँ मौजूदा कानूनी वसूली प्रक्रिया नहीं दी है।",
              "Contract aur niyamon ke hisaab se na chukaane par girvi saamaan khatre mein pad sakta hai. Unsecured mein karz khatam nahin hota. Guarantee bhi zimmedaari bana sakti hai. Saaf na ho toh alag se samjhein. Yahaan maujooda kaanooni vasooli prakriya nahin di hai.",
            )}
          </p>
        </div>
      )}
      {view === 1 && (
        <div className="loan-terms-cost">
          <h4>
            {s(
              "Same ₹1,20,000 advance · fixed 12% yearly",
              "वही ₹1,20,000 उधार · तय सालाना 12%",
              "Wahi ₹1,20,000 udhaar · tay saalaana 12%",
            )}
          </h4>
          <p>
            {s(
              "Monthly reducing-balance example. The fee is withheld at the start, not financed or paid a second time. Only interest and this fee are included.",
              "हर महीने घटते बैलेंस का example। फीस शुरू में कटती है। उसे उधार में नहीं जोड़ा या दोबारा नहीं दिया जाता। सिर्फ़ ब्याज और यही फीस शामिल हैं।",
              "Har mahine ghatte balance ka example. Fees shuru mein katti hai. Use udhaar mein nahin joda ya dobaara nahin diya jaata. Sirf byaaj aur yahi fees shaamil hain.",
            )}
          </p>
          <label className="visual-slider">
            <span>
              {s("Withheld fee", "पहले कटी फीस", "Pehle kati fees")}{" "}
              <strong>{rupees(fee)}</strong>
            </span>
            <input
              type="range"
              min="0"
              max="5000"
              step="500"
              value={fee}
              onChange={(e) => setFee(Number(e.target.value))}
              aria-label={s("Withheld fee", "पहले कटी फीस", "Pehle kati fees")}
            />
          </label>
          <p className="loan-terms-local" aria-live="polite">
            {s("Cash received", "हाथ में मिले पैसे", "Haath mein mile paise")}:{" "}
            <strong data-testid="loan-terms-net">
              {rupees(fixed.netReceived)}
            </strong>
          </p>
          <label className="visual-slider">
            <span>
              {s(
                "Repayment period in months",
                "लौटाने का समय (महीने)",
                "Lautaane ka samay (mahine)",
              )}{" "}
              <strong>{months}</strong>
            </span>
            <input
              type="range"
              min="12"
              max="36"
              step="12"
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              aria-label={s(
                "Repayment period in months",
                "लौटाने का समय (महीने)",
                "Lautaane ka samay (mahine)",
              )}
            />
          </label>
          <dl className="loan-terms-summary" aria-live="polite">
            <div>
              <dt>
                {s("Monthly payment", "महीने की किस्त", "Mahine ki kisht")}
              </dt>
              <dd data-testid="loan-terms-monthly">
                {rupees(fixed.monthlyPayment)}
              </dd>
            </div>
            <div>
              <dt>
                {s(
                  "Total repayments",
                  "कुल लौटाने वाले पैसे",
                  "Kul lautaane waale paise",
                )}
              </dt>
              <dd data-testid="loan-terms-total">
                {rupees(fixed.totalPayments)}
              </dd>
            </div>
            <div>
              <dt>{s("Total interest", "कुल ब्याज", "Kul byaaj")}</dt>
              <dd data-testid="loan-terms-interest">
                {rupees(fixed.totalInterest)}
              </dd>
            </div>
            <div>
              <dt>
                {s(
                  "Borrowing cost: interest + fee",
                  "उधार का खर्च: ब्याज + फीस",
                  "Udhaar ka kharch: byaaj + fees",
                )}
              </dt>
              <dd data-testid="loan-terms-cost">{rupees(fixed.totalCost)}</dd>
            </div>
          </dl>
          <p className="loan-terms-local" aria-live="polite">
            {rupees(fixed.totalPayments)} − {rupees(fixed.netReceived)} ={" "}
            {rupees(fixed.totalCost)}
          </p>
          <p>
            {s(
              "Compare required repayments with cash received. A smaller payment over more months can mean more total interest. This rupee difference is not an APR calculation, an affordability decision or a complete quote.",
              "ज़रूरी लौटाने वाले पैसे हाथ में मिले पैसों से मिलाएं। ज़्यादा महीनों की छोटी किस्त में कुल ब्याज बढ़ सकता है। रुपयों का यह फर्क APR का हिसाब, बजट का फैसला या पूरा असली ऑफ़र नहीं है।",
              "Zaroori lautaane waale paise haath mein mile paison se milaayein. Zyaada mahinon ki chhoti kisht mein kul byaaj badh sakta hai. Rupayon ka yeh fark APR ka hisaab, budget ka faisla ya poora asli offer nahin hai.",
            )}
          </p>
          <button
            type="button"
            onClick={() => {
              setFee(3000);
              setMonths(12);
            }}
          >
            {s(
              "Reset cost example",
              "खर्च का example रीसेट करें",
              "Kharch ka example reset karein",
            )}
          </button>
        </div>
      )}
      {view === 2 && (
        <div className="loan-terms-stress">
          <h4>
            {s(
              "A separate 12-month rate-change scenario",
              "अलग 12 महीने का रेट बदलने वाला example",
              "Alag 12 mahine ka rate badalne waala example",
            )}
          </h4>
          <p>
            {s(
              "₹1,20,000 advance, ₹3,000 withheld fee, six payments at 12% yearly. Change the rate for months 7–12. This model keeps the final month fixed and recalculates payments; it does not extend the term. Cost-panel settings do not change this scenario.",
              "₹1,20,000 उधार, पहले कटी ₹3,000 फीस, छह किस्त सालाना 12% पर। महीने 7–12 का रेट बदलें। मॉडल आखिरी महीना तय रखकर किस्त फिर निकालता है, समय नहीं बढ़ाता। खर्च वाले पैनल की सेटिंग से यह example नहीं बदलता।",
              "₹1,20,000 udhaar, pehle kati ₹3,000 fees, chhah kisht saalaana 12% par. Mahine 7–12 ka rate badlein. Model aakhiri mahina tay rakhkar kisht phir nikaalta hai, samay nahin badhaata. Kharch waale panel ki setting se yeh example nahin badalta.",
            )}
          </p>
          <label className="visual-slider">
            <span>
              {s(
                "Rate after six payments",
                "छह किस्त बाद का रेट",
                "Chhah kisht baad ka rate",
              )}{" "}
              <strong>{revisedRate}%</strong>
            </span>
            <input
              type="range"
              min="0"
              max="36"
              step="1"
              value={revisedRate}
              onChange={(e) => setRevisedRate(Number(e.target.value))}
              aria-label={s(
                "Rate after six payments",
                "छह किस्त बाद का रेट",
                "Chhah kisht baad ka rate",
              )}
            />
          </label>
          <p className="loan-terms-local" aria-live="polite">
            {s(
              "New monthly payment",
              "नई महीने की किस्त",
              "Nayi mahine ki kisht",
            )}
            :{" "}
            <strong data-testid="loan-terms-new-payment">
              {rupees(stress.afterPayment)}
            </strong>
          </p>
          <dl className="loan-terms-summary" aria-live="polite">
            <div>
              <dt>
                {s(
                  "Previous monthly payment",
                  "पहले की महीने की किस्त",
                  "Pehle ki mahine ki kisht",
                )}
              </dt>
              <dd data-testid="loan-terms-old-payment">
                {rupees(stress.beforePayment)}
              </dd>
            </div>
            <div>
              <dt>
                {s(
                  "Balance after six payments",
                  "छह किस्त बाद बकाया",
                  "Chhah kisht baad bakaaya",
                )}
              </dt>
              <dd data-testid="loan-terms-reset-balance">
                {rupees(stress.resetBalance)}
              </dd>
            </div>
            <div>
              <dt>
                {s(
                  "Change in monthly payment",
                  "महीने की किस्त में बदलाव",
                  "Mahine ki kisht mein badlaav",
                )}
              </dt>
              <dd data-testid="loan-terms-change">
                {rupees(stress.paymentChange)}
              </dd>
            </div>
            <div>
              <dt>
                {s(
                  "Full borrowing cost, including fee",
                  "फीस समेत उधार का पूरा खर्च",
                  "Fees samet udhaar ka poora kharch",
                )}
              </dt>
              <dd data-testid="loan-terms-stress-cost">
                {rupees(stress.totalCost)}
              </dd>
            </div>
          </dl>
          <p>
            {s(
              "Calculations use unrounded monthly balances; display amounts are rounded to whole rupees. No tax, extra charges, missed payment or second reset is modelled. A real agreement can use different rounding and reset rules. Check the written rule and stress your budget separately.",
              "हिसाब में हर महीने का बैलेंस राउंड नहीं होता। दिखाते समय पूरे रुपये हैं। टैक्स, और चार्ज, छूटी किस्त या दूसरी बार रेट बदलना शामिल नहीं। असली कॉन्ट्रैक्ट में राउंड और बदलाव के नियम अलग हो सकते हैं। लिखे नियम चेक करें और बजट अलग से stress करें।",
              "Hisaab mein har mahine ka balance round nahin hota. Dikhaate samay poore rupaye hain. Tax, aur charge, chhooti kisht ya doosri baar rate badalna shaamil nahin. Asli contract mein round aur badlaav ke niyam alag ho sakte hain. Likhe niyam check karein aur budget alag se stress karein.",
            )}
          </p>
          <div className="loan-terms-actions">
            <button type="button" onClick={() => setRevisedRate(12)}>
              {s("Keep rate unchanged", "रेट वही रखें", "Rate wahi rakhein")}
            </button>
            <button type="button" onClick={() => setRevisedRate(24)}>
              {s(
                "Reset to 24% scenario",
                "24% वाला example रीसेट करें",
                "24% waala example reset karein",
              )}
            </button>
          </div>
        </div>
      )}
      <p className="visual-note">
        {s(
          "Practice changes no loan or lesson score. All terms are fictional. Current lender rules and recovery law remain unverified; no approval, protection or score change is promised.",
          "प्रैक्टिस से लोन या पाठ का स्कोर नहीं बदलता। सभी शर्तें बनाई हुई हैं। मौजूदा लेंडर नियम और वसूली कानून की जांच बाकी है। मंज़ूरी, सुरक्षा या स्कोर बदलाव का वादा नहीं।",
          "Practice se loan ya paath ka score nahin badalta. Sabhi shartein banaayi hui hain. Maujooda lender niyam aur vasooli kaanoon ki jaanch baaki hai. Manzoori, suraksha ya score badlaav ka vaada nahin.",
        )}
      </p>
    </section>
  );
}
