const firebase = require("firebase/app")
const auth = require("firebase/auth")
const firebaseAdmin = require("firebase-admin");

require('dotenv').config();



const config = {
  apiKey: process.env.FIREBASE_API,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};
const app = firebase.initializeApp(config)



const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG)
const appAdmin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount)
})
const admin = firebaseAdmin.auth(appAdmin)



module.exports = {
  app,
  auth, 
  admin
}