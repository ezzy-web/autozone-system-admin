const useInvoice = () => {

    const columns = [
        {
            name : 'Invoice No.',
            selector : (row) => row.id
        },

        {
            name : 'Client Name',
            selector : (row) => row.id
        },

        {
            name : 'Vehicle',
            selector : (row) => row.id
        },

        {
            name : 'Action',
            selector : (row) => row.id
        },

        
    ]



    return {
        columns
    }
}


export default useInvoice