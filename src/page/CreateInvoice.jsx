import React, { useState, useEffect } from "react";
import httpClient from "../httpClient";
import {
  CircularProgress,
  Toolbar,
  Typography,
  Container,
  Card,
  Button,
  TextField,
} from "@material-ui/core";

function SelectVehicle(props) {
  const inventory = props?.inventory;
  const setVehicle = props?.setVehicle;
  const vehicle = props?.vehicle;
  const handleInventorySearch = props?.handleSearch;

  const [search, setSearch] = useState("");
  return (
    <>
      <Toolbar className="d-flex space-between">
        <Typography variant="h6">Select a Vehicle</Typography>
        <TextField
          value={search}
          onChange={(e) => {
            handleInventorySearch(e);
            setSearch(e.target.value);
          }}
          label="Search Inventory"
        />
      </Toolbar>

      <div className="vehicle-list-container">
        {inventory.map((data) => {
          return (
            <Toolbar
              className={
                vehicle?.id
                  ? vehicle?.id === data.vehicle?.id
                    ? "vehicle-select selected"
                    : "vehicle-select"
                  : "vehicle-select"
              }
              key={data.vehicle?.id}
              onClick={() => setVehicle(data.index)}
            >
              <Typography className="mx-2" variant="caption">
                {" "}
                {data.vehicle?.id}{" "}
              </Typography>
              <Typography className="mx-2" variant="button">
                {" "}
                {data.vehicle?.title}{" "}
              </Typography>
            </Toolbar>
          );
        })}
      </div>
    </>
  );
}

function ClientInformation(props) {
  const client = props?.client;
  const handleClientChange = props?.handleChange;

  return (
    <>
      <Toolbar>
        <Typography variant="h6">Client Information</Typography>
      </Toolbar>

      <div className="separator my-4"></div>

      <div className="row">
        <div className="col-md-7 col-sm-12">
          <div className="row my-2">
            <div className="col-6">
              <TextField
                value={client?.firstName}
                onChange={(e) =>
                  handleClientChange({
                    name: "firstName",
                    value: e.target.value,
                  })
                }
                label="First Name"
                fullWidth
              />
            </div>
            <div className="col-6">
              <TextField
                value={client?.lastName}
                onChange={(e) =>
                  handleClientChange({
                    name: "lastName",
                    value: e.target.value,
                  })
                }
                label="Last Name"
                fullWidth
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-6">
              <TextField
                value={client?.email}
                type="email"
                onChange={(e) =>
                  handleClientChange({ name: "email", value: e.target.value })
                }
                label="Email"
                fullWidth
              />
            </div>
            <div className="col-6">
              <TextField
                value={client?.mobile}
                onChange={(e) =>
                  handleClientChange({ name: "mobile", value: e.target.value })
                }
                label="Mobile"
                fullWidth
              />
            </div>
          </div>
          <TextField
            className="my-2"
            value={client?.address1}
            onChange={(e) =>
              handleClientChange({ name: "address1", value: e.target.value })
            }
            label="Address Line 1"
            fullWidth
          />

          <TextField
            className="my-2"
            value={client?.address2}
            onChange={(e) =>
              handleClientChange({ name: "address2", value: e.target.value })
            }
            label="Address Line 2"
            fullWidth
          />

          <TextField
            className="my-2"
            value={client?.address3}
            onChange={(e) =>
              handleClientChange({ name: "address3", value: e.target.value })
            }
            label="Address Line 3"
            fullWidth
          />

          <TextField
            className="my-2"
            value={client?.town}
            onChange={(e) =>
              handleClientChange({ name: "town", value: e.target.value })
            }
            label="Town"
            fullWidth
          />

          <TextField
            className="my-2"
            value={client?.parish}
            onChange={(e) =>
              handleClientChange({ name: "parish", value: e.target.value })
            }
            label="Parish (State/Province)"
            fullWidth
          />

          <TextField
            className="my-2"
            value={client?.country}
            onChange={(e) =>
              handleClientChange({ name: "country", value: e.target.value })
            }
            label="Country"
            fullWidth
          />
        </div>
      </div>

      <div className="separator my-5"></div>
    </>
  );
}

