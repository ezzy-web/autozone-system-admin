
const response = require('./utils/formattedResponse')
const { auth } = require("./utils/firebaseAuth")
const { getUserManager } = require("./utils/firestore")


const db = getUserManager()

exports.handler = async (event, context) => {
    const user = auth.currentUser

    if (user) {

        try {
            const data = await db.getUser(user.uid)
            return response(200, data)
        } catch (error) {
            console.log(error)
        }
    }

    return response(200, "NO_USER")
}