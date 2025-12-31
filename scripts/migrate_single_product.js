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

async function migrateProduct(asin) {
  console.log(`Migrating product: ${asin}...`);
  const docRef = db.collection('products').doc(asin);
  const doc = await docRef.get();

  if (!doc.exists) {
    console.log('Product not found!');
    return;
  }

  const data = doc.data();
  const updates = {
      stores: data.stores || {}
  };
  const fieldsToRemove = {};

  // Migrate Amazon
  if (data.price && !updates.stores.amazon) {
      console.log('  - Found legacy Amazon data');
      updates.stores.amazon = {
          name: 'Amazon',
          price: data.price,
          url: data.url || '',
          type: 'online',
          updatedAt: new Date().toISOString()
      };
      // Mark old fields for deletion (optional, but keeps DB clean)
      fieldsToRemove.price = admin.firestore.FieldValue.delete();
      fieldsToRemove.url = admin.firestore.FieldValue.delete();
  }

  // Migrate Flipkart
  if (data.flipkartPrice && !updates.stores.flipkart) {
      console.log('  - Found legacy Flipkart data');
      updates.stores.flipkart = {
          name: 'Flipkart',
          price: data.flipkartPrice,
          url: data.flipkartUrl || '',
          type: 'online',
          updatedAt: new Date().toISOString()
      };
      fieldsToRemove.flipkartPrice = admin.firestore.FieldValue.delete();
      fieldsToRemove.flipkartUrl = admin.firestore.FieldValue.delete();
  }

  // Migrate Offline
  if (data.offlinePrice && data.offlineStore) {
      console.log('  - Found legacy Offline data');
      const key = data.offlineStore.toLowerCase().replace(/[^a-z0-9]/g, '_');
      if (!updates.stores[key]) {
          updates.stores[key] = {
              name: data.offlineStore,
              price: data.offlinePrice,
              type: 'offline',
              updatedAt: new Date().toISOString()
          };
      }
      fieldsToRemove.offlinePrice = admin.firestore.FieldValue.delete();
      fieldsToRemove.offlineStore = admin.firestore.FieldValue.delete();
  }

  if (Object.keys(updates.stores).length > 0) {
      // Perform the update
      await docRef.update({
          ...updates,
          ...fieldsToRemove
      });
      console.log('Successfully migrated to new structure!');
      console.log(JSON.stringify(updates.stores, null, 2));
  } else {
      console.log('No legacy data found or data already in new structure.');
  }
}

const asin = process.argv[2];
if (!asin) {
    console.log('Usage: node scripts/migrate_single_product.js <ASIN>');
    process.exit(1);
}

migrateProduct(asin);
