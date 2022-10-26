import { Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import useModels from "../../../hooks/models.hook";
import {
  useVehicleContext
} from "../../../context/vehicle.context";

interface VehicleTitleProps {}

function VehicleTitle(props: VehicleTitleProps) {
  const { vehicle } = useVehicleContext()
  const [title, setTitle] = useState("");
  const { get: getModel } = useModels();

  const handleSetTitle = async () => {
    if (!vehicle) return;
    if (vehicle.model <= 0) return;

    getModel(vehicle.model)
      .then((model) => setTitle(`${vehicle.year} ${model.make_name} ${model.name}`))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    handleSetTitle();
  }, [vehicle]);

  return (
    <Heading my={3} fontWeight={"medium"} fontSize={"md"}>
      {title}
    </Heading>
  );
}

export default VehicleTitle;
