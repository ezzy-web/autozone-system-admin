import React from 'react';
import { ElementType } from 'react';


interface ListingProps {
  dataset: any[];
  RenderComponent: ElementType;
}


export default function Listing(props: ListingProps) {
  const { dataset, RenderComponent } = props
  
  return (
    <>
    { dataset.map( data => {
      return <RenderComponent key={data.id} data={data} />;
    } )}
    </>
  );
}
