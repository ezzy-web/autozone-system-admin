import React from 'react'
import { doc, setDoc, addDoc, collection, getDocs, updateDoc } from 'firebase/firestore'
import { firestore } from '../../app/config/client.config'

// makes := { ref, name, id }
// models := { ref, id, name, make_ref, make_id }

const useMakeModels = () => {
    const [makes, setMakes] = React.useState([])
    const [models, setModels] = React.useState([])

    const addMake = async (name) => {
        addDoc(collection(firestore, 'Makes'), { name })
                .then(response => console.log(response))
                .catch(error => console.log(error))

    }

    const addModel = async (name, make_ref) => {
        addDoc(collection(firestore, 'Models'), { make_ref, name })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }


    const removeMake = async (make) => {

    }


    const removeModel = async (model) => {

    }


    const editMake = async (ref, name) => {
        updateDoc(ref, { name })
        .then( res => console.log(res))
        .catch( err => console.log(err))
    }


    const editModel = async (ref, name) => {
        updateDoc(ref, { name })
        .then( res => console.log(res))
        .catch( err => console.log(err))
    }



    const getModels = (make_id) => {
        return models.filter( model => model.make_ref.id === make_id )
    }




    const generateModels = () => {
        getDocs(collection(firestore, 'Models'))
        .then(snapshot => {
            const models = snapshot.docs.map(doc => ({ ... doc.data(), ref: doc.ref, id: doc.id }))
            setModels(models)
        })
    }

    const generateMakes = () => {
        getDocs(collection(firestore, 'Makes'))
        .then( snapshot => {
            const makes = snapshot.docs.map(doc => ({ ... doc.data(), ref: doc.ref, id: doc.id }) )
            setMakes(makes)
        })
        .catch( err => console.log(err))
    }



    React.useEffect(() => {
        // Code to get makes

        generateMakes()
        generateModels()


    }, [])

    return { makes, models, getModels, addMake, addModel }
}


export default useMakeModels