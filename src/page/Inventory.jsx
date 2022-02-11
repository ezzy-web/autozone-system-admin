import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import {
  CircularProgress,
  Toolbar,
  Typography,
  Container,
  Card,
  Avatar,
  Button,
  TextField,
} from "@material-ui/core";
import httpClient from "../httpClient";
import TableComponent from "../components/DatatableComponent/DataTable";

const NewVehicleForm = React.lazy(() =>
  import("../components/inventory-components/NewVehicleForm")
);

export default function UserPage(props) {
  const [inventory, setInventory] = useState([]);
  const [loaded, setLoad] = useState(false);
  const [modal, toggleModal] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    //   EXECUTE CODE TO FILTER INVENTORY
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
        var date = new Date(row?.lastUpdate?.nanoseconds);
        return (
          <Typography variant="caption" component={"small"}>
            {date.toLocaleString("en-US")}
          </Typography>
        );
      },
    }
  ];

  const getInventory = () => {
    setLoad(false);
    httpClient()
      .get("/getInventory")
      .then((res) => {
        const body = res.data;
        if (body.status) {
          setInventory(body.content);
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
        <Toolbar className="my-2">
          <Typography variant="h5" component={"h1"}>
            Inventory Management{" "}
          </Typography>
          <TextField
            className="mx-4 w-75"
            value={search}
            onChange={handleSearch}
            size="small"
            placeholder="Search Inventory"
          />
        </Toolbar>
        <div className="row">
          <div className="col-md-8 col-sm-12">
            <Card>
              {loaded ? (
                <TableComponent columns={columns} data={inventory} />
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
                    <NewVehicleForm toggleModal={toggleModal} />
                  </>
                </Modal>
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
}
