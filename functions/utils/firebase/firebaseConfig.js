
const { initializeApp } = require("firebase/app")
const firebase = require("firebase-admin");

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG)


firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
})

module.exports = {
  app,
  admin: firebase
}