import { t, choice, numeric, document, bucket } from "./schema";
import type { Lesson } from "./schema";

export const irregularIncomeLesson: Lesson = {
  id: "irregular-income",
  chapter: "everyday",
  skill: "S0.2.5",
  minutes: 15,
  icon: "CalendarDays",
  title: t(
    "Plan for uneven income",
    "हर महीने अलग कमाई का प्लान",
    "Har mahine alag kamaai ka plan",
  ),
  subtitle: t(
    "Give low months and known bills a place in the plan.",
    "कम कमाई वाले महीने और तय बिल पहले से सोचें।",
    "Kam kamaai waale mahine aur tay bill pehle se sochein.",
  ),
  hook: t(
    "Kabir's fictional cash receipts are ₹40,000, ₹10,000, ₹35,000, ₹15,000, ₹30,000 and ₹20,000 over six months. The average is ₹25,000. Mia notices that his regular essentials cost ₹18,000 a month. Does an average above his costs mean every month's bills will be easy? Look at when the money arrives, not only the total.",
    "कबीर के बनाए हुए छह महीनों में ₹40,000, ₹10,000, ₹35,000, ₹15,000, ₹30,000 और ₹20,000 आते हैं। औसत ₹25,000 है। मिया देखती है कि ज़रूरी खर्च ₹18,000 महीना हैं। औसत खर्च से ज़्यादा है, तो क्या हर महीने बिल आसानी से भरेंगे? सिर्फ़ कुल रकम नहीं, पैसे आने का समय भी देखें।",
    "Kabir ke banaaye hue chhe mahinon mein ₹40,000, ₹10,000, ₹35,000, ₹15,000, ₹30,000 aur ₹20,000 aate hain. Ausat ₹25,000 hai. Mia dekhti hai ki zaroori kharch ₹18,000 mahina hain. Ausat kharch se zyada hai, toh kya har mahine bill aasaani se bharenge? Sirf kul rakam nahin, paise aane ka samay bhi dekhein.",
  ),
  idea: t(
    "Write down money actually available after work costs or salary deductions, then place essential payments on the same timeline. A high-income month can leave cash for a lower-income month. Keep money carried forward visible; it is not new income when the next month starts. Also separate a known future bill from everyday spending. Saving gradually for that known bill is a planned-bill pot (a sinking fund). It serves a different purpose from money for an unexpected emergency.",
    "काम के खर्च या सैलरी की कटौती के बाद उपलब्ध पैसे लिखें। उसी समय की लाइन पर ज़रूरी पेमेंट रखें। ज़्यादा कमाई वाले महीने से कम कमाई वाले महीने के लिए पैसे बच सकते हैं। पिछले महीने के बचे पैसे साफ़ दिखाएं। नया महीना आने पर वे नई कमाई नहीं बनते। पहले से पता आने वाले बिल के पैसे रोज़ के खर्च से अलग रखें। तय बिल के लिए धीरे-धीरे बचाना सिंकिंग फ़ंड है। अचानक आई इमरजेंसी के पैसे का काम अलग है।",
    "Kaam ke kharch ya salary ki katauti ke baad uplabdh paise likhein. Usi samay ki line par zaroori payment rakhein. Zyada kamaai waale mahine se kam kamaai waale mahine ke liye paise bach sakte hain. Pichhle mahine ke bache paise saaf dikhaayein. Naya mahina aane par ve nayi kamaai nahin bante. Pehle se pata aane waale bill ke paise roz ke kharch se alag rakhein. Tay bill ke liye dheere-dheere bachaana sinking fund hai. Achaanak aayi emergency ke paison ka kaam alag hai.",
  ),
  readings: [
    {
      title: t(
        "An average hides the order",
        "औसत से क्रम नहीं दिखता",
        "Ausat se kram nahin dikhta",
      ),
      body: t(
        "The same six payments total ₹1,50,000 in any order. But starting with ₹10,000 is different from starting with ₹40,000 when payments are due now. In the example, ₹18,000 of essentials plus a ₹4,000 planned-bill transfer needs ₹22,000 in month one. Without cash already set aside, the low-first version has a ₹12,000 funding gap. Later income does not arrive early just because the six-month average looks comfortable.",
        "इन छह पेमेंट का कुल किसी भी क्रम में ₹1,50,000 है। लेकिन अभी बिल देने हों तो पहले ₹10,000 आना और ₹40,000 आना अलग है। example में पहले महीने ₹18,000 ज़रूरी खर्च और ₹4,000 तय बिल के लिए अलग रखने हैं। कुल ₹22,000 चाहिए। पहले से रखे पैसे न हों और पहले ₹10,000 आएं, तो ₹12,000 कम हैं। औसत अच्छा दिखने से बाद के पैसे पहले नहीं आ जाते।",
        "In chhe payment ka kul kisi bhi kram mein ₹1,50,000 hai. Lekin abhi bill dene hon toh pehle ₹10,000 aana aur ₹40,000 aana alag hai. Example mein pehle mahine ₹18,000 zaroori kharch aur ₹4,000 tay bill ke liye alag rakhne hain. Kul ₹22,000 chaahiye. Pehle se rakhe paise na hon aur pehle ₹10,000 aayein, toh ₹12,000 kam hain. Ausat achchha dikhne se baad ke paise pehle nahin aa jaate.",
      ),
    },
    {
      title: t(
        "Two pots, two jobs",
        "दो अलग रकम, दो काम",
        "Do alag rakam, do kaam",
      ),
      body: t(
        "Kabir knows a fictional ₹12,000 course fee is due at the end of month three. Starting with an empty fee pot, three ₹4,000 transfers reserve the amount. The money stays his, but it is already assigned a job. If working cash is ₹17,000 and the fee pot holds ₹8,000, he cannot call the whole ₹25,000 spare spending money. Paying the course fee from its pot must not be subtracted from working cash a second time.",
        "कबीर को पता है कि बनाए हुए प्लान के तीसरे महीने के आखिर में कोर्स की ₹12,000 फ़ीस देनी है। फ़ीस के लिए शुरुआत में कुछ नहीं रखा। तीन बार ₹4,000 अलग रखें तो रकम पूरी। पैसे उसके ही हैं, पर उनका काम तय है। रोज़ के खर्च के लिए ₹17,000 और फ़ीस के लिए ₹8,000 हों, तो पूरे ₹25,000 को खुला खर्च न माने। फ़ीस अपनी अलग रखी रकम से दें तो रोज़ के पैसे से दोबारा न घटाएं।",
        "Kabir ko pata hai ki banaaye hue plan ke teesre mahine ke aakhir mein course ki ₹12,000 fees deni hai. Fees ke liye shuruaat mein kuchh nahin rakha. Teen baar ₹4,000 alag rakhein toh rakam poori. Paise uske hi hain, par unka kaam tay hai. Roz ke kharch ke liye ₹17,000 aur fees ke liye ₹8,000 hon, toh poore ₹25,000 ko khula kharch na maanein. Fees apni alag rakhi rakam se dein toh roz ke paise se dobaara na ghataayein.",
      ),
    },
    {
      title: t(
        "A shortfall is a signal to change the plan",
        "कमी दिखे तो प्लान बदलें",
        "Kami dikhe toh plan badlein",
      ),
      body: t(
        "Use a cautious income assumption and revisit the plan as real money arrives. In the board, a negative planned cash balance means the schedule is not funded. It does not mean a bank has offered a loan, or that the saving transfers and bills have actually been paid. Compare a different income order, money carried into the plan, essential costs and the fee-saving step. Change what is possible rather than hiding the gap or counting uncertain money twice.",
        "कमाई का सावधानी वाला अनुमान लें। असली पैसे आते जाएं तो प्लान फिर देखें। बोर्ड में रोज़ के पैसों का हिसाब माइनस हो तो प्लान के लिए पैसे पूरे नहीं हैं। इसका मतलब बैंक ने लोन दे दिया या बचत और बिल सच में भर गए, ऐसा नहीं है। कमाई का क्रम, पहले से बचे पैसे, ज़रूरी खर्च और फ़ीस की बचत बदलकर देखें। जो बदल सके, उसे बदलें। कमी छिपाएं नहीं और अनिश्चित पैसे दो बार न गिनें।",
        "Kamaai ka saavdhaani waala anumaan lein. Asli paise aate jaayein toh plan phir dekhein. Board mein roz ke paison ka hisaab minus ho toh plan ke liye paise poore nahin hain. Iska matlab bank ne loan de diya ya bachat aur bill sach mein bhar gaye, aisa nahin hai. Kamaai ka kram, pehle se bache paise, zaroori kharch aur fees ki bachat badalkar dekhein. Jo badal sake, use badlein. Kami chhipaayein nahin aur anishchit paise do baar na ginein.",
      ),
    },
  ],
  example: t(
    "Fictional plan dated 23 October 2026: start with ₹12,000 of working cash, ₹18,000 monthly essentials and a ₹4,000 fee transfer in each of the first three months. Month one ends with ₹12,000 + ₹40,000 − ₹18,000 − ₹4,000 = ₹30,000 working cash and ₹4,000 reserved. In month three, the ₹12,000 fee is paid from its pot. Try the low-income month first with no opening cash. The total income stays ₹1,50,000, but the early funding gap appears.",
    "23 अक्टूबर 2026 का बनाया हुआ प्लान: रोज़ के लिए पहले से ₹12,000 हैं। ज़रूरी खर्च ₹18,000 महीना और पहले तीन महीनों में फ़ीस के लिए ₹4,000 महीना अलग रखने हैं। पहले महीने के बाद ₹12,000 + ₹40,000 − ₹18,000 − ₹4,000 = ₹30,000 रोज़ के लिए और ₹4,000 फ़ीस के लिए हैं। तीसरे महीने फ़ीस अपनी ₹12,000 की रकम से दी। अब कम कमाई वाला महीना पहले रखें और शुरुआत के पैसे शून्य करें। कुल कमाई ₹1,50,000 ही है, पर शुरू की कमी दिखेगी।",
    "23 October 2026 ka banaaya hua plan: roz ke liye pehle se ₹12,000 hain. Zaroori kharch ₹18,000 mahina aur pehle teen mahinon mein fees ke liye ₹4,000 mahina alag rakhne hain. Pehle mahine ke baad ₹12,000 + ₹40,000 − ₹18,000 − ₹4,000 = ₹30,000 roz ke liye aur ₹4,000 fees ke liye hain. Teesre mahine fees apni ₹12,000 ki rakam se di. Ab kam kamaai waala mahina pehle rakhein aur shuruaat ke paise shoonya karein. Kul kamaai ₹1,50,000 hi hai, par shuru ki kami dikhegi.",
  ),
  mistake: t(
    "Do not build regular spending around the best month or treat a known fee as a surprise emergency. Money moved into the fee pot is no longer spare working cash. An unfunded plan is not a promise of credit. This model places income before payments within each month; it can still hide a bill due before that month's income arrives. A real plan also needs actual payment dates and a review of uncertain income.",
    "सबसे अच्छी कमाई वाले महीने से नियमित खर्च तय न करें। पहले से पता फ़ीस अचानक की इमरजेंसी नहीं है। फ़ीस के लिए अलग पैसे रोज़ के खुले खर्च में नहीं हैं। अधूरे प्लान का मतलब उधार मिलना पक्का नहीं। इस मॉडल में हर महीने पहले पैसे आते हैं, फिर पेमेंट जाते हैं। असली ज़िंदगी में कमाई आने से पहले बिल देना हो सकता है। असली तारीख़ें और कमाई की अनिश्चितता भी चेक करें।",
    "Sabse achchhi kamaai waale mahine se niyamit kharch tay na karein. Pehle se pata fees achaanak ki emergency nahin hai. Fees ke liye alag paise roz ke khule kharch mein nahin hain. Adhoore plan ka matlab udhaar milna pakka nahin. Is model mein har mahine pehle paise aate hain, phir payment jaate hain. Asli zindagi mein kamaai aane se pehle bill dena ho sakta hai. Asli taareekhein aur kamaai ki anishchitta bhi check karein.",
  ),
  notes: [
    t(
      "Check timing as well as total income.",
      "कुल कमाई के साथ पैसे आने का समय भी देखें।",
      "Kul kamaai ke saath paise aane ka samay bhi dekhein.",
    ),
    t(
      "Money carried forward is not new income.",
      "पिछले महीने से बचे पैसे नई कमाई नहीं हैं।",
      "Pichhle mahine se bache paise nayi kamaai nahin hain.",
    ),
    t(
      "A known-bill pot is separate from working cash and emergency money.",
      "तय बिल के पैसे रोज़ के खर्च और इमरजेंसी से अलग रखें।",
      "Tay bill ke paise roz ke kharch aur emergency se alag rakhein.",
    ),
    t(
      "A negative planned balance is an unfunded step, not available credit.",
      "प्लान में माइनस रकम हो तो पैसे कम हैं। यह मिलने वाला क्रेडिट नहीं है।",
      "Plan mein minus rakam ho toh paise kam hain. Yeh milne waala credit nahin hai.",
    ),
  ],
  action: t(
    "List three known future bills and the months when they are due. Using fictional amounts if you prefer, separate their planned saving from emergency money. Test a low-income month first. Keep real income records private and review the exact dates before making a personal plan.",
    "पहले से पता तीन आने वाले बिल और उनके महीने लिखें। चाहें तो बनाए हुए पैसे लें। उनके लिए बचत इमरजेंसी के पैसे से अलग रखें। कम कमाई वाला महीना पहले रखकर चेक करें। असली कमाई के रिकॉर्ड निजी रखें। अपना प्लान बनाने से पहले असली तारीख़ें देखें।",
    "Pehle se pata teen aane waale bill aur unke mahine likhein. Chaahein toh banaaye hue paise lein. Unke liye bachat emergency ke paison se alag rakhein. Kam kamaai waala mahina pehle rakhkar check karein. Asli kamaai ke record niji rakhein. Apna plan banaane se pehle asli taareekhein dekhein.",
  ),
  exercises: [
    choice(
      "irregular-income-1",
      t(
        "One month brings ₹40,000, but the next brings ₹10,000. Which plan respects the timing?",
        "एक महीने ₹40,000 आए, अगले में ₹10,000। कौन-सा प्लान समय का ध्यान रखता है?",
        "Ek mahine ₹40,000 aaye, agle mein ₹10,000. Kaun-sa plan samay ka dhyaan rakhta hai?",
      ),
      [
        t(
          "Spend the whole high month because next month will be the same.",
          "अच्छे महीने के सारे पैसे खर्च करें, अगला भी ऐसा ही होगा।",
          "Achchhe mahine ke saare paise kharch karein, agla bhi aisa hi hoga.",
        ),
        t(
          "Keep some working cash for the lower-income month and known bills.",
          "कम कमाई वाले महीने और तय बिल के लिए कुछ पैसे रखें।",
          "Kam kamaai waale mahine aur tay bill ke liye kuchh paise rakhein.",
        ),
        t(
          "Count a loan as extra earned income.",
          "लोन को अलग कमाई मान लें।",
          "Loan ko alag kamaai maan lein.",
        ),
      ],
      1,
      t(
        "Money arriving early can support a later low month if it is kept aside. A loan must be repaid; it is not extra earned income.",
        "पहले आए पैसे बचाकर रखें तो बाद के कम कमाई वाले महीने में काम आ सकते हैं। लोन लौटाना पड़ता है। वह अलग कमाई नहीं है।",
        "Pehle aaye paise bachaakar rakhein toh baad ke kam kamaai waale mahine mein kaam aa sakte hain. Loan lautaana padta hai. Woh alag kamaai nahin hai.",
      ),
    ),
    numeric(
      "irregular-income-2",
      t(
        "A known ₹12,000 fee is due after three month-end saving steps. Starting from zero, how much is needed per step?",
        "तीन महीनों के आखिर में बचत करने के बाद ₹12,000 की तय फ़ीस देनी है। शुरुआत शून्य से है। हर बार कितने रुपये बचाने हैं?",
        "Teen mahinon ke aakhir mein bachat karne ke baad ₹12,000 ki tay fees deni hai. Shuruaat shoonya se hai. Har baar kitne rupaye bachaane hain?",
      ),
      4000,
      t(
        "₹12,000 ÷ 3 = ₹4,000 per step, assuming no interest or price change and enough cash for each transfer.",
        "₹12,000 ÷ 3 = हर बार ₹4,000। ब्याज और कीमत में बदलाव नहीं माना। हर जमा के लिए पैसे होने चाहिए।",
        "₹12,000 ÷ 3 = har baar ₹4,000. Byaaj aur keemat mein badlaav nahin maana. Har jama ke liye paise hone chaahiye.",
      ),
      { operation: "divide", values: [12000, 3] },
    ),
    numeric(
      "irregular-income-3",
      t(
        "Opening working cash ₹12,000 plus receipts ₹40,000 gives ₹52,000. After ₹18,000 essentials and a ₹4,000 fee transfer, what working cash remains?",
        "पहले के ₹12,000 और आए ₹40,000 मिलाकर ₹52,000 हैं। ₹18,000 ज़रूरी खर्च और फ़ीस के लिए ₹4,000 अलग रखने के बाद रोज़ के लिए कितने रुपये हैं?",
        "Pehle ke ₹12,000 aur aaye ₹40,000 milaakar ₹52,000 hain. ₹18,000 zaroori kharch aur fees ke liye ₹4,000 alag rakhne ke baad roz ke liye kitne rupaye hain?",
      ),
      30000,
      t(
        "₹52,000 − ₹18,000 − ₹4,000 = ₹30,000 working cash. The separate ₹4,000 pot must not also be called spare spending money.",
        "₹52,000 − ₹18,000 − ₹4,000 = रोज़ के लिए ₹30,000। फ़ीस के अलग ₹4,000 को खुला खर्च भी न मानें।",
        "₹52,000 − ₹18,000 − ₹4,000 = roz ke liye ₹30,000. Fees ke alag ₹4,000 ko khula kharch bhi na maanein.",
      ),
      { operation: "subtract", values: [52000, 18000, 4000] },
    ),
    bucket(
      "irregular-income-4",
      t(
        "Match each cost to the job its money needs to do.",
        "हर खर्च के पैसे का सही काम चुनें।",
        "Har kharch ke paison ka sahi kaam chunein.",
      ),
      [
        t(
          "Course fee known to be due in month three",
          "पहले से पता तीसरे महीने की कोर्स फ़ीस",
          "Pehle se pata teesre mahine ki course fees",
        ),
        t(
          "Regular rent due this month",
          "इस महीने का नियमित किराया",
          "Is mahine ka niyamit kiraaya",
        ),
        t(
          "An unexpected urgent repair",
          "अचानक की ज़रूरी मरम्मत",
          "Achaanak ki zaroori marammat",
        ),
      ],
      [
        t(
          "Known-bill saving pot",
          "तय बिल की अलग बचत",
          "Tay bill ki alag bachat",
        ),
        t(
          "Regular monthly spending",
          "महीने का नियमित खर्च",
          "Mahine ka niyamit kharch",
        ),
        t(
          "Unexpected emergency need",
          "अचानक की इमरजेंसी",
          "Achaanak ki emergency",
        ),
      ],
      [0, 1, 2],
      t(
        "A predictable fee needs advance planning; rent is regular spending; an unexpected urgent repair has a different job. Keep assigned pots separate.",
        "पहले से पता फ़ीस की तैयारी पहले करें। किराया नियमित खर्च है। अचानक की ज़रूरी मरम्मत का काम अलग है। तय काम की रकम अलग रखें।",
        "Pehle se pata fees ki taiyaari pehle karein. Kiraaya niyamit kharch hai. Achaanak ki zaroori marammat ka kaam alag hai. Tay kaam ki rakam alag rakhein.",
      ),
    ),
    numeric(
      "irregular-income-5",
      t(
        "The low-income month comes first: ₹10,000 available, no opening cash. The plan needs ₹18,000 essentials plus ₹4,000 for the known fee. How much funding is missing?",
        "कम कमाई वाला महीना पहले आया। ₹10,000 आए, पहले से कुछ नहीं है। ₹18,000 ज़रूरी खर्च और तय फ़ीस के लिए ₹4,000 चाहिए। कितने रुपये कम हैं?",
        "Kam kamaai waala mahina pehle aaya. ₹10,000 aaye, pehle se kuchh nahin hai. ₹18,000 zaroori kharch aur tay fees ke liye ₹4,000 chaahiye. Kitne rupaye kam hain?",
      ),
      12000,
      t(
        "₹22,000 planned uses − ₹10,000 available = ₹12,000 missing. The negative plan balance signals missing funding; it is not an available loan.",
        "ज़रूरत ₹22,000 − उपलब्ध ₹10,000 = ₹12,000 कम। माइनस प्लान का मतलब पैसे कम हैं, मिलने वाला लोन नहीं।",
        "Zaroorat ₹22,000 − uplabdh ₹10,000 = ₹12,000 kam. Minus plan ka matlab paise kam hain, milne waala loan nahin.",
      ),
      { operation: "subtract", values: [22000, 10000] },
    ),
    choice(
      "irregular-income-6",
      t(
        "Two schedules have the same six-month income total and average. Must they have the same early cash gaps?",
        "दो प्लान में छह महीने की कुल कमाई और औसत बराबर हैं। क्या शुरुआत में पैसों की कमी भी बराबर होगी?",
        "Do plan mein chhe mahine ki kul kamaai aur ausat baraabar hain. Kya shuruaat mein paison ki kami bhi baraabar hogi?",
      ),
      [
        t(
          "Yes. The average fixes every month's cash.",
          "हाँ। औसत हर महीने के पैसे तय करता है।",
          "Haan. Ausat har mahine ke paise tay karta hai.",
        ),
        t(
          "No. Receipt timing and payments can create different gaps.",
          "नहीं। पैसे आने और पेमेंट के समय से कमी अलग हो सकती है।",
          "Nahin. Paise aane aur payment ke samay se kami alag ho sakti hai.",
        ),
      ],
      1,
      t(
        "An average removes the order. A bill due before income arrives can still be unfunded, even if later months bring more money.",
        "औसत में क्रम नहीं दिखता। कमाई से पहले बिल देना हो तो पैसे कम हो सकते हैं, भले बाद के महीनों में ज़्यादा आएं।",
        "Ausat mein kram nahin dikhta. Kamaai se pehle bill dena ho toh paise kam ho sakte hain, bhale baad ke mahinon mein zyada aayein.",
      ),
    ),
    document(
      "irregular-income-7",
      t(
        "The fee pot is already assigned to a known bill. Which row shows money not reserved for that bill?",
        "फ़ीस की रकम तय बिल के लिए अलग है। कौन-सी लाइन वह पैसा दिखाती है जो उस बिल के लिए अलग नहीं रखा?",
        "Fees ki rakam tay bill ke liye alag hai. Kaun-si line woh paisa dikhaati hai jo us bill ke liye alag nahin rakha?",
      ),
      t(
        "Fictional month-two snapshot",
        "दूसरे महीने का बनाया हुआ हिसाब",
        "Doosre mahine ka banaaya hua hisaab",
      ),
      [
        t(
          "Working cash · ₹17,000",
          "रोज़ के लिए पैसे · ₹17,000",
          "Roz ke liye paise · ₹17,000",
        ),
        t(
          "Known-fee pot · ₹8,000",
          "तय फ़ीस के लिए · ₹8,000",
          "Tay fees ke liye · ₹8,000",
        ),
        t(
          "Combined money · ₹25,000",
          "दोनों मिलाकर · ₹25,000",
          "Dono milaakar · ₹25,000",
        ),
      ],
      0,
      t(
        "Only ₹17,000 is outside the fee pot. Combining both balances does not remove the fee's claim on its ₹8,000.",
        "फ़ीस से अलग ₹17,000 हैं। दोनों रकम जोड़ने से फ़ीस का ₹8,000 पर तय काम नहीं मिटता।",
        "Fees se alag ₹17,000 hain. Dono rakam jodne se fees ka ₹8,000 par tay kaam nahin mitta.",
      ),
    ),
    numeric(
      "irregular-income-8",
      t(
        "Only ₹3,000 is reserved in each of three months. With no interest, how much of the ₹12,000 known fee is still unreserved?",
        "तीन महीनों में हर बार सिर्फ़ ₹3,000 अलग रखे। ब्याज नहीं है। ₹12,000 की तय फ़ीस में कितने रुपये अभी अलग रखने बाकी हैं?",
        "Teen mahinon mein har baar sirf ₹3,000 alag rakhe. Byaaj nahin hai. ₹12,000 ki tay fees mein kitne rupaye abhi alag rakhne baaki hain?",
      ),
      3000,
      t(
        "Three transfers hold ₹9,000. ₹12,000 − ₹9,000 = ₹3,000 unreserved. Change the plan before the deadline; the model does not silently pay this from another pot.",
        "तीन जमा से ₹9,000 रखे हैं। ₹12,000 − ₹9,000 = ₹3,000 बाकी। तारीख़ से पहले प्लान चेक करें। मॉडल दूसरी रकम से अपने आप यह कमी नहीं भरता।",
        "Teen jama se ₹9,000 rakhe hain. ₹12,000 − ₹9,000 = ₹3,000 baaki. Taareekh se pehle plan check karein. Model doosri rakam se apne aap yeh kami nahin bharta.",
      ),
      { operation: "subtract", values: [12000, 9000] },
    ),
  ],
  sources: ["https://www.rbi.org.in/FinancialEducation/"],
  sourceStatus: "unverified",
  sourceNote: t(
    "Fictional assumptions dated 23 October 2026. No interest, changing prices or new borrowing. Income is placed before payments within each month; real payment dates still matter.",
    "23 अक्टूबर 2026 के बनाए हुए आँकड़े। ब्याज, कीमत में बदलाव या नया उधार नहीं। हर महीने पहले कमाई, फिर पेमेंट रखा है। असली पेमेंट की तारीख़ें फिर भी ज़रूरी हैं।",
    "23 October 2026 ke banaaye hue aankde. Byaaj, keemat mein badlaav ya naya udhaar nahin. Har mahine pehle kamaai, phir payment rakha hai. Asli payment ki taareekhein phir bhi zaroori hain.",
  ),
  reviewStatus: "editorial-draft",
};
