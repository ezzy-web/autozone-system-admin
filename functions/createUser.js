
const response = require('./utils/formattedResponse')
const { register, auth, generateEmailVerificationLink, generatePasswordResetLink } = require("./utils/firebase/firebaseAuth")
const { getUserManager } = require("./utils/firebase/firestore")
const { newUserEmail } = require("./utils/sendgrid/sendgrid")


const db = getUserManager()

function get_temp_password() {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = "";
    const charactersLength = characters.length;
    for ( let i = 0; i < 8; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

exports.handler = async (event, context) => {
    const { firstName, lastName, position, access, email } = JSON.parse(event.body)


    try {
        const temp_password = get_temp_password()
        const user = await register(firstName, lastName, email, temp_password)
        const email_link = await generateEmailVerificationLink(email)
        const password_link = await generatePasswordResetLink(email)
        await newUserEmail(email, firstName + " " + lastName, temp_password, email_link, password_link)

        try {

            const adminUser = auth.currentUser

            const data = {
                email: email,
                firstName: firstName,
                lastName: lastName,
                fullName: user.displayName,
                uid: user.uid,
                emailVerified: user.emailVerified,
                position: position,
                access: access,
                activities: [],
                added_by: adminUser ? {
                    fullName: adminUser.displayName,
                    uid: adminUser.uid,
                    email: adminUser.email
                } : null
            }

            console.log(data)

            await db.createUser(data)
            return response(200, "OK")

        } catch (error) {
            console.log(error)
            throw error
        }

    } catch (error) {
        console.log(error)
        return response(200, error.code, false)
    }
}