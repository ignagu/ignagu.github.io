const pad = (n: number) => String(n).padStart(2, '0');

/** DD/MM/YYYY, always in UTC so builds are deterministic. */
export function formatDate(d: Date): string {
  return `${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`;
}

