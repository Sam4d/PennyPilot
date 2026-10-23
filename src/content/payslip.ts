import { t, choice, numeric, document, bucket } from "./schema";
import type { Lesson } from "./schema";

export const payslipLesson: Lesson = {
  id: "payslip",
  chapter: "everyday",
  skill: "S0.2.2",
  minutes: 15,
  icon: "FileText",
  title: t(
    "Read your payslip",
    "अपनी सैलरी स्लिप समझें",
    "Apni salary slip samjhein",
  ),
  subtitle: t(
    "Follow the money from an offer to your bank account.",
    "ऑफ़र से बैंक तक पैसों का हिसाब देखें।",
    "Offer se bank tak paison ka hisaab dekhein.",
  ),
  hook: t(
    "Asha sees ₹4,12,800 a year on a fictional job offer. Dividing by twelve gives ₹34,400. But the example payslip shows only ₹27,000 going to her bank. Mia asks her to pause before calling this a mistake: are both numbers for the same period, and do they describe the same money?",
    "आशा के बनाए हुए जॉब ऑफ़र में साल के ₹4,12,800 लिखे हैं। बारह से बांटें तो ₹34,400। लेकिन सैलरी स्लिप में बैंक में आने वाले पैसे ₹27,000 हैं। मिया कहती है: पहले चेक करें। क्या दोनों रकम एक ही समय की हैं? क्या दोनों में एक जैसी चीज़ें जुड़ी हैं?",
    "Asha ke banaaye hue job offer mein saal ke ₹4,12,800 likhe hain. Baarah se baantein toh ₹34,400. Lekin salary slip mein bank mein aane waale paise ₹27,000 hain. Mia kehti hai: pehle check karein. Kya dono rakam ek hi samay ki hain? Kya dono mein ek jaisi cheezein judi hain?",
  ),
  idea: t(
    "Start with three separate numbers. The employer's annual package cost (CTC) in this example includes salary, an employer-paid benefit and a target bonus that may not be paid. Monthly pay before amounts are taken out (gross pay) includes a fixed salary part (basic pay) and an extra cash payment (allowance). Amounts taken out of pay (deductions) reduce the bank payment (take-home or net pay). Use this bank payment as the starting point for a cash budget. Read each line of the offer and payslip: an annual package is not a promise that one-twelfth will reach your bank every month.",
    "तीन रकम अलग समझें। इस example में कंपनी के सालाना पैकेज के खर्च (CTC) में सैलरी, कंपनी की तरफ़ से दिया एक फ़ायदा और बोनस का लक्ष्य है। बोनस मिलना पक्का नहीं है। कटौती से पहले महीने की कमाई (ग्रॉस पे) में सैलरी का तय मुख्य हिस्सा (बेसिक पे) और अलग मिलने वाले नकद पैसे (अलाउंस) जुड़ते हैं। कटौती के बाद बैंक में आए पैसे (टेक-होम या नेट पे) से खर्च का बजट बनाएं। ऑफ़र और स्लिप की हर लाइन देखें। सालाना पैकेज का बारहवां हिस्सा हर महीने बैंक में आना पक्का नहीं है।",
    "Teen rakam alag samjhein. Is example mein company ke saalaana package ke kharch (CTC) mein salary, company ki taraf se diya ek faayda aur bonus ka lakshya hai. Bonus milna pakka nahin hai. Katauti se pehle mahine ki kamaai (gross pay) mein salary ka tay mukhya hissa (basic pay) aur alag milne waale nakad paise (allowance) judte hain. Katauti ke baad bank mein aaye paise (take-home ya net pay) se kharch ka budget banaayein. Offer aur slip ki har line dekhein. Saalaana package ka baarahvaan hissa har mahine bank mein aana pakka nahin hai.",
  ),
  readings: [
    {
      title: t(
        "First, match the time period",
        "पहले समय एक जैसा रखें",
        "Pehle samay ek jaisa rakhein",
      ),
      body: t(
        "The fictional fixed monthly pay is ₹30,000, so twelve equal months give ₹3,60,000 before deductions. An employer benefit costing ₹2,400 a month adds ₹28,800 to the annual package cost, not to the monthly bank deposit. A separate ₹24,000 target bonus brings the quoted example to ₹4,12,800. Read what is fixed, conditional or paid later. Do not divide a mixed annual package and treat the result as monthly spending money.",
        "इस example में महीने की तय कमाई ₹30,000 है। बारह बराबर महीनों में कटौती से पहले ₹3,60,000। कंपनी की तरफ़ से दिए फ़ायदे का खर्च ₹2,400 महीना है। इससे सालाना पैकेज में ₹28,800 जुड़ते हैं, बैंक में आने वाले पैसे नहीं बढ़ते। अलग से ₹24,000 के बोनस का लक्ष्य जोड़ें तो ₹4,12,800। कौन-सी रकम तय है, शर्त पर है या बाद में मिलेगी, यह पढ़ें। सबको बारह से बांटकर महीने के खर्च की रकम न मानें।",
        "Is example mein mahine ki tay kamaai ₹30,000 hai. Baarah baraabar mahinon mein katauti se pehle ₹3,60,000. Company ki taraf se diye faayde ka kharch ₹2,400 mahina hai. Isse saalaana package mein ₹28,800 judte hain, bank mein aane waale paise nahin badhte. Alag se ₹24,000 ke bonus ka lakshya jodein toh ₹4,12,800. Kaun-si rakam tay hai, shart par hai ya baad mein milegi, yeh padhein. Sabko baarah se baantkar mahine ke kharch ki rakam na maanein.",
      ),
    },
    {
      title: t(
        "A deduction has a destination",
        "कटे हुए पैसे कहाँ गए?",
        "Kate hue paise kahaan gaye?",
      ),
      body: t(
        "In this fictional arrangement, ₹1,800 goes from pay into Asha's saving for life after work (retirement savings) and ₹1,200 repays an earlier salary advance. Both reduce today's bank deposit, but they mean different things. Saving money elsewhere is not the same as spending it; repaying an advance reduces an amount owed. Compare what is owned with what is owed in the net-worth lesson. Check the stated destination and records. These made-up deductions are not tax or retirement contribution rules, and the employer benefit is not automatically Asha's personal cash or asset.",
        "इस बनाए हुए प्लान में सैलरी से ₹1,800 आशा की रिटायरमेंट बचत में जाते हैं। ₹1,200 पहले ली गई एडवांस सैलरी लौटाते हैं। दोनों से आज बैंक में कम पैसे आते हैं, पर मतलब अलग है। दूसरी जगह बचाए पैसे खर्च नहीं हो जाते। एडवांस लौटाने से बकाया कर्ज़ घटता है। नेट-वर्थ वाले पाठ की बात फिर याद करें। पैसे कहाँ गए, उसके रिकॉर्ड चेक करें। ये बनाए हुए पैसे हैं, टैक्स या रिटायरमेंट के असली नियम नहीं। कंपनी का फ़ायदा अपने आप आशा का नकद पैसा या एसेट नहीं बनता।",
        "Is banaaye hue plan mein salary se ₹1,800 Asha ki retirement bachat mein jaate hain. ₹1,200 pehle li gayi advance salary lautaate hain. Dono se aaj bank mein kam paise aate hain, par matlab alag hai. Doosri jagah bachaaye paise kharch nahin ho jaate. Advance lautaane se bakaaya karz ghatta hai. Net-worth waale paath ki baat phir yaad karein. Paise kahaan gaye, uske record check karein. Yeh banaaye hue paise hain, tax ya retirement ke asli niyam nahin. Company ka faayda apne aap Asha ka nakad paisa ya asset nahin banta.",
      ),
    },
    {
      title: t(
        "Check the deposit, then make a plan",
        "बैंक में आए पैसे चेक करें, फिर प्लान बनाएं",
        "Bank mein aaye paise check karein, phir plan banaayein",
      ),
      body: t(
        "Compare the pay period, earnings, deductions and net amount with the bank entry. Money returned for a work expense (reimbursement) or a one-time bonus can make one month unusually large; keep it separate when planning regular bills. If figures do not match, ask the employer for an explanation through a contact you already trust. For this example, plan with ₹27,000 received. With ₹23,000 of essentials, only ₹4,000 remains. A ₹5,000 saving target needs a change to the plan, not an extra ₹1,000 borrowed and called income.",
        "स्लिप का महीना, कमाई, कटौती और नेट पे बैंक की एंट्री से मिलाएं। खर्च के बदले लौटे पैसे या एक बार का बोनस किसी महीने रकम बढ़ा सकता है। रोज़ के बिल का प्लान बनाते समय उसे अलग रखें। हिसाब न मिले तो कंपनी के पहले से भरोसे वाले संपर्क से समझें। इस example में आए ₹27,000 से प्लान बनाएं। ज़रूरी खर्च ₹23,000 हों तो ₹4,000 बचते हैं। ₹5,000 बचाने के लक्ष्य के लिए प्लान बदलना होगा। ₹1,000 उधार लेकर उसे कमाई न मानें।",
        "Slip ka mahina, kamaai, katauti aur net pay bank ki entry se milaayein. Kharch ke badle laute paise ya ek baar ka bonus kisi mahine rakam badha sakta hai. Roz ke bill ka plan banaate samay use alag rakhein. Hisaab na mile toh company ke pehle se bharose waale sampark se samjhein. Is example mein aaye ₹27,000 se plan banaayein. Zaroori kharch ₹23,000 hon toh ₹4,000 bachte hain. ₹5,000 bachaane ke lakshya ke liye plan badalna hoga. ₹1,000 udhaar lekar use kamaai na maanein.",
      ),
    },
  ],
  example: t(
    "Assumptions dated 23 October 2026: ₹24,000 basic pay + ₹6,000 cash allowance = ₹30,000 gross pay. Subtract ₹1,800 employee saving and ₹1,200 advance repayment: ₹27,000 reaches the bank. The employer's ₹2,400 benefit cost is outside this deposit. On the board, increase that benefit by ₹600. The annual package rises by ₹7,200, while take-home pay stays ₹27,000. Now increase the advance repayment: which number changes?",
    "23 अक्टूबर 2026 के बनाए हुए आँकड़े: ₹24,000 बेसिक पे + ₹6,000 नकद अलाउंस = ₹30,000 ग्रॉस पे। ₹1,800 कर्मचारी की बचत और ₹1,200 एडवांस की वापसी घटाएं। बैंक में ₹27,000 आते हैं। कंपनी का ₹2,400 का फ़ायदा इस जमा से अलग है। बोर्ड पर वह खर्च ₹600 बढ़ाएं। सालाना पैकेज ₹7,200 बढ़ेगा, पर टेक-होम ₹27,000 ही रहेगा। अब एडवांस की वापसी बढ़ाएं। कौन-सी रकम बदलेगी?",
    "23 October 2026 ke banaaye hue aankde: ₹24,000 basic pay + ₹6,000 nakad allowance = ₹30,000 gross pay. ₹1,800 employee ki bachat aur ₹1,200 advance ki waapsi ghataayein. Bank mein ₹27,000 aate hain. Company ka ₹2,400 ka faayda is jama se alag hai. Board par woh kharch ₹600 badhaayein. Saalaana package ₹7,200 badhega, par take-home ₹27,000 hi rahega. Ab advance ki waapsi badhaayein. Kaun-si rakam badlegi?",
  ),
  mistake: t(
    "A bigger package does not always mean more money for monthly bills. Check what changed, when it is paid and whether it is guaranteed. Never count the same salary deduction both as missing pay and as an extra cash expense in the bank budget. Different employers can use different package structures; this fictional example cannot calculate a real person's taxes or legal entitlements.",
    "बड़ा पैकेज हो तो हर महीने बिल के लिए ज़्यादा पैसे मिलना पक्का नहीं। क्या बदला, कब मिलेगा और मिलना तय है या नहीं, यह देखें। बैंक में आए पैसों से बजट बना रहे हैं तो सैलरी से पहले ही कटी रकम दोबारा नकद खर्च में न घटाएं। हर कंपनी का पैकेज अलग हो सकता है। इस बनाए हुए example से किसी के असली टैक्स या कानूनी हक़ का हिसाब नहीं निकलता।",
    "Bada package ho toh har mahine bill ke liye zyada paise milna pakka nahin. Kya badla, kab milega aur milna tay hai ya nahin, yeh dekhein. Bank mein aaye paison se budget banaa rahe hain toh salary se pehle hi kati rakam dobaara nakad kharch mein na ghataayein. Har company ka package alag ho sakta hai. Is banaaye hue example se kisi ke asli tax ya kaanooni haq ka hisaab nahin nikalta.",
  ),
  notes: [
    t(
      "Match the period: annual package and monthly cash are different.",
      "समय मिलाएं: सालाना पैकेज और महीने के नकद पैसे अलग हैं।",
      "Samay milaayein: saalaana package aur mahine ke nakad paise alag hain.",
    ),
    t(
      "Gross pay minus employee deductions gives net pay in this model.",
      "इस मॉडल में ग्रॉस पे से कर्मचारी की कटौती घटाएं तो नेट पे मिलता है।",
      "Is model mein gross pay se employee ki katauti ghataayein toh net pay milta hai.",
    ),
    t(
      "Employer costs and a target bonus are not regular bank deposits.",
      "कंपनी का खर्च और बोनस का लक्ष्य नियमित बैंक जमा नहीं हैं।",
      "Company ka kharch aur bonus ka lakshya niyamit bank jama nahin hain.",
    ),
    t(
      "Use regular money received for regular bills; do not deduct the same amount twice.",
      "रोज़ के बिल के लिए नियमित आए पैसे देखें। एक रकम दो बार न घटाएं।",
      "Roz ke bill ke liye niyamit aaye paise dekhein. Ek rakam do baar na ghataayein.",
    ),
  ],
  action: t(
    "Using the fictional slip, explain gross pay and take-home pay to Mia in your own words. If you review a real slip, keep it private, match its period with the bank entry and list questions for your employer. Do not upload personal payroll documents to this app.",
    "बनाई हुई स्लिप देखकर मिया को अपने शब्दों में ग्रॉस पे और टेक-होम का फ़र्क समझाएं। असली स्लिप देखें तो उसे निजी रखें। उसका महीना बैंक की एंट्री से मिलाएं और कंपनी से पूछने वाली बातें लिखें। निजी सैलरी के काग़ज़ इस ऐप में अपलोड न करें।",
    "Banaayi hui slip dekhkar Mia ko apne shabdon mein gross pay aur take-home ka fark samjhaayein. Asli slip dekhein toh use niji rakhein. Uska mahina bank ki entry se milaayein aur company se poochhne waali baatein likhein. Niji salary ke kaagaz is app mein upload na karein.",
  ),
  exercises: [
    choice(
      "payslip-1",
      t(
        "The example offer says ₹4,12,800 a year. Can Asha safely plan monthly bills with ₹34,400?",
        "example के ऑफ़र में साल के ₹4,12,800 हैं। क्या आशा हर महीने ₹34,400 से बिल का प्लान बना सकती है?",
        "Example ke offer mein saal ke ₹4,12,800 hain. Kya Asha har mahine ₹34,400 se bill ka plan banaa sakti hai?",
      ),
      [
        t(
          "No. Check monthly net pay and separate employer costs and the target bonus.",
          "नहीं। महीने का नेट पे देखें। कंपनी का खर्च और बोनस का लक्ष्य अलग करें।",
          "Nahin. Mahine ka net pay dekhein. Company ka kharch aur bonus ka lakshya alag karein.",
        ),
        t(
          "Yes. Every part of the annual offer is monthly bank cash.",
          "हाँ। सालाना ऑफ़र की हर रकम महीने के नकद पैसे हैं।",
          "Haan. Saalaana offer ki har rakam mahine ke nakad paise hain.",
        ),
        t(
          "Yes. A target bonus is always guaranteed.",
          "हाँ। बोनस का लक्ष्य हमेशा पक्का होता है।",
          "Haan. Bonus ka lakshya hamesha pakka hota hai.",
        ),
      ],
      0,
      t(
        "₹34,400 mixes monthly pay, employer costs and a conditional bonus. The fictional regular deposit is ₹27,000.",
        "₹34,400 में महीने की कमाई, कंपनी का खर्च और शर्त वाला बोनस मिल गए। example में नियमित बैंक जमा ₹27,000 है।",
        "₹34,400 mein mahine ki kamaai, company ka kharch aur shart waala bonus mil gaye. Example mein niyamit bank jama ₹27,000 hai.",
      ),
    ),
    document(
      "payslip-2",
      t(
        "Which row tells Asha what reaches the bank this month?",
        "कौन-सी लाइन बताती है कि इस महीने आशा के बैंक में कितने पैसे आएंगे?",
        "Kaun-si line bataati hai ki is mahine Asha ke bank mein kitne paise aayenge?",
      ),
      t(
        "Fictional monthly payslip",
        "बनाई हुई महीने की सैलरी स्लिप",
        "Banaayi hui mahine ki salary slip",
      ),
      [
        t("Gross pay · ₹30,000", "ग्रॉस पे · ₹30,000", "Gross pay · ₹30,000"),
        t(
          "Employee deductions · ₹3,000",
          "कर्मचारी की कटौती · ₹3,000",
          "Employee ki katauti · ₹3,000",
        ),
        t(
          "Net bank deposit · ₹27,000",
          "नेट बैंक जमा · ₹27,000",
          "Net bank jama · ₹27,000",
        ),
        t(
          "Employer-paid benefit · ₹2,400",
          "कंपनी की तरफ़ से फ़ायदा · ₹2,400",
          "Company ki taraf se faayda · ₹2,400",
        ),
      ],
      2,
      t(
        "Net pay is the deposit after the example employee deductions. Match it with the bank entry for the same pay period.",
        "example में कर्मचारी की कटौती के बाद नेट पे जमा होता है। उसी महीने की बैंक एंट्री से मिलाएं।",
        "Example mein employee ki katauti ke baad net pay jama hota hai. Usi mahine ki bank entry se milaayein.",
      ),
    ),
    numeric(
      "payslip-3",
      t(
        "₹24,000 basic pay plus ₹6,000 cash allowance. What is monthly gross pay in rupees?",
        "₹24,000 बेसिक पे और ₹6,000 नकद अलाउंस। महीने का ग्रॉस पे कितने रुपये है?",
        "₹24,000 basic pay aur ₹6,000 nakad allowance. Mahine ka gross pay kitne rupaye hai?",
      ),
      30000,
      t(
        "₹24,000 + ₹6,000 = ₹30,000 before deductions. Keep monthly amounts together.",
        "₹24,000 + ₹6,000 = ₹30,000, कटौती से पहले। महीने की रकम आपस में जोड़ें।",
        "₹24,000 + ₹6,000 = ₹30,000, katauti se pehle. Mahine ki rakam aapas mein jodein.",
      ),
      { operation: "add", values: [24000, 6000] },
    ),
    bucket(
      "payslip-4",
      t(
        "Place each fictional payslip item in the right group.",
        "बनाई हुई स्लिप की हर रकम सही ग्रुप में रखें।",
        "Banaayi hui slip ki har rakam sahi group mein rakhein.",
      ),
      [
        t("Basic pay · ₹24,000", "बेसिक पे · ₹24,000", "Basic pay · ₹24,000"),
        t(
          "Cash allowance · ₹6,000",
          "नकद अलाउंस · ₹6,000",
          "Nakad allowance · ₹6,000",
        ),
        t(
          "Employer benefit cost · ₹2,400",
          "कंपनी के फ़ायदे का खर्च · ₹2,400",
          "Company ke faayde ka kharch · ₹2,400",
        ),
        t(
          "Employee saving from pay · ₹1,800",
          "सैलरी से कर्मचारी की बचत · ₹1,800",
          "Salary se employee ki bachat · ₹1,800",
        ),
      ],
      [
        t(
          "Monthly gross earnings",
          "महीने की ग्रॉस कमाई",
          "Mahine ki gross kamaai",
        ),
        t(
          "Employer cost outside gross",
          "ग्रॉस से अलग कंपनी का खर्च",
          "Gross se alag company ka kharch",
        ),
        t("Employee deduction", "कर्मचारी की कटौती", "Employee ki katauti"),
      ],
      [0, 0, 1, 2],
      t(
        "Basic pay and the cash allowance make gross pay. The employer benefit stays outside gross in this model; employee saving is deducted from it.",
        "इस मॉडल में बेसिक पे और नकद अलाउंस से ग्रॉस पे बनता है। कंपनी का फ़ायदा ग्रॉस से अलग है। कर्मचारी की बचत ग्रॉस से कटती है।",
        "Is model mein basic pay aur nakad allowance se gross pay banta hai. Company ka faayda gross se alag hai. Employee ki bachat gross se katti hai.",
      ),
    ),
    numeric(
      "payslip-5",
      t(
        "Gross pay is ₹30,000. Employee saving is ₹1,800 and advance repayment is ₹1,200. What reaches the bank?",
        "ग्रॉस पे ₹30,000 है। कर्मचारी की बचत ₹1,800 और एडवांस की वापसी ₹1,200 है। बैंक में कितने रुपये आएंगे?",
        "Gross pay ₹30,000 hai. Employee ki bachat ₹1,800 aur advance ki waapsi ₹1,200 hai. Bank mein kitne rupaye aayenge?",
      ),
      27000,
      t(
        "₹30,000 − ₹1,800 − ₹1,200 = ₹27,000. Do not subtract the employer benefit again.",
        "₹30,000 − ₹1,800 − ₹1,200 = ₹27,000। कंपनी का फ़ायदा फिर न घटाएं।",
        "₹30,000 − ₹1,800 − ₹1,200 = ₹27,000. Company ka faayda phir na ghataayein.",
      ),
      { operation: "subtract", values: [30000, 1800, 1200] },
    ),
    choice(
      "payslip-6",
      t(
        "The ₹24,000 annual target bonus might not be paid. How should Asha plan regular rent?",
        "₹24,000 का सालाना बोनस मिलना पक्का नहीं। आशा हर महीने के किराए का प्लान कैसे बनाए?",
        "₹24,000 ka saalaana bonus milna pakka nahin. Asha har mahine ke kiraaye ka plan kaise banaaye?",
      ),
      [
        t(
          "Add ₹2,000 to every month's spending before the bonus is paid.",
          "बोनस मिलने से पहले हर महीने के खर्च में ₹2,000 जोड़ दे।",
          "Bonus milne se pehle har mahine ke kharch mein ₹2,000 jod de.",
        ),
        t(
          "Use regular take-home pay and plan the bonus separately if received.",
          "नियमित टेक-होम से प्लान बनाए। बोनस आए तो अलग प्लान करे।",
          "Niyamit take-home se plan banaaye. Bonus aaye toh alag plan kare.",
        ),
        t(
          "Borrow the expected bonus and call it salary.",
          "सोचा हुआ बोनस उधार लेकर उसे सैलरी माने।",
          "Socha hua bonus udhaar lekar use salary maane.",
        ),
      ],
      1,
      t(
        "This repeats the income lesson: uncertain or one-time money should not silently become regular income. Borrowing creates an amount to repay.",
        "कमाई वाले पाठ की बात फिर याद करें। अनिश्चित या एक बार के पैसे नियमित कमाई न मानें। उधार लिया पैसा लौटाना पड़ता है।",
        "Kamaai waale paath ki baat phir yaad karein. Anishchit ya ek baar ke paise niyamit kamaai na maanein. Udhaar liya paisa lautaana padta hai.",
      ),
    ),
    numeric(
      "payslip-7",
      t(
        "Only the employer benefit rises by ₹600 a month. Gross pay stays ₹30,000 and employee deductions stay ₹3,000. What is the new monthly take-home pay?",
        "सिर्फ़ कंपनी का फ़ायदा ₹600 महीना बढ़ा। ग्रॉस पे ₹30,000 और कर्मचारी की कटौती ₹3,000 ही है। नया महीने का टेक-होम कितने रुपये होगा?",
        "Sirf company ka faayda ₹600 mahina badha. Gross pay ₹30,000 aur employee ki katauti ₹3,000 hi hai. Naya mahine ka take-home kitne rupaye hoga?",
      ),
      27000,
      t(
        "₹30,000 − ₹3,000 = ₹27,000. The annual package cost rises by ₹600 × 12 = ₹7,200, but this change adds no monthly bank cash.",
        "₹30,000 − ₹3,000 = ₹27,000। सालाना पैकेज का खर्च ₹600 × 12 = ₹7,200 बढ़ा। इस बदलाव से बैंक में महीने के नकद पैसे नहीं बढ़े।",
        "₹30,000 − ₹3,000 = ₹27,000. Saalaana package ka kharch ₹600 × 12 = ₹7,200 badha. Is badlaav se bank mein mahine ke nakad paise nahin badhe.",
      ),
      { operation: "subtract", values: [30000, 3000] },
    ),
    numeric(
      "payslip-8",
      t(
        "Asha receives ₹27,000 and pays ₹23,000 for essentials. Her saving target is ₹5,000. How many rupees short is this plan?",
        "आशा के पास ₹27,000 आए। ज़रूरी खर्च ₹23,000 हैं। बचत का लक्ष्य ₹5,000 है। प्लान में कितने रुपये कम हैं?",
        "Asha ke paas ₹27,000 aaye. Zaroori kharch ₹23,000 hain. Bachat ka lakshya ₹5,000 hai. Plan mein kitne rupaye kam hain?",
      ),
      1000,
      t(
        "₹27,000 − ₹23,000 = ₹4,000 available. ₹5,000 − ₹4,000 = ₹1,000 short. Revisit the budget and goal lessons: change the target, timing or affordable costs; do not pretend the annual package is bank cash.",
        "₹27,000 − ₹23,000 = ₹4,000 बचे। ₹5,000 − ₹4,000 = ₹1,000 कम। बजट और लक्ष्य वाले पाठ की बात फिर याद करें। लक्ष्य, समय या बदल सकने वाले खर्च चेक करें। सालाना पैकेज को बैंक के नकद पैसे न मानें।",
        "₹27,000 − ₹23,000 = ₹4,000 bache. ₹5,000 − ₹4,000 = ₹1,000 kam. Budget aur lakshya waale paath ki baat phir yaad karein. Lakshya, samay ya badal sakne waale kharch check karein. Saalaana package ko bank ke nakad paise na maanein.",
      ),
      { operation: "subtract", values: [5000, 4000] },
    ),
  ],
  sources: [
    "https://www.epfindia.gov.in/site_en/For_Employees.php",
    "https://www.incometax.gov.in/iec/foportal/",
    "https://www.rbi.org.in/FinancialEducation/",
  ],
  sourceStatus: "unverified",
  sourceNote: t(
    "Fictional assumptions dated 23 October 2026, not current tax or mandatory deduction rules.",
    "23 अक्टूबर 2026 के बनाए हुए आँकड़े, असली टैक्स या ज़रूरी कटौती के नियम नहीं।",
    "23 October 2026 ke banaaye hue aankde, asli tax ya zaroori katauti ke niyam nahin.",
  ),
  reviewStatus: "editorial-draft",
};
