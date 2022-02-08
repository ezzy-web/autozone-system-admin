const { CREATE_ACTIVITY } = require('./utils/querries')
const sendQuery = require('./utils/sendQuery')
const response = require('./utils/formattedResponse')


function getVariables(data) {
    const id = "random integer"
    const date = new Date()
    const currentUserID = "oad"
    return {
        id: id,
        timeStamp: date.getMilliseconds(),
        title: data.title,
        user: currentUserID,
        description: data.description
    }
}

exports.handler = async (event) => {
    try {
        const data = JSON.parse(event.body)
        const variables = getVariables(data)

        const res = await sendQuery(CREATE_ACTIVITY, variables).createActivity
        const data = JSON.parse(res)

        return response(200, data)
    } catch (error) {
        console.log(error)
        return response(500, 'Something went wrong')
    }
}