const { initializeApp } = require("firebase/app")
const { getStorage, ref, uploadBytesResumable } = require("firebase/storage")


const firebaseConfig = {
  authDomain: "javvy-s-autozone-7c590.firebaseapp.com",
  projectId: "javvy-s-autozone-7c590",
  storageBucket: "javvy-s-autozone-7c590.appspot.com",
  messagingSenderId: "786569536618",
  appId: "1:786569536618:web:49385dbdc0a40f4f53d613",
  measurementId: "G-XJZ566FGDV"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

module.exports = {
    app,
    storage,
    ref,
    uploadBytesResumable
}