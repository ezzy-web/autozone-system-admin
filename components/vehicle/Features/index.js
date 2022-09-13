
import { Text, Divider, Box, Button, Center, HStack, IconButton, Input, Spinner } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'
import React from "react"



function FeatureContent({ feature, handleDeleteFeatureEvent, index, handleEditFeature }) {

    const [isReadOnly, setIsReadOnly] = React.useState(true)
    const [featureInput, setFeatureInput] = React.useState(feature)


    const handleEditEvent = () => {
        if (isReadOnly) {
            // Event to allow edit
        } else {
            handleEditFeature(index, featureInput)
            // Event to save edit
        }

        setIsReadOnly(!isReadOnly)
    }

    React.useEffect(() => setFeatureInput(feature), [feature])

    return (
        <Box my={2}>

            <HStack justifyContent={'space-between'}>
                <Input placeholder={isReadOnly ? "Press edit button to start typing" : "Type vehicle feature here..."} onKeyDown={e => { e.keyCode === 13 ? handleEditEvent() : null }} size={'sm'} variant={isReadOnly ? 'unstyled' : 'filled'} isReadOnly={isReadOnly} value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} />
                <HStack>
                    <IconButton onClick={handleEditEvent} size={'sm'} icon={<FeatherIcon size={14} icon={"edit"} />} />
                    <IconButton onClick={() => handleDeleteFeatureEvent(index)} colorScheme={'red'} variant={'ghost'} size={'sm'} icon={<FeatherIcon size={14} icon={'minus'} />} />
                </HStack>
            </HStack>


        </Box>
    )
}



export default function Features({ vehicle, changeData }) {


    const handleAddFeatureEvent = () => changeData({ features: [...vehicle.features, ''] })
    const handleDeleteFeatureEvent = (index) => {

        var newLst = JSON.parse(JSON.stringify(vehicle.features))
        newLst.splice(index, 1)

        console.log(newLst, vehicle.features)
        changeData({ features: newLst })
    }

    const handleEditFeature = (index, featureInput) => {
        var features = vehicle.features

        features[index] = featureInput
        changeData({ features: features })
    }


    return (
        <Box mt={10}>
            {/* <Text fontWeight={'medium'} textTransform={'uppercase'} >Vehicle Features</Text>
            <Divider mb={10} /> */}

            {vehicle?.features ?
                <Box>


                    {

                        vehicle?.features.length === 0 ?
                            <>
                                <Center p={10}>
                                    <Text fontSize={'sm'} >No Features Listed</Text>
                                </Center>
                            </>

                            :

                            vehicle?.features.map((feature, _) => <FeatureContent feature={feature} handleDeleteFeatureEvent={handleDeleteFeatureEvent} index={_} key={_} handleEditFeature={handleEditFeature} />)


                    }



                </Box>
                :

                <Center p={10}>
                    <Spinner />
                </Center>
            }





            <Divider mt={10} />
            <Button onClick={handleAddFeatureEvent} isFullWidth size={'sm'} > Add Vehicle Feature </Button>
        </Box>
    )
}