export default function CreateInvoice() {
  const [loaded, setLoad] = useState(false);
  const [activeStep, changeStep] = useState(0);
  const [filters, setFilters] = useState(null);

  const [client, setClientData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    address3: "",
    town: "",
    parish: "",
    country: "",
    email: "",
    mobile: "",
  });
  const handleClientChange = (obj) => {
    const name = obj?.name;
    const value = obj?.value;
    const data = obj?.data;

    if (data) {
      setClientData(data);
    } else if (name) {
      var updatedClient = JSON.parse(JSON.stringify(client));
      updatedClient[name] = value;
      setClientData(updatedClient);
    }
  };

  const [inventory, setInventory] = useState([]);
  const [searchResults, setSearchResullts] = useState(
    inventory.map((vehicle, index) => ({
      vehicle,
      index,
    }))
  );
  const [selectedVehicle, setVehicle] = useState(null);

  const getInventory = () => {
    setLoad(false);
    httpClient()
      .get("/getInventory")
      .then((res) => {
        const body = res.data;
        if (body.status) {
          const filters = body.content.map((data, index) => {
            return {
              index: index,
              match: [
                data.make.toUpperCase(),
                data.model.toUpperCase(),
                data.id.toUpperCase(),
                data.engine_no.toUpperCase(),
              ],
            };
          });
          setInventory(body.content);
          setFilters(filters);
          setSearchResullts(
            body.content.map((vehicle, index) => ({
              vehicle,
              index,
            }))
          );
        }
        setLoad(true);
      })
      .catch((err) => {
        setLoad(true);
      });
  };

  const searchInventory = (e) => {
    const search = e.target.value;
    const mapping = filters.filter((data) => {
      var equ = false;
      data.match.forEach((param) => {
        if (!equ) {
          equ = param.includes(search.toUpperCase());
        }
      });

      return equ;
    });

    if (search === "") {
      setSearchResullts(
        inventory.map((vehicle, index) => ({
          vehicle,
          index,
        }))
      );
    } else {
      setSearchResullts(
        mapping
          .map((data) => inventory[data.index])
          .map((vehicle, index) => ({
            vehicle,
            index,
          }))
      );
    }
  };

  const handleSetVehicle = (ind) => {
    const index = parseInt(ind);
    setVehicle(inventory[index]);
  };

  useEffect(() => getInventory(), []);

  return (
    <>
      <Container id="generate-invoice-comp">
        <Toolbar className="my-2">
          <Typography variant="h5" component={"h1"}>
            Create New Invoice{" "}
          </Typography>
        </Toolbar>
        <div className="container">
          <Card className="p-5">
            {loaded ? (
              <div className="container steps-forms">
                {activeStep === 0 ? (
                  <SelectVehicle
                    inventory={searchResults}
                    setVehicle={handleSetVehicle}
                    vehicle={selectedVehicle}
                    handleSearch={searchInventory}
                  />
                ) : (
                  <></>
                )}
                {activeStep === 1 ? (
                  <ClientInformation
                    client={client}
                    handleChange={handleClientChange}
                  />
                ) : (
                  <></>
                )}
                {activeStep === 2 ? <>Verify Information</> : <></>}
                {activeStep === 3 ? <>Generate Invoice</> : <></>}
              </div>
            ) : (
              <div className="table-loading">
                <CircularProgress />
              </div>
            )}
            <div className="separator my-2"></div>
            <>
              {activeStep === 3 ? (
                <>
                  <Button>Get PDF Copy</Button>
                </>
              ) : (
                <>
                  <Button
                    disabled={activeStep === 0}
                    onClick={() => changeStep(activeStep - 1)}
                  >
                    Go Back
                  </Button>
                  <Button
                    disabled={selectedVehicle === null}
                    onClick={() => changeStep(activeStep + 1)}
                  >
                    {activeStep === 3 ? "Save Invoice" : "Continue"}
                  </Button>
                </>
              )}
            </>
          </Card>
        </div>
      </Container>
    </>
  );
}
