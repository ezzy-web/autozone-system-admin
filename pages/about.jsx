import { Box, Heading, Stack } from "@chakra-ui/react";

import Navbar from "../components/navbar";
import Footer from "../components/elements/Footer";
import Container from "../components/elements/Container";
import AboutUsContainer from "../components/home.components/AboutUsContainer";


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
              <Heading textColor={"white"} size="2xl">
                About Us
              </Heading>
            </Stack>
          </Box>
        </Box>
      </Box>

    <AboutUsContainer />


      <Footer />
    </>
  );
}

export default About;
