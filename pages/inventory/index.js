import React from 'react'

import { Text, Box, InputAddon, InputGroup, Input, IconButton, Button, HStack, Grid, GridItem, Divider, Center, Spinner } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import Dashboard from '../../components/layouts/Dashboard'
import NewVehicleForm from '../../components/Forms/NewVehicleForm'
import useInventory from '../../controller/hooks/useInventory'

import InfoTable from '../../components/datatable'
import MakeModelModule from '../../components/Forms/MakeModelModule'


const cardStyle = {
    background: 'rgba(255, 255, 255, 0.4)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
}




export default function Inventory() {
    const [loaded, setLoaded] = React.useState(false)
    React.useEffect(() => setLoaded(true), [])
    const { columns, inventory, allowRefresh, handleRefresh } = useInventory()


    if (!loaded) return <></>
    return (

        <>
            <Dashboard page={'Inventory Manager'}>
                <Box my={10} p={8} bg={'white'} borderRadius={'full'}>
                    <InputGroup>
                        <Input variant={'unstyled'} placeholder={'Search Inventory'} />
                        <InputAddon border={'none'} bg={'none'}>
                            <IconButton borderRadius={'full'} colorScheme={'red'} icon={<FeatherIcon icon={'search'} />} />
                        </InputAddon>
                    </InputGroup>
                </Box>


                <Grid templateColumns={'repeat(12,1fr)'} >
                    <GridItem pr={{ base: 0, md: 3 }} colSpan={12}>


                        <Box {...cardStyle} p={5} >

                           <Box mb={10}><MakeModelModule /></Box>

                            <HStack justifyContent={'space-between'}>
                                <Button onClick={handleRefresh} disabled={!allowRefresh} mx={2} variant={'link'} fontSize={'xs'}>
                                    <HStack>
                                        <FeatherIcon size={10} icon={'refresh-cw'} />
                                        <Text>Refresh Results</Text>
                                    </HStack>
                                </Button>
                                <NewVehicleForm />
                            </HStack>

                            <Divider my={2} />
                            <Box>
                                {inventory ?
                                    <InfoTable columns={columns} data={inventory} />
                                    :
                                    <Center p={30}>
                                        <Spinner />
                                    </Center>
                                }

                            </Box>
                        </Box>
                    </GridItem>
                </Grid>

            </Dashboard>
        </>
    )
}
