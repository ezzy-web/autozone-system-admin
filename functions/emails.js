

const mail = require("@sendgrid/mail")


const SENDGRID_API = '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'
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

const requestAlert = async ({ emails, displayName }) => {
    const msg = {
        to: [...emails, COMPANY_EMAIL],
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
        .catch(err => console.log(err))
}

module.exports = {
    confirmationMail,
    requestAlert
}

