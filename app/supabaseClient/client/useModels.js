import { useState } from "react";
import { supabaseClient as supabase } from ".";



export default function Models() {

    const [isError, setIsError] = useState(false)
    const [error, setError] = useState()

    const handleError = (error) => {
        if (error) {
            setIsError(true)
            setError(error)
            console.log(error)

            return true
        }

        setError(false)
        return false
    }


    const getModelsByMakeId = async (id) => {
        const { data, error } = await supabase.from('models').select('*').eq('make', id)
        return handleError(error) ? [] : data ? data : []
    }


    const getModelById = async (id) => {
        const { data, error } = await supabase.from('models').select('*').eq('id', id)
        return handleError(error) ? [] : data ? data : []
    }


    const insertModel = async (id, name) => {
        const { data, error } = await supabase.from('models').insert(
            { make: id, name }
        )
        return handleError(error) ? error : data ? data : null
    }


    const deleteModel = async (id) => {
        const { data, error } = await supabase.from('models').delete().eq('id', id)
        return handleError(error) ? error : data ? data : null
    }


    return { error, isError, getModelById, getModelsByMakeId, insertModel, deleteModel }
}