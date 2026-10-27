import type { Lesson } from "./schema";
export const loanTermsLesson: Lesson = {
  id: "loan-terms",
  chapter: "borrowing",
  skill: "S0.6.7",
  minutes: 20,
  icon: "Landmark",
  title: {
    en: "Read the loan before the payment",
    hi: "किस्त से पहले लोन की शर्तें समझें",
    hinglish: "Kisht se pehle loan ki shartein samjhein",
  },
  subtitle: {
    en: "Compare the asset at risk, cash received, full cost and changing rates.",
    hi: "जोखिम में रखा सामान, मिले पैसे, पूरा खर्च और बदलता रेट तुलना करें।",
    hinglish:
      "Jokhim mein rakha saamaan, mile paise, poora kharch aur badalta rate tulna karein.",
  },
  hook: {
    en: "Asha compares two offers. One advertises a smaller monthly payment and asks her to pledge an asset. Another takes a fee before giving her the money. Mia asks four questions: what will you actually receive, what must you repay and when, what can change, and what is at risk if the plan fails? A friendly product name cannot answer these questions. All offers and rates in this lesson are invented, not recommendations.",
    hi: "आशा दो ऑफ़र देखती है। एक में छोटी किस्त है, पर एक सामान गिरवी रखना है। दूसरा पैसे देने से पहले फीस काटता है। मिया चार सवाल पूछती है: हाथ में कितने पैसे मिलेंगे, कब कितना लौटाना है, क्या बदल सकता है और प्लान फेल हो तो क्या खतरे में है? अच्छा-सा नाम इनका जवाब नहीं देता। यहाँ सभी ऑफ़र और रेट बनाए हुए हैं, सुझाव नहीं।",
    hinglish:
      "Asha do offer dekhti hai. Ek mein chhoti kisht hai, par ek saamaan girvi rakhna hai. Doosra paise dene se pehle fees kaatta hai. Mia chaar sawaal poochhti hai: haath mein kitne paise milenge, kab kitna lautaana hai, kya badal sakta hai aur plan fail ho toh kya khatre mein hai? Achchha-sa naam inka jawaab nahin deta. Yahaan sabhi offer aur rate banaaye hue hain, sujhaav nahin.",
  },
  idea: {
    en: "A loan creates an obligation to repay under written terms. The borrowed amount (principal), the charge for borrowing (interest), fees and repayment period (tenure) describe different parts of that obligation. Money borrowed is not income: cash and debt can rise together, as in the net-worth lesson. Labels such as home, vehicle, education, business or personal describe a purpose, but do not settle the security, rate, costs or repayment conditions. Read the actual contract and ask for unclear terms to be explained independently.",
    hi: "लोन में लिखी शर्तों के हिसाब से पैसे लौटाने की ज़िम्मेदारी बनती है। उधार की मुख्य रकम (प्रिंसिपल), उधार का चार्ज (ब्याज), फीस और लौटाने का समय (टेन्योर) अलग बातें हैं। उधार कमाई नहीं। नेट-वर्थ पाठ की तरह नकद और कर्ज़ साथ बढ़ सकते हैं। होम, गाड़ी, पढ़ाई, बिज़नेस या पर्सनल जैसे नाम मकसद बताते हैं। इनसे गिरवी, रेट, खर्च या लौटाने की शर्तें पक्की नहीं होतीं। असली कॉन्ट्रैक्ट पढ़ें और साफ़ न हो तो अलग भरोसे वाले तरीके से समझें।",
    hinglish:
      "Loan mein likhi sharton ke hisaab se paise lautaane ki zimmedaari banti hai. Udhaar ki mukhya rakam (principal), udhaar ka charge (byaaj), fees aur lautaane ka samay (tenure) alag baatein hain. Udhaar kamaai nahin. Net-worth paath ki tarah nakad aur karz saath badh sakte hain. Home, gaadi, padhaai, business ya personal jaise naam maksad bataate hain. Inse girvi, rate, kharch ya lautaane ki shartein pakki nahin hotin. Asli contract padhein aur saaf na ho toh alag bharose waale tareeke se samjhein.",
  },
  readings: [
    {
      title: {
        en: "Security describes an asset at risk",
        hi: "सिक्योरिटी बताती है कि कौन-सा सामान जोखिम में है",
        hinglish: "Security bataati hai ki kaun-sa saamaan jokhim mein hai",
      },
      body: {
        en: "In asset-backed borrowing (a secured loan), an asset is pledged as security (collateral). Missing repayments can put that asset at risk under the contract and applicable rules. “Secured” does not mean safe for the borrower. In an unsecured loan, no particular asset is pledged as collateral in that arrangement; the repayment obligation still exists. Do not assume it has no consequences. An agreement to repay if another borrower does not (a guarantee) can also create obligations; signing is not just giving a reference. This draft does not state recovery powers, legal procedures or a universal document requirement.",
        hi: "जिस लोन के बदले सामान गिरवी है (सिक्योर्ड लोन), उसमें वह सामान सुरक्षा (कोलैटरल) है। किस्त न चुकाने पर कॉन्ट्रैक्ट और लागू नियमों के हिसाब से सामान खतरे में पड़ सकता है। सिक्योर्ड का मतलब उधार लेने वाले के लिए सुरक्षित नहीं। अनसिक्योर्ड लोन में उस व्यवस्था के लिए खास सामान गिरवी नहीं रखा है। लौटाने की ज़िम्मेदारी फिर भी है; नतीजा नहीं होगा, यह न मानें। दूसरे के न लौटाने पर पैसे देने का वादा (गारंटी) भी ज़िम्मेदारी बना सकता है। साइन करना सिर्फ़ रेफ़रेंस देना नहीं। यह ड्राफ़्ट वसूली के अधिकार, कानूनी प्रक्रिया या सबके लिए दस्तावेज़ की लिस्ट नहीं देता।",
        hinglish:
          "Jis loan ke badle saamaan girvi hai (secured loan), usmein woh saamaan suraksha (collateral) hai. Kisht na chukaane par contract aur laagoo niyamon ke hisaab se saamaan khatre mein pad sakta hai. Secured ka matlab udhaar lene waale ke liye surakshit nahin. Unsecured loan mein us vyavastha ke liye khaas saamaan girvi nahin rakha hai. Lautaane ki zimmedaari phir bhi hai; nateeja nahin hoga, yeh na maanein. Doosre ke na lautaane par paise dene ka vaada (guarantee) bhi zimmedaari bana sakta hai. Sign karna sirf reference dena nahin. Yeh draft vasooli ke adhikaar, kaanooni prakriya ya sabke liye dastaavez ki list nahin deta.",
      },
    },
    {
      title: {
        en: "Start with cash actually received",
        hi: "हाथ में मिले पैसों से हिसाब शुरू करें",
        hinglish: "Haath mein mile paison se hisaab shuru karein",
      },
      body: {
        en: "Suppose a fictional ₹60,000 loan has zero interest and a ₹1,000 fee taken out before payment to the borrower. Cash received is ₹59,000. Twelve repayments of ₹5,000 total ₹60,000, so borrowing costs ₹1,000 relative to the cash received. Do not subtract the fee from cash received and then add it again to repayments in this same comparison. If a different contract finances the fee or charges it separately, record that different cash flow explicitly. Add all required costs and dates; a rupee cost alone is not an annual percentage rate (APR). This example excludes taxes, insurance, late charges and early-exit costs.",
        hi: "मान लें बनाए ₹60,000 लोन पर ब्याज शून्य है। पैसे देने से पहले ₹1,000 फीस कटती है। हाथ में ₹59,000 मिलते हैं। बारह किस्त × ₹5,000 = ₹60,000 लौटते हैं। मिले पैसे की तुलना में उधार का खर्च ₹1,000। इसी तुलना में फीस हाथ के पैसे से घटाकर फिर लौटाने वाली रकम में दोबारा न जोड़ें। दूसरे कॉन्ट्रैक्ट में फीस भी उधार में जुड़ती हो या अलग दी जाती हो, तो उसका कैश-फ़्लो अलग लिखें। ज़रूरी खर्च और तारीख़ें जोड़ें। रुपयों का खर्च अपने आप सालाना प्रतिशत रेट (APR) नहीं है। इस example में टैक्स, बीमा, देर का चार्ज और जल्दी बंद करने का खर्च नहीं है।",
        hinglish:
          "Maan lein banaaye ₹60,000 loan par byaaj shoonya hai. Paise dene se pehle ₹1,000 fees katti hai. Haath mein ₹59,000 milte hain. Baarah kisht × ₹5,000 = ₹60,000 lautte hain. Mile paise ki tulna mein udhaar ka kharch ₹1,000. Isi tulna mein fees haath ke paise se ghataakar phir lautaane waali rakam mein dobaara na jodein. Doosre contract mein fees bhi udhaar mein judti ho ya alag di jaati ho, toh uska cash-flow alag likhein. Zaroori kharch aur taareekhein jodein. Rupayon ka kharch apne aap saalaana pratishat rate (APR) nahin hai. Is example mein tax, beema, der ka charge aur jaldi band karne ka kharch nahin hai.",
      },
    },
    {
      title: {
        en: "A small payment can hide time and rate risk",
        hi: "छोटी किस्त में समय और रेट का जोखिम छिप सकता है",
        hinglish: "Chhoti kisht mein samay aur rate ka jokhim chhip sakta hai",
      },
      body: {
        en: "Repeat the EMI lesson: spreading the same fixed-rate debt over more months can lower each payment while increasing total interest. Compare the same cash received and assumptions. A fixed rate stays fixed only for the period and conditions promised in the contract; a variable rate can change under its terms. In our stress example, six payments occur at 12% yearly, then the rate changes. The chosen model keeps the final month unchanged and recalculates the remaining six payments. A real contract may instead change the term or follow other rules. Check what changes, when, and whether your cash budget can absorb it.",
        hi: "EMI पाठ दोहराएं: उसी तय-रेट कर्ज़ को ज़्यादा महीनों में लौटाएं तो हर किस्त घट सकती है, पर कुल ब्याज बढ़ सकता है। मिले पैसे और अनुमान एक जैसे रखकर तुलना करें। तय रेट सिर्फ़ कॉन्ट्रैक्ट के बताए समय और शर्तों तक तय है। बदलने वाला रेट अपनी शर्तों पर बदल सकता है। हमारे stress example में छह किस्त सालाना 12% पर हैं, फिर रेट बदलता है। मॉडल आखिरी महीना वही रखता है और बाकी छह किस्त फिर निकालता है। असली कॉन्ट्रैक्ट में समय बढ़ सकता है या दूसरा नियम हो सकता है। क्या और कब बदलेगा, और बजट संभालेगा या नहीं, चेक करें।",
        hinglish:
          "EMI paath dohraayein: usi tay-rate karz ko zyaada mahinon mein lautaayein toh har kisht ghat sakti hai, par kul byaaj badh sakta hai. Mile paise aur anumaan ek jaise rakhkar tulna karein. Tay rate sirf contract ke bataaye samay aur sharton tak tay hai. Badalne waala rate apni sharton par badal sakta hai. Hamaare stress example mein chhah kisht saalaana 12% par hain, phir rate badalta hai. Model aakhiri mahina wahi rakhta hai aur baaki chhah kisht phir nikaalta hai. Asli contract mein samay badh sakta hai ya doosra niyam ho sakta hai. Kya aur kab badlega, aur budget sambhaalega ya nahin, check karein.",
      },
    },
  ],
  example: {
    en: "The board uses a separate fictional ₹1,20,000 advance, a ₹3,000 deducted fee and monthly reducing-balance interest. First compare 12, 24 and 36 months at a fixed 12% yearly. Cash received stays ₹1,17,000. Next stress a 12-month loan: after six 12% payments, raise the rate to 24% for the final six months. The rounded monthly payment moves from about ₹10,662 to ₹11,031. The model calculates without intermediate rounding and displays whole rupees. These are assumptions dated 27 October 2026, not market quotes or a forecast.",
    hi: "बोर्ड में अलग बनाया ₹1,20,000 उधार, पहले कटी ₹3,000 फीस और हर महीने घटते बैलेंस पर ब्याज है। पहले तय सालाना 12% पर 12, 24 और 36 महीने मिलाएं। हाथ में ₹1,17,000 ही मिलते हैं। फिर 12 महीने का लोन stress करें: छह किस्त 12% पर होने के बाद आखिरी छह महीने रेट 24% करें। गोल की हुई किस्त करीब ₹10,662 से ₹11,031 होती है। मॉडल बीच में राउंड नहीं करता, दिखाते समय पूरे रुपये दिखाता है। ये 27 अक्टूबर 2026 के बनाए अनुमान हैं, बाज़ार के ऑफ़र या भविष्य का दावा नहीं।",
    hinglish:
      "Board mein alag banaaya ₹1,20,000 udhaar, pehle kati ₹3,000 fees aur har mahine ghatte balance par byaaj hai. Pehle tay saalaana 12% par 12, 24 aur 36 mahine milaayein. Haath mein ₹1,17,000 hi milte hain. Phir 12 mahine ka loan stress karein: chhah kisht 12% par hone ke baad aakhiri chhah mahine rate 24% karein. Gol ki hui kisht kareeb ₹10,662 se ₹11,031 hoti hai. Model beech mein round nahin karta, dikhaate samay poore rupaye dikhaata hai. Yeh 27 October 2026 ke banaaye anumaan hain, bazaar ke offer ya bhavishya ka daava nahin.",
  },
  mistake: {
    en: "Do not choose a loan only because approval is easy, an asset is called security or a monthly payment looks small. Plan essentials, existing debt and a buffer before judging a new commitment. Compare cash received, every required payment and date, rate-reset terms, security and consequences of missed payments. Verify the lender and written terms through an independent trusted route. This lesson does not recommend a product or promise approval, asset protection, legal relief or an exact credit-score change.",
    hi: "सिर्फ़ आसान मंज़ूरी, सिक्योरिटी नाम या छोटी किस्त देखकर लोन न चुनें। नया बकाया लेने से पहले ज़रूरी खर्च, पुराने कर्ज़ और बचाव के पैसों का प्लान करें। हाथ में पैसे, हर ज़रूरी पेमेंट व तारीख़, रेट बदलने की शर्त, गिरवी और किस्त छूटने के नतीजे तुलना करें। अलग भरोसे वाले रास्ते से लेंडर और लिखी शर्तें चेक करें। यह पाठ प्रोडक्ट का सुझाव, मंज़ूरी, सामान बचने, कानूनी राहत या तय क्रेडिट-स्कोर बदलाव का वादा नहीं करता।",
    hinglish:
      "Sirf aasaan manzoori, security naam ya chhoti kisht dekhkar loan na chunein. Naya bakaaya lene se pehle zaroori kharch, puraane karz aur bachaav ke paison ka plan karein. Haath mein paise, har zaroori payment va taareekh, rate badalne ki shart, girvi aur kisht chhootne ke nateeje tulna karein. Alag bharose waale raaste se lender aur likhi shartein check karein. Yeh paath product ka sujhaav, manzoori, saamaan bachne, kaanooni raahat ya tay credit-score badlaav ka vaada nahin karta.",
  },
  notes: [
    {
      en: "A purpose label does not describe the whole loan.",
      hi: "मकसद का नाम पूरा लोन नहीं बताता।",
      hinglish: "Maksad ka naam poora loan nahin bataata.",
    },
    {
      en: "Compare required repayments with cash actually received.",
      hi: "ज़रूरी लौटाने वाले पैसे हाथ में मिले पैसों से मिलाएं।",
      hinglish:
        "Zaroori lautaane waale paise haath mein mile paison se milaayein.",
    },
    {
      en: "Stress the payment plan before accepting rate or asset risk.",
      hi: "रेट या सामान का जोखिम लेने से पहले पेमेंट प्लान stress करें।",
      hinglish:
        "Rate ya saamaan ka jokhim lene se pehle payment plan stress karein.",
    },
  ],
  action: {
    en: "Using only fictional details, explain why a secured loan may still be risky for a borrower. Then write a comparison with cash received, required payments, fees, dates, rate-change terms and the asset at risk. Revisit the budget and net-worth lessons before calling borrowed cash income.",
    hi: "सिर्फ़ बनाए उदाहरण से समझाएं कि सिक्योर्ड लोन भी उधार लेने वाले के लिए जोखिम भरा क्यों हो सकता है। फिर मिले पैसे, ज़रूरी किस्त, फीस, तारीख़, रेट बदलने की शर्त और जोखिम में सामान की तुलना लिखें। उधार को कमाई कहने से पहले बजट और नेट-वर्थ पाठ दोहराएं।",
    hinglish:
      "Sirf banaaye udaaharan se samjhaayein ki secured loan bhi udhaar lene waale ke liye jokhim bhara kyon ho sakta hai. Phir mile paise, zaroori kisht, fees, taareekh, rate badalne ki shart aur jokhim mein saamaan ki tulna likhein. Udhaar ko kamaai kehne se pehle budget aur net-worth paath dohraayein.",
  },
  sourceStatus: "unverified",
  sourceNote: {
    en: "Editorial draft with fictional amounts and rate-reset assumptions dated 27 October 2026. RBI access was blocked by HTTP 403 in the banking batch earlier today; that source was not read. Financial and native-language review remain pending. Current recovery law, borrower rights, rates, fees and lender rules are withheld.",
    hi: "27 अक्टूबर 2026 के बनाए पैसों और रेट बदलने के अनुमान वाला ड्राफ़्ट। आज पहले बैंकिंग वाले काम में RBI पर HTTP 403 मिला; स्रोत पढ़ा नहीं गया। वित्त और भाषा की मानवीय समीक्षा बाकी है। मौजूदा वसूली कानून, उधार लेने वाले के अधिकार, रेट, फीस और लेंडर के नियम नहीं दिए हैं।",
    hinglish:
      "27 October 2026 ke banaaye paison aur rate badalne ke anumaan waala draft. Aaj pehle banking waale kaam mein RBI par HTTP 403 mila; srot padha nahin gaya. Vitt aur bhaasha ki maanveey sameeksha baaki hai. Maujooda vasooli kaanoon, udhaar lene waale ke adhikaar, rate, fees aur lender ke niyam nahin diye hain.",
  },
  sources: ["https://www.rbi.org.in/FinancialEducation/"],
  reviewStatus: "editorial-draft",
  exercises: [
    {
      id: "loan-terms-1",
      type: "choice",
      prompt: {
        en: "What does a secured loan tell you?",
        hi: "सिक्योर्ड लोन से क्या पता चलता है?",
        hinglish: "Secured loan se kya pata chalta hai?",
      },
      options: [
        {
          en: "The borrower cannot lose money",
          hi: "उधार लेने वाले को नुकसान नहीं हो सकता",
          hinglish: "Udhaar lene waale ko nuksaan nahin ho sakta",
        },
        {
          en: "An asset is pledged; the borrower must still assess cost and risk",
          hi: "सामान गिरवी है; खर्च और जोखिम फिर भी जांचें",
          hinglish: "Saamaan girvi hai; kharch aur jokhim phir bhi jaanchein",
        },
        {
          en: "No payments are required",
          hi: "पेमेंट की ज़रूरत नहीं",
          hinglish: "Payment ki zaroorat nahin",
        },
      ],
      answer: 1,
      explanation: {
        en: "Security describes an asset backing the arrangement, not a promise of safety for the borrower.",
        hi: "सिक्योरिटी में सामान व्यवस्था के पीछे है; यह उधार लेने वाले की सुरक्षा का वादा नहीं।",
        hinglish:
          "Security mein saamaan vyavastha ke peechhe hai; yeh udhaar lene waale ki suraksha ka vaada nahin.",
      },
    },
    {
      id: "loan-terms-2",
      type: "document",
      prompt: {
        en: "Which line explains why the borrower receives less than the stated principal?",
        hi: "किस लाइन से पता चलता है कि मुख्य रकम से कम पैसे क्यों मिलेंगे?",
        hinglish:
          "Kis line se pata chalta hai ki mukhya rakam se kam paise kyon milenge?",
      },
      options: [
        {
          en: "Fictional principal: ₹60,000",
          hi: "बनाई मुख्य रकम: ₹60,000",
          hinglish: "Banaayi mukhya rakam: ₹60,000",
        },
        {
          en: "Fee: ₹1,000 withheld before cash is paid",
          hi: "फीस: पैसे देने से पहले ₹1,000 काटे जाएंगे",
          hinglish: "Fees: paise dene se pehle ₹1,000 kaate jaayenge",
        },
        {
          en: "Zero interest in this example",
          hi: "इस example में ब्याज शून्य",
          hinglish: "Is example mein byaaj shoonya",
        },
      ],
      answer: 1,
      explanation: {
        en: "A fee withheld at the start reduces cash received even when stated interest is zero.",
        hi: "शुरू में कटी फीस से हाथ में कम पैसे मिलते हैं, ब्याज शून्य हो तब भी।",
        hinglish:
          "Shuru mein kati fees se haath mein kam paise milte hain, byaaj shoonya ho tab bhi.",
      },
      documentTitle: {
        en: "Fictional loan offer",
        hi: "बनाया लोन ऑफ़र",
        hinglish: "Banaaya loan offer",
      },
    },
    {
      id: "loan-terms-3",
      type: "numeric",
      prompt: {
        en: "₹60,000 principal less a ₹1,000 withheld fee: how much cash is received?",
        hi: "₹60,000 मुख्य रकम से ₹1,000 फीस कटी। हाथ में कितने पैसे मिले?",
        hinglish:
          "₹60,000 mukhya rakam se ₹1,000 fees kati. Haath mein kitne paise mile?",
      },
      answer: 59000,
      explanation: {
        en: "₹60,000 − ₹1,000 = ₹59,000. This is cash received, not new income.",
        hi: "₹60,000 − ₹1,000 = ₹59,000। यह हाथ में मिले पैसे हैं, नई कमाई नहीं।",
        hinglish:
          "₹60,000 − ₹1,000 = ₹59,000. Yeh haath mein mile paise hain, nayi kamaai nahin.",
      },
      calculation: {
        operation: "subtract",
        values: [60000, 1000],
      },
    },
    {
      id: "loan-terms-4",
      type: "numeric",
      prompt: {
        en: "The same fictional offer requires 12 payments of ₹5,000. What is total repayment?",
        hi: "उसी बनाए ऑफ़र में 12 किस्त × ₹5,000 हैं। कुल कितना लौटाना है?",
        hinglish:
          "Usi banaaye offer mein 12 kisht × ₹5,000 hain. Kul kitna lautaana hai?",
      },
      answer: 60000,
      explanation: {
        en: "12 × ₹5,000 = ₹60,000. Keep the dates and other required costs in view too.",
        hi: "12 × ₹5,000 = ₹60,000। तारीख़ें और दूसरे ज़रूरी खर्च भी देखें।",
        hinglish:
          "12 × ₹5,000 = ₹60,000. Taareekhein aur doosre zaroori kharch bhi dekhein.",
      },
      calculation: {
        operation: "multiply",
        values: [12, 5000],
      },
    },
    {
      id: "loan-terms-5",
      type: "bucket",
      prompt: {
        en: "Classify the explicitly stated security in these fictional contracts.",
        hi: "इन बनाए कॉन्ट्रैक्ट में साफ़ लिखी सिक्योरिटी का प्रकार चुनें।",
        hinglish:
          "In banaaye contract mein saaf likhi security ka prakaar chunein.",
      },
      options: [
        {
          en: "Offer A: a named asset is pledged as collateral",
          hi: "ऑफ़र A: खास सामान कोलैटरल के तौर पर गिरवी है",
          hinglish: "Offer A: khaas saamaan collateral ke taur par girvi hai",
        },
        {
          en: "Offer B: no particular asset is pledged in this arrangement",
          hi: "ऑफ़र B: इस व्यवस्था में खास सामान गिरवी नहीं है",
          hinglish: "Offer B: is vyavastha mein khaas saamaan girvi nahin hai",
        },
      ],
      categories: [
        {
          en: "Secured",
          hi: "सिक्योर्ड",
          hinglish: "Secured",
        },
        {
          en: "Unsecured",
          hi: "अनसिक्योर्ड",
          hinglish: "Unsecured",
        },
      ],
      answer: [0, 1],
      explanation: {
        en: "Both still require repayment. These labels do not decide affordability, legal outcomes or the best product.",
        hi: "दोनों में लौटाना है। इन नामों से बजट में जगह, कानूनी नतीजा या सबसे अच्छा प्रोडक्ट तय नहीं होता।",
        hinglish:
          "Dono mein lautaana hai. In naamon se budget mein jagah, kaanooni nateeja ya sabse achchha product tay nahin hota.",
      },
    },
    {
      id: "loan-terms-6",
      type: "choice",
      prompt: {
        en: "For the same fixed-rate advance, a longer term lowers each payment but raises total interest in the model. What follows?",
        hi: "उसी तय-रेट उधार में लंबे समय से किस्त घटी पर मॉडल में कुल ब्याज बढ़ा। क्या समझें?",
        hinglish:
          "Usi tay-rate udhaar mein lambe samay se kisht ghati par model mein kul byaaj badha. Kya samjhein?",
      },
      options: [
        {
          en: "The smallest payment always means the cheapest loan",
          hi: "सबसे छोटी किस्त हमेशा सबसे सस्ता लोन है",
          hinglish: "Sabse chhoti kisht hamesha sabse sasta loan hai",
        },
        {
          en: "Compare monthly affordability and full cost separately",
          hi: "महीने के बजट और पूरे खर्च को अलग तुलना करें",
          hinglish: "Mahine ke budget aur poore kharch ko alag tulna karein",
        },
        {
          en: "The extra months are free",
          hi: "बढ़े महीने फ्री हैं",
          hinglish: "Badhe mahine free hain",
        },
      ],
      answer: 1,
      explanation: {
        en: "Time changes the cost even when the starting cash and rate are held constant.",
        hi: "शुरू के पैसे और रेट एक जैसे हों तब भी समय से खर्च बदलता है।",
        hinglish:
          "Shuru ke paise aur rate ek jaise hon tab bhi samay se kharch badalta hai.",
      },
    },
    {
      id: "loan-terms-7",
      type: "numeric",
      prompt: {
        en: "Cash received is ₹59,000 and required repayments total ₹60,000. With no other costs in this example, what is the borrowing cost?",
        hi: "हाथ में ₹59,000 मिले और ₹60,000 लौटाने हैं। इस example में दूसरा खर्च नहीं। उधार का खर्च कितना है?",
        hinglish:
          "Haath mein ₹59,000 mile aur ₹60,000 lautaane hain. Is example mein doosra kharch nahin. Udhaar ka kharch kitna hai?",
      },
      answer: 1000,
      explanation: {
        en: "₹60,000 − ₹59,000 = ₹1,000. The deducted fee is already reflected; do not add it a second time. This is not an APR calculation.",
        hi: "₹60,000 − ₹59,000 = ₹1,000। कटी फीस इसमें आ चुकी है, फिर न जोड़ें। यह APR का हिसाब नहीं।",
        hinglish:
          "₹60,000 − ₹59,000 = ₹1,000. Kati fees ismein aa chuki hai, phir na jodein. Yeh APR ka hisaab nahin.",
      },
      calculation: {
        operation: "subtract",
        values: [60000, 59000],
      },
    },
    {
      id: "loan-terms-8",
      type: "choice",
      prompt: {
        en: "The stress model raises the rate after six payments. Which assumption must you read before using its new payment?",
        hi: "Stress मॉडल छह किस्त बाद रेट बढ़ाता है। नई किस्त इस्तेमाल करने से पहले कौन-सा अनुमान पढ़ें?",
        hinglish:
          "Stress model chhah kisht baad rate badhaata hai. Nayi kisht istemaal karne se pehle kaun-sa anumaan padhein?",
      },
      options: [
        {
          en: "Every real lender must use this exact reset",
          hi: "हर असली लेंडर यही बदलाव करेगा",
          hinglish: "Har asli lender yahi badlaav karega",
        },
        {
          en: "Approval guarantees the higher payment fits your budget",
          hi: "मंज़ूरी से बढ़ी किस्त बजट में फिट होना पक्का है",
          hinglish: "Manzoori se badhi kisht budget mein fit hona pakka hai",
        },
        {
          en: "This example keeps the final month fixed and recalculates remaining payments; real terms may differ",
          hi: "इस example में आखिरी महीना तय रखकर बाकी किस्त निकलती हैं; असली शर्तें अलग हो सकती हैं",
          hinglish:
            "Is example mein aakhiri mahina tay rakhkar baaki kisht nikalti hain; asli shartein alag ho sakti hain",
        },
      ],
      answer: 2,
      explanation: {
        en: "Read the reset rule, rate and timing. A scenario is not a prediction or a statement of current lender rules.",
        hi: "रेट बदलने का नियम, रेट और समय पढ़ें। Scenario भविष्य का दावा या मौजूदा लेंडर के नियम नहीं है।",
        hinglish:
          "Rate badalne ka niyam, rate aur samay padhein. Scenario bhavishya ka daava ya maujooda lender ke niyam nahin hai.",
      },
    },
  ],
};
