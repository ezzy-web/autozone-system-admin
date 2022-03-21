import React from 'react'
import { Box, Button, HStack, Text } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'

import { CookieContext } from '../../server/utils/context'

import { RWebShare } from 'react-web-share'



export default function TabComponent({ vehicle, ...props }) {
    const { addSaveVehicle, isSaved, removeSaveVehicle } = React.useContext(CookieContext)
    const [saved, setSaved] = React.useState(isSaved(vehicle.id))

    const handleSaveButton = async (e) => {
        e.preventDefault()
        if (saved) {
            removeSaveVehicle(vehicle.id)
            setSaved(!saved)
            return
        }
        addSaveVehicle(vehicle.id)
        setSaved(!saved)
    }

    const shareData = {
        text: `Great deals, just for you here at Javvy's Autozone Ltd. Checkout this ${vehicle.title}. Contact us today if you're interested.`,
        title: `Javvy's Autozone Limited, Jamaica - ${vehicle.title}`
    }

    return (
        <Box {...props} >
            <HStack justifyContent={'flex-start'}>
                <RWebShare data={shareData}>
                    <Button leftIcon={<FeatherIcon size={16} icon={'share-2'} />} >
                        <Text fontSize={'sm'} >Share This</Text>
                    </Button>
                </RWebShare>

                {/* <Button leftIcon={<FeatherIcon size={16} icon={'printer'} />}>
                    <Text fontSize={'sm'} >Print Page</Text>
                </Button> */}

                <Button onClick={handleSaveButton} leftIcon={<FeatherIcon size={16} icon={'heart'} color={saved ? 'rgb(150, 61, 61)' : 'black'} fill={saved ? 'rgb(150, 61, 61)' : 'black'} />}>
                    <Text fontSize={'sm'} >{saved ? "Saved" : "Save Vehicle"}</Text>
                </Button>
            </HStack>
        </Box>
    )
}