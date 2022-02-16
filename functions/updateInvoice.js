const { getClientManager, getInvoiceManager, getInventoryManager } = require('./utils/firebase/firestore')
const { auth } = require('./utils/firebase/firebaseAuth')
const response = require('./utils/formattedResponse')


const clientDB = getClientManager()
const invoiceDB = getInvoiceManager()



exports.handler = async (event, context) => {
    const user = auth.currentUser

    if (user) {

        try {
            const userData = {
                fullName: user.displayName,
                email: user.email,
                uid: user.uid
            }
            const { id, client } = JSON.parse(event.body)
            const invoice = await invoiceDB.getInvoice(id)

            await clientDB.updateClient("", client, userData, invoice.client)
            return response(200, "OK")


        } catch (error) {
            console.log(error)
            return response(200, error?.code, false)
        }
    }

    console.log("\n\n auth/required \n\n")
    return response(200, "auth/required", false)
}