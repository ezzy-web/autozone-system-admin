
const response = require('./utils/formattedResponse')
const { getRequestManager, getInventoryManager } = require("./utils/firebase/firestore")


const requestdb = getRequestManager()
const inventorydb = getInventoryManager()


exports.handler = async (event, context) => {
    try {
        const docs = await requestdb.getAllRequests()


        const requests = []


        for (var i = 0; i < docs.length; i++) {
            var request = docs[i].data()
            request.vehicle = await inventorydb.getVehicle("", request.vehicle)

            requests.push(request)
        }



        return response(200, requests)
    } catch (error) {
        console.log(error)
        return response(200 , error.code, false)
    }
}