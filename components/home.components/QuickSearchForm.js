

import React from 'react'

import { SimpleGrid, Box, Button } from '@chakra-ui/react'
import Select from 'react-select'


function QuickSearchForm() {
    return (
        <SimpleGrid minChildWidth={175} spacing={15}>
            <Box>
                <Select
                    classNamePrefix="form-select-over"
                    options={[]}
                    placeholder={'Select Year'}
                />
            </Box>
            <Box>
                <Select
                    classNamePrefix="form-select-over"
                    options={[]}
                    placeholder={'Select Make'}
                />
            </Box>
            <Box>
                <Select
                    classNamePrefix="form-select-over"
                    options={[]}
                    placeholder={'Select Model'}
                />
            </Box>
            <Box>
                <Button borderRadius={0} width={'full'} >Search</Button>
            </Box>
        </SimpleGrid>
    )
}

export default QuickSearchForm