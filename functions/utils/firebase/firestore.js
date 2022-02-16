const { app } = require('./firebaseConfig')
const {
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    serverTimestamp,
    updateDoc,
    getDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy
} = require("firebase/firestore")

const { simpleflake } = require('simpleflakes')

const db = getFirestore(app)



class ActivityManager {
    constructor() {
        this.collection = collection(db, "Activities")
    }

    async createActivity(data) {
        data['timeStamp'] = serverTimestamp()

        console.log(data)

        const docRef = await addDoc(this.collection, data).catch(err => {
            console.log(err)
            throw err
        })

        return docRef
    }

    async getActivities(limitAmt = 15, order_by = "timeStamp", startAfter = null) {

        if (startAfter) {
            const queryRef = query(this.collection, orderBy(order_by), limit(limitAmt), startAfter(startAfter))
            const snap = await getDocs(queryRef).catch(err => {
                console.log(err)
                throw err
            })

            const docs = snap.docs()
            const lastDocSnap = limitAmt >= snap.size ? docs[-1] : null 


            return {
                documents: docs,
                lastDocument: lastDocSnap
            }
        } else {
            const queryRef = query(this.collection, orderBy(order_by), limit(limitAmt))
            const snap = await getDocs(queryRef).catch(err => {
                console.log(err)
                throw err
            })

            const docs = snap.docs()
            const lastDocSnap = limitAmt >= snap.size ? docs[-1] : null 


            return {
                documents: docs,
                lastDocument: lastDocSnap
            }
        }
    }

    async getActivity(id, ref = null) {
        const docRef = ref ? ref : doc(db, "Activities", id)

        const snap = await getDoc(docRef).catch(err => {
            console.log(err)
            throw err
        })

        if (snap.exists()) {
            return snap.data()
        } else {
            console.log("Data does't exist")
            throw new Error("Data doesn't Exist")
        }
    }
}

class UserManager {
    constructor() {
        this.collection = collection(db, "Users")
    }

    getDocRef(id) {
        const docRef = doc(db, "Users", id)
        return docRef
    }

    async createUser(data) {
        data['timeStamp'] = serverTimestamp()
        data['lastUpdate'] = serverTimestamp()
        const userDoc = doc(db, "Users", data.uid)

        await setDoc(userDoc, data).catch(err => {
            console.log(err)
            throw err
        })
    }

    async updateUser(id, data) {
        data['lastUpdate'] = serverTimestamp()
        const userDoc = doc(db, "Users", id)

        await updateDoc(userDoc, data).catch(err => {
            console.log(err)
            throw err
        })
    }

    async getUser(id) {
        const userDoc = doc(db, "Users", id)

        const snap = await getDoc(userDoc).catch(err => {
            console.log(err)
            throw err
        })

        if (snap.exists()) {
            return snap.data()
        } else {
            console.log("Data does't exist")
            throw new Error("Data doesn't Exist")
        }
    }

    async getAllUsers() {
        const docs = await getDocs(this.collection).catch(err => {
            console.log(err)
            throw err
        })
        return docs.docs
    }

    async deleteUser(uid) {
        const userDoc = doc(db, "Users", uid)
        await deleteDoc(userDoc).catch(err => {
            console.log(err)
            throw err
        })

        return true
    }
}


class InventoryManager {
    constructor() {
        this.collection = collection(db, "Inventory")
    }

    #generateStockNo() {
        const flake = simpleflake(Date.now())

