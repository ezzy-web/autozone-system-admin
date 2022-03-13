
const { getNewArrivals } = require('../../server/Firestore/Inventory')


export default async function handler(req, res) {

  try {
    const documents = await getNewArrivals()
    const newArrivals = documents.map( document => {return document.data()} )
   
    res.status(200).json(newArrivals)
  } catch (error) {
    console.log(error)
    const newArrivals =[]
    res.status(200).json(newArrivals)
  }
}
