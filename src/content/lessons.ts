import { identitySafetyLesson } from "./identity-safety";
import { choice, numeric, order, t } from "./schema";
import type { Lesson } from "./schema";
import { everydayLessons } from "./everyday";
import { protectionLessons } from "./protection";
import { interestLessons } from "./interest";
import { planningLessons } from "./planning";
import { borrowingLessons } from "./borrowing";
import { payslipLesson } from "./payslip";
import { irregularIncomeLesson } from "./irregular";
export { read, t } from "./schema";
export type { Language, Text, Exercise, Lesson } from "./schema";
const yn = [t("True", "सही", "Sahi"), t("False", "गलत", "Galat")];
const sources = [
  "https://www.rbi.org.in/FinancialEducation/",
  "https://investor.sebi.gov.in/",
];
export const lessons: Lesson[] = [
  {
    id: "money",
    skill: "S0.1.1",
    title: t("Meet your money", "पैसों से दोस्ती", "Paison se dosti"),
    subtitle: t(
      "Big dreams start with the basics.",
      "बड़े सपनों की छोटी शुरुआत।",
      "Bade sapnon ki chhoti shuruaat.",
    ),
    minutes: 5,
    icon: "Wallet",
    hook: t(
      "Raju grows wheat. He needs a haircut. But the barber wants rice, not wheat. Now what?",
      "राजू गेहूँ उगाता है। उसे बाल कटवाने हैं। लेकिन नाई को चावल चाहिए। अब क्या?",
      "Raju gehun ugata hai. Use baal katwane hain. Lekin naai ko chawal chahiye. Ab kya?",
    ),
    idea: t(
      "Swapping goods directly (barter) works when both people want what the other has. Money makes this easier: sell your wheat, then pay the barber.",
      "चीज़ों के बदले चीज़ें देना अदला-बदली है। दोनों को एक-दूसरे की चीज़ चाहिए। पैसा इसे आसान बनाता है। गेहूँ बेचें, फिर नाई को पैसे दें।",
      "Cheezon ke badle cheezein dena adla-badli hai. Dono ko ek-doosre ki cheez chahiye. Paisa ise aasaan banata hai. Gehun bechein, phir naai ko paise dein.",
    ),
    example: t(
      "Raju sells wheat for ₹200. His haircut costs ₹80. ₹200 − ₹80 = ₹120 left. Money helps him trade with two different people.",
      "राजू गेहूँ ₹200 में बेचता है। बाल कटवाने में ₹80 लगते हैं। ₹200 − ₹80 = ₹120 बाकी।",
      "Raju gehun ₹200 mein bechta hai. Baal katwane mein ₹80 lagte hain. ₹200 − ₹80 = ₹120 baaki.",
    ),
    mistake: t(
      "A higher price does not always mean more value. A useful ₹200 umbrella can matter more than a ₹2,000 decoration.",
      "महँगी चीज़ हमेशा ज़्यादा काम की नहीं होती। कभी ₹200 की छतरी भी ₹2,000 की सजावट से ज़्यादा काम आती है।",
      "Zyada daam ka matlab hamesha zyada upyog nahin. Kaam ki ₹200 ki chhatri zyada madadgaar ho sakti hai.",
    ),
    notes: [
      t(
        "Money is a common way to pay.",
        "पैसे देकर हम चीज़ें खरीदते हैं और काम करवाते हैं।",
        "Paisa bhugtaan ka saajha tareeka hai.",
      ),
      t(
        "Barter needs both people to want the swap.",
        "अदला-बदली तभी होगी, जब दोनों को एक-दूसरे की चीज़ चाहिए।",
        "Adla-badli ke liye dono ki sehmati chahiye.",
      ),
      t(
        "Price is what you pay. Value is what it does for you.",
        "दाम वह है जो आप देते हैं। वैल्यू वह है जो आपके काम आए।",
        "Daam bhugtaan hai. Moolya aapki zaroorat poori karna hai.",
      ),
    ],
    action: t(
      "Find one thing you bought this week. Was its usefulness worth its price?",
      "इस हफ़्ते खरीदी कोई चीज़ सोचें। जितने पैसे दिए, क्या उतना काम आई?",
      "Is hafte khareedi ek cheez dekhein. Kya uski upyogita daam ke laayak thi?",
    ),
    exercises: [
      choice(
        "money-1",
        t(
          "Why was Raju’s swap difficult?",
          "राजू की अदला-बदली मुश्किल क्यों थी?",
          "Raju ki adla-badli mushkil kyun thi?",
        ),
        [
          t(
            "The barber did not want wheat",
            "नाई को गेहूँ नहीं चाहिए था",
            "Naai ko gehun nahin chahiye tha",
          ),
          t(
            "Wheat has no use",
            "गेहूँ किसी काम का नहीं",
            "Gehun ka koi upyog nahin",
          ),
          t(
            "Haircuts cannot be paid for",
            "बाल कटवाने के पैसे नहीं दिए जा सकते",
            "Baal katwane ka bhugtaan nahin ho sakta",
          ),
        ],
        0,
        t(
          "Barter needs a match on both sides. Money removes that need.",
          "अदला-बदली में दोनों की ज़रूरत मिलनी चाहिए। पैसा यह मुश्किल हटाता है।",
          "Adla-badli mein dono ki zaroorat milni chahiye. Paisa yeh mushkil hataata hai.",
        ),
      ),
      choice(
        "money-2",
        t(
          "Which is barter?",
          "अदला-बदली कौन-सी है?",
          "Adla-badli kaun-si hai?",
        ),
        [
          t(
            "Paying ₹20 for tea",
            "चाय के लिए ₹20 देना",
            "Chai ke liye ₹20 dena",
          ),
          t(
            "Trading rice for vegetables",
            "चावल के बदले सब्ज़ी लेना",
            "Chawal ke badle sabzi lena",
          ),
          t("Receiving your salary", "सैलरी मिलना", "Salary milna"),
        ],
        1,
        t(
          "Goods exchanged for goods is barter.",
          "चीज़ों के बदले चीज़ें लेना अदला-बदली है।",
          "Cheezon ke badle cheezein lena adla-badli hai.",
        ),
      ),
      numeric(
        "money-3",
        t(
          "Raju has ₹200 and spends ₹80. How many rupees remain?",
          "राजू के पास ₹200 हैं। वह ₹80 खर्च करता है। कितने रुपये बचे?",
          "Raju ke paas ₹200 hain. Woh ₹80 kharch karta hai. Kitne rupaye bache?",
        ),
        120,
        t("₹200 − ₹80 = ₹120.", "₹200 − ₹80 = ₹120।", "₹200 − ₹80 = ₹120."),
        { operation: "subtract", values: [200, 80] },
      ),
      choice(
        "money-4",
        t(
          "A bank balance can be money even without paper notes.",
          "कागज़ के नोटों के बिना भी बैंक बैलेंस पैसा है।",
          "Kaagaz ke noton ke bina bhi bank balance paisa hai.",
        ),
        yn,
        0,
        t(
          "Money can be recorded digitally in a bank account.",
          "बैंक खाते में पैसा डिजिटल रिकॉर्ड भी हो सकता है।",
          "Bank khaate mein paisa digital record bhi ho sakta hai.",
        ),
      ),
      order(
        "money-5",
        t(
          "Help Raju get his haircut. Tap in the right order.",
          "राजू की मदद करें। सही क्रम में टैप करें।",
          "Raju ki madad karein. Sahi kram mein tap karein.",
        ),
        [
          t("Pay the barber", "नाई को पैसे दें", "Naai ko paise dein"),
          t("Sell the wheat", "गेहूँ बेचें", "Gehun bechein"),
          t("Receive money", "पैसे लें", "Paise lein"),
        ],
        [1, 2, 0],
        t(
          "Sell wheat → receive money → pay for the haircut.",
          "गेहूँ बेचें → पैसे लें → नाई को पैसे दें।",
          "Gehun bechein → paise lein → baal katwane ka bhugtaan karein.",
        ),
      ),
      choice(
        "money-6",
        t(
          "A phone costs more, so it is always better for you.",
          "महँगा फ़ोन हमेशा आपके लिए बेहतर है।",
          "Mehnga phone hamesha aapke liye behtar hai.",
        ),
        yn,
        1,
        t(
          "Value depends on your needs, quality, and budget.",
          "आपकी ज़रूरत, चीज़ की क्वालिटी और बजट तय करते हैं कि वह कितने काम की है।",
          "Moolya aapki zaroorat, quality aur budget par nirbhar hai.",
        ),
      ),
      numeric(
        "money-7",
        t(
          "You buy 3 notebooks at ₹40 each. What is the total in rupees?",
          "आप ₹40 की 3 कॉपियाँ खरीदते हैं। कुल कितने रुपये हुए?",
          "Aap ₹40 ki 3 copies khareedte hain. Kul kitne rupaye hue?",
        ),
        120,
        t("3 × ₹40 = ₹120.", "3 × ₹40 = ₹120।", "3 × ₹40 = ₹120."),
        { operation: "multiply", values: [3, 40] },
      ),
      choice(
        "money-8",
        t(
          "What is money especially useful for?",
          "पैसा किसमें मदद करता है?",
          "Paisa kis mein madad karta hai?",
        ),
        [
          t(
            "Making every purchase wise",
            "हर खरीदारी समझदार बनाना",
            "Har khareedaari samajhdaar banana",
          ),
          t(
            "Removing every financial risk",
            "पैसों के सारे रिस्क मिटाना",
            "Saare aarthik jokhim hataana",
          ),
          t(
            "Trading without matching everyone’s wants",
            "बिना सबकी ज़रूरत मिलाए लेन-देन",
            "Bina sabki zaroorat milaaye len-den",
          ),
        ],
        2,
        t(
          "Money makes exchange easier. We still need thoughtful choices.",
          "पैसा लेन-देन आसान करता है। समझदारी से चुनना फिर भी ज़रूरी है।",
          "Paisa len-den aasaan karta hai. Samajhdaari se chunna phir bhi zaroori hai.",
        ),
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "income",
    skill: "S0.2.5",
    title: t(
      "Where does it all go?",
      "पैसे जाते कहाँ हैं?",
      "Paise jaate kahan hain?",
    ),
    subtitle: t(
      "Give every rupee a little attention.",
      "हर रुपये पर थोड़ा ध्यान।",
      "Har rupaye par thoda dhyaan.",
    ),
    minutes: 5,
    icon: "ArrowLeftRight",
    hook: t(
      "Sunita earns ₹30,000 a month but has nothing left on payday. A bigger salary alone may not solve this. Let’s follow her money.",
      "सुनीता महीने में ₹30,000 कमाती है। फिर भी महीने के आखिर में पैसे खत्म! चलो, उसका खर्च देखते हैं।",
      "Sunita har mahine ₹30,000 kamaati hai. Mahine ke ant mein kuch nahin bachta. Aaiye uska kharch dekhein.",
    ),
    idea: t(
      "Money comes in (income) and goes out (expenses). The difference (cash flow) shows whether more money came in or went out. Keep track of both to see what you can save and what spending you can change.",
      "इन्कम यानी आने वाला पैसा, जैसे सैलरी। खर्च यानी जाने वाला पैसा। दोनों का फ़र्क कैश फ़्लो है। हिसाब रखेंगे तो पता चलेगा, पैसे बचे या कम पड़े।",
      "Aay aane waala paisa hai. Kharch jaane waala paisa hai. Dono ka antar cash flow hai. Hisaab rakhne se bachat samajh aati hai.",
    ),
    example: t(
      "Income ₹30,000 − essential costs ₹18,000 − other spending ₹7,000 = ₹5,000 left over (surplus). Spending ₹80 a day adds up to ₹2,400 in 30 days.",
      "₹30,000 कमाई − ₹18,000 ज़रूरी खर्च − ₹7,000 बाकी खर्च = ₹5,000 बचे। रोज़ ₹80 खर्च करें तो 30 दिन में ₹2,400 हो जाते हैं।",
      "₹30,000 aay − ₹18,000 zaroori kharch − ₹7,000 anya kharch = ₹5,000 bachat. Roz ₹80 ka kharch 30 dinon mein ₹2,400 hai.",
    ),
    mistake: t(
      "A loan brings money in, but you have not earned it. You must pay it back under the agreed terms.",
      "लोन से पैसा आता है, लेकिन यह कमाई नहीं है। इसे वापस देना होता है।",
      "Loan se paisa aata hai, lekin yeh kamaai nahin hai. Ise waapas dena hota hai.",
    ),
    notes: [
      t(
        "Surplus = income − expenses.",
        "खर्च के बाद बचे पैसे = कमाई − खर्च।",
        "Bachat = aay − kharch.",
      ),
      t(
        "Small daily expenses add up.",
        "छोटे रोज़ के खर्च जुड़ते जाते हैं।",
        "Chhote roz ke kharch judte jaate hain.",
      ),
      t(
        "If your income changes each month, you may need more money set aside for gaps.",
        "हर महीने कमाई अलग हो तो कुछ एक्स्ट्रा पैसे अलग रखें। यही आपका बफ़र है।",
        "Aniyamit aay mein bada buffer madad karta hai.",
      ),
    ],
    action: t(
      "Write down every expense for the next 7 days, without judging yourself.",
      "अगले 7 दिन हर छोटा-बड़ा खर्च लिखें। खुद को जज नहीं करना है।",
      "Agle 7 din har kharch likhein. Khud ko dosh na dein.",
    ),
    exercises: [
      choice(
        "income-1",
        t("Which is earned income?", "कौन-सी कमाई है?", "Kaun-si kamaai hai?"),
        [
          t("Salary for your work", "काम की सैलरी", "Kaam ki salary"),
          t("A personal loan", "पर्सनल लोन", "Personal loan"),
          t("A credit-card limit", "क्रेडिट कार्ड लिमिट", "Credit card limit"),
        ],
        0,
        t(
          "Salary pays you for work. Loans and credit must be repaid.",
          "सैलरी काम की कमाई है। लोन और क्रेडिट वापस करने होते हैं।",
          "Salary kaam ki kamaai hai. Loan aur credit waapas karne hote hain.",
        ),
      ),
      numeric(
        "income-2",
        t(
          "₹30,000 income minus ₹25,000 expenses. Your surplus in rupees?",
          "₹30,000 कमाई और ₹25,000 खर्च। कितने रुपये बचे?",
          "₹30,000 aay, ₹25,000 kharch. Kitne rupaye bache?",
        ),
        5000,
        t(
          "₹30,000 − ₹25,000 = ₹5,000.",
          "₹30,000 − ₹25,000 = ₹5,000।",
          "₹30,000 − ₹25,000 = ₹5,000.",
        ),
        { operation: "subtract", values: [30000, 25000] },
      ),
      choice(
        "income-3",
        t(
          "Expenses are higher than income. What is happening?",
          "कमाई से ज़्यादा खर्च हो रहा है। इसका क्या मतलब है?",
          "Kharch aay se zyada hai. Kya ho raha hai?",
        ),
        [
          t("A surplus", "बचत", "Bachat"),
          t(
            "Negative cash flow",
            "नेगेटिव कैश फ़्लो: पैसे कम पड़ रहे हैं",
            "Negative cash flow",
          ),
          t("No change", "कोई बदलाव नहीं", "Koi badlaav nahin"),
        ],
        1,
        t(
          "You are using savings or borrowing to cover the gap.",
          "खर्च पूरे करने के लिए पुरानी बचत या उधार लेना पड़ रहा है।",
          "Antar bharne ke liye bachat ya udhaar lag raha hai.",
        ),
      ),
      numeric(
        "income-4",
        t(
          "₹80 daily for 30 days. How many rupees is that?",
          "रोज़ ₹80, 30 दिनों तक। कुल कितने रुपये?",
          "Roz ₹80, 30 dinon tak. Kul kitne rupaye?",
        ),
        2400,
        t("₹80 × 30 = ₹2,400.", "₹80 × 30 = ₹2,400।", "₹80 × 30 = ₹2,400."),
        { operation: "multiply", values: [80, 30] },
      ),
      choice(
        "income-5",
        t(
          "Borrowing ₹10,000 makes you ₹10,000 richer.",
          "₹10,000 उधार लेने से आप ₹10,000 अमीर हो गए।",
          "₹10,000 udhaar lene se aap ₹10,000 ameer ho gaye.",
        ),
        yn,
        1,
        t(
          "Your cash increases, but so does what you owe.",
          "हाथ में पैसे बढ़े, पर उतने पैसे लौटाने भी हैं।",
          "Nakad badhta hai, lekin karz bhi badhta hai.",
        ),
      ),
      order(
        "income-6",
        t(
          "Put a money check-in in order.",
          "पैसों का हिसाब सही क्रम में लगाएं।",
          "Paison ka hisaab sahi kram mein lagaayein.",
        ),
        [
          t("Calculate the difference", "फ़र्क निकालें", "Antar nikaalein"),
          t("List income", "कमाई लिखें", "Aay likhein"),
          t("Add up expenses", "खर्च जोड़ें", "Kharch jodein"),
        ],
        [1, 2, 0],
        t(
          "List income → add expenses → find your surplus or gap.",
          "कमाई लिखें → खर्च जोड़ें → देखें, पैसे बचे या कम पड़े।",
          "Aay likhein → kharch jodein → bachat ya kami nikaalein.",
        ),
      ),
      choice(
        "income-7",
        t(
          "For irregular earnings, plan essentials around…",
          "हर महीने कमाई अलग हो तो बजट किस महीने के हिसाब से बनाएं?",
          "Aniyamit kamaai mein zaroori kharch ka budget kis se banaayein?",
        ),
        [
          t(
            "Your best month ever",
            "सबसे अच्छी कमाई वाला महीना",
            "Sabse achchhi kamaai waala mahina",
          ),
          t("Your hoped-for bonus", "उम्मीद वाला बोनस", "Ummeed waala bonus"),
          t(
            "A conservative, lower-income month",
            "कम कमाई वाले महीने का अनुमान",
            "Kam kamaai waale mahine ka anumaan",
          ),
        ],
        2,
        t(
          "A cautious baseline helps you avoid relying on money that may not arrive.",
          "कम कमाई वाले महीने से प्लान बनाएं। जो पैसे आने पक्के नहीं, उन पर भरोसा करके खर्च न करें।",
          "Saavdhaan anumaan anishchit kamaai par nirbharta ghataata hai.",
        ),
      ),
      numeric(
        "income-8",
        t(
          "Income ₹25,000, spending ₹28,000. How many rupees is the shortfall?",
          "₹25,000 कमाई और ₹28,000 खर्च। कितने रुपये कम पड़े?",
          "₹25,000 aay, ₹28,000 kharch. Kitne rupaye ki kami hai?",
        ),
        3000,
        t(
          "₹28,000 − ₹25,000 = ₹3,000 shortfall.",
          "₹28,000 − ₹25,000 = ₹3,000 की कमी।",
          "₹28,000 − ₹25,000 = ₹3,000 ki kami.",
        ),
        { operation: "subtract", values: [28000, 25000] },
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "budget",
    skill: "S0.3.1",
    title: t(
      "A plan for every rupee",
      "हर रुपये का छोटा-सा प्लान",
      "Har rupaye ki yojana",
    ),
    subtitle: t(
      "Build a budget that fits your life.",
      "अपनी ज़िंदगी के हिसाब से बजट।",
      "Apni zindagi ke hisaab se budget.",
    ),
    minutes: 6,
    icon: "ChartPie",
    hook: t(
      "Aman wants to save ₹3,000. He waits until month-end. There is ₹200 left. What if saving came first?",
      "अमन ₹3,000 बचाना चाहता है। महीने के अंत में ₹200 बचे। अगर बचत पहले हो तो?",
      "Aman ₹3,000 bachaana chaahta hai. Mahine ke ant mein ₹200 bache. Agar bachat pehle ho toh?",
    ),
    idea: t(
      "A budget gives money a job before you spend it. Separate essentials, flexible wants, and savings. The 50/30/20 split is a starting example, not a rule for every household.",
      "बजट मतलब पैसों का प्लान। ज़रूरी खर्च, शौक और बचत के पैसे अलग सोचें। 50/30/20 एक शुरुआती तरीका है। इसे अपनी लाइफ़ के हिसाब से बदल सकते हैं।",
      "Budget kharch se pehle paison ka kaam tay karta hai. Zarooratein, ichchhaayein aur bachat alag rakhein. 50/30/20 sirf udaaharan hai, sabke liye niyam nahin.",
    ),
    example: t(
      "For ₹30,000: 50% needs = ₹15,000; 30% wants = ₹9,000; 20% savings = ₹6,000. If your essentials cost more, adapt the split.",
      "₹30,000 में: 50% ज़रूरतें = ₹15,000; 30% शौक = ₹9,000; 20% बचत = ₹6,000। ज़रूरी खर्च ज़्यादा हो तो यह बँटवारा बदलें।",
      "₹30,000 mein: 50% zarooratein = ₹15,000; 30% ichchhaayein = ₹9,000; 20% bachat = ₹6,000. Zaroori kharch zyada ho toh anupaat badlein.",
    ),
    mistake: t(
      "A monthly loan payment (EMI) must still be paid, even if you borrowed for something optional. Include it when planning required payments.",
      "कोई चीज़ शौक से खरीदी हो, तब भी उसकी EMI देनी है। बजट में EMI भूलना नहीं।",
      "Cheez ichchha ho sakti hai, par EMI tay bhugtaan hai. Budget mein use na bhoolein.",
    ),
    notes: [
      t(
        "Save on payday, then plan spending.",
        "सैलरी के दिन बचत अलग करें।",
        "Salary ke din bachat alag karein.",
      ),
      t(
        "A useful budget is realistic, not punishing.",
        "अच्छा बजट आपकी लाइफ़ में फिट होता है। वह सज़ा नहीं है।",
        "Achchha budget vyaavahaarik hai, saza nahin.",
      ),
      t(
        "Save monthly for predictable annual expenses.",
        "सालाना खर्च के लिए हर महीने बचाएं।",
        "Saalaana kharch ke liye har mahine bachaayein.",
      ),
    ],
    action: t(
      "Choose one cost you expect each year. Divide it by 12 and save that amount each month (a sinking fund).",
      "कोई साल भर का खर्च चुनें। उसे 12 से भाग दें। अब पता है, हर महीने कितना बचाना है।",
      "Ek saalaana kharch chunein. 12 se bhaag dekar maasik bachat nikaalein.",
    ),
    exercises: [
      choice(
        "budget-1",
        t(
          "Which is usually an essential?",
          "आमतौर पर कौन-सी ज़रूरत है?",
          "Aam taur par kaun-si zaroorat hai?",
        ),
        [
          t("Basic groceries", "ज़रूरी किराना", "Zaroori kiraana"),
          t(
            "A phone upgrade for fashion",
            "फ़ैशन के लिए नया फ़ोन",
            "Fashion ke liye naya phone",
          ),
          t(
            "A premium streaming plan",
            "प्रीमियम स्ट्रीमिंग प्लान",
            "Premium streaming plan",
          ),
        ],
        0,
        t(
          "Food is a need. Your situation determines the details of every budget.",
          "खाना ज़रूरी है। बाकी बजट अपनी ज़िंदगी के हिसाब से बनाएं।",
          "Bhojan zaroorat hai. Budget aapki sthiti par nirbhar karta hai.",
        ),
      ),
      numeric(
        "budget-2",
        t(
          "20% of ₹30,000 for savings. How many rupees?",
          "₹30,000 का 20% बचत। कितने रुपये?",
          "₹30,000 ka 20% bachat. Kitne rupaye?",
        ),
        6000,
        t(
          "₹30,000 × 0.20 = ₹6,000.",
          "₹30,000 × 0.20 = ₹6,000।",
          "₹30,000 × 0.20 = ₹6,000.",
        ),
        { operation: "multiply", values: [30000, 0.2] },
      ),
      choice(
        "budget-3",
        t(
          "50/30/20 must fit every family exactly.",
          "50/30/20 हर परिवार पर बिल्कुल लागू होना चाहिए।",
          "50/30/20 har parivaar par bilkul laagoo hona chahiye.",
        ),
        yn,
        1,
        t(
          "Rent, dependants, debt, and income change what is realistic.",
          "किराया, परिवार, कर्ज़ और कमाई अलग होते हैं। इसलिए पैसों का बँटवारा भी अलग होगा।",
          "Kiraaya, parivaar, karz aur aay ke hisaab se anupaat badalta hai.",
        ),
      ),
      numeric(
        "budget-4",
        t(
          "An annual fee is ₹60,000. Save how many rupees monthly for 12 months?",
          "सालाना फ़ीस ₹60,000 है। 12 महीने में हर महीने कितने रुपये बचाएं?",
          "Saalaana fees ₹60,000 hai. 12 mahine mein har mahine kitne rupaye bachaayein?",
        ),
        5000,
        t(
          "₹60,000 ÷ 12 = ₹5,000 each month.",
          "₹60,000 ÷ 12 = ₹5,000 हर महीने।",
          "₹60,000 ÷ 12 = ₹5,000 har mahine.",
        ),
        { operation: "multiply", values: [60000, 1 / 12] },
      ),
      order(
        "budget-5",
        t(
          "Try paying yourself first.",
          "सैलरी आते ही पहले बचत अलग करें। सही क्रम चुनें।",
          "Khud ko pehle bhugtaan karein.",
        ),
        [
          t(
            "Spend within the remaining budget",
            "बचे बजट में खर्च करें",
            "Bache budget mein kharch karein",
          ),
          t("Receive income", "कमाई आए", "Aay paayein"),
          t(
            "Transfer planned savings",
            "तय बचत अलग करें",
            "Tay bachat alag karein",
          ),
        ],
        [1, 2, 0],
        t(
          "Income → planned savings → thoughtful spending. Keep essential bills funded.",
          "कमाई आए → बचत अलग करें → बचे बजट में खर्च करें। ज़रूरी बिलों के पैसे रखना न भूलें।",
          "Aay → tay bachat → sochkar kharch. Zaroori billon ke paise rakhein.",
        ),
      ),
      choice(
        "budget-6",
        t(
          "A sinking fund is for…",
          "सिंकिंग फ़ंड, यानी पहले से पता खर्च के लिए बचत। यह किस काम आएगा?",
          "Sinking fund kis ke liye hai?",
        ),
        [
          t(
            "Unexpected emergencies only",
            "सिर्फ़ अचानक आई मुसीबत",
            "Sirf achaanak aayi museebat",
          ),
          t(
            "A known future expense",
            "आगे आने वाला खर्च, जो पहले से पता है",
            "Pehle se pata bhavishya ka kharch",
          ),
          t(
            "Borrowing every month",
            "हर महीने उधार लेना",
            "Har mahine udhaar lena",
          ),
        ],
        1,
        t(
          "School fees and festivals are predictable. Save ahead for them.",
          "स्कूल फ़ीस और त्योहार पहले से पता हैं। इनके लिए पहले बचाएं।",
          "School fees aur tyohaar pehle se pata hain. Inke liye pehle bachaayein.",
        ),
      ),
      numeric(
        "budget-7",
        t(
          "Income ₹40,000. Needs ₹24,000 and wants ₹10,000. What remains?",
          "₹40,000 कमाई। ₹24,000 ज़रूरतें और ₹10,000 शौक पर खर्च। कितने रुपये बचे?",
          "₹40,000 aay. ₹24,000 zarooratein, ₹10,000 ichchhaayein. Kitne rupaye bache?",
        ),
        6000,
        t(
          "₹40,000 − ₹24,000 − ₹10,000 = ₹6,000.",
          "₹40,000 − ₹24,000 − ₹10,000 = ₹6,000।",
          "₹40,000 − ₹24,000 − ₹10,000 = ₹6,000.",
        ),
        { operation: "subtract", values: [40000, 24000, 10000] },
      ),
      choice(
        "budget-8",
        t(
          "Your budget failed this month. What next?",
          "इस महीने बजट बिगड़ गया। अब क्या?",
          "Is mahine budget bigad gaya. Ab kya?",
        ),
        [
          t(
            "Stop tracking forever",
            "हमेशा के लिए हिसाब छोड़ दें",
            "Hamesha ke liye hisaab chhod dein",
          ),
          t("Hide the expenses", "खर्च छिपाएं", "Kharch chhipaayein"),
          t(
            "Review what changed and adjust",
            "बदलाव देखें और बजट सुधारें",
            "Badlaav dekhein aur budget sudhaarein",
          ),
        ],
        2,
        t(
          "A budget is a living plan. Adjust it without blaming yourself.",
          "बजट बदल सकता है। खुद को दोष दिए बिना सुधारें।",
          "Budget badal sakta hai. Khud ko dosh diye bina sudhaarein.",
        ),
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "safety",
    skill: "S0.9.1",
    title: t("Outsmart the scam", "स्कैम से बचें", "Scam se bachein"),
    subtitle: t(
      "A tiny pause can protect your savings.",
      "छोटा-सा विराम, बड़ी सुरक्षा।",
      "Chhota-sa viraam, badi suraksha.",
    ),
    minutes: 5,
    icon: "ShieldCheck",
    hook: t(
      "“Your refund is ready. Scan this QR and enter your UPI PIN.” Mia’s whiskers are twitching. Something is wrong.",
      "“रिफ़ंड तैयार है। QR स्कैन करें और UPI PIN डालें।” मिया को कुछ गड़बड़ लग रही है।",
      "“Refund taiyaar hai. QR scan karein aur UPI PIN daalein.” Mia ko kuch gadbad lag rahi hai.",
    ),
    idea: t(
      "Your secret payment code (UPI PIN) approves money going out (a debit) or another protected action. You do not enter it simply to receive a normal transfer. Stop if someone pressures you to scan, approve, or share a code.",
      "UPI PIN से आप पेमेंट जैसे काम approve करते हैं। आम तौर पर पैसे पाने के लिए PIN नहीं डालना होता। कोई जल्दी करवाए तो रुककर चेक करें।",
      "UPI PIN bhugtaan ya surakshit kaarrawaai ki anumati deta hai. Saamaanya paise paane ke liye PIN nahin chahiye. Dabaav mein scan ya manzoori na dein.",
    ),
    example: t(
      "A caller promises a ₹500 refund. A request actually says “Pay ₹5,000”. Read the amount and action inside your trusted app before doing anything.",
      "कॉलर कहता है, ₹500 वापस मिलेंगे। लेकिन ऐप में “₹5,000 Pay करें” दिख रहा है। पहले पढ़ें: पैसे आ रहे हैं या जा रहे हैं?",
      "Caller ₹500 lautaane ko kehta hai. App mein “₹5,000 bhugtaan karein” dikhta hai. Rakam aur kaarrawaai pehle padhein.",
    ),
    mistake: t(
      "A familiar logo or caller name does not prove identity. Contact the bank using its official app or your card’s printed number.",
      "लोगो या नाम देखकर भरोसा मत करें। बैंक का ऑफ़िशियल ऐप खोलकर खुद चेक करें।",
      "Pehchaana logo ya naam pehchaan ka saboot nahin. Bank ke aadhikaarik app se sampark karein.",
    ),
    notes: [
      t(
        "Never share your payment code (PIN) or one-time password (OTP) with a caller.",
        "कॉलर को PIN या OTP कभी न बताएं।",
        "Caller ko PIN ya OTP kabhi na bataayein.",
      ),
      t(
        "Read the action, recipient, and amount.",
        "चेक करें: क्या होगा, पैसे किसे जाएंगे और कितने जाएंगे।",
        "Kaarrawaai, paane waala aur rakam padhein.",
      ),
      t(
        "If money is lost, tell the bank quickly. Keep the messages and payment details as evidence.",
        "नुकसान हो तो बैंक को जल्द बताएं और सबूत रखें।",
        "Nuksaan ho toh bank ko jald bataayein aur saboot rakhein.",
      ),
    ],
    action: t(
      "Find your bank’s fraud-reporting option inside its official app before you need it.",
      "अपने बैंक के ऑफ़िशियल ऐप में देखें: फ़्रॉड की शिकायत कहाँ कर सकते हैं?",
      "Bank ke aadhikaarik app mein fraud report karne ka vikalp khojein.",
    ),
    exercises: [
      choice(
        "safety-1",
        t(
          "A stranger asks for your PIN to send a refund. You…",
          "रिफ़ंड भेजने के लिए अजनबी PIN माँगता है। आप…",
          "Refund bhejne ke liye ajnabi PIN maangta hai. Aap…",
        ),
        [
          t(
            "Stop and verify independently",
            "रुकें और खुद चेक करें",
            "Rukein aur khud pushti karein",
          ),
          t("Share it quickly", "जल्दी बता दें", "Jaldi bata dein"),
          t("Share half the PIN", "आधा PIN बताएं", "Aadha PIN bataayein"),
        ],
        0,
        t(
          "No caller needs your PIN to send you a normal transfer.",
          "सामान्य पैसे भेजने के लिए कॉलर को आपका PIN नहीं चाहिए।",
          "Saamaanya paise bhejne ke liye caller ko aapka PIN nahin chahiye.",
        ),
      ),
      choice(
        "safety-2",
        t(
          "A bank logo proves a message is genuine.",
          "बैंक का लोगो मैसेज असली होने का सबूत है।",
          "Bank ka logo message asli hone ka saboot hai.",
        ),
        yn,
        1,
        t(
          "Logos and sender names can be copied.",
          "लोगो और भेजने वाले के नाम की नकल हो सकती है।",
          "Logo aur bhejne waale ke naam ki nakal ho sakti hai.",
        ),
      ),
      choice(
        "safety-3",
        t(
          "Where should you verify a suspicious bank call?",
          "बैंक का कॉल अजीब लगे तो कहाँ चेक करेंगे?",
          "Shak waale bank call ki pushti kahan karein?",
        ),
        [
          t(
            "The link sent by the caller",
            "कॉलर के भेजे लिंक पर",
            "Caller ke bheje link par",
          ),
          t(
            "Your bank’s official app",
            "बैंक के ऑफ़िशियल ऐप में",
            "Bank ke aadhikaarik app mein",
          ),
          t(
            "A stranger’s WhatsApp group",
            "अजनबी के WhatsApp ग्रुप में",
            "Ajnabi ke WhatsApp group mein",
          ),
        ],
        1,
        t(
          "Use a contact route you found independently.",
          "बैंक का नंबर या ऐप खुद खोलें। कॉलर का भेजा लिंक न इस्तेमाल करें।",
          "Khud khoje aadhikaarik sampark ka upyog karein.",
        ),
      ),
      order(
        "safety-4",
        t(
          "You notice an unknown debit. Put these actions in order.",
          "ऐसा पेमेंट दिखा जो आपने नहीं किया। अब क्या करेंगे? सही क्रम चुनें।",
          "Anjaan bhugtaan dikhta hai. Kaarrawaai sahi kram mein lagaayein.",
        ),
        [
          t(
            "Keep records and follow up",
            "रिकॉर्ड रखें और आगे संपर्क करें",
            "Record rakhein aur aage sampark karein",
          ),
          t(
            "Stop contact with the suspected scammer",
            "शक वाले व्यक्ति से संपर्क रोकें",
            "Shak waale vyakti se sampark rokein",
          ),
          t(
            "Alert the bank using its official channel",
            "बैंक के ऑफ़िशियल ऐप या नंबर पर बताएं",
            "Aadhikaarik tareeke se bank ko bataayein",
          ),
        ],
        [1, 2, 0],
        t(
          "Stop the interaction, contact the bank promptly, and preserve evidence.",
          "बात रोकें, तुरंत बैंक से संपर्क करें और सबूत रखें।",
          "Baat rokein, turant bank se sampark karein aur saboot rakhein.",
        ),
      ),
      choice(
        "safety-5",
        t(
          "“Act in 2 minutes or lose your account!” is…",
          "“2 मिनट में करें, वरना खाता बंद!” यह…",
          "“2 minute mein karein, warna khaata band!” Yeh…",
        ),
        [
          t("A reason to rush", "जल्दी करने की वजह", "Jaldi karne ki wajah"),
          t("Proof of a real bank", "असली बैंक का सबूत", "Asli bank ka saboot"),
          t(
            "An urgency red flag",
            "खतरे का संकेत, यानी रेड फ़्लैग",
            "Jaldbaazi ka chetaavni sanket",
          ),
        ],
        2,
        t(
          "Manufactured urgency makes it harder to think clearly. Pause.",
          "जल्दबाज़ी का दबाव सोचने से रोकता है। रुकें।",
          "Jaldbaazi ka dabaav sochne se rokta hai. Rukein.",
        ),
      ),
      choice(
        "safety-6",
        t(
          "Should you install a screen-sharing app for a refund caller?",
          "रिफ़ंड कॉलर के लिए स्क्रीन-शेयर ऐप लगाएं?",
          "Refund caller ke liye screen-share app lagaayein?",
        ),
        [
          t(
            "No, stop the request",
            "नहीं, ऐसा करने से मना करें",
            "Nahin, anurodh rokein",
          ),
          t(
            "Yes, if they sound polite",
            "हाँ, अगर वे अच्छे से बोलें",
            "Haan, agar ve achchhe se bolein",
          ),
          t("Only at night", "सिर्फ़ रात को", "Sirf raat ko"),
        ],
        0,
        t(
          "Remote access can expose your banking activity and sensitive information.",
          "रिमोट एक्सेस से बैंकिंग और निजी जानकारी दिख सकती है।",
          "Remote access se banking aur niji jaankaari dikh sakti hai.",
        ),
      ),
      numeric(
        "safety-7",
        t(
          "₹500 was promised, but the debit request is ₹5,000. How many rupees larger is it?",
          "₹500 वापस मिलने थे। Pay करने का रिक्वेस्ट ₹5,000 का है। फ़र्क कितने रुपये का है?",
          "₹500 ka vaada tha. Anurodh ₹5,000 ka hai. Antar kitne rupaye?",
        ),
        4500,
        t(
          "₹5,000 − ₹500 = ₹4,500. More importantly, it is a debit, not a refund.",
          "₹5,000 − ₹500 = ₹4,500। और ध्यान दें: यह Pay करने को कह रहा है, रिफ़ंड नहीं दे रहा।",
          "₹5,000 − ₹500 = ₹4,500. Yeh bhugtaan hai, refund nahin.",
        ),
        { operation: "subtract", values: [5000, 500] },
      ),
      choice(
        "safety-8",
        t(
          "A caller knows your name. That makes sharing an OTP safe.",
          "कॉलर आपका नाम जानता है। इसलिए OTP बताना सुरक्षित है।",
          "Caller aapka naam jaanta hai. Isliye OTP bataana surakshit hai.",
        ),
        yn,
        1,
        t(
          "Knowing your name does not establish trust. Never share an OTP with a caller.",
          "नाम जानना भरोसे का सबूत नहीं। कॉलर को OTP न दें।",
          "Naam jaanna bharose ka saboot nahin. Caller ko OTP na dein.",
        ),
      ),
    ],
    sources: [
      ...sources,
      "https://www.npci.org.in/what-we-do/upi/safety-shield",
    ],
    reviewStatus: "editorial-draft",
  },
  {
    id: "compound",
    skill: "S0.5.2",
    title: t(
      "Your money’s little snowball",
      "पैसों का बढ़ता गोला",
      "Paison ka badhta gola",
    ),
    subtitle: t(
      "Meet the power of compounding.",
      "कंपाउंडिंग की ताकत जानें।",
      "Compounding ki taakat jaanein.",
    ),
    minutes: 6,
    icon: "Sprout",
    hook: t(
      "Mia plants a seed. It grows branches, then those branches grow more branches. Compounding is a little like that, with money.",
      "मिया ने एक बीज लगाया। पौधे पर डालियाँ आईं, फिर उन पर और डालियाँ। पैसों की कंपाउंडिंग भी कुछ ऐसी है!",
      "Mia beej lagaati hai. Shaakhaayein badhti hain, phir aur shaakhaayein nikalti hain. Compounding bhi kuch aisi hai.",
    ),
    idea: t(
      "You can earn interest only on your starting money (simple interest). You can also earn interest on that money and earlier interest (compound interest). Leaving the interest invested (reinvesting) gives it time to grow. Investments can also lose money.",
      "सिंपल इंटरेस्ट सिर्फ़ शुरुआत के पैसों पर मिलता है। कंपाउंडिंग में पहले मिले ब्याज पर भी ब्याज मिलता है। याद रखें: इन्वेस्टमेंट का रिटर्न माइनस भी हो सकता है।",
      "Saadhaaran byaaj mool rakam par milta hai. Chakravriddhi byaaj mein pichhle byaaj par bhi byaaj milta hai. Nivesh ka return negative bhi ho sakta hai.",
    ),
    example: t(
      "Assume 10% yearly, compounded yearly. ₹10,000 → ₹11,000 after year 1 → ₹12,100 after year 2. The extra ₹100 earns interest on the first year’s ₹1,000. This is an illustration.",
      "मान लो, हर साल 10% मिलता है और ब्याज जुड़ता रहता है। ₹10,000 → ₹11,000 → ₹12,100। एक्स्ट्रा ₹100 पहले के ₹1,000 ब्याज पर मिले। यह सिर्फ़ एक example है।",
      "Udaaharan: saalaana 10%, har saal compound. ₹10,000 → ₹11,000 → ₹12,100. Atirikt ₹100 pichhle ₹1,000 byaaj se aaye. Yeh sirf udaaharan hai.",
    ),
    mistake: t(
      "A smooth calculator line does not predict the market. Earnings can change. Taxes, fees, and rising prices (inflation) reduce what you keep or can buy.",
      "कैलकुलेटर की बढ़ती लाइन देखकर रिटर्न पक्का मत मानें। असली रिटर्न बदलता है। टैक्स, फ़ीस और महँगाई भी असर करते हैं।",
      "Calculator ki seedhi badhti line bhavishyavaani nahin. Asli returns badalte hain. Tax, fees aur mehngaai asar karte hain.",
    ),
    notes: [
      t(
        "With interest added each year: amount = starting money (principal) × (1 + yearly rate) ^ years. Write the rate as a decimal.",
        "हर साल कंपाउंडिंग का हिसाब: कुल पैसे = शुरुआती पैसे × (1 + सालाना रेट) ^ साल। 10% को 0.10 लिखें।",
        "Saalaana compounding: rakam = mooldhan × (1 + dar) ^ saal.",
      ),
      t(
        "Keeping earlier earnings invested (reinvesting) lets them earn more too.",
        "मिले रिटर्न को फिर इन्वेस्ट करें, तो उस पर भी रिटर्न मिल सकता है।",
        "Dobaara nivesh se pichhle return bhi badh sakte hain.",
      ),
      t(
        "An assumed return is not a promise.",
        "कैलकुलेटर में चुना रेट सिर्फ़ example है, रिटर्न का वादा नहीं।",
        "Maani hui dar koi vaada nahin hai.",
      ),
    ],
    action: t(
      "Open the growth playground. Compare 10 years with 20 using the same monthly amount.",
      "ग्रोथ कैलकुलेटर खोलें। हर महीने उतने ही पैसे डालें। अब 10 और 20 साल का फ़र्क देखें।",
      "Growth calculator kholein. Samaan maasik rakam se 10 aur 20 saal ki tulna karein.",
    ),
    exercises: [
      choice(
        "compound-1",
        t(
          "Compound interest includes returns on…",
          "कंपाउंड इंटरेस्ट, यानी ब्याज पर भी ब्याज। यह किस पर मिलता है?",
          "Chakravriddhi byaaj kis par milta hai?",
        ),
        [
          t(
            "Only the original money",
            "सिर्फ़ शुरुआत के पैसों पर",
            "Sirf mool rakam",
          ),
          t(
            "Original money and earlier interest",
            "शुरुआत के पैसे और पहले मिले ब्याज पर",
            "Mool rakam aur pichhla byaaj",
          ),
          t("Only borrowed money", "सिर्फ़ उधार रकम", "Sirf udhaar rakam"),
        ],
        1,
        t(
          "Keeping interest invested allows it to earn interest too.",
          "पहले मिला ब्याज लगा रहने दें, तो उस पर भी ब्याज मिल सकता है।",
          "Byaaj niveshit rahe toh us par bhi byaaj mil sakta hai.",
        ),
      ),
      numeric(
        "compound-2",
        t(
          "₹10,000 grows by an assumed 10% in one year. Total rupees?",
          "मान लो, ₹10,000 एक साल में 10% बढ़ते हैं। कुल कितने रुपये होंगे?",
          "₹10,000 par ek saal mein maani hui 10% vriddhi. Kul rupaye?",
        ),
        11000,
        t(
          "₹10,000 × 1.10 = ₹11,000.",
          "₹10,000 × 1.10 = ₹11,000।",
          "₹10,000 × 1.10 = ₹11,000.",
        ),
        { operation: "compound", values: [10000, 0.1, 1] },
      ),
      numeric(
        "compound-3",
        t(
          "₹11,000 grows by another assumed 10%. New total rupees?",
          "अब ₹11,000 फिर 10% बढ़ते हैं। कुल कितने रुपये हुए?",
          "₹11,000 par phir maani hui 10% vriddhi. Nayi kul rakam?",
        ),
        12100,
        t(
          "₹11,000 × 1.10 = ₹12,100.",
          "₹11,000 × 1.10 = ₹12,100।",
          "₹11,000 × 1.10 = ₹12,100.",
        ),
        { operation: "compound", values: [11000, 0.1, 1] },
      ),
      choice(
        "compound-4",
        t(
          "A calculator showing 10% means your investment must earn 10%.",
          "कैलकुलेटर में 10% दिख रहा है, तो इन्वेस्टमेंट में उतना मिलना पक्का है।",
          "Calculator mein 10% dikhe toh nivesh mein utna milna tay hai.",
        ),
        yn,
        1,
        t(
          "It is an assumption, not a prediction or promise.",
          "यह मानकर किया गया हिसाब है। असली रिटर्न का वादा नहीं।",
          "Yeh anumaan hai, bhavishyavaani ya vaada nahin.",
        ),
      ),
      order(
        "compound-5",
        t(
          "Put the compounding cycle in order.",
          "कंपाउंडिंग का क्रम लगाएं।",
          "Compounding ka kram lagaayein.",
        ),
        [
          t(
            "Returns can earn further returns",
            "रिटर्न पर और रिटर्न बन सकता है",
            "Return par aur return ban sakta hai",
          ),
          t("Invest an amount", "पैसे इन्वेस्ट करें", "Rakam nivesh karein"),
          t(
            "Reinvest any returns",
            "मिले रिटर्न फिर इन्वेस्ट करें",
            "Mile return phir nivesh karein",
          ),
        ],
        [1, 2, 0],
        t(
          "Invest → reinvest returns → allow time for compounding.",
          "इन्वेस्ट करें → रिटर्न फिर लगाएं → कंपाउंडिंग को समय दें।",
          "Nivesh → return phir nivesh → compounding ko samay dein.",
        ),
      ),
      numeric(
        "compound-6",
        t(
          "Simple interest: ₹10,000 × 10% × 2 years. Interest only, in rupees?",
          "सिंपल इंटरेस्ट: ₹10,000 × 10% × 2 साल। सिर्फ़ ब्याज कितने रुपये होगा?",
          "Saadhaaran byaaj: ₹10,000 × 10% × 2 saal. Sirf byaaj, rupaye mein?",
        ),
        2000,
        t(
          "₹10,000 × 0.10 × 2 = ₹2,000 interest.",
          "₹10,000 × 0.10 × 2 = ₹2,000 ब्याज।",
          "₹10,000 × 0.10 × 2 = ₹2,000 byaaj.",
        ),
        { operation: "multiply", values: [10000, 0.1, 2] },
      ),
      choice(
        "compound-7",
        t(
          "Which can reduce your actual purchasing power?",
          "असली खरीदने की ताकत किससे घट सकती है?",
          "Asli khareedne ki taakat kis se ghat sakti hai?",
        ),
        [
          t(
            "Only the colour of your bank card",
            "सिर्फ़ बैंक कार्ड का रंग",
            "Sirf bank card ka rang",
          ),
          t(
            "Taxes, fees, and inflation",
            "टैक्स, फ़ीस और महँगाई",
            "Tax, fees aur mehngaai",
          ),
          t("Reading statements", "स्टेटमेंट पढ़ना", "Statement padhna"),
        ],
        1,
        t(
          "A bigger balance does not automatically mean an equally bigger buying power.",
          "बड़ा बैलेंस हमेशा उतनी ही बड़ी खरीदने की ताकत नहीं है।",
          "Bada balance hamesha utni hi badi khareedne ki taakat nahin hai.",
        ),
      ),
      numeric(
        "compound-8",
        t(
          "Compound total ₹12,100 minus simple-interest total ₹12,000. Difference in rupees?",
          "कंपाउंडिंग से कुल ₹12,100। सिंपल इंटरेस्ट से कुल ₹12,000। फ़र्क कितने रुपये का है?",
          "Compound kul ₹12,100, saadhaaran byaaj kul ₹12,000. Antar kitne rupaye?",
        ),
        100,
        t(
          "₹12,100 − ₹12,000 = ₹100 from interest on interest.",
          "₹12,100 − ₹12,000 = ₹100 ब्याज पर ब्याज।",
          "₹12,100 − ₹12,000 = ₹100 byaaj par byaaj.",
        ),
        { operation: "subtract", values: [12100, 12000] },
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  {
    id: "emergency",
    skill: "S0.7.1",
    title: t(
      "Your rainy-day cushion",
      "मुश्किल दिनों का सहारा",
      "Mushkil dinon ka sahaara",
    ),
    subtitle: t(
      "Give your future self some breathing room.",
      "कल के लिए थोड़ा सुकून।",
      "Bhavishya ke liye thodi raahat.",
    ),
    minutes: 5,
    icon: "Umbrella",
    hook: t(
      "Priya’s laptop breaks just as a client delays payment. Her rent is still due. She needs a buffer, not a risky bet.",
      "क्लाइंट का भुगतान रुका है। प्रिया का लैपटॉप टूट गया। किराया भी देना है। उसे सुरक्षित सहारा चाहिए।",
      "Client ka bhugtaan ruka hai. Priya ka laptop toot gaya. Kiraaya bhi dena hai. Use surakshit sahaara chahiye.",
    ),
    idea: t(
      "Money set aside for unexpected essential costs or a gap in income is an emergency fund. A common starting target is 3–6 months of essential costs. You may need more if others rely on you, your job is uncertain, or your income changes.",
      "इमरजेंसी फ़ंड मुश्किल समय के लिए अलग रखे पैसे हैं। शुरुआत में 3–6 महीने के ज़रूरी खर्च सोचें। कमाई हर महीने अलग हो, तो बड़ा बफ़र चाहिए हो सकता है।",
      "Emergency fund achaanak zaroori kharch ya aay ki kami mein kaam aata hai. Shuruaat mein 3–6 mahine ke zaroori kharch sochein. Aapki sthiti mein adhik chahiye ho sakta hai.",
    ),
    example: t(
      "Essentials ₹20,000 a month × 6 months = ₹1,20,000. Saving ₹5,000 a month reaches that target in 24 months, ignoring interest and withdrawals.",
      "₹20,000 हर महीने के ज़रूरी खर्च × 6 महीने = ₹1,20,000। महीने में ₹5,000 बचाएं तो 24 महीने लगेंगे। इसमें ब्याज या पैसे निकालना नहीं जोड़ा है।",
      "₹20,000 maasik zaroori kharch × 6 mahine = ₹1,20,000. ₹5,000 maasik bachat se 24 mahine lagenge, bina byaaj ya nikaasi ke.",
    ),
    mistake: t(
      "A credit card lets you borrow; it is not money you have saved. An investment whose price changes sharply (a volatile asset) may be worth less when you need to sell.",
      "क्रेडिट कार्ड से उधार मिलता है। वह आपकी बचत नहीं है। मार्केट में लगाए पैसे ज़रूरत के समय कम भी हो सकते हैं।",
      "Credit card udhaar ki suvidha hai, emergency fund nahin. Asthir nivesh zaroorat ke samay gir sakta hai.",
    ),
    notes: [
      t(
        "Target = monthly essentials × months of buffer.",
        "बफ़र का टारगेट = हर महीने के ज़रूरी खर्च × कितने महीने का सहारा चाहिए।",
        "Lakshya = maasik zaroori kharch × sahaare ke mahine.",
      ),
      t(
        "Keep this money easy to reach and focus on protecting the amount saved (capital).",
        "ऐसे पैसे रखें जो ज़रूरत पर आसानी से मिलें और जिनकी कीमत बहुत न घटे।",
        "Aasaan nikaasi aur rakam ki sthirta ko mahatva dein.",
      ),
      t(
        "Refill the fund after using it.",
        "इस्तेमाल के बाद फ़ंड फिर भरें।",
        "Istemal ke baad fund phir bharein.",
      ),
    ],
    action: t(
      "List rent, food, utilities, medicines, and minimum debt payments. What is your monthly essentials total?",
      "किराया, खाना, बिल, दवाएं और कर्ज़ की ज़रूरी किस्तें जोड़ें। हर महीने कितना चाहिए?",
      "Kiraaya, bhojan, bill, davaayein aur nyoontam karz bhugtaan jodein. Maasik kul kitna hai?",
    ),
    exercises: [
      choice(
        "emergency-1",
        t(
          "Which is an emergency-fund use?",
          "इमरजेंसी फ़ंड किसमें काम आए?",
          "Emergency fund kis mein kaam aaye?",
        ),
        [
          t(
            "An urgent essential repair",
            "अचानक ज़रूरी मरम्मत",
            "Achaanak zaroori marammat",
          ),
          t(
            "A festival shopping sale",
            "त्योहार की शॉपिंग सेल",
            "Tyohaar ki shopping sale",
          ),
          t("A market tip", "मार्केट की टिप", "Market ki tip"),
        ],
        0,
        t(
          "Unexpected essentials are different from planned wants.",
          "अचानक ज़रूरी खर्च और तय इच्छाएं अलग हैं।",
          "Achaanak zaroori kharch aur tay ichchhaayein alag hain.",
        ),
      ),
      numeric(
        "emergency-2",
        t(
          "₹20,000 monthly essentials × 6 months. Target rupees?",
          "₹20,000 हर महीने के ज़रूरी खर्च × 6 महीने। कुल कितने रुपये चाहिए?",
          "₹20,000 maasik zarooratein × 6 mahine. Lakshya kitne rupaye?",
        ),
        120000,
        t(
          "₹20,000 × 6 = ₹1,20,000.",
          "₹20,000 × 6 = ₹1,20,000।",
          "₹20,000 × 6 = ₹1,20,000.",
        ),
        { operation: "multiply", values: [20000, 6] },
      ),
      choice(
        "emergency-3",
        t(
          "Everyone needs exactly the same emergency fund.",
          "सबको एक जितना ही इमरजेंसी फ़ंड चाहिए।",
          "Sabko bilkul samaan emergency fund chahiye.",
        ),
        yn,
        1,
        t(
          "Income stability, dependants, and existing protection matter.",
          "कमाई कितनी पक्की है? घर में कितने लोग आप पर निर्भर हैं? पहले से कौन-सी सुरक्षा है? ये सब देखें।",
          "Aay ki sthirta, aashrit aur maujooda suraksha mahatvapoorn hain.",
        ),
      ),
      numeric(
        "emergency-4",
        t(
          "Your target is ₹1,20,000. You have ₹45,000. Gap in rupees?",
          "लक्ष्य ₹1,20,000। आपके पास ₹45,000 हैं। कितने रुपये की कमी?",
          "Lakshya ₹1,20,000. Aapke paas ₹45,000 hain. Kitne rupaye ki kami?",
        ),
        75000,
        t(
          "₹1,20,000 − ₹45,000 = ₹75,000.",
          "₹1,20,000 − ₹45,000 = ₹75,000।",
          "₹1,20,000 − ₹45,000 = ₹75,000.",
        ),
        { operation: "subtract", values: [120000, 45000] },
      ),
      choice(
        "emergency-5",
        t(
          "What matters most for this fund?",
          "इस फ़ंड में सबसे ज़रूरी क्या है?",
          "Is fund mein sabse zaroori kya hai?",
        ),
        [
          t(
            "The highest possible return",
            "सबसे ज़्यादा रिटर्न की उम्मीद",
            "Sabse ooncha sambhaavit return",
          ),
          t(
            "Quick access and stability",
            "ज़रूरत पर पैसे आसानी से मिलें और बहुत न घटें",
            "Aasaan nikaasi aur sthirta",
          ),
          t("A long lock-in", "लंबा लॉक-इन", "Lamba lock-in"),
        ],
        1,
        t(
          "You need the money when an emergency happens, even in a falling market.",
          "गिरते बाज़ार में भी मुसीबत के समय पैसा चाहिए।",
          "Girte bazaar mein bhi museebat ke samay paisa chahiye.",
        ),
      ),
      order(
        "emergency-6",
        t(
          "Build your cushion step by step.",
          "अपना सहारा कदम-दर-कदम बनाएं।",
          "Apna sahaara kadam-dar-kadam banaayein.",
        ),
        [
          t(
            "Save regularly toward the target",
            "थोड़ा-थोड़ा बचाते रहें",
            "Niyamit bachat karein",
          ),
          t(
            "Add up essential monthly costs",
            "हर महीने के ज़रूरी खर्च जोड़ें",
            "Maasik zaroori kharch jodein",
          ),
          t(
            "Choose suitable months of cover",
            "कितने महीने का बफ़र चाहिए, चुनें",
            "Sahaare ke mahine chunein",
          ),
        ],
        [1, 2, 0],
        t(
          "Understand costs → choose a buffer → build it regularly.",
          "खर्च जोड़ें → बफ़र चुनें → थोड़ा-थोड़ा बचाते रहें।",
          "Kharch samjhein → sahaara chunein → niyamit banaayein.",
        ),
      ),
      choice(
        "emergency-7",
        t(
          "A credit limit is the same as saved cash.",
          "क्रेडिट लिमिट और अपनी बचत एक ही चीज़ हैं।",
          "Credit limit bachaaye nakad ke samaan hai.",
        ),
        yn,
        1,
        t(
          "Credit must be repaid and can create expensive debt.",
          "क्रेडिट लौटाना पड़ता है और महँगा कर्ज़ बन सकता है।",
          "Credit lautaana padta hai aur mehnga karz ban sakta hai.",
        ),
      ),
      numeric(
        "emergency-8",
        t(
          "₹5,000 saved monthly for 12 months. Total rupees, ignoring interest?",
          "हर महीने ₹5,000 बचाए, 12 महीने तक। बिना ब्याज कितने रुपये होंगे?",
          "₹5,000 maasik bachat, 12 mahine. Bina byaaj kul rupaye?",
        ),
        60000,
        t(
          "₹5,000 × 12 = ₹60,000. Small, regular steps count.",
          "₹5,000 × 12 = ₹60,000। छोटे नियमित कदम काम आते हैं।",
          "₹5,000 × 12 = ₹60,000. Chhote niyamit kadam kaam aate hain.",
        ),
        { operation: "multiply", values: [5000, 12] },
      ),
    ],
    sources,
    reviewStatus: "editorial-draft",
  },
  ...everydayLessons,
  ...protectionLessons,
  ...borrowingLessons,
  ...planningLessons,
  ...interestLessons,
  payslipLesson,
  irregularIncomeLesson,
  identitySafetyLesson,
];
