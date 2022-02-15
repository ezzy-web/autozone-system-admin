import React, { useState, useEffect } from "react";
import { Typography, Button, Toolbar, Card } from "@mui/material";
import { TextField, CircularProgress, Snackbar } from "@mui/material";
import httpClient from "../httpClient";
import numeral from "numeral";

export default function ViewInvoice() {
  const [change, setChange] = useState(false);
  const [vehicle, setVehicle] = React.useState(null);
  const [client, setClient] = React.useState(null);
  const [invoice, setInvoice] = React.useState(null);
  const [loaded, setLoad] = React.useState(false);

  const [openBar, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenSnackBar = (message) => {
    setMessage(message);
    setOpen(true);
  };

  const [gct, setGCT] = useState(0.15);
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);

  const editVehicle = () => {
    var url = new URL(
      "/admin/management/inventory/vehicle",
      window.location.origin
    );

    url.searchParams.append("stck", vehicle.id);
    window.open(url.href);
  };

  const getInvoice = () => {
    const url = new URL(window.location.href);
    const id = url.searchParams.get("invoice");

    httpClient()
      .post("/getInvoice", { id })
      .then((res) => {
        const body = res.data;
        if (body.status) {
          const invoiceData = body.content;
          setInvoice(invoiceData);
          setVehicle(invoiceData.vehicle);
          setClient(invoiceData.client);
        } else {
          handleOpenSnackBar("Something went wrong")
        }
        setLoad(true);
      })
      .catch((err) => {
        setLoad(true);
        handleOpenSnackBar("Something went wrong")
      });
  };

  const handleClientChange = (obj, isAddress = false) => {
    var updatedClient = JSON.parse(JSON.stringify(client));
    if (isAddress) {
      updatedClient.address[obj.name] = obj.value;
    } else {
      updatedClient[obj.name] = obj.value;
    }

    setClient(updatedClient);
    setChange(true);
  };

  const updateChanges = () => {
    httpClient()
      .post("/updateInvoice", { id: invoice.id, client })
      .then((res) => {
        const body = res.data;

        if (body.status) {
          setChange(false);
          getInvoice();
          handleOpenSnackBar("Invoice Updated")
          return;
        }
      })
      .catch((err) => {
        console.log(err);
        handleOpenSnackBar("Something went wrong")
      });
  };

  useEffect(() => {
    setTax(vehicle?.price * gct);
    setTotal(parseFloat(vehicle?.price) + (vehicle?.price * gct));
  }, [gct, vehicle]);

  useEffect(() => getInvoice(), []);

  

  return (
    <>
      <Snackbar
        open={openBar}
        onClose={() => setOpen(false)}
        message={message}
      />
      <Toolbar className="d-flex space-between">
        <Typography variant="h6">Invoice</Typography>
        <small className="text-muted"><b>{invoice?.id}</b> </small>

        <Button
          disabled={!change}
          onClick={updateChanges}
          variant="filled"
          size="small"
        >
          <small>Save Changes</small>
        </Button>

        <Button
          onClick={() => { setLoad(false); getInvoice()}}
          variant="filled"
          size="small"
        >
          <small>Refresh</small>
        </Button>
      </Toolbar>
      <div className="row">
        <div className="col-md-3 col-sm-12">
        <Button
          variant="filled"
          fullWidth
        >
          GET PDF COPY
        </Button>
        </div>
        <div className="col-md-9 col-sm-12">
          <Card>
            {loaded ? (
              <>
                <div className="container py-5">
                  <Typography variant="button">Vehicle Information</Typography>
                  <div className="separator my-2">
                    <Button
                      varian="filled"
                      size="small"
                      className="p-0 mx-2"
                      onClick={editVehicle}
                    >
                      <small>Edit Vehicle Information</small>
                    </Button>
                  </div>

                  <div className="my-5">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="w-100 d-block">
                          <div>
                            <small className="text-muted">Make</small>
                          </div>
                          <small>
                            <b>{vehicle?.make}</b>
                          </small>
                        </div>
                        <div className="separator my-1"></div>

                        <div className="w-100 d-block">
                          <div>
                            <small className="text-muted">Model</small>
                          </div>
                          <small>
                            <b>{vehicle?.model}</b>
                          </small>
                        </div>
                        <div className="separator my-1"></div>

                        <div className="w-100 d-block">
                          <div>
                            <small className="text-muted">Year</small>
                          </div>
                          <small>
                            <b>{vehicle?.year}</b>
                          </small>
                        </div>
                        <div className="separator my-1"></div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <div className="w-100 d-block">
                          <div>
                            <small className="text-muted">Stock No.</small>
                          </div>
                          <small>
                            <b>{vehicle?.id}</b>
                          </small>
                        </div>
                        <div className="separator my-1"></div>

                        <div className="w-100 d-block">
                          <div>
                            <small className="text-muted">Engine No.</small>
                          </div>
                          <small>
                            <b>{vehicle?.engine_no}</b>
                          </small>
                        </div>
                        <div className="separator my-1"></div>

                        <div className="w-100 d-block">
                          <div>
                            <small className="text-muted">Chassis No.</small>
                          </div>
                          <small>
                            <b>{vehicle?.chassis}</b>
                          </small>
                        </div>
                        <div className="separator my-1"></div>
                      </div>
                    </div>
                  </div>

                  <Typography variant="button">Client Information</Typography>
                  <div className="separator my-2"></div>

                  <div className="my-5">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <div className="d-flex space-between my-3">
                          <TextField
                            value={client?.firstName}
                            label="First Name"
                            fullWidth
                            onChange={(e) =>
                              handleClientChange({
                                name: "firstName",
                                value: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="d-flex space-between my-3">
                          <TextField
                            value={client?.lastName}
                            label="Last Name"
                            fullWidth
                            onChange={(e) =>
                              handleClientChange({
                                name: "lastName",
                                value: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="d-flex space-between my-3">
                          <TextField
                            value={client?.email}
                            type="email"
                            label="Email"
                            fullWidth
                            onChange={(e) =>
                              handleClientChange({
                                name: "email",
                                value: e.target.value,
                              })
                            }
                          />
                        </div>

                        <div className="d-flex space-between my-3">
                          <TextField
                            value={client?.mobile}
                            label="Mobile"
                            fullWidth
                            onChange={(e) =>
                              handleClientChange({
                                name: "mobile",
                                value: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <TextField
                          variant="outlined"
                          className="my-2"
                          value={client?.address?.address1}
                          label="Address Line 1"
                          fullWidth
                          onChange={(e) =>
                            handleClientChange(
                              { name: "address1", value: e.target.value },
                              true
                            )
                          }
                        />

                        <TextField
                          variant="outlined"
                          className="my-2"
                          value={client?.address?.address2}
                          label="Address Line 2"
                          fullWidth
                          onChange={(e) =>
                            handleClientChange(
                              { name: "address2", value: e.target.value },
                              true
                            )
                          }
                        />

                        <TextField
                          variant="outlined"
                          className="my-2"
                          value={client?.address?.address3}
                          label="Address Line 3"
                          fullWidth
                          onChange={(e) =>
                            handleClientChange(
                              { name: "address3", value: e.target.value },
                              true
                            )
                          }
                        />

                        <TextField
                          variant="outlined"
                          className="my-2"
                          value={client?.address?.town}
                          label="Town"
                          fullWidth
                          onChange={(e) =>
                            handleClientChange(
                              { name: "town", value: e.target.value },
                              true
                            )
                          }
                        />

                        <TextField
                          variant="outlined"
                          className="my-2"
                          value={client?.address?.parish}
                          label="Parish (State/Province)"
                          fullWidth
                          onChange={(e) =>
                            handleClientChange(
                              { name: "parish", value: e.target.value },
                              true
                            )
                          }
                        />

                        <TextField
                          variant="outlined"
                          className="my-2"
                          value={client?.address?.country}
                          label="Country"
                          fullWidth
                          onChange={(e) =>
                            handleClientChange(
                              { name: "country", value: e.target.value },
                              true
                            )
                          }
                        />
                      </div>
                    </div>
                    <div className="separator my-1"></div>
                  </div>

                  <Typography variant="button">Pricing Information</Typography>
                  <div className="separator my-2"></div>

                  <div className="my-5">
                    <div className="row">
                      <div className="w-100 d-block my-2">
                        <div>
                          <small className="text-muted">Vehicle Price</small>
                        </div>
                        <small>
                          <b>{numeral(vehicle?.price).format("$ 0,0.00")}</b>
                        </small>
                      </div>

                      <div className="w-100 d-block my-2">
                        <div>
                          <small className="text-muted">
                            Tax (GCT {gct * 100}%)
                          </small>
                          <TextField
                            className="mx-4"
                            variant="standard"
                            value={gct}
                            onChange={(e) => setGCT(e.target.value)}
                            type="number"
                            size="small"
                          />
                        </div>
                        <small>
                          <b>{numeral(tax).format("$ 0,0.00")}</b>
                        </small>
                      </div>

                      <div className="w-100 d-block my-2">
                        <div>
                          <small className="text-muted">Total</small>
                        </div>
                        <small>
                          <b>{numeral(total).format("$ 0,0.00")}</b>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="table-loading">
                  <CircularProgress />
                </div>
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
