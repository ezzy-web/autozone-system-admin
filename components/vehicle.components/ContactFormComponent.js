import React from 'react'
import { Box, Input, Heading, FormLabel, Textarea, HStack, Divider, Button } from '@chakra-ui/react'
import Select from 'react-select'

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const options = require('../../content/select.options')


export default function ContactFormComponent() {

    const inputStyle = {
        variant: 'flushed'
    }

    const schema = {
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        reason: yup.string(),
        mobile: yup.string(),
        email: yup.string().required(),
        comment: yup.string()
    }

    const { handleSubmit, control } = useForm({ resolver: yupResolver(schema) })
    const handleContactFormSubmit = (data) => {
        console.log(data)
    }


    const cardStyle = {
        my: "10px",
        paddingY: 8,
        paddingX: 10,
        boxShadow: '1px 1px 39px -10px rgba(0, 0, 0, 0.2)',
        transition: 0.5,
        borderRadius: 5,
        overflow: 'hidden'
    }
    return (
        <Box {...cardStyle} >
            <Heading mb={10} fontWeight={'medium'} size={'lg'}>Contact Us</Heading>
            <form onSubmit={handleSubmit(data => handleContactFormSubmit(data))} >
                <Box my={2}>
                    <HStack>
                        <Box>
                            <FormLabel fontSize={'sm'} color={'gray.300'} >First Name</FormLabel>
                            <Controller
                                name='firstName'
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input {... inputStyle} value={value} placeholder='First Name' onChange={(e) => onChange(e.target.value)} />
                                )}
                            />
                        </Box>

                        <Box>
                            <FormLabel fontSize={'sm'} color={'gray.300'} >Last Name</FormLabel>
                            <Controller
                                name='lastName'
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <Input {... inputStyle} value={value} placeholder='Last Name' onChange={(e) => onChange(e.target.value)} />
                                )}
                            />
                        </Box>
                    </HStack>

                </Box>

                <Box my={2}>
                    <FormLabel fontSize={'sm'} color={'gray.300'} >Email</FormLabel>
                    <Controller
                        name='email'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input {... inputStyle} type={'email'} value={value} placeholder='yourmail@email.com' onChange={(e) => onChange(e.target.value)} />
                        )}
                    />
                </Box>

                <Box my={2}>
                    <FormLabel fontSize={'sm'} color={'gray.300'} >Mobile</FormLabel>
                    <Controller
                        name='mobile'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Input {... inputStyle} value={value} placeholder='Mobile No.' onChange={(e) => onChange(e.target.value)} />
                        )}
                    />
                </Box>

                <Box my={2}>
                    <FormLabel fontSize={'sm'} color={'gray.300'} >What would you like to know?</FormLabel>
                    <Controller
                        name='reason'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Select
                                classNamePrefix="form-select-index"
                                placeholder={'Select Reason'}
                                value={value} 
                                options={options.reasons}
                                onChange={(e) => onChange(e.value)}
                            />
                        )} />
                </Box>


                <Box my={2}>
                    <FormLabel fontSize={'sm'} color={'gray.300'} >Comment</FormLabel>
                    <Controller
                        name='comment'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Textarea {... inputStyle} value={value} placeholder='more information' onChange={(e) => onChange(e.target.value)} />
                        )}
                    />
                </Box>
                <Button type='submit' width={'full'} mt={10} >Contact Us</Button>
            </form>
        </Box>
    )
}