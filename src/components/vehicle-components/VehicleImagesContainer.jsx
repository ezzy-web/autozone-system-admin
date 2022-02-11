import React from "react";
import { Box, Typography, List, ListItem, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap
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

export default function VehicleImagesContainer(props) {
  const updateVehicle = props?.updateVehicle;
  const [images, setImages] = React.useState(props?.images);

  const handleChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    const nextState = swap(images, sourceIndex, targetIndex);
    setImages(nextState);
    updateVehicle({images: images})
  };
  return (
    <div className="my-3">
      <Box>
        {(images?.length > 0) | images ? (
          <>
            <GridContextProvider onChange={handleChange}>
              <GridDropZone
                id="images-grid-container"
                boxesPerRow={4}
                rowHeight={80}
                style={{ minHeight: "70vh" }}
              >
                {images.map((image) => (
                  <GridItem key={image}>{image}</GridItem>
                ))}
              </GridDropZone>
            </GridContextProvider>
          </>
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
