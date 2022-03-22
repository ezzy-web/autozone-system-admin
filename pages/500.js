import { Box, Button, Center, Grid, GridItem, Heading, HStack, Image, Text } from "@chakra-ui/react"
import Container from '../components/elements/Container'

import Head from 'next/head'

function ServerError() {
    return (
        <>
            <Head>
                <title>{`Javvy's Autozone - Jamaica Used Car Dealer | Something Went Wrong`}</title>
            </Head>

            <Box py={40} width={'full'} height={'full'} bgColor={'linear-gradient(242deg,rgba(204, 204, 204, 1) 0%,rgba(255, 255, 255, 1) 49%,rgba(214, 204, 204, 1) 100%)'}>
                <Container width={'full'} height={'full'} >
                    <HStack height={'full'} width={'full'} justifyContent={'center'} alignItems={'center'} >
                        <Center>
                            <Grid width={'70%'} templateColumns={'repeat(12, 1fr)'} >
                                <GridItem colSpan={{ base: 12, md: 4 }} >
                                    <Box maxWidth={500}>
                                        <Image alt="Javvy's Autozone Ltd." width={'full'} src="/assets/saved-bg.png" />
                                    </Box>
                                </GridItem>

                                <GridItem colSpan={{ base: 12, md: 8 }} >
                                    <Box paddingX={5}>
                                        <Heading width={'full'}>Something went wrong, try again later <Text color={'red.400'} >500</Text></Heading>
                                        <Button my={10} width={'50%'} as={'a'} href={'/'} color={'white'} bgColor={'red.600'} >Back Home</Button>
                                    </Box>
                                </GridItem>
                            </Grid>
                        </Center>

                    </HStack>

                </Container>
            </Box>
        </>
    )
}


export default ServerError