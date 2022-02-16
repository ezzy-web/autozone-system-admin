
const response = require('./utils/formattedResponse')
const { getUserManager } = require("./utils/firebase/firestore")

const db = getUserManager()

exports.handler = async (event, context) => {
    const { data, id } = JSON.parse(event.body)

    try {
        await db.updateUser(id, data)
        return response(200, "UPDATED")
    } catch (error) {
        console.log(error)

        return response(500, "ERROR")
    }
}