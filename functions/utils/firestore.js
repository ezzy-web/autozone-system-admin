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
    deleteDoc
} = require("firebase/firestore")


const db = getFirestore(app)



class UserManager {
    constructor() {
        this.collection = collection(db, "Users")
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
        const userDoc = doc(db, "Users", data.uid)

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
        await deleteDoc(userDoc).catch( err => {
            console.log(err)
            throw err
        })

        return true
    }
}




const getUserManager = () => {
    return new UserManager()
}

module.exports = {
    getUserManager
}