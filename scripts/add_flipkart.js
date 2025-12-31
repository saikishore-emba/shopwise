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

async function scrapeFlipkart(url) {
  console.log(`Fetching Flipkart details for: ${url}`);
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: '/Users/sagollak/.cache/puppeteer/chrome/mac_arm-143.0.7499.40/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
  });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    
    // Debug: Print title
    const title = await page.title();
    console.log(`Page Title: ${title}`);

    // Wait for body to ensure page loaded
    await page.waitForSelector('body', { timeout: 60000 });

    // Try to find price using multiple strategies
    const data = await page.evaluate(() => {
      // Strategy 1: Common Classes
      let priceElement = document.querySelector('.Nx9bqj') || 
                         document.querySelector('._30jeq3') ||
                         document.querySelector('div[class*="Nx9bqj"]');
      
      if (priceElement) return { price: priceElement.innerText };

      // Strategy 2: Look for price pattern in text nodes near the top
      // This is a fallback if classes change
      const priceRegex = /₹[\d,]+/;
      const elements = document.querySelectorAll('div, span, p');
      
      for (let el of elements) {
          // Heuristic: Price is usually in a reasonably sized font and short text
          if (el.innerText && el.innerText.match(/^₹[\d,]+$/) && el.innerText.length < 20) {
              // Check if it's visible (simple check)
              const rect = el.getBoundingClientRect();
              if (rect.height > 0 && rect.width > 0) {
                  return { price: el.innerText };
              }
          }
      }

      return { price: null };
    });

    if (!data.price) {
        console.log("Price not found via selectors. Trying regex on full text...");
        const text = await page.evaluate(() => document.body.innerText);
        const match = text.match(/₹[\d,]+/);
        if (match) {
            return match[0];
        }
    }

    return data.price;

  } catch (error) {
    console.error('Error scraping Flipkart:', error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function updateProduct(asin, flipkartUrl, flipkartPrice) {
  if (!asin) return;

  try {
    const docRef = db.collection('products').doc(asin);
    await docRef.set({
        updatedAt: new Date().toISOString(),
        stores: {
            flipkart: {
                name: 'Flipkart',
                price: flipkartPrice,
                url: flipkartUrl,
                type: 'online',
                updatedAt: new Date().toISOString()
            }
        }
    }, { merge: true });
    console.log(`Successfully updated product ${asin} with Flipkart price: ${flipkartPrice}`);
  } catch (error) {
    console.error('Error updating Firestore:', error);
  }
}

async function main() {
    const asin = process.argv[2];
    const url = process.argv[3];
    
    if (!asin || !url) {
      console.log('Usage: node scripts/add_flipkart.js <AMAZON_ASIN> <FLIPKART_URL>');
      console.log('Example: node scripts/add_flipkart.js B08N5KWB9H "https://www.flipkart.com/..."');
      process.exit(1);
    }

    const price = await scrapeFlipkart(url);
    if (price) {
        await updateProduct(asin, url, price);
    } else {
        console.log("Failed to fetch price from Flipkart.");
    }
}

main();
