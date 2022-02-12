


const { createStorageRef, uploadFile } = require("./utils/firebaseBucket")

const response = require("./utils/formattedResponse")

exports.handler = async (event, context) => {
    // const { id, files } = JSON.parse(event.body)
    // const ref_id = (Math.random() + 1).toString(36).substring(7)
    
    
    console.log(JSON.parse(event.body))

    
    try {
        const ref = createStorageRef("images/pop")
        const task = await uploadFile(event.body, ref)
        console.log(task)


        return response(200, "OK")
    } catch(error) {
        console.log(error)
        return response(200, "FAILED", false)
    }
}