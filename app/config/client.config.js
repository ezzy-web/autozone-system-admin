
// FIREBASE CLIENT CONFIGURATION
const firebase = require('firebase/app')
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}

if (!firebase.getApps().length) firebase.initializeApp(firebaseConfig)

const { getFirestore } = require('firebase/firestore')
const { getStorage } = require('firebase/storage')


const firestore = getFirestore(firebase.getApp())
const storage = getStorage(firebase.getApp())

module.exports = {
    firestore,
    storage
}
