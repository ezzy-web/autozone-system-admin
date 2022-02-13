const response = require('./utils/formattedResponse')
const { getInventoryManager } = require("./utils/firestore")
const { auth } = require('./utils/firebaseAuth')


const db = getInventoryManager()


exports.handler = async (event) => {
    const user = auth.currentUser
    
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