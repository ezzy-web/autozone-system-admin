import React from "react";
import {
  Button,
  Paper,
  Avatar,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@material-ui/icons"
import { TextField, Snackbar, InputAdornment, IconButton } from "@mui/material";
import { Backdrop } from "@mui/material";
import { httpClient } from "../httpClient.js";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const NewUserForm = React.lazy(() =>
  import("../components/user-components/NewUserForm.jsx")
);

export default function LoginComponent(props) {
  const [loaded, setLoad] = React.useState(false);
  const [errorMsg, setError] = React.useState("");
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [modal, toggleModal] = React.useState(false);

  const [openBar, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [passwordHidden, setPasswordState] = React.useState(true);

  const handleOpenSnackBar = (message) => {
    setMessage(message);
    setOpen(true);
  };

  const handleToggleModal = () => {
    toggleModal(!modal);
  };

  const closeModal = () => {
    toggleModal(false);
  };

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

  const checkAdmin = () => {
    httpClient()
      .post("/systemCred", {})
      .then((res) => {
        setIsAdmin(res.data.content);
      })
      .catch((err) => {
        setIsAdmin(false);
      });
  };

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

  React.useEffect(() => checkAdmin(), []);

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
                      type={passwordHidden ? "password" : "text"}
                      defaultValue=""
                      value={value}
                      onChange={onChange}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setPasswordState(!passwordHidden)}
                              edge="end"
                            >
                              {passwordHidden ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
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
            {isAdmin ? (
              <>
                <Button
                  onClick={handleToggleModal}
                  className="w-100 my-4"
                  size="small"
                >
                  New to System
                </Button>
              </>
            ) : (
              <></>
            )}
          </Paper>
        </div>
      </div>
      <Modal className="modal-containe" show={modal} onHide={closeModal}>
        <>
          <NewUserForm
            handleOpenSnackBar={handleOpenSnackBar}
            toggleModal={toggleModal}
          />
        </>
      </Modal>
      <Snackbar
        open={openBar}
        onClose={() => setOpen(false)}
        message={message}
      />
    </div>
  );
}
