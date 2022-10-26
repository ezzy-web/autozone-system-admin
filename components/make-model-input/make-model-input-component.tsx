import { HStack } from "@chakra-ui/react";
import React, { useContext, useEffect } from "react";
import { MakeContext } from "../../context/make.context";
import { ModelContext } from "../../context/model.context";
import useMake from "../../hooks/makes.hook";
import useModels from "../../hooks/models.hook";
import MakeInput from "./make-input.component";
import ModelInput from "./model-input.component";


interface MakeModelProps {
  model: number
  setValue: (val: string) => void
}

export default function MakeModelInputContainer(props: MakeModelProps) {
  const { model, setValue } = props
  const makeContext = useContext(MakeContext)
  const modelContext = useContext(ModelContext)

  if (!makeContext) return <></>
  if (!modelContext) return <></>


  const { selectedMake, setSelectedMake } = makeContext
  const { setMake, selectedModel, setSelectedModel } = modelContext


  const { get: getMake } = useMake()
  const { get: getModel } = useModels()


  const handleGetModel = () => {
    getModel(model)
    .then( model => {
      getMake(model.make)
      .then( make => {
        setSelectedMake(make)
        setSelectedModel(model)
      })
    })
    .catch( error => console.error(error) )
  }


  useEffect(() => {
    if (model) handleGetModel()
  }, [])


  useEffect(() => {
    if (!selectedMake) return;
    setMake(selectedMake)
    // setSelectedModel(null);
    model ? setValue(String(model)) : setValue("-1");
  }, [selectedMake]);

  useEffect(() => {
    if (selectedModel) setValue(selectedModel.id);
  }, [selectedModel]);

  
  return (
    <HStack w={"full"} justifyContent={"space-evenly"}>
      <MakeInput />
      <ModelInput />
    </HStack>
  );
}
