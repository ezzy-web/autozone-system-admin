import {
  Box,
  Text,
  Image,
  Divider,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DeleteButton from "../../../make-model-module/delete-button.component";

interface MediaProps {
  media: any;
  index: number;
}

function Media(props: MediaProps) {
  const { media, index } = props;

  return (
    <Draggable draggableId={media} index={index}>
      {(provided) => (
        <Box {...provided.draggableProps} ref={(ref) => provided.innerRef(ref)}>
          <Divider my={3} />
          <Grid templateColumns={"repeat(12,1fr)"} alignItems={"center"}>
            <GridItem colSpan={2}>
              <Image
                borderRadius={10}
                {...provided.dragHandleProps}
                src="https://images.unsplash.com/photo-1515075978617-32d63eb43bd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
              />
            </GridItem>

            <GridItem colSpan={5} p={2}>
              <Text
                noOfLines={1}
                fontSize={"sm"}
                onClick={() => alert(media)}
                fontWeight={"medium"}
                _hover={{ cursor: "pointer" }}
              >
                Stock-no-6-{media}
              </Text>
              <Text fontSize={"x-small"}>Date Uploaded 01/02/2022</Text>
            </GridItem>

            <GridItem colSpan={2}>
              <Box display={"flex"} justifyContent={"center"} w={"full"}>
                <Text fontSize={"x-small"}>3MB</Text>
              </Box>
            </GridItem>
            <GridItem colSpan={3}>
              <Box px={3} w={"full"} display={"flex"} justifyContent={"end"}>
                <DeleteButton
                  variant={"ghost"}
                  colorScheme={"red"}
                  borderRadius={"full"}
                  size={"xs"}
                  aria_label={"Delete Image"}
                  remove={() => alert("Removed")}
                />
              </Box>
            </GridItem>
          </Grid>
        </Box>
      )}
    </Draggable>
  );
}

export default Media;
