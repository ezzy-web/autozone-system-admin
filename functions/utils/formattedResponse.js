module.exports = (statusCode, data, status = true) => {
    const body = {
        content: data,
        status: status
    }
    return {
        statusCode,
        body: JSON.stringify(body)
    }
}