import { Box, Center, Grid, GridItem, Heading, Image, List, ListIcon, ListItem, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import Banner from '../elements/Banner'
import BreadcrumbContainer from '../elements/Breadcrumb'
import Container from '../elements/Container'
import Footer from '../elements/Footer'
import Navbar from '../navbar'


import FeatherIcon from 'feather-icons-react'



export default function SavedPageLayout({ savedVehicle }) {
    return (
        <>
            <Navbar />
            <Banner />
            <BreadcrumbContainer params={{ saved: true }} />

            <Container>
                {savedVehicle.length === 0 ?
                    <Grid gap={5} minHeight={'30vh'} templateColumns={'repeat(12, 1fr)'}>
                        <GridItem colSpan={{ base: 12, md: 7 }} >
                            <VStack height={'full'} alignItems={'left'} justifyContent={'center'} >
                                <Heading color={'gray.700'} size={'3xl'} >Saved Cars</Heading>
                                <Text color={'gray.700'} my={3} fontWeight={'medium'} fontSize={'lg'}>
                                    Keep track of all the vehicles you like, all in one place
                                </Text>
                                <List>
                                    <ListItem>
                                        <ListIcon><FeatherIcon icon={'arrow-up-right'} /></ListIcon>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod autem aut doloribus?
                                    </ListItem>

                                    <ListItem>
                                        <ListIcon><FeatherIcon icon={'arrow-up-right'} /></ListIcon>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Est.
                                    </ListItem>
                                </List>
                            </VStack>
                        </GridItem>

                        <GridItem colSpan={{ base: 12, md: 5 }} >
                            <Center>
                                <Image src='/assets/saved-bg.png' width={'90%'} />
                            </Center>
                        </GridItem>
                    </Grid>
                    : <></>}

            </Container>


            <Footer>

            </Footer>
        </>
    )
}