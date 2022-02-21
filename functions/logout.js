
const response = require('./utils/formattedResponse')
const { logout } = require("./utils/firebase/firebaseAuth")

exports.handler = async (event, context) => {
    const { uid } = JSON.parse(event.body)
    await logout(uid)
    return response(200, "OK")
}