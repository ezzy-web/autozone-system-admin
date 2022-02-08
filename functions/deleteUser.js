const { DELETE_USER } = require('./utils/querries')
const sendQuery = require('./utils/sendQuery')
const response = require('./utils/formattedResponse')


exports.handler = async (event) => {
    try {
        const { id } = JSON.parse(event.body)
        const variables = {
            id: id
        }

        const res = await sendQuery(DELETE_USER, variables)
        const { deleteUser: deletedUser } = JSON.parse(res)

        return response(200, deletedUser)
    } catch (error) {
        console.log(error)
        return response(500, 'Something went wrong')
    }
}