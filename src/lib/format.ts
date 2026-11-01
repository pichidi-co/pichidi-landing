const fa = new Intl.NumberFormat("fa-IR");

export const formatToman = (n: number) => fa.format(n);

/** Converts Persian/Arabic digits to latin so "۰۹۱۲..." passes the 09xxxxxxxxx validation */
export function normalizeDigits(input: string): string {
  return (input ?? "")
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .trim();
}

/** SQLite datetime('now') is UTC "YYYY-MM-DD HH:MM:SS" */
export function formatTehranDate(sqliteDate?: string | null) {
  if (!sqliteDate) return "—";
  const d = new Date(sqliteDate.replace(" ", "T") + "Z");
  return new Intl.DateTimeFormat("fa-IR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Tehran",
  }).format(d);
}
