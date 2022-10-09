import { createAccount } from "../../../app/supabase/auth";

export default async function handler(req, res) {

    const { method } = req
    console.log(method)

    switch (method) {
        case 'POST':

            try {

                const body = JSON.parse(req.body)
                
                const { data, error } = await createAccount({
                    first: body.firstName,
                    last: body.lastName,
                    email: body.email,
                    password: body.password
                })


                console.log(body)
                console.log(data)
                console.log(error)


                if (error) throw new Error(error.message)

                res.status(200).json(data)

            } catch (error) {
                console.log(error)
                res.status(422).json({ error: error.message })
            }

            break;


        default:
            res.status(404).json({})

            break
    }
}