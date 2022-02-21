const { getClientManager, getInvoiceManager, getInventoryManager } = require('./utils/firebase/firestore')
const { verify } = require('./utils/firebase/firebaseAuth')
const response = require('./utils/formattedResponse')


const clientDB = getClientManager()
const invoiceDB = getInvoiceManager()
const inventoryDB = getInventoryManager()



exports.handler = async (event, context) => {
    const { token, customToken } = JSON.parse(event.body)
    const user = await verify(token, customToken)

    if (user) {

        try {
            const userData = {
                fullName: user.user.displayName,
                uid: user.user.uid
            }
            const { vehicle, client } = JSON.parse(event.body)
            const clientDoc = await clientDB.createClient(client, userData)
            const vehicleDoc = inventoryDB.getDocRef(vehicle)
            const invoiceDoc = await invoiceDB.createInvoice({
                vehicle: vehicleDoc,
                client: clientDoc
            }, userData)
            await inventoryDB.updateVehicle("", { invoice: invoiceDoc, isAvailable: false, isVisible: false }, userData, vehicleDoc)

            return response(200, "OK")
        } catch (error) {
            console.log(error)

            return response(200, error?.code, false)
        }
    }

    console.log("\n\n auth/required \n\n")
    return response(200, "auth/required", false)
}