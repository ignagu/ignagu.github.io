// One-off: renders public/og/default.png (1200x630) for social previews.
// Contains only the site title and URL, nothing personal. Re-run after changing the text:
//   node scripts/make-og.mjs
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const font = (p) => readFileSync(`node_modules/@fontsource/${p}`).toString('base64');
const html = `<!doctype html><html><head><style>
@font-face{font-family:H;src:url(data:font/woff2;base64,${font('ibm-plex-sans-condensed/files/ibm-plex-sans-condensed-latin-600-normal.woff2')})}
@font-face{font-family:S;src:url(data:font/woff2;base64,${font('ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2')})}
body{margin:0;width:1200px;height:630px;background:#f6f4ef;color:#1b1c1e;font-family:S;display:flex;flex-direction:column;justify-content:center;padding:0 96px;box-sizing:border-box}
h1{font-family:H;font-weight:600;font-size:104px;line-height:.95;letter-spacing:-.025em;margin:0 0 28px}
p{font-size:34px;color:#4a4c51;margin:0}
.u{position:absolute;left:96px;bottom:64px;font-size:24px;color:#2b5a87}
</style></head><body><h1>AI projects,<br>ready to reuse</h1><p>Small tools built with Claude</p><div class="u">ignagu.github.io</div></body></html>`;
const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: 'public/og/default.png' });
await b.close();
console.log('wrote public/og/default.png');
