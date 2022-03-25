const mail = require('@sendgrid/mail')
const SENDGRID_API = process.env.SENDGRID_API

const SENDER_MAIL = `Javvy's Autozone Ltd. <javvysauto@gmail.com>`
const COMPANY_EMAIL = `javvysauto@gmail.com`

const CONTACT_TEMPLATE = `d-4cfa23df480e459d9d3ad870f6fa6adb`
const COMFIRMATION_TEMPLATE_ID = `d-6ec84b892c1a4de38fec1cb291f0e759`

mail.setApiKey(SENDGRID_API)


const clientContactMail = async ({ firstName, lastName, message, email }) => {
    const msg = {
        to: COMPANY_EMAIL,
        from: SENDER_MAIL,
        templateId: CONTACT_TEMPLATE,
        dynamicTemplateData: { displayName: `${firstName} ${lastName}`, email, message },
        hideWarnings: true
    }


    await mail.send(msg)
        .then(res => {
            console.log(res[0].statusCode)
            console.log(res[0].headers)
        })

        .catch(err => console.log(err))
}


const confirmationMail = async ({ email, firstName, lastName }) => {
    const msg = {
        to: email,
        from: SENDER_MAIL,
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

module.exports = {
    clientContactMail,
    confirmationMail
}