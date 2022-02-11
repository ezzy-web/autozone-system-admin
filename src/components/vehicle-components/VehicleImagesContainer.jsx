import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Tooltip,
} from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-drag";

function FileUpload(props) {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg,image/png",
    });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <ListItem key={file.path}>
      <small className="text-muted">
        {file.path} - {file.size} bytes
      </small>
    </ListItem>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <ListItem key={e.code}>
            <small className="text-muted">{e.message}</small>
          </ListItem>
        ))}
      </ul>
    </li>
  ));

  return (
    <section className="container">
      <div
        className="dropzone-container"
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} />
        <small className="text-muted">
          Drag and drop media files here, or click to select files <br />
          (Only *.jpeg and *.png images will be accepted)
        </small>
      </div>

      <aside className="my-2">
        {acceptedFileItems.length > 0 ? (
          <>
            <Typography variant="button">
              {" "}
              <small>Accepted files</small>{" "}
            </Typography>
            <List>{acceptedFileItems}</List>
          </>
        ) : (
          <></>
        )}

        {fileRejectionItems.length > 0 ? (
          <>
            <Typography variant="button">
              {" "}
              <small>Rejected files</small>{" "}
            </Typography>
            <List>{fileRejectionItems}</List>
          </>
        ) : (
          <></>
        )}
      </aside>
      <Button
        className="my-2"
        disabled={!(acceptedFileItems.length > 0)}
        variant="contained"
        onClick={() => console.log(acceptedFileItems)}
      >
        Upload Images
      </Button>
    </section>
  );
}

function ImageComponent(props) {
  const image = props?.image;

  if (image) {
    return (
      <div className="dropzone-img-component">
        <div className="dropzone-image-container">
          <div className="image-box">
            <img src={image} alt="" />
          </div>
          <div className="overlay-container">
          <Tooltip title="Fullscreen" >
            <div className="control-btn">
              <span>
                <i className="lni lni-full-screen"></i>
              </span>
            </div>


          </Tooltip>
            <Tooltip title="Delete Image" >
              <div className="control-btn">
                <span>
                  <i className="lni lni-trash-can"></i>
                </span>
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    );
  }

  return <></>;
}

export default function VehicleImagesContainer(props) {
  const updateVehicle = props?.updateVehicle;
  const [images, setImages] = React.useState(props?.images);

  const handleChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    const nextState = swap(images, sourceIndex, targetIndex);
    setImages(nextState);
    updateVehicle({ images: images });
  };
  return (
    <div className="my-3">
      <Box>
        {(images?.length > 0) | images ? (
          <div className="img-dropzone-main-container">
            <GridContextProvider onChange={handleChange}>
              <GridDropZone
                id="images-grid-container"
                boxesPerRow={4}
                rowHeight={130}
                style={{ minHeight: "70vh" }}
              >
                {images.map((image) => (
                  <GridItem key={image}>
                    <ImageComponent image={image} />
                  </GridItem>
                ))}
              </GridDropZone>
            </GridContextProvider>
          </div>
        ) : (
          <div className="table-loading">
            <Typography className="text-muted" variant="button">
              No Images Available
            </Typography>
          </div>
        )}
      </Box>

      <Box className="my-5">
        <FileUpload />
      </Box>
    </div>
  );
}
