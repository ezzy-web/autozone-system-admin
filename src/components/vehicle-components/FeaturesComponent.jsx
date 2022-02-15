import React, { useState } from "react";
import { Typography, Toolbar, Button } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { TextField } from "@mui/material";

function FeatureContainer(props) {
  const header = props.header;
  const editModal = props.editModal;
  const index = props.index;
  const deleteFeature = props.deleteFeature

  return (
    <>
      <div className="container">
        {/* Feature Header */}
        <div className="feature-header">
          <Toolbar className="d-flex space-between">
            <Typography variant="h6">{header.title}</Typography>
            <div className="d-flex">
              <Button
                size="small"
                onClick={() =>
                  editModal("header", header.title, false, index, 0)
                }
              >
                <small>Edit</small>
              </Button>
              <Button onClick={() => deleteFeature("header", index)} size="small">
                <small>Delete</small>
              </Button>
              <Button
                size="small"
                onClick={() => editModal("feature", "", true, index, 0)}
              >
                <small>Add Feature</small>
              </Button>
            </div>
          </Toolbar>
        </div>

        {/* Features */}
        {header.features.length === 0 ? (
          <div className="d-flex justify-content-center">
            <Typography className="text-muted" variant="button">
              Add {header.title} Features
            </Typography>
          </div>
        ) : (
          <>
            {header.features.map((feature, key) => (
              <div key={key}>
                <div className="separator my-1" />
                <div className="d-flex space-between">
                  <div className="w-75">
                    <p className="text-muted w-100">{feature}</p>
                  </div>
                  <div className="px-2">
                    <Button
                      size="small"
                      onClick={() =>
                        editModal("feature", feature, false, index, key)
                      }
                    >
                      <small>Edit</small>
                    </Button>
                    <Button size="small" onClick={() => deleteFeature("feature", index, key)}>
                      <small>Delete</small>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="separator my-3"></div>
    </>
  );
}

function EditField(props) {
  const modalToggle = props.modalToggle;
  const handleUpdate = props?.updateFeature;
  const type = props?.type;
  const isNew = props?.isNew;

  const [value, setValue] = useState(props.value ? props.value : "");
  return (
    <>
      <Modal.Header
        closeButton={
          <>
            <span>
              <i className="lni lni-close"></i>
            </span>
          </>
        }
      />
      <Modal.Body>
        <div className="container">
          <Typography variant="h6">{props?.title}</Typography>

          <div className="my-3">
            <TextField
              fullWidth
              value={value}
              onChange={(e) => setValue(e.target.value)}
              multiline={props?.multi}
            />
          </div>

          <div className="my-1 d-flex">
            <Button fullWidth onClick={() => modalToggle(false)}>
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={() =>
                handleUpdate(
                  value,
                  type,
                  isNew,
                  props?.headerIndex,
                  props?.featureIndex
                )
              }
            >
              Save
            </Button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
}

export default function FeaturesComponent(props) {
  const [features, setFeatures] = React.useState(props.features);
  const [editModalCollapse, setEditModalCollapse] = React.useState(false);
  const [editOptions, setEditOptions] = React.useState({});

  const updateVehicle = props.updateVehicle

  const handleOpenEditModal = (
    type,
    value,
    isNew,
    headerIndex,
    featureIndex
  ) => {
    if (type.includes("header")) {
      if (isNew) {
        setEditOptions({
          multi: false,
          title: "New Header Title",
          isNew,
          type,
          headerIndex,
          featureIndex,
        });
      } else {
        setEditOptions({
          multi: false,
          value,
          title: "Edit Header Title",
          isNew,
          type,
          headerIndex,
          featureIndex,
        });
      }

      setEditModalCollapse(true);
    } else if (type.includes("feature")) {
      if (isNew) {
        setEditOptions({
          multi: true,
          title: "New Feature",
          isNew,
          type,
          headerIndex,
          featureIndex,
        });
      } else {
        setEditOptions({
          multi: true,
          value,
          title: "Edit Feature",
          isNew,
          type,
          headerIndex,
          featureIndex,
        });
      }

      setEditModalCollapse(true);
    }
  };

  const deleteFeature = (type, headerIndex, featureIndex) => { 
      var lst = features.slice()
      if (type.includes("header")) {
          lst.splice(headerIndex, 1)
      } else if (type.includes("feature")) {
          lst[headerIndex].features.splice(featureIndex, 1)
      }

      updateVehicle({name: "features", value: lst})
  }

  const updateFeatures = (val, type, isNew, headerIndex, featureIndex) => {
    var lst = features.slice();
    if (type.includes("header")) {
      if (isNew) {
        lst.push({
          title: val,
          features: [],
        });
      } else {
        lst[headerIndex].title = val;
      }
    } else if (type.includes("feature")) {
      if (isNew) {
        lst[headerIndex].features.push(val);
      } else {
        lst[headerIndex].features[featureIndex] = val;
      }
    }

    updateVehicle({name: "features", value: lst})
    setEditModalCollapse(false);
  };

  React.useEffect(() => setFeatures(props.features), [props]);
  return (
    <>
      <div className="header">
        <Toolbar className="d-flex space-between">
          <Typography variant="h5">Features and Specifications</Typography>
        </Toolbar>
      </div>

      {features.length === 0 ? (
        <div className="table-loading">
          <Typography className="text-muted" variant="button">
            No Feature Listed
          </Typography>
        </div>
      ) : (
        <>
          {features.map((feature, key) => (
            <FeatureContainer
              key={key}
              index={key}
              header={feature}
              editModal={handleOpenEditModal}
              deleteFeature={deleteFeature}
            />
          ))}
        </>
      )}
      <Button
        size="small"
        className="w-100"
        onClick={() => handleOpenEditModal("header", "", true, 0, 0)}
      >
        <span className="px-2">
          <i className="lni lni-plus"></i>
        </span>{" "}
        Add Feature Heading
      </Button>

      <Modal
        show={editModalCollapse}
        onHide={() => setEditModalCollapse(false)}
      >
        <>
          <EditField
            title={editOptions?.title}
            multi={editOptions?.multi}
            value={editOptions?.value}
            isNew={editOptions?.isNew}
            headerIndex={editOptions?.headerIndex}
            featureIndex={editOptions?.featureIndex}
            type={editOptions?.type}
            modalToggle={setEditModalCollapse}
            updateFeature={updateFeatures}
          />
        </>
      </Modal>
    </>
  );
}
