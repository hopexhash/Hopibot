/**
 * The price catalogue is written in the formal "u" form because it is also shown on the
 * demo pages sent to prospects. The public website addresses visitors with "je".
 */
export const informal = (s: string) => s.replace(/\bUw\b/g, "Je").replace(/\buw\b/g, "je").replace(/\bU\b/g, "Je").replace(/\bu\b/g, "je");

export const dateNl = (iso: string) => new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Amsterdam" }).format(new Date(`${iso}T12:00:00Z`));
/** A date in British English ("26 November 2026"), for the English pages. */
export const dateEn = (iso: string) => new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Amsterdam" }).format(new Date(`${iso}T12:00:00Z`));
