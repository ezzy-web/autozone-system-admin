import { Box, HStack, IconButton, Progress, Text } from '@chakra-ui/react'
import { useEffect } from 'react'

import FeatherIcon from 'feather-icons-react'


import useFileHandler from "../../../controller/hooks/useFileHandler"

export default function ImageUpload({ file, path, appendImage }) {

    const { uploadFile, progress, state, handleCancel, handlePause, handleResume, fileURL } = useFileHandler()

    useEffect(() => {
        uploadFile(file, path)

    }, [file, path])


    useEffect(() => {
        if (state.isComplete && fileURL) appendImage({ image: fileURL }) 
        if (state.isCancelled) appendImage({ cancel: true })
    }, [state, fileURL])

    

    return (
        <Box my={2}>
            <Text>{file.name}</Text>
            <Progress size={'sm'} w={"full"} value={progress} colorScheme={state.isCancelled ? "red" : state.paused ? "yellow" : state.isComplete ? "green" : "linkedin" } isIndeterminate={state.paused} />
            <HStack my={2} justifyContent={"center"} spacing={5} >
                <IconButton onClick={handleResume} disabled={state.uploading | !state.paused | state.isCancelled | state.isComplete} size={"xs"} icon={<FeatherIcon size={14} icon={"play"} />} />
                <IconButton onClick={handlePause} disabled={state.paused | state.isCancelled | state.isComplete} size={"xs"} icon={<FeatherIcon size={14} icon={"pause"} />} />
                <IconButton onClick={handleCancel} disabled={state.isCancelled | state.isComplete | state.paused} size={"xs"} icon={<FeatherIcon size={14} icon={"x"} />} />
            </HStack>
        </Box>
    )
}