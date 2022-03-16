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




export default function VehiclePageLayout({ vehicle, related }) {
    return (
        <>
            <Navbar />
            <Box bg={'linear-gradient(90deg,#9b3e3e,#ff6d1e)'} h={1} width='full' ></Box>
            <Banner />
            <BreadcrumbContainer params={{ make: vehicle?.make, model: vehicle?.model, vehicle: vehicle?.title }} />


            <Container>
                <Grid gridGap={10} templateColumns={'repeat(12,1fr)'}>

                    <GridItem colSpan={{ base: 12, sm: 12, md: 7 }}>
                        {/* Tab Component */}
                        {vehicle.isAvailable ? <TabComponent /> : <Text fontWeight={'medium'} fontSize={'md'}>{('This Vehicle is no longer available').toUpperCase()}</Text>}


                        {/* Image Slider Component */}
                        <ImageSliderComponent vehicle={vehicle} mt={10} mb={5} />
                    </GridItem>


                    <GridItem colSpan={{ base: 12, sm: 12, md: 5 }}>
                        {/* Contact Form Component */}
                        <ContactFormComponent />
                    </GridItem>

                </Grid>


                <Grid gridGap={10} templateColumns={'repeat(12,1fr)'}>
                    <GridItem gap={5} colSpan={{ base: 12, sm: 12, md: 7 }}>
                        {/* Vehicle Information COmponent */}
                        <VehicleInfoComponent vehicle={vehicle} />


                        <VehicleSpecification vehicle={vehicle} />

                        {/* Features Component */}
                        <FeaturesComponent vehicleFeatures={vehicle.features} />
                    </GridItem>

                    <GridItem colSpan={{ base: 12, sm: 12, md: 5 }}>
                        <VStack>
                            {/* Vehicle Description Component */}
                            <DescriptionComponent />

                            <Box>
                                <Heading>Have a question?</Heading>
                                <Text>
                                    Get answers, see the car, or find a good time for a test
                                    drive. Take the next step contact us.
                                </Text>
                                <Button>Contact Us</Button>
                            </Box>
                        </VStack>
                    </GridItem>
                </Grid>

                {related.docs.length === 0
                    ? <></>
                    : <>
                        <Heading fontWeight={'medium'} fontSize={'2xl'} >You might also like</Heading>
                        <InventoryContent paginationState={related} isConstant={true} isMore={false} />
                    </>}

            </Container>


            {/* Realted Vehicle Component */}
        </>

    )
}