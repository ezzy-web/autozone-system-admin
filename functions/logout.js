
const response = require('./utils/formattedResponse')
const { logout } = require("./utils/firebaseAuth")

exports.handler = async (event, context) => {
    await logout()
    return response(200, "OK")
}