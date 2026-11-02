// Privacy scan. Run before every push (the pre-push hook does it) and in CI before deploy.
//
//   node scripts/privacy-scan.mjs          scan repo files + git history
//   node scripts/privacy-scan.mjs --dist   also scan the built site in dist/ (HTML + PDF text)
//
// Checks: email addresses, phone numbers, street addresses, image metadata (EXIF/GPS),
// em dashes in copy, forbidden files (PDFs outside dist, /private), and an optional
// personal blocklist (children's names, your city...) kept OUT of the repo in
// private/blocklist.txt or the PRIVACY_BLOCKLIST environment variable / CI secret.
import { execSync } from 'node:child_process';
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';

const scanDist = process.argv.includes('--dist');
const findings = [];
const add = (where, kind, match) => findings.push({ where, kind, match: String(match).trim().slice(0, 120) });

// Emails that are allowed: GitHub noreply addresses and the Claude co-author trailer.
const EMAIL_ALLOW = [/@users\.noreply\.github\.com$/i, /^noreply@anthropic\.com$/i, /^noreply@github\.com$/i];
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g;
const PHONE = [
  /(?<![\w.])(?:\+|00)\d{1,3}[\s.()-]{0,2}\d{1,4}(?:[\s.-]?\d{2,4}){2,4}(?![\w.])/g, // international
  /(?<![\d\w])0[1-9](?:[\s.-]?\d{2}){4}(?![\d\w])/g, // French style 06 12 34 56 78
  /(?<![\d\w])\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}(?![\d\w])/g, // North American
  /(?<![\d\w])\d{10,13}(?![\d\w])/g, // long bare digit runs
];
const STREET_WORDS = 'rue|avenue|av\\.|boulevard|bd|allée|allee|impasse|chemin|quai|place|cours|street|st\\.|road|rd\\.|lane|drive|calle|avda\\.|avenida|paseo|plaza|carrer|via';
const ADDRESS = [
  new RegExp(`\\b\\d{1,4}\\s?(?:bis|ter)?,?\\s+(?:${STREET_WORDS})\\s+[A-ZÀ-Ý][\\wÀ-ÿ'-]+`, 'gi'), // "12 rue de ..." / "12 Baker Street"
  new RegExp(`\\b(?:${STREET_WORDS})\\s+[A-ZÀ-Ý][\\wÀ-ÿ'-]+(?:\\s+[\\wÀ-ÿ'-]+){0,3},?\\s+\\d{1,4}\\b`, 'g'), // "Calle Mayor 12"
  /\b\d{5}\s+[A-Z][a-zà-ÿ]+(?:[\s-][A-Z][a-zà-ÿ]+)*\b(?=[\s,.]|$)/g, // postcode + town: "75011 Paris"
];
const DOB = /\b(?:born|né|née|nacido|nacida|date of birth|birthday|DOB)\b/gi;

// Personal blocklist: never committed.
const blocklist = [
  ...(existsSync('private/blocklist.txt') ? readFileSync('private/blocklist.txt', 'utf8').split('\n') : []),
  ...(process.env.PRIVACY_BLOCKLIST ?? '').split('\n'),
].map((s) => s.trim()).filter((s) => s && !s.startsWith('#'));

