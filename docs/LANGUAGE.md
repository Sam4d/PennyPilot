# Penny Pilot language guide

The primary teaching script is **simple Hindi in Devanagari, with familiar Hinglish elements**. Mia should sound like a helpful friend explaining money, not a textbook or a formal bank notice.

- Use short, natural sentences. Address the learner respectfully as आप.
- Prefer everyday words: कमाई, पैसे, खर्च, बचत, प्लान, चेक, and फिर इन्वेस्ट करें.
- Keep familiar finance words: बजट, EMI, SIP, बैंक बैलेंस, रिफ़ंड, कंपाउंडिंग, and रिटर्न. Explain each idea before relying on its name.
- Use English or Roman words sparingly where they are familiar and useful, such as “Pay करें”, “approve”, or “example”. The Hindi mode should not turn into paragraphs of Roman Hindi.
- Teach compounding as “पहले मिले ब्याज पर भी ब्याज मिलता है”. The formal Hindi term can appear in a glossary later, but is not needed to understand the idea.
- Explain risks just as clearly as benefits. “रिटर्न माइनस भी हो सकता है” is easier to follow than “निवेश का प्रतिफल नकारात्मक हो सकता है”.
- Keep numbers, formula assumptions, answers and financial meaning identical across languages. Simplifying the language must not simplify away a risk or change the maths.
- Use ₹ and Indian digit grouping. Break worked examples into steps.
- Keep native Hindi/Hinglish editorial review as a release requirement. An automated validator cannot certify natural language or financial accuracy.

New learners start with `hi`. Existing device preferences are preserved. `hinglish` is the optional Roman Hindi mode; it remains distinct from the Hindi-first teaching script. `both` pairs English and Devanagari Hindi.

Examples:

| Avoid leading with | Prefer |
| --- | --- |
| चक्रवृद्धि ब्याज | कंपाउंडिंग में पहले मिले ब्याज पर भी ब्याज मिलता है। |
| अनियमित आय | हर महीने कमाई अलग हो… |
| आधिकारिक संपर्क से पुष्टि करें | बैंक का ऑफ़िशियल ऐप या नंबर खुद खोलकर चेक करें। |
| मासिक व्यय | हर महीने का खर्च |
| परिसंपत्ति आवंटन | अपने पैसे अलग-अलग तरह के इन्वेस्टमेंट में बाँटना; इसे asset allocation कहते हैं। |

## English variant

Use standard English with short sentences and common words. Do not mix Hindi or Roman Hindi into English content. When a technical term is needed, give the plain meaning first and put the term in brackets on first use. Keep the exact term available for recognising a real bank document. Later mentions may use a term already explained in the same lesson.

| Avoid unexplained jargon | Prefer |
| --- | --- |
| principal | the amount you start with (principal) |
| EMI | a monthly loan payment (EMI) |
| issuer | your card provider (issuer) |
| sinking fund | save a little each month for an expected cost (a sinking fund) |
| debt avalanche | pay extra towards the highest interest rate first (debt avalanche) |

The `hi` variant already includes Hinglish terms in its Hindi script and remains the default. The optional `hinglish` variant uses Roman letters; it is not a substitute for Hinglish in the Hindi variant. `en` uses English only, and `both` displays the English and Hindi versions together. All variants preserve amounts, calculations and risk explanations.
