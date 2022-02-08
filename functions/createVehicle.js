const { CREATE_VEHICLE } = require('./utils/querries')
const sendQuery = require('./utils/sendQuery')
const response = require('./utils/formattedResponse')




function getVariables(data) {
    var date = new Date()
    const currentUserID = "some_user"
    const title = data.year + " " + data.make + " " + data.model

    return {
        updated_by: currentUserID,
        added_by: currentUserID,

        timeStamp: date.getMilliseconds(),
        last_update: date.getMilliseconds(),
        arrival: 1,
        title: title,

        saves: 0,
        body: data.body,
        trans: data.trans,
        request: [],
        location: data.location,
        history: data.history,
        price_visible: false,
        model: data.model,
        mileage: data.mileage,

        features: [],
        isFeatured: false,
        price: data.price,
        year: parseInt(data.year),
        price_cond: data.price_cond,
        color: data.color,
        engine_no: data.engine_no,

        id: data.stock,
        chassis: data.chassis,
        isVisible: false,
        media: [],

        make: data.make,
        isAvailable: true,
        submodel: data.submodel,
        engine_size: data.engine_size
    }
}


exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body)
        const variables = getVariables(data)

        const res = await sendQuery(CREATE_VEHICLE, variables)
        const data = JSON.parse(res).createVehicle

        return response(200, data)

    } catch (error) {
        console.log(error)
        return response(500, 'Something went wrong')

    }
}