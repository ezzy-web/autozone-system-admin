const { firebase } = require('../utils/firebase.config')



const INVENTORY_COLLECTION = 'Inventory'
const firestore = firebase.firestore()
const makeCollection = firestore.collection('Makes')
const inventoryCollection = firestore.collection(INVENTORY_COLLECTION).where('isVisible', '==', true)

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
        var now = new Date().getTime()
        const query = inventoryCollection.where('location', '==', 'On Lot').where('arrival', '>=', (now - 604800000)).limit(6)
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

const queryInventory = async (lastDocumentId = null, queryParams, limit = 12) => {
    try {
        const lastSnap = lastDocumentId ? await inventoryCollection.where('id', '==', lastDocumentId).get() : null
        
        var query = queryParams.year | queryParams.newArrival === 'true' ? inventoryCollection : inventoryCollection.orderBy('year', 'desc')
        query = lastSnap ? query.startAfter(lastSnap.docs[0]).limit(limit) : query.limit(limit)
        
        
        var queryAll = inventoryCollection

        for (const [key, value] of Object.entries(queryParams)) {
            if (key === 'yearMin') {
                query = query.where('year', '>=', value)
                queryAll = queryAll.where('year', '>=', value)
            } else if (key === 'yearMax') {
                query = query.where('year', '<=', value)
                queryAll = queryAll.where('year', '<=', value)
            } else if (key === 'newArrival') {
                var now = new Date().getTime()
                queryAll = queryAll.where('location', '==', 'On Lot').where('arrival', '>=', (now - 604800000))
                query = query.where('location', '==', 'On Lot').where('arrival', '>=', (now - 604800000))
            } else if (key === 'featured' ) {
                queryAll = queryAll.where('isFeatured', '==', true)
                query = query.where('isFeatured', '==', true)
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

const getVehicle = async (id) => {
    try {
        const document = await firestore.doc(`${INVENTORY_COLLECTION}/${id}`).get()
        return document.data()
    } catch (error) {
        throw error
    } 
}



module.exports = {
    getMakes, getFeatured, getNewArrivals, getInventory, queryInventory, getVehicle
}

