import Navbar from "../navbar";
import Link from "next/link";

import {
    Box, Stack, Heading,
    SimpleGrid
} from "@chakra-ui/react"

import { Tab, Tabs } from "grommet";

import Typed from "react-typed"


function Container({ children }) {
    return (<Box px={{ base: 10, md: 40 }} py={10} >{children}</Box>)
}

function QuickSearchForm() {
    return (
        <SimpleGrid minChildWidth={150} spacing={15}>
            <Box bg="tomato" height={50}></Box>
            <Box bg="tomato" height={50}></Box>
            <Box bg="tomato" height={50}></Box>
            <Box bg="tomato" height={50}></Box>
        </SimpleGrid>
    )
}


function BodyTypes() {
    return (
        <SimpleGrid minChildWidth={150} spacing={30}>
            <Link href={"/"} ><div><Box bg="tomato" height={50}></Box></div></Link>
            <Link href={"/"}><div><Box bg="tomato" height={50}></Box></div></Link>
            <Link href={"/"}><div><Box bg="tomato" height={50}></Box></div></Link>
            <Link href={"/"}><div><Box bg="tomato" height={50}></Box></div></Link>
        </SimpleGrid>
    )
}

function HomeLayout({ recents }) {
    const typedStrings = ["Hello Me", "Hello You", "Hello World"]
    return (
        <>

            <header>
                <Box bg="whitesmoke" overflow="hidden" w="100%" height="70vh">

                </Box>
                <Box position="absolute" top="0" w="100%" >
                    <Navbar />
                    <Box h={"70vh"}>
                        <Stack mt={5} >
                            <Heading align="center" size='2xl'>Search Inventory</Heading>

                            <Stack py={5} px={{ base: 30, md: 150 }}>
                                <Box overflow="hidden" height={30} my={10} align="center" ><Typed strings={typedStrings} typeSpeed={50} backSpeed={60} loop><Heading size="lg" /></Typed></Box>
                                <QuickSearchForm />
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </header>


            <Container>
                <Heading mb={10} size="md">Search by type</Heading>

                <Box >
                    <BodyTypes />
                </Box>
            </Container>

            {recents ? (
                <Box bg="whitesmoke">
                    <Container>
                        <Heading mb={10} size="md">Recently Viewed</Heading>
                        <Box>{recents}</Box>
                    </Container>

                </Box>
            ) : (<></>)}


            <Container>
                <Tabs>
                    <Tab title="Search Inventory" >
                        <Heading my={10} size="md">Search Inventory</Heading>
                    </Tab>
                    <Tab title="New Arrivals" >
                        <Heading my={10} size="md">New Arrivals</Heading>
                    </Tab>
                    <Tab title="Featured Vehicles" >
                        <Heading my={10} size="md">Featured Vehicles</Heading>
                    </Tab>
                </Tabs>
            </Container>
















        </>
    );
}

export default HomeLayout;