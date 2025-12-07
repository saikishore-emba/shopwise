const fs = require('fs').promises;
const path = require('path');
const { chromium } = require('playwright');

async function toDataUrl(filePath) {
  const abs = path.resolve(filePath);
  try {
    const buf = await fs.readFile(abs);
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch (err) {
    console.error('Could not read', abs, err.message);
    return null;
  }
}

async function run() {
  const repoRoot = path.resolve(__dirname, '..');
  const imgs = [
    '.playwright-mcp/before-submit.png',
    '.playwright-mcp/after-submit.png',
    '.playwright-mcp/final.png',
  ];

  const dataUrls = [];
  for (const rel of imgs) {
    const url = await toDataUrl(path.join(repoRoot, rel));
    dataUrls.push(url || '');
  }

  const [img1, img2, img3] = dataUrls;

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Story</title><style>body{font-family:Inter,Arial,sans-serif;margin:24px;color:#0f172a}.frame{display:flex;gap:16px;margin-bottom:20px;align-items:center}.img{width:360px;height:540px;object-fit:cover;border-radius:12px;box-shadow:0 6px 18px rgba(2,6,23,0.12)}.meta{max-width:360px}h1{font-size:20px;margin:0 0 8px 0}p{margin:4px 0}.footer{margin-top:30px;font-size:12px;color:#64748b}.scene{font-weight:700;color:#059669}</style></head><body><h2>ShopWise — 12s Explainer Storyboard</h2><div class="frame"><img class="img" src="${img1}" /><div class="meta"><div class="scene">Scene 1 — 0.0–1.5s</div><h1>Opening: Stop Tab Switching</h1><p>Visual: Logo and blurred app UI. Text: "Stop Tab Switching."</p><p>VO: "Stop tab switching."</p></div></div><div class="frame"><img class="img" src="${img2}" /><div class="meta"><div class="scene">Scene 2 — 1.5–4.0s</div><h1>Hero Screen: Start Saving</h1><p>Visual: Mobile UI with headline "Start Saving." and subtext "Compare Amazon, Flipkart, Croma & more in one click."</p><p>VO: "Start saving — compare prices across stores in one click."</p></div></div><div class="frame"><img class="img" src="${img3}" /><div class="meta"><div class="scene">Scene 3 — 4.0–9.5s</div><h1>Interaction + Confirmation</h1><p>Visual: Tap Get Early Access → modal with Name/Email → submit → toast: "You're on the list!"</p><p>VO: "Tap Get Early Access and join the waitlist. You're on the list — we'll notify you when we launch."</p></div></div><div class="frame"><div style="width:360px;height:540px;border-radius:12px;background:#f8fafc;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(2,6,23,0.06);"><div style="padding:20px;text-align:center;"><div class="scene">Scene 4 — 9.5–12.0s</div><h1>Closing CTA</h1><p>Text: "Join the waitlist — shopwiser.in" + icons: Verified sellers, Price history, Alerts</p></div></div><div class="meta"><h1>Closing</h1><p>VO: "Join the waitlist at shopwiser.in"</p><p>End frame: Brand lockup + short jingle.</p></div></div><div class="footer">Created from live prototype screenshots. Exported as PDF by Playwright.</div></body></html>`;

  const out = path.join(repoRoot, 'storyboard.pdf');

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle' });
  await page.emulateMedia({ colorScheme: 'light' });
  await page.pdf({ path: out, format: 'A4', printBackground: true });
  await browser.close();

  console.log('Saved PDF to', out);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
