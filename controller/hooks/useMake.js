import { useState, useEffect } from 'react'

import Makes from '../../app/supabaseClient/client/useMakes'



export default function useMake() {


    const { error, isError, getMakes, insertMake, deleteMake } = Makes()
    const [makes, setMakes] = useState([])


    const handleSetMakes = async () =>  setMakes( await getMakes() )
    useEffect(() => { handleSetMakes() }, [])



    const handleAddMake = async (name) => {
        await insertMake(name)
        if (!isError) handleSetMakes()
    } 


    const handleDeleteMake = async (id) => {
        await deleteMake(id)
        if (!isError) handleSetMakes()
    }


    return { makes, handleSetMakes, handleAddMake, handleDeleteMake }
}