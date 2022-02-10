
const response = require('./utils/formattedResponse')
const { getUserManager } = require("./utils/firestore")

const db = getUserManager()


exports.handler = async (event, context) => {

    try {
        const docs = await db.getAllUsers()


        var users = []
        docs.forEach( doc => {
            users.push(doc.data())
        })

        return response(200, users)
    } catch (error) {
        console.log(error)
        return response(200 , error.code, false)
    }
}