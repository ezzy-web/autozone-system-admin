import {
  Box,
  Button,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";

import Navbar from "../components/navbar";
import Footer from "../components/elements/Footer";
import Container from "../components/elements/Container";

function Contact() {
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
              <Heading textColor={"white"} textAlign={"center"} size="2xl">
                Contact Us
              </Heading>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Grid templateColumns={"repeat(12, 1fr)"}>
        <GridItem
        paddingY={10}
          paddingX={{ base: 5, md: 40 }}
          bgColor={"gray.100"}
          colSpan={{ base: 12, md: 7 }}
        >
          <Heading size={"lg"}>Contact Us Today</Heading>

          <Box paddingX={5}>
            <HStack my={5} width={'full'} justifyContent={'space-between'}>
              <Box width={'full'}>
                <FormLabel>First Name</FormLabel>
                <Input />
              </Box>

              <Box width={'full'}>
                <FormLabel>Last Name</FormLabel>
                <Input />
              </Box>
            </HStack>

            <Box my={5}>
              <FormLabel>Email</FormLabel>
              <Input />
            </Box>

            <Box my={5}>
              <FormLabel>Message</FormLabel>
              <Textarea></Textarea>
            </Box>
          </Box>

            <Button my={10} colorScheme={'red'} float={'right'}>Contact us</Button>
        </GridItem>

        <GridItem
          padding={{ base: 5, md: 10 }}
          colSpan={{ base: 12, md: 5 }}
        ></GridItem>
      </Grid>

      <Footer />
    </>
  );
}

export default Contact;
