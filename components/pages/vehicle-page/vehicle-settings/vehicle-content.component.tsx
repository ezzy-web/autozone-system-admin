import { Box, Text, Divider } from "@chakra-ui/react";
import React from "react";
import { useVehicleContext  } from "../../../../context/vehicle.context";

interface VehicleContextProps {}

interface ContextProps {
  title: string;
  val: string;
}

function Content(props: ContextProps) {
  const { title, val } = props;
  return (
    <>
      <Box fontSize={"xs"}>
        <Text>{title}</Text>
        <Text fontWeight={"medium"}>{val}</Text>
      </Box>
      <Divider my={2} />
    </>
  );
}

function VehicleContent(props: VehicleContextProps) {
  const { vehicle, change } = useVehicleContext()
  return (
    <Box my={5}>
      <Content title={"Added by"} val={""} />
      <Content title={"Added"} val={""} />
      <Content title={"Edited by"} val={""} />
      <Content title={"Last Edited"} val={""} />
    </Box>
  );
}

export default VehicleContent;
