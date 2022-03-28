import { Box, Button, Center, Grid, GridItem, Heading, Image, Text, VStack } from '@chakra-ui/react'
import React from 'react'
// import Banner from '../elements/Banner'
import BreadcrumbContainer from '../elements/Breadcrumb'
import Container from '../elements/Container'
import Footer from '../elements/Footer'
import Navbar from '../navbar'


// import FeatherIcon from 'feather-icons-react'
import SavedCard from '../saved.components.js/saved.card.container'

import { CookieContext } from '../../server/utils/context'

export default function SavedPageLayout({ savedVehicle }) {

    const [vehicles, setVehicles] = React.useState(savedVehicle)
    const { removeSaveVehicle } = React.useContext(CookieContext)

    const handleRemoveSaveVehicle = (id) => {
        removeSaveVehicle(id)
        const index = vehicles.filter((vehicle) => vehicle.id === id)[0]

        var savedVehicles = vehicles.slice()
        savedVehicles.splice(index, 1)

        setVehicles(savedVehicles)
    }

    return (
        <>
            <Navbar savedCount={savedVehicle.length} />
            {/* <Banner /> */}
            <BreadcrumbContainer params={{ saved: true }} />

            <Container>
                {vehicles.length === 0 ?
                    <Grid minHeight={'30vh'} templateColumns={'repeat(12, 1fr)'}>
                        <GridItem padding={5} colSpan={{ base: 12, md: 7 }} >
                            <VStack height={'full'} alignItems={'left'} justifyContent={'center'} >
                                <Heading color={'gray.700'} size={'3xl'} >Your Favourites</Heading>
                                <Text color={'gray.700'} my={3} fontWeight={'medium'} fontSize={'lg'}>
                                    Keep track of all the vehicles you like, all in one place
                                </Text>
                                {/* <List>
                                    <ListItem>
                                        <ListIcon><FeatherIcon icon={'arrow-up-right'} /></ListIcon>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod autem aut doloribus?
                                    </ListItem>

                                    <ListItem>
                                        <ListIcon><FeatherIcon icon={'arrow-up-right'} /></ListIcon>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est.
                                    </ListItem>
                                </List> */}
                                <Button my={5} size={'lg'} as={'a'} href={'/inventory'} >Explore Our Inventory</Button>
                            </VStack>
                        </GridItem>

                        <GridItem padding={5} colSpan={{ base: 12, md: 5 }} >
                            <Center>
                                <Image alt='' src='/assets/saved-bg.png' width={'90%'} />
                            </Center>
                        </GridItem>
                    </Grid>
                    : <>
                        <Text mb={10} fontWeight={'bold'} color={'gray.400'} fontSize={'sm'} >Vehicles will be removed after 15 days</Text>
                        <Box minH={'50vh'}>
                            <Grid templateColumns={'repeat(12, 1fr)'} gap={18} paddingX={2}>
                                {vehicles.map((vehicle, key)=> (
                                    <GridItem colSpan={{ base: 12, sm: 6, lg: 4 }} key={key}>
                                        <SavedCard vehicle={vehicle} removeVehicle={handleRemoveSaveVehicle} />
                                    </GridItem>
                                ))}
                            </Grid>
                        </Box>
                    </>}

            </Container>


            <Footer>

            </Footer>
        </>
    )
}