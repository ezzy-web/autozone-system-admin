import { Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import { ModelContext } from "../../context/model.context";
import InputUpdate from "../input-update/input-update.component";
import DeleteButton from "./delete-button.component";

interface ModelProps {
  data: {[key:string]: any};
}

export default function Model(props: ModelProps) {
  const { data: model } = props;

  const modelCtx = useContext(ModelContext)
  if (!modelCtx) return <></>

  const { updateModel, removeModel} = modelCtx

  const modelUpdateHandler = (value: string) => updateModel(model.id, { name: value });
  const modelRemoveHandler = () => removeModel(model.id);

  return (
    <Box m={2} p={1} bg={"blackAlpha.300"}>
      <DeleteButton remove={modelRemoveHandler} aria_label={"Delete Model"} />
      <InputUpdate value={model.name} updateHandler={modelUpdateHandler} />
    </Box>
  );
}
