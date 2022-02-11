
const response = require('./utils/formattedResponse')
const { getInventoryManager } = require("./utils/firestore")


const db = getInventoryManager()


exports.handler = async (event) => {
    const { id } = JSON.parse(event.body)
    try {
        const data = await db.getVehicle(id)
        return response(200, data)
    } catch (error) {
        console.log(error)
        return response(200, error?.code, false)
    }

    
}