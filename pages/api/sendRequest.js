
const { createRequest } = require('../../server/Firestore/Request')


export default async function handler(req, res) {
    const { request } = JSON.parse(req.body)
    try {
        const response = await createRequest(request)
        res.status(200).json(response.id)

    } catch (error) {
        console.log(error)
        res.status(200).json('error')
    }
}