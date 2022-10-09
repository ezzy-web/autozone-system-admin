
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { FormLabel, InputAddon, InputGroup, IconButton, Button, HStack, Box, Input, Text } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'


function ErrorMessage({ error }) {
    return error ? <Text fontSize={'x-small'} color={'red'}>{error.message}</Text> : <></>
}

export default function NewVehicleForm({ isLoading }) {

    const schema = yup.object().shape({
        chassis: yup.string().required(),
        engineNumber: yup.string().required(),
        submodel: yup.string()

    })

    const { handleSubmit, control, formState: { errors } } = useForm({ reValidateMode: 'onChange', resolver: yupResolver(schema) })


    return (
        <form>

            <Box my={5}>
                <Controller
                    name='chassis'
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <FormLabel>Chassis Number</FormLabel>
                            <InputGroup>
                                <Input
                                    disabled={isLoading}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder={'Chassis'}
                                    borderRightRadius={'full'}
                                    variant={'flushed'}
                                    px={2}
                                />
                            </InputGroup>
                            <ErrorMessage error={errors?.email} />
                        </>

                    )}
                />
            </Box>


            <Box my={5}>
                <Controller
                    name='engineNumber'
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <FormLabel>Engine Number</FormLabel>
                            <InputGroup>
                                <Input
                                    disabled={isLoading}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder={'Engine Number'}
                                    borderRightRadius={'full'}
                                    variant={'flushed'}
                                    px={2}
                                />
                            </InputGroup>
                            <ErrorMessage error={errors?.email} />
                        </>

                    )}
                />
            </Box>


            <Box my={5}>
                <Controller
                    name='submodel'
                    control={control}
                    render={({ field: { onChange } }) => (
                        <>
                            <FormLabel>Submodel</FormLabel>
                            <InputGroup>
                                <Input
                                    disabled={isLoading}
                                    onChange={e => onChange(e.target.value)}
                                    placeholder={'Submodel'}
                                    borderRightRadius={'full'}
                                    variant={'flushed'}
                                    px={2}
                                />
                            </InputGroup>
                            <ErrorMessage error={errors?.email} />
                        </>

                    )}
                />
            </Box>


            <HStack spacing={10} justifyContent={'end'} mt={70}>
                <Button isLoading={isLoading} onClick={handleSubmit} colorScheme={'red'} px={10} borderRadius={'full'}>Add Vehicle</Button>
                <Button size={'xs'} variant={'link'}>Back to Website</Button>
            </HStack>

        </form>
    )
}