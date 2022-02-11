import React from "react";
import { Button, Divider, Typography } from "@material-ui/core";

const options = {
  year: [
    { value: 2010, label: "2010" },
    { value: 2011, label: "2011" },
    { value: 2012, label: "2012" },
    { value: 2013, label: "2013" },
    { value: 2014, label: "2014" },
    { value: 2015, label: "2015" },
    { value: 2016, label: "2016" },
    { value: 2017, label: "2017" },
    { value: 2018, label: "2018" },
    { value: 2019, label: "2019" },
    { value: 2020, label: "2020" },
    { value: 2021, label: "2021" },
    { value: 2022, label: "2022" },
  ],

  body: [
    { value: "Sedan", label: "Sedan" },
    { value: "Coupe", label: "Coupe" },
    { value: "Pickup", label: "Pick-up" },
    { value: "SUV", label: "SUV" },
    { value: "Truck", label: "Truck" },
    { value: "Bus", label: "Bus" },
  ],

  location: [
    { value: "Transit", label: "In Transit" },
    { value: "On Lot", label: "On Lot" },
  ],

  history: [
    { value: "Imported", label: "Imported" },
    { value: "Pre-owned", label: "Pre-owned" },
  ],

  trans: [
    { value: "Automatic", label: "Automatic" },
    { value: "Manaul", label: "Manual" },
    { value: "Tiptronic", label: "Tiptronic" },
  ],

  price_cond: [
    { value: "Negotiable", label: "Negotiable" },
    { value: "Non-Negotiable", label: "Non-Negotiable" },
  ],
};

export default function VehicleContentContainer(props) {
  const handleEditModalOpen = props.handleEditModalOpen;
  const data = props?.data
  return (
    <>
      <div className="my-2 container">
        <Typography variant="button" component={"h4"}>
          {" "}
          Vehicle Description{" "}
        </Typography>
        <Divider />
      </div>
      <div className="container py-3 row">
        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Make</small>
            </div>
            <small>
              <b>{data?.make}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "make",
                  title: "Edit Make",
                  value: data?.make,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Model</small>
            </div>
            <small>
              <b>{data?.model}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "model",
                  title: "Edit Model",
                  value: data?.model,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Submodel</small>
            </div>
            <small>
              <b>{data?.submodel}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "submodel",
                  title: "Edit Submodel",
                  value: data?.submodel,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Year</small>
            </div>
            <small>
              <b>{data?.year}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "year",
                  title: "Edit Year",
                  value: data?.year,
                  options: options.year,
                  type: "select",
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Body Type</small>
            </div>
            <small>
              <b>{data?.body}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "body",
                  title: "Edit Body Type",
                  value: data?.body,
                  type: "select",
                  options: options.body,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Colour</small>
            </div>
            <small>
              <b>{data?.color}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "color",
                  title: "Edit Colour",
                  value: data?.color,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Engine No.</small>
            </div>
            <small>
              <b>{data?.engine_no}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "engine_no",
                  title: "Edit Engine Number",
                  value: data?.engine_no,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Chassis No.</small>
            </div>
            <small>
              <b>{data?.chassis}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "chassis",
                  title: "Edit Chassis Number",
                  value: data?.chassis,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Engine Size</small>
            </div>
            <small>
              <b>{data?.engine_size} CC</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "engine_size",
                  title: "Edit Engine Size",
                  value: data?.engine_size,
                  type: "number",
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Mileage</small>
            </div>
            <small>
              <b>{data?.mileage} MI</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "mileage",
                  title: "Edit Mileage",
                  value: data?.mileage,
                  type: "real",
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Transmission</small>
            </div>
            <small>
              <b>{data?.trans}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "trans",
                  title: "Edit Transmission",
                  value: data?.trans,
                  type: "select",
                  options: options.trans,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>
      </div>
      <div className="my-2 container">
        <Typography variant="button" component={"h4"}>
          {" "}
          Vehicle Information{" "}
        </Typography>
        <Divider />
      </div>
      <div className="container py-3 row">
        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">History</small>
            </div>
            <small>
              <b>{data?.history}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "history",
                  title: "Edit Vehicle History",
                  value: data?.history,
                  type: "select",
                  options: options.history,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Location</small>
            </div>
            <small>
              <b>{data?.location}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "location",
                  title: "Edit Vehicle Location",
                  value: data?.location,
                  type: "select",
                  options: options.location,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        {true ? (
          <>
            <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
              <div className="w-100 d-block">
                <div>
                  <small className="text-muted">Arrival Date</small>
                </div>
                <small>
                  <b>{data?.arrival}</b>
                </small>
              </div>
              <div className="w-100 px-2">
                <Button
                  size="small"
                  onClick={() =>
                    handleEditModalOpen({
                      name: "arrival",
                      title: "Edit Arrival Date",
                      value: data?.arrival,
                      type: "date",
                    })
                  }
                >
                  <small>Edit</small>
                </Button>
              </div>
              <Divider variant="fullWidth" />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="my-2 container">
        <Typography variant="button" component={"h4"}>
          {" "}
          Pricing Information{" "}
        </Typography>
        <Divider />
      </div>

      <div className="container py-3 row">
        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Asking Price</small>
            </div>
            <small>
              <b>{data?.price}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "price",
                  title: "Edit Asking Price",
                  value: data?.price,
                  type: "real",
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>

        <div className="col-md-6 col-sm-12 d-flex align-items-center py-2">
          <div className="w-100 d-block">
            <div>
              <small className="text-muted">Price Condition</small>
            </div>
            <small>
              <b>{data?.price_cond}</b>
            </small>
          </div>
          <div className="w-100 px-2">
            <Button
              size="small"
              onClick={() =>
                handleEditModalOpen({
                  name: "price_cond",
                  title: "Edit Price Condition",
                  value: data?.price_cond,
                  type: "select",
                  options: options.price_cond,
                })
              }
            >
              <small>Edit</small>
            </Button>
          </div>
          <Divider variant="fullWidth" />
        </div>
      </div>
    </>
  );
}
