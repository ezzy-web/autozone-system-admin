import React from 'react'
import { Box, Button, HStack } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'



export default function TabComponent() {
    return (
        <Box>
            <HStack justifyContent={'flex-start'}>
                <Button leftIcon={<FeatherIcon icon={'share-2'} />} >
                    Share This
                </Button>
                <Button leftIcon={<FeatherIcon icon={'printer'} />}>
                    Print Page
                </Button>
                <Button leftIcon={<FeatherIcon icon={'heart'} />}>
                    Save Vehicle
                </Button>
            </HStack>
        </Box>
    )
}