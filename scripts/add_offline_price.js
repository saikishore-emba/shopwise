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

async function updateOfflinePrice(asin, price, storeName, url = null) {
  if (!asin) return;

  // Create a safe key for the map (lowercase, underscores)
  const storeKey = storeName.toLowerCase().replace(/[^a-z0-9]/g, '_');

  try {
    const docRef = db.collection('products').doc(asin);
    
    // Construct the update object dynamically
    const updateData = {
        updatedAt: new Date().toISOString(),
        stores: {}
    };
    
    updateData.stores[storeKey] = {
        name: storeName,
        price: price,
        type: 'offline',
        updatedAt: new Date().toISOString()
    };

    if (url) {
        updateData.stores[storeKey].url = url;
    }

    await docRef.set(updateData, { merge: true });
    console.log(`Successfully updated product ${asin} with Offline price: ${price} at ${storeName}${url ? ` (URL: ${url})` : ''}`);
  } catch (error) {
    console.error('Error updating Firestore:', error);
  }
}

async function main() {
    const asin = process.argv[2];
    const price = process.argv[3];
    const store = process.argv[4] || "Local Store";
    const url = process.argv[5] || null;
    
    if (!asin || !price) {
      console.log('Usage: node scripts/add_offline_price.js <AMAZON_ASIN> <PRICE> [STORE_NAME] [URL]');
      console.log('Example: node scripts/add_offline_price.js B08N5KWB9H "₹50,000" "Croma Mumbai" "https://croma.com/product"');
      process.exit(1);
    }

    await updateOfflinePrice(asin, price, store, url);
}

main();
