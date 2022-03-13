var firebase = require('firebase-admin')
const serviceAccount = require('./config.json')


if (firebase.apps.length === 0) {
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount)
    })
}


module.exports = {
    firebase
}