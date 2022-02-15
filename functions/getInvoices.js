
const response = require('./utils/formattedResponse')
const { getInventoryManager, getClientManager, getInvoiceManager } = require("./utils/firestore")


const inventorydb = getInventoryManager()
const clientdb = getClientManager()
const invoicedb = getInvoiceManager()


exports.handler = async (event, context) => {
    try {
        const docs = await invoicedb.getAllInvoices()


        const invoices = []


        for (var i = 0; i < docs.length; i++) {
            var invoice = docs[i].data()
            invoice.client = await clientdb.getClient("", invoice.client)
            invoice.vehicle = await inventorydb.getVehicle("", invoice.vehicle)

            invoices.push(invoice)
        }



        return response(200, invoices)
    } catch (error) {
        console.log(error)
        return response(200 , error.code, false)
    }
}