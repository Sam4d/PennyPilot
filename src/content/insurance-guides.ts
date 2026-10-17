import { t } from "./schema";
import type { Text } from "./schema";
export type InsuranceGuide = {
  id: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  title: Text;
  summary: Text;
  skills: string[];
  sections: { title: Text; body: Text }[];
  example: Text;
  checklist: Text[];
  sources: string[];
  reviewStatus: "editorial-draft";
};
const sources = ["https://irdai.gov.in/"];
export const insuranceGuides: InsuranceGuide[] = [
  {
    id: "why-insurance",
    level: "Beginner",
    skills: ["S12.1.1", "S12.1.2", "S12.1.5"],
    title: t(
      "Why insurance matters",
      "इंश्योरेंस क्यों ज़रूरी है?",
      "Insurance kyon zaroori hai?",
    ),
    summary: t(
      "Protect a financial plan from losses too large to absorb comfortably.",
      "इतने बड़े नुकसान की तैयारी, जिसे अकेली बचत से सँभालना मुश्किल हो।",
      "Itne bade nuksaan ki taiyaari, jise akeli bachat se sambhaalna mushkil ho.",
    ),
    sections: [
      {
        title: t(
          "Transfer a risk, keep a plan",
          "रिस्क का हिस्सा बाँटें, प्लान बचाएं",
          "Risk ka hissa baantein, plan bachaayein",
        ),
        body: t(
          "Insurance moves specified financial risks to an insurance company under a contract (policy). You pay a price (premium); the company pays eligible claims under the terms. The benefit is protection from a large covered loss, not a promise that you will receive more money than you pay. Read what event triggers payment, who is covered and what is excluded.",
          "पॉलिसी के लिखित समझौते में तय पैसों वाले रिस्क का हिस्सा कंपनी लेती है। आप कीमत (प्रीमियम) देते हैं। शर्तें पूरी हों तो कंपनी क्लेम का पेमेंट करती है। फायदा बड़े कवर वाले नुकसान से सुरक्षा है; दिए पैसों से ज़्यादा वापस मिलने का वादा नहीं। किस घटना पर पेमेंट होगा, किसका कवर है और क्या बाहर है—पढ़ें।",
          "Policy ke likhit samjhaute mein tay paison waale risk ka hissa company leti hai. Aap keemat (premium) dete hain. Shartein poori hon toh company claim ka payment karti hai. Faayda bade cover waale nuksaan se suraksha hai; diye paison se zyada waapas milne ka vaada nahin. Kis ghatna par payment hoga, kiska cover hai aur kya baahar hai—padhein.",
        ),
      },
      {
        title: t(
          "Savings and cover work together",
          "बचत और कवर साथ काम करते हैं",
          "Bachat aur cover saath kaam karte hain",
        ),
        body: t(
          "Emergency savings meet urgent cash needs, excluded costs and your share of a claim. Insurance may protect against a much larger eligible cost. Neither replaces the other. For frequent small costs, planning and savings may be practical; for rare severe losses, explore suitable cover. Affordability and the actual contract matter.",
          "इमरजेंसी बचत तुरंत वाले खर्च, कवर से बाहर की चीज़ें और क्लेम में आपका हिस्सा सँभालती है। इंश्योरेंस बड़े माने गए खर्च में मदद कर सकता है। दोनों का काम अलग है। बार-बार के छोटे खर्च के लिए बजट और बचत काम आ सकते हैं। कम बार होने वाले बड़े नुकसान के लिए सही कवर देखें। कीमत दे पाना और असली समझौता दोनों ज़रूरी हैं।",
          "Emergency bachat turant waale kharch, cover se baahar ki cheezein aur claim mein aapka hissa sambhaalti hai. Insurance bade maane gaye kharch mein madad kar sakta hai. Dono ka kaam alag hai. Baar-baar ke chhote kharch ke liye budget aur bachat kaam aa sakte hain. Kam baar hone waale bade nuksaan ke liye sahi cover dekhein. Keemat de paana aur asli samjhauta dono zaroori hain.",
        ),
      },
      {
        title: t(
          "Match the benefit to the loss",
          "नुकसान के हिसाब से फायदा देखें",
          "Nuksaan ke hisaab se faayda dekhein",
        ),
        body: t(
          "Life cover can support people who rely on your income after a covered death. Health cover may pay eligible medical costs. Disability, property and liability cover address different losses. Some policies reimburse eligible costs (indemnity); others pay a fixed amount when a defined event occurs (benefit cover). A health bill and a fixed illness payment are different promises.",
          "मृत्यु के बाद आप पर निर्भर लोगों को लाइफ़ कवर मदद दे सकता है। हेल्थ कवर तय इलाज के खर्च दे सकता है। काम न कर पाना, प्रॉपर्टी का नुकसान और दूसरों की देनदारी अलग रिस्क हैं। कुछ प्लान माने गए खर्च लौटाते हैं (इंडेम्निटी), कुछ तय घटना पर तय रकम देते हैं (बेनेफ़िट कवर)। अस्पताल का बिल और बीमारी पर तय रकम अलग वादे हैं।",
          "Mrityu ke baad aap par nirbhar logon ko life cover madad de sakta hai. Health cover tay ilaaj ke kharch de sakta hai. Kaam na kar paana, property ka nuksaan aur doosron ki dendaari alag risk hain. Kuch plan maane gaye kharch lautaate hain (indemnity), kuch tay ghatna par tay rakam dete hain (benefit cover). Aspataal ka bill aur beemaari par tay rakam alag vaade hain.",
        ),
      },
    ],
    example: t(
      "Fictional example: savings ₹30,000, eligible medical bill ₹2 lakh. A policy might cover much of the eligible bill under its terms, while savings meet your share and urgent costs. It does not follow that any ₹2 lakh bill is fully payable.",
      "सिर्फ़ example: बचत ₹30,000, माने गए इलाज का बिल ₹2 लाख। शर्तों के हिसाब से कंपनी कवर वाला हिस्सा दे सकती है। बचत आपका हिस्सा और तुरंत खर्च सँभाल सकती है। इसका मतलब हर ₹2 लाख बिल पूरा मिलना नहीं है।",
      "Sirf example: bachat ₹30,000, maane gaye ilaaj ka bill ₹2 lakh. Sharton ke hisaab se company cover waala hissa de sakti hai. Bachat aapka hissa aur turant kharch sambhaal sakti hai. Iska matlab har ₹2 lakh bill poora milna nahin hai.",
    ),
    checklist: [
      t(
        "List the losses that could disrupt essential needs.",
        "कौन से नुकसान ज़रूरी खर्च बिगाड़ सकते हैं, लिखें।",
        "Kaun se nuksaan zaroori kharch bigaad sakte hain, likhein.",
      ),
      t(
        "Separate a premium from savings and from the cover limit.",
        "प्रीमियम, बचत और कवर की लिमिट अलग रखें।",
        "Premium, bachat aur cover ki limit alag rakhein.",
      ),
      t(
        "Read the benefit, exclusions, your share and claim process together.",
        "फायदा, बाहर की चीज़ें, अपना हिस्सा और क्लेम साथ पढ़ें।",
        "Faayda, baahar ki cheezein, apna hissa aur claim saath padhein.",
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "health-policy",
    level: "Intermediate",
    skills: ["S12.3.1", "S12.3.2", "S12.3.4", "S12.3.5", "S12.3.6", "S12.3.8"],
    title: t(
      "Read a health policy properly",
      "हेल्थ पॉलिसी ठीक से पढ़ें",
      "Health policy theek se padhein",
    ),
    summary: t(
      "Move beyond the headline cover amount: family structure, eligibility, limits and treatment access.",
      "सिर्फ़ बड़ी रकम नहीं—परिवार, कौन से खर्च आएंगे, लिमिट और इलाज की व्यवस्था देखें।",
      "Sirf badi rakam nahin—parivaar, kaun se kharch aayenge, limit aur ilaaj ki vyavastha dekhein.",
    ),
    sections: [
      {
        title: t(
          "Who shares the cover?",
          "कवर किसका और कैसे बँटा है?",
          "Cover kiska aur kaise banta hai?",
        ),
        body: t(
          "An individual policy may give a person a separate limit. A shared family limit (family floater) can be used by the covered family members under its terms. Consider ages, health needs and the chance of overlapping claims. Employer cover can be useful, but check what happens after changing jobs, retirement or a change in benefits. Do not assume continuity or identical terms.",
          "अलग पॉलिसी में व्यक्ति की अपनी लिमिट हो सकती है। परिवार की साझा लिमिट (फ़ैमिली फ़्लोटर) शर्तों के हिसाब से जुड़े लोग इस्तेमाल करते हैं। उम्र, हेल्थ और एक साथ क्लेम आने की संभावना देखें। नौकरी वाला कवर काम आ सकता है, पर नौकरी बदलने, रिटायरमेंट या फायदे बदलने पर क्या होगा—पूछें। वही कवर जारी रहेगा, यह न मानें।",
          "Alag policy mein vyakti ki apni limit ho sakti hai. Parivaar ki saajha limit (family floater) sharton ke hisaab se jude log istemaal karte hain. Umr, health aur ek saath claim aane ki sambhaavna dekhein. Naukri waala cover kaam aa sakta hai, par naukri badalne, retirement ya faayde badalne par kya hoga—poochhein. Wahi cover jaari rahega, yeh na maanein.",
        ),
      },
      {
        title: t(
          "Four conditions that change a bill",
          "बिल बदलने वाली चार शर्तें",
          "Bill badalne waali chaar shartein",
        ),
        body: t(
          "Check a percentage you pay (co-pay), an amount you bear first (deductible), limits within the overall cover (sub-limits), and time before specified cover starts (waiting periods). Room-related limits can affect how other charges are handled under some contracts. Read the calculation rules, exceptions and dates. A condition being mentioned in a brochure does not explain how it combines with every other condition.",
          "देखें: खर्च का आपका प्रतिशत (को-पे), पहले खुद देने की रकम (डिडक्टिबल), कुल कवर के अंदर छोटी लिमिट (सब-लिमिट), और किसी कवर से पहले रुकने का समय (वेटिंग पीरियड)। कुछ समझौतों में कमरे की लिमिट से दूसरे चार्ज का हिसाब भी बदलता है। हिसाब, छूट और तारीख़ें पढ़ें। ब्रोशर में नाम लिखा होना पूरा तरीका समझना नहीं है।",
          "Dekhein: kharch ka aapka pratishat (co-pay), pehle khud dene ki rakam (deductible), kul cover ke andar chhoti limit (sub-limit), aur kisi cover se pehle rukne ka samay (waiting period). Kuch samjhauton mein kamre ki limit se doosre charge ka hisaab bhi badalta hai. Hisaab, chhoot aur taareekhein padhein. Brochure mein naam likha hona poora tareeka samajhna nahin hai.",
        ),
      },
      {
        title: t(
          "Cashless does not mean every cost is covered",
          "कैशलेस में भी अपना खर्च हो सकता है",
          "Cashless mein bhi apna kharch ho sakta hai",
        ),
        body: t(
          "Direct settlement of approved costs (cashless treatment) depends on arrangements and approval. Paying first and asking for eligible costs back (reimbursement) needs documents and review. Confirm hospital access, planned-treatment approval, emergency contacts and exclusions. Do not delay urgent medical care to finish an educational checklist.",
          "मंज़ूर खर्च का सीधा पेमेंट (कैशलेस) व्यवस्था और मंज़ूरी पर है। पहले पैसे देकर बाद में माने गए खर्च वापस माँगना (रीइम्बर्समेंट) दस्तावेज़ और जाँच माँगता है। अस्पताल की व्यवस्था, प्लान वाले इलाज की मंज़ूरी, इमरजेंसी नंबर और बाहर की चीज़ें देखें। चेकलिस्ट पूरी करने के लिए ज़रूरी तुरंत इलाज न रोकें।",
          "Manzoor kharch ka seedha payment (cashless) vyavastha aur manzoori par hai. Pehle paise dekar baad mein maane gaye kharch waapas maangna (reimbursement) dastaavez aur jaanch maangta hai. Aspataal ki vyavastha, plan waale ilaaj ki manzoori, emergency number aur baahar ki cheezein dekhein. Checklist poori karne ke liye zaroori turant ilaaj na rokein.",
        ),
      },
    ],
    example: t(
      "Fictional ₹50,000 bill: ₹40,000 eligible, ₹10,000 excluded; 20% co-pay on eligible costs. You pay ₹8,000 + ₹10,000 = ₹18,000 and the insurer pays ₹32,000, assuming enough cover and no other adjustment. Change one assumption and the split can change.",
      "बनाया हुआ ₹50,000 बिल: ₹40,000 माने गए, ₹10,000 बाहर। माने गए खर्च पर 20% को-पे। आप ₹8,000 + ₹10,000 = ₹18,000, कंपनी ₹32,000 देगी। मान लें कवर काफ़ी है और दूसरा बदलाव नहीं। एक शर्त बदले तो बँटवारा बदल सकता है।",
      "Banaya hua ₹50,000 bill: ₹40,000 maane gaye, ₹10,000 baahar. Maane gaye kharch par 20% co-pay. Aap ₹8,000 + ₹10,000 = ₹18,000, company ₹32,000 degi. Maan lein cover kaafi hai aur doosra badlaav nahin. Ek shart badle toh bantwaara badal sakta hai.",
    ),
    checklist: [
      t(
        "Find individual/shared limits and who is actually covered.",
        "अलग या साझा लिमिट और जुड़े लोगों को खोजें।",
        "Alag ya saajha limit aur jude logon ko khojein.",
      ),
      t(
        "Ask for a written example of how limits combine.",
        "लिमिट साथ कैसे लगेगी, लिखा example माँगें।",
        "Limit saath kaise lagegi, likha example maangein.",
      ),
      t(
        "Keep enough accessible money for your share and excluded costs.",
        "अपने हिस्से और बाहर के खर्च के लिए पैसे पहुँच में रखें।",
        "Apne hisse aur baahar ke kharch ke liye paise pahunch mein rakhein.",
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "term-and-family",
    level: "Intermediate",
    skills: ["S12.2.1", "S12.2.2", "S12.2.3", "S12.2.4", "S12.2.7", "S12.2.8"],
    title: t(
      "Life cover for people who depend on you",
      "आप पर निर्भर लोगों का लाइफ़ कवर",
      "Aap par nirbhar logon ka life cover",
    ),
    summary: t(
      "Assess needs, resources, duration and disclosures before comparing products.",
      "प्रोडक्ट से पहले ज़रूरत, पैसे, अवधि और सही जानकारी देखें।",
      "Product se pehle zaroorat, paise, avadhi aur sahi jaankaari dekhein.",
    ),
    sections: [
      {
        title: t(
          "Work from needs, not a salary slogan",
          "सैलरी के नारे से नहीं, ज़रूरत से शुरू करें",
          "Salary ke naare se nahin, zaroorat se shuru karein",
        ),
        body: t(
          "List people who rely on your income, essential costs, debts and important future needs. Then list usable savings, existing cover and other support without counting the same resource twice. Match today’s values consistently with future values; inflation, growth and the duration of support matter. A single salary multiple is not a complete assessment.",
          "आप पर निर्भर लोग, ज़रूरी खर्च, कर्ज़ और आगे की ज़रूरतें लिखें। फिर काम आने वाली बचत, पुराना कवर और दूसरी मदद देखें। एक रकम दो बार न गिनें। आज की कीमत और आगे की कीमत का हिसाब एक जैसा रखें। महँगाई, ग्रोथ और मदद कितने साल चाहिए—सब मायने रखते हैं। सिर्फ़ सैलरी का एक गुणा पूरा हिसाब नहीं।",
          "Aap par nirbhar log, zaroori kharch, karz aur aage ki zarooratein likhein. Phir kaam aane waali bachat, puraana cover aur doosri madad dekhein. Ek rakam do baar na ginein. Aaj ki keemat aur aage ki keemat ka hisaab ek jaisa rakhein. Mehngaai, growth aur madad kitne saal chahiye—sab maayne rakhte hain. Sirf salary ka ek guna poora hisaab nahin.",
        ),
      },
      {
        title: t(
          "Check the protection you are buying",
          "क्या सुरक्षा खरीद रहे हैं, पढ़ें",
          "Kya suraksha khareed rahe hain, padhein",
        ),
        body: t(
          "Cover for a defined period (term insurance) focuses on death protection under the policy. Pure term cover generally has no payment simply for surviving to the end (maturity benefit). Optional additions (riders) have their own definitions, limits and costs. Premium offers can vary with age, health, smoking history, cover and duration. The company’s risk assessment (underwriting) affects acceptance and terms. Compare the same profile and do not treat a rider name as proof of broad protection.",
          "तय अवधि वाला कवर (टर्म इंश्योरेंस) पॉलिसी के हिसाब से मृत्यु की सुरक्षा पर है। प्योर टर्म में आम तौर पर अवधि पूरी होने पर जीवित रहने की रकम (मैच्योरिटी बेनिफ़िट) नहीं। साथ के एक्स्ट्रा कवर (राइडर) की अपनी परिभाषा, लिमिट और कीमत होती है। उम्र, हेल्थ, स्मोकिंग, कवर और अवधि से कीमत बदल सकती है। कंपनी की रिस्क जाँच (अंडरराइटिंग) मंज़ूरी और शर्तें बदल सकती है। एक जैसी जानकारी की तुलना करें। सिर्फ़ राइडर का नाम पूरा कवर नहीं बताता।",
          "Tay avadhi waala cover (term insurance) policy ke hisaab se mrityu ki suraksha par hai. Pure term mein aam taur par avadhi poori hone par jeevit rehne ki rakam (maturity benefit) nahin. Saath ke extra cover (rider) ki apni paribhaasha, limit aur keemat hoti hai. Umr, health, smoking, cover aur avadhi se keemat badal sakti hai. Company ki risk jaanch (underwriting) manzoori aur shartein badal sakti hai. Ek jaisi jaankaari ki tulna karein. Sirf rider ka naam poora cover nahin bataata.",
        ),
      },
      {
        title: t(
          "Make it usable for your family",
          "परिवार को इसका इस्तेमाल आ सके",
          "Parivaar ko iska istemaal aa sake",
        ),
        body: t(
          "Answer proposal questions accurately, including health and habits where asked, and check what is submitted in your name. Keep the policy and official claim contacts accessible. Check the named recipient (nominee) and applicable inheritance rules rather than assuming every nomination settles ownership in every case. Review needs after major life changes.",
          "फ़ॉर्म में पूछी हेल्थ और आदतों समेत सही जवाब दें। आपके नाम से क्या जमा हुआ, पढ़ें। परिवार को पॉलिसी और क्लेम का ऑफ़िशियल नंबर मिल सके। नामित व्यक्ति (नॉमिनी) और लागू विरासत के नियम चेक करें; हर नाम लिखने से हर मामले में मालिकाना तय हो गया, ऐसा न मानें। लाइफ़ में बड़ा बदलाव हो तो ज़रूरत फिर देखें।",
          "Form mein poochhi health aur aadaton samet sahi jawaab dein. Aapke naam se kya jama hua, padhein. Parivaar ko policy aur claim ka official number mil sake. Naamit vyakti (nominee) aur laagoo viraasat ke niyam check karein; har naam likhne se har maamle mein maalikaana tay ho gaya, aisa na maanein. Life mein bada badlaav ho toh zaroorat phir dekhein.",
        ),
      },
    ],
    example: t(
      "Fictional static-cost illustration: ₹30,000 a month × 12 × 5 years + ₹2 lakh debt − ₹3 lakh usable savings = ₹17 lakh gap. This omits inflation, other income and existing cover. It is a starting discussion, not a recommended sum assured.",
      "सिर्फ़ स्थिर खर्च का example: ₹30,000 × 12 × 5 साल + ₹2 लाख कर्ज़ − ₹3 लाख काम आने वाली बचत = ₹17 लाख गैप। महँगाई, दूसरी कमाई और पुराना कवर नहीं जोड़ा। यह बातचीत की शुरुआत है, सुझाई हुई बीमा रकम नहीं।",
      "Sirf sthir kharch ka example: ₹30,000 × 12 × 5 saal + ₹2 lakh karz − ₹3 lakh kaam aane waali bachat = ₹17 lakh gap. Mehngaai, doosri kamaai aur puraana cover nahin joda. Yeh baatcheet ki shuruaat hai, sujhaayi hui beema rakam nahin.",
    ),
    checklist: [
      t(
        "Match the cover period to the years support may be needed.",
        "मदद के साल और कवर की अवधि मिलाएं।",
        "Madad ke saal aur cover ki avadhi milaayein.",
      ),
      t(
        "Check affordability over the whole premium-paying period.",
        "प्रीमियम जितने साल देना है, उतने समय की क्षमता देखें।",
        "Premium jitne saal dena hai, utne samay ki kshamata dekhein.",
      ),
      t(
        "Keep accurate disclosures and family-accessible records.",
        "सही जानकारी और परिवार को मिलने वाले रिकॉर्ड रखें।",
        "Sahi jaankaari aur parivaar ko milne waale record rakhein.",
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "deductibles-and-layers",
    level: "Advanced",
    skills: ["S12.3.3", "S12.3.7", "S12.6.2"],
    title: t(
      "Deductibles, top-ups and restored cover",
      "डिडक्टिबल, टॉप-अप और लौटा कवर",
      "Deductible, top-up aur lauta cover",
    ),
    summary: t(
      "Understand which layer responds, how thresholds apply and when cover resets.",
      "कौन सा कवर कब काम करेगा, सीमा कैसे लगेगी और रकम कब लौटेगी।",
      "Kaun sa cover kab kaam karega, seema kaise lagegi aur rakam kab lautegi.",
    ),
    sections: [
      {
        title: t(
          "Per-claim and aggregate thresholds",
          "हर क्लेम की सीमा या जोड़कर सीमा?",
          "Har claim ki seema ya jodkar seema?",
        ),
        body: t(
          "An amount you bear before cover responds (deductible) can apply to each claim or to eligible costs added over a stated period (aggregate). A top-up and a super top-up may use these different structures, but names alone are not enough. Check the threshold, eligible costs, policy period and whether another policy or your own funds can meet it.",
          "कवर से पहले खुद देने की रकम (डिडक्टिबल) हर क्लेम पर लग सकती है, या तय समय के माने गए खर्च जोड़कर लग सकती है (एग्रीगेट)। टॉप-अप और सुपर टॉप-अप में ऐसा फ़र्क हो सकता है, पर नाम ही काफी नहीं। सीमा, माने गए खर्च, पॉलिसी का समय और दूसरी पॉलिसी या अपने पैसे से सीमा पूरी होगी या नहीं—पढ़ें।",
          "Cover se pehle khud dene ki rakam (deductible) har claim par lag sakti hai, ya tay samay ke maane gaye kharch jodkar lag sakti hai (aggregate). Top-up aur super top-up mein aisa fark ho sakta hai, par naam hi kaafi nahin. Seema, maane gaye kharch, policy ka samay aur doosri policy ya apne paise se seema poori hogi ya nahin—padhein.",
        ),
      },
      {
        title: t(
          "Restoration is conditional",
          "कवर वापस आने की भी शर्तें हैं",
          "Cover waapas aane ki bhi shartein hain",
        ),
        body: t(
          "Reinstating used cover (restoration) may depend on exhaustion, claim type, timing and who claims. Do not automatically add base cover and restoration into one limit available for every first claim. A reward for a claim-free period (no-claim bonus) may affect cover or price under the contract. Check what happens after a claim and at renewal.",
          "इस्तेमाल हुई रकम वापस मिलना (रिस्टोरेशन) खत्म होने, क्लेम के तरह, समय और किसने क्लेम किया—इन पर हो सकता है। बेस कवर और वापसी को जोड़कर हर पहले क्लेम की पक्की लिमिट न मानें। बिना क्लेम वाले समय का फायदा (नो-क्लेम बोनस) शर्तों के हिसाब से कवर या कीमत बदल सकता है। क्लेम और अगली बार जारी रखने पर क्या होगा, पढ़ें।",
          "Istemal hui rakam waapas milna (restoration) khatam hone, claim ke tarah, samay aur kisne claim kiya—in par ho sakta hai. Base cover aur waapsi ko jodkar har pehle claim ki pakki limit na maanein. Bina claim waale samay ka faayda (no-claim bonus) sharton ke hisaab se cover ya keemat badal sakta hai. Claim aur agli baar jaari rakhne par kya hoga, padhein.",
        ),
      },
      {
        title: t(
          "Switch without assuming continuity",
          "बदलते समय पुराना फायदा पक्का न मानें",
          "Badalte samay puraana faayda pakka na maanein",
        ),
        body: t(
          "Moving eligible continuity benefits between policies (portability or migration) is governed by applicable rules and acceptance conditions. Check waiting-period credits, limits, medical review, dates and exclusions in writing. Do not cancel existing protection merely because a new application was submitted. Verify the actual new cover and transition before relying on it.",
          "पॉलिसी बदलते समय पुराने समय के मिलने योग्य फायदे ले जाना (पोर्टेबिलिटी या माइग्रेशन) लागू नियम और मंज़ूरी की शर्तों पर है। इंतज़ार के पुराने समय की छूट, लिमिट, मेडिकल जाँच, तारीख़ और बाहर की चीज़ें लिखकर समझें। सिर्फ़ नया फ़ॉर्म देने पर पुराना कवर बंद न मानें। नया कवर और बीच की व्यवस्था असल में चेक करें।",
          "Policy badalte samay puraane samay ke milne yogya faayde le jaana (portability ya migration) laagoo niyam aur manzoori ki sharton par hai. Intezaar ke puraane samay ki chhoot, limit, medical jaanch, taareekh aur baahar ki cheezein likhkar samjhein. Sirf naya form dene par puraana cover band na maanein. Naya cover aur beech ki vyavastha asal mein check karein.",
        ),
      },
    ],
    example: t(
      "Fictional eligible claims of ₹60,000 and ₹70,000 in the same defined period, with a ₹1 lakh deductible: a per-claim threshold is not crossed by either claim; an aggregate threshold is crossed by ₹30,000 in total. Payment still depends on cover, exclusions and the exact contract.",
      "तय समय में ₹60,000 और ₹70,000 के माने गए क्लेम, डिडक्टिबल ₹1 लाख। हर क्लेम की अलग सीमा हो तो कोई भी उसे पार नहीं करता। जोड़कर सीमा हो तो कुल ₹30,000 ऊपर है। पेमेंट फिर भी कवर, बाहर की चीज़ों और असली समझौते पर है।",
      "Tay samay mein ₹60,000 aur ₹70,000 ke maane gaye claim, deductible ₹1 lakh. Har claim ki alag seema ho toh koi bhi use paar nahin karta. Jodkar seema ho toh kul ₹30,000 oopar hai. Payment phir bhi cover, baahar ki cheezon aur asli samjhaute par hai.",
    ),
    checklist: [
      t(
        "Ask for examples involving two claims, not only one large bill.",
        "सिर्फ़ बड़े बिल का नहीं, दो क्लेम वाला example पूछें।",
        "Sirf bade bill ka nahin, do claim waala example poochhein.",
      ),
      t(
        "Read restoration triggers and restrictions word for word.",
        "वापसी कब और किन शर्तों पर है, पूरा पढ़ें।",
        "Waapsi kab aur kin sharton par hai, poora padhein.",
      ),
      t(
        "Confirm continuity and dates before changing existing cover.",
        "पुराना कवर बदलने से पहले जारी फायदे और तारीख़ चेक करें।",
        "Puraana cover badalne se pehle jaari faayde aur taareekh check karein.",
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "insurance-and-investing",
    level: "Advanced",
    skills: ["S12.4.1", "S12.4.2", "S12.4.3", "S12.4.4", "S12.4.5", "S12.4.6"],
    title: t(
      "When insurance and investing are bundled",
      "इंश्योरेंस और इन्वेस्टमेंट साथ हों तो",
      "Insurance aur investment saath hon toh",
    ),
    summary: t(
      "Separate protection, savings, market exposure, guarantees and the cost of leaving.",
      "सुरक्षा, बचत, मार्केट रिस्क, गारंटी और बीच में छोड़ने की कीमत अलग देखें।",
      "Suraksha, bachat, market risk, guarantee aur beech mein chhodne ki keemat alag dekhein.",
    ),
    sections: [
      {
        title: t(
          "Read each promise separately",
          "हर वादा अलग पढ़ें",
          "Har vaada alag padhein",
        ),
        body: t(
          "Savings-linked life policies can combine death cover with future payments. Market-linked insurance (ULIP) also exposes the investment part to fund performance. Some benefits may be guaranteed under conditions; others are illustrations. Separate cover, premium commitment, guaranteed payments and uncertain outcomes. A projected return is not a contractual promise.",
          "बचत वाले लाइफ़ प्लान में मृत्यु का कवर और आगे के पेमेंट साथ हो सकते हैं। मार्केट से जुड़े इंश्योरेंस (ULIP) का इन्वेस्टमेंट हिस्सा फ़ंड की ग्रोथ पर भी है। कुछ फायदे शर्तों में गारंटीड, दूसरे सिर्फ़ example हो सकते हैं। कवर, प्रीमियम देने की ज़िम्मेदारी, पक्के पेमेंट और अनिश्चित नतीजे अलग रखें। दिखाया रिटर्न वादा नहीं है।",
          "Bachat waale life plan mein mrityu ka cover aur aage ke payment saath ho sakte hain. Market se jude insurance (ULIP) ka investment hissa fund ki growth par bhi hai. Kuch faayde sharton mein guaranteed, doosre sirf example ho sakte hain. Cover, premium dene ki zimmedaari, pakke payment aur anishchit nateeje alag rakhein. Dikhaaya return vaada nahin hai.",
        ),
      },
      {
        title: t(
          "Compare dates and every charge",
          "तारीख़ और हर चार्ज मिलाएं",
          "Taareekh aur har charge milaayein",
        ),
        body: t(
          "List premiums and benefits on a dated cash-flow timeline. Check allocation, insurance, administration and fund charges where applicable. Compare suitable protection and investing separately as well as together; no single structure suits everyone. Regular income products (annuities) may trade access to capital for defined payments. Check life duration, inflation exposure and what happens after death.",
          "प्रीमियम और फायदे की तारीख़ों का पैसों वाला टाइमलाइन बनाएं। जहाँ लागू हों, बाँटने, बीमा, प्रशासन और फ़ंड के चार्ज देखें। सही सुरक्षा और इन्वेस्टमेंट को अलग और साथ, दोनों तरह मिलाएं। एक तरीका सबके लिए सही नहीं। नियमित रकम वाले प्लान (एन्युइटी) तय पेमेंट के बदले मूल रकम तक पहुँच घटा सकते हैं। कितने समय तक, महँगाई का असर और मृत्यु के बाद क्या होगा—पढ़ें।",
          "Premium aur faayde ki taareekhon ka paison waala timeline banaayein. Jahaan laagoo hon, baantne, beema, prashaasan aur fund ke charge dekhein. Sahi suraksha aur investment ko alag aur saath, dono tarah milaayein. Ek tareeka sabke liye sahi nahin. Niyamit rakam waale plan (annuity) tay payment ke badle mool rakam tak pahunch ghata sakte hain. Kitne samay tak, mehngaai ka asar aur mrityu ke baad kya hoga—padhein.",
        ),
      },
      {
        title: t(
          "Know the exit before entering",
          "शुरू करने से पहले निकलने का हिसाब",
          "Shuru karne se pehle nikalne ka hisaab",
        ),
        body: t(
          "Ending a policy early (surrender) can return less than premiums paid. Stopping premiums while retaining reduced benefits (paid-up status) depends on the contract and eligibility. Do not treat either as a refund. Ask for written values at several future dates and what protection remains. Never assume tax treatment or lock-in rules from an old advertisement.",
          "जल्दी बंद करना (सरेंडर) दिए प्रीमियम से कम पैसे लौटा सकता है। आगे प्रीमियम रोककर घटा फायदा रखना (पेड-अप) समझौते और पात्रता पर है। दोनों को पैसे वापसी की गारंटी न मानें। अलग-अलग तारीख़ पर कितने पैसे और क्या कवर बचेगा, लिखकर पूछें। पुराने विज्ञापन से टैक्स या पैसा बंद रहने के नियम न मानें।",
          "Jaldi band karna (surrender) diye premium se kam paise lauta sakta hai. Aage premium rokkar ghata faayda rakhna (paid-up) samjhaute aur paatrata par hai. Dono ko paise waapsi ki guarantee na maanein. Alag-alag taareekh par kitne paise aur kya cover bachega, likhkar poochhein. Puraane vigyaapan se tax ya paisa band rehne ke niyam na maanein.",
        ),
      },
    ],
    example: t(
      "Fictional illustration: paying ₹10,000 at the end of each year for 12 years totals ₹1,20,000. Receiving ₹1,20,000 at the end is not ₹1,20,000 profit. Timing, inflation, charges and the protection provided during those years must be considered.",
      "सिर्फ़ example: 12 साल हर साल के अंत में ₹10,000 दिए, कुल ₹1,20,000। आखिर में ₹1,20,000 मिले तो वह ₹1,20,000 मुनाफ़ा नहीं है। समय, महँगाई, चार्ज और उन सालों के कवर को भी देखना है।",
      "Sirf example: 12 saal har saal ke ant mein ₹10,000 diye, kul ₹1,20,000. Aakhir mein ₹1,20,000 mile toh woh ₹1,20,000 munaafa nahin hai. Samay, mehngaai, charge aur un saalon ke cover ko bhi dekhna hai.",
    ),
    checklist: [
      t(
        "Mark each payment as guaranteed or illustrative.",
        "हर पेमेंट के आगे गारंटीड या example लिखें।",
        "Har payment ke aage guaranteed ya example likhein.",
      ),
      t(
        "Request the full dated cash flows and exit values.",
        "तारीख़ वाला पूरा हिसाब और निकलने की रकम माँगें।",
        "Taareekh waala poora hisaab aur nikalne ki rakam maangein.",
      ),
      t(
        "Compare ongoing affordability, protection and access to money.",
        "लंबे समय दे पाने, सुरक्षा और पैसे तक पहुँच मिलाएं।",
        "Lambe samay de paane, suraksha aur paise tak pahunch milaayein.",
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "other-protection",
    level: "Intermediate",
    skills: [
      "S12.5.1",
      "S12.5.2",
      "S12.5.3",
      "S12.5.4",
      "S12.5.5",
      "S12.5.6",
      "S12.3.9",
    ],
    title: t(
      "Protect more than health and income",
      "हेल्थ और कमाई से आगे की सुरक्षा",
      "Health aur kamaai se aage ki suraksha",
    ),
    summary: t(
      "Understand motor, home, travel, accident and scheme-based protection without confusing their promises.",
      "गाड़ी, घर, ट्रैवल, दुर्घटना और स्कीम वाले कवर के अलग वादे समझें।",
      "Gaadi, ghar, travel, durghatna aur scheme waale cover ke alag vaade samjhein.",
    ),
    sections: [
      {
        title: t("Motor and home", "गाड़ी और घर", "Gaadi aur ghar"),
        body: t(
          "Motor cover for harm to others (third-party liability) differs from cover for damage to your own vehicle. Check declared vehicle value (IDV), deductibles, exclusions and add-ons. Home cover can protect the building, contents or both; rebuilding cost is not always the same as sale value. Ask how underinsurance, location-specific hazards and valuables are treated.",
          "गाड़ी से दूसरों को नुकसान की देनदारी (थर्ड-पार्टी) और अपनी गाड़ी के नुकसान का कवर अलग हैं। बताई गाड़ी की कीमत (IDV), डिडक्टिबल, बाहर की चीज़ें और एक्स्ट्रा कवर देखें। घर में इमारत, अंदर का सामान या दोनों हो सकते हैं। दोबारा बनाने की कीमत और बेचने की कीमत एक नहीं भी होती। कम कवर, इलाके के रिस्क और कीमती चीज़ें कैसे गिनी जाएंगी, पूछें।",
          "Gaadi se doosron ko nuksaan ki dendaari (third-party) aur apni gaadi ke nuksaan ka cover alag hain. Bataayi gaadi ki keemat (IDV), deductible, baahar ki cheezein aur extra cover dekhein. Ghar mein imaarat, andar ka saamaan ya dono ho sakte hain. Dobaara banaane ki keemat aur bechne ki keemat ek nahin bhi hoti. Kam cover, ilaake ke risk aur keemti cheezein kaise gini jaayengi, poochhein.",
        ),
      },
      {
        title: t(
          "Accident, critical illness and travel",
          "दुर्घटना, गंभीर बीमारी और ट्रैवल",
          "Durghatna, gambheer beemaari aur travel",
        ),
        body: t(
          "Accident cover may pay for defined accidental death or disability. A specified serious diagnosis can trigger a fixed payment (critical illness cover), subject to definitions and conditions. Neither automatically replaces hospital-cost cover. Travel cover can address eligible medical costs, cancellations or baggage losses, but check destinations, activities, prior conditions and evidence requirements.",
          "दुर्घटना वाले प्लान में तय दुर्घटना से मृत्यु या काम करने की क्षमता घटने पर रकम हो सकती है। तय गंभीर बीमारी की परिभाषा पूरी होने पर तय रकम (क्रिटिकल इलनेस कवर) मिल सकती है। दोनों अपने-आप अस्पताल के खर्च वाला कवर नहीं हैं। ट्रैवल में तय इलाज, कैंसिलेशन या सामान के नुकसान का कवर हो सकता है। देश, गतिविधियाँ, पुरानी बीमारी और सबूत की शर्तें देखें।",
          "Durghatna waale plan mein tay durghatna se mrityu ya kaam karne ki kshamata ghatne par rakam ho sakti hai. Tay gambheer beemaari ki paribhaasha poori hone par tay rakam (critical illness cover) mil sakti hai. Dono apne-aap aspataal ke kharch waala cover nahin hain. Travel mein tay ilaaj, cancellation ya saamaan ke nuksaan ka cover ho sakta hai. Desh, gatividhiyaan, puraani beemaari aur saboot ki shartein dekhein.",
        ),
      },
      {
        title: t(
          "Check schemes at the official source",
          "स्कीम को असली स्रोत से चेक करें",
          "Scheme ko asli srot se check karein",
        ),
        body: t(
          "Government, employment and rural schemes can have specific eligibility, enrolment, renewal and claim conditions. Crop cover may depend on a defined event or measurement rather than every loss a farmer experiences. Confirm current terms and official enrolment channels. Do not infer a scheme’s benefit amount, age limit or automatic eligibility from a social-media message.",
          "सरकारी, नौकरी और ग्रामीण स्कीम की पात्रता, जुड़ने, जारी रखने और क्लेम की अपनी शर्तें होती हैं। फसल का कवर हर नुकसान के बजाय किसी तय घटना या माप पर भी हो सकता है। मौजूदा नियम और ऑफ़िशियल तरीके से जुड़ना चेक करें। सोशल मीडिया से रकम, उम्र की सीमा या अपने-आप पात्र होना न मानें।",
          "Sarkaari, naukri aur graameen scheme ki paatrata, judne, jaari rakhne aur claim ki apni shartein hoti hain. Fasal ka cover har nuksaan ke bajaay kisi tay ghatna ya maap par bhi ho sakta hai. Maujooda niyam aur official tareeke se judna check karein. Social media se rakam, umr ki seema ya apne-aap paatra hona na maanein.",
        ),
      },
    ],
    example: t(
      "A fictional accident policy promises a fixed payment for a defined disability. A health policy reimburses eligible treatment costs. The same accident may raise separate questions under both contracts; one approval does not establish eligibility under the other.",
      "बनाए हुए दुर्घटना प्लान में तय विकलांगता पर तय रकम है। हेल्थ पॉलिसी माने गए इलाज के खर्च लौटाती है। उसी दुर्घटना में दोनों समझौतों के सवाल अलग हो सकते हैं। एक मंज़ूरी से दूसरी पात्रता पक्की नहीं होती।",
      "Banaye hue durghatna plan mein tay viklaangta par tay rakam hai. Health policy maane gaye ilaaj ke kharch lautaati hai. Usi durghatna mein dono samjhauton ke sawaal alag ho sakte hain. Ek manzoori se doosri paatrata pakki nahin hoti.",
    ),
    checklist: [
      t(
        "Name the loss, insured person or asset, and payment trigger.",
        "नुकसान, किसका या किस चीज़ का कवर और पेमेंट की घटना लिखें।",
        "Nuksaan, kiska ya kis cheez ka cover aur payment ki ghatna likhein.",
      ),
      t(
        "Check overlaps and gaps across policies.",
        "अलग पॉलिसी में दोहराव और छूटी जगह देखें।",
        "Alag policy mein dohraav aur chhooti jagah dekhein.",
      ),
      t(
        "Verify legal requirements and scheme rules using current official information.",
        "कानूनी ज़रूरत और स्कीम के नियम मौजूदा ऑफ़िशियल जानकारी से चेक करें।",
        "Kaanooni zaroorat aur scheme ke niyam maujooda official jaankaari se check karein.",
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "claims-and-complaints",
    level: "Intermediate",
    skills: ["S12.6.3", "S12.6.4", "S12.6.5", "S12.2.6"],
    title: t(
      "From a claim to a reasoned decision",
      "क्लेम से लिखे फैसले तक",
      "Claim se likhe faisle tak",
    ),
    summary: t(
      "Prepare records, follow the actual process and challenge unclear decisions with evidence.",
      "रिकॉर्ड रखें, असली प्रक्रिया अपनाएं और अस्पष्ट फैसले पर सबूत से सवाल पूछें।",
      "Record rakhein, asli prakriya apnaayein aur aspasht faisle par saboot se sawaal poochhein.",
    ),
    sections: [
      {
        title: t(
          "Before and during a claim",
          "क्लेम से पहले और उसके दौरान",
          "Claim se pehle aur uske dauraan",
        ),
        body: t(
          "Keep policy schedules, proposal copies, endorsements, receipts and official contacts. Follow the policy’s notification and approval process, using current timelines from official sources. For medical claims, preserve bills, reports and discharge documents. For other losses, obtain the evidence the actual contract and situation require. Keep copies of what you submit and a dated record of communications.",
          "पॉलिसी शेड्यूल, फ़ॉर्म की कॉपी, बदलाव वाले कागज़, रसीद और ऑफ़िशियल नंबर रखें। असली प्रक्रिया और मौजूदा ऑफ़िशियल समय-सीमा से सूचना और मंज़ूरी लें। इलाज में बिल, रिपोर्ट और छुट्टी के कागज़ सँभालें। दूसरे नुकसान में समझौते और स्थिति के हिसाब से सबूत रखें। क्या जमा किया और कब बात हुई, उसका रिकॉर्ड रखें।",
          "Policy schedule, form ki copy, badlaav waale kaagaz, raseed aur official number rakhein. Asli prakriya aur maujooda official samay-seema se soochna aur manzoori lein. Ilaaj mein bill, report aur chhutti ke kaagaz sambhaalein. Doosre nuksaan mein samjhaute aur sthiti ke hisaab se saboot rakhein. Kya jama kiya aur kab baat hui, uska record rakhein.",
        ),
      },
      {
        title: t(
          "Read deductions and refusals",
          "कटौती और मना करने का कारण पढ़ें",
          "Katauti aur mana karne ka kaaran padhein",
        ),
        body: t(
          "Ask for a written claim breakdown and the policy clauses used. A difference can arise from eligibility, limits, your share, documentation or disputed facts. Do not assume every deduction is correct or every refusal is fraud. Compare the decision with the contract and evidence, and ask specific questions about each disputed item.",
          "क्लेम का लिखा ब्योरा और इस्तेमाल हुई शर्तें माँगें। फ़र्क पात्रता, लिमिट, अपना हिस्सा, दस्तावेज़ या तथ्यों के विवाद से हो सकता है। हर कटौती सही या हर मना करना धोखा—ऐसा न मानें। समझौते और सबूत से फैसला मिलाएं और हर विवाद वाले खर्च पर साफ़ सवाल पूछें।",
          "Claim ka likha byaura aur istemaal hui shartein maangein. Fark paatrata, limit, apna hissa, dastaavez ya tathyon ke vivaad se ho sakta hai. Har katauti sahi ya har mana karna dhokha—aisa na maanein. Samjhaute aur saboot se faisla milaayein aur har vivaad waale kharch par saaf sawaal poochhein.",
        ),
      },
      {
        title: t(
          "Escalate through the right channel",
          "सही तरीके से शिकायत आगे ले जाएं",
          "Sahi tareeke se shikaayat aage le jaayein",
        ),
        body: t(
          "Use the insurer’s official grievance process first where required. Further routes can include the regulator’s grievance service and an eligible complaint to the Insurance Ombudsman. Their roles, eligibility, deadlines and limits differ. Verify the current official process rather than using a phone number from an unsolicited message. A complaint is not a guarantee of payment.",
          "जहाँ ज़रूरी हो, पहले कंपनी की ऑफ़िशियल शिकायत प्रक्रिया अपनाएं। आगे रेगुलेटर की शिकायत सेवा और पात्र मामले में बीमा लोकपाल (इंश्योरेंस ओम्बड्समैन) का रास्ता हो सकता है। भूमिका, पात्रता, समय-सीमा और लिमिट अलग हैं। अनजान मैसेज के नंबर के बजाय मौजूदा ऑफ़िशियल तरीका चेक करें। शिकायत से पेमेंट की गारंटी नहीं।",
          "Jahaan zaroori ho, pehle company ki official shikaayat prakriya apnaayein. Aage regulator ki shikaayat seva aur paatra maamle mein beema lokpal (Insurance Ombudsman) ka raasta ho sakta hai. Bhoomika, paatrata, samay-seema aur limit alag hain. Anjaan message ke number ke bajaay maujooda official tareeka check karein. Shikaayat se payment ki guarantee nahin.",
        ),
      },
    ],
    example: t(
      "If a fictional ₹5,000 item is deducted as “not covered”, ask which clause applies and compare the itemised bill with the policy. Keep the response and supporting records. Do not invent a diagnosis or change a receipt to make a claim fit.",
      "अगर example में ₹5,000 “कवर नहीं” कहकर काटे, तो कौन सी शर्त है पूछें और बिल के उस खर्च को पॉलिसी से मिलाएं। जवाब और सबूत रखें। क्लेम फिट करने के लिए बीमारी न बनाएँ, रसीद न बदलें।",
      "Agar example mein ₹5,000 “cover nahin” kehkar kaate, toh kaun si shart hai poochhein aur bill ke us kharch ko policy se milaayein. Jawaab aur saboot rakhein. Claim fit karne ke liye beemaari na banaayein, raseed na badlein.",
    ),
    checklist: [
      t(
        "Make a dated folder of the policy, evidence and communications.",
        "पॉलिसी, सबूत और बातचीत की तारीख़ वाली फ़ाइल बनाएं।",
        "Policy, saboot aur baatcheet ki taareekh waali file banaayein.",
      ),
      t(
        "Request reasons and relevant clauses in writing.",
        "कारण और जुड़ी शर्तें लिखकर माँगें।",
        "Kaaran aur judi shartein likhkar maangein.",
      ),
      t(
        "Verify the correct escalation route and current requirements.",
        "शिकायत का सही अगला रास्ता और मौजूदा ज़रूरतें चेक करें।",
        "Shikaayat ka sahi agla raasta aur maujooda zarooratein check karein.",
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "advanced-comparison",
    level: "Advanced",
    skills: ["S12.1.3", "S12.1.4", "S12.2.5", "S12.6.1"],
    title: t(
      "Compare policies without being misled",
      "पॉलिसी की तुलना में भ्रम से बचें",
      "Policy ki tulna mein bhram se bachein",
    ),
    summary: t(
      "Use contract wording, comparable evidence and realistic family scenarios—not a single sales number.",
      "सिर्फ़ सेल्स नंबर नहीं—लिखी शर्तें, सही तुलना और परिवार की असली स्थिति देखें।",
      "Sirf sales number nahin—likhi shartein, sahi tulna aur parivaar ki asli sthiti dekhein.",
    ),
    sections: [
      {
        title: t(
          "Numbers need a denominator",
          "नंबर किस हिसाब से है?",
          "Number kis hisaab se hai?",
        ),
        body: t(
          "A claim settlement ratio can count claims or amounts, cover different periods and treat pending cases differently. It does not tell you whether your own claim meets the policy terms. Read the definition, period and source. Financial strength and service evidence can inform comparison, but no single ratio guarantees a future claim or good service.",
          "क्लेम सेटलमेंट रेशियो क्लेम की गिनती या रकम से बन सकता है। समय और लंबित मामलों का हिसाब अलग हो सकता है। इससे आपका क्लेम शर्तों में आता है या नहीं, पता नहीं चलता। परिभाषा, समय और स्रोत पढ़ें। आर्थिक हालत और सेवा की जानकारी मदद कर सकती है, पर एक नंबर से अगला क्लेम या अच्छी सेवा पक्की नहीं होती।",
          "Claim settlement ratio claim ki ginti ya rakam se ban sakta hai. Samay aur lambit maamlon ka hisaab alag ho sakta hai. Isse aapka claim sharton mein aata hai ya nahin, pata nahin chalta. Paribhaasha, samay aur srot padhein. Aarthik haalat aur seva ki jaankaari madad kar sakti hai, par ek number se agla claim ya achchhi seva pakki nahin hoti.",
        ),
      },
      {
        title: t(
          "Compare like with like",
          "एक जैसी बातें मिलाएं",
          "Ek jaisi baatein milaayein",
        ),
        body: t(
          "Keep people, ages, cover amount, duration and payment pattern consistent. Then compare exclusions, definitions, limits, future affordability and claim access. Check your relationship to the insured risk (insurable interest) and accurate disclosure duties. For a review-and-cancel option after receiving the policy (free-look period), verify current eligibility, start date, deductions and process from official documents. No universal duration is assumed here.",
          "लोग, उम्र, कवर की रकम, अवधि और पेमेंट का तरीका एक जैसा रखें। फिर बाहर की चीज़ें, परिभाषा, लिमिट, आगे दे पाने और क्लेम की पहुँच मिलाएं। जिस रिस्क का कवर है उससे आपका सही संबंध (इंश्योरेबल इंटरेस्ट) और सही जानकारी देने की ज़िम्मेदारी देखें। मिलने के बाद पढ़कर लौटाने का विकल्प (फ़्री-लुक पीरियड) हो तो मौजूदा पात्रता, शुरू की तारीख़, कटौती और तरीका ऑफ़िशियल कागज़ से चेक करें। यहाँ सबके लिए एक अवधि नहीं मानी है।",
          "Log, umr, cover ki rakam, avadhi aur payment ka tareeka ek jaisa rakhein. Phir baahar ki cheezein, paribhaasha, limit, aage de paane aur claim ki pahunch milaayein. Jis risk ka cover hai usse aapka sahi sambandh (insurable interest) aur sahi jaankaari dene ki zimmedaari dekhein. Milne ke baad padhkar lautaane ka vikalp (free-look period) ho toh maujooda paatrata, shuru ki taareekh, katauti aur tareeka official kaagaz se check karein. Yahaan sabke liye ek avadhi nahin maani hai.",
        ),
      },
      {
        title: t(
          "Stress-test the promise",
          "मुश्किल स्थिति में कवर का हिसाब",
          "Mushkil sthiti mein cover ka hisaab",
        ),
        body: t(
          "Ask what happens with a small claim, one large claim, two claims in a year, loss of a job, a missed premium or a disputed disclosure. Write which contract clause answers each situation. If a seller will not provide the full wording, pressures you to hide facts or calls an illustration guaranteed, pause and verify independently.",
          "पूछें: छोटा क्लेम, एक बड़ा क्लेम, साल में दो क्लेम, नौकरी जाना, प्रीमियम छूटना या दी जानकारी पर विवाद—तब क्या होगा? हर स्थिति के सामने कौन सी शर्त जवाब देती है, लिखें। पूरी पॉलिसी न देना, सच छिपाने का दबाव या example को गारंटी कहना—ऐसा हो तो रुककर अलग से चेक करें।",
          "Poochhein: chhota claim, ek bada claim, saal mein do claim, naukri jaana, premium chhootna ya di jaankaari par vivaad—tab kya hoga? Har sthiti ke saamne kaun si shart jawaab deti hai, likhein. Poori policy na dena, sach chhipaane ka dabaav ya example ko guarantee kehna—aisa ho toh rukkar alag se check karein.",
        ),
      },
    ],
    example: t(
      "Fictional comparison: one report settles 98 of 100 claims by count, another pays 95% of claimed money. These percentages measure different things. Neither alone proves that one policy is the better fit for a family.",
      "बनाई हुई तुलना: एक रिपोर्ट में गिनती से 100 में 98 क्लेम दिए। दूसरी में माँगी रकम का 95% दिया। दोनों प्रतिशत अलग चीज़ें मापते हैं। अकेले इनसे एक पॉलिसी परिवार के लिए बेहतर साबित नहीं होती।",
      "Banayi hui tulna: ek report mein ginti se 100 mein 98 claim diye. Doosri mein maangi rakam ka 95% diya. Dono pratishat alag cheezein maapte hain. Akele inse ek policy parivaar ke liye behtar saabit nahin hoti.",
    ),
    checklist: [
      t(
        "Read definitions before comparing percentages.",
        "प्रतिशत मिलाने से पहले परिभाषा पढ़ें।",
        "Pratishat milaane se pehle paribhaasha padhein.",
      ),
      t(
        "Get written answers to realistic claim scenarios.",
        "असली जैसी क्लेम स्थितियों के लिखे जवाब लें।",
        "Asli jaisi claim sthitiyon ke likhe jawaab lein.",
      ),
      t(
        "Keep sources, dates and unresolved questions with the comparison.",
        "तुलना के साथ स्रोत, तारीख़ और बचे सवाल रखें।",
        "Tulna ke saath srot, taareekh aur bache sawaal rakhein.",
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
];
