
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

const serviceAccount = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_ID,
  private_key: process.env.PRIVATE_KEY,
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_EMAIL,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URL,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_URL,
  client_x509_cert_url: process.env.CLIENT_CERT_URL
}

console.log(serviceAccount)
// const serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS
// const { applicationDefault } = require("firebase-admin/app");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
  // credential: applicationDefault()
})


module.exports = {
  app,
  admin: firebase
}