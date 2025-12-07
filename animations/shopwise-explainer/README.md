# ShopWise Explainer Animation

Preview the interactive 2D explainer animation locally by opening `index.html` in a browser.

Files:
- `index.html` — main HTML with scenes
- `styles.css` — styles and simple keyframes
- `script.js` — sequencing, typing, scanning, best-deal highlight, and confetti

How to preview:
1. Open the folder in VS Code or a file browser.
2. In the browser, open the file at `animations/shopwise-explainer/index.html`.
3. Optionally use a local server for better performance, e.g. run `python3 -m http.server` in the folder and open `http://localhost:8000`.

Notes:
- This is a lightweight HTML/CSS/JS prototype for the six scenes described.
- If you want an exported MP4, GIF, or Lottie file, I can render/export it next.

Rendering a high-quality MP4 (automated)
- Requirements: `node` (v12+), `npm`, `ffmpeg`, and `git`.
- Install dependencies:

```bash
cd <repo-root>
npm install puppeteer
```

- Run the render script (example: 30fps, 8s):

```bash
node scripts/render_explainer.js --out=animations/shopwise-explainer/explainer.mp4 --fps=30 --duration=8
```

This script uses Puppeteer to capture frames and `ffmpeg` to encode an MP4. Frames are stored temporarily under `tmp_render`.

Lottie / After Effects plan
- Because Lottie is a JSON-based vector animation format, converting the prototype to Lottie reliably requires rebuilding the animation in After Effects (or a Lottie editor) and exporting with the Bodymovin plugin.
- Suggested workflow:
	- Import SVG assets into After Effects as shape layers (or convert to shapes in AE).
	- Recreate the scene timeline (typing, scan dots as shape animations, best-deal scale, confetti using particle shape layers or manually animated pieces).
	- Export using Bodymovin to generate `data.json` (Lottie file).

I can:
- Provide an AE project spec and layered SVG assets prepared for AE.
- Hand-author a very small Lottie JSON prototype for a single scene (simple elements only).

