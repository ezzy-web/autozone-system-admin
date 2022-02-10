import React from "react";
import {
  Chip,
  Button,
  Divider,
  MenuItem,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import httpClient from "../../httpClient";

export default function UserExpand(props) {
  const data = props.data;
  const currentUser = props.current;

  var date_joined = new Date(data?.timeStamp?.nanosecconds);
  const [access, setAccess] = React.useState(data?.access);
  const accessOptions = [
    { value: "admin", label: "Administrator" },
    { value: "normal", label: "Normal" },
  ];

  const removeUser = () => {
    httpClient()
      .post("/deleteUser", { id: data.uid })
      .then((res) => {
        console.log(res);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div id="user-expander-container">
        <div className="container d-flex flex-center flex-column py-5">
          <div className="fs-3 text-gray-800 text-hover-primary fw-bolder mb-3">
            {data?.fullName}
          </div>
          <div className="mb-3">
            <Chip
              label={
                data?.access?.includes("admin") ? "Administrator" : "Normal"
              }
            />
          </div>
        </div>
        <Accordion>
          <AccordionSummary
            expandIcon={
              <>
                <span className="ms-2 rotate-180">
                  <span className="svg-icon svg-icon-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </span>
              </>
            }
          >
            <Typography>User Credentials</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="pb-5 fs-6">
              <div className="fw-bolder mt-5">Email</div>
              <div className="text-gray-600">{data?.email}</div>
              <Chip label={data?.emailVerified ? "Verified" : "Not Verified"} />
              {data?.emailVerified ? (
                <></>
              ) : (
                <Button variant="text">
                  <small className="mx-3">Send Verification Email</small>
                </Button>
              )}

              <div className="fw-bolder mt-5">Date Added</div>
              <div className="text-gray-600">
                {date_joined.toLocaleString()}
              </div>

              <div className="fw-bolder mt-5">Added by</div>
              <div className="text-gray-600">
                {data?.added_by?.fullName} <br />
                <span className="text-muted">{data?.added_by?.email}</span>{" "}
              </div>

              {data?.uid === currentUser?.uid ? (
                <></>
              ) : (
                <>
                  <Divider />

                  <Button onClick={removeUser} variant={"text"} color="secondary">
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
          </AccordionDetails>
        </Accordion>
        {data?.uid === currentUser?.uid ? (
          <></>
        ) : (
          <>
            <Accordion>
              <AccordionSummary
                expandIcon={
                  <>
                    <span className="ms-2 rotate-180">
                      <span className="svg-icon svg-icon-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                    </span>
                  </>
                }
              >
                <Typography>Permissions</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="pb-5 fs-6">
                  <Divider />

                  <div className="d-flex flex-stack">
                    <div className="d-flex">
                      <div className="d-flex flex-column">
                        <div className="fs-5 text-dark text-hover-primary fw-bolder">
                          Access Level
                        </div>
                        <div className="fs-6 fw-bold text-muted">
                          Update the user's access level
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end">
                      <TextField
                        select
                        onChange={(e) => setAccess(e.value)}
                        value={access}
                        size="small"
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
            expandIcon={
              <>
                <span className="ms-2 rotate-180">
                  <span className="svg-icon svg-icon-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z"
                        fill="black"
                      />
                    </svg>
                  </span>
                </span>
              </>
            }
          >
            <Typography>Activities</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="pb-5 fs-6">
              {data?.activities.map((activity) => {
                var date = new Date(activity.timeStamp);
                return (
                  <div key={date.toLocaleString()}>
                    <div className="fw-bolder mt-5">
                      {" "}
                      {activity.title}{" "}
                      <span className="text-muted">
                        {" "}
                        {date.toLocaleString()}{" "}
                      </span>{" "}
                    </div>
                    <div className="text-gray-600"> {activity.details} </div>
                    <Divider />
                  </div>
                );
              })}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}
