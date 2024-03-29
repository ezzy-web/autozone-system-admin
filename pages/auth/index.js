import Head from 'next/head'
import { Box, Button, Divider, FormControl, FormLabel, Grid, GridItem, Heading, HStack, IconButton, Input, InputAddon, InputGroup, Text } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'

const GridResponsiveness = {
    minH: '100vh',
    templateColumns: 'repeat(12,1fr)',
    templateRows: 'repeat(8,1fr)',
    justifyContent: 'center',
    alignItems: 'center'
}


const GridItemResponsiveness = {
    rowStart: { base: 1, md: 2 },
    rowEnd: { base: 9, md: 8 },
    colStart: { base: 1, md: 3, lg: 4 },
    colEnd: { base: 13, md: 11, lg: 10 }
}


const cardStyle = {
    background: 'rgba(255, 255, 255, 0.4)',
    borderRadius: '16px',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
}

export default function Home() {
    return (

        <>
            <Head>
                <title>Autozone System Control | Login</title>
                <meta name="description" content="Autozone System Control" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Box px={5} bgImage={`url('/images/authbg.jpg')`} backgroundSize={'cover'}>
                <Grid {...GridResponsiveness} >
                    <GridItem {...GridItemResponsiveness} >
                        <Box py={8} px={{ base: 30, md: 70 }} {...cardStyle}>
                            <Box mb={50} >
                                <Heading size={'lg'} color={'red.700'} >Autozone System Control</Heading>
                                <Divider mb={10} mt={5} />
                                <Heading size={'lg'}>Sign In</Heading>
                                <Text fontSize={'sm'}> New to System? <Button as={'a'} href={'#'} size={'sm'} variant={'link'}>Register here</Button></Text>
                            </Box>


                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <InputGroup mb={10}>
                                    <InputAddon borderRadius={'full'}>
                                        <FeatherIcon icon={'user'} />
                                    </InputAddon>
                                    <Input variant={'filled'} borderLeftRadius={0} borderRightRadius={'full'} placeholder={'Email'} />
                                </InputGroup>


                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input variant={'filled'} borderRadius={'full'} placeholder={'Password'} />
                                    <InputAddon bg={'none'} border={'none'}>
                                        <IconButton colorScheme={'red'} borderRadius={'full'} icon={<FeatherIcon size={18} icon={'eye'} />} />
                                    </InputAddon>
                                </InputGroup>
                                <Button mx={5} size={'xs'} variant={'link'}>Forgot Password?</Button>
                            </FormControl>

                            <HStack spacing={10} justifyContent={'end'} mt={70}>
                                <Button colorScheme={'red'} px={10} borderRadius={'full'}>Sign In</Button>
                                <Button size={'xs'} variant={'link'}>Back to Website</Button>
                            </HStack>


                        </Box>
                    </GridItem>

                </Grid>
            </Box>
        </>
    )
}