import { useState } from "react";
import { supabaseClient as supabase } from ".";



export default function Makes() {

    const [isError, setIsError] = useState(false)
    const [error, setError] = useState()


    const handleError = (error) => {
        if (error) {
            setIsError(true)
            setError(error)
            return true
        }

        setError(false)
        return false
    }

    const getMakes = async () => {
        const { data, error } = await supabase.from('makes').select('*')
        return handleError(error) ? [] : data ? data : []
    }

    const getMakeByName = async (make) => {
        const { data, error } = await supabase.from('makes').select('*').eq('name', make)
        console.log(data)
        return handleError(error) ? [] : data ? data : []
    }


    const getMakeByID = async (id) => {
        const { data, error } = await supabase.from('makes').select('*').eq('id', id)
        console.log(data)
        return handleError(error) ? [] : data ? data : []
    }

    const insertMake = async (make) => {
        const { data, error } = await supabase.from('makes').insert([
            { 'name': make }
        ])
        handleError(error) ? null : data ? data : null
    }


    const deleteMake = async (id) => {
        const { data, error } = await supabase.from('makes').delete().eq('id', id)
        handleError(error)
    }

    return { error, isError, getMakes, getMakeByID, getMakeByName, insertMake, deleteMake }
}