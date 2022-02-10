
const { initializeApp } = require("firebase/app")

require('dotenv').config();
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "javvy-s-autozone-7c590.firebaseapp.com",
    projectId: "javvy-s-autozone-7c590",
    storageBucket: "javvy-s-autozone-7c590.appspot.com",
    messagingSenderId: "786569536618",
    appId: "1:786569536618:web:49385dbdc0a40f4f53d613",
    measurementId: "G-XJZ566FGDV"
};

const app = initializeApp(firebaseConfig);
const config = require("./../../firebaseConfig.json")

module.exports = {
    app,
    config
}