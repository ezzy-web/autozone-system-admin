import { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import ImageUpload from "./ImageUpload"

import { Text, Box, Input, List, Button, Center } from '@chakra-ui/react'


export default function UploadContainer({ vehicle, changeData }) {


    const [acceptedFileItems, setAcceptedFileItems] = useState([])
    const [uploadedImages, setUploadedImages] = useState([])
    const [uploadCount, setUploadCount] = useState(0)

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/png': ['.png'],
            'image/jpg': ['.jpg']
        }
    })


    const appendImage = ({ image, cancel }) => {
        if (cancel) setUploadCount(uploadCount++)

        if (image) {
            if (uploadCount < acceptedFiles.length) {
                const images = uploadedImages.push(image)
                setUploadedImages(images)
                setUploadCount(uploadCount++)
            }
        }

        if (uploadCount > 0 && (uploadCount === acceptedFiles.length)) {
            changeData({ images: [...vehicle.images, ...uploadedImages] })
            setUploadCount(0)
            setUploadedImages([])
            setAcceptedFileItems([])
        }
    }



    useEffect(() => {
        setAcceptedFileItems(acceptedFiles.map((file, index) => (
            <ImageUpload key={index} appendImage={appendImage} file={file} path={`vehicle/images/${vehicle.id}/${(Math.random() + 1).toString(36).substring(7)}`} />
        )))
    }, [acceptedFiles])


    return (
        <Box mt={10}>
            <Box mt={5}>
                {acceptedFileItems.length > 0 ? <Text fontWeight={"medium"} fontSize={"xs"}>Accepted Files</Text> : <></>}
                <List>
                    {acceptedFileItems}
                </List>
            </Box>
            
            <Box {...getRootProps({ className: "dropzone" })}>
                <Center bg={"blackAlpha.200"} p={10} borderRadius={5} >
                    <Input {...getInputProps()} />
                    <Text textAlign={"center"} fontSize={"x-small"}>
                        Drag and drop media files here, or click to select files <br />
                        (Only *.jpeg and *.png images will be accepted)
                    </Text>
                </Center>
            </Box>


            


        </Box>

    )
}