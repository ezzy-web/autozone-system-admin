
const response = require('./utils/formattedResponse')
const { changeEmail, verify } = require("./utils/firebase/firebaseAuth")
const { getUserManager } = require("./utils/firebase/firestore")

const db = getUserManager()


exports.handler = async (event, context) => {
    const { email: newEmail, token, customToken } = JSON.parse(event.body)

    const user = await verify(token, customToken)

    if (user) {
        try {
            
            await changeEmail(user.user.uid, newEmail)
            await db.updateUser(user.uid, {
                email: user.email,
                emailVerified: false
            })
            return response(200, 'OK')

        } catch (error) {
            console.log(error)
            return response(200, error.code, false)
        }
    }

    console.log("\n\n auth/required \n\n")
    return response(200, "auth/required", false)
}