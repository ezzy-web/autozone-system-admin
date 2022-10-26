import { Input } from '@chakra-ui/react';
import React from "react";

interface SearchBoxProps {
  onChangeHandler: (searchString: string) => void;
  placeholder: string;

}

export default function SearchBox(props: SearchBoxProps) {
  const { onChangeHandler, placeholder } = props;
  return (
      <Input
        placeholder={placeholder}
        type="search"
        onChange={(event) => onChangeHandler(event.target.value)}
      />
  );
}
