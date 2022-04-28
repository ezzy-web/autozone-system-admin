import Link from 'next/link'
import { Box, HStack, Text, Badge } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'

export default function NavMenu({ page }) {
    return (
        <>
            <Box>
                <Text fontWeight={'medium'} fontSize={'sm'}>Joel Henry</Text>
                <Text fontSize={'xs'}>Executive Manager</Text>
                <Badge fontSize={'x-small'}>Administrator</Badge>
            </Box>
            <Box py={5}>
                <Box my={8}>
                    <Link passHref href='/'>
                        <a>
                            <HStack color={page === 'Dashboard' ? 'red.600' : 'unset'} fontSize={'sm'}>
                                <FeatherIcon size={18} icon={'home'} />
                                <Text fontWeight={'medium'} >Dashboard</Text>
                            </HStack>
                        </a>
                    </Link>
                </Box>

                <Box my={8}>
                    <Link passHref href='/inventory'>
                        <a>
                            <HStack color={page === 'Inventory Manager' ? 'red.600' : 'unset'} fontSize={'sm'}>
                                <FeatherIcon size={18} icon={'database'} />
                                <Text fontWeight={'medium'} >Manage Inventory</Text>
                            </HStack>
                        </a>
                    </Link>
                </Box>

                <Box my={8}>
                    <Link passHref href='/requests'>
                        <a>
                            <HStack color={page === 'Client Requests' ? 'red.600' : 'unset'} fontSize={'sm'}>
                                <FeatherIcon size={18} icon={'archive'} />
                                <Text fontWeight={'medium'} >Client Requests</Text>
                            </HStack>
                        </a>
                    </Link>
                </Box>

                <Box my={8}>
                    <Link passHref href='/invoice'>
                        <a>
                            <HStack color={page === 'Invoice Manager' ? 'red.600' : 'unset'} fontSize={'sm'}>
                                <FeatherIcon size={18} icon={'dollar-sign'} />
                                <Text fontWeight={'medium'} >Manage Invoices</Text>
                            </HStack>
                        </a>
                    </Link>
                </Box>


                <Box my={8}>
                    <Link passHref href='/requests'>
                        <a>
                            <HStack color={page === 'Manage Users' ? 'red.600' : 'unset'} fontSize={'sm'}>
                                <FeatherIcon size={18} icon={'users'} />
                                <Text fontWeight={'medium'} >Manage Users</Text>
                            </HStack>
                        </a>
                    </Link>
                </Box>

            </Box>
        </>
    )
}