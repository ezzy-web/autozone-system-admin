
const { initializeApp } = require("firebase/app")
const firebase = require("firebase-admin")

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


// const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS
// const { applicationDefault } = require("firebase-admin/app");




firebase.initializeApp({
  credential: refreshToken(process.env.REFRESH_TOKEN)
  // credential: applicationDefault()
})


module.exports = {
  app,
  admin: firebase
}