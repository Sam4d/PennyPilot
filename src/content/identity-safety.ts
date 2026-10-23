import type { Lesson } from "./schema";
export const identitySafetyLesson: Lesson = {
  id: "identity-safety",
  chapter: "everyday",
  skill: "S0.9.2",
  minutes: 18,
  icon: "ShieldCheck",
  title: {
    en: "Pause before you trust",
    hi: "भरोसा करने से पहले रुकें",
    hinglish: "Bharosa karne se pehle rukein",
  },
  subtitle: {
    en: "Inspect fake identity checks, secret-code requests and pressure tactics.",
    hi: "नकली KYC, सीक्रेट कोड की मांग और दबाव को पहचानें।",
    hinglish: "Nakli KYC, secret code ki maang aur dabaav ko pehchaanein.",
  },
  hook: {
    en: "Asha receives a message: “Your account will close in ten minutes. Update KYC here.” It shows a familiar bank name. Mia asks: who supplied the deadline, the link and the promise? If all three came from the same stranger, they are three claims, not three separate pieces of evidence. This lesson uses invented messages, never real account details.",
    hi: "आशा को मैसेज आता है: “दस मिनट में खाता बंद होगा। यहाँ KYC अपडेट करें।” बैंक का जाना-पहचाना नाम भी है। मिया पूछती है: समय की धमकी, लिंक और भरोसा किसने दिया? अगर तीनों एक अनजान इंसान से आए, तो ये तीन दावे हैं, तीन अलग सबूत नहीं। यहाँ सभी मैसेज बनाए हुए हैं। असली खाते की जानकारी न डालें।",
    hinglish:
      "Asha ko message aata hai: “Das minute mein khaata band hoga. Yahaan KYC update karein.” Bank ka jaana-pehchaana naam bhi hai. Mia poochhti hai: samay ki dhamki, link aur bharosa kisne diya? Agar teenon ek anjaan insaan se aaye, toh yeh teen daave hain, teen alag saboot nahin. Yahaan sabhi message banaaye hue hain. Asli khaate ki jaankaari na daalein.",
  },
  idea: {
    en: "Checking a customer’s identity (KYC) is different from trusting an unexpected caller. A real task can be copied into a fake request. Sending a message that pretends to be from someone trusted to steal information is called phishing. A familiar name, logo, correct spelling or knowledge of your birthday does not establish who controls the message. Pause the conversation and start a separate check through an app you already use or contact details obtained independently.",
    hi: "ग्राहक की पहचान की जांच (KYC) और अचानक आए कॉल पर भरोसा करना अलग बातें हैं। असली काम की नकल करके नकली मांग भेजी जा सकती है। भरोसे वाले नाम की नकल से जानकारी चुराने को फ़िशिंग कहते हैं। सही लोगो, साफ़ भाषा या आपकी जन्मतिथि जानना पहचान का सबूत नहीं। बातचीत रोकें। पहले से इस्तेमाल किए ऑफ़िशियल ऐप या अलग से मिले भरोसे वाले संपर्क से खुद जांच शुरू करें।",
    hinglish:
      "Grahak ki pehchaan ki jaanch (KYC) aur achaanak aaye call par bharosa karna alag baatein hain. Asli kaam ki nakal karke nakli maang bheji ja sakti hai. Bharose waale naam ki nakal se jaankaari churaane ko phishing kehte hain. Sahi logo, saaf bhaasha ya aapki janmatithi jaanna pehchaan ka saboot nahin. Baatcheet rokein. Pehle se istemaal kiye official app ya alag se mile bharose waale sampark se khud jaanch shuru karein.",
  },
  readings: [
    {
      title: {
        en: "A secret code can approve an action",
        hi: "सीक्रेट कोड से काम मंज़ूर हो सकता है",
        hinglish: "Secret code se kaam manzoor ho sakta hai",
      },
      body: {
        en: "A one-time password (OTP) may confirm a sign-in, password change or payment. Read the action described with it. Do not read a code to a caller, send it in chat or type it into a page opened from an unexpected message. If you started a task yourself in a trusted app, check that the code describes that exact task before entering it there. “It is only a verification code” does not make sharing safe. Recall the earlier payment lesson: read what will happen, not just what the caller promises.",
        hi: "एक बार इस्तेमाल होने वाला पासवर्ड (OTP) लॉगिन, पासवर्ड बदलने या पेमेंट जैसे काम की मंज़ूरी दे सकता है। उसके साथ लिखा काम पढ़ें। कॉलर को कोड न बताएं, चैट में न भेजें और अचानक आए लिंक के पेज पर न भरें। आपने खुद भरोसे वाले ऐप में काम शुरू किया हो, तो कोड का काम उससे मिलाएं और वहीं भरें। “सिर्फ़ वेरिफ़िकेशन है” कहने से शेयर करना सुरक्षित नहीं होता। पुराने पेमेंट पाठ की बात याद करें: क्या होने वाला है, वह पढ़ें।",
        hinglish:
          "Ek baar istemaal hone waala password (OTP) login, password badalne ya payment jaise kaam ki manzoori de sakta hai. Uske saath likha kaam padhein. Caller ko code na bataayein, chat mein na bhejein aur achaanak aaye link ke page par na bharein. Aapne khud bharose waale app mein kaam shuru kiya ho, toh code ka kaam usse milaayein aur wahin bharein. “Sirf verification hai” kehne se share karna surakshit nahin hota. Puraane payment paath ki baat yaad karein: kya hone waala hai, woh padhein.",
      },
    },
    {
      title: {
        en: "Leave the message’s route",
        hi: "मैसेज के दिए रास्ते से बाहर निकलें",
        hinglish: "Message ke diye raaste se baahar niklein",
      },
      body: {
        en: "Calling the “help number” in the same suspicious message is not an independent check. Neither is asking its sender whether the link is safe. Close the message and open the official app you already know. Find help there or use a contact from a trusted record you already hold. A search advertisement or forwarded contact may also be misleading. A lock symbol or HTTPS only concerns the connection; it does not prove an organisation owns a page. The practice address in our board is reserved for examples and is never opened.",
        hi: "उसी शक वाले मैसेज का “हेल्प नंबर” मिलाना अलग से जांच नहीं है। भेजने वाले से लिंक सुरक्षित है या नहीं पूछना भी नहीं। मैसेज बंद करें और पहले से भरोसे वाला ऑफ़िशियल ऐप खोलें। वहीं मदद खोजें या अपने पुराने भरोसे वाले रिकॉर्ड का संपर्क लें। सर्च का विज्ञापन या फ़ॉरवर्ड किया नंबर भी भटका सकता है। ताले का निशान या HTTPS कनेक्शन की बात बताता है, संस्था की पहचान पक्की नहीं करता। बोर्ड का पता सिर्फ़ example के लिए है, ऐप उसे खोलता नहीं।",
        hinglish:
          "Usi shak waale message ka “help number” milaana alag se jaanch nahin hai. Bhejne waale se link surakshit hai ya nahin poochhna bhi nahin. Message band karein aur pehle se bharose waala official app kholein. Wahin madad khojein ya apne puraane bharose waale record ka sampark lein. Search ka vigyaapan ya forward kiya number bhi bhatka sakta hai. Taale ka nishaan ya HTTPS connection ki baat bataata hai, sanstha ki pehchaan pakki nahin karta. Board ka pata sirf example ke liye hai, app use kholta nahin.",
      },
    },
    {
      title: {
        en: "Pressure, screen access and a lost signal",
        hi: "दबाव, स्क्रीन का ऐक्सेस और गायब सिग्नल",
        hinglish: "Dabaav, screen ka access aur gaayab signal",
      },
      body: {
        en: "A stranger may claim to be a bank worker or official and demand secrecy, screen sharing or a transfer to “protect” money. Claimed authority is still a claim. Stop following instructions and verify separately; a request to install remote-control software can expose what you see and do. An unexpected loss of mobile service can have an ordinary cause or be a warning of someone taking control of your mobile number (SIM swap). The symptom alone proves neither. Use another trusted device to contact your mobile provider and bank independently. Do not hand a caller codes to “restore” the signal.",
        hi: "अनजान इंसान बैंक कर्मचारी या अधिकारी बनकर बात छिपाने, स्क्रीन दिखाने या पैसे “बचाने” के लिए ट्रांसफ़र करने को कह सकता है। पद का दावा भी सिर्फ़ दावा है। निर्देश मानना रोकें और अलग से चेक करें। रिमोट-कंट्रोल ऐप से आपकी स्क्रीन और काम दिख या नियंत्रित हो सकते हैं। अचानक मोबाइल सिग्नल जाना साधारण दिक्कत भी हो सकती है या नंबर पर किसी और के कब्ज़े (SIM स्वैप) की चेतावनी। अकेला यह संकेत कुछ पक्का नहीं करता। दूसरे भरोसे वाले डिवाइस से मोबाइल कंपनी और बैंक को अलग से संपर्क करें। सिग्नल लौटाने के नाम पर कॉलर को कोड न दें।",
        hinglish:
          "Anjaan insaan bank karmachaari ya adhikaari bankar baat chhipaane, screen dikhaane ya paise “bachaane” ke liye transfer karne ko keh sakta hai. Pad ka daava bhi sirf daava hai. Nirdesh maanna rokein aur alag se check karein. Remote-control app se aapki screen aur kaam dikh ya niyantrit ho sakte hain. Achaanak mobile signal jaana saadhaaran dikkat bhi ho sakti hai ya number par kisi aur ke kabze (SIM swap) ki chetaavni. Akela yeh sanket kuch pakka nahin karta. Doosre bharose waale device se mobile company aur bank ko alag se sampark karein. Signal lautaane ke naam par caller ko code na dein.",
      },
    },
  ],
  example: {
    en: "On the board, inspect three invented requests. Reveal each clue and choose a response. “KYC today” can describe a possible task, but the message cannot prove its own identity. A caller who knows a transaction amount still has not earned access to a secret code. Mia repeats the same rule across all three cases: pause, leave the supplied route and verify independently. The board collects no codes or personal details.",
    hi: "बोर्ड पर तीन बनाए हुए मैसेज जांचें। संकेत खोलें और जवाब चुनें। “आज KYC” एक काम का दावा हो सकता है, पर मैसेज खुद अपनी पहचान साबित नहीं करता। ट्रांज़ैक्शन की रकम जानने वाला कॉलर भी सीक्रेट कोड पाने का हकदार नहीं। हर केस में मिया एक ही बात दोहराती है: रुकें, दिए रास्ते से हटें और अलग से चेक करें। बोर्ड कोड या निजी जानकारी नहीं लेता।",
    hinglish:
      "Board par teen banaaye hue message jaanchein. Sanket kholein aur jawaab chunein. “Aaj KYC” ek kaam ka daava ho sakta hai, par message khud apni pehchaan saabit nahin karta. Transaction ki rakam jaanne waala caller bhi secret code paane ka hakdaar nahin. Har case mein Mia ek hi baat dohraati hai: rukein, diye raaste se hatein aur alag se check karein. Board code ya niji jaankaari nahin leta.",
  },
  mistake: {
    en: "If you already shared a code or sent money, do not wait until you have a perfect evidence file. Stop further instructions and promptly contact your bank through an independent trusted route to explain what happened and request help securing access. Keep existing messages, times and transaction references when safe; do not continue chatting to gather more proof. Find current official reporting instructions independently. Do not pay a stranger who promises recovery, and do not assume reporting guarantees repayment. This draft does not state legal liability, deadlines or current reporting numbers.",
    hi: "कोड बता दिया या पैसे भेज दिए हों, तो पूरा सबूत जुटने का इंतज़ार न करें। आगे के निर्देश रोकें। अलग भरोसे वाले रास्ते से बैंक को जल्दी बताएं और ऐक्सेस सुरक्षित करने में मदद मांगें। सुरक्षित हो तो पुराने मैसेज, समय और ट्रांज़ैक्शन रेफ़रेंस रखें। और सबूत के लिए बातचीत जारी न रखें। शिकायत का मौजूदा ऑफ़िशियल तरीका अलग से खोजें। पैसे वापस दिलाने का वादा करने वाले अनजान इंसान को पैसे न दें। शिकायत से वापसी पक्की नहीं होती। इस ड्राफ़्ट में कानूनी ज़िम्मेदारी, समय-सीमा या मौजूदा हेल्पलाइन नंबर नहीं दिए हैं।",
    hinglish:
      "Code bata diya ya paise bhej diye hon, toh poora saboot jutne ka intezaar na karein. Aage ke nirdesh rokein. Alag bharose waale raaste se bank ko jaldi bataayein aur access surakshit karne mein madad maangein. Surakshit ho toh puraane message, samay aur transaction reference rakhein. Aur saboot ke liye baatcheet jaari na rakhein. Shikaayat ka maujooda official tareeka alag se khojein. Paise waapas dilaane ka vaada karne waale anjaan insaan ko paise na dein. Shikaayat se waapsi pakki nahin hoti. Is draft mein kaanooni zimmedaari, samay-seema ya maujooda helpline number nahin diye hain.",
  },
  notes: [
    {
      en: "A claim is not proof of identity.",
      hi: "दावा पहचान का सबूत नहीं।",
      hinglish: "Daava pehchaan ka saboot nahin.",
    },
    {
      en: "Protect secret codes; read the action.",
      hi: "सीक्रेट कोड बचाएं; काम पढ़ें।",
      hinglish: "Secret code bachaayein; kaam padhein.",
    },
    {
      en: "Verify through a separate trusted route.",
      hi: "अलग भरोसे वाले रास्ते से चेक करें।",
      hinglish: "Alag bharose waale raaste se check karein.",
    },
  ],
  action: {
    en: "Without sharing private details, describe to someone you trust how you would leave a suspicious conversation and find help independently. Revisit the payment-safety lesson: what action would a PIN approve?",
    hi: "निजी जानकारी दिए बिना किसी भरोसे वाले को बताएं कि शक वाली बातचीत कैसे रोकेंगे और अलग से मदद कैसे खोजेंगे। पेमेंट सुरक्षा का पाठ दोहराएं: PIN किस काम की मंज़ूरी देगा?",
    hinglish:
      "Niji jaankaari diye bina kisi bharose waale ko bataayein ki shak waali baatcheet kaise rokenge aur alag se madad kaise khojenge. Payment suraksha ka paath dohraayein: PIN kis kaam ki manzoori dega?",
  },
  sourceStatus: "unverified",
  sourceNote: {
    en: "Draft checked for internal consistency on 23 October 2026. RBI source access returned HTTP 403; primary-source and native-language review remain pending. Scenarios are fictional. No current reporting number, deadline, legal rule or repayment promise is provided.",
    hi: "23 अक्टूबर 2026 को ड्राफ़्ट के भीतर की संगति चेक की गई। RBI स्रोत पर HTTP 403 मिला। प्राथमिक स्रोत और भाषा की मानवीय समीक्षा बाकी है। सभी केस बनाए हुए हैं। मौजूदा शिकायत नंबर, समय-सीमा, कानूनी नियम या वापसी का वादा नहीं दिया है।",
    hinglish:
      "23 October 2026 ko draft ke bheetar ki sangati check ki gayi. RBI source par HTTP 403 mila. Praathmik srot aur bhaasha ki maanveey sameeksha baaki hai. Sabhi case banaaye hue hain. Maujooda shikaayat number, samay-seema, kaanooni niyam ya waapsi ka vaada nahin diya hai.",
  },
  sources: [
    "https://www.rbi.org.in/commonperson/English/Scripts/AgainstFrauds.aspx",
  ],
  reviewStatus: "editorial-draft",
  exercises: [
    {
      id: "identity-safety-1",
      type: "choice",
      prompt: {
        en: "A message shows the correct bank logo. What does that prove?",
        hi: "मैसेज में सही बैंक लोगो है। इससे क्या साबित होता है?",
        hinglish: "Message mein sahi bank logo hai. Isse kya saabit hota hai?",
      },
      options: [
        {
          en: "It came from the bank",
          hi: "बैंक ने भेजा है",
          hinglish: "Bank ne bheja hai",
        },
        {
          en: "The sender used that logo; identity still needs checking",
          hi: "भेजने वाले ने लोगो लगाया; पहचान चेक करना बाकी है",
          hinglish:
            "Bhejne waale ne logo lagaaya; pehchaan check karna baaki hai",
        },
        {
          en: "Every link in it is safe",
          hi: "हर लिंक सुरक्षित है",
          hinglish: "Har link surakshit hai",
        },
      ],
      answer: 1,
      explanation: {
        en: "A logo can be copied. Verify through a separate trusted route.",
        hi: "लोगो की नकल हो सकती है। अलग भरोसे वाले रास्ते से चेक करें।",
        hinglish:
          "Logo ki nakal ho sakti hai. Alag bharose waale raaste se check karein.",
      },
    },
    {
      id: "identity-safety-2",
      type: "document",
      prompt: {
        en: "Which line asks for a secret that could authorise an action?",
        hi: "कौन-सी लाइन काम मंज़ूर करने वाला सीक्रेट मांगती है?",
        hinglish: "Kaun-si line kaam manzoor karne waala secret maangti hai?",
      },
      options: [
        {
          en: "Customer service desk",
          hi: "कस्टमर सर्विस डेस्क",
          hinglish: "Customer service desk",
        },
        {
          en: "Please read your OTP to our agent",
          hi: "हमारे एजेंट को OTP बताएं",
          hinglish: "Hamaare agent ko OTP bataayein",
        },
        {
          en: "We can explain account features",
          hi: "हम खाते के फ़ीचर समझा सकते हैं",
          hinglish: "Hum khaate ke feature samjha sakte hain",
        },
      ],
      answer: 1,
      explanation: {
        en: "Never tell a caller your OTP. Read what action the code describes.",
        hi: "कॉलर को OTP न बताएं। कोड किस काम के लिए है, पढ़ें।",
        hinglish:
          "Caller ko OTP na bataayein. Code kis kaam ke liye hai, padhein.",
      },
      documentTitle: {
        en: "Fictional service message",
        hi: "बनाया हुआ सर्विस मैसेज",
        hinglish: "Banaaya hua service message",
      },
    },
    {
      id: "identity-safety-3",
      type: "choice",
      prompt: {
        en: "Choose an independent way to check an unexpected KYC request.",
        hi: "अचानक आई KYC मांग अलग से कैसे चेक करेंगे?",
        hinglish: "Achaanak aayi KYC maang alag se kaise check karenge?",
      },
      options: [
        {
          en: "Call the number in that message",
          hi: "उसी मैसेज का नंबर मिलाएं",
          hinglish: "Usi message ka number milaayein",
        },
        {
          en: "Ask the sender to promise it is safe",
          hi: "भेजने वाले से सुरक्षा का वादा लें",
          hinglish: "Bhejne waale se suraksha ka vaada lein",
        },
        {
          en: "Open the official app you already use and find help there",
          hi: "पहले से इस्तेमाल वाला ऑफ़िशियल ऐप खोलकर मदद खोजें",
          hinglish:
            "Pehle se istemaal waala official app kholkar madad khojein",
        },
      ],
      answer: 2,
      explanation: {
        en: "The message must not supply both the claim and the contact used to verify it.",
        hi: "दावा और जांच वाला संपर्क, दोनों उसी मैसेज से न लें।",
        hinglish:
          "Daava aur jaanch waala sampark, dono usi message se na lein.",
      },
    },
    {
      id: "identity-safety-4",
      type: "choice",
      prompt: {
        en: "A caller says they are an official and orders a secret transfer to protect your money. What comes first?",
        hi: "कॉलर खुद को अधिकारी बताकर पैसे बचाने के लिए गुप्त ट्रांसफ़र कहता है। पहले क्या करें?",
        hinglish:
          "Caller khud ko adhikaari bataakar paise bachaane ke liye gupt transfer kehta hai. Pehle kya karein?",
      },
      options: [
        {
          en: "Stop following instructions and verify separately",
          hi: "निर्देश मानना रोकें और अलग से चेक करें",
          hinglish: "Nirdesh maanna rokein aur alag se check karein",
        },
        {
          en: "Transfer a small test amount",
          hi: "छोटी रकम भेजकर टेस्ट करें",
          hinglish: "Chhoti rakam bhejkar test karein",
        },
        {
          en: "Install the caller’s screen-control app",
          hi: "कॉलर का स्क्रीन-कंट्रोल ऐप डालें",
          hinglish: "Caller ka screen-control app daalein",
        },
      ],
      answer: 0,
      explanation: {
        en: "Pressure and secrecy do not prove authority. Do not transfer to test a stranger.",
        hi: "दबाव और गोपनीयता पद का सबूत नहीं। अनजान इंसान को टेस्ट के लिए पैसे न भेजें।",
        hinglish:
          "Dabaav aur gopneeyata pad ka saboot nahin. Anjaan insaan ko test ke liye paise na bhejein.",
      },
    },
    {
      id: "identity-safety-5",
      type: "choice",
      prompt: {
        en: "Your phone unexpectedly loses service. Which conclusion is reasonable?",
        hi: "फोन का सिग्नल अचानक चला गया। कौन-सी बात सही है?",
        hinglish: "Phone ka signal achaanak chala gaya. Kaun-si baat sahi hai?",
      },
      options: [
        {
          en: "It definitely proves SIM swap",
          hi: "SIM स्वैप पक्का हो गया",
          hinglish: "SIM swap pakka ho gaya",
        },
        {
          en: "It is always harmless",
          hi: "यह हमेशा मामूली है",
          hinglish: "Yeh hamesha maamooli hai",
        },
        {
          en: "The cause is uncertain; check independently with your provider and bank",
          hi: "कारण पक्का नहीं; मोबाइल कंपनी और बैंक से अलग चेक करें",
          hinglish:
            "Kaaran pakka nahin; mobile company aur bank se alag check karein",
        },
      ],
      answer: 2,
      explanation: {
        en: "A warning sign needs attention, but one symptom is not proof. Use another trusted device if needed.",
        hi: "चेतावनी पर ध्यान दें, पर एक संकेत सबूत नहीं। ज़रूरत हो तो दूसरा भरोसे वाला डिवाइस लें।",
        hinglish:
          "Chetaavni par dhyaan dein, par ek sanket saboot nahin. Zaroorat ho toh doosra bharose waala device lein.",
      },
    },
    {
      id: "identity-safety-6",
      type: "choice",
      prompt: {
        en: "You already sent money after a suspicious call. What is the better immediate response?",
        hi: "शक वाले कॉल पर पैसे भेज दिए। तुरंत बेहतर कदम क्या है?",
        hinglish:
          "Shak waale call par paise bhej diye. Turant behtar kadam kya hai?",
      },
      options: [
        {
          en: "Keep talking until you have perfect evidence",
          hi: "पूरा सबूत मिलने तक बात करते रहें",
          hinglish: "Poora saboot milne tak baat karte rahein",
        },
        {
          en: "Stop further instructions and promptly contact the bank independently; keep existing evidence safely",
          hi: "आगे के निर्देश रोकें और बैंक से अलग संपर्क करें; पुराने सबूत सुरक्षित रखें",
          hinglish:
            "Aage ke nirdesh rokein aur bank se alag sampark karein; puraane saboot surakshit rakhein",
        },
        {
          en: "Pay a recovery caller an advance",
          hi: "वापसी कराने वाले कॉलर को एडवांस दें",
          hinglish: "Waapsi karaane waale caller ko advance dein",
        },
      ],
      answer: 1,
      explanation: {
        en: "Seeking help should not wait for a perfect evidence file. Reporting does not guarantee repayment.",
        hi: "पूरा सबूत जुटने तक मदद न टालें। शिकायत से पैसे लौटना पक्का नहीं।",
        hinglish:
          "Poora saboot jutne tak madad na taalein. Shikaayat se paise lautna pakka nahin.",
      },
    },
    {
      id: "identity-safety-7",
      type: "choice",
      prompt: {
        en: "You started a password reset yourself inside a trusted app. The OTP message describes a payment instead. What should you do?",
        hi: "आपने भरोसे वाले ऐप में पासवर्ड बदलना शुरू किया। OTP मैसेज में पेमेंट लिखा है। क्या करें?",
        hinglish:
          "Aapne bharose waale app mein password badalna shuru kiya. OTP message mein payment likha hai. Kya karein?",
      },
      options: [
        {
          en: "Enter it because you expected some code",
          hi: "कोई कोड आने वाला था, इसलिए भर दें",
          hinglish: "Koi code aane waala tha, isliye bhar dein",
        },
        {
          en: "Tell the caller so they can fix it",
          hi: "कॉलर को बताएं ताकि ठीक करे",
          hinglish: "Caller ko bataayein taaki theek kare",
        },
        {
          en: "Stop: the action does not match the task you started",
          hi: "रुकें: काम आपके शुरू किए काम से नहीं मिलता",
          hinglish: "Rukein: kaam aapke shuru kiye kaam se nahin milta",
        },
      ],
      answer: 2,
      explanation: {
        en: "Read the action as well as the code. An expected code must still match your task.",
        hi: "कोड के साथ काम पढ़ें। इंतज़ार वाला कोड भी सही काम से मिलना चाहिए।",
        hinglish:
          "Code ke saath kaam padhein. Intezaar waala code bhi sahi kaam se milna chaahiye.",
      },
    },
    {
      id: "identity-safety-8",
      type: "choice",
      prompt: {
        en: "A refund caller knows the amount you paid. They ask for your PIN. Recall the earlier safety lesson: what matters most?",
        hi: "रिफ़ंड कॉलर आपकी पेमेंट रकम जानता है और PIN मांगता है। पुराने सुरक्षा पाठ की कौन-सी बात याद रखें?",
        hinglish:
          "Refund caller aapki payment rakam jaanta hai aur PIN maangta hai. Puraane suraksha paath ki kaun-si baat yaad rakhein?",
      },
      options: [
        {
          en: "Knowing the amount proves identity",
          hi: "रकम जानना पहचान का सबूत है",
          hinglish: "Rakam jaanna pehchaan ka saboot hai",
        },
        {
          en: "Read the actual action and protect your secret; verify independently",
          hi: "असली काम पढ़ें, सीक्रेट बचाएं और अलग से चेक करें",
          hinglish:
            "Asli kaam padhein, secret bachaayein aur alag se check karein",
        },
        {
          en: "A small refund makes sharing safe",
          hi: "छोटे रिफ़ंड में शेयर करना सुरक्षित है",
          hinglish: "Chhote refund mein share karna surakshit hai",
        },
      ],
      answer: 1,
      explanation: {
        en: "Information about you is not permission to use your account. The pause-and-check rule transfers to new stories.",
        hi: "आपकी जानकारी जानना खाते का ऐक्सेस पाने की मंज़ूरी नहीं। नई कहानी में भी रुकने और चेक करने का नियम रखें।",
        hinglish:
          "Aapki jaankaari jaanna khaate ka access paane ki manzoori nahin. Nayi kahaani mein bhi rukne aur check karne ka niyam rakhein.",
      },
    },
  ],
};
