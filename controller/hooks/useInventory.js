import supabase from "../util/supabase.client"

const useInventory = () => {




    const columns = [
        {
            name : 'Stock No',
            selector : (row) => row.id
        },

        {
            name : 'Vehicle Title',
            selector : (row) => row.id
        },

        {
            name : 'Current Status',
            selector : (row) => row.id
        },

        {
            name : 'Last Updated',
            selector : (row) => row.id
        },

        
    ]



    return {
        columns
    }
}


export default useInventory