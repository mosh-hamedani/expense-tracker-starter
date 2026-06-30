// Shared formatters for the ledger. Figures are set in tabular mono so they
// align down a column, so we always show two decimal places like a real ledger.
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatUSD(amount) {
  return usd.format(Number(amount) || 0);
}

// "2025-01-07" -> "Jan 7". Parsed as local time to avoid an off-by-one day.
export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
