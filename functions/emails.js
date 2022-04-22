

const mail = require("@sendgrid/mail")


const SENDGRID_API = ''
const FROM_EMAIL = `Javvy's Autozone Ltd. <javvysauto@gmail.com>`
const COMPANY_EMAIL = `javvysauto@gmail.com`
const COMFIRMATION_TEMPLATE_ID = 'd-6ec84b892c1a4de38fec1cb291f0e759'
const REQUEST_ALERT_TEMPLATE_ID = 'd-1cd3f38e603b4d99b6f800da053eea6a'

mail.setApiKey(SENDGRID_API)


const confirmationMail = async ({ email, firstName, lastName }) => {
    const msg = {
        to: email,
        from: FROM_EMAIL,
        templateId: COMFIRMATION_TEMPLATE_ID,
        dynamicTemplateData: { fullName: firstName + ' ' + lastName },
        hideWarnings: true
    }

    await mail.send(msg)
        .then(res => {
            console.log(res[0].statusCode)
            console.log(res[0].headers)
        })
        .catch(err => console.log(err))
}

const requestAlert = async ({ emails, clientName: displayName }) => {
    const msg = {
        to: emails,
        from: FROM_EMAIL,
        templateId: REQUEST_ALERT_TEMPLATE_ID,
        dynamicTemplateData: { displayName },
        hideWarnings: true
    }

    await mail.send(msg)
        .then(res => {
            console.log(res[0].statusCode)
            console.log(res[0].headers)
        })
        .catch(err => {
            console.log(err)
            console.log("Errors Caught: ", err?.response.body)
        })
}

module.exports = {
    confirmationMail,
    requestAlert
}

