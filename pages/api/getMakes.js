
const { getMakes } = require('../../server/Firestore/Inventory')


export default async function handler(req, res) {

  try {
    const documents = await getMakes()
    const makes = documents.map( document => {return {make: document.id, models: document.data().models }} )
   
    res.status(200).json(makes)
  } catch (error) {
    console.log(error)
    res.status(200).json({ makes: [] })
  }
}
