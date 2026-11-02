// One-off: renders public/og/default.png (1200x630) for social previews.
// Contains only the site title and URL, nothing personal. Re-run after changing the text:
//   node scripts/make-og.mjs
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const font = (p) => readFileSync(`node_modules/@fontsource/${p}`).toString('base64');
const html = `<!doctype html><html><head><style>
@font-face{font-family:C;src:url(data:font/woff2;base64,${font('ibm-plex-sans-condensed/files/ibm-plex-sans-condensed-latin-600-normal.woff2')})}
@font-face{font-family:M;src:url(data:font/woff2;base64,${font('ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2')})}
body{margin:0;width:1200px;height:630px;background:#f3f0e8;color:#1b1c1e;font-family:M;
background-image:linear-gradient(rgba(27,28,30,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(27,28,30,.07) 1px,transparent 1px),linear-gradient(rgba(27,28,30,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(27,28,30,.035) 1px,transparent 1px);
background-size:128px 128px,128px 128px,32px 32px,32px 32px;position:relative}
.f{position:absolute;inset:36px;border:2px solid #1b1c1e}.f:before{content:'';position:absolute;inset:8px;border:1px solid #bdb7a8}
.c{position:absolute;left:84px;top:96px;right:84px}
.l{font-size:22px;letter-spacing:.08em;text-transform:uppercase;color:#6a6c70}
h1{font-family:C;font-weight:600;font-size:112px;line-height:.92;letter-spacing:-.025em;margin:22px 0 28px}
.t{font-size:28px;color:#2b5a87}
.tb{position:absolute;right:36px;bottom:36px;display:flex;border-top:2px solid #1b1c1e;border-left:2px solid #1b1c1e;font-size:18px;background:#f3f0e8}
.tb div{padding:12px 18px;border-left:1px solid #bdb7a8}.tb div:first-child{border-left:0}.tb span{display:block;font-size:12px;color:#6a6c70;letter-spacing:.08em}
</style></head><body><div class="f"></div><div class="c"><div class="l">B-00 · Drawing register</div>
<h1>AI projects,<br>ready to reuse</h1><div class="t">Small tools built with Claude</div></div>
<div class="tb"><div><span>DRAWING</span>ignagu.github.io</div><div><span>SHEET</span>B-00</div><div><span>SCALE</span>NTS</div></div></body></html>`;
const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html);
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: 'public/og/default.png' });
await b.close();
console.log('wrote public/og/default.png');
