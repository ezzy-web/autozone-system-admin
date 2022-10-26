import React from 'react'
import MakeContextProvider from '../../context/make.context';
import MakeModelModule from './make-model-module.component';

export default function MakeModelModContainer() {
  console.log("Container")
  return (
    <MakeContextProvider>
        <MakeModelModule/>
    </MakeContextProvider>
  )
}
