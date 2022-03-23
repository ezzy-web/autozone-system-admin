

const mail = require("@sendgrid/mail")

require('dotenv').config();
const SENDGRID_API = process.env.SENDGRID_APR_KEY
const FROM_EMAIL = `Javvy's Autozone Ltd. <javvysauto@gmail.com>`
const NEW_USER_TEMPLATE_ID = process.env.NEW_USER_TEMPLATE_ID
const VERIFY_EMAIL_TEMPLATE_ID = process.env.VERIFY_EMAIL_TEMPLATE_ID
const PASSWORD_RESET_TEMPLATE_ID = process.env.PASSWORD_RESET_TEMPLATE_ID

mail.setApiKey(SENDGRID_API)


const newUserEmail = async (email, displayName, temp_password, email_link, password_link) => {
    const msg = {
        to: email,
        from: FROM_EMAIL,
        templateId: NEW_USER_TEMPLATE_ID,
        dynamicTemplateData: {
            displayName,
            temp_password,
            email_link,
            password_link
        },
        hideWarnings: true
    }
    await mail.send(msg)
    .then( res => {
        console.log(res[0].statusCode)
        console.log(res[0].headers)
    })
    .catch( err => { console.log(err) })
}

const verifyEmail = async (email, email_link) => {
    const msg = {
        to: email,
        from: FROM_EMAIL,
        templateId: VERIFY_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: {
            email,
            email_link
        },
        hideWarnings: true
    }
    await mail.send(msg)
    .then( res => {
        console.log(res[0].statusCode)
        console.log(res[0].headers)
    })
    .catch( err => {
        console.log(err)
        throw err
    })
}


module.exports = {
    newUserEmail,
    verifyEmail
}