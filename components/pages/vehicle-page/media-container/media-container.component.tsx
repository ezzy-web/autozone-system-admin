import { useState, useEffect, useContext } from 'react';
import Fslightbox from "fslightbox-react";
import MediaDND from "./media-dnd-container.component";
import MediaUploadContainer from "./media-upload-container.component";
import { VehicleContext, VehicleContextType } from '../../../../context/vehicle.context';



interface MediaContainerProps {}


function MediaContainer(props: MediaContainerProps) {
  const ctx = useContext(VehicleContext)
  if (!ctx) return <></>


  
  const { vehicle } = ctx
  const [media, setMedia] = useState<any[]>([]);
  const [lightBox, setLightBox] = useState({
    srcIndex: 0,
    toggler: false,
  });

  const openLightbox = (index: number) => {
    setLightBox({ srcIndex: index, toggler: !lightBox.toggler });
  };

  useEffect(() => {
    if (ctx) setMedia(vehicle.media ? [] : [])
  }, [ctx])

  return (
    <>
    <MediaDND />
      <MediaUploadContainer id={vehicle.id} />
      

      <Fslightbox
        toggler={lightBox.toggler}
        sources={media.map((media) => media)}
        sourceIndex={lightBox.srcIndex}
        types={media.map((media: any) => media.type)}
      />
    </>
  );
}

export default MediaContainer;
