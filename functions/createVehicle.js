const { getInventoryManager } = require('./utils/firebase/firestore')
const { verify } = require('./utils/firebase/firebaseAuth')
const response = require('./utils/formattedResponse')


const db = getInventoryManager()

exports.handler = async (event, context) => {
    const { token, customToken } = JSON.parse(event.body)
    const user = await verify(token, customToken)

    if (user) {
        var data = JSON.parse(event.body)
        const arrival = data?.arrival ? data.arrival === "" ? null : data.arrival.split("-") : null
        
        if (arrival) {
            const arrivalDate = new Date(arrival[0], arrival[1], arrival[2])
            data.arrival = arrivalDate.getTime()
        }

        try {

            const stockNo = await db.createVehicle(data, { uid: user.user.uid, fullName: user.user.displayName })
            return response(200, stockNo)

        } catch (error) {

            console.log(error)
            return response(200, error?.code, false)

        }
    }
    return response(200, "auth/required", false)
}