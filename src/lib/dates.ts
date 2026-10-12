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

/** "https://devpost.com/software/x" -> "Devpost", for link labels. */
export function linkHost(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "devpost.com") return "Devpost";
    if (host === "github.com") return "GitHub";
    if (host === "youtube.com" || host === "youtu.be") return "YouTube";
    return host;
  } catch {
    return "site";
  }
}
