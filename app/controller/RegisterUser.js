
const { registerUser, auth } = require("../auth");
const { UserCollection } = require("../models/User");
const { newUserEmail } = require("../sendGrid");

const generatePassword = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports = {
    handler: async ({ firstName, lastName, position, email, authority }, uid) => {

        const password = generatePassword()
        
        const user = await registerUser({ firstName, lastName, email, password }).catch(err => { throw err })
        await UserCollection.create({
            data: { firstName, lastName, email, createdBy: UserCollection.getReference(uid), authority, position },
            id: user.uid
        }).catch(err => { throw err })


        newUserEmail(
            email,
            `${firstName} ${lastName}`,
            password,
            await auth.generateEmailVerificationLink(email),
            await auth.generatePasswordResetLink()
        )
    }
}