import {
  Center,
  Text,
  useBoolean,
} from "@chakra-ui/react";
import React from "react";
import useStorage from "../../../../hooks/storage.hook";
import { useEffect } from "react";

interface MediaItemProps {
  file: File;
  id: string;
  allowUpload: boolean;
}

function MediaItem(props: MediaItemProps) {
  const { id, file, allowUpload } = props;

  const [isComplete, { toggle }] = useBoolean(false);


  const path = `vehicle/${id}/stock-${id}-${Math.floor(
    Math.random() * 99999
  )}`;

  const { uploadFile } = useStorage({});

  const handleFileUpload = () => {
    uploadFile(path, file)
      .then((data) => {
        console.log(data);
        toggle();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (allowUpload) handleFileUpload();
  }, [allowUpload]);

  return (
    <Center p={10}>
      <Text
      fontSize={"xs"}
        color={isComplete ? "gray.400" : allowUpload ? "gray.400" : "black"}
      >
        {path}
      </Text>
    </Center>
  );
}

export default MediaItem;
