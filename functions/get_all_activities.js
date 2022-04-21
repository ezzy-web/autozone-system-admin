
const response = require('./utils/formattedResponse')
const { getUserManager, getActivityManger } = require("./utils/firebase/firestore")
const { doc } = require('firebase/firestore')
const db = getUserManager()
const activityDB = getActivityManger()


exports.handler = async (event, context) => {

    try {
        const res = await activityDB.getActivities(20).catch(err => { throw err })
        var activities = res.documents.map( docs => docs.data() )
        
        for (var activityIndex = 0; activityIndex < activities.length; activityIndex++) {
            activities[activityIndex].user = await db.getUser("", activities[activityIndex].user).catch(err => console.log(err))
        }
        return response(200, { activities, lastDoc: res.lastDocument })

    } catch (error) {

        console.log(error)
        response(200, {}, false)

    }
    
}