const TEXT_EXT = new Set(['.md', '.mdx', '.astro', '.ts', '.js', '.mjs', '.json', '.css', '.html', '.txt', '.svg', '.yml', '.yaml', '.xml', '']);
const IMG_EXT = new Set(['.png', '.jpg', '.jpeg', '.webp', '.heic', '.tif', '.tiff', '.gif']);
const SKIP_FILES = new Set(['package-lock.json', 'privacy-scan.mjs']); // the scanner's own patterns would match themselves
const COPY_DIRS = [/^src\/(content|data|i18n|views|pages|components)\//, /^README\.md$/];

function scanText(where, text, { copy = false } = {}) {
  for (const m of text.match(EMAIL) ?? []) if (!EMAIL_ALLOW.some((r) => r.test(m))) add(where, 'email', m);
  for (const r of PHONE) for (const m of text.match(r) ?? []) add(where, 'phone?', m);
  for (const r of ADDRESS) for (const m of text.match(r) ?? []) add(where, 'address?', m);
  for (const m of text.match(DOB) ?? []) add(where, 'birth date?', m);
  const lower = text.toLowerCase();
  for (const b of blocklist) if (lower.includes(b.toLowerCase())) add(where, 'blocklist', '(private term, see private/blocklist.txt)');
  if (copy && text.includes('—')) add(where, 'em dash', text.slice(Math.max(0, text.indexOf('—') - 30), text.indexOf('—') + 30));
}

function scanImage(where, buf) {
  const s = buf.toString('latin1');
  if (s.includes('Exif\0\0') || /<x:xmpmeta/i.test(s) || /GPS(Latitude|Longitude)/.test(s)) add(where, 'image metadata', 'EXIF/XMP found: strip it before committing');
}

// 1. Files in the repo (tracked + new, excluding .gitignore'd)
const files = execSync('git ls-files -co --exclude-standard', { encoding: 'utf8' }).split('\n').filter(Boolean);
for (const f of files) {
  if (!existsSync(f) || SKIP_FILES.has(f.split('/').pop())) continue;
  const ext = extname(f).toLowerCase();
  if (f.startsWith('private/')) add(f, 'forbidden file', 'files in /private must never be committed');
  if (ext === '.pdf') add(f, 'forbidden file', 'PDFs must not be committed (the CV PDF is generated at build time)');
  if (ext === '.zip') add(f, 'forbidden file', 'commit the skill/ folder, not a zip (zips are built automatically)');
  if (IMG_EXT.has(ext)) scanImage(f, readFileSync(f));
  else if (TEXT_EXT.has(ext)) scanText(f, readFileSync(f, 'utf8'), { copy: COPY_DIRS.some((r) => r.test(f)) });
}

// 2. Git history: author/committer emails and commit messages
try {
  const log = execSync('git log --all --format=%H%x09%ae%x09%ce%x09%an%x09%B%x1e', { encoding: 'utf8' });
  for (const entry of log.split('\x1e').map((e) => e.trim()).filter(Boolean)) {
    const [sha, ae, ce, , ...msg] = entry.split('\t');
    for (const e of [ae, ce]) if (!EMAIL_ALLOW.some((r) => r.test(e))) add(`commit ${sha.slice(0, 7)}`, 'commit email', e);
    scanText(`commit ${sha.slice(0, 7)} message`, msg.join('\t'));
  }
  const cfg = execSync('git config user.email', { encoding: 'utf8' }).trim();
  if (!EMAIL_ALLOW.some((r) => r.test(cfg))) add('git config', 'commit email', `user.email is ${cfg}: set your GitHub noreply address`);
} catch { /* no commits yet */ }

// 3. Built site
if (scanDist && existsSync('dist')) {
  const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
  for (const f of walk('dist')) {
    const ext = extname(f).toLowerCase();
    if (['.html', '.xml', '.txt', '.json'].includes(ext)) scanText(f, readFileSync(f, 'utf8').replace(/<script[\s\S]*?<\/script>/g, (m) => (m.includes('ld+json') ? m : '')).replace(/<style[\s\S]*?<\/style>/g, ''), { copy: ext === '.html' });
    else if (ext === '.pdf') {
      try { scanText(f, execSync(`pdftotext "${f}" -`, { encoding: 'utf8' }), { copy: true }); }
      catch { console.warn(`[privacy] pdftotext not available, PDF text not scanned: ${f}`); }
      const raw = readFileSync(f, 'latin1');
      const author = raw.match(/\/Author\s*\(([^)]*)\)/);
      if (author) add(f, 'pdf metadata', `Author: ${author[1]}`);
    } else if (IMG_EXT.has(ext)) scanImage(f, readFileSync(f));
  }
}

if (findings.length) {
  console.error(`\n[privacy] STOP: ${findings.length} possible personal detail(s) found:\n`);
  for (const x of findings) console.error(`  - ${x.kind.padEnd(15)} ${x.where}\n      ${x.match}`);
  console.error('\nRemove them, or if it is a false positive, adjust scripts/privacy-scan.mjs deliberately.\n');
  process.exit(1);
}
console.log(`[privacy] OK: ${files.length} files${scanDist ? ' + dist/' : ''} + git history scanned, nothing found.${blocklist.length ? ` (${blocklist.length} private blocklist terms checked)` : ''}`);
