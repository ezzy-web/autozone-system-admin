import React from "react";

import { Modal } from "react-bootstrap";
import { Typography, Button, Divider, MenuItem, CircularProgress } from "@material-ui/core";
import { Backdrop, TextField } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {httpClient, addActivity} from ".././../httpClient";


export default function NewUserForm(props) {
  const toggleModal = props.toggleModal
  const handleOpenSnackBar = props.handleOpenSnackBar
  const [loaded, setLoad] = React.useState(false)

  const schema = yup.object().shape({
    firstName: yup.string().required("This field is required"),
    lastName: yup.string().required("This field is required"),
    position: yup.string().required("This field is required"),
    access: yup.string().required("This field is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(schema)
  });

  const registerUser = (data) => {
    setLoad(true)
    httpClient()
      .post("/createUser", data)
      .then((res) => {
        const body = res.data
        if (body.status) {
          toggleModal(false)
          addActivity("New Member", "New member was added to the system (" + data.email + ")")
          handleOpenSnackBar("Successfully registered new member")
        } else {
          handleOpenSnackBar("Something went wrong")
        }
        setLoad(false)
      })
      .catch((err) => {
        setLoad(false)
      });
  };
  return (
    <>
    <Backdrop sx={{ zIndex: 'tooltip' }} open={loaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
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
          <form onSubmit={handleSubmit((data) => registerUser(data))}>
            <Typography variant={"h6"} component={"h1"}>
              {" "}
              Add New Member{" "}
            </Typography>
            <div className={"container"}>
              <div className="row my-4">
                <div className="col-6">
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="First Name"
                        className="w-100"
                        error={errors.firstName ? true : false}
                        helperText={errors?.firstName?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>

                <div className="col-6">
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Last Name"
                        className="w-100"
                        error={errors.lastName ? true : false}
                        helperText={errors?.lastName?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>

                <Divider />

                <div className="my-3">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Email"
                        className="w-100"
                        error={errors.email ? true : false}
                        helperText={errors?.email?.message}
                        type={"email"}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>

                <Divider />

                <div className="my-3">
                  <Controller
                    name="position"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        label="Position"
                        className="w-100"
                        error={errors.position ? true : false}
                        helperText={errors?.position?.message}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </div>

                <div className="my-3">
                  <Controller
                    name="access"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                      select
                        label="User Access"
                        className="w-100"
                        placeholder={"User Access Level"}
                        error={errors.access ? true : false}
                        helperText={errors?.access?.message ? errors?.access?.message  : "This defines the member's access level to the system"}
                        value={value}
                        onChange={onChange}
                      >
                        {[{ value: "", label: "Select Access Level" }, { value: "admin", label: "Administrator" }, { value: "normal", label: "Normal" } ].map( option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}

                      </TextField>
                    )}
                  />
                </div>
                <div className="my-5 d-block">
                  <Button disabled={loaded} variant="text" type="submit" className="w-100">Register User</Button>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
    </>
  );
}