        const stock = flake.toString().substring(0, 9)
        return stock
    }

    getDocRef(id) {
        const vehicleDoc = doc(db, "Inventory", id)
        return vehicleDoc
    }

    async createVehicle(data, user) {
        data['timeStamp'] = serverTimestamp()
        data['lastUpdate'] = serverTimestamp()
        data['id'] = this.#generateStockNo()
        data['added_by'] = user
        data['updated_by'] = user
        data['title'] = data.year + " " + data.make + " " + data.model
        data['features'] = []
        data['requests'] = []
        data['isAvailable'] = true
        data['isVisible'] = false
        data['isFeatured'] = false
        data['invoice'] = null
        data['images'] = []

        const vehicleDoc = doc(db, "Inventory", data.id)

        await setDoc(vehicleDoc, data).catch(err => {
            console.log(err)
            throw err
        })
        return data.id
    }

    async getInventory() {
        const docs = await getDocs(this.collection).catch(err => {
            console.log(err)
            throw err
        })
        return docs.docs
    }

    async getVehicle(id, ref = null) {
        const vehicleDoc = ref ? ref : doc(db, "Inventory", id)

        const snap = await getDoc(vehicleDoc).catch(err => {
            console.log(err)
            throw err
        })

        if (snap.exists()) {
            return snap.data()
        } else {
            console.log("Data does't exist")
            throw new Error("Data doesn't Exist")
        }
    }

    async updateVehicle(id, data, user, ref = null) {


        data['lastUpdate'] = serverTimestamp()
        data['updated_by'] = user

        if (data.id) {
            data['title'] = data.year + " " + data.make + " " + data.model
            data['features'] = data?.features
            data['requests'] = data?.features
            data['isAvailable'] = data?.isAvailable
            data['isVisible'] = data?.isVisible
            data['isFeatured'] = data?.isFeatured
            data['invoice'] = data?.invoice
            data['images'] = data?.images
        }
        const vehicleDoc = ref ? ref : doc(db, "Inventory", id)

        await updateDoc(vehicleDoc, data).catch(err => {
            console.log(err)
            throw err
        })
        return data.id
    }

    async deleteVehicle(id, ref = null) {
        const vehicleDoc = ref ? ref : doc(db, "Inventory", id)
        await deleteDoc(vehicleDoc).catch(err => {
            console.log(err)
            throw err
        })

        return true
    }
}


class ClientManager {
    constructor() {
        this.collection = collection(db, "Clients")
    }

    getDocRef(id) {
        const clientDoc = doc(db, "Clients", id)
        return clientDoc
    }

    async createClient(data, user) {
        data['timeStamp'] = serverTimestamp()
        data['lastUpdate'] = serverTimestamp()
        data['added_by'] = user
        data['updated_by'] = user

        const clientDoc = await addDoc(this.collection, data).catch(err => {
            console.log(err)
            throw err
        })
        return clientDoc
    }

    async getClient(id, ref = null) {
        const invoiceDoc = ref ? ref : doc(db, "Invoices", id)

        const snap = await getDoc(invoiceDoc).catch(err => {
            console.log(err)
            throw err
        })

        if (snap.exists()) {
            return snap.data()
        } else {
            console.log("Data does't exist")
            throw new Error("Data doesn't Exist")
        }
    }

    async updateClient(id, data, user, ref = null) {
        data['lastUpdate'] = serverTimestamp()
        data['updated_by'] = user

        const clientDoc = ref ? ref : doc(db, "Clients", id)

        await updateDoc(clientDoc, data).catch(err => {
            console.log(err)
            throw err
        })
        return clientDoc
    }
}

class InvoiceManager {
    constructor() {
        this.collection = collection(db, "Invoices")
    }

    #generateInvoiceNo() {
        const flake = simpleflake(Date.now())
        const stock = flake.toString().substring(0, 9)
        return stock
    }

    getDocRef(id) {
        const invoiceDoc = doc(db, "Invoices", id)
        return invoiceDoc
    }

    async createInvoice(data, user) {
        data['timeStamp'] = serverTimestamp()
        data['lastUpdate'] = serverTimestamp()
        data['added_by'] = user
        data['id'] = this.#generateInvoiceNo()

        const invoiceDoc = doc(db, "Invoices", data.id)

        await setDoc(invoiceDoc, data).catch(err => {
            console.log(err)
            throw err
        })
        return invoiceDoc
    }

    async updateInvoice(data, user) {
        data['lastUpdate'] = serverTimestamp()
        const invoiceDoc = doc(db, "Invoices", data.id)
        await updateDoc(invoiceDoc, data).catch(err => {
            console.log(err)
            throw err
        })
    }

    async getAllInvoices() {
        const docs = await getDocs(this.collection).catch(err => {
            console.log(err)
            throw err
        })
        return docs.docs
    }

    async getInvoice(id, ref = null) {
        const docRef = ref ? ref : doc(db, "Invoices", id)

        const snap = await getDoc(docRef).catch(err => {
            console.log(err)
            throw err
        })

        if (snap.exists()) {
            return snap.data()
        } else {
            console.log("Data does't exist")
            throw new Error("Data doesn't Exist")
        }
    }
}


const getClientManager = () => {
    return new ClientManager()
}

const getUserManager = () => {
    return new UserManager()
}

const getInventoryManager = () => {
    return new InventoryManager()
}

const getInvoiceManager = () => {
    return new InvoiceManager()
}

const getActivityManger = () => {
    return new ActivityManager()
}

module.exports = {
    getUserManager,
    getInventoryManager,
    getClientManager,
    getInvoiceManager,
    getActivityManger
}