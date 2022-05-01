import { GridItem, Grid, Box, Text, HStack, Badge, Divider, Switch, Button, Tabs, TabList, Tab, TabPanels, TabPanel, IconButton, Input, InputGroup, InputAddon } from "@chakra-ui/react";
import Dashboard from "../../../components/layouts/Dashboard";
import React from "react";

import FeatherIcon from 'feather-icons-react'
import Specifications from "../../../components/vehicle/Specifications";


const styles = {
    card: {
        background: 'rgba(255, 255, 255, 0.4)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        my: 5,
        p: 5
    }
}


export default function VehiclePage() {
    return (
        <>
            <Dashboard page={'2018 Nissan Altima'}>
                <Grid templateColumns={'repeat(12,1fr)'} >
                    <GridItem px={2} colSpan={{ base: 12, md: 12, lg: 5 }}>
                        <Box {...styles.card}>
                            <HStack alignItems={'center'}>
                                <Text fontWeight={'medium'} >2018 Nissan Altima</Text>
                                <Badge colorScheme={'green'} >Visible</Badge>
                            </HStack>
                            <Divider my={2} />

                            <HStack fontSize={'xs'} alignItems={'center'}>
                                <Text >Stock No.</Text>
                                <Text fontWeight={'medium'} >5403912029</Text>
                            </HStack>

                            <HStack fontSize={'xs'} alignItems={'center'}>
                                <Text >Current Status</Text>
                                <Text fontWeight={'medium'} >Available</Text>
                            </HStack>


                            <Box my={5}>
                                <Box fontSize={'xs'}>
                                    <Text >Date Added</Text>
                                    <Text fontWeight={'medium'} >Available</Text>
                                </Box>
                                <Divider my={2} />

                                <Box fontSize={'xs'}>
                                    <Text >Added by</Text>
                                    <Text fontWeight={'medium'} >Joel Henry</Text>
                                </Box>
                                <Divider my={2} />

                                <Box fontSize={'xs'}>
                                    <Text >Last Edited by</Text>
                                    <Text fontWeight={'medium'} >Joel Henry</Text>
                                    <Text >hjoel.global@gmail.com</Text>
                                </Box>
                                <Divider my={2} />


                                <Box fontSize={'xs'}>
                                    <Text >Last Edited</Text>
                                    <Text fontWeight={'medium'} >12/23/2022</Text>
                                </Box>
                            </Box>

                            <Button isFullWidth size={'sm'} >Save Changes</Button>

                        </Box>
                        <Box {...styles.card}>
                            <Text fontSize={'lg'} fontWeight={'medium'}>Settings</Text>
                            <Divider my={5} />

                            <HStack fontSize={'sm'} justifyContent={'space-between'}>
                                <Box>
                                    <Text fontWeight={'medium'} >Public</Text>
                                    <Text >Make vehicle visible on website</Text>
                                </Box>
                                <Switch colorScheme={'red'} />
                            </HStack>
                            <Divider my={2} />

                            <HStack fontSize={'sm'} justifyContent={'space-between'}>
                                <Box>
                                    <Text fontWeight={'medium'} >Featured</Text>
                                    <Text >Add a vehicle to featured list</Text>
                                </Box>
                                <Switch colorScheme={'red'} />
                            </HStack>
                            <Divider my={2} />

                            <HStack fontSize={'sm'} justifyContent={'space-between'}>
                                <Box>
                                    <Text fontWeight={'medium'} >Price Public</Text>
                                    <Text >Make price public</Text>
                                </Box>
                                <Switch colorScheme={'red'} />
                            </HStack>
                            <Divider my={2} />

                            <HStack fontSize={'sm'} justifyContent={'space-between'}>
                                <Box>
                                    <Text fontWeight={'medium'} >Change Vehicle Status</Text>
                                    <Text >Available / Sold</Text>
                                </Box>
                                <Switch colorScheme={'red'} />
                            </HStack>
                            <Divider my={2} />
                        </Box>
                    </GridItem>

                    <GridItem px={2} colSpan={{ base: 12, md: 12, lg: 7 }}>
                        <Box {...styles.card}>
                            <Tabs colorScheme={'red'} >
                                <TabList>
                                    <Tab>Specifications</Tab>
                                    <Tab>Images</Tab>
                                    <Tab>Features</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <Specifications />
                                    </TabPanel>
                                    <TabPanel>2</TabPanel>
                                    <TabPanel>3</TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Box>
                    </GridItem>

                </Grid>
            </Dashboard>
        </>
    )
}