import type { Language } from "../content/schema";
import { Icon } from "../components/UI";
export default function About({
  language,
  onBack,
}: {
  language: Language;
  onBack: () => void;
}) {
  const hi = language === "hi";
  return (
    <article className="about-content">
      <span className="eyebrow">PENNY PILOT</span>
      <h1>{hi ? "इस सामग्री के बारे में" : "About this content"}</h1>
      <section className="settings-card">
        <h2>
          {hi
            ? "सीखने के लिए, निजी सलाह नहीं"
            : "Education, not personal advice"}
        </h2>
        <p>
          {hi
            ? "यह ऐप फ़ाइनेंस समझने में मदद करता है। यह आपके लिए इन्वेस्टमेंट, बीमा, टैक्स या कानूनी फ़ैसला नहीं करता।"
            : "This app helps you understand finance. It does not make investment, insurance, tax or legal decisions for you."}
        </p>
      </section>
      <section className="settings-card">
        <h2>{hi ? "अभी ड्राफ़्ट है" : "Current status: Draft"}</h2>
        <p>
          {hi
            ? "18 छोटे पाठ और बीमा की आठ गाइड उपलब्ध हैं। स्वतंत्र फ़ाइनेंस और हिन्दी विशेषज्ञों की समीक्षा बाकी है। स्रोतों के लिंक जाँचने के लिए हैं, जाँच पूरी होने का सबूत नहीं।"
            : "18 short lessons and eight insurance guides are available. Independent financial and Hindi editorial review is still outstanding. Source links are a review queue, not evidence that verification is complete."}
        </p>
        <p>
          {hi
            ? "16 वर्ल्ड का बड़ा सिलेबस अभी योजना है। आउटलाइन को पूरा पाठ या उपलब्ध सीखने के घंटे न समझें।"
            : "The larger 16-world syllabus is a plan. An outline is not a finished lesson or a claim of available learning hours."}
        </p>
      </section>
      <section className="settings-card">
        <h2>{hi ? "आपकी जानकारी यहीं रहती है" : "Your data stays here"}</h2>
        <p>
          {hi
            ? "कोई लॉगिन, ट्रैकिंग, विज्ञापन या ब्रोकर रेफ़रल नहीं है। प्रगति, निजी नोट्स और गलती की रिपोर्ट डिवाइस पर रहती हैं। रिपोर्ट अपने आप किसी को नहीं भेजी जाती। डिवाइस बदलने के लिए बैकअप निकालें।"
            : "There is no login, tracking, advertising or broker referral. Progress, personal notes and error reports stay on this device. Reports are not sent to anyone. Export a backup to move devices."}
        </p>
      </section>
      <section className="settings-card">
        <h2>
          {hi ? "तारीख़ और मान्यताएं देखें" : "Check dates and assumptions"}
        </h2>
        <p>
          {hi
            ? "कैलकुलेटर के रेट और उदाहरण काल्पनिक हैं। टैक्स, फ़ीस और बदलते नियम परिणाम बदल सकते हैं। आज के नियमों की पुष्टि: जाँची नहीं गई। किसी डिग्री के बराबर होने का दावा: जाँचा नहीं गया।"
            : "Calculator rates and examples are fictional. Taxes, fees and changing rules can alter results. Current-rule verification: Not verified. Academic degree equivalence: Not verified."}
        </p>
      </section>
      <button className="button green" onClick={onBack}>
        <Icon name="ArrowLeft" />
        {hi ? "सीखने के सफ़र पर वापस" : "Back to learning"}
      </button>
    </article>
  );
}
