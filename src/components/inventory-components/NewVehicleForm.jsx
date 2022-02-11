import React from "react";

import { Modal } from "react-bootstrap";
import {
  Divider,
  Button,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import httpClient from "../../httpClient";

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

export default function NewVehicleForm(props) {
  const toggleModal = props.toggleModal;

  const schema = yup.object().shape({
    make: yup.string().required("This field is required"),
    model: yup.string().required("This field is required"),
    submodel: yup.string(),
    year: yup.string().required("This field is required"),
    body: yup.string().required("This field is required"),
    color: yup.string().required("This field is required"),
    location: yup.string().required("This field is required"),
    arrival: yup.string(),
    engine_no: yup.string().required("This field is required"),
    chassis: yup.string().required("This field is required"),
    history: yup.string().required("This field is required"),
    mileage: yup.string().required("This field is required"),
    engine_size: yup.string().required("This field is required"),
    trans: yup.string().required("This field is required"),
    price: yup.string().required("This field is required"),
    price_cond: yup.string().required("This field is required"),
    price_visible: yup.boolean(),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    httpClient()
      .post("/createVehicle", data)
      .then((res) => {
        
        const body = res.data
        if (body.status) {
          toggleModal(false)

          return;
        }

        const content = body.content
        if (content.includes("auth/required")) {
          window.location.reload()
        }

        console.log(content);
      })
      .catch((err) => {
        
            console.log(err);
      });
  };

  return (
    <div>
      <div className="container">
        <Modal.Header
          closeButton={
            <Button>
              <span>
                <i className="lni lni-close"></i>
              </span>
            </Button>
          }
        />

        <Modal.Body>
          <form onSubmit={handleSubmit((data) => submit(data))}>
            <Typography variant={"h6"} component={"h1"}>
              {" "}
              Add New Vehicle{" "}
            </Typography>

            <div className="container">
              <div className="my-2">
                <Typography variant={"caption"} component={"h4"}>
                  {" "}
                  Vehicle Description{" "}
                </Typography>
                <Divider />
              </div>

              <div className="row">
                <div className="col-6 p-2">
                  <Controller
                    name="make"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Make"
                        className="w-100"
                        error={errors.make ? true : false}
                        helperText={errors?.make?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div className="col-6 p-2">
                  <Controller
                    name="model"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Model"
                        className="w-100"
                        error={errors.model ? true : false}
                        helperText={errors?.model?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6 p-2">
                  <Controller
                    name="submodel"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Submodel"
                        className="w-100"
                        error={errors.submodel ? true : false}
                        helperText={errors?.submodel?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div className="col-6 p-2">
                  <Controller
                    name="year"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        select
                        label="Year"
                        className="w-100"
                        error={errors.year ? true : false}
                        helperText={errors?.year?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {options.year.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {" "}
                            {option.label}{" "}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6 p-2">
                  <Controller
                    name="body"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        select
                        label="Body Type"
                        className="w-100"
                        error={errors.body ? true : false}
                        helperText={errors?.body?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {options.body.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {" "}
                            {option.label}{" "}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </div>
                <div className="col-6 p-2">
                  <Controller
                    name="color"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Colour"
                        className="w-100"
                        error={errors.color ? true : false}
                        helperText={errors?.color?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-6 p-2">
                  <Controller
                    name="location"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        select
                        label="Current Location"
                        className="w-100"
                        error={errors.location ? true : false}
                        helperText={errors?.location?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {options.location.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {" "}
                            {option.label}{" "}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </div>
                <div className="col-6 p-2">
                  <Controller
                    name="arrival"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Arrival Date"
                        className="w-100"
                        type="date"
                        error={errors.arrival ? true : false}
                        helperText={errors?.arrival?.message}
                        value={value}
                        onChange={onChange}
                        placeholder="Arrival Date"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="my-2">
                <Typography variant={"caption"} component={"h4"}>
                  {" "}
                  Vehicle Information{" "}
                </Typography>
                <Divider />
              </div>

              <div className="row">
                <div className="col-6 p-2">
                  <Controller
                    name="engine_no"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Engine No."
                        className="w-100"
                        error={errors.engine_no ? true : false}
                        helperText={errors?.engine_no?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div className="col-6 p-2">
                  <Controller
                    name="chassis"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Chassis No."
                        className="w-100"
                        error={errors.chassis ? true : false}
                        helperText={errors?.chassis?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="container p-2">
                <Controller
                  name="history"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      select
                      label="History"
                      className="w-100"
                      error={errors.history ? true : false}
                      helperText={errors?.history?.message}
                      value={value}
                      onChange={onChange}
                    >
                      {options.history.map((option) => (
                        <MenuItem value={option.value} key={option.value}>
                          {" "}
                          {option.label}{" "}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>

              <div className="row">
                <div className="col-6 p-2">
                  <Controller
                    name="mileage"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Mileage"
                        className="w-100"
                        type={"real"}
                        error={errors.mileage ? true : false}
                        helperText={errors?.mileage?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
                <div className="col-6 p-2">
                  <Controller
                    name="engine_size"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Engine Size"
                        className="w-100"
                        type="number"
                        error={errors.engine_size ? true : false}
                        helperText={errors?.engine_size?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="container p-2">
                <Controller
                  name="trans"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      select
                      label="Transmission"
                      className="w-100"
                      error={errors.trans ? true : false}
                      helperText={errors?.trans?.message}
                      value={value}
                      onChange={onChange}
                    >
                      {options.trans.map((option) => (
                        <MenuItem value={option.value} key={option.value}>
                          {" "}
                          {option.label}{" "}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>

              <div className="my-2">
                <Typography variant={"caption"} component={"h4"}>
                  {" "}
                  Vehicle Pricing{" "}
                </Typography>
                <Divider />
              </div>

              <div className="container p-2">
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      label="Asking Price"
                      type="real"
                      className="w-100"
                      error={errors.price ? true : false}
                      helperText={errors?.price?.message}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>

              <div className="row">
                <div className="col-6 p-2">
                  <Controller
                    name="price_cond"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        select
                        label="Price Condition"
                        className="w-100"
                        error={errors.price_cond ? true : false}
                        helperText={errors?.price_cond?.message}
                        value={value}
                        onChange={onChange}
                      >
                        {options.price_cond.map((option) => (
                          <MenuItem value={option.value} key={option.value}>
                            {" "}
                            {option.label}{" "}
                          </MenuItem>
                        ))}
                      </TextField>
                    )}
                  />
                </div>
                <div className="col-6 p-2">
                  <Controller
                    name="price_visible"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={onChange}
                            checked={value}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="Price Visible"
                      />
                    )}
                  />
                </div>
              </div>

              <div className="my-5 d-flex">
                <Button
                  variant="text"
                  onClick={() => toggleModal(false)}
                  className="w-100"
                >
                  Cancel
                </Button>
                <Button variant="text" type="submit" className="w-100">
                  Add to Inventory
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </div>
    </div>
  );
}
