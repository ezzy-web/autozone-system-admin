import { Box } from "@chakra-ui/react";
import React from "react";
import useModels from "../../hooks/models.hook";
import Listing from "../listing/listing.component";
import SearchBox from "../search-box/search-box.component";
import Create from "./create.component";
import Model from "./model.component";
import InputUpdate from "../input-update/input-update.component";
import DeleteButton from "./delete-button.component";
import { useContext } from "react";
import { ModelContext } from "../../context/model.context";
import { MakeContext } from "../../context/make.context";
import { useEffect } from "react";

interface MakeProps {
  data: {
    id: number;
    name: string;
  };
}

export default function Make(props: MakeProps) {
  const { data: make } = props;

  const makeCtx = useContext(MakeContext);
  const modelCtx = useContext(ModelContext);

  if (!makeCtx) return <></>;
  if (!modelCtx) return <></>;

  const { updateMake, removeMake } = makeCtx;
  const { filteredModels, onSearchStringChange, createModel, setMake } =
    modelCtx;

  const makeUpdateHandler = (value: string) =>
    updateMake(make.id, { name: value });
  const makeRemoveHandler = () => removeMake(make.id);

  useEffect(() => {
    if (make) setMake(make);
  }, [make]);

  return (
    <Box m={2} p={5} bg={"blackAlpha.300"}>
      <DeleteButton aria_label={"Delete Make"} remove={makeRemoveHandler} />

      <InputUpdate value={make.name} updateHandler={makeUpdateHandler} />

      <SearchBox
        onChangeHandler={onSearchStringChange}
        placeholder={"Search Models"}
      />

      <Listing
        dataset={filteredModels()}
        RenderComponent={(props: any) => <Model {...props} />}
      />

      <Create
        createHandler={createModel}
        label={"Add Model"}
        aria_label={"Add Model"}
      />
    </Box>
  );
}
