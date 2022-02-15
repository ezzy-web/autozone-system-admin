import React from "react";
import {
  Button,
  Paper,
  Avatar,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { TextField } from "@mui/material";
import { Backdrop } from "@mui/material";
import httpClient from "../httpClient.js";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function LoginComponent(props) {
  const [loaded, setLoad] = React.useState(false);
  const [errorMsg, setError] = React.useState("");

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
    control,
  } = useForm({
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
  });

  const submit = (data) => {
    setLoad(true);
    setError("");
    httpClient()
      .post("/loginUser", data)
      .then((res) => {
        const body = res.data;
        if (body.status) {
          const user = body.content;
          props.setAdmin(user);
          return;
        }

        const data = body.content;
        if (data.includes("user-not-found")) {
          setError("User doesn't exist");
        } else if (data.includes("password")) {
          setError("Check your password");
        } else {
          setError("Check your credentials or your connection");
        }
        setLoad(false);
      })
      .catch((err) => {
        setError("Check your connection");
        setLoad(false);
      });
  };
  return (
    <div id="authentication-component-container">
      <Backdrop sx={{ zIndex: "tooltip" }} open={loaded}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="row container">
        <div className="col-md-6 col-sm-12">
          <Paper className="login-container">
            <div className="d-flex w-100">
              <Avatar className="mx-3" />
              <h2>Login</h2>
            </div>

            <form onSubmit={handleSubmit((data) => submit(data))}>
              <div className="my-4">
                <Controller
                  name="email"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant="filled"
                      label="Email"
                      className="w-100"
                      error={errors.email ? true : false}
                      helperText={errors?.email?.message}
                      name={"email"}
                      type={"email"}
                      value={value}
                      defaultValue=""
                      onChange={onChange}
                    />
                  )}
                />
              </div>

              <div className="my-4">
                <Controller
                  name="password"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      variant="filled"
                      label="Password"
                      className="w-100"
                      error={errors.password ? true : false}
                      helperText={errors?.password?.message}
                      name={"password"}
                      type={"password"}
                      defaultValue=""
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </div>

              <Button disabled={loaded} className="w-100" type="submit">
                Login
              </Button>

              <Typography color="error" variant="caption">
                {errorMsg}
              </Typography>
            </form>
            <Button className="w-100 my-4" size="small" variant="text">
              Back to Website
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  );
}
