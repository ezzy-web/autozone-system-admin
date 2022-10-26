import React from "react";
import MakeContextProvider from "../../context/make.context";
import ModelContextProvider from "../../context/model.context";
import { useState, useEffect, useContext } from 'react';
import { HStack } from "@chakra-ui/react";
import MakeInput from "./make-input.component";
import ModelInput from "./model-input.component";
import useMake from "../../hooks/makes.hook";
import useModels from "../../hooks/models.hook";
import { MakeContext } from '../../context/make.context';
import { ModelContext } from '../../context/model.context';
import MakeModelInputContainer from "./make-model-input-component";

interface MakeModelInputProps {
  model?: any;
  setValue: (value: string) => void;
}

export default function MakeModelInput(props: MakeModelInputProps) {
  const { model, setValue } = props;

  return (
    <MakeContextProvider>
      <ModelContextProvider>
        <MakeModelInputContainer model={model} setValue={setValue}/>
      </ModelContextProvider>
    </MakeContextProvider>
  );
}
