import { t, choice, numeric, order, document, match, bucket } from "./schema";
import type { Lesson } from "./schema";
const tf = [t("True", "सही", "Sahi"), t("False", "गलत", "Galat")];
const worksheet = [
  t(
    "Opening loan balance · ₹1,20,000",
    "शुरू में बचा लोन · ₹1,20,000",
    "Shuru mein bacha loan · ₹1,20,000",
  ),
  t(
    "Interest for this month · ₹1,200",
    "इस महीने का ब्याज · ₹1,200",
    "Is mahine ka byaaj · ₹1,200",
  ),
  t(
    "First payment · ₹10,662",
    "पहली पेमेंट · ₹10,662",
    "Pehli payment · ₹10,662",
  ),
  t(
    "Loan amount repaid · ₹9,462",
    "उधार की रकम में से चुकाए · ₹9,462",
    "Udhaar ki rakam mein se chukaaye · ₹9,462",
  ),
];
const offer = [
  t(
    "Cash price, same item · ₹34,000",
    "उसी सामान की कैश कीमत · ₹34,000",
    "Usi saamaan ki cash keemat · ₹34,000",
  ),
  t("Instalments · 6 × ₹6,000", "किस्तें · 6 × ₹6,000", "Kistein · 6 × ₹6,000"),
  t(
    "Upfront processing fee · ₹1,000",
    "शुरू में प्रोसेसिंग फ़ीस · ₹1,000",
    "Shuru mein processing fees · ₹1,000",
  ),
  t(
    "Assumed interest · 0%; no other charges in this example",
    "मान लिया ब्याज · 0%; इस example में और चार्ज नहीं",
    "Maan liya byaaj · 0%; is example mein aur charge nahin",
  ),
];
export const borrowingLessons: Lesson[] = [
  {
    id: "emi",
    chapter: "borrowing",
    skill: "S0.6.2",
    minutes: 8,
    icon: "Calculator",
    title: t(
      "Inside your monthly payment",
      "आपकी EMI के अंदर क्या है?",
      "Aapki EMI ke andar kya hai?",
    ),
    subtitle: t(
      "See interest, loan repayment and the cost of more time.",
      "ब्याज, उधार की वापसी और ज़्यादा समय की कीमत समझें।",
      "Byaaj, udhaar ki waapsi aur zyada samay ki keemat samjhein.",
    ),
    hook: t(
      "Aman pays ₹10,662 towards a loan. His balance does not fall by the full amount. Mia splits the payment into two parts: interest and money paid back.",
      "अमन ने लोन में ₹10,662 दिए। लोन उतना पूरा क्यों नहीं घटा? मिया पेमेंट के दो हिस्से दिखाती है: ब्याज और उधार की रकम की वापसी।",
      "Aman ne loan mein ₹10,662 diye. Loan utna poora kyun nahin ghata? Mia payment ke do hisse dikhaati hai: byaaj aur udhaar ki rakam ki waapsi.",
    ),
    idea: t(
      "A regular monthly loan payment (EMI) usually includes interest and repayment of the amount borrowed (principal). In this example, interest is charged on the amount still owed (reducing-balance interest). A longer repayment period (tenure) can lower each payment but increase total interest at the same rate.",
      "हर महीने की लोन किस्त (EMI) में ब्याज और उधार की रकम (प्रिंसिपल) की वापसी शामिल होती है। घटते बैलेंस वाले example में ब्याज बचे हुए लोन पर लगता है। चुकाने का समय (टेन्योर) बढ़े तो EMI घट सकती है, पर उसी रेट पर कुल ब्याज बढ़ सकता है।",
      "Har mahine ki loan kisht (EMI) mein byaaj aur udhaar ki rakam (principal) ki waapsi shaamil hoti hai. Ghatte balance waale example mein byaaj bache hue loan par lagta hai. Chukaane ka samay (tenure) badhe toh EMI ghat sakti hai, par usi rate par kul byaaj badh sakta hai.",
    ),
    example: t(
      "Fictional first-month worksheet, rounded to rupees: ₹1,20,000 loan at 12% yearly means 1% for this simplified month. Interest is ₹1,200. A ₹10,662 payment repays ₹9,462 of the loan. The worksheet balance becomes ₹1,10,538. Real schedules may use different dates, rounding or fees.",
      "पहले महीने की बनाई हुई वर्कशीट, रुपये में राउंड की गई: ₹1,20,000 लोन, सालाना 12% यानी इस आसान महीने में 1%। ब्याज ₹1,200। ₹10,662 पेमेंट में से ₹9,462 उधार की रकम घटाते हैं। वर्कशीट में ₹1,10,538 बचे। असली तारीख़, राउंडिंग और फ़ीस से हिसाब बदल सकता है।",
      "Pehle mahine ki banayi hui worksheet, rupaye mein round ki gayi: ₹1,20,000 loan, saalaana 12% yaani is aasaan mahine mein 1%. Byaaj ₹1,200. ₹10,662 payment mein se ₹9,462 udhaar ki rakam ghataate hain. Worksheet mein ₹1,10,538 bache. Asli taareekh, rounding aur fees se hisaab badal sakta hai.",
    ),
    mistake: t(
      "A smaller EMI does not by itself mean a cheaper loan. Check total payments, fees, rate changes and whether the payment fits your essential costs. A quote based on the original amount for the whole term (flat rate) is not directly comparable with a rate on the shrinking balance.",
      "छोटी EMI से अकेले सस्ता लोन साबित नहीं होता। कुल पेमेंट, फ़ीस, रेट बदलना और ज़रूरी खर्च के बाद कितने पैसे बचेंगे—देखें। शुरू की पूरी रकम पर लगने वाला रेट (फ़्लैट रेट) और घटते बैलेंस का रेट सीधे एक जैसे नहीं हैं।",
      "Chhoti EMI se akele sasta loan saabit nahin hota. Kul payment, fees, rate badalna aur zaroori kharch ke baad kitne paise bachenge—dekhein. Shuru ki poori rakam par lagne waala rate (flat rate) aur ghatte balance ka rate seedhe ek jaise nahin hain.",
    ),
    notes: [
      t(
        "Payment = interest + amount repaid, before any other charges.",
        "दूसरे चार्ज से पहले: पेमेंट = ब्याज + उधार की लौटाई गई रकम।",
        "Doosre charge se pehle: payment = byaaj + udhaar ki lautaayi gayi rakam.",
      ),
      t(
        "Compare both monthly affordability and total cost over the full loan.",
        "हर महीने दे पाने की क्षमता और पूरे लोन की कुल कीमत—दोनों मिलाएं।",
        "Har mahine de paane ki kshamata aur poore loan ki kul keemat—dono milaayein.",
      ),
      t(
        "Read the lender’s schedule and ask what happens if rates change.",
        "कंपनी का पेमेंट शेड्यूल पढ़ें और पूछें: रेट बदले तो क्या होगा?",
        "Company ka payment schedule padhein aur poochhein: rate badle toh kya hoga?",
      ),
    ],
    action: t(
      "Use a sample loan schedule. Find the opening balance, interest, payment and closing balance in one month. Avoid sharing account numbers.",
      "sample लोन शेड्यूल में एक महीने का शुरू का बैलेंस, ब्याज, पेमेंट और आखिर का बैलेंस खोजें। खाता नंबर शेयर न करें।",
      "Sample loan schedule mein ek mahine ka shuru ka balance, byaaj, payment aur aakhir ka balance khojein. Khaata number share na karein.",
    ),
    exercises: [
      match(
        "emi-1",
        t(
          "Pair each loan term with its meaning.",
          "लोन के शब्द और उनका मतलब मिलाएं।",
          "Loan ke shabd aur unka matlab milaayein.",
        ),
        [
          t(
            "Starting amount (principal)",
            "शुरू की उधार रकम (प्रिंसिपल)",
            "Shuru ki udhaar rakam (principal)",
          ),
          t("Interest", "ब्याज", "Byaaj"),
          t(
            "Monthly payment (EMI)",
            "महीने की किस्त (EMI)",
            "Mahine ki kisht (EMI)",
          ),
        ],
        [
          t(
            "The regular payment combining interest and repayment",
            "ब्याज और उधार वापसी जोड़कर नियमित पेमेंट",
            "Byaaj aur udhaar waapsi jodkar niyamit payment",
          ),
          t(
            "Money originally borrowed",
            "शुरुआत में उधार लिए पैसे",
            "Shuruaat mein udhaar liye paise",
          ),
          t(
            "The cost charged for borrowing",
            "उधार लेने पर लगने वाली कीमत",
            "Udhaar lene par lagne waali keemat",
          ),
        ],
        [1, 2, 0],
        t(
          "Principal is borrowed money; interest is its cost. EMI combines interest and repayment under the schedule.",
          "प्रिंसिपल उधार की रकम है। ब्याज उधार की कीमत है। EMI में शेड्यूल के हिसाब से दोनों हिस्से होते हैं।",
          "Principal udhaar ki rakam hai. Byaaj udhaar ki keemat hai. EMI mein schedule ke hisaab se dono hisse hote hain.",
        ),
      ),
      numeric(
        "emi-2",
        t(
          "A fictional ₹1,20,000 balance has 1% interest for this month. Interest in rupees?",
          "इस example में बचे ₹1,20,000 पर महीने का ब्याज 1% है। ब्याज कितने रुपये?",
          "Is example mein bache ₹1,20,000 par mahine ka byaaj 1% hai. Byaaj kitne rupaye?",
        ),
        1200,
        t(
          "₹1,20,000 × 0.01 = ₹1,200. This is only the interest part.",
          "₹1,20,000 × 0.01 = ₹1,200। यह सिर्फ़ ब्याज वाला हिस्सा है।",
          "₹1,20,000 × 0.01 = ₹1,200. Yeh sirf byaaj waala hissa hai.",
        ),
        { operation: "multiply", values: [120000, 0.01] },
      ),
      document(
        "emi-3",
        t(
          "Which line shows the amount of the original loan repaid this month?",
          "इस महीने उधार की असली रकम कितनी लौटी, किस लाइन में है?",
          "Is mahine udhaar ki asli rakam kitni lauti, kis line mein hai?",
        ),
        t(
          "Fictional first-month worksheet · rounded rupees",
          "पहले महीने की बनाई हुई वर्कशीट · राउंड किए रुपये",
          "Pehle mahine ki banayi hui worksheet · round kiye rupaye",
        ),
        worksheet,
        3,
        t(
          "₹10,662 payment − ₹1,200 interest = ₹9,462 towards the loan amount.",
          "₹10,662 पेमेंट − ₹1,200 ब्याज = ₹9,462 उधार की रकम में वापस।",
          "₹10,662 payment − ₹1,200 byaaj = ₹9,462 udhaar ki rakam mein waapas.",
        ),
      ),
      numeric(
        "emi-4",
        t(
          "Using this rounded worksheet: ₹1,20,000 opening loan balance minus ₹9,462 repaid. What balance remains?",
          "इसी राउंड की वर्कशीट से: ₹1,20,000 लोन में से ₹9,462 लौटे। अब कितने रुपये बचे?",
          "Isi round ki worksheet se: ₹1,20,000 loan mein se ₹9,462 laute. Ab kitne rupaye bache?",
        ),
        110538,
        t(
          "₹1,20,000 − ₹9,462 = ₹1,10,538. The whole payment did not reduce principal because part paid interest.",
          "₹1,20,000 − ₹9,462 = ₹1,10,538। पूरे पेमेंट से लोन नहीं घटा, क्योंकि कुछ हिस्सा ब्याज में गया।",
          "₹1,20,000 − ₹9,462 = ₹1,10,538. Poore payment se loan nahin ghata, kyonki kuch hissa byaaj mein gaya.",
        ),
        { operation: "subtract", values: [120000, 9462] },
      ),
      choice(
        "emi-5",
        t(
          "At the same fixed rate, a longer loan always costs less because the EMI is smaller.",
          "रेट वही तय रहे, तो लंबा लोन हमेशा सस्ता है क्योंकि EMI छोटी है।",
          "Rate wahi tay rahe, toh lamba loan hamesha sasta hai kyonki EMI chhoti hai.",
        ),
        tf,
        1,
        t(
          "More months can lower each payment while increasing total interest. Compare the full schedule.",
          "महीने बढ़ने से हर किस्त घट सकती है, पर कुल ब्याज बढ़ सकता है। पूरा शेड्यूल मिलाएं।",
          "Mahine badhne se har kisht ghat sakti hai, par kul byaaj badh sakta hai. Poora schedule milaayein.",
        ),
      ),
      numeric(
        "emi-6",
        t(
          "A fictional ₹1,20,000 loan has zero interest and no fees, paid in 12 equal monthly payments. Each payment in rupees?",
          "सिर्फ़ example: ₹1,20,000 लोन पर ब्याज और फ़ीस नहीं। 12 बराबर मासिक किस्तें हैं। हर किस्त कितने रुपये?",
          "Sirf example: ₹1,20,000 loan par byaaj aur fees nahin. 12 baraabar maasik kistein hain. Har kisht kitne rupaye?",
        ),
        10000,
        t(
          "₹1,20,000 ÷ 12 = ₹10,000. Real offers require checking all fees and terms.",
          "₹1,20,000 ÷ 12 = ₹10,000। असली ऑफ़र में सारी फ़ीस और शर्तें चेक करें।",
          "₹1,20,000 ÷ 12 = ₹10,000. Asli offer mein saari fees aur shartein check karein.",
        ),
        { operation: "multiply", values: [120000, 1 / 12] },
      ),
      order(
        "emi-7",
        t(
          "Order the steps for comparing a loan.",
          "लोन की तुलना का सही क्रम चुनें।",
          "Loan ki tulna ka sahi kram chunein.",
        ),
        [
          t(
            "Read the rate basis, fees and full payment schedule",
            "रेट कैसे लगता है, फ़ीस और पूरा शेड्यूल पढ़ें",
            "Rate kaise lagta hai, fees aur poora schedule padhein",
          ),
          t(
            "Work out the amount you need and what you can afford",
            "ज़रूरत की रकम और कितनी किस्त दे सकते हैं, निकालें",
            "Zaroorat ki rakam aur kitni kisht de sakte hain, nikaalein",
          ),
          t(
            "Compare total cost and monthly fit before deciding",
            "फैसले से पहले कुल कीमत और मासिक बजट से मिलाएं",
            "Faisle se pehle kul keemat aur maasik budget se milaayein",
          ),
        ],
        [1, 0, 2],
        t(
          "Start with need and affordability, read the terms, then compare the full cost.",
          "पहले ज़रूरत और क्षमता, फिर शर्तें पढ़ें, फिर पूरी कीमत मिलाएं।",
          "Pehle zaroorat aur kshamata, phir shartein padhein, phir poori keemat milaayein.",
        ),
      ),
      choice(
        "emi-8",
        t(
          "The loan rate may change. What should you ask?",
          "लोन का रेट बदल सकता है। क्या पूछें?",
          "Loan ka rate badal sakta hai. Kya poochhein?",
        ),
        [
          t("Only the first EMI", "सिर्फ़ पहली EMI", "Sirf pehli EMI"),
          t(
            "How changes can affect payments, duration and total cost",
            "बदलाव से किस्त, अवधि और कुल कीमत पर क्या असर होगा",
            "Badlaav se kisht, avadhi aur kul keemat par kya asar hoga",
          ),
          t(
            "Whether the advertisement looks professional",
            "विज्ञापन अच्छा दिखता है या नहीं",
            "Vigyaapan achchha dikhta hai ya nahin",
          ),
        ],
        1,
        t(
          "Future costs can change with the rate. Understand the contract rather than treating today’s calculation as a guarantee.",
          "रेट बदले तो आगे की कीमत बदल सकती है। आज के हिसाब को पक्का मानने से पहले समझौता समझें।",
          "Rate badle toh aage ki keemat badal sakti hai. Aaj ke hisaab ko pakka maanne se pehle samjhauta samjhein.",
        ),
      ),
    ],
    sources: ["https://www.rbi.org.in/FinancialEducation/"],
    reviewStatus: "editorial-draft",
  },
  {
    id: "loan-cost",
    chapter: "borrowing",
    skill: "S0.6.6",
    minutes: 7,
    icon: "ScanSearch",
    title: t(
      "Small payments. Full price.",
      "छोटी किस्त, पूरा हिसाब",
      "Chhoti kisht, poora hisaab",
    ),
    subtitle: t(
      "Look beyond a “0%” label and compare the same purchase.",
      "“0%” से आगे देखें। उसी खरीद की पूरी कीमत मिलाएं।",
      "“0%” se aage dekhein. Usi khareed ki poori keemat milaayein.",
    ),
    hook: t(
      "Priya sees “0% interest” on a phone. The cash price is lower, and a processing fee appears at checkout. Mia adds every payment before calling it a bargain.",
      "प्रिया ने फ़ोन पर “0% ब्याज” देखा। कैश कीमत कम है और पेमेंट के समय प्रोसेसिंग फ़ीस भी दिखी। मिया कहती है: पहले सारे पैसे जोड़ें, फिर तय करें ऑफ़र सस्ता है या नहीं।",
      "Priya ne phone par “0% byaaj” dekha. Cash keemat kam hai aur payment ke samay processing fees bhi dikhi. Mia kehti hai: pehle saare paise jodein, phir tay karein offer sasta hai ya nahin.",
    ),
    idea: t(
      "An instalment offer spreads payments over time. A zero-interest label does not by itself describe fees, a missed cash discount or charges for late payment. Compare the same item, delivery and benefits. Add all required payments and fees, and check the dates and terms.",
      "किस्त वाला ऑफ़र पेमेंट को समय में बाँटता है। सिर्फ़ ज़ीरो ब्याज देखकर फ़ीस, छूटी कैश छूट या देर की पेमेंट का चार्ज पता नहीं चलता। सामान, मिलने का समय और फायदे एक जैसे रखकर तुलना करें। सभी ज़रूरी पेमेंट और फ़ीस जोड़ें, तारीख़ और शर्तें पढ़ें।",
      "Kisht waala offer payment ko samay mein baantta hai. Sirf zero byaaj dekhkar fees, chhooti cash chhoot ya der ki payment ka charge pata nahin chalta. Saamaan, milne ka samay aur faayde ek jaise rakhkar tulna karein. Sabhi zaroori payment aur fees jodein, taareekh aur shartein padhein.",
    ),
    example: t(
      "Fictional offer for the same phone: cash ₹34,000; instalments 6 × ₹6,000 = ₹36,000; upfront fee ₹1,000. Instalment total ₹37,000, which is ₹3,000 more than cash. Assume no other charges, changes in benefits or value from payment timing. This is not a current product quote.",
      "उसी फ़ोन का बनाया हुआ ऑफ़र: कैश ₹34,000। किस्त 6 × ₹6,000 = ₹36,000। शुरू की फ़ीस ₹1,000। कुल ₹37,000, यानी कैश से ₹3,000 ज़्यादा। मान लें और चार्ज या फायदे का फ़र्क नहीं, और पेमेंट के समय की अलग वैल्यू नहीं जोड़ी है। यह असली प्रोडक्ट की कीमत नहीं है।",
      "Usi phone ka banaya hua offer: cash ₹34,000. Kisht 6 × ₹6,000 = ₹36,000. Shuru ki fees ₹1,000. Kul ₹37,000, yaani cash se ₹3,000 zyada. Maan lein aur charge ya faayde ka fark nahin, aur payment ke samay ki alag value nahin jodi hai. Yeh asli product ki keemat nahin hai.",
    ),
    mistake: t(
      "A low monthly payment can hide several overlapping bills. Buy now, pay later (BNPL) can still create a repayment commitment. Check who lends, written costs, permissions and repayment terms through official channels; a download link or easy approval does not prove an app is trustworthy.",
      "छोटी-छोटी किस्तें मिलकर कई बिल बना सकती हैं। अभी खरीदें, बाद में दें (BNPL) में भी चुकाने की ज़िम्मेदारी आती है। कौन लोन देता है, लिखी कीमत, ऐप की परमिशन और चुकाने की शर्तें ऑफ़िशियल तरीके से चेक करें। लिंक या आसान मंज़ूरी से ऐप भरोसेमंद साबित नहीं होता।",
      "Chhoti-chhoti kistein milkar kai bill bana sakti hain. Abhi khareedein, baad mein dein (BNPL) mein bhi chukaane ki zimmedaari aati hai. Kaun loan deta hai, likhi keemat, app ki permission aur chukaane ki shartein official tareeke se check karein. Link ya aasaan manzoori se app bharosemand saabit nahin hota.",
    ),
    notes: [
      t(
        "Total paid = instalments + mandatory fees and other required costs.",
        "कुल दिए पैसे = किस्तें + ज़रूरी फ़ीस और दूसरे ज़रूरी खर्च।",
        "Kul diye paise = kistein + zaroori fees aur doosre zaroori kharch.",
      ),
      t(
        "A cash discount you give up can change the comparison.",
        "छूट छोड़ने से तुलना का हिसाब बदल सकता है।",
        "Chhoot chhodne se tulna ka hisaab badal sakta hai.",
      ),
      t(
        "A total-cost difference is not an annual interest rate.",
        "कुल कीमत का फ़र्क सालाना ब्याज रेट नहीं है।",
        "Kul keemat ka fark saalaana byaaj rate nahin hai.",
      ),
    ],
    action: t(
      "Use two sample offers for the same item. List the cash price, every payment, mandatory fees and payment dates. Check who provides the credit before sharing personal details.",
      "उसी सामान के दो sample ऑफ़र लें। कैश कीमत, हर पेमेंट, ज़रूरी फ़ीस और तारीख़ें लिखें। निजी जानकारी देने से पहले देखें उधार कौन दे रहा है।",
      "Usi saamaan ke do sample offer lein. Cash keemat, har payment, zaroori fees aur taareekhein likhein. Niji jaankaari dene se pehle dekhein udhaar kaun de raha hai.",
    ),
    exercises: [
      document(
        "loan-cost-1",
        t(
          "Which line shows an amount paid in addition to the instalments?",
          "किस्तों के अलावा कौन सा पेमेंट है?",
          "Kiston ke alaava kaun sa payment hai?",
        ),
        t(
          "Fictional same-phone offer",
          "उसी फ़ोन का बनाया हुआ ऑफ़र",
          "Usi phone ka banaya hua offer",
        ),
        offer,
        2,
        t(
          "The ₹1,000 upfront fee is additional in this example. Read what is included in actual quotes.",
          "इस example में ₹1,000 फ़ीस अलग से है। असली ऑफ़र में क्या शामिल है, पढ़ें।",
          "Is example mein ₹1,000 fees alag se hai. Asli offer mein kya shaamil hai, padhein.",
        ),
      ),
      numeric(
        "loan-cost-2",
        t(
          "Six instalments of ₹6,000. Instalments only, in rupees?",
          "₹6,000 की छह किस्तें। सिर्फ़ किस्तों का कुल कितना?",
          "₹6,000 ki chhah kistein. Sirf kiston ka kul kitna?",
        ),
        36000,
        t(
          "6 × ₹6,000 = ₹36,000. The fee is still separate.",
          "6 × ₹6,000 = ₹36,000। फ़ीस अभी अलग है।",
          "6 × ₹6,000 = ₹36,000. Fees abhi alag hai.",
        ),
        { operation: "multiply", values: [6, 6000] },
      ),
      numeric(
        "loan-cost-3",
        t(
          "₹36,000 in instalments plus a ₹1,000 upfront fee. Total paid in rupees?",
          "₹36,000 किस्तें और ₹1,000 शुरू की फ़ीस। कुल कितने रुपये देंगे?",
          "₹36,000 kistein aur ₹1,000 shuru ki fees. Kul kitne rupaye denge?",
        ),
        37000,
        t(
          "₹36,000 + ₹1,000 = ₹37,000. Assume no other charges.",
          "₹36,000 + ₹1,000 = ₹37,000। मान लें कोई और चार्ज नहीं।",
          "₹36,000 + ₹1,000 = ₹37,000. Maan lein koi aur charge nahin.",
        ),
        { operation: "subtract", values: [36000, -1000] },
      ),
      match(
        "loan-cost-4",
        t(
          "Match each offer term to what it means.",
          "ऑफ़र का शब्द और उसका मतलब मिलाएं।",
          "Offer ka shabd aur uska matlab milaayein.",
        ),
        [
          t("Cash price", "कैश कीमत", "Cash keemat"),
          t("Upfront fee", "शुरू की फ़ीस", "Shuru ki fees"),
          t("Instalment", "किस्त", "Kisht"),
        ],
        [
          t(
            "One scheduled payment",
            "शेड्यूल में एक पेमेंट",
            "Schedule mein ek payment",
          ),
          t(
            "Price for paying at purchase",
            "खरीदते समय पूरे पैसे देने की कीमत",
            "Khareedte samay poore paise dene ki keemat",
          ),
          t(
            "An extra charge paid at the start",
            "शुरू में दिया जाने वाला अलग चार्ज",
            "Shuru mein diya jaane waala alag charge",
          ),
        ],
        [1, 2, 0],
        t(
          "Keep the purchase price, payment schedule and fees separate before adding them.",
          "जोड़ने से पहले सामान की कीमत, पेमेंट का शेड्यूल और फ़ीस अलग रखें।",
          "Jodne se pehle saamaan ki keemat, payment ka schedule aur fees alag rakhein.",
        ),
      ),
      numeric(
        "loan-cost-5",
        t(
          "Instalment total ₹37,000; same-item cash price ₹34,000. Extra paid in rupees?",
          "किस्त वाला कुल ₹37,000। उसी सामान की कैश कीमत ₹34,000। एक्स्ट्रा कितने रुपये?",
          "Kisht waala kul ₹37,000. Usi saamaan ki cash keemat ₹34,000. Extra kitne rupaye?",
        ),
        3000,
        t(
          "₹37,000 − ₹34,000 = ₹3,000. This is a total difference, not an annualised interest rate.",
          "₹37,000 − ₹34,000 = ₹3,000। यह कुल फ़र्क है, सालाना ब्याज रेट नहीं।",
          "₹37,000 − ₹34,000 = ₹3,000. Yeh kul fark hai, saalaana byaaj rate nahin.",
        ),
        { operation: "subtract", values: [37000, 34000] },
      ),
      bucket(
        "loan-cost-6",
        t(
          "Separate an offer detail you can verify from a claim that does not prove trust.",
          "चेक कर सकने वाली बात और भरोसा साबित न करने वाली बात अलग करें।",
          "Check kar sakne waali baat aur bharosa saabit na karne waali baat alag karein.",
        ),
        [
          t(
            "Named lender and written payment schedule",
            "लोन देने वाले का नाम और लिखा पेमेंट शेड्यूल",
            "Loan dene waale ka naam aur likha payment schedule",
          ),
          t(
            "“Approved instantly, no questions” message",
            "“तुरंत मंज़ूरी, कोई सवाल नहीं” मैसेज",
            "“Turant manzoori, koi sawaal nahin” message",
          ),
          t(
            "A written breakdown of required charges",
            "ज़रूरी चार्ज का लिखा हुआ ब्योरा",
            "Zaroori charge ka likha hua byaura",
          ),
        ],
        [
          t(
            "Verify through official channels",
            "ऑफ़िशियल तरीके से चेक करें",
            "Official tareeke se check karein",
          ),
          t(
            "Not proof of trust",
            "भरोसे का सबूत नहीं",
            "Bharose ka saboot nahin",
          ),
        ],
        [0, 1, 0],
        t(
          "Written details still need verification. A fast approval claim is not evidence that the provider is legitimate.",
          "लिखी बातों को भी चेक करना है। तेज़ मंज़ूरी से कंपनी सही साबित नहीं होती।",
          "Likhi baaton ko bhi check karna hai. Tez manzoori se company sahi saabit nahin hoti.",
        ),
      ),
      choice(
        "loan-cost-7",
        t(
          "A 0% interest label guarantees that instalments cost the same as paying cash.",
          "0% ब्याज लिखा है, तो किस्त और कैश की कुल कीमत एक जैसी पक्की है।",
          "0% byaaj likha hai, toh kisht aur cash ki kul keemat ek jaisi pakki hai.",
        ),
        tf,
        1,
        t(
          "Fees, forgone discounts and other terms can change the total. Check the actual offer.",
          "फ़ीस, छूटी छूट और दूसरी शर्तों से कुल बदल सकता है। असली ऑफ़र चेक करें।",
          "Fees, chhooti chhoot aur doosri sharton se kul badal sakta hai. Asli offer check karein.",
        ),
      ),
      order(
        "loan-cost-8",
        t(
          "Order the steps before accepting a purchase-credit offer.",
          "खरीद के उधार वाले ऑफ़र को मानने से पहले सही क्रम चुनें।",
          "Khareed ke udhaar waale offer ko maanne se pehle sahi kram chunein.",
        ),
        [
          t(
            "Add all payments and fees; compare dates and affordability",
            "सारे पेमेंट और फ़ीस जोड़ें; तारीख़ और क्षमता मिलाएं",
            "Saare payment aur fees jodein; taareekh aur kshamata milaayein",
          ),
          t(
            "Confirm the same item, lender and written terms",
            "वही सामान, लोन देने वाला और लिखी शर्तें चेक करें",
            "Wahi saamaan, loan dene waala aur likhi shartein check karein",
          ),
          t(
            "Decide after clarifying unclear costs and conditions",
            "अस्पष्ट कीमत और शर्तें समझकर फैसला करें",
            "Aspasht keemat aur shartein samajhkar faisla karein",
          ),
        ],
        [1, 0, 2],
        t(
          "Verify what is offered and by whom, compare the full commitment, then decide.",
          "पहले ऑफ़र और देने वाले को चेक करें, पूरी ज़िम्मेदारी मिलाएं, फिर फैसला करें।",
          "Pehle offer aur dene waale ko check karein, poori zimmedaari milaayein, phir faisla karein.",
        ),
      ),
    ],
    sources: ["https://www.rbi.org.in/FinancialEducation/"],
    reviewStatus: "editorial-draft",
  },
];
