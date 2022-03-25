
const { clientContactMail, confirmationMail } = require('../../server/mail')


export default async function handler(req, res) {
    const { contact } = JSON.parse(req.body)
    try {
        await clientContactMail(contact).catch( error => { throw error })
        await confirmationMail(contact).catch( error => { throw error })
        res.status(200).json('done')

    } catch (error) {
        console.log(error)
        res.status(200).json('error')
    }
}