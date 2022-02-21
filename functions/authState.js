
const response = require('./utils/formattedResponse')
const { verify } = require("./utils/firebase/firebaseAuth")

exports.handler = async (event, context) => {
    const { token, customToken } = JSON.parse(event.body) 

    const user = await verify(token, customToken)

    if (user)
        return response(200, user)
    return response(200, "NO_USER")
}