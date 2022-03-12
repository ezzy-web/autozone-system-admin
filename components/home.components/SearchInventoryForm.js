import React from 'react'

import { Box, SimpleGrid, HStack, Button, Divider } from '@chakra-ui/react'
import Select from 'react-select'

import FeatherIcon from 'feather-icons-react'


function SearchInventoryForm() {
    return (
        <>
            <SimpleGrid my={5} minChildWidth={175} justifyContent={'center'} spacing={15}>
                <Box>
                    <Select
                        classNamePrefix="form-select-index"
                        options={[]}
                        placeholder={'Make'}
                    />
                </Box>
                <Box>
                    <Select
                        classNamePrefix="form-select-index"
                        options={[]}
                        placeholder={'Model'}
                    />
                </Box>
                <Box>
                    <Select
                        classNamePrefix="form-select-index"
                        options={[]}
                        placeholder={'Transmission'}
                    />
                </Box>
            </SimpleGrid>
            <SimpleGrid mt={10} minChildWidth={100} spacing={15}>
                <Box>
                    <Select
                        classNamePrefix="form-select-index"
                        options={[]}
                        placeholder={'Type'}
                    />
                </Box>
                <Box>
                    <Select
                        classNamePrefix="form-select-index"
                        options={[]}
                        placeholder={'Location'}
                    />
                </Box>
                <Box>
                    <Select
                        classNamePrefix="form-select-index"
                        options={[]}
                        placeholder={'Year Min'}
                    />
                </Box>
                <Box>
                    <Select
                        classNamePrefix="form-select-index"
                        options={[]}
                        placeholder={'Year Max'}
                    />
                </Box>
            </SimpleGrid>

            <HStack mt={10} justifyContent={'flex-end'}>
                <Button>Reset</Button>
                <Button rightIcon={<FeatherIcon size={16} icon='search' />}>Search</Button>
            </HStack>
        </>
    )
}


export default SearchInventoryForm
