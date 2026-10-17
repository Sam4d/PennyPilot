import { useMemo, useState } from "react";
import type { Language } from "../content/schema";
import { purchaseComparison, repaymentSchedule } from "../lib/loans";
import { rupees } from "../lib/learning";
import { Icon } from "./UI";
export default function BorrowingVisual({
  lessonId,
  language,
}: {
  lessonId: string;
  language: Language;
}) {
  const [months, setMonths] = useState(12);
  const [cursor, setCursor] = useState(1);
  const [fee, setFee] = useState(1000);
  const [discount, setDiscount] = useState(true);
  const s = (en: string, hi: string, hinglish: string) =>
    language === "hi" ? hi : language === "hinglish" ? hinglish : en;
  const loan = useMemo(() => repaymentSchedule(120000, 12, months), [months]);
  const row = loan.rows[cursor - 1];
  const offer = purchaseComparison(discount ? 34000 : 36000, 6000, 6, fee);
  const milestones = [
    ...new Set([
      1,
      Math.ceil(months / 4),
      Math.ceil(months / 2),
      Math.ceil((3 * months) / 4),
      months,
    ]),
  ];
  return (
    <div className="borrowing-model">
      {lessonId === "emi" ? (
        <>
          <div className="model-context">
            <Icon name="Calculator" size={21} />
            <span>
              {s(
                "Fictional ₹1,20,000 loan · fixed 12% yearly · monthly reducing balance",
                "बनाया हुआ ₹1,20,000 लोन · तय सालाना 12% · हर महीने घटता बैलेंस",
                "Banaya hua ₹1,20,000 loan · tay saalaana 12% · har mahine ghatta balance",
              )}
            </span>
          </div>
          <dl className="loan-summary" aria-live="polite">
            <div>
              <dt>
                {s(
                  "Monthly payment (EMI)",
                  "महीने की किस्त (EMI)",
                  "Mahine ki kisht (EMI)",
                )}
              </dt>
              <dd>{rupees(loan.monthlyPayment)}</dd>
            </div>
            <div>
              <dt>{s("Total interest", "कुल ब्याज", "Kul byaaj")}</dt>
              <dd>{rupees(loan.totalInterest)}</dd>
            </div>
          </dl>
          <label className="visual-slider">
            <span>
              {s(
                "Repayment period in months",
                "चुकाने का समय (महीने)",
                "Chukaane ka samay (mahine)",
              )}
            </span>
            <input
              type="range"
              aria-label={s(
                "Repayment period in months",
                "चुकाने का समय (महीने)",
                "Chukaane ka samay (mahine)",
              )}
              value={months}
              min={6}
              max={60}
              step={6}
              onChange={(e) => {
                setMonths(Number(e.target.value));
                setCursor(1);
              }}
            />
          </label>
          <div className="model-setting-value">
            {months} {s("months", "महीने", "mahine")}
          </div>
          <div
            className="repayment-milestones"
            role="group"
            aria-label={s(
              "Payment month shortcuts",
              "पेमेंट के महीने चुनें",
              "Payment ke mahine chunein",
            )}
          >
            {milestones.map((month) => (
              <button
                key={month}
                aria-pressed={cursor === month}
                onClick={() => setCursor(month)}
              >
                {s("Month", "महीना", "Mahina")} {month}
              </button>
            ))}
          </div>
          <label className="visual-slider">
            <span>
              {s(
                "Inspect payment month",
                "किस महीने की पेमेंट देखें?",
                "Kis mahine ki payment dekhein?",
              )}
            </span>
            <input
              type="range"
              aria-label={s(
                "Inspect payment month",
                "किस महीने की पेमेंट देखें?",
                "Kis mahine ki payment dekhein?",
              )}
              value={cursor}
              min={1}
              max={months}
              step={1}
              onChange={(e) => setCursor(Number(e.target.value))}
            />
          </label>
          <div className="loan-month" role="status">
            <h3>
              {s("Inside month", "इस महीने की पेमेंट", "Is mahine ki payment")}{" "}
              {cursor}
            </h3>
            <div className="loan-payment-bar" aria-hidden="true">
              <span
                style={{ width: `${(row.principal / row.payment) * 100}%` }}
              />
              <span style={{ flex: 1 }} />
            </div>
            <dl className="claim-breakdown">
              <div>
                <dt>
                  {s("Interest part", "ब्याज वाला हिस्सा", "Byaaj waala hissa")}
                </dt>
                <dd>{rupees(row.interest)}</dd>
              </div>
              <div>
                <dt>
                  {s(
                    "Loan amount repaid",
                    "उधार की रकम वापस",
                    "Udhaar ki rakam waapas",
                  )}
                </dt>
                <dd>{rupees(row.principal)}</dd>
              </div>
              <div>
                <dt>
                  {s(
                    "Balance after payment",
                    "पेमेंट के बाद बचा लोन",
                    "Payment ke baad bacha loan",
                  )}
                </dt>
                <dd>{rupees(row.closing)}</dd>
              </div>
            </dl>
          </div>
          <details className="repayment-detail">
            <summary>
              {s(
                "Open the full payment schedule",
                "पूरा पेमेंट शेड्यूल खोलें",
                "Poora payment schedule kholein",
              )}
            </summary>
            <div
              className="repayment-table-scroll"
              role="region"
              tabIndex={0}
              aria-label={s(
                "Scrollable payment schedule",
                "स्क्रॉल करके पेमेंट शेड्यूल देखें",
                "Scroll karke payment schedule dekhein",
              )}
            >
              <table>
                <caption>
                  {s(
                    "Illustration · amounts rounded to rupees",
                    "सिर्फ़ example · रुपये में राउंड किया है",
                    "Sirf example · rupaye mein round kiya hai",
                  )}
                </caption>
                <thead>
                  <tr>
                    {[
                      s("Month", "महीना", "Mahina"),
                      s("Payment", "पेमेंट", "Payment"),
                      s("Interest", "ब्याज", "Byaaj"),
                      s("Loan repaid", "लोन वापस", "Loan waapas"),
                      s("Balance", "बचा लोन", "Bacha loan"),
                    ].map((label) => (
                      <th key={label} scope="col">
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loan.rows.map((r) => (
                    <tr key={r.month}>
                      <th scope="row">{r.month}</th>
                      <td>{rupees(r.payment)}</td>
                      <td>{rupees(r.interest)}</td>
                      <td>{rupees(r.principal)}</td>
                      <td>{rupees(r.closing)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
          <p>
            {s(
              "Uses a fixed rate divided by 12 and equal monthly payments, with an adjusted final payment. No fees, tax, penalties or rate changes. Full precision is used internally; displayed rupees are rounded. Actual lender schedules can differ.",
              "तय सालाना रेट को 12 से बाँटा है। बराबर मासिक पेमेंट और आखिरी पेमेंट में ज़रूरी बदलाव माना है। फ़ीस, टैक्स, जुर्माना या रेट बदलना नहीं जोड़ा। अंदर पूरा हिसाब है; दिखाए रुपये राउंड हैं। असली कंपनी का शेड्यूल अलग हो सकता है।",
              "Tay saalaana rate ko 12 se baanta hai. Baraabar maasik payment aur aakhiri payment mein zaroori badlaav maana hai. Fees, tax, jurmaana ya rate badalna nahin joda. Andar poora hisaab hai; dikhaaye rupaye round hain. Asli company ka schedule alag ho sakta hai.",
            )}
          </p>
        </>
      ) : (
        <>
          <div className="model-context">
            <Icon name="ScanSearch" size={21} />
            <span>
              {s(
                "Same fictional phone · six payments of ₹6,000 · 0% interest assumed",
                "वही बनाया हुआ फ़ोन · ₹6,000 की छह किस्तें · मान लिया 0% ब्याज",
                "Wahi banaya hua phone · ₹6,000 ki chhah kistein · maan liya 0% byaaj",
              )}
            </span>
          </div>
          <label className="offer-checkbox">
            <input
              type="checkbox"
              checked={discount}
              onChange={(e) => setDiscount(e.target.checked)}
            />
            <span>
              {s(
                "Include a ₹2,000 cash discount",
                "कैश पर ₹2,000 की छूट जोड़ें",
                "Cash par ₹2,000 ki chhoot jodein",
              )}
            </span>
          </label>
          <label className="visual-slider">
            <span>
              {s(
                "Upfront fee in rupees",
                "शुरू की फ़ीस (रुपये)",
                "Shuru ki fees (rupaye)",
              )}
            </span>
            <input
              type="range"
              aria-label={s(
                "Upfront fee in rupees",
                "शुरू की फ़ीस (रुपये)",
                "Shuru ki fees (rupaye)",
              )}
              value={fee}
              min={0}
              max={5000}
              step={500}
              onChange={(e) => setFee(Number(e.target.value))}
            />
          </label>
          <div className="model-setting-value">{rupees(fee)}</div>
          <div className="offer-comparison" role="status">
            <div>
              <Icon name="Wallet" size={22} />
              <span>
                {s(
                  "Pay at purchase",
                  "खरीदते समय पूरा पेमेंट",
                  "Khareedte samay poora payment",
                )}
              </span>
              <strong>{rupees(offer.cashPrice)}</strong>
            </div>
            <div>
              <Icon name="CalendarDays" size={22} />
              <span>
                {s(
                  "Total with instalments",
                  "किस्तों के साथ कुल",
                  "Kiston ke saath kul",
                )}
              </span>
              <strong>{rupees(offer.total)}</strong>
            </div>
          </div>
          <dl className="claim-breakdown">
            <div>
              <dt>{s("Six instalments", "छह किस्तें", "Chhah kistein")}</dt>
              <dd>{rupees(offer.repayments)}</dd>
            </div>
            <div>
              <dt>
                {s(
                  "Plus upfront fee",
                  "शुरू की फ़ीस जोड़ें",
                  "Shuru ki fees jodein",
                )}
              </dt>
              <dd>{rupees(offer.fee)}</dd>
            </div>
            <div>
              <dt>
                {s(
                  "Extra compared with cash",
                  "कैश से एक्स्ट्रा",
                  "Cash se extra",
                )}
              </dt>
              <dd>{rupees(offer.extra)}</dd>
            </div>
          </dl>
          <p>
            {s(
              "Illustrative total-cost comparison, not an annual interest rate or a recommendation. Assumes the same item, delivery and benefits; no other charges or value from payment timing. Check actual terms, payment dates and affordability.",
              "सिर्फ़ कुल कीमत मिलाने का example है। यह सालाना ब्याज रेट या खरीदने की सलाह नहीं। सामान, मिलने का समय और फायदे एक जैसे माने हैं। दूसरे चार्ज या पेमेंट के समय की वैल्यू नहीं जोड़ी। असली शर्तें, तारीख़ और अपनी क्षमता देखें।",
              "Sirf kul keemat milaane ka example hai. Yeh saalaana byaaj rate ya khareedne ki salaah nahin. Saamaan, milne ka samay aur faayde ek jaise maane hain. Doosre charge ya payment ke samay ki value nahin jodi. Asli shartein, taareekh aur apni kshamata dekhein.",
            )}
          </p>
        </>
      )}
    </div>
  );
}
