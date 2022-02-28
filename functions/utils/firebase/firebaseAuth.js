
const { app, auth, admin } = require("./firebaseConfig")





const register = async (firstName, lastName, email, password, claims = {}) => {

  try {
    const user = await admin.createUser({
      email: email,
      password: password,
      displayName: firstName + " " + lastName,
    })
    await admin.setCustomUserClaims(user.uid, claims).catch(err => { throw err })

    return user

  } catch (err) {
    throw err
  }

}

const deleteUser = async (uid) => {
  try {
    await admin.deleteUser(uid)
  } catch (error) {
    throw error
  }
}

const login = async (email, password, remember = false) => {
  const credentials = await auth.signInWithEmailAndPassword(auth.getAuth(app), email, password).catch(err => { throw err })

  const user = credentials.user
  const token = await user.getIdToken(true).catch(err => { throw err })
  const userRecord = await admin.getUser(user.uid).catch(err => { throw err })
  const customToken = remember ? await admin.createCustomToken(user.uid) : null

  return {
    user: userRecord,
    token,
    customToken
  }
}

const verify = async (token, customToken) => {
  var res
  try {
    const claims = await admin.verifyIdToken(token)
    const user = await admin.getUser(claims.uid).catch( err => { throw err })
    res = {
      user,
      token,
      customToken
    }
  } catch (error) {
    
    
    try {
      if (customToken) {

        const credentials = auth.signInWithCustomToken(auth.getAuth(app), customToken).catch(err => { throw err })
        const user = credentials.user  
        const newToken = await user.getIdToken(true).catch(err => { throw err })
        const record = await admin.getUser(user.uid).catch( err => { throw err })
        
  
        res = {
          user: record,
          token: newToken,
          customToken
        }
  
      } else {
        res = null
      }
    } catch (error) {
      console.log(err)
      res = null
    }

    
  }
  

  return res
}

const logout = async (uid) => {
  admin.revokeRefreshTokens(uid)
  auth.signOut(auth.getAuth(app))
}

const updateUserClaims = async (uid, claims) => {
  admin.setCustomUserClaims(uid, claims)
}

const changeEmail = async (uid,email) => {

  try {
    admin.updateUser(uid, {
      email: email,
      emailVerified: false
    })
  } catch (error) {
    console.log("Error occured while updating email: ", error)

    throw error
  }
}





module.exports = {
  
  register,
  login,
  verify,
  logout,
  deleteUser,
  generateEmailVerificationLink: async (email) => await admin.generateEmailVerificationLink(email),
  generatePasswordResetLink: async (email) => await admin.generatePasswordResetLink(email),
  changeEmail,
  updateUserClaims
}


