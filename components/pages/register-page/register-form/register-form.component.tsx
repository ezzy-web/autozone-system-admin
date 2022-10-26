import { Button, HStack, Input, useBoolean } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../password-input/password-input.component";
import { useAuthContext } from "../../../../context/user-context/provider.context";

export default function RegisterForm() {
  const { registerWithEmailAndPassword } = useAuthContext();
  const [isSubmitting, { on, off }] = useBoolean(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: any) => {
    const { email, password, firstname, lastname, confirm_password } = values;
    registerWithEmailAndPassword(
      email,
      password,
      confirm_password,
      firstname,
      lastname,
      (data) => console.log(data),
      (error) => console.log(error)
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="First Name"
        {...register("firstname", {
          required: "Your first name is required",
        })}
      />

      <Input
        type="text"
        placeholder="Last Name"
        {...register("lastname", {
          required: "Your last name is required",
        })}
      />

      <Input
        type="email"
        placeholder="Email"
        {...register("email", {
          required: "Your email is required",
        })}
      />

      <PasswordInput
        passwordInput={(props) => (
          <Input
            placeholder="Password"
            {...props}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must contain at least 8 characters",
              },
            })}
          />
        )}
      />

      <PasswordInput
        passwordInput={(props) => (
          <Input
            {...props}
            placeholder="Confirm Password"
            {...register("confirm_password", {
              required: "Password Comfirmation is required",
            })}
          />
        )}
      />

      <HStack spacing={10} justifyContent={"end"} mt={70}>
        <Button size={"xs"} variant={"link"}>
          Back to Website
        </Button>
        <Button
          isLoading={isSubmitting}
          type="submit"
          colorScheme={"red"}
          px={10}
          borderRadius={"full"}
        >
          Register
        </Button>
      </HStack>
    </form>
  );
}
