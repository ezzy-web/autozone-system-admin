
const { getVehicle } = require('../../server/Firestore/Inventory')


export default async function handler(req, res) {
    const { id } = JSON.parse(req.body)
    try {
        const response = await getVehicle(id)
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(200).json({})
    }
}
