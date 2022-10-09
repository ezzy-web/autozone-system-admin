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
})





export default function InviteUser() {
    const { POST } = useRequestHandler()
    const { isOpen, onClose, onOpen } = useDisclosure()
    const modalToggle = React.useRef()
    const { showError, showSuccess, render } = useFeedback()



    const { handleSubmit, control, formState: { errors } } = useForm({ reValidateMode: "onChange", resolver: yupResolver(schema) })


    const handleSubmitVehicle = (data) => {
        alert('Inviting User')
    }



    return (
        <>
            {render()}

            <Button ref={modalToggle} onClick={onOpen} size={'sm'} borderRadius={'full'} colorScheme={'red'} variant={'ghost'}>
                <HStack>
                    <FeatherIcon size={16} icon={'plus'} />
                    <Text>Invite New User</Text>
                </HStack>
            </Button>

            <ModalContainer size={'xl'} isOpen={isOpen} onClose={onClose} toggleRef={modalToggle}
                maxH={'65vh'} overflowY={'scroll'} wrapper={'form'}
                onSubmit={(e) => { e.preventDefault(); alert('Vehicle') }}
                header={() => (
                    <Heading mt={5} size={'lg'} color={'red.700'}>
                        Invite New User
                    </Heading>
                )}
                body={() => (
                    <Box pt={5} pb={58}>
                        <Controller
                            name='email'
                            control={control}
                            render={({ field: { onChange } }) => (
                                <FormControl my={2}>
                                    <FormLabel {...styles.labels} color={errors.make ? 'red.400' : ''} >Email</FormLabel>
                                    <Input onChange={(e) => onChange(e.target.value)} {...styles.input} placeholder={'invite@user.mail'} />
                                    <Text color={'red.400'} fontSize={'x-small'}>{errors.make ? errors.make.message : ''}</Text>
                                </FormControl>
                            )}
                        />

                        <Controller
                            name='location'
                            control={control}
                            render={({ field: { onChange } }) => (
                                <FormControl my={2}>
                                    <FormLabel {...styles.labels} color={errors.location ? 'red.400' : ''}>Role</FormLabel>
                                    <Select onChange={(e) => onChange(e.value)} {...styles.input} placeholder={'Select Role'} />
                                    <Text color={'red.400'} fontSize={'x-small'}>{errors.location ? errors.locaiton?.message : ''}</Text>
                                </FormControl>
                            )}
                        />
                    </Box>
                )}
                footer={() => (

                    <HStack spacing={10} justifyContent={'end'}>
                        <Button onClick={onClose} size={'sm'} variant={'link'}>Cancel</Button>
                        <Button onClick={handleSubmit((data) => handleSubmitVehicle(data))} px={8} size={'md'} colorScheme={'red'} borderRadius={10} variant={'ghost'}>Invite User</Button>
                    </HStack>

                )}
            />



        </>
    )
}