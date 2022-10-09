import React from 'react';

import { Box, Text, InputGroup, Divider, Grid, GridItem, Menu, MenuButton, HStack, MenuList, Input, InputAddon, IconButton, MenuItem, MenuDivider, Button } from '@chakra-ui/react';

import TextInput from '../assets/TextInput';
import FeatherIcon from 'feather-icons-react'

import numeral from 'numeral';
import Select from 'react-select'

import { options } from '../Forms/options'
import MakeModelInput from '../assets/MakeModellnput';



const models = []

export default function Specifications({ vehicle, changeData }) {

    const [val, setVal] = React.useState('')

    return (
        <Box mt={10}>
            <Text fontWeight={'medium'} textTransform={'uppercase'} >Vehicle Description</Text>
            <Divider mb={10} />

            <MakeModelInput selectedMake={vehicle.make} selectedModel={vehicle.model} />

            <Divider my={3} />

            <Grid templateColumns={"repeat(2,1fr)"}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <TextInput label={"Submodel"} value={vehicle.submodel} onChange={(e) => changeData({ submodel: e.target.value })} />
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Box my={3}>
                        <Text py={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Year</Text>
                        <InputGroup my={2}>
                            <Select styles={{ width: "100% !important" }} placeholder={vehicle.year} options={options().year} classNamePrefix='javvys-admin' onChange={e => changeData({ year: e.value })} />
                        </InputGroup>
                    </Box>
                </GridItem>
            </Grid>
            <Divider my={3} />

            <Grid templateColumns={"repeat(2,1fr)"}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Box my={3}>
                        <Text py={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Body Type</Text>
                        <InputGroup my={2}>
                            <Select options={options().type} placeholder={vehicle.type} classNamePrefix='javvys-admin' onChange={e => changeData({ type: e.value })} />
                        </InputGroup>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <TextInput label={"Colour"} value={vehicle.color} onChange={(e) => changeData({ color: e.target.value })} />
                </GridItem>
            </Grid>
            <Divider my={3} />

            <Grid templateColumns={"repeat(2,1fr)"}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <TextInput label={"Chassis Number"} value={vehicle.chassis} onChange={(e) => changeData({ chassis: e.target.value })} />
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <TextInput label={"Engine Number"} value={vehicle.engine_no} onChange={(e) => changeData({ engine_no: e.target.value })} />
                </GridItem>
            </Grid>
            <Divider my={3} />

            <Grid templateColumns={"repeat(2,1fr)"}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <TextInput label={"Engine Size"} value={vehicle.engine_size} onChange={(e) => changeData({ engine_size: e.target.value })} />
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <TextInput label={"Mileage"} value={vehicle.mileage} onChange={(e) => changeData({ mileage: e.target.value })} />
                </GridItem>
            </Grid>
            <Divider my={3} />

            <Grid templateColumns={"repeat(2,1fr)"}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Box my={3}>
                        <Text py={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Transmission</Text>
                        <InputGroup my={2}>
                            <Select classNamePrefix='javvys-admin' placeholder={vehicle.trans} options={options().trans} onChange={e => changeData({ trans: e.value })} />
                        </InputGroup>
                    </Box>
                </GridItem>
            </Grid>
            <Divider my={3} />

            <Text mt={10} fontWeight={'medium'} textTransform={'uppercase'} >Vehicle Information</Text>
            <Divider mb={10} />



            <Grid templateColumns={"repeat(2,1fr)"}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Box my={3}>
                        <Text py={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Location</Text>
                        <InputGroup my={2}>
                            <Select styles={{ width: "100%" }} placeholder={vehicle.location} classNamePrefix='javvys-admin' options={options().locations} onChange={e => changeData({ location: e.value })} />
                        </InputGroup>
                    </Box>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Box my={3}>
                        <Text py={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>History</Text>
                        <InputGroup my={2}>
                            <Select styles={{ width: "100%" }} placeholder={vehicle.history} classNamePrefix='javvys-admin' options={options().history} onChange={e => changeData({ history: e.value })} />
                        </InputGroup>
                    </Box>
                </GridItem>
            </Grid>
            <Divider my={3} />


            <Grid templateColumns={"repeat(2,1fr)"}>
                <GridItem colSpan={{ base: 2, md: 1 }}>


                    <TextInput
                        label={"Arrival Date"}

                        value={() => {
                            const date = new Date(vehicle.arrival)
                            return `${date.getFullYear()}-${date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`}-${date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`}`
                        }}

                        onChange={(e) => changeData({
                            arrival: (() => {
                                const dateSections = e.target.value.split('-')
                                const date = new Date()
                                date.setDate(dateSections[2])
                                date.setMonth(dateSections[1])
                                date.setFullYear(dateSections[0])
                                return date.getTime()
                            })()
                        })}

                        type={"date"}

                    />

                </GridItem>
            </Grid>
            <Divider my={3} />



            <Text mt={10} fontWeight={'medium'} textTransform={'uppercase'} >Pricing Information</Text>
            <Divider mb={10} />


            <Grid templateColumns={"repeat(2,1fr)"}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <TextInput label={`Asking Price ${numeral(vehicle.price).format('$0,0.00')}`} value={vehicle.price} onChange={(e) => changeData({ price: e.target.value })} />
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Box my={3}>
                        <Text py={2} lineHeight={'10px'} fontWeight={'medium'} fontSize={'xs'}>Price Condition</Text>
                        <InputGroup my={2}>
                            <Select classNamePrefix='javvys-admin' placeholder={vehicle.condition} options={options().condition} onChange={e => changeData({ price_cond: e.value })} />
                        </InputGroup>
                    </Box>
                </GridItem>
            </Grid>



        </Box>

    );
}
