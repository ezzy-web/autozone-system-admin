import { Grid, GridItem, SimpleGrid, Box, Accordion, AccordionButton, AccordionItem, Heading, AccordionIcon, HStack, AccordionPanel, Text, IconButton, FormLabel } from '@chakra-ui/react'
import React from 'react'
import Navbar from '../navbar'
import VehicleCard from '../vehicle.card.container'
import BreadcrumbContainer from '../elements/Breadcrumb'

import FeatherIcon from 'feather-icons-react'
import Banner from '../elements/Banner'
import Select from 'react-select'
import InventoryContent from '../inventroy.components/InventoryContent'



export default function InventoryLayout() {

    const vehicles = [1, 1, 1, 1, 1, 1, 1, 1, 1]
    return (
        <>
            <Navbar />
            <Box bg={'linear-gradient(90deg,#9b3e3e,#ff6d1e)'} h={1} width='full' ></Box>
            <Banner />
            <BreadcrumbContainer />

            <Grid marginTop={10} templateRows={'repeat(2, 1fr)'} templateColumns={'repeat(12, 1fr)'}>

                <GridItem paddingX={2} rowSpan={2} colSpan={{ base: 12, md: 3 }} >
                    <Box position={'sticky'} top={0}>
                        <Box padding={5} bgColor={'gray.100'}>
                            <Heading size={'xxsm'} color={'gray.600'}>10 Results Found</Heading>
                        </Box>
                        <Box padding={2}>
                            <SimpleGrid minChildWidth={100}>
                                <HStack marginY={1} borderRadius={3} paddingY={1} paddingX={2} bgColor={'gray.200'} maxWidth={100} justifyContent={'space-between'} alignItems={'center'}>
                                    <Text fontSize={'sm'} isTruncated>Nissan</Text>
                                    <IconButton variant={'ghost'} size={'xs'} onClick={() => alert('Delete')} icon={<FeatherIcon size={14} icon='x' />} />
                                </HStack>
                            </SimpleGrid>
                        </Box>
                        <Box >
                            <Accordion>
                                <AccordionItem>
                                    <AccordionButton paddingY={5}>
                                        <HStack width={'full'} justifyContent={'space-between'}>
                                            <Heading size={'sm'}>
                                                Sort Inventory
                                            </Heading>

                                            <AccordionIcon />
                                        </HStack>
                                    </AccordionButton>

                                    <AccordionPanel>
                                        <Select
                                            options={[]}
                                            placeholder='Sort by'
                                            classNamePrefix="form-select-index"
                                        />
                                    </AccordionPanel>
                                </AccordionItem>
                                <AccordionItem>
                                    <AccordionButton paddingY={5}>
                                        <HStack width={'full'} justifyContent={'space-between'}>
                                            <Heading size={'sm'}>
                                                Filter Inventory
                                            </Heading>

                                            <AccordionIcon />
                                        </HStack>

                                    </AccordionButton>

                                    <AccordionPanel>
                                        <Box my={3}>
                                            <FormLabel fontSize={'xs'}>Make</FormLabel>
                                            <Select
                                                options={[]}
                                                placeholder='Make'
                                                classNamePrefix="form-select-index"
                                            />
                                        </Box>
                                        <Box my={3}>
                                            <FormLabel fontSize={'xs'}>Model</FormLabel>
                                            <Select
                                                options={[]}
                                                placeholder='Any'
                                                classNamePrefix="form-select-index"
                                            />
                                        </Box>
                                        <HStack justifyContent={'space-evenly'} width={'full'}>
                                            <Box width={'full'} my={3}>
                                                <FormLabel fontSize={'xs'}>From</FormLabel>
                                                <Select
                                                    options={[]}
                                                    placeholder='From'
                                                    classNamePrefix="form-select-index"
                                                />
                                            </Box>
                                            <Box width={'full'} my={3}>
                                                <FormLabel fontSize={'xs'}>To</FormLabel>
                                                <Select
                                                    options={[]}
                                                    placeholder='To'
                                                    classNamePrefix="form-select-index"
                                                />
                                            </Box>
                                        </HStack>

                                        <Box my={3}>
                                            <FormLabel fontSize={'xs'}>Body Type</FormLabel>
                                            <Select
                                                options={[]}
                                                placeholder='Any'
                                                classNamePrefix="form-select-index"
                                            />
                                        </Box>

                                        <Box my={3}>
                                            <FormLabel fontSize={'xs'}>Transmission</FormLabel>
                                            <Select
                                                options={[]}
                                                placeholder='Any'
                                                classNamePrefix="form-select-index"
                                            />
                                        </Box>
                                    </AccordionPanel>
                                </AccordionItem>
                            </Accordion>
                        </Box>
                    </Box>
                </GridItem>

                <GridItem rowSpan={2} colSpan={{ base: 12, md: 9 }} >
                    <InventoryContent vehicles={vehicles} />
                </GridItem>

            </Grid>
        </>

    )
}