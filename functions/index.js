const functions = require("firebase-functions");
const admin = require('firebase-admin')

const { requestAlert, confirmationMail } = require('./emails')

admin.initializeApp()
const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


exports.confirmRequest = functions.firestore
    .document('Requests/{id}')
    .onCreate(async (snap, context) => {

        const request = snap.data()
        await confirmationMail(request).catch(error => console.log(error))

    })


exports.requestAlert = functions.firestore
    .document('Requests/{id}')
    .onCreate(async (snap, context) => {


        const request = snap.data()
        const query = db.collection('Users').select(['email', 'emailVerified'])
        const users = await query.get().catch(error => console.log(error))

        const emails = []

        if (users) {
            users.docs.forEach(userSnap => {
                const user = userSnap.data()
                if (user.emailVerified) emails.push(user.email)
            })

            await requestAlert({ emails, clientName: `${request.firstName} ${request.lastName}` }).catch(error => console.log(error))
        }


    })
