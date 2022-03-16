require('dotenv').config()


var firebase = require('firebase-admin')
// const serviceAccount = require('./config.json')
const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG)

if (firebase.apps.length === 0) {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    })
}


module.exports = {
    firebase
}