const { config, SendGrid } = require('../config')



const newUserEmail = (email, displayName, temp_password, email_link, password_link) => {
    const msg = {
        to: email,
        from: config.FROM_EMAIL,
        templateId: config.NEW_USER_TEMPLATE,
        dynamicTemplateData: {
            displayName,
            temp_password,
            email_link,
            password_link
        },
        hideWarnings: true
    }

    SendGrid.send(msg)
        .then(res => {
            console.log(res[0].statusCode)
            console.log(res[0].headers)
        })
        .catch(err => { console.log(err) })
}


module.exports = { newUserEmail }