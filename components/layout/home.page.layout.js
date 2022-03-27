import Navbar from "../navbar";
import React from "react";
import {
    Box, Stack, Heading, Tabs, TabList, TabPanel, TabPanels, Tab, HStack, Button
} from "@chakra-ui/react"
import Typed from "react-typed"

import RecentlyVisited from '../home.components/recent-vehicle-component';
import QuickSearchForm from "../home.components/QuickSearchForm";
import BodyTypes from "../home.components/BodyTypes";
import SearchInventoryForm from "../home.components/SearchInventoryForm";
import Container from "../elements/Container";
import Slider from "../elements/Slider";
import Footer from "../elements/Footer";
import AboutUsContainer from "../home.components/AboutUsContainer";


function HomeLayout({ recents, newArrival, featured, makes, saved }) {
    const typedStrings = ["Superior Quality", "Supreme Service", "Great Deals"]
    return (
        <>

            <Box position={"relative"} overflow={"hidden"} w="100%" height={"fit-content"}>
                <Box display={'flex'} justifyContent={'center'} alignItems={'center'} overflow="hidden" w="100%" h={'70vh'}>
                    <Box width={'100vw'} height='full' bgImage={`url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=983&q=80')`} bgSize='cover' bgPosition={'center'} />
                </Box>
                <Box bg="rgba(0, 0, 0, 0.634)" position="absolute" top={0} w="100%" >
                    <Navbar light={true} savedCount={saved.length} />
                    <Box h={'70vh'}>
                        <Box height={'full'} paddingY={{ base: 30, md: 30 }} >
                            <Heading textColor={"white"} align="center" fontSize={{ base: '200%', md: '3xl' }}>Search Inventory</Heading>

                            <Stack pt={2} px={{ base: 30, md: 150 }}>
                                <Box overflow="hidden" height={30} mb={5} align="center" ><Typed strings={typedStrings} typeSpeed={50} backSpeed={60} loop><Heading textColor={"white"} fontSize={'100%'} /></Typed></Box>
                                <QuickSearchForm makes={makes} />
                            </Stack>
                        </Box>
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
                        <Tab _focus={{boxShadow: 'none', outline: 'none'}} fontSize={'90%'} >Search Inventory</Tab>
                        <Tab _focus={{boxShadow: 'none', outline: 'none'}} fontSize={'90%'} >Featured Vehicles</Tab>
                        <Tab _focus={{boxShadow: 'none', outline: 'none'}} fontSize={'90%'}>New Arrivals</Tab>
                    </TabList>

                    <TabPanels padding={0} mt={10}>
                        <TabPanel>
                            <Heading mb={10} size="md">Search Our Inventory</Heading>

                            <SearchInventoryForm makes={makes} />
                        </TabPanel>
                        <TabPanel padding={0}>
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Heading px={5} mb={10} size="md">Featured Vehicles</Heading>
                                <Button  href={'/inventory/query?featured=true'} as={'a'} variant={'link'}>See All</Button>
                            </HStack>

                            {featured}
                        </TabPanel>
                        <TabPanel padding={0}>
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Heading px={5} mb={10} size="md">New Arrivals</Heading>
                                <Button href={'/inventory/query?newArrival=true'} as={'a'} variant={'link'}>See All</Button>
                            </HStack>


                            {newArrival}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Container>

            <Box bg={'whitesmoke'} boxShadow={'inset 1px 1px 39px -10px rgba(0, 0, 0, 0.4)'}>
                <AboutUsContainer />
            </Box>
            <Footer />
        </>
    );
}

export default HomeLayout;