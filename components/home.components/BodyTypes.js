import React from 'react'


import { SimpleGrid, Stack, Image, Heading } from '@chakra-ui/react'
import Link from 'next/link'

function BodyTypes() {
    const stackStyle = {
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        cursor: 'pointer'
    }
    return (
        <SimpleGrid minChildWidth={150} spacing={30}>
            <Link href={{ pathname: '/inventory/query', query: { body: 'Sedan' } }}>
                <div>
                    <Stack {...stackStyle}>
                        <Image alt={'javvys autonzone sedan'} justifyContent={"center"} w="85%" src="./assets/sedan.png" />
                        <Heading mt={"20px"} align="center" size='sm'>Sedan</Heading>
                    </Stack>
                </div>
            </Link>
            <Link href={{ pathname: '/inventory/query', query: { body: 'SUV' } }}>
                <div>
                    <Stack {...stackStyle} >
                        <Image alt={'javvys autonzone suv'} justifyContent={"center"} w="85%" src="./assets/suv.png" />
                        <Heading mt={"20px"} align="center" size='sm'>SUV</Heading>
                    </Stack>
                </div>
            </Link>
            <Link href={{ pathname: '/inventory/query', query: { body: 'Hatchback' } }}>
                <div>
                    <Stack {...stackStyle} >
                        <Image alt={'javvys autonzone hatch'} w="85%" src="./assets/hatch.png" />
                        <Heading mt={"20px"} align="center" size='sm'>Hatchback</Heading>
                    </Stack>
                </div>
            </Link>
            <Link href={{ pathname: '/inventory/query', query: { body: 'Pickup' } }}>
                <div>
                    <Stack {...stackStyle} >
                        <Image alt={'javvys autonzone pickup'} justifyContent={"center"} w="85%" src="./assets/pick-up.png" />
                        <Heading mt={"20px"} align="center" size='sm'>Pick-up</Heading>
                    </Stack>
                </div>
            </Link>
        </SimpleGrid>
    )
}


export default BodyTypes