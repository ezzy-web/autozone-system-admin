
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { FormLabel, InputAddon, InputGroup, IconButton, Button, HStack, Box, Input, Text } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import usePasswordVisibilityController from '../../controller/passwordVisibilityController'


function ErrorMessage({ error }) {
    return error ? <Text fontSize={'x-small'} color={'red'}>{error.message}</Text> : <></>
}


export default function RegisterForm({ register, isLoading }) {


    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().required()
    })


    const { handleSubmit, control, formState: { errors } } = useForm({ reValidateMode: 'onChange', resolver: yupResolver(schema) })
    const { togglePasswordVisibility, iconAttr, inputAttr } = usePasswordVisibilityController()



    return (
        <form onSubmit={handleSubmit( data => register(data) )}>

            <Box my={5}>
                <Controller
                    name='firstName'
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <FormLabel>First Name</FormLabel>
                            <InputGroup>
                                <Input
                                    disabled={isLoading}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder={'First Name'}
                                    borderRadius={'full'}
                                    variant={'flushed'}
                                    pl={2}
                                />
                            </InputGroup>
                            <ErrorMessage error={errors?.firstName} />
                        </>

                    )}
                />
            </Box>

            <Box my={5}>
                <Controller
                    name='lastName'
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <FormLabel>Last Name</FormLabel>
                            <InputGroup>
                                <Input
                                    disabled={isLoading}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder={'Last Name'}
                                    borderRadius={'full'}
                                    variant={'flushed'}
                                    pl={2}
                                />
                            </InputGroup>
                            <ErrorMessage error={errors?.lastName} />
                        </>

                    )}
                />
            </Box>


            <Box my={5}>
                <Controller
                    name='email'
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <InputAddon borderRadius={'full'}>
                                    <FeatherIcon icon={'user'} />
                                </InputAddon>
                                <Input
                                    disabled={isLoading}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder={'Email'}
                                    borderRightRadius={'full'}
                                    variant={'flushed'}
                                    pl={2}
                                />
                            </InputGroup>
                            <ErrorMessage error={errors?.email} />
                        </>

                    )}
                />
            </Box>


            <Box my={5}>
                <Controller
                    name='password'
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    {...inputAttr}
                                    disabled={isLoading}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder={'Password'}
                                    borderRadius={'full'}
                                    variant={'flushed'}
                                    pl={2}
                                />
                            </InputGroup>
                            <ErrorMessage error={errors?.password} />
                        </>

                    )}
                />
            </Box>

            <Box my={5}>
                <Controller
                    name='confirmPassword'
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <FormLabel>Confirm Password</FormLabel>
                            <InputGroup>
                                <Input
                                    {...inputAttr}
                                    disabled={isLoading}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder={'Confirm Password'}
                                    borderRadius={'full'}
                                    variant={'flushed'}
                                    pl={2}
                                />
                                <InputAddon bg={'none'} border={'none'}>
                                    <IconButton onClick={togglePasswordVisibility} colorScheme={'red'} borderRadius={'full'} icon={<FeatherIcon size={18} {...iconAttr} />} />
                                </InputAddon>
                            </InputGroup>
                            <ErrorMessage error={errors?.confirmPassword} />
                        </>

                    )}
                />
            </Box>


            <HStack spacing={10} justifyContent={'end'} mt={70}>
                <Button isLoading={isLoading} onClick={handleSubmit(data => register(data))} colorScheme={'red'} px={10} borderRadius={'full'}>Register</Button>
                <Button size={'xs'} variant={'link'}>Back to Website</Button>
            </HStack>
        </form>
    )
}