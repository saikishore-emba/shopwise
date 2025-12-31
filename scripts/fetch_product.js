const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// File to store products
const DATA_FILE = path.join(__dirname, '../src/data/products.json');

async function scrapeAmazonProduct(url) {
  console.log(`Fetching details for: ${url}`);
  const browser = await puppeteer.launch({
    headless: "new",
    // args: ['--no-sandbox'] // sometimes needed in certain envs
  });
  const page = await browser.newPage();

  // Set User-Agent to avoid some bot detection
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

    // Wait for title to ensure page loaded
    await page.waitForSelector('#productTitle', { timeout: 10000 });

    const product = await page.evaluate(() => {
      const title = document.querySelector('#productTitle')?.innerText.trim();
      
      // Try multiple price selectors
      let price = document.querySelector('.a-price .a-offscreen')?.innerText;
      if (!price) price = document.querySelector('#priceblock_ourprice')?.innerText;
      if (!price) price = document.querySelector('#priceblock_dealprice')?.innerText;
      if (!price) price = document.querySelector('.a-color-price')?.innerText;

      // Image
      const img = document.querySelector('#landingImage')?.src || 
                  document.querySelector('#imgBlkFront')?.src;

      // ASIN (usually in the URL or a hidden field, but let's try to get it from the page if possible, or just use what we have)
      // Often found in a hidden input or just parse URL later.
      // Let's try to find the ASIN in the page details
      let asin = document.querySelector('input[name="ASIN"]')?.value;
      
      return { title, price, image: img, asin };
    });

    // If ASIN wasn't found in the page, try to extract from URL
    if (!product.asin) {
      const asinMatch = url.match(/\/dp\/([A-Z0-9]{10})/);
      if (asinMatch) product.asin = asinMatch[1];
    }

    product.url = url;
    product.updatedAt = new Date().toISOString();

    return product;

  } catch (error) {
    console.error('Error scraping page:', error.message);
    return null;
  } finally {
    await browser.close();
  }
}

async function saveProduct(product) {
  if (!product) return;

  let products = [];
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    try {
      products = JSON.parse(data);
    } catch (e) {
      console.error('Error parsing JSON, starting fresh.');
    }
  }

  // Check if product already exists (by ASIN)
  const index = products.findIndex(p => p.asin === product.asin);
  if (index >= 0) {
    console.log(`Updating existing product: ${product.title}`);
    products[index] = product;
  } else {
    console.log(`Adding new product: ${product.title}`);
    products.push(product);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
  console.log(`Saved to ${DATA_FILE}`);
}

const url = process.argv[2];
if (!url) {
  console.log('Usage: node scripts/fetch_product.js <amazon_url>');
  process.exit(1);
}

scrapeAmazonProduct(url).then(saveProduct);
