
const { initializeApp } = require("firebase/app")
const { getStorage, ref, uploadBytesResumable, deleteObject } = require("firebase/storage")


const firebaseConfig = {
  projectId: 'javvy-s-autozone-7c590',
  storageBucket: 'javvy-s-autozone-7c590.appspot.com',
  appId: '1:786569536618:web:49385dbdc0a40f4f53d613',
  measurementId: 'G-XJZ566FGDV'
};

// const firebaseConfig = {
//   projectId: 'autozone-ja',
//   storageBucket: 'autozone-ja.appspot.com',
//   appId: '1:1058773366377:web:d30e547b3fc4bc13ff54f8',
//   measurementId: 'G-1GXGSH2CMD'
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