const pad = (n: number) => String(n).padStart(2, '0');

/** DD/MM/YYYY, always in UTC so builds are deterministic. */
export function formatDate(d: Date): string {
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
}

/** Sheet numbers in the drawing register, e.g. ("B", 1) -> "B-01". */
export function sheetNo(series: string, n: number): string {
  return `${series}-${pad(n)}`;
}
