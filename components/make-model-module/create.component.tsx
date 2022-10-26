import {
  InputGroup,
  Input,
  InputAddon,
  Tooltip,
  IconButton,
} from "@chakra-ui/react";
import { Add } from "@icon-park/react";
import { useState } from "react";
import { useBoolean } from "@chakra-ui/react";

interface CreateModelProps {
  createHandler: (
    name: string,
    onSuccess?: (success?: any) => void,
    onError?: (error?: any) => void
  ) => void;
  label: string;
  aria_label: string;
}

export default function Create(props: CreateModelProps) {
  const { createHandler, label, aria_label } = props;

  const [value, setValue] = useState("");
  const [isSubmitting, { toggle }] = useBoolean(false);

  const onModelChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleClickEvent = async () => {
    toggle();
    createHandler(value, () => {
      setValue("");
      toggle();
    }, error => {
      alert("Something went wrong: " + error.message )
      toggle()
    });
  };

  return (
    <InputGroup>
      <Input type={"text"} value={value} onChange={onModelChange} />

      <InputAddon border={"none"} bg={"none"}>
        <Tooltip label={label}>
          <IconButton
            isLoading={isSubmitting}
            onClick={handleClickEvent}
            icon={<Add />}
            aria-label={aria_label}
          />
        </Tooltip>
      </InputAddon>
    </InputGroup>
  );
}
