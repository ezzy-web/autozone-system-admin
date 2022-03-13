import React from 'react'
import Select from 'react-select'

import { Box, FormLabel, HStack, Button } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'



export default function FilterInventory() {



    return (
        <form>
            <Box my={3}>
                <FormLabel fontSize={'xs'}>Make</FormLabel>
                <Select
                    options={[]}
                    placeholder='Make'
                    classNamePrefix="form-select-index"
                />
            </Box>
            <Box my={3}>
                <FormLabel fontSize={'xs'}>Model</FormLabel>
                <Select
                    options={[]}
                    placeholder='Any'
                    classNamePrefix="form-select-index"
                />
            </Box>
            <HStack justifyContent={'space-evenly'} width={'full'}>
                <Box width={'full'} my={3}>
                    <FormLabel fontSize={'xs'}>From</FormLabel>
                    <Select
                        options={[]}
                        placeholder='From'
                        classNamePrefix="form-select-index"
                    />
                </Box>
                <Box width={'full'} my={3}>
                    <FormLabel fontSize={'xs'}>To</FormLabel>
                    <Select
                        options={[]}
                        placeholder='To'
                        classNamePrefix="form-select-index"
                    />
                </Box>
            </HStack>

            <Box my={3}>
                <FormLabel fontSize={'xs'}>Body Type</FormLabel>
                <Select
                    options={[]}
                    placeholder='Any'
                    classNamePrefix="form-select-index"
                />
            </Box>

            <Box my={3}>
                <FormLabel fontSize={'xs'}>Transmission</FormLabel>
                <Select
                    options={[]}
                    placeholder='Any'
                    classNamePrefix="form-select-index"
                />
            </Box>

            <Button mt={10} width={'full'} rightIcon={<FeatherIcon size={18} icon={'filter'} />}>Filter Inventory</Button>
        </form>
    )
}