import { createContext, useContext, type ReactNode } from "react";
import type { Language } from "../content/schema";
const LanguageContext = createContext<Language>("en");
export function CopyProvider({
  language,
  children,
}: {
  language: Language;
  children: ReactNode;
}) {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}
export const hindiUI: Record<string, string> = {
  "Getting your journey ready…": "आपका सीखने का सफ़र तैयार हो रहा है…",
  "Skip to content": "सीधे सामग्री पर जाएं",
  "Penny Pilot navigation": "Penny Pilot का मेन्यू",
  "Penny Pilot. home": "Penny Pilot का मुख्य पेज",
  "A LITTLE WISER, EVERY DAY": "हर दिन, थोड़ी और समझ",
  "Main navigation": "मुख्य मेन्यू",
  "— Mia, your money buddy": "— मिया, पैसों की आपकी दोस्त",
  "Your progress. Your device.": "आपकी प्रगति, आपके डिवाइस पर।",
  "MADE FOR CURIOUS MINDS IN INDIA": "भारत में सीखने के शौकीनों के लिए",
  "Penny Pilot": "Penny Pilot",
  "Your space": "आपकी जगह",
  Offline: "ऑफ़लाइन",
  Language: "भाषा",
  "Learning journey": "सीखने का सफ़र",
  "Insurance learning": "बीमा समझें",
  "The playground": "सीखने के टूल्स",
  "Your daily refresh": "आज की दोहराई",
  "Your notebook": "आपकी नोटबुक",
  "Your profile": "आपकी प्रोफ़ाइल",
  "Export backup": "बैकअप निकालें",
  "A little patience, a little progress…":
    "बस थोड़ा इंतज़ार, अगला कदम तैयार है…",
  "Small lessons. Lifelong confidence.": "छोटे पाठ। ज़िंदगी भर काम की समझ।",
  "Free to learn. Yours to keep.": "सीखना मुफ़्त है। समझ आपकी है।",
  "Mobile navigation": "फ़ोन का मेन्यू",
  "Opening the full journey…": "पूरा सफ़र खुल रहा है…",
  "Getting your lesson ready…": "आपका पाठ तैयार हो रहा है…",
  "Curriculum worlds": "सिलेबस के वर्ल्ड",
  "Search curriculum": "सिलेबस में खोजें",
  "YOUR MONEY ERA STARTS HERE": "पैसों की समझ यहीं से शुरू",
  "A little wiser.": "थोड़ी और समझ।",
  "Every day.": "हर दिन।",
  "WORLD 01 · MONEY FOUNDATIONS": "वर्ल्ड 01 · पैसों की बुनियाद",
  "Big dreams.": "बड़े सपने।",
  "Meet small steps.": "छोटे कदमों से शुरुआत।",
  "min ·": "मिनट ·",
  "Hi, I’m Mia!": "हाय, मैं मिया हूँ!",
  min: "मिनट",
  "THE BIGGER PICTURE": "पूरा सफ़र देखें",
  "Explore the 16-world curriculum": "16 वर्ल्ड का सिलेबस देखें",
  "Your daily learning": "आज की सीख",
  "XP TODAY": "आज के XP",
  "Mia’s little wisdom": "मिया की छोटी सीख",
  "YOUR MONEY BUDDY": "पैसों की आपकी दोस्त",
  "“You don’t need a lot of money to start learning about it.”":
    "“पैसों को समझना शुरू करने के लिए ढेर सारे पैसे नहीं चाहिए।”",
  "Curiosity is a pretty great first investment.":
    "सीखने की इच्छा, एक अच्छी शुरुआत है।",
  "LEARN BY PLAYING": "खेलकर समझें",
  "What if your money": "अगर आपके पैसे",
  "could grow?": "बढ़ सकें तो?",
  "Slide, explore, and see the": "स्लाइडर चलाएं और देखें",
  "magic of compounding.": "ब्याज पर ब्याज का असर।",
  "Enter the playground": "टूल्स आज़माएं",
  "No ads. No hot stock tips.": "न विज्ञापन, न शेयर खरीदने की टिप्स।",
  "Just good money education.": "बस पैसों की काम की समझ।",
  "MONEY FOUNDATIONS · BEGINNER": "पैसों की बुनियाद · शुरुआत",
  minutes: "मिनट",
  "Editorial preview · Sources included with every lesson":
    "ड्राफ़्ट पाठ · हर पाठ के साथ स्रोत हैं",
  "Lesson language": "पाठ की भाषा",
  "Both / दोनों": "दोनों भाषाएं",
  "exercises · Your pace": "सवाल · अपनी रफ़्तार से",
  "A LITTLE KNOWLEDGE TO KEEP": "याद रखने की छोटी सीख",
  "WORKED EXAMPLE": "हिसाब के साथ एक example",
  "ONE SMALL STEP. A LITTLE MORE CONFIDENT.": "एक छोटा कदम। थोड़ी और समझ।",
  "XP EARNED": "मिले XP",
  "CORRECT ANSWERS": "सही जवाब",
  "NOTE CARD SAVED": "नोट्स कार्ड सेव हुआ",
  "Editorial preview. These source links are provided for verification; this content has not yet received independent expert review. Education only, not financial advice.":
    "यह ड्राफ़्ट है। स्रोत चेक करने के लिए दिए हैं; किसी स्वतंत्र विशेषज्ञ ने अभी सामग्री की समीक्षा नहीं की है। यह सीखने के लिए है, पैसों की निजी सलाह नहीं।",
  "A LITTLE WISDOM, ALWAYS WITH YOU": "आपकी सीख, हमेशा साथ",
  "Worth learning.": "काम की सीख।",
  "Worth keeping.": "याद रखने के लिए।",
  "Little lessons, worked examples, and thoughts in your own words.":
    "छोटे पाठ, हिसाब वाले example और अपने शब्दों में आपकी बातें।",
  "Save as PDF": "PDF में सेव करें",
  "My notes": "मेरे नोट्स",
  "Money dictionary": "पैसों के शब्द",
  "Search notebook": "नोटबुक में खोजें",
  "MONEY FOUNDATIONS": "पैसों की बुनियाद",
  "Open your note card": "अपना नोट्स कार्ड खोलें",
  "Find my first lesson": "मेरा पहला पाठ खोजें",
  "Your note card": "आपका नोट्स कार्ड",
  "YOUR MONEY FOUNDATIONS NOTEBOOK": "पैसों की बुनियाद की आपकी नोटबुक",
  "THE MATHS, MADE CLEAR": "हिसाब, आसान भाषा में",
  "Try this in real life": "ज़िंदगी में आज़माएं",
  "In your own words": "अपने शब्दों में",
  "An idea, a reminder, a thought for future you…":
    "कोई बात, याद रखने की चीज़, आगे के लिए एक सीख…",
  "Saved automatically on your device.": "आपके डिवाइस पर अपने आप सेव होता है।",
  "Revisit lesson": "पाठ फिर देखें",
  "Tuck it away": "सेव करके बंद करें",
  "Penny Pilot · My money notebook": "Penny Pilot · पैसों की मेरी नोटबुक",
  "My thoughts:": "मेरी बातें:",
  "YOUR PACE. YOUR PROGRESS. YOUR PENNY PILOT.":
    "आपकी रफ़्तार। आपकी प्रगति। आपका Penny Pilot।",
  "A little more": "कुछ और",
  "you.": "आपके बारे में।",
  "Build a habit that fits your life, not the other way around.":
    "ऐसी आदत बनाएं जो आपकी ज़िंदगी में आराम से जगह बनाए।",
  "No comparison. No leaderboard. Just your own little wins.":
    "न तुलना, न रैंकिंग। बस आपके अपने छोटे कदम।",
  "XP earned": "मिले XP",
  "day streak": "दिन की स्ट्रीक",
  "lessons learned": "पाठ पूरे",
  "Make yourself at home": "अपने हिसाब से सेट करें",
  "What should Mia call you?": "मिया आपको किस नाम से बुलाए?",
  "Your name (optional)": "आपका नाम (चाहें तो)",
  "Your daily little goal": "रोज़ का छोटा लक्ष्य",
  "XP depends on correct answers. Time estimates vary by learner.":
    "सही जवाब पर XP मिलते हैं। हर व्यक्ति को अलग समय लग सकता है।",
  "Your kind of light": "आपकी पसंद की रोशनी",
  "Light & bright": "हल्का रंग",
  "After hours": "गहरा रंग",
  "Text size": "अक्षरों का साइज़",
  "Your progress, safely tucked away": "आपकी प्रगति का बैकअप",
  "Your learning stays on this device. Export a backup to move between your phone and computer, or keep a spare copy.":
    "आपकी सीख इसी डिवाइस पर रहती है। फ़ोन और कंप्यूटर में ले जाने या एक कॉपी रखने के लिए बैकअप निकालें।",
  "Export my progress": "मेरी प्रगति का बैकअप निकालें",
  "Restore a backup": "बैकअप वापस लाएं",
  "Choose a Penny Pilot progress backup":
    "Penny Pilot की प्रगति का बैकअप चुनें",
  "Protect browser storage": "ब्राउज़र की सेविंग सुरक्षित रखें",
  "A small promise": "हमारा छोटा वादा",
  "No ads, trackers, or broker referrals.":
    "न विज्ञापन, न ट्रैकिंग, न ब्रोकर रेफ़रल।",
  "No login. Your learning stays local.":
    "लॉगिन नहीं चाहिए। आपकी सीख डिवाइस पर रहती है।",
  "No stock picks or promised returns.":
    "शेयर चुनने की सलाह या रिटर्न का वादा नहीं।",
  "This app is for education only. It is not investment, tax or legal advice. It does not provide personal financial advice.":
    "यह ऐप सिर्फ़ सीखने के लिए है। यह इन्वेस्टमेंट, टैक्स या कानूनी सलाह नहीं है। यह निजी फ़ाइनेंशियल सलाह नहीं देता।",
  "About this first release": "इस शुरुआती वर्ज़न के बारे में",
  "Penny Pilot 0.8 ·": "Penny Pilot 0.8 ·",
  "editorial-preview lessons,": "ड्राफ़्ट पाठ,",
  "exercises,": "सवाल,",
  "glossary entries, four calculators, and a 16-world topic library, eight insurance reading guides, and a lump-sum investment mode. Content needs expert financial and Hindi editorial review. Current tax and regulatory rules are intentionally excluded until verified.":
    "शब्दों के मतलब, चार कैलकुलेटर, 16 वर्ल्ड के टॉपिक, बीमा की आठ गाइड और लंपसम इन्वेस्टमेंट मोड। फ़ाइनेंस और हिन्दी के जानकारों की समीक्षा बाकी है। आज के टैक्स और नियम जाँचे बिना शामिल नहीं किए गए हैं।",
  "Animations respect your device’s reduced-motion preference. Lessons and fonts are bundled for offline use after the first full load.":
    "डिवाइस में कम ऐनिमेशन की सेटिंग हो तो उसका ध्यान रखा जाता है। पहली बार पूरा लोड होने के बाद पाठ और फ़ॉन्ट ऑफ़लाइन चलते हैं।",
  "Restore progress": "प्रगति वापस लाएं",
  "Bring your learning along.": "अपनी सीख साथ लाएं।",
  "This backup contains": "इस बैकअप में हैं",
  "XP and": "XP और",
  "completed lessons. Restoring replaces the progress on this device.":
    "पूरे पाठ। वापस लाने पर इस डिवाइस की पुरानी प्रगति बदल जाएगी।",
  "Export your current progress first if you want to keep it.":
    "पुरानी प्रगति भी रखनी हो तो पहले उसका बैकअप निकालें।",
  "Export current progress": "अभी की प्रगति का बैकअप निकालें",
  "Restore this backup": "यह बैकअप वापस लाएं",
  "A LITTLE REFRESH GOES A LONG WAY": "थोड़ी दोहराई, लंबे समय की समझ",
  "Good things": "काम की बातें",
  "stick with practice.": "दोहराने से याद रहती हैं।",
  "Not a test. Just a friendly check-in with what you’ve learned.":
    "यह परीक्षा नहीं है। बस सीखी हुई बातों को फिर आज़माएं।",
  "MAKE ROOM FOR A LITTLE RECALL": "सीखी हुई बात फिर याद करें",
  "questions due · A few thoughtful minutes": "सवाल दोहराने हैं · कुछ मिनट दें",
  "Explore a lesson": "एक पाठ आज़माएं",
  "MISTAKES ARE LITTLE TEACHERS": "गलतियों से भी सीखते हैं",
  "A little extra attention.": "थोड़ा और अभ्यास।",
  "These questions have been tricky before. They’re saved here, without judgement.":
    "ये सवाल पहले थोड़े मुश्किल लगे थे। फिर आज़माने के लिए यहाँ सेव हैं।",
  "Practise again": "फिर आज़माएं",
  "THE MONEY PLAYGROUND": "पैसों के टूल्स",
  "What if?": "अगर ऐसा हो तो?",
  "Let’s find out.": "आज़माकर देखें।",
  Calculators: "कैलकुलेटर",
  "Already set aside": "पहले से अलग रखे पैसे",
  Today: "आज",
  "Total repayment": "कुल चुकाने की रकम",
  "A space to experiment, not investment advice.":
    "यह आज़माकर सीखने की जगह है, इन्वेस्टमेंट की सलाह नहीं।",
  "All figures are educational illustrations. No live rates, product recommendations, or promised returns.":
    "सभी आँकड़े सीखने के बनाए हुए example हैं। असली रेट, किसी प्लान की सलाह या रिटर्न का वादा नहीं।",
  "Close dialog": "संवाद बंद करें",
  "Previous concept": "पिछली बात",
  "Next concept": "अगली बात",
  "A gentle start": "आराम से शुरुआत",
  "A few minutes": "कुछ मिनट",
  "A steady habit": "नियमित छोटी आदत",
  "Around 5 minutes": "लगभग 5 मिनट",
  "A curious mind": "कुछ और समझें",
  "Around 10 minutes": "लगभग 10 मिनट",
  "A fresh beginning": "नई शुरुआत",
  "Keep it growing": "अपनी रफ़्तार से सीखें",
  "Daily goal, done. Look at you grow!": "आज का लक्ष्य पूरा। शाबाश!",
  "Notes, not noise.": "अपनी सीख की नोटबुक।",
  "A little space for your thoughts.": "अपनी बातें लिखने की जगह।",
  "YOUR NEXT SMALL STEP": "आपका अगला छोटा कदम",
  "A LITTLE REFRESH": "थोड़ी दोहराई",
  "Find a little wisdom…": "अपनी सीख खोजें…",
  "Find a money word…": "पैसों का शब्द खोजें…",
  "Start with the basics. Your personal revision queue will grow as you learn.":
    "बुनियाद से शुरू करें। सीखते जाएंगे तो दोहराने के सवाल जुड़ेंगे।",
  "Your next revision is due tomorrow or later. You can practise a lesson again anytime.":
    "अगली दोहराई कल या बाद में है। किसी भी पाठ को फिर आज़मा सकते हैं।",
  "All caught up. Let it settle.": "अभी की दोहराई पूरी। आराम से समझें।",
  "A fresh page, a curious mind.": "नई शुरुआत, सीखने की इच्छा।",
  "Your next refresh is growing.": "अगली दोहराई तैयार हो रही है।",
  "Finish your first lesson and Mia will remember which ideas to revisit.":
    "पहला पाठ पूरा करें। मिया दोहराने की बातें याद रखेगी।",
  "We schedule each question from your answers. Correct answers come back less often; tricky ones get a little more care.":
    "आपके जवाब के हिसाब से सवाल वापस आते हैं। सही वाले थोड़े बाद में, मुश्किल वाले जल्दी दोहराते हैं।",
  "FOUNDATION EXPLORER": "बुनियाद सीखने वाले",
  "CURIOUS MONEY HUMAN": "पैसों को समझने की इच्छा",
  "A FRESH BEGINNING": "नई शुरुआत",
  "Hi, curious human.": "सीखने के सफ़र में स्वागत है।",
  "Small habits. Room to grow.": "छोटी बचत। बढ़ने का समय।",
  "The real cost of borrowing.": "उधार का पूरा खर्च।",
  "Same rupees. Different buying power.": "वही रुपये। खरीदने की ताकत अलग।",
  "A little buffer. A lot of calm.": "थोड़ी अलग बचत। मुश्किल में सहारा।",
  Saved: "बचाए पैसे",
  Principal: "शुरू की रकम",
  Growth: "बढ़ी रकम",
  Loss: "नुकसान",
  Interest: "ब्याज",
  "Your contribution": "आपकी जमा रकम",
  "Monthly payment": "महीने की किस्त",
  "Monthly expenses": "महीने का ज़रूरी खर्च",
  "Time period": "समय",
  "Annual inflation": "सालाना महँगाई",
  "Annual interest": "सालाना ब्याज",
  "Annual return": "सालाना रिटर्न",
  "Assumed annual return": "मान लिया सालाना रिटर्न",
  "Monthly investment": "महीने की जमा",
  "Monthly living costs": "महीने का ज़रूरी खर्च",
  "Loan amount": "लोन की रकम",
  "Price today": "आज की कीमत",
};
Object.assign(hindiUI, {
  "THE VERY BEGINNING": "बिलकुल शुरुआत से",
  "EVERYDAY MONEY CONFIDENCE": "रोज़ के पैसों की समझ",
  "YOUR SAFETY NET": "मुश्किल में सुरक्षा",
  "BORROW WITH YOUR EYES OPEN": "उधार को पूरा समझें",
  "A PLAN FOR YOUR NEXT STEP": "अपने अगले कदम का प्लान",
  "Start here, go anywhere": "यहाँ शुरू करें, कोई भी पाठ खोलें",
  "Learn by doing": "खुद करके समझें",
  "Revisit anytime": "जब चाहें फिर देखें",
  "A LITTLE, REGULARLY": "थोड़ी रकम, नियमित रूप से",
  "THE SAME RUPEE, OVER TIME": "समय के साथ वही रुपये",
  "A LITTLE PEACE OF MIND": "मुश्किल के लिए तैयारी",
  "See how monthly contributions could add up over time.":
    "देखें हर महीने की जमा समय के साथ कैसे जुड़ती है।",
  "Monthly deposits at month-end. Constant assumed return, compounded monthly. Fees, taxes, and inflation excluded.":
    "जमा महीने के आखिर में है। वही माने हुए रेट पर हर महीने कंपाउंडिंग है। फ़ीस, टैक्स और महँगाई शामिल नहीं हैं।",
  "Fixed interest, monthly payments, no fees or prepayments. Actual lender terms can differ.":
    "ब्याज तय है, पेमेंट हर महीने है। फ़ीस और समय से पहले पेमेंट नहीं जोड़े। असली लोन की शर्तें अलग हो सकती हैं।",
  "Constant assumed inflation. Your personal basket of prices can behave differently.":
    "महँगाई का रेट वही माना है। आपके असली खर्च की कीमतें अलग बदल सकती हैं।",
  "A planning example, not a personal recommendation. Income stability and dependants may change the target.":
    "यह प्लान समझने का example है, निजी सलाह नहीं। कमाई और आप पर निर्भर लोगों के हिसाब से ज़रूरत बदल सकती है।",
  "ILLUSTRATIVE FUTURE VALUE": "उदाहरण में आगे की रकम",
  "You put in": "आपने जमा किए",
  "Illustrative gain or loss": "उदाहरण में फायदा या नुकसान",
  years: "साल",
  year: "साल",
  months: "महीने",
  "Total interest": "कुल ब्याज",
  "Principal borrowed": "शुरू की उधार रकम",
  "Money today": "आज के पैसे",
  "“Time is a helpful ingredient. A return assumption is not a promise.”":
    "“समय मदद करता है। मान लिया रिटर्न कोई वादा नहीं है।”",
  "“A smaller EMI can hide a bigger total cost. Check both.”":
    "“छोटी EMI में कुल खर्च बड़ा हो सकता है। दोनों देखें।”",
  "“A bigger number isn’t always a bigger basket of groceries.”":
    "“बड़ा नंबर हमेशा ज़्यादा सामान नहीं खरीदता।”",
  "“Start small. A cushion grows one thoughtful transfer at a time.”":
    "“थोड़ी बचत से शुरू करें। हर नियमित जमा से सहारा बढ़ता है।”",
  "Your first little piece of wisdom awaits.":
    "पहली सीख का नोट्स कार्ड आपका इंतज़ार कर रहा है।",
  "Every completed lesson leaves a helpful note card here. Add your thoughts and make it yours.":
    "हर पूरे पाठ के बाद एक काम का नोट्स कार्ड यहाँ मिलता है। अपनी बातें भी जोड़ें।",
  Beginner: "शुरुआत",
  Intermediate: "आगे की समझ",
  Advanced: "गहरी समझ",
  "Remaining loan balance over time": "समय के साथ बचा लोन",
  "Purchasing power decreases over time": "समय के साथ खरीदने की ताकत",
  "Illustrative growth over time": "समय के साथ उदाहरण की रकम",
  "Per month": "हर महीने",
  "MONTHLY EMI": "महीने की EMI",
  "BUYING POWER": "खरीदने की ताकत",
  "EMERGENCY TARGET": "इमरजेंसी का लक्ष्य",
  "ESTIMATED EMI": "उदाहरण की EMI",
  "ILLUSTRATIVE BUYING POWER": "उदाहरण में खरीदने की ताकत",
  "YOUR BUFFER TARGET": "अलग बचत का लक्ष्य",
  "Hi, curious human.": "सीखने के सफ़र में स्वागत है।",
  "FOUNDATION EXPLORER": "बुनियाद सीखने वाले",
  "CURIOUS MONEY HUMAN": "पैसों को समझने की इच्छा",
  "A FRESH BEGINNING": "नई शुरुआत",
  "Latest lesson": "पिछला पाठ",
  "Fresh start": "नई शुरुआत",
});
Object.assign(hindiUI, {
  Learn: "सीखें",
  Revise: "दोहराएं",
  Playground: "टूल्स",
  Insurance: "बीमा",
  Notebook: "नोटबुक",
  Me: "प्रोफ़ाइल",
  "Mia, your friendly cat finance guide": "मिया, पैसों की आपकी दोस्त",
  "This is not a Penny Pilot backup.": "यह Penny Pilot का बैकअप नहीं है।",
  "The backup format is invalid or unsupported.":
    "बैकअप का फ़ॉर्मैट सही नहीं है या यह वर्ज़न नहीं चलता।",
  "The backup contains invalid progress.":
    "बैकअप में प्रगति का डेटा सही नहीं है।",
  "The saved lesson is invalid.": "सेव किए पाठ का डेटा सही नहीं है।",
  "Invalid local preferences or streak protection.":
    "सेटिंग या स्ट्रीक फ़्रीज़ का डेटा सही नहीं है।",
  "Please choose a backup smaller than 5 MB.": "5 MB से छोटा बैकअप चुनें।",
  "Could not read this backup.": "यह बैकअप पढ़ा नहीं गया।",
  "Could not export your backup. Please try again.":
    "बैकअप नहीं निकला। दोबारा आज़माएं।",
  "Your browser manages storage automatically. Keep an exported backup too.":
    "ब्राउज़र सेविंग खुद संभालता है। एक बैकअप फ़ाइल भी रखें।",
  "Persistent storage is enabled. Keep a backup for moving devices.":
    "सेविंग सुरक्षित रखने की सुविधा चालू है। डिवाइस बदलने के लिए बैकअप भी रखें।",
  "Your browser has not granted persistent storage. Keep regular exported backups.":
    "ब्राउज़र ने सेविंग हमेशा रखने की इजाज़त नहीं दी। नियमित बैकअप रखें।",
  "Storage protection is unavailable here. Please keep an exported backup.":
    "यहाँ सेविंग की सुरक्षा की सुविधा नहीं मिली। बैकअप फ़ाइल रखें।",
  "Storage could not be saved.": "डेटा सेव नहीं हुआ।",
});
export function translateUI(value: string, language: Language): string {
  if (language !== "hi") return value;
  const key = value.replace(/\s+/g, " ").trim();
  const translated = hindiUI[key];
  if (translated) return value.replace(value.trim(), translated);
  if (/^\d+ PLAYABLE LESSONS$/.test(key))
    return `${key.match(/^\d+/)![0]} उपलब्ध पाठ`;
  if (key === "8 READING GUIDES") return "8 पढ़ने की गाइड";
  if (key === "TOPIC OUTLINES") return "टॉपिक की आउटलाइन";
  if (/^Concept \d+$/.test(key)) return key.replace("Concept", "बात");
  if (/^\d+ little refresh(es)? ready for you\.$/.test(key))
    return `${key.match(/^\d+/)![0]} सवाल दोहराने के लिए तैयार हैं।`;
  if (/^LESSON \d+$/.test(key)) return key.replace("LESSON", "पाठ");
  if (/^\d+(?:\.\d+)? (years?|months)$/.test(key))
    return key.replace(/years?/, "साल").replace("months", "महीने");
  if (/^after \d+ years from one deposit$/.test(key))
    return `${key.match(/\d+/)![0]} साल बाद, एक बार की जमा से`;
  if (/^after \d+ years of monthly deposits$/.test(key))
    return `${key.match(/\d+/)![0]} साल की हर महीने की जमा के बाद`;
  if (/^each month, for \d+ years$/.test(key))
    return `${key.match(/\d+/)![0]} साल तक, हर महीने`;
  if (/^\d+ months of essential breathing room$/.test(key))
    return `${key.match(/^\d+/)![0]} महीने के ज़रूरी खर्च की तैयारी`;
  if (/^what .* could buy after \d+ years$/.test(key))
    return key
      .replace("what ", "")
      .replace(" could buy after ", " की खरीदने की ताकत, ")
      .replace(" years", " साल बाद");
  return value;
}
export function useUICopy() {
  const language = useContext(LanguageContext);
  return (value: string) => translateUI(value, language);
}
export function Copy({ en, children }: { en?: string; children?: ReactNode }) {
  const language = useContext(LanguageContext);
  if (en !== undefined) return <> {translateUI(en, language)} </>;
  return (
    <>
      {typeof children === "string"
        ? translateUI(children, language)
        : children}
    </>
  );
}
