import React from 'react'

import { Box, Button, Divider, FormControl, FormLabel, Grid, GridItem, Heading, HStack, Input, Text } from "@chakra-ui/react";
import FeatherIcon from 'feather-icons-react'
import { useDisclosure } from "@chakra-ui/react";
import ModalContainer from '../../Modal';

import Select from 'react-select'

import { useForm, Controller } from "react-hook-form";


const styles = {
    labels: {
        fontSize: 'xs'
    },

    input: {
        variant: 'filled',
        size: 'md',
        borderRadius: 0,
        bg: '#b2b2b2',
        color: 'white',
        classNamePrefix: 'form-select-admin',
        _placeholder: { color: '#e1e1e1' },
        _focus: { bg: 'white', _placeholder: { color: '#b2b2b2' }, color: 'black' }
    }
}


export default function NewVehicleForm() {
    const { isOpen, onClose, onOpen } = useDisclosure()
    const modalToggle = React.useRef()



    const { handleSubmit, control } = useForm()



    return (
        <>

            <Button ref={modalToggle} onClick={onOpen} size={'sm'} borderRadius={'full'} colorScheme={'red'} variant={'ghost'}>
                <HStack>
                    <FeatherIcon size={16} icon={'plus'} />
                    <Text>Add to Inventory</Text>
                </HStack>
            </Button>

            <ModalContainer size={'xl'} isOpen={isOpen} onClose={onClose} toggleRef={modalToggle} 
                maxH={'80vh'} overflowY={'scroll'} wrapper={'form'}
                onSubmit={(e) => { e.preventDefault(); alert('Vehicle') }}
                header={() => (
                    <Heading mt={5} size={'lg'} color={'red.700'}>
                        Register New Vehicle
                    </Heading>
                )}
                body={() => (
                    <Box pt={5} pb={58}>
                        <HStack my={5}>
                            <Controller
                                name='make'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Make</FormLabel>
                                        <Input {...styles.input} placeholder={'Make'} />
                                    </FormControl>
                                )}
                            />

                            <Controller
                                name='model'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Model</FormLabel>
                                        <Input {...styles.input} placeholder={'Model'} />
                                    </FormControl>
                                )}
                            />
                        </HStack>

                        <HStack my={5}>
                            <Controller
                                name='submodel'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Submodel</FormLabel>
                                        <Input {...styles.input} placeholder={'Submodel'} />
                                    </FormControl>
                                )}
                            />


                            <Controller
                                name='year'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Year</FormLabel>
                                        <Select {...styles.input} placeholder={'Year'} />
                                    </FormControl>
                                )}
                            />
                        </HStack>

                        <HStack my={5}>
                            <Controller
                                name='type'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Body Type</FormLabel>
                                        <Select {...styles.input} placeholder={'Body Type'} />
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='colour'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Colour</FormLabel>
                                        <Input {...styles.input} placeholder={'Colour'} />
                                    </FormControl>
                                )}
                            />
                        </HStack>


                        <HStack my={5}>
                            <Controller
                                name='location'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Current Location</FormLabel>
                                        <Select {...styles.input} placeholder={'Current Location'} />
                                    </FormControl>
                                )}
                            />

                            <Controller
                                name='arrival'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Arrival Date</FormLabel>
                                        <Input {...styles.input} type={'date'} />
                                    </FormControl>
                                )}
                            />
                        </HStack>


                        <HStack my={5}>
                            <Controller
                                name='engine_no'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Engine No.</FormLabel>
                                        <Input {...styles.input} placeholder={'Engine No.'} />
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='chassis'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Chassis No.</FormLabel>
                                        <Input {...styles.input} placeholder={'Chassis No.'} />
                                    </FormControl>
                                )}
                            />
                        </HStack>

                        <Box my={5}>
                            <Controller
                                name='history'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>History</FormLabel>
                                        <Select {...styles.input} placeholder={'History'} />
                                    </FormControl>
                                )}
                            />
                        </Box>


                        <HStack my={5}>
                            <Controller
                                name='mileage'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Mileage</FormLabel>
                                        <Input {...styles.input} placeholder={'Mileage (Optional)'} type={'number'} />
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='engine_size'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Engine Size</FormLabel>
                                        <Input {...styles.input} placeholder={'Engine Size'} type={'number'} />
                                    </FormControl>
                                )}
                            />
                        </HStack>


                        <HStack my={5}>
                            <Controller
                                name='price'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Asking Price</FormLabel>
                                        <Input {...styles.input} placeholder={'$0,0.00'} type={'number'} />
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='price'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels}>Price Condition</FormLabel>
                                        <Select {...styles.input} placeholder={'Price Condition'} />
                                    </FormControl>
                                )}
                            />
                        </HStack>

                    </Box>
                )}
                footer={() => (

                    <HStack spacing={10} justifyContent={'end'}>
                        <Button onClick={onClose} size={'sm'} variant={'link'}>Cancel</Button>
                        <Button type='submit' px={8} size={'md'} colorScheme={'red'} borderRadius={10} variant={'ghost'}>Submit Vehicle</Button>
                    </HStack>

                )}
            />



        </>
    )
}