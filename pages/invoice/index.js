import React from 'react'
import Dashboard from '../../components/layouts/Dashboard'




import { Box, InputGroup, Input, InputAddon, IconButton, Grid, GridItem, Button, HStack, Text, Divider } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import InfoTable from '../../components/datatable'

import useInvoice from '../../controller/hooks/useInvoice'

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.4)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(5px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
}

export default function Inventory() {
  const [ loaded, setLoaded ] = React.useState(false)
  React.useEffect(() => setLoaded(true), [])



  const { columns } = useInvoice()


    if (!loaded) return <></>
    return (
        <>
            <Dashboard page={'Invoice Manager'}>
                <Box my={10} p={8} bg={'white'} borderRadius={'full'}>
                    <InputGroup>
                        <Input variant={'unstyled'} placeholder={'Search Invoices'} />
                        <InputAddon border={'none'} bg={'none'}>
                            <IconButton borderRadius={'full'} colorScheme={'red'} icon={<FeatherIcon icon={'search'} />} />
                        </InputAddon>
                    </InputGroup>
                </Box>


                <Grid templateColumns={'repeat(12,1fr)'} >
                    <GridItem pr={{ base: 0, md: 3 }} colSpan={{ base: 12, md: 10 }}>
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
                    {/* <GridItem pl={{ base: 0, md: 3 }} colSpan={{ base: 12, md: 2 }}>
                        <Box {...cardStyle} my={5} borderRadius={10} p={2} >
                            
                        </Box>
                    </GridItem> */}
                </Grid>

            </Dashboard>
        </>
    )
}
