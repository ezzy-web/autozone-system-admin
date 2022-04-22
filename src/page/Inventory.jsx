import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
  CircularProgress,
  Box,
  Typography,
  Container,
  Card,
  Avatar,
  Button,
  Snackbar
} from "@material-ui/core";
import { httpClient } from "../httpClient";
import { TextField } from "@mui/material";
import TableComponent from "../components/DatatableComponent/DataTable";

const NewVehicleForm = React.lazy(() =>
  import("../components/inventory-components/NewVehicleForm")
);

export default function InventoryPage(props) {
  const [inventory, setInventory] = useState([]);
  const [loaded, setLoad] = useState(false);
  const [modal, toggleModal] = useState(false);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState(null);
  const [serachResults, setResults] = useState(inventory);

  const [openBar, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenSnackBar = (message) => {
    setMessage(message);
    setOpen(true);
  };

  const handleSearch = (e) => {
    setLoad(false);
    const search = e.target.value;
    setSearch(search);
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
      setResults(inventory);
    } else {
      setResults(mapping.map((data) => inventory[data.index]));
    }

    setTimeout(() => setLoad(true), 1000);
  };

  const handleToggleModal = () => {
    toggleModal(!modal);
  };

  const closeModal = () => {
    toggleModal(false);
  };

  const columns = [
    {
      name: (
        <>
          <Typography variant="button">Stock No.</Typography>
        </>
      ),
      selector: (row) => (
        <div className="d-flex flex-column">
          <Typography variant="button">
            <small>{row?.id}</small>
          </Typography>
        </div>
      ),
    },
    {
      name: (
        <>
          <Typography variant="button">Name</Typography>
        </>
      ),
      selector: (row) => {
        var url = new URL(
          "/admin/management/inventory/vehicle",
          window.location.origin
        );
        url.searchParams.append("stck", row.id);
        return (
          <div className="d-flex flex-column">
            <Typography variant="button" component={"a"} href={url.href}>
              <small>{row?.title}</small>
            </Typography>
          </div>
        );
      },
    },
    {
      name: (
        <>
          <Typography variant="button">Status</Typography>
        </>
      ),
      selector: (row) => {
        var status = row.isAvailable ? "Available" : "Sold";
        return (
          <Typography variant="button" component={"small"}>
            {status}
          </Typography>
        );
      },
    },

    {
      name: (
        <>
          <Typography variant="button">Last Updated</Typography>
        </>
      ),
      selector: (row) => {
        const seconds = parseInt(row.lastUpdate.seconds);
        const nanoseconds = parseInt(row.lastUpdate.nanoseconds);
        var date = new Date(seconds * 1000 + nanoseconds / 1000000);
        return (
          <Typography variant="caption" component={"small"}>
            {date.toLocaleString("en-US")}
          </Typography>
        );
      },
    },
  ];

  const getInventory = () => {
    setLoad(false);
    httpClient()
      .get("/getInventory")
      .then((res) => {
        const body = res.data;
        if (body.status) {
          setInventory(body.content);
          setFilters(
            body.content.map((data, index) => ({
              index: index,
              match: [
                data?.id,
                data.make?.toUpperCase(),
                data.model?.toUpperCase(),
                data.year,
                data.chassis?.toUpperCase(),
                data.engine_no?.toUpperCase(),
                data.isVisible ? "VISIBLE" : "HIDDEN",
                data.isAvailable ? "AVAILABLE" : "SOLD",
              ],
            }))
          );

          setResults(body.content);
        }
        setLoad(true);
      })
      .catch((err) => {
        setLoad(true);
      });
  };

  useEffect(() => {
    getInventory();
  }, []);

  return (
    <>
      <Container>
        <Box className="my-2">
          <Typography variant="h5" component={"h1"}>
            Inventory Management{" "}
          </Typography>
          <TextField
            variant="standard"
            className="mt-4 w-75"
            value={search}
            onChange={handleSearch}
            size="small"
            placeholder="Search Inventory"
          />
        </Box>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <Card>
              {loaded ? (
                <TableComponent columns={columns} data={serachResults} />
              ) : (
                <div className="table-loading">
                  <CircularProgress />
                </div>
              )}
            </Card>
          </div>

          <div className="col-md-4 col-sm-12">
            <Button
              size="small"
              variant="text"
              className="ml-4"
              onClick={getInventory}
            >
              <small>Refresh</small>
              <span className="mx-1">
                <i className="lni lni-reload"></i>
              </span>
            </Button>
            <Card id="new-object-card">
              <div className="content">
                <Typography variant="h5" component={"h4"}>
                  Add New Vehicle
                </Typography>
                <p>Add a new vehicle to the inventory.</p>

                <Button onClick={handleToggleModal}>
                  <Avatar sx={{ width: "16px", height: "16px" }}>
                    <span>
                      <i className="lni lni-plus"></i>
                    </span>
                  </Avatar>{" "}
                  <span className="mx-3">Add New Vehicle</span>{" "}
                </Button>
                <Modal show={modal} onHide={closeModal}>
                  <>
                    <NewVehicleForm
                      handleOpenSnackBar={handleOpenSnackBar}
                      toggleModal={toggleModal}
                    />
                  </>
                </Modal>
              </div>
            </Card>
          </div>
        </div>

        <Snackbar
          open={openBar}
          onClose={() => setOpen(false)}
          message={message}
        />
      </Container>
    </>
  );
}
