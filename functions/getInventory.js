
const { GET_INVENTORY } = require('./utils/querries')
const sendQuery = require('./utils/sendQuery')
const response = require('./utils/formattedResponse')




exports.handler = async (event) => {

    try {
        const res = await sendQuery(GET_INVENTORY)
        const data = JSON.parse(res.body)?.Inventory

        return response(200, data)
    } catch (error) {
        console.log(error)
        return response(500, "Something went wrong")
    }
}