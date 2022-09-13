import { useState, useEffect } from 'react'
import { collection, getDocs, getDoc, doc, onSnapshot, query } from 'firebase/firestore'
import { firestore } from '../../app/config/client.config'
import Link from 'next/link'
import { Text } from '@chakra-ui/react'




const useInventory = (id) => {

    const [inventory, setInventory] = useState()
    const [vehicle, setVehicle] = useState()

    const [allowRefresh, setAllowRefresh] = useState(false)
    const [refreshSnapshot, setRefreshSnapshot] = useState()

    const columns = [
        {
            name: 'Stock No',
            selector: (row) => <Link passHref href={`/inventory/vehicle/${row.id}`} ><Text fontWeight={'medium'} cursor={'pointer'} as={'a'} >{row.id}</Text></Link>

        },

        {
            name: 'Vehicle Title',
            selector: (row) => <Link passHref href={`/inventory/vehicle/${row.id}`} ><Text fontWeight={'medium'} cursor={'pointer'} color={'red.500'} as={'a'} >{`${row.year} ${row.make} ${row.model}`}</Text></Link>
        },

        {
            name: 'Current Status',
            selector: (row) => row.isAvailable ? 'Available' : 'Sold'
        },

        {
            name: 'Last Updated',
            selector: (row) => {
                const seconds = parseInt(row.lastUpdate.seconds);
                const nanoseconds = parseInt(row.lastUpdate.nanoseconds);
                var date = new Date(seconds * 1000 + nanoseconds / 1000000);

                return date.toLocaleString()
            }
        },


    ]



    const handleSetInventory = () => {
        getDocs(collection(firestore, 'Inventory'))
            .then(snapshot => {
                const docs = snapshot.docs
                setInventory(docs.map(doc => ({ ...doc.data(), id: doc.id })))
            })
            .catch(err => console.err(err))
    }


    const handleGetVehicle = () => {
        getDoc(doc(firestore, `Inventory/${id}`))
            .then(snap => {
                setVehicle({ ...snap.data(), id: snap.id })
            })
            .catch(err => console.log(err))
    }

    const handleRefresh = () => {
        if (refreshSnapshot) {
            setInventory(refreshSnapshot.map(doc => ({ ...doc.data(), id: doc.id })))
            setAllowRefresh(false)
            setRefreshSnapshot(null)
        } else {
            allowRefresh(false)
        }
    }

    const listenForInventoryUpdates = () => {
        onSnapshot(collection(firestore, 'Inventory'), querySnapshot => {
            setRefreshSnapshot(querySnapshot.docs)
            setAllowRefresh(true)
        })
    }

    const listenForVehicleUpdates = () => {
        onSnapshot(doc(firestore, `Inventory/${id}`), snapshot => {
            setVehicle({ ...snapshot.data(), id: snapshot.id })
        })
    }

    useEffect(() => {
        if (id) {
            handleGetVehicle()
            listenForInventoryUpdates()
        } else {
            handleSetInventory()
            listenForVehicleUpdates()
        }
    }, [id])




    return {
        columns,
        inventory,
        vehicle,
        allowRefresh,
        handleRefresh
    }
}


export default useInventory