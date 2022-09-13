import Head from 'next/head'
import Dashboard from '../../components/layouts/Dashboard'

import { Box, InputGroup, Input, InputAddon, IconButton, Grid, GridItem, Button, HStack, Text, Divider } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import InfoTable from '../../components/datatable'
import useRequests from '../../controller/hooks/useRequests'

const cardStyle = {
    background: 'rgba(255, 255, 255, 0.4)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
}

export default function Inventory() {

    const { columns } = useRequests()

    return (

        <>
            <Dashboard page={'Client Requests'}>
            <Box my={10} p={8} bg={'white'} borderRadius={'full'}>
                    <InputGroup>
                        <Input variant={'unstyled'} placeholder={'Search Requests'} />
                        <InputAddon border={'none'} bg={'none'}>
                            <IconButton borderRadius={'full'} colorScheme={'red'} icon={<FeatherIcon icon={'search'} />} />
                        </InputAddon>
                    </InputGroup>
                </Box>


                <Grid templateColumns={'repeat(12,1fr)'} >
                    <GridItem pr={{ base: 0, md: 3 }} colSpan={{ base: 12, md: 12 }}>
                        <Box {...cardStyle} p={5} >
                            <Button mx={2} variant={'link'} fontSize={'xs'}>
                                <HStack>
                                    <FeatherIcon size={10} icon={'refresh-cw'} />
                                    <Text>Refresh Results</Text>
                                </HStack>
                            </Button>
                            <Divider my={2} />
                            <Box>
                                <InfoTable columns={columns} data={[{ id: 1 }]} />
                            </Box>
                        </Box>
                    </GridItem>
                </Grid>
            </Dashboard>
        </>
    )
}
