
const faunadb = require('faunadb')
const q = faunadb.query
require('dotenv').config();

class UserManager {
    constructor() {
        this.client = new faunadb.Client({
            secret: process.env.FAUNA_SECRET_KEY,
            domain: "db.us.fauna.com",
            scheme: "https"
        })
    }

    createUser(data) {
        return this.client.query( q.Create(q.Collection("User"), { data: data }) )
    }

    getUser() {
        return this.client.query( q.Get( q.Ref( q.Collection("User"), id) ) )
    }
}

class InventoryManager {
    constructor() {
        this.client = new faunadb.Client({
            secret: process.env.FAUNA_SECRET_KEY
        })
    }

    createVehicle(data) {
        return this.client.query( q.Create(q.Collection("Vehicle"), { data: data }) )
    }

    getVehicle(id) {
        return this.client.query( q.Get( q.Ref ( q.Collection("Vehicle"), id) ) )
    }
}


const userManager = () => {
    return new UserManager()
}



module.exports =  {
    userManager,
}