import {
  Button,
  Checkbox,
  FormLabel,
  HStack,
  Input,
  useBoolean,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import PasswordInput from "../../../password-input/password-input.component";
import { useAuthContext } from "../../../../context/user-context/provider.context";
import Router from 'next/router';

export default function LoginForm() {
  const { signInWithEmailAndPassword } = useAuthContext();

  const [isSubmitting, { on, off }] = useBoolean(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (values: { [key: string]: any }) => {
    const { email, password, remember_me } = values;
    on();
    signInWithEmailAndPassword(
      email,
      password,
      remember_me,
      (data) => {
        Router.replace('/content').then(() => {
          off()
        })
      },
      (error) => {
        off();
        console.log(error);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            placeholder={"Password"}
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

      <HStack>
        <Checkbox type="checkbox" {...register("remember_me")} />
        <FormLabel>Remember Me</FormLabel>
      </HStack>

      <HStack spacing={10} justifyContent={"end"} mt={70}>
        <Button size={"xs"} variant={"link"}>
          Back to Website
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          isLoading={isSubmitting}
          type="submit"
          colorScheme={"red"}
          px={10}
          borderRadius={"full"}
        >
          Sign In
        </Button>
      </HStack>
    </form>
  );
}
