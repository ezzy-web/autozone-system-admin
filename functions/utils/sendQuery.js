const axios = require('axios')
require('dotenv').config();
const log = console.log

module.exports = async (query, variables) => {
    const { data: { data, errors } } = await axios({

        url: 'https://graphql.us.fauna.com/graphql',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.FAUNA_SECRET_KEY}`
        },
        data: {
            query: query,
            variables: variables
        }
    })

    if (errors) {
        throw new Error(errors[0].message)
    }
    return {
        statusCode: 200,
        body: JSON.stringify(data)
    }
}