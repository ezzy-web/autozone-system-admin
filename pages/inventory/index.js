import { Text, Box, InputAddon, InputGroup, Input, IconButton, Button, HStack, Grid, GridItem } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import InfoTable from '../../components/datatable'

import Dashboard from '../../components/layouts/Dashboard'




const cardStyle = {
    background: 'rgba(255, 255, 255, 0.4)',
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
}




export default function Inventory() {


    const columns = [
        {
          name: (
            <>
              Hello
            </>
          ),
          selector: (row) => row.id
        }
    ]
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
                    <GridItem pr={{ base: 0, md: 3 }} colSpan={{ base: 12, md: 9, lg: 8 }}>
                        <Box {...cardStyle} p={5} >
                            <Button mx={2} variant={'link'} fontSize={'xs'}>
                                <HStack>
                                    <FeatherIcon size={10} icon={'refresh-cw'} />
                                    <Text>Refresh Results</Text>
                                </HStack>
                            </Button>

                            <Box>
                                <InfoTable columns={columns} data={[{ id: 1 }]} />
                            </Box>
                        </Box>
                    </GridItem>
                    <GridItem pl={{ base: 0, md: 3 }} colSpan={{ base: 12, md: 3, lg: 4 }}>
                        <Box {...cardStyle} p={5} ></Box>
                    </GridItem>
                </Grid>

            </Dashboard>
        </>
    )
}
