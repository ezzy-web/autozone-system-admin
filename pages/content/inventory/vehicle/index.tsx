import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Car, Parking } from "@icon-park/react";
import type { NextPage } from "next";
import VehicleForm from "../../../../components/VehicleFormPage/form";

const VehicleFormPage: NextPage = () => {
  return (
    <>
      <head>
        <title>Autozone System Control | New Vehicle</title>
        <meta name="description" content="Autozone System Control" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Box bgImage={`url('/images/bg.jpg')`} backgroundSize={"cover"}>
        <SimpleGrid
          minH={"100vh"}
          bg={"blackAlpha.900"}
          p={{ base: 0, lg: 20 }}
          columns={{ base: 1, lg: 2 }}
        >
          <Box p={10} bg={"whiteAlpha.900"} boxShadow={"lg"}>
            <HStack alignItems={"center"}>
              <Image src="/images/image.png" w={20} />
              <Heading fontSize={"xl"}>Vehicle Registration</Heading>
            </HStack>

            <Divider my={10} />

            <VehicleForm />
          </Box>
          <Center p={10} display={{ base: "none", lg: "flex" }} textColor={"white"}>
            <HStack alignItems={"center"} gap={5}>
              <Car size={"100px"} />
              <Box>
                <Heading>Vehicle Registration Form</Heading>
                <Text>Add new vehicle to the inventory</Text>
              </Box>
            </HStack>
          </Center>
        </SimpleGrid>
      </Box>
    </>
  );
};

export default VehicleFormPage;
