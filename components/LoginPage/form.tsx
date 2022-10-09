import {
  Box,
  Button,
  FormLabel,
  HStack,
  Input,
  InputAddon,
  InputGroup,
  IconButton,
} from "@chakra-ui/react";
import { NextComponentType } from "next";
import { useFormik } from "formik";
import * as Park from "@icon-park/react";

const LoginForm: NextComponentType = () => {
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: (values) => console.log(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box my={5}>
        <>
          <FormLabel>Email</FormLabel>
          <InputGroup>
            <InputAddon borderRadius={"full"}>
              <Park.User />
            </InputAddon>
            <Input
              onChange={formik.handleChange}
              value={formik.values.email}
              name={"email"}
              type={"email"}
              placeholder={"Email"}
            />
          </InputGroup>
        </>
      </Box>

      <Box my={5}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            onChange={formik.handleChange}
            value={formik.values.password}
            name={"password"}
            type={"password"}
            placeholder={"Password"}
          />
          <InputAddon bg={"none"} border={"none"}>
            <IconButton
              colorScheme={"red"}
              borderRadius={"full"}
              icon={<Park.Eyes />}
              aria-label={""}
            />
          </InputAddon>
        </InputGroup>
      </Box>

      <HStack spacing={10} justifyContent={"end"} mt={70}>
        <Button type="submit" colorScheme={"red"} px={10} borderRadius={"full"}>
          Sign In
        </Button>
        <Button size={"xs"} variant={"link"}>
          Back to Website
        </Button>
      </HStack>
    </form>
  );
};

export default LoginForm;
