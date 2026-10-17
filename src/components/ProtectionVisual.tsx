import { useState } from "react";
import type { Language } from "../content/schema";
import { claimSplit, supportGap } from "../lib/protection";
import { rupees } from "../lib/learning";
import { Icon } from "./UI";
export default function ProtectionVisual({
  lessonId,
  language,
}: {
  lessonId: string;
  language: Language;
}) {
  const [covered, setCovered] = useState(true);
  const [coPay, setCoPay] = useState(20);
  const [limit, setLimit] = useState(100000);
  const [years, setYears] = useState(5);
  const [monthly, setMonthly] = useState(30000);
  const s = (en: string, hi: string, hinglish: string) =>
    language === "hi" ? hi : language === "hinglish" ? hinglish : en;
  const claim = claimSplit(40000, 10000, coPay, limit);
  const planning = supportGap(monthly, years, 200000, 300000);
  const control = (
    label: string,
    value: number,
    min: number,
    max: number,
    step: number,
    onChange: (v: number) => void,
  ) => (
    <label className="visual-slider">
      <span>{label}</span>
      <input
        type="range"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
  const share = (insurer: number, you: number) => (
    <div className="claim-outcome" role="status">
      <div className="claim-bar" aria-hidden="true">
        <span style={{ width: `${(insurer / (insurer + you)) * 100}%` }} />
        <span style={{ flex: 1 }} />
      </div>
      <div className="claim-legend">
        <span>
          <i />
          {s("Insurer pays", "कंपनी देती है", "Company deti hai")}
          <strong>{rupees(insurer)}</strong>
        </span>
        <span>
          <i />
          {s("You pay", "आप देते हैं", "Aap dete hain")}
          <strong>{rupees(you)}</strong>
        </span>
      </div>
    </div>
  );
  return (
    <div className="protection-model">
      {lessonId === "insurance" && (
        <>
          <div className="protection-scene">
            <span
              className={`protection-canopy ${covered ? "covered" : "outside"}`}
            >
              <Icon name="Umbrella" size={52} />
            </span>
            <div>
              <span>
                {s(
                  "Fictional treatment bill",
                  "बनाया हुआ इलाज का बिल",
                  "Banaya hua ilaaj ka bill",
                )}
              </span>
              <strong>₹40,000</strong>
            </div>
          </div>
          <div
            className="protection-switch"
            role="group"
            aria-label={s(
              "Try a coverage condition",
              "कवर की शर्त आज़माएं",
              "Cover ki shart aazmaayein",
            )}
          >
            <button aria-pressed={covered} onClick={() => setCovered(true)}>
              {s("Covered treatment", "कवर वाला इलाज", "Cover waala ilaaj")}
            </button>
            <button aria-pressed={!covered} onClick={() => setCovered(false)}>
              {s(
                "Excluded treatment",
                "कवर के बाहर का इलाज",
                "Cover ke baahar ka ilaaj",
              )}
            </button>
          </div>
          {share(covered ? 40000 : 0, covered ? 0 : 40000)}
          <p>
            {s(
              "Fictional policy: ₹6,000 yearly premium, ₹1 lakh available cover, no co-pay, deductible or other limit. Switching the condition changes what is eligible. A premium is the price of protection, not a personal savings balance.",
              "बनाई हुई पॉलिसी: साल का प्रीमियम ₹6,000, अभी ₹1 लाख कवर। को-पे, पहले खुद देने की रकम (डिडक्टिबल) और दूसरी लिमिट नहीं है। शर्त बदलें तो माने जाने वाले खर्च बदलते हैं। प्रीमियम सुरक्षा की कीमत है, आपका निजी बचत बैलेंस नहीं।",
              "Banayi hui policy: saal ka premium ₹6,000, abhi ₹1 lakh cover. Co-pay, pehle khud dene ki rakam (deductible) aur doosri limit nahin hai. Shart badlein toh maane jaane waale kharch badalte hain. Premium suraksha ki keemat hai, aapka niji bachat balance nahin.",
            )}
          </p>
        </>
      )}
      {lessonId === "health-cover" && (
        <>
          <div className="model-context">
            <Icon name="FileText" size={21} />
            <span>
              {s(
                "₹50,000 bill · ₹40,000 eligible · ₹10,000 outside cover",
                "₹50,000 बिल · ₹40,000 कवर में · ₹10,000 बाहर",
                "₹50,000 bill · ₹40,000 cover mein · ₹10,000 baahar",
              )}
            </span>
          </div>
          {share(claim.insurer, claim.you)}
          {control(
            s(
              "Your share of eligible costs (co-pay %)",
              "कवर वाले खर्च में आपका हिस्सा (को-पे %)",
              "Cover waale kharch mein aapka hissa (co-pay %)",
            ),
            coPay,
            0,
            50,
            5,
            setCoPay,
          )}
          <div className="model-setting-value">{coPay}%</div>
          {control(
            s(
              "Available cover in rupees",
              "बचा कवर (रुपये)",
              "Bacha cover (rupaye)",
            ),
            limit,
            0,
            100000,
            10000,
            setLimit,
          )}
          <div className="model-setting-value">{rupees(limit)}</div>
          <dl className="claim-breakdown">
            <div>
              <dt>{s("Outside cover", "कवर के बाहर", "Cover ke baahar")}</dt>
              <dd>{rupees(claim.excluded)}</dd>
            </div>
            <div>
              <dt>
                {s(
                  "Your percentage share",
                  "आपका प्रतिशत वाला हिस्सा",
                  "Aapka pratishat waala hissa",
                )}
              </dt>
              <dd>{rupees(claim.coPay)}</dd>
            </div>
            <div>
              <dt>
                {s(
                  "Extra beyond remaining cover",
                  "बचे कवर से ऊपर की रकम",
                  "Bache cover se oopar ki rakam",
                )}
              </dt>
              <dd>{rupees(claim.coverGap)}</dd>
            </div>
          </dl>
          <p>
            {s(
              "Learning example only: co-pay is applied to eligible costs, then insurer payment is capped at available cover. No deductible, restoration or other limit. Real policy calculations and approvals may differ.",
              "सिर्फ़ सीखने का example: कवर वाले खर्च में पहले को-पे निकाला है, फिर कंपनी का पेमेंट बचे कवर तक रखा है। डिडक्टिबल, कवर वापसी और दूसरी लिमिट नहीं जोड़ी है। असली पॉलिसी का हिसाब और मंज़ूरी अलग हो सकती है।",
              "Sirf seekhne ka example: cover waale kharch mein pehle co-pay nikaala hai, phir company ka payment bache cover tak rakha hai. Deductible, cover waapsi aur doosri limit nahin jodi hai. Asli policy ka hisaab aur manzoori alag ho sakti hai.",
            )}
          </p>
        </>
      )}
      {lessonId === "term-cover" && (
        <>
          <div className="support-result" role="status">
            <Icon name="Heart" size={28} />
            <span>
              {s(
                "Simplified support gap",
                "मदद के लिए रकम का आसान गैप",
                "Madad ke liye rakam ka aasaan gap",
              )}
            </span>
            <strong>{rupees(planning.gap)}</strong>
            <small>
              {s(
                "A planning example, not a cover recommendation",
                "यह planning example है, सुझाया हुआ कवर नहीं",
                "Yeh planning example hai, sujhaaya hua cover nahin",
              )}
            </small>
          </div>
          {control(
            s(
              "Monthly essential family costs",
              "परिवार के महीने के ज़रूरी खर्च",
              "Parivaar ke mahine ke zaroori kharch",
            ),
            monthly,
            10000,
            100000,
            5000,
            setMonthly,
          )}
          <div className="model-setting-value">{rupees(monthly)}</div>
          {control(
            s(
              "Years of support in this example",
              "इस example में मदद के साल",
              "Is example mein madad ke saal",
            ),
            years,
            1,
            20,
            1,
            setYears,
          )}
          <div className="model-setting-value">
            {years} {s("years", "साल", "saal")}
          </div>
          <dl className="claim-breakdown">
            <div>
              <dt>
                {s(
                  "Costs over this period",
                  "इस अवधि के खर्च",
                  "Is avadhi ke kharch",
                )}
              </dt>
              <dd>{rupees(planning.costs)}</dd>
            </div>
            <div>
              <dt>{s("Add debt", "कर्ज़ जोड़ें", "Karz jodein")}</dt>
              <dd>₹2,00,000</dd>
            </div>
            <div>
              <dt>
                {s(
                  "Subtract usable savings",
                  "काम आ सकने वाली बचत घटाएं",
                  "Kaam aa sakne waali bachat ghataayein",
                )}
              </dt>
              <dd>₹3,00,000</dd>
            </div>
          </dl>
          <p>
            {s(
              "Assumes unchanged costs and no investment growth, other income or existing cover. Real planning also considers inflation, who depends on you, each goal and which resources are actually available. Do not count the same resource twice.",
              "मान लें खर्च नहीं बदलते। ग्रोथ, दूसरी कमाई और पहले का कवर नहीं जोड़ा है। असली प्लान में महँगाई, आप पर निर्भर लोग, हर लक्ष्य और सच में काम आने वाले पैसे भी देखें। एक ही रकम दो बार न गिनें।",
              "Maan lein kharch nahin badalte. Growth, doosri kamaai aur pehle ka cover nahin joda hai. Asli plan mein mehngaai, aap par nirbhar log, har lakshya aur sach mein kaam aane waale paise bhi dekhein. Ek hi rakam do baar na ginein.",
            )}
          </p>
        </>
      )}
    </div>
  );
}
