import {
  Box,
  Button,
  Divider,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

import React from 'react'

import Head from "next/head";

import Navbar from "../components/navbar";
import Footer from "../components/elements/Footer";
import FeatherIcon from "feather-icons-react";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getSavedVehicleFromCookie } from "../server/utils/lib";

import { AlertContext } from "../server/utils/context";

function Contact({ cookies }) {
  const { showAlert, isLoading } = React.useContext(AlertContext)


  const socialButton = {
    mt: 5,
    borderRadius: "full",
    bgColor: "red.300",
    color: "white",
    padding: 2,
    fontSize: "sm",
    transition: "0.5s",
    _hover: {
      bgColor: "red.600",
    },
  };

  const HeadingStyle = {
    color: "red.800",
    fontSize: "md",
  };

  const inputStyle = {
    variant: "filled",
  };

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required(),
    message: yup.string().required(),
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });



  const handleContactSubmit = async (data) => {
    isLoading(true)
    const response = await fetch(`${window.location.origin}/api/clientContact`, {
      method: 'POST',
      body: JSON.stringify({ contact: data })
    }).catch( error => {isLoading(false); showAlert({ show: true, message: 'Something went wrong', status: 'error' }) })
    isLoading(false);
    if (response) {
      reset()
      showAlert({ show: true, message: 'Message Sent', status: 'success' })
    }
  }

  return (
    <>
      <Head>
        <title>{`Javvy's Autozone - Jamaica Used Car Dealer | Contact Us`}</title>
      </Head>
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
          <Navbar
            light={true}
            savedCount={getSavedVehicleFromCookie(cookies).length}
          />
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
          colSpan={{ base: 12, md: 7 }}
        >
          <Heading size={"lg"}>Contact Us Today</Heading>

          <form onSubmit={handleSubmit((data) => handleContactSubmit(data))}>
            <Box paddingX={5}>
              <HStack my={5} width={"full"} justifyContent={"space-between"}>
                <Box width={"full"}>
                  <FormLabel>First Name</FormLabel>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        {...inputStyle}
                        value={value}
                        placeholder="First Name"
                        onChange={(e) => onChange(e.target.value)}
                      />
                    )}
                  />
                </Box>

                <Box width={"full"}>
                  <FormLabel>Last Name</FormLabel>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        {...inputStyle}
                        value={value}
                        placeholder="Last Name"
                        onChange={(e) => onChange(e.target.value)}
                      />
                    )}
                  />
                </Box>
              </HStack>

              <Box my={5}>
                <FormLabel>Email</FormLabel>
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      {...inputStyle}
                      value={value}
                      placeholder="Email"
                      type={"email"}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </Box>

              <Box my={5}>
                <FormLabel>Message</FormLabel>
                <Controller
                  name="message"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Textarea
                      {...inputStyle}
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  )}
                />
              </Box>
            </Box>

            <Button type="submit" my={10} colorScheme={"red"} float={"right"}>
              Contact us
            </Button>
          </form>
        </GridItem>

        <GridItem
          paddingY={10}
          paddingX={{ base: 5, md: "90px" }}
          colSpan={{ base: 12, md: 5 }}
          bgColor={"whitesmoke"}
        >
          <Heading {...HeadingStyle} size={"md"} mt={10}>
            <HStack>
              <Text>Our Socials</Text>{" "}
              <FeatherIcon icon={"arrow-right-circle"} />
            </HStack>
          </Heading>
          <HStack>
            <a href="https://www.facebook.com/profile.php?id=100064338601745">
              <Box {...socialButton}>
                <FeatherIcon fill={"white"} icon={"facebook"} />
              </Box>
            </a>
            <a href="https://www.instagram.com/javvys_autozone_limited/">
              <Box {...socialButton}>
                <FeatherIcon icon={"instagram"} />
              </Box>
            </a>
          </HStack>

          <Divider my={5} />

          <Text>
            <Box fontWeight={"medium"}>{"Javvy's Autozone Ltd."}</Box>
            <br />
            <span>Four Paths,</span>
            <br />
            <span>May Pen</span>
            <br />
            <span>Clarendon, Jamaica</span>
          </Text>

          <Divider my={5} />

          <Heading {...HeadingStyle}>
            <HStack>
              <Text>Get Directions</Text>{" "}
              <FeatherIcon icon={"arrow-right-circle"} />
            </HStack>
          </Heading>

          <Box my={5}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6382.807201084353!2d-77.29562459912023!3d17.96757382928891!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x33279f4e51df2df2!2sJavvy&#39;s%20Autozone%20Ltd.!5e0!3m2!1sen!2sjm!4v1610814512485!5m2!1sen!2sjm"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          </Box>

          <Divider my={5} />

          <Heading {...HeadingStyle}>
            <HStack>
              <Text>Our Contacts</Text>{" "}
              <FeatherIcon icon={"arrow-right-circle"} />
            </HStack>
          </Heading>

          <Text fontWeight={"medium"}>
            <span>Phone Number: </span>
            <a href="#" onClick={() => window.open("tel:8763561017")}>
              (876) 356-1017
            </a>{" "}<a href="#" onClick={() => window.open("tel:8768659667")}>
              (876) 865-9667
            </a>{" "}
            <br />
            <span>Email: </span>
            <a href="mailto:javvysauto@gmail.com">javvysauto@gmail.com</a>
          </Text>
        </GridItem>
      </Grid>

      <Footer />
    </>
  );
}

export default Contact;
