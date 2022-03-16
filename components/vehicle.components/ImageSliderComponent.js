import React from 'react'
import { Box, IconButton, Image, VStack } from '@chakra-ui/react'
import FsLightbox from 'fslightbox-react'
import FeatherIcon from 'feather-icons-react'

import Slider from '../elements/Slider'

export default function ImageSliderComponent({ vehicle, ...props }) {
    const [toggler, setToggler] = React.useState({
        toggler: false,
        srcIndex: 0
    })

    const openLightBox = (index) => {
        setToggler({
            toggler: !toggler.toggler,
            srcIndex: parseInt(index)
        })
    }

    return (
        <Box {...props}>

            {vehicle.images.length == 0 ?
                <Box>
                    <Slider data={['/assets/no-image.jpg']} renderItem={({ item, index }) => (
                        <Image width={'full'} src={item} />
                    )} />
                </Box>
                :
                <Box>
                    <Slider allowThumbs={true} data={vehicle.images} renderItem={({ item, index }) => (
                        <VStack height={'full'} overflow='hidden' justifyContent={'center'} alignItems={'center'}>
                            <Image _hover={{ cursor: 'pointer' }} width={'full'} src={item.url} onClick={() => openLightBox(index)} />
                        </VStack>
                    )}
                        thumbRender={({ item }) => (
                            <VStack _hover={{ cursor: 'pointer' }} justifyContent={'center'} alignItems={'center'} borderRadius={10} width={'full'} height={70} overflow={'hidden'}>
                                <Image width={'full'} src={item.url} />
                            </VStack>
                        )} />
                </Box>

            }

            <FsLightbox
                toggler={toggler.toggler}
                source={vehicle.images.map(img => img.url)}
                sourceIndex={toggler.srcIndex}
                type='image'
                key={vehicle.images.length}
            />
        </Box>
    )
}