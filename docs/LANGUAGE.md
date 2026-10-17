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
