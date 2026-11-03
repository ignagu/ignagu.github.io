// One-off: renders public/og/default.png (1200x630) for social previews.
// Contains only the site title and URL, nothing personal. Re-run after changing the text:
//   node scripts/make-og.mjs
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const b64 = (p) => readFileSync(`node_modules/${p}`).toString('base64');
const html = `<!doctype html><html><head><style>
@font-face{font-family:D;src:url(data:font/woff2;base64,${b64('@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2')})}
@font-face{font-family:D;font-style:italic;src:url(data:font/woff2;base64,${b64('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')})}
@font-face{font-family:S;src:url(data:font/woff2;base64,${b64('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')})}
@font-face{font-family:M;src:url(data:font/woff2;base64,${b64('@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')})}
body{margin:0;width:1200px;height:630px;background:#f7f6f2;color:#121212;font-family:S;position:relative;overflow:hidden}
.c{position:absolute;left:88px;top:92px}
.e{font-family:M;font-size:20px;letter-spacing:.08em;text-transform:uppercase;color:#7a7974;display:flex;align-items:center;gap:12px}
.e:before{content:'';width:10px;height:10px;border-radius:50%;background:#e2481c}
h1{font-family:D;font-weight:400;font-size:132px;line-height:.95;letter-spacing:-.02em;margin:28px 0 0}
h1 em{color:#e2481c}
.u{position:absolute;left:88px;bottom:72px;font-size:26px;color:#4b4b48}
.o{position:absolute;right:-120px;top:-120px;width:420px;height:420px;border-radius:50%;background:#fbe7df}
</style></head><body><div class="o"></div><div class="c"><div class="e">No GitHub · No code · Just Claude</div>
<h1>Useful AI tools,<br><em>no setup.</em></h1></div><div class="u">ignagu.github.io</div></body></html>`;
const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: 'public/og/default.png' });
await b.close();
console.log('wrote public/og/default.png');
