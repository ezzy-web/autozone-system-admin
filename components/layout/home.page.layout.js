import Navbar from "../navbar";
import React from "react";
import {
    Box, Stack, Heading, Tabs, TabList, TabPanel, TabPanels, Tab, HStack, Button, Image, VStack
} from "@chakra-ui/react"
import Typed from "react-typed"

import RecentlyVisited from '../home.components/recent-vehicle-component';
import QuickSearchForm from "../home.components/QuickSearchForm";
import BodyTypes from "../home.components/BodyTypes";
import SearchInventoryForm from "../home.components/SearchInventoryForm";
import Container from "../elements/Container";
import Slider from "../elements/Slider";
import Footer from "../elements/Footer";


function HomeLayout({ recents, newArrival, featured, makes }) {
    const typedStrings = ["Hello Me", "Hello You", "Hello World"]
    return (
        <>

            <Box position={"relative"} overflow={"hidden"} w="100%" height={"70vh"}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} overflow="hidden" w="100%" height="70vh">
                    <Box width={'100vw'} height='full' bgImage={`url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=983&q=80')`} bgSize='cover' bgPosition={'center'} />
                </Box>
                <Box bg="rgba(0, 0, 0, 0.634)" position="absolute" top="0" w="100%" >
                    <Navbar light={true} />
                    <Box h={"70vh"}>
                        <Stack height={'full'} paddingY={{ base: 30, md: 30 }} >
                            <Heading textColor={"white"} align="center" size='2xl'>Search Inventory</Heading>

                            <Stack pt={2} px={{ base: 30, md: 150 }}>
                                <Box overflow="hidden" height={31} mb={5} align="center" ><Typed strings={typedStrings} typeSpeed={50} backSpeed={60} loop><Heading textColor={"white"} size="lg" /></Typed></Box>
                                <QuickSearchForm makes={makes} />
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
                        <Slider isResponsive={true} data={recents} renderItem={({ item }) => <RecentlyVisited recents={item} />} />
                    </Container>
                </Box>
            ) : (<></>)}


            <Container>
                <Tabs>
                    <TabList>
                        <Tab _activeStep={{ color: 'red.500' }} >Search Inventory</Tab>
                        <Tab _activeStep={{ color: 'red.500' }}>Featured Vehicles</Tab>
                        <Tab _activeStep={{ color: 'red.500' }} >New Arrivals</Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            <Heading mb={10} size="md">Search Our Inventory</Heading>

                            <SearchInventoryForm makes={makes} />
                        </TabPanel>
                        <TabPanel>
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Heading mb={10} size="md">Featured Vehicles</Heading>
                                <Button variant={'link'}>See All</Button>
                            </HStack>

                            {featured}
                        </TabPanel>
                        <TabPanel>
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Heading mb={10} size="md">New Arrivals</Heading>
                                <Button variant={'link'}>See All</Button>
                            </HStack>


                            {newArrival}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>

            <Box bg={'whitesmoke'} boxShadow={'inset 1px 1px 39px -10px rgba(0, 0, 0, 0.4)'}>
                <Container>

                </Container>
            </Box>
            <Footer />
        </>
    );
}

export default HomeLayout;