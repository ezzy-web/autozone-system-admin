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

            <Box position={"relative"} w="100%" height={"fit-content"}>
                <Box zIndex={'overlay'} bg="rgba(0, 0, 0, 0.634)" w="full" >
                    <Navbar light={true} savedCount={saved.length} />
                    <Box pb={20}>
                        <Box height={'full'} paddingY={{ base: 30, lg: 30 }} >
                            <Heading textColor={"white"} align="center" fontSize={{ base: '200%', lg: '4xl' }}>Search Inventory</Heading>

                            <Stack pt={2} px={{ base: 30, lg: 150 }}>
                                <Box overflow="hidden" height={30} mb={5} align="center" ><Typed strings={typedStrings} typeSpeed={50} backSpeed={60} loop><Heading textColor={"white"} fontSize={'160%'} /></Typed></Box>
                                <QuickSearchForm makes={makes} />
                            </Stack>
                        </Box>
                    </Box>
                </Box>
                <HStack zIndex={'hide'} position={'absolute'} top={0} bottom={0} left={0} right={0} justifyContent={'center'} alignItems={'center'}>
                    <Box width={'100vw'} height='full' bgImage={`url('/assets/bg.webp')`} bgSize='cover' bgPosition={'center'} />
                </HStack>
            </Box>



            <Container>
                <Tabs>
                    <TabList>
                        <Tab _focus={{ boxShadow: 'none', outline: 'none' }} fontSize={'90%'} >Search Inventory</Tab>
                        <Tab _focus={{ boxShadow: 'none', outline: 'none' }} fontSize={'90%'} >Featured Vehicles</Tab>
                        <Tab _focus={{ boxShadow: 'none', outline: 'none' }} fontSize={'90%'}>New Arrivals</Tab>
                    </TabList>

                    <TabPanels padding={0} mt={10}>
                        <TabPanel>
                            <Heading mb={10} size="md">Search Our Inventory</Heading>

                            <SearchInventoryForm makes={makes} />
                        </TabPanel>
                        <TabPanel padding={0}>
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Heading px={5} mb={10} size="md">Featured Vehicles</Heading>
                                <Button href={'/inventory/query?featured=true'} as={'a'} variant={'link'}>See All</Button>
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

            {recents ? (
                <Box bg="whitesmoke">
                    <Container>
                        <Heading mb={10} size="md">Recently Viewed</Heading>
                        <Slider isResponsive={true} data={recents} renderItem={({ item }) => <RecentlyVisited recents={item} />} />
                    </Container>
                </Box>
            ) : (<></>)}

            <Container>
                <Heading mb={10} size="md">Search by type</Heading>

                <Box pt={15}>
                    <BodyTypes />
                </Box>
            </Container>




            <Box bg={'whitesmoke'} boxShadow={'inset 1px 1px 39px -10px rgba(0, 0, 0, 0.4)'}>
                <AboutUsContainer />
            </Box>
            <Footer />
        </>
    );
}

export default HomeLayout;