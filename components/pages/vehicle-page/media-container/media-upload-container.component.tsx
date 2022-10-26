import {
  Box,
  Center,
  Divider,
  Input,
  List,
  Text,
  SimpleGrid,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import MediaItem from "./media-item.component";
import { useState } from 'react';

const acceptedFileTypes = {
  "image/png": [".png"],
  "image/jpg": [".jpg"],
};


interface MediaUploadContainerProps {
  id: string
}

function MediaUploadContainer(props: MediaUploadContainerProps) {
  const { id } = props
  
  const [allowUpload, setAllowUpdate] = useState(false)
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: acceptedFileTypes,
  });

  return (
    <Box>
      <Box {...getRootProps()} bg={"whitesmoke"} p={10}>
        <Center>
          <Input disabled={allowUpload} {...getInputProps()} />
          <Text textAlign={"center"} fontSize={"x-small"}>
            Drag and drop media files here, or click to select files <br />
            (Only *.jpeg and *.png images will be accepted)
          </Text>
        </Center>
      </Box>

      <Button disabled={allowUpload} onClick={() => setAllowUpdate(true)} >Upload Files</Button>
      {acceptedFiles.length === 0 ? (
        <></>
      ) : (
        <>
          <Divider my={10} />
          <Box mt={5}>
            <SimpleGrid columns={3} gap={3}>
              {acceptedFiles.map((file, index) => (
                <MediaItem key={index} file={file} id={id} allowUpload={allowUpload} />
              ))}
            </SimpleGrid>
          </Box>
        </>
      )}
    </Box>
  );
}

export default MediaUploadContainer;
