
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { FormLabel, InputAddon, InputGroup, IconButton, Button, HStack, Box, Input, Text } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import usePasswordVisibilityController from '../../controller/passwordVisibilityController'


function ErrorMessage({ error }) {
    return error ? <Text fontSize={'x-small'} color={'red'}>{error.message}</Text> : <></>
}

export default function LoginForm({ signIn, isLoading }) {

    const schema = yup.object().shape({
        email: yup.string().required("This field is required").email(),
        password: yup.string().required('This field is required')
    })


    const { handleSubmit, control, formState: { errors } } = useForm({ reValidateMode: 'onChange', resolver: yupResolver(schema) })
    const { iconAttr, inputAttr, togglePasswordVisibility } = usePasswordVisibilityController()




    return (
        <form onSubmit={handleSubmit(data => signIn(data))}>

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
                                <InputAddon bg={'none'} border={'none'}>
                                    <IconButton onClick={togglePasswordVisibility} colorScheme={'red'} borderRadius={'full'} icon={<FeatherIcon size={18} {...iconAttr} />} />
                                </InputAddon>
                            </InputGroup>
                            <ErrorMessage error={errors?.password} />
                        </>

                    )}
                />
            </Box>



            <HStack spacing={10} justifyContent={'end'} mt={70}>
                <Button isLoading={isLoading} onClick={handleSubmit(data => signIn(data))} colorScheme={'red'} px={10} borderRadius={'full'}>Sign In</Button>
                <Button size={'xs'} variant={'link'}>Back to Website</Button>
            </HStack>


        </form>
    )
}