
const { queryInventory } = require('../../server/Firestore/Inventory')


export default async function handler(req, res) {
    var data = req.method === 'POST' ? JSON.parse(req.body) : null
    try {
        const response = await queryInventory(data ? data.lastDocumentId : null, data.query)
        response.docs = response.docs.map( document => document.data())
        res.status(200).json(response)

    } catch (error) {
        console.log(error)
        res.status(200).json({
            lastDocumentId: null,
            docs: [],
            resultsCount: 0
        })
    }
}
