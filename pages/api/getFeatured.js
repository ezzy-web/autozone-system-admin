
const { getFeatured } = require('../../server/Firestore/Inventory')


export default async function handler(req, res) {

  try {
    const documents = await getFeatured()
    const featured = documents.map( document => {return document.data()} )
   
    res.status(200).json(featured)
  } catch (error) {
    console.log(error)
    res.status(200).json({ featured: [] })
  }
}
