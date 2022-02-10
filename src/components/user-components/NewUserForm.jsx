import React from "react";

import { Modal } from "react-bootstrap";
import { Typography, Button, Divider } from "@material-ui/core";

import { FormComponents } from "../forms/FormComponents";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import httpClient from ".././../httpClient";

const Element = FormComponents();

export default function NewUserForm(props) {
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
    resolver: yupResolver(schema),
  });

  const registerUser = (data) => {
    httpClient()
      .post("/api/createUser", data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(errors);
  return (
    <>
      <Modal.Dialog>
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
                      <Element.input
                        id="f-name-input"
                        label="Frist Name"
                        error={errors.firstName ? true : false}
                        message={errors?.firstName?.message}
                        name={"firstName"}
                        value={value}
                        onChange={onChange}
                        required={true}
                      />
                    )}
                  />
                </div>

                <div className="col-6">
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Element.input
                        id="l-name-input"
                        label="Last Name"
                        error={errors.lastName ? true : false}
                        message={errors?.lastName?.message}
                        name={"lastName"}
                        value={value}
                        onChange={onChange}
                        required={true}
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
                      <Element.input
                        id="email-input"
                        label="Email"
                        error={errors.email ? true : false}
                        message={errors?.email?.message}
                        name={"email"}
                        type={"email"}
                        value={value}
                        onChange={onChange}
                        required={true}
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
                      <Element.input
                        id="position-input"
                        label="Position"
                        error={errors.position ? true : false}
                        message={errors?.position?.message}
                        name={"position"}
                        value={value}
                        onChange={onChange}
                        required={true}
                      />
                    )}
                  />
                </div>

                <div className="my-3">
                  <Controller
                    name="access"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Element.select
                        id="access-input"
                        label="User Access"
                        placeholder={"User Access Level"}
                        error={errors.access ? true : false}
                        message={errors?.access?.message}
                        name={"access"}
                        options={[
                          { value: "admin", label: "Administrator" },
                          { value: "normal", label: "Normal" },
                        ]}
                        value={value}
                        defaultValue="normal"
                        onChange={onChange}
                        helper="This defines the member's level in the system"
                      />
                    )}
                  />
                </div>
                <div className="my-5 d-block">
                  <Element.button content={"Register User"} type="submit" />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal.Dialog>
    </>
  );
}
