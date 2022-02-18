const { app, admin }= require('./firebaseConfig')

const {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateEmail
  } = require("firebase/auth")

const auth = getAuth(app)
const register = async (firstName, lastName, email, password) => {

  try {
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: firstName + " " + lastName,
    })
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


const changeEmail = async (user, newEmail) => {
  await updateEmail(user, newEmail).catch( err => {
    throw err
  })
}




module.exports = {
  register,
  login,
  logout,
  auth,
  deleteUser,
  generateEmailVerificationLink: async (email) => await admin.auth().generateEmailVerificationLink(email),
  generatePasswordResetLink: async (email) => await admin.auth().generatePasswordResetLink(email),
  changeEmail

}


