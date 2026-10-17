import { t, choice, numeric, order, document, bucket } from "./schema";
import type { Lesson } from "./schema";
const yesNo = [t("True", "सही", "Sahi"), t("False", "गलत", "Galat")];
const policy = [
  t(
    "Yearly premium · ₹6,000",
    "साल भर की कीमत (प्रीमियम) · ₹6,000",
    "Saal bhar ki keemat (premium) · ₹6,000",
  ),
  t(
    "Available cover · ₹1,00,000",
    "अभी बचा कवर · ₹1,00,000",
    "Abhi bacha cover · ₹1,00,000",
  ),
  t(
    "Your share of eligible costs (co-pay) · 20%",
    "कवर में आने वाले खर्च में आपका हिस्सा (को-पे) · 20%",
    "Cover mein aane waale kharch mein aapka hissa (co-pay) · 20%",
  ),
  t(
    "Cosmetic-only treatment · excluded in this example",
    "सिर्फ़ सुंदरता के लिए इलाज · इस example में कवर नहीं",
    "Sirf sundarta ke liye ilaaj · is example mein cover nahin",
  ),
];
const healthBill = [
  t(
    "Total hospital bill · ₹50,000",
    "अस्पताल का पूरा बिल · ₹50,000",
    "Aspataal ka poora bill · ₹50,000",
  ),
  t(
    "Costs eligible under this example · ₹40,000",
    "इस example में कवर वाले खर्च · ₹40,000",
    "Is example mein cover waale kharch · ₹40,000",
  ),
  t(
    "Costs outside cover · ₹10,000",
    "कवर के बाहर वाले खर्च · ₹10,000",
    "Cover ke baahar waale kharch · ₹10,000",
  ),
  t(
    "Your co-pay · 20% of eligible costs",
    "आपका को-पे · कवर वाले खर्च का 20%",
    "Aapka co-pay · cover waale kharch ka 20%",
  ),
];
const termCard = [
  t(
    "Type · pure term life cover",
    "किस तरह का प्लान · प्योर टर्म लाइफ़ कवर",
    "Kis tarah ka plan · pure term life cover",
  ),
  t(
    "Death cover · subject to policy terms",
    "मृत्यु पर कवर · पॉलिसी की शर्तों के हिसाब से",
    "Mrityu par cover · policy ki sharton ke hisaab se",
  ),
  t(
    "Payment at the end if the person covered survives · none in this example",
    "कवर का समय पूरा हुआ, व्यक्ति जीवित है · इस example में वापसी नहीं",
    "Cover ka samay poora hua, vyakti jeevit hai · is example mein waapsi nahin",
  ),
];
export const protectionLessons: Lesson[] = [
  {
    id: "insurance",
    chapter: "protection",
    skill: "S0.7.2",
    icon: "Umbrella",
    minutes: 7,
    title: t(
      "A safety net with conditions",
      "सुरक्षा भी, शर्तें भी",
      "Suraksha bhi, shartein bhi",
    ),
    subtitle: t(
      "Understand what insurance can and cannot do.",
      "इंश्योरेंस क्या करता है, क्या नहीं—आसानी से समझें।",
      "Insurance kya karta hai, kya nahin—aasaani se samjhein.",
    ),
    hook: t(
      "Priya has ₹20,000 saved. A sudden hospital bill could cost much more. Mia opens an umbrella: some large risks need another layer of protection.",
      "प्रिया के पास ₹20,000 बचत है। अचानक अस्पताल का बिल इससे बड़ा हो सकता है। मिया छतरी खोलती है: कुछ बड़े रिस्क के लिए बचत के साथ और सुरक्षा चाहिए।",
      "Priya ke paas ₹20,000 bachat hai. Achanak aspataal ka bill isse bada ho sakta hai. Mia chhatri kholti hai: kuch bade risk ke liye bachat ke saath aur suraksha chahiye.",
    ),
    idea: t(
      "You pay for insurance (a premium). The insurance company (insurer) agrees to cover specified losses under a contract (the policy). The policy sets what is covered, limits, conditions, and what is left out (exclusions). A claim is a request for payment; approval depends on those terms.",
      "इंश्योरेंस की कीमत (प्रीमियम) देकर आप तय रिस्क का कवर लेते हैं। लिखित समझौते (पॉलिसी) में कवर, लिमिट और शर्तें होती हैं। कुछ चीज़ें कवर नहीं होतीं (एक्सक्लूज़न)। पैसे माँगने की प्रक्रिया (क्लेम) में इन्हीं शर्तों के हिसाब से जाँच होती है।",
      "Insurance ki keemat (premium) dekar aap tay risk ka cover lete hain. Likhit samjhaute (policy) mein cover, limit aur shartein hoti hain. Kuch cheezein cover nahin hotin (exclusions). Paise maangne ki prakriya (claim) mein inhi sharton ke hisaab se jaanch hoti hai.",
    ),
    example: t(
      "Fictional cover: yearly premium ₹6,000, with ₹1,00,000 cover available. An eligible ₹40,000 bill with no co-pay, deductible or other limit would use ₹40,000 of that cover. The ₹6,000 price does not tell you what every claim will pay.",
      "सिर्फ़ example: साल का प्रीमियम ₹6,000 और अभी ₹1,00,000 कवर है। मान लें ₹40,000 का पूरा बिल शर्तों में आता है; को-पे, पहले खुद देने वाली रकम या दूसरी लिमिट नहीं है। कवर से ₹40,000 लगेंगे। सिर्फ़ ₹6,000 की कीमत देखकर हर क्लेम की रकम पता नहीं चलती।",
      "Sirf example: saal ka premium ₹6,000 aur abhi ₹1,00,000 cover hai. Maan lein ₹40,000 ka poora bill sharton mein aata hai; co-pay, pehle khud dene waali rakam ya doosri limit nahin hai. Cover se ₹40,000 lagenge. Sirf ₹6,000 ki keemat dekhkar har claim ki rakam pata nahin chalti.",
    ),
    mistake: t(
      "A cheap premium or a large headline cover does not guarantee every bill will be paid. Insurance also does not replace money for small urgent costs or costs outside cover.",
      "सस्ता प्रीमियम या बड़ा कवर दिखे, तो भी हर बिल पूरा मिलने की गारंटी नहीं। छोटे तुरंत वाले खर्च और कवर से बाहर के खर्च के लिए बचत भी चाहिए।",
      "Sasta premium ya bada cover dikhe, toh bhi har bill poora milne ki guarantee nahin. Chhote turant waale kharch aur cover se baahar ke kharch ke liye bachat bhi chahiye.",
    ),
    notes: [
      t(
        "Premium is the price; cover is protection under the policy’s conditions.",
        "प्रीमियम कीमत है; कवर शर्तों के साथ मिलने वाली सुरक्षा है।",
        "Premium keemat hai; cover sharton ke saath milne waali suraksha hai.",
      ),
      t(
        "Read exclusions, limits and the claim process before choosing a policy.",
        "चुनने से पहले क्या कवर नहीं है, कितनी लिमिट है और क्लेम कैसे करेंगे—पढ़ें।",
        "Chunne se pehle kya cover nahin hai, kitni limit hai aur claim kaise karenge—padhein.",
      ),
      t(
        "An emergency fund and insurance solve different parts of a money shock.",
        "इमरजेंसी फ़ंड और इंश्योरेंस, अचानक खर्च के अलग-अलग हिस्सों में मदद करते हैं।",
        "Emergency fund aur insurance, achanak kharch ke alag-alag hisson mein madad karte hain.",
      ),
    ],
    action: t(
      "Read a sample policy summary. Find the premium, cover, exclusions and claim contact. Do not share private health or account details.",
      "किसी sample पॉलिसी में प्रीमियम, कवर, बाहर रखी चीज़ें और क्लेम का नंबर खोजें। अपनी हेल्थ या खाते की निजी जानकारी शेयर न करें।",
      "Kisi sample policy mein premium, cover, baahar rakhi cheezein aur claim ka number khojein. Apni health ya khaate ki niji jaankaari share na karein.",
    ),
    exercises: [
      document(
        "insurance-1",
        t(
          "Which line shows what you pay each year?",
          "हर साल आपको कितने पैसे देने हैं, किस लाइन में है?",
          "Har saal aapko kitne paise dene hain, kis line mein hai?",
        ),
        t(
          "Fictional policy summary",
          "बनाई हुई पॉलिसी · सिर्फ़ सीखने के लिए",
          "Banayi hui policy · sirf seekhne ke liye",
        ),
        policy,
        0,
        t(
          "The premium is the price of cover. It is not the amount a claim will pay.",
          "प्रीमियम कवर की कीमत है। यह क्लेम में मिलने वाली रकम नहीं है।",
          "Premium cover ki keemat hai. Yeh claim mein milne waali rakam nahin hai.",
        ),
      ),
      numeric(
        "insurance-2",
        t(
          "A fictional yearly premium is ₹6,000. How much should you set aside each month for 12 months?",
          "सिर्फ़ example: साल का प्रीमियम ₹6,000। 12 महीने में जोड़ने के लिए हर महीने कितने रुपये बचाएं?",
          "Sirf example: saal ka premium ₹6,000. 12 mahine mein jodne ke liye har mahine kitne rupaye bachaayein?",
        ),
        500,
        t(
          "₹6,000 ÷ 12 = ₹500. This is a savings plan, not a claim that monthly payment is offered.",
          "₹6,000 ÷ 12 = ₹500। यह बचत का प्लान है; पॉलिसी में मासिक पेमेंट मिलेगा, ऐसा दावा नहीं।",
          "₹6,000 ÷ 12 = ₹500. Yeh bachat ka plan hai; policy mein maasik payment milega, aisa daava nahin.",
        ),
        { operation: "multiply", values: [6000, 1 / 12] },
      ),
      choice(
        "insurance-3",
        t(
          "A large cover amount guarantees that every hospital bill will be paid in full.",
          "कवर बड़ा है, तो अस्पताल का हर बिल पूरा मिलना पक्का है।",
          "Cover bada hai, toh aspataal ka har bill poora milna pakka hai.",
        ),
        yesNo,
        1,
        t(
          "Cover is subject to the policy’s conditions, eligible costs and limits.",
          "कवर में भी शर्तें, कौन से खर्च आएंगे और लिमिट देखनी है।",
          "Cover mein bhi shartein, kaun se kharch aayenge aur limit dekhni hai.",
        ),
      ),
      bucket(
        "insurance-4",
        t(
          "Match the role of each amount or document.",
          "हर चीज़ का सही काम चुनें।",
          "Har cheez ka sahi kaam chunein.",
        ),
        [
          t("Emergency savings", "इमरजेंसी बचत", "Emergency bachat"),
          t("Insurance policy", "इंश्योरेंस पॉलिसी", "Insurance policy"),
          t(
            "Money kept for an excluded expense",
            "कवर से बाहर के खर्च के लिए बचत",
            "Cover se baahar ke kharch ke liye bachat",
          ),
        ],
        [
          t(
            "Your own accessible money",
            "आपके अपने, काम आने वाले पैसे",
            "Aapke apne, kaam aane waale paise",
          ),
          t(
            "Cover under a contract",
            "समझौते की शर्तों वाला कवर",
            "Samjhaute ki sharton waala cover",
          ),
        ],
        [0, 1, 0],
        t(
          "Savings are your own money. Insurance is a contract for specified protection.",
          "बचत आपके पैसे हैं। इंश्योरेंस तय सुरक्षा का समझौता है।",
          "Bachat aapke paise hain. Insurance tay suraksha ka samjhauta hai.",
        ),
      ),
      document(
        "insurance-5",
        t(
          "Which line identifies something not covered in this example?",
          "इस example में क्या कवर नहीं है, किस लाइन में है?",
          "Is example mein kya cover nahin hai, kis line mein hai?",
        ),
        t(
          "Fictional policy summary",
          "बनाई हुई पॉलिसी · सिर्फ़ सीखने के लिए",
          "Banayi hui policy · sirf seekhne ke liye",
        ),
        policy,
        3,
        t(
          "An item left outside cover is an exclusion. Real policies may have different terms.",
          "कवर से बाहर रखी चीज़ को एक्सक्लूज़न कहते हैं। असली पॉलिसी के नियम अलग हो सकते हैं।",
          "Cover se baahar rakhi cheez ko exclusion kehte hain. Asli policy ke niyam alag ho sakte hain.",
        ),
      ),
      order(
        "insurance-6",
        t(
          "Put these steps in a useful order before buying.",
          "खरीदने से पहले सही क्रम बनाएं।",
          "Khareedne se pehle sahi kram banaayein.",
        ),
        [
          t(
            "Compare cover, limits and exclusions",
            "कवर, लिमिट और बाहर की चीज़ें मिलाएं",
            "Cover, limit aur baahar ki cheezein milaayein",
          ),
          t(
            "Identify the risk you need to cover",
            "पहले समझें किस रिस्क का कवर चाहिए",
            "Pehle samjhein kis risk ka cover chahiye",
          ),
          t(
            "Read the final policy and clarify questions",
            "आखिरी पॉलिसी पढ़ें और सवाल पूछें",
            "Aakhiri policy padhein aur sawaal poochhein",
          ),
        ],
        [1, 0, 2],
        t(
          "Start with your need, compare the conditions, and check the final contract.",
          "अपनी ज़रूरत से शुरू करें, शर्तें मिलाएं, फिर आखिरी समझौता चेक करें।",
          "Apni zaroorat se shuru karein, shartein milaayein, phir aakhiri samjhauta check karein.",
        ),
      ),
      numeric(
        "insurance-7",
        t(
          "An eligible claim uses ₹40,000 of a fictional ₹1,00,000 available cover. With no other adjustments or restoration, how much remains?",
          "सिर्फ़ example: ₹1,00,000 बचे कवर में से क्लेम में ₹40,000 लगे। कोई और बदलाव या कवर वापसी नहीं है। कितना कवर बचा?",
          "Sirf example: ₹1,00,000 bache cover mein se claim mein ₹40,000 lage. Koi aur badlaav ya cover waapsi nahin hai. Kitna cover bacha?",
        ),
        60000,
        t(
          "₹1,00,000 − ₹40,000 = ₹60,000. Real policies can have other rules.",
          "₹1,00,000 − ₹40,000 = ₹60,000। असली पॉलिसी में दूसरे नियम हो सकते हैं।",
          "₹1,00,000 − ₹40,000 = ₹60,000. Asli policy mein doosre niyam ho sakte hain.",
        ),
        { operation: "subtract", values: [100000, 40000] },
      ),
      choice(
        "insurance-8",
        t(
          "A seller promises every expense is covered. What should you check?",
          "बेचने वाला कहता है, हर खर्च कवर है। क्या चेक करें?",
          "Bechne waala kehta hai, har kharch cover hai. Kya check karein?",
        ),
        [
          t("Only the advertisement", "सिर्फ़ विज्ञापन", "Sirf vigyaapan"),
          t(
            "The written policy terms and official insurer contact",
            "लिखी हुई पॉलिसी और कंपनी का ऑफ़िशियल संपर्क",
            "Likhi hui policy aur company ka official sampark",
          ),
          t(
            "Whether the seller sounds confident",
            "बेचने वाले का आत्मविश्वास",
            "Bechne waale ka aatmavishwaas",
          ),
        ],
        1,
        t(
          "Read the contract and clarify promises through the insurer’s official channels.",
          "समझौता पढ़ें और कंपनी के ऑफ़िशियल तरीके से वादे चेक करें।",
          "Samjhauta padhein aur company ke official tareeke se vaade check karein.",
        ),
      ),
    ],
    sources: ["https://irdai.gov.in/"],
    reviewStatus: "editorial-draft",
  },
  {
    id: "health-cover",
    chapter: "protection",
    skill: "S0.7.3",
    icon: "Heart",
    minutes: 8,
    title: t(
      "Who pays which part?",
      "बिल का कौन सा हिस्सा आपका?",
      "Bill ka kaun sa hissa aapka?",
    ),
    subtitle: t(
      "Read health-cover conditions before a hospital visit.",
      "अस्पताल जाने से पहले हेल्थ कवर की शर्तें समझें।",
      "Aspataal jaane se pehle health cover ki shartein samjhein.",
    ),
    hook: t(
      "Sunita sees ₹1 lakh of health cover and a ₹50,000 bill. Does that mean she pays nothing? Mia asks her to open the policy, not just look at its cover amount.",
      "सुनीता के पास ₹1 लाख हेल्थ कवर है। अस्पताल का बिल ₹50,000 है। क्या उसे कुछ नहीं देना होगा? मिया कहती है: सिर्फ़ कवर की रकम नहीं, पॉलिसी भी खोलें।",
      "Sunita ke paas ₹1 lakh health cover hai. Aspataal ka bill ₹50,000 hai. Kya use kuch nahin dena hoga? Mia kehti hai: sirf cover ki rakam nahin, policy bhi kholein.",
    ),
    idea: t(
      "A policy may cover only certain costs (eligible costs). It may require a percentage from you (co-pay), an amount you pay first (deductible), or a limit for a particular expense (sub-limit). Some cover starts only after a stated time (waiting period). Check the actual wording and how these conditions work together.",
      "पॉलिसी कुछ तय खर्च ही मान सकती है (eligible costs)। उनमें से एक प्रतिशत आपको देना हो सकता है (को-पे)। कुछ रकम पहले खुद देनी पड़ सकती है (डिडक्टिबल)। किसी खास खर्च की छोटी लिमिट भी हो सकती है (सब-लिमिट)। कुछ कवर समय बीतने पर शुरू होते हैं (वेटिंग पीरियड)। असली शर्तें और उनका आपस का हिसाब पढ़ें।",
      "Policy kuch tay kharch hi maan sakti hai (eligible costs). Unmein se ek pratishat aapko dena ho sakta hai (co-pay). Kuch rakam pehle khud deni pad sakti hai (deductible). Kisi khaas kharch ki chhoti limit bhi ho sakti hai (sub-limit). Kuch cover samay beetne par shuru hote hain (waiting period). Asli shartein aur unka aapas ka hisaab padhein.",
    ),
    example: t(
      "Fictional bill ₹50,000: ₹40,000 is eligible and ₹10,000 is outside cover. With a 20% co-pay, your share of eligible costs is ₹8,000. Total from you: ₹10,000 + ₹8,000 = ₹18,000. Insurer share: ₹32,000. Assume enough cover, no deductible and no other limit.",
      "बनाया हुआ बिल ₹50,000: ₹40,000 कवर में है, ₹10,000 बाहर है। को-पे 20% है, तो कवर वाले खर्च में आपका हिस्सा ₹8,000। कुल आपको ₹10,000 + ₹8,000 = ₹18,000 देने हैं। कंपनी का हिस्सा ₹32,000। मान लें कवर काफ़ी है, डिडक्टिबल और दूसरी लिमिट नहीं है।",
      "Banaya hua bill ₹50,000: ₹40,000 cover mein hai, ₹10,000 baahar hai. Co-pay 20% hai, toh cover waale kharch mein aapka hissa ₹8,000. Kul aapko ₹10,000 + ₹8,000 = ₹18,000 dene hain. Company ka hissa ₹32,000. Maan lein cover kaafi hai, deductible aur doosri limit nahin hai.",
    ),
    mistake: t(
      "Cashless treatment is a way to settle approved covered costs directly. It does not mean every charge is covered or that approval is automatic. Check hospital arrangements, approval and any amount you must pay.",
      "कैशलेस में मंज़ूर हुए कवर वाले खर्च कंपनी सीधे निपटा सकती है। इसका मतलब हर चार्ज कवर होना या मंज़ूरी पक्की होना नहीं। अस्पताल की व्यवस्था, मंज़ूरी और अपना हिस्सा चेक करें।",
      "Cashless mein manzoor hue cover waale kharch company seedhe nipta sakti hai. Iska matlab har charge cover hona ya manzoori pakki hona nahin. Aspataal ki vyavastha, manzoori aur apna hissa check karein.",
    ),
    notes: [
      t(
        "Cover amount, eligible costs and your payment share are different numbers.",
        "कवर की रकम, माने गए खर्च और आपका हिस्सा—तीन अलग हिसाब हैं।",
        "Cover ki rakam, maane gaye kharch aur aapka hissa—teen alag hisaab hain.",
      ),
      t(
        "A waiting period is not the same as an exclusion; read the exact conditions.",
        "वेटिंग पीरियड और एक्सक्लूज़न अलग हैं। असली शर्तें पढ़ें।",
        "Waiting period aur exclusion alag hain. Asli shartein padhein.",
      ),
      t(
        "Keep bills and approvals; ask for an item-by-item claim explanation.",
        "बिल और मंज़ूरी सँभालें। क्लेम में हर खर्च का हिसाब माँगें।",
        "Bill aur manzoori sambhaalein. Claim mein har kharch ka hisaab maangein.",
      ),
    ],
    action: t(
      "On a sample health policy, locate co-pay, deductible, waiting periods and claim contacts. Ask the insurer to explain anything unclear before relying on the cover.",
      "sample हेल्थ पॉलिसी में को-पे, डिडक्टिबल, वेटिंग पीरियड और क्लेम का संपर्क खोजें। कवर पर भरोसा करने से पहले जो समझ न आए, कंपनी से पूछें।",
      "Sample health policy mein co-pay, deductible, waiting period aur claim ka sampark khojein. Cover par bharosa karne se pehle jo samajh na aaye, company se poochhein.",
    ),
    exercises: [
      document(
        "health-cover-1",
        t(
          "Which line shows costs that this example does not cover?",
          "इस example में कवर से बाहर का खर्च किस लाइन में है?",
          "Is example mein cover se baahar ka kharch kis line mein hai?",
        ),
        t(
          "Fictional hospital bill",
          "बनाया हुआ अस्पताल का बिल",
          "Banaya hua aspataal ka bill",
        ),
        healthBill,
        2,
        t(
          "₹10,000 is outside cover and must be paid by the patient in this example.",
          "इस example में ₹10,000 कवर से बाहर है; मरीज़ को देने हैं।",
          "Is example mein ₹10,000 cover se baahar hai; mareez ko dene hain.",
        ),
      ),
      numeric(
        "health-cover-2",
        t(
          "Eligible costs are ₹40,000. Your co-pay is 20%. What is your share of eligible costs only?",
          "कवर वाले खर्च ₹40,000 हैं। को-पे 20% है। सिर्फ़ इन खर्चों में आपका हिस्सा कितने रुपये?",
          "Cover waale kharch ₹40,000 hain. Co-pay 20% hai. Sirf in kharchon mein aapka hissa kitne rupaye?",
        ),
        8000,
        t(
          "₹40,000 × 0.20 = ₹8,000. Excluded costs are separate.",
          "₹40,000 × 0.20 = ₹8,000। कवर के बाहर का खर्च अलग है।",
          "₹40,000 × 0.20 = ₹8,000. Cover ke baahar ka kharch alag hai.",
        ),
        { operation: "multiply", values: [40000, 0.2] },
      ),
      numeric(
        "health-cover-3",
        t(
          "The total bill is ₹50,000 and the insurer pays ₹32,000. With no other payer, how much must you pay?",
          "पूरा बिल ₹50,000 है। कंपनी ₹32,000 देती है। कोई और पेमेंट नहीं करता। आपको कितने रुपये देने हैं?",
          "Poora bill ₹50,000 hai. Company ₹32,000 deti hai. Koi aur payment nahin karta. Aapko kitne rupaye dene hain?",
        ),
        18000,
        t(
          "₹50,000 − ₹32,000 = ₹18,000. That includes ₹10,000 outside cover and ₹8,000 co-pay.",
          "₹50,000 − ₹32,000 = ₹18,000। इसमें ₹10,000 कवर के बाहर और ₹8,000 को-पे है।",
          "₹50,000 − ₹32,000 = ₹18,000. Ismein ₹10,000 cover ke baahar aur ₹8,000 co-pay hai.",
        ),
        { operation: "subtract", values: [50000, 32000] },
      ),
      choice(
        "health-cover-4",
        t(
          "Cashless approval means every charge will always be paid by the insurer.",
          "कैशलेस मंज़ूरी का मतलब कंपनी हर चार्ज हमेशा देगी।",
          "Cashless manzoori ka matlab company har charge hamesha degi.",
        ),
        yesNo,
        1,
        t(
          "You may still owe excluded costs, co-pay or other amounts under the terms.",
          "शर्तों के हिसाब से कवर के बाहर का खर्च, को-पे या दूसरी रकम आपको देनी पड़ सकती है।",
          "Sharton ke hisaab se cover ke baahar ka kharch, co-pay ya doosri rakam aapko deni pad sakti hai.",
        ),
      ),
      bucket(
        "health-cover-5",
        t(
          "Separate a percentage share from a fixed amount paid first.",
          "प्रतिशत वाला हिस्सा और पहले देने वाली तय रकम अलग करें।",
          "Pratishat waala hissa aur pehle dene waali tay rakam alag karein.",
        ),
        [
          t(
            "You pay 10% of eligible costs",
            "आप कवर वाले खर्च का 10% देते हैं",
            "Aap cover waale kharch ka 10% dete hain",
          ),
          t(
            "You pay the first ₹5,000 under the example’s terms",
            "example की शर्तों में पहले ₹5,000 आप देते हैं",
            "Example ki sharton mein pehle ₹5,000 aap dete hain",
          ),
          t(
            "You pay 20% of eligible costs",
            "आप कवर वाले खर्च का 20% देते हैं",
            "Aap cover waale kharch ka 20% dete hain",
          ),
        ],
        [
          t(
            "Percentage share (co-pay)",
            "प्रतिशत वाला हिस्सा (को-पे)",
            "Pratishat waala hissa (co-pay)",
          ),
          t(
            "Fixed amount first (deductible)",
            "पहले तय रकम (डिडक्टिबल)",
            "Pehle tay rakam (deductible)",
          ),
        ],
        [0, 1, 0],
        t(
          "A co-pay is a share. A deductible is an amount borne first under the policy’s rules; check its period and application.",
          "को-पे एक हिस्सा है। डिडक्टिबल शर्तों के हिसाब से पहले खुद दी जाने वाली रकम है। कब और कैसे लगेगा, पॉलिसी में देखें।",
          "Co-pay ek hissa hai. Deductible sharton ke hisaab se pehle khud di jaane waali rakam hai. Kab aur kaise lagega, policy mein dekhein.",
        ),
      ),
      choice(
        "health-cover-6",
        t(
          "A condition has a waiting period. What should you do?",
          "किसी कवर पर वेटिंग पीरियड है। क्या करें?",
          "Kisi cover par waiting period hai. Kya karein?",
        ),
        [
          t(
            "Assume it is covered from the first day",
            "पहले दिन से कवर मान लें",
            "Pehle din se cover maan lein",
          ),
          t(
            "Check the exact period, exceptions and start date in the policy",
            "असली अवधि, छूट और शुरू की तारीख पॉलिसी में देखें",
            "Asli avadhi, chhoot aur shuru ki taareekh policy mein dekhein",
          ),
          t(
            "Use a friend’s policy rules",
            "दोस्त की पॉलिसी के नियम मानें",
            "Dost ki policy ke niyam maanein",
          ),
        ],
        1,
        t(
          "Waiting periods and exceptions depend on the policy and applicable rules. No universal duration is assumed here.",
          "अवधि और छूट पॉलिसी और लागू नियमों पर हैं। यहाँ सबके लिए एक अवधि नहीं मानी है।",
          "Avadhi aur chhoot policy aur laagoo niyamon par hain. Yahaan sabke liye ek avadhi nahin maani hai.",
        ),
      ),
      order(
        "health-cover-7",
        t(
          "Order the steps for understanding a planned hospital bill.",
          "प्लान किए हुए इलाज का बिल समझने का सही क्रम चुनें।",
          "Plan kiye hue ilaaj ka bill samajhne ka sahi kram chunein.",
        ),
        [
          t(
            "Compare the final bill with the approval and ask about differences",
            "आखिरी बिल मंज़ूरी से मिलाएं और फ़र्क पूछें",
            "Aakhiri bill manzoori se milaayein aur fark poochhein",
          ),
          t(
            "Read cover terms and confirm hospital arrangements",
            "कवर की शर्तें और अस्पताल की व्यवस्था चेक करें",
            "Cover ki shartein aur aspataal ki vyavastha check karein",
          ),
          t(
            "Seek the required approval and understand your expected share",
            "ज़रूरी मंज़ूरी लें और अपना अनुमानित हिस्सा समझें",
            "Zaroori manzoori lein aur apna anumaanit hissa samjhein",
          ),
        ],
        [1, 2, 0],
        t(
          "For planned care, clarify terms and arrangements, seek approval, then check the final bill. Emergencies need timely medical care.",
          "प्लान वाले इलाज में पहले शर्तें और व्यवस्था समझें, मंज़ूरी लें, फिर आखिरी बिल मिलाएं। इमरजेंसी में समय पर इलाज ज़रूरी है।",
          "Plan waale ilaaj mein pehle shartein aur vyavastha samjhein, manzoori lein, phir aakhiri bill milaayein. Emergency mein samay par ilaaj zaroori hai.",
        ),
      ),
      numeric(
        "health-cover-8",
        t(
          "An eligible ₹40,000 bill has no co-pay, deductible or other limit. Only ₹30,000 cover remains. What is the insurer share in this example?",
          "₹40,000 के सभी खर्च कवर वाले हैं। को-पे, डिडक्टिबल या दूसरी लिमिट नहीं। सिर्फ़ ₹30,000 कवर बचा है। इस example में कंपनी का हिस्सा कितना?",
          "₹40,000 ke sabhi kharch cover waale hain. Co-pay, deductible ya doosri limit nahin. Sirf ₹30,000 cover bacha hai. Is example mein company ka hissa kitna?",
        ),
        30000,
        t(
          "The available cover limits payment to ₹30,000. The remaining ₹10,000 is yours to pay here.",
          "बचे कवर के कारण ₹30,000 ही मिलते हैं। इस example में बाकी ₹10,000 आपको देने हैं।",
          "Bache cover ke kaaran ₹30,000 hi milte hain. Is example mein baaki ₹10,000 aapko dene hain.",
        ),
        { operation: "min", values: [40000, 30000] },
      ),
    ],
    sources: ["https://irdai.gov.in/"],
    reviewStatus: "editorial-draft",
  },
  {
    id: "term-cover",
    chapter: "protection",
    skill: "S0.7.4",
    icon: "ShieldCheck",
    minutes: 7,
    title: t(
      "Who relies on your income?",
      "आपकी कमाई पर कौन निर्भर है?",
      "Aapki kamaai par kaun nirbhar hai?",
    ),
    subtitle: t(
      "Start life-cover planning with people and commitments.",
      "लाइफ़ कवर का प्लान परिवार और ज़िम्मेदारियों से शुरू करें।",
      "Life cover ka plan parivaar aur zimmedaariyon se shuru karein.",
    ),
    hook: t(
      "Aman helps pay his parents’ bills. If his income stopped because he died, which costs would remain? Mia starts with the people who rely on him, not a sales slogan.",
      "अमन माता-पिता के बिल में मदद करता है। उसकी मृत्यु हो जाए तो कमाई रुक जाएगी, पर कौन से खर्च रहेंगे? मिया सबसे पहले उन लोगों को देखती है, जो उसकी कमाई पर निर्भर हैं।",
      "Aman maata-pita ke bill mein madad karta hai. Uski mrityu ho jaaye toh kamaai ruk jaayegi, par kaun se kharch rahenge? Mia sabse pehle un logon ko dekhti hai, jo uski kamaai par nirbhar hain.",
    ),
    idea: t(
      "Life cover can provide a payment after the person covered dies, subject to the policy. Cover for a fixed period (term insurance) focuses on this risk. A pure term policy generally has no payment simply for surviving to the end (maturity benefit). Check the exact product, exclusions and conditions.",
      "लाइफ़ कवर में जिसका कवर है, उसकी मृत्यु पर पॉलिसी की शर्तों के हिसाब से रकम मिल सकती है। तय अवधि वाला कवर (टर्म इंश्योरेंस) इसी रिस्क पर ध्यान देता है। प्योर टर्म में आम तौर पर अवधि पूरी होने पर जीवित रहने की रकम (मैच्योरिटी बेनिफ़िट) नहीं मिलती। असली प्लान, बाहर की चीज़ें और शर्तें पढ़ें।",
      "Life cover mein jiska cover hai, uski mrityu par policy ki sharton ke hisaab se rakam mil sakti hai. Tay avadhi waala cover (term insurance) isi risk par dhyaan deta hai. Pure term mein aam taur par avadhi poori hone par jeevit rehne ki rakam (maturity benefit) nahin milti. Asli plan, baahar ki cheezein aur shartein padhein.",
    ),
    example: t(
      "A simplified planning example: ₹30,000 monthly family costs × 12 × 5 years = ₹18 lakh. Add ₹2 lakh of debt and subtract ₹3 lakh of usable savings: ₹17 lakh gap. This ignores inflation, investment growth, other income, existing cover and different family needs. It is not a recommended cover amount.",
      "सिर्फ़ आसान planning example: परिवार के महीने के खर्च ₹30,000 × 12 × 5 साल = ₹18 लाख। ₹2 लाख कर्ज़ जोड़ें, काम आ सकने वाली ₹3 लाख बचत घटाएं: ₹17 लाख का गैप। इसमें महँगाई, ग्रोथ, दूसरी कमाई, पहले का कवर और अलग ज़रूरतें नहीं जोड़ी हैं। यह सुझाया हुआ कवर नहीं है।",
      "Sirf aasaan planning example: parivaar ke mahine ke kharch ₹30,000 × 12 × 5 saal = ₹18 lakh. ₹2 lakh karz jodein, kaam aa sakne waali ₹3 lakh bachat ghataayein: ₹17 lakh ka gap. Ismein mehngaai, growth, doosri kamaai, pehle ka cover aur alag zarooratein nahin jodi hain. Yeh sujhaaya hua cover nahin hai.",
    ),
    mistake: t(
      "A salary multiple or a friend’s cover amount is not a full needs assessment. Paying for protection without a maturity payout does not by itself make the protection useless.",
      "सैलरी का एक गुणा या दोस्त का कवर देखकर अपना पूरा प्लान नहीं बनता। अंत में रकम वापस न आए, तो भी उस दौरान मिला कवर बेकार नहीं था।",
      "Salary ka ek guna ya dost ka cover dekhkar apna poora plan nahin banta. Ant mein rakam waapas na aaye, toh bhi us dauraan mila cover bekaar nahin tha.",
    ),
    notes: [
      t(
        "Start with people who rely on your income and the costs that would remain.",
        "पहले देखें आपकी कमाई पर कौन निर्भर है और कौन से खर्च रहेंगे।",
        "Pehle dekhein aapki kamaai par kaun nirbhar hai aur kaun se kharch rahenge.",
      ),
      t(
        "Check policy duration, exclusions, truthful disclosures and payment conditions.",
        "कवर की अवधि, बाहर की चीज़ें, सही जानकारी देना और पेमेंट की शर्तें चेक करें।",
        "Cover ki avadhi, baahar ki cheezein, sahi jaankaari dena aur payment ki shartein check karein.",
      ),
      t(
        "Keep policy information reachable for the people who may need to claim.",
        "जिन्हें क्लेम करना पड़ सकता है, उन्हें पॉलिसी की जानकारी मिल सके।",
        "Jinhein claim karna pad sakta hai, unhein policy ki jaankaari mil sake.",
      ),
    ],
    action: t(
      "Privately list people who rely on your income, essential costs, debts and resources. Use this to prepare questions for a suitable professional; do not buy from a single calculator result.",
      "निजी तौर पर लिखें: आप पर निर्भर लोग, ज़रूरी खर्च, कर्ज़ और काम आ सकने वाले पैसे। इससे जानकार से पूछने के सवाल बनाएं। सिर्फ़ कैलकुलेटर का एक नंबर देखकर न खरीदें।",
      "Niji taur par likhein: aap par nirbhar log, zaroori kharch, karz aur kaam aa sakne waale paise. Isse jaankaar se poochhne ke sawaal banaayein. Sirf calculator ka ek number dekhkar na khareedein.",
    ),
    exercises: [
      choice(
        "term-cover-1",
        t(
          "What is a useful starting question for life-cover planning?",
          "लाइफ़ कवर का प्लान किस सवाल से शुरू करें?",
          "Life cover ka plan kis sawaal se shuru karein?",
        ),
        [
          t(
            "Who relies on my income, and what costs would remain?",
            "मेरी कमाई पर कौन निर्भर है और कौन से खर्च रहेंगे?",
            "Meri kamaai par kaun nirbhar hai aur kaun se kharch rahenge?",
          ),
          t(
            "Which advertisement is most popular?",
            "कौन सा विज्ञापन सबसे मशहूर है?",
            "Kaun sa vigyaapan sabse mashhoor hai?",
          ),
          t(
            "What did my friend buy?",
            "दोस्त ने क्या खरीदा?",
            "Dost ne kya khareeda?",
          ),
        ],
        0,
        t(
          "Needs, commitments and resources come before a product comparison.",
          "प्लान की तुलना से पहले ज़रूरतें, ज़िम्मेदारियाँ और अपने साधन देखें।",
          "Plan ki tulna se pehle zarooratein, zimmedaariyaan aur apne saadhan dekhein.",
        ),
      ),
      document(
        "term-cover-2",
        t(
          "Which line answers whether this pure term example pays for survival to the end?",
          "अवधि पूरी होने पर जीवित रहने की रकम मिलेगी या नहीं, किस लाइन में है?",
          "Avadhi poori hone par jeevit rehne ki rakam milegi ya nahin, kis line mein hai?",
        ),
        t(
          "Fictional pure term summary",
          "बनाया हुआ प्योर टर्म प्लान",
          "Banaya hua pure term plan",
        ),
        termCard,
        2,
        t(
          "This example has no maturity benefit. Other product types can have different features and costs.",
          "इस example में मैच्योरिटी बेनिफ़िट नहीं है। दूसरे तरह के प्लान की सुविधाएँ और कीमत अलग हो सकती हैं।",
          "Is example mein maturity benefit nahin hai. Doosre tarah ke plan ki suvidhaayein aur keemat alag ho sakti hain.",
        ),
      ),
      numeric(
        "term-cover-3",
        t(
          "Family costs are ₹30,000 a month. With no price changes, how much is one year of costs?",
          "परिवार के खर्च महीने के ₹30,000 हैं। दाम न बदलें तो एक साल में कितने रुपये?",
          "Parivaar ke kharch mahine ke ₹30,000 hain. Daam na badlein toh ek saal mein kitne rupaye?",
        ),
        360000,
        t(
          "₹30,000 × 12 = ₹3,60,000. This is a cost estimate, not a cover recommendation.",
          "₹30,000 × 12 = ₹3,60,000। यह खर्च का हिसाब है, सुझाया हुआ कवर नहीं।",
          "₹30,000 × 12 = ₹3,60,000. Yeh kharch ka hisaab hai, sujhaaya hua cover nahin.",
        ),
        { operation: "multiply", values: [30000, 12] },
      ),
      numeric(
        "term-cover-4",
        t(
          "A fictional plan needs ₹18 lakh for costs plus ₹2 lakh for debt. It has ₹3 lakh in usable savings. What is the simplified gap, in rupees?",
          "बनाए हुए example में खर्च के ₹18 लाख और कर्ज़ के ₹2 लाख चाहिए। काम आने वाली बचत ₹3 लाख है। आसान हिसाब में गैप कितने रुपये?",
          "Banaye hue example mein kharch ke ₹18 lakh aur karz ke ₹2 lakh chahiye. Kaam aane waali bachat ₹3 lakh hai. Aasaan hisaab mein gap kitne rupaye?",
        ),
        1700000,
        t(
          "₹18,00,000 + ₹2,00,000 − ₹3,00,000 = ₹17,00,000. The example leaves out many real planning factors.",
          "₹18,00,000 + ₹2,00,000 − ₹3,00,000 = ₹17,00,000। असली प्लान की कई बातें इस example में शामिल नहीं हैं।",
          "₹18,00,000 + ₹2,00,000 − ₹3,00,000 = ₹17,00,000. Asli plan ki kai baatein is example mein shaamil nahin hain.",
        ),
        { operation: "subtract", values: [1800000, -200000, 300000] },
      ),
      choice(
        "term-cover-5",
        t(
          "Every person needs the same cover amount regardless of dependants or savings.",
          "परिवार की निर्भरता और बचत चाहे जैसी हो, सबको एक जैसा कवर चाहिए।",
          "Parivaar ki nirbharta aur bachat chaahe jaisi ho, sabko ek jaisa cover chahiye.",
        ),
        yesNo,
        1,
        t(
          "People’s needs and resources differ. A fixed salary multiple alone cannot capture them all.",
          "हर किसी की ज़रूरतें और साधन अलग हैं। सिर्फ़ सैलरी का तय गुणा पूरा हिसाब नहीं है।",
          "Har kisi ki zarooratein aur saadhan alag hain. Sirf salary ka tay guna poora hisaab nahin hai.",
        ),
      ),
      bucket(
        "term-cover-6",
        t(
          "Separate a cost to plan for from money available to help meet it.",
          "किस खर्च की तैयारी करनी है और कौन से पैसे मदद करेंगे—अलग करें।",
          "Kis kharch ki taiyaari karni hai aur kaun se paise madad karenge—alag karein.",
        ),
        [
          t(
            "Essential family spending",
            "परिवार के ज़रूरी खर्च",
            "Parivaar ke zaroori kharch",
          ),
          t(
            "Usable savings",
            "काम आ सकने वाली बचत",
            "Kaam aa sakne waali bachat",
          ),
          t(
            "Debt that must still be repaid",
            "वह कर्ज़ जो अब भी चुकाना है",
            "Woh karz jo ab bhi chukaana hai",
          ),
        ],
        [
          t(
            "Need or commitment",
            "ज़रूरत या ज़िम्मेदारी",
            "Zaroorat ya zimmedaari",
          ),
          t(
            "Available resource",
            "काम आने वाला साधन",
            "Kaam aane waala saadhan",
          ),
        ],
        [0, 1, 0],
        t(
          "Costs and debts create needs. Usable savings can help meet those needs; do not count the same resource twice.",
          "खर्च और कर्ज़ के लिए पैसे चाहिए। काम आने वाली बचत मदद कर सकती है। एक ही रकम दो बार न गिनें।",
          "Kharch aur karz ke liye paise chahiye. Kaam aane waali bachat madad kar sakti hai. Ek hi rakam do baar na ginein.",
        ),
      ),
      order(
        "term-cover-7",
        t(
          "Put life-cover planning steps in order.",
          "लाइफ़ कवर की तैयारी का सही क्रम चुनें।",
          "Life cover ki taiyaari ka sahi kram chunein.",
        ),
        [
          t(
            "Compare suitable policy terms and clarify what is covered",
            "सही पॉलिसी की शर्तें मिलाएं और कवर समझें",
            "Sahi policy ki shartein milaayein aur cover samjhein",
          ),
          t(
            "List dependants, needs and usable resources",
            "निर्भर लोग, ज़रूरतें और काम आने वाले पैसे लिखें",
            "Nirbhar log, zarooratein aur kaam aane waale paise likhein",
          ),
          t(
            "Keep records accessible and review when life changes",
            "रिकॉर्ड मिल सकें और लाइफ़ बदले तो प्लान चेक करें",
            "Record mil sakein aur life badle toh plan check karein",
          ),
        ],
        [1, 0, 2],
        t(
          "Begin with needs, read the contract, then keep it usable and review changes.",
          "पहले ज़रूरतें, फिर समझौता पढ़ें। रिकॉर्ड काम आ सकें और बदलाव पर फिर चेक करें।",
          "Pehle zarooratein, phir samjhauta padhein. Record kaam aa sakein aur badlaav par phir check karein.",
        ),
      ),
      choice(
        "term-cover-8",
        t(
          "A proposal asks about health and other cover. What is the useful next step?",
          "फ़ॉर्म में हेल्थ और दूसरे कवर की जानकारी पूछी है। क्या करें?",
          "Form mein health aur doosre cover ki jaankaari poochhi hai. Kya karein?",
        ),
        [
          t(
            "Let the seller guess",
            "बेचने वाले को अंदाज़ा लगाने दें",
            "Bechne waale ko andaaza lagaane dein",
          ),
          t(
            "Hide details to lower the quoted price",
            "कीमत घटाने के लिए बातें छिपाएं",
            "Keemat ghataane ke liye baatein chhipaayein",
          ),
          t(
            "Answer accurately, clarify unclear questions and keep a copy",
            "सही जवाब दें, सवाल साफ़ करवाएं और कॉपी रखें",
            "Sahi jawaab dein, sawaal saaf karvaayein aur copy rakhein",
          ),
        ],
        2,
        t(
          "Accurate disclosures matter. Read what is submitted in your name and keep records.",
          "सही जानकारी देना ज़रूरी है। आपके नाम से क्या जमा हो रहा है, पढ़ें और रिकॉर्ड रखें।",
          "Sahi jaankaari dena zaroori hai. Aapke naam se kya jama ho raha hai, padhein aur record rakhein.",
        ),
      ),
    ],
    sources: ["https://irdai.gov.in/"],
    reviewStatus: "editorial-draft",
  },
];
