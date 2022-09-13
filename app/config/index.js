require('dotenv').config()


const config = process.env

// SENDGRID CONFIGURATION
const SendGrid = require("@sendgrid/mail")
SendGrid.setApiKey(config.SENDGRIG_API_KEY)


// FIREBASE ADMIN SDK CONFIGURATION
const admin = require('firebase-admin')
const serviceAccount = JSON.parse(config.FIREBASE_ADMIN_CONFIG)
if (admin.apps.length === 0) admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = { config, SendGrid, admin }