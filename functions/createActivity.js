
const response = require('./utils/formattedResponse')
const { getActivityManger, getUserManager } = require("./utils/firebase/firestore")
const { arrayUnion } = require('firebase/firestore')
const { auth } = require("./utils/firebase/firebaseAuth")



const userDB = getUserManager()
const activity = getActivityManger()

exports.handler = async (event) => {
    const { title, details } = JSON.parse(event.body)
    console.log(title, details)
    const user = auth.currentUser

    if (user) {

        try {
            const userRef = userDB.getDocRef(user.uid)
            const activityRef = await activity.createActivity({
                user: userRef,
                title,
                details
            })


            await userDB.updateUser(user.uid, {
                activities: arrayUnion(activityRef)
            })
            
            return response(200, "OK")
        } catch (error) {
            console.log(error)
            return response(200, error?.code, false)
        }
    }

    console.log("\n\n auth/required \n\n")
    return response(200, "auth/required", false)
}