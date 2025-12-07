#!/usr/bin/env node
// Render the explainer by capturing frames from a headless Chromium instance and encoding to MP4 via ffmpeg.
// Usage: node scripts/render_explainer.js --out=out.mp4 --fps=30 --duration=8

const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const puppeteer = require('puppeteer');

async function main(){
  const args = Object.fromEntries(process.argv.slice(2).map(a=>a.split('=').map(s=>s.replace(/^--/,''))));
  const out = args.out || 'explainer.mp4';
  const fps = parseInt(args.fps||30);
  const duration = parseFloat(args.duration||8);
  const width = parseInt(args.width||1280);
  const height = parseInt(args.height||720);
  const crf = args.crf !== undefined ? args.crf : '18';
  const preset = args.preset || 'slow';
  const codec = args.codec || 'libx264';
  const prores = args.prores === '1' || args.prores === 'true';
  const frames = Math.ceil(fps * duration);

  const tmpDir = path.join(__dirname,'..','tmp_render');
  if(!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir,{recursive:true});

  const url = 'file://' + path.join(__dirname,'..','animations','shopwise-explainer','index.html');
  let browser;
  try{
    // prefer user-provided Chrome path on macOS
    const preferred = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    const launchArgs = ['--no-sandbox','--disable-setuid-sandbox','--allow-file-access-from-files','--disable-web-security','--disable-dev-shm-usage']
    if(require('fs').existsSync(preferred)){
      browser = await puppeteer.launch({executablePath:preferred,args:launchArgs,headless:true});
    }else{
      browser = await puppeteer.launch({args:launchArgs,headless:true});
    }
  }catch(e){
    console.warn('Default launch failed, attempting fallback executable paths:', e.message);
    const possiblePaths = [
      '/Applications/Chromium.app/Contents/MacOS/Chromium',
      '/usr/bin/google-chrome',
      '/usr/bin/chromium-browser',
      '/usr/bin/chromium'
    ];
    const execPath = possiblePaths.find(p=>require('fs').existsSync(p));
    if(!execPath) throw new Error('No Chrome/Chromium found on PATH and Puppeteer default launch failed. Install Chromium or run npm install puppeteer to download one.');
    browser = await puppeteer.launch({executablePath:execPath,args:['--no-sandbox','--disable-setuid-sandbox']});
  }
  const page = await browser.newPage();
  await page.setViewport({width: width, height: height, deviceScaleFactor:1});
  await page.setDefaultNavigationTimeout(120000);
  try{
    await page.goto(url,{waitUntil:'networkidle2'});
  }catch(e){
    console.warn('file:// navigation failed, starting local static server fallback:', e.message);
    // simple static server
    const serveDir = path.join(__dirname,'..','animations','shopwise-explainer');
    const http = require('http');
    const mime = { '.html':'text/html', '.css':'text/css', '.js':'application/javascript', '.png':'image/png', '.jpg':'image/jpeg', '.mp4':'video/mp4', '.svg':'image/svg+xml' };
    const server = http.createServer((req,res)=>{
      let reqPath = req.url.split('?')[0];
      if(reqPath === '/') reqPath = '/index.html';
      const filePath = path.join(serveDir, decodeURIComponent(reqPath));
      fs.readFile(filePath,(err,data)=>{
        if(err){ res.statusCode=404; res.end('Not found'); return }
        const ext = path.extname(filePath);
        res.setHeader('Content-Type', mime[ext] || 'application/octet-stream');
        res.end(data);
      })
    });
    await new Promise((resolve, reject)=>{
      server.listen(8123, '127.0.0.1', ()=>resolve());
    });
    const httpUrl = 'http://127.0.0.1:8123/index.html';
    await page.goto(httpUrl,{waitUntil:'networkidle2'});
    // after successful navigation ensure we close server when done
    page.on('close',()=>{ try{ server.close() }catch(e){} });
  }

  // Ensure animations start
  await page.evaluate(()=>{ if(window.run) run(); });

  console.log('Rendering', frames, 'frames to', tmpDir);
  const sleep = (ms)=>new Promise(r=>setTimeout(r,ms));
  for(let i=0;i<frames;i++){
    const t = (i/fps) * 1000;
    await sleep(1000/fps);
    const filename = path.join(tmpDir,`frame-${String(i).padStart(5,'0')}.png`);
    await page.screenshot({path:filename});
    if(i%50===0) console.log('captured',i);
  }

  await browser.close();

  // encode with ffmpeg
  console.log('Encoding with ffmpeg... this requires ffmpeg in PATH');

  // Build ffmpeg command based on requested codec/preset
  const inputPattern = path.join(tmpDir,'frame-%05d.png');
  if(prores){
    const proresOut = out.replace(/\.mp4$/i, '_prores.mov');
    const cmd = `ffmpeg -y -framerate ${fps} -i ${inputPattern} -c:v prores_ks -profile:v 3 -pix_fmt yuv422p10le ${proresOut}`;
    console.log('Encoding ProRes (HQ):', proresOut);
    child_process.execSync(cmd,{stdio:'inherit'});
  }

  if(codec === 'libx265' || codec === 'hevc'){
    const hevcOut = out.replace(/\.mp4$/i, '_hevc.mp4');
    const cmd = `ffmpeg -y -framerate ${fps} -i ${inputPattern} -c:v libx265 -x265-params "crf=${crf}" -preset ${preset} -pix_fmt yuv420p ${hevcOut}`;
    console.log('Encoding HEVC (x265):', hevcOut);
    child_process.execSync(cmd,{stdio:'inherit'});
  }

  // Default H.264 encode
  const h264Out = out;
  const ffmpegCmd = `ffmpeg -y -framerate ${fps} -i ${inputPattern} -c:v ${codec} -preset ${preset} -crf ${crf} -pix_fmt yuv420p ${h264Out}`;
  console.log('Encoding H.264/AVC:', h264Out, '(codec=',codec,', crf=',crf,', preset=',preset,')');
  child_process.execSync(ffmpegCmd,{stdio:'inherit'});
  console.log('Done ->', out);
}

main().catch(err=>{console.error(err);process.exit(1)});
