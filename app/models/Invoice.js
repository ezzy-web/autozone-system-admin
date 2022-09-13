const { DatabaseManager } = require('.')

const INVOICE_COLLECTION = 'Invoices'

class Invoice extends DatabaseManager {
    constructor() {
        super(INVOICE_COLLECTION)
    }
}

const InvoiceCollection = new Invoice()

module.exports = { InvoiceCollection }