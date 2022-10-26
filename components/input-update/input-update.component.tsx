import { IconButton, Input, InputAddon, InputGroup } from "@chakra-ui/react";
import { Close, Edit } from "@icon-park/react";
import React from "react";
import { useState, useEffect } from 'react';

interface InputUpdateProps {
  type?: string;
  value: string;
  updateHandler: (value: string) => void;
}

export default function InputUpdate(props: InputUpdateProps) {
  const { value: init_value, updateHandler, type } = props;

  const [readOnly, setReadOnly] = useState(true);
  const [value, setValue] = useState(init_value);

  const onChangeHandler = (event: any) => setValue(event.target.value);
  const onEventHandler = () => {
    if (!readOnly) updateHandler(value);
    setReadOnly(!readOnly);
  };


  useEffect(() => {
    setValue(init_value)
  }, [init_value])

  return (
    <InputGroup>
      <Input
        onKeyDown={(e) => {
          e.keyCode === 13 ? onEventHandler() : null;
        }}
        onClick={onEventHandler}
        readOnly={readOnly}
        value={value}
        onChange={onChangeHandler}
        type={type ? type : "text"}
        variant={readOnly ? "unstyled" : "filled"}
        colorScheme={"red"}
        borderRadius={"full"}
        size={"md"}
        _hover={{
          cursor: 'pointer'
        }}
      />

      <InputAddon border={"none"} bg={"none"}>
        <IconButton
          icon={readOnly ? <Edit /> : <Close />}
          aria-label={"Edit Property"}
          onClick={onEventHandler}
          size={"sm"}
          borderRadius={"full"}
          colorScheme={"red"}
          variant={"ghost"}
        />
      </InputAddon>
    </InputGroup>
  );
}
