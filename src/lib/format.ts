const pad = (n: number) => String(n).padStart(2, '0');

/** DD/MM/YYYY, always in UTC so builds are deterministic. */
export function formatDate(d: Date): string {
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
}

/** "2025-04" -> "04/2025", "2018" -> "2018". */
export function formatYearMonth(s: string): string {
  const [y, m] = s.split('-');
  return m ? `${m}/${y}` : y;
}

export function formatRange(start: string, end: string | null, presentLabel: string): string {
  const a = formatYearMonth(start);
  if (end === null) return `${a} → ${presentLabel}`;
  const b = formatYearMonth(end);
  return a === b ? a : `${a} → ${b}`;
}

/** Sheet numbers in the drawing register, e.g. ("B", 1) -> "B-01". */
export function sheetNo(series: string, n: number): string {
  return `${series}-${pad(n)}`;
}
