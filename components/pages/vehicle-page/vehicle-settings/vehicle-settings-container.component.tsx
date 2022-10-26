import { HStack, Badge, Divider, Box } from "@chakra-ui/react";
import VehicleTitle from "../vehicle-title.component";
import VehicleCredentials from "./vehicle-credentials.component";
import VehicleContent from "./vehicle-content.component";
import SaveChangesButton from "../save-changes-btn.component";
import VehicleSettings from "./vehicle-settings.component";
import { useVehicleContext } from "../../../../context/vehicle.context";

const styles = {
  card: {
    background: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    my: 5,
    p: 5,
  },
};

interface VehicleSettingsProps {}

const VehicleSettingsContainer = () => {
  const { vehicle } = useVehicleContext();

  return (
    <>
      <Box {...styles.card}>
        <Box>
          <HStack alignItems={"center"}>
            <VehicleTitle />
            <Badge
              my={3}
              fontSize={"xx-small"}
              variant={"subtle"}
              borderRadius={"full"}
              colorScheme={vehicle.is_visible ? "green" : "red"}
              p={1}
            >
              {vehicle ? (vehicle.is_visible ? "Visible" : "Hidden") : "..."}
            </Badge>
          </HStack>
        </Box>

        <VehicleCredentials />

        <Divider my={2} />

        <VehicleContent />

        <SaveChangesButton />
      </Box>

      <Box {...styles.card}>
        <VehicleSettings />
      </Box>
    </>
  );
};

export default VehicleSettingsContainer;
