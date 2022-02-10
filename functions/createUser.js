
const response = require('./utils/formattedResponse')
const { register } = require("./utils/firebaseAuth")
const { getUserManager } = require("./utils/firestore")


const db = getUserManager()

function get_temp_password() {
    return "JA-0000-0000"
}

exports.handler = async (event, context) => {
    const { firstName, lastName, position, access, email } = JSON.parse(event.body)


    try {
        const user = await register(firstName, lastName, email, get_temp_password())

        try {


            const data = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                fullName: user.displayName,
                uid: user.uid,
                emailVerified: user.emailVerified,
                position: position,
                access: access,
                activities: []
            }

            console.log(data)

            await db.createUser(data)
            return response(200, "OK")

        } catch (error) {
            console.log(error)
            throw error
        }

    } catch (error) {
        return response(200, error.code, false)
    }
}