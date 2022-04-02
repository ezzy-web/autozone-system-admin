import React from 'react'
import { Box, HStack, Heading, Text, VStack, Badge } from '@chakra-ui/react'
import numeral from 'numeral'


export default function VehicleInfoComponent({ vehicle, ...props }) {
    return (
        <Box {...props}>
            <HStack alignItems={'center'} justifyContent={'space-between'}>
                <VStack justifyContent={'start'} alignItems={'start'}>
                    <Text color={'gray.400'}>{vehicle?.history}</Text>
                    <Heading lineHeight={1} size={'md'}>{vehicle?.title}</Heading>
                    <Text color={'gray.400'}>{vehicle?.submodel}</Text>
                </VStack>
            </HStack>

            {vehicle.mileage && vehicle.mileage != 'n/a' ?
                <Text fontSize={'lg'} color={'gray.600'}>{`${numeral(vehicle.mileage).format('0,0')} mi`}</Text> : <></>}

            {vehicle.isAvailable ?
                <>
                    {vehicle.price_visible ? (
                        <HStack>
                            <Text fontWeight={'medium'} fontSize={'xl'} >{numeral(vehicle.price).format('$0,0')}</Text>
                            <Badge>{vehicle?.price_cond}</Badge>
                        </HStack>
                    ) : <Text fontSize={'lg'}>Contact Us for Price</Text>}
                </>
                :
                <>
                    <Badge my={5} px={5} borderRadius={6} fontSize={'xl'} >Sold</Badge>
                </>
            }


        </Box>
    )
}