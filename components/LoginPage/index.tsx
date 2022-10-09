import {
  Box,
  Button,
  Divider,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import { NextComponentType } from "next";
import LoginForm from "./form";

const styles = {
  GridResponsiveness: {
    minH: "100vh",
    templateColumns: "repeat(12,1fr)",
    templateRows: "repeat(8,1fr)",
    justifyContent: "center",
    alignItems: "center",
  },

  GridItemResponsiveness: {
    rowStart: { base: 1, md: 2 },
    rowEnd: { base: 9, md: 8 },
    colStart: { base: 1, md: 3, lg: 4 },
    colEnd: { base: 13, md: 11, lg: 10 },
  },

  Card: {
    background: "rgba(255, 255, 255, 0.4)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(5px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },
};

const LoginComponent: NextComponentType = () => {
  return (
    <Box px={5} bgImage={`url('/images/bg.jpg')`} backgroundSize={"cover"}>
      <Grid {...styles.GridResponsiveness}>
        <GridItem {...styles.GridItemResponsiveness}>
          <Box py={8} px={{ base: 30, md: 70 }} {...styles.Card}>
            <Box mb={50}>
              <Heading size={"lg"} color={"red.700"}>
                Autozone System Control
              </Heading>
              <Divider mb={10} mt={5} />
              <Heading size={"lg"}>Sign In</Heading>
              <Text fontSize={"sm"}>
                New to System?
                <Button
                  as={"a"}
                  href={"/register"}
                  size={"sm"}
                  variant={"link"}
                  mx={2}
                >
                  Register here
                </Button>
              </Text>
            </Box>
            <LoginForm />
            {/* <LoginForm signIn={signIn} isLoading={isLoading} /> */}
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default LoginComponent;
