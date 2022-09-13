import { getTokenClaims } from "../../../app/auth";

const updateVehicle = require('../../../app/controller/UpdateVehicle').handler
const removeVehicle = require('../../../app/controller/RemoveVehicle').handler


export default async function handler(req, res) {

    const session = await getTokenClaims(req)
    if (!session.data) {
        console.log(session.error)
        res.status(session.status).json({ error: session.message })
    }


    const { data: user } = session
    const { method } = req
    const { id } = req.query

    switch (method) {
        case 'DELETE':

            try {

                await removeVehicle(id)
                res.status(200).json({ message: 'OK' })

            } catch (err) {
                console.log(err)
                res.status(500).json({ error: err.message })
            }

            break;


        case 'POST':

            try {

                const { data } = req.body
                await updateVehicle(data, id, user.uid)

                res.status(200).json({ message: 'OK' })


            } catch (err) {
                console.log(err)
                res.status(500).json({ error: err.message })
            }

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(404)

            break;
    }



}