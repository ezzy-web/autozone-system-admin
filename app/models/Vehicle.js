const { DatabaseManager } = require('.')



const VEHICLE_COLLECTION = 'Inventory'

class Vehicle extends DatabaseManager {
    constructor() {
        super(VEHICLE_COLLECTION)
    }
}

const VehicleCollection = new Vehicle()

module.exports = { VehicleCollection }