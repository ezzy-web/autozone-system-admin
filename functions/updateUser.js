const { UPDATE_USER } = require('./utils/querries')
const sendQuery = require('./utils/sendQuery')
const response = require('./utils/formattedResponse')


function getVariables(data) {
    return {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName, 
        fullName: data.fullName,
        access_level: data.access_level,
        position: data.position,
        recent_activities: data.recent_activities
    }
}

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body)
        const variables = getVariables(data)

        const res = await sendQuery(UPDATE_USER, variables)
        const { updateUser: updatedUser } = JSON.parse(res)

        return response(200, updatedUser)
    } catch (error) {
        console.log(error)
        return response(500, 'Something went wrong')
    }
}