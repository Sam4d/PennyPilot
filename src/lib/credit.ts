/** Illustrative single-card ratio, not a score model or lending threshold.
 * null means the limit is unknown, represented by zero in the practice UI.
 */
export function creditUtilisation(
  balance: number,
  limit: number,
): number | null {
  if (![balance, limit].every((n) => Number.isSafeInteger(n) && n >= 0))
    throw new RangeError("Use non-negative safe whole-rupee amounts.");
  if (limit === 0) return null;
  return (balance / limit) * 100;
}
