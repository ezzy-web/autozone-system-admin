
const response = require('./utils/formattedResponse')
const { generateEmailVerificationLink } = require("./utils/firebase/firebaseAuth")
const { verifyEmail } = require("./utils/sendgrid/sendgrid")




exports.handler = async (event, context) => {
    const { email } = JSON.parse(event.body)


    try {
        const email_link = await generateEmailVerificationLink(email)
        await verifyEmail(email, email_link)
        return response(200, "OK")

    } catch (error) {
        console.log(error)
        return response(200, error.code, false)
    }
}