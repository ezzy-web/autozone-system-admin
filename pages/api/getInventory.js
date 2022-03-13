
const { getInventory } = require('../../server/Firestore/Inventory')


export default async function handler(req, res) {
    var data = req.method === 'POST' ? JSON.parse(req.body) : null
    
    try {
        const response = await getInventory(data ? data.lastDocumentId : null)
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
