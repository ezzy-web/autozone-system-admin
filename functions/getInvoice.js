
const response = require('./utils/formattedResponse')
const { getInventoryManager, getClientManager, getInvoiceManager } = require("./utils/firestore")


const inventorydb = getInventoryManager()
const clientdb = getClientManager()
const invoicedb = getInvoiceManager()

exports.handler = async (event) => {
    const { id } = JSON.parse(event.body)
    try {
        const data = await invoicedb.getInvoice(id)
        data.client = await clientdb.getClient(null, data.client)
        data.vehicle = await inventorydb.getVehicle(null, data.vehicle)
        
        return response(200, data)
    } catch (error) {
        console.log(error)
        return response(200, error?.code, false)
    }
}