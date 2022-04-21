const response = require('./utils/formattedResponse')
const { getInventoryManager } = require("./utils/firebase/firestore")
const { verify } = require('./utils/firebase/firebaseAuth')


const db = getInventoryManager()


exports.handler = async (event) => {
    const { token, customToken } = JSON.parse(event.body)
    const user = await verify(token, customToken)
    
    if (user) {
        const { id } = JSON.parse(event.body)
        try {
            await db.deleteVehicle(id)
            return response(200, "OK")
    
        } catch (error) {
            return response(200, error.code, false)
        }
    }

    console.log("\n\n auth/required \n\n")
    return response(200, "auth/required", false)

    
}