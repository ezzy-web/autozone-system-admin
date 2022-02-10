
const response = require('./utils/formattedResponse')
const { login } = require('./utils/firebaseAuth')
const { getUserManager } = require('./utils/firestore')


const db = getUserManager()

exports.handler = async (event, context) => {
    const { email, password } = JSON.parse(event.body)
    try {

        const credentials = await login(email, password)
        const user = credentials.user
        
        try {
            const data = await db.getUser(user.uid)
            return response(200, data)
        } catch (error) {
            console.log(error)
            throw error
        }
        
    } catch (error) {
        console.log(error)
        return response(200, error.code, false)
    }
}