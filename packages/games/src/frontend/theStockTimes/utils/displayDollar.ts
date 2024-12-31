/**
 * Given a number, returns a string with the number formatted as a dollar amount.
 */
export function displayDollar(amount: string | number | null | undefined) {
  if (amount == null) {
    return "$0.00";
  }

  const number =
    typeof amount === "string" ? parseFloat(amount ?? "0") : amount;
  return `$${number.toLocaleString(undefined, { maximumFractionDigits: 2, minimumFractionDigits: 2 })}`;
}
