import {
  Box,
  Heading,
  Stack,
  Text,
  Grid,
  GridItem,
  HStack,
} from "@chakra-ui/react";

import Navbar from "../components/navbar";
import Footer from "../components/elements/Footer";
import Container from "../components/elements/Container";
import AboutUsContainer from "../components/home.components/AboutUsContainer";
import FeatherIcon from "feather-icons-react";

function About() {
  return (
    <>
      <Box position={"relative"} overflow={"hidden"} w="100%" height={"40vh"}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          overflow="hidden"
          w="100%"
          height="40vh"
        >
          <Box
            width={"100vw"}
            height="full"
            bgImage={`url('/assets/Banner.jpg')`}
            bgSize="cover"
            bgPosition={"center"}
          />
        </Box>
        <Box bg="rgba(0, 0, 0, 0.434)" position="absolute" top="0" w="100%">
          <Navbar light={true} />
          <Box paddingX={10} h={"40vh"}>
            <Stack height={"full"} paddingY={{ base: 10, md: 20 }}>
              <Heading textAlign={"center"} textColor={"white"} size="2xl">
                About Us
              </Heading>
            </Stack>
          </Box>
        </Box>
      </Box>

      <Container>
        <Grid templateColumns={"repeat(12, 1fr)"}>
          <GridItem paddingY={5} colSpan={{ base: 12, md: 7 }}>
            <Heading color={"red.800"} size={"md"} mb={10}>
              <HStack>
                <Text>Javvys Autozone Limited</Text>{" "}
                <FeatherIcon icon={"arrow-right-circle"} />
              </HStack>
            </Heading>
            <Box>
              <Text my={5}>
                {`Welcome to Javvy's Autozone Limited, certified used car dealer located in Four Paths, Clarendon.`}
              </Text>

              <Text my={5}>
                {`It is always a pleasure to provide our customers with the very best service, and we're happy to be your guide through the journey of puchasing your ride. We provide a wide variety of motor vehicles; including cars, buses, trucks and SUVs. Whether it be for business, work or pleasure, we have something here for you. Our team is always a call away to help throughout the process.`}
              </Text>

              <Text my={5}>
                {`We import high quality units from Canada, USA, Singapore and Japan. Additionally upon arrival, units are thoroughly evaluated and serviced to meet our high quality standards. It is our firm believe that customers should get their money's worth, and as such we are guided by this principle. Javvy's Autozone Ltd. is here for you, with open arms we welcome you to our family. Come experience the Supreme Service you deserve, and the Superior Quality you expect.`}
              </Text>

              <Text
                color={"red.600"}
                fontWeight={"medium"}
                fontSize={"lg"}
                my={5}
              >
                {`Javvy's Autozone Limited, Great Vehicles for Great People.`}
              </Text>
            </Box>
          </GridItem>

          <GridItem padding={{ base: 5, md: 10 }} colSpan={{ base: 12, md: 5 }}>
            <Box bgColor={"whitesmoke"} padding={{ base: 5, md: 10 }}>
              <Heading color={"red.800"} size={"md"} my={10}>
                <HStack>
                  <Text>Opening Hours</Text>{" "}
                  <FeatherIcon icon={"arrow-right-circle"} />
                </HStack>
              </Heading>

              <Box>
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"medium"} fontSize={"md"}>
                    Monday
                  </Text>
                  <Text>8:30AM - 4:00PM</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"medium"} fontSize={"md"}>
                    Tuesday
                  </Text>
                  <Text>8:30AM - 4:00PM</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"medium"} fontSize={"md"}>
                    Wednesday
                  </Text>
                  <Text>8:30AM - 4:00PM</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"medium"} fontSize={"md"}>
                    Thursday
                  </Text>
                  <Text>8:30AM - 4:00PM</Text>
                </HStack>
                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"medium"} fontSize={"md"}>
                    Friday
                  </Text>
                  <Text>8:30AM - 4:00PM</Text>
                </HStack>

                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"medium"} fontSize={"md"}>
                    Saturday
                  </Text>
                  <Text>8:30AM - 4:00PM</Text>
                </HStack>

                <HStack justifyContent={"space-between"}>
                  <Text fontWeight={"medium"} fontSize={"md"}>
                    Sunday
                  </Text>
                  <Text>Closed</Text>
                </HStack>
              </Box>
            </Box>
          </GridItem>
        </Grid>
      </Container>

      <AboutUsContainer />

      <Footer />
    </>
  );
}

export default About;
