import Navbar from "../navbar";
import Link from "next/link";
import React from "react";
import {
    Box, Stack, Heading,
    SimpleGrid, Image
} from "@chakra-ui/react"
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
            <Link href={"/"}>
                <div>
                    <Stack display={"flex"} justifyContent={"center"} >
                        <Image justifyContent={"center"} w="85%" src="./assets/sedan.png" />
                        <Heading mt={"20px"} align="center" size='sm'>Sedan</Heading>
                    </Stack>
                </div>
            </Link>
            <Link href={"/"}>
                <div>
                    <Stack display={"flex"} justifyContent={"center"} >
                        <Image justifyContent={"center"} w="85%" src="./assets/suv.png" />
                        <Heading mt={"20px"} align="center" size='sm'>SUV</Heading>
                    </Stack>
                </div>
            </Link>
            <Link href={"/"}>
                <div>
                    <Stack display={"flex"} justifyContent={"center"} >
                        <Image justifyContent={"center"} w="85%" src="./assets/hatch.png" />
                        <Heading mt={"20px"} align="center" size='sm'>Hatchback</Heading>
                    </Stack>
                </div>
            </Link>
            <Link href={"/"}>
                <div>
                    <Stack display={"flex"} justifyContent={"center"} >
                        <Image justifyContent={"center"} w="85%" src="./assets/pick-up.png" />
                        <Heading mt={"20px"} align="center" size='sm'>Pick-up</Heading>
                    </Stack>
                </div>
            </Link>
        </SimpleGrid>
    )
}

function HomeLayout({ recents }) {
    const typedStrings = ["Hello Me", "Hello You", "Hello World"]
    const [value, setValue] = React.useState(0)
    return (
        <>

            <Box position={"relative"} overflow={"hidden"} w="100%" height={"70vh"}>
                <Box overflow="hidden" w="100%" height="70vh">
                    Joel
                </Box>
                <Box bg="rgba(0, 0, 0, 0.534)" position="absolute" top="0" w="100%" >
                    <Navbar light={true} />
                    <Box h={"70vh"}>
                        <Stack mt={5} >
                            <Heading textColor={"white"} align="center" size='2xl'>Search Inventory</Heading>

                            <Stack pt={2} px={{ base: 30, md: 150 }}>
                                <Box overflow="hidden" height={30} mb={5} align="center" ><Typed strings={typedStrings} typeSpeed={50} backSpeed={60} loop><Heading textColor={"white"} size="lg" /></Typed></Box>
                                <QuickSearchForm />
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Box>


            <Container>
                <Heading mb={10} size="md">Search by type</Heading>

                <Box pt={15}>
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
                {/* <Tabs value={value} onChange={(e) => console.log(e)} aria-label="basic tabs example">
                    <Tab label="Search Inventory" />
                    <Tab label="New Arrivals" />
                    <Tab label="Featured Vehicles" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Heading my={10} size="md">Search Inventory</Heading>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Heading my={10} size="md">Search Inventory</Heading>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Heading my={10} size="md">Search Inventory</Heading>
                </TabPanel> */}

            </Container>
















        </>
    );
}

export default HomeLayout;