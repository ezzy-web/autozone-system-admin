import React from "react";
import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
} from "react-grid-drag";

import {
  Box,
  Typography,
  List,
  ListItem,
  Button,
  Tooltip,
  LinearProgress,
} from "@material-ui/core";

import { useDropzone } from "react-dropzone";
import { getDownloadURL } from "firebase/storage";
import FsLightbox from "fslightbox-react"

const { storage, ref, uploadBytesResumable, deleteObject } = require("../../util/config");


const deleteFile = (url) => {
  const storageRef = ref(storage, url)
  deleteObject(storageRef)
}

const uploadFile = (file, path) => {
  const storageRef = ref(storage, path);
  const task = uploadBytesResumable(storageRef, file);
  return task;
}



function FileComponent(props) {
  const addImage = props?.addImage;
  const upload = props?.upload;
  const file = props?.file;
  const path = props?.path;
  const [paused, setResume] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [cancel, setCancel] = React.useState(false);
  const [completed, setComplete] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [task, setTask] = React.useState(null)

  const handleSetTask = (newTask) => {
    setTask(newTask)

    newTask?.on(
      "state_changed",
      (snap) => {
        const progress = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(progress);
        switch (snap.state) {
          case "paused":
            setResume(true);
            break;
          case "running":
            setResume(false);
            break;
          default:
            break;
        }
      },

      (error) => {
        setCancel(true);
        addImage(null, true)
      },

      () => {
        setComplete(true);
        getDownloadURL(newTask.snapshot.ref).then((downloadURL) => {
          addImage({
            url: downloadURL,
            ref: newTask.snapshot.ref,
          });
        });
      }
    );
  }

  if (upload) {
    if (!start) {
      const event = uploadFile(file, path)
      handleSetTask(event)
      setStart(!start);
    }
  }

  const handlePause = () => {
    if (!cancel) {
      task?.pause();
    }
  };
  const handleResume = () => {
    if (!cancel) {
      task?.resume();
    }
  };
  const handleCancel = () => {
    if (paused) {
      handleResume()
    }
    task?.cancel();
  };

  return (
    <ListItem>
      <div className="d-block my-2">
        <small
          className={
            completed ? "text-success" : cancel ? "text-danger" : "text-muted"
          }
        >
          {file.path} - {file.size} bytes
        </small>
        {upload ? (
          <>
            {completed | cancel ? (
              <></>
            ) : (
              <>
                <LinearProgress
                  variant={paused ? "indeterminate" : "determinate"}
                  value={progress}
                />
                <div className="d-flex space-between">
                  <Button
                    disabled={cancel ? true : !paused}
                    onClick={handleResume}
                  >
                    <span className="lni lni-play"></span>
                  </Button>
                  <Button
                    disabled={cancel ? true : paused}
                    onClick={handlePause}
                  >
                    <span className="lni lni-pause"></span>
                  </Button>
                  <Button disabled={cancel} onClick={handleCancel}>
                    <span className="lni lni-close"></span>
                  </Button>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </ListItem>
  );
}

var uploadedImages = [];
var uploadCount = 0;

function FileUpload(props) {
  const id = props?.stock;
  const addAcceptedImages = props?.addImage;

  const [upload, setUpload] = React.useState(false);
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      accept: "image/jpeg,image/png",
    });

  const addImage = (image, cancel = false) => {
    if (cancel) {
      uploadCount++;
    }

    if (image) {
      if (uploadCount < acceptedFiles.length) {
        uploadedImages.push(image);
        uploadCount++;
      }
    }
    
    if (upload && (uploadCount === acceptedFiles.length)) {
      setUpload(false);
      addAcceptedImages(uploadedImages);
      uploadCount = 0;
      uploadedImages = [];
    }
  };

  const acceptedFileItems = acceptedFiles.map((file) => (
    <FileComponent
      addImage={addImage}
      key={file.path}
      file={file}
      upload={upload}
      path={
        "vehicle/images/" +
        id +
        "/" +
        (Math.random() + 1).toString(36).substring(7)
      }
    />
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
        className={upload ? "dropzone-container d-none" : "dropzone-container"}
        {...getRootProps({ className: "dropzone" })}
      >
        <input
          {...getInputProps()}
        />
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
        disabled={acceptedFileItems.length === 0 ? !upload : acceptedFileItems.length === uploadCount}
        variant="contained"
        onClick={() => setUpload(true)}
      >
        Upload Images
      </Button>
    </section>
  );
}

function ImageComponent(props) {
  const image = props?.image;
  const index = props?.index
  const handleDelete = props?.handleDelete
  const openLightBox = props.openLightBox

  if (image) {
    return (
      <div className="dropzone-img-component">
        <div className="dropzone-image-container">
          <div className="image-box">
            <img src={image?.url} alt="" />
          </div>
          <div className="overlay-container">
            <Tooltip title="Fullscreen">
              <div onClick={() => openLightBox(index)} className="control-btn">
                <span>
                  <i className="lni lni-full-screen"></i>
                </span>
              </div>
            </Tooltip>
            <Tooltip title="Delete Image">
              <div onClick={handleDelete}  data-index={index} className="control-btn">
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
  const [images, setImages] = React.useState(props.images);
  const [toggle, setToggle] = React.useState({
    srcIndex: 0,
    toggler: false
  })

  const handleChange = (sourceId, sourceIndex, targetIndex, targetId) => {
    const nextState = swap(images, sourceIndex, targetIndex);
    updateVehicle({ images: nextState });
  };

  const handleAddImage = (imageLst) => {
    updateVehicle({ appendImages: imageLst });
  };

  const handleDeleteImage = (e) => {
    const index = parseInt(e.currentTarget.getAttribute("data-index"))
    deleteFile(images[index].url)

    var updatedImages = images.slice()
    updatedImages.splice(index,1)

    updateVehicle({images: updatedImages})
  }

  const openLightBox = (index) => {
    setToggle({srcIndex: index, toggler: !toggle.toggler})
  }

  React.useEffect(() => {
    setImages(props?.images)
  }, [props]);

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
                style={{ minHeight: "50vh" }}
              >
                {images.map((image, index) => (
                  <GridItem key={image?.ref?._location?.path_}>
                    <ImageComponent image={image} index={index} handleDelete={handleDeleteImage} openLightBox={openLightBox} />
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
        <FileUpload stock={props?.stock} addImage={handleAddImage} />
      </Box>

      <FsLightbox 
        toggler={toggle.toggler}
        sources={images.map( image => {
          return image.url
        })}
        sourceIndex={toggle.srcIndex}
        type="image"
      />
    </div>
  );
}
