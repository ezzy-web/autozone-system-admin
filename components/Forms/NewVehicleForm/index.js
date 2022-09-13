import React from 'react'

import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Text } from "@chakra-ui/react";
import FeatherIcon from 'feather-icons-react'
import { useDisclosure } from "@chakra-ui/react";
import ModalContainer from '../../Modal';

import Select from 'react-select'

import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from "react-hook-form";
import useRequestHandler from '../../../controller/requestHandler';
import useFeedback from '../../../controller/hooks/useFeedback';


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

const schema = yup.object().shape({
    // make: yup.string().required("This field is required"),
    // model: yup.string().required("This field is required"),
    // submodel: yup.string(),
    // year: yup.string().required("This field is required"),
    // type: yup.string().required("This field is required"),
    // colour: yup.string().required("This field is required"),
    // location: yup.string().required("This field is required"),
    // arrival: yup.string(),
    // engine_no: yup.string().required("This field is required"),
    // chassis: yup.string().required("This field is required"),
    // history: yup.string().required("This field is required"),
    // mileage: yup.string().required("This field is required"),
    // engine_size: yup.string().required("This field is required"),
    // trans: yup.string().required("This field is required"),
    // price: yup.string().required("This field is required"),
    // price_cond: yup.string().required("This field is required")
})





export default function NewVehicleForm() {
    const { POST } = useRequestHandler()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const modalToggle = React.useRef()
    const { showError, showSuccess, render } = useFeedback()



    const { handleSubmit, control, formState: { errors } } = useForm({ reValidateMode: "onChange", resolver: yupResolver(schema) })


    const handleSubmitVehicle = (data) => {
        POST('/api/vehicle', {
            data: { ...data }
        })
            .then(data => {
                showSuccess({ message: `${data.year} ${data.make} ${data.model} Successfully Added to Inventory` })
            })
            .catch(err => showError({ message: err.message }))
    }



    return (
        <>
            {render()}

            <Button ref={modalToggle} onClick={onOpen} size={'sm'} borderRadius={'full'} colorScheme={'red'} variant={'ghost'}>
                <HStack>
                    <FeatherIcon size={16} icon={'plus'} />
                    <Text>Add to Inventory</Text>
                </HStack>
            </Button>

            <ModalContainer size={'xl'} isOpen={isOpen} onClose={onClose} toggleRef={modalToggle}
                maxH={'65vh'} overflowY={'scroll'} wrapper={'form'}
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
                                        <FormLabel {...styles.labels} color={errors.make ? 'red.400' : ''} >Make</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'Make'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.make ? errors.make.message : ''}</Text>
                                    </FormControl>
                                )}
                            />

                            <Controller
                                name='model'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels} color={errors.model ? 'red.400' : ''}>Model</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'Model'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.model ? errors.model.message : ''}</Text>
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
                                        <FormLabel {...styles.labels} color={errors.submodel ? 'red.400' : ''}>Submodel</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'Submodel'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.submodel ? errors.submodel.message : ''}</Text>
                                    </FormControl>
                                )}
                            />


                            <Controller
                                name='year'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels} color={errors.year ? 'red.400' : ''}>Year</FormLabel>
                                        <Select onChange={(e) => onChange(e.value)} {...styles.input} placeholder={'Year'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.year ? errors.year.message : ''}</Text>
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
                                        <FormLabel {...styles.labels} color={errors.type ? 'red.400' : ''}>Body Type</FormLabel>
                                        <Select onChange={(e) => onChange(e.value)} {...styles.input} placeholder={'Body Type'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.type ? errors.type.message : ''}</Text>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='colour'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels} color={errors.colour ? 'red.400' : ''}>Colour</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'Colour'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.colour ? errors.colour.message : ''}</Text>
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
                                        <FormLabel {...styles.labels} color={errors.location ? 'red.400' : ''}>Current Location</FormLabel>
                                        <Select onChange={(e) => onChange(e.value)} {...styles.input} placeholder={'Current Location'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.location ? errors.locaiton?.message : ''}</Text>
                                    </FormControl>
                                )}
                            />

                            <Controller
                                name='arrival'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels} color={errors.arrival ? 'red.400' : ''}>Arrival Date</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} type={'date'} />
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
                                        <FormLabel {...styles.labels} color={errors.engine_no ? 'red.400' : ''}>Engine No.</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'Engine No.'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.engine_no ? errors.engine_no.message : ''}</Text>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='chassis'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels} color={errors.chassis ? 'red.400' : ''}>Chassis No.</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'Chassis No.'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.chassis ? errors.chassis?.message : ''}</Text>
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
                                        <FormLabel {...styles.labels} color={errors.history ? 'red.400' : ''}>History</FormLabel>
                                        <Select onChange={(e) => onChange(e.value)} {...styles.input} placeholder={'History'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.history ? errors.history?.message : ''}</Text>
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
                                        <FormLabel {...styles.labels} color={errors.mileage ? 'red.400' : ''}>Mileage</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'Mileage (Optional)'} type={'number'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.price ? errors.price?.message : ''}</Text>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='engine_size'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels} color={errors.engine_size ? 'red.400' : ''}>Engine Size</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'Engine Size'} type={'number'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.engine_size ? errors.engine_size?.message : ''}</Text>
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
                                        <FormLabel {...styles.labels} color={errors.price ? 'red.400' : ''}>Asking Price</FormLabel>
                                        <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'$0,0.00'} type={'number'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.price ? errors.price?.message : ''}</Text>
                                    </FormControl>
                                )}
                            />
                            <Controller
                                name='price_cond'
                                control={control}
                                render={({ field: { onChange } }) => (
                                    <FormControl>
                                        <FormLabel {...styles.labels} color={errors.price_cond ? 'red.400' : ''}>Price Condition</FormLabel>
                                        <Select onChange={(e) => onChange(e.value)} {...styles.input} placeholder={'Price Condition'} />
                                        <Text color={'red.400'} fontSize={'x-small'}>{errors.price_cond ? errors.price_cond?.message : ''}</Text>
                                    </FormControl>
                                )}
                            />
                        </HStack>

                    </Box>
                )}
                footer={() => (

                    <HStack spacing={10} justifyContent={'end'}>
                        <Button onClick={onClose} size={'sm'} variant={'link'}>Cancel</Button>
                        <Button onClick={handleSubmit((data) => handleSubmitVehicle(data))} px={8} size={'md'} colorScheme={'red'} borderRadius={10} variant={'ghost'}>Submit Vehicle</Button>
                    </HStack>

                )}
            />



        </>
    )
}