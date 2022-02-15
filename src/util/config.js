const { initializeApp } = require("firebase/app")
const { getStorage, ref, uploadBytesResumable, deleteObject } = require("firebase/storage")


const firebaseConfig = {
  projectId: "autozone-ja",
  storageBucket: "autozone-ja.appspot.com",
  appId: "1:1058773366377:web:d30e547b3fc4bc13ff54f8",
  measurementId: "G-1GXGSH2CMD"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

module.exports = {
    app,
    storage,
    ref,
    uploadBytesResumable,
    deleteObject
}