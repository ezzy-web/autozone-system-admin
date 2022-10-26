import { Box, HStack, Text } from "@chakra-ui/react";
import { useVehicleContext } from "../../../../context/vehicle.context";

interface VehicleCredentialsProps {}
interface CredentialProps {
  title: string;
  val: string;
}

function Credential(props: CredentialProps) {
  const { title, val } = props;
  return (
    <HStack fontSize={"xs"} alignItems={"center"}>
      <Text>{title}</Text>
      <Text fontWeight={"medium"}>{val}</Text>
    </HStack>
  );
}

function VehicleCredentials(props: VehicleCredentialsProps) {
  const { vehicle } = useVehicleContext()

  
  return (
    <Box>
      <Credential title={"Stock No."} val={vehicle.id} />
      <Credential title={"Chassis No."} val={vehicle.chassis} />
      <Credential title={"Engine No."} val={vehicle.engine_number} />
      <Credential
        title={"Status"}
        val={vehicle.is_available ? "Available" : "Sold"}
      />
    </Box>
  );
}

export default VehicleCredentials;
