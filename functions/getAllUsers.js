
const response = require('./utils/formattedResponse')
const { getUserManager, getActivityManger } = require("./utils/firebase/firestore")

const db = getUserManager()
const activityDB = getActivityManger()


exports.handler = async (event, context) => {

    try {
        const docs = await db.getAllUsers()


        var users = []

        for (var i = 0; i < docs.length; i++) {
            var user = docs[i].data()
            user.activities.reverse()
            for (var n = 0; n < user.activities.length; n++) {
                try {
                    user.activities[n] = await activityDB.getActivity("", user.activities[n])
                } catch(err) {
                    console.log(err)
                }
            }
            users.push(user)
        }

        return response(200, users)
    } catch (error) {
        console.log(error)
        return response(200 , error.code, false)
    }
}