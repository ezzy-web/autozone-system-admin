import { GridItem, Grid, Box, Text, HStack, Badge, Divider, Switch, Button, Tabs, TabList, Tab, TabPanels, TabPanel, IconButton, Input, InputGroup, InputAddon, SkeletonText, Center, Spinner } from "@chakra-ui/react";
import Dashboard from "../../../components/layouts/Dashboard";
import { useEffect, useState } from "react";
import Specifications from "../../../components/vehicle/Specifications";
import useInventory from "../../../controller/hooks/useInventory";

import { useRouter } from "next/dist/client/router";
import ImagesContainer from "../../../components/vehicle/ImagesContainer";
import Features from "../../../components/vehicle/Features";


const styles = {
    card: {
        background: 'rgba(255, 255, 255, 0.4)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        my: 5,
        p: 5
    }
}


export default function VehiclePage() {

    const router = useRouter()
    const { id } = router.query
    const [data, setData] = useState()
    const { vehicle } = useInventory(id)


    const handleVehicleUpdate = () => {
        // POST REQUEST TO UPDATE
        // setData({ ... data, updated: false }) --- IF SUCCESS
    }


    const changeData = (update) => {
        setData({ ...data, ...update, updated: true })
    }



    useEffect(() => {
        if (vehicle) {
            setData({ ...vehicle, updated: false })
        }
    }, [vehicle])


    useEffect(() => {
        window.onbeforeunload = e => {
            console.log(e)
            if (!data.updated) {
                delete e["returnValue"]
            } else {
                e.returnValue = ""
            }
        }

    }, [data])

    useEffect(() => {
        return () => {

            console.log(data)

            if (!data?.updated) {
                // Code to prompt user
            } else {
                // Code to continue
            }

        }
    }, [])




    return (
        <>
            <Dashboard page={data ? `${data.year} ${data.make} ${data.model}` : ''}>
                <Grid templateColumns={'repeat(12,1fr)'} >

                    <GridItem px={2} colSpan={{ base: 12, md: 12, lg: 5 }}>
                        <Box {...styles.card}>
                            <HStack alignItems={'center'}>
                                {data ? <Text fontWeight={'medium'} >{`${data.year} ${data.make} ${data.model}`}</Text> : <SkeletonText />}
                                {vehicle ? <Badge colorScheme={vehicle.isVisible ? 'green' : 'red'} >{vehicle.isVisible ? 'Visible' : 'Not Visible'} </Badge> : <></>}
                            </HStack>
                            <Divider my={2} />

                            <HStack fontSize={'xs'} alignItems={'center'}>
                                <Text >Stock No.</Text>
                                <Text fontWeight={'medium'} >{id}</Text>
                            </HStack>

                            <HStack fontSize={'xs'} alignItems={'center'}>
                                <Text >Current Status</Text>
                                {data ? <Text fontWeight={'medium'} >{data.isAvailable ? 'Available' : 'Sold'}</Text> : <SkeletonText />}
                            </HStack>


                            <Box my={5}>
                                <Box fontSize={'xs'}>
                                    <Text >Date Added</Text>
                                    <Text fontWeight={'medium'} >{(() => {
                                        if (!data) return ''
                                        const seconds = parseInt(data?.timeStamp?.seconds);
                                        const nanoseconds = parseInt(data?.timeStamp?.nanoseconds);
                                        var date = new Date(seconds * 1000 + nanoseconds / 1000000);

                                        return date.toLocaleString()
                                    })()}</Text>
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
                                    <Text fontWeight={'medium'} >{(() => {
                                        if (!data) return ''
                                        const seconds = parseInt(data?.lastUpdate?.seconds);
                                        const nanoseconds = parseInt(data?.lastUpdate?.nanoseconds);
                                        var date = new Date(seconds * 1000 + nanoseconds / 1000000);

                                        return date.toLocaleString()
                                    })()}</Text>
                                </Box>
                            </Box>

                            <Button onClick={handleVehicleUpdate} disabled={data ? !data.updated : true} isFullWidth size={'sm'} >Save Changes</Button>

                        </Box>
                        <Box {...styles.card}>
                            <Text fontSize={'lg'} fontWeight={'medium'}>Settings</Text>
                            <Divider my={5} />

                            <HStack fontSize={'sm'} justifyContent={'space-between'}>
                                <Box>
                                    <Text fontWeight={'medium'} >Public</Text>
                                    <Text >Make vehicle visible on website</Text>
                                </Box>
                                <Switch checked={data?.isPublic} onChange={(e) => changeData({ isPublic: e.target.checked })} colorScheme={'red'} />
                            </HStack>
                            <Divider my={2} />

                            <HStack fontSize={'sm'} justifyContent={'space-between'}>
                                <Box>
                                    <Text fontWeight={'medium'} >Featured</Text>
                                    <Text >Add a vehicle to featured list</Text>
                                </Box>
                                <Switch checked={data?.isFeatured} onChange={(e) => changeData({ isFeatured: e.target.checked })} colorScheme={'red'} />
                            </HStack>
                            <Divider my={2} />

                            <HStack fontSize={'sm'} justifyContent={'space-between'}>
                                <Box>
                                    <Text fontWeight={'medium'} >Price Public</Text>
                                    <Text >Make price public</Text>
                                </Box>
                                <Switch checked={data?.price_visible} onChange={(e) => changeData({ price_visible: e.target.checked })} colorScheme={'red'} />
                            </HStack>
                            <Divider my={2} />

                            <HStack fontSize={'sm'} justifyContent={'space-between'}>
                                <Box>
                                    <Text fontWeight={'medium'} >Change Vehicle Status</Text>
                                    <Text >Available / Sold</Text>
                                </Box>
                                <Switch checked={data?.isAvailable} onChange={(e) => changeData({ isAvailable: e.target.checked })} colorScheme={'red'} />
                            </HStack>
                            <Divider my={2} />
                        </Box>
                    </GridItem>

                    <GridItem px={2} colSpan={{ base: 12, md: 12, lg: 7 }}>
                        <Box {...styles.card} >
                            {data ?
                                <Tabs colorScheme={'red'} >
                                    <TabList>
                                        <Tab>Specifications</Tab>
                                        <Tab>Images</Tab>
                                        <Tab>Features</Tab>
                                    </TabList>

                                    <TabPanels>
                                        <TabPanel>
                                            <Specifications vehicle={data} changeData={changeData} />
                                        </TabPanel>
                                        <TabPanel>
                                            <ImagesContainer vehicle={data} changeData={changeData} />
                                        </TabPanel>
                                        <TabPanel>
                                            <Features vehicle={data} changeData={changeData} />
                                        </TabPanel>
                                    </TabPanels>
                                </Tabs>
                                : <Center p={10}><Spinner /></Center>
                            }

                        </Box>
                    </GridItem>

                </Grid>
            </Dashboard>
        </>
    )
}