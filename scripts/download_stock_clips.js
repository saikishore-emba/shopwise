const fs = require('fs')
const path = require('path')
const https = require('https')

const outDir = path.resolve(__dirname, '../animations/shopwise-explainer/assets/stock')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const clips = [
  {
    id: 'sceneA_frustrated',
    src: 'https://cdn.pixabay.com/video/2022/05/18/117353-711467316_large.mp4',
    srcPage: 'https://pixabay.com/videos/pas-content-au-t%C3%A9l%C3%A9phone-204421/',
    source: 'pixabay',
    note: 'frustrated on phone'
  },
  {
    id: 'sceneB_typing',
    src: 'https://cdn.pixabay.com/video/2020/05/04/38084-416330724_large.mp4',
    srcPage: 'https://pixabay.com/videos/phone-smartphone-mobile-portable-202987/',
    source: 'pixabay',
    note: 'hands typing on phone close-up'
  },
  {
    id: 'sceneC_scrolling',
    src: 'https://cdn.pixabay.com/video/2024/03/04/202987-919379330_large.mp4',
    srcPage: 'https://pixabay.com/videos/smartphone-scroll-touch-47743/',
    source: 'pixabay',
    note: 'phone scrolling touch close-up'
  },
  {
    id: 'sceneD_reaction',
    src: 'https://cdn.pixabay.com/video/2023/02/05/149452-797188970_large.mp4',
    srcPage: 'https://pixabay.com/videos/man-confused-question-thinking-262068/',
    source: 'pixabay',
    note: 'reaction relieved'
  },
  {
    id: 'sceneE_hero',
    src: 'https://assets.mixkit.co/videos/42750/42750-720.mp4',
    srcPage: 'https://mixkit.co/free-stock-video/man-using-his-computer-and-cell-phone-42750/',
    source: 'mixkit',
    note: 'man using computer and phone (phone detail)'
  },
  {
    id: 'sceneF_happy',
    src: 'https://cdn.pixabay.com/video/2022/11/15/139178-771796365_large.mp4',
    srcPage: 'https://pixabay.com/videos/guy-phone-city-street-mobile-phone-6590/',
    source: 'pixabay',
    note: 'happy on phone'
  }
]

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest)
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) return reject(new Error('Failed to download: ' + url + ' status ' + res.statusCode))
      res.pipe(file)
      file.on('finish', () => file.close(resolve))
    }).on('error', (err) => {
      fs.unlink(dest, () => {})
      reject(err)
    })
  })
}

async function main(){
  const licenses = []
  for (const clip of clips){
    const ext = path.extname(clip.src).split('?')[0] || '.mp4'
    const filename = clip.id + ext
    const dest = path.join(outDir, filename)
    process.stdout.write('Downloading ' + clip.id + '...')
    try{
      await download(clip.src, dest)
      console.log(' done')
      licenses.push({ id: clip.id, file: `assets/stock/${filename}`, source: clip.source, srcPage: clip.srcPage, note: clip.note })
    }catch(err){
      console.log(' failed:', err.message)
    }
  }
  fs.writeFileSync(path.join(outDir, 'licenses.json'), JSON.stringify(licenses, null, 2))
  console.log('Finished downloads. Manifest at animations/shopwise-explainer/assets/stock/licenses.json')
}

main().catch(e=>{console.error(e); process.exit(1)})
