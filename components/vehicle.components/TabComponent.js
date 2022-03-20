import React from 'react'
import { Box, Button, HStack, Text } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'

import { CookieContext } from '../../server/utils/context'



export default function TabComponent({ id, ...props }) {
    const { addSaveVehicle, isSaved, removeSaveVehicle } = React.useContext(CookieContext)
    const [saved, setSaved] = React.useState(isSaved(id))

    const handleSaveButton = async (e) => {
        e.preventDefault()
        if (saved) {
            removeSaveVehicle(id)
            setSaved(!saved)
            return
        }
        addSaveVehicle(id)
        setSaved(!saved)
    }

    return (
        <Box {...props} sho >
            <HStack justifyContent={'flex-start'}>
                <Button leftIcon={<FeatherIcon size={16} icon={'share-2'} />} >
                <Text fontSize={'sm'} >Share This</Text>
                </Button>
                <Button leftIcon={<FeatherIcon size={16} icon={'printer'} />}>
                    <Text fontSize={'sm'} >Print Page</Text>
                </Button>
                <Button onClick={handleSaveButton} leftIcon={<FeatherIcon size={16} icon={'heart'} color={saved ? 'red' : null} fill={saved ? 'red' : null} />}>
                <Text fontSize={'sm'} >{ saved ? "Saved" : "Save Vehicle"}</Text>
                </Button>
            </HStack>
        </Box>
    )
}