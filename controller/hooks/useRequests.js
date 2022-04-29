const useRequests = () => {

    const columns = [
        {
            name : 'Vehicle',
            selector : (row) => row.id
        },

        {
            name : 'Client',
            selector : (row) => row.id
        },

        {
            name : 'Client Email',
            selector : (row) => row.id
        },

        {
            name : 'Client Mobile',
            selector : (row) => row.id
        },

        
    ]



    return {
        columns
    }
}


export default useRequests