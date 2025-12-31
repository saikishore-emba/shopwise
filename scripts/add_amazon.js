const puppeteer = require('puppeteer');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Initialize Firebase Admin
const SERVICE_ACCOUNT_PATH = path.join(__dirname, '../service-account.json');

if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
  console.error('ERROR: Service account key not found!');
  process.exit(1);
}

const serviceAccount = require(SERVICE_ACCOUNT_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function scrapeAmazonProduct(url, browser) {
  console.log(`Fetching details for: ${url}`);
  const page = await browser.newPage();
  
  // Randomize User Agent slightly to look less robotic
  const userAgents = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15'
  ];
  await page.setUserAgent(userAgents[Math.floor(Math.random() * userAgents.length)]);

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Wait for title or captcha
    try {
        await page.waitForSelector('#productTitle', { timeout: 10000 });
    } catch (e) {
        console.log("  - Title not found (possible captcha or bad link). Skipping...");
        return null;
    }

    const product = await page.evaluate(() => {
      const title = document.querySelector('#productTitle')?.innerText.trim();
      
      let price = document.querySelector('.a-price .a-offscreen')?.innerText;
      if (!price) price = document.querySelector('#priceblock_ourprice')?.innerText;
      if (!price) price = document.querySelector('#priceblock_dealprice')?.innerText;
      if (!price) price = document.querySelector('.a-color-price')?.innerText;

      const img = document.querySelector('#landingImage')?.src || 
                  document.querySelector('#imgBlkFront')?.src;

      let asin = document.querySelector('input[name="ASIN"]')?.value;
      
      return { title, price, image: img, asin };
    });

    if (!product.asin) {
      const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
      if (asinMatch) product.asin = asinMatch[1];
    }

    product.url = url;
    product.updatedAt = new Date().toISOString();

    return product;

  } catch (error) {
    console.error('  - Error scraping page:', error.message);
    return null;
  } finally {
    await page.close();
  }
}

async function saveProductToFirestore(product) {
  if (!product || !product.asin) {
    return;
  }

  try {
    const docRef = db.collection('products').doc(product.asin);
    
    // Create the new structure
    const updateData = {
        asin: product.asin,
        title: product.title,
        image: product.image,
        updatedAt: new Date().toISOString(),
        // We use dot notation to update/merge specific fields in the map
        // But for the first run or deep merge, we might need to be careful.
        // Firestore set with merge:true handles nested maps well.
        stores: {
            amazon: {
                name: 'Amazon',
                price: product.price,
                url: product.url,
                type: 'online',
                updatedAt: new Date().toISOString()
            }
        }
    };

    await docRef.set(updateData, { merge: true });
    console.log(`  + Saved: ${product.title.substring(0, 50)}...`);
  } catch (error) {
    console.error('  - Error saving to Firestore:', error);
  }
}

async function main() {
    const arg = process.argv[2];
    
    if (!arg) {
      console.log('Usage: node scripts/add_amazon.js <amazon_url_or_file_path>');
      process.exit(1);
    }

    let urls = [];
    if (fs.existsSync(arg)) {
        // It's a file
        const fileContent = fs.readFileSync(arg, 'utf8');
        urls = fileContent.split('\n').map(line => line.trim()).filter(line => line.length > 0);
        console.log(`Loaded ${urls.length} URLs from file.`);
    } else {
        // It's a single URL
        urls = [arg];
    }

    const browser = await puppeteer.launch({
        headless: "new",
        executablePath: '/Users/sagollak/.cache/puppeteer/chrome/mac_arm-143.0.7499.40/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
    });

    for (const url of urls) {
        const product = await scrapeAmazonProduct(url, browser);
        if (product) {
            await saveProductToFirestore(product);
        }
        
        if (urls.length > 1) {
            // Wait for 45 to 70 seconds
            const delay = 45000 + Math.floor(Math.random() * 25000); 
            console.log(`Waiting ${Math.round(delay/1000)} seconds...`);
            await sleep(delay);
        }
    }

    await browser.close();
    console.log("Done!");
}

main();
