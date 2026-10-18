import type { Language } from "../content/schema";
import Mia from "./Mia";
import { Icon } from "./UI";
export default function Onboarding({
  language,
  onLanguage,
  onStart,
  busy = false,
}: {
  language: Language;
  onLanguage: (language: Language) => void;
  onStart: (quick: boolean) => void;
  busy?: boolean;
}) {
  const hi = language === "hi";
  return (
    <main className="onboarding" data-testid="onboarding">
      <div className="onboarding-card">
        <span className="eyebrow">PENNY PILOT</span>
        <label className="setting-field">
          <strong>
            {hi ? "पहले अपनी भाषा चुनें" : "Choose your language first"}
          </strong>
          <select
            aria-label={hi ? "भाषा" : "Language"}
            value={language}
            onChange={(e) => {
              onLanguage(e.target.value as Language);
            }}
          >
            <option value="hi">हिन्दी</option>
            <option value="en">English</option>
            <option value="hinglish">Hinglish (Roman)</option>
            <option value="both">English + हिन्दी</option>
          </select>
        </label>
        <div className="onboarding-mia">
          <Mia pose="wave" />
        </div>
        <h1>
          {hi
            ? "पैसों की समझ, एक छोटे कदम से।"
            : "Money makes more sense, one small step at a time."}
        </h1>
        <p>
          {hi
            ? "मैं मिया हूँ। हम साथ सीखेंगे, आज़माएंगे और गलतियों से समझेंगे। अभी एक आसान सवाल करें?"
            : "I’m Mia. We’ll learn by trying things and understanding mistakes. Start with one easy question?"}
        </p>
        <button
          className="button green full"
          data-testid="onboarding-start"
          disabled={busy}
          onClick={() => {
            onStart(true);
          }}
        >
          <Icon name="Play" />
          {hi ? "1 मिनट का पहला पाठ शुरू करें" : "Start a 1-minute lesson"}
        </button>
        <button
          className="text-button"
          data-testid="onboarding-explore"
          disabled={busy}
          onClick={() => onStart(false)}
        >
          {hi ? "पहले सीखने का सफ़र देखें" : "Explore the learning path first"}
        </button>
        <p className="privacy-line">
          <Icon name="ShieldCheck" size={18} />
          {hi
            ? "आपकी प्रगति इसी डिवाइस पर रहती है। कोई लॉगिन या ट्रैकिंग नहीं।"
            : "Your progress stays on this device. No login or tracking."}
        </p>
        <small>
          {hi
            ? "सामग्री अभी ड्राफ़्ट है। यह सीखने के लिए है, पैसों की निजी सलाह नहीं।"
            : "Content is still a draft. This is education, not personal financial advice."}
        </small>
      </div>
    </main>
  );
}
