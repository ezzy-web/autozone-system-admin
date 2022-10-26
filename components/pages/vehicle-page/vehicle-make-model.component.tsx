import { HStack, Text } from "@chakra-ui/react";
import React from "react";
import { useVehicleContext } from "../../../context/vehicle.context";
import MakeModelInput from "../../make-model-input";

const styles = {
  card: {
    p: 5,
    w: "full",
  },
};

interface VehicleMakeModelProps {}

function VehicleMakeModel(props: VehicleMakeModelProps) {
  const { vehicle, change } = useVehicleContext()
  
  return (
    <HStack

      {...styles.card}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Text>Make/Model</Text>
      <HStack justifyContent={"center"}>
        { vehicle.model ? <MakeModelInput model={vehicle.model}  setValue={(model) => change({ model: Number(model) })}  /> : <></>}
      </HStack>
    </HStack>
  );
}

export default VehicleMakeModel;
