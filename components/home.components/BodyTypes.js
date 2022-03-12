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
            <Link href={"/"}>
                <div>
                    <Stack {...stackStyle}>
                        <Image justifyContent={"center"} w="85%" src="./assets/sedan.png" />
                        <Heading mt={"20px"} align="center" size='sm'>Sedan</Heading>
                    </Stack>
                </div>
            </Link>
            <Link href={"/"}>
                <div>
                    <Stack {...stackStyle} >
                        <Image justifyContent={"center"} w="85%" src="./assets/suv.png" />
                        <Heading mt={"20px"} align="center" size='sm'>SUV</Heading>
                    </Stack>
                </div>
            </Link>
            <Link href={"/"}>
                <div>
                    <Stack {...stackStyle} >
                        <Image w="85%" src="./assets/hatch.png" />
                        <Heading mt={"20px"} align="center" size='sm'>Hatchback</Heading>
                    </Stack>
                </div>
            </Link>
            <Link href={"/"}>
                <div>
                    <Stack {...stackStyle} >
                        <Image justifyContent={"center"} w="85%" src="./assets/pick-up.png" />
                        <Heading mt={"20px"} align="center" size='sm'>Pick-up</Heading>
                    </Stack>
                </div>
            </Link>
        </SimpleGrid>
    )
}


export default BodyTypes