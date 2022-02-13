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
  Chip,
  Box,
  Switch,
  Divider,
} from "@material-ui/core";

import { Tabs, Tab, Skeleton } from "@mui/material";

import { TabPanel, TabContext } from "@mui/lab";
import httpClient from "../httpClient";

const ContentContainer = React.lazy(() =>
  import("../components/vehicle-components/VehicleContentContainer")
);

const ImageContent = React.lazy(() =>
  import("../components/vehicle-components/VehicleImagesContainer")
);

const FeatureComponent = React.lazy(() => import("../components/vehicle-components/FeaturesComponent"))

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

export default function VehiclePage() {
  const [vehicle, setVehicle] = useState(null);
  const [loaded, setLoad] = useState(false);
  const [changes, setChanges] = useState(false);
  const [editOptions, setEditOptions] = useState({});
  const [editModalCollapse, setEditModalCollapse] = useState(false);
  const [tabValue, setTab] = useState(0);

  const [isVisible, setVisible] = useState(true);
  const [isAvailable, setAvailable] = useState(true);
  const [isFeatured, setFeatured] = useState(true);
  const [priceVisible, setPriceVisible] = useState(true);

  const handleTabChange = (e, newVal) => {
    setTab(newVal);
  };

  const handleEditModalOpen = (options) => {
    setEditOptions(options);
    setEditModalCollapse(true);
  };

  const getVehicle = () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("stck");
    if (id) {
      httpClient()
        .post("/getVehicle", { id: url.searchParams.get("stck") })
        .then((res) => {
          const body = res.data;
          if (body.status) {
            var data = body.content;
            var date = data?.arrival ? new Date(parseInt(data.arrival)) : null;
            if (date) {
              date = [date.getFullYear(), date.getMonth(), date.getDate()];

              data.arrival = date.join("-");
            } else {
              data.arrival = "";
            }
            setVehicle(data);
            setAvailable(data.isAvailable);
            setVisible(data.isVisible);
            setFeatured(data.isFeatured);
            setPriceVisible(data.price_visible);
          }
          setLoad(true);
        })
        .catch((err) => {});
    } else {
      setLoad(true);
      return;
    }
  };

  const updateVehicle = (object) => {
    var update = JSON.parse(JSON.stringify(vehicle));
    const name = object?.name;
    const value = object?.value;
    const images = object?.images;
    const appendImages = object?.appendImages;

    if (name) {
      update[name] = value;
    }

    if (images) {
      update["images"] = images.slice();
    }

    if (appendImages) {
      var lst = update.images ? update.images.slice() : [];
      appendImages.forEach((image) => {
        lst.push(image);
      });

      update["images"] = lst;
    }

    setVehicle(update);
    setChanges(true);
    setEditModalCollapse(false);
  };

  const saveChanges = () => {
    setLoad(false);
    httpClient()
      .post("/updateVehicle", vehicle)
      .then((res) => {
        const body = res.data;
        if (body.status) {
          setChanges(false);
          setLoad(true);

          return;
        }

        if (body.content.includes("auth/required")) {
          window.location.reload()
        }

        setLoad(true);
      })
      .catch((err) => {
        setLoad(true);
      });
  };

  const handleStateChange = (event, name) => {
    if (name === "isAvailable") {
      updateVehicle({ name: "isAvailable", value: !isAvailable });
      setAvailable(!isAvailable);
    }

    if (name === "isVisible") {
      updateVehicle({ name: "isVisible", value: !isVisible });
      setVisible(!isVisible);
    }

    if (name === "isFeatured") {
      updateVehicle({ name: "isFeatured", value: !isFeatured });
      setFeatured(!isFeatured);
    }

    if (name === "price_visible") {
      updateVehicle({ name: "price_visible", value: !priceVisible });
      setPriceVisible(!priceVisible);
    }
  };

  const deleteVehicle = () => {
    setLoad(false);
    httpClient().post("/deleteVehicle", { id: vehicle.id })
    .then( res => {
      setLoad(true);
      const body = res.data
      if (body.success) {
        window.location.replace("/admin/management/inventory")
        return;
      }


      if (body.content.includes("auth/required")) {
        window.location.reload()
      }

    })
    .catch( err => {
      setLoad(true);
    })
  }

  window.onbeforeunload = (e) => {
    console.log(changes)
    if (!changes) {
      delete e["returnValue"];
    } else {
      e.returnValue = "";
    }
  }

  useEffect(() => {
    getVehicle();
    
  }, []);

  return (
    <div>
      <Toolbar>
        {loaded ? (
          <Typography variant="h5" component={"h1"}>
            {vehicle.title}{" "}
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
        ) : (
          <>
            <Skeleton className="w-25 my-1" variant="text" />
          </>
        )}
      </Toolbar>
      <div className="row">
        <div className="col-md-4 col-sm-12 my-5">
          <Card>
            {loaded ? (
              <>
                <div className="container my-5">
                  <Toolbar>
                    <Typography variant="h6">{vehicle?.title}</Typography>
                    <Chip
                      className="mx-2"
                      size="small"
                      label={isVisible ? "Visible" : "Not Visible"}
                    />
                  </Toolbar>

                  <Box>
                    <div className="my-3">
                      <Typography className="my-1 mx-2" variant="subtitle2">
                        <b className="text-muted mx-2">Stock No</b>
                        {vehicle?.id}
                      </Typography>
                      <Typography className="my-1 mx-2" variant="subtitle2">
                        <b className="text-muted mx-2">Status</b>
                        {isAvailable ? "Available" : "Sold"}
                      </Typography>
                    </div>

                    <div className="my-2">
                      <Typography className="text-muted" variant="caption">
                        Date Added
                      </Typography>
                      <Typography variant="subtitle2">
                        {Date(vehicle?.timeStamp?.nanoseconds).toLocaleString()}
                      </Typography>
                    </div>

                    <div className="my-2">
                      <Typography className="text-muted" variant="caption">
                        Added by
                      </Typography>
                      <Typography variant="subtitle2">
                        {vehicle?.added_by?.fullName} <br />{" "}
                        <div className="text-muted">
                          {" "}
                          {vehicle?.added_by?.email}{" "}
                        </div>
                      </Typography>
                    </div>

                    <div className="my-2">
                      <Typography className="text-muted" variant="caption">
                        Last Edited by
                      </Typography>
                      <Typography variant="subtitle2">
                        {vehicle?.updated_by?.fullName} <br />{" "}
                        <div className="text-muted">
                          {" "}
                          {vehicle?.updated_by?.email}{" "}
                        </div>
                      </Typography>
                    </div>

                    <div className="my-2">
                      <Typography className="text-muted" variant="caption">
                        Date Last Edited
                      </Typography>
                      <Typography variant="subtitle2">
                        {Date(
                          vehicle?.lastUpdate?.nanoseconds
                        ).toLocaleString()}
                      </Typography>
                    </div>
                  </Box>
                </div>
              </>
            ) : (
              <CardLoadState />
            )}
          </Card>

          <Card className="my-3">
            {loaded ? (
              <>
                <Typography className="m-5" variant="h6" component={"b"}>
                  Settings
                </Typography>
                <Divider />
                <div className="container my-4">
                  <Box>
                    <div className="d-flex align-items-center space-between">
                      <div className="my-2">
                        <Typography variant="subtitle2">Public</Typography>
                        <Typography className="text-muted" variant="caption">
                          Make vehicle visible on website
                        </Typography>
                      </div>
                      <div className="d-flex justify-content-right">
                        <Switch
                          onChange={(e) => handleStateChange(e, "isVisible")}
                          checked={isVisible}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center space-between">
                      <div className="my-2">
                        <Typography variant="subtitle2">Featured</Typography>
                        <Typography className="text-muted" variant="caption">
                          Add Vehicle to featured list
                        </Typography>
                      </div>
                      <div className="d-flex justify-content-right">
                        <Switch
                          onChange={(e) => handleStateChange(e, "isFeatured")}
                          checked={isFeatured}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center space-between">
                      <div className="my-2">
                        <Typography variant="subtitle2">
                          Price Public
                        </Typography>
                        <Typography className="text-muted" variant="caption">
                          Make price public
                        </Typography>
                      </div>
                      <div className="d-flex justify-content-right">
                        <Switch
                          onChange={(e) =>
                            handleStateChange(e, "price_visible")
                          }
                          checked={priceVisible}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </div>
                    </div>

                    <div className="d-flex align-items-center space-between">
                      <div className="my-2">
                        <Typography variant="subtitle2">
                          Change Vehicle Status
                        </Typography>
                        <Typography className="text-muted" variant="caption">
                          Available / Sold
                        </Typography>
                      </div>
                      <div className="d-flex justify-content-right">
                        <Switch
                          onChange={(e) => handleStateChange(e, "isAvailable")}
                          checked={isAvailable}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      </div>
                    </div>
                  </Box>
                </div>
              </>
            ) : (
              <CardLoadState />
            )}
          </Card>
          <Button
            className="my-3 w-100"
            variant="text"
            size="small"
            onClick={deleteVehicle}
            color="secondary"
          >
            <small>Delete Vehicle</small>
          </Button>
        </div>
        <div className="col-md-8 col-sm-12">
          <Card>
            <TabContext value={tabValue.toString()}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                centered
                textColor="secondary"
              >
                <Tab value={0} label="Specifications" />
                <Tab value={1} label="Images" />
                <Tab value={2} label="Features" />
              </Tabs>
              <TabPanel value="0">
                {loaded ? (
                  <ContentContainer
                    data={vehicle}
                    handleEditModalOpen={handleEditModalOpen}
                  />
                ) : (
                  <>
                    <CardLoadState />
                  </>
                )}
              </TabPanel>
              <TabPanel value="1">
                {loaded ? (
                  <ImageContent
                    stock={vehicle?.id}
                    images={vehicle.images ? vehicle.images : []}
                    updateVehicle={updateVehicle}
                  />
                ) : (
                  <>
                    <CardLoadState />
                  </>
                )}
              </TabPanel>
              <TabPanel value="2">
              {loaded ? (
                  <FeatureComponent features={vehicle?.features} updateVehicle={updateVehicle} />
                ) : (
                  <>
                    <CardLoadState />
                  </>
                )}
              </TabPanel>
            </TabContext>
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
