const { VehicleCollection } = require('../models/Vehicle')
const { UserCollection } = require('../models/User')


module.exports = {
    handler: async (data, id, uid) => {
        return await VehicleCollection.update({
            data: { ...data, updatedBy: UserCollection.getReference(uid)},
            id
        })
    }
}