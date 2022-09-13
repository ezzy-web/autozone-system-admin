const { UserCollection } = require("../models/User")


module.exports = {
    handler: async (data, id, uid) => {
        await UserCollection.update({ data: { ...data, updatedBy: UserCollection.getReference(uid) }, id })
    }
}