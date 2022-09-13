import { createToken } from '../../../../app/auth'


export default async function handler(req, res) {
    const { method } = req
    const { uid } = req.query

    switch (method) {
        case 'GET':

            try {
                const token = await createToken(uid)
                res.status(200).json({ token })
            
            } catch (err) {

                console.log(err)
                res.status(401).json({ error: err.message })
            }


            break;

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(404)

            break
    }
}