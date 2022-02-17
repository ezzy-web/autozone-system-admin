const response = require('./utils/formattedResponse')
const { getUserManager } = require("./utils/firebase/firestore")


const db = getUserManager()

exports.handler = async (event, context) => { 

    try {
        const check = await db.checkAdmin()
        return response(200, check)
    } catch (error) {
        console.log(error)
        return response(200, false)
    }
}
