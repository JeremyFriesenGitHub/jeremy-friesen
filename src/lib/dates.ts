const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** "2026-09" -> "Sep 2026". Falls back to the raw value for anything else. */
export function formatMonth(ym: string): string {
  const [y, m] = ym.split("-");
  const month = MONTHS[Number(m) - 1];
  return y && month ? `${month} ${y}` : ym;
}

/** "Sep 2026" -> months since year 0, for sorting; 0 for anything else. */
export function monthOrder(label?: string): number {
  const [name, year] = (label ?? "").split(" ");
  const month = MONTHS.findIndex((m) => m === name);
  const y = Number(year);
  return month >= 0 && y > 0 ? y * 12 + month : 0;
}
