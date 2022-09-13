const { admin } = require('../config')
const { UserCollection } = require('../models/User')


const auth = admin.auth()


const createToken = async (uid) => {
    const snapshot = await UserCollection.collection.doc(uid).get().catch(err => { throw err })

    const claims = snapshot.data()
    const token = await auth.createCustomToken(uid, { ...claims, uid })

    return token
}


const verifyToken = async (token) => {
    const claims = await auth.verifySessionCookie(token).catch(err => { throw err })
    return claims
}


const registerUser = async ({ firstName, lastName, email, password }) => {
    const record = await auth.createUser({
        displayName: `${firstName} ${lastName}`,
        email,
        emailVerified: false,
        password
    }).catch(err => { throw err })

    return record
}


const getTokenClaims = async (req) => {
    var token = null

    const { headers } = req
    if ('Authorization' in headers)
        token = headers['Authorization'].split(' ')[1]

    console.log(token)

    if (!token) {
        return {
            data: null,
            message: 'Token is required',
            error: new Error('Unauthorized'),
            status: 401
        }
    }


    try {

        const claims = await verifyToken(token)
        return {
            data: claims,
            message: 'OK',
            error: null,
            status: 200
        }

    } catch (err) {
        return {
            data: null,
            message: 'Invalid Token',
            error: new Error('Unauthorized'),
            status: 401
        }
    }
}


module.exports = { createToken, getTokenClaims, registerUser, auth }