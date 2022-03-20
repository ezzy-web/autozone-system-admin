import React from 'react'
import Navbar from '../navbar'
import Banner from '../elements/Banner'
import BreadcrumbContainer from '../elements/Breadcrumb'
import Container from '../elements/Container'

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




export default function VehiclePageLayout({ vehicle, related }) {
    return (
        <>
            <Navbar />
            <Banner />
            <BreadcrumbContainer params={{ make: vehicle?.make, model: vehicle?.model, vehicle: vehicle?.title }} />


            <Grid px={{ base: 2, md: 40 }} templateColumns={'repeat(12,1fr)'}>

                <GridItem padding={5} colSpan={{ base: 12, sm: 12, md: 7 }}>
                    {/* Tab Component */}
                    {vehicle.isAvailable ? <TabComponent id={vehicle?.id} /> : <Text fontWeight={'medium'} fontSize={'md'}>{('Not available').toUpperCase()}</Text>}


                    {/* Image Slider Component */}
                    <ImageSliderComponent vehicle={vehicle} mt={10} mb={5} />
                </GridItem>


                <GridItem paddingX={{ base: 5, sm: 5, md: 10 }} colSpan={{ base: 12, sm: 12, md: 5 }}>
                    {/* Contact Form Component */}
                    <ContactFormComponent />
                </GridItem>

            </Grid>


            <Box px={{ base: 5, md: 40 }}>
                <Grid templateColumns={'repeat(12,1fr)'}>
                    <GridItem paddingX={5} colSpan={{ base: 12, sm: 12, md: 7 }}>
                        {/* Vehicle Information COmponent */}
                        <VehicleInfoComponent vehicle={vehicle} mb={5} />


                        <VehicleSpecification vehicle={vehicle} my={5} />

                        {/* Features Component */}
                        <FeaturesComponent vehicleFeatures={vehicle.features} my={5} />
                    </GridItem>

                    <GridItem padding={5} colSpan={{ base: 12, sm: 12, md: 5 }}>
                        <VStack>
                            {/* Vehicle Description Component */}
                            <DescriptionComponent />

                            <Box my={5}>
                                <Heading>Have a question?</Heading>
                                <Text>
                                    Get answers, see the car, or find a good time for a test
                                    drive. Take the next step contact us.
                                </Text>
                                <Button my={5}>Contact Us</Button>
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