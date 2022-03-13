const { firebase } = require('../utils/firebase.config')


const firestore = firebase.firestore()
const makeCollection = firestore.collection('Makes')
const inventoryCollection = firestore.collection('Inventory').where('isVisible', '==', true)

const getMakes = async () => {
    try {
        const querySnap = await makeCollection.get()
        return querySnap.docs
    } catch (error) {
        throw error
    }
}

const getFeatured = async () => {
    try {
        const query = inventoryCollection.where('isFeatured', '==', true).limit(6)
        const querySnap = await query.get()

        return querySnap.docs
    } catch (error) {
        throw error
    }
}

const getNewArrivals = async () => {
    try {
        var date = new Date()
        var now = new Date(date.setDate(date.getDate() - 14))
        const timeStamp = firebase.firestore.Timestamp.fromDate(now)
        const query = inventoryCollection.where('location', '==', 'On lot').where('arrival', '>=', timeStamp.toMillis()).limit(6)
        const querySnap = await query.get()

        return querySnap.docs
    } catch (error) {
        throw error
    }
}

const getInventory = async (lastDocumentId = null, limit = 9) => {
    try {
        const lastSnap = lastDocumentId ? await inventoryCollection.where('id', '==', lastDocumentId).get() : null
        const query = lastSnap ? inventoryCollection.orderBy('year', 'desc').startAfter(lastSnap.docs[0]).limit(limit) : inventoryCollection.orderBy('year', 'desc').limit(limit)
        const querySnap = await query.get()
        const queryCount = await inventoryCollection.get()

        return {
            lastDocumentId: querySnap.size === limit ? querySnap.docs[querySnap.size-1].id : null,
            docs: querySnap.docs,
            resultsCount: queryCount.size
        }
    } catch (error) {
        throw error
    }
}


const queryInventory = async (lastDocumentId = null, queryParams, limit = 9) => {
    try {
        const lastSnap = lastDocumentId ? await inventoryCollection.where('id', '==', lastDocumentId).get() : null
        
        
        var query = queryParams.year ? inventoryCollection : inventoryCollection.orderBy('year', 'desc')
        query = lastSnap ? query.startAfter(lastSnap.docs[0]).limit(limit) : query.limit(limit)
        
        
        var queryAll = inventoryCollection

        for (const [key, value] of Object.entries(queryParams)) {
            if (key === 'yearMin') {
                query = query.where('year', '>=', value)
                queryAll = queryAll.where('year', '>=', value)
            } else if (key === 'yearMax') {
                query = query.where('year', '<=', value)
                queryAll = queryAll.where('year', '<=', value)
            } else {
                query = query.where(key, '==', value)
                queryAll = queryAll.where(key, '==', value)
            }
        }

        const querySnap = await query.get()
        const queryCount = await queryAll.get()


        return {
            lastDocumentId: querySnap.size === limit ? querySnap.docs[querySnap.size-1].id : null,
            docs: querySnap.docs,
            resultsCount: queryCount.size
        }

    } catch (error) {
        throw error
    }
}



module.exports = {
    getMakes, getFeatured, getNewArrivals, getInventory, queryInventory
}

