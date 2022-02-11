import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
  Card,
  CircularProgress,
  Toolbar,
  Typography,
  Button,
  TextField,
  MenuItem,
} from "@material-ui/core";

import { Tabs, Tab } from "@mui/material";

import { TabPanel, TabContext } from "@mui/lab";

const ContentContainer = React.lazy(() =>
  import("../components/vehicle-components/VehicleContentContainer")
);

const ImageContent = React.lazy(() =>
  import("../components/vehicle-components/VehicleImagesContainer")
);

function EditField(props) {
  const modalToggle = props.modalToggle;
  const handleUpdate = props.updateVehicle;
  const type = props?.type ? props.type : "text";

  const [value, setValue] = useState(props.value);
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
            {type === "select" ? (
              <TextField
                select
                fullWidth
                value={value}
                onChange={(e) => setValue(e.target.value)}
              >
                {props.options.map((option) => (
                  <MenuItem value={option.value} key={option.value}>
                    {" "}
                    {option.label}{" "}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                fullWidth
                type={type}
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            )}
          </div>

          <div className="my-1 d-flex">
            <Button fullWidth onClick={() => modalToggle(false)}>
              Cancel
            </Button>
            <Button
              fullWidth
              onClick={() => handleUpdate({ name: props.name, value: value })}
            >
              Save
            </Button>
          </div>
        </div>
      </Modal.Body>
    </>
  );
}

function CardLoadState() {
  return (
    <div className="table-loading">
      <CircularProgress />
    </div>
  );
}

export default function VehiclePage(props) {
  const [vehicle, setVehicle] = useState(null);
  const [loaded, setLoad] = useState(true);
  const [changes, setChanges] = useState(false);
  const [editOptions, setEditOptions] = useState({});
  const [editModalCollapse, setEditModalCollapse] = useState(false);
  const [tabValue, setTab] = useState(0);

  const handleTabChange = (e, newVal) => {
    setTab(newVal);
  };

  const handleEditModalOpen = (options) => {
    setEditOptions(options);
    setEditModalCollapse(true);
  };

  const getVehicle = () => {
    setVehicle({
      images: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 117, 23, 24, 25,
        223, 123, 432,
      ],
    });
    setLoad(false);
    setLoad(true);
  };

  const updateVehicle = (object) => {
    setChanges(true);
    setEditModalCollapse(false);
    console.log(object?.value, object?.name);
    object?.images
      ? console.log(object?.images, vehicle?.images)
      : console.log("Hello");
  };

  const saveChanges = () => {
    setLoad(false);
    setLoad(true);
    setChanges(false);
  };

  useEffect(() => {
    getVehicle();
  }, []);

  return (
    <div>
      <Toolbar>
        <Typography variant="h5" component={"h1"}>
          {"Vehicle Title"}{" "}
          <Button
            className="mx-3"
            disabled={!changes}
            variant="text"
            size="small"
            onClick={saveChanges}
          >
            <small>Save Changes</small>
            <span className="mx-1">
              <i className="lni lni-save"></i>
            </span>
          </Button>
        </Typography>
      </Toolbar>
      <div className="row">
        <div className="col-md-4 col-sm-12 my-5">
          <Card>
            {loaded ? (
              <>
                <div className="container py-5"></div>
              </>
            ) : (
              <CardLoadState />
            )}
          </Card>
        </div>
        <div className="col-md-8 col-sm-12">
          <Card>
            {loaded ? (
              <TabContext value={tabValue.toString()}>
                <Tabs
                  value={tabValue}
                  onChange={handleTabChange}
                  variant="scrollable"
                >
                  <Tab value={0} label="Specifications" />
                  <Tab value={1} label="Images" />
                  <Tab value={2} label="Features" />
                </Tabs>
                <TabPanel value="0">
                  <ContentContainer
                    data={vehicle}
                    handleEditModalOpen={handleEditModalOpen}
                  />
                </TabPanel>
                <TabPanel value="1">
                  <ImageContent
                    images={vehicle?.images}
                    updateVehicle={updateVehicle}
                  />
                </TabPanel>
                <TabPanel value="2">Item Three</TabPanel>
              </TabContext>
            ) : (
              <CardLoadState />
            )}
          </Card>
        </div>
      </div>

      <Modal
        show={editModalCollapse}
        onHide={() => setEditModalCollapse(false)}
      >
        <>
          <EditField
            name={editOptions?.name}
            type={editOptions.type}
            title={editOptions?.title}
            options={editOptions?.options}
            updateVehicle={updateVehicle}
            value={editOptions?.value}
            modalToggle={setEditModalCollapse}
          />
        </>
      </Modal>
    </div>
  );
}
