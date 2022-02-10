import React from "react";
import { FormComponents as formElements } from "../components/forms/FormComponents.jsx";
import httpClient from "../httpClient.js";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Element = formElements();

export default function LoginComponent(props) {
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Atleast 8 Characters are required")
      .required("Password is required"),
  });

  const {
    formState: { errors },
    handleSubmit,
    control
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    httpClient()
      .post("/api/loginUser", data)
      .then( res => {
        const body = res.data
        if (body.status) {
          const user = body.content
          props.setAdmin(user)
          return;
        }

        const err = body.content
        console.log(err)
        // if (data.includes("user-not-found")) {

        // }
      })
      .catch((err) => {
        console.log(err)
        
      });
  };

  return (
    <div id="authentication-component-container">
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h2>Login</h2>
            <form onSubmit={handleSubmit( data => submit(data))}>
              <div className="my-5">
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

              <div className="my-5">
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Element.input
                      id="password-input"
                      label="Password"
                      error={errors.password ? true : false}
                      message={errors?.password?.message}
                      name={"password"}
                      type={"password"}
                      value={value}
                      onChange={onChange}
                      required={true}
                    />
                  )}
                />
              </div>

              <Element.button content="Login" type="submit" />
            </form>
            <Element.button content="Back to home" type="button" link="#" variant="text" />
          </div>
        </div>
      </div>
    </div>
  );
}
