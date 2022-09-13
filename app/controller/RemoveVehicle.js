
const { VehicleCollection } = require('../models/Vehicle')

module.exports = {
    handler: async (id) => {
        return await VehicleCollection.remove(id)
    }
}