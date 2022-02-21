
const response = require('./utils/formattedResponse')
const { register, generateEmailVerificationLink, generatePasswordResetLink, verify } = require("./utils/firebase/firebaseAuth")
const { getUserManager } = require("./utils/firebase/firestore")
const { newUserEmail } = require("./utils/sendgrid/sendgrid")


const db = getUserManager()

function get_temp_password() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

exports.handler = async (event, context) => {
    const { firstName, lastName, position, access, email, token, customToken } = JSON.parse(event.body)

    const currentUser = await verify(token, customToken)

    try {
        const temp_password = get_temp_password()
        const user = await register(firstName, lastName, email, temp_password, {
            position: position,
            access: access,
            added_by: currentUser ? {
                uid: currentUser.user.uid,
                fullName: currentUser.user.displayName
            } : null
        })

        const email_link = await generateEmailVerificationLink(email)
        const password_link = await generatePasswordResetLink(email)

        await newUserEmail(email, firstName + " " + lastName, temp_password, email_link, password_link)

        const data = {
            fullName: user.displayName,
            firstName,
            lastName,
            email,
            uid: user.uid,
            position,
            access,
            added_by: currentUser ? {
                uid: currentUser.user.uid,
                fullName: currentUser.user.displayName
            } : null,
            activities: []
        }
        await db.createUser(data)

        return response(200, 'OK')

    } catch (error) {
        console.log("This error occurred while registering user: ", error)
        return (200, "error", false)
    }
}