
const response = require('./utils/formattedResponse')
const { getInventoryManager } = require("./utils/firebase/firestore")

const db = getInventoryManager()


exports.handler = async (event) => {
    try {
        const docs = await db.getInventory()


        var inventory = []
        docs.forEach( doc => {
            inventory.push(doc.data())
        })

        return response(200, inventory)
    } catch (error) {
        console.log(error)
        return response(200 , error.code, false)
    }
}