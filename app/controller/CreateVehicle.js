const { VehicleCollection } = require('../models/Vehicle')
const { UserCollection } = require('../models/User')
const { simpleflake } = require('simpleflakes')

const generateStockNo = () => {
    const flake = simpleflake(Date.now())
    const stock = flake.toString().substring(0, 9)
    return stock
}

module.exports = {
    handler: async (data, uid) => {
        return await VehicleCollection.create({ 
            data: {
                ...data,
                createdBy: UserCollection.getReference(uid)
            }, id: generateStockNo()
        })
    }
}