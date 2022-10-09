import { useState } from 'react'


import { Box, Button, Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import useFeedback from "../../controller/hooks/useFeedback";
import RegisterForm from "./form";
import styles from "./styles";
import NewVehicleForm from '../NewVehicleComponent/form';



export default function RegisterComponent() {

    const { showError, render } = useFeedback()
    const [ isLoading, setIsLoading ] = useState(false)

    const register = async (data) => {
        console.log(data)
        fetch('/api/user', {
            method: 'POST',
            headers: {'Content-Type': 'Applcation/json'},
            body: JSON.stringify(data)
        })

        .then( res => res.json() )
        .then( data => {
            console.log(data)
        })

        .catch(error => console.log(error))
    }

    return (
        <>
            {render()}
            <Box px={5} bgImage={`url('/images/authbg.jpg')`} backgroundSize={'cover'}>
                <Grid {...styles.GridResponsiveness} >
                    <GridItem {...styles.GridItemResponsiveness} >
                        <Box py={8} px={{ base: 30, md: 70 }} {...styles.Card}>
                            <Box mb={50} >
                                <Heading size={'lg'} color={'red.700'} >Autozone System Control</Heading>
                                <Divider mb={10} mt={5} />
                                <Heading size={'lg'}>Register</Heading>
                                <Text fontSize={'sm'}> Already Registered? <Button as={'a'} href={'/'} size={'sm'} variant={'link'}>Sign In here</Button></Text>
                            </Box>

                            <RegisterForm register={register} isLoading={isLoading} />


                        </Box>
                    </GridItem>

                </Grid>
            </Box>
        </>
    )
}