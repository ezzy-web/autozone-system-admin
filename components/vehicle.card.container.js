import React from 'react'



import { Box, HStack, Text, VStack, Heading, Image, Button, IconButton } from '@chakra-ui/react'
import Link from 'next/link'
import FeatherIcon from 'feather-icons-react'

import numeral from 'numeral'


function VehicleCard({ vehicle }) {
    const href = '/inventory/vehicle/'+vehicle?.id
    const mainBoxStyle = {
        my: "10px",
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
            <Link href={href} >
                <Box overflow={'hidden'} position={'relative'}>

                    <Box {...imageBoxStyle}>
                        <Image src={ vehicle?.images ? vehicle.images.length === 0 ? "/assets/no-image.jpg" : vehicle.images[0].url : "/assets/no-image.jpg"} objectFit={'cover'} h={'110%'} />
                    </Box>


                    {vehicle?.isAvailable ? (
                        <Box {...overlayBoxStyle}>
                            <IconButton onClick={(e) => e.preventDefault()} padding={0} variant={'link'} position={'absolute'} right={2} top={3} icon={<FeatherIcon color={true ? 'white' : 'rgb(150, 61, 61)'} fill={true ? 'white' : 'rgb(150, 61, 61)'} icon={'heart'} />} />
                        </Box>
                    ) : (
                        <Box  {...overlayBoxStyle} color={'gray.200'} display='flex' justifyContent={'center'} alignItems={'center'}>
                            <Heading>Sold</Heading>
                        </Box>
                    )}

                </Box>
            </Link>
            <Box padding={2} >
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <VStack alignItems={'flex-start'} >
                        <Link href={href}>
                            <Heading lineHeight={1.5} size={'xs'} isTruncated> {vehicle?.title} </Heading>
                        </Link>
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


                <Link href={href}><Button fontSize={'14px'} width={'full'} marginTop={5} rightIcon={<FeatherIcon size={14} icon={'arrow-up-right'} />} >More Details</Button></Link>
            </Box>
        </Box>
    )
}


export default VehicleCard