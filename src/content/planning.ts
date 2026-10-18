import { t, choice, numeric, order, document, bucket } from "./schema";
import type { Lesson } from "./schema";
const sources = ["https://investor.sebi.gov.in/"];
export const planningLessons: Lesson[] = [
  {
    id: "goal-plan",
    chapter: "planning",
    skill: "S0.10.1",
    minutes: 8,
    icon: "Flag",
    title: t(
      "Give your goal a plan",
      "अपने लक्ष्य का प्लान बनाएं",
      "Apne lakshya ka plan banaayein",
    ),
    subtitle: t(
      "An amount, a date and one small repeatable step.",
      "रकम, तारीख़ और हर महीने एक छोटा कदम।",
      "Rakam, taareekh aur har mahine ek chhota kadam.",
    ),
    hook: t(
      "Neha wants a ₹24,000 course in six months. She has ₹6,000 set aside. Mia asks: how much still needs saving, and can the monthly budget support it?",
      "नेहा छह महीने बाद ₹24,000 का कोर्स करना चाहती है। ₹6,000 अलग रखे हैं। मिया पूछती है: और कितना बचाना है? क्या हर महीने के बजट में जगह है?",
      "Neha chhe mahine baad ₹24,000 ka course karna chaahti hai. ₹6,000 alag rakhe hain. Mia poochhti hai: aur kitna bachaana hai? Kya har mahine ke budget mein jagah hai?",
    ),
    idea: t(
      "Make a goal specific: what you need, its estimated cost and when you need it. Subtract money already reserved for this goal, then divide the gap by the months left. A SMART goal is specific, measurable, achievable, relevant and time-bound. Test whether the step fits your essential costs and debt payments; the label alone does not make a plan affordable.",
      "लक्ष्य साफ़ करें: क्या चाहिए, अनुमानित कीमत और कब चाहिए। इसी लक्ष्य के लिए अलग रखे पैसे घटाएं। बची रकम को बचे महीनों में बांटें। SMART का मतलब है साफ़, माप सकने वाला, कर सकने वाला, आपके काम का और तय समय वाला लक्ष्य। ज़रूरी खर्च और कर्ज़ की किस्तों के बाद बजट चेक करें। सिर्फ़ नाम देने से प्लान आसान नहीं हो जाता।",
      "Lakshya saaf karein: kya chaahiye, anumaanit keemat aur kab chaahiye. Isi lakshya ke liye alag rakhe paise ghataayein. Bachi rakam ko bache mahinon mein baantein. SMART ka matlab hai saaf, naap sakne waala, kar sakne waala, aapke kaam ka aur tay samay waala lakshya. Zaroori kharch aur karz ki kishton ke baad budget check karein. Sirf naam dene se plan aasaan nahin ho jaata.",
    ),
    example: t(
      "Fictional fixed-price plan, without interest: ₹24,000 − ₹6,000 = ₹18,000 left. Over six month-end deposits, that is ₹3,000 a month. At only ₹2,000 a month, she reaches ₹18,000 total and is ₹6,000 short. Nine deposits of ₹2,000 would close the gap if the price stays the same.",
      "बनाया हुआ प्लान, कीमत वही और ब्याज नहीं: ₹24,000 − ₹6,000 = ₹18,000 बाकी। छह महीनों के आखिर में ₹3,000 जमा करें तो लक्ष्य पूरा। ₹2,000 महीना बचाएं तो कुल ₹18,000 होंगे, यानी ₹6,000 कम। कीमत वही रहे तो ₹2,000 की नौ जमा से बची रकम पूरी होगी।",
      "Banaaya hua plan, keemat wahi aur byaaj nahin: ₹24,000 − ₹6,000 = ₹18,000 baaki. Chhe mahinon ke aakhir mein ₹3,000 jama karein toh lakshya poora. ₹2,000 mahina bachaayein toh kul ₹18,000 honge, yaani ₹6,000 kam. Keemat wahi rahe toh ₹2,000 ki nau jama se bachi rakam poori hogi.",
    ),
    mistake: t(
      "Do not count the same ₹6,000 towards two goals or include your emergency buffer. A hoped-for investment return is not a guaranteed deposit. If the saving step is too large, change the cost, date or spending plan instead of chasing a promised high return.",
      "उसी ₹6,000 को दो लक्ष्यों में न गिनें। इमरजेंसी के पैसे भी अलग रखें। इन्वेस्टमेंट से उम्मीद का रिटर्न पक्की जमा नहीं है। हर महीने की बचत मुश्किल हो तो कीमत, तारीख़ या खर्च का प्लान बदलें; ज़्यादा रिटर्न के वादे के पीछे न भागें।",
      "Usi ₹6,000 ko do lakshyon mein na ginein. Emergency ke paise bhi alag rakhein. Investment se ummeed ka return pakki jama nahin hai. Har mahine ki bachat mushkil ho toh keemat, taareekh ya kharch ka plan badlein; zyada return ke waade ke peechhe na bhaagein.",
    ),
    notes: [
      t(
        "Gap = target cost − money reserved for this goal, with a minimum of zero.",
        "बाकी रकम = लक्ष्य की कीमत − इसी लक्ष्य के अलग रखे पैसे; कम से कम शून्य।",
        "Baaki rakam = lakshya ki keemat − isi lakshya ke alag rakhe paise; kam se kam shoonya.",
      ),
      t(
        "A planned expense needs its own saving pot (sinking fund); an emergency is unexpected.",
        "तय खर्च के लिए अलग बचत रखें (सिंकिंग फ़ंड)। इमरजेंसी अचानक आती है।",
        "Tay kharch ke liye alag bachat rakhein (sinking fund). Emergency achaanak aati hai.",
      ),
      t(
        "Review the actual price and progress regularly; a plan is adjustable.",
        "असली कीमत और बचत बार-बार चेक करें। प्लान बदल सकते हैं।",
        "Asli keemat aur bachat baar-baar check karein. Plan badal sakte hain.",
      ),
    ],
    action: t(
      "Write one goal with its estimated cost and month. Count only money reserved for it. Compare the required saving with your budget, then review after the next deposit.",
      "एक लक्ष्य, उसकी अनुमानित कीमत और महीना लिखें। सिर्फ़ उसी के लिए अलग रखे पैसे गिनें। ज़रूरी बचत को बजट से मिलाएं, फिर अगली जमा के बाद चेक करें।",
      "Ek lakshya, uski anumaanit keemat aur mahina likhein. Sirf usi ke liye alag rakhe paise ginein. Zaroori bachat ko budget se milaayein, phir agli jama ke baad check karein.",
    ),
    exercises: [
      choice(
        "goal-plan-1",
        t(
          "Which goal is clear enough to start a saving plan?",
          "किस लक्ष्य से बचत का प्लान शुरू कर सकते हैं?",
          "Kis lakshya se bachat ka plan shuru kar sakte hain?",
        ),
        [
          t(
            "Have more money someday",
            "कभी ज़्यादा पैसे हों",
            "Kabhi zyada paise hon",
          ),
          t(
            "Save ₹24,000 for a course in six months",
            "छह महीने में कोर्स के लिए ₹24,000 बचाना",
            "Chhe mahine mein course ke liye ₹24,000 bachaana",
          ),
          t(
            "Earn the highest return",
            "सबसे ज़्यादा रिटर्न पाना",
            "Sabse zyada return paana",
          ),
        ],
        1,
        t(
          "The course goal has a purpose, amount and date. You must still check affordability.",
          "कोर्स के लक्ष्य में काम, रकम और समय है। बजट में जगह है या नहीं, यह भी चेक करें।",
          "Course ke lakshya mein kaam, rakam aur samay hai. Budget mein jagah hai ya nahin, yeh bhi check karein.",
        ),
      ),
      numeric(
        "goal-plan-2",
        t(
          "Target ₹24,000; ₹6,000 reserved. How many rupees are still needed?",
          "लक्ष्य ₹24,000; ₹6,000 अलग रखे हैं। और कितने रुपये चाहिए?",
          "Lakshya ₹24,000; ₹6,000 alag rakhe hain. Aur kitne rupaye chaahiye?",
        ),
        18000,
        t(
          "₹24,000 − ₹6,000 = ₹18,000. Other savings are not automatically available for this goal.",
          "₹24,000 − ₹6,000 = ₹18,000। बाकी बचत अपने आप इस लक्ष्य की नहीं हो जाती।",
          "₹24,000 − ₹6,000 = ₹18,000. Baaki bachat apne aap is lakshya ki nahin ho jaati.",
        ),
        { operation: "subtract", values: [24000, 6000] },
      ),
      numeric(
        "goal-plan-3",
        t(
          "Six monthly deposits of ₹3,000 add how many rupees, ignoring interest?",
          "बिना ब्याज, छह बार ₹3,000 जमा किए। कितने रुपये जुड़े?",
          "Bina byaaj, chhe baar ₹3,000 jama kiye. Kitne rupaye jude?",
        ),
        18000,
        t(
          "6 × ₹3,000 = ₹18,000. With the existing ₹6,000, the total is ₹24,000.",
          "6 × ₹3,000 = ₹18,000। पहले के ₹6,000 जोड़कर ₹24,000 होंगे।",
          "6 × ₹3,000 = ₹18,000. Pehle ke ₹6,000 jodkar ₹24,000 honge.",
        ),
        { operation: "multiply", values: [6, 3000] },
      ),
      bucket(
        "goal-plan-4",
        t(
          "Separate planned costs from unexpected emergencies.",
          "तय खर्च और अचानक आई इमरजेंसी अलग करें।",
          "Tay kharch aur achaanak aayi emergency alag karein.",
        ),
        [
          t(
            "School fee due in six months",
            "छह महीने बाद की स्कूल फ़ीस",
            "Chhe mahine baad ki school fees",
          ),
          t(
            "Sudden loss of income",
            "अचानक कमाई बंद होना",
            "Achaanak kamaai band hona",
          ),
          t(
            "Annual subscription renewal",
            "साल की सब्सक्रिप्शन दोबारा भरना",
            "Saal ki subscription dobaara bharna",
          ),
        ],
        [
          t("Planned cost", "तय खर्च", "Tay kharch"),
          t("Unexpected emergency", "अचानक इमरजेंसी", "Achaanak emergency"),
        ],
        [0, 1, 0],
        t(
          "Known dates can have separate saving pots. Unexpected loss of income is what an emergency buffer helps with.",
          "तय तारीख़ के खर्च की अलग बचत हो सकती है। अचानक कमाई बंद होने पर इमरजेंसी के पैसे काम आते हैं।",
          "Tay taareekh ke kharch ki alag bachat ho sakti hai. Achaanak kamaai band hone par emergency ke paise kaam aate hain.",
        ),
      ),
      choice(
        "goal-plan-5",
        t(
          "The plan needs ₹3,000 a month, but only ₹2,000 fits the budget. What is a useful next step?",
          "प्लान में ₹3,000 महीना चाहिए, पर बजट में ₹2,000 हैं। अब क्या ठीक होगा?",
          "Plan mein ₹3,000 mahina chaahiye, par budget mein ₹2,000 hain. Ab kya theek hoga?",
        ),
        [
          t(
            "Assume a high return will fill the gap",
            "मान लें ज़्यादा रिटर्न से कमी पूरी होगी",
            "Maan lein zyada return se kami poori hogi",
          ),
          t(
            "Count emergency savings again",
            "इमरजेंसी की बचत फिर गिन लें",
            "Emergency ki bachat phir gin lein",
          ),
          t(
            "Review the cost, deadline or spending plan",
            "कीमत, समय या खर्च का प्लान चेक करें",
            "Keemat, samay ya kharch ka plan check karein",
          ),
        ],
        2,
        t(
          "A longer deadline or smaller cost may help. Do not assume uncertain returns or count money twice.",
          "ज़्यादा समय या कम कीमत मदद कर सकती है। अनिश्चित रिटर्न को पक्का न मानें, पैसे दो बार न गिनें।",
          "Zyada samay ya kam keemat madad kar sakti hai. Anishchit return ko pakka na maanein, paise do baar na ginein.",
        ),
      ),
      order(
        "goal-plan-6",
        t(
          "Put the planning steps in a useful order.",
          "प्लान के कदम सही क्रम में रखें।",
          "Plan ke kadam sahi kram mein rakhein.",
        ),
        [
          t(
            "Check the monthly saving against your budget",
            "महीने की बचत बजट से मिलाएं",
            "Mahine ki bachat budget se milaayein",
          ),
          t(
            "Choose the goal cost and date",
            "लक्ष्य की कीमत और समय चुनें",
            "Lakshya ki keemat aur samay chunein",
          ),
          t(
            "Subtract savings reserved for this goal",
            "इसी लक्ष्य के अलग रखे पैसे घटाएं",
            "Isi lakshya ke alag rakhe paise ghataayein",
          ),
          t(
            "Divide the remaining gap by the months left",
            "बची रकम को बचे महीनों में बांटें",
            "Bachi rakam ko bache mahinon mein baantein",
          ),
        ],
        [1, 2, 3, 0],
        t(
          "Start with the cost and date, find the gap, calculate the step, then check whether it fits.",
          "पहले कीमत और समय, फिर बाकी रकम, महीने की बचत और बजट चेक।",
          "Pehle keemat aur samay, phir baaki rakam, mahine ki bachat aur budget check.",
        ),
      ),
      numeric(
        "goal-plan-7",
        t(
          "₹6,000 is already reserved. Six ₹2,000 deposits bring the total to ₹18,000. Against a ₹24,000 target, how many rupees are missing?",
          "₹6,000 पहले से रखे हैं। छह बार ₹2,000 जमा करके कुल ₹18,000 हुए। ₹24,000 के लक्ष्य में कितने रुपये कम हैं?",
          "₹6,000 pehle se rakhe hain. Chhe baar ₹2,000 jama karke kul ₹18,000 hue. ₹24,000 ke lakshya mein kitne rupaye kam hain?",
        ),
        6000,
        t(
          "₹24,000 − ₹18,000 = ₹6,000 short. The target price is held fixed in this example.",
          "₹24,000 − ₹18,000 = ₹6,000 कम। इस example में कीमत वही रखी है।",
          "₹24,000 − ₹18,000 = ₹6,000 kam. Is example mein keemat wahi rakhi hai.",
        ),
        { operation: "subtract", values: [24000, 18000] },
      ),
      choice(
        "goal-plan-8",
        t(
          "You have saved the full target amount. What should you check before paying?",
          "लक्ष्य की पूरी रकम बच गई। पेमेंट से पहले क्या चेक करें?",
          "Lakshya ki poori rakam bach gayi. Payment se pehle kya check karein?",
        ),
        [
          t(
            "The actual price and whether the goal still matters",
            "असली कीमत और क्या लक्ष्य अभी भी काम का है",
            "Asli keemat aur kya lakshya abhi bhi kaam ka hai",
          ),
          t(
            "Whether you can count that money in every other goal",
            "क्या यही पैसे हर दूसरे लक्ष्य में गिन सकते हैं",
            "Kya yahi paise har doosre lakshya mein gin sakte hain",
          ),
          t(
            "Which investment promises the fastest doubling",
            "कौन जल्दी दोगुना करने का वादा करता है",
            "Kaun jaldi doguna karne ka waada karta hai",
          ),
        ],
        0,
        t(
          "Prices and priorities can change. Recheck them and keep money for other needs separate.",
          "कीमत और ज़रूरत बदल सकती है। फिर चेक करें और दूसरे काम के पैसे अलग रखें।",
          "Keemat aur zaroorat badal sakti hai. Phir check karein aur doosre kaam ke paise alag rakhein.",
        ),
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "net-worth",
    chapter: "planning",
    skill: "S0.10.3",
    minutes: 8,
    icon: "Scale",
    title: t(
      "What you own, what you owe",
      "आपके पैसे और आपका कर्ज़",
      "Aapke paise aur aapka karz",
    ),
    subtitle: t(
      "Read a snapshot without confusing it with monthly income.",
      "आज का हिसाब समझें, महीने की कमाई से अलग।",
      "Aaj ka hisaab samjhein, mahine ki kamaai se alag.",
    ),
    hook: t(
      "Arjun earns ₹30,000 a month. Does that tell Mia how much he owns after debts? No. She needs a list of what he owns and what he still owes on the same date.",
      "अर्जुन महीने के ₹30,000 कमाता है। क्या इससे मिया जान सकती है कि कर्ज़ घटाकर उसके पास कितना है? नहीं। उसी तारीख़ पर उसकी चीज़ों की कीमत और बाकी कर्ज़ की लिस्ट चाहिए।",
      "Arjun mahine ke ₹30,000 kamaata hai. Kya isse Mia jaan sakti hai ki karz ghataakar uske paas kitna hai? Nahin. Usi taareekh par uski cheezon ki keemat aur baaki karz ki list chaahiye.",
    ),
    idea: t(
      "Things you own with money value are assets. Amounts you currently owe are debts (liabilities). Net worth = total assets − outstanding debts, on one date. Use a reasonable current value for belongings, not their original price. Count both a financed asset and its remaining loan; do not count only the asset.",
      "जिन चीज़ों के आप मालिक हैं और जिनकी पैसे में कीमत है, वे एसेट हैं। जो रकम अभी चुकानी है, वह कर्ज़ (लायबिलिटी) है। कुल एसेट − बाकी कर्ज़ = नेट वर्थ, यानी एक तारीख़ का हिसाब। चीज़ों की आज की ठीक-ठाक कीमत लें, पुरानी खरीद कीमत नहीं। लोन से खरीदी चीज़ और उसका बचा लोन, दोनों गिनें।",
      "Jin cheezon ke aap maalik hain aur jinki paise mein keemat hai, ve asset hain. Jo rakam abhi chukaani hai, woh karz (liability) hai. Kul asset − baaki karz = net worth, yaani ek taareekh ka hisaab. Cheezon ki aaj ki theek-thaak keemat lein, puraani khareed keemat nahin. Loan se khareedi cheez aur uska bacha loan, dono ginein.",
    ),
    example: t(
      "Fictional snapshot: bank savings ₹40,000, a deposit ₹60,000 and a vehicle worth ₹50,000 today give assets of ₹1,50,000. A vehicle loan of ₹70,000 and a card balance of ₹10,000 give debts of ₹80,000. Net worth is ₹70,000. The ₹30,000 salary is a monthly flow, not another asset to add unless it is still held in an already counted balance.",
      "बनाया हुआ हिसाब: बैंक में ₹40,000, जमा में ₹60,000 और गाड़ी की आज की कीमत ₹50,000; कुल एसेट ₹1,50,000। गाड़ी का बचा लोन ₹70,000 और कार्ड का बकाया ₹10,000; कुल कर्ज़ ₹80,000। नेट वर्थ ₹70,000। ₹30,000 सैलरी महीने की कमाई है। जो पैसे अभी बैंक में हैं, वे बैंक बैलेंस में पहले ही गिने गए हैं।",
      "Banaaya hua hisaab: bank mein ₹40,000, jama mein ₹60,000 aur gaadi ki aaj ki keemat ₹50,000; kul asset ₹1,50,000. Gaadi ka bacha loan ₹70,000 aur card ka bakaaya ₹10,000; kul karz ₹80,000. Net worth ₹70,000. ₹30,000 salary mahine ki kamaai hai. Jo paise abhi bank mein hain, ve bank balance mein pehle hi gine gaye hain.",
    ),
    mistake: t(
      "Net worth is not cash you can spend today and is not a measure of personal worth. A valuable home may take time and costs to sell. If assets are below debts, show a negative number honestly; do not round it up to zero. A borrowed ₹10,000 kept in the bank adds both ₹10,000 cash and ₹10,000 debt, leaving net worth unchanged before fees.",
      "नेट वर्थ आज खर्च कर सकने वाले कैश के बराबर नहीं है, और आपकी इंसानी कीमत भी नहीं बताती। घर बेचने में समय और खर्च लग सकता है। एसेट से कर्ज़ ज़्यादा हो तो माइनस दिखाएं, शून्य नहीं। ₹10,000 उधार लेकर बैंक में रखें तो कैश और कर्ज़ दोनों ₹10,000 बढ़ते हैं; फ़ीस से पहले नेट वर्थ वही रहती है।",
      "Net worth aaj kharch kar sakne waale cash ke baraabar nahin hai, aur aapki insaani keemat bhi nahin bataati. Ghar bechne mein samay aur kharch lag sakta hai. Asset se karz zyada ho toh minus dikhaayein, shoonya nahin. ₹10,000 udhaar lekar bank mein rakhein toh cash aur karz dono ₹10,000 badhte hain; fees se pehle net worth wahi rehti hai.",
    ),
    notes: [
      t(
        "Use one date and avoid counting the same balance twice.",
        "एक ही तारीख़ लें। वही बैलेंस दो बार न गिनें।",
        "Ek hi taareekh lein. Wahi balance do baar na ginein.",
      ),
      t(
        "Net worth is a snapshot; cash flow measures money coming and going over time.",
        "नेट वर्थ एक तारीख़ का हिसाब है। कैश फ़्लो समय में आने-जाने वाले पैसे हैं।",
        "Net worth ek taareekh ka hisaab hai. Cash flow samay mein aane-jaane waale paise hain.",
      ),
      t(
        "Positive net worth does not guarantee enough ready cash (liquidity) for a bill.",
        "प्लस नेट वर्थ से बिल भरने के लिए तुरंत पैसे मिलना (लिक्विडिटी) पक्का नहीं होता।",
        "Plus net worth se bill bharne ke liye turant paise milna (liquidity) pakka nahin hota.",
      ),
    ],
    action: t(
      "On paper, choose a date and list current asset values and outstanding debts. Calculate the difference. Keep account numbers private and do not treat the result as a score of your worth.",
      "कागज़ पर तारीख़ चुनें। एसेट की आज की कीमत और बाकी कर्ज़ लिखें। फर्क निकालें। खाता नंबर निजी रखें। इस नंबर से अपनी इंसानी कीमत न आंकें।",
      "Kaagaz par taareekh chunein. Asset ki aaj ki keemat aur baaki karz likhein. Fark nikaalein. Khaata number niji rakhein. Is number se apni insaani keemat na aankein.",
    ),
    exercises: [
      bucket(
        "net-worth-1",
        t(
          "Sort the snapshot items.",
          "आज के हिसाब की चीज़ें अलग करें।",
          "Aaj ke hisaab ki cheezein alag karein.",
        ),
        [
          t(
            "Money already in your bank account",
            "बैंक खाते में अभी रखे पैसे",
            "Bank khaate mein abhi rakhe paise",
          ),
          t(
            "Unpaid vehicle loan balance",
            "गाड़ी का बचा लोन",
            "Gaadi ka bacha loan",
          ),
          t(
            "Current resale value of a vehicle you own",
            "आपकी गाड़ी की आज बेचने की कीमत",
            "Aapki gaadi ki aaj bechne ki keemat",
          ),
        ],
        [t("Asset", "एसेट", "Asset"), t("Debt", "कर्ज़", "Karz")],
        [0, 1, 0],
        t(
          "Owned balances and current values are assets; an outstanding loan is a debt.",
          "आपके बैलेंस और चीज़ों की आज की कीमत एसेट हैं। बाकी लोन कर्ज़ है।",
          "Aapke balance aur cheezon ki aaj ki keemat asset hain. Baaki loan karz hai.",
        ),
      ),
      document(
        "net-worth-2",
        t(
          "Find the line that is a monthly flow, not an asset or debt balance.",
          "कौन-सी लाइन महीने की कमाई है, एसेट या कर्ज़ का बैलेंस नहीं?",
          "Kaun-si line mahine ki kamaai hai, asset ya karz ka balance nahin?",
        ),
        t(
          "Arjun’s fictional snapshot",
          "अर्जुन का बनाया हुआ हिसाब",
          "Arjun ka banaaya hua hisaab",
        ),
        [
          t(
            "Bank balance today · ₹40,000",
            "आज बैंक बैलेंस · ₹40,000",
            "Aaj bank balance · ₹40,000",
          ),
          t(
            "Current vehicle value · ₹50,000",
            "गाड़ी की आज की कीमत · ₹50,000",
            "Gaadi ki aaj ki keemat · ₹50,000",
          ),
          t(
            "Salary per month · ₹30,000",
            "महीने की सैलरी · ₹30,000",
            "Mahine ki salary · ₹30,000",
          ),
          t(
            "Vehicle loan still owed · ₹70,000",
            "गाड़ी का बाकी लोन · ₹70,000",
            "Gaadi ka baaki loan · ₹70,000",
          ),
        ],
        2,
        t(
          "Salary is income over a period. Any unspent salary already in the bank is included in that balance, so do not add it again.",
          "सैलरी एक समय की कमाई है। उसमें से बचे पैसे बैंक बैलेंस में हैं तो दोबारा न जोड़ें।",
          "Salary ek samay ki kamaai hai. Usmein se bache paise bank balance mein hain toh dobaara na jodein.",
        ),
      ),
      numeric(
        "net-worth-3",
        t(
          "Assets ₹1,50,000 minus debts ₹80,000. Net worth in rupees?",
          "एसेट ₹1,50,000, कर्ज़ ₹80,000। नेट वर्थ कितने रुपये?",
          "Asset ₹1,50,000, karz ₹80,000. Net worth kitne rupaye?",
        ),
        70000,
        t(
          "₹1,50,000 − ₹80,000 = ₹70,000. Use outstanding debts from the same date.",
          "₹1,50,000 − ₹80,000 = ₹70,000। उसी तारीख़ का बाकी कर्ज़ लें।",
          "₹1,50,000 − ₹80,000 = ₹70,000. Usi taareekh ka baaki karz lein.",
        ),
        { operation: "subtract", values: [150000, 80000] },
      ),
      choice(
        "net-worth-4",
        t(
          "A vehicle cost ₹80,000 but would reasonably sell for ₹50,000 today. Which asset value belongs in today’s snapshot?",
          "गाड़ी ₹80,000 की ली, आज लगभग ₹50,000 में बिकेगी। आज के हिसाब में कौन-सी कीमत लें?",
          "Gaadi ₹80,000 ki li, aaj lagbhag ₹50,000 mein bikegi. Aaj ke hisaab mein kaun-si keemat lein?",
        ),
        [
          t(
            "₹80,000, the original price",
            "₹80,000, पुरानी खरीद कीमत",
            "₹80,000, puraani khareed keemat",
          ),
          t(
            "₹50,000, the estimated current value",
            "₹50,000, आज की अनुमानित कीमत",
            "₹50,000, aaj ki anumaanit keemat",
          ),
          t(
            "Both values added together",
            "दोनों कीमत जोड़कर",
            "Dono keemat jodkar",
          ),
        ],
        1,
        t(
          "Use a reasonable current estimate. Sale costs may reduce the amount you actually receive.",
          "आज का ठीक-ठाक अनुमान लें। बेचने का खर्च मिले पैसे कम कर सकता है।",
          "Aaj ka theek-thaak anumaan lein. Bechne ka kharch mile paise kam kar sakta hai.",
        ),
      ),
      numeric(
        "net-worth-5",
        t(
          "Assets ₹50,000; debts ₹80,000. Enter net worth, including a minus sign if needed.",
          "एसेट ₹50,000; कर्ज़ ₹80,000। नेट वर्थ लिखें, ज़रूरत हो तो माइनस लगाएं।",
          "Asset ₹50,000; karz ₹80,000. Net worth likhein, zaroorat ho toh minus lagaayein.",
        ),
        -30000,
        t(
          "₹50,000 − ₹80,000 = −₹30,000. Negative net worth means debts exceed assets in this snapshot.",
          "₹50,000 − ₹80,000 = −₹30,000। आज के हिसाब में कर्ज़ एसेट से ज़्यादा है।",
          "₹50,000 − ₹80,000 = −₹30,000. Aaj ke hisaab mein karz asset se zyada hai.",
        ),
        { operation: "subtract", values: [50000, 80000] },
      ),
      choice(
        "net-worth-6",
        t(
          "You borrow ₹10,000 and leave all of it in your bank account. Before fees, what happens to net worth?",
          "₹10,000 उधार लेकर पूरे बैंक में रखे। फ़ीस से पहले नेट वर्थ पर क्या असर?",
          "₹10,000 udhaar lekar poore bank mein rakhe. Fees se pehle net worth par kya asar?",
        ),
        [
          t("It rises by ₹10,000", "₹10,000 बढ़ती है", "₹10,000 badhti hai"),
          t("It falls by ₹10,000", "₹10,000 घटती है", "₹10,000 ghatti hai"),
          t(
            "It stays the same: cash and debt both rise",
            "वही रहती है: कैश और कर्ज़ दोनों बढ़े",
            "Wahi rehti hai: cash aur karz dono badhe",
          ),
        ],
        2,
        t(
          "Assets rise ₹10,000 and debts rise ₹10,000, so their difference is unchanged before costs.",
          "एसेट ₹10,000 और कर्ज़ ₹10,000 बढ़े, तो खर्च से पहले फर्क वही रहा।",
          "Asset ₹10,000 aur karz ₹10,000 badhe, toh kharch se pehle fark wahi raha.",
        ),
      ),
      choice(
        "net-worth-7",
        t(
          "Most of your assets are in a home that takes time to sell. Does positive net worth guarantee you can pay tomorrow’s bill?",
          "ज़्यादातर एसेट घर में हैं, जो बेचने में समय लेगा। क्या प्लस नेट वर्थ से कल का बिल भरना पक्का है?",
          "Zyadaatar asset ghar mein hain, jo bechne mein samay lega. Kya plus net worth se kal ka bill bharna pakka hai?",
        ),
        [
          t(
            "Yes, every asset is immediately spendable",
            "हाँ, हर एसेट तुरंत खर्च हो सकता है",
            "Haan, har asset turant kharch ho sakta hai",
          ),
          t(
            "No, you also need ready cash or accessible money",
            "नहीं, तुरंत मिल सकने वाले पैसे भी चाहिए",
            "Nahin, turant mil sakne waale paise bhi chaahiye",
          ),
        ],
        1,
        t(
          "Net worth and ready cash (liquidity) answer different questions. A sale may take time and involve costs.",
          "नेट वर्थ और तुरंत मिल सकने वाले पैसे (लिक्विडिटी) अलग बातें हैं। बेचने में समय और खर्च लग सकता है।",
          "Net worth aur turant mil sakne waale paise (liquidity) alag baatein hain. Bechne mein samay aur kharch lag sakta hai.",
        ),
      ),
      order(
        "net-worth-8",
        t(
          "Build a consistent net-worth snapshot.",
          "एक जैसा नेट वर्थ हिसाब बनाएं।",
          "Ek jaisa net worth hisaab banaayein.",
        ),
        [
          t(
            "Subtract debts from assets",
            "एसेट में से कर्ज़ घटाएं",
            "Asset mein se karz ghataayein",
          ),
          t("Choose one date", "एक तारीख़ चुनें", "Ek taareekh chunein"),
          t(
            "List current asset values and outstanding debts without duplicates",
            "आज की एसेट कीमत और बाकी कर्ज़ लिखें, दो बार न गिनें",
            "Aaj ki asset keemat aur baaki karz likhein, do baar na ginein",
          ),
          t(
            "Review changes later using the same method",
            "बाद में इसी तरीके से बदलाव चेक करें",
            "Baad mein isi tareeke se badlaav check karein",
          ),
        ],
        [1, 2, 0, 3],
        t(
          "A shared date and consistent method make comparisons more useful. The number is a planning tool, not a judgement of a person.",
          "एक तारीख़ और एक तरीके से तुलना आसान है। यह प्लान का टूल है, किसी इंसान का फैसला नहीं।",
          "Ek taareekh aur ek tareeke se tulna aasaan hai. Yeh plan ka tool hai, kisi insaan ka faisla nahin.",
        ),
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
];
