import { getTokenClaims } from '../../../app/auth'

const registerUser = require('../../../app/controller/RegisterUser').handler


export default async function handler(req, res) {

    const session = await getTokenClaims(req)
    if (!session.data) {
        console.log(session.error)
        res.status(session.status).json({ error: session.message })

        return
    }


    const { data: user } = session
    const { method } = req

    switch (method) {
        case 'POST':

            try {
                const { data } = req.body
                await registerUser(data, user.uid)

                res.status(200).json({ message: 'OK' })
            } catch (err) {

                console.log(err)
                res.status(500).json({ error: err.message })
            }


            break;

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(404)

            break
    }
}