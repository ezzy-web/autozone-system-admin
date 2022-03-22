import React from 'react'
import { Box, Center, Divider, Grid, GridItem, Heading, HStack, List, ListItem, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import FeatherIcon from 'feather-icons-react'


export default function Footer() {

    const onHover = { color: 'red.500', cursor: 'pointer', transition: '0.5' }
    return (
        <>
            <Box bg={'linear-gradient(90deg,#9b3e3e,#ff6d1e)'} h={'5px'} width='full' ></Box>

            <Box bgColor={'blackAlpha.900'}>
                <Box paddingY={10} paddingX={{ base: 5, md: 10 }}>
                    <Grid templateColumns={'repeat(12, 2fr)'}>

                        <GridItem colSpan={{ base: 12, md: 7 }} >
                            <Grid templateColumns={'repeat(12, 1fr)'}>
                                <GridItem colSpan={{ base: 12, md: 9 }}>
                                    <Box height={'full'} alignItems={'center'} justifyContent={'center'}>
                                        <Box padding={5}>
                                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15181.049273442666!2d-77.30319591713582!3d17.966528704703137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb995948b430ab%3A0x33279f4e51df2df2!2sJavvy&#39;s%20Autozone%20Ltd.!5e0!3m2!1sen!2sjm!4v1647759721870!5m2!1sen!2sjm" width="600" height="450" style={{ border: 0, width: '100%', height: '60%' }} allowFullScreen="" loading="lazy"></iframe>
                                        </Box>
                                    </Box>
                                </GridItem>
                                <GridItem colSpan={{ base: 12, md: 3 }}>
                                    <VStack height={'full'} justifyContent={'center'} verticalAlign={'center'} color={'gray.700'}>
                                        <Box textAlign={{ base: 'center', sm: 'center', md: 'left' }} fontWeight={'bold'}>
                                            <Text>Four Paths,</Text>
                                            <Text>May Pen,</Text>
                                            <Text>Clarendon, Jamaica</Text>
                                        </Box>

                                        <HStack width={'full'} justifyContent={{ base: 'center', sm: 'center', md: 'left' }} alignItems={'center'}>
                                            <FeatherIcon size={18} icon={'phone'} />
                                            <Text _hover={{ cursor: 'pointer' }} onClick={() => window.open('tel:8763561017')} fontSize={18} color={'red.600'}>876-356-1017</Text>
                                        </HStack>
                                    </VStack>
                                </GridItem>
                            </Grid>

                        </GridItem>
                        <GridItem colSpan={{ base: 12, md: 5 }} >

                            <HStack mt={5} justifyContent={{ base: 'center', sm: 'center', md: 'left' }}>

                                <List textAlign={{ base: 'center', sm: 'center', md: 'left' }}>
                                    <Heading fontSize={'lg'} color={'white'}>MENU</Heading>
                                    <ListItem color={'gray.700'}>
                                        <Link passHref href={'/'} >
                                            <Text _hover={onHover} >Home</Text>
                                        </Link>

                                        <Link passHref href={'/inventory'} >
                                            <Text _hover={onHover} >Inventory</Text>
                                        </Link>

                                        <Link passHref href={'/about'} >
                                            <Text _hover={onHover} >About Us</Text>
                                        </Link>

                                        <Link passHref href={'/contact'} >
                                            <Text _hover={onHover}  >Contact Us</Text>
                                        </Link>

                                    </ListItem>
                                </List>

                            </HStack>

                        </GridItem>


                    </Grid>

                    <Divider width={'full'} borderColor={'gray.900'} my={10} />

                    <Center>
                        <Text color={'gray.700'} textTransform={'uppercase'} >{`Copyright &copy; 2022 All Rights Reserved by Javvy's Autozone.`}</Text>
                    </Center>
                </Box>

            </Box>
        </>
    )
}