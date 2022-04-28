import Head from 'next/head'
import Dashboard from '../../components/layouts/Dashboard'




import { Box, InputGroup, InputAddon, Input, IconButton } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'



export default function Inventory() {
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
      </Dashboard>
    </>
  )
}
