import { useState } from "react";
import { read, t, type Language } from "../content/schema";
import { rupees } from "../lib/learning";
import { bankingFunds } from "../lib/banking";
const requests = [
  {
    title: t(
      "Identity purpose",
      "पहचान की जांच का मकसद",
      "Pehchaan ki jaanch ka maksad",
    ),
    detail: t(
      "Fictional form: example name matches the practice record. Ask what each field is for and find current official instructions for your situation. One matching field does not prove a request is genuine, complete a real KYC check or approve an account.",
      "बनाया फ़ॉर्म: example नाम प्रैक्टिस रिकॉर्ड से मिलता है। हर फ़ील्ड का मकसद पूछें और अपनी स्थिति के मौजूदा ऑफ़िशियल निर्देश खोजें। एक फ़ील्ड मिलना मांग असली होने, असली KYC पूरी होने या खाता मंज़ूर होने का सबूत नहीं।",
      "Banaaya form: example naam practice record se milta hai. Har field ka maksad poochhein aur apni sthiti ke maujooda official nirdesh khojein. Ek field milna maang asli hone, asli KYC poori hone ya khaata manzoor hone ka saboot nahin.",
    ),
  },
  {
    title: t("Old address", "पुराना पता", "Puraana pata"),
    detail: t(
      "Fictional form: address on file is old and current details have changed. Identify the mismatch and ask the provider how to update it through a trusted official route. Do not guess which document is legally sufficient. No actual address is entered here.",
      "बनाया फ़ॉर्म: रिकॉर्ड का पता पुराना है और अब जानकारी बदल गई है। फर्क पहचानें और भरोसे वाले ऑफ़िशियल रास्ते से संस्था से सुधार का तरीका पूछें। कौन-सा दस्तावेज़ कानूनी तौर पर पूरा है, अंदाज़ा न लगाएं। यहाँ असली पता नहीं भरते।",
      "Banaaya form: record ka pata puraana hai aur ab jaankaari badal gayi hai. Fark pehchaanein aur bharose waale official raaste se sanstha se sudhaar ka tareeka poochhein. Kaun-sa dastaavez kaanooni taur par poora hai, andaaza na lagaayein. Yahaan asli pata nahin bharte.",
    ),
  },
  {
    title: t(
      "Unexpected code request",
      "अचानक कोड की मांग",
      "Achaanak code ki maang",
    ),
    detail: t(
      "Fictional caller: “Tell me your OTP to finish KYC.” Stop the request. A code may authorise a sign-in, change or payment; do not read it to a caller. Leave the supplied contact route and check independently. A bank-like name or logo is not proof.",
      "बनाया कॉलर: “KYC पूरी करने के लिए OTP बताएं।” मांग रोकें। कोड लॉगिन, बदलाव या पेमेंट मंज़ूर कर सकता है; कॉलर को न बताएं। दिए संपर्क से हटकर अलग से चेक करें। बैंक जैसा नाम या लोगो सबूत नहीं।",
      "Banaaya caller: “KYC poori karne ke liye OTP bataayein.” Maang rokein. Code login, badlaav ya payment manzoor kar sakta hai; caller ko na bataayein. Diye sampark se hatkar alag se check karein. Bank jaisa naam ya logo saboot nahin.",
    ),
  },
];
const routes = [
  {
    title: t("UPI payment", "UPI पेमेंट", "UPI payment"),
    detail: t(
      "UPI is a payment system, not extra income or a new pot of wealth for each app. In the trusted service, read whether the action sends money, to whom and how much. A request to pay is not proof you received money. Do not enter a PIN simply because a caller promises a refund.",
      "UPI पेमेंट का सिस्टम है। हर ऐप से नई कमाई या अलग दौलत नहीं बनती। भरोसे वाली सर्विस में पढ़ें: पैसे भेजने का काम है क्या, किसे और कितने? पेमेंट की मांग पैसे मिलने का सबूत नहीं। कॉलर के रिफ़ंड वादे पर PIN न डालें।",
      "UPI payment ka system hai. Har app se nayi kamaai ya alag daulat nahin banti. Bharose waali service mein padhein: paise bhejne ka kaam hai kya, kise aur kitne? Payment ki maang paise milne ka saboot nahin. Caller ke refund vaade par PIN na daalein.",
    ),
  },
  {
    title: t("Card purchase", "कार्ड से खरीद", "Card se khareed"),
    detail: t(
      "A debit-card purchase draws on the linked account; a credit-card purchase creates an amount to repay under its terms. The word card alone does not tell you which. Check the card type, amount, merchant, costs and status. The illustrative hold model here is not a rule for every card or bank.",
      "डेबिट कार्ड की खरीद जुड़े खाते के पैसे इस्तेमाल करती है। क्रेडिट कार्ड की खरीद शर्तों के हिसाब से लौटाने का बकाया बनाती है। सिर्फ़ कार्ड शब्द से कौन-सा है, पता नहीं चलता। कार्ड का प्रकार, रकम, दुकान, खर्च और स्टेटस चेक करें। यहाँ होल्ड का बनाया मॉडल हर कार्ड या बैंक का नियम नहीं।",
      "Debit card ki khareed jude khaate ke paise istemaal karti hai. Credit card ki khareed sharton ke hisaab se lautaane ka bakaaya banaati hai. Sirf card shabd se kaun-sa hai, pata nahin chalta. Card ka prakaar, rakam, dukaan, kharch aur status check karein. Yahaan hold ka banaaya model har card ya bank ka niyam nahin.",
    ),
  },
  {
    title: t("Bank transfer", "बैंक ट्रांसफ़र", "Bank transfer"),
    detail: t(
      "A bank transfer moves money between accounts using a supported payment network. Check recipient details independently and read the amount, reference and status. Moving money between accounts you own changes its location, not total income. Ask the provider about current supported methods, limits, timings and costs before relying on them.",
      "बैंक ट्रांसफ़र में सपोर्ट किए पेमेंट नेटवर्क से खातों के बीच पैसे जाते हैं। पाने वाले की जानकारी अलग से मिलाएं और रकम, रेफ़रेंस व स्टेटस पढ़ें। अपने खातों के बीच पैसे भेजने से जगह बदलती है, कुल कमाई नहीं। संस्था से मौजूदा तरीके, लिमिट, समय और खर्च चेक करके ही भरोसा करें।",
      "Bank transfer mein support kiye payment network se khaaton ke beech paise jaate hain. Paane waale ki jaankaari alag se milaayein aur rakam, reference va status padhein. Apne khaaton ke beech paise bhejne se jagah badalti hai, kul kamaai nahin. Sanstha se maujooda tareeke, limit, samay aur kharch check karke hi bharosa karein.",
    ),
  },
];
export default function BankingKycVisual({ language }: { language: Language }) {
  const [view, setView] = useState(0);
  const [request, setRequest] = useState(0);
  const [decision, setDecision] = useState<"approve" | "check" | null>(null);
  const [route, setRoute] = useState(0);
  const [payment, setPayment] = useState(300);
  const [posted, setPosted] = useState(false);
  const funds = bankingFunds(payment, posted);
  const s = (a: string, b: string, c: string) => read(t(a, b, c), language);
  return (
    <section
      className="banking-board"
      aria-label={s(
        "Banking and identity practice board",
        "बैंकिंग और पहचान प्रैक्टिस बोर्ड",
        "Banking aur pehchaan practice board",
      )}
    >
      <p className="eyebrow">
        {s(
          "Mia’s practice desk · fictional assumptions",
          "मिया की प्रैक्टिस डेस्क · बनाए अनुमान",
          "Mia ki practice desk · banaaye anumaan",
        )}
      </p>
      <h3>
        {s(
          "Identity, payment and balance are different tasks",
          "पहचान, पेमेंट और बैलेंस अलग काम हैं",
          "Pehchaan, payment aur balance alag kaam hain",
        )}
      </h3>
      <p>
        {s(
          "Dated example: 27 October 2026. No document uploads, real bank approval or live payments. Choose a panel to explore.",
          "तारीख़ वाला example: 27 अक्टूबर 2026। दस्तावेज़ अपलोड, असली बैंक मंज़ूरी या लाइव पेमेंट नहीं। पैनल चुनकर समझें।",
          "Taareekh waala example: 27 October 2026. Dastaavez upload, asli bank manzoori ya live payment nahin. Panel chunkar samjhein.",
        )}
      </p>
      <div
        className="banking-tabs"
        role="group"
        aria-label={s("Practice panels", "प्रैक्टिस पैनल", "Practice panel")}
      >
        {[
          t("Check a request", "मांग जांचें", "Maang jaanchein"),
          t(
            "Compare payment routes",
            "पेमेंट के रास्ते तुलना करें",
            "Payment ke raaste tulna karein",
          ),
          t(
            "Reconcile a balance",
            "बैलेंस का हिसाब मिलाएं",
            "Balance ka hisaab milaayein",
          ),
        ].map((item, i) => (
          <button
            type="button"
            key={i}
            aria-pressed={view === i}
            onClick={() => setView(i)}
          >
            {read(item, language)}
          </button>
        ))}
      </div>
      {view === 0 && (
        <div className="banking-request">
          <h4>
            {s(
              "Inspect a fictional request",
              "बनाई मांग जांचें",
              "Banaayi maang jaanchein",
            )}
          </h4>
          <div
            className="banking-options"
            role="group"
            aria-label={s(
              "Request details",
              "मांग की जानकारी",
              "Maang ki jaankaari",
            )}
          >
            {requests.map((item, i) => (
              <button
                type="button"
                key={i}
                aria-pressed={request === i}
                onClick={() => {
                  setRequest(i);
                  setDecision(null);
                }}
              >
                {read(item.title, language)}
              </button>
            ))}
          </div>
          <div className="banking-detail" aria-live="polite">
            <h4>{read(requests[request].title, language)}</h4>
            <p>{read(requests[request].detail, language)}</p>
          </div>
          <div
            className="banking-actions"
            role="group"
            aria-label={s("Choose a response", "जवाब चुनें", "Jawaab chunein")}
          >
            <button
              type="button"
              aria-pressed={decision === "approve"}
              onClick={() => setDecision("approve")}
            >
              {s(
                "Treat a matching name as approval",
                "नाम मिले तो मंज़ूरी मानें",
                "Naam mile toh manzoori maanein",
              )}
            </button>
            <button
              type="button"
              aria-pressed={decision === "check"}
              onClick={() => setDecision("check")}
            >
              {s(
                "Verify purpose and the official route",
                "मकसद और ऑफ़िशियल रास्ता चेक करें",
                "Maksad aur official raasta check karein",
              )}
            </button>
          </div>
          <div className="banking-feedback" role="status">
            {decision === "approve" && (
              <p>
                {s(
                  "Try again. One matching field does not establish a genuine request or approve an account. The practice board cannot make a bank decision.",
                  "फिर सोचें। एक फ़ील्ड मिलना असली मांग या खाता मंज़ूर होने का सबूत नहीं। प्रैक्टिस बोर्ड बैंक का फैसला नहीं कर सकता।",
                  "Phir sochein. Ek field milna asli maang ya khaata manzoor hone ka saboot nahin. Practice board bank ka faisla nahin kar sakta.",
                )}
              </p>
            )}
            {decision === "check" && (
              <p>
                {s(
                  "Safer response: identify the task, protect secrets and ask through an independently trusted official route. Clarify mismatches and current requirements before submitting anything.",
                  "बेहतर जवाब: काम पहचानें, सीक्रेट बचाएं और अलग से भरोसे वाले ऑफ़िशियल रास्ते से पूछें। कुछ भेजने से पहले फर्क और मौजूदा ज़रूरत साफ़ करें।",
                  "Behtar jawaab: kaam pehchaanein, secret bachaayein aur alag se bharose waale official raaste se poochhein. Kuchh bhejne se pehle fark aur maujooda zaroorat saaf karein.",
                )}
              </p>
            )}
          </div>
        </div>
      )}
      {view === 1 && (
        <div className="banking-routes">
          <h4>
            {s(
              "A route does not create extra money",
              "रास्ते से नए पैसे नहीं बनते",
              "Raaste se naye paise nahin bante",
            )}
          </h4>
          <div
            className="banking-options"
            role="group"
            aria-label={s(
              "Payment routes",
              "पेमेंट के रास्ते",
              "Payment ke raaste",
            )}
          >
            {routes.map((item, i) => (
              <button
                type="button"
                key={i}
                aria-pressed={route === i}
                onClick={() => setRoute(i)}
              >
                {read(item.title, language)}
              </button>
            ))}
          </div>
          <div className="banking-detail" aria-live="polite">
            <h4>{read(routes[route].title, language)}</h4>
            <p>{read(routes[route].detail, language)}</p>
          </div>
          <p>
            {s(
              "Pending is a status to check, not a receipt or an instruction to pay again. Use the trusted service’s status and reference, and ask official help when unclear.",
              "पेंडिंग जांचने वाला स्टेटस है, रसीद या फिर पेमेंट करने का निर्देश नहीं। भरोसे वाली सर्विस का स्टेटस और रेफ़रेंस चेक करें। साफ़ न हो तो ऑफ़िशियल मदद लें।",
              "Pending jaanchne waala status hai, raseed ya phir payment karne ka nirdesh nahin. Bharose waali service ka status aur reference check karein. Saaf na ho toh official madad lein.",
            )}
          </p>
        </div>
      )}
      {view === 2 && (
        <div className="banking-reconcile">
          <h4>
            {s(
              "Count the same payment once",
              "एक पेमेंट एक बार गिनें",
              "Ek payment ek baar ginein",
            )}
          </h4>
          <p>
            {s(
              "Fixed fictional entries: ₹5,000 opening + ₹12,000 salary − ₹6,000 rent − ₹500 purchase − ₹100 example fee = ₹10,400. The adjustable payment below is separate from these entries.",
              "बनाई तय एंट्री: शुरू के ₹5,000 + सैलरी ₹12,000 − किराया ₹6,000 − खरीद ₹500 − example फीस ₹100 = ₹10,400। नीचे का बदलने वाला पेमेंट इनसे अलग है।",
              "Banaayi tay entry: shuru ke ₹5,000 + salary ₹12,000 − kiraaya ₹6,000 − khareed ₹500 − example fees ₹100 = ₹10,400. Neeche ka badalne waala payment inse alag hai.",
            )}
          </p>
          <label className="visual-slider">
            <span>
              {s(
                "Example payment amount",
                "example पेमेंट की रकम",
                "Example payment ki rakam",
              )}{" "}
              <strong>{rupees(payment)}</strong>
            </span>
            <input
              type="range"
              min="0"
              max="3000"
              step="100"
              value={payment}
              onChange={(e) => setPayment(Number(e.target.value))}
              aria-label={s(
                "Example payment amount",
                "example पेमेंट की रकम",
                "Example payment ki rakam",
              )}
            />
          </label>
          <dl className="banking-summary" aria-live="polite">
            <div>
              <dt>{s("Recorded balance", "दर्ज बैलेंस", "Darj balance")}</dt>
              <dd data-testid="banking-recorded">{rupees(funds.recorded)}</dd>
            </div>
            <div>
              <dt>
                {s(
                  "Assumed available",
                  "माना उपलब्ध पैसा",
                  "Maana uplabdh paisa",
                )}
              </dt>
              <dd data-testid="banking-available">{rupees(funds.available)}</dd>
            </div>
          </dl>
          <div
            className="banking-actions"
            role="group"
            aria-label={s(
              "Payment stage",
              "पेमेंट का चरण",
              "Payment ka charan",
            )}
          >
            <button
              type="button"
              aria-pressed={!posted}
              onClick={() => setPosted(false)}
            >
              {s("Pending hold", "पेंडिंग होल्ड", "Pending hold")}
            </button>
            <button
              type="button"
              aria-pressed={posted}
              onClick={() => setPosted(true)}
            >
              {s(
                "Recorded debit; release hold",
                "दर्ज डेबिट; होल्ड हटाएं",
                "Darj debit; hold hataayein",
              )}
            </button>
          </div>
          <dl className="banking-ledger" aria-live="polite">
            <div>
              <dt>
                {s("Extra recorded debit", "अलग दर्ज डेबिट", "Alag darj debit")}
              </dt>
              <dd data-testid="banking-debit">{rupees(funds.debit)}</dd>
            </div>
            <div>
              <dt>
                {s(
                  "Remaining assumed hold",
                  "बाकी माना होल्ड",
                  "Baaki maana hold",
                )}
              </dt>
              <dd data-testid="banking-hold">{rupees(funds.hold)}</dd>
            </div>
          </dl>
          <p className="banking-formula" aria-live="polite">
            {rupees(funds.recorded)} − {rupees(funds.hold)} ={" "}
            {rupees(funds.available)}
          </p>
          <div className="banking-actions">
            <button type="button" onClick={() => setPayment(0)}>
              {s(
                "Remove example payment",
                "example पेमेंट हटाएं",
                "Example payment hataayein",
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setPayment(300);
                setPosted(false);
              }}
            >
              {s("Reset example", "example रीसेट करें", "Example reset karein")}
            </button>
          </div>
          <p>
            {s(
              "In this model, moving the same payment to recorded debits releases its hold. The assumed available amount stays the same. Real bank definitions, restrictions and other commitments can differ; verify them separately before spending.",
              "इस मॉडल में वही पेमेंट डेबिट में दर्ज होने पर उसका होल्ड हटता है। माना उपलब्ध पैसा उतना ही रहता है। असली बैंक का मतलब, रोक और दूसरे तय खर्च अलग हो सकते हैं। खर्च से पहले उन्हें अलग से चेक करें।",
              "Is model mein wahi payment debit mein darj hone par uska hold hatta hai. Maana uplabdh paisa utna hi rehta hai. Asli bank ka matlab, rok aur doosre tay kharch alag ho sakte hain. Kharch se pehle unhein alag se check karein.",
            )}
          </p>
        </div>
      )}
      <p className="visual-note">
        {s(
          "Practice changes no account, payment or lesson score. Current KYC/document rules, payment limits and fee schedules still need primary-source verification.",
          "प्रैक्टिस से खाता, पेमेंट या पाठ का स्कोर नहीं बदलता। मौजूदा KYC/दस्तावेज़ के नियम, पेमेंट लिमिट और फीस लिस्ट की प्राथमिक स्रोत से जांच बाकी है।",
          "Practice se khaata, payment ya paath ka score nahin badalta. Maujooda KYC/dastaavez ke niyam, payment limit aur fees list ki praathmik srot se jaanch baaki hai.",
        )}
      </p>
    </section>
  );
}
