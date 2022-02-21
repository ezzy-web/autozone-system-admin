
const response = require('./utils/formattedResponse')
const { login, updateUserClaims } = require('./utils/firebase/firebaseAuth')
const { getUserManager } = require('./utils/firebase/firestore')


const db = getUserManager()


exports.handler = async (event, context) => {
    const { email, password, remember } = JSON.parse(event.body)
    try {

        const records = await login(email, password, remember ? remember : false)
        const user = records.user

        try {
            await updateUserClaims(user.uid, { email: user.email, emailVerified: user.emailVerified})
            await db.updateUser(user.uid, { email: user.email, emailVerified: user.emailVerified })
            return response(200, records)
        } catch (error) {
            throw error
        }

    } catch (error) {
        console.log(error)
        return response(200, error.code, false)
    }
}