
const { initializeApp } = require("firebase/app")
const { getStorage, ref, uploadBytesResumable, deleteObject } = require("firebase/storage")


const firebaseConfig = {
  projectId: 'javvy-s-autozone-7c590',
  storageBucket: 'javvy-s-autozone-7c590.appspot.com',
  appId: '1:786569536618:web:49385dbdc0a40f4f53d613',
  measurementId: 'G-XJZ566FGDV'
};

// const firebaseConfig = {
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MESUREMENT_ID
// };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

module.exports = {
    app,
    storage,
    ref,
    uploadBytesResumable,
    deleteObject
}