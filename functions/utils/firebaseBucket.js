
const { app } = require('./firebaseConfig')
const { getStorage, ref, uploadBytes } = require("firebase/storage")

const storage = getStorage(app)



const createStorageRef = (path) => {
    return ref(storage, path)
}

const uploadFile = async (file, ref=null) => {
    try {
        if (ref) {
            const task = await uploadBytes(ref, file)
            return task
        } 

        throw new Error("Ref required")
    } catch (error) {
        throw error
    }
    
}

module.exports = {
    createStorageRef,
    uploadFile
}
