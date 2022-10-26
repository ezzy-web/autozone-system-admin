import React from "react";
import Media from "./media.component";
import { Box } from '@chakra-ui/react';

interface MediaContentProps {
  media: string[];
  [key: string]: any;
}

function MediaContent(props: MediaContentProps) {
  const { media, innerRef, placeholder, droppableProps: { ...provided} } = props;

  return (
    <Box {...provided} ref={(ref) => innerRef(ref)}>
      {media.map((media, index) => (
        <Media key={media} media={media} index={index} />
      ))}
      {placeholder}
    </Box>
  );
}

export default MediaContent;
