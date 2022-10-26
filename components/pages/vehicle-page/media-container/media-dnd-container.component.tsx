import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import MediaContent from "./media-content.component";
import { useState, useEffect } from "react";

interface MediaDNDProps {}
interface DragEvent {
  draggableId: string;
  destination: any;
  source: any;
}

function MediaDND(props: MediaDNDProps) {
  const [media, setMedia] = useState(["1","2"]);
  const onMediaSwap = (event: DragEvent) => {
    const {
      source: { index: sourceIndex },
      destination: { index: destinationIndex },
    } = event;

    if (sourceIndex === destinationIndex) return;
    let media_tmp = JSON.parse(JSON.stringify(media));
    if (destinationIndex < sourceIndex) media_tmp.splice(destinationIndex, 0, media_tmp[sourceIndex]);
    if (destinationIndex > sourceIndex) media_tmp.splice(destinationIndex + 1, 0, media_tmp[sourceIndex])
    if (destinationIndex < sourceIndex) media_tmp.splice(sourceIndex + 1, 1);
    if (destinationIndex > sourceIndex) media_tmp.splice(sourceIndex, 1);
    setMedia(media_tmp);
  };
  resetServerContext();

  return (
    <DragDropContext onDragEnd={onMediaSwap}>
      <Text>Drag and drop to reorganize media</Text>
      <Droppable droppableId="media-container">
        {(provided) => (
          <Box
            p={1}
            pb={40}
            h={"70vh"}
            overflowY={"scroll"}
            ref={(ref) => provided.innerRef(ref)}
            border={"InfoBackground"}
          >
            {media.length === 0 ? (
              <Center h={"full"}>
                <Text fontWeight={"medium"} color={"blackAlpha.400"}>
                  No Media Files
                </Text>
              </Center>
            ) : (
              <MediaContent
                {...provided}
                media={media}
              />
            )}
          </Box>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default MediaDND;
