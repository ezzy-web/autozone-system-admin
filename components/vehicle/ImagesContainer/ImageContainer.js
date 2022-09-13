import { Box, Image, HStack, IconButton, Text } from "@chakra-ui/react";
import FeatherIcon from 'feather-icons-react'
import useFileHandler from "../../../controller/hooks/useFileHandler";



export default function ImageContainer({ url, index, openLightBox, handleDeletePhoto }) {

    console.log(url)

    const { deleteFile } = useFileHandler()

    const handleRemove = () => {
        handleDeletePhoto(index)
        deleteFile(url)
    }

    return (
        <Box p={"1px"} borderWidth={"thin"} borderColor={"gray.300"} position={"relative"} overflow={"hidden"} h={150}>
            <Image objectFit={"cover"} h={"full"} w="full" src={url} alt={""} />
            

            <HStack bg={"blackAlpha.600"} px={2} py={1} bottom={0} left={0} right={0} position={"absolute"} justifyContent={'space-between'} alignItems={'center'}>
                <IconButton onClick={() => openLightBox(index)} borderRadius={"full"} colorScheme={"whiteAlpha"} variant={"ghost"} size={"sm"} icon={<FeatherIcon size={16} icon={"maximize"} />} />
                <IconButton onClick={handleRemove} borderRadius={"full"} colorScheme={"whiteAlpha"} variant={"ghost"} size={"sm"} icon={<FeatherIcon size={16} icon={"trash"} />} />
            </HStack>
        </Box>
    )
}