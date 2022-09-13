const { DatabaseManager } = require('.')

const USER_COLLECTION = 'Users'

class User extends DatabaseManager {
    constructor() {
        super(USER_COLLECTION)
    }
}

const UserCollection = new User()

module.exports = { UserCollection }