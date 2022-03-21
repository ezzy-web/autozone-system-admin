
import React from 'react'

import { Box, HStack, Text, VStack, Heading, Image, Button } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'

import numeral from 'numeral'


export default function SavedCard({ vehicle, removeVehicle }) {
    const href = '/inventory/vehicle/' + vehicle?.id
    const mainBoxStyle = {
        my: "20px",
        boxShadow: '1px 1px 39px -10px rgba(0, 0, 0, 0.2)',
        transition: 0.5,
        borderRadius: 5,
        overflow: 'hidden',
        _hover: {
            boxShadow: '1px 1px 39px -10px rgba(0, 0, 0, 0.8)'
        }
    }

    const imageBoxStyle = {
        overflow: "hidden",
        h: { base: 275, md: 250 },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "center"
    }

    const overlayBoxStyle = {
        bg: "rgba(0, 0, 0, 0.334)",
        position: "absolute",
        top: "0",
        w: "100%",
        h: "100%",
        transition: .5,
        _hover: {
            bg: "rgba(0, 0, 0, 0.234)",
            cursor: 'pointer'
        }
    }


    return (
        <Box {...mainBoxStyle} _hover>
            <a href={href} >
                <Box overflow={'hidden'} position={'relative'}>

                    <Box {...imageBoxStyle}>
                        <Image alt={vehicle?.title} src={vehicle?.images ? vehicle.images.length === 0 ? "/assets/placeholder.gif" : vehicle.images[0].url : "/assets/no-image.jpg"} objectFit={'cover'} h={'120%'} />
                    </Box>


                    {vehicle?.isAvailable ? (
                        <Box {...overlayBoxStyle}></Box>
                    ) : (
                        <Box  {...overlayBoxStyle} color={'gray.200'} display='flex' justifyContent={'center'} alignItems={'center'}>
                            <Heading>Sold</Heading>
                        </Box>
                    )}

                </Box>
            </a>
            <Box padding={2} >
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <VStack alignItems={'flex-start'} >
                        <a href={href}>
                            <Heading lineHeight={1.5} size={'xs'} isTruncated> {vehicle?.title} </Heading>
                        </a>
                        <HStack>
                            <Text lineHeight={1} color={'gray.500'} fontSize={'xs'} >Stock No {vehicle?.id} - {vehicle?.location} - {vehicle?.trans?.toUpperCase()}</Text>
                        </HStack>

                    </VStack>


                    <VStack overflow={'hidden'} bgColor={'yellow.400'} borderRadius={5}>
                        <Box paddingX={2} paddingY={1} width={'full'} bgColor={'gray.700'}>
                            {vehicle?.isAvailable ? (
                                <Text lineHeight={1} color={'white'} textAlign={'center'} fontSize={'12px'} >{vehicle?.price_visible ? numeral(vehicle?.price).format('$ 0,0') : 'Contact Us'}</Text>
                            ) : (
                                <Text lineHeight={1} color={'white'} textAlign={'center'} fontSize={'12px'}>SOLD</Text>
                            )}
                        </Box>
                        <Box paddingX={1} paddingBottom={1}>
                            <Text fontSize={'xs'} lineHeight={1}> {vehicle?.price_visible ? vehicle?.price_cond : ''}</Text>
                        </Box>
                    </VStack>
                </HStack>

                <HStack justifyContent={'space-evenly'} alignItems={'center'} marginTop={5}>
                    <Button as={'a'} href={href} fontSize={'14px'} width={'full'} rightIcon={<FeatherIcon size={14} icon={'arrow-up-right'} />} >More Details</Button>
                    
                    <Button paddingX={10} fontSize={'14px'} onClick={() => removeVehicle(vehicle.id)} leftIcon={<FeatherIcon size={14} icon={'x'} />}>Remove</Button>
                </HStack>

            </Box>
        </Box>
    )
}