import { t, choice, numeric, order, document, bucket } from "./schema";
import type { Lesson } from "./schema";
const truth = [t("True", "सही", "Sahi"), t("False", "गलत", "Galat")];
const sources = ["https://www.rbi.org.in/FinancialEducation/"];
const statement = [
  t(
    "Opening balance · ₹10,000",
    "शुरू का बैलेंस · ₹10,000",
    "Shuru ka balance · ₹10,000",
  ),
  t(
    "Salary · CREDIT +₹30,000",
    "सैलरी · CREDIT +₹30,000",
    "Salary · CREDIT +₹30,000",
  ),
  t(
    "Rent · DEBIT −₹12,000",
    "किराया · DEBIT −₹12,000",
    "Kiraaya · DEBIT −₹12,000",
  ),
  t(
    "Closing balance · ₹28,000",
    "आखिर का बैलेंस · ₹28,000",
    "Aakhir ka balance · ₹28,000",
  ),
];
const cardBill = [
  t(
    "Statement balance · ₹10,000",
    "बिल की पूरी रकम · ₹10,000",
    "Bill ki poori rakam · ₹10,000",
  ),
  t(
    "Minimum due · ₹500",
    "कम-से-कम देने हैं · ₹500",
    "Kam-se-kam dene hain · ₹500",
  ),
  t("Payment received · ₹500", "मिले पेमेंट · ₹500", "Mile payment · ₹500"),
  t(
    "Unpaid principal · ₹9,500",
    "बचे हुए उधार के पैसे · ₹9,500",
    "Bache hue udhaar ke paise · ₹9,500",
  ),
];
const debts = [
  t(
    "Loan A · ₹10,000 · 24% yearly",
    "लोन A · ₹10,000 · सालाना 24%",
    "Loan A · ₹10,000 · saalaana 24%",
  ),
  t(
    "Loan B · ₹30,000 · 12% yearly",
    "लोन B · ₹30,000 · सालाना 12%",
    "Loan B · ₹30,000 · saalaana 12%",
  ),
];
export const everydayLessons: Lesson[] = [
  {
    id: "inflation",
    skill: "S0.5.4",
    title: t(
      "Same rupees. Smaller basket.",
      "पैसे उतने, सामान कम",
      "Paise utne, saamaan kam",
    ),
    subtitle: t(
      "See what inflation does to everyday money.",
      "महँगाई को रोज़ की चीज़ों से समझें।",
      "Mehngaai ko roz ki cheezon se samjhein.",
    ),
    minutes: 6,
    icon: "TrendingDown",
    hook: t(
      "Sunita takes ₹100 to the shop. Last year it bought five packets. Now it buys only four. Her notes did not shrink. Their buying power did.",
      "सुनीता दुकान पर ₹100 ले गई। पहले पाँच पैकेट मिलते थे। अब चार ही मिले। नोट छोटे नहीं हुए। उनसे मिलने वाला सामान कम हो गया।",
      "Sunita dukaan par ₹100 le gayi. Pehle paanch packet milte the. Ab chaar hi mile. Note chhote nahin hue. Unse milne waala saamaan kam ho gaya.",
    ),
    idea: t(
      "Inflation means prices in a broad basket tend to rise over time. One expensive tomato does not tell the whole story. Purchasing power means how much your money buys.",
      "कई चीज़ों के दाम समय के साथ बढ़ें, तो इसे महँगाई कहते हैं। सिर्फ़ टमाटर महँगा हुआ, उससे पूरी तस्वीर नहीं मिलती। आपके पैसे कितनी चीज़ें खरीद पाते हैं—यही खरीदने की ताकत है।",
      "Kai cheezon ke daam samay ke saath badhein, toh ise mehngaai kehte hain. Sirf tamaatar mehnga hua, usse poori tasveer nahin milti. Aapke paise kitni cheezein khareed paate hain—yahi khareedne ki taakat hai.",
    ),
    example: t(
      "Fictional example: a packet costs ₹20, then ₹25. With ₹100: ₹100 ÷ ₹20 = 5 packets; ₹100 ÷ ₹25 = 4 packets. The cash amount stayed the same.",
      "सिर्फ़ example: पैकेट पहले ₹20 था, अब ₹25 है। ₹100 ÷ ₹20 = 5 पैकेट। ₹100 ÷ ₹25 = 4 पैकेट। पैसे उतने ही हैं, सामान कम है।",
      "Sirf example: packet pehle ₹20 tha, ab ₹25 hai. ₹100 ÷ ₹20 = 5 packet. ₹100 ÷ ₹25 = 4 packet. Paise utne hi hain, saamaan kam hai.",
    ),
    mistake: t(
      "A 5% increase in your balance is not automatically a 5% improvement in buying power. Prices, taxes, and fees matter too.",
      "बैंक बैलेंस 5% बढ़ा, तो खरीदने की ताकत भी 5% बढ़ी—यह ज़रूरी नहीं। महँगाई, टैक्स और फ़ीस भी देखनी हैं।",
      "Bank balance 5% badha, toh khareedne ki taakat bhi 5% badhi—yeh zaroori nahin. Mehngaai, tax aur fees bhi dekhni hain.",
    ),
    notes: [
      t(
        "Purchasing power is what your money can buy.",
        "खरीदने की ताकत मतलब आपके पैसों से क्या-क्या मिल सकता है।",
        "Khareedne ki taakat matlab aapke paison se kya-kya mil sakta hai.",
      ),
      t(
        "Your own expense basket may differ from the national average.",
        "आपके खर्च और पूरे देश का औसत अलग हो सकते हैं।",
        "Aapke kharch aur poore desh ka ausat alag ho sakte hain.",
      ),
      t(
        "Compare savings growth with rising costs, without assuming a fixed future rate.",
        "बचत की ग्रोथ के साथ खर्च की बढ़त भी देखें। आगे का रेट पक्का न मानें।",
        "Bachat ki growth ke saath kharch ki badhat bhi dekhein. Aage ka rate pakka na maanein.",
      ),
    ],
    action: t(
      "Compare the price and pack size of one regular grocery item with an old bill. Did the price, quantity, or both change?",
      "पुराना किराने का बिल देखें। किसी एक चीज़ का दाम और पैकेट का साइज़ मिलाएं। दाम बदला, मात्रा बदली या दोनों?",
      "Puraana kiraane ka bill dekhein. Kisi ek cheez ka daam aur packet ka size milaayein. Daam badla, maatra badli ya dono?",
    ),
    exercises: [
      choice(
        "inflation-1",
        t(
          "₹100 buys fewer of the same packets. What fell?",
          "₹100 में वही पैकेट अब कम मिलते हैं। क्या घटा?",
          "₹100 mein wahi packet ab kam milte hain. Kya ghata?",
        ),
        [
          t(
            "The face value of the notes",
            "नोट पर लिखी रकम",
            "Note par likhi rakam",
          ),
          t("Purchasing power", "खरीदने की ताकत", "Khareedne ki taakat"),
          t(
            "The number of rupees in ₹100",
            "₹100 में रुपयों की गिनती",
            "₹100 mein rupayon ki ginti",
          ),
        ],
        1,
        t(
          "The notes still total ₹100, but buy less.",
          "नोट अब भी ₹100 के हैं। बस उनसे सामान कम मिलता है।",
          "Note ab bhi ₹100 ke hain. Bas unse saamaan kam milta hai.",
        ),
      ),
      numeric(
        "inflation-2",
        t(
          "A ₹20 packet rises by an assumed 10%. New price in rupees?",
          "₹20 का पैकेट मान लो 10% महँगा हुआ। नया दाम कितने रुपये?",
          "₹20 ka packet maan lo 10% mehnga hua. Naya daam kitne rupaye?",
        ),
        22,
        t(
          "₹20 × 1.10 = ₹22. The 10% is an illustration, not a current inflation rate.",
          "₹20 × 1.10 = ₹22। 10% सिर्फ़ example है, आज की महँगाई का आँकड़ा नहीं।",
          "₹20 × 1.10 = ₹22. 10% sirf example hai, aaj ki mehngaai ka aankda nahin.",
        ),
        { operation: "multiply", values: [20, 1.1] },
      ),
      choice(
        "inflation-3",
        t(
          "One vegetable becoming expensive proves every price rose equally.",
          "एक सब्ज़ी महँगी हुई, तो हर चीज़ का दाम उतना ही बढ़ा होगा।",
          "Ek sabzi mehngi hui, toh har cheez ka daam utna hi badha hoga.",
        ),
        truth,
        1,
        t(
          "Different prices move differently. Broad measures look at a basket.",
          "अलग चीज़ों के दाम अलग तरह से बदलते हैं। पूरी तस्वीर के लिए कई चीज़ें देखनी पड़ती हैं।",
          "Alag cheezon ke daam alag tarah se badalte hain. Poori tasveer ke liye kai cheezein dekhni padti hain.",
        ),
      ),
      document(
        "inflation-4",
        t(
          "Tap the line showing less quantity for the same price.",
          "कौन-सी लाइन में उतने ही पैसों में सामान कम हो गया? टैप करें।",
          "Kaun-si line mein utne hi paison mein saamaan kam ho gaya? Tap karein.",
        ),
        t(
          "Fictional grocery labels",
          "सीखने के लिए बनाए किराने के लेबल",
          "Seekhne ke liye banaaye kiraane ke label",
        ),
        [
          t(
            "Rice · 1 kg · ₹60 → 1 kg · ₹60",
            "चावल · 1 किलो · ₹60 → 1 किलो · ₹60",
            "Chawal · 1 kilo · ₹60 → 1 kilo · ₹60",
          ),
          t(
            "Biscuits · 100 g · ₹20 → 80 g · ₹20",
            "बिस्कुट · 100 ग्राम · ₹20 → 80 ग्राम · ₹20",
            "Biscuit · 100 gram · ₹20 → 80 gram · ₹20",
          ),
          t(
            "Soap · 100 g · ₹30 → 100 g · ₹28",
            "साबुन · 100 ग्राम · ₹30 → 100 ग्राम · ₹28",
            "Saabun · 100 gram · ₹30 → 100 gram · ₹28",
          ),
        ],
        1,
        t(
          "The biscuit price stayed ₹20 while quantity fell. Compare unit prices, not only packet prices.",
          "बिस्कुट का दाम ₹20 ही है, पर पैकेट में कम बिस्कुट हैं। सिर्फ़ पैकेट का दाम नहीं, मात्रा भी देखें।",
          "Biscuit ka daam ₹20 hi hai, par packet mein kam biscuit hain. Sirf packet ka daam nahin, maatra bhi dekhein.",
        ),
      ),
      numeric(
        "inflation-5",
        t(
          "Same shopping list: ₹2,000 before, ₹2,200 now. Extra rupees needed?",
          "वही सामान पहले ₹2,000, अब ₹2,200 का है। कितने एक्स्ट्रा रुपये चाहिए?",
          "Wahi saamaan pehle ₹2,000, ab ₹2,200 ka hai. Kitne extra rupaye chahiye?",
        ),
        200,
        t(
          "₹2,200 − ₹2,000 = ₹200 more for the same basket.",
          "₹2,200 − ₹2,000 = ₹200 ज़्यादा। सामान वही है।",
          "₹2,200 − ₹2,000 = ₹200 zyada. Saamaan wahi hai.",
        ),
        { operation: "subtract", values: [2200, 2000] },
      ),
      order(
        "inflation-6",
        t(
          "Compare buying power fairly. Put the steps in order.",
          "खरीदने की ताकत ठीक से कैसे चेक करेंगे? क्रम चुनें।",
          "Khareedne ki taakat theek se kaise check karenge? Kram chunein.",
        ),
        [
          t(
            "Compare the cost of that same basket",
            "उसी सामान के कुल दाम मिलाएं",
            "Usi saamaan ke kul daam milaayein",
          ),
          t(
            "Choose a fixed basket and quantities",
            "सामान और उसकी मात्रा तय करें",
            "Saamaan aur uski maatra tay karein",
          ),
          t(
            "Collect old and new prices",
            "पुराने और नए दाम देखें",
            "Puraane aur naye daam dekhein",
          ),
        ],
        [1, 2, 0],
        t(
          "Fix the basket → collect prices → compare. Changing quantity can hide a price increase.",
          "सामान तय करें → दोनों समय के दाम देखें → तुलना करें। मात्रा बदलने से बढ़त छिप सकती है।",
          "Saamaan tay karein → dono samay ke daam dekhein → tulna karein. Maatra badalne se badhat chhip sakti hai.",
        ),
      ),
      choice(
        "inflation-7",
        t(
          "Which family may feel a rent increase more?",
          "किराया बढ़ने का असर किस घर पर ज़्यादा पड़ सकता है?",
          "Kiraaya badhne ka asar kis ghar par zyada pad sakta hai?",
        ),
        [
          t(
            "A household spending a larger share on rent",
            "जिसकी कमाई का बड़ा हिस्सा किराए में जाता है",
            "Jiski kamaai ka bada hissa kiraaye mein jaata hai",
          ),
          t(
            "Every family always feels exactly the same effect",
            "हर घर पर बिल्कुल एक जैसा असर होता है",
            "Har ghar par bilkul ek jaisa asar hota hai",
          ),
          t(
            "Only people who use cash",
            "सिर्फ़ कैश इस्तेमाल करने वाले",
            "Sirf cash istemaal karne waale",
          ),
        ],
        0,
        t(
          "Your spending mix matters. Averages do not describe every household.",
          "आप किन चीज़ों पर कितना खर्च करते हैं, इससे फ़र्क पड़ता है। औसत हर घर की कहानी नहीं बताता।",
          "Aap kin cheezon par kitna kharch karte hain, isse fark padta hai. Ausat har ghar ki kahaani nahin bataata.",
        ),
      ),
      numeric(
        "inflation-8",
        t(
          "A ₹10,000 balance grows by 5%. Balance only, in rupees?",
          "₹10,000 का बैलेंस 5% बढ़ा। सिर्फ़ बैंक में कुल कितने रुपये होंगे?",
          "₹10,000 ka balance 5% badha. Sirf bank mein kul kitne rupaye honge?",
        ),
        10500,
        t(
          "₹10,000 × 1.05 = ₹10,500. Buying power also depends on prices.",
          "₹10,000 × 1.05 = ₹10,500। उनसे कितना सामान मिलेगा, यह दाम पर भी निर्भर है।",
          "₹10,000 × 1.05 = ₹10,500. Unse kitna saamaan milega, yeh daam par bhi nirbhar hai.",
        ),
        { operation: "multiply", values: [10000, 1.05] },
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "banking",
    skill: "S0.4.7",
    title: t(
      "Read your bank’s money story",
      "बैंक स्टेटमेंट की कहानी",
      "Bank statement ki kahaani",
    ),
    subtitle: t(
      "Credits, debits, and a balance you can explain.",
      "पैसे आए, गए और बचे—सब समझें।",
      "Paise aaye, gaye aur bache—sab samjhein.",
    ),
    minutes: 6,
    icon: "Landmark",
    hook: t(
      "Sunita sees “DEBIT ₹12,000” and worries that debit means debt. Mia points to the rent payment: it just records money going out.",
      "सुनीता ने देखा: “DEBIT ₹12,000”। क्या यह कर्ज़ है? मिया ने किराए वाली लाइन दिखाई। यहाँ डेबिट का मतलब खाते से पैसे गए हैं।",
      "Sunita ne dekha: “DEBIT ₹12,000”. Kya yeh karz hai? Mia ne kiraaye waali line dikhaayi. Yahaan debit ka matlab khaate se paise gaye hain.",
    ),
    idea: t(
      "On a customer bank statement, credit usually means money came in and debit means money went out. The balance is what remains. Read the date, description, amount, and reference together.",
      "आपके बैंक स्टेटमेंट में क्रेडिट मतलब पैसे आए। डेबिट मतलब पैसे गए। बैलेंस मतलब खाते में बचे पैसे। तारीख, किस काम का पेमेंट है, रकम और रेफ़रेंस साथ पढ़ें।",
      "Aapke bank statement mein credit matlab paise aaye. Debit matlab paise gaye. Balance matlab khaate mein bache paise. Taareekh, kis kaam ka payment hai, rakam aur reference saath padhein.",
    ),
    example: t(
      "Start ₹10,000 + salary ₹30,000 − rent ₹12,000 = ₹28,000. This fictional statement includes only these entries. Your real statement may include fees, interest, or other payments.",
      "शुरू में ₹10,000 + सैलरी ₹30,000 − किराया ₹12,000 = ₹28,000। यह सीखने का छोटा example है। असली स्टेटमेंट में दूसरे पेमेंट, फ़ीस या ब्याज भी हो सकते हैं।",
      "Shuru mein ₹10,000 + salary ₹30,000 − kiraaya ₹12,000 = ₹28,000. Yeh seekhne ka chhota example hai. Asli statement mein doosre payment, fees ya byaaj bhi ho sakte hain.",
    ),
    mistake: t(
      "An unfamiliar description is a reason to check, not automatic proof of fraud. Match receipts and references; report an unauthorised debit promptly through the bank’s official route.",
      "अनजान नाम दिखा तो पहले चेक करें। ज़रूरी नहीं कि वह स्कैम हो। रसीद और रेफ़रेंस मिलाएं। पेमेंट आपने नहीं किया हो, तो बैंक के ऑफ़िशियल तरीके से जल्दी बताएं।",
      "Anjaan naam dikha toh pehle check karein. Zaroori nahin ki woh scam ho. Raseed aur reference milaayein. Payment aapne nahin kiya ho, toh bank ke official tareeke se jaldi bataayein.",
    ),
    notes: [
      t(
        "Credit in your bank statement means money in; debit means money out.",
        "आपके स्टेटमेंट में क्रेडिट = पैसे आए। डेबिट = पैसे गए।",
        "Aapke statement mein credit = paise aaye. Debit = paise gaye.",
      ),
      t(
        "Closing balance = opening balance + money in − money out.",
        "आखिर का बैलेंस = शुरू के पैसे + आए पैसे − गए पैसे।",
        "Aakhir ka balance = shuru ke paise + aaye paise − gaye paise.",
      ),
      t(
        "Check references before labelling an unfamiliar transaction.",
        "अनजान पेमेंट पर कुछ मान लेने से पहले रेफ़रेंस चेक करें।",
        "Anjaan payment par kuch maan lene se pehle reference check karein.",
      ),
    ],
    action: t(
      "Open a recent statement in your bank’s official app. Match three entries to receipts. Keep account numbers and statements private.",
      "बैंक के ऑफ़िशियल ऐप में पिछला स्टेटमेंट खोलें। तीन पेमेंट अपनी रसीदों से मिलाएं। अपना अकाउंट नंबर और स्टेटमेंट प्राइवेट रखें।",
      "Bank ke official app mein pichhla statement kholein. Teen payment apni raseedon se milaayein. Apna account number aur statement private rakhein.",
    ),
    exercises: [
      document(
        "banking-1",
        t(
          "Tap the entry where rent leaves the account.",
          "किराए के पैसे किस लाइन में खाते से गए? टैप करें।",
          "Kiraaye ke paise kis line mein khaate se gaye? Tap karein.",
        ),
        t(
          "Sunita’s statement · fictional example",
          "सुनीता का स्टेटमेंट · सीखने का example",
          "Sunita ka statement · seekhne ka example",
        ),
        statement,
        2,
        t(
          "DEBIT −₹12,000 is the outgoing rent payment.",
          "DEBIT −₹12,000 वाली लाइन में किराए के पैसे गए।",
          "DEBIT −₹12,000 waali line mein kiraaye ke paise gaye.",
        ),
      ),
      numeric(
        "banking-2",
        t(
          "After ₹10,000 opening cash and ₹30,000 salary, rent is ₹12,000. Balance in rupees?",
          "शुरू में ₹10,000 थे। ₹30,000 सैलरी आई। ₹12,000 किराया गया। कितने रुपये बचे?",
          "Shuru mein ₹10,000 the. ₹30,000 salary aayi. ₹12,000 kiraaya gaya. Kitne rupaye bache?",
        ),
        28000,
        t(
          "₹10,000 + ₹30,000 = ₹40,000; ₹40,000 − ₹12,000 = ₹28,000.",
          "₹10,000 + ₹30,000 = ₹40,000। ₹40,000 − ₹12,000 = ₹28,000।",
          "₹10,000 + ₹30,000 = ₹40,000. ₹40,000 − ₹12,000 = ₹28,000.",
        ),
        { operation: "subtract", values: [40000, 12000] },
      ),
      choice(
        "banking-3",
        t(
          "A debit on your bank statement always means a loan.",
          "बैंक स्टेटमेंट में डेबिट का मतलब हमेशा लोन है।",
          "Bank statement mein debit ka matlab hamesha loan hai.",
        ),
        truth,
        1,
        t(
          "Here it means money went out. A loan is a separate borrowing obligation.",
          "यहाँ मतलब खाते से पैसे गए। लोन अलग चीज़ है, जिसे वापस देना है।",
          "Yahaan matlab khaate se paise gaye. Loan alag cheez hai, jise waapas dena hai.",
        ),
      ),
      bucket(
        "banking-4",
        t(
          "Sort each statement entry by money direction.",
          "हर पेमेंट को सही जगह रखें: पैसे आए या गए?",
          "Har payment ko sahi jagah rakhein: paise aaye ya gaye?",
        ),
        [
          t("Salary received", "सैलरी मिली", "Salary mili"),
          t(
            "ATM cash withdrawal",
            "ATM से पैसे निकाले",
            "ATM se paise nikaale",
          ),
          t("Refund received", "रिफ़ंड मिला", "Refund mila"),
          t("Electricity bill paid", "बिजली का बिल दिया", "Bijli ka bill diya"),
        ],
        [
          t("Money in", "पैसे आए", "Paise aaye"),
          t("Money out", "पैसे गए", "Paise gaye"),
        ],
        [0, 1, 0, 1],
        t(
          "Salary and refund add to the account; ATM withdrawals and bills reduce it.",
          "सैलरी और रिफ़ंड से खाते में पैसे बढ़े। ATM से निकालने और बिल देने से घटे।",
          "Salary aur refund se khaate mein paise badhe. ATM se nikaalne aur bill dene se ghate.",
        ),
      ),
      document(
        "banking-5",
        t(
          "Which line tells you what remains after these entries?",
          "इन पेमेंट के बाद बचे पैसे कौन-सी लाइन बताती है?",
          "In payment ke baad bache paise kaun-si line bataati hai?",
        ),
        t(
          "Sunita’s statement · fictional example",
          "सुनीता का स्टेटमेंट · सीखने का example",
          "Sunita ka statement · seekhne ka example",
        ),
        statement,
        3,
        t(
          "The closing balance is ₹28,000 after all entries shown.",
          "इन सभी लाइन के बाद आखिर का बैलेंस ₹28,000 है।",
          "In sabhi line ke baad aakhir ka balance ₹28,000 hai.",
        ),
      ),
      choice(
        "banking-6",
        t(
          "You spot an unknown debit. What is a sensible first response?",
          "कोई डेबिट समझ नहीं आ रहा। पहला अच्छा कदम क्या है?",
          "Koi debit samajh nahin aa raha. Pehla achchha kadam kya hai?",
        ),
        [
          t(
            "Share your full statement publicly",
            "पूरा स्टेटमेंट पब्लिक में डाल दें",
            "Poora statement public mein daal dein",
          ),
          t(
            "Check references and contact the bank if unauthorised",
            "रेफ़रेंस मिलाएं; आपका पेमेंट न हो तो बैंक को बताएं",
            "Reference milaayein; aapka payment na ho toh bank ko bataayein",
          ),
          t(
            "Ignore every small debit forever",
            "हर छोटा डेबिट हमेशा नज़रअंदाज़ करें",
            "Har chhota debit hamesha nazarandaaz karein",
          ),
        ],
        1,
        t(
          "Check carefully, protect your details, and report unauthorised activity promptly.",
          "ध्यान से चेक करें, अपनी जानकारी प्राइवेट रखें और गलत पेमेंट जल्दी रिपोर्ट करें।",
          "Dhyaan se check karein, apni jaankaari private rakhein aur galat payment jaldi report karein.",
        ),
      ),
      numeric(
        "banking-7",
        t(
          "₹28,000 balance, then a ₹500 refund. New balance in rupees?",
          "₹28,000 बैलेंस है। ₹500 रिफ़ंड आया। अब कितने रुपये हैं?",
          "₹28,000 balance hai. ₹500 refund aaya. Ab kitne rupaye hain?",
        ),
        28500,
        t(
          "₹28,000 + ₹500 = ₹28,500.",
          "₹28,000 + ₹500 = ₹28,500।",
          "₹28,000 + ₹500 = ₹28,500.",
        ),
        { operation: "subtract", values: [28000, -500] },
      ),
      choice(
        "banking-8",
        t(
          "Where is it safest to get your own bank statement?",
          "अपना स्टेटमेंट कहाँ से लेना बेहतर है?",
          "Apna statement kahan se lena behtar hai?",
        ),
        [
          t(
            "Your bank’s official app or website",
            "अपने बैंक के ऑफ़िशियल ऐप या वेबसाइट से",
            "Apne bank ke official app ya website se",
          ),
          t(
            "A stranger’s login link",
            "अजनबी के भेजे लॉगिन लिंक से",
            "Ajnabi ke bheje login link se",
          ),
          t(
            "A caller who needs your OTP",
            "OTP माँगने वाले कॉलर से",
            "OTP maangne waale caller se",
          ),
        ],
        0,
        t(
          "Use a route you trust independently. Never give an OTP to a caller.",
          "खुद खोला ऑफ़िशियल तरीका इस्तेमाल करें। कॉलर को OTP कभी न दें।",
          "Khud khola official tareeka istemaal karein. Caller ko OTP kabhi na dein.",
        ),
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "credit-card",
    skill: "S0.6.4",
    title: t(
      "The minimum-due trap",
      "छोटी किस्त, बड़ा बचा बिल",
      "Chhoti kisht, bada bacha bill",
    ),
    subtitle: t(
      "Read the bill before the rewards.",
      "रिवॉर्ड से पहले बिल समझें।",
      "Reward se pehle bill samjhein.",
    ),
    minutes: 6,
    icon: "Wallet",
    hook: t(
      "Aman sees a ₹10,000 card bill and “minimum due ₹500”. He pays ₹500 and celebrates. Mia asks: what happened to the other ₹9,500?",
      "अमन के कार्ड का बिल ₹10,000 है। नीचे लिखा है: “minimum due ₹500”। उसने ₹500 दे दिए। मिया पूछती है: बाकी ₹9,500 का क्या हुआ?",
      "Aman ke card ka bill ₹10,000 hai. Neeche likha hai: “minimum due ₹500”. Usne ₹500 de diye. Mia poochhti hai: baaki ₹9,500 ka kya hua?",
    ),
    idea: t(
      "A credit card lets you borrow within a limit. Minimum due is not the full bill. Unpaid amounts can attract interest and fees under the issuer’s terms; carrying a balance can affect the interest-free period.",
      "क्रेडिट कार्ड से आप एक लिमिट तक उधार लेते हैं। minimum due पूरा बिल नहीं है। बचे पैसे पर बैंक की शर्तों के हिसाब से ब्याज और फ़ीस लग सकती है। बिना ब्याज वाला समय भी बदल सकता है।",
      "Credit card se aap ek limit tak udhaar lete hain. Minimum due poora bill nahin hai. Bache paise par bank ki sharton ke hisaab se byaaj aur fees lag sakti hai. Bina byaaj waala samay bhi badal sakta hai.",
    ),
    example: t(
      "₹10,000 bill − ₹500 paid = ₹9,500 unpaid, before any new interest or fees. A fictional 2% charge on ₹9,500 would be ₹190. Actual card interest calculation may differ.",
      "₹10,000 बिल − ₹500 पेमेंट = ₹9,500 बाकी। इसमें नया ब्याज या फ़ीस नहीं जोड़ी है। सिर्फ़ example: ₹9,500 का 2% = ₹190। असली बैंक का हिसाब अलग हो सकता है।",
      "₹10,000 bill − ₹500 payment = ₹9,500 baaki. Ismein naya byaaj ya fees nahin jodi hai. Sirf example: ₹9,500 ka 2% = ₹190. Asli bank ka hisaab alag ho sakta hai.",
    ),
    mistake: t(
      "A credit limit is not your income. Paying the minimum does not erase the balance, and rewards do not cancel borrowing costs.",
      "क्रेडिट लिमिट आपकी कमाई नहीं है। छोटी किस्त देने से बाकी बिल मिट नहीं जाता। रिवॉर्ड मिलने से ब्याज का खर्च भी गायब नहीं होता।",
      "Credit limit aapki kamaai nahin hai. Chhoti kisht dene se baaki bill mit nahin jaata. Reward milne se byaaj ka kharch bhi gaayab nahin hota.",
    ),
    notes: [
      t(
        "Read total due, minimum due, due date, and the interest terms separately.",
        "पूरा बिल, minimum due, आखिरी तारीख और ब्याज की शर्तें अलग-अलग पढ़ें।",
        "Poora bill, minimum due, aakhiri taareekh aur byaaj ki shartein alag-alag padhein.",
      ),
      t(
        "The unpaid balance remains a debt.",
        "बचा हुआ बिल अब भी आपका कर्ज़ है।",
        "Bacha hua bill ab bhi aapka karz hai.",
      ),
      t(
        "If you cannot pay, contact the issuer early and understand the available terms.",
        "पेमेंट मुश्किल हो तो बैंक से जल्दी बात करें। दिए गए विकल्पों की शर्तें समझें।",
        "Payment mushkil ho toh bank se jaldi baat karein. Diye gaye vikalpon ki shartein samjhein.",
      ),
    ],
    action: t(
      "Without sharing personal details, find total due and interest terms on a sample or your own card statement. If you have no card, use the example here.",
      "अपनी जानकारी शेयर किए बिना, कार्ड बिल में पूरा बकाया और ब्याज की शर्तें खोजें। कार्ड नहीं है तो इसी example से सीखें।",
      "Apni jaankaari share kiye bina, card bill mein poora bakaaya aur byaaj ki shartein khojein. Card nahin hai toh isi example se seekhein.",
    ),
    exercises: [
      document(
        "credit-card-1",
        t(
          "Which line gives the full statement bill, not just the minimum?",
          "कौन-सी लाइन पूरा बिल बताती है, सिर्फ़ छोटी किस्त नहीं?",
          "Kaun-si line poora bill bataati hai, sirf chhoti kisht nahin?",
        ),
        t(
          "Practice card bill · not a real bank offer",
          "सीखने का कार्ड बिल · किसी बैंक का ऑफ़र नहीं",
          "Seekhne ka card bill · kisi bank ka offer nahin",
        ),
        cardBill,
        0,
        t(
          "The full statement balance is ₹10,000; ₹500 is only the minimum shown.",
          "पूरा बिल ₹10,000 है। ₹500 सिर्फ़ बताई गई छोटी किस्त है।",
          "Poora bill ₹10,000 hai. ₹500 sirf bataayi gayi chhoti kisht hai.",
        ),
      ),
      numeric(
        "credit-card-2",
        t(
          "₹10,000 bill minus ₹500 paid. Unpaid principal in rupees?",
          "₹10,000 बिल में से ₹500 दिए। उधार के कितने रुपये अभी बाकी हैं?",
          "₹10,000 bill mein se ₹500 diye. Udhaar ke kitne rupaye abhi baaki hain?",
        ),
        9500,
        t(
          "₹10,000 − ₹500 = ₹9,500, before new interest or fees.",
          "₹10,000 − ₹500 = ₹9,500। नया ब्याज या फ़ीस अलग से हो सकती है।",
          "₹10,000 − ₹500 = ₹9,500. Naya byaaj ya fees alag se ho sakti hai.",
        ),
        { operation: "subtract", values: [10000, 500] },
      ),
      choice(
        "credit-card-3",
        t(
          "Paying the minimum makes the rest of the bill disappear.",
          "minimum due देने से बाकी बिल मिट जाता है।",
          "Minimum due dene se baaki bill mit jaata hai.",
        ),
        truth,
        1,
        t(
          "The rest is still owed. Minimum and full payment mean different things.",
          "बाकी पैसे अब भी देने हैं। छोटी किस्त और पूरा पेमेंट अलग हैं।",
          "Baaki paise ab bhi dene hain. Chhoti kisht aur poora payment alag hain.",
        ),
      ),
      bucket(
        "credit-card-4",
        t(
          "Sort borrowed spending power and money you already own.",
          "किसमें उधार की सुविधा है, किसमें अपने पैसे? सही जगह रखें।",
          "Kis mein udhaar ki suvidha hai, kis mein apne paise? Sahi jagah rakhein.",
        ),
        [
          t(
            "₹50,000 card credit limit",
            "कार्ड की ₹50,000 क्रेडिट लिमिट",
            "Card ki ₹50,000 credit limit",
          ),
          t(
            "₹20,000 salary in your bank",
            "बैंक में अपनी ₹20,000 सैलरी",
            "Bank mein apni ₹20,000 salary",
          ),
          t(
            "₹10,000 personal loan",
            "₹10,000 का पर्सनल लोन",
            "₹10,000 ka personal loan",
          ),
        ],
        [
          t("Borrowed credit", "उधार की सुविधा", "Udhaar ki suvidha"),
          t("Your own money", "अपने पैसे", "Apne paise"),
        ],
        [0, 1, 0],
        t(
          "A card limit and loan are borrowing. Salary already received is your money.",
          "कार्ड लिमिट और लोन उधार हैं। मिली हुई सैलरी आपकी कमाई है।",
          "Card limit aur loan udhaar hain. Mili hui salary aapki kamaai hai.",
        ),
      ),
      numeric(
        "credit-card-5",
        t(
          "For illustration only, 2% of ₹9,500 is how many rupees?",
          "सिर्फ़ example: ₹9,500 का 2% कितने रुपये है?",
          "Sirf example: ₹9,500 ka 2% kitne rupaye hai?",
        ),
        190,
        t(
          "₹9,500 × 0.02 = ₹190. Real issuers may use daily balances and additional terms.",
          "₹9,500 × 0.02 = ₹190। असली बैंक दिन के बैलेंस और दूसरी शर्तों से हिसाब कर सकता है।",
          "₹9,500 × 0.02 = ₹190. Asli bank din ke balance aur doosri sharton se hisaab kar sakta hai.",
        ),
        { operation: "multiply", values: [9500, 0.02] },
      ),
      choice(
        "credit-card-6",
        t(
          "Where do you find the actual cost of carrying a balance?",
          "बचा बिल आगे ले जाने का असली खर्च कहाँ समझेंगे?",
          "Bacha bill aage le jaane ka asli kharch kahan samjhenge?",
        ),
        [
          t(
            "Only from a rewards advertisement",
            "सिर्फ़ रिवॉर्ड वाले ऐड से",
            "Sirf reward waale ad se",
          ),
          t(
            "From a friend’s different card",
            "दोस्त के अलग कार्ड से",
            "Dost ke alag card se",
          ),
          t(
            "Your issuer’s statement and official terms",
            "अपने बैंक के बिल और ऑफ़िशियल शर्तों से",
            "Apne bank ke bill aur official sharton se",
          ),
        ],
        2,
        t(
          "Rates, fees, dates, and calculation methods depend on the actual agreement.",
          "रेट, फ़ीस, तारीख और हिसाब का तरीका असली शर्तों में मिलता है।",
          "Rate, fees, taareekh aur hisaab ka tareeka asli sharton mein milta hai.",
        ),
      ),
      order(
        "credit-card-7",
        t(
          "Make sense of a card bill before paying.",
          "पेमेंट से पहले कार्ड बिल समझें। सही क्रम चुनें।",
          "Payment se pehle card bill samjhein. Sahi kram chunein.",
        ),
        [
          t(
            "Plan payment before the due date; contact the issuer early if needed",
            "आखिरी तारीख से पहले पेमेंट प्लान करें; मुश्किल हो तो जल्दी बात करें",
            "Aakhiri taareekh se pehle payment plan karein; mushkil ho toh jaldi baat karein",
          ),
          t(
            "Match transactions to your purchases",
            "पेमेंट अपनी खरीदारी से मिलाएं",
            "Payment apni khareedaari se milaayein",
          ),
          t(
            "Read total, minimum, date, and interest terms",
            "पूरा बिल, छोटी किस्त, तारीख और ब्याज पढ़ें",
            "Poora bill, chhoti kisht, taareekh aur byaaj padhein",
          ),
        ],
        [1, 2, 0],
        t(
          "Check transactions → understand the bill → plan the payment.",
          "पेमेंट मिलाएं → बिल समझें → पेमेंट का प्लान बनाएं।",
          "Payment milaayein → bill samjhein → payment ka plan banaayein.",
        ),
      ),
      choice(
        "credit-card-8",
        t(
          "What if you cannot afford the required payment?",
          "ज़रूरी पेमेंट देना मुश्किल हो तो क्या करें?",
          "Zaroori payment dena mushkil ho toh kya karein?",
        ),
        [
          t(
            "Contact the issuer early and ask about the terms of available help",
            "बैंक से जल्दी बात करें और मदद की शर्तें पूछें",
            "Bank se jaldi baat karein aur madad ki shartein poochhein",
          ),
          t(
            "Assume the debt is cancelled",
            "मान लें कि कर्ज़ माफ़ हो गया",
            "Maan lein ki karz maaf ho gaya",
          ),
          t(
            "Borrow blindly from an unknown app",
            "बिना समझे अनजान ऐप से उधार लें",
            "Bina samjhe anjaan app se udhaar lein",
          ),
        ],
        0,
        t(
          "Early contact helps you understand options. Do not replace one debt with an unexamined one.",
          "जल्दी बात करके विकल्प समझें। एक कर्ज़ के बदले बिना समझे दूसरा कर्ज़ न लें।",
          "Jaldi baat karke vikalp samjhein. Ek karz ke badle bina samjhe doosra karz na lein.",
        ),
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "debt-plan",
    skill: "S0.6.8",
    title: t(
      "A calmer way out of debt",
      "कर्ज़ से निकलने का प्लान",
      "Karz se nikalne ka plan",
    ),
    subtitle: t(
      "One clear list. One manageable next step.",
      "एक साफ़ लिस्ट। फिर एक छोटा कदम।",
      "Ek saaf list. Phir ek chhota kadam.",
    ),
    minutes: 6,
    icon: "ListChecks",
    hook: t(
      "Priya has two loans and ₹1,000 extra after essentials and required payments. Should she choose the biggest balance, the smallest, or the highest rate?",
      "प्रिया के दो लोन हैं। ज़रूरी खर्च और किस्तों के बाद ₹1,000 एक्स्ट्रा बचे हैं। बड़ा लोन पहले, छोटा पहले या ज़्यादा ब्याज वाला?",
      "Priya ke do loan hain. Zaroori kharch aur kishton ke baad ₹1,000 extra bache hain. Bada loan pehle, chhota pehle ya zyada byaaj waala?",
    ),
    idea: t(
      "List balances, comparable interest rates, fees, and required payments. Protect essentials. With extra money after required payments, avalanche targets the highest rate; snowball targets the smallest balance for motivation. If minimums are unaffordable, seek help first.",
      "हर लोन के बचे पैसे, एक जैसे समय के ब्याज रेट, फ़ीस और किस्त लिखें। पहले ज़रूरी खर्च संभालें। फिर एक्स्ट्रा पैसों से सबसे ऊँचे रेट वाला कर्ज़ घटाना avalanche है। सबसे छोटा कर्ज़ पहले खत्म करना snowball है। किस्तें मुश्किल हों तो पहले मदद लें।",
      "Har loan ke bache paise, ek jaise samay ke byaaj rate, fees aur kisht likhein. Pehle zaroori kharch sambhaalein. Phir extra paison se sabse oonche rate waala karz ghataana avalanche hai. Sabse chhota karz pehle khatam karna snowball hai. Kishtein mushkil hon toh pehle madad lein.",
    ),
    example: t(
      "Fictional loans: A ₹10,000 at 24% yearly; B ₹30,000 at 12%. Using annual rate ÷ 12 for a simplified month: A costs ₹200 and B ₹300. An extra ₹1,000 reduces next month’s interest by ₹20 on A or ₹10 on B, ignoring fees.",
      "सिर्फ़ example: A ₹10,000, सालाना 24%। B ₹30,000, सालाना 12%। आसान हिसाब में सालाना रेट ÷ 12: A का एक महीने का ब्याज ₹200, B का ₹300। एक्स्ट्रा ₹1,000 चुकाने पर अगले महीने A में ₹20, B में ₹10 ब्याज कम होगा। फ़ीस नहीं जोड़ी है।",
      "Sirf example: A ₹10,000, saalaana 24%. B ₹30,000, saalaana 12%. Aasaan hisaab mein saalaana rate ÷ 12: A ka ek mahine ka byaaj ₹200, B ka ₹300. Extra ₹1,000 chukaane par agle mahine A mein ₹20, B mein ₹10 byaaj kam hoga. Fees nahin jodi hai.",
    ),
    mistake: t(
      "Comparing a monthly rate with a yearly rate can mislead. Extra repayment must also consider prepayment fees, essential needs, and the actual loan terms.",
      "महीने के रेट को सीधे साल के रेट से न मिलाएं। एक्स्ट्रा किस्त से पहले ज़रूरी खर्च, जल्दी चुकाने की फ़ीस और लोन की शर्तें देखें।",
      "Mahine ke rate ko seedhe saal ke rate se na milaayein. Extra kisht se pehle zaroori kharch, jaldi chukaane ki fees aur loan ki shartein dekhein.",
    ),
    notes: [
      t(
        "Compare rates over the same time period.",
        "रेट मिलाते समय दोनों का समय एक जैसा रखें।",
        "Rate milaate samay dono ka samay ek jaisa rakhein.",
      ),
      t(
        "Avalanche: highest interest rate first, after required payments.",
        "ज़रूरी किस्तों के बाद ऊँचे रेट वाला कर्ज़ पहले घटाना avalanche है।",
        "Zaroori kishton ke baad oonche rate waala karz pehle ghataana avalanche hai.",
      ),
      t(
        "Snowball: smallest balance first; motivation can help, but interest may cost more.",
        "छोटा कर्ज़ पहले खत्म करना snowball है। हिम्मत मिल सकती है, पर ब्याज ज़्यादा पड़ सकता है।",
        "Chhota karz pehle khatam karna snowball hai. Himmat mil sakti hai, par byaaj zyada pad sakta hai.",
      ),
    ],
    action: t(
      "Privately list each debt’s balance, rate period, required payment, and fees. If the payments are unaffordable, contact the lender or a qualified counsellor before making a new borrowing decision.",
      "प्राइवेट लिस्ट बनाएं: बचे पैसे, रेट किस समय का है, किस्त और फ़ीस। किस्तें मुश्किल हों तो नया उधार लेने से पहले बैंक या भरोसेमंद जानकार से मदद लें।",
      "Private list banaayein: bache paise, rate kis samay ka hai, kisht aur fees. Kishtein mushkil hon toh naya udhaar lene se pehle bank ya bharosemand jaankaar se madad lein.",
    ),
    exercises: [
      document(
        "debt-plan-1",
        t(
          "Which fictional loan has the higher annual rate?",
          "इन example लोन में किसका सालाना रेट ज़्यादा है?",
          "In example loan mein kiska saalaana rate zyada hai?",
        ),
        t(
          "Priya’s practice debt list · rates are examples",
          "प्रिया की सीखने वाली लिस्ट · रेट सिर्फ़ example हैं",
          "Priya ki seekhne waali list · rate sirf example hain",
        ),
        debts,
        0,
        t(
          "A has the higher rate: 24% yearly versus 12%, even though B has the larger balance.",
          "A का सालाना रेट 24% है, B का 12%। B में बचे पैसे ज़्यादा हैं, पर रेट A का ऊँचा है।",
          "A ka saalaana rate 24% hai, B ka 12%. B mein bache paise zyada hain, par rate A ka ooncha hai.",
        ),
      ),
      numeric(
        "debt-plan-2",
        t(
          "For a simplified month, 2% of ₹10,000 is how many rupees?",
          "आसान एक महीने के example में ₹10,000 का 2% कितना है?",
          "Aasaan ek mahine ke example mein ₹10,000 ka 2% kitna hai?",
        ),
        200,
        t(
          "₹10,000 × 0.02 = ₹200. This is a simplified example, not a quoted loan rate.",
          "₹10,000 × 0.02 = ₹200। यह आसान example है, किसी लोन का ऑफ़र नहीं।",
          "₹10,000 × 0.02 = ₹200. Yeh aasaan example hai, kisi loan ka offer nahin.",
        ),
        { operation: "multiply", values: [10000, 0.02] },
      ),
      choice(
        "debt-plan-3",
        t(
          "Avalanche always targets the largest balance first.",
          "avalanche में हमेशा सबसे बड़ा लोन पहले घटाते हैं।",
          "Avalanche mein hamesha sabse bada loan pehle ghataate hain.",
        ),
        truth,
        1,
        t(
          "Avalanche targets the highest comparable rate after required payments, considering fees and terms.",
          "ज़रूरी किस्तों के बाद avalanche में ऊँचे रेट को पहले देखते हैं। फ़ीस और शर्तें भी समझनी हैं।",
          "Zaroori kishton ke baad avalanche mein oonche rate ko pehle dekhte hain. Fees aur shartein bhi samajhni hain.",
        ),
      ),
      numeric(
        "debt-plan-4",
        t(
          "₹1,000 extra repayment at a simplified 2% monthly rate avoids how many rupees of next month’s interest?",
          "आसान example में महीने का रेट 2% है। ₹1,000 एक्स्ट्रा चुकाने से अगले महीने कितने रुपये ब्याज कम होंगे?",
          "Aasaan example mein mahine ka rate 2% hai. ₹1,000 extra chukaane se agle mahine kitne rupaye byaaj kam honge?",
        ),
        20,
        t(
          "₹1,000 × 0.02 = ₹20, with unchanged rates and no extra fees.",
          "₹1,000 × 0.02 = ₹20। इसमें रेट वही माना है और एक्स्ट्रा फ़ीस नहीं है।",
          "₹1,000 × 0.02 = ₹20. Ismein rate wahi maana hai aur extra fees nahin hai.",
        ),
        { operation: "multiply", values: [1000, 0.02] },
      ),
      order(
        "debt-plan-5",
        t(
          "Build a repayment plan in a sensible order.",
          "कर्ज़ चुकाने का प्लान किस क्रम से बनाएं?",
          "Karz chukaane ka plan kis kram se banaayein?",
        ),
        [
          t(
            "Choose a strategy for genuinely extra money",
            "सच में बचे एक्स्ट्रा पैसों का तरीका चुनें",
            "Sach mein bache extra paison ka tareeka chunein",
          ),
          t(
            "List debts, rates, minimums, and fees",
            "लोन, रेट, किस्त और फ़ीस लिखें",
            "Loan, rate, kisht aur fees likhein",
          ),
          t(
            "Check essentials and whether required payments are affordable",
            "ज़रूरी खर्च और किस्तें दे पाएंगे या नहीं, चेक करें",
            "Zaroori kharch aur kishtein de paayenge ya nahin, check karein",
          ),
        ],
        [1, 2, 0],
        t(
          "List → check affordability → allocate extra. If required payments are not affordable, seek help first.",
          "लिस्ट → खर्च और किस्तें चेक → एक्स्ट्रा पैसों का प्लान। ज़रूरी किस्तें मुश्किल हों तो पहले मदद लें।",
          "List → kharch aur kishtein check → extra paison ka plan. Zaroori kishtein mushkil hon toh pehle madad lein.",
        ),
      ),
      choice(
        "debt-plan-6",
        t(
          "What does snowball prioritise?",
          "snowball में पहले क्या देखते हैं?",
          "Snowball mein pehle kya dekhte hain?",
        ),
        [
          t(
            "The smallest outstanding balance",
            "सबसे कम बचे पैसों वाला कर्ज़",
            "Sabse kam bache paison waala karz",
          ),
          t("Only a lender’s logo", "सिर्फ़ बैंक का लोगो", "Sirf bank ka logo"),
          t("The newest advertisement", "सबसे नया ऐड", "Sabse naya ad"),
        ],
        0,
        t(
          "Small wins may help motivation, but this may cost more interest than avalanche.",
          "छोटा कर्ज़ खत्म होने से हिम्मत मिल सकती है। पर avalanche से ज़्यादा ब्याज पड़ सकता है।",
          "Chhota karz khatam hone se himmat mil sakti hai. Par avalanche se zyada byaaj pad sakta hai.",
        ),
      ),
      document(
        "debt-plan-7",
        t(
          "Which loan would cost ₹300 for one simplified month at annual rate ÷ 12?",
          "सालाना रेट ÷ 12 वाले आसान हिसाब में किसका एक महीने का ब्याज ₹300 है?",
          "Saalaana rate ÷ 12 waale aasaan hisaab mein kiska ek mahine ka byaaj ₹300 hai?",
        ),
        t(
          "Practice list · simple monthly illustration, no fees",
          "सीखने की लिस्ट · आसान मासिक हिसाब, फ़ीस नहीं जोड़ी",
          "Seekhne ki list · aasaan maasik hisaab, fees nahin jodi",
        ),
        debts,
        1,
        t(
          "B: ₹30,000 × (12% ÷ 12) = ₹300. Total interest and interest rate are different comparisons.",
          "B: ₹30,000 × (12% ÷ 12) = ₹300। कुल ब्याज और ब्याज का रेट अलग चीज़ें हैं।",
          "B: ₹30,000 × (12% ÷ 12) = ₹300. Kul byaaj aur byaaj ka rate alag cheezein hain.",
        ),
      ),
      choice(
        "debt-plan-8",
        t(
          "You cannot cover essentials and required payments. What next?",
          "ज़रूरी खर्च और किस्तों के पैसे पूरे नहीं हैं। अब क्या?",
          "Zaroori kharch aur kishton ke paise poore nahin hain. Ab kya?",
        ),
        [
          t(
            "Blindly borrow from an unknown app",
            "अनजान ऐप से बिना सोचे उधार लें",
            "Anjaan app se bina soche udhaar lein",
          ),
          t(
            "Ignore all lenders indefinitely",
            "बैंक की बात हमेशा टालते रहें",
            "Bank ki baat hamesha taalte rahein",
          ),
          t(
            "Contact lenders early and seek qualified help",
            "बैंक से जल्दी बात करें और सही मदद लें",
            "Bank se jaldi baat karein aur sahi madad lein",
          ),
        ],
        2,
        t(
          "Understand options and costs before taking new debt. A repayment strategy alone cannot fix an unaffordable cash flow.",
          "नया कर्ज़ लेने से पहले विकल्प और खर्च समझें। पैसे कम पड़ रहे हों, तो सिर्फ़ किस्तों का क्रम बदलना काफ़ी नहीं।",
          "Naya karz lene se pehle vikalp aur kharch samjhein. Paise kam pad rahe hon, toh sirf kishton ka kram badalna kaafi nahin.",
        ),
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
];
