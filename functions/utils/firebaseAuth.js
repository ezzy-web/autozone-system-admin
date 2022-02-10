const { app, config }= require('./firebaseConfig')
const admin = require("firebase-admin")


admin.initializeApp({
  credential: admin.credential.cert(config)
})


const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged } = require("firebase/auth")

const auth = getAuth(app)


const register = async (firstName, lastName, email, password) => {

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: firstName + " " + lastName,
    })
    console.log(userRecord)
    return userRecord
  } catch (err) {
    console.log(err)
    throw err
  }

}

const deleteUser = async (id) => {
  try {

    await admin.auth().deleteUser(id)
    return true
  } catch (error) {
    throw error
  }
}

const login = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password)
}

const logout = async () => {
  signOut(auth)
}

module.exports = {
  register,
  login,
  logout,
  auth,
   deleteUser
}


