const { CREATE_USER } = require('./utils/querries')
const sendQuery = require('./utils/sendQuery')
const response = require('./utils/formattedResponse')


function getVariables(data) {
    const fullName = data.firstName + " " + data.lastName
    const currentUserID = false
    const uid = "USERID"
    return {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName, 
        fullName: fullName,
        access_level: data.access_level,
        uid: uid,
        position: data.position,
        recent_activities: [],
        added_by: false ? { connect: currentUserID } : { disconnect: false }
    }
}

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body)
        const variables = getVariables(data)

        const res = await sendQuery(CREATE_USER, variables)
        const { createUser: createdUser } = JSON.parse(res)

        return response(200, createdUser)
    } catch (error) {
        console.log(error)
        return response(500, 'Something went wrong')
    }
}