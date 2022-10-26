import {
  Box,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuDivider,
  MenuItem,
} from "@chakra-ui/react";
import { Add, Down } from "@icon-park/react";
import React from "react";
import SearchBox from "../search-box/search-box.component";
import { useContext } from "react";
import { ModelContext } from "../../context/model.context";

interface ModelInputProps {}

export default function ModelInput(props: ModelInputProps) {
  const ctx = useContext(ModelContext);

  if (!ctx) return <></>;

  const {
    selectedModel: model,
    onSearchStringChange,
    setSelectedModel,
    filteredModels,
    createModel,
    searchString,
  } = ctx;

  return (
    <Menu>
      <MenuButton
        textAlign={"left"}
        w={"full"}
        as={Button}
        rightIcon={<Down />}
      >
        {model ? model.name : "Select Model"}
      </MenuButton>
      <MenuList>
        <Box p={2}>
          <SearchBox
            onChangeHandler={onSearchStringChange}
            placeholder={"Search Model"}
          />
        </Box>

        <MenuDivider />

        {filteredModels().map((model: any) => {
          return (
            <MenuItem key={model.id} onClick={() => setSelectedModel(model)}>
              {model.name}
            </MenuItem>
          );
        })}
        <Box px={2}>
          <Button
            onClick={() =>
              createModel(searchString, (model) => console.log(model))
            }
            disabled={
              filteredModels().length !== 0 || searchString.length === 0
            }
            w={"full"}
            leftIcon={<Add />}
          >
            Add {searchString}
          </Button>
        </Box>
      </MenuList>
    </Menu>
  );
}
