import { NextPage } from "next/types";
import {
  Box,
  Grid,
  GridItem,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import Dashboard from "../../../../components/dashboard/dashboard.component";
import VehicleSettingsContainer from "../../../../components/pages/vehicle-page/vehicle-settings/vehicle-settings-container.component";
import SpecificationsContainer from "../../../../components/pages/vehicle-page/specifications-container.component";
import MediaContainer from "../../../../components/pages/vehicle-page/media-container/media-container.component";
import VehicleContextProvider from "../../../../context/vehicle.context";

const styles = {
  card: {
    background: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    my: 5,
    p: 5,
    w: "full",
  },
};

const VehiclePage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Dashboard page={`Vehicle Specifications`}>
      <VehicleContextProvider id={Number(id)}>
        <Grid position={"relative"} templateColumns={"repeat(12,1fr)"}>
          <GridItem
            px={2}
            colSpan={{ base: 12, md: 12, lg: 4 }}
            position={"static"}
          >
            <VehicleSettingsContainer/>
          </GridItem>

          <GridItem px={2} colSpan={{ base: 12, md: 12, lg: 8 }}>
            <Box {...styles.card}>
              <Tabs colorScheme={"red"}>
                <TabList>
                  <Tab>Specifications</Tab>
                  <Tab>Images</Tab>
                  <Tab>Features</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel
                    h={{ base: "unset", lg: "95vh" }}
                    overflowY={{ base: "unset", lg: "scroll" }}
                  >
                    <SpecificationsContainer/>
                  </TabPanel>
                  <TabPanel>
                    <MediaContainer />
                  </TabPanel>
                  <TabPanel></TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </GridItem>
        </Grid>
      </VehicleContextProvider>
    </Dashboard>
  );
};

export default VehiclePage;
