import { t, choice, numeric, document, order } from "./schema";
import type { Lesson } from "./schema";
export const interestLessons: Lesson[] = [
  {
    id: "simple-interest",
    chapter: "everyday",
    skill: "S0.5.1",
    minutes: 7,
    icon: "Coins",
    title: t(
      "Interest, one step at a time",
      "ब्याज का सीधा हिसाब",
      "Byaaj ka seedha hisaab",
    ),
    subtitle: t(
      "Understand the starting amount, annual rate and time.",
      "शुरू की रकम, सालाना रेट और समय समझें।",
      "Shuru ki rakam, saalaana rate aur samay samjhein.",
    ),
    hook: t(
      "Mia writes a made-up example: ₹10,000 earns simple interest at 8% a year for two years. Does the second year earn interest on ₹10,000 or on ₹10,800? The words ‘simple interest’ decide the answer.",
      "मिया एक बनाया हुआ example लिखती है: ₹10,000 पर सालाना 8% सिंपल इंटरेस्ट, दो साल के लिए। दूसरे साल ब्याज ₹10,000 पर मिलेगा या ₹10,800 पर? जवाब ‘सिंपल इंटरेस्ट’ में छिपा है।",
      "Mia ek banaaya hua example likhti hai: ₹10,000 par saalaana 8% simple interest, do saal ke liye. Doosre saal byaaj ₹10,000 par milega ya ₹10,800 par? Jawaab ‘simple interest’ mein chhipa hai.",
    ),
    idea: t(
      "The starting amount (principal) is the money used to calculate simple interest. At a fixed yearly rate, simple interest = principal × annual rate ÷ 100 × years. It does not earn interest on earlier interest. Match the rate and time units: six months is half a year, not six years. Real products can use different day counts or payment terms.",
      "शुरू की रकम (प्रिंसिपल) से सिंपल इंटरेस्ट निकलता है। सालाना रेट तय हो तो: ब्याज = शुरू की रकम × सालाना रेट ÷ 100 × साल। पहले मिले ब्याज पर ब्याज नहीं जुड़ता। रेट और समय की यूनिट मिलाएं: छह महीने आधा साल हैं, छह साल नहीं। असली प्लान में दिनों का हिसाब और पेमेंट का तरीका अलग हो सकता है।",
      "Shuru ki rakam (principal) se simple interest nikalta hai. Saalaana rate tay ho toh: byaaj = shuru ki rakam × saalaana rate ÷ 100 × saal. Pehle mile byaaj par byaaj nahin judta. Rate aur samay ki unit milaayein: chhe mahine aadha saal hain, chhe saal nahin. Asli plan mein dinon ka hisaab aur payment ka tareeka alag ho sakta hai.",
    ),
    example: t(
      "Fictional fixed-rate example, no tax or fees: ₹10,000 × 8 ÷ 100 = ₹800 a year. Over two years, interest is ₹1,600 and principal plus interest is ₹11,600. With annual compounding at the same assumed rate, the total would be ₹11,664 because the second year also earns interest on the first year’s ₹800.",
      "बनाया हुआ तय रेट, बिना टैक्स या फ़ीस: ₹10,000 × 8 ÷ 100 = साल का ₹800 ब्याज। दो साल का ब्याज ₹1,600 और रकम जोड़कर ₹11,600। उसी माने हुए रेट पर सालाना कंपाउंडिंग होती तो ₹11,664 होते, क्योंकि दूसरे साल पहले के ₹800 ब्याज पर भी ब्याज मिलता।",
      "Banaaya hua tay rate, bina tax ya fees: ₹10,000 × 8 ÷ 100 = saal ka ₹800 byaaj. Do saal ka byaaj ₹1,600 aur rakam jodkar ₹11,600. Usi maane hue rate par saalaana compounding hoti toh ₹11,664 hote, kyunki doosre saal pehle ke ₹800 byaaj par bhi byaaj milta.",
    ),
    mistake: t(
      "Do not confuse interest earned with the final total, or a monthly rate with a yearly rate. Do not apply this simple-interest formula to a reducing-balance loan or assume every deposit compounds once a year. Read the actual terms; an illustrative rate is not an offer or a forecast.",
      "मिले ब्याज और आखिर की कुल रकम को एक न समझें। महीने का रेट और सालाना रेट भी अलग हैं। घटते बैलेंस वाले लोन पर यह सिंपल इंटरेस्ट फ़ॉर्मूला न लगाएं। हर जमा में साल में एक बार कंपाउंडिंग हो, ऐसा नहीं है। असली शर्तें पढ़ें; example का रेट कोई ऑफ़र या पक्का अनुमान नहीं है।",
      "Mile byaaj aur aakhir ki kul rakam ko ek na samjhein. Mahine ka rate aur saalaana rate bhi alag hain. Ghatte balance waale loan par yeh simple interest formula na lagaayein. Har jama mein saal mein ek baar compounding ho, aisa nahin hai. Asli shartein padhein; example ka rate koi offer ya pakka anumaan nahin hai.",
    ),
    notes: [
      t(
        "Simple interest uses the starting amount, not earlier interest.",
        "सिंपल इंटरेस्ट शुरू की रकम पर है, पहले मिले ब्याज पर नहीं।",
        "Simple interest shuru ki rakam par hai, pehle mile byaaj par nahin.",
      ),
      t(
        "An annual rate needs time in years; six months = 0.5 years.",
        "सालाना रेट के लिए समय साल में लें; छह महीने = 0.5 साल।",
        "Saalaana rate ke liye samay saal mein lein; chhe mahine = 0.5 saal.",
      ),
      t(
        "Final total = starting amount + interest, before tax or fees.",
        "टैक्स या फ़ीस से पहले: कुल रकम = शुरू की रकम + ब्याज।",
        "Tax ya fees se pehle: kul rakam = shuru ki rakam + byaaj.",
      ),
    ],
    action: t(
      "Use a fictional amount and rate to calculate one year and half a year of simple interest. For a real quote, first check the time unit, calculation method and charges.",
      "बनाई हुई रकम और रेट लेकर एक साल और आधे साल का सिंपल इंटरेस्ट निकालें। असली ऑफ़र में पहले समय की यूनिट, हिसाब का तरीका और चार्ज चेक करें।",
      "Banaayi hui rakam aur rate lekar ek saal aur aadhe saal ka simple interest nikaalein. Asli offer mein pehle samay ki unit, hisaab ka tareeka aur charge check karein.",
    ),
    exercises: [
      choice(
        "simple-interest-1",
        t(
          "What amount earns interest each year in this fixed simple-interest example?",
          "इस तय सिंपल इंटरेस्ट example में हर साल किस रकम पर ब्याज है?",
          "Is tay simple interest example mein har saal kis rakam par byaaj hai?",
        ),
        [
          t(
            "The starting ₹10,000 only",
            "सिर्फ़ शुरू के ₹10,000",
            "Sirf shuru ke ₹10,000",
          ),
          t(
            "The starting amount plus all earlier interest",
            "शुरू की रकम और पहले का सारा ब्याज",
            "Shuru ki rakam aur pehle ka saara byaaj",
          ),
          t("Only the ₹800 interest", "सिर्फ़ ₹800 ब्याज", "Sirf ₹800 byaaj"),
        ],
        0,
        t(
          "Simple interest is calculated on the unchanged principal. Compounding treats earlier added interest differently.",
          "सिंपल इंटरेस्ट में शुरू की रकम वही रहती है। कंपाउंडिंग में पहले जोड़े ब्याज का असर अलग है।",
          "Simple interest mein shuru ki rakam wahi rehti hai. Compounding mein pehle jode byaaj ka asar alag hai.",
        ),
      ),
      numeric(
        "simple-interest-2",
        t(
          "₹10,000 at 8% simple interest for one year. Interest in rupees?",
          "₹10,000 पर सालाना 8% सिंपल इंटरेस्ट। एक साल का ब्याज कितने रुपये?",
          "₹10,000 par saalaana 8% simple interest. Ek saal ka byaaj kitne rupaye?",
        ),
        800,
        t(
          "₹10,000 × 0.08 × 1 = ₹800 interest. The principal is separate.",
          "₹10,000 × 0.08 × 1 = ₹800 ब्याज। शुरू की रकम अलग है।",
          "₹10,000 × 0.08 × 1 = ₹800 byaaj. Shuru ki rakam alag hai.",
        ),
        { operation: "multiply", values: [10000, 0.08, 1] },
      ),
      document(
        "simple-interest-3",
        t(
          "Which line tells you the rate’s time unit?",
          "कौन-सी लाइन रेट के समय की यूनिट बताती है?",
          "Kaun-si line rate ke samay ki unit bataati hai?",
        ),
        t(
          "Fictional learning worksheet",
          "सीखने की बनाई हुई वर्कशीट",
          "Seekhne ki banaayi hui worksheet",
        ),
        [
          t(
            "Starting amount · ₹10,000",
            "शुरू की रकम · ₹10,000",
            "Shuru ki rakam · ₹10,000",
          ),
          t("Rate · 8% per year", "रेट · सालाना 8%", "Rate · saalaana 8%"),
          t(
            "Method · simple interest",
            "तरीका · सिंपल इंटरेस्ट",
            "Tareeka · simple interest",
          ),
          t(
            "Time held · six months",
            "रखने का समय · छह महीने",
            "Rakhne ka samay · chhe mahine",
          ),
        ],
        1,
        t(
          "‘Per year’ means annual. Use half a year for six months in this worksheet.",
          "‘सालाना’ का मतलब हर साल है। इस वर्कशीट में छह महीने के लिए आधा साल लें।",
          "‘Saalaana’ ka matlab har saal hai. Is worksheet mein chhe mahine ke liye aadha saal lein.",
        ),
      ),
      numeric(
        "simple-interest-4",
        t(
          "₹10,000 at 8% yearly simple interest for six months (0.5 years). Interest in rupees?",
          "₹10,000 पर सालाना 8% सिंपल इंटरेस्ट, छह महीने (0.5 साल) के लिए। ब्याज कितने रुपये?",
          "₹10,000 par saalaana 8% simple interest, chhe mahine (0.5 saal) ke liye. Byaaj kitne rupaye?",
        ),
        400,
        t(
          "₹10,000 × 0.08 × 0.5 = ₹400. Using 6 as years would use the wrong time unit.",
          "₹10,000 × 0.08 × 0.5 = ₹400। साल की जगह 6 लेना समय की गलत यूनिट होगी।",
          "₹10,000 × 0.08 × 0.5 = ₹400. Saal ki jagah 6 lena samay ki galat unit hogi.",
        ),
        { operation: "multiply", values: [10000, 0.08, 0.5] },
      ),
      numeric(
        "simple-interest-5",
        t(
          "Two years at ₹800 simple interest a year. Total interest in rupees?",
          "हर साल ₹800 सिंपल इंटरेस्ट। दो साल का कुल ब्याज कितने रुपये?",
          "Har saal ₹800 simple interest. Do saal ka kul byaaj kitne rupaye?",
        ),
        1600,
        t(
          "₹800 × 2 = ₹1,600 interest. Principal plus interest would be ₹11,600.",
          "₹800 × 2 = ₹1,600 ब्याज। शुरू की रकम जोड़कर ₹11,600 होंगे।",
          "₹800 × 2 = ₹1,600 byaaj. Shuru ki rakam jodkar ₹11,600 honge.",
        ),
        { operation: "multiply", values: [800, 2] },
      ),
      choice(
        "simple-interest-6",
        t(
          "After two years, ₹10,000 earns ₹1,600 interest. What is the total before tax and fees?",
          "दो साल में ₹10,000 पर ₹1,600 ब्याज मिला। टैक्स और फ़ीस से पहले कुल कितना?",
          "Do saal mein ₹10,000 par ₹1,600 byaaj mila. Tax aur fees se pehle kul kitna?",
        ),
        [
          t("₹1,600", "₹1,600 ब्याज भर", "₹1,600 byaaj bhar"),
          t("₹11,600", "₹11,600 कुल रकम", "₹11,600 kul rakam"),
          t("₹10,000", "₹10,000 शुरू की रकम भर", "₹10,000 shuru ki rakam bhar"),
        ],
        1,
        t(
          "₹10,000 principal + ₹1,600 interest = ₹11,600 total.",
          "₹10,000 शुरू की रकम + ₹1,600 ब्याज = कुल ₹11,600।",
          "₹10,000 shuru ki rakam + ₹1,600 byaaj = kul ₹11,600.",
        ),
      ),
      order(
        "simple-interest-7",
        t(
          "Put a simple-interest calculation in order.",
          "सिंपल इंटरेस्ट के हिसाब को क्रम में रखें।",
          "Simple interest ke hisaab ko kram mein rakhein.",
        ),
        [
          t(
            "Multiply principal × rate as a fraction × years",
            "शुरू की रकम × प्रतिशत का हिस्सा × साल करें",
            "Shuru ki rakam × pratishat ka hissa × saal karein",
          ),
          t(
            "Read the principal, method and rate’s time unit",
            "शुरू की रकम, तरीका और रेट की समय यूनिट पढ़ें",
            "Shuru ki rakam, tareeka aur rate ki samay unit padhein",
          ),
          t(
            "Convert the duration to years for an annual rate",
            "सालाना रेट के लिए समय को साल में बदलें",
            "Saalaana rate ke liye samay ko saal mein badlein",
          ),
          t(
            "Add principal if the question asks for the final total",
            "कुल रकम पूछी हो तो शुरू की रकम जोड़ें",
            "Kul rakam poochhi ho toh shuru ki rakam jodein",
          ),
        ],
        [1, 2, 0, 3],
        t(
          "Read the terms, match the time units, calculate interest, then distinguish interest from the final total.",
          "शर्तें पढ़ें, समय की यूनिट मिलाएं, ब्याज निकालें और ब्याज को कुल रकम से अलग समझें।",
          "Shartein padhein, samay ki unit milaayein, byaaj nikaalein aur byaaj ko kul rakam se alag samjhein.",
        ),
      ),
      choice(
        "simple-interest-8",
        t(
          "A loan uses a shrinking balance and monthly payments. Can this unchanged-principal worksheet calculate its full repayment schedule?",
          "लोन का बैलेंस घटता है और पेमेंट हर महीने है। क्या शुरू की रकम वही रखने वाली यह वर्कशीट उसका पूरा शेड्यूल निकालेगी?",
          "Loan ka balance ghatta hai aur payment har mahine hai. Kya shuru ki rakam wahi rakhne waali yeh worksheet uska poora schedule nikaalegi?",
        ),
        [
          t(
            "Yes, all interest methods are identical",
            "हाँ, ब्याज के सभी तरीके एक जैसे हैं",
            "Haan, byaaj ke sabhi tareeke ek jaise hain",
          ),
          t(
            "No, use the loan’s actual method and payment schedule",
            "नहीं, लोन का असली तरीका और पेमेंट शेड्यूल लें",
            "Nahin, loan ka asli tareeka aur payment schedule lein",
          ),
        ],
        1,
        t(
          "A changing balance needs a model that accounts for repayments and timing. Do not substitute this fixed-principal example.",
          "बदलते बैलेंस में पेमेंट और समय का हिसाब चाहिए। उसकी जगह शुरू की रकम तय रखने वाला यह example न लगाएं।",
          "Badalte balance mein payment aur samay ka hisaab chaahiye. Uski jagah shuru ki rakam tay rakhne waala yeh example na lagaayein.",
        ),
      ),
    ],
    sources: ["https://www.rbi.org.in/FinancialEducation/"],
    reviewStatus: "editorial-draft",
  },
];
