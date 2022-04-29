import React from 'react'

import { Box, Button, Divider, Grid, GridItem, Heading, HStack, Input, Select, Text } from "@chakra-ui/react";
import FeatherIcon from 'feather-icons-react'
import { useDisclosure } from "@chakra-ui/react";
import ModalContainer from '../../Modal';


export default function NewVehicleForm() {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const modalToggle = React.useRef()



    return (
        <>

            <Button ref={modalToggle} onClick={onOpen} size={'sm'} borderRadius={'full'} colorScheme={'red'} variant={'ghost'}>
                <HStack>
                    <FeatherIcon size={16} icon={'plus'} />
                    <Text>Add to Inventory</Text>
                </HStack>
            </Button>

            <ModalContainer size={'lg'} isOpen={isOpen} onClose={onClose} toggleRef={modalToggle}>
                <Box h={'85vh'} overflowY={'scroll'} >
                    <Heading mt={5} size={'lg'} color={'red.700'}>
                        Register New Vehicle
                    </Heading>


                    <Box py={10}>
                        <form>

                                <Box>

                                    <Text mt={10} fontSize={'sm'} fontWeight={'medium'}>Vehicle Description</Text>
                                    <Divider mb={10} />


                                    <HStack>
                                        <Input />
                                        <Input />
                                    </HStack>

                                    <HStack>
                                        <Input />
                                        <Select />
                                    </HStack>


                                    <HStack>
                                        <Select />
                                        <Input />
                                    </HStack>


                                    <HStack>
                                        <Select />
                                        <Input type={'date'} />
                                    </HStack>


                                    <Text mt={10} fontSize={'sm'} fontWeight={'medium'}>Vehicle Information</Text>
                                    <Divider mb={10} />


                                    <HStack>
                                        <Input />
                                        <Input />
                                    </HStack>


                                    <Select />

                                    <Text mt={10} fontSize={'sm'} fontWeight={'medium'}>Vehicle Pricing</Text>
                                    <Divider mb={10} />

                                    <HStack>
                                        <Input />
                                        <Input />
                                    </HStack>


                                    <Select />


                                    <HStack>
                                        <Select />
                                    </HStack>


                                </Box>


                        </form>
                    </Box>



                    <HStack spacing={10} justifyContent={'end'}>
                        <Button onClick={onClose} size={'sm'} variant={'link'}>Cancel</Button>
                        <Button px={8} size={'md'} colorScheme={'red'} borderRadius={'full'} variant={'ghost'}>Submit Vehicle</Button>
                    </HStack>
                </Box>
            </ModalContainer>



        </>
    )
}