import type { Lesson } from "./schema";
export const bankingKycLesson: Lesson = {
  id: "banking-kyc",
  chapter: "everyday",
  skill: "S0.4.2",
  minutes: 18,
  icon: "Landmark",
  title: {
    en: "Know your bank account and identity checks",
    hi: "बैंक खाता और पहचान की जांच समझें",
    hinglish: "Bank khaata aur pehchaan ki jaanch samjhein",
  },
  subtitle: {
    en: "Separate identity, payment permission and money available.",
    hi: "पहचान, पेमेंट की मंज़ूरी और उपलब्ध पैसे अलग समझें।",
    hinglish: "Pehchaan, payment ki manzoori aur uplabdh paise alag samjhein.",
  },
  hook: {
    en: "Asha wants to receive her first salary. One screen asks for identity details, another shows a payment request and a third shows her balance. Mia asks her to name the job of each screen before touching a button. Proving who you are, approving a payment and checking money available are three different tasks. The examples here are fictional; never upload identity documents or account details into this lesson.",
    hi: "आशा पहली सैलरी पाना चाहती है। एक स्क्रीन पहचान की जानकारी मांगती है, दूसरी पेमेंट की मांग दिखाती है और तीसरी बैलेंस। मिया कहती है: बटन दबाने से पहले हर स्क्रीन का काम बताओ। पहचान साबित करना, पेमेंट मंज़ूर करना और उपलब्ध पैसे देखना तीन अलग काम हैं। यहाँ सभी example बनाए हुए हैं। इस पाठ में पहचान के दस्तावेज़ या खाते की जानकारी अपलोड न करें।",
    hinglish:
      "Asha pehli salary paana chaahti hai. Ek screen pehchaan ki jaankaari maangti hai, doosri payment ki maang dikhaati hai aur teesri balance. Mia kehti hai: button dabaane se pehle har screen ka kaam bataao. Pehchaan saabit karna, payment manzoor karna aur uplabdh paise dekhna teen alag kaam hain. Yahaan sabhi example banaaye hue hain. Is paath mein pehchaan ke dastaavez ya khaate ki jaankaari upload na karein.",
  },
  idea: {
    en: "A bank account records money held and movements in and out. A savings account is one account type, not a promise that every feature is free or every displayed balance is immediately usable. Read the account terms, access methods, charges and any conditions through a trusted official route. Checking a customer’s identity (KYC) helps establish who the customer is. It is separate from giving someone permission to operate the account or send money. A genuine banking task can still be copied into a fake message.",
    hi: "बैंक खाता रखे पैसे और आने-जाने वाली रकम का रिकॉर्ड रखता है। सेविंग्स खाता एक तरह का खाता है। इसका मतलब हर सुविधा फ्री या दिखा हर पैसा तुरंत इस्तेमाल लायक होना नहीं। भरोसे वाले ऑफ़िशियल रास्ते से शर्तें, पैसे तक पहुंच, चार्ज और बाकी नियम पढ़ें। ग्राहक की पहचान की जांच (KYC) में ग्राहक कौन है, यह चेक किया जाता है। यह किसी को खाते का ऐक्सेस या पैसे भेजने की मंज़ूरी देना नहीं। असली बैंकिंग काम की नकल से नकली मैसेज भी बन सकता है।",
    hinglish:
      "Bank khaata rakhe paise aur aane-jaane waali rakam ka record rakhta hai. Savings khaata ek tarah ka khaata hai. Iska matlab har suvidha free ya dikha har paisa turant istemaal laayak hona nahin. Bharose waale official raaste se shartein, paison tak pahunch, charge aur baaki niyam padhein. Grahak ki pehchaan ki jaanch (KYC) mein grahak kaun hai, yeh check kiya jaata hai. Yeh kisi ko khaate ka access ya paise bhejne ki manzoori dena nahin. Asli banking kaam ki nakal se nakli message bhi ban sakta hai.",
  },
  readings: [
    {
      title: {
        en: "Ask what is needed, and why",
        hi: "पूछें: क्या चाहिए और क्यों?",
        hinglish: "Poochhein: kya chaahiye aur kyon?",
      },
      body: {
        en: "An identity number such as Aadhaar and a tax identifier such as PAN have different purposes. Do not assume that one document always replaces another, that either is compulsory in every case, or that a caller’s list is current. Find the provider’s current official instructions for your situation, the purpose of each field and the secure submission route. Match the name and relevant details to your records; ask how to correct an old address or mismatch. This draft does not give a legally sufficient document list, eligibility rule or update deadline. The practice checklist is invented and cannot approve an account.",
        hi: "Aadhaar जैसे पहचान नंबर और PAN जैसे टैक्स पहचान नंबर के काम अलग हैं। यह न मानें कि एक दस्तावेज़ हमेशा दूसरे की जगह चलेगा, दोनों हर केस में ज़रूरी हैं या कॉलर की लिस्ट मौजूदा है। अपनी स्थिति के लिए संस्था के ऑफ़िशियल निर्देश, हर फ़ील्ड का मकसद और सुरक्षित भेजने का रास्ता चेक करें। नाम और ज़रूरी जानकारी अपने रिकॉर्ड से मिलाएं। पुराना पता या फर्क हो तो सुधार का तरीका पूछें। यह ड्राफ़्ट कानूनी तौर पर पूरी दस्तावेज़ लिस्ट, पात्रता का नियम या अपडेट की समय-सीमा नहीं देता। प्रैक्टिस की लिस्ट बनाई हुई है; इससे खाता मंज़ूर नहीं होता।",
        hinglish:
          "Aadhaar jaise pehchaan number aur PAN jaise tax pehchaan number ke kaam alag hain. Yeh na maanein ki ek dastaavez hamesha doosre ki jagah chalega, dono har case mein zaroori hain ya caller ki list maujooda hai. Apni sthiti ke liye sanstha ke official nirdesh, har field ka maksad aur surakshit bhejne ka raasta check karein. Naam aur zaroori jaankaari apne record se milaayein. Puraana pata ya fark ho toh sudhaar ka tareeka poochhein. Yeh draft kaanooni taur par poori dastaavez list, paatrata ka niyam ya update ki samay-seema nahin deta. Practice ki list banaayi hui hai; isse khaata manzoor nahin hota.",
      },
    },
    {
      title: {
        en: "Choose the task before the payment route",
        hi: "पेमेंट के रास्ते से पहले काम समझें",
        hinglish: "Payment ke raaste se pehle kaam samjhein",
      },
      body: {
        en: "A payment network moves an instruction; your account and the method used to access it are different things. UPI, a card payment and a bank transfer are not extra pots of wealth simply because they appear in different apps. Check the recipient, amount, action, costs and status in the trusted service. Sending your own money from one account to another changes its location, not your income. A request to pay is not a receipt. If a transaction is pending, check its status and reference before trying again; repeated attempts can create more than one payment. Current network limits, timings and fees must be checked with the provider.",
        hi: "पेमेंट नेटवर्क पैसे भेजने का निर्देश पहुंचाता है। खाता और उसे इस्तेमाल करने का तरीका अलग हैं। अलग ऐप में UPI, कार्ड और बैंक ट्रांसफ़र दिखने से अलग नई दौलत नहीं बनती। भरोसे वाली सर्विस में पाने वाला, रकम, काम, खर्च और स्टेटस देखें। अपने एक खाते से दूसरे में पैसे भेजना जगह बदलता है, कमाई नहीं। पेमेंट की मांग रसीद नहीं है। ट्रांज़ैक्शन पेंडिंग हो तो फिर कोशिश करने से पहले स्टेटस और रेफ़रेंस चेक करें। बार-बार कोशिश से एक से ज़्यादा पेमेंट हो सकते हैं। नेटवर्क की मौजूदा लिमिट, समय और फीस संस्था से चेक करें।",
        hinglish:
          "Payment network paise bhejne ka nirdesh pahunchaata hai. Khaata aur use istemaal karne ka tareeka alag hain. Alag app mein UPI, card aur bank transfer dikhne se alag nayi daulat nahin banti. Bharose waali service mein paane waala, rakam, kaam, kharch aur status dekhein. Apne ek khaate se doosre mein paise bhejna jagah badalta hai, kamaai nahin. Payment ki maang raseed nahin hai. Transaction pending ho toh phir koshish karne se pehle status aur reference check karein. Baar-baar koshish se ek se zyaada payment ho sakte hain. Network ki maujooda limit, samay aur fees sanstha se check karein.",
      },
    },
    {
      title: {
        en: "Recorded balance and money available can differ",
        hi: "रिकॉर्ड का बैलेंस और उपलब्ध पैसे अलग हो सकते हैं",
        hinglish: "Record ka balance aur uplabdh paise alag ho sakte hain",
      },
      body: {
        en: "Repeat the statement lesson: opening balance plus recorded credits minus recorded debits gives the recorded closing balance. In our dated fictional model, an additional payment amount is temporarily reserved (a hold) but has not yet been recorded as a debit. The model subtracts this hold once to show an assumed available amount. When the same payment becomes a recorded debit, the hold is removed; subtracting both would count the same payment twice. Real banks can display balances and restrictions differently. Check the provider’s definition and other commitments before spending; this small model is not a complete statement of money you can safely spend.",
        hi: "स्टेटमेंट पाठ दोहराएं: शुरू का बैलेंस + दर्ज आए पैसे − दर्ज गए पैसे = दर्ज आखिरी बैलेंस। इस तारीख़ वाले बनाए मॉडल में पेमेंट की एक रकम अभी अलग रोकी गई है (होल्ड), डेबिट में दर्ज नहीं हुई। मॉडल में उपलब्ध रकम दिखाने के लिए होल्ड एक बार घटता है। वही पेमेंट डेबिट में दर्ज हो तो होल्ड हटता है। दोनों घटाने से एक पेमेंट दो बार कटेगा। असली बैंक बैलेंस और रोक अलग तरह से दिखा सकते हैं। खर्च से पहले संस्था का मतलब और दूसरे तय खर्च चेक करें। यह छोटा मॉडल सुरक्षित खर्च किए जा सकने वाले पूरे पैसे नहीं बताता।",
        hinglish:
          "Statement paath dohraayein: shuru ka balance + darj aaye paise − darj gaye paise = darj aakhiri balance. Is taareekh waale banaaye model mein payment ki ek rakam abhi alag roki gayi hai (hold), debit mein darj nahin hui. Model mein uplabdh rakam dikhaane ke liye hold ek baar ghatta hai. Wahi payment debit mein darj ho toh hold hatta hai. Dono ghataane se ek payment do baar katega. Asli bank balance aur rok alag tarah se dikha sakte hain. Kharch se pehle sanstha ka matlab aur doosre tay kharch check karein. Yeh chhota model surakshit kharch kiye ja sakne waale poore paise nahin bataata.",
      },
    },
  ],
  example: {
    en: "Use the board’s fictional entries: ₹5,000 opening balance + ₹12,000 salary − ₹6,000 rent − ₹500 purchase − ₹100 illustrative fee = ₹10,400 recorded balance. A separate assumed ₹300 hold leaves ₹10,100 in the model. Post that same ₹300 payment and release its hold: recorded balance becomes ₹10,100 and assumed available money stays ₹10,100. Mia asks you to explain why it did not fall again. Neither the fee nor the hold treatment describes a current bank product.",
    hi: "बोर्ड की बनाई एंट्री लें: शुरू के ₹5,000 + सैलरी ₹12,000 − किराया ₹6,000 − खरीद ₹500 − example फीस ₹100 = दर्ज बैलेंस ₹10,400। अलग माना ₹300 का होल्ड घटे तो मॉडल में ₹10,100। वही ₹300 पेमेंट दर्ज करें और होल्ड हटाएं। दर्ज बैलेंस ₹10,100 और माना उपलब्ध पैसा ₹10,100 ही। मिया पूछती है: यह फिर क्यों नहीं घटा? फीस और होल्ड का तरीका किसी मौजूदा बैंक प्रोडक्ट का नियम नहीं है।",
    hinglish:
      "Board ki banaayi entry lein: shuru ke ₹5,000 + salary ₹12,000 − kiraaya ₹6,000 − khareed ₹500 − example fees ₹100 = darj balance ₹10,400. Alag maana ₹300 ka hold ghate toh model mein ₹10,100. Wahi ₹300 payment darj karein aur hold hataayein. Darj balance ₹10,100 aur maana uplabdh paisa ₹10,100 hi. Mia poochhti hai: yeh phir kyon nahin ghata? Fees aur hold ka tareeka kisi maujooda bank product ka niyam nahin hai.",
  },
  mistake: {
    en: "KYC is not a reason to tell an unexpected caller your PIN, password or OTP. A code can authorise a sign-in, change or payment: read the exact action and use only the trusted task you started. Never use the suspicious message’s own number as its verification. If information or access may be compromised, stop further instructions and promptly find bank help through an independent trusted route. Keep existing records safely without delaying help. No current reporting route, legal deadline or refund promise is supplied in this draft.",
    hi: "KYC के नाम पर अचानक आए कॉलर को PIN, पासवर्ड या OTP न बताएं। कोड लॉगिन, बदलाव या पेमेंट मंज़ूर कर सकता है। सही काम पढ़ें और खुद शुरू किए भरोसे वाले काम में ही इस्तेमाल करें। शक वाले मैसेज का अपना नंबर उसकी जांच के लिए न लें। जानकारी या ऐक्सेस खतरे में लगे तो आगे के निर्देश रोकें और अलग भरोसे वाले रास्ते से बैंक की मदद जल्दी खोजें। मदद टाले बिना पुराने रिकॉर्ड सुरक्षित रखें। इस ड्राफ़्ट में मौजूदा शिकायत रास्ता, कानूनी समय-सीमा या पैसे लौटने का वादा नहीं है।",
    hinglish:
      "KYC ke naam par achaanak aaye caller ko PIN, password ya OTP na bataayein. Code login, badlaav ya payment manzoor kar sakta hai. Sahi kaam padhein aur khud shuru kiye bharose waale kaam mein hi istemaal karein. Shak waale message ka apna number uski jaanch ke liye na lein. Jaankaari ya access khatre mein lage toh aage ke nirdesh rokein aur alag bharose waale raaste se bank ki madad jaldi khojein. Madad taale bina puraane record surakshit rakhein. Is draft mein maujooda shikaayat raasta, kaanooni samay-seema ya paise lautne ka vaada nahin hai.",
  },
  notes: [
    {
      en: "Identity checks and payment permission are separate.",
      hi: "पहचान की जांच और पेमेंट की मंज़ूरी अलग हैं।",
      hinglish: "Pehchaan ki jaanch aur payment ki manzoori alag hain.",
    },
    {
      en: "Read the action, reference and current status before retrying.",
      hi: "फिर कोशिश से पहले काम, रेफ़रेंस और मौजूदा स्टेटस पढ़ें।",
      hinglish:
        "Phir koshish se pehle kaam, reference aur maujooda status padhein.",
    },
    {
      en: "Count the same payment once when a hold becomes a debit.",
      hi: "होल्ड डेबिट बने तो एक पेमेंट एक बार गिनें।",
      hinglish: "Hold debit bane toh ek payment ek baar ginein.",
    },
  ],
  action: {
    en: "Explain the three jobs—identity check, payment approval and balance check—to someone you trust using only fictional details. Revisit the statement and fraud lessons, then list what you would verify about an account’s terms before using it.",
    hi: "सिर्फ़ बनाई जानकारी से किसी भरोसे वाले को तीन काम समझाएं: पहचान की जांच, पेमेंट मंज़ूर करना और बैलेंस चेक करना। स्टेटमेंट और फ़्रॉड वाले पाठ दोहराएं। फिर लिखें: खाता इस्तेमाल करने से पहले उसकी शर्तों में क्या चेक करेंगे?",
    hinglish:
      "Sirf banaayi jaankaari se kisi bharose waale ko teen kaam samjhaayein: pehchaan ki jaanch, payment manzoor karna aur balance check karna. Statement aur fraud waale paath dohraayein. Phir likhein: khaata istemaal karne se pehle uski sharton mein kya check karenge?",
  },
  sourceStatus: "unverified",
  sourceNote: {
    en: "Editorial draft and fictional assumptions dated 27 October 2026. RBI source access returned HTTP 403; the source was not read. Financial and native-language review remain pending. No current document requirement, eligibility rule, payment limit, fee schedule, reporting deadline or bank-balance guarantee is stated.",
    hi: "27 अक्टूबर 2026 का एडिटोरियल ड्राफ़्ट और बनाए अनुमान। RBI स्रोत पर HTTP 403 मिला; स्रोत पढ़ा नहीं गया। वित्त और भाषा की मानवीय समीक्षा बाकी है। मौजूदा दस्तावेज़ की ज़रूरत, पात्रता, पेमेंट लिमिट, फीस लिस्ट, शिकायत समय-सीमा या बैंक बैलेंस की गारंटी नहीं दी गई है।",
    hinglish:
      "27 October 2026 ka editorial draft aur banaaye anumaan. RBI srot par HTTP 403 mila; srot padha nahin gaya. Vitt aur bhaasha ki maanveey sameeksha baaki hai. Maujooda dastaavez ki zaroorat, paatrata, payment limit, fees list, shikaayat samay-seema ya bank balance ki guarantee nahin di gayi hai.",
  },
  sources: ["https://www.rbi.org.in/FinancialEducation/"],
  reviewStatus: "editorial-draft",
  exercises: [
    {
      id: "banking-kyc-1",
      type: "choice",
      prompt: {
        en: "What does a customer identity check establish?",
        hi: "ग्राहक की पहचान की जांच किस काम की है?",
        hinglish: "Grahak ki pehchaan ki jaanch kis kaam ki hai?",
      },
      options: [
        {
          en: "It checks who the customer is; payment permission is separate",
          hi: "ग्राहक कौन है, यह चेक होता है; पेमेंट मंज़ूरी अलग है",
          hinglish:
            "Grahak kaun hai, yeh check hota hai; payment manzoori alag hai",
        },
        {
          en: "It gives every caller permission to move money",
          hi: "हर कॉलर को पैसे भेजने की मंज़ूरी मिलती है",
          hinglish: "Har caller ko paise bhejne ki manzoori milti hai",
        },
        {
          en: "It guarantees that all services are free",
          hi: "सभी सर्विस फ्री होने की गारंटी मिलती है",
          hinglish: "Sabhi service free hone ki guarantee milti hai",
        },
      ],
      answer: 0,
      explanation: {
        en: "Identify the task before sharing anything or approving an action.",
        hi: "जानकारी देने या काम मंज़ूर करने से पहले काम पहचानें।",
        hinglish:
          "Jaankaari dene ya kaam manzoor karne se pehle kaam pehchaanein.",
      },
    },
    {
      id: "banking-kyc-2",
      type: "document",
      prompt: {
        en: "Which fictional entry needs clarification before relying on it?",
        hi: "किस बनाई एंट्री पर भरोसा करने से पहले सफाई चाहिए?",
        hinglish:
          "Kis banaayi entry par bharosa karne se pehle safaai chaahiye?",
      },
      options: [
        {
          en: "Example name matches the practice record",
          hi: "example नाम प्रैक्टिस रिकॉर्ड से मिलता है",
          hinglish: "Example naam practice record se milta hai",
        },
        {
          en: "Address on file is old; current details have changed",
          hi: "रिकॉर्ड का पता पुराना है; अब जानकारी बदल गई",
          hinglish: "Record ka pata puraana hai; ab jaankaari badal gayi",
        },
        {
          en: "The page is labelled a fictional exercise",
          hi: "पेज पर बनाया हुआ अभ्यास लिखा है",
          hinglish: "Page par banaaya hua abhyaas likha hai",
        },
      ],
      answer: 1,
      explanation: {
        en: "Ask the provider how to update or clarify the mismatch through a trusted official route. The board cannot approve an account.",
        hi: "भरोसे वाले ऑफ़िशियल रास्ते से संस्था से सुधार या फर्क समझने का तरीका पूछें। बोर्ड खाता मंज़ूर नहीं कर सकता।",
        hinglish:
          "Bharose waale official raaste se sanstha se sudhaar ya fark samajhne ka tareeka poochhein. Board khaata manzoor nahin kar sakta.",
      },
      documentTitle: {
        en: "Fictional identity request",
        hi: "बनाई पहचान की मांग",
        hinglish: "Banaayi pehchaan ki maang",
      },
    },
    {
      id: "banking-kyc-3",
      type: "choice",
      prompt: {
        en: "A caller says sharing your OTP is mandatory for KYC. What should you do?",
        hi: "कॉलर कहता है KYC के लिए उसे OTP बताना ज़रूरी है। क्या करें?",
        hinglish:
          "Caller kehta hai KYC ke liye use OTP bataana zaroori hai. Kya karein?",
      },
      options: [
        {
          en: "Share it because the caller said KYC",
          hi: "KYC कहा है, इसलिए बताएं",
          hinglish: "KYC kaha hai, isliye bataayein",
        },
        {
          en: "Stop the request and verify through an independent trusted route",
          hi: "मांग रोकें और अलग भरोसे वाले रास्ते से चेक करें",
          hinglish:
            "Maang rokein aur alag bharose waale raaste se check karein",
        },
        {
          en: "Use the help number in the same suspicious message",
          hi: "उसी शक वाले मैसेज का हेल्प नंबर लें",
          hinglish: "Usi shak waale message ka help number lein",
        },
      ],
      answer: 1,
      explanation: {
        en: "A banking label does not establish identity or make sharing a secret safe.",
        hi: "बैंकिंग नाम पहचान पक्की नहीं करता और सीक्रेट बताना सुरक्षित नहीं बनाता।",
        hinglish:
          "Banking naam pehchaan pakki nahin karta aur secret bataana surakshit nahin banaata.",
      },
    },
    {
      id: "banking-kyc-4",
      type: "numeric",
      prompt: {
        en: "Fictional recorded balance: ₹5,000 + ₹12,000 − ₹6,000 − ₹500 − ₹100. How much remains?",
        hi: "बनाया दर्ज बैलेंस: ₹5,000 + ₹12,000 − ₹6,000 − ₹500 − ₹100। कितना बचा?",
        hinglish:
          "Banaaya darj balance: ₹5,000 + ₹12,000 − ₹6,000 − ₹500 − ₹100. Kitna bacha?",
      },
      answer: 10400,
      explanation: {
        en: "₹17,000 in opening money and credits less ₹6,600 in recorded debits leaves ₹10,400. The separate hold has not been counted yet.",
        hi: "शुरू के पैसे और आए पैसे ₹17,000। दर्ज गए पैसे ₹6,600 घटे तो ₹10,400। अलग होल्ड अभी नहीं गिना है।",
        hinglish:
          "Shuru ke paise aur aaye paise ₹17,000. Darj gaye paise ₹6,600 ghate toh ₹10,400. Alag hold abhi nahin gina hai.",
      },
      calculation: {
        operation: "add",
        values: [5000, 12000, -6000, -500, -100],
      },
    },
    {
      id: "banking-kyc-5",
      type: "numeric",
      prompt: {
        en: "In this model only, subtract the separate ₹300 hold from the ₹10,400 recorded balance. What is the assumed available amount?",
        hi: "सिर्फ़ इस मॉडल में दर्ज ₹10,400 से अलग ₹300 होल्ड घटाएं। माना उपलब्ध पैसा कितना है?",
        hinglish:
          "Sirf is model mein darj ₹10,400 se alag ₹300 hold ghataayein. Maana uplabdh paisa kitna hai?",
      },
      answer: 10100,
      explanation: {
        en: "₹10,400 − ₹300 = ₹10,100. This model is not a guarantee of a real bank’s available balance or safe spending amount.",
        hi: "₹10,400 − ₹300 = ₹10,100। यह मॉडल असली बैंक के उपलब्ध बैलेंस या सुरक्षित खर्च की गारंटी नहीं।",
        hinglish:
          "₹10,400 − ₹300 = ₹10,100. Yeh model asli bank ke uplabdh balance ya surakshit kharch ki guarantee nahin.",
      },
      calculation: {
        operation: "subtract",
        values: [10400, 300],
      },
    },
    {
      id: "banking-kyc-6",
      type: "choice",
      prompt: {
        en: "The same ₹300 payment becomes a recorded debit and its hold is removed. What is the model’s available amount now?",
        hi: "वही ₹300 पेमेंट डेबिट में दर्ज हुआ और उसका होल्ड हटा। मॉडल में उपलब्ध पैसा अब कितना है?",
        hinglish:
          "Wahi ₹300 payment debit mein darj hua aur uska hold hata. Model mein uplabdh paisa ab kitna hai?",
      },
      options: [
        {
          en: "₹9,800 because the hold must stay too",
          hi: "₹9,800 क्योंकि होल्ड भी रहना चाहिए",
          hinglish: "₹9,800 kyonki hold bhi rehna chaahiye",
        },
        {
          en: "₹10,700 because the debit adds money",
          hi: "₹10,700 क्योंकि डेबिट पैसे जोड़ता है",
          hinglish: "₹10,700 kyonki debit paise jodta hai",
        },
        {
          en: "₹10,100; count the same payment once",
          hi: "₹10,100; एक पेमेंट एक बार गिनें",
          hinglish: "₹10,100; ek payment ek baar ginein",
        },
      ],
      answer: 2,
      explanation: {
        en: "The recorded balance is now ₹10,100 and the remaining hold is zero. Subtracting the old hold again counts the payment twice.",
        hi: "दर्ज बैलेंस अब ₹10,100 और बाकी होल्ड शून्य। पुराना होल्ड फिर घटाने से एक पेमेंट दो बार गिना जाएगा।",
        hinglish:
          "Darj balance ab ₹10,100 aur baaki hold shoonya. Puraana hold phir ghataane se ek payment do baar gina jaayega.",
      },
    },
    {
      id: "banking-kyc-7",
      type: "choice",
      prompt: {
        en: "You move ₹2,000 between two accounts you own, with no fee in this example. What happens to total money owned?",
        hi: "अपने दो खातों के बीच ₹2,000 भेजे। इस example में फीस नहीं है। कुल अपने पैसे पर क्या असर है?",
        hinglish:
          "Apne do khaaton ke beech ₹2,000 bheje. Is example mein fees nahin hai. Kul apne paise par kya asar hai?",
      },
      options: [
        {
          en: "Income rises by ₹2,000",
          hi: "कमाई ₹2,000 बढ़ी",
          hinglish: "Kamaai ₹2,000 badhi",
        },
        {
          en: "The money changes location; total money owned stays the same",
          hi: "पैसों की जगह बदली; कुल अपने पैसे उतने ही",
          hinglish: "Paison ki jagah badli; kul apne paise utne hi",
        },
        {
          en: "Both accounts gain ₹2,000 each",
          hi: "दोनों खातों में ₹2,000 बढ़े",
          hinglish: "Dono khaaton mein ₹2,000 badhe",
        },
      ],
      answer: 1,
      explanation: {
        en: "Repeat the cash-flow and net-worth rule: an internal transfer is not new income.",
        hi: "कैश-फ़्लो और नेट-वर्थ का नियम दोहराएं: अपना ट्रांसफ़र नई कमाई नहीं।",
        hinglish:
          "Cash-flow aur net-worth ka niyam dohraayein: apna transfer nayi kamaai nahin.",
      },
    },
    {
      id: "banking-kyc-8",
      type: "choice",
      prompt: {
        en: "A payment is pending. What should you check before immediately trying again?",
        hi: "पेमेंट पेंडिंग है। तुरंत फिर कोशिश से पहले क्या चेक करें?",
        hinglish:
          "Payment pending hai. Turant phir koshish se pehle kya check karein?",
      },
      options: [
        {
          en: "Its status, reference and recipient through the trusted service",
          hi: "भरोसे वाली सर्विस में स्टेटस, रेफ़रेंस और पाने वाला",
          hinglish:
            "Bharose waali service mein status, reference aur paane waala",
        },
        {
          en: "Only the colour of a message",
          hi: "सिर्फ़ मैसेज का रंग",
          hinglish: "Sirf message ka rang",
        },
        {
          en: "A caller’s promise that repeated payments are harmless",
          hi: "कॉलर का वादा कि बार-बार पेमेंट में दिक्कत नहीं",
          hinglish: "Caller ka vaada ki baar-baar payment mein dikkat nahin",
        },
      ],
      answer: 0,
      explanation: {
        en: "A request is not a receipt, and a repeated attempt can create another payment. Verify status and ask official help when unclear.",
        hi: "मांग रसीद नहीं है और फिर कोशिश से दूसरा पेमेंट हो सकता है। स्टेटस चेक करें और साफ़ न हो तो ऑफ़िशियल मदद लें।",
        hinglish:
          "Maang raseed nahin hai aur phir koshish se doosra payment ho sakta hai. Status check karein aur saaf na ho toh official madad lein.",
      },
    },
  ],
};
