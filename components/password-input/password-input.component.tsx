import { IconButton, Input, InputAddon, InputGroup } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import usePasswordVisibility from "../../hooks/usePasswordVisibility";
import { Sunrise, Sun } from "@icon-park/react";
import { ReactNode } from "react";

interface PasswordInputProps {
  passwordInput: (props: { [key: string]: any }) => ReactNode;
}

export default function PasswordInput({ passwordInput }: PasswordInputProps) {
  const {
    props: passwordProps,
    passwordIsVisible,
    togglePasswordVisibiity,
  } = usePasswordVisibility();

  return (
    <InputGroup>
      {passwordInput({ ...passwordProps})}
      <InputAddon bg="none" border="none">
        <IconButton
          onClick={togglePasswordVisibiity}
          aria-label={"Toggle Password Visibility"}
          icon={passwordIsVisible ? <Sunrise size={24} /> : <Sun size={24} />}
        />
      </InputAddon>
    </InputGroup>
  );
}
