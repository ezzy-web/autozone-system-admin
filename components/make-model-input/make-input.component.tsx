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
import { MakeContext } from "../../context/make.context";

interface MakeInputProps {}

export default function MakeInput(props: MakeInputProps) {
  const ctx = useContext(MakeContext);

  if (!ctx) return <></>;
  const {
    selectedMake: make,
    onSearchStringChange,
    filteredMakes,
    setSelectedMake,
    searchString,
    createMake,
  } = ctx;

  return (
    <Menu>
      <MenuButton
        textAlign={"left"}
        w={"full"}
        as={Button}
        rightIcon={<Down />}
      >
        {make ? make.name : "Select Make"}
      </MenuButton>
      <MenuList>
        <Box p={2}>
          <SearchBox
            onChangeHandler={onSearchStringChange}
            placeholder={"Search Make"}
          />
        </Box>

        <MenuDivider />

        {filteredMakes().map((make) => {
          return (
            <MenuItem key={make.id} onClick={() => setSelectedMake(make)}>
              {make.name}
            </MenuItem>
          );
        })}

        <Box px={2}>
          <Button
            onClick={() =>
              createMake(searchString, (make) => console.log(make))
            }
            disabled={filteredMakes().length !== 0 || searchString.length === 0}
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
