
const response = require('./utils/formattedResponse')
const { getUserManager } = require("./utils/firebase/firestore")
const { deleteUser } = require("./utils/firebase/firebaseAuth")


const db = getUserManager()


exports.handler = async (event) => {
    const { id } = JSON.parse(event.body)

    try {
        await deleteUser(id)
        await db.deleteUser(id)

        return response(200, "OK")

    } catch (error) {
        return response(200, error.code, false)
    }
}