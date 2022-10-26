import React from "react";
import { Box, Divider, HStack, Switch, Text } from "@chakra-ui/react";
import { useVehicleContext } from "../../../../context/vehicle.context";

interface VehicleSettingsProps {}

interface SettingProps {
  title: string;
  details: string;
  onChange: (event: any) => void;
  checked: boolean;
}

function Setting(props: SettingProps) {
  const { onChange, checked, title, details } = props;
  return (
    <>
      <HStack fontSize={"sm"} justifyContent={"space-between"}>
        <Box>
          <Text fontWeight={"medium"}>{title}</Text>
          <Text>{details}</Text>
        </Box>
        <Switch checked={checked} onChange={onChange} colorScheme={"red"} />
      </HStack>
      <Divider my={2} />
    </>
  );
}

function VehicleSettings(props: VehicleSettingsProps) {
  const { vehicle, change } = useVehicleContext()
  return (
    <>
      <Text fontSize={"lg"} fontWeight={"medium"}>
        Settings
      </Text>
      <Divider my={5} />

      <Setting
        title="Public"
        details={"Make vehicle visible on website"}
        onChange={(e) => change({ is_visible: e.target.checked })}
        checked={vehicle.is_visible}
      />

      <Setting
        title="Featured"
        details={"Make vehicle featured"}
        onChange={(e) => change({ is_featured: e.target.checked })}
        checked={vehicle.is_featured}
      />

      <Setting
        title="Price Public"
        details={"Make price public"}
        onChange={(e) => change({ is_price_public: e.target.checked })}
        checked={vehicle.is_price_visible}
      />

      <Setting
        title="Vehicle Status"
        details={"Update vehicle status"}
        onChange={(e) => change({ is_available: e.target.checked })}
        checked={vehicle.is_available}
      />
    </>
  );
}

export default VehicleSettings;
