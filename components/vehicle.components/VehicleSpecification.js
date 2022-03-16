import React from 'react'
import { Box, Divider, Grid, GridItem, Heading, HStack, Text } from '@chakra-ui/react'
import { Carousel } from 'react-bootstrap'
import numeral from 'numeral'


export default function VehicleSpecification({ vehicle, ...props }) {
    const cardStyle = {
        my: "10px",
        paddingY: 8,
        paddingX: 10,
        boxShadow: '1px 1px 39px -10px rgba(0, 0, 0, 0.2)',
        transition: 0.5,
        borderRadius: 5,
        overflow: 'hidden',

    }
    return (
        <Box {...props}>
            <Box {...cardStyle}>
                <Heading mb={10} fontWeight={'medium'} size={'lg'}>Specifications</Heading>

                <HStack mt={3} justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'lg'}>Year</Text>
                    <Text fontWeight={'medium'} fontSize={'lg'}>{vehicle?.year}</Text>
                </HStack>
                <Divider color={'gray.200'} my={2} />

                <HStack mt={3} justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'lg'}>Body</Text>
                    <Text fontWeight={'medium'} fontSize={'lg'}>{vehicle?.body}</Text>
                </HStack>
                <Divider color={'gray.200'} my={2} />

                <HStack mt={3} justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'lg'}>Location</Text>
                    <Text fontWeight={'medium'} fontSize={'lg'}>{vehicle?.location}</Text>
                </HStack>
                <Divider color={'gray.200'} my={2} />

                <HStack mt={3} justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'lg'}>Engine</Text>
                    <Text fontWeight={'medium'} fontSize={'lg'}>{`${numeral(vehicle.engine_size).format('0,0')} CC`}</Text>
                </HStack>
                <Divider color={'gray.200'} my={2} />

                <HStack mt={3} justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'lg'}>Transmission</Text>
                    <Text fontWeight={'medium'} fontSize={'lg'}>{vehicle?.trans}</Text>
                </HStack>
                <Divider color={'gray.200'} my={2} />

                <HStack mt={3} justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'lg'}>Mileage</Text>
                    <Text fontWeight={'medium'} fontSize={'lg'}>{`${numeral(vehicle.mileage).format('0,0')} mi`}</Text>
                </HStack>
                <Divider color={'gray.200'} my={2} />

                <HStack mt={3} justifyContent={'space-between'}>
                    <Text fontWeight={'bold'} fontSize={'lg'}>Colour</Text>
                    <Text fontWeight={'medium'} fontSize={'lg'}>{vehicle.color}</Text>
                </HStack>
                <Divider color={'gray.200'} my={2} />
            </Box>
        </Box>

    )
}