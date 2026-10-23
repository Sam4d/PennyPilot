import type { Lesson } from "./schema";
export const creditScoreLesson: Lesson = {
  id: "credit-score",
  chapter: "borrowing",
  skill: "S0.6.5",
  minutes: 18,
  icon: "FileText",
  title: {
    en: "Read the story behind a credit score",
    hi: "क्रेडिट स्कोर के पीछे का हिसाब समझें",
    hinglish: "Credit score ke peechhe ka hisaab samjhein",
  },
  subtitle: {
    en: "Check the record before judging the number.",
    hi: "नंबर पर भरोसा करने से पहले रिकॉर्ड चेक करें।",
    hinglish: "Number par bharosa karne se pehle record check karein.",
  },
  hook: {
    en: "Asha sees a number on a borrowing report and feels judged. Mia turns the page: “First check whose accounts these are, which dates they describe and whether the entries match your records.” A number cannot tell you whether a loan fits your budget. This lesson uses a fictional report with no real score, personal data or lender recommendation.",
    hi: "आशा कर्ज़ की रिपोर्ट में एक नंबर देखकर परेशान है। मिया पन्ना पलटती है: “पहले देखें, खाते किसके हैं, तारीख़ क्या है और एंट्री आपके रिकॉर्ड से मिलती है या नहीं।” एक नंबर यह नहीं बताता कि कर्ज़ आपके बजट में फिट है। यहाँ रिपोर्ट बनाई हुई है। असली स्कोर, निजी जानकारी या लेंडर की सलाह नहीं दी गई है।",
    hinglish:
      "Asha karz ki report mein ek number dekhkar pareshaan hai. Mia panna palat-ti hai: “Pehle dekhein, khaate kiske hain, taareekh kya hai aur entry aapke record se milti hai ya nahin.” Ek number yeh nahin bataata ki karz aapke budget mein fit hai. Yahaan report banaayi hui hai. Asli score, niji jaankaari ya lender ki salaah nahin di gayi hai.",
  },
  idea: {
    en: "A borrowing record (credit report) brings together reported account details such as balances and repayment history. A credit-information company (credit bureau) holds such information; CIBIL is one name, not a word for every company or every score. A credit score summarises information using a model. The report is the underlying record, the score is a summary, and the lender makes its own decision. Different models, data and dates can produce different summaries. None is a measure of your worth as a person.",
    hi: "उधार और उसे लौटाने का रिकॉर्ड (क्रेडिट रिपोर्ट) खाते की बताई गई जानकारी, बकाया और पेमेंट हिस्ट्री जोड़ता है। ऐसी जानकारी रखने वाली कंपनी को क्रेडिट ब्यूरो कहते हैं। CIBIL एक नाम है, हर कंपनी या हर स्कोर का नाम नहीं। क्रेडिट स्कोर एक मॉडल से बनी जानकारी की छोटी झलक है। रिपोर्ट रिकॉर्ड है, स्कोर उसका सार है और लेंडर अपना फैसला लेता है। अलग डेटा, मॉडल और तारीख़ से सार अलग हो सकता है। यह इंसान के तौर पर आपकी कीमत नहीं बताता।",
    hinglish:
      "Udhaar aur use lautaane ka record (credit report) khaate ki bataayi gayi jaankaari, bakaaya aur payment history jodta hai. Aisi jaankaari rakhne waali company ko credit bureau kehte hain. CIBIL ek naam hai, har company ya har score ka naam nahin. Credit score ek model se bani jaankaari ki chhoti jhalak hai. Report record hai, score uska saar hai aur lender apna faisla leta hai. Alag data, model aur taareekh se saar alag ho sakta hai. Yeh insaan ke taur par aapki keemat nahin bataata.",
  },
  readings: [
    {
      title: {
        en: "Read identity, accounts and dates",
        hi: "पहचान, खाते और तारीख़ पढ़ें",
        hinglish: "Pehchaan, khaate aur taareekh padhein",
      },
      body: {
        en: "Check the report date and each account’s last update, not just today’s balance in your bank app. An older reported balance may describe an earlier date; a mismatch is a reason to investigate, not automatic proof of fraud. Check account ownership, open or closed status, outstanding balance and payment entries against statements and receipts. A credit check recorded after an application (enquiry) is a different entry from a loan balance. An unfamiliar account or application deserves a separate identity check using the safety lesson’s trusted-contact rule. Never paste a real report into this practice board.",
        hi: "रिपोर्ट की तारीख़ और हर खाते का आखिरी अपडेट देखें। सिर्फ़ आज ऐप में दिख रहे बकाया से न मिलाएं। पुराना बैलेंस पहले की तारीख़ का हो सकता है। फर्क जांच की वजह है, अपने आप फ़्रॉड का सबूत नहीं। खाता किसका है, खुला या बंद है, बकाया और पेमेंट एंट्री स्टेटमेंट और रसीद से मिलाएं। आवेदन पर दर्ज क्रेडिट चेक (इन्क्वायरी) और लोन का बकाया अलग चीज़ें हैं। अनजान खाता या आवेदन दिखे तो सुरक्षा पाठ के भरोसे वाले संपर्क नियम से अलग जांच करें। बोर्ड में असली रिपोर्ट न डालें।",
        hinglish:
          "Report ki taareekh aur har khaate ka aakhiri update dekhein. Sirf aaj app mein dikh rahe bakaaya se na milaayein. Puraana balance pehle ki taareekh ka ho sakta hai. Fark jaanch ki wajah hai, apne aap fraud ka saboot nahin. Khaata kiska hai, khula ya band hai, bakaaya aur payment entry statement aur raseed se milaayein. Aavedan par darj credit check (enquiry) aur loan ka bakaaya alag cheezein hain. Anjaan khaata ya aavedan dikhe toh suraksha paath ke bharose waale sampark niyam se alag jaanch karein. Board mein asli report na daalein.",
      },
    },
    {
      title: {
        en: "A percentage is a description, not a magic target",
        hi: "प्रतिशत हिसाब है, जादुई लक्ष्य नहीं",
        hinglish: "Pratishat hisaab hai, jaadui lakshya nahin",
      },
      body: {
        en: "For one fictional card, the share of its limit used (credit utilisation) is the reported balance divided by the limit, multiplied by 100. A ₹3,000 balance against a ₹10,000 limit gives 30%. Against a ₹20,000 limit, the same balance gives 15%; the debt is still ₹3,000. We are describing one card on one date, not a bureau’s complete calculation. A percentage cannot show the payment due date, interest cost or whether repayment fits your cash flow. No percentage here is an approval threshold or a promised score change. With an unknown limit, the ratio is unknown, not zero.",
        hi: "एक बनाए हुए कार्ड में लिमिट का इस्तेमाल हुआ हिस्सा (क्रेडिट यूटिलाइज़ेशन) निकालें: बताया बकाया ÷ लिमिट × 100। ₹10,000 की लिमिट पर ₹3,000 बकाया यानी 30%। लिमिट ₹20,000 हो तो वही बकाया 15%, पर कर्ज़ अभी भी ₹3,000 है। यह एक तारीख़ के एक कार्ड का हिसाब है, ब्यूरो का पूरा मॉडल नहीं। प्रतिशत से देय तारीख़, ब्याज का खर्च या बजट में लौटाने की जगह नहीं पता चलती। यहाँ कोई प्रतिशत मंज़ूरी की सीमा या स्कोर बढ़ने का वादा नहीं। लिमिट पता न हो तो प्रतिशत अज्ञात है, शून्य नहीं।",
        hinglish:
          "Ek banaaye hue card mein limit ka istemaal hua hissa (credit utilisation) nikaalein: bataaya bakaaya ÷ limit × 100. ₹10,000 ki limit par ₹3,000 bakaaya yaani 30%. Limit ₹20,000 ho toh wahi bakaaya 15%, par karz abhi bhi ₹3,000 hai. Yeh ek taareekh ke ek card ka hisaab hai, bureau ka poora model nahin. Pratishat se due taareekh, byaaj ka kharch ya budget mein lautaane ki jagah nahin pata chalti. Yahaan koi pratishat manzoori ki seema ya score badhne ka vaada nahin. Limit pata na ho toh pratishat agyaat hai, shoonya nahin.",
      },
    },
    {
      title: {
        en: "Good records and affordable borrowing come first",
        hi: "सही रिकॉर्ड और संभालने लायक कर्ज़ पहले",
        hinglish: "Sahi record aur sambhaalne laayak karz pehle",
      },
      body: {
        en: "Repayment records, reported card use, account history and applications can matter to credit assessment, but their exact weight and effect depend on the model. Plan payments using due dates and money available. A reminder helps only if the account has enough money; an automatic payment can also fail. Review statements and avoid borrowing just to create a score. Paying interest is a cost, not a fee that buys a guaranteed score improvement. A lender can also assess income, existing commitments and its own policy. A high-looking score does not make an unaffordable loan affordable.",
        hi: "पेमेंट रिकॉर्ड, बताया कार्ड इस्तेमाल, खाते की हिस्ट्री और आवेदन का असर क्रेडिट जांच में हो सकता है। कितना असर होगा, यह मॉडल पर निर्भर है। देय तारीख़ और उपलब्ध पैसे देखकर पेमेंट प्लान करें। रिमाइंडर के साथ पैसे भी चाहिए; ऑटो-पेमेंट भी फेल हो सकता है। स्टेटमेंट पढ़ें और सिर्फ़ स्कोर बनाने के लिए कर्ज़ न लें। ब्याज एक खर्च है, स्कोर बढ़ने की गारंटी खरीदने की फीस नहीं। लेंडर कमाई, दूसरे बकाया और अपनी पॉलिसी भी देख सकता है। अच्छा दिखता स्कोर बजट से बाहर के लोन को सस्ता नहीं बना देता।",
        hinglish:
          "Payment record, bataaya card istemaal, khaate ki history aur aavedan ka asar credit jaanch mein ho sakta hai. Kitna asar hoga, yeh model par nirbhar hai. Due taareekh aur uplabdh paise dekhkar payment plan karein. Reminder ke saath paise bhi chaahiye; auto-payment bhi fail ho sakta hai. Statement padhein aur sirf score banaane ke liye karz na lein. Byaaj ek kharch hai, score badhne ki guarantee khareedne ki fees nahin. Lender kamaai, doosre bakaaya aur apni policy bhi dekh sakta hai. Achchha dikhta score budget se baahar ke loan ko sasta nahin bana deta.",
      },
    },
  ],
  example: {
    en: "Inspect Mia’s fictional report, then change the card balance and limit. Try ₹3,000 against ₹10,000 and ₹20,000: the ratio changes while the debt stays the same. Next compare keeping affordable payments organised, borrowing unnecessarily and challenging a possible record error. The board explains each choice but never estimates a score. Repeat the net-worth lesson: a new loan increases cash and debt together; it is not new income.",
    hi: "मिया की बनाई रिपोर्ट जांचें, फिर कार्ड का बकाया और लिमिट बदलें। ₹3,000 को ₹10,000 और ₹20,000 से मिलाएं। प्रतिशत बदलेगा, कर्ज़ वही रहेगा। फिर तीन कदम तुलना करें: संभालने लायक पेमेंट व्यवस्थित करना, बेवजह कर्ज़ लेना और रिकॉर्ड की संभावित गलती उठाना। बोर्ड समझाएगा, स्कोर का अंदाज़ा नहीं देगा। नेट-वर्थ पाठ याद करें: नया लोन नकद और कर्ज़ साथ बढ़ाता है, कमाई नहीं।",
    hinglish:
      "Mia ki banaayi report jaanchein, phir card ka bakaaya aur limit badlein. ₹3,000 ko ₹10,000 aur ₹20,000 se milaayein. Pratishat badlega, karz wahi rahega. Phir teen kadam tulna karein: sambhaalne laayak payment vyavasthit karna, bevajah karz lena aur record ki sambhaavit galti uthaana. Board samjhaayega, score ka andaaza nahin dega. Net-worth paath yaad karein: naya loan nakad aur karz saath badhaata hai, kamaai nahin.",
  },
  mistake: {
    en: "Do not pay someone who promises to erase accurate negative history or deliver an exact score increase. If an entry seems wrong, identify the account, field and date, keep supporting records and use independently verified official lender/bureau channels to raise the issue. Keep a reference and check the response; do not assume the record changes instantly or the request is accepted. Do not stop a payment you actually owe because a dispute is open. This draft provides no current dispute deadline, free-report entitlement, score band or legal remedy.",
    hi: "सही लेकिन खराब हिस्ट्री मिटाने या तय स्कोर बढ़ाने का वादा करने वाले को पैसे न दें। एंट्री गलत लगे तो खाता, फ़ील्ड और तारीख़ पहचानें। सबूत रखें और अलग से चेक किए लेंडर या ब्यूरो के ऑफ़िशियल रास्ते से बात उठाएं। रेफ़रेंस रखें और जवाब देखें। बदलाव तुरंत या मांग मंज़ूर होना पक्का न मानें। शिकायत खुली होने से असली बकाया पेमेंट बंद न करें। इस ड्राफ़्ट में मौजूदा शिकायत समय-सीमा, फ्री रिपोर्ट का अधिकार, स्कोर बैंड या कानूनी उपाय नहीं दिए हैं।",
    hinglish:
      "Sahi lekin kharaab history mitaane ya tay score badhaane ka vaada karne waale ko paise na dein. Entry galat lage toh khaata, field aur taareekh pehchaanein. Saboot rakhein aur alag se check kiye lender ya bureau ke official raaste se baat uthaayein. Reference rakhein aur jawaab dekhein. Badlaav turant ya maang manzoor hona pakka na maanein. Shikaayat khuli hone se asli bakaaya payment band na karein. Is draft mein maujooda shikaayat samay-seema, free report ka adhikaar, score band ya kaanooni upaay nahin diye hain.",
  },
  notes: [
    {
      en: "Report, score and lending decision are different.",
      hi: "रिपोर्ट, स्कोर और लोन का फैसला अलग हैं।",
      hinglish: "Report, score aur loan ka faisla alag hain.",
    },
    {
      en: "A lower ratio does not necessarily mean less debt.",
      hi: "कम प्रतिशत का मतलब हमेशा कम कर्ज़ नहीं।",
      hinglish: "Kam pratishat ka matlab hamesha kam karz nahin.",
    },
    {
      en: "Check evidence; no exact score change is promised.",
      hi: "सबूत चेक करें; तय स्कोर बदलाव का वादा नहीं।",
      hinglish: "Saboot check karein; tay score badlaav ka vaada nahin.",
    },
  ],
  action: {
    en: "Explain the difference between a record error and a borrowing choice to someone you trust. Revisit your fictional budget: could the payment fit even if a lender approved the loan? Never upload personal reports into learning tools.",
    hi: "किसी भरोसे वाले को रिकॉर्ड की गलती और कर्ज़ लेने के फैसले का फर्क समझाएं। बनाए हुए बजट को फिर देखें: लोन मंज़ूर भी हो तो पेमेंट फिट होगा? सीखने वाले टूल में निजी रिपोर्ट अपलोड न करें।",
    hinglish:
      "Kisi bharose waale ko record ki galti aur karz lene ke faisle ka fark samjhaayein. Banaaye hue budget ko phir dekhein: loan manzoor bhi ho toh payment fit hoga? Seekhne waale tool mein niji report upload na karein.",
  },
  sourceStatus: "unverified",
  sourceNote: {
    en: "Editorial draft dated 23 October 2026. CIBIL source access returned HTTP 403; primary-source and native-language review remain pending. All report entries are fictional. No current score range, report-access rule, dispute deadline, model weight or approval promise is stated.",
    hi: "23 अक्टूबर 2026 का एडिटोरियल ड्राफ़्ट। CIBIL स्रोत पर HTTP 403 मिला। प्राथमिक स्रोत और भाषा की मानवीय समीक्षा बाकी है। रिपोर्ट की सभी एंट्री बनाई हुई हैं। मौजूदा स्कोर रेंज, रिपोर्ट पाने का नियम, शिकायत समय-सीमा, मॉडल का वज़न या मंज़ूरी का वादा नहीं दिया है।",
    hinglish:
      "23 October 2026 ka editorial draft. CIBIL srot par HTTP 403 mila. Praathmik srot aur bhaasha ki maanveey sameeksha baaki hai. Report ki sabhi entry banaayi hui hain. Maujooda score range, report paane ka niyam, shikaayat samay-seema, model ka vazan ya manzoori ka vaada nahin diya hai.",
  },
  sources: ["https://www.cibil.com/credit-score"],
  reviewStatus: "editorial-draft",
  exercises: [
    {
      id: "credit-score-1",
      type: "choice",
      prompt: {
        en: "Which statement separates the three ideas correctly?",
        hi: "तीन बातों को सही अलग कौन करता है?",
        hinglish: "Teen baaton ko sahi alag kaun karta hai?",
      },
      options: [
        {
          en: "A score is a guarantee of approval",
          hi: "स्कोर मंज़ूरी की गारंटी है",
          hinglish: "Score manzoori ki guarantee hai",
        },
        {
          en: "The report is a record; the score summarises information; the lender decides",
          hi: "रिपोर्ट रिकॉर्ड है; स्कोर सार है; लेंडर फैसला लेता है",
          hinglish: "Report record hai; score saar hai; lender faisla leta hai",
        },
        {
          en: "The report tells you what you are worth as a person",
          hi: "रिपोर्ट इंसान के तौर पर आपकी कीमत बताती है",
          hinglish: "Report insaan ke taur par aapki keemat bataati hai",
        },
      ],
      answer: 1,
      explanation: {
        en: "A summary does not replace checking records or affordability.",
        hi: "सार रिकॉर्ड और बजट जांच की जगह नहीं लेता।",
        hinglish: "Saar record aur budget jaanch ki jagah nahin leta.",
      },
    },
    {
      id: "credit-score-2",
      type: "document",
      prompt: {
        en: "Which row contains a payment-record mismatch to investigate?",
        hi: "किस लाइन का पेमेंट रिकॉर्ड अलग है और जांच चाहिए?",
        hinglish: "Kis line ka payment record alag hai aur jaanch chaahiye?",
      },
      options: [
        {
          en: "Account: fictional card A",
          hi: "खाता: बनाया हुआ कार्ड A",
          hinglish: "Khaata: banaaya hua card A",
        },
        {
          en: "Report period: August example",
          hi: "रिपोर्ट समय: अगस्त का example",
          hinglish: "Report samay: August ka example",
        },
        {
          en: "Report says unpaid; matching receipt says paid for that same period",
          hi: "रिपोर्ट में बकाया; उसी समय की मिलती रसीद में पेमेंट हुआ",
          hinglish:
            "Report mein bakaaya; usi samay ki milti raseed mein payment hua",
        },
      ],
      answer: 2,
      explanation: {
        en: "Compare account, period and evidence, then raise the specific mismatch through a verified official route. Do not assume instant correction.",
        hi: "खाता, समय और सबूत मिलाएं। सही ऑफ़िशियल रास्ते से उसी फर्क को उठाएं। तुरंत बदलाव पक्का न मानें।",
        hinglish:
          "Khaata, samay aur saboot milaayein. Sahi official raaste se usi fark ko uthaayein. Turant badlaav pakka na maanein.",
      },
      documentTitle: {
        en: "Fictional report and receipt",
        hi: "बनाई रिपोर्ट और रसीद",
        hinglish: "Banaayi report aur raseed",
      },
    },
    {
      id: "credit-score-3",
      type: "numeric",
      prompt: {
        en: "A fictional balance is ₹3,000 and the limit ₹10,000. Calculate balance ÷ limit. Enter the decimal fraction, not a percentage.",
        hi: "बनाया बकाया ₹3,000 और लिमिट ₹10,000 है। बकाया ÷ लिमिट निकालें। दशमलव हिस्सा लिखें, प्रतिशत नहीं।",
        hinglish:
          "Banaaya bakaaya ₹3,000 aur limit ₹10,000 hai. Bakaaya ÷ limit nikaalein. Dashamlav hissa likhein, pratishat nahin.",
      },
      answer: 0.3,
      explanation: {
        en: "3,000 ÷ 10,000 = 0.3, which is 30%. This is an example ratio, not an approval rule.",
        hi: "3,000 ÷ 10,000 = 0.3 यानी 30%। यह example का हिसाब है, मंज़ूरी का नियम नहीं।",
        hinglish:
          "3,000 ÷ 10,000 = 0.3 yaani 30%. Yeh example ka hisaab hai, manzoori ka niyam nahin.",
      },
      calculation: {
        operation: "divide",
        values: [3000, 10000],
      },
    },
    {
      id: "credit-score-4",
      type: "choice",
      prompt: {
        en: "The balance stays ₹3,000 while the limit changes from ₹10,000 to ₹20,000. What changes?",
        hi: "बकाया ₹3,000 है, लिमिट ₹10,000 से ₹20,000 हुई। क्या बदला?",
        hinglish:
          "Bakaaya ₹3,000 hai, limit ₹10,000 se ₹20,000 hui. Kya badla?",
      },
      options: [
        {
          en: "The debt falls to ₹1,500",
          hi: "कर्ज़ ₹1,500 हो गया",
          hinglish: "Karz ₹1,500 ho gaya",
        },
        {
          en: "The ratio falls from 30% to 15%; debt stays ₹3,000",
          hi: "प्रतिशत 30% से 15%; कर्ज़ ₹3,000 ही है",
          hinglish: "Pratishat 30% se 15%; karz ₹3,000 hi hai",
        },
        {
          en: "Approval is now certain",
          hi: "मंज़ूरी अब पक्की है",
          hinglish: "Manzoori ab pakki hai",
        },
      ],
      answer: 1,
      explanation: {
        en: "Changing the limit changes the ratio. The amount owed stays the same.",
        hi: "नीचे की रकम बदलने से प्रतिशत बदलता है, बकाया नहीं।",
        hinglish:
          "Neeche ki rakam badalne se pratishat badalta hai, bakaaya nahin.",
      },
    },
    {
      id: "credit-score-5",
      type: "choice",
      prompt: {
        en: "A caller promises an exact score increase if you borrow and pay interest. What should Mia explain?",
        hi: "कॉलर कहता है, कर्ज़ लेकर ब्याज दें तो तय स्कोर बढ़ेगा। मिया क्या समझाए?",
        hinglish:
          "Caller kehta hai, karz lekar byaaj dein toh tay score badhega. Mia kya samjhaaye?",
      },
      options: [
        {
          en: "Interest buys a guaranteed improvement",
          hi: "ब्याज देने से पक्का सुधार खरीदा जाता है",
          hinglish: "Byaaj dene se pakka sudhaar khareeda jaata hai",
        },
        {
          en: "A new loan is extra income",
          hi: "नया लोन अतिरिक्त कमाई है",
          hinglish: "Naya loan atirikt kamaai hai",
        },
        {
          en: "Interest is a cost; do not borrow unnecessarily for a promised score",
          hi: "ब्याज खर्च है; स्कोर के वादे पर बेवजह कर्ज़ न लें",
          hinglish: "Byaaj kharch hai; score ke vaade par bevajah karz na lein",
        },
      ],
      answer: 2,
      explanation: {
        en: "A new loan adds a repayment obligation. No exact model outcome is promised here.",
        hi: "नया लोन लौटाने की ज़िम्मेदारी जोड़ता है। तय मॉडल नतीजे का वादा नहीं।",
        hinglish:
          "Naya loan lautaane ki zimmedaari jodta hai. Tay model nateeje ka vaada nahin.",
      },
    },
    {
      id: "credit-score-6",
      type: "choice",
      prompt: {
        en: "The limit is unknown. How should the board show utilisation?",
        hi: "लिमिट पता नहीं। बोर्ड प्रतिशत कैसे दिखाए?",
        hinglish: "Limit pata nahin. Board pratishat kaise dikhaaye?",
      },
      options: [
        {
          en: "Unknown; do not replace missing data with zero",
          hi: "अज्ञात; गायब जानकारी को शून्य न मानें",
          hinglish: "Agyaat; gaayab jaankaari ko shoonya na maanein",
        },
        {
          en: "0%, so no debt exists",
          hi: "0%, इसलिए कर्ज़ नहीं",
          hinglish: "0%, isliye karz nahin",
        },
        {
          en: "100%, so approval is impossible",
          hi: "100%, इसलिए मंज़ूरी असंभव",
          hinglish: "100%, isliye manzoori asambhav",
        },
      ],
      answer: 0,
      explanation: {
        en: "A missing denominator prevents this calculation. It says nothing certain about approval.",
        hi: "लिमिट के बिना यह हिसाब नहीं बनता। मंज़ूरी पर पक्का नतीजा नहीं निकलता।",
        hinglish:
          "Limit ke bina yeh hisaab nahin banta. Manzoori par pakka nateeja nahin nikalta.",
      },
    },
    {
      id: "credit-score-7",
      type: "choice",
      prompt: {
        en: "You raised a possible report error. What is the careful next step?",
        hi: "रिपोर्ट की संभावित गलती उठाई। अगला समझदार कदम क्या है?",
        hinglish:
          "Report ki sambhaavit galti uthaayi. Agla samajhdaar kadam kya hai?",
      },
      options: [
        {
          en: "Stop every payment immediately",
          hi: "हर पेमेंट तुरंत रोकें",
          hinglish: "Har payment turant rokein",
        },
        {
          en: "Keep the reference, review the response and continue payments actually owed",
          hi: "रेफ़रेंस रखें, जवाब देखें और असली बकाया पेमेंट करते रहें",
          hinglish:
            "Reference rakhein, jawaab dekhein aur asli bakaaya payment karte rahein",
        },
        {
          en: "Assume all negative entries will disappear",
          hi: "मान लें, सभी खराब एंट्री मिटेंगी",
          hinglish: "Maan lein, sabhi kharaab entry mitengi",
        },
      ],
      answer: 1,
      explanation: {
        en: "An error request is not a promise of correction or cancellation of a real debt.",
        hi: "गलती की शिकायत सुधार या असली कर्ज़ रद्द होने का वादा नहीं।",
        hinglish:
          "Galti ki shikaayat sudhaar ya asli karz radd hone ka vaada nahin.",
      },
    },
    {
      id: "credit-score-8",
      type: "choice",
      prompt: {
        en: "A lender offers a loan but its payment does not fit your budget. What does a high-looking score change?",
        hi: "लेंडर लोन देता है पर पेमेंट बजट में फिट नहीं। अच्छा दिखता स्कोर क्या बदलता है?",
        hinglish:
          "Lender loan deta hai par payment budget mein fit nahin. Achchha dikhta score kya badalta hai?",
      },
      options: [
        {
          en: "It makes the payment affordable automatically",
          hi: "पेमेंट अपने आप संभालने लायक हो जाता है",
          hinglish: "Payment apne aap sambhaalne laayak ho jaata hai",
        },
        {
          en: "It turns the borrowed amount into earnings",
          hi: "उधार कमाई बन जाता है",
          hinglish: "Udhaar kamaai ban jaata hai",
        },
        {
          en: "It does not fix the cash-flow gap; review affordability separately",
          hi: "यह बजट की कमी नहीं भरता; लौटाने की जगह अलग जांचें",
          hinglish:
            "Yeh budget ki kami nahin bharta; lautaane ki jagah alag jaanchein",
        },
      ],
      answer: 2,
      explanation: {
        en: "Repeat the budget and net-worth ideas: approval is not spare cash, and borrowed cash comes with debt.",
        hi: "बजट और नेट-वर्थ दोहराएं: मंज़ूरी खाली पैसे नहीं और उधार के साथ कर्ज़ आता है।",
        hinglish:
          "Budget aur net-worth dohraayein: manzoori khaali paise nahin aur udhaar ke saath karz aata hai.",
      },
    },
  ],
};
