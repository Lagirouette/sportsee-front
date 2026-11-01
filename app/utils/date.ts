const DAY_MS = 86_400_000;

/** "2025-01-04" → Date locale (évite le décalage UTC) */
export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Date → "2025-01-04" (en heure locale) */
export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(date: Date, days: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/** Lundi de la semaine, à minuit */
export function startOfWeek(date: Date): Date {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return addDays(d, -((d.getDay() + 6) % 7));
}

export function daysBetween(from: Date, to: Date): number {
  return Math.round((to.getTime() - from.getTime()) / DAY_MS);
}

export const isSameDay = (a: Date, b: Date) => toISODate(a) === toISODate(b);

const longFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" });
const shortFmt = new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" });
const numericFmt = new Intl.DateTimeFormat("fr-FR");

export const formatLongDate = (d: Date) => longFmt.format(d);       // 14 juin 2023
export const formatShortDate = (d: Date) => shortFmt.format(d);     // 28 mai
export const formatNumericDate = (d: Date) => numericFmt.format(d); // 23/06/2025