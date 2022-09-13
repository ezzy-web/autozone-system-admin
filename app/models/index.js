
const { admin } = require('../config')

class DatabaseManager {
    constructor(collection) {
        this.collection = admin.firestore().collection(collection)
    }


    async create({ data, id }) {

        if (id) {
            const ref = this.collection.doc(id)
            const res = await ref.create({ ...data, timeStamp: admin.firestore.Timestamp.now() }).catch(err => { throw err })

            return { res, ref }
        }


        const ref = await this.collection.add({ ...data, createdAt: admin.firestore.Timestamp.now(), updatedAt: admin.firestore.Timestamp.now() }).catch(err => { throw err })

        return {
            res: null,
            ref
        }
    }


    async update({ data, id, ref }) {
        const doc = ref ? ref : this.collection.doc(id)
        const res = await doc.update({ ...data, updatedAt: admin.firestore.Timestamp.now() }).catch(err => { throw err })

        return res
    }


    async remove(id, ref) {
        const doc = ref ? ref : this.collection.doc(id)
        const res = await doc.delete().catch(err => { throw err })

        return res
    }


    getReference(id) {
        return this.collection.doc(id)
    }
}


module.exports = { DatabaseManager }