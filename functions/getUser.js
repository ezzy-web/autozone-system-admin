
const response = require('./utils/formattedResponse')
const { getUserManager, getActivityManger } = require("./utils/firebase/firestore")

const db = getUserManager()
const activityDB = getActivityManger()


exports.handler = async (event, context) => {
    const { id } = JSON.parse(event.body)
    try {
        const user = await db.getUser(id)
        user.activities.reverse()

        for (var n = 0; n < user.activities.length; n++) {
            try {
                user.activities[n] = await activityDB.getActivity("", user.activities[n])
            } catch(err) {
                console.log(err)
            }
        }

        return response(200, user)
    } catch (error) {
        console.log(error)
        return response(200 , error.code, false)
    }
}