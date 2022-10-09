const useUsers = () => {

    const columns = [
        {
            name : 'Name',
            selector : (row) => row.id
        },

        {
            name : 'Email',
            selector : (row) => row.id
        },

        {
            name : 'Role',
            selector : (row) => row.id
        },

        {
            name : 'Date Joined',
            selector : (row) => row.id
        },

        
    ]



    return {
        columns
    }
}


export default useUsers