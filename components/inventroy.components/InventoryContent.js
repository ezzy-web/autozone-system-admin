import React from 'react'
import InfiniteScroll from "react-infinite-scroll-component";
import { Heading, Spinner, HStack, VStack, Grid, GridItem } from '@chakra-ui/react';
import VehicleCard from '../vehicle.card.container';


export default function InventoryContent({ vehicles: data, isMore, isConstant }) {
    const [vehicles, setVehicles] = React.useState(data)
    const [hasMore, setHasMore] = React.useState(isMore)

    const getMoreVehicles = async () => {
        // Get Vehicles
        const newVehicles = [1, 2, 3]
        setVehicles((vehicles) => [...vehicles, ...newVehicles])
    }


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
                    <Grid templateColumns={'repeat(12, 1fr)'}  gap={18} paddingX={10}>

                        {vehicles.map((vehicle, key) => {
                            return (
                                <GridItem colSpan={{ base: 12, md: 6, lg: 4 }} key={key}>
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