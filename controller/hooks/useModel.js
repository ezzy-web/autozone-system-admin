import { useState, useEffect } from 'react'
import Models from '../../app/supabaseClient/client/useModels'


export default function useModel(id) {

    const { error, isError, getModelsByMakeId, insertModel, deleteModel } = Models()
    const [models, setModels] = useState([])

    const handleSetModelsByMakeId = async (id) => setModels(await getModelsByMakeId(id))
    useEffect(() => { handleSetModelsByMakeId(id) }, [])


    const handleAddModel = async (name) => {
        console.log(id, name)
        const res = await insertModel(id, name)
        console.log(res)
        if (!isError) handleSetModelsByMakeId(id)
    }


    const handleDeleteModel = async (name) => {
        await deleteModel(id, name)
        if (!isError) handleSetModelsByMakeId(id)
    }


    return { models, handleSetModelsByMakeId, handleAddModel, handleDeleteModel }
}