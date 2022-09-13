const token = ''


const POST = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Basic ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    reject(new Error(data.error))
                } else {
                    resolve(data)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

const DELETE = (url, data) => {
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'Application/json',
                Authorization: `Basic ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    reject(new Error(data.error))
                } else {
                    resolve(data)
                }
            })
            .catch(err => reject(err))
    })
}


const useRequestHandler = () => {
    return { POST, DELETE }
}


export default useRequestHandler