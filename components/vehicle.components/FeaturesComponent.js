import React from 'react'
import { Badge, Box, Divider, Heading, List, ListIcon, ListItem, VStack } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'

export default function FeaturesComponent({ vehicleFeatures, ...props }) {

    const [features, setFeatures] = React.useState(vehicleFeatures)

    const handleFeatures = () => {
        const sanitizedFeatures = features.filter((feature) => feature.features.length != 0)
        setFeatures(sanitizedFeatures)
    }


    React.useEffect(() => {
        handleFeatures()
    }, [])


    return (
        <Box {... props}>
            <Heading fontWeight={'medium'} size={'lg'} my={15} >Features</Heading>
            {features.length === 0 ? 
            <>
                <VStack h={100} justifyContent={'center'} alignItems={'center'}>
                    <Badge variant={'subtle'} colorScheme={'gray'}>No Listed Feature</Badge>
                </VStack>
            </> :
                <>
                    <Box>
                        {features.map((feature, key) => {
                            if (feature.features.length === 0) return;

                            return (
                                <Box key={key}>
                                    <Heading fontWeight={'medium'} color={'gray.600'} size={'md'} my={2}> {feature.title} </Heading>

                                    <List ml={3}>
                                        {feature.features.map((featureItem, featureIndex) => {
                                            return (
                                                <ListItem key={featureIndex}>
                                                    <ListIcon>
                                                        <FeatherIcon icon={'arrow-up-right'} color={'#b4b4b4'} />
                                                    </ListIcon>
                                                    {featureItem}
                                                </ListItem>
                                            )
                                        })}
                                    </List>

                                    <Divider color={'gray.200'} my={5} />
                                </Box>
                            )
                        })}
                    </Box>
                </>}

        </Box>
    )
}