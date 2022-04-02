import React from 'react'
import Navbar from '../navbar'
// import Banner from '../elements/Banner'
import BreadcrumbContainer from '../elements/Breadcrumb'

import { Box, Button, Grid, GridItem, Heading, VStack, Text } from '@chakra-ui/react'
import TabComponent from '../vehicle.components/TabComponent'
import ImageSliderComponent from '../vehicle.components/ImageSliderComponent'
import ContactFormComponent from '../vehicle.components/ContactFormComponent'
import VehicleInfoComponent from '../vehicle.components/VehicleInfoComponent'
import FeaturesComponent from '../vehicle.components/FeaturesComponent'
import DescriptionComponent from '../vehicle.components/DescriptionComponent'
import VehicleSpecification from '../vehicle.components/VehicleSpecification'
import InventoryContent from '../inventory.components/InventoryContent'
import Footer from '../elements/Footer'

import { getSavedVehicleFromCookie } from '../../server/utils/lib'


export default function VehiclePageLayout({ vehicle, related, cookies }) {
    return (
        <>
            <Navbar savedCount={getSavedVehicleFromCookie(cookies).length} />
            {/* <Banner /> */}
            <BreadcrumbContainer params={{ make: vehicle?.make, model: vehicle?.model, vehicle: vehicle?.title }} />


            <Grid px={{ base: 2, lg: 50 }} templateColumns={'repeat(12,1fr)'}>

                <GridItem padding={{ base: 0, lg: 5 }} colSpan={{ base: 12, md: 12, lg: 7 }}>
                    {/* Tab Component */}
                    {vehicle.isAvailable ? <TabComponent paddingTop={5} vehicle={vehicle} /> : <Text fontWeight={'medium'} fontSize={'md'}>{('Not available').toUpperCase()}</Text>}


                    {/* Image Slider Component */}
                    <ImageSliderComponent vehicle={vehicle} mt={5} mb={5} />

                    {/* Vehicle Information Component */}
                    <VehicleInfoComponent vehicle={vehicle} mb={5} />
                </GridItem>


                <GridItem paddingX={{ base: 0, lg: 10 }} colSpan={{ base: 12, md: 12, lg: 5 }}>
                    {/* Contact Form Component */}
                    <ContactFormComponent vehicle={vehicle} />
                </GridItem>

            </Grid>


            <Box mb={10} px={{ base: 2, lg: 50 }}>
                <Grid templateColumns={'repeat(12,1fr)'}>
                    <GridItem colSpan={{ base: 12, md: 12, lg: 7 }}>



                        <VehicleSpecification vehicle={vehicle} my={5} />

                        {/* Features Component */}
                        <FeaturesComponent vehicleFeatures={vehicle.features} my={5} />
                    </GridItem>

                    <GridItem colSpan={{ base: 12, md: 12, lg: 5 }}>
                        <VStack padding={{ base: 0, lg: 5 }}>
                            {/* Vehicle Description Component */}
                            <DescriptionComponent />

                            <Box my={5}>
                                <Heading>Have a question?</Heading>
                                <Text>
                                    Get answers, see the car, or find a good time for a test
                                    drive. Take the next step contact us.
                                </Text>
                                <Button borderRadius={2} colorScheme={'red'} as={'a'} href={'/contact'} my={5}>Contact Us</Button>
                            </Box>
                        </VStack>
                    </GridItem>
                </Grid>



                {related.docs.length === 0
                    ? <></>
                    : <>
                        <Heading mt={10} fontWeight={'medium'} fontSize={'2xl'} >You might also like</Heading>
                        <InventoryContent paginationState={related} isConstant={true} isMore={false} />
                    </>}

            </Box>
            <Footer />
        </>

    )
}