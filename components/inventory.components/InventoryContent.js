import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { Heading, Spinner, HStack, VStack, Grid, GridItem } from '@chakra-ui/react';
import VehicleCard from '../vehicle.card.container';

export default function InventoryContent({ paginationState, isMore, isConstant, params }) {

    const [vehicles, setVehicles] = React.useState([])
    const [hasMore, setHasMore] = React.useState(false)
    const [lastDocumentId, setLastDocument] = React.useState('')

    const getMoreVehicles = async () => {
        if (params) {

            const res = await fetch(`${window.location.origin}/api/queryInventory`, {
                method: 'POST',
                body: JSON.stringify({ lastDocumentId, query: params })
            }).catch(err => console.log(err))

            const data = await res.json().catch(err => console.log(err))
            const newVehicles = data.docs

            setLastDocument(data.lastDocumentId)
            setHasMore(data.lastDocumentId ? true : false)
            setVehicles((vehicles) => [...vehicles, ...newVehicles])
            return;
        }
        const res = await fetch(`${window.location.origin}/api/getInventory`, {
            method: 'POST',
            body: JSON.stringify({ lastDocumentId })
        }).catch(err => console.log(err))

        const data = await res.json().catch(err => console.log(err))
        const newVehicles = data.docs

        setLastDocument(data.lastDocumentId)
        setHasMore(data.lastDocumentId ? true : false)
        setVehicles((vehicles) => [...vehicles, ...newVehicles])

    }

    React.useEffect(() => {
        setVehicles(paginationState.docs)
        setHasMore(isMore)
        setLastDocument(paginationState.lastDocumentId)
    }, [paginationState])


    return (
        <>
            {vehicles.length === 0 ? (
                <VStack height={'50vh'} justifyContent={'center'} alignItems={'center'}>
                    <Heading color={'gray.400'} fontSize={'xs'}>{('No Vehicles Found').toUpperCase()}</Heading>
                </VStack>
            ) : (
                <InfiniteScroll
                    dataLength={vehicles.length}
                    next={getMoreVehicles}
                    hasMore={hasMore}
                    loader={isConstant ? <></> : <HStack paddingY={20} width={'full'} justifyContent={'center'}><Spinner size='lg' /></HStack>}
                    endMessage={isConstant ? <></> : <HStack paddingY={20} width={'full'} justifyContent={'center'}><Heading color={'gray.400'} fontSize={'xs'}>{('End of Results').toUpperCase()}</Heading></HStack>}
                >
                    <Grid templateColumns={'repeat(12, 1fr)'} gap={18} paddingX={2}>

                        {vehicles.map((vehicle, key) => {
                            return (
                                <GridItem colSpan={{ base: 12, sm: 6, lg: 4 }} key={key}>
                                    <VehicleCard vehicle={vehicle} />
                                </GridItem>
                            )
                        })}

                    </Grid>
                </InfiniteScroll>
            )}

        </>

    )
}