import React from "react";
import { Modal } from "react-bootstrap";
import {
  Toolbar,
  Card,
  Typography,
  Chip,
  Box,
  Divider,
  Button,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";

import { TextField } from "@mui/material";
import { httpClient, post } from "../httpClient";

function ChangeInfo(props) {
  const openSnack = props.openSnack
  const modalToggle = props.toggleModal;
  const [email, changeEmail] = React.useState("");
  const updateUser = props?.updateUser;

  const updateEmail = () => {
    post("/changeEmail", {
      email,
    })
      .then((res) => {
        if (res.data.status) {
          updateUser();
          modalToggle(false);
          openSnack("Email changed to " + email)
          return;
        }
        openSnack("Failed to change email")
      })
      .catch((err) => openSnack("Failed to change email"));
  };

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
      <div className="container">
        <Typography variant="h6">Change Email Address</Typography>

        <div className="my-3">
          <TextField
            fullWidth
            value={email}
            size="small"
            onChange={(e) => changeEmail(e.target.value)}
            placeholder="Enter new email address"
          />
        </div>

        <div className="my-1 d-flex">
          <Button fullWidth onClick={() => modalToggle(false)}>
            Cancel
          </Button>
          <Button onClick={updateEmail} fullWidth>
            Save
          </Button>
        </div>
      </div>
    </>
  );
}

export default function ProfilePage(props) {

  const [user, setUser] = React.useState(props?.state?.user?.customClaims);
  const [openBar, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [modal, setModal] = React.useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const closeModal = () => {
    setModal(false);
  };

  const getUserData = () => {
    httpClient()
      .post("/getUser", { id: user.uid })
      .then((res) => {
        if (res.data.status) {
          setUser(res.data.content);
          return;
        }
      })
      .catch((err) => {});
  };

  const handleOpenSnackBar = (message) => {
    setMessage(message);
    setOpen(true);
  };

  const verifyEmail = () => {
    httpClient()
      .post("/sendEmailVerification", { email: user.email })
      .then((res) => {
        if (res.data.status) {
          handleOpenSnackBar("Verification Email Sent");
          return;
        }
      })
      .catch((err) => {
        handleOpenSnackBar("Something went wrong");
      });
  };

  React.useEffect(() => {
    getUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Toolbar>
        <Typography variant="h5" component={"h1"}>
          My Profile
        </Typography>
      </Toolbar>
      <div className="row">
        <div className="col-md-5 col-sm-12 my-5">
          <Card>
            <div className="px-4 my-4">
              <Toolbar>
                <Typography variant="h6">{user.fullName}</Typography>
                <Chip
                  className="mx-2"
                  size="small"
                  label={user?.access === "admin" ? "Administrator" : "Normal"}
                />
              </Toolbar>

              <Box>
                <div className="my-3">
                  <Typography className="my-1" variant="subtitle2">
                    <b className="text-muted">Email</b> {user.email} <br />
                    <small>
                      {user.emailVerified ? "Verified" : "Not Verified"}
                    </small>
                    {user.emailVerified ? (
                      <></>
                    ) : (
                      <>
                        <Button
                          onClick={verifyEmail}
                          className="mx-3"
                          size="small"
                        >
                          <small>Send Verification Email</small>{" "}
                        </Button>
                      </>
                    )}
                  </Typography>
                  <Typography className="my-1" variant="subtitle2">
                    <b className="text-muted">Position</b>
                    {"   "}
                    {user.position}
                  </Typography>
                </div>

                <div className="my-2">
                  <Typography className="text-muted" variant="caption">
                    Date Added
                  </Typography>
                  <Typography variant="subtitle2">
                    {new Date(
                      parseInt(user?.timeStamp?.seconds) * 1000 +
                        parseInt(user?.timeStamp?.nanoseconds) / 1000000
                    ).toLocaleString()}
                  </Typography>
                </div>
                {user?.added_by ? (
                  <>
                    <div className="my-2">
                      <Typography className="text-muted" variant="caption">
                        Added by
                      </Typography>
                      <Typography variant="subtitle2">
                        {user?.added_by?.fullName} <br />{" "}
                        <div className="text-muted">
                          {" "}
                          {user?.added_by?.email}{" "}
                        </div>
                      </Typography>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </Box>
            </div>
          </Card>

          <Card className="my-3">
            <div className="px-4 my-4">
              <Toolbar>
                <Typography variant="h6" component={"b"}>
                  Settings
                </Typography>
              </Toolbar>
              <Divider />
              <div className="my-2">
                <Box>
                  <div className="d-flex align-items-center space-between">
                    <div className="my-2">
                      <Typography variant="subtitle2">Change Email</Typography>
                      <Typography className="text-muted" variant="caption">
                        Update email address
                      </Typography>
                    </div>
                    <div className="d-flex justify-content-right">
                      <Button size="small" onClick={() => toggleModal()}>
                        <small>Change Email Address</small>
                      </Button>
                    </div>
                  </div>

                  <div className="d-flex align-items-center space-between">
                    <div className="my-2">
                      <Typography variant="subtitle2">
                        Change your Password
                      </Typography>
                    </div>
                    <div className="d-flex justify-content-right">
                      <Button size="small">
                        <small>Change Password</small>
                      </Button>
                    </div>
                  </div>
                </Box>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-md-7 col-sm-12">
          <Card>
            <div className="p-4">
              <Typography variant="h6">Your Recent Activities</Typography>

              <div className="sparator my-3"></div>

              {user.activities ? (
                user?.activities?.map((activity) => {
                  const seconds = parseInt(activity.timeStamp.seconds);
                  const nanoseconds = parseInt(activity.timeStamp.nanoseconds);
                  var date = new Date(seconds * 1000 + nanoseconds / 1000000);
                  return (
                    <div key={date.toLocaleString()}>
                      <div className="fw-bolder">
                        <small>
                          {" "}
                          {activity.title}{" "}
                          <span className="text-muted">
                            {" "}
                            {date.toLocaleString()}{" "}
                          </span>{" "}
                        </small>
                      </div>
                      <div className="text-muted">
                        {" "}
                        <small>{activity.details} </small>{" "}
                      </div>
                      <div className="separator my-2"></div>
                    </div>
                  );
                })
              ) : (
                <div className="table-loading">
                  <CircularProgress />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
      <Modal className="modal-containe" show={modal} onHide={closeModal}>
        <ChangeInfo openSnack={handleOpenSnackBar} toggleModal={setModal} updateUser={getUserData} />
      </Modal>
      <Snackbar
        open={openBar}
        onClose={() => setOpen(false)}
        message={message}
      />
    </>
  );
}
