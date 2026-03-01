const admin = require("firebase-admin");

if (!process.env.FIREBASE_KEY) {
  throw new Error("FIREBASE_KEY is missing in .env");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_KEY);

if (serviceAccount.private_key) {
serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");
}

if (!process.env.DB_CONFIG) {
  throw new Error("DB_CONFIG is not defined in .env");
}

const config = JSON.parse(process.env.DB_CONFIG);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
