const { firebase } = require("../utils/firebase.config");

const REQUEST_COLLECTION = 'Requests'


const firestore = firebase.firestore()
const db = firestore.collection(REQUEST_COLLECTION)


const createRequest = async (data) => {
    data['timeStamp'] = firebase.firestore.Timestamp.now()
    const docRef = await db.add(data).catch(error => { throw error })

    return docRef
}


module.exports = {
    createRequest
}