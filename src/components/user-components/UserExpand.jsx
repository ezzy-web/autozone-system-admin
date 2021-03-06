import React from "react";
import { Badge } from "react-bootstrap";
import { Button, Divider, MenuItem, Typography } from "@material-ui/core";
import {
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {httpClient, addActivity} from "../../httpClient";

export default function UserExpand(props) {
  const data = props.data;
  const currentUser = props.current;
  const handleOpenSnackBar = props.handleOpenSnackBar;

  const [access, setAccess] = React.useState(data?.access);
  const accessOptions = [
    { value: "admin", label: "Administrator" },
    { value: "normal", label: "Normal" },
  ];

  const removeUser = () => {
    httpClient()
      .post("/deleteUser", { id: data.uid })
      .then((res) => {
        handleOpenSnackBar("User Removed refresh users to show updates");
        addActivity("User Removed", data.fullName + " was removed from the system.")
      })

      .catch((err) => {
        handleOpenSnackBar("Something went wrong");
      });
  };

  const verifyEmail = () => {
    httpClient()
      .post("/sendEmailVerification", { email: data.email })
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
  return (
    <>
      <div id="user-expander-container">
        <div className="container d-flex flex-center flex-column py-5">
          <h5>{data?.fullName}</h5>
          <div className="mb-3">
            <Badge
              color={data?.access?.includes("admin") ? "success" : "primary"}
            >
              {data?.access?.includes("admin") ? "Administrator" : "Normal"}
            </Badge>
          </div>

          <div>
            <div className="fw-bolder mt-2">
              <small>Email</small>
            </div>
            <div className="text-muted">
              {data?.email}{" "}
              <Badge>{data?.emailVerified ? "Verified" : "Not Verified"}</Badge>
            </div>

            {data?.emailVerified ? (
              <></>
            ) : (
              <Button
                onClick={verifyEmail}
                className="p-0"
                variant="text"
                size="small"
              >
                <small className="mx-3">Send Verification Email</small>
              </Button>
            )}

            <div className="fw-bolder mt-3">
              <small>Date Added</small>
            </div>
            <div className="text-muted">
              <small> {new Date(parseInt(data?.timeStamp?.seconds) * 1000 + parseInt(data?.timeStamp?.nanoseconds) / 1000000).toLocaleString()}</small>
            </div>

            {data?.added_by ? (
              <>
                <div className="fw-bolder mt-3">
                  <small>Added by</small>
                </div>
                <div className="text-muted">
                  <small>
                    {data?.added_by?.fullName} <br />
                    <span className="text-muted">
                      {data?.added_by?.email}
                    </span>{" "}
                  </small>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        {data?.uid === currentUser?.uid ? (
          <></>
        ) : (
          <>
            <Accordion>
              <AccordionSummary
                className="accordion-summary"
                expandIcon={
                  <>
                    <span>
                      <i className="lni lni-chevron-down"></i>
                    </span>
                  </>
                }
              >
                <Typography>Permissions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  <div className="content-container">
                    <div className="left">
                      <div className="fw-bolder">
                        <small>Access Level</small>
                      </div>
                      <div className="text-muted">
                        <small>Update User's Access Level</small>
                      </div>
                    </div>

                    <div className="right">
                      <TextField
                        select
                        onChange={(e) => {
                          setAccess(e.target.value);
                        }}
                        value={access}
                        size="small"
                        className="w-50"
                      >
                        {accessOptions.map((option, key) => (
                          <MenuItem value={option.value} key={key}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </>
        )}

        <Accordion>
          <AccordionSummary
            className="accordion-summary"
            expandIcon={
              <>
                <span>
                  <i className="lni lni-chevron-down"></i>
                </span>
              </>
            }
          >
            <Typography>Activities</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="pb-5 fs-6">
              {data?.activities.map((activity) => {
                const seconds = parseInt(activity.timeStamp.seconds)
                const nanoseconds = parseInt(activity.timeStamp.nanoseconds)
                var date = new Date(seconds * 1000 + nanoseconds/1000000);
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
                    <div className="text-muted"> <small>{activity.details} </small> </div>
                    <div className="separator my-2"></div>
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
        <div className="container">
          {data?.uid === currentUser?.uid ? (
            <></>
          ) : (
            <>
              <Divider className="my-2" />

              <Button
                className="w-100"
                onClick={removeUser}
                variant={"text"}
                color="secondary"
              >
                <small>
                  <span>
                    <i className="lni lni-trash-can"></i>
                  </span>{" "}
                  Remove User
                </small>
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
