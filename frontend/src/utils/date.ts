const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Today's date as YYYY-MM-DD in the local timezone (no UTC shift). */
export function todayISO(): string {
  const now = new Date()
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

/** Parses a YYYY-MM-DD string as a local calendar date (never a UTC timestamp). */
export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day)
}

/** Formats YYYY-MM-DD as "16 August 2026". */
export function formatHumanDate(iso: string): string {
  const date = parseISODate(iso)
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`
}

/** Formats YYYY-MM-DD as "16 AUGUST" (used for list group headers, without year). */
export function formatDateGroupLabel(iso: string): string {
  const date = parseISODate(iso)
  if (iso === todayISO()) return `TODAY — ${date.getDate()} ${MONTH_NAMES[date.getMonth()].toUpperCase()}`
  if (iso === offsetDateISO(todayISO(), -1)) return `YESTERDAY — ${date.getDate()} ${MONTH_NAMES[date.getMonth()].toUpperCase()}`
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()].toUpperCase()}`
}

/** Relative label for a single expense card, e.g. "Today", "Yesterday", or "16 Aug". */
export function formatRelativeDate(iso: string): string {
  if (iso === todayISO()) return 'Today'
  if (iso === offsetDateISO(todayISO(), -1)) return 'Yesterday'
  const date = parseISODate(iso)
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()].slice(0, 3)}`
}

/** Returns a YYYY-MM-DD date offset by `days` (may be negative) from the given ISO date. */
export function offsetDateISO(iso: string, days: number): string {
  const date = parseISODate(iso)
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** "August 2026" for a given year/month (1-indexed month). */
export function formatMonthYear(year: number, month: number): string {
  return `${MONTH_NAMES[month - 1]} ${year}`
}

/** Returns the previous {year, month}, wrapping December -> January correctly. */
export function previousMonth(year: number, month: number): { year: number; month: number } {
  return month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 }
}

/** Returns the next {year, month}, wrapping December -> January correctly. */
export function nextMonth(year: number, month: number): { year: number; month: number } {
  return month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 }
}

/** True if the given {year, month} is the current calendar month. */
export function isCurrentMonth(year: number, month: number): boolean {
  const now = new Date()
  return now.getFullYear() === year && now.getMonth() + 1 === month
}
