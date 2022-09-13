import { Box, Center, Text } from "@chakra-ui/react"
import Fslightbox from "fslightbox-react"

import { useState, useEffect } from "react"
import { GridContextProvider, GridDropZone, GridItem, swap } from "react-grid-drag"
import ImageContainer from "./ImageContainer"
import UploadContainer from "./UploadContainer"


export default function ImagesContainer({ vehicle, changeData }) {
    const [images, setImages] = useState([])

    const [toggle, setToggle] = useState({
        srcIndex: 0,
        toggler: false
    })

    const openLightBox = (index) => {
        setToggle({ srcIndex: index, toggler: !toggle.toggler })
    }


    const handleChange = (sourceId, sourceIndex, targetIndex, targetId) => {
        const nextState = swap(images, sourceIndex, targetIndex);
        changeData({ images: nextState })
    };

    const handleDeletePhoto = (index) => {
        const updatesImages = images.slice()
        updatesImages.splice(index, 1)


        changeData({ images: updatesImages })
    }

    useEffect(() => {
        if (vehicle?.images) setImages(vehicle.images.map(img => {
            if (img.url) return img.url
            return img
        }))
    }, [vehicle])



    return (
        <>
            <Box overflowX={'hidden'} overflowY={'scroll'}>
                {images.length > 0 ?
                    <Box className="img-dropzone-main-container">
                        <GridContextProvider onChange={handleChange}>
                            <GridDropZone
                                id="images-grid-container"
                                boxesPerRow={3}
                                rowHeight={200}
                                style={{ minHeight: "100vh" }}>

                                {images.map((img, index) => (
                                    <GridItem key={img}>
                                        <ImageContainer url={img} openLightBox={openLightBox} handleDeletePhoto={handleDeletePhoto} index={index} />
                                    </GridItem>
                                ))}

                            </GridDropZone>
                        </GridContextProvider>
                    </Box>

                    :
                    <Center p={40}>
                        <Text>No Images</Text>
                    </Center>
                }

            </Box>

            <Box>
                <UploadContainer vehicle={vehicle} changeData={changeData} />
            </Box>


            <Fslightbox
                toggler={toggle.toggler}
                sources={images.map(image => image)}
                sourceIndex={toggle.srcIndex}
                type="image"

            />


        </>
    )
}