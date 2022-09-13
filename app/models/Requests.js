const { DatabaseManager } = require('.')

const REQUEST_COLLECTION = 'Requests'

class Request extends DatabaseManager {
    constructor() {
        super(REQUEST_COLLECTION)
    }
}

const RequestCollection = new Request()

module.exports = { RequestCollection }