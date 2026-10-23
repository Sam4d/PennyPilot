import { useState } from "react";
import { t, read, type Language } from "../content/schema";

const cases = [
  {
    title: t("Account deadline", "खाते की समय-सीमा", "Khaate ki samay-seema"),
    message: t(
      "“Account closes in ten minutes. Update KYC at bank-check.invalid. Call our help desk using this message.”",
      "“दस मिनट में खाता बंद होगा। bank-check.invalid पर KYC अपडेट करें। इसी मैसेज के हेल्प डेस्क पर कॉल करें।”",
      "“Das minute mein khaata band hoga. bank-check.invalid par KYC update karein. Isi message ke help desk par call karein.”",
    ),
    clues: [
      [
        t(
          "Inspect the deadline",
          "समय की धमकी देखें",
          "Samay ki dhamki dekhein",
        ),
        t(
          "The sender created urgency. A short deadline does not prove the request is real.",
          "भेजने वाला जल्दी करवा रहा है। कम समय देना असली मांग का सबूत नहीं।",
          "Bhejne waala jaldi karva raha hai. Kam samay dena asli maang ka saboot nahin.",
        ),
      ],
      [
        t("Inspect the address", "पता जांचें", "Pata jaanchein"),
        t(
          "This reserved .invalid address is fictional and cannot be opened here. A bank-like word is not evidence of bank ownership.",
          "यह .invalid पता बनाया हुआ है और यहाँ खुलता नहीं। बैंक जैसा शब्द बैंक की पहचान का सबूत नहीं।",
          "Yeh .invalid pata banaaya hua hai aur yahaan khulta nahin. Bank jaisa shabd bank ki pehchaan ka saboot nahin.",
        ),
      ],
      [
        t(
          "Inspect the help route",
          "मदद का रास्ता जांचें",
          "Madad ka raasta jaanchein",
        ),
        t(
          "The same message supplies the claim and the help desk. That is not an independent check.",
          "दावा और हेल्प डेस्क उसी मैसेज से मिले। यह अलग से जांच नहीं।",
          "Daava aur help desk usi message se mile. Yeh alag se jaanch nahin.",
        ),
      ],
    ],
  },
  {
    title: t("Refund caller", "रिफ़ंड का कॉल", "Refund ka call"),
    message: t(
      "“I know your last purchase amount. Read me your OTP to receive the refund. Do not end this call.”",
      "“मुझे आपकी पिछली खरीद की रकम पता है। रिफ़ंड पाने के लिए OTP बताएं। कॉल मत काटें।”",
      "“Mujhe aapki pichhli khareed ki rakam pata hai. Refund paane ke liye OTP bataayein. Call mat kaatein.”",
    ),
    clues: [
      [
        t(
          "Inspect personal knowledge",
          "जानकारी का दावा देखें",
          "Jaankaari ka daava dekhein",
        ),
        t(
          "Knowing a purchase amount does not prove identity or give permission to access an account.",
          "खरीद की रकम जानना पहचान या खाते के ऐक्सेस की मंज़ूरी नहीं।",
          "Khareed ki rakam jaanna pehchaan ya khaate ke access ki manzoori nahin.",
        ),
      ],
      [
        t(
          "Inspect the code request",
          "कोड की मांग देखें",
          "Code ki maang dekhein",
        ),
        t(
          "A secret code can approve an action. Do not read it to a caller; inspect the action in the trusted service instead.",
          "सीक्रेट कोड काम मंज़ूर कर सकता है। कॉलर को न बताएं; भरोसे वाले सर्विस में काम पढ़ें।",
          "Secret code kaam manzoor kar sakta hai. Caller ko na bataayein; bharose waale service mein kaam padhein.",
        ),
      ],
      [
        t("Inspect the pressure", "दबाव देखें", "Dabaav dekhein"),
        t(
          "Keeping you on the call blocks time to check independently. Pause and use a separate trusted route.",
          "कॉल पर रोके रखना अलग जांच का समय छीनता है। रुकें और अलग भरोसे वाला रास्ता लें।",
          "Call par roke rakhna alag jaanch ka samay chheenta hai. Rukein aur alag bharose waala raasta lein.",
        ),
      ],
    ],
  },
  {
    title: t(
      "Claimed official",
      "अधिकारी होने का दावा",
      "Adhikaari hone ka daava",
    ),
    message: t(
      "“I am an official. Keep this secret. Install my screen-control app and move your money to a protected account.”",
      "“मैं अधिकारी हूँ। किसी को मत बताएं। मेरा स्क्रीन-कंट्रोल ऐप डालें और पैसे सुरक्षित खाते में भेजें।”",
      "“Main adhikaari hoon. Kisi ko mat bataayein. Mera screen-control app daalein aur paise surakshit khaate mein bhejein.”",
    ),
    clues: [
      [
        t(
          "Inspect claimed authority",
          "पद का दावा जांचें",
          "Pad ka daava jaanchein",
        ),
        t(
          "A title spoken on a call is a claim, not independently checked identity.",
          "कॉल पर बताया पद एक दावा है, अलग से जांची पहचान नहीं।",
          "Call par bataaya pad ek daava hai, alag se jaanchi pehchaan nahin.",
        ),
      ],
      [
        t(
          "Inspect requested access",
          "मांगा गया ऐक्सेस देखें",
          "Maanga gaya access dekhein",
        ),
        t(
          "Screen control can expose or control what you do. Do not install software at an unexpected caller’s instruction.",
          "स्क्रीन-कंट्रोल से आपके काम दिख या नियंत्रित हो सकते हैं। अचानक आए कॉलर के कहने पर ऐप न डालें।",
          "Screen-control se aapke kaam dikh ya niyantrit ho sakte hain. Achaanak aaye caller ke kehne par app na daalein.",
        ),
      ],
      [
        t(
          "Inspect the transfer",
          "ट्रांसफ़र की मांग देखें",
          "Transfer ki maang dekhein",
        ),
        t(
          "Calling an account protected does not make it safe. Stop instructions and seek help through an independent trusted contact.",
          "खाते को सुरक्षित कह देने से वह सुरक्षित नहीं होता। निर्देश रोकें और अलग भरोसे वाले संपर्क से मदद लें।",
          "Khaate ko surakshit keh dene se woh surakshit nahin hota. Nirdesh rokein aur alag bharose waale sampark se madad lein.",
        ),
      ],
    ],
  },
];
export default function IdentitySafetyVisual({
  language,
}: {
  language: Language;
}) {
  const [scenario, setScenario] = useState(0);
  const [inspected, setInspected] = useState<number[]>([]);
  const [decision, setDecision] = useState<"follow" | "verify" | null>(null);
  const current = cases[scenario];
  const s = (en: string, hi: string, roman: string) =>
    read(t(en, hi, roman), language);
  return (
    <section
      className="identity-board"
      aria-label={s(
        "Message inspection board",
        "मैसेज जांच बोर्ड",
        "Message jaanch board",
      )}
    >
      <p className="eyebrow">
        {s(
          "Mia’s practice desk · fictional messages",
          "मिया की प्रैक्टिस डेस्क · बनाए हुए मैसेज",
          "Mia ki practice desk · banaaye hue message",
        )}
      </p>
      <h3>
        {s(
          "A claim needs a separate check",
          "दावे की अलग जांच ज़रूरी है",
          "Daave ki alag jaanch zaroori hai",
        )}
      </h3>
      <p>
        {s(
          "Choose a case, uncover its clues, then practise a response. No real links, codes or personal details are used.",
          "केस चुनें, संकेत खोलें और जवाब की प्रैक्टिस करें। असली लिंक, कोड या निजी जानकारी इस्तेमाल नहीं होती।",
          "Case chunein, sanket kholein aur jawaab ki practice karein. Asli link, code ya niji jaankaari istemaal nahin hoti.",
        )}
      </p>
      <div
        className="identity-cases"
        role="group"
        aria-label={s("Practice cases", "प्रैक्टिस केस", "Practice case")}
      >
        {cases.map((item, index) => (
          <button
            key={index}
            type="button"
            aria-pressed={scenario === index}
            onClick={() => {
              setScenario(index);
              setInspected([]);
              setDecision(null);
            }}
          >
            {read(item.title, language)}
          </button>
        ))}
      </div>
      <blockquote className="identity-message">
        {read(current.message, language)}
      </blockquote>
      <div className="identity-clues">
        {current.clues.map(([label, explanation], index) => (
          <div key={`${scenario}-${index}`}>
            <button
              type="button"
              aria-expanded={inspected.includes(index)}
              aria-controls={`identity-clue-${index}`}
              onClick={() =>
                setInspected((previous) =>
                  previous.includes(index)
                    ? previous.filter((i) => i !== index)
                    : [...previous, index],
                )
              }
            >
              {read(label, language)}{" "}
              <span aria-hidden="true">
                {inspected.includes(index) ? "−" : "+"}
              </span>
            </button>
            <p
              id={`identity-clue-${index}`}
              hidden={!inspected.includes(index)}
            >
              {read(explanation, language)}
            </p>
          </div>
        ))}
      </div>
      <p className="identity-count" aria-live="polite">
        {s(
          `Clues inspected: ${inspected.length} of 3`,
          `खोले संकेत: ${inspected.length} / 3`,
          `Khole sanket: ${inspected.length} / 3`,
        )}
      </p>
      <div
        className="identity-decisions"
        role="group"
        aria-label={s(
          "Choose your response",
          "अपना जवाब चुनें",
          "Apna jawaab chunein",
        )}
      >
        <button
          type="button"
          aria-pressed={decision === "follow"}
          onClick={() => setDecision("follow")}
        >
          {s(
            "Trust the claim and follow instructions",
            "दावा मानें और निर्देश करें",
            "Daava maanein aur nirdesh karein",
          )}
        </button>
        <button
          type="button"
          aria-pressed={decision === "verify"}
          onClick={() => setDecision("verify")}
        >
          {s(
            "Pause and verify independently",
            "रुकें और अलग से चेक करें",
            "Rukein aur alag se check karein",
          )}
        </button>
      </div>
      <div className="identity-feedback" role="status">
        {decision === "follow" && (
          <p>
            {s(
              "Try again. The sender’s words do not prove identity. Revealing clues is safe here, but following a real request could expose money or access. Choose an independent check.",
              "फिर सोचें। भेजने वाले की बात पहचान का सबूत नहीं। यहाँ संकेत खोलना सुरक्षित है, पर असली मांग मानने से पैसे या ऐक्सेस खतरे में पड़ सकते हैं। अलग जांच चुनें।",
              "Phir sochein. Bhejne waale ki baat pehchaan ka saboot nahin. Yahaan sanket kholna surakshit hai, par asli maang maanne se paise ya access khatre mein pad sakte hain. Alag jaanch chunein.",
            )}
          </p>
        )}
        {decision === "verify" && (
          <p>
            {s(
              "Safer response: stop following instructions. Open your trusted official app or use an independently obtained contact. If money or access is already at risk, seek bank help promptly; preserve existing evidence safely without delaying help.",
              "बेहतर जवाब: निर्देश मानना रोकें। भरोसे वाला ऑफ़िशियल ऐप या अलग से मिला भरोसे वाला संपर्क लें। पैसे या ऐक्सेस खतरे में हों तो बैंक से जल्दी मदद लें। मदद टाले बिना पुराने सबूत सुरक्षित रखें।",
              "Behtar jawaab: nirdesh maanna rokein. Bharose waala official app ya alag se mila bharose waala sampark lein. Paise ya access khatre mein hon toh bank se jaldi madad lein. Madad taale bina puraane saboot surakshit rakhein.",
            )}
          </p>
        )}
      </div>
      <p className="visual-note">
        {s(
          "Practice does not change lesson scores. You can leave a suspicious conversation before inspecting every clue. Current reporting procedures still need verification.",
          "प्रैक्टिस से पाठ के स्कोर नहीं बदलते। सभी संकेत खोलने से पहले भी शक वाली बातचीत रोक सकते हैं। मौजूदा शिकायत प्रक्रिया की जांच बाकी है।",
          "Practice se paath ke score nahin badalte. Sabhi sanket kholne se pehle bhi shak waali baatcheet rok sakte hain. Maujooda shikaayat prakriya ki jaanch baaki hai.",
        )}
      </p>
    </section>
  );
}
