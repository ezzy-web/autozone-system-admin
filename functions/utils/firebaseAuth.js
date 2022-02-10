const { app } = require('./firebaseConfig')
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
    const credentials = await createUserWithEmailAndPassword(auth, email, password)
    const user = credentials.user
    await updateProfile(user, {
      displayName: firstName + " " + lastName
    })

    return user
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
  auth
}


