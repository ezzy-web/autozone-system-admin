import { useState } from 'react'

import { Box, Button, Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";


import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import useFeedback from "../../controller/hooks/useFeedback";
import LoginForm from "./form";
import styles from "./styles";

export default function LoginComponent() {

    const { showError, render } = useFeedback()
    const [isLoading, setIsLoading] = useState(false)


    const signIn = async ({ email, password }) => {
        setIsLoading(true)
        
        console.log(email, password)
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password })


        if (error) {
            showError({ message: error.message })
        } else {
            // Sign In User
            console.log(data)
        }

        setIsLoading(false)
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
                                <Heading size={'lg'}>Sign In</Heading>
                                <Text fontSize={'sm'}> New to System? <Button as={'a'} href={'/register'} size={'sm'} variant={'link'}>Register here</Button></Text>
                            </Box>
                            <LoginForm signIn={signIn} isLoading={isLoading} />
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </>
    )